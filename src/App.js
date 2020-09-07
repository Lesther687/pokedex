import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Pokedex from "./Pages/Pokedex/Pokedex";
import Home from "./Pages/Home/Home";

function App() {
    return(
        <>
            <Router>
                <Navbar/>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/pokedex" component={Pokedex}/>
                </Switch>
            </Router>
        </>
    );
}

export default App