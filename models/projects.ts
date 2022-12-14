import mongoose from 'mongoose';

  
const projectSchema = new mongoose.Schema({
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      title: {
        type: String,
        required: true,
        unique: false
      },
      description: {
        type: String,
        required: true,
        unique: false
      },
      url: {
        type: String,
        required: true,
        unique: false
      },
      date: {
        type: Date,
        required: true,
        unique: false
      },
      skills: {
        type: Array,
        required: true,
        unique: false
      },
      languages: {
        type: Array,
        required: true,
        unique: false
      },
      contributors: {
        type: Array,
        required: true,
        unique: false
      }
    });
  
export const ProjectSchema = mongoose.model('projects', projectSchema);
