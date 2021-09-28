import React, {useState, useRef, useEffect} from 'react';
import './Map.css';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import LocationMarker from './LocationMarker';

function Map({center, eventData}) {
    const mapRef = useRef();
    const [zoom, setZoom] = useState(1);
    const [bounds, setBounds] = useState(null);

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
            cluster: false,
            "eventKey": event.id,
            "eventTitle": event.title,
            "eventType": event.categories[0].id
        },
        "geometries":{
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

    return (
        <div className="map-container">
            <GoogleMapReact
            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_KEY}}
            center={center}
            zoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={(({map}) =>{
                mapRef.current = map;
            })}
            onChange={({zoom, bounds})=>{
                setZoom(zoom);
                setBounds([
                    bounds.nw.lng,
                    bounds.se.lat,
                    bounds.se.lng,
                    bounds.nw.lat
                ]);
            }}>
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
                                }}>
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
                            />
                        )
                    }
                })}
            </GoogleMapReact>
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
