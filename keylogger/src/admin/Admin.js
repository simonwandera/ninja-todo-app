import React from 'react'
import Table from './Table'

const Admin = () => {
  return (
    <div>
        <h1>Admin Page</h1>
        <Table data = {data} title = "All the keystrokes are listed below"/>
    </div>
  )
}

export default Admin
