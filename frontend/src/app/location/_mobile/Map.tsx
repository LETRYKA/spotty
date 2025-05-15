import React, { useState } from "react";
import MobileWidget from "./_components/MobileWidget";
import MapComponent from "./_components/MapComponent";

const MapMobile = () => {
    const [cityName, setCityName] = useState<string>("");

    return (
        <div className="fixed inset-0 w-full h-full">
            <MapComponent onCityNameChange={setCityName} />
            <MobileWidget cityName={cityName} />
        </div>
    );
};

export default MapMobile;
