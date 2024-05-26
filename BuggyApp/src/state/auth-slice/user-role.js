import { createSlice } from "@reduxjs/toolkit";

const UserRole = createSlice({
   name:'userRole',
   initialState:'',
   reducers:{
    setUserRole(state,action){
           return action.payload  
    },
}
})

export const userRoleActions = UserRole.actions;
export default UserRole;