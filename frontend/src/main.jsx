import React, { createContext, useState, StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

export const Context = createContext({
  isAuthorized: false,
  user: null,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch current user when app loads
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/user/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthorized(true);
      })
      .catch(() => {
        setUser(null);
        setIsAuthorized(false);
      });
  }, []);

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

// ✅ Only create the root once
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);


// import React, { createContext, useState ,StrictMode } from 'react'
// //import ReactDOM from "react-dom/client"
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'

// export const Context = createContext({ isAuthorized: false });

// const AppWrapper = () => {
//   const [isAuthorized, setIsAuthorized] = React.useState(false);
//   const [user, setUser] = useState({});

//   return (
//     <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
//       <App />
//     </Context.Provider>
//   )
// };

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AppWrapper />
//   </StrictMode>,
// )