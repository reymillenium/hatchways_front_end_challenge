import React from "react";
import classes from './Student.module.scss';
import Avatar from 'react-avatar';
import 'bootstrap/dist/css/bootstrap.min.css';

import burgerLogo from "../assets/images/burger_only_centered_trimmed_logo.png";

const student = (props) => {
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const grades = props.studentData.grades;
    const average = grades.reduce((p, c, _, a) => p + c / a.length, 0).toFixed(2);

    return (
        <div className={classes.Student} key={props.id}>
            <div className="row">
                <div className="col-md-3" style={{paddingLeft: '30px', paddingTop: '10px', textAlign: 'center'}}>
                    <p>
                        <Avatar style={{borderWidth: 1, borderColor: '#9e9e9e', borderStyle: 'solid'}} size={'160px'} src={props.studentData.pic} round={true}/>
                    </p>
                </div>

                <div className="col-md-9">
                    <h1>{props.studentData.firstName.toUpperCase()} {props.studentData.lastName.toUpperCase()}</h1>
                    <p>
                        <div><strong>Email:</strong> <span>{props.studentData.email}</span></div>
                        <div><strong>Company:</strong> <span>{props.studentData.company}</span></div>
                        <div><strong>Skill:</strong> <span>{props.studentData.skill}</span></div>
                        <div><strong>Average:</strong> <span>{average} %</span></div>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default student;