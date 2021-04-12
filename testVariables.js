function getNotEnumDescriptor(val){
    return{
        enumerable: false,
        value: val
    }
}
function getDeepCopyOfObject(obj){
    return JSON.parse(JSON.stringify(obj))
}

let stringA = 'Test string';
let stringAcp = 'Test string';
let stringB = 'Different test string';
let bigIntA = 13355n;
let bigIntAcp = 13355n;
let bigIntB = 324532453263245543253n;

const symbolA = Symbol();
let arrayA = [1, 2, '3', 4]
let arrayAdiff = [1, '3', 2, 4]
let arrayAcp = [1, 2, '3', 4]
let arrayB = [3, 4, 5, 6]
let arrayLong = [2, 3, 54, 6, 3, 4, 5, true]

let objectNoHiddenA = {
    key1: 'val1',
    key2: 'val2',
    key3: 'val3',
}

let getCopyWithSomeHiddenProp = function(obj, hiddenPropValue = 24, hiddenProperyKey = 'keyZ') {
    let output = getDeepCopyOfObject(obj)
    Object.defineProperty(output, hiddenProperyKey, getNotEnumDescriptor(hiddenPropValue))
    return output
}
let symbolKeyedObject = {}
    symbolKeyedObject[symbolA] = 'some value'
let symbolKeyedObject_same = {}
    symbolKeyedObject_same[symbolA] = 'some value'

let simpleHiddenObject = getCopyWithSomeHiddenProp({}, 23)

let objectNoHiddenADiffVal = {
    key1: 'val0',
    key2: 'val2',
    keyD: 'val3'
}
let objectNoHiddenB = {
    key1: 'val5',
    key2: 'val6',
    keyD: 'val3',
}
let objectNoHiddenNestedA = {
    keyA: objectNoHiddenA,
    keyB: arrayLong,
    keyD: objectNoHiddenADiffVal,
    keyC: [...arrayLong, ...arrayB]
}
let objectNoHiddenNestedB = {
    keyA: objectNoHiddenB,
    keyB: arrayLong,
    keyD: objectNoHiddenADiffVal,
    keyC: [...arrayLong, ...arrayB]    
}
let objectDeeplyNestedA = {
    keyA: objectNoHiddenA,
    keyB: [objectNoHiddenA, objectNoHiddenNestedB, [objectNoHiddenA]],
    keyC: {
        keyA: objectNoHiddenA
    }
}

let objectDeeplyNestedHiddenA = {
    keyA: objectNoHiddenA,
    keyB: [objectNoHiddenA, objectNoHiddenNestedB, [objectNoHiddenA]],
    keyC: {o: getCopyWithSomeHiddenProp(objectNoHiddenA)}    
}


let objectDeeplyNestedDifferentHiddenA = {
    keyA: objectNoHiddenA,
    keyB: [objectNoHiddenA, objectNoHiddenNestedB, [objectNoHiddenA]],
    keyC: {o: getCopyWithSomeHiddenProp(objectNoHiddenA, 23)}    
}



let arrayNestedNotHiddenA = [getDeepCopyOfObject(objectNoHiddenNestedA),
    getDeepCopyOfObject(objectNoHiddenNestedB),
    getDeepCopyOfObject(objectNoHiddenA),
    getDeepCopyOfObject(objectNoHiddenB)
]
let arrayNestedNotHiddenReorderedA = [getDeepCopyOfObject(objectNoHiddenNestedB),
    getDeepCopyOfObject(objectNoHiddenB),
    getDeepCopyOfObject(objectNoHiddenNestedA),
    getDeepCopyOfObject(objectNoHiddenA)
]
let arrayNestedHiddenA = [objectDeeplyNestedHiddenA,
    objectNoHiddenNestedB,
    objectNoHiddenA,
    objectNoHiddenB
]
let arrayNestedDifferentHiddenValueA = [objectDeeplyNestedDifferentHiddenA,
    objectNoHiddenNestedB,
    objectNoHiddenA,
    objectNoHiddenB
]

let setA = new Set()
setA.add(objectDeeplyNestedHiddenA)
setA.add(3)
setA.add(4)

let setA_same = new Set()
setA_same.add(objectDeeplyNestedHiddenA)
setA_same.add(3)
setA_same.add(4)

let setB = new Set()
setB.add(objectDeeplyNestedDifferentHiddenA)
setB.add(3)
setB.add(4)

let setC = new Set()
setC.add(objectNoHiddenNestedA)
setC.add(3)
setC.add(4)

let setD = new Set()
setD.add(objectNoHiddenNestedB)
setD.add(3)
setD.add(4)

let setE = new Set()
setE.add(1)
setE.add(2)
setE.add(3)
setE.add(4)

let setF = new Set()
setE.add(5)
setE.add(2)
setE.add(3)
setE.add(4)


let mapA = new Map([
    [1, 'val1'],
    [2, 'val2'],
    [3, 'val3']
])

let mapA_same = new Map([
    [1, 'val1'],
    [2, 'val2'],
    [3, 'val3']
])

let mapB = new Map([
    [1, 'val4'],
    [2, 'val2'],
    [3, 'val3']
])
let mapC = new Map();
mapC.set(1, 'val2');
mapC.set(true, 'val3');
mapC.set(false, 'val4');
mapC.set(()=>{}, 'val5')

let mapC_same = new Map();
mapC_same.set(1, 'val2');
mapC_same.set(true, 'val3');
mapC_same.set(false, 'val4');
mapC_same.set(()=>{}, 'val5')


let mapC_reordered = new Map();
mapC_reordered.set(1, 'val2');
mapC_reordered.set(false, 'val4');
mapC_reordered.set(true, 'val3');
mapC_reordered.set(()=>{}, 'val5')

let nestedMapA = new Map();
nestedMapA.set(1, mapC);
nestedMapA.set(arrayNestedHiddenA, objectDeeplyNestedDifferentHiddenA)

let nestedMapA_same =  new Map();
nestedMapA_same.set(1, mapC);
nestedMapA_same.set(arrayNestedHiddenA, objectDeeplyNestedDifferentHiddenA)

let nestedMapA_differentHidden = new Map();
nestedMapA.set(1, mapC);
nestedMapA.set(arrayNestedHiddenA, objectDeeplyNestedA)



let dateA = new Date(1999, 1, 23, 12, 23, 12)
let dateA_same = new Date(1999, 1, 23, 12, 23, 12)
let dateB = new Date(2000)


let functionA = function(a, b) {
    let c = a + b;
    return c*a
}
let functionA_same = function(a, b) {
    let c = a + b;
    return c*a
}

function functionB(a, b) {
    let c = a - b;
    return c / b
}

function functionB_same(a, b){
    let c = a - b;
    return c / b
}

let functionD = (a) => {return a * 8}
let functionD_same = (a) => {return a * 8}

function functionC(a) {
    let s = Symbol();
    let o = {}
    if (a > 54) {return undefined}
    o[s] = a * 89;
    return o
}

let  functionC_same = functionC