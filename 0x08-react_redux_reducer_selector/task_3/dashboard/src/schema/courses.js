// task_4/dashboard/src/schema/courses.js
import { normalize, schema } from 'normalizr';

// Define a course schema
const courseSchema = new schema.Entity('courses');

// Create a function to normalize course data
export const coursesNormalizer = (data) => normalize(data, [courseSchema]);
