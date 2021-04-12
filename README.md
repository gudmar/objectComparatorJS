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



## Tests
Files: test.js, testVariables.js contain a set of tests and a class to run those tests. Each test case is a JS object, so it is simle to write new test cases.
tests.html and tests.css files is for visualization of test results.

