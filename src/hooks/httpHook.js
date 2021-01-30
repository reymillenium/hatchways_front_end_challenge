// We don't need to import the React package as we are building a React component
// We just want to use some features from the React package (useReducer)
// * * * Custom Hook created by Reinier Garcia, 2021 * * *
import {useReducer, useCallback} from 'react';


const initialState = {
    loading: false,
    errorMessage: null,
    data: null,
    extra: null,
    identifier: null
};

const httpReducer = (currentHttpState, action) => {
    switch (action.type) {
        case 'SEND_REQUEST':
            return {
                loading: true,
                errorMessage: null,
                data: null,
                extra: null,
                identifier: action.payload.identifier
            };
        case 'GET_RESPONSE':
            return {
                ...currentHttpState,
                loading: false,
                data: action.payload.responseData,
                extra: action.payload.extra
            };
        case 'GET_ERROR':
            return {
                loading: false,
                errorMessage: action.payload.errorMessage
            };
        case 'CLEAR':
            return initialState;
        case 'SET_IS_LOADING':
            return {
                ...currentHttpState,
                loading: true
            };
        case 'SET_IS_NOT_LOADING':
            return {
                ...currentHttpState,
                loading: false
            };
        default:
            // We should actually handling all the cases that we can have
            throw new Error('We should never get here!');
    }
};

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => dispatchHttp({type: 'CLEAR'}), []);
    const setIsLoading = useCallback(() => dispatchHttp({type: 'SET_IS_LOADING'}), []);
    const setIsNotLoading = useCallback(() => dispatchHttp({type: 'SET_IS_NOT_LOADING'}), []);

    // This ways the http is not send every time useHttp is called,
    // but when only when sendRequest is called instead
    const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
        dispatchHttp({type: 'SEND_REQUEST', payload: {identifier: reqIdentifier}});
        fetch(url, {
            method: method,
            body: body,
            // * headers is needed for a post, not for a get request
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // This extracts my response's body (responseData)
                return response.json();
            })
            .then(responseData => {
                dispatchHttp({type: 'GET_RESPONSE', payload: {responseData: responseData, extra: reqExtra}});
            })
            .catch(error => {
                // Using useReducer instead of useState:
                dispatchHttp({type: 'GET_ERROR', payload: {errorMessage: error.message}});
            });
    }, []);

    return {
        isLoading: httpState.loading,
        errorMessage: httpState.errorMessage,
        data: httpState.data,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIdentifier: httpState.identifier,
        clear: clear,
        setIsLoading: setIsLoading,
        setIsNotLoading: setIsNotLoading
    };
};

export default useHttp;