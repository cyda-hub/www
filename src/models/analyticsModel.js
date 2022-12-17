import mongoose from "mongoose";

const valueSchema = new mongoose.Schema({
    value: String,
    timestamp: {
      type: Number
    }
})

const devicesSchema = new mongoose.Schema({
  devices: String,
  os: String,
  browsers: String,
  timestamp: {
    type: Number
  }
})

const schema = new mongoose.Schema({
    linkID: {
        required: true,
        type: String,
    },
    referers: {
      type: [valueSchema.schema],
    },
    locations: {
      type: [valueSchema.schema],
    },
    linksClicked: {
      type: [valueSchema.schema],
    },
    devices: {
      type: [devicesSchema.schema],
    },
    expireAt: {
        type: Date,
        index: {
          expireAfterSeconds: 60
        }
    },
}, {timestamps: true});

const Analytics = mongoose.model("Analytics", schema);

export default Analytics;
export const AnalyticValueSchema = valueSchema;
