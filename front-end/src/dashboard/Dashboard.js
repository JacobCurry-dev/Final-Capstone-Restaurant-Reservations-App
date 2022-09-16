import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsComponent from "./ReservationsComponent";
import ListTables from "./ListTables";
import useQuery from "../utils/useQuery";
import { today, next, previous } from "../utils/date-time";
import { useHistory } from "react-router-dom"
import moment from "moment";

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
      <h1 className="text-center">Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0 text-center">Reservations for {moment(date).format("ddd MMMM Do, YYYY")}</h4>
      </div>
      <div className="center">
      <button className="btn btn-secondary mr-3 mb-3" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
      <button className="btn btn-primary mb-3" onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
      <button className="btn btn-secondary ml-3 mb-3" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
      </div>
      <div>
      {reservations.length !== 0 ? (
      <ReservationsComponent reservations={reservations} 
      loadDashboard={loadDashboard}/>) : 
      (
          `There are no reservations today`
        )}
        </div>
      <ListTables tables={tables} loadTables={loadTables} loadDashboard={loadDashboard}/>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;