import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const Characters = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const mapFav = store.favorites.map((item) => item.name);
  const token = store.auth;
  const user_id = store.user_id;

  useEffect(() => {
    actions.getCharacters(params.id);
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row row-cols-5 g-3 justify-content-center">
          {store.character.map((item, i) => (
            <div key={item.id}>
              <div className="col">
                <div className="card m-3 text-light border-light">
                  <img
                    src={
                      "https://starwars-visualguide.com/assets/img/characters/" +
                      item.id +
                      ".jpg"
                    }
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <div className="d-flex justify-content-between">
                      <Link to={"/characters/" + item.id}>
                        <button className="btn btn-outline-light">
                          Learn More
                        </button>
                      </Link>

                      {token && token != "" && token != undefined ? (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() =>
                            actions.addFavorites(
                              item.name,
                              item.id,
                              "character",
                              user_id
                            )
                          }
                        >
                          {mapFav.includes(item.name) ? (
                            <i key={i} className="fa-solid fa fa-heart"></i>
                          ) : (
                            <i key={i} className="far fa-heart"></i>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-secondary disabled"
                        >
                          <i key={i} className="far fa-heart"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Characters;