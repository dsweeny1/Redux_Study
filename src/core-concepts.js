// REDUX ARCHITECTURE

import * as actions from "./actionTypes"

// 3 Building Blocks of Redux: Action(or event), Store, Reducer(similar to eventhandler)
// When a user creates an action, such as adding an item to a shopping cart, we create an action object and dispatch it
// that action will dispatch to the store, and then gets forwarded to the reducer
// we do not call the reducer directly, the store calls the reducer
// the reducer computes the state and returns the new updated copy
// the store will set the state internally and alert the UI components of the change
// the UI components will pull out the data and refresh 

// reducer function takes in 2 params: store, and an action
// cannot use one function (one reducer) to do all your updates
// each reducer will be responsible for updating 1 slice
// it's like the reducer is the manager of a department in a company, a manager only worries about it's own department
// Reducers are Pure Functions
// const reducer = (store, action) => {
//     const updated = { ...store }
// }

// FOUR STEPS TO FOLLOW WHEN BUILDING A REDUX APP
    // Design the Store
    // Define the actions
    // Create one or more reducers
    // Set up the Store based on the reducer

// DESIGNING THE STORE
// data (ie. arrays, objects) within a Store are called slices
// probably need a reducer for each slice
// In Redux the state begins undefined, Redux is going to call the Reducer function and pass undefined as the state
// You can reset the state within the Reducer params as seen below

// actions structured: type, description

// BUILD A REDUCER: SETUP WITHOUT IMMER OR IMMUTABLE LIBRARIES AND USING IF ELSE, SWITCH CASE EXAMPLE FOUND BELOW
// let lastID = 0
// const reducer = (state = [], action) => {
//     if (action.type === 'bugAdded') {
//         return [
//             ...state,
//             // here we're spreading the state to add it, we could use one of the libraries, Immer or Immutable to add the state
//             {
//                 id: lastID++,
//                 description: action.payload.description,
//                 resolved: false
//             }
//         ]
//     } else if (action.type === 'bugRemoved') {
//         return state.filter(bug => bug.id !== action.payload.id)
//         // here we want to return all the bugs except the one with the given id b/c it's been resolved
//     } else {
//         return state
//         // we return the current state in case the action we're trying to do doesn't exist/isn't possible
//     }
// }

// SWITCH CASE EXAMPLE
let lastID = 0
export default function reducer(state = [], action) {
    switch(action.type) {
        case actions.BUG_ADDED: 
        return [
            ...state,
            // here we're spreading the state to add it, we could use one of the libraries, Immer or Immutable to add the state
            {
                id: lastID++,
                description: action.payload.description,
                resolved: false
            }
        ]
        case actions.BUG_REMOVED:
            return state.filter(bug => bug.id !== action.payload.id)
        case actions.BUG_RESOLVED:
            return state.map(bug => 
                bug.id !== action.payload.id ? bug : {...bug, resolved: true})
                // here we are checking if the bud.id matches the action, if it does match we are making of copy of that bug, keeping the original state of the bug and adding a state of resolved: true
        default:
            return state
    }
}

// These Reducer functions are Pure Functions, they always return the same results and are free of side effects