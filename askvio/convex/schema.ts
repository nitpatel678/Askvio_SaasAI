import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Define your schema here
  UserTable:defineTable({
    name: v.string(),
    imageUrl : v.string(),
    email: v.string(),
  })
});
