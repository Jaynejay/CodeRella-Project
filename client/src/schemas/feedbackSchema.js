import { z } from "zod";

export const feedbackSchema = z.object({
    feedback: z
        .string()
        .min(5, "Feedback must be at least 5 characters")
        .max(500, "Feedback must not exceed 500 characters"),
});
