import React, {useReducer} from 'react'

const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    },
    hasBeenSubmitted: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_FIRSTNAME_VALUE":
            return {
                ...state,
                firstName: {
                    ...state.firstName,
                    value: action.payload
                }
            }
        case "SET_FIRSTNAME_ERROR":
            return {
                ...state,
                firstName: {
                    ...state.firstName,
                    error: action.payload
                }
            }
        case "SET_LASTNAME_VALUE":
            return {
                ...state,
                lastName: {
                    ...state.lastName,
                    value: action.payload
                }
            }
        case "SET_LASTNAME_ERROR":
            return {
                ...state,
                lastName: {
                    ...state.lastName,
                    error: action.payload
                }
            }
        case "SET_EMAIL_VALUE":
            return {
                ...state,
                email: {
                    ...state.email,
                    value: action.payload
                }
            }
        case "SET_EMAIL_ERROR":
            return {
                ...state,
                email: {
                    ...state.email,
                    error: action.payload
                }
            }
        case "SET_SUBMITTED_BOOLEAN":
            return {
                ...state,
                hasBeenSubmitted: action.payload
            }
        default:
            return state
    }
}

const Form = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const hasBlanks = !state.firstName.value || !state.lastName.value || !state.email.value
    const hasErrors = state.firstName.error || state.lastName.error || state.email.error
    const isValid = !hasBlanks && !hasErrors

    const handleFirstNameChange = (e) => {
        if (e.target.value.length < 2) {
            dispatch({
                type: "SET_FIRSTNAME_ERROR",
                payload: "First name must be at least 2 characters"
            })
        } else {
            dispatch({
                type: "SET_FIRSTNAME_ERROR",
                payload: ""
            })
        }
        dispatch({
            type: "SET_FIRSTNAME_VALUE",
            payload: e.target.value
        })
    }

    const handleLastNameChange = (e) => {
        dispatch({
            type: "SET_LASTNAME_VALUE",
            payload: e.target.value
        })
        if (e.target.value.length < 2) {
            dispatch({
                type: "SET_LASTNAME_ERROR",
                payload: "Last name must be at least 2 characters"
            })
        } else {
            dispatch({
                type: "SET_LASTNAME_ERROR",
                payload: ""
            })
        }
    }

    const handleEmailChange = (e) => {
        if (!e.target.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
            dispatch({
                type: "SET_EMAIL_ERROR",
                payload: "Not a proper email address (my@example.com)"
            })
        } else {
            dispatch({
                type: "SET_EMAIL_ERROR",
                payload: ""
            })
        }
        dispatch({
            type: "SET_EMAIL_VALUE",
            payload: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({
            type: "SET_SUBMITTED_BOOLEAN",
            payload: true
        })
    }
    return (
        <div>
            {state.hasBeenSubmitted ? <h3>Form has been submitted!</h3> : null}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="firstName">First Name: </label>
                    <input
                        type="text"
                        name="firstName" 
                        id="firstName"
                        value={state.firstName.value}
                        onChange={(e) => handleFirstNameChange(e)}
                        />
                    {state.firstName.error !== null && (
                        <p className='error'>{state.firstName.error}</p>
                        )}
                </div>
                <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={state.lastName.value}
                    onChange={(e) => handleLastNameChange(e)}
                    />
                    {state.lastName.error !== null && (
                        <p className='error'>{state.lastName.error}</p>
                        )}
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                    type="text"
                    name="email"
                    id="email"
                    value={state.email.value}
                    onChange={(e) => handleEmailChange(e)}
                    />
                    {state.email.error !== null && (
                        <p className='error'>{state.email.error}</p>
                        )}
                </div>
                <input type="submit" value="Submit" disabled={!isValid}/>
            </form>
        </div>
    )
}

export default Form