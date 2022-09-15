import { updateResId } from "../utils/api"

export default function ListTables({tables, loadTables, loadDashboard }){

    function clickHandler(event){
        let tableId = event.target.value
        tableId = Number(tableId)
        if(window.confirm("Is this table ready to seat new guests?")===true){
          updateResId(tableId)
          .then(()=>loadTables())
          .then(()=>loadDashboard())
          .catch(error=>console.log('error',error))
        }
      }

    const list = tables.map((table) => {
        return (
            <div key={table.table_id}>
            <p>{table.table_name}</p>
            <p>{table.table_id}</p>
            <p>{table.table_capacity}</p>
            <p><span data-table-id-status={table.table_id}>
                {table.reservation_id ? 'Occupied' : 'Free'}
            </span></p>
            {table.reservation_id ? <button value={table.table_id} 
            data-table-id-finish={table.table_id} 
            onClick={clickHandler}>Finish</button> : null}
            </div>
        )
    })
    return (<>{list}</>)
}