const chai = require("chai");
const User = require("../models/User");
const Boutique = require("../models/Boutique");
const Product = require("../models/Product");
const expect = chai.expect;
const mocha = require("mocha");
const mongoose = require("mongoose");

describe("Product model", () => {
  // create a new product before each test
  let newProduct;
  beforeEach(() => {
    newProduct = new Product({
      userId: "5f3e9c9c9b8c8a7d6e5f4d3",
      StoreId: new mongoose.Types.ObjectId(),
      title: {
        fr: "Titre en français",
        en: "Title in english",
      },
      description: {
        fr: "Description en français",
        en: "Description in english",
      },
      categories: [new mongoose.Types.ObjectId()],
      price: 100,
    });
  });

  // test the save method
  it("should save a product with required properties", (done) => {
    newProduct.save(async (err, savedProduct) => {
      if (err) done(err);
      savedProduct.should.have.property("userId").eql(newProduct.userId);
      savedProduct.should.have.property("StoreId").eql(newProduct.StoreId);
      savedProduct.should.have.property("title").eql(newProduct.title);
      savedProduct.should.have.property("categories").eql(newProduct.categories);
      savedProduct.should.have.property("price").eql(newProduct.price);
    });
    done();
  });

  it("should throw an error for missing title field", (done) => {
    newProduct.title = {};
    newProduct.save( async (err) => {
      err.should.have.property("name").eql("ValidationError");
      err.should.have.property("errors").have.property("title");
    });
    done();
  });

  // test the validation for the description field
  it("should throw an error for missing description field", (done) => {
    newProduct.description = {};
    newProduct.save( async (err) => {
      err.should.have.property("name").eql("ValidationError");
      err.should.have.property("errors").have.property("description");
    });
    done();
  });
});
