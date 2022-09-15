// const { table } = require("../db/connection");
// const knex = require("../db/connection");
// const tableName = "reservations";

// function create(reservation) {
//     return knex(tableName)
//     .insert(reservation)
//     .returning("*")
// }

// function read (reservation_id) {
//     return knex(tableName)
//     .select("*")
//     .where({ reservation_id: reservation_id })
//     .first();
// }

// function update (reservation_id, status) {
//     return knex(tableName)
//     .where({ reservation_id: reservation_id })
//     .update({ ...reservation })
//     .returning("*")
// }

// function edit (reservation_id, reservation) {
//     return knex(tableName)
//     .where({ reservation_id: reservation_id })
//     .update({ ...reservation })
//     .returning("*")
// }

// function list (date, mobile_number) {
//     if (date) {
//         return knex(tableName)
//         .select("*")
//         .where({ reservation_date: date })
//         .orderBy("reservation_time", "asc");
//     }
//     if (mobile_number) {
//         return knex(tableName)
//         .select("*")
//         .where("mobile_number", "like", `${mobile_number}%`);
//     }

//     return knex(tableName)
//     .select("*");
// }

// module.exports = {
//     list,
//     create,
//     read,
//     update,
//     edit,
// };

const { table } = require("../db/connection");
const knex = require("../db/connection");
const tableName = "reservations";

/** creates a new reservation (row) */
function create(reservation) {
    return knex(tableName)
    .insert(reservation) 
    .returning("*")
}

/** reads the data (row) with the given ' reservation_id */
function read(reservation_id) {
return knex(tableName) 
.select("*")
.where({ reservation_id: reservation_id })
.first();
}

/** updates reservation with given reservation_id */
function update(reservation_id, status) {
    return knex(tableName)
    .where({ reservation_id: reservation_id })
    .update({ status: status });
}

/** edits reservation with given reservation_id */
function edit(reservation_id, reservation) {
    return knex(tableName) 
    .where( { reservation_id: reservation_id })
    .update({ ...reservation })
    .returning("*")
}

/** lists all reservations with the given date or mobile number */
// function list(date, mobile_number) {
//     if(date) {
//         return knex(tableName)
//         .select("*")
//         .where({ reservation_date: date })
//         .orderBy("reservation_time", "asc");
//     }

//     if(mobile_number) {
//         return knex(tableName) 
//         .select("*")
//         .where("mobile_number", "like", `${mobile_number}%`);
//     }
//     return knex(tableName)
//     .select("*")
//     .whereNot({ status: "cancelled" });

// }



// function list () {
//     return knex("reservations")
//         .select("*")
//         .orderBy("reservations.reservation_time")
//         // .whereNot({ "reservations.status": "cancelled" });
// }

// function listDate (date) {
//     return knex("reservations")
//         .select("*")
//         .where({ "reservations.reservation_date": date })
//         .whereNot({ "reservations.status": "cancelled" })
//         .whereNot({ "reservations.status": "finished" })
//         .orderBy("reservations.reservation_time");
// }

// function listMobile (mobile) {
//     return knex("reservations")
//         .whereRaw(
//             "translate(mobile_number, '() -', '') like ?",
//             `%${mobile.replace(/\D/g, "")}%` 
//         )
//         .orderBy("reservation_date");
// }

function list(date, mobile_number) {
    if(date) {
        return knex(tableName)
        .select("*")
        .where({ reservation_date: date })
        .orderBy("reservation_time", "asc");
    }

    if(mobile_number) {
        return knex(tableName) 
        .select("*")
        .where("mobile_number", "like", `${mobile_number}%`);
    }
}

module.exports = {
    list,
    create,
    read,
    update,
    edit,
  };