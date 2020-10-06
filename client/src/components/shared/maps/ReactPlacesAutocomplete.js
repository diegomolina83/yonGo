import React, { useState } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete"

import Form from 'react-bootstrap/Form'


export default function ReactPlacesAutocomplete(props) {
    const [address, setAddress] = React.useState("")
    const [coordinates, setCoordinates] = React.useState({ lat: null, lng: null })

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        setAddress(value)
        setCoordinates(latLng)
        console.log(".............",latLng)
        await props.getCoords([latLng.lat, latLng.lng])

    }

console.log("valor desde otra funcion ",props.placeholder)
    return <div>
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <Form.Control {...getInputProps({ placeholder: "Escribe dirección" })} />
                <div>

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

