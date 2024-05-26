import React, { useContext, useEffect } from "react";
import {Text,Button} from 'react-native-paper';
import {View,StyleSheet,ScrollView, TouchableOpacity,FlatList} from 'react-native'
import { nearestDriver } from "../HttpRequests/drivers";
import { Context } from "../context/ContextProvider";
import { sendRideRequest } from "../HttpRequests/rideRequest";
import io from 'socket.io-client';
import { useDispatch } from "react-redux";
import { rideActions } from "../state/ride-slice/ride-req";
import store from "../state";
import config from "../../config";
const NearestDrivers = () => {
    const dispatch = useDispatch();
    const {nearestDrivers,setNearestDrivers} = useContext(Context);
    const {driverInfo,setDriverInfo} = useContext(Context);
    const {student,setStudent} = useContext(Context);
    const [driver,setDriverId] = React.useState([]);
    const {setShowRoute,showRoute} = React.useContext(Context);
    const [confirmation,setConfirmation] = React.useState(false);
    const {near,setIsNear} = useContext(Context);
    React.useEffect(() => {
        // Your setTimeout code
        const timerId = setTimeout(async () => {
          if(student){
          const drivers = await nearestDriver(student.count);
          
          setNearestDrivers(drivers.activeDrivers);
          }
        }, 1000);
    
        // Cleanup the timer when the component unmounts or when it is re-rendered
        return () => clearTimeout(timerId);
      }, []);
    
      const rideRequest = async() =>{
        try{
        setDriverInfo(driver);
        const params = {
            studentName:student.studentName,
            studentId:student.studentId,
            studentLocation:student.studentLocation,
            driverId:driverInfo.driverId,
            driverLocation:driverInfo.driverLocation,
            pickup:student.pickup,
            drop:student.drop,
            pickupName:student.pickupName,
            dropName:student.dropName,
            count:student.count
        }
        dispatch(rideActions.setRideData(params));
        const result = await sendRideRequest(params);
        }
        catch(err){
            console.log(err);
        }  
    }
let socket = ''
    useEffect(()=>{
      socket = io(`http://${config.IP_ADDRESS}:7000`);
      
      socket.on('connect', () => {
        console.log('Connected to socket.io from client');
      });
    
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
          socket.on('ride_accepted',(val)=>{
            console.log(val)
            if(val){
            setShowRoute(true);
            setConfirmation(true);
            }
            else{
                setConfirmation(true)
            }
          })

        //  const val =  store.getState().ShowRoute
        //  if(val){
        //   setShowRoute(true)
        //   setConfirmation(true)
        //  }
        //  else{
        //   setConfirmation(true);
        //  }

          return (()=>{
            socket.close();
          })
    },[socket])

    const Booking = () => {
      setShowRoute(false);
      setConfirmation(false);  
      setIsNear(false);
        
    }
    
    
      const rideRequestAgain = () => {
        setDriverInfo(null);
            setConfirmation(false);
      }

      const goBack = () => {
        setShowRoute(false);
      }

    return(
        
        <>
        {(!confirmation) ? 
        <>
        <ScrollView showsVerticalScrollIndicator style={styles.ScrollView}>
        <View style={styles.main}>
          <Text variant="titleLarge">Available Buggies</Text> 
        </View>
        
        {nearestDrivers && 
        <>
        <View style={styles.list}>
              <FlatList 
              data={nearestDrivers}
               renderItem={({item}) => (
                <TouchableOpacity onPress={()=>setDriverId({driverId:item._id,driverLocation:item.location.coordinates})}>
                <View style={styles.driverCont} key={item._id}>
                <View style={styles.buggyId}>
                <Text variant="titleLarge" key={item.name}>{item.name}</Text>
                </View>
                <View style={styles.seats}>
                <Text key={item.seats}>available Seats</Text>
                <Text>{item.seats}</Text>
                </View>    
                </View>
                </TouchableOpacity>
                )}
               />   
               </View>
            <View style={{flex: 1, alignItems: 'center' }}>
                <View style={{ width: '80%',height:'100%'}}>
                    <Button mode="contained" buttonColor="black" onPress={rideRequest}>
                           Continue
                    </Button>
                    
                 </View>
            </View> 
            </>  
               }
               
               <View style={{flex:1,alignItems:'center',marginTop:10}}>
               <View style={{width:'80%',height:'100%'}}>
                    <Button mode="contained" buttonColor="black" onPress={Booking}>
                           Back
                    </Button>
                    </View>
               </View>
               </ScrollView>
    </> :
    <> 
    {(!showRoute) ? 
    <View style={styles.waitingPage}>
        <Text style={{alignSelf:'center'}} variant="titleLarge">Waiting</Text> 
         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
         <View style={{ width: '80%' }}>
          <Button mode="contained" buttonColor="black" onPress={rideRequestAgain}>
            Book again
          </Button>
        </View>
        </View>
    </View>
    : 
  <View style={{width:'100%',padding:10,justifyContent:'center',alignItems:'center'}}>
  <Button mode='contained' onPress={goBack} >
    Back
  </Button>
  </View>
  }
    </>
        }
    </>
   
    )
}

export const styles = StyleSheet.create({
    buggyId:{
        padding:5,
        marginLeft:5        
    },
    driverCont:{
        borderWidth:1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10,
        padding:5,
        borderRadius:10,
        borderColor:'grey'
    },
    seats:{
        alignItems:'center',
        padding:5,
        marginRight:5
    },
    ScrollView:{
        maxHeight:250,
        flex:1,
        margin:10,
    },
    confirmation:{
        justifyContent:'center',
        alignItems:'center'
    },
    list:{
        maxHeight:200
    },
    waitingPage:{
        maxHeight:100,
        padding:10
    }
})

export default NearestDrivers;