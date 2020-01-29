import React from 'react';
import { Cacher } from '../../services/cacher';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle,
    InfoWindow
  } from "react-google-maps";

  function MapComponent(props) {

    const {coordinates, isError, isLocationLoaded} = props
    

      return(
        <GoogleMap
          defaultZoom={13}
          defaultCenter={coordinates}
          center={coordinates}
          options={{
            disableDefaultUI: isError ? true : false
          }}
        >
       {isLocationLoaded && !isError && <Circle
          center={coordinates}
          radius={900}
          options={{
            fillColor: '#FF0000',
            strokeColor: 'black',
            strokeOpacity:  0,
            fillOpacity: .2
          }}
         
        /> }
        {isLocationLoaded && isError && 
          <InfoWindow position={coordinates} options={{maxWidth:300}}>
          <div>
            Ooooops, there was a problem finding your location on the map, we are trying to resolve
            the problem as fast as possible.  Please contact host for additional information if 
            you are still interested in booking this place.  We are sorry for the inconvenience.
          </div>
        </InfoWindow> }
        </GoogleMap>
      )
  }

  function withGeocode(WrappedComponent) {
    return class extends React.Component{

      constructor() {
        super();

        this.cacher = new Cacher();
        
        this.state = {
          coordinates: {
            lat: 0,
            lng: 0
          },
          isError: false,
          isLocationLoaded: false
        }

        
        
      }

      

      componentWillMount() {
        this.getGeocodedLocation();
      }

      updateCoordinates(coordinates) {
        this.setState({ 
          coordinates: coordinates,
          isLocationLoaded: true
        })
      }

      geocodeLocation(location) {
        const geocoder = new window.google.maps.Geocoder();
        return new Promise( (resolve, reject) => {
          geocoder.geocode({address: location}, (result, status) => {
            if(status === 'OK') {
              const geometry = result[0].geometry.location;
              const coordinates = {lat:geometry.lat(), lng: geometry.lng() }

              this.cacher.cacheValue(location, coordinates)

              resolve(coordinates)
            } else {
              reject('ERROR!!!!');
            }
            
          })
        })
      }

      getGeocodedLocation() {
          const location = this.props.location;

          //if location is cached return cached values
          if(this.cacher.isValueCached(location)) {
            this.updateCoordinates(this.cacher.getCachedValue(location));

          //else geocode location
          } else {
            this.geocodeLocation(location).then(
              (coordinates) => {
                this.updateCoordinates(coordinates)
              },
              (error) => {
                this.setState( {isLocationLoaded: true, isError: true})
              }
            );
          }  
      }

      render() {
        return(
          <WrappedComponent {...this.state}/>
        )
      }
    }
  }
  
  export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));
  
  