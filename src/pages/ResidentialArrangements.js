import React, {useEffect} from "react";
import "./ResidentialArrangements.css";
import { incrementVisit } from "./visitTracker";

function ResidentialArrangements() {
    useEffect(() => {
            incrementVisit("Residential Arrangements Page");
        }, []);
    return (
        <div className="residential-page">
            <h1>Residential Arrangements</h1>

            <p>
                Patients coming from far locations may require short-term stay nearby. <br />
                Below are nearby options for accommodation and support services. <br /><br />

                <span className="note"> Note: </span> These services are external and are <span className="note">  NOT MANAGED </span> by Santulan Holistic
                Solutions. Patients may choose the services as per their requirements.

            </p>


            <div className="button-row">
                <span className="label">Accommodation Options: </span>
                <button
                    onClick={() => {
                        window.open(
                            "https://www.google.com/maps/search/Hotels/@28.659551,77.3555571,17z/data=!3m1!4b1!4m7!2m6!3m5!2sSantulan+Holistic+Solutions+and+Neurotherapy+Center!3s0x5a0af2e9444593f:0xef13883481b28168!4m2!1d77.358132!2d28.659551?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D",
                            "_blank"
                        );
                    }}
                >
                    Nearby Hotels & Lodges
                </button>


                <button
                    onClick={() => {
                        window.open("https://www.makemytrip.com/", "_blank");
                    }}
                >
                    Make My Trip
                </button>

                <button
                    onClick={() => {
                        window.open("https://www.goibibo.com/", "_blank");
                    }}
                >
                    Goibibo
                </button>


            </div>

            <div className="button-row">
                <span className="label">Food Services:</span>
                <button
                    onClick={() => {
                        window.open(
                            "https://www.google.com/maps/search/home+cooked+food+near+santulan+holistic+solutions+vasundhara+ghaziabad/@28.6491769,77.3664843,14.92z?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D",
                            "_blank"
                        );
                    }}
                >
                    Nearby Tiffin / Food Services
                </button>

                <button
                    onClick={() => {
                        window.open("https://www.swiggy.com/", "_blank");
                    }}
                >
                    Swiggy
                </button>

                <button
                    onClick={() => {
                        window.open("https://www.zomato.com/ncr", "_blank");
                    }}
                >
                    Zomato
                </button>
            </div>

            <div className="button-row">
                <span className="label">Transport:</span>
                <button
                    onClick={() => {
                        window.open("https://www.uber.com/in/en/", "_blank");
                    }}
                >
                    Uber
                </button>

                <button
                    onClick={() => {
                        window.open("https://www.olacabs.com/", "_blank");
                    }}
                >
                    Ola
                </button>

                <button
                    onClick={() => {
                        window.open(
                            "https://www.google.com/maps/search/Taxi+near+Santulan+Holistic+Solutions+Ghaziabad/",
                            "_blank"
                        );
                    }}
                >
                    Nearby Transport / Commute Assistance
                </button>
            </div>



        </div>
    );
}

export default ResidentialArrangements;
