const chai = require("chai");
const User = require("../models/User"); 
const expect = chai.expect;
const mocha = require('mocha');

describe("User model",  () => {
  // Test the save method
  it("should save a user with required properties", async (done) => {
    const user = new User({
      username: "JohnDoe",
      email: "johndoe@example.com",
      password: "password123",
    });

    user.save( async (err, savedUser) => {
       expect(savedUser.username).to.equal("JohnDoe");
       expect(savedUser.email).to.equal("johndoe@example.com");
    });
    done();
  });
  // Test the unique validation for email
  it("should throw an error for duplicate email", (done) => {
    const user = new User({
      username: "JaneDoe",
      email: "johndoe@example.com",
      password: "password456",
    });

    user.save( async (err, savedUser) => {
      expect(err).to.exist;
      expect(err.code).to.equal(11000); // mongodb duplicate key error
    });
    done();
  });

// Test the default values
  it("should have default values for isAdmin and isVendorDeliveryMan", (done) => {
    const user = new User({
      username: "JaneDoe",
      email: "janedoe@example.com",
      password: "password456",
    });

    user.save( async (err, savedUser) => {
      expect(savedUser.isAdmin).to.be.false;
      expect(savedUser.isVendorDeliveryMan).to.be.false;
    });
    done();
  });

// Test the unique validation for username
  it("should throw an error for duplicate username", (done) => {
    const user = new User({
      username: "JohnDoe",
      email: "janedoe2@example.com",
      password: "password789",
    });
    user.save( async (err, savedUser) => {
      expect(err).to.exist;
      expect(err.code).to.equal(11000); // mongodb duplicate key error
    });
    done();
  });

//  Test the password validation
  it("should throw an error for password less than 8 characters", (done) => {
    const user = new User({
      username: "JaneDoe",
      email: "janedoe3@example.com",
      password: "123",
    });

    user.save( async (err, savedUser) => {
      expect(err).to.exist;
      expect(err.errors.password).to.exist;
    });
    done();
  });
});
