import React, { useContext, useEffect, useState } from "react";
import {View,StyleSheet,TouchableOpacity} from 'react-native';
import {Avatar, Button, Icon, Text} from 'react-native-paper'
import MapScreen from "./Map";
import RideBooking from "./RideBooking";
import { Context } from "../context/ContextProvider";
import DriverScreen from "./driverScreen";
import userLiveLocation from "./userLiveLocation";
import { useDispatch,useSelector } from "react-redux";
import { userActions } from "../state/auth-slice/user-slice";
import { currentUser } from "../HttpRequests/user";
import Student, { stdActions } from "../state/auth-slice/student-slice";
import { driverActions } from "../state/auth-slice/Driver-slice";
import UserRole, { userRoleActions } from "../state/auth-slice/user-role";


const Home = ({navigation}) => {
    const [isRide,setIsRide] = React.useState(false);
    const student = useSelector((state)=>state.Student);
    console.log(student)
    const [role,setRole] = useState();
    const state = useSelector((state) => state.User);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            console.log('running');
          const userinfo = await currentUser(state);
          console.log(userinfo);
          
          if (userinfo) {
            if(userinfo[0].role =='student'){
                setRole('student')
                dispatch(userRoleActions.setUserRole('student'))
                dispatch(stdActions.setStudentData(userinfo[0]));
            }
            else{
                setRole('driver');
                dispatch(userRoleActions.setUserRole('driver'))
                dispatch(driverActions.setDriverData(userinfo[0]));
            }
          }
        };
      
        fetchData();
      }, []);

      const userState = useSelector((state)=>state);
      

    return(
        <>
        {(role === 'student') ?  
        <View style={styles.page}>
            <View style={styles.header}>
                <Text variant="displaySmall">{student.name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('StudentDashboard')}>
                <Avatar.Text size={24} label="JY" />
                </TouchableOpacity>
            </View>
            <View style={styles.mapCont}>
                <MapScreen />
                {(!isRide) ? 
                <View style={styles.ridePage}>
                <Button 
                mode="contained"
                buttonColor="black" 
                onPress={() => setIsRide(true)}
                >
                Book Ride
                </Button>
                </View>
                : <RideBooking />}
            </View>
        </View>
       : <DriverScreen />}
       
        </>
    )
}

const styles = StyleSheet.create({
    page:{
        flex:1,
        height:"100%",
        width:'100%',
    },
    header:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        maxHeight:"10%",
        width:'100%',
        padding:10
    },
    mapCont:{
        flex:1,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    ridePage:{
        flex:1,
        maxHeight:200,
        alignItems:'center',
        padding:10,
        position:'absolute',
        top:"85%",
        left:"30%"
    }
})

export default Home;