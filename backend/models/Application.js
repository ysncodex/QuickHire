import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    // This creates the relational "job_id" field
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    resume_link: { type: String, required: true },
    cover_note: { type: String }, // This is optional, so no "required: true"
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
  }
);

// This converts MongoDB's built-in "_id" to simply "id"
applicationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;
