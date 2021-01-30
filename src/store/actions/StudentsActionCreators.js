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

export const setStudents = (students) => {
    return {
        type: actionTypes.SET_STUDENTS,
        payload: {
            students: students
        }
    }
};

export const fetchStudents = (token, userId) => {
    // Using the redux-thunk middleware
    return dispatch => {
        dispatch(fetchStudentsStart());
        // const queryParams = '?auth=' + token + '&studentBy="userId"&equalTo="' + userId + '"';
        // const queryParams = `?auth=${token}&studentBy="userId"&equalTo="${userId}"`;
        // const queryParams = `?tag=tech"`;
        const queryParams = '';
        // axios.get('/students.json?auth=' + token)
        // axios.get('/students.json' + queryParams)
        axios.get('https://api.hatchways.io/assessment/students/' + queryParams)
            .then(response => {
                // console.log(response);
                // console.log(response.data);
                // console.log(response.data.students);
                // console.log(response.data.students[0]);
                const fetchedStudents = [];

                // Transforms the students in array format
                // for (let key in response.data) {
                for (let key in response.data.students) {
                    fetchedStudents.push({
                        // Gets all the fields in the js object and then adds a new one (id)
                        ...response.data.students[key],
                        id: key
                    });
                }
                // console.log(fetchedStudents);
                // console.log(fetchedStudents[0]);
                // console.log(fetchedStudents[1].id);
                // console.log(fetchedStudents[0].city);

                dispatch(fetchStudentsSuccess(fetchedStudents));
            })
            .catch(error => {
                dispatch(fetchStudentsFail(error));
            });
    };
};