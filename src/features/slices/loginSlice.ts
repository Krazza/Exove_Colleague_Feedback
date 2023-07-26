import { createSlice } from "@reduxjs/toolkit"
import { UserRedux } from "../../modules/types";

const initialUser : UserRedux = {
    username: "username",
    id: "uidNumber",
    role: "description",
    email: "email",
    phoneNumber: "phoneNumber",
    groupId: "groupId",
    imagePath: "imagePath",
    loggedIn: false,
}

export const loginSlice = createSlice({
    name:"user",
    initialState:{
        user: initialUser
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload;
        }
    }

})
export const {login} = loginSlice.actions;
export type RootState = ReturnType<typeof loginSlice.reducer>;
export default loginSlice.reducer;