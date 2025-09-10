import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="Page notfound">
        <div className="content">
            <img src="/notfound.jpg" alt="notfound" />
            <Link to={"/"}>Return to Home</Link>
        </div>

    </section>
  );
};

export default NotFound