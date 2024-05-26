import { createSlice } from "@reduxjs/toolkit";

const ShowRoute = createSlice({
   name:'Route',
   initialState:false,
   reducers:{
    setRouteData(state,action){
        return action.payload
    }
}
})

export const routeActions = ShowRoute.actions;
export default ShowRoute;