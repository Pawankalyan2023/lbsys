CREATE TABLE lbs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookname VARCHAR(50) NOT NULL,
    author VARCHAR(50),
    genre VARCHAR(50),
    language VARCHAR(50),
    publishdate DATE NOT NULL
);
