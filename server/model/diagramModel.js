import mongoose from 'mongoose';

const { Schema } = mongoose;

const diagramSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    elements: { type: Array, default: [] }, // Stores canvas shapes and their properties
  },
  { timestamps: true }
);

export const Diagram = mongoose.model('Diagram', diagramSchema);
