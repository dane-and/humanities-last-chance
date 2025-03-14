
// YouTubeUniversity Data Structure

export interface Course {
  id: string;
  title: string;
  instructor: string;
  link: string;
  platform: 'youtube' | 'other';
  description?: string;
}

export interface Discipline {
  id: string;
  name: string;
  courses: Course[];
}

// This is where you'll add all your categorized courses
// You can easily edit this file to update the resources
export const disciplines: Discipline[] = [
  {
    id: 'philosophy',
    name: 'Philosophy',
    courses: [
      {
        id: 'phil101',
        title: 'Introduction to Philosophy',
        instructor: 'Dr. John Smith',
        link: 'https://www.youtube.com/watch?v=example1',
        platform: 'youtube'
      },
      {
        id: 'phil202',
        title: 'Ethics and Moral Philosophy',
        instructor: 'Dr. Jane Doe',
        link: 'https://www.youtube.com/watch?v=example2',
        platform: 'youtube'
      }
    ]
  },
  {
    id: 'history',
    name: 'History',
    courses: [
      {
        id: 'hist101',
        title: 'World History Survey',
        instructor: 'Prof. Robert Johnson',
        link: 'https://www.youtube.com/watch?v=example3',
        platform: 'youtube'
      }
    ]
  },
  {
    id: 'literature',
    name: 'Literature',
    courses: [
      {
        id: 'lit101',
        title: 'Classic Literature Analysis',
        instructor: 'Dr. Emily Williams',
        link: 'https://www.youtube.com/watch?v=example4',
        platform: 'youtube'
      }
    ]
  }
];
