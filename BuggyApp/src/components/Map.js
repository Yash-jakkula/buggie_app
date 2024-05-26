import React from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { Context } from '../context/ContextProvider';
import NearestBuggieLocation from './nearestBuggiesLocation';
import ViewMap from './ViewMap';
Mapbox.setAccessToken('pk.eyJ1IjoieWFzaHdhbnRoLWpha2t1bGEwMSIsImEiOiJjbHN4azMxbW0wNDduMmttdWs2ZDlyaHNtIn0.KFgUbCV1z7q6kCsJ9NCPoQ');

const MapScreen = () => {
 const {nearestDrivers} = React.useContext(Context);
 const{user} = React.useContext(Context);
  const initialCoords = [79.16013297793172, 12.968599154614157];

  return (
    <>
    {!nearestDrivers ? <ViewMap /> : <NearestBuggieLocation />}
    </>
  );
}

export default MapScreen;

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