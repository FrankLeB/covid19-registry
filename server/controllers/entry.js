/**
 * Entry controller
 * @author: Francois LeBouthillier
 */
const moment = require("moment");
const excel = require("node-excel-export");

const Entry = require("../models/entry");
const EntryAnswer = require("../models/entry-answer");
const User = require("../models/user");
const Question = require("../models/question");

const errorHandler = require("../middleware/error-handler");

/**
 * Fetch the latest entry of a user
 *
 * @param {number} req.params.id The id of the user to fetch the entry
 * @return {Object} The entry and the user info
 */
exports.getFetchLatestByUserId = async (req, res, next) => {
  const id = req.params.id;

  try {
    const entry = await Entry.fetchLatestByUserId(id);

    if (entry) {
      const questions = await EntryAnswer.fetchByEntryId(entry.id);
      entry.questions = questions;
    }

    const user = await User.fetchById(id);
    if (!user) {
      const error = new Error(`Could not find user with id: ${id}`);
      throw error;
    }

    return res.status(200).json({
      entry,
      user
    });
  } catch (err) {
    return next(errorHandler(err, "/entry", "getFetchLatestByUserId"));
  }
};

/**
 * Fetch all entries of a user
 *
 * @param {number} req.params.id The id of the user to fetch entries
 * @return {Object} The entries and the user info
 */
exports.getFetchAllByUserId = async (req, res, next) => {
  const id = req.params.id;

  try {
    const entries = await Entry.fetchAllByUserId(id);

    for (let i = 0; i < entries.length; i++) {
      const questions = await EntryAnswer.fetchByEntryId(entries[i].id);
      entries[i].questions = questions;
    }

    let user = await User.fetchById(id);
    if (!user) {
      const error = new Error(`User with id: ${id} not found.`);
      throw error;
    }

    return res.status(200).json({
      entries,
      user
    });
  } catch (err) {
    return next(errorHandler(err, "/entry", "getFetchAllByUserId"));
  }
};

/**
 * Fetch all the users that are late for taking their temperature.
 * Once someone enters a municipal building, they have to report to the station
 * every 5 hours to take back their temperature.
 *
 * @return {Object} All the users that are currently late
 */
exports.getFetchLateStatus = async (req, res, next) => {
  const today = moment().format("YYYY-MM-DD 00:00:00");
  const deadline = moment().subtract(5, "hours");

  try {
    const users = await Entry.fetchSingleUserIdByDate(today);
    const late = [];

    for (let i = 0; i < users.length; i++) {
      let lastEntry = await Entry.fetchLatestByUserId(users[i]);

      if (!lastEntry) {
        throw new Error(`Could not fetch latest entry for userId: ${users[i]}`);
      }

      // If the entry is past the deadline
      if (deadline.isSameOrAfter(moment(lastEntry.entryDate))) {
        // Fetch employee info for table display on front end
        const user = await User.fetchById(users[i]);

        if (!user) {
          const error = new Error(`Could not find user with id: ${users[i]}`);
          throw error;
        }

        lastEntry.name = user.name;
        lastEntry.image = user.image;
        late.push(lastEntry);
      }
    }

    return res.status(200).json({
      users: late
    });
  } catch (err) {
    return next(errorHandler(err, "/entry", "getFetchLateStatus"));
  }
};

/**
 * Fetch all entries in a date range
 *
 * @param {string} req.query.dateStart Start date of the range
 * @param {string} req.query.dateEnd End date of the range
 * @return {Object} Every entries in the provided range
 */
exports.getFetchAllEntries = async (req, res, next) => {
  const dateStart = req.query.dateStart;
  const dateEnd = req.query.dateEnd;

  if (!dateStart || !dateEnd) {
    const error = new Error("Missing Parameters");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const entries = await fetchAllEntriesInRange(dateStart, dateEnd);

    return res.status(200).json({
      entries
    });
  } catch (err) {
    return next(errorHandler(err, "/entry", "getFetchAllEntries"));
  }
};

/**
 * Export all entries in a date range to an Excel xlsx file
 *
 * @param {string} req.query.dateStart Start date of the range
 * @param {string} req.query.dateEnd End date of the range
 * @return {Blob} The xlsx file
 */
