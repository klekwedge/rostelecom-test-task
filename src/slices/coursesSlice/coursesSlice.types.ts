
export interface CurrentCoursesState {
    base: string;
    currentUSDCourse: number;
    currencies : ICurrency;
    rates: ICourse
};

export interface ICourse {
    [index: string]: number;
}

export interface ICurrency {
    [index: string]: string;
}