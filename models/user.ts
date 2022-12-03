module.exports = (mongoose: any) => {
  
  const userSchema = mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true
      }
    });
  
  return mongoose.model('user', userSchema);
};