const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'This fill is required, please fill it'],
      unique: false,
    },
    email: {
      type: String,
      required: [true, 'This fill is required, please fill it'],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, 'This fill is required, please fill it'],
      unique: true,
      minlength: 10,
      maxlength: 13,
    },
    subscription: {
      type: String,
      default: 'free',
      enum: ['free', 'pro', 'premium'],
    },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false },
);

contactSchema.plugin(mongoosePaginate);
const Contact = model('contact', contactSchema);

module.exports = Contact;
