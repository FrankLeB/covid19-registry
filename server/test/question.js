require("./global-before");

const expect = require("chai").expect;
const faker = require("faker");
faker.seed(123);

const questionController = require("../controllers/question");

describe("Questions", function () {
  describe("POST", function () {
    describe("add", function () {
      it("should save a question and return a status code of 201", function (done) {
        const req = {
          body: {
            question: faker.lorem.sentence()
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

        questionController
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
      it("should update a question and return a status code of 200", function (done) {
        const req = {
          body: {
            id: 1,
            question: faker.lorem.sentence()
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

        questionController
          .putModify(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

  })

  describe("GET", function () {
    describe("fetch", function () {
      it("should fetch all the questions and return a status code of 200", function (done) {
        const res = {
          statusCode: 500,
          questions: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.questions = data.questions;
          }
        };

        questionController
          .getFetch({}, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.questions).to.be.an("array");
            done();
          });
      });
    });

    describe("fetchLimit", function () {
      it("should fetch at max 10 questions and return a status code of 200", function (done) {
        const req = {
          params: {
            page: 1
          }
        };

        const res = {
          statusCode: 500,
          questions: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.questions = data.questions;
          }
        };

        questionController
          .getFetchLimit(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.questions).to.be.an("array");
            expect(res.questions).to.have.lengthOf.at.most(10);
            done();
          });
      });
    });
  });

  describe("DELETE", function () {
    describe("question", function () {
      it("should delete a question and return a status code of 200", function (done) {
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

        questionController
          .deleteQuestion(req, res, () => {})
          .then(() => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });
  });
});
