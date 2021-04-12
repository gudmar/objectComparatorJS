# objectComparatorJS
A static class that can be used to compare deeply nested object, arrays containing objects. Still no support for Map, Set, function, Date. Need for a bug fix because null is not supported
## Interface
*areEqualEnumereable(a, b):* compare objects, do not look into not enumerable properties, arrays have to have the same items with the same indexes
*areEqualEnumerableArrayValuesCompare(a, b):* compare objects, do not look into not enumerable properties, arrays have to have the same items, but item order does not matter
*areEqualNotEnumerable(a, b):* compare objects, look also to not enumerable properties, and properties keyed with a Symbol. Array item order matters
*areEqualNotEnumerableArrayValueCompare(a, b)* compare objects, look also to not enumerable properties, and properties keyed with a Symbol. Array item order does not matter
*arePrimitivesEqual(a, b):* Compare 2 primitive values
*isPrimitive(a)*: Check if a is a primitive type
*areFunctionsEqual(a, b):* true a and b are equal functions (toString used to convert functions to strings, strings are compared)
*areMapsEqual(a, b):* true a and b are equal Map objects. All nested objects compared, keys also compared, looked inside not enumerable elements in case of Object being Map items
*areSetsEqual(a, b):* true a and b are equal Set objects. All nested objects compared, keys also compared, looked inside not enumerable elements in case of Object being Set items
*areDatesEqual(a, b):* true if a and b are equal Date objects. toString used to convert dates to strings, strings are compared
*areArraysEqual(a, b, keyEnumerateMethod = Object.keys):* true of arrays a and b have the same items in the same order. KeyEnumerateMethod can be used to change method of listing keys in items of array that are Objects.
*haveArraysSameValues(a, b, keyEnumerateMethod = Object.keys):* this function is for deteming if 2 arrays have the same items, no matter of their order
*compareArrays(a, b, arrayElementsComparationMethod):* Compare arrays a and b. Pass a function returning ture if a and be are equal and false if not.
*areNull(arr):* return true if each element of array arr is null
*areSpecialNumberValues(arr):* is true if each array arr element is Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY or NaN
*areArrays(arrayOfArgs):* a polyfill for Array.isArray()
*areFunctions(arrayOfArgs):* true if each item of arrayOfArgs is a type of function
*areMaps(arrayOfArgs):* true if each arrayOfArgs element is a Map
*areSets(arrayOfArgs):" true if each arrayOfArgs element is a Set
*areDates(arrayOfArgs):* is true if each element o arrayOfArgs is a Date object
*compareSpecialNumberValues(a, b):* ture is both a and b are NaN (meaning they are equal to Number.NaN, do not confuse with eg. string, that is also not a number if evalated with isNaN function), both are Number.POSITIVE_INFINITY or both are Number.NEGATIVE_INFINITY



## Tests
Files: test.js, testVariables.js contain a set of tests and a class to run those tests. Each test case is a JS object, so it is simle to write new test cases.
tests.html and tests.css files is for visualization of test results.

