import React from 'react';
import TopBar from "./TopBar"
import Footer from "./Footer"
import CssBaseline from '@mui/material/CssBaseline';


function Layout(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <TopBar {...props} />
            <div>
                {props.children}
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Layout