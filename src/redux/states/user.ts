import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../../models';
import { clearLocalStorage, persistLocalStorage } from '../../utilities';
import { Roles } from "../../models/roles"

export const EmptyuserState: UserInfo = {
  name: '',
  email: '',
  token: '',
  success: false,
  rol: Roles.ADMIN
}

export const UserKey = 'user';

export const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem('user') 
  ? JSON.parse(localStorage.getItem('user') as string)
  : EmptyuserState,

  reducers: {
    
    createUser: ( _ , action) => {
      persistLocalStorage<UserInfo>( UserKey, action.payload);
      return action.payload;
    },

    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<UserInfo>( UserKey, result);
      return result;
    },

    resetUser: () => {
      clearLocalStorage( UserKey );
      return EmptyuserState;
    }

  }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;