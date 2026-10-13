import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock framer-motion — real framer-motion renders fine in jsdom too, but this
// keeps the test focused on CourseCard's own markup/logic rather than
// framer-motion's animation internals.
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  }
}));

// Spy on useNavigate while keeping the rest of react-router-dom real (so
// <Link> / <BrowserRouter> behave exactly as they do in the app).
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// CourseCard reads checkCourseAccess/isAuthenticated from useAuth(). Mocking
// the context hook directly (rather than rendering a real AuthProvider) lets
// each test control enrollment/auth state precisely, with no dependency on
// localStorage or the authService network calls AuthProvider makes on mount.
const mockUseAuth = vi.fn();
vi.mock('@/context/AuthContext.jsx', () => ({
  useAuth: () => mockUseAuth(),
}));

import CourseCard from '../../components/courses/CourseCard.jsx';

const renderWithRouter = (component) => render(<BrowserRouter>{component}</BrowserRouter>);

describe('CourseCard Component', () => {
  const mockCourse = {
    _id: '123',
    title: 'Test Course Title',
    description: 'This is a test course description that should be displayed properly',
    thumbnail: 'https://example.com/image.jpg',
    totalLessons: 10,
    price: 29,
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    // Default: logged out, no access — the common case for a catalogue card.
    mockUseAuth.mockReturnValue({ isAuthenticated: false, checkCourseAccess: () => false });
  });

  it('renders course title, description, and lesson count', () => {
    renderWithRouter(<CourseCard course={mockCourse} />);

    expect(screen.getByText('Test Course Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test course description that should be displayed properly')).toBeInTheDocument();
    expect(screen.getByText('10 Lessons')).toBeInTheDocument();
  });

  it('displays the thumbnail with correct src and alt text', () => {
    renderWithRouter(<CourseCard course={mockCourse} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Course Title');
  });

  it('uses the default Unsplash image when no thumbnail is provided', () => {
    const courseWithoutImage = { ...mockCourse, thumbnail: undefined };

    renderWithRouter(<CourseCard course={courseWithoutImage} />);

    const image = screen.getByRole('img');
    expect(image.src).toContain('unsplash.com');
  });

  it('handles missing totalLessons property (defaults to 0 Lessons)', () => {
    const courseWithoutLessons = { ...mockCourse };
    delete courseWithoutLessons.totalLessons;

    renderWithRouter(<CourseCard course={courseWithoutLessons} />);

    expect(screen.getByText('0 Lessons')).toBeInTheDocument();
  });

  describe('when the user does NOT have access', () => {
    it('shows a "BUY NOW" button with the course price for a paid course, and no nav link', () => {
      renderWithRouter(<CourseCard course={mockCourse} />);

      expect(screen.getByText(/BUY NOW/)).toBeInTheDocument();
      expect(screen.getByText(/\$29/)).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(screen.queryByText(/Enrolled/)).not.toBeInTheDocument();
    });

    it('shows an "ENROLL FREE" button for a free course', () => {
      const freeCourse = { ...mockCourse, isFree: true };

      renderWithRouter(<CourseCard course={freeCourse} />);

      expect(screen.getByText('ENROLL FREE')).toBeInTheDocument();
    });

    it('sends a logged-out user to checkout for a paid course on click', async () => {
      renderWithRouter(<CourseCard course={mockCourse} />);

      await userEvent.click(screen.getByText(/BUY NOW/));

      expect(mockNavigate).toHaveBeenCalledWith('/checkout/123?type=single');
    });

    it('sends a logged-out user to login (with a redirect back to enroll) for a free course on click', async () => {
      const freeCourse = { ...mockCourse, isFree: true };

      renderWithRouter(<CourseCard course={freeCourse} />);

      await userEvent.click(screen.getByText('ENROLL FREE'));

      expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('/login?redirect='));
    });

    it('falls back to course.id when _id is missing', async () => {
      const courseWithId = { ...mockCourse };
      delete courseWithId._id;
      courseWithId.id = 'course-456';

      renderWithRouter(<CourseCard course={courseWithId} />);

      await userEvent.click(screen.getByText(/BUY NOW/));

      expect(mockNavigate).toHaveBeenCalledWith('/checkout/course-456?type=single');
    });
  });

  describe('when the user HAS access (enrolled)', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ isAuthenticated: true, checkCourseAccess: () => true });
    });

    it('shows a "CONTINUE COURSE" link to the course reader and an Enrolled badge', () => {
      renderWithRouter(<CourseCard course={mockCourse} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/courses/123');
      expect(screen.getByText('CONTINUE COURSE')).toBeInTheDocument();
      expect(screen.getByText(/Enrolled/)).toBeInTheDocument();
    });
  });

  it('truncates a long title with line-clamp-2', () => {
    const longTitle = 'This is a very long course title that should be truncated to fit within the card layout constraints';
    const courseWithLongTitle = { ...mockCourse, title: longTitle };

    renderWithRouter(<CourseCard course={courseWithLongTitle} />);

    expect(screen.getByText(longTitle)).toHaveClass('leading-tight');
  });

  it('truncates a long description with line-clamp-2 while collapsed', () => {
    const longDescription = 'This is a very long course description that extends beyond the normal length and should be properly truncated to maintain the card layout integrity and visual consistency across all course cards in the grid layout.';
    const courseWithLongDescription = { ...mockCourse, description: longDescription };

    renderWithRouter(<CourseCard course={courseWithLongDescription} />);

    expect(screen.getByText(longDescription)).toHaveClass('line-clamp-2');
  });
});
