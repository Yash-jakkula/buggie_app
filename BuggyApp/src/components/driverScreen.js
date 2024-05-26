import React, { useEffect, useState } from "react";
import {View,StyleSheet,SafeAreaView, SafeAreaViewComponent, TouchableOpacity, Alert} from 'react-native'
import {Text,Switch, Avatar,Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewMap from "./ViewMap";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../context/ContextProvider";
import { acceptRideRequest } from "../HttpRequests/rideRequest";
import { getDriver, updateDriverStatus, updateSeats,updateSeatsDriver } from "../HttpRequests/drivers";
import RouteMap from "./routeMap";
import { useDispatch, useSelector } from "react-redux";
import store from "../state";
import io from 'socket.io-client';
import { combineSlices } from "@reduxjs/toolkit";
import userLiveLocation from "./userLiveLocation"; 
import { rideActions } from "../state/ride-slice/ride-req";
import { routeActions } from "../state/show-route/show-route";
import config from "../../config";
import { pointActions } from "../state/points-slice/points";
import { driverActions } from "../state/auth-slice/Driver-slice";



  const DriverScreen = () => {
  const dispatch = useDispatch();
  
  const [idSeats,setIdseats]= useState([])
  const state = useSelector((state)=>state.Driver);
  const [r,setr] = useState(true);
  const [seats,setSeats] = React.useState(state.seats);
  const [pseats,setPseats] = React.useState(0);


  useEffect(()=>{
    
    if(state){
           setSeats(state.seats);
    }
  
  },[state])

  // useEffect(()=>{
  //   if(store)
  //   state = store.getState().Driver;
  // },[r,store])

  const navigation = useNavigation();
  
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [info,setInfo] = React.useState();
  const [driverLocation,setDriverLocation] = React.useState([]);
  
  const {showRoute,setShowRoute} = React.useContext(Context);
  const [visible,setVisible] = React.useState(state.status);
  const {notification,setNotification} = React.useContext(Context);

  const onToggleSwitch = async() => {
    setIsSwitchOn(!isSwitchOn); 
    const res = await updateDriverStatus(state._id,!isSwitchOn);
      console.log(res);
      console.log('updated status of driver',!isSwitchOn)
     
}
  const notifications = () => {
    navigation.navigate('notification');
  }
  
  
  const [request,setRequest] = React.useState(false); 

  const updateBuggieSeats = async()=>{
    try{
        await updateSeats(state._id,seats);
        Alert.alert("Seats Updated")
        console.log('seats updated');
    }
    catch(err){
        console.log(err);
    }
  }

  let socket="";
  useEffect(() => {
    if(state){
      console.log('stateid',state._id);
       socket = io(`http://${config.IP_ADDRESS}:7000`);
      
      socket.on('connect', () => {
        console.log('Connected to socket.io from client');
      });
    
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
      
      socket.on('user_request', (params) => {
      console.log('params',params);
        if(params.driverId == state._id){
            console.log(params,'params')
            Alert.alert(
                `From ${params.pickupName} To ${params.dropName}`,
                `no:of students ${params.count}`,
                [
                  {
                    text: 'Accept',
                    onPress: async () => { 
                      dispatch(rideActions.setRideData(params));
                      //[[params.pickup[1],params.pickup[0]],[params.drop[1],params.drop[0]]]
                      dispatch(pointActions.setPoints([params.pickup[1],params.pickup[0]]));
                      dispatch(pointActions.setPoints([params.drop[1],params.drop[0]]));
                      socket.emit('ride_accepted',true);
                      const respo = await acceptRideRequest(params);
                      console.log("Seats Prev Count ",params.count);
                      console.log("Seats Next Count ",seats);
                      setShowRoute(true)
                      await updateSeatsDriver(state._id,params.count);
                      setr(!r);
                      setInfo(params);
                    },
                  },
                  {
                    text: 'Decline',
                    onPress: async() => {
                      console.log('User declined ride request');
                      socket.emit('ride_accepted',false);
                    },
                    style: 'cancel', 
                  },
                ],
                { cancelable: false } 
              );
        }
    });
  }

    return(()=>{
      socket.close();
    })

  }, [socket,state]);

  const hideDialog = () => setVisible(false)


  const Cancel = () => {
    setShowRoute(false);
  }
    return(
        <SafeAreaView>
        <View style={styles.driverHome}>
        <View style={styles.header}>
            <View style={styles.status}>
                {(isSwitchOn) ? 
                (<Text variant="titleSmall">Online</Text>):
                (<Text variant="titleSmall">Offline</Text>)
                }
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
        </View>
       
            <View style={styles.infopage}>
                <View style={styles.profile}>
                  {state && 
                    <Text variant="titleLarge">{state.name}</Text>
                  }<View style={{flexDirection:"row",alignItems:'center',gap:20}}>
                    <TouchableOpacity onPress={notifications}>
                    <Icon 
                    name='facebook'
                    size={34}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('DriverDashBoard')}>
                    <Avatar.Text size={34} label="DV" />
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        
            {isSwitchOn ? 
    !showRoute ? (
        <View style={styles.driverMap}>
            <View style={styles.mapCont}>
                <ViewMap />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.seats}>
                   <Button mode='outlined' onPress={() => setSeats(seats - 1)}>-</Button>
                   {state &&  
                     <Text variant="titleLarge">{seats}</Text>
                    }
                    <Button mode="outlined" onPress={() => setSeats(seats + 1)}>+</Button>
                    
                </View>
                <View style={{ flexDirection: 'row', maxWidth: '100%', margin: 10, gap: 10, justifyContent: 'center' }}>
                    <View style={{ width: '50%' }}>
                        <Button mode="contained" buttonColor="red" onPress={updateBuggieSeats}>Update</Button>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Button mode="contained" buttonColor="black">Full</Button>
                    </View>
                </View>
            </View>
        </View>
    ) : (
      <View style={{flex:1}}>
        <View style={{justifyContent:'center',alignItems:'center',maxHeight:'70%'}}>
        <RouteMap />
        </View>
        <View style={{ flex: 1, justifyContent: 'center',maxHeight:'30%'}}>
                <View style={styles.seats}>
                     <Button mode='outlined' onPress={() => setSeats(seats - 1)}>-</Button>
                     {state && <Text variant="titleLarge">{seats}</Text> }
                    <Button mode="outlined" onPress={() => setSeats(seats + 1)}>+</Button> 
                    
                </View>
                <View style={{ flexDirection: 'row', maxWidth: '100%', margin: 10, gap: 10, justifyContent: 'center' }}>
                    <View style={{ width: '50%' }}>
                        <Button mode="contained" buttonColor="red" onPress={updateBuggieSeats}>Update</Button>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Button mode="contained" buttonColor="black">Full</Button>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', maxWidth: '100%', margin: 10, gap: 10, justifyContent: 'center',alignItems:'center' }}>
                  <View style={{ width: '50%' }}>
                        <Button mode="contained" buttonColor="black" onPress={()=>setShowRoute(false)}>Back</Button>
                    </View>
                </View>
            </View>
        </View>
    )
    : <View></View>
}

        </View>
        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    driverHome:{
        height:"100%",
        width:"100%"
    },
    header:{
        maxHeight:100,
        justifyContent:'center',
        alignItems:'center',
    },
    status:{
        flexDirection:'row',
        gap:10,
        borderWidth:1,
        padding:10,
        borderColor:'grey',
        borderRadius:10,
        margin:10,
        paddingLeft:25,
        paddingRight:25,
        alignItems:'center'
    },
    profile:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        margin:10
    },
    driverMap:{
        flex:1,
        height:"70%",
        width:"100%"
    },
    mapCont:{
        height:"75%",
        width:"100%"
    },
    seats:{
        borderWidth:1.5,
        borderColor:'grey',
        margin:10,
        padding:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})

export default DriverScreen;