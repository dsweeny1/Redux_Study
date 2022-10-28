// Currying allows us to create middleware for Redux that doesn't interfere with any of its functionality.
// Currying is the transformation of a function with multiple arguments into a sequence of single-argument functions. That means converting a function like this f(a, b, c, ...) into a function like this f(a)(b)(c)...

// EXAMPLE
// instead of:
// function add(a, b) {
//     return a + b
// }
add(2, 3)
// it becomes:
function add(a) {
    return function(b) {
        return a + b
    }
}
add(2)(3)
// this is the same as the first function add

const add2 = a => b => a + b
// instead of separating params using a comma, we're separating them using arrows

export default { add2, add }