import mongoose, { Document, Schema } from "mongoose";

interface IMeasurement extends Document {
  customer_code: string;
  measure_datetime: Date;
  measure_type: "WATER" | "GAS";
  measure_value: number;
  measure_uuid: string;
  confirmed: boolean;
  image_url: string;
}

const MeasurementSchema: Schema = new Schema({
  customer_code: {
    type: String,
    required: true,
    trim: true,
  },
  measure_datetime: {
    type: Date,
    required: true,
  },
  measure_type: {
    type: String,
    required: true,
    enum: ["WATER", "GAS"],
  },
  measure_value: {
    type: Number,
    required: true,
  },
  measure_uuid: {
    type: String,
    required: true,
    unique: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

const Measurement = mongoose.model<IMeasurement>(
  "Measurement",
  MeasurementSchema
);

export default Measurement;
