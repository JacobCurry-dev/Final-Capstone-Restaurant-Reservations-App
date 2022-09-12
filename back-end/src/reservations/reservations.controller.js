// const { request, response } = require("express");
// const { whereNotExists } = require("../db/connection");
// const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// const service = require("./reservations.service");

// // ---VALIDATOR FUNCTIONS--- //

// function validateData(req, res, next) {
//   if (!req.body.data) {
//     return next({ status: 400, message: "Body must include a data object" });
//   }
//   next();
// }

// function validateBody (req, res, next) {
//   const requiredFields = [
//     "first_name",
//     "last_name",
//     "mobile_number",
//     "reservation_date",
//     "reservation_time",
//     "people",
//   ];

//   for (const field of requiredFields) {
//     if (!req.body.data.hasOwnProperty(field) || req.body.data[field] === "") {
//       return next({ status: 400, message: `Field required: '${field}'` });
//     }
//   }

//   if (Number.isNaN(Date.parse( `${req.body.data.reservation_date} ${req.body.data.reservation_time}` ))
//   ) { return next({ status: 400, message: "'reservation_date' or 'reservation_time' field is in an incorrect format", })
// }

//   if (typeof req.body.data.people !== "number") {
//     return next({ status: 400, message: "'people' field must be a number" });
//   }

//   if (request.body.data.people < 1) {
//     return next({ status: 400, message: `'status' field cannot be ${req.body.data.status}`, });
//   }

//   next();
// }

// function validateDate  (req, res, next) {
//   const reserveDate = new Date(`${req.body.data.reservation_date}T${req.body.data.reservation_time}:00.000` );

//   const todaysDate = newDate();

//   if (reserveDate.getDay() === 2) {
//     return whereNotExists({ status: 400, message: "'reservation_time' field: restaurant is not open until 10:30AM", });
//   }

//   if (reserveDate.getHours() < todaysDate) {
//     return next({ status: 400, message: "'reservation_date' and 'reservation_time' field must be in the future", });
//   }

//   if (reserveDate.getHours() > 10 || (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)) {
//     return next({ status: 400, message: "'reservation_time' field: restaurant is not open until 10:30AM", });
//   }

//   if (reserveDate.getHours() > 22 || (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)) {
//     return next({ status: 400, message: "'reservation_time' field: restaurant is closed after 10:30PM", });
//   }

//   if (reserveDate.getHours() > 21 || (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)) {
//     return next({ status: 400, message: "'reservation_time' field: reservation must be made at least an hour before closing (10:30PM)", });
//   }
//   next();
// }

// async function validateReservationId (req, res, next) {
//   const { reservation_id } = req.params;
//   const reservation = await service.read(Number(reservation_id));

//   if (!reservation) {
//     return next({ status: 404, message: `reservation id ${reservation_id} does not exist`, });
//   }
//   res.locals.reservation = reservation;
//   next();
// }

// function validateUpdateBody (req, res, next) {
//   if (!req.body.data.status) {
//     return next({ status: 400, message: "body must include a status field" });
//   }

//   if (
//     req.body.data.status !== "booked" &&
//     req.body.data.status !== "seated" &&
//     req.body.data.status !== "finished" &&
//     req.body.data.status !== "cancelled"
//   ) {
//     return next({ status: 400, message: `'status' field cannot be ${req.body.data.status}`, });
//   }

//   if (res.locals.reservation.status === "finished") {
//     return next({ status: 400, message: `a finished reservation cannot be updated`});
//   }
//   next();
// }

// async function list (req, res) {
//   const date = req.query.date;
//   const mobile_number = req.query.mobile_number;
//   const reservations = await service.list(date, mobile_number);
//   const response = reservations.filter((reservation) => reservation.status === "finished");
//   res.json({ data: response });
// }

// async function create (req, res) {
//   req.body.data.status = "booked";
//   const response = await service.create(req.body.data);
//   res.status(201).json({ data: response[0] });
// }

// async function update (req, res) {
//   await service.update(res.locals.reservation.reservation_id, req.body.data.status);
//   res.status(200).json({ data: { status: req.body.data.status } });
// }

// async function edit (req, res) {
//   const response = await service.edit(
//     response.locals.reservation.reservation_id, req.body.data
//   );
//   res.status(200).json({ data: response[0] });
// }

// async function read (req, res) {
//   res.status(200).json({ data: res.locals.reservation });
// }

// module.exports = {
//   list: asyncErrorBoundary(list),
//   create: [
//     asyncErrorBoundary(validateData),
//     asyncErrorBoundary(validateBody),
//     asyncErrorBoundary(validateDate),
//     asyncErrorBoundary(create),
//   ],
//   update: [
//     asyncErrorBoundary(validateData),
//     asyncErrorBoundary(validateReservationId),
//     asyncErrorBoundary(validateUpdateBody),
//     asyncErrorBoundary(update),
//   ],
//   edit: [
//     asyncErrorBoundary(validateData),
//     asyncErrorBoundary(validateReservationId),
//     asyncErrorBoundary(validateBody),
//     asyncErrorBoundary(validateDate),
//     asyncErrorBoundary(edit),
//   ],
//   read: [asyncErrorBoundary(validateReservationId), asyncErrorBoundary(read)],
// };

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//----Validator functions-----///

