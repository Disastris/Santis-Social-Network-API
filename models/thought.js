const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        dayjs(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
