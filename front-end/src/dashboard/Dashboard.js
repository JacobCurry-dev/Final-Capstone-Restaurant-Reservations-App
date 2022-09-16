import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsComponent from "./ReservationsComponent";
import ListTables from "./ListTables";
import useQuery from "../utils/useQuery";
import { today, next, previous } from "../utils/date-time";
import { useHistory } from "react-router-dom"
import moment from "moment";

import WomanWithPlate from "../images/WomanWithPlate.jpg";
import FrenchRestaurant from "../images/FrenchRestaurant.jpg";
import CafeBarMenu from "../images/CafeBarMenu.jpg";

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
<>
<div className="container-fluid">
        <div className="row h-100">
          <div className="col">
            <div
              id="carouselExampleIndicators"
              className="carousel slide mb-4"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={WomanWithPlate} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={FrenchRestaurant} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={CafeBarMenu} className="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-target="#carouselExampleIndicators"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-target="#carouselExampleIndicators"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    <main className="text-center">
      <h1 className="text-center">Dashboard</h1>
      <div className="text-center mb-3">
        <h4 className="mb-0">Reservations for {moment(date).format("ddd MMMM Do, YYYY")}</h4>
      </div>
      <div className="center">
      <button className="btn btn-secondary mr-3 mb-3" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Prev.</button>
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
        <hr style={{
          background: 'navy',
          color: 'navy',
          borderColor: 'navy',
          height: '2px',
        }}
        />
      <ListTables tables={tables} loadTables={loadTables} loadDashboard={loadDashboard}/>
      <ErrorAlert error={reservationsError} />
    </main>
    </>
  );
}

export default Dashboard;