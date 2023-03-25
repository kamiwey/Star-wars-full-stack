import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
      
      admin: false,
      premium: false,
      userId: null,
      auth: false,
      registered: false,
      profile: {},

      character: [],
      characterDetail: {},
      characterId: null,
	    planet: [],
	    planetDetail: {},
	    planetId: null,
	    vehicle: [],
	    vehicleDetail: {},
	    vehicleId: null,

      favorites: [],
      user_id:null,
		},
		actions: {

//------------------------------------------------------------------------------------------------------
//											 EXAMPLE FUNCTION
//------------------------------------------------------------------------------------------------------

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},



//------------------------------------------------------------------------------------------------
//											 GET USERS
//------------------------------------------------------------------------------------------------

      userProfile: async () => {
        // looks for a token
        const userToken = localStorage.getItem("token");
        try {
          const response = await axios.get(
            process.env.BACKEND_URL + "/api/profile",
            {
              headers: {
                Authorization: "Bearer " + userToken,
              },
            }
          );
          // console.log(data)
          setStore({
            profile: response.data.user,
          });
          // console.log(response.data);
          return true;
        } catch (error) {
          // console.log(error);
          if (error.code === "ERR_BAD_REQUEST") {
            // console.log(error.response.data.msg);
            return;
          }
        }
      },

//-----------------------------------------------------------------------------------------------------
//											PUT UPDATE USERS
//----------------------------------------------------------------------------------------------------

      updateUser: async (password, name, lastname, phone) => {
        // bring user data by id
        let store = getStore();
        let user_id = store.userId;
        try {
          const response = await axios.put(
            process.env.BACKEND_URL + "/api/user/" + user_id,
            {
              //   email: email,
              //   username: username,
              password: password,
              name: name,
              lastname: lastname,
              phone: phone,
            }
          );
          // Sweet alert
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(response);
        } catch (error) {
          // Error codes
          // console.log(error);
          if (error.response.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
          if (error.response.status === 409) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
        }
      },

//----------------------------------------------------------------------------------------------------
//											 LOGIN POST
//----------------------------------------------------------------------------------------------------

      login: async (email, password) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/login",
            {
              email: email,
              password: password,
            }
          );
          // Sets store with the user id and auth become true to give access
          // conditions to determine the user access level
          // if admin
          if (response.data.user.admin) {
            setStore({
              admin: true,
              auth: true,
              userId: response.data.user.id,
            });
            // if premium user
          } else if (response.data.user.premium) {
            setStore({
              premium: true,
              auth: true,
              userId: response.data.user.id,
            });
            // if standar user
          } else {
            setStore({
              auth: true,
              userId: response.data.user.id,
            });
          }
          // save token in local storage
          localStorage.setItem("token", response.data.msg);

          window.localStorage.setItem("isLoggedIn", true) //-------------------------------------

          return response.data.msg;
        } catch (error) {
          // error codes
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              confirmButtonColor: "#000000",
              text: error.response.data.msg + "... redirecting to signup...",
            });
            return error.response.data.msg;
          } else if (error.response.data.msg === "Bad email or password") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data;
          }
        }
      },

//------------------------------------------------------------------------------------------------------
//											 LOGOUT
//------------------------------------------------------------------------------------------------------

      logout: () => {
        localStorage.removeItem("token");

        window.localStorage.removeItem("isLoggedIn");//-----------------------

        setStore({
          auth: false,
        });
        return false;
      },

//-----------------------------------------------------------------------------------------------------
//											SIGNUP POST
//-----------------------------------------------------------------------------------------------------

      signup: async (username, email, password) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/user",
            {
              username: username,
              email: email,
              password: password,
            }
          );
          if (response.data.msg === "New user created") {
            getActions().login(email, password);

            setStore({
              registered: true,
            });
          }
          return response.data.msg;
        } catch (error) {
          if (error.response.data.msg === "User exists") {
            return error.response.data.msg;
          }
        }
      },

//----------------------------------------------------------------------------------------------------
//											 TOKEN GET
//----------------------------------------------------------------------------------------------------

      validToken: async () => {
        let accessToken = localStorage.getItem("token");
        try {
          const response = await axios.get(
            process.env.BACKEND_URL + "/api/valid-token",
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          );
          if (response.data.user.admin) {
            setStore({
              admin: true,
              auth: true,
              userId: response.data.user.id,
            });
          } else if (response.data.user.premium) {
            setStore({
              premium: true,
              auth: true,
              userId: response.data.user.id,
            });
          } else {
            setStore({
              auth: true,
              userId: response.data.user.id,
            });
          }
          return;
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            setStore({
              auth: false,
            });
          }
          return false;
        }
      },

