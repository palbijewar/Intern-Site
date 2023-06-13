const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    }, 
    email: {
        type:String,
        required:true,
        validate: {
            validator: function (value) {
              // Regular expression to validate email format
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address',
          }, 
        unique:true
    }, 
    mobile: {
        type:Number,
        required:true,
        validate: {
            validator: function (value) {
              // Regular expression to validate phone number format
              return /^[0-9]{10}$/.test(value);
            },
            message: 'Invalid phone number',
    }
},
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college'
    }, 
    isDeleted: {
        type:Boolean, 
        default: false
    }
},{timestramps:true});

module.exports = mongoose.model('intern', internSchema);

