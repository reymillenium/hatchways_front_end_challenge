import React from "react";
import classes from './Student.module.scss';
// import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const student = (props) => {
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }


    return (
        <div className={classes.Student} key={props.id}>
            <p>
                <strong>Company:</strong> <span>{props.studentData.company}</span> : <strong>Email:</strong> <span>{props.studentData.email}</span>
            </p>
            <p>
                <strong>First name:</strong> <span>{props.studentData.firstName}</span>
            </p>
            <p>
                <strong>Grades:</strong> <span>{props.studentData.grades}</span>
            </p>
        </div>
    );
}

export default student;