//-----------------------------------------------------------------------------------------------------
//											 PASSWORD CHANGE POST
//-----------------------------------------------------------------------------------------------------

      changePassword: async (email) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/user/password",
            {
              email: email,
            }
          );
          if (response.status === 200) {
            swal("Your password has been sent to your email");
          }
        } catch (error) {
          if (error.response.data.msg === "User email doesn't exist") {
            swal("Your email does not exist");
          }
        }
      },

//---------------------------------------------------------------------------------------------------
//											USER DELETE
//---------------------------------------------------------------------------------------------------

      deleteAccount: async () => {
        let store = getStore();
        let user_id = store.userId;
        try {
          const response = await axios.delete(
            process.env.BACKEND_URL + "/api/user/" + user_id,
            {}
          );
          console.log(response.data.msg);

          if (response.status === 200) {
            setStore({
              auth: false,
            });
            return response;
          }
        } catch (error) {
          console.log(error);
          if (error.response.status === 404) {
            Swal.fire(error.response.msg);
          }
        }
      },

//---------------------------------------------------------------------------------------------------------------
//											 GET CHARACTERS
//--------------------------------------------------------------------------------------------------------------

      getCharacters: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/characters"
          );

          const data = await response.json();
          setStore({
            character: data,
          });
        } catch (err) {
          console.log(err);
        }
      },

//-------------------------------------------------------------------------------------------------------------
//											 GET CHARACTERS DETAILS
//-------------------------------------------------------------------------------------------------------------

      getCharactersDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/characters/" + id
          );

          const data = await response.json();
          // console.log(data);
          setStore({
            characterDetail: data,
            characterId: data.id,
          });
          // console.log(store.characterDetail);
          // console.log(store.characterId);
          return store.characterId;
        } catch (err) {
          console.log(err);
        }
      },

//--------------------------------------------------------------------------------------------------------------
//											 GET PLANETS
//--------------------------------------------------------------------------------------------------------------

      getPlanets: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/planets"
          );
          const data = await response.json();

          setStore({
            planet: data,
          });
        } catch (err) {
          console.log(err);
        }
      },

//---------------------------------------------------------------------------------------------------------------
//											 GET PLANETS DETAILS
//---------------------------------------------------------------------------------------------------------------

      getPlanetsDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/planets/" + id
          );

          const data = await response.json();
          // console.log(data);
          setStore({
            planetDetail: data,
            planetId: data.id,
          });
          // console.log(store.planetDetail);
          // console.log(store.planetId);
          return store.planetId;
        } catch (err) {
          console.log(err);
        }
      },

//--------------------------------------------------------------------------------------------------------------
//											 GET VEHICLES
//--------------------------------------------------------------------------------------------------------------

      getVehicles: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/vehicles"
          );
          const data = await response.json();

          setStore({
            vehicle: data,
          });
        } catch (err) {
          console.log(err);
        }
      },

//-------------------------------------------------------------------------------------------------------------
//											 GET VEHICLES DETAILS
//-------------------------------------------------------------------------------------------------------------

      getVehiclesDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/vehicles/" + id
          );

          const data = await response.json();
          // console.log(data);
          setStore({
            vehicleDetail: data,
            vehicleId: data.id,
          });
          // console.log(store.vehicleDetail);
          // console.log(store.vehicleId);
          return store.vehicleId;
        } catch (err) {
          console.log(err);
        }
      },

