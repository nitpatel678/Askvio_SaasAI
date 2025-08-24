import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { name, email, imageUrl } = args;
    // if user already exists
    const user = await ctx.db
      .query("UserTable")
      .filter(q => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length === 0) {
      const data = {
        email: args.email,
        imageUrl: args.imageUrl,
        name: args.name,
      };

      const result = await ctx.db.insert("UserTable", {
        ...data,
      });

      console.log("New user created", result);

      return {
        ...data,
        result
      };
    }

    return user[0];
  },
});
