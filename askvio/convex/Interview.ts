import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const SaveInterviewQuestion = mutation({
  args: {
    questions: v.any(),
    // accept a string id (Clerk id or any user identifier)
    uid: v.string(),
    resumeUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("InterviewSessionTable", {
      interviewQuestions: args.questions,
      resumeUrl: args.resumeUrl,
      // now a plain string
      userId: args.uid,
      status: "draft"
    });

    return result;
  },
});
