/**
 * Entry Answer model
 * @author: Francois LeBouthillier
 */
const db = require("../util/database");

/** @class EntryAnswer represents the answer to questions for the entries */
module.exports = class EntryAnswer {
  /**
   * Create an instance of EntryAnswer
   *
   * @constructor
   * @param {number} id The id
   * @param {number} entryId The id of the entry
   * @param {string} question The question
   * @param {boolean} answer The answer to the question
   */
  constructor(id, entryId, question, answer) {
    this.id = id;
    this.entryId = entryId;
    this.question = question;
    this.answer = answer;
  }

  /**
   * Save the instance to the database
   *
   * @return {Promise} Query result
   */
  save() {
    return db.execute(
      "INSERT INTO entry_answers(entryId, question, answer) VALUES(?, ?, ?)",
      [this.entryId, this.question, this.answer]
    );
  }

  /**
   * Update the existing instance in the database
   *
   * @return {Promise} Query result
   */
  update() {
    return db.execute(
      "UPDATE entry_answers SET entryId = ?, question = ?, answer = ? WHERE id = ?",
      [this.entryId, this.question, this.answer, this.id]
    );
  }

  /**
   * Delete the instance from the database
   *
   * @return {Promise} Query result
   */
  delete() {
    return db.execute("DELETE FROM entry_answers WHERE id = ?", [this.id]);
  }

  /**
   * Delete all the answers of an entry
   *
   * @return {Promise} Query result
   */
  deleteByEntryId() {
    return db.execute("DELETE FROM entry_answers WHERE entryId = ?", [
      this.entryId
    ]);
  }

  /**
   * Fetch all the answers of an entry
   *
   * @return {Promise<EntryAnswer[]>} All the answers
   */
  static async fetchByEntryId(entryId) {
    const [
      rows
    ] = await db.execute("SELECT * FROM entry_answers WHERE entryId = ?", [
      entryId
    ]);

    return rows;
  }
};
