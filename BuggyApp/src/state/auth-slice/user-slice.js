import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
   name:'User',
   initialState:{},
   reducers:{
    setUserToken(state,action){
        return action.payload
    }
}
})

export const userActions = User.actions;
export default User;