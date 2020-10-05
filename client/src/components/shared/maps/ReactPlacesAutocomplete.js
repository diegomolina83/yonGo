import React, { useState } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete"

export default function ReactPlacesAutocomplete({ handleCoords }) {
    const [address, setAddress] = React.useState("")
    const [coordinates, setCoordinates] = React.useState({ lat: null, lng: null })

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        setAddress(value)
        setCoordinates(latLng)

    }

    
coordinates.lat ? handleCoords([coordinates.lat,coordinates.lng]) : console.log("no pasa na")
   

    return <div>
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <input {...getInputProps({ placeholder: "Type Address" })} />
                <div>
                    <p>Latitude:{coordinates.lat}</p>
                    <p>Latitude:{coordinates.lng}</p>


                </div>
                <div>
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map((suggestion) => {
                        const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                        }
                        return <div{...getSuggestionItemProps(suggestion, { style })}>
                            {suggestion.description}</div>
                    })}
                </div>
            </div>)}

        </PlacesAutocomplete>

    </div>
}

