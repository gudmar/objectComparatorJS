


class TestResultPlacer{
    constructor(targetId){
        this.tBodyId = targetId + 'tBodyId'
        this._placeStrContentToElementWithId(this._getTableWrapperTemplate(), targetId)
        this.index = 1;
    }
    _getTableWrapperTemplate(){
        return `
            <table>
                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>Test Case</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody id = "${this.tBodyId}">
                </tbody>
            </table>
        `
    }

    _placeStrContentToElementWithId(strContent, id = this.tBodyId){
        document.getElementById(id).appendChild(this._str2element(strContent))
    }

    _str2element(str){
        let template = document.createElement('template');
        template.innerHTML = str;
        return template.content.cloneNode(true)
    }

    _isResultValid(result){
        return (result == 'PASS' || result == 'FAIL')?true:false
    }

    addResult(testName, result) {
        if (!this._isResultValid(result)) {
            throw new TypeError (`${this.constructor.name}: result should be 'PASS', or 'FAIL'`)
        }
        let strContent = `
            <tr class = '${result}'>
                <td>${this.index}</td>
                <td>${testName}</td>
                <td>${result}</td>
            </tr>
        `
        this._placeStrContentToElementWithId(strContent)
        this.index++;
    }
}

class Test{
    constructor(name, objA, objB, testedMehod, expectedResult){
        this.name = name;
        this.objA = objA;
        this.objB = objB;
        this.expectedResult = expectedResult;
        this.testedMehod = ObjectCompare[testedMehod]
    }
    _comparitionMethods(){
        let methods = ['arePrimitivesEqual', 
                       'areEqualEnumerable', 
                       'areEqualNotEnumerable', 
                       'areEqualNotEnumerableArrayValueCompare', 
                       'areEqualEnumerableArrayValuesCompare',
                       'haveArraysSameValues',
                       'areArraysEqual'
                    ]
        return methods
    }
    _isComparationMethod(testedMehod){
        return this._comparitionMethods().includes(testedMehod.name)
    }

    _executeUnipolarTest(a, testedMehod, expectedResult) {
        return testedMehod(a) == expectedResult ? true : false
    }
    _executeBipolarTest(a, b, testedMehod, expectedResult){
        return testedMehod(a, b) == expectedResult ? true : false
    }
    execute(message = this.name){
        if (this._isComparationMethod(this.testedMehod)) {
            return this.translateToPassFail(this._executeBipolarTest(this.objA, this.objB, this.testedMehod, this.expectedResult))
        } else {
            return this.translateToPassFail(this._executeUnipolarTest(this.objA, this.testedMehod, this.expectedResult))
        }
    }
    translateToPassFail(expr){
        return expr == true ? 'PASS' : "FAIL"
    }

}


