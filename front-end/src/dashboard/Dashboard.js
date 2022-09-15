// import Reservation from "../reservations/Reservation";
// import Table from "../tables/Table";
// import DateNav from "../reservations/DateNav";

// const Dashboard = ({ date, reservations, tables, setTables, setReservations }) => {
//   return (
//     <>
//       <h1 className="text-center">Dashboard</h1>
//       <section>
//         <div className="text-center mb-3">
//           <h4 className="mb-0">Reservations for {date}</h4>
//         </div>

//         {reservations.length > 0 ? (
//           <div className="row row-cols-1 row-cols-md-4">
//           {reservations.map((reservation) => (
//             <Reservation 
//               key={reservation.reservation_id}
//               reservation={reservation}
//               reservations={reservations}
//               setReservations={setReservations}
//               />
//           ))}{" "}
//           </div>
//         ) : (
//           <div className="container-fluid text-center">
//             <h2>No reservations for this date.</h2>
//           </div>
//         )}
//       </section>
//       <nav className="text-center">
//           <DateNav date={date} />
//       </nav>
//       <section>
//           <div className="d-md-flex mb-3">
//             <h4 className="mb-0">All Tables</h4>
//           </div>

//           <table className="table table-color">
//             <thead>
//               <tr>
//                 <th scope="col">Table Name</th>
//                 <th scope="col">Capacity</th>
//                 <th scope="col">Status</th>
//                 <th scope="col">Finish</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tables.map((table) => (
//                 <Table 
//                   key={table.table_id}
//                   table={table}
//                   tables={tables}
//                   setTables={setTables}
//                   />
//               ))}
//             </tbody>
//           </table>
//       </section>
//     </>
//   )
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsComponent from "./ReservationsComponent";
import ListTables from "./ListTables";
import useQuery from "../utils/useQuery";
import { today, next, previous } from "../utils/date-time";
import { useHistory } from "react-router-dom"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const query  = useQuery();
  const date = query.get("date") || today();

  const history = useHistory();

  useEffect(loadDashboard, [date]);
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div>
      {reservations.length !== 0 ? (
      <ReservationsComponent reservations={reservations} 
      loadDashboard={loadDashboard}/>) : 
      (
          `There are no reservations today`
        )}
        </div>
      <button onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
      <button onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
      <button onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
      <ListTables tables={tables} loadTables={loadTables} loadDashboard={loadDashboard}/>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;