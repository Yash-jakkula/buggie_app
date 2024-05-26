import { createSlice } from "@reduxjs/toolkit";

const LiveLocation = createSlice({
   name:'notification',
   initialState:{
      latitude:0,
      longitude:0,
      id:null
   },
   reducers:{
    setUserLocation(state,action){
       state.latitude = action.payload.coords.latitude
       state.longitude = action.payload.coords.longitude
       state.id = action.payload.id
    },
}
})

export const locationActions = LiveLocation.actions;
export default LiveLocation;