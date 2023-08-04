/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useHttp from '../../hooks/http.hook';
import { CurrentCoursesState } from './coursesSlice.types';

const API_KEY = import.meta.env.VITE_API_KEY

const initialState: CurrentCoursesState = {
    base: '',
    currentUSDCourseLoading: 'loading',
    currentUSDCourse: 0,
    currenciesLoading: 'loading',
    currencies: {},
    rates: {},
};

export const fetchCourse = createAsyncThunk('courses/fetchCourse', () => {
    const { request } = useHttp();
    return request(`https://openexchangerates.org/api/latest.json?symbols=RUB&base=USD&app_id=${API_KEY}`);
});

export const fetchCourses = createAsyncThunk('courses/fetchCourses', (value: string) => {
    // ! В бесплатном плане нельзя выбрать базовую валюту относительно которой можно смотреть курс по отношению к другим валютам.
    // ! В бесплатном плане по-умолчанию можно посмотреть только доллар.

    const { request } = useHttp();
    return request(`https://openexchangerates.org/api/latest.json?base=${value}&app_id=${API_KEY}`);
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
                state.currenciesLoading = 'loading';
            })
            .addCase(fetchCurrencies.fulfilled, (state, action) => {
                state.currencies = action.payload
                state.currenciesLoading = 'idle';
            })
            .addCase(fetchCurrencies.rejected, (state) => {
                state.currenciesLoading = 'error';
            })
            .addCase(fetchCourses.pending, (state) => {
                state.currenciesLoading = 'loading';
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.currenciesLoading = 'idle';
                state.rates = action.payload.rates;
            })
            .addCase(fetchCourses.rejected, (state) => {
                state.currenciesLoading = 'error';
            })
            .addCase(fetchCourse.pending, (state) => {
                state.currentUSDCourseLoading = 'loading';
            })
            .addCase(fetchCourse.fulfilled, (state, action) => {
                state.currentUSDCourse = action.payload.rates.RUB
                state.currentUSDCourseLoading = 'idle'
            })
            .addCase(fetchCourse.rejected, (state) => {
                state.currentUSDCourseLoading = 'error';
            })
    },
});

const { actions, reducer } = coursesSlice;

// export const { } = actions

export default reducer;