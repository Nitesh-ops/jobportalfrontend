import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";


const NavBar = () => {
  
    return (
      <nav className="navbar sticky-top navbar-expand-sm bg-primary navbar-dark">
        <div className="container-fluid">
          <a href="/home" className="navbar-brand">
              <img
                src="https://logos.textgiraffe.com/logos/logo-name/Job-designstyle-cartoon-m.png"
                alt="jobPortal_logo"
                height={40}
              />
            &nbsp;Job Portal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <div className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink to="/admin" className="nav-link">
                     Candidates
                  </NavLink>
                </li>
  
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                  <AiFillHome/>  Home
                </NavLink>
              </li>
  
                <li className="nav-item">
                  <NavLink to="/postjobs" className="nav-link">
                     Post Jobs
                  </NavLink>
                </li>
            </div>
  
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link active">
                    <b>Welcome to the Job Portal</b>
                  </NavLink>
                </li>
    
              </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export { NavBar };