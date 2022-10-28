// let's say we want to dispatch the same action in multiple places, for instance if someone is adding something to a shopping cart we'd want the amount in the shopping cart to possibly update in multiple places on the page
// we can create an actionCreator function so that we don't have to write the same code/function in multiple places

import * as actions from './actionTypes'

// want to create a function to add bugs
// take guts of dispatch from index.js and put them here
export const bugAdded = (description) => ({
        type: actions.BUG_ADDED,
        payload: {
            description: description
    }
})

export const bugResolved = id => ({
    type: actions.BUG_RESOLVED,
    payload: {
        id: id
    }
})