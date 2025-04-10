import React from "react";

const MainHeader = () => {



    return(
        <header className="header-banner">
            <div className="overlay"></div>
            <div className="animated-texts overlay-content">
                <h1>Welcome to <span className="hotel-color">Jovanovo Hotel</span></h1>
                <h4>Experience the best hospitality in city</h4>
                <h4>Best experience money can buy</h4>
            </div>
        </header>
    );
};

export default MainHeader;