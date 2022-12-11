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
      }
    });
  
  return mongoose.model('projects', projectsSchema);
};