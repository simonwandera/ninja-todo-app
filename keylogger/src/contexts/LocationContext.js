import React, { createContext, useState, useEffect } from 'react'
export const LocationContext = createContext()

function LocationContextProvider(props) {
    // eslint-disable-next-line
    const [location, setLocation] = useState(null)
    useEffect(() => {
        fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0', {
          method: 'GET',
        }).then(responce => {
          if (!responce.ok) {
          } else {
            console.log('You have details')
          }
          return responce.json();
        }).then(data => {
          if (data) {
            setLocation(data)
          }
        }).catch(error => {
          console.log(error.responce, error.status, error.headers)
        })
      }, [])
    const value = { location }
    return (
        <LocationContext.Provider value={value}>
            {props.children}
        </LocationContext.Provider>
    )
}
export default LocationContextProvider