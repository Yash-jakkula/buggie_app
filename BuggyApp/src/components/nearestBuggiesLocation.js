import React, { useContext, useEffect, useState } from 'react';
import Mapbox from '@rnmapbox/maps';
import {MapView,PointAnnotation,Camera} from '@rnmapbox/maps'
import { Context } from '../context/ContextProvider';
import { View, StyleSheet } from 'react-native';
import { Text,Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

import RouteMap from './routeMap';
import StudentRouteMap from './studentRouteMap';

// Replace with your Mapbox access token
Mapbox.setAccessToken('pk.eyJ1IjoieWFzaHdhbnRoLWpha2t1bGEwMSIsImEiOiJjbHN4azMxbW0wNDduMmttdWs2ZDlyaHNtIn0.KFgUbCV1z7q6kCsJ9NCPoQ');

const NearestBuggiesLocation = () => {
  const { nearestDrivers, driverInfo, showRoute,setShowRoute } = useContext(Context);
  console.log(showRoute);
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);
  const userRole = useSelector((state)=>state.userRole);

  useEffect(() => {
    if (nearestDrivers && nearestDrivers.length > 0) {
      const newCoordinates = nearestDrivers.map((item) => ({
        lat: item.location.coordinates[0],
        lon: item.location.coordinates[1],
      }));

      setSelectedCoordinates([...selectedCoordinates, ...newCoordinates]);
    }
  }, [nearestDrivers]);
 

 

  return (
    <>
      {!showRoute ? (
        !driverInfo ? (
          <MapView
            style={styles.map}
            styleURL='mapbox://styles/mapbox/streets-v12'
            zoomEnabled={true}
            scrollEnabled={true}
          >
            {selectedCoordinates &&
              selectedCoordinates.map((coordinates) => (
                <>
                <Camera
                  key={`camera-${coordinates.lat}`}
                  zoomLevel={15}
                  centerCoordinate={[coordinates.lon, coordinates.lat]}
                />

                <PointAnnotation
                  key={`marker-${coordinates.lat}`}
                  id={`marker-${coordinates.lat}`}
                  coordinate={[coordinates.lon, coordinates.lat]}
                />
                </>
              ))}
          </MapView>
        ) : (
          <MapView
            style={styles.map}
            styleURL='mapbox://styles/mapbox/streets-v12'
            zoomEnabled={true}
            scrollEnabled={true}
          >
            {driverInfo && (
              <>
                <Camera
                  key={`camera-${driverInfo.driverLocation[0]}`}
                  zoomLevel={15}
                  centerCoordinate={[driverInfo.driverLocation[1], driverInfo.driverLocation[0]]}
                />

                <PointAnnotation
                  key={`marker-${driverInfo.driverLocation[0]}`}
                  id={`marker-${driverInfo.driverLocation[0]}`}
                  coordinate={[driverInfo.driverLocation[1], driverInfo.driverLocation[0]]}
                />
              </>
            )}
          </MapView>
        )
      ) : (
        <>  
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          {userRole && userRole == 'driver' ?
         <RouteMap /> :
        <StudentRouteMap />
      }
        </View>
        </>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default NearestBuggiesLocation;
