import React, {Component} from "react";
import Student from '../components/Student';
import axios from '../axios-students';
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import Spinner from '../components/UI/Spinner/Spinner';
import Search from './../components/Search';

import {connect} from 'react-redux';
import * as actionCreators from "../store/actions";
class Students extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        this.props.onFetchStudents();
    }

    render() {
        let students = <Spinner/>;
        if (!this.props.loading) {
            students = this.props.students.map(student => (
                <Student
                    key={student.id}
                    studentData={student}
                />
            ))
        }

        return (
            <div>
                {/*<div id='linksToVisitPage' style={{position: 'fixed', top: '30px', left: '0px', right: '0px', width: '100%', backgroundColor: '', zIndex: '99'}}>*/}
                {/*    <Search*/}
                {/*        onLoadStudents={this.props.onLoadStudents}*/}
                {/*        // isLoadingHandler={isLoadingHandler}*/}
                {/*        // isNotLoadingHandler={isNotLoadingHandler}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                <Search
                    onLoadStudents={this.props.onLoadStudents}
                    // isLoadingHandler={isLoadingHandler}
                    // isNotLoadingHandler={isNotLoadingHandler}
                />
                {students}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        students: state.students.students,
        loading: state.students.loading,
    };
};

// Using action creators
const mapDispatchToProps = dispatch => {
    return {
        onFetchStudents: () => dispatch(actionCreators.fetchStudents()),
        onLoadStudents: (ingredients) => dispatch(actionCreators.setStudents(ingredients))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Students, axios));