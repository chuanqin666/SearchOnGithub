import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'counter',
  initialState: {
    times: 0,
    keywords: [],
    value: [],
  },
  reducers: {
    dataResult: (state, action) => {
      const s = state;
      s.times += 1; // Statistical user search times
      s.value = action.payload;
      console.log(state.value);
      console.log(state.times);
    },
    getKeywords: (state, action) => {
      const s = state;
      s.keywords = s.keywords.concat(action.payload); // Statistical user input keywords
      console.log(state.keywords);
    },
  },
});

export const { dataResult, getKeywords } = searchSlice.actions;

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
  action.dispatch(getKeywords(state));
});

export const selectValue = (state) => state.counter.value;

export default searchSlice.reducer;
