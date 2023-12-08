const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    optionA: {
      type: String,
      required: true,
    },
    optionB: {
      type: String,
      required: true,
    },
    optionC: {
      type: String,
      required: true,
    },
    optionD: {
      type: String,
      required: true,
    },
    countA: {
      type: Number,
      default: 0,
    },
    countB: {
      type: Number,
      default: 0,
    },
    countC: {
      type: Number,
      default: 0,
    },
    countD: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        const totalVotes = ret.countA + ret.countB + ret.countC + ret.countD;
        ret.percentA = totalVotes ? `${Math.round((ret.countA/totalVotes) * 100).toFixed(2)}%` : "0%";
        ret.percentB = totalVotes ? `${Math.round((ret.countB/totalVotes) * 100).toFixed(2)}%` : "0%";
        ret.percentC = totalVotes ? `${Math.round((ret.countC/totalVotes) * 100).toFixed(2)}%` : "0%";
        ret.percentD = totalVotes ? `${Math.round((ret.countD/totalVotes) * 100).toFixed(2)}%` : "0%";
      },
    },
  }
);

module.exports = mongoose.model("Poll", pollSchema);
