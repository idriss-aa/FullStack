const chai = require("chai");
const User = require("../models/User");
const Categorie = require("../models/Categorie");
const expect = chai.expect;
const mocha = require("mocha");
const mongoose = require("mongoose");

describe("Categorie model", () => {
  // create a new categorie before each test
  let newCategorie;

    beforeEach(() => {
        newCategorie = new Categorie({
            userId: new mongoose.Types.ObjectId(),
            StoreId: new mongoose.Types.ObjectId(),
            title: 'Electronics'
        });
    });

    // test the save method
    it("should save a categorie with required properties", (done) => {
        newCategorie.save(async (err, savedCategorie) => {
            if (err) done(err);
            savedCategorie.should.have.property("userId").eql(newCategorie.userId);
            savedCategorie.should.have.property("StoreId").eql(newCategorie.StoreId);
            savedCategorie.should.have.property("title").eql(newCategorie.title);
        });
        done();
    });

     // test the validation for the title field
     it("should throw an error for missing title field", (done) => {
        newCategorie.title = "";
        newCategorie.save( async (err) => {
            err.should.have.property("name").eql("ValidationError");
            err.should.have.property("errors").have.property("title");
        });
        done();
    });
});

