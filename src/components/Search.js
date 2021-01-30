import React, {useState, useEffect, useRef} from 'react';

import Card from '../components/UI/Card';
// import ErrorModal from "../UI/ErrorModal";
import ErrorModal from "../components/UI/Modal/Modal";
import useHttp from "../hooks/httpHook";
import './Search.css';

const Search = React.memo(props => {
    // Applying object destructuring (to avoid a warning in the console regarding the dependencies)
    const {onLoadStudents} = props;
    const [filterInputState, setFilterInputState] = useState('');
    const filterInputRef = useRef();
    const {isLoading, data, errorMessage, sendRequest, clear} = useHttp();

    useEffect(() => {
        const timer = setTimeout(() => {
            // filterSate will be locked when we useEffect gets executed and we set the timer.
            // So filterSate, it will still have the old value 500 ms ago. Will not be the current input
            // We are comparing the old value (500ms ago) stored in filterInputState
            // ... with the current value on the input (filterInputRef.current.value, because is defined outside of the closure, so it is not locked)
            // If the are equals, that means that the user stopped typing
            if (filterInputState === filterInputRef.current.value) {
                sendRequest(
                    'https://api.hatchways.io/assessment/students',
                    'GET'
                );
            }
        }, 500);

        // Cleanup function. It gets executed only BEFORE this same useEffect is executed for the next time.
        return () => {
            // This clears the old timer before it sets a new one
            clearTimeout(timer);
        }

    }, [filterInputState, filterInputRef, sendRequest]);

    useEffect(() => {
        if (!isLoading && !errorMessage && data) {
            const loadedStudents = [];

            for (const key in data.students) {
                loadedStudents.push({
                    ...data.students[key],
                    id: key,
                });
            }
            // Filters the students with a firstName or lastName that contains the filterState (It works simply perfect!)
            // Is better than url queries: is case insensitive and uses inclusion instead of prefixes
            const filteredLoadedStudents = loadedStudents.filter(student => student.firstName.toLowerCase().includes(filterInputState.toLowerCase()) || student.lastName.toLowerCase().includes(filterInputState.toLowerCase()));
            onLoadStudents(filteredLoadedStudents);
        }

    }, [data, isLoading, errorMessage, onLoadStudents]);

    return (
        <section className="search">
            {errorMessage && <ErrorModal onClose={clear}>{errorMessage}</ErrorModal>}
            <Card>
                <div className="search-input">
                    <input
                        // Establish the connection between the input element and the filterInputRef constant
                        ref={filterInputRef}
                        type="text"
                        value={filterInputState}
                        onChange={event => setFilterInputState(event.target.value)}
                        className={'form-control'}
                        placeholder={'Search by name'}
                    />
                </div>
            </Card>
        </section>
    );
});

export default Search;
