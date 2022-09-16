import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, updateTable } from "../utils/api";

export default function SeatComponent(){
const history = useHistory();
const [tableId, setTableId] = useState();
const [tablesError, setTablesError] = useState(null);
const [tables, setTables] = useState([]);

let params = useParams();
let reservation_id = params.reservation_id;

    useEffect(loadTables, []);
    function loadTables() {
      const abortController = new AbortController();
      setTablesError(null);
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
      return () => abortController.abort();
    }

    const onChange = (event) => {
        const { target } = event;
        const value = target.value;

        setTableId(value)
        console.log("line 38", value, [target.name], )
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(tableId){
        updateTable(tableId, reservation_id)
        .then(() => history.push("/")) 
        .catch(setTablesError) ;
        }
    };


    return (
        <div className="card text-center">
            <div className="card-body">
        <form onSubmit={submitHandler}>
            <select id="table_id" value={tableId} required name="table_id" onChange={onChange}>
                <option>--- Select a Table ---</option>
                {tables.map((table) => (
                    <option value={table.table_id} key={table.table_id}>
                        {`${table.table_name} - ${table.capacity}`}
                    </option>
                ))}
            </select>
            <button className="btn btn-success ml-3" type="submit">Submit</button>
            <button className="btn btn-danger ml-3" type="button" onClick={() => history.go(-1)}
            >Cancel</button>
            <ErrorAlert error={tablesError} />
        </form>
        </div>
        </div>
    )
}