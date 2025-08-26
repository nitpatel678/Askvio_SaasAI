import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Define your schema here
  UserTable:defineTable({
    name: v.string(),
    imageUrl : v.string(),
    email: v.string(),
  }),

  InterviewSessionTable: defineTable({
    interviewQuestions: v.any(),
    resumeUrl: v.string(),
    // change here: store the user identifier as a plain string (Clerk id or other)
    userId: v.string(),
    status: v.string()
})

});



