import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import useSwr from 'swr'
import useSupercluster from "use-supercluster"
import morty from '../../../images/morty.png'
import CardList from './CardList'
import PlacesAutocomplete from './PlacesAutocomplete'
import ReactPlacesAutocomplete from './ReactPlacesAutocomplete'
import './Maps.css'


const Marker = ({ children }) => children


export default function SimpleMap() {

    const [lat, setLatitude] = useState(40.42)
    const [lng, setLongitude] = useState(-3.71)
    const [zoom, setZoom] = useState(10);
    const [bounds, setBounds] = useState(null);
    const mapRef = useRef();
    const url = "http://localhost:5000/api/getAllPlans"
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSwr(url, fetcher)
    const plans = data && !error ? data.slice(0, 1000) : []

    const points = plans.map(plan => ({
        type: "Feature",
        properties: {
            cluster: false,
            planId: plan._id,
            title: plan.title,
            markAmount: plan.mark.amount

        },
        geometry: { type: "Point", coordinates: [parseFloat(plan.start.location.lng), parseFloat(plan.start.location.lat)] }
    }))


    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 200, maxZoom: 13 }

    })

    // useEffect(() => {
    //     <script defer src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAFg3MgHL8DLNcbFOQc0MyBxKMyFSn9J3I">
    //     </script>
    // });

    function handleCoords(params) {

        mapRef.current.setCenter({ lat: params[0], lng: params[1] })
        mapRef.current.setZoom(12)
        console.log(mapRef.current)
        
        
    }

    return (
        // Important! Always set the container height explicitly
        <>

            <div className="map" style={{
                height: '90vh', width: '100%'
            }}>
                {/* {<PlacesAutocomplete />} */}
                <ReactPlacesAutocomplete handleCoords={handleCoords} />
                <GoogleMapReact
                    // layerTypes={['TrafficLayer', 'TransitLayer']}
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_API_KEY,
                        libraries: ['places,geometry']
                    }}
                    defaultCenter={{
                        lat: lat,
                        lng: lng
                    }}
                    defaultZoom={7}
                    onChange={({ zoom, bounds }) => {
                        setZoom(zoom)
                        setBounds([
                            bounds.nw.lng,
                            bounds.se.lat,
                            bounds.se.lng,
                            bounds.nw.lat
                        ])
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map }) => {
                        mapRef.current = map;
                    }}
                >

                    {clusters.map(cluster => {
                        const [longitude, latitude] = cluster.geometry.coordinates
                        const { cluster: isCluster } = cluster.properties
                        if (isCluster) {
                            return <Marker
                                key={cluster.id}
                                lat={latitude}
                                lng={longitude}
                            >
                                <div className="cluster-marker" style={{
                                    width: `${10 + (cluster.properties.point_count / points.length) * 30}px`,
                                    height: `${10 + (cluster.properties.point_count / points.length) * 30}px`

                                }}
                                    onClick={() => {
                                        const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20)
                                        mapRef.current.setZoom(expansionZoom)
                                        mapRef.current.panTo({ lat: latitude, lng: longitude })
                                    }}
                                >
                                    {cluster.properties.point_count}
                                </div>
                            </Marker>;
                        }
                        return (<Marker
                            key={cluster.properties.crimeId}
                            lat={latitude}
                            lng={longitude}
                        >
                            <button className="plan-marker">
                                <img src={morty} alt="Plan"></img>
                            </button>
                        </Marker>)
                    })}
                </GoogleMapReact>

                <div className="cardContainer">
                    <CardList clusters={clusters} />
                </div>

            </div >
        </>
    );
}


