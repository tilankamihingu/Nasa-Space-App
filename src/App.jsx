import React, {useEffect, useState} from 'react'; 
import './App.css';
import Loader from './Components/Loader';
import Map from './Components/Map';
import Search from './Components/Search';
import {useMainContext} from './Context/context';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Instruction from './Components/Instruction';

 
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

  useEffect(() =>{
    if(reRenderMarkers !== null){
      setRenderEvent(reRenderMarkers);
    }
  }, [reRenderMarkers])
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          {!loading ? <Map eventData={renderEvent} /> : <Loader />}
          {!loading && <Search />}
      </Route>
      <Route path="/instruction">
        <Instruction />
      </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
