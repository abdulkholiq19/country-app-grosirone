import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Country } from '../types'

export interface CooperationState {
  cooperation: Country[]
}

const initialState: CooperationState = {
  cooperation: [],
}

export const cooperationSlice = createSlice({
  name: 'cooperation',
  initialState,
  reducers: {
    addCooperation: (state, action: PayloadAction<any>) => {
      state.cooperation.push(action.payload);
    },
    deleteCooperation: (state, action: PayloadAction<string>) => {
      state.cooperation = state.cooperation.filter(cooperation => cooperation.cca3 !== action.payload);
    },
  },
})

export const { addCooperation, deleteCooperation } = cooperationSlice.actions

export default cooperationSlice.reducer