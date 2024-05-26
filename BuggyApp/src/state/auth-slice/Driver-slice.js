import { createSlice } from "@reduxjs/toolkit";

const Driver = createSlice({
   name:'Driver',
   initialState:{
   },
   reducers:{
    setDriverData(state,action){
        return action.payload
    }
}
})

export const driverActions = Driver.actions;
export default Driver;