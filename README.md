# objectComparatorJS
A static class that can be used to compare deeply nested object, arrays containing objects. Still no support for Map, Set, function, Date. Need for a bug fix because null is not supported
## Interface
*areEqualEnumereable(a, b):* compare objects, do not look into not enumerable properties, arrays have to have the same items with the same indexes
*areEqualEnumerableArrayValuesCompare(a, b):* compare objects, do not look into not enumerable properties, arrays have to have the same items, but item order does not matter
*areEqualNotEnumerable(a, b):* compare objects, look also to not enumerable properties, and properties keyed with a Symbol. Array item order matters
*areEqualNotEnumerableArrayValueCompare(a, b)* compare objects, look also to not enumerable properties, and properties keyed with a Symbol. Array item order does not matter
*arePrimitivesEqual(a, b):* Compare 2 primitive values
*isPrimitive(a)*: Check if a is a primitive type
## Tests
Files: test.js, testVariables.js contain a set of tests and a class to run those tests. Each test case is a JS object, so it is simle to write new test cases.
tests.html and tests.css files is for visualization of test results.
## To do:
Support for null, Map, Set, Date, Functions. Not all tests are passed  due to lack of this support.
Methods that are an interfase need to be brought up in the file
