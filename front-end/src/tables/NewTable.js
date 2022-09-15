// import TableForm from "./TableForm";

// export default function CreateTable() {
//     return (
//         <>
//             <h1>Create a Table</h1>
//             <TableForm />
//         </>
//     )
// }

import { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert";

export default function NewTable(){
    const history = useHistory();
    const [tables, setTables] = useState([])
    const [errors, setErrors] = useState(null)
    const [newTable, setNewTable] = useState({
        table_name: "",
        capacity: "",
    })

    const onChange = (event) => {
    const { target } = event;
    const value = target.value;
    setNewTable({...newTable, [target.name]: value});
    console.log("value", newTable, [target.name], value)
    }

    const submitHandler = (event) => {
    event.preventDefault();
    newTable.capacity = Number(newTable.capacity);
    createTable(newTable)
    .then((updatedTable)=>{
        setTables([...tables,updatedTable])
    })
    .then(() => history.push("/"))
    .catch(setErrors)
    }



    return (
        <form onSubmit={submitHandler}>
            <div>
            <input 
            name="table_name"
            type="string"
            value={newTable.table_name}
            placeholder="Table Name"
            onChange={onChange}
            />
            </div>
            <div>
            <input 
            name="capacity"
            type="number"
            value={newTable.capacity}
            placeholder="Capacity"
            onChange={onChange}
            />
            </div>  
            <button type="submit">Submit</button>          
            <button type="button" onClick={() => history.go(-1)}
            >Cancel</button>     
            <ErrorAlert error={errors}/>     
        </form> 
)
}