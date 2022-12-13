module.exports = (mongoose: any) => {
  
  const projectsSchema = mongoose.Schema({
      user_id: {
        type: String,
        required: true,
        unique: false
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
  
  return mongoose.model('projects', projectsSchema);
};