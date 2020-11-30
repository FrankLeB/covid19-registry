/**
 * Entry model
 * @author: Francois LeBouthillier
 */
const db = require("../util/database");

/** @class Entry Represents a single entry of temperature + answer to questions for a user */
module.exports = class Entry {
  /**
   * Create an instance of Entry
   *
   * @constructor
   * @param {number} id The id
   * @param {number} userId The user this entry is for
   * @param {number} temperature The temperature of the employee/contractor
   * @param {string} entryDate The date of the entry
   */
  constructor(id, userId, temperature, entryDate) {
    /** @private */ this.id = id;
    /** @private */ this.userId = userId;
    /** @private */ this.temperature = temperature;
    /** @private */ this.entryDate = entryDate;
  }

  /**
   * Save the instance to the database
   *
   * @return {Promise} Query result
   */
  save() {
    return db.execute(
      "INSERT INTO entries(userId, temperature, entryDate) VALUES(?, ?, ?)",
      [this.userId, this.temperature, this.entryDate]
    );
  }

  /**
   * Update the existing instance in the database
   *
   * @return {Promise} Query result
   */
  update() {
    return db.execute(
      "UPDATE entries SET userId = ?, temperature = ?, entryDate = ? WHERE id = ?",
      [this.userId, this.temperature, this.entryDate, this.id]
    );
  }

  /**
   * Delete the instance from the database
   *
   * @return {Promise} Query result
   */
  delete() {
    return db.execute("DELETE FROM entries WHERE id = ?", [this.id]);
  }

  /**
   * Fetch the last entry of a user
   *
   * @param {number} userId The id of the user
   * @return {Promise<Entry>} The latest entry
   */
  static async fetchLatestByUserId(userId) {
    const [
      entry
    ] = await db.execute(
      "SELECT * FROM entries WHERE userId = ? ORDER BY entryDate DESC LIMIT 1",
      [userId]
    );

    return entry.length > 0 ? entry[0] : null;
  }

  /**
   * Fetch all the entries for a user
   *
   * @param {number} userId The id of the user
   * @return {Promise<Entry[]>} All the entries of the user
   */
  static async fetchAllByUserId(userId) {
    const [
      rows
    ] = await db.execute(
      "SELECT * FROM entries WHERE userId = ? ORDER BY entryDate DESC",
      [userId]
    );

    return rows;
  }

  /**
   * Fetch all the userId that have an entry by a date passed as parameter.
   * Used for the LateStatus module on the frontend
   *
   * @param {string} currentDay The day to check the entries
   * @return {Promise<number[]>} All the userId that have an entry on that date
   */
  static async fetchSingleUserIdByDate(currentDay) {
    const [
      rows
    ] = await db.execute(
      "SELECT userId FROM entries WHERE entryDate > ? GROUP BY userId HAVING COUNT(*) = 1",
      [currentDay]
    );

    return rows.map(e => e.userId);
  }

  /**
   * Fetch all entries in a date range
   *
   * @param {string} start Start of the range
   * @param {string} end End of the range
   * @return {Promise<Entry[]>} All the entries in that range
   */
  static async fetchAllInRange(start, end) {
    const [
      rows
    ] = await db.execute(
      "SELECT * FROM entries WHERE entryDate >= ? AND entryDate <= ?",
      [start, end]
    );

    return rows;
  }

  /**
   * Fetch the number of times by day each users went to take their temperature
   * in a date range
   *
   * @param {string} start Start of the range
   * @param {string} end End of the range
   * @return {Promise<Entry[]>} The number of times by day the users went to take their temperature in that range
   *
   */
  static async fetchSumInRange(start, end) {
    const [
      rows
    ] = await db.execute(
      "SELECT userId, COUNT(userId) AS numberOfEntries FROM entries WHERE entryDate >= ? AND entryDate <= ? GROUP BY userId",
      [start, end]
    );

    return rows;
  }
};
