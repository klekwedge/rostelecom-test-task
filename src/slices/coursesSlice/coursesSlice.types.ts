
export interface CurrentCoursesState {
    base: string;
    courses: ICourse;
    currentUSDCourse: number;
};

export interface ICourse {
    [index: string]: number;
}
