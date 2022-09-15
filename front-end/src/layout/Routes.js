// import React, { useEffect, useState } from "react";

// import { Redirect, Route, Switch } from "react-router-dom";
// import Dashboard from "../dashboard/Dashboard";
// import NotFound from "./NotFound";
// import ErrorAlert from "./ErrorAlert";
// import Reservations from "../reservations/Reservations";
// import Search from "../search/Search";
// import TableForm from "../tables/TableForm";

// import { today } from "../utils/date-time";
// import { listReservations, listTables } from "../utils/api";
// import useQuery from "../utils/useQuery";
// import Credits from "../site/Credits";


// // import TableList from "../tables/TableList";

// /**
//  * Defines all the routes for the application.
//  *
//  * You will need to make changes to this file.
//  *
//  * @returns {JSX.Element}
//  */
//  function Routes() {
//   const query = useQuery();
//   let dateQuery = query.get("date");
//   let date = today();
//   if (dateQuery) date = dateQuery;

//   const [reservations, setReservations] = useState([]);

//   const [tables, setTables] = useState([]);
//   const [errors, setErrors] = useState(null);

//   useEffect(() => {
//     async function loadReservationsAndTables() {
//       const abortController = new AbortController();
//       try {
//         const newReservations = await listReservations({ date });
//         const newTables = await listTables();
//         setReservations([...newReservations]);
//         setTables([...newTables]);
//       } catch (e) {
//         setErrors(e);
//       }
//       return () => abortController.abort();
//     }
//     loadReservationsAndTables();
//   }, [date]);

//   return (
//     <Switch>
//       <Route exact={true} path="/">
//         <Redirect to={"/dashboard"} />
//       </Route>
//       <Route path="/reservations">
//         <ErrorAlert errors={errors} />
//         <Reservations
//           setReservations={setReservations}
//           reservations={reservations}
//           tables={tables}
//         />
//       </Route>
//       <Route path="/dashboard">
//         <Dashboard
//           date={date}
//           reservations={reservations}
//           tables={tables}
//           setReservations={setReservations}
//           setTables={setTables}
//         />
//       </Route>
//       <Route path="/tables/new">
//         <TableForm
//           reservations={reservations}
//           tables={tables}
//           setReservations={setReservations}
//           setTables={setTables}
//         />
//       </Route>
//       <Route path="/credits">
//         <Credits />
//       </Route>

//       <Route path="/search">
//         <Search />
//       </Route>

//       <Route>
//         <NotFound />
//       </Route>
//     </Switch>
//   );
// }

// export default Routes;

import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservationsComponent from "../newReservations/NewReservationsComponent";
import NewTable from "../tables/NewTable";
import SeatComponent from "../newReservations/SeatComponent";
import SearchComponent from "../newReservations/SearchComponent"
import EditReservationsComponent from "../newReservations/EditReservationsComponent";
import useQuery from "../utils/useQuery";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery()
  const date = query.get("date") || today()
  
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} />
      </Route>
      <Route path="/reservations/new">
        <NewReservationsComponent />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatComponent />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/search">
        <SearchComponent/>
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservationsComponent />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;