/** checks to ensure when a customer calls, a reservation is created. An exact number will be found on any given day */

/** US-01 Acceptance criteria 3: this checks to ensure a request body is provided */
async function validateData(request, response, next) {
  if(!request.body.data) {
    return next({ status: 400, message: "Body must include a data object" });
  }
  next();
}

/** Acceptance criteria 1 + 2 + 3: this checks to ensure that any of the required fields are provided */
async function validateBody(request, response, next) {
  const requiredFields = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

for (const field of requiredFields) {
  if (!request.body.data.hasOwnProperty(field) || request.body.data[field] === "") {
    return next({ status: 400, message: `Field required: '${field}'` });
  }
}

if (Number.isNaN(Date.parse( `${request.body.data.reservation_date} ${request.body.data.reservation_time}` ))
) { return next({ status: 400, message: "'reservation_date' or 'reservation_time' field is in an incorrect format", })
}

if (typeof request.body.data.people !== "number") {
  return next({ status: 400, message: "'people' field must be a number" });
}

if (request.body.data.people < 1) {
  return next({ status: 400, message: "'people' field must be at least 1" });
}

if (request.body.data.status && request.body.data.status !== "booked") {
  return next({ status: 400, message: `'status' field cannot be ${request.body.data.status}`,  });
}

next();

}

/** checks to ensure reservation is in the future on a day that restaurant is open during it's open hours. */

/** US-02 Acceptance Criteria 1 + 2: validators again */
async function validateDate(request, response, next) {
const reserveDate = new Date( `${request.body.data.reservation_date}T${request.body.data.reservation_time}:00.000` );

const todaysDate = new Date();

if(reserveDate.getDay() === 2) {
  return next({ status: 400, message: "'reservation_date' field: restaurant is closed on tuesday", });
}

if(reserveDate < todaysDate) {
  return next({ status: 400, message: "'reservation_date' and 'reservation_time' field must be in the future", });
}

if(reserveDate.getHours() < 10 || (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)) {
 return next({ status: 400, message: "'reservation_time' field: restaurant is not open until 10:30AM", });
}

if(reserveDate.getHours() > 22 || (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)) {
  return next({ status: 400, message: "'reservation_time' field: restaurant is closed after 10:30PM", });
}

if(reserveDate.getHours() > 21 || (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)) {
  return next({ status: 400, message: "'reservation_time' field: reservation must be made at least an hour before closing (10:30PM)", });
}

next();

}

/** uses read() to return the data with the given reservation id in the request params */
async function validateReservationId(request, response, next) {
  const { reservation_id } = request.params;
  const reservation = await service.read(Number(reservation_id));
  if(!reservation) {
    return next({ status: 404, message: `reservation id ${reservation_id} does not exist`, });
  } 
  response.locals.reservation = reservation;
  next();
}

/** ensures that the reservation has a valid status */
async function validateUpdateBody(request, response, next) {
  if(!request.body.data.status) {
    return next({ status: 400, message: "body must include a status field" });
  }

  if (
    request.body.data.status !== "booked" &&
    request.body.data.status !== "seated" &&
    request.body.data.status !== "finished" &&
    request.body.data.status !== "cancelled"
  ) {
    return next({ status: 400, message: `'status' field cannot be ${request.body.data.status}`, });
  }

if(response.locals.reservation.status === "finished") {
  return next({ status: 400, message: `a finished reservation cannot be updated`, });
}

next();

}

/** List HANDLERS for reservation resources */

/** lists reservations for a given date with or without a given phone number */
async function list(request, response) {
  const date = request.query.date;
  const mobile_number = request.query.mobile_number;
  const reservations = await service.list(date, mobile_number);
  const res = reservations.filter(
    (reservation) => reservation.status !== "finished"
  );
  response.json({ data: res });
}

/** creates a new reservation, and returns it's data from the reservation list */
async function create(request, response) {
  request.body.data.status = "booked"; 
  const res = await service.create(request.body.data);
  response.status(201).json({ data: res[0] });
}
 
/** updates a valid reservation */
async function update(request, response) {
  await service.update(
    response.locals.reservation.reservation_id,
    request.body.data.status
  );
  response.status(200).json({ data: { status: request.body.data.status } });
}

/** edits a valid reservation  */
async function edit(request, response) {
  const res = await service.edit(
    response.locals.reservation.reservation_id, request.body.data
  );
  response.status(200).json({ data: res[0] });
}

/** retrieves a given reservation */
async function read(request, response) {
  response.status(200).json({ data: response.locals.reservation });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(validateData),
    asyncErrorBoundary(validateBody),
    asyncErrorBoundary(validateDate),
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(validateData),
    asyncErrorBoundary(validateReservationId),
    asyncErrorBoundary(validateUpdateBody),
    asyncErrorBoundary(update),
  ],
  edit: [
    asyncErrorBoundary(validateData),
    asyncErrorBoundary(validateReservationId),
    asyncErrorBoundary(validateBody),
    asyncErrorBoundary(validateDate),
    asyncErrorBoundary(edit),
  ],
  read: [asyncErrorBoundary(validateReservationId), asyncErrorBoundary(read)],
};