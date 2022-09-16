import { updateResStatus } from "../utils/api"

export default function ReservationsComponent({reservations, loadDashboard}){

  function onCancel(e,reservation){
    e.preventDefault()
    if(window.confirm("Do you want to cancel this reservation?")){
      updateResStatus(reservation.reservation_id)
      .then(()=>loadDashboard())
    }
  }


  let reservationsList = reservations.map((reservation) => {
      return (
          <div className="card" key={reservation.reservation_date}>
            <div className="card-body">
             <p className="card-text">Name: {reservation.first_name} {reservation.last_name}</p>
             <p className="card-text">Mobile number: {reservation.mobile_number}</p>
             <p className="card-text">Date of reservation: {reservation.reservation_date}</p>
             <p className="card-text">Time of reservation: {reservation.reservation_time}</p>
             <p className="card-text">Number of guests: {reservation.people} </p>
             <p className="card-text">Reservation ID: {reservation.reservation_id}</p>
             <p className="card-text" data-reservation-id-status={reservation.reservation_id}>Reservation Status: {reservation.status}</p>
             
             { reservation.status!=='seated' ? 
             <a href={`/reservations/${reservation.reservation_id}/seat`}>
             <button className="btn btn-success">Seat</button></a> : null }

             <a href={`/reservations/${reservation.reservation_id}/edit`}>
            <button className="btn btn-primary ml-3">Edit</button>
            </a>

            { reservation.status !== "cancelled" && <button className="btn btn-danger ml-3" data-reservation-id-cancel={reservation.reservation_id} 
            onClick={(e)=>onCancel(e,reservation)}>Cancel</button> }
            </div>
          </div>
      )
  })

  return <div>{reservationsList}</div>
}