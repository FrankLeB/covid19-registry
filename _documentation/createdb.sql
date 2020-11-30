CREATE TABLE entries(
  id INT AUTO_INCREMENT,
  userId INT,
  temperature DECIMAL(9, 2),
  entryDate DATETIME,
  PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE questions(
  id INT AUTO_INCREMENT,
  question TEXT,
  PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE entry_answers(
  id INT AUTO_INCREMENT,
  entryId INT,
  question TEXT,
  answer BOOLEAN,
  PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE users(
  id INT AUTO_INCREMENT,
  name VARCHAR(60),
  phoneNo VARCHAR(15),
  image TEXT,
  PRIMARY KEY(id)
) ENGINE=INNODB;
