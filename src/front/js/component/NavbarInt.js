import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavbarInt = () => {
  const { store, actions } = useContext(Context);
  const token = store.auth;
  const user_id = store.user_id;

  const navigate = useNavigate();
  // Calls flux logout
  const doLogout = () => {
    //false
    let onLogged = actions.logout();

    if (!onLogged) {
      //true
      navigate("/login");
    }
  };

  useEffect(() => {
    actions.getFavourites(user_id);
  }, [user_id]);

  return (
    <div className="sticky-top">
      <nav className="navBar1 navbar navbar-expand-lg  ">
        <div className="container-fluid ">
          
          <Link className="col-2 text-center" to="/">
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
          {token && token != "" && token != undefined ? (
            <div className="btn-group dropstart ml-auto">
              <button
                type="button"
                className="btn btn-outline-dark dropdown-toggle me-5"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites{" "}
                <span className="badge bg-danger">
                  {store.favorites.length}
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {store.favorites.map((item, i) => {
                  return (
                    <li key={i}>
                      <a className="dropdown-item d-flex justify-content-between">
                        {item.type === "character" && (
                          <Link to={`characters/${item.id}`}>{item.name}</Link>
                        )}
                        {item.type === "planet" && (
                          <Link to={`/planets/${item.id}`}>{item.name}</Link>
                        )}
                        {item.type === "vehicle" && (
                          <Link to={`/vehicles/${item.id}`}>{item.name}</Link>
                        )}

                        <button className="btn btn-outline-dark border-0 btn-sm">
                          {" "}
                          <i
                            className="fa-solid fa fa-trash"
                            onClick={() =>
                              actions.deleteFavorites(
                                i,
                                item.id,
                                user_id,
                                item.type
                              )
                            }
                          ></i>
                        </button>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                className="btn btn-outline-danger me-5"
                onClick={doLogout}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" style={{ color: "#bdb284" }}>
                <button className="btn btn-primary m-2">
                  Log in to add Favorites
                </button>
              </Link>
              <Link to="/signup" style={{ color: "#bdb284" }}>
                <button className="btn btn-primary m-2">Register</button>
              </Link>
            </div>
          )}

          {/* <div className="ml-auto">
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
            </div> */}
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
            <Link to="/planets" className="linkToView">
              Planets
            </Link>
          </li>
          <li className="me-5 nav-item ">
            <Link to="/vehicles" className="linkToView">
              Vehicles
            </Link>
          </li>
          {store.auth ? (
            <li className="me-5 nav-item  ">
              <Link to="/Profile" className="linkToView">
                PROFILE
              </Link>
            </li>
          ) : null}{" "}
          {store.auth ? (
            <div>
              {store.admin ? (
                <div>
                  <li className="nav-item">
                    <Link to="/Admin" className="linkToView">
                      ADMIN
                    </Link>
                  </li>
                </div>
              ) : null}{" "}
            </div>
          ) : null}{" "}
          {store.premium ? (
            <i className="OthServIconPremium bt-5 fa fa-award"></i>
          ) : null}{" "}
        </div>
      </nav>
    </div>
  );
};

export default NavbarInt;
