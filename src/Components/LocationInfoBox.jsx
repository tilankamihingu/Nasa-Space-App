import React from 'react';
import './LocationInfoBox.css';

function LocationinfoBox({info}) {
    return (
        <div className="location-info">
            <h2>Event location</h2>
            <ul>
                <li>ID: <strong>{info.id}</strong></li>
                <li>Title: <strong>{info.title}</strong></li>
            </ul>
        </div>
    )
}

export default LocationinfoBox
