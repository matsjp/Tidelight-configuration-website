import React, {useState} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { latLonCharacteristicUUID } from '../UUIDs';

const containerStyle = {
  width: '400px',
  height: '400px'
};

function Map(props) {

  const [markerPosition, setMarkerPosition] = useState(props.center);

  const mapClick = (e)=> {
    setMarkerPosition(e.latLng);
    const latLon = e.latLng.lat() + ":" + e.latLng.lng();
    props.updateNewLatLon(latLon);
  }


  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={10}
        clickableIcons={false}
        options={{mapTypeControl: false}}
        onClick={mapClick}
      >
        <Marker position={markerPosition}></Marker>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map