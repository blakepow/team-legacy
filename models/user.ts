module.exports = (mongoose: any) => {
  const bcrypt = require('bcryptjs');
  const { isEmail } = require('validator');
  var uniqueValidator = require('mongoose-unique-validator');
  const passwordValidator = require('password-validator');

  const passwordSchema = new passwordValidator();
  // Add properties to it
  passwordSchema
  .is().min(8)                                    // Minimum length 8
  .is().max(45)                                   // Maximum length 45
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits()                                 // Must have at least 1 digit
  .has().not().spaces()
  
  const userSchema = mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
       
      },
      password: {
        type: String,
        required: true
      }
    });

    userSchema.plugin(uniqueValidator);
  
    userSchema.methods.isValidPassword = function isValidPassword(password: String) {
      return passwordSchema.validate(password, { details: true });
    }
    
    userSchema.methods.validatePassword = async function validatePassword(data: any) {
      return await bcrypt.compare(data, this.password);
    };
  
  return mongoose.model('user', userSchema);
};