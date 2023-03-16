import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ChossenFavorite from "./Favorites";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

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

            <div className="btn-group dropstart">
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
            </div>
          </div>
        </nav>

        {/* Segundo NAV */}
        <nav className="navBar2 navbar  ">
          <div className="container-fluid  d-flex justify-content-center">
            <li className="me-5 nav-item  ">
              <Link to="/characters" className="linkToView">
                Characters
              </Link>
            </li>
            <li className="me-5 nav-item ">
              <Link to="/planets" className="linkToView" >
                Planets
              </Link>
            </li>
            <li className="me-5 nav-item ">
              <Link to="/vehicles" className="linkToView" >
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
	);
};
