import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Characters from "./pages/External-API/Characters";
import CharactersInt from "./pages/Internal/CharactersInt";
import SignUp from "./pages/LoginPages/Signup";
import Login from "./pages/LoginPages/Login";
import HomeExternal from "./pages/External-API/HomeExternal";
import HomeInternal from "./pages/Internal/HomeInternal";
import CharDetails from "./pages/External-API/CharDetails";
import CharDetailsInt from "./pages/Internal/CharDetailsInt";
import Planets from "./pages/External-API/Planets";
import PlanetsInt from "./pages/Internal/PlanetsInt";
import PlanetsDetails from "./pages/External-API/PlanetsDetails";
import PlanetsDetailsInt from "./pages/Internal/PlanetsDetailsInt";
import Vehicles from "./pages/External-API/Vehicles";
import VehiclesInt from "./pages/Internal/VehiclesInt";
import VehiclesDetails from "./pages/External-API/VehiclesDetails";
import VehiclesDetailsInt from "./pages/Internal/VehiclesDetailsInt";
import Testing from "./pages/External-API/Testing";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<HomeExternal />} path="/home-external" />
                        <Route element={<HomeInternal />} path="/home-internal" />

                        <Route element={<Characters />} path="/characters" />
                        <Route element={<CharactersInt />} path="/charactersint" />
                        <Route element={<CharDetails />} path="/characters/:id" />
                        <Route element={<CharDetailsInt />} path="/charactersint/:id" />

                        <Route element={<Planets />} path="/planets" />
                        <Route element={<PlanetsInt />} path="/planetsint" />
                        <Route element={<PlanetsDetails />} path="/planets/:id" />
                        <Route element={<PlanetsDetailsInt />} path="/planetsint/:id" />

                        <Route element={<Vehicles />} path="/vehicles" />
                        <Route element={<VehiclesInt />} path="/vehiclesint" />
                        <Route element={<VehiclesDetails />} path="/vehicles/:id" />
                        <Route element={<VehiclesDetailsInt />} path="/vehiclesint/:id" />

                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Testing />} path="/testing" />

                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
