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
    isValid: false,
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
        case "SET_ISVALID_BOOLEAN":
            return {
                ...state,
                isValid: action.payload
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

    const validFormCheck = (state) => {
        let check = true
        Object.values(state).map((key) => 
            key.value === "" || (key.error !== "" && typeof key.error !== 'undefined')
            ? check = false
            : null
        )
        dispatch({
            type: "SET_ISVALID_BOOLEAN",
            payload: check
        })
    }

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
        setTimeout(validFormCheck(state), 1000)
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
        validFormCheck(state)
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
        validFormCheck(state)
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
                <input type="submit" value="Submit" disabled={!state.isValid?true:false}/>
            </form>
        </div>
    )
}

export default Form