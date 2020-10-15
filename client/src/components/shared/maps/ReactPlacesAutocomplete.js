import React from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete"

import Form from 'react-bootstrap/Form'


export default function ReactPlacesAutocomplete(props) {

    const [address, setAddress] = React.useState()
    const [, setCoordinates] = React.useState({ lat: null, lng: null })

    React.useEffect(() => {

        console.log('props.inputValue es: ', props.inputValue)

        setAddress(props.inputValue)
    }, [props])

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        setAddress(value)
        setCoordinates(latLng)
        await props.getCoords([latLng.lat, latLng.lng], value, props.flag)
    }


    return <div>
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className={`searchBar ${props.newClass}`}>
                <Form.Control {...getInputProps({ placeholder: "Escribe dirección" })} />

                <div>
                    {loading ? <div>...loading</div> : null}

                    {
                        suggestions.map((suggestion, idx) => {
                            const style = {
                                backgroundColor: suggestion.active ? "#5f7ab8" : "#fff"
                            }
                            return <div{...getSuggestionItemProps(suggestion, { style })} key={idx}>
                                {suggestion.description}</div>
                        })
                    }
                </div>
            </div>)}

        </PlacesAutocomplete>

    </div >
}

