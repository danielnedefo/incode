import {configureStore} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import charactersSlice from './charactersSlice';

const rootReducer = combineReducers({
  characters: charactersSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const useCharactersStateSelector = () => {
  return useSelector(state => state.characters);
};
