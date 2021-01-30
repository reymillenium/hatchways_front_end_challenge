import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    students: [],
    loading: false,
    errors: null
}

const fetchStudentsStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchStudentsSuccess = (state, action) => {
    return updateObject(state, {loading: false, students: action.payload.students});
};

const fetchStudentsFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const studentsReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_STUDENTS_START:
            return fetchStudentsStart(state, action);

        case actionTypes.FETCH_STUDENTS_SUCCESS:
            return fetchStudentsSuccess(state, action);

        case actionTypes.FETCH_STUDENTS_FAIL:
            return fetchStudentsFail(state, action);

        default:
            return {
                ...state
            };
    }
};

export default studentsReducer;
