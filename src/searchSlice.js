import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'counter',
  initialState: {
    value: [],
  },
  reducers: {
    dataResult: (state, action) => {
      state.value = action.payload
      console.log(state.value)
    },
  },
})

export const getResult = createAsyncThunk('search/getResult', async (state,action) =>{
    const response = await fetch("https://api.github.com/search/repositories?q=" + state, {
            method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(response);
    action.dispatch(dataResult(response));

})

export const { dataResult } = searchSlice.actions

export const selectValue = (state) => state.counter.value

export default searchSlice.reducer
