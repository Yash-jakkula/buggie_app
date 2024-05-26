import { configureStore } from "@reduxjs/toolkit";
import User from "./auth-slice/user-slice";
import LiveLocation from "./location-slice/LiveLocation";
import Student from "./auth-slice/student-slice";
import Driver from "./auth-slice/Driver-slice";
import Ride from "./ride-slice/ride-req";
import ShowRoute from "./show-route/show-route";
import Points from "./points-slice/points";
import UserRole from "./auth-slice/user-role";

const store = configureStore({
    reducer:{
        User:User.reducer,
        LiveLocation:LiveLocation.reducer,
        Student:Student.reducer,
        Driver:Driver.reducer,
        Ride:Ride.reducer,
        ShowRoute:ShowRoute.reducer,
        Points:Points.reducer,
        UserRole:UserRole.reducer
    }
})

export default store;