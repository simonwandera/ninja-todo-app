import React from 'react'

const Table = ({ title, data }) => {
    const columns = data[0] && Object.keys(data[0])
    
    const deleteAll=()=>{
        fetch('https://keylogging.pythonanywhere.com/api/delete_all', {
            method: 'GET',
            body: JSON.stringify(new_values),
            headers: {
                "Contect-Type": "application/json; charset=UTF-8"
            }
        }).then(responce => {
            if (!responce.ok) {
              setMessage("Username already taken. Please pick try a different one")
            }else{
                alert("Account created")
            }
            return responce.json();
        }).then(data => {
          
            data.msg && navigate('/login')
            
        }).catch(error => {
            console.log(error.responce, error.status, error.headers)
        })
    }

    const getLatestLogs=()=>{

    }
    return (
        <div>
            {data.length > 0 && <button className='button mb-5'>Delete all</button>}

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
