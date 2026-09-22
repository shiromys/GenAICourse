/**
 * One-time content update: replaces thin placeholder lesson content across all 6
 * courses with real, in-depth lesson bodies, key points, learning objectives,
 * realistic durations, and downloadable prompt-template resources — plus creates
 * a final quiz for any course that doesn't already have one.
 *
 * SAFETY DESIGN — read before running:
 * - Matching is done by exact course/module/lesson TITLE, never by _id. We don't
 *   trust hand-copied _ids for a script that writes to production, and titles are
 *   NOT changed by this script (course names/topics stay exactly as they are).
 * - Lessons are updated IN PLACE (existing subdocuments are mutated, not replaced).
 *   This preserves every lesson's existing _id, which matters because
 *   UserProgress.completedLessons references lessons by _id — replacing the
 *   lessons array would silently orphan every learner's completion history.
 * - A course's quizId is only ever SET if it is currently empty. An existing quiz
 *   is never modified or replaced by this script.
 * - Nothing is deleted. Any module/lesson title in the DB that doesn't match a
 *   title in our content files is left completely untouched.
 * - The script logs every match and every miss, so you can see exactly what
 *   happened before trusting the result.
 *
 * USAGE (run from the backend/ directory, against your PRODUCTION MONGODB_URI):
 *   node scripts/updateCourseContent.js            # apply the update
 *   node scripts/updateCourseContent.js --dry-run   # report matches/misses only, no writes
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import Quiz from '../models/Quiz.js';
import User from '../models/User.js';

import marketing from '../content/marketing.js';
import research from '../content/research.js';
import customerSupport from '../content/customer-support.js';
import entrepreneurs from '../content/entrepreneurs.js';
import sales from '../content/sales.js';
import productivity from '../content/productivity.js';

dotenv.config();

const DRY_RUN = process.argv.includes('--dry-run');

const allCourseContent = [marketing, research, customerSupport, entrepreneurs, sales, productivity];

const stats = {
  coursesMatched: 0,
  coursesMissed: [],
  lessonsUpdated: 0,
  lessonsMissed: [],
  resourcesAdded: 0,
  quizzesCreated: 0,
  quizzesSkipped: [],
};

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env — refusing to run without an explicit target database.');
  }

  await mongoose.connect(uri);
  console.log(`✅ Connected to MongoDB${DRY_RUN ? ' (DRY RUN — no writes will be made)' : ''}\n`);

  // Used as the createdBy field on any newly-created quiz.
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@genaicourse.io';
  const adminUser = await User.findOne({ email: adminEmail });
  if (!adminUser) {
    console.warn(`⚠️  No admin user found for ${adminEmail} — new quizzes will be skipped (quiz creation needs a createdBy user).`);
  }

  for (const courseData of allCourseContent) {
    const course = await Course.findOne({ title: courseData.courseTitle });
    if (!course) {
      stats.coursesMissed.push(courseData.courseTitle);
      console.log(`❌ COURSE NOT FOUND: "${courseData.courseTitle}" — skipping entirely.\n`);
      continue;
    }
    stats.coursesMatched++;
    console.log(`\n📘 ${course.title}`);

    for (const moduleData of courseData.modules) {
      const mod = course.modules.find(m => m.title === moduleData.title);
      if (!mod) {
        console.log(`  ❌ MODULE NOT FOUND: "${moduleData.title}"`);
        for (const l of moduleData.lessons) stats.lessonsMissed.push(`${courseData.courseTitle} > ${moduleData.title} > ${l.title}`);
        continue;
      }

      for (const lessonData of moduleData.lessons) {
        const lesson = mod.lessons.find(l => l.title === lessonData.title);
        if (!lesson) {
          console.log(`  ❌ LESSON NOT FOUND in "${mod.title}": "${lessonData.title}"`);
          stats.lessonsMissed.push(`${courseData.courseTitle} > ${moduleData.title} > ${lessonData.title}`);
          continue;
        }

        // Mutate the existing subdocument in place — its _id is untouched.
        lesson.content = lessonData.content;
        lesson.keyPoints = lessonData.keyPoints || [];
        lesson.learningObjectives = lessonData.learningObjectives || [];
        lesson.duration = lessonData.duration || lesson.duration;
        if (lessonData.resources && lessonData.resources.length) {
          lesson.resources = lessonData.resources;
          stats.resourcesAdded += lessonData.resources.length;
        }
        stats.lessonsUpdated++;
        console.log(`  ✓ "${lesson.title}" (${lessonData.content.length} chars, ${lessonData.duration}m${lessonData.resources ? ', +resource' : ''})`);
      }
    }

    // Quiz: only create one if this course doesn't already have a final assessment.
    if (courseData.quiz) {
      if (course.quizId) {
        stats.quizzesSkipped.push(course.title);
        console.log(`  ⏭  Quiz already exists for this course (quizId set) — leaving it untouched.`);
      } else if (!adminUser) {
        console.log(`  ⏭  Skipping quiz creation — no admin user found to set as createdBy.`);
      } else if (!DRY_RUN) {
        const quiz = new Quiz({
          title: courseData.quiz.title,
          description: courseData.quiz.description,
          questions: courseData.quiz.questions,
          passingScore: courseData.quiz.passingScore || 70,
          isPublished: true,
          courseId: course._id,
          createdBy: adminUser._id,
        });
        await quiz.save();
        course.quizId = quiz._id;
        if (Array.isArray(course.quizzes)) course.quizzes.push(quiz._id);
        stats.quizzesCreated++;
        console.log(`  ✓ Created final quiz (${courseData.quiz.questions.length} questions) and linked it as course.quizId.`);
      } else {
        console.log(`  (dry run) Would create a final quiz with ${courseData.quiz.questions.length} questions.`);
      }
    }

    if (!DRY_RUN) {
      await course.save();
      console.log(`  💾 Saved.`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Courses matched:      ${stats.coursesMatched} / ${allCourseContent.length}`);
  console.log(`Lessons updated:      ${stats.lessonsUpdated}`);
  console.log(`Resources added:      ${stats.resourcesAdded}`);
  console.log(`Quizzes created:      ${stats.quizzesCreated}`);
  console.log(`Quizzes left as-is:   ${stats.quizzesSkipped.length}${stats.quizzesSkipped.length ? ' (' + stats.quizzesSkipped.join(', ') + ')' : ''}`);
  if (stats.coursesMissed.length) {
    console.log(`\n⚠️  COURSES NOT FOUND (${stats.coursesMissed.length}):`);
    stats.coursesMissed.forEach(t => console.log(`   - ${t}`));
  }
  if (stats.lessonsMissed.length) {
    console.log(`\n⚠️  LESSONS NOT MATCHED (${stats.lessonsMissed.length}) — these were left untouched, check for a title mismatch:`);
    stats.lessonsMissed.forEach(t => console.log(`   - ${t}`));
  }
  if (!stats.coursesMissed.length && !stats.lessonsMissed.length) {
    console.log('\n✅ Every course, module, and lesson matched — no gaps.');
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
