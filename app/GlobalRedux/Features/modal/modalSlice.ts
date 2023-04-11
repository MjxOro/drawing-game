
'use client';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export type ModalState = {
  isLoading: boolean
  isShow: boolean
  isPrompt1: boolean
  labels: string[]
  drawing: string
  base64Img: string
  gpt: string

};
const initialState: ModalState = {
  isShow: false,
  isLoading: true,
  isPrompt1: true,
  labels: [],
  drawing: "",
  base64Img: "",
  gpt: ""
};

export const visionAi = createAsyncThunk<any, string, { rejectValue: string }>(
  'modal/visionAi',
  async (base64Img, thunkApi) => {
    try {
      const token = sessionStorage.getItem('access_token')
      const state:any = thunkApi.getState()
      const message = state.auth.message
      const response = await fetch('/api/vision',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({base64Img: base64Img, access_token: token, message: message})
      })
      const { labels } = await response.json()
      const prompt = `I drew a picture of a ${state.modal.drawing}, my ML model guessed: ${labels.join(', ')}`
      const gptResponse = await fetch('/api/gpt/chat',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({prompt: prompt , access_token: token, message: message})
      })
      const { gpt } = await gptResponse.json()
      return {labels: labels, gpt: gpt }
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue('unauthorized');
    }
  }
);


const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    reset: (state) => {
      state.isShow = false
      state.isLoading = true
      state.isPrompt1 = true
      state.labels = []
      state.drawing = ""
      state.gpt = ""
    },
    toggleModal: (state, action) => {
      state.isShow = action.payload 
    },
    setPrompt2: (state) => {
      state.isPrompt1 = false 
    },
    getBase64Img: (state, action) => {
      state.base64Img = action.payload
    },
    getDrawing: (state, action) => {
      state.drawing = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(visionAi.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(visionAi.fulfilled, (state, action) => {
      const bestFour = [...action.payload.labels].slice(0,4)
      state.gpt = action.payload.gpt
      state.labels = bestFour
      state.isLoading = false;
      // state.labels = action.payload.labels;
    });
    builder.addCase(visionAi.rejected, (state, _) => {
      sessionStorage.removeItem('access_token')
      state.isLoading = false;
      state.labels = [];
    });
  },
});
export const { toggleModal,getDrawing, reset, setPrompt2, getBase64Img } = modalSlice.actions;
export default modalSlice.reducer;