exports.getExportExcelAllEntries = async (req, res, next) => {
  const dateStart = req.query.dateStart;
  const dateEnd = req.query.dateEnd;

  if (!dateStart || !dateEnd) {
    const error = new Error("Missing Parameters");
    error.statusCode = 400;
    return next(error);
  }

  // Header name style
  const styles = {
    header: {
      font: {
        color: {
          rgb: "00000000"
        },
        sz: 14,
        bold: true,
        underline: false
      }
    }
  };

  // Link between data property name and excel column names
  const specification = {
    user: {
      displayName: "User",
      headerStyle: styles.header,
      cellStyle: null,
      width: 140
    },
    entryDate: {
      displayName: "Date",
      headerStyle: styles.header,
      cellStyle: null,
      width: 140
    },
    temperature: {
      displayName: "Temperature",
      headerStyle: styles.header,
      cellStyle: null,
      width: 100
    },
    amountOfNo: {
      displayName: '# of "NO"',
      headerStyle: styles.header,
      cellStyle: null,
      width: 85
    },
    amountOfYes: {
      displayName: '# of "YES"',
      headerStyle: styles.header,
      cellStyle: null,
      width: 85
    }
  };

  try {
    const entries = await fetchAllEntriesInRange(dateStart, dateEnd);

    const report = excel.buildExport([
      {
        name: "Report",
        merges: null,
        specification: specification,
        data: entries
      }
    ]);

    res.attachment("report.xlsx");
    return res.send(report);
  } catch (err) {
    return next(errorHandler(err, "/entry", "getExportExcelAllEntries"));
  }
};

/**
 * Fetch the number of times each user went to the station to take their
 * temperature per days in a date range
 *
 * @param {string} req.query.dateStart Start date of the range
 * @param {string} req.query.dateEnd End date of the range
 * @return {Object} Every entries in the provided range
 */
exports.getFetchSumEntries = async (req, res, next) => {
  const dateStart = req.query.dateStart;
  const dateEnd = req.query.dateEnd;

  if (!dateStart || !dateEnd) {
    const error = new Error("Missing Parameters");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const entries = await fetchSumEntriesInRange(dateStart, dateEnd);

    return res.status(200).json({
      entries
    });
  } catch (err) {
    return next(errorHandler(err, "/entry", "getFetchSumEntries"));
  }
};

/**
 * Export the number of times each employee/contractor went to the station to
 * take their temperature per days in a date range to an Excel xlsx file
 *
 * @param {string} req.query.dateStart Start date of the range
 * @param {string} req.query.dateEnd End date of the range
 * @return {Blob} The xlsx file
 */
exports.getExportExcelSumEntries = async (req, res, next) => {
  const dateStart = req.query.dateStart;
  const dateEnd = req.query.dateEnd;

  if (!dateStart || !dateEnd) {
    const error = new Error("Missing Parameters");
    error.statusCode = 400;
    return next(error);
  }

  // Header name style
  const styles = {
    header: {
      font: {
        color: {
          rgb: "00000000"
        },
        sz: 14,
        bold: true,
        underline: false
      }
    }
  };

  // Link between data property name and excel column names
  const specification = {
    user: {
      displayName: "User",
      headerStyle: styles.header,
      cellStyle: null,
      width: 140
    },
    entryDate: {
      displayName: "Date",
      headerStyle: styles.header,
      cellStyle: null,
      width: 140
    },
    numberOfEntries: {
      displayName: "# of entries",
      headerStyle: styles.header,
      cellStyle: null,
      width: 85
    }
  };

  try {
    const entries = await fetchSumEntriesInRange(dateStart, dateEnd);

    const report = excel.buildExport([
      {
        name: "Report",
        merges: null,
        specification: specification,
        data: entries
      }
    ]);

    res.attachment("report.xlsx");
    return res.send(report);
  } catch (err) {
    return next(errorHandler(err, "/entry", "getExportExcelSumEntries"));
  }
};

/**
 * Insert an entry to the database
 *
 * @param {number} req.body.userId The user concerned
 * @param {number} req.body.temperature Their temperature
 * @param {string} req.body.entryDate The date for the entry
 * @param {Question[]} req.body.questions The answers to all the questions
 * @return {Object} An object with a result property
 */
