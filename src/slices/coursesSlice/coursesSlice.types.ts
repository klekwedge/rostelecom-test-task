
export interface CurrentCoursesState {
    base: string;
    courses: ICourse;
    currentUSDCourse: number;
    currencies : ICurrency
};

export interface ICourse {
    [index: string]: number;
}

export interface ICurrency {
    [index: string]: string;
}