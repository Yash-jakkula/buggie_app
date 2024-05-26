import React from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {MapView,Camera} from '@rnmapbox/maps'
import RouteMap from './routeMap';
import { Context } from '../context/ContextProvider';
Mapbox.setAccessToken('pk.eyJ1IjoieWFzaHdhbnRoLWpha2t1bGEwMSIsImEiOiJjbHN4azMxbW0wNDduMmttdWs2ZDlyaHNtIn0.KFgUbCV1z7q6kCsJ9NCPoQ');

const ViewMap = () => {
  const {showRoute,setShowRoute} = React.useContext(Context);
  const initialCoords = [79.16013297793172, 12.968599154614157];

  return (
    <>
    
    <View style={styles.Mappage}>
      <View style={styles.container}>
      <MapView
      style={styles.map}
      styleURL={Mapbox.StyleURL.Street}
      centerCoordinate={initialCoords}
      zoomEnabled={true}
      scrollEnabled={true}
    >
      <Camera
        minZoomLevel={9}
        maxZoomLevel={25}
        centerCoordinate={initialCoords}
      />
      
    </MapView>
      </View>
    </View> 
    </>
  );
}

export default ViewMap;

const styles = StyleSheet.create({
  Mappage: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    height: "100%",
    width: "100%",
    borderTopLeftRadius:30,
    borderTopRightRadius:30
  },
  map: {
    flex: 1,
    width:"100%",
    height:"100%"
  }
});