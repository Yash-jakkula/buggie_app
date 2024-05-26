import React, { useState, useEffect, useContext } from 'react';
import Mapbox, { UserLocation, locationManager } from '@rnmapbox/maps';
import {MapView,Camera,PointAnnotation,ShapeSource,LineLayer} from '@rnmapbox/maps'
import {Alert, View,Image} from 'react-native';
import { Context } from '../context/ContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import {Text} from 'react-native-paper'
import store from '../state';
Mapbox.setAccessToken('pk.eyJ1IjoieWFzaHdhbnRoLWpha2t1bGEwMSIsImEiOiJjbHN4azMxbW0wNDduMmttdWs2ZDlyaHNtIn0.KFgUbCV1z7q6kCsJ9NCPoQ');


const StudentRouteMap = () => {

  const [rideData,setRideData] = React.useState(); 
  const {user} = useContext(Context);
  const dispatch = useDispatch();
  const [studentLocation, setStudentLocation] = useState([]);
  const [driverLocation, setDriverLocation] = useState([]);
  const [isGranted,setPermissionIsGranted] = useState(false);
  const [rideAcceptData,setRideAcceptData] = useState(false);
  const [route,setRoute] = useState();
  const {student,setStudent} = useContext(Context);
  

  // setInterval(()=>{
  //   const getLoc = ()=>{
  //   const loc = store.getState().LiveLocation;
  //   if(loc && ride){
  //     setDriverLocation([loc.longitude,loc.latitude]);
  //     setRideData(ride);
  //   }
  //   }
  //   getLoc();
  // },1000*60)

  useEffect(()=>{
    // const loc = store.getState().LiveLocation;
    if(student){
      // setDriverLocation([loc.longitude,loc.latitude]);
      setRideData(student);
    }
  },[student])
  

  // useEffect(() => {
  //   async function fetchUserLocation() {
  //     if (Platform.OS === 'android') {
  //       await requestLocationPermission();
  //       console.log(isGranted)
  //     }
  //     Mapbox.setTelemetryEnabled(false);
    
      
  //     // Subscribe to user location updates
  //   }

  //   fetchUserLocation();
  //   return() =>  {
      
  //   }
  // }, []);

  // Request location permission for Android
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        setPermissionIsGranted(true);
        console.log(isGranted)
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  
  const [routeGeometry, setRouteGeometry] = useState(null);  
  let socket =""

  

  useEffect(() => {
    const getDirections = async () => {
   
      try {
        const apiKey = 'pk.eyJ1IjoieWFzaHdhbnRoLWpha2t1bGEwMSIsImEiOiJjbHN4azMxbW0wNDduMmttdWs2ZDlyaHNtIn0.KFgUbCV1z7q6kCsJ9NCPoQ';
    
        if(driverLocation && rideData){       
          console.log(rideData) 
          console.log(driverLocation,"d");
        if(driverLocation[1] > -90 && driverLocation[1] < 90){
        const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${driverLocation[0]},${driverLocation[1]};${rideData.pickup[1]},${rideData.pickup[0]};${rideData.drop[1]},${rideData.drop[0]}?geometries=geojson&access_token=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('route', data);
        const rda = data.routes;
        setRoute(rda[0]);
        if (data.routes && data.routes.length > 0) {
          const routeCoordinates = data.routes[0].geometry.coordinates;
          setRouteGeometry({
            type: 'LineString',
            coordinates: routeCoordinates,
          });
        
        } else {
          console.error('No route found');
        }
      
      }
    }
      else{
        console.error("unable to fetch location");
      }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    };
  
    // Call the function to fetch directions
    getDirections();
  }, [driverLocation,rideData]);
   // Include 'socket' as a dependency if it's coming from outside of the component
  
   

  return (
    <View style={{width:'100%',height:'100%'}}>
    <MapView style={{ flex: 1 }}>
      <Camera
        zoomLevel={15}
        centerCoordinate={[79.15989090857764,12.968405733753187]} // Adjust the center coordinates based on your use case
       />
      {rideData && routeGeometry && (
  <>
    
    <ShapeSource id="routeSource" shape={routeGeometry}>
      <LineLayer
        id="routeLayer"
        style={{ lineColor: 'blue', lineWidth: 5 }}
      />
    </ShapeSource>
    {/* Marking the initial point */}
    {driverLocation[0] !== rideData.drop[1] ? 
    (
      <>
          <PointAnnotation
      id="initialPoint"
      coordinate={driverLocation} 
    >
      <Image
        source={require('../assests/car.png')}
        style={{ width: 30, height: 30 }}
      />
    </PointAnnotation>
    
    {/* Marking the final point */}
      
    <PointAnnotation
      id="finalPoint"
      coordinate={[rideData.pickup[1],rideData.pickup[0]]} // Assuming [latitude, longitude]
    >
      <View style={{width: 20, height: 20, backgroundColor: 'blue', borderRadius: 15}} />
    </PointAnnotation>
    
      
    <PointAnnotation
      id="finalPoint"
      coordinate={[rideData.drop[1],rideData.drop[0]]} // Assuming [latitude, longitude]
    >
      <View style={{width: 20, height: 20, backgroundColor: 'red', borderRadius: 15}} />
    </PointAnnotation>
    </>
    )
  :(
  <>
  <View>
    {
      Alert.alert("Destination Arrived")
    }
  </View>
  </>
  )
  }
    <View>
      
    </View>
  </>
      )
}
{ 
<UserLocation 
androidRenderMode='gps'
onUpdate={(location)=>{
  if(location.coords.latitude>-90 && location.coords.longitude < 90)
  setDriverLocation([location.coords.longitude,location.coords.latitude])
}}
/>
}

    </MapView>
    { route &&
    <View style={{justifyContent:'center',flexDirection:'row',gap:10}}>  
    
    <Text variant='titleMedium'>shuttle arrives in:{((route.duration / (60) )/ 10).toFixed(2)} min</Text>
    </View>
    }
  </View>
  
  );
};

export default StudentRouteMap;


