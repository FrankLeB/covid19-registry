/**
 * User model
 * @author: Francois LeBouthillier
 */
const db = require("../util/database");

/** @class User Used to add user to the database so we can take their temperature */
module.exports = class User {
  /**
   * Create an instance of User
   *
   * @constructor
   * @param {number} id The id
   * @param {string} name
   * @param {string} phoneNo A phone number to reach the user when he needs to take his temperature again
   * @param {string} image
   */
  constructor(id, name, phoneNo, image) {
    /** @private */ this.id = id;
    /** @private */ this.name = name;
    /** @private */ this.phoneNo = phoneNo;
    /** @private */ this.image = image;
  }

  /**
   * Save the instance to the database
   *
   * @return {Promise} Query result
   */
  save() {
    return db.execute(
      "INSERT INTO users(name, phoneNo, image) VALUES(?, ?, ?)",
      [this.name, this.phoneNo, this.image]
    );
  }

  /**
   * Update the existing instance in the database
   *
   * @return {Promise} Query result
   */
  update() {
    return db.execute(
      "UPDATE users SET name = ?, phoneNo = ?, image = ? WHERE id = ?",
      [this.name, this.phoneNo, this.image, this.id]
    );
  }

  /**
   * Delete the instance from the database
   *
   * @return {Promise} Query result
   */
  delete() {
    return db.execute("DELETE FROM users WHERE id = ?", [this.id]);
  }

  /**
   * Fetch all the users in the database
   *
   * @return {Promise<User[]>} All the users
   */
  static async fetch() {
    const [rows] = await db.execute("SELECT * FROM users ORDER BY name");
    return rows;
  }

  /**
   * Fetch at max 10 entries of users in the database
   *
   * @param {number} offset The offset for fetching the 10 entries
   * @return {Promise<User[]>} At max 10 entries of users
   */
  static async fetchLimit(offset) {
    const [
      rows
    ] = await db.execute(
      "SELECT * FROM users ORDER BY name LIMIT 10 OFFSET ?",
      [`${offset}`]
    );

    return rows;
  }

  /**
   * Fetch all the users that match the input by name
   *
   * @param {string} value Value to fetch similar in database
   * @return {Promise<User[]>} All the users that match the input
   */
  static async fetchByNameOrBusiness(value) {
    const [
      rows
    ] = await db.execute(
      "SELECT * FROM users WHERE name LIKE ? ORDER BY name",
      [`%${value}%`]
    );

    return rows;
  }

  /**
   * Fetch a user by id
   *
   * @param {number} id
   * @return {Promise<User>} The user
   */
  static async fetchById(id) {
    const [user] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);

    return user.length > 0 ? user[0] : null;
  }

  /**
   * Fetch all users where their name or id matches the input
   *
   * @param {string} input Input to match
   * @return {Promise<User[]>} All users that matches the input
   */
  static async findByNameAndId(input) {
    const [
      rows
    ] = await db.execute(
      "SELECT * FROM users WHERE CONCAT(name, ' - ', id) LIKE ?",
      [`%${input}%`]
    );

    return rows;
  }

  /**
   * Fetch the image filename for a user by id
   *
   * @param {number} id The user id
   * @return {Promise<string>} The image filename
   */
  static async fetchImageFilenameById(id) {
    const [rows] = await db.execute("SELECT image FROM users WHERE id = ?", [
      id
    ]);

    return rows.length > 0 ? rows[0] : null;
  }
};
