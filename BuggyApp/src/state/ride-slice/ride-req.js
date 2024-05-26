import { createSlice } from "@reduxjs/toolkit";

const Ride = createSlice({
   name:'Ride',
   initialState:{},
   reducers:{
    setRideData(state,action){
        return action.payload
    }
}
})

export const rideActions = Ride.actions;
export default Ride;