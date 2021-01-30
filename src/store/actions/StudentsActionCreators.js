import * as actionTypes from './actionTypes';
import axios from '../../axios-students';


// *** Fetching students: ***

export const fetchStudentsSuccess = (students) => {
    return {
        type: actionTypes.FETCH_STUDENTS_SUCCESS,
        payload: {
            students: students
        }
    }
};

export const fetchStudentsFail = (error) => {
    return {
        type: actionTypes.FETCH_STUDENTS_FAIL,
        payload: {
            error: error
        }
    }
};

export const fetchStudentsStart = () => {
    return {
        type: actionTypes.FETCH_STUDENTS_START
    }
};

export const fetchStudents = (token, userId) => {
    // Using the redux-thunk middleware
    return dispatch => {
        dispatch(fetchStudentsStart());
        // const queryParams = '?auth=' + token + '&studentBy="userId"&equalTo="' + userId + '"';
        const queryParams = `?auth=${token}&studentBy="userId"&equalTo="${userId}"`;
        // axios.get('/students.json?auth=' + token)
        axios.get('/students.json' + queryParams)
            .then(response => {
                const fetchedStudents = [];

                // Transforms the students in array format
                for (let key in response.data) {
                    fetchedStudents.push({
                        // Gets all the fields in the js object and then adds a new one (id)
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchStudentsSuccess(fetchedStudents));
            })
            .catch(error => {
                dispatch(fetchStudentsFail(error));
            });
    };
};