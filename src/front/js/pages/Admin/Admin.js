import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import Nav from "react-bootstrap/Nav";

// import userProfileIcon from "../../../img/user-profile-icon.jpg";
// import adminPackagesIcon from "../../../img/tarangire_thumb.jpg";

const Admin = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    // actions.getPackage(params.id);
    actions.getUsers(params.id);
    actions.getCharacters(params.id);
    actions.getPlanets(params.id);
    actions.getVehicles(params.id);
    // actions.getComments(params.id);
    // actions.getFavorites(params.id);
    // actions.getTotalFavorites();
  }, []);

  return (
    <div className="pagesBackground">
      
      {store.admin ? (
        <div className="main-contentAdmin pt-5">
          <div className="container-fluid destinationsCards">
            <div className="row justify-content-center">
              {/* -------------------USER CARD--------------------- */}

              <div className="row row-cols-5 g-3 justify-content-center">
                <div>
                  <div className="col">
                    <div className="card m-3 text-light border-light">
                      {/* <img
                    src={
                      "https://starwars-visualguide.com/assets/img/characters/" +
                      item.id +
                      ".jpg"
                    }
                    className="card-img-top"
                    alt="..."
                  /> */}
                      <div className="card-body">
                        <h5 className="card-title">
                          {store.user.length} TOTAL USERS
                        </h5>
                        <div className="d-flex justify-content-between">
                          <Link to="/AdminUsers">
                            <button className="btn btn-outline-light">
                              USERS
                            </button>
                          </Link>

                          {/* <button
                      className="btn btn-warning"
                        onClick={() =>
                          actions.addToFavorites(
                            i.uid,
                            "/characters/" + i.uid,
                            i.name,
                            i.type,
                            i.index
                        )}
                  >
                    <i className={favIcon} />
                  </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ----------------------------CHARACTERS CARD---------------- */}

                <div className="col">
                  <div className="card m-3 text-light border-light">
                    {/* <img
                    src={
                      "https://starwars-visualguide.com/assets/img/characters/" +
                      item.id +
                      ".jpg"
                    }
                    className="card-img-top"
                    alt="..."
                  /> */}
                    <div className="card-body">
                      <h5 className="card-title">
                        {store.character.length} TOTAL CHARACTERS
                      </h5>
                      <div className="d-flex justify-content-between">
                        <Link to="/AdminCharacters">
                          <button className="btn btn-outline-light">
                            CHARACTERS
                          </button>
                        </Link>

                        {/* <button
                      className="btn btn-warning"
                        onClick={() =>
                          actions.addToFavorites(
                            i.uid,
                            "/characters/" + i.uid,
                            i.name,
                            i.type,
                            i.index
                        )}
                  >
                    <i className={favIcon} />
                  </button> */}
                      </div>
                    </div>
                  </div>
                </div>

{/* ----------------------------PLANETS CARD---------------- */}

<div className="col">
                  <div className="card m-3 text-light border-light">
                    {/* <img
                    src={
                      "https://starwars-visualguide.com/assets/img/characters/" +
                      item.id +
                      ".jpg"
                    }
                    className="card-img-top"
                    alt="..."
                  /> */}
                    <div className="card-body">
                      <h5 className="card-title">
                        {store.planet.length} TOTAL PLANETS
                      </h5>
                      <div className="d-flex justify-content-between">
                        <Link to="/AdminPlanets">
                          <button className="btn btn-outline-light">
                            PLANETS
                          </button>
                        </Link>

                        {/* <button
                      className="btn btn-warning"
                        onClick={() =>
                          actions.addToFavorites(
                            i.uid,
                            "/characters/" + i.uid,
                            i.name,
                            i.type,
                            i.index
                        )}
                  >
                    <i className={favIcon} />
                  </button> */}
                      </div>
                    </div>
                  </div>
                </div>

{/* ----------------------------VEHICLES CARD---------------- */}

<div className="col">
                  <div className="card m-3 text-light border-light">
                    {/* <img
                    src={
                      "https://starwars-visualguide.com/assets/img/characters/" +
                      item.id +
                      ".jpg"
                    }
                    className="card-img-top"
                    alt="..."
                  /> */}
                    <div className="card-body">
                      <h5 className="card-title">
                        {store.vehicle.length} TOTAL VEHICLES
                      </h5>
                      <div className="d-flex justify-content-between">
                        <Link to="/AdminVehicles">
                          <button className="btn btn-outline-light">
                            VEHICLES
                          </button>
                        </Link>

                        {/* <button
                      className="btn btn-warning"
                        onClick={() =>
                          actions.addToFavorites(
                            i.uid,
                            "/characters/" + i.uid,
                            i.name,
                            i.type,
                            i.index
                        )}
                  >
                    <i className={favIcon} />
                  </button> */}
                      </div>
                    </div>
                  </div>
                </div>


              </div>

              
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex vh-auto vh-100 text-center justify-content-center ">
          <div>
            <h1
              className="package-detail-title mt-5"
              style={{ color: "darkolivegreen" }}
            >
              Not logged in...
            </h1>
            <Nav.Link
              className="package-detail-subtitle"
              style={{ color: "#d2ae6d" }}
              href="/login"
            >
              Go to login
            </Nav.Link>
          </div>
        </div>
      )}{" "}
      <footer className="footer"></footer>
    </div>
  );
};

export default Admin;
