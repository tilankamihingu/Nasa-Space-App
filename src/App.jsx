import React, {useEffect, useState} from 'react'; 
import './App.css';
import Loader from './Components/Loader';
import Map from './Components/Map';
import {useMainContext} from './Context/context';

function App() {
  const {setEventData, reRenderMarkers} = useMainContext();
  const [loading, setLoading] = useState(false);
  //Event to render
  const [renderEvent, setRenderEvent] = useState([]);

  useEffect(() =>{
    const fetchEvents = async () =>{
      setLoading(true);
      const res = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events");
      //extract the array contained in the 'events' fields
      const {events} = await res.json();
      //Event data is globally accessible but 'renderEvent' is just to render our the map with the markers
      setEventData(events);
      setRenderEvent(events);
      setLoading(false);
    }
    fetchEvents();
  },[])
  return (
    <div className="App">
      {!loading ? <Map eventData={renderEvent} /> : <Loader />}
    </div>
  );
}

export default App;
