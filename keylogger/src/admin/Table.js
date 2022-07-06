import React from 'react'

const Table = ({title, data}) => {
    console.log(data)
  return (
    <div>
        <h3>Data table goes here</h3>
        <h5>{title}</h5>
    </div>
  )
}

export default Table
