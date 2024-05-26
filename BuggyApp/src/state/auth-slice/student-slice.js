import { createSlice } from "@reduxjs/toolkit";

const Student = createSlice({
   name:'Student',
   initialState:{},
   reducers:{
    setStudentData(state,action){
           return action.payload  
    },
}
})

export const stdActions = Student.actions;
export default Student;