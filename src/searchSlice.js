import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'counter',
  initialState: {
    value: [],
  },
  reducers: {
    dataResult: (state, action) => {
      const s = state;
      s.value = action.payload;
      console.log(state.value);
    },
  },
});

export const { dataResult } = searchSlice.actions;

export const getResult = createAsyncThunk('search/getResult', async (state, action) => {
  const response = await fetch(`https://api.github.com/search/repositories?q=${state}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => {
      console.log(e);
    });
  action.dispatch(dataResult(response));
});

export const selectValue = (state) => state.counter.value;

export default searchSlice.reducer;
