import React, {useState, useRef, useEffect} from 'react';
import './Map.css';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';
//Main Context
import {useMainContext} from '../Context/context';

function Map({center, eventData}) {
    const {selectedEvent} = useMainContext();
    const mapRef = useRef();
    const [zoom, setZoom] = useState(1);
    const [bounds, setBounds] = useState(null);
    //Info box
    const [locationInfo, setLocationInfo] = useState(null);

    //Index for reference
    const eventDataIndex = {
        8: "wildfire",
        10: "severe storms",
        12: "volcanoes",
        15: "Sea and Lake Ice"
    }

    //create an Array of its keys
    let eventDataIndexNum = Object.keys(eventDataIndex);
    eventDataIndexNum = eventDataIndexNum.map(index => Number(index));

    //set up the geo-features
    const points = eventData.map(event => ({
        "type":"Feature",
        "properties": {
            "cluster": false,
            "eventKey": event.id,
            "eventTitle": event.title,
            "eventType": event.categories[0].id
        },
        "geometry":{
            "type": "point",
            "coordinates": [event.geometries[0].coordinates[0], event.geometries[0].coordinates[1]]
        }
    }));

    //Get Cluster
    const {clusters, supercluster} = useSupercluster({
        points,
        bounds,
        zoom,
        options:{radius: 75, maxZoom: 20}
    })

    useEffect(() =>{
        if(selectedEvent !== null){
            const [longitude, latitude] = selectedEvent.geometries[0].coordinates;
            mapRef.current.panTo({lat: latitude, lng: longitude});
            mapRef.current.setZoom(10);
        }
    }, [selectedEvent])

    return (
        <div className="map-container">
            <GoogleMapReact
            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_KEY}}
            center={center}
            zoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({map}) =>{
                mapRef.current = map;
            }}
            onChange={({zoom, bounds})=>{
                setZoom(zoom);
                setBounds([
                    bounds.nw.lng,
                    bounds.se.lat,
                    bounds.se.lng,
                    bounds.nw.lat
                ]);
            }}
            onClick={() => {setLocationInfo(null)}}
            onDrag={() => {setLocationInfo(null)}}>
                {clusters.map(cluster =>{
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {cluster: isCluster, point_count: pointCount} = cluster.properties;
                    //used for icon type
                    const clusterId = cluster.properties.eventType;
                    if(isCluster){
                        let changeSize = Math.round(pointCount / points.length * 100);
                        //can't exeed 40px 
                        let addSize = Math.min(changeSize *10, 40);
                        return(
                            <section lat={latitude} lng={longitude} key={cluster.id}>
                                <div className="cluster-marker" style={{
                                    width: addSize + changeSize + "px",
                                    height: addSize + changeSize + "px"
                                }}
                                onClick={() => {
                                    const expansionZoom = Math.min(
                                        supercluster.getClusterExpansionZoom(cluster.id),
                                        20
                                    );
                                    mapRef.current.setZoom(expansionZoom);
                                    mapRef.current.panTo({lat: latitude, lng: longitude})
                                }}
                                >
                                    {pointCount}
                                </div>
                            </section>
                        )
                    }

                    //Not a cluster. just a single point
                    if(eventDataIndexNum.indexOf(clusterId) !== -1 && cluster.geometry.coordinates.length === 2){
                        return(
                            <LocationMarker 
                                lat={latitude}
                                lng={longitude}
                                id={clusterId}
                                key={cluster.properties.eventKey}
                                onClick={() =>{
                                    setLocationInfo({id: cluster.properties.eventKey, title: cluster.properties.eventTitle})
                                }}
                            />
                        )
                    }
                })}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />} 
        </div>
    );
}
Map.defaultProps ={
    center: {
        lat: 29.305561,
        lng: -3.981108
    }
}

export default Map
