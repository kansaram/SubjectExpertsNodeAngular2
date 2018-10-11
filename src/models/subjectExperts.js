const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const subjectExperts = new Schema({
    firstName : {type: String, required: true,trim: true },
    lastName : {type: String, required: true, trim: true},
    subject : {type: String, required: true},
    country : {type: String, required: true}
});
      
module.exports = mongoose.model('Experts',subjectExperts,'experts');