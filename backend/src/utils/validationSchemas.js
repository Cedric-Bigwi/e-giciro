const Joi = require('joi');

const DISTRICTS = ['Kigali', 'Musanze', 'Rubavu', 'Muhanga', 'Huye', 'Rusizi', 'Nyagatare', 'Gicumbi'];
const ROLES = ['consumer', 'shop_owner', 'wholesaler', 'manufacturer'];
const CATEGORIES = ['rice', 'cooking_oil', 'sugar', 'maize_flour', 'other'];

const registerSchema = Joi.object({
  phone_number: Joi.string()
    .pattern(/^0[7][0-9]{8}$/)
    .required()
    .messages({ 'string.pattern.base': 'Phone number must be a valid Rwandan number, e.g. 0788123456.' }),
  name: Joi.string().min(2).max(100).required(),
  role: Joi.string()
    .valid(...ROLES)
    .required(),
  password: Joi.string().min(6).max(100).required(),
  district: Joi.string()
    .valid(...DISTRICTS)
    .required()
});

const loginSchema = Joi.object({
  phone_number: Joi.string().required(),
  password: Joi.string().required()
});

const offerSchema = Joi.object({
  type: Joi.string().valid('buy', 'sell').required(),
  product_name: Joi.string().min(2).max(150).required(),
  category: Joi.string()
    .valid(...CATEGORIES)
    .required(),
  price: Joi.number().integer().min(0).required(),
  description: Joi.string().allow('', null).max(1000),
  district: Joi.string()
    .valid(...DISTRICTS)
    .required(),
  latitude: Joi.number().min(-90).max(90).allow(null),
  longitude: Joi.number().min(-180).max(180).allow(null)
});

const offerUpdateSchema = offerSchema.fork(
  ['type', 'product_name', 'category', 'price', 'district'],
  (schema) => schema.optional()
).keys({
  status: Joi.string().valid('active', 'completed', 'cancelled')
});

module.exports = {
  registerSchema,
  loginSchema,
  offerSchema,
  offerUpdateSchema,
  DISTRICTS,
  ROLES,
  CATEGORIES
};
