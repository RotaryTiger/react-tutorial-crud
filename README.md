# react-tutorial-crud
Simple CRUD for use with react tutorial tuesdays.

## setup

Clone the repo, create a pet shop database and dogs table, run the server. Simple as that!

### postgres

Make sure you have a Postgres instance running on http://localhost:5432 that doesn't have a database named "petshop" and run:

`npm run setup`

### node

```
git clone https://github.com/RotaryTiger/react-tutorial-crud.git

npm install

npm start
```

The server runs on port 3001.

### dogs api

example dog object:
```
var dog = {
	id: 1,
	name: 'Bront',
	breed: 'Terrier',
	age: 7,
	gender: 'M',
	notes: 'Extremely a good boy'
};

GET /api/dogs => returns all dogs
GET /api/dogs/{id} => returns dog {id}
POST /api/dogs => create new dog (body = all dog fields except id)
PUT /api/dogs/{id} => update dog {id}
DELETE /api/dogs/{id} => delete dog {id}
```