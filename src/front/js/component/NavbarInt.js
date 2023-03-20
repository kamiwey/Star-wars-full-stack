import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const NavbarInt = () => {

    const { store, actions } = useContext(Context);
    let navigate = useNavigate();
  // Calls flux logout
  const doLogout = () => {
    //false
    let onLogged = actions.logout();

    if (!onLogged) {
      //true
      navigate("/login");
    }
  };


  return (
    <div className="sticky-top">
        <nav className="navBar1 navbar navbar-expand-lg  ">
          <div className="container-fluid ">
            <div className="col-1"></div>
            <Link className="col-10 text-center" to="/">
              <img
                className="logoNavBar"
                src="https://1000marcas.net/wp-content/uploads/2019/12/logo-StarWars.png"
              />
            </Link>

            {/* <div className="btn-group dropstart">
              <button
                className="btn btn-lg btn-outline-light dropdown-toggle me-5"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites {store.favorites.length}
              </button>
              <ul className="dropContainer dropdown-menu">
                <ChossenFavorite />
              </ul>
            </div> */}

          <div className="ml-auto">
                {!store.auth ? (
                  <Link to="/login" style={{ color: "#bdb284" }}>
                    <button className="btn btn-primary m-2">Login</button>
                  </Link>
                ) : null}{" "}
                {store.auth ? (
                  <Link to="/">
                    <button className="btn btn-primary m-2" type="button" onClick={doLogout} style={{ color: "#bdb284" }}>Log out</button>
                  </Link>
                ) : null}
                {!store.auth ? (
                  <Link to="/signup" style={{ color: "#bdb284" }}>
                    <button className="btn btn-primary m-2">Sign Up</button>
                  </Link>
                ) : null}{" "}
            </div>
          </div>
        </nav>

        {/* Segundo NAV */}
        <nav className="navBar2 navbar  ">
          <div className="container-fluid  d-flex justify-content-center">
            <li className="me-5 nav-item  ">
              <Link to="/charactersint" className="linkToView">
                Characters
              </Link>
            </li>
            <li className="me-5 nav-item ">
              <Link to="/planetsint" className="linkToView" >
                Planets
              </Link>
            </li>
            <li className="me-5 nav-item ">
              <Link to="/vehiclesint" className="linkToView" >
                Vehicles
              </Link>
            </li>
            <li className=" nav-item ">
              <Link to="/testing" className="linkToView" >
                TEST PAGE
              </Link>
            </li>
          </div>
        </nav>
      </div>
  )
}

export default NavbarInt;