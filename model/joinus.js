const mongoose = require("mongoose");
const Joi = require("joi");

const joinUsSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, unique: true, required: true },
    createdAt: { type: Date, required: true, default: Date.now, },
});

const JoinUs = mongoose.model("Join_Us", joinUsSchema);

function validateJoinUs(join_us) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(60).email().required()
    });
    return schema.validate(join_us);
}

exports.JoinUs = JoinUs;
exports.validate = validateJoinUs;