let testCase1 = {
    objA: stringA,
    objB: stringAcp,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: 'Compare same strings'
}
let testCase2 = {
    objA: stringA,
    objB: stringB,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: 'Compare different strings'    
}
let testCase3 = {
    objA: bigIntA,
    objB: bigIntAcp,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: 'Compare same big Ints'    
}
let testCase4 = {
    objA: bigIntA,
    objB: bigIntB,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: 'Compare different big Ints'
}
let testCase5 = {
    objA: stringA,
    objB: bigIntB,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: 'Compare primitives of different type'
}
let testCase6 = {
    objA: arrayA,
    objB: arrayAdiff,
    testedMehod: 'areEqualNotEnumerableArrayValueCompare',
    expectedResult: true,
    message: 'Compare arrays of primitives with same values in different order'
}
let testCase7 = {
    objA: arrayA,
    objB: arrayAdiff,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: 'Compare arrays of primitives with same values in different order - use areArraysEqual'
}
let testCase8 = {
    objA: arrayA,
    objB: arrayAcp,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: 'Compare arrays of primitives with same values in the same order - use areArraysEqual'
}
let testCase9 = {
    objA: arrayA,
    objB: arrayB,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: 'compare arrays with different primitive values - use haveArraysSameValues and areArraysEqual'
}
let testCase10a = {
    objA: arrayB,
    objB: arrayLong,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: 'Compare arrays with different lenghts - areArraysEqual (B, Long)'
}
let testCase10b = {
    objA: arrayLong,
    objB: arrayB,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: 'Compare arrays with different lenghts - use areArraysEqual (Long, B)'
}
let testCase10c = {
    objA: arrayLong,
    objB: arrayB,
    testedMehod: 'areEqualNotEnumerableArrayValueCompare',
    expectedResult: false,
    message: 'Compare arrays with different lenghts - use haveArraysSameValues and areArraysEqual (Long, B)'
}
let testCase10d = {
    objA: arrayB,
    objB: arrayLong,
    testedMehod: 'areEqualNotEnumerableArrayValueCompare',
    expectedResult: false,
    message: 'Compare arrays with different lenghts - use haveArraysSameValues and areArraysEqual (B, Long)'
}
let testCase11a = {
    objA: arrayB,
    objB: arrayA,
    testedMehod: 'areEqualNotEnumerableArrayValueCompare',
    expectedResult: false,
    message: 'compare arrays with different values, but same lenght - use haveArraysSameValues (B, A)'
}
let testCase11b = {
    objA: arrayB,
    objB: arrayA,
    testedMehod: 'areEqualNotEnumerableArrayValueCompare',
    expectedResult: false,
    message: 'compare arrays with different values, but same length - use haveArraysSameValues (A, B)'
}
let testCase12 = {
    objA: objectNoHiddenA,
    objB: getCopyWithSomeHiddenProp(objectNoHiddenA),
    testedMehod: 'areEqualEnumerableArrayValuesCompare',
    expectedResult: true,
    message: 'Compare objects with same enumerable keys and primitive values. Difference in not enumerable attributes - areEqualEnumerable'
}
let testCase13 = {
    objA: objectNoHiddenA,
    objB: getCopyWithSomeHiddenProp(objectNoHiddenA),
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: 'compare objects with same enumerable keys and primitive values. Difference in not enumerable attributes - areEqualNotEnumerable'
}
let testCase14 = {
    objA: getCopyWithSomeHiddenProp(objectNoHiddenA),
    objB: getCopyWithSomeHiddenProp(objectNoHiddenA),
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: 'compare objects containing not enumerable attributes, that are equal. Use areEqualNotEnumerable'
}
let testCase15 = {
    objA: getCopyWithSomeHiddenProp(objectNoHiddenA, 23),
    objB: getCopyWithSomeHiddenProp(objectNoHiddenA, 25),
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: 'compare objects containing not enumerable attributes, that not enumerable attrubutes have different values. Use areEqualNotEnumerable'
}
let testCase16 = {
    objA: getCopyWithSomeHiddenProp(objectNoHiddenA, 25, 'keyX'),
    objB: getCopyWithSomeHiddenProp(objectNoHiddenA, 25),
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: 'compare objects containing not enumerable attributes, that not enumerable attributes have different keys. Use areEqualNotEnumerable'
}
let testCase17 = {
    objA: arrayNestedNotHiddenA,
    objB: arrayNestedNotHiddenReorderedA,
    testedMehod: 'areEqualEnumerableArrayValuesCompare',
    expectedResult: true,
    message: `compare arrays with nested objects that have the same objects in different order. 
              Use areEqualEnumerable and areNotEqualEnumerable and haveArraysSameValues`
}
let testCase18 = {
    objA: arrayNestedNotHiddenA,
    objB: arrayNestedNotHiddenReorderedA,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `compare arrays with nested objects that have the same objects in different order. Use areArraysEqual`
}
let testCase19 = {
    objA: arrayNestedNotHiddenA,
    objB: getDeepCopyOfObject(arrayNestedNotHiddenA),
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: `compare arrays with nesetd objects in the same order. Use areArraysEqual`
}
let testCase20 = {
    objA: arrayNestedHiddenA,
    objB: arrayNestedDifferentHiddenValueA,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `compare arrays with objects having hidden attributes with areNotEqualEnumerable - different hidden attribute case`
}
let testCase21 = {
    objA: symbolA,
    objB: symbolA,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: `Are Symbol primitives equal - the same symbol`
}
let testCase22 = {
    objA: symbolA,
    objB: Symbol('a'),
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `Are Symbol primitives equal - different symbol`
}

