import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true });
      toast.success("Logged out successfully");
      setIsAuthorized(false);
      setUser(null);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/jobzone_bg_white.png" alt="logo" />
        </div>

        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>HOME</Link>
          </li>

          <li>
            <Link to="/job/getall" onClick={() => setShow(false)}>ALL JOBS</Link>
          </li>

          <li>
            <Link to="/application/me" onClick={() => setShow(false)}>
              {user?.role?.toLowerCase() === "employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
            </Link>
          </li>

          {user?.role?.toLowerCase() === "employer" && (
            <>
              <li>
                <Link to="/job/post" onClick={() => setShow(false)}>POST NEW JOB</Link>
              </li>
              <li>
                <Link to="/job/me" onClick={() => setShow(false)}>VIEW YOUR JOBS</Link>
              </li>
            </>
          )}

          {isAuthorized && <button onClick={handleLogout}>LOGOUT</button>}
        </ul>

        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
