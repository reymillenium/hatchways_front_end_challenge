import React, {useState} from "react";
import classes from './Student.module.scss';
import Avatar from 'react-avatar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapse from 'react-bootstrap/Collapse';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Student = (props) => {
    const [open, setOpen] = useState(false);

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const grades = props.studentData.grades;
    const average = grades.reduce((p, c, _, a) => p + c / a.length, 0).toFixed(2);

    let divGrades = [];
    divGrades = grades.map((grade, index) => (
        <div>
            <span>Test {index + 1}:</span> <span>{grade} %</span>
        </div>
    ));

    return (
        <div className={classes.Student} key={props.id}>
            <div className="row">
                <div className="col-md-3" style={{paddingLeft: '30px', paddingTop: '10px', textAlign: 'center'}}>
                    <p>
                        <Avatar style={{borderWidth: 2, borderColor: '#9e9e9e', borderStyle: 'solid'}} size={'160px'} src={props.studentData.pic} round={true}/>
                    </p>
                </div>

                <div className="col-md-5">
                    <h1>{props.studentData.firstName.toUpperCase()} {props.studentData.lastName.toUpperCase()}</h1>
                    <p>
                        <div><strong>Email:</strong> <span>{props.studentData.email}</span></div>
                        <div><strong>Company:</strong> <span>{props.studentData.company}</span></div>
                        <div><strong>Skill:</strong> <span>{props.studentData.skill}</span></div>
                        <div><strong>Average:</strong> <span>{average} %</span></div>
                    </p>

                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            {divGrades}
                        </div>
                    </Collapse>
                </div>

                <div className="col-md-4">
                    <div className={classes.collapsableButton}>
                        <div className={'float-right'}>
                            <button
                                className={'btn pull-right'}
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                            >
                                <FontAwesomeIcon icon={open ? 'minus' : 'plus'} size="lg" color="black"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;