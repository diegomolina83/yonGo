import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import useSwr from 'swr'
import { Link } from 'react-router-dom'

import useSupercluster from "use-supercluster"
import viaje from '../../../images/viaje.png'
import atleta from '../../../images/atleta.png'
import fastfood from '../../../images/fastfood.png'
import museo from '../../../images/museo.png'
import nuknuk from '../../../images/nuknuk.png'
import CardList from './CardList'
import './Maps.css'


const Marker = ({ children }) => children


export default function SimpleMap(props) {

    const lat = 40.42
    const lng = -3.71
    const [zoom, setZoom] = useState(10);
    const [bounds, setBounds] = useState(null);
    const mapRef = useRef();
    const url = "http://localhost:5000/api/getAllPlans"
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSwr(url, fetcher)
    const plans = data && !error ? data.slice(0, 2000) : []
    const points = plans.map(plan => ({
        type: "Feature",
        properties: {
            cluster: false,
            planId: plan._id,
            title: plan.title,
            category: plan.category,
            description: plan.description,
            requirements: plan.requirements,
            markAmount: plan.mark.amount
        },
        geometry: { type: "Point", coordinates: [parseFloat(plan.start.location.lng), parseFloat(plan.start.location.lat)] }
    }))


    //Clusters
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 200, maxZoom: 13 }

    })


    let markers = []
    let markerMap
    useEffect(() => {

        //Centrar el mapa con las coordenadas del a dirección introducida
        let myLatLng
        mapRef.current && props.coords.lat ? myLatLng = { lat: props.coords.lat, lng: props.coords.lng } : console.log()
        mapRef.current && props.coords.lat ? mapRef.current.setCenter(myLatLng) : console.log()

        //Crear un marcador en esa dirección
        if (mapRef.current && props.coords.lat) {
            markerMap = new window.google.maps.Marker({
                position: myLatLng,
                map: mapRef.current,
                title: "Hello World!",
            })
        }

        markers.push(markerMap)
        mapRef.current && props.coords.lat ? markers.push(markerMap) : console.log()
        mapRef.current && props.coords.lat ? markers.map(elem => elem.setMap(window.google.maps)) : console.log()
        // mapRef.current ? mapRef.current.setZoom(12) : console.log("") --> Podemos utilizarla en un futuro
    })


    //Función para que los marcadores aumenten de tamaño al hacer un OnMouseOver en las cards (viene de Card.js)
    function highlightPlan(val) {
        document.getElementById(val).classList.replace("plan-marker", "highlight")
    }


    //Función para que los marcadores disminuyan de tamaño al hacer un onMouseOut en las cards (viene de Card.js)
    function understate(val) {
        document.getElementById(val).classList.replace("highlight", "plan-marker")
    }


    return (
        <>
            <div className="map" style={{
                height: '90vh', width: '100%'
            }}>

                <GoogleMapReact
                    // layerTypes={['TrafficLayer', 'TransitLayer']} --> Posibles capas de carreteras pra el mapa
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_API_KEY,
                        libraries: ['places,geometry']
                    }}

                    options={{
                        fullscreenControl: false,
                        // streetViewControl:true
                    }}
                    defaultCenter={{
                        lat: lat,
                        lng: lng
                    }}
                    defaultZoom={15}

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
                        // console.log("CLUSTER", cluster)
                        let imageName;
                        switch (cluster.properties.category) {
                            case "travel":
                                imageName = viaje
                                break;
                            case "sport":
                                imageName = atleta
                                break;
                            case "culinary":
                                imageName = fastfood
                                break;
                            case "culture":
                                imageName = museo
                                break;
                            default:
                                imageName = nuknuk
                                break;
                        }

                        return (<Marker
                            key={cluster.properties.planId}
                            lat={latitude}
                            lng={longitude}
                        >
                            <Link to={{
                                pathname: `/plans/details/${cluster.properties.planId}`,
                                cardProps: {
                                    cardProps: cluster
                                }
                            }}>
                                <button onMouseOver={() => console.log(cluster)} id={`${cluster.properties.planId}`} className={`plan-marker`}>
                                    <img src={imageName} alt="Plan"></img>
                                </button></Link>
                        </Marker>
                        )
                    })}
                </GoogleMapReact>
                <div className="cardContainer">
                    <CardList highlightPlan={highlightPlan} understate={understate} clusters={clusters} />
                </div>

            </div >
        </>
    );
}


