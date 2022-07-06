import React, {useMemo} from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import LocationContextProvider from './contexts/LocationContext';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  <LocationContextProvider>
    <App/>
  </LocationContextProvider>
);