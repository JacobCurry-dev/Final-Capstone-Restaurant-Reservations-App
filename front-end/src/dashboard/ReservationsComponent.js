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
          <div key={reservation.reservation_date}>
             <p>Name: {reservation.first_name} {reservation.last_name}</p>
             <p>Mobile number: {reservation.mobile_number}</p>
             <p>Date of reservation: {reservation.reservation_date}</p>
             <p>Time of reservation: {reservation.reservation_time}</p>
             <p>Number of guests: {reservation.people} </p>
             <p>Reservation ID: {reservation.reservation_id}</p>
             <p data-reservation-id-status={reservation.reservation_id}>Reservation Status: {reservation.status}</p>
             
             { reservation.status!=='seated' ? 
             <a href={`/reservations/${reservation.reservation_id}/seat`}>
             <button type="button">Seat</button></a> : null }

             <a href={`/reservations/${reservation.reservation_id}/edit`}>
            <button>Edit</button>
            </a>

            <button data-reservation-id-cancel={reservation.reservation_id} 
            onClick={(e)=>onCancel(e,reservation)}>Cancel</button>
          </div>
      )
  })

  return <div>{reservationsList}</div>
}