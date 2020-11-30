require("./global-before");

const expect = require("chai").expect;
const faker = require("faker");
faker.seed(123);

const entryController = require("../controllers/entry");

describe("Entries", function () {
  describe("POST", function () {
    describe("add", function () {
      it("should save an entry and return a status code of 201", function (done) {
        const req = {
          body: {
            userId: 1,
            temperature: faker.random.number(),
            entryDate: faker.date.recent(),
            questions: [
              {
                question: faker.lorem.sentence(),
                answer: faker.random.boolean()
              }
            ]
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

        entryController
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
      it("should update an entry and return a status code of 200", function (done) {
        const req = {
          body: {
            id: 1,
            userId: 1,
            temperature: faker.random.number(),
            entryDate: faker.date.recent(),
            questions: [
              {
                id: 1,
                question: faker.lorem.sentence(),
                answer: faker.random.boolean()
              }
            ]
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

        entryController
          .putModify(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });
  });

  describe("GET", function () {
    describe("fetchLatestByUserId", function () {
      it("should return the latest entry of a user with a status code of 200", function (done) {
        const req = {
          params: {
            id: 1
          }
        };

        const res = {
          statusCode: 500,
          entry: null,
          user: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.entry = data.entry;
            this.user = data.user;
          }
        };

        entryController
          .getFetchLatestByUserId(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe("fetchAllByUserId", function () {
      it("should return all the entries of a user with a status code of 200", function (done) {
        const req = {
          params: {
            id: 1
          }
        };

        const res = {
          statusCode: 500,
          entries: null,
          employee: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.entries = data.entries;
            this.employee = data.employee;
          }
        };

        entryController
          .getFetchAllByUserId(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe("fetchLateStatus", function () {
      it("should return all the users that are late at getting their temperature with a status code of 200", function (done) {
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

        entryController
          .getFetchLateStatus({}, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe("fetchAllEntries", function () {
      it("should fetch all the entries in a range and return a status code of 200", function (done) {
        const req = {
          query: {
            dateStart: faker.date.past(),
            dateEnd: faker.date.future()
          }
        };

        const res = {
          statusCode: 500,
          entries: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.entries = data.entries;
          }
        };

        entryController
          .getFetchAllEntries(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe("fetchSumEntries", function () {
      it("should fetch the number of times users went to the station per day in a range and return a status code of 200", function (done) {
        const req = {
          query: {
            dateStart: faker.date.past(),
            dateEnd: faker.date.future()
          }
        };

        const res = {
          statusCode: 500,
          entries: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.entries = data.entries;
          }
        };

        entryController
          .getFetchSumEntries(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });
  });

  describe("DELETE", function () {
    describe("entry", function () {
      it("should delete an entry and return a status code of 200", function (done) {
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

        entryController
          .deleteEntry(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });
  });
});
