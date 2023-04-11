
'use client';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export type LandingState = {
  isLoading: boolean
  title: string;
  description: string;

};
const initialState: LandingState = {
  isLoading: true,
  title: "",
  description: ""
};

export const gptCompletion = createAsyncThunk<any, undefined, { rejectValue: string }>(
  'landing/gptCompletion',
  async (_, thunkApi) => {
    try {
      const appSecret = process.env.NEXT_PUBLIC_APP_SECRET as string
      const response = await fetch('/api/gpt/completion',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({prompt: process.env.NEXT_PUBLIC_GPT_COMPLETION_PROMPT_TITLE, appSecret: appSecret})
      })
      const response2 = await fetch('/api/gpt/completion',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({prompt: process.env.NEXT_PUBLIC_GPT_COMPLETION_PROMPT_DESCRIPTION, appSecret: appSecret})
      })

      const title = await response.json() 
      const description = await response2.json()
      return {title: title.gpt, description: description.gpt}
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue('unauthorized');
    }
  }
);


const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = true 
      state.title = "" 
      state.description = "" 
    },
  },
  extraReducers(builder) {
    builder.addCase(gptCompletion.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(gptCompletion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.title = action.payload.title
      state.description = action.payload.description
    });
    builder.addCase(gptCompletion.rejected, (state, _) => {
      sessionStorage.removeItem('access_token')
      state.isLoading = false;
      state.title = "";
      state.description = "";
    });
  },
});
export const { reset } = landingSlice.actions;
export default landingSlice.reducer;