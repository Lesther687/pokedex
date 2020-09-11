import React from 'react';
import {NavLink} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import {
    Button,
    Toolbar
} from "@material-ui/core"

function Navbar() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to="/pokedex" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="secondary">Pokedex</Button>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;
