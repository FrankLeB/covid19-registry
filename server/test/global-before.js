require("dotenv").config({ path: __dirname + "/../.env" });
process.env.RUN_MODE = "test";

const db = require("../util/database");

before(function (done) {
  const queries = [];

  queries.push(db.execute("TRUNCATE TABLE entries"));
  queries.push(db.execute("TRUNCATE TABLE entry_answers"));
  queries.push(db.execute("TRUNCATE TABLE questions"));
  queries.push(db.execute("TRUNCATE TABLE users"));
  queries.push(
    db.execute(
      "INSERT INTO users(name, phoneNo) VALUES('test', '(555) 555-5555')"
    )
  );

  Promise.all(queries)
    .then(() => {
      done();
    })
    .catch(err => {
      done(err);
    });
});
