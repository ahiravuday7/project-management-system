import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      {/* {hero section} */}
      <div className="bd-dark text-light py-5">
        <div className="container text-center py-5">
          <h1 className="display-4 fw-bold text-dark">
            Manage Projects <span className="text-primary">Smarter</span>
          </h1>
          <p className="lead text-secondary mt-4">
            Manage your tasks efficiently and effectively.
          </p>
          <div className="mt-4">
            <Link to="/register" className="btn btn-primary btn-lg me-3 px-4">
              Get Started
            </Link>

            <Link to="/login" className="btn btn-outline-dark btn-lg px-4">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* {features section} */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-5">
          Everthing you need to manage work
        </h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 text-center h-100 p-4">
              <h5 className="fw-bold">Boards & Tasks</h5>
              <p className="text-muted mt-2">
                Organize your work with boards and tasks.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 text-center h-100 p-4">
              <h5 className="fw-bold">Team Collaboration</h5>
              <p className="text-muted mt-2">
                Collaborate with your team in real-time.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 text-center h-100 p-4">
              <h5 className="fw-bold">Track Progress</h5>
              <p className="text-muted mt-2">
                Track the progress of your tasks and projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold">Get Started Today</h2>
          <p className="text-muted mt-2">
            Join thousands of users who are already managing their work
            efficiently.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg px-5">
            Sign Up Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
