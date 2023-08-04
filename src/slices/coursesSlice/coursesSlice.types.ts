
export interface CurrentCoursesState {
    base: string;
    currentUSDCourse: number;
    currentUSDCourseLoading: Loading,
    currencies: ICurrency;
    currenciesLoading: Loading,
    rates: ICourse
};

export interface ICourse {
    [index: string]: number;
}

export interface ICurrency {
    [index: string]: string;
}

export type Loading = "loading" | "idle" | "error"
