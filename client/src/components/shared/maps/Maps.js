import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import useSwr from 'swr'
import { Link } from 'react-router-dom'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import useSupercluster from "use-supercluster"

import Filtro from '../../pages/filtro/Filtro'
import CardList from './CardList'
import './Maps.css'
import '../../pages/filtro/Filtro.css'
//images
import viaje from '../../../images/viaje.png'
import atleta from '../../../images/atleta.png'
import fastfood from '../../../images/fastfood.png'
import museo from '../../../images/museo.png'
import nuknuk from '../../../images/nuknuk.png'


const Marker = ({ children }) => children
const renderOption = ["Todos"]

export default function SimpleMap(props) {

    const lat = 40.42
    const lng = -3.71
    const [zoom, setZoom] = useState(10)
    const [bounds, setBounds] = useState(null)
    const [renderFlag, setRenderFlag] = useState(true)
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
            imageUrl: plan.imageUrl,
            markAmount: plan.mark.amount
        },
        geometry: { type: "Point", coordinates: [parseFloat(plan.start.location.lng), parseFloat(plan.start.location.lat)] }
    }))


    //Clusters
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 200, maxZoom: 20 }

    })


    let markers = []
    let markerMap
    useEffect(() => {

        //Centrar el mapa con las coordenadas de la dirección introducida
        let myLatLng
        mapRef.current && props.coords.lat ? myLatLng = { lat: props.coords.lat, lng: props.coords.lng } : console.log()
        mapRef.current && props.coords.lat ? mapRef.current.setCenter(myLatLng) : console.log()

        //Crear un marcador en esa dirección
        if (mapRef.current && props.coords.lat) {
            markerMap = new window.google.maps.Marker({
                position: myLatLng,
                map: mapRef.current,
                title: "¡Mira todas las actividades!",
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


    //Función para que muestre una tarjeta al hacer onMouseOver en un marcador
    function showCard(val) {
        document.getElementById(`card${val}`).classList.add("cardSelected")
        document.getElementById(`card${val}`).classList.remove("cardUnselected")
    }


    //Función para ocultar la tarjeta al hacer onMouseOut en un marcador
    function hideCard(val) {
        document.getElementById(`card${val}`).classList.add("cardUnselected")
        document.getElementById(`card${val}`).classList.remove("cardSelected")

    }

    //Función para filtrar Cards
    function filter(type) {
        setRenderFlag(!renderFlag)

        if (!renderOption.includes(type)) renderOption.push(type)
        else (renderOption.splice(renderOption.indexOf(type), 1))

    }

    //Función para renderizar cards según el filtro
    let parametros = []
    function renderList(params) {
        let clustersSport = params.filter(cluster => cluster.properties.category === "sport")
        let clusterCulture = params.filter(cluster => cluster.properties.category === "culture")
        let clusterTravel = params.filter(cluster => cluster.properties.category === "travel")
        let clusterCulinary = params.filter(cluster => cluster.properties.category === "culinary")
        let clusterOther = params.filter(cluster => cluster.properties.category === "other")

        renderOption.includes("Todos") ? parametros = params : params = []

        renderOption.includes("Deporte") ? parametros = [...parametros, ...clustersSport] : console.log()
        renderOption.includes("Gastronomía") ? parametros = [...parametros, ...clusterCulinary] : console.log()
        renderOption.includes("Cultura") ? parametros = [...parametros, ...clusterCulture] : console.log()
        renderOption.includes("Viajes") ? parametros = [...parametros, ...clusterTravel] : console.log()
        renderOption.includes("Otros") ? parametros = [...parametros, ...clusterOther] : console.log()

        return (
            <div className="cardContainer">
                <CardList highlightPlan={highlightPlan} understate={understate} clusters={parametros} />
            </div>
        )
    }


    //Función para filtrar los marcadores 
    function typeOfMarker(cluster) {

        let category = cluster.properties.category
        if (renderOption.includes("Todos")) return cluster
        else if (renderOption.includes("Deporte") && category === "sport") return (category === "sport")
        else if (renderOption.includes("Viajes") && category === "travel") return (category === "travel")
        else if (renderOption.includes("Cultura") && category === "culture") return (category === "culture")
        else if (renderOption.includes("Gastronomía") && category === "culinary") return (category === "culinary")
        else if (renderOption.includes("Otros") && category === "other") return (category === "other")
    }

    //Función para cambiar el color de los botones de los filtros
    function buttonColor(category) {
        if (renderOption.includes(category)){ return  "active" }  else return  "inactive" 
    }


    //Popover con información de cada marker
    const popoverHoverFocus = (params) => {

        return (
            <div style={{ height: 120, width: 200 }}>
                <Popover
                    id="popover-basic"
                    placement="right"
                    positionLeft={200}
                    positionTop={50}
                    title="Popover right"
                >
                    <img className="popoverImage " src={params.imageUrl}></img>
                    {params.title} <strong>{params.description}</strong>
                </Popover>
            </div>
        )
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

                        if (isCluster && renderOption.includes("Todos")) {
                            return <Marker
                                key={cluster.id}
                                lat={latitude}
                                lng={longitude}
                            >
                                <div className="cluster-marker" style={{
                                    width: `${50 + (cluster.properties.point_count / points.length) * 50}px`,
                                    height: `${50 + (cluster.properties.point_count / points.length) * 50}px`

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


                        let newCluster = typeOfMarker(cluster)

                        if (newCluster) {
                            return (<Marker
                                key={cluster.properties.planId}
                                lat={latitude}
                                lng={longitude}
                            >
                                <OverlayTrigger
                                    trigger={['hover', 'focus']}
                                    placement="bottom"
                                    overlay={popoverHoverFocus(cluster.properties)}
                                // container={cluster.properties}

                                >
                                    <Link to={{
                                        pathname: `/plans/details/${cluster.properties.planId}`,
                                        cardProps: {
                                            cardProps: cluster
                                        }
                                    }}>

                                        <button onMouseOver={() => { showCard(cluster.properties.planId) }} onMouseOut={() => hideCard(cluster.properties.planId)} id={`${cluster.properties.planId}`} className={`plan-marker`}>
                                            <img src={imageName} alt="Plan"></img>
                                        </button>
                                    </Link>

                                </OverlayTrigger>
                            </Marker>
                            )
                        }
                    })}
                </GoogleMapReact>
                <div className="filtersButton">
                    {console.log(buttonColor("Viajes"))}
                    <Filtro filter={() => filter("Deporte")} name={"Deporte"} src={atleta} buttonColor={buttonColor("Deporte")}/>
                    <Filtro filter={() => filter("Viajes")} name={"Viajes"} src={viaje} buttonColor={buttonColor("Viajes")}/>
                    <Filtro filter={() => filter("Gastronomía")} name={"Gastronomía"} src={fastfood} buttonColor={buttonColor("Gastronomía")}/>
                    <Filtro filter={() => filter("Cultura")} name={"Cultura"} src={museo} buttonColor={buttonColor("Cultura")}/>
                    <Filtro filter={() => filter("Otros")} name={"Otros"} src={nuknuk} buttonColor={buttonColor("Otros")}/>
                    <Filtro filter={() => filter("Todos")} name={"Todos"} buttonColor={buttonColor("Todos")}/>
                </div>

                {renderList(clusters)}
                {/* <div className="cardContainer">
                    <CardList highlightPlan={highlightPlan} understate={understate} clusters={clusters} />
                </div> */}

            </div >

        </>
    );
}


