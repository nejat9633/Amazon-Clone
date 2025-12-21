import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center my-5">
      <br />
      <br />
      <br />
      404 Page not found!
<br />
      <Link to="/" className='btn btn-danger mt-4 ' >Back to Home </Link>
    </div>
  );
}

export default NotFound;
