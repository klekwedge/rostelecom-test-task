/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useHttp from '../../hooks/http.hook';
import { CurrentCoursesState } from './coursesSlice.types';

const API_KEY = import.meta.env.VITE_API_KEY

const initialState: CurrentCoursesState = {
    base: '',
    currentUSDCourse: 0,
    currencies: {},
    rates: {},
};

export const fetchCourse = createAsyncThunk('courses/fetchCourse', () => {
    const { request } = useHttp();
    return request(`https://openexchangerates.org/api/latest.json?symbols=RUB&base=USD&app_id=${API_KEY}`);
});

export const fetchCourses = createAsyncThunk('courses/fetchCourses', () => {
    const { request } = useHttp();
    return request(`https://openexchangerates.org/api/latest.json?base=USD&app_id=${API_KEY}`);
});

export const fetchCurrencies = createAsyncThunk('courses/fetchCurrencies', () => {
    const { request } = useHttp();
    return request('https://openexchangerates.org/api/currencies.json');
});

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrencies.pending, (state) => {
                // state.postsLoadingStatus = 'loading';
            })
            .addCase(fetchCurrencies.fulfilled, (state, action) => {

                state.currencies = action.payload
            })
            .addCase(fetchCurrencies.rejected, (state) => {
                // state.postsLoadingStatus = 'error';
            })
            .addCase(fetchCourses.pending, (state) => {
                // state.postsLoadingStatus = 'loading';
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                // state.postsLoadingStatus = 'idle';
                state.rates = action.payload.rates;
            })
            .addCase(fetchCourses.rejected, (state) => {
                // state.postsLoadingStatus = 'error';
            })
            .addCase(fetchCourse.pending, (state) => {
                // state.postsLoadingStatus = 'loading';
            })
            .addCase(fetchCourse.fulfilled, (state, action) => {
                state.currentUSDCourse = action.payload.rates.RUB
            })
            .addCase(fetchCourse.rejected, (state) => {
                // state.postsLoadingStatus = 'error';
            })
    },
});

const { actions, reducer } = coursesSlice;

// export const { } = actions

export default reducer;