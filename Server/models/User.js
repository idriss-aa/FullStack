const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: Jane Doe
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 * 
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 * 
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        accessToken:
 *          type: string
 */

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVendorDeliveryMan: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User',userSchema)