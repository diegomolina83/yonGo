import React, { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import useSwr from 'swr'
import useSupercluster from "use-supercluster"

import morty from '../../../images/morty.png'
import CardList from './CardList'
import './Maps.css'

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Marker = ({ children }) => children
let test = []

export default function SimpleMap() {

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
        geometry: { type: "Point", coordinates: [parseFloat(plan.location.start.lng), parseFloat(plan.location.start.lat)] }
    }))

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 200, maxZoom: 13 }

    })

    const drawPlans = () => {
        clusters.forEach(element => {
            let elemento = element.properties
            test.push(elemento)
            return test
        });
    }


    return (
        // Important! Always set the container height explicitly
        <>

            <div className="map" style={{
                height: '90vh', width: '100%'
            }}>
                <GoogleMapReact
                    // layerTypes={['TrafficLayer', 'TransitLayer']}
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_API_KEY,
                        libraries: ['places']
                    }}
                    defaultCenter={{
                        lat: 40.42,
                        lng: -3.71
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
                            <button className="crime-marker">
                                <img src={morty} alt="Crímenes"></img>
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


