export const BUG_ADDED = "bugAdded"
export const BUG_REMOVED = 'bugRemoved'
export const BUG_RESOLVED = 'bugResolved'

// we save these variables here, assigned to the string of choice, that way we can change the value and update it universally using the variable name
// this will be the only place we are storing this string literal, if we want to change it moving forward this is the only place we'll have to update it