# react-tutorial-crud
Simple CRUD for use with react tutorial tuesdays.

## setup

Clone the repo, create a pet shop database and dogs table, run the server. Simple as that!

### postgres

```
psql

CREATE DATABASE petshop;

\c petshop

CREATE TABLE dogs(
id SERIAL PRIMARY KEY,
name VARCHAR(50) UNIQUE,
breed VARCHAR(50),
age INTEGER,
gender VARCHAR(1),
notes VARCHAR(255));
```

### node

```
git clone https://github.com/RotaryTiger/react-tutorial-crud.git

npm install

npm start
```

The server runs on port 3001.
