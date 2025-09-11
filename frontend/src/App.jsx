import React, { useEffect, useContext } from 'react';
import './App.css';
import { Context } from './main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NavBar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Jobs from './components/Job/Jobs';
import JobDetails from './components/Job/jobDetails';
import PostJob from './components/Job/PostJob';
import MyJobs from './components/Job/MyJobs';
import Application from './components/Application/Application';
import MyApplications from './components/Application/MyApplications';
import NotFound from './components/NotFound/NotFound';
import axios from 'axios'; /*Axios is a popular JavaScript library used to make HTTP requests (like GET, POST, PUT, DELETE) from your frontend to a backend API or server.*/
import { Toaster } from 'react-hot-toast';

import Profile from "./components/Profile/Profile"; // adjust path as needed

const App = () => {

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responce = await axios.get("http://localhost:4000/api/v1/user/getuser", { withCredentials: true });
        setUser(responce.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
        setUser(null);
      }
    };
    fetchUser();
  }, []);




  return <>
    <Router>

      <NavBar />   {/* ✅ Add Navbar here */}

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/job/getall' element={<Jobs />} />
        <Route path='/job/:id' element={<JobDetails />} />
        <Route path='/job/post' element={<PostJob />} />
        <Route path='/job/me' element={<MyJobs />} />
        <Route path='/application/:id' element={<Application />} />
        <Route path='/application/me' element={<MyApplications />} />
        <Route path='*' element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>

      <Footer />
      <Toaster />

    </Router>

  </>
}

export default App

