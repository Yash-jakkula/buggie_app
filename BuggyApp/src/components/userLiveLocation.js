import BackgroundGeolocation from "react-native-background-geolocation";
import { locationActions } from "../state/location-slice/LiveLocation";
import store from "../state";
import { Context } from "../context/ContextProvider";
import socket from './Socket';

const userLiveLocation =(role) => {
  console.log('background');
BackgroundGeolocation.ready({
  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  stationaryRadius: 50,
  distanceFilter: 50,
  notificationTitle: 'Background tracking',
  notificationText: 'enabled',
  debug: true,
  startOnBoot: false,
  stopOnTerminate: true,
  locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
  interval: 60000, // Fetch location every 1 minute
  fastestInterval: 5000, // Fetch location at least every 5 seconds
  activitiesInterval: 10000,
  stopOnStillActivity: false,
});

BackgroundGeolocation.onLocation((location) => {
  store.dispatch(locationActions.setUserLocation(location));
  const loc = store.getState((state)=> state.LiveLocation);
  const emitData = [loc.LiveLocation.longitude,loc.LiveLocation.latitude,role]
  socket.emit('DriverLiveLocation',emitData);
  }
);

BackgroundGeolocation.start();
}

export default userLiveLocation;
