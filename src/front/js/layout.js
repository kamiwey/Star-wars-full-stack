import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import NavbarInt from "./component/NavbarInt";

import Characters from "./pages/Internal/Characters";
import CharDetails from "./pages/Internal/CharDetails";
import Planets from "./pages/Internal/Planets";
import PlanetsDetails from "./pages/Internal/PlanetsDetails";
import Vehicles from "./pages/Internal/Vehicles";
import VehiclesDetails from "./pages/Internal/VehiclesDetails";

import Profile from "./pages/Profile/Profile";

import SignUp from "./pages/LoginPages/Signup";
import Login from "./pages/LoginPages/Login";

import Admin from "./pages/Admin/Admin";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminCharacters from "./pages/Admin/AdminCharacters";
import AdminPlanets from "./pages/Admin/AdminPlanets";
import AdminVehicles from "./pages/Admin/AdminVehicles";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <NavbarInt />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        
                        
                        <Route element={<Characters />} path="/characters" />                        
                        <Route element={<CharDetails />} path="/characters/:id" />                                                
                        <Route element={<Planets />} path="/planets" />                        
                        <Route element={<PlanetsDetails />} path="/planets/:id" />
                        <Route element={<Vehicles />} path="/vehicles" />                        
                        <Route element={<VehiclesDetails />} path="/vehicles/:id" />

                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Profile />} path="/profile" />                        

                        <Route element={<Admin />} path="/Admin" />
                        <Route element={<AdminUsers />} path="/AdminUsers" />
                        <Route element={<AdminCharacters />} path="/AdminCharacters" />
                        <Route element={<AdminPlanets />} path="/AdminPlanets" />
                        <Route element={<AdminVehicles />} path="/AdminVehicles" />

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
