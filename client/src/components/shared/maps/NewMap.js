import morty from '../../../images/morty.png'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import useSwr from 'swr'
import useSupercluster from "use-supercluster"
import React, { useState, useRef, useEffect } from 'react';
const Marker = ({ children }) => children
const containerStyle = {
    width: '100%',
    height: '90vh'
};

const center = {
    lat: 40.42,
    lng: -3.71
};

function NewMap() {
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

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBJDLrdE_JV9a04dgT7DZjam5FxNXtTwAM"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
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
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(NewMap)