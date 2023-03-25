import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";
import Nav from "react-bootstrap/Nav";

const AdminPlanets = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getPlanets(params.id);
  }, []);

  const handleSweetAlert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "The Package has been deleted.",
          icon: "success",
          confirmButtonColor: "#000000",
        });
        const remove = actions.deletePackage(id);
        console.log(remove);
      }
    });
  };

  return (
    <div>
        
       {store.admin ? (
      <div
        
      >
        <div className="container ">
          <h1 className="text-center pt-3 package-detail-title">PLANETS</h1>
          <Link to="/Admin" className="m-3">
            <button className="btn btn-outline-light">BACK TO ADMIN</button>
          </Link>
          <div className="row justify-content-center">
            {store.planet.map((item) => (
              <div key={item.id} className="col-xl-4 col-12">
                <div className="admin-pack-card card m-3 border-light">
                  {/* <img
                    src={item.url ? item.url : packagesDefaultIcon}
                    className="admin-pack-img-top"
                    alt="..."
                  /> */}
                  <div className="admin-pack-card-body">
                    <h3 className="text-light mt-3">{item.name}</h3>
                    <div className="d-flex justify-content-between m-2">
                      <Link to={"/Planets/" + item.id}>
                        <button href="#" className="btn btn-outline-light">
                          DETAILS
                        </button>
                      </Link>
                      <Link to={"/EditPackages/" + item.id}>
                        <button href="#" className="btn btn-outline-light">
                          EDIT
                        </button>
                      </Link>

                      <span
                        className="btn btn-outline-light d-flex justify-content-end"
                        onClick={() => handleSweetAlert(item.id)}
                      >
                        <b>DELETE</b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-xl-4 col-12">
              <div className="admin-pack-card card m-3 border-light text-light">
                {/* <img src={plusIcon} className="admin-pack-img-top" alt="..." /> */}
                <div className="admin-pack-card-body">
                  <h3 className="admin-pack-card-title mt-3">CREATE PLANET</h3>
                  <div className="d-flex justify-content-center pb-3">
                    <Link to="/AddPackages">
                      <button className="btn btn-outline-light ">CREATE</button>
                    </Link>
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
                  <h1 className="package-detail-title mt-5"
                      style={{ color: "darkolivegreen" }}>Not logged in...</h1>
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
  )
}

export default AdminPlanets;