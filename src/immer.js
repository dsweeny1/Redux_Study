import { produce } from 'immer'

let immerBook = { title: 'Harry Potter', author: 'J.K. Rowling' }

function publish(immerBook) {
    return produce(immerBook, draftBook => {
        draftBook.isPublished = true
        // draftBook = proxy object that will store all of the changes we are making
        // draftBook = copy of book object with all the changes we are making
    })
}

publish(immerBook)

console.log(immerBook)
// console.log(publish())


export default {immerBook, publish}