let testCase23 = {
    objA: symbolKeyedObject,
    objB: {},
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `Object with Symbol key is unequal to empty object - use areEqualNotEnumerable`
}

let testCase24 = {
    objA: symbolKeyedObject,
    objB: symbolKeyedObject_same,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: `Two objects with the same Symbol key (that is the only property) are equal`    
}

let testCase25 = {
    objA: setA,
    objB: setA_same,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: `Two sets with equal items are equal`    
}
let testCase26 = {
    objA: setA,
    objB: setB,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `Two sets with unequal items are unequal - case with item that is deeply nested object with hidden attribute that is different`    
}
let testCase27 = {
    objA: setC,
    objB: setD,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `Two sets with equal items are equal - case with object that has not hidden different values`  
}
let testCase28 = {
    objA: setE,
    objB: setF,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `Two sets with different primitiva items are unequal`  
}
let testCase29 = {
    objA: mapA,
    objB: mapA_same,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: `Two maps with same items are equal - items are primitives`  
}
let testCase30 = {
    objA: mapA,
    objB: mapB,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `Two map objects with different items are unequal`  
}
let testCase31 = {
    objA: dateA,
    objB: dateA_same,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: `Two same dates are equal`  
}
let testCase32 = {
    objA: dateA,
    objB: dateB,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `Two different dates are unequal`  
}

let testCase33a = {
    objA: (a)=>{a += 5; return a},
    objB: (a)=>{a += 5; return a},
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: `Two equal functions are equal`  
}
let testCase33b = {
    objA: (a)=>{a += 6; return a},
    objB: (a)=>{a += 5; return a},
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `Two different functions are unequal`  
}
let testCase33c = {
    objA: functionA,
    objB: functionA_same,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: `Two functions defined under variables are equal`  
}
let testCase33d = {
    objA: functionB,
    objB: functionB_same,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `Two functions with different names are unequal`  
}
let testCase33e = {
    objA: functionD,
    objB: functionD_same,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: false,
    message: `Two arrow functions defined unser variables are equal`  
}
let testCase33f = {
    objA: functionC,
    objB: functionC_same,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: `Same functions containing Symbol definitions are equal`      
}


let testCase34 = {
    objA: undefined,
    objB: undefined,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: `undefined == undefined` 
}

let testCase35 = {
    objA: null,
    objB: null,
    testedMehod: 'areEqualNotEnumerable',
    expectedResult: true,
    message: `null == null` 
    
}


console.error('No support for NULL, map, date, set')

let allTestCases = [testCase1, testCase2, testCase3, testCase4, 
                    testCase5, testCase6, testCase7, testCase8, 
                    testCase9, testCase10a, testCase10b, testCase10c, 
                    testCase10d, testCase11a, testCase11b, testCase12,
                    testCase13, testCase14, testCase15, testCase16,
                    testCase17, testCase18, testCase19, testCase20,
                    testCase21, testCase22, testCase23, testCase24,
                    testCase25, testCase26, testCase27, testCase28,
                    testCase29, testCase30, testCase31, testCase32,
                    testCase33a, testCase33b, testCase33c, testCase33d, 
                    testCase33f
                ];
// let allTestCases = [testCase33a, testCase33b, testCase33c, testCase33d, testCase33f];

(function runTestAndPlaceResults() {
    let placer = new TestResultPlacer('result')

    for (let tc of allTestCases){
        let testCase = new Test(tc.message, tc.objA, tc.objB, tc.testedMehod, tc.expectedResult)
        placer.addResult(tc.message, testCase.execute())
    }

})()
