import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

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
          </div>
        </nav>

       
      </div>
	);
};
