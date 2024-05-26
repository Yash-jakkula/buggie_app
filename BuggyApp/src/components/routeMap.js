import React, { useState, useEffect, useContext } from 'react';
import Mapbox, { UserLocation, locationManager } from '@rnmapbox/maps';
import {MapView,Camera,PointAnnotation,ShapeSource,LineLayer} from '@rnmapbox/maps'
import {Alert, View,Image} from 'react-native';
import { Context } from '../context/ContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import {Text} from 'react-native-paper'
import store from '../state';


Mapbox.setAccessToken('pk.eyJ1IjoieWFzaHdhbnRoLWpha2t1bGEwMSIsImEiOiJjbHN4azMxbW0wNDduMmttdWs2ZDlyaHNtIn0.KFgUbCV1z7q6kCsJ9NCPoQ');
const RouteMap = () => {
  const [rideData,setRideData] = React.useState(); 
  
  const [points,setPoints] = useState([]);
  const dispatch = useDispatch();
  const [studentLocation, setStudentLocation] = useState([]);
  const [driverLocation, setDriverLocation] = useState([]);
  const [isGranted,setPermissionIsGranted] = useState(false);
  const [rideAcceptData,setRideAcceptData] = useState(false);
  const [route,setRoute] = useState();
  const [student,setStudent] = useState()
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const ride = useSelector((state)=>state.Ride);
  const driver = useSelector((state) => state.Driver);
  const stud = useSelector((state)=>state.Student);
  const Points = useSelector((state)=>state.Points);

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
    if(ride){
      // setDriverLocation([loc.longitude,loc.latitude]);
      setRideData(ride);
      setDriverLocation([ride.driverLocation[1],ride.driverLocation[0]])
      if(Points)
      setPoints(Points);

    }
  },[ride,Points])
  
  useEffect(() => {
    const getDirections = async () => {
      console.log(driver,"driverdetails");
      try {
        const apiKey = 'pk.eyJ1IjoieWFzaHdhbnRoLWpha2t1bGEwMSIsImEiOiJjbHN4azMxbW0wNDduMmttdWs2ZDlyaHNtIn0.KFgUbCV1z7q6kCsJ9NCPoQ';
    
        if(rideData && driverLocation){       
          console.log(rideData) 
          console.log(driverLocation,"d");
        if(driverLocation[1] > -90 && driverLocation[1] < 90){
          console.log(rideData);
          console.log(points,'points');
          const locations = points.map(point => `${point[0]},${point[1]}`).join(';');
          console.log(locations);
          try {
            const response = await fetch(
              `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${driverLocation};${locations}?access_token=${apiKey}`
            );
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Optimized Route Data:', data.trips[0]);
    
            // Extract the optimized route coordinates
            const routeCoords = data.trips[0].geometry;
            console.log(routeCoords);
            const coordinates = decodePolyline(routeCoords)
            console.log('finalCOordss',coordinates)
            setRouteCoordinates(coordinates);
            
          } catch (error) {
            console.error('Error fetching optimized route:', error);
          }
          
      
      }
    }
      else{
        console.log("unable to fetch location");
      }
      } catch (error) {
        console.log('Error fetching directions:', error);
      }
    };
  
    // Call the function to fetch directions
    getDirections();
  }, [rideData,points,driverLocation]);
   // Include 'socket' as a dependency if it's coming from outside of the component
  
   const decodePolyline = (polyline) => {
    let index = 0;
    const len = polyline.length;
    const coordinates = [];
    let lat = 0;
    let lng = 0;
  
    while (index < len) {
      let byte;
      let shift = 0;
      let result = 0;
  
      do {
        byte = polyline.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
  
      const deltaLat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;
  
      shift = 0;
      result = 0;
  
      do {
        byte = polyline.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
  
      const deltaLng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;
  
      coordinates.push([lng / 1e5, lat / 1e5]);
    }
  
    return coordinates;
  };
  
   
  return (
    <View style={{width:'100%',height:'100%'}}>
    <MapView style={{ flex: 1 }}>
      <Camera zoomLevel={15} centerCoordinate={[79.15989090857764,12.968405733753187]} />
      
      {routeCoordinates.length > 0 && (
        <ShapeSource id="routeSource" shape={{ type: 'LineString', coordinates: routeCoordinates }}>
          <LineLayer id="routeLayer" style={{ lineColor: '#FF0000', lineWidth: 3 }} />
        </ShapeSource>
      )}

<PointAnnotation
      id="initialPoint"
      coordinate={[driverLocation[1],driverLocation[0]]} 
    >
      <Image
        source={require('../assests/car.png')}
        style={{ width: 30, height: 30 }}
      />
    </PointAnnotation>

    {points && points.map((coordinates, index) => (
  <PointAnnotation
    key={`point-${index}`}
    id={`point-${index}`}
    coordinate={coordinates} 

  >
    {index % 2!=0 ? 
    <View style={{ width: 20, height: 20, backgroundColor: 'red', borderRadius: 15 }} />
    :<View style={{ width: 20, height: 20, backgroundColor: 'blue', borderRadius: 15 }} />
  }
    </PointAnnotation>
))}

    <UserLocation 
androidRenderMode='gps'
onUpdate={(location)=>{
  if(location.coords.latitude> -90 && location.coords.longitude < 90)
  setDriverLocation([location.coords.longitude,location.coords.latitude])
}}
>
</UserLocation>

    </MapView>
  </View>
  
  );
};

export default RouteMap;


