import { createSlice } from "@reduxjs/toolkit";

const Points = createSlice({
   name:'Points',
   initialState:[],
   reducers:{
    setPoints(state,action){
        return [...state,action.payload];
    }
}
})

export const pointActions = Points.actions;
export default Points;