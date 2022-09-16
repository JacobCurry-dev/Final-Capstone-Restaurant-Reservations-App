import { useHistory } from "react-router"
import { useState } from "react";
import { createRes } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewReservationsComponent(){
    const history = useHistory();
    const [error, setError] = useState(null)
    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    });

const onChange = (event) => {
    const value = event.target.value
    console.log("onChange", value, [event.target.name])
    setReservation({
        ...reservation,
        [event.target.name]: value
    })
}

const submitHandler = (event) => {
event.preventDefault()
reservation.people=Number(reservation.people)
createRes(reservation)
.then(() => {
    history.push(`/dashboard?date=${reservation.reservation_date}`)
})
.catch(setError)
}

    return (
    <>
    <h2 className="text-center">Your Reservation</h2>
    <form onSubmit={submitHandler}>
        <div className="card">
            <div className="card-body text-center">
        <div className="mb-1">
        <input 
        name="first_name"
        type="string"
        placeholder="First Name"
        onChange={onChange}
        />
        </div>
        <div className="mb-1">
        <input 
        name="last_name"
        type="string"
        placeholder="Last Name"
        onChange={onChange}
        />
        </div>
        <div className="mb-1">
        <input 
        name="mobile_number"
        type="string"
        placeholder="Mobile Number"
        onChange={onChange}
        />
        </div>
        <div className="mb-1">
        <input 
        name="reservation_date"
        type="date"
        onChange={onChange}
        value={reservation.reservation_date}
        />
        </div>
        <div className="mb-1">
        <input 
        name="reservation_time"
        type="time"
        onChange={onChange}
        />
        </div>
        <div className="mb-1">
        <input 
        name="people"
        type="number"
        placeholder="Party Size"
        onChange={onChange}
        />
        </div>
        <ErrorAlert error={error} />
        <button className="btn btn-success mr-3" type="submit">Submit</button>
        <button className="btn btn-danger ml-3" type="button"
        onClick={() => history.push("/")}
        >Cancel</button>
        </div>
        </div>
    </form>    
    </>
    )
}