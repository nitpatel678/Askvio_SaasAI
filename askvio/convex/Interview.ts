import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
      status: "draft",
    });

    return result;
  },
});

export const GetInterviewQuestions = query({
  args: {
    interviewRecordId: v.id('InterviewSessionTable'),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("InterviewSessionTable")
      .filter((q) => q.eq(q.field("_id"), args.interviewRecordId))
      .collect();

    return result;
  },
});
