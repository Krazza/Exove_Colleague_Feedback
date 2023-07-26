import { createSlice } from "@reduxjs/toolkit"

export const signupSlice = createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        signup:(state,action)=>{
            state.user = action.payload;
        }
    }
})
export const {signup}=signupSlice.actions;
// export const selectUser = (state)=>state.user.user;
export default signupSlice.reducer;