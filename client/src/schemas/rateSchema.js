import { z } from "zod";

export const rateSchema = z.object({
  id: z.string().optional(),
  courseCode: z.string().min(3, "Course Code is required"),
  course: z.string().min(3, "Course Name is required"),
  subjectCode: z.string().min(3, "Subject Code is required"),
  subject: z.string().min(3, "Subject Name is required"),
  duration: z.coerce
    .number()
    .min(1, "Duration must be at least 1 hour")
    .max(10, "Duration too long"),
  rate: z.coerce.number().positive("Rate must be positive"),
});
