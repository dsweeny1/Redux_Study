import { Map } from 'immutable'
// we can create a map or hashback, a regular JS object

let book = Map({ title: 'Harry Potter', author: 'J.K. Rowling' })

// function publish(book) {
//     book.isPublished = true
// }
// Using Immutable, publish() has to be written as:

const publish = (book) => {
    return book.set('isPublished', true)
}

book = publish(book)

console.log(book.get('title'))
// when using Map from Immutable, you cannot use dot notaion on an object to get to a key/value pair, you need to use the .get() method
// to get a plain JS object, need to use .toJS() method
// ie:
console.log(book.toJS())
// will console.log { title: 'Harry Potter' }

export default book