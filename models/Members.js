const mongoose = require('mongoose');

const { Schema } = mongoose;



const MembersSchema = new Schema({
  fullname: String,
  phone: String,
  birthday: String,
}, { timestamps: true });

MembersSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    fullname: this.fullname,
    phone: this.phone,
    birthday: this.birthday,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    
  };
};

mongoose.model('Members', MembersSchema);