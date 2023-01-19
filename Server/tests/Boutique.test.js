const chai = require("chai");
const User = require("../models/User");
const Boutique = require("../models/Boutique");
const expect = chai.expect;
const mocha = require("mocha");

describe("Boutique model", () => {
  // Test the save method
  let user;

  beforeEach(async (done) => {
    user = new User({
      username: "JohnDoe",
      email: "johndoe@example.com",
      password: "password123",
    });
    done();
    await user.save().catch(done);
  });

  afterEach(async (done) => {
    done();
    await User.deleteMany().catch(done);
    await Boutique.deleteMany().catch(done);
  });

  it("should save a boutique with required properties", async (done) => {
    const boutique = new Boutique({
      CreatedBy: user._id,
      title: "Boutique 1",
      isOpen: true,
      opening_hours: [
        {
          day: "mon",
          periods: [
            {
              start: new Date("2022-01-01T09:00:00.000Z"),
              end: new Date("2022-01-01T17:00:00.000Z"),
            },
          ],
        },
      ],
    });

    boutique.save(async (err, savedBoutique) => {
      expect(savedBoutique.title).to.equal("Boutique 1");
      expect(savedBoutique.isOpen).to.equal(true);
      expect(savedBoutique.isOpen).to.equal(true);
      expect(savedBoutique.opening_hours[0].day).to.equal("mon");
      expect(savedBoutique.opening_hours[0].periods[0].start).to.equal(
        new Date("2022-01-01T09:00:00.000Z")
      );
    });
    done();
  });

  it("should fail to save a boutique without required properties", async (done) => {
    const boutique = new Boutique({
      isOpen: true,
      opening_hours: [
        {
          day: "mon",
          periods: [
            {
              start: new Date("2022-01-01T09:00:00.000Z"),
              end: new Date("2022-01-01T17:00:00.000Z"),
            },
          ],
        },
      ],
    });

    let error;
    try {
    boutique.save(async (err, savedBoutique) => { 
        expect().to.equal("ValidationError");
     })
    } catch (err) {
      console.log(err.name);
    }
   done();
  });
});
