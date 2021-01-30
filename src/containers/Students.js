import React, {Component} from "react";
import Student from '../components/Student';
import axios from '../axios-students';
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import Spinner from '../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actionCreators from "../store/actions";
class Students extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        this.props.onFetchStudents(this.props.token, this.props.userId);
    }

    render() {
        let students = <Spinner/>;
        if (!this.props.loading) {
            students = this.props.students.map(order => (
                <Student
                    key={order.id}
                    price={order.price}
                    ingredients={order.ingredients}
                    orderData={order.orderData}
                />
            ))
        }

        return (
            <div>
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
        onFetchStudents: () => dispatch(actionCreators.fetchStudents())
    };
};

// export default Students;
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Students, axios));