/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useHttp from '../../hooks/http.hook';
import { CurrentCoursesState } from './coursesSlice.types';

const API_KEY = import.meta.env.VITE_API_KEY

const initialState: CurrentCoursesState = {
    base: '',
    courses: {},
    currentUSDCourse: 0
};

export const fetchCourse = createAsyncThunk('courses/fetchCourse', () => {
    const { request } = useHttp();
    return request(`https://openexchangerates.org/api/latest.json?symbols=RUB&base=USD&app_id=${API_KEY}`);
});

export const fetchCourses = createAsyncThunk('courses/fetchCourses', () => {
    const { request } = useHttp();
    return request(`http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`);
});

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                // state.postsLoadingStatus = 'loading';
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                // state.postsLoadingStatus = 'idle';
                state.base = action.payload.base;
                state.courses = action.payload.rates;
            })
            .addCase(fetchCourses.rejected, (state) => {
                // state.postsLoadingStatus = 'error';
            })
            .addCase(fetchCourse.pending, (state) => {
                // state.postsLoadingStatus = 'loading';
            })
            .addCase(fetchCourse.fulfilled, (state, action) => {
                console.log(action.payload);
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