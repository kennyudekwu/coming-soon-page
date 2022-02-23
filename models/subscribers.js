const mongoose = require('mongoose');
const Joi = require('joi');

const Subscriber = new mongoose.model('Subscriber', new mongoose.Schema({
    email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
}
}));

function validateSubscriber (subscriber) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email().required()
    });

    return schema.validate(subscriber);
}

module.exports.Subscriber = Subscriber;
module.exports.validateSubscriber = validateSubscriber;