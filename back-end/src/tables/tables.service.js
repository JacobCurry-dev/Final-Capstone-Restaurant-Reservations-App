// const knex = require("../db/connection");

// const tableName = "tables";

// function create (table) {
//     return knex(tableName)
//         .insert(table)
//         .returning("*");
// }

// function read (table_id) {
//     return knex(tableName)
//         .select("*")
//         .where({ table_id: table_id })
//         .first();
// }

// function updateReservation (reservation_id, status) {
//     return knex("reservations")
//         .where({ reservation_id: reservation_id })
//         .update({ status: status });
// }

// function list () {
//     return knex(tableName)
//         .select("*");
// }

// function readReservation (reservation_id) {
//     return knex("reservations")
//         .select("*")
//         .where({ reservation_id: reservation_id })
//         .first();
// }

// function occupy (table_id, reservation_id) {
//     return knex(tableName)
//         .where({ table_id: table_id })
//         .update({ reservation_id: reservation_id, status: "occupied" });
// }

// function free (table_id) {
//     return knex(tableName)
//         .where({ table_id: table_id })
//         .update({ reservation_id: null, status: "free" });
// }

// module.exports = {
//     list,
//     create,
//     read,
//     occupy,
//     free,
//     readReservation,
//     updateReservation,
// };

const knex = require("../db/connection");

const tableName = "tables";

/** this creates a new table (row) */
function create(table) {
  return knex(tableName)
    .insert(table)
    .returning("*");
}

/** reads a table given the table_id */
function read(table_id) {
  return knex(tableName)
    .select("*")
    .where({ table_id: table_id })
    .first();
}

/** updates reservation status given the reservation_id */
function updateReservation(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id: reservation_id })
    .update({ status: status });
}

/** this lists all tables. */
function list() {
  return knex(tableName)
    .select("*");
}


/** reads reservation given the reservation_id. */
function readReservation(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

function occupy(table_id, reservation_id) {
  return knex(tableName)
    .where({ table_id: table_id })
    .update({ reservation_id: reservation_id, status: "occupied" });
}

function free(table_id) {
  return knex(tableName)
    .where({ table_id: table_id })
    .update({ reservation_id: null, status: "free" });
}

module.exports = {
  list,
  create,
  read,
  occupy,
  free,
  readReservation,
  updateReservation,
};