import React, { useEffect, useRef, useState } from 'react';
import {useMainContext} from '../Context/context';

function Search() {

    const {eventData, setSelectedEvent, setReRenderMarkers} = useMainContext();
    //Matching result
    const [matchEvent, setMatchEvent] = useState(eventData);
    //Handle Dropdown
    const [storeSelection, setStoreSelection] = useState("All");

    const searchBox = useRef();
    const optionBox = useRef();

    //filter event data
    const filterEventData = eventData =>{
        //spread operator don't overwrite Referance Data
        let filterdEventData = [...eventData];
        if(storeSelection !== "All"){
            filterdEventData = filterdEventData.filter(event => event.categories[0].title === storeSelection);
        }
        return filterdEventData;
    }

    const userSearch = (searchQuery, eventData) =>{
        let eventMatch = [];
        let filterdEventData = filterEventData(eventData);
        if(searchQuery.length > 0 && filterdEventData){
            for(const event in eventData){
                let eventTitle = filterdEventData[event].title.toLowerCase();
                if(eventTitle.indexOf(searchQuery) !== -1){
                    eventMatch.push(filterdEventData[event]);
                }
            }
            //If they have typed in something but it didn't match
            if(eventMatch.length === 0){
                eventMatch = [{title:"No result!!!", categories: [{title: ""}]}]
            }
            setMatchEvent(eventMatch);
        }else{
            setMatchEvent(filterdEventData);
        }
    }
    
    useEffect(() => {
        //sort out the markers
        let filterdEventData = filterEventData(eventData);
        setReRenderMarkers(filterdEventData);
        userSearch(searchBox.current.value.toLowerCase(), filterdEventData)
    }, [storeSelection])
    

    return (
        <>
            <section className="option-container">
                <p>Type:</p>
                <select ref={optionBox} onChange={() => {setStoreSelection(optionBox.current.value)}}>
                    <option value="All">All</option>
                    <option value="Wildfires">Wildfires</option>
                    <option value="Severe Storms">Severe Storms</option>
                    <option value="Volcanoes">Volcanoes</option>
                    <option value="Sea and Lake Ice">Sea and Lake Ice</option>
                </select>
            </section>
            <section className="search-container">
                <p>Search:</p>
                <input type="text" ref={searchBox}
                    onKeyUp={() =>{
                        let searchQuery = searchBox.current.value.toLowerCase();
                        //want to wait for the user to finish typing before sending method
                        setTimeout(() =>{
                            if(searchQuery === searchBox.current.value.toLowerCase()){
                                userSearch(searchQuery, eventData);
                            }
                        }, 300)
                    }}
                />
            </section> 
            <table className="search-table">
                <tr>
                    <th style={{width: "60%"}}>Title</th>
                    <th>Type</th>
                    <th>Location</th>
                </tr>
                {matchEvent.map(ev =>{
                    return(
                        <tr key={ev.id}>
                            <td>{ev.title}</td>
                            <td>{ev.categories[0].title}</td>
                            {ev.categories[0].title ? <td><a 
                            href="#"
                            onClick={() => {setSelectedEvent(ev)}}
                            >Click Here</a></td> : <td></td>}
                        </tr>
                    )
                })}
            </table> 
        </>
    )
}

export default Search
