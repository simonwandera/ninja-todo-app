import React from 'react'

const Table = ({ title, data }) => {
    const columns = data[0] && Object.keys(data[0])
    console.log(data)
    return (
        <div>
            <button className='button mb-5'>Delete all</button>
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
            </table>
        </div>
    )
}

export default Table
