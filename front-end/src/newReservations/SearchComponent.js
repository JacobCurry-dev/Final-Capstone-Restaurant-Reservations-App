import { useState } from "react";
import {  listReservations } from "../utils/api";
import ReservationsComponent from "../dashboard/ReservationsComponent";

export default function SearchComponent(){  
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
      <label>Mobile Number</label> 
      <input onChange={handleChange} 
      type="search" 
      name="mobile_number" 
      placeholder="Enter a customer's phone number" 
      required></input> <button type="submit">Find</button>
    </form>
    <div>
    {reservations.length !== 0 ? <ReservationsComponent reservations={reservations}/> : null}  
    {searched === true && reservations.length === 0 ? `No reservations found with this phone number` : null}
    </div>
    </>
  )
}