/**
 * One-time quiz upgrade: replaces the shallow, generic quiz questions currently
 * live in production (10 one-line questions per course like "What is a prompt?",
 * 50% passing score, near-identical wording repeated across different courses)
 * with the in-depth, course-specific final assessments authored in
 * backend/content/*.js (4-option questions with explanations, tied to the
 * actual lesson content, 70% passing score).
 *
 * SAFETY DESIGN — read before running:
 * - Matches the target course by exact title, never by _id.
 * - Does NOT create a new Quiz document and does NOT touch course.quizId. It
 *   finds the Quiz document the course ALREADY points to and updates its
 *   title, description, questions array, and passingScore in place. The
 *   quiz's own _id never changes, so course.quizId keeps pointing at the same
 *   document and nothing referencing it breaks.
 * - UserQuizAttempt (past quiz attempts) stores its own score/pointsEarned at
 *   the time of the attempt and references answers by questionIndex, not by
 *   any per-question _id — so historical attempts are unaffected by the
 *   questions themselves changing afterward.
 * - If a course has no quizId, or its quizId points at a Quiz document that
 *   no longer exists, it is reported and skipped rather than guessed at.
 * - Nothing is deleted.
 *
 * USAGE (run from the backend/ directory, against your PRODUCTION MONGODB_URI):
 *   node scripts/upgradeQuizzes.js            # apply the update
 *   node scripts/upgradeQuizzes.js --dry-run   # report only, no writes
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import Quiz from '../models/Quiz.js';

import marketing from '../content/marketing.js';
import research from '../content/research.js';
import customerSupport from '../content/customer-support.js';
import entrepreneurs from '../content/entrepreneurs.js';
import sales from '../content/sales.js';
import productivity from '../content/productivity.js';

dotenv.config();

const DRY_RUN = process.argv.includes('--dry-run');

const allCourseContent = [marketing, research, customerSupport, entrepreneurs, sales, productivity];

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env — refusing to run without an explicit target database.');
  }

  await mongoose.connect(uri);
  console.log(`✅ Connected${DRY_RUN ? ' (DRY RUN — no writes will be made)' : ''}\n`);

  let upgraded = 0;
  const skipped = [];

  for (const courseData of allCourseContent) {
    if (!courseData.quiz) {
      console.log(`⏭  ${courseData.courseTitle}: no authored quiz in this content file — skipping.\n`);
      continue;
    }

    const course = await Course.findOne({ title: courseData.courseTitle });
    if (!course) {
      console.log(`❌ COURSE NOT FOUND: "${courseData.courseTitle}" — skipping.\n`);
      skipped.push(courseData.courseTitle);
      continue;
    }

    if (!course.quizId) {
      console.log(`⚠️  "${course.title}" has no quizId set in production — there's nothing to upgrade in place.`);
      console.log(`   (This script only replaces an EXISTING quiz's content — it never creates one.)\n`);
      skipped.push(course.title);
      continue;
    }

    const quiz = await Quiz.findById(course.quizId);
    if (!quiz) {
      console.log(`⚠️  "${course.title}" has quizId ${course.quizId} but no matching Quiz document exists — skipping.\n`);
      skipped.push(course.title);
      continue;
    }

    console.log(`📘 ${course.title}`);
    console.log(`   Current: "${quiz.title}" — ${quiz.questions.length} questions, passingScore ${quiz.passingScore}`);
    console.log(`   New:     "${courseData.quiz.title}" — ${courseData.quiz.questions.length} questions, passingScore ${courseData.quiz.passingScore || 70}`);

    if (!DRY_RUN) {
      quiz.title = courseData.quiz.title;
      quiz.description = courseData.quiz.description;
      quiz.questions = courseData.quiz.questions;
      quiz.passingScore = courseData.quiz.passingScore || 70;
      quiz.isPublished = true;
      await quiz.save();
      console.log(`   💾 Saved — same quiz _id (${quiz._id}), same course link, past attempt history untouched.\n`);
    } else {
      console.log(`   (dry run) Would overwrite the questions above in place.\n`);
    }
    upgraded++;
  }

  console.log('='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Quizzes upgraded: ${upgraded} / ${allCourseContent.length}`);
  if (skipped.length) {
    console.log(`Skipped (${skipped.length}): ${skipped.join(', ')}`);
  }
  if (DRY_RUN) {
    console.log('\nThis was a DRY RUN — no changes were saved. Re-run without --dry-run to apply.');
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error('\n❌ Script failed:', err);
  process.exit(1);
});
