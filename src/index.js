import { compose, pipe } from 'lodash/fp'
import book from './immutable-js'
import { add2, add } from './currying'
import { immerBook, publish } from './immer'
import store from './store'
import * as actions from './actionTypes'
// instead of importing numerous variables, you can use * as actions to import everything from that file
// see store.dispatch functions to see how to access the variables using actions
// Once actionCreators file is created you no longer need to import * as actions here b/c it is happening in the actionCreators file, instead import:
import { bugAdded, bugResolved  } from './actionCreators'

const sayHello = () => {
    return 'Hello World'
}

let fn = sayHello;
// fn = alias for sayHello function
// we can call fn() and it is the same thing as sayHello()
// remember that functions are first class citizens, we can treat them as any other variables
// functions that take in another function as an argument or returns another function, ie:
// function sayHello() {
//     return function() {
//         return 'Hello World'
//     }
// }
// are called Higher Order Functions --> called higher order functions because instead of operating on strings, booleans, or numbers, they go higher to operate other functions
// iterator methods = Higher Order Functions, they take in another function using the callback function to produce the return

// --------------------------------------

let input = "    JavaScript    "
let output = "<div>" + input.trim() + "</div>"

const trim = str => str.trim()
// const wrapInDiv = (type, str) => `<${type}>${str}</${type}>`
// using Currying, wrapInDiv looks like:
const wrapInDiv = type => str => `<${type}>${str}</${type}>`
const toLowerCase = str => str.toLowerCase()

// const result = wrapInDiv(toLowerCase(trim(input)))
//this code = very messy, to verbose
// instead we use compose and pipe from lodash

// const transform = compose(warpInDiv, toLowerCase, trim)
// transform(input)
// compose = another example of a Higher Order Function
// with compose, we still have to read out functions from right to left, rather than in the order we want to execute this
// to fix this we use pipe
// this: const transform = compose(warpInDiv, toLowerCase, trim)
// becomes:
const transform = pipe(trim, toLowerCase, wrapInDiv('div'))
console.log(transform(input))

// Pure Functions
// can't use random values (Math.floor(Math.random))
// can't use current date/time, b/c it changes
// no global state, because we cannot read or change global state

// Redux has special functions called reducers
// Reducers need to be pure, other functions can be impure
// Benefits of Pure Functions:
    // Self-documenting
    // Easily testable
    // Concurrency
    // Cacheable
// Immutability comes along with Pure Functions in Redux
// you have to make a copy and change the copy
// ie:
let name = 'Danielle'
let newName = name.toUpperCase()
console.log(newName)
// here we are getting a new string, the original string is unchanged

// Why Immutability?
    // predictability
    // faster change detection --> React needs to know when state is changed so it can trigger re-rendering
    // concurrency
// Cons of Immutability
    // Performance --> the memory overhead can slow down performance
    // Memory overhead --> copying a large number of objects to change them will create a need for A LOT of memory
// Can use Object.assign() to make copies of object in order to change them
// EXAMPLE
const person = { 
    name: 'John',
    address: {
        country: 'USA',
        city: 'Denver'
    }
}
console.log(person)
// const newPerson = Object.assign({}, person, { age: 32 })
// Object.assign takes in first property of empty object, then an object name/key, then if you want to update the object, change a value or add another key/value pair, you can also pass it in there
// can also write newPerson like this: 
const newPerson = {
    ...person, 
    name: "Bob", 
    age: 32,
    address: {
        ...person.address,
        city: 'New York'
    }
}
// Here we are doing a deep copy
// without doing a deep copy, the original person object would also get updated
newPerson.address.city = 'New York'
console.log(newPerson)

// ALTERING ARRAYS IN REDUX
// just adding to it at the beginning or end:
const numbers = [1, 2, 3]
// beginning:
const addNumberBeginning = [4, ...numbers]
// end:
const addNumberEnd = [...numbers, 4]
// if you wanted to target a specific index to add a new number:
const index = numbers.indexOf(2)
const addNewNumber = [...numbers.slice(0, index), 4, ...numbers.slice(index)]
console.log(addNewNumber)
//if you want to target a specific index to remove
const removeTwo = numbers.filter(num => num != 2)
console.log(removeTwo)
// if you want to update an array
const updateArr = numbers.map(num => num === 2 ? 20 : num)
console.log(updateArr)

// Libraries that you can add for Immutability for Redux:
    // Immutable
    // Immer
    // Mori

// CREATING THE STORE
console.log('store', store)
console.log(store.getState())
//begins as empty array --> need to dispatch an action
// action should have 2 properties: type and payload: description

// dispatch calls the reducer(state, action) and then assigns it to the new state:
// state = reducer(state, action) --> this is the internal state of the store
// then it's going to notify the subscribers

// *** state in redux only has a few methods to learn: getState(), dispatch(), and subscribe() ***

store.dispatch({
    type: actions.BUG_ADDED,
    payload: {
        description: 'Bug1'
    }
})
console.log('storeDispatch', store.getState())

const unsubscribe = store.subscribe(() => {
    console.log('anything?')
    console.log('stored changed!', store.getState())
})

store.dispatch({
    type: actions.BUG_REMOVED,
    payload: {
        id: 0
    }
})
unsubscribe()
// when removing we only need the ID, similar to a delete request
console.log('remove', store.getState())

// when you just console.log store you see this: {dispatch: ƒ, subscribe: ƒ, getState: ƒ, replaceReducer: ƒ, Symbol(observable): ƒ}
// subscribe function = when you subscribe to the store you get notified every time the state of the store changes, this is used by the UI layer
// notice there is only a getState function, not a setState function to change the state of the store
// ^ this is a fundamental principle in Redux, to change the state of the store we have to dispatch an action --> with this architecture we're essentially sending every action through the same entry point, this is the beauty of Redux

// SUBSCRIBING TO THE STORE
// use to get current state of store
// this is something we do in the UI layer, whenver the state of the store changes we want to refresh the UI
// this is where we work with our DOM elements and refresh the view

// Let's say you decide tomorrow or next week that you want tBUG_ADDED to 'bugCreated', you'd have to update this is many places throughout your repo
// GO TO actionTypes !!

// Once you have actionCreators file you don't need the above functions, instead you need:
store.dispatch(bugAdded('Bug 1'))
// after adding the bug we want to be able to resolve it
store.dispatch(bugResolved(1))
// here we're passing in the id number to bugResolved
console.log('resolved?', store.getState())