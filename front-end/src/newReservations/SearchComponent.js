import { useState } from "react";
import { useHistory } from "react-router-dom";
import {  listReservations } from "../utils/api";
import ReservationsComponent from "../dashboard/ReservationsComponent";

export default function SearchComponent(){  
  const history = useHistory();
  const [formData, setFormData] = useState({})
  const [reservations, setReservations] = useState([])
  const [searched, setSearched] = useState(false)

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSearched(true)
    const abortController = new AbortController();
    listReservations( formData, abortController.signal )
    .then((response)=>setReservations(response))
    .catch((error)=>console.log(error));
    return () => abortController.abort()
  };

  return (
    <>
    <form
    onSubmit={submitHandler}
    >
      <div className="card">
        <div className="card-body text-center">
      <div className="card-title">Mobile Number</div> 
      <input onChange={handleChange} 
      type="search" 
      name="mobile_number" 
      placeholder="Mobile Number" 
      required></input> 
      <button type="submit" className="btn btn-success ml-3">Find</button>
      <button className="btn btn-danger ml-3" type="button"
        onClick={() => history.push("/")}
        >Cancel</button>
      </div>
      </div>
    </form>
    <div>
    {reservations.length !== 0 ? <ReservationsComponent reservations={reservations}/> : null}  
    {searched === true && reservations.length === 0 ? `No reservations found with this phone number` : null}
    </div>
    </>
  )
}