exports.postAdd = async (req, res, next) => {
  const userId = req.body.userId;
  const temperature = req.body.temperature;
  const entryDate = moment(req.body.entryDate).format("YYYY-MM-DD HH:mm:ss");
  const questions = req.body.questions;

  const entry = new Entry(null, userId, temperature, entryDate);

  try {
    const [result] = await entry.save();
    const entryId = result.insertId;

    for (let i = 0; i < questions.length; i++) {
      const ea = new EntryAnswer(
        null,
        entryId,
        questions[i].question,
        questions[i].answer
      );
      await ea.save();
    }

    return res.status(201).json({
      result: "success"
    });
  } catch (err) {
    return next(errorHandler(err, "/entry", "postAdd"));
  }
};

/**
 * Update en existing entry in the database
 *
 * @param {number} req.body.id The id of the entry
 * @param {number} req.body.userId The user concerned
 * @param {number} req.body.temperature Their temperature
 * @param {string} req.body.entryDate The date for the entry
 * @param {Question[]} req.body.questions The answers to all the questions
 * @return {Object} An object with a result property
 */
exports.putModify = async (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const temperature = req.body.temperature;
  const entryDate = moment(req.body.entryDate).format("YYYY-MM-DD HH:mm:ss");
  const questions = req.body.questions;

  const entry = new Entry(id, userId, temperature, entryDate);

  try {
    await entry.update();

    for (let i = 0; i < questions.length; i++) {
      const ea = new EntryAnswer(
        questions[i].id,
        id,
        questions[i].question,
        questions[i].answer
      );
      await ea.update();
    }

    return res.status(200).json({
      result: "success"
    });
  } catch (err) {
    return next(errorHandler(err, "/entry", "putModify"));
  }
};

/**
 * Delete an entry from the database
 *
 * @param {number} req.params.id The id of the entry
 * @return {Object} An object with a result property
 */
exports.deleteEntry = async (req, res, next) => {
  const id = req.params.id;
  const entry = new Entry(id);
  const ea = new EntryAnswer(null, id);

  try {
    await entry.delete();
    await ea.deleteByEntryId();

    return res.status(200).json({
      result: "success"
    });
  } catch (err) {
    return next(errorHandler(err, "/entry", "deleteEntry"));
  }
};

/**
 * Local function to fetch all the entries in a provided range
 *
 * @param {string} start Start date of the range
 * @param {string} end End date of the range
 * @return {Promise<Entry[]>} All the entries
 */
async function fetchAllEntriesInRange(start, end) {
  let result = [];

  const entries = await Entry.fetchAllInRange(start, end);

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    const answers = await EntryAnswer.fetchByEntryId(entry.id);
    let amountOfNo = 0,
      amountOfYes = 0;
    for (let j = 0; j < answers.length; j++) {
      if (answers[j].answer) {
        amountOfYes++;
      } else {
        amountOfNo++;
      }
    }

    let user = await User.fetchById(entry.userId);
    if (user) {
      result.push({
        user: user.name,
        entryDate: moment(entry.entryDate).format("YYYY-MM-DD HH:mm:ss"),
        temperature: entry.temperature,
        amountOfNo: amountOfNo,
        amountOfYes: amountOfYes
      });
    }
  }

  return result;
}

/**
 * Local function to fetch the number of times each user went to the station
 * to take their temperature per days in a date range
 *
 * @param {string} start Start date of the range
 * @param {string} end End date of the range
 * @return {Promise<Entry[]>} All the entries
 */
const fetchSumEntriesInRange = async (start, end) => {
  let result = [];
  let current = moment(start);
  let last = moment(end);

  while (current < last) {
    const startOfDay = current.format("YYYY-MM-DD 01:00:00");
    const endOfDay = current.format("YYYY-MM-DD 23:59:00");

    const entries = await Entry.fetchSumInRange(startOfDay, endOfDay);

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];

      let user = await User.fetchById(entry.userId);
      if (user) {
        result.push({
          user: user.name,
          entryDate: current.format("YYYY-MM-DD"),
          numberOfEntries: entry.numberOfEntries
        });
      }
    }

    current = current.add(1, "days");
  }

  return result;
};
