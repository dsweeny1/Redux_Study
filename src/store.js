import { createStore } from 'redux'
import reducer from './core-concepts'

// CREATING THE STORE
// createStore() = another example of Higher Order Function b/c it takes another function as an argument
const store = createStore(reducer) 

export default store