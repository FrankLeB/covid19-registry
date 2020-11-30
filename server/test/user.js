require("./global-before");

const expect = require("chai").expect;
const faker = require("faker");
faker.seed(123);

const userController = require("../controllers/user");

describe("Users", function () {
  describe("POST", function () {
    describe("add", function () {
      it("should save a user and return a status code of 201", function (done) {
        const req = {
          body: {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            phoneNo: "555 555-5555",
            image: faker.lorem.sentence()
          }
        };

        const res = {
          statusCode: 500,
          result: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.result = data.result;
          }
        };

        userController
          .postAdd(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(201);
            done();
          });
      });
    });
  });

  describe("PUT", function () {
    describe("modify", function () {
      it("should update a user and return a status code of 200", function (done) {
        const req = {
          body: {
            id: 1,
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            phoneNo: "555 555-5555",
            image: faker.lorem.sentence()
          }
        };

        const res = {
          statusCode: 500,
          result: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.result = data.result;
          }
        };

        userController
          .putModify(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });
  });

  describe("GET", function () {
    describe("fetch", function () {
      it("should return an array of users with a status code of 200", function (done) {
        const res = {
          statusCode: 500,
          users: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.users = data.users;
          }
        };

        userController
          .getFetch({}, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.users).to.be.an("array");
            done();
          });
      });
    });

    describe("fetchLimit", function () {
      it("should return an array of users with a max length of 10 with a status code of 200", function (done) {
        const req = {
          params: {
            page: 1
          }
        };
        const res = {
          statusCode: 500,
          users: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.users = data.users;
          }
        };

        userController
          .getFetchLimit(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.users).to.be.an("array");
            expect(res.users).to.have.lengthOf.at.most(10);
            done();
          });
      });
    });

    describe("fetchById", function () {
      it("should return a user with a status code of 200", function (done) {
        const req = {
          params: {
            id: 1
          }
        };
        const res = {
          statusCode: 500,
          user: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.user = data.user;
          }
        };

        userController
          .getFetchById(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.user).to.be.an("object");
            done();
          });

      });
    });

    describe("findByNameAndId", function () {
      it("should return an array of users with a status code of 200", function (done) {
        const req = {
          params: {
            input: faker.lorem.word()
          }
        };
        const res = {
          statusCode: 500,
          users: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.users = data.users;
          }
        };

        userController
          .getFindByNameAndId(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.users).to.be.an("array");
            done();
          });

      });
    });
  });

  describe("DELETE", function () {
    describe("user", function () {
      it("should delete a user and return a status code of 200", function (done) {
        const req = {
          params: {
            id: 1
          }
        };

        const res = {
          statusCode: 500,
          result: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.result = data.result;
          }
        };

        userController
          .deleteUser(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });
  });
});
