/**
 * Question model
 * @author: Francois LeBouthillier
 */
const db = require("../util/database");

/** @class Question Represents a question to ask when registring an entry for a user */
module.exports = class Question {
  /**
   * Create an instance of Question
   *
   * @constructor
   * @param {number} id The id
   * @param {string} question The question
   */
  constructor(id, question) {
    /** @private */ this.id = id;
    /** @private */ this.question = question;
  }

  /**
   * Save the instance to the database
   *
   * @return {Promise} Query result
   */
  save() {
    return db.execute("INSERT INTO questions(question) VALUES(?)", [
      this.question
    ]);
  }

  /**
   * Update the existing instance in the database
   *
   * @return {Promise} Query result
   */
  update() {
    return db.execute(
      "UPDATE questions SET question = ? WHERE id = ?",
      [this.question, this.id]
    );
  }

  /**
   * Delete the instance from the database
   *
   * @return {Promise} Query result
   */
  delete() {
    return db.execute("DELETE FROM questions WHERE id = ?", [
      this.id
    ]);
  }

  /**
   * Fetch all the questions in the database
   *
   * @return {Promise<Question[]>} All the questions
   */
  static async fetch() {
    const [rows] = await db.execute("SELECT * FROM questions");
    return rows;
  }

  /**
   * Fetch at max 10 entries of questions in the database
   *
   * @param {number} offset The offset for fetching the 10 entries
   * @return {Promise<Question[]>} At max 10 entries of questions
   */
  static async fetchLimit(offset) {
    const [
      rows
    ] = await db.execute(
      "SELECT * FROM questions ORDER BY question LIMIT 10 OFFSET ?",
      [`${offset}`]
    );

    return rows;
  }

  /**
   * Fetch a question by id
   *
   * @param {number} id The id of the question
   * @return {Promise<Question>} The question
   */
  static async fetchById(id) {
    const [
      question
    ] = await db.execute("SELECT * FROM questions WHERE id = ?", [id]);

    return question.length > 0 ? question[0] : null;
  }
};
