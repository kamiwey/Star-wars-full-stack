import React, { useContext } from 'react'
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';
import NavbarExt from '../../component/NavbarExt';

const Vehicles = () => {
  const { store, actions } = useContext(Context);

  let favIcon = "";
  let buttonVar = "";

  return (
    <div>
      <NavbarExt />
    <div className="container">
      <h1 className="text-light">Vehicles</h1>
      <div className="row row-cols-5 g-3 justify-content-center">

      {store.vehicles.map((i) => {
        if (i.favorite == false) {
          favIcon = "far fa-heart";
        } else {
          favIcon = "fas fa-heart";
        }

        return (
          <div key={i.index} className="col">
            <div className="card m-3 text-light border-light">
            <img
              src={
                "https://starwars-visualguide.com/assets/img/vehicles/" +
                i.uid +
                ".jpg"
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{i.name}</h5>
              <div className="d-flex justify-content-between">
                <Link to={"/vehicles/" + i.uid}>
                  <button className="btn btn-outline-light">
                    Learn More
                  </button> 
                 </Link>
               <button
                  className="btn btn-warning"
                  onClick={() =>
                    actions.addToFavorites(
                      i.uid,
                      "/vehicles/" + i.uid,
                       i.name,
                       i.type,
                       i.index
                    )}
              >
                <i className={favIcon} />
              </button>
            </div>
            </div>
            </div>
          </div>
        );
      })}

        <div className="col-md-12 d-flex justify-content-between">
          <button
            className="btn btn-dark"
             onClick={() => actions.getVehicles(store.previous)}
          >
            Previous
          </button>
          <button
            className="btn btn-dark"
             onClick={() => actions.getVehicles(store.next)}           
          >
            Next
          </button>
        </div>

      </div>
    </div>
    </div>
  )
}

export default Vehicles;