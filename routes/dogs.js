const _ = require('underscore');
const router = require('express').Router();
const pgdb = require('pg');
const connection = 'http://localhost:5432/petshop';

/**
 * Returns all dogs, which all of these routes do at some point
 */
function getDogs(client, callback) {
	client.query("SELECT * FROM dogs", function(err, result) {
		if (err) return callback(err);
		else return callback(null, result.rows);
	});
}

/**
 * Builds an update query for the `dogs` table
 */
function buildUpdateQuery(body) {
	let keys = _.keys(body),
	    query_index = 0,
	    query_string = "UPDATE dogs SET ",
	    query_args = [];

	_.each(keys, (key) => {
		++query_index;

		if (query_index > 1) {
			query_string += ", ";
		}

		query_string += key + "=($" + query_index + ")";
		query_args.push(body[key]);
	});

	query_args.push(id);
	query_string += " WHERE id = ($" + ++query_index + ")";

	return {
		query_string: query_string,
		query_args: query_args
	};
}

/**
 * Get all dogs
 */
router.get('/', (req, res) => {
	pgdb.connect(connection, (err, client, done) => {
		if (err) {
			done();
			return res.status(500).send({
				error: err,
				message: 'Error connecting to database'
			});
		}

		getDogs(client, (err, dogs) => {
			done();

			if (err) {
				return res.status(500).send({
					error: err,
					message: 'Error getting dogs'
				});
			}

			return res.status(200).send({
				data: dogs,
				message: 'Successfully got dogs'
			});
		});
	});
});

/**
 * Get a single dog by id
 */
router.get('/:dog_id', (req, res) => {
	pgdb.connect(connection, (err, client, done) => {
		if (err) {
			done();
			return res.status(500).send({
				error: err,
				message: 'Error connecting to database'
			});
		}

		let query_string = "SELECT * FROM dogs WHERE id = ($1)";
		let query_args = [req.params.dog_id];

		client.query(query_string, query_args, (err, result) => {
			done();

			if (err) {
				return res.status(500).send({
					error: err,
					message: 'Error getting dog'
				});
			}

			return res.status(200).send({
				data: result.rows[0],
				message: 'Successfully got dog #' + req.params.dog_id
			});
		});
	});
});

/**
 * Create a dog
 */
router.post('/', (req, res) => {
	pgdb.connect(connection, (err, client, done) => {
		if (err) {
			done();
			return res.status(500).send({
				error: err,
				message: 'Error connecting to database'
			});
		}

		let query_string = "INSERT INTO dogs(name, age, breed, gender, notes) VALUES($1, $2, $3, $4, $5)";
		let query_args = [req.body.name, req.body.age, req.body.breed, req.body.gender, req.body.notes];

		client.query(query_string, query_args, (err, result) => {
			if (err) {
				done();
				return res.status(500).send({
					error: err,
					message: 'Error creating dog'
				});
			}

			getDogs(client, (err, dogs) => {
				done();

				if (err) {
					return res.status(500).send({
						error: err,
						message: 'Error getting dogs'
					});
				}

				return res.status(200).send({
					data: dogs,
					message: 'Successfully created dog'
				});
			});
		});
	});
});

/**
 * Update a dog by id
 */
router.put('/:dog_id', (req, res) => {
	pgdb.connect(connection, (err, client, done) => {
		if (err) {
			done();
			return res.status(500).send({
				error: err,
				message: 'Error connecting to database'
			});
		}

		let query = buildUpdateQuery(req.body);

		client.query(query.string, query.args, (err, result) => {
			if (err) {
				done();
				return res.status(500).send({
					error: err,
					query: query,
					message: 'Error updating dog #' + req.params.dog_id
				});
			}

			getDogs(client, (err, dogs) => {
				done();

				if (err) {
					return res.status(500).send({
						error: err,
						message: 'Error getting dogs'
					});
				}

				return res.status(200).send({
					data: dogs,
					message: 'Successfully updated dog'
				});
			});
		});
	});
});

/**
 * Delete a dog by id
 */
router.delete('/:dog_id', (req, res) => {
	pgdb.connect(connection, (err, client, done) => {
		if (err) {
			done();
			return res.status(500).send({
				error: err,
				message: 'Error connecting to database'
			});
		}

		let query_string = "DELETE FROM dogs WHERE id = ($1)";
		let query_args = [req.params.dog_id];

		client.query(query_string, query_args, (err, result) => {
			if (err) {
				return res.status(500).send({
					error: err,
					message: 'Error deleting dog'
				});
			}

			return res.status(200).send({
				message: 'Successfully deleted dog #' + req.params.dog_id
			});
		});
	});
});

module.exports = router;
