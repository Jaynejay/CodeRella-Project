import { z } from "zod";

export const voucherSchema = z.object({
    registrationId: z
        .string()
        .min(3, "Registration ID is required and must be at least 3 characters"),
    examName: z
        .string()
        .min(3, "Exam name must be at least 3 characters")
        .max(100, "Exam name must not exceed 100 characters"),
    courseCode: z
        .string()
        .min(2, "Course code is required")
        .max(20, "Course code must be under 20 characters"),
    subjectCode: z
        .string()
        .min(2, "Subject code is required")
        .max(20, "Subject code must be under 20 characters"),
    message: z.string().optional(),
});
