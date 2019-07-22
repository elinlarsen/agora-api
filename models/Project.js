const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true, unique: true },
  picture: { type: Array },
  members: [{ type: Schema.Types.ObjectId, ref: "userModel" }],
  tags: [
    {
      type: String,
      enum: [
        "culture",
        "environment",
        "security",
        "sport",
        "mobility",
        "digital",
        "education",
        "solidarity",
        "health",
        "cleanliness",
        "lifestyle",
        "economy"
      ]
    }
  ],
  type: { type: String, enum: ["open", "close"], require: true },
  minimum_contribution: { type: Number },
  minimum_total_amount: { type: Number },
  minimum_amount_per_member: { type: Number },
  start_date: { type: Date, require: true },
  end_date: { type: Date, require: true },
  description: { type: String, require: true },
  status: {
    type: String,
    enum: ["ideation", "planning", "financed", "ongoing", "done"]
  },
  public: { type: Boolean },
  messages: [{ type: Schema.Types.ObjectId, ref: "messageModel" }]
});

const projectModel = mongoose.model("projectModel", projectSchema);
module.exports = projectModel;
