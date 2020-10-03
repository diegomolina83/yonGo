import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Prueba from './Prueba'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 40.42,
            lng: -3.71
        },
        zoom: 7
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBJDLrdE_JV9a04dgT7DZjam5FxNXtTwAM"}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <Prueba
                        lat={40.4274}
                        lng={-3.7106144}
                        text="My Marker"
                    />
                    <Prueba
                        lat={40.4274}
                        lng={-2.7106144}
                        text="My Marker"
                    />
                    
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;