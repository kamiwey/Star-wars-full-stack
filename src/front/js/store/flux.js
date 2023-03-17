const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      people: [],
      next: "",
      previous: "",
      vehicles: [],
      planets: [],
      person: [],
      singleVehicle: [],
      singlePlanet: [],
      favorites: [],

      character: [],
      characterDetail: {},
      characterId: null,
	  planet: [],
	  planetDetail: {},
	  planetId: null,
	  vehicle: [],
	  vehicleDetail: {},
	  vehicleId: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
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

      //-----------------------------------------------------------------------------------------------------------------------------
      //											EXT API FETCHS
      //-----------------------------------------------------------------------------------------------------------------------------

      getPeople: (varPag) => {
        const store = getStore();
        let fetchVar = "";

        console.log("varpag", varPag);

        if (varPag == null) {
          fetchVar = "https://www.swapi.tech/api/people/";
        } else {
          fetchVar = varPag;
        }

        fetch(fetchVar, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.results.map((item, index) => {
              return { ...item, index: index, type: "people", favorite: false };
            });
            console.log("is me again ", data);
            setStore({ people: dataGathered });
            setStore({ next: data.next });
            setStore({ previous: data.previous });
          });
      },

      getPerson: (uid) => {
        const store = getStore();
        fetch("https://www.swapi.tech/api/people/" + uid, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.result.properties;

            setStore({ person: dataGathered });
          });
      },

      getVehicles: (varPag) => {
        const store = getStore();
        let fetchVar = "";

        console.log("varpag", varPag);

        if (varPag == null) {
          fetchVar = "https://www.swapi.tech/api/vehicles/";
        } else {
          fetchVar = varPag;
        }

        fetch(fetchVar, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.results.map((item, index) => {
              return {
                ...item,
                index: index,
                type: "vehicles",
                favorite: false,
              };
            });
            console.log("from vehicles ", data);
            setStore({ vehicles: dataGathered });
            setStore({ next: data.next });
            setStore({ previous: data.previous });
          });
        // const store = getStore();
        // fetch("https://www.swapi.tech/api/vehicles/", {
        // 	method: "GET",
        // 	headers: { "Content-Type": "application/json" },
        // })
        // 	.then((resp) => {
        // 		return resp.json();
        // 	})
        // 	.then(data => {
        // 		let dataGathered = data.results.map((item,index) => {
        // 			return {...item,index:index,type:"vehicles",favorite:false};
        // 		});

        // 		setStore({vehicles : dataGathered});
        // 	})
      },

      getSingleVehicle: (uid) => {
        const store = getStore();
        fetch("https://www.swapi.tech/api/vehicles/" + uid, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.result.properties;

            setStore({ singleVehicle: dataGathered });
          });
      },

      getPlanets: (varPag) => {
        const store = getStore();
        let fetchVar = "";

        if (varPag == null) {
          fetchVar = "https://www.swapi.tech/api/planets/";
        } else {
          fetchVar = varPag;
        }

        fetch(fetchVar, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.results.map((item, index) => {
              return {
                ...item,
                index: index,
                type: "planets",
                favorite: false,
              };
            });
            console.log("from planets ", data);
            setStore({ planets: dataGathered });
            setStore({ next: data.next });
            setStore({ previous: data.previous });
          });

        // const store = getStore();
        // fetch("https://www.swapi.tech/api/planets/", {
        // 	method: "GET",
        // 	headers: { "Content-Type": "application/json" },
        // })
        // 	.then((resp) => {
        // 		return resp.json();
        // 	})
        // 	.then(data => {
        // 		let dataGathered = data.results.map((item,index) => {
        // 			return {...item,index:index,type:"planets",favorite:false};
        // 		});

        // 		setStore({planets : dataGathered});
        // 	})
      },

      getSinglePlanet: (uid) => {
        const store = getStore();
        fetch("https://www.swapi.tech/api/planets/" + uid, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.result.properties;

            setStore({ singlePlanet: dataGathered });
          });
      },

      addToFavorites: (uid, url, name, type, index) => {
        const store = getStore();

        if (type == "people") {
          store.people[index].favorite = true;
        }
        if (type == "vehicles") {
          store.vehicles[index].favorite = true;
        }
        if (type == "planets") {
          store.planets[index].favorite = true;
        }
        let temp = store.favorites;

        temp.push({
          index: index,
          uid: uid,
          url: url,
          name: name,
          type: type,
          favorite: true,
        });

        const names = temp.map((o) => o.name);
        const filtered = temp.filter(
          ({ name }, index) => !names.includes(name, index + 1)
        );

        setStore({ favorites: filtered });
      },

      removeFromFavorites: (i) => {
        const store = getStore();

        if (i.type == "people") {
          store.people[i.index].favorite = false;
        }
        if (i.type == "vehicles") {
          store.vehicles[i.index].favorite = false;
        }
        if (i.type == "planets") {
          store.planets[i.index].favorite = false;
        }

        let temp = store.favorites;

        let testeVar = temp.filter((objecto) => {
          return objecto !== i;
        });

        setStore({ favorites: testeVar });
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 INTERNAL FETCH
      //-----------------------------------------------------------------------------------------------------------------------------
      //-----------------------------------------------------------------------------------------------------------------------------
      //											 GET CHARACTERS
      //-----------------------------------------------------------------------------------------------------------------------------

      getCharacters: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/all_characters"
          );

          const data = await response.json();
          setStore({
            character: data,
          });
        } catch (err) {
          console.log(err);
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 GET CHARACTERS DETAILS
      //-----------------------------------------------------------------------------------------------------------------------------

      getCharactersDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/all_character/" + id
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

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 GET PLANETS
      //-----------------------------------------------------------------------------------------------------------------------------

      getPlanetsInt: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/all_planets"
          );
          const data = await response.json();

          setStore({
            planet: data,
          });
        } catch (err) {
          console.log(err);
        }
      },

 //-----------------------------------------------------------------------------------------------------------------------------
      //											 GET PLANETS DETAILS
      //-----------------------------------------------------------------------------------------------------------------------------

	  getPlanetsDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/all_planets/" + id
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

//-----------------------------------------------------------------------------------------------------------------------------
      //											 GET VEHICLES
      //-----------------------------------------------------------------------------------------------------------------------------

	  getVehiclesInt: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/all_vehicles"
          );
          const data = await response.json();

          setStore({
            vehicle: data,
          });
        } catch (err) {
          console.log(err);
        }
      },

	  //-----------------------------------------------------------------------------------------------------------------------------
      //											 GET VEHICLES DETAILS
      //-----------------------------------------------------------------------------------------------------------------------------

	  getVehiclesDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/all_vehicles/" + id
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
    },
  };
};

export default getState;
