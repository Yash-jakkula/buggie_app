import React, { useContext, useState } from "react";
import {View,StyleSheet,TouchableOpacity,ScrollView, Alert} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Context } from "../context/ContextProvider";
import NearestDrivers from "./NearestDrivers";
import { PickupDropLocation } from "../HttpRequests/PickupDropLocation";
import { useDispatch, useSelector } from "react-redux";
import { rideActions } from "../state/ride-slice/ride-req";
const RideBooking = () => {
    const {student,setStudent} = useContext(Context);
    const {user,setUser} = useContext(Context);
    const state = useSelector((state)=>state.Student);
    const dispatch = useDispatch();
    const {near,setIsNear} = useContext(Context);
    const [studentDetails,setStudentDetails] = React.useState({
        pickup:"",
        drop:"",
        count:1,
    });

    const rideDetails = async() => {

        try{
        if(studentDetails.pickup && studentDetails.drop){
        const pd = await PickupDropLocation(studentDetails.pickup,studentDetails.drop,studentDetails.count);
        console.log(pd)
        if(pd){
        const pickupLoc = pd.pickupPoints[0].coordinates
        const dropLoc   = pd.dropPoints[0].coordinates
        setStudent({...student,
            studentName:state.name,
            studentId:state._id,
            pickup:pickupLoc,
            drop:dropLoc,
            pickupName:studentDetails.pickup,
            dropName:studentDetails.drop,
            count:studentDetails.count,
            studentId:state.id,
            studentLocation:state.location.coordinates
        })
        
        setIsNear(true)
    }
    else{
        Alert.alert("request could not be complete please try again");
    }
       }
        else{
            Alert.alert("please enter a pickup and drop point to continue");
        }
    }
    catch(err){
        console.log(err);
    }
        
    }
    return(
        <> 
        { (!near) ?
        <View style={styles.container}>
            <View style={styles.pickdrop}>
            <TextInput
                 mode="outlined"
                 label="Pickup point"
                 onChangeText={(text) => setStudentDetails({...studentDetails,pickup:text})}
                 left={<TextInput.Icon icon="map-marker" />}
              />
              
              <TextInput
                mode="outlined"
                 label="Drop point"
                 onChangeText={(text)=>setStudentDetails({...studentDetails,drop:text})}
                 left={<TextInput.Icon icon="map-marker" />}
              />
          </View>
          <View style={styles.counter}>
            <View style={styles.counterinput}>
           <TextInput
            mode="outlined"
            label="Number of Students"
            onChangeText={(text) => setStudentDetails({...studentDetails,count:parseInt(text)})}
            right={<TextInput.Affix text="/100" />}
              />
          </View>
        <View style={styles.incdec}>
            <TouchableOpacity style={styles.btn} onPress={() => setStudentDetails({...studentDetails,count:studentDetails.count-1})}>
                <Text variant="titleLarge">-</Text>
            </TouchableOpacity>

            <Text variant="titleLarge">{studentDetails.count}</Text>
            
            <TouchableOpacity style={styles.btn} onPress={() => setStudentDetails({...studentDetails,count:studentDetails.count+1})}>
                <Text variant="titleLarge">+</Text>
            </TouchableOpacity>
            
        </View>
          </View>
          <View style={{width:'100%',alignItems:'center',justifyContent:'center',flex:1}}>
            <View style={{width:'80%'}}>
          <Button 
            mode="contained"
            buttonColor="black"
            onPress={rideDetails}
            >Book Ride
            </Button>
            </View>
            </View>
        </View> 
        : <NearestDrivers /> } 
        
        </>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        maxHeight:250,
        width:'90%',
        margin:10,
        gap:10
    },
    counterinput:{
        width:'60%'
    },
    counter:{
     flex:1,
     flexDirection:'row',
     width:'100%',
     maxHeight:50,
     alignItems:'center'
    },
    pickdrop:{
        width:'100%',
        gap:10
    },
    btn:{
        borderWidth:1,
        borderColor:'black',
        borderRadius:10,
        width:40,
        alignItems:'center',
        
    },
    incdec:{
        backgroundColor:'white',
        maxHeight:50,
        width:'40%',
        flexDirection:'row',
        marginLeft:10,
        alignItems:'center',
        gap:8,
        padding:10,
        borderRadius:10,
        borderWidth:1
    }
})

export default RideBooking;