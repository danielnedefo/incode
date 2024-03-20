import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  characters: [],
  maleLikes: [],
  femaleLikes: [],
  othersLikes: [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<[] | undefined>) => {
      state.characters = [...state.characters, ...action.payload];
    },
    setMaleLikes: (state, action: PayloadAction<string>) => {
      if (state.maleLikes.includes(action.payload)) {
        state.maleLikes = state.maleLikes.filter(
          item => item !== action.payload,
        );
        return;
      }
      state.maleLikes = [...state.maleLikes, action.payload];
    },
    setFemaleLikes: (state, action: PayloadAction<string>) => {
      if (state.femaleLikes.includes(action.payload)) {
        state.femaleLikes = state.femaleLikes.filter(
          item => item !== action.payload,
        );
        return;
      }
      state.femaleLikes = [...state.femaleLikes, action.payload];
    },
    setOtherLikes: (state, action: PayloadAction<string>) => {
      if (state.othersLikes.includes(action.payload)) {
        state.othersLikes = state.othersLikes.filter(
          item => item !== action.payload,
        );
        return;
      }
      state.othersLikes = [...state.othersLikes, action.payload];
    },
    resetLikes: (state: action<PayloadAction>) => {
      state.femaleLikes = [];
      state.othersLikes = [];
      state.maleLikes = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCharacters,
  setMaleLikes,
  resetLikes,
  setFemaleLikes,
  setOtherLikes,
} = charactersSlice.actions;

export default charactersSlice.reducer;