//-------------------------------------------------------------------------------
//											 GET USERS ADMIN
//-------------------------------------------------------------------------------

      getUsers: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/user",

            ); // search
          const data = await response.json();
          // set store with the bringed data
          setStore({
            user: data,
          }); //promise
        } catch (err) {
          // standar error log
          console.log(err);
        }
        // details fetch
      }, 


      addFavorites: (itemName, itemUid, type, user_id) => {

				const {favorites} = getStore();
				
				function removeObjectWithId(arr, nam){
					const filterFav = arr.filter((obj) => obj.name !== nam)
						return setStore({favorites: filterFav})
					}  
				const mapFav = favorites.map(item=>item.name)
				
				if (!mapFav.find(i => i == itemName )){
					favorites.push({name: itemName, id: itemUid, type: type })
					{type=="character" && getActions().postFavouriteChar(user_id, itemUid)};
					{type=="planet" && getActions().postFavouritePlanet(user_id, itemUid)};
					{type=="vehicle" && getActions().postFavouriteVehicle(user_id, itemUid)};
					
					console.log("not on the list, added")
				}
				else{
					console.log("on the list, removed")
					{type=="character" && getActions().deleteFavouriteChar(user_id, itemUid)};
					{type=="planet" && getActions().deleteFavouritePlanet(user_id, itemUid)};
					{type=="vehicle" && getActions().deleteFavouriteVehicle(user_id, itemUid)};
					return removeObjectWithId(favorites, itemName)
				}
				
				console.log(favorites, "final favorites")
				setStore({favorites: favorites})
				// getActions().changeColor(0, "green");

			}, 

			deleteFavorites: (itemIndex, itemUid, user_id, type) => {
				const {favorites} = getStore();
				const newFav = [...favorites]
				newFav.splice(itemIndex,1)
				{type=="character" && getActions().deleteFavouriteChar(user_id, itemUid)};
				{type=="planet" && getActions().deleteFavouritePlanet(user_id, itemUid)};
				{type=="vehicle" && getActions().deleteFavouriteVehicle(user_id, itemUid)};
				setStore({favorites: newFav})
			},
			getFavourites:(user_id)=>{
				const opts = {
					method: "POST",
					headers: {
					  "Content-Type": "application/json"
					},
					body: JSON.stringify({
						user_id: user_id
					  }),
				  };
				  fetch(process.env.BACKEND_URL + "/api/get_all_fav", opts)
					.then((resp) => {
					  if (resp.status === 200) return resp.json();
					})
					.then((data) => {
					   console.log(data, "fetch all favorites")
					   setStore({favorites: data})
					   
					})
					.catch((error) => {
					  console.error("There was an error fetching people", error);			
					});

			},

			postFavouriteChar:(user_id, char_id) => {
				const opts = {
				  method: "POST",
				  headers: {
					"Content-type": "application/json"
				  },
				  body: JSON.stringify({
					user_id: user_id,
					char_id: char_id,
				  }),
				};
				fetch(process.env.BACKEND_URL + "/api/add_fav_char", opts)
				  .then((resp) => {
					if (resp.status === 200) return resp.json();
				  })
				  .then((data) => {
					console.log(data)
				  })
				  .catch((error) => {
					console.error("There was an error", error);					
				  });
			  },
			  postFavouritePlanet:(user_id, planet_id) => {
				const opts = {
				  method: "POST",
				  headers: {
					"Content-type": "application/json"
				  },
				  body: JSON.stringify({
					user_id: user_id,
					planet_id: planet_id,
				  }),
				};
				fetch(process.env.BACKEND_URL + "/api/add_fav_planet", opts)
				  .then((resp) => {
					if (resp.status === 200) return resp.json();
				  })
				  .then((data) => {
					console.log(data)
				  })
				  .catch((error) => {
					console.error("There was an error", error);					
				  });
			  },
			  postFavouriteVehicle:(user_id, veh_id) => {
				const opts = {
				  method: "POST",
				  headers: {
					"Content-type": "application/json"
				  },
				  body: JSON.stringify({
					user_id: user_id,
					veh_id: veh_id
				  }),
				};
				fetch(process.env.BACKEND_URL + "/api/add_fav_veh", opts)
				  .then((resp) => {
					if (resp.status === 200) return resp.json();
				  })
				  .then((data) => {
					console.log(data)
				  })
				  .catch((error) => {
					console.error("There was an error", error);					
				  });
			  },
			deleteFavouriteChar:(user_id,char_id)=>{
				const opts = {
					method: "DELETE",
					headers: {
					  "Content-type": "application/json"
					},
					body: JSON.stringify({	
					  user_id: user_id,				
					  char_id: char_id
					}),
				  };
				  fetch(process.env.BACKEND_URL + `/api/favorite/char/delete`, opts)
					.then((resp) => {
					  if (resp.status === 200) return resp.json();
					})
					.then((data) => {
					  console.log(data)
					})
					.catch((error) => {
					  console.error("There was an error", error);					
					});

			},

			deleteFavouritePlanet:(user_id,planet_id)=>{
				const opts = {
					method: "DELETE",
					headers: {
					  "Content-type": "application/json"
					},
					body: JSON.stringify({	
					  user_id: user_id,				
					  planet_id: planet_id
					}),
				  };
				  fetch(process.env.BACKEND_URL + `/api/favorite/planet/delete`, opts)
					.then((resp) => {
					  if (resp.status === 200) return resp.json();
					})
					.then((data) => {
					  console.log(data)
					})
					.catch((error) => {
					  console.error("There was an error", error);					
					});

			},
			deleteFavouriteVehicle:(user_id,veh_id)=>{
				const opts = {
					method: "DELETE",
					headers: {
					  "Content-type": "application/json"
					},
					body: JSON.stringify({	
					  user_id: user_id,				
					  veh_id: veh_id
					}),
				  };
				  fetch(process.env.BACKEND_URL + `/api/favorite/vehicle/delete`, opts)
					.then((resp) => {
					  if (resp.status === 200) return resp.json();
					})
					.then((data) => {
					  console.log(data)
					})
					.catch((error) => {
					  console.error("There was an error", error);					
					});

			},



		}
	};
};

export default getState;
