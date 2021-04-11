class ObjectCompare{
    static isPrimitive(a){
        let primitives = ["number", "string", "boolean", "bigint", "undefined", "null", "symbol"]
        for(let type of primitives){
            if (typeof(a) == type){
                return true
            } 
        }
        return false
    }


    static arePrimitivesEqual(a, b){
        if (ObjectCompare.isPrimitive(a) && ObjectCompare.isPrimitive(b)) {
            return (a == b)
        }
    }


    static _areArrays(arrayOfArgs){
        return ObjectCompare._areOfSpecificType(arrayOfArgs, 'Array')
    }


    static _areFunctions(arrayOfArgs){
        return ObjectCompare._areOfSpecificType(arrayOfArgs, 'Function')
    }


    static _areMaps(arrayOfArgs) {
        return ObjectCompare._areOfSpecificType(arrayOfArgs, 'Map')
    }


    static _areSets(arrayOfArgs) {
        return ObjectCompare._areOfSpecificType(arrayOfArgs, 'Set')
    }


    static _areDates(arrayOfArgs) {
        return ObjectCompare._areOfSpecificType(arrayOfArgs, 'Date')
    }



    static _isVariableOfSpecificType(variable, constructorName){
        return variable.constructor.name == constructorName ? true : false
    }


    static _areOfSpecificType(arrayOfVars, constructorName){
        for (let arg of arrayOfVars) {
            if (!ObjectCompare._isVariableOfSpecificType(arg, constructorName)) {
                return false;
            }
        }
        return true;        
    }


    static _areAllOfEqualType(arrayOfArgs){
        if (arrayOfArgs.length < 2) {
            return true
        } else {
            let type = typeof(arrayOfArgs[0])
            for (let a of arrayOfArgs) {
                if (typeof(a) != type) {
                    return false
                }
            }
        }
        return true;
    }


    static compareArrays(a, b, arrayElementsComparationMethod){
        if (!ObjectCompare._areArrays([a, b])) {
            throw new TypeError(`${ObjectCompare.constructor.name}: areArraysEqual: arguments should be arrays`)
        } else if (!ObjectCompare._areAllOfEqualType([a, b])) {
            return false;
        } else {
            let aLen = a.length;
            let bLen = b.length;
            let nrOfCommonKeys = 0;
            if (aLen != bLen) {
                return false;
            } else {
                for (let index = 0; index < aLen; index++){
                    if (arrayElementsComparationMethod(a, b, index)) {
                        nrOfCommonKeys++;
                    } 
                }
                return nrOfCommonKeys == bLen ? true : false
            }      
    
        }
    }

    static areArraysEqual(a, b, keyEnumerateMethod = Object.keys){
        // Arrays are indentical in identical order. JSON.stringify cannot be used due to nested objects !!
        let comparationMethod = function(a, b, index){
            return ObjectCompare._areEqual(a[index], b[index], keyEnumerateMethod)
        }
        return ObjectCompare.compareArrays(a, b, comparationMethod)
    }

    static haveArraysSameValues(a, b, keyEnumerateMethod = Object.keys){
        // Arrays are indentical in identical order. JSON.stringify cannot be used due to nested objects !!
        let comparationMethod = function(a, b, index){
            return doesAincludeB(a, b[index], keyEnumerateMethod)
        }
        let doesAincludeB = function(aArray, b) {
            let aLen = aArray.length;
            let isElementInArray = false;
            for (let item of aArray) {
                if (ObjectCompare._areEqual(item, b, keyEnumerateMethod, ObjectCompare.haveArraysSameValues)) {isElementInArray = true}
            }
            return isElementInArray
        }
        return ObjectCompare.compareArrays(a, b, comparationMethod)
    }

    static _areObjectsEqual(a, b, keyEnumerateMethod){
        let keysA = keyEnumerateMethod(a);
        let keysB = keyEnumerateMethod(b);  
        let nrOfEqualKeys = 0;      
        if (!this.haveArraysSameValues(keysA, keysB, ObjectCompare.arePrimitivesEqual)) {
            return false;
        } else {
            let lenA = keysA.length;
            let lenB = keysB.length;
            for (let key of keysA) {
                if (ObjectCompare._areEqual(a[key], b[key], keyEnumerateMethod)) {
                    nrOfEqualKeys++;
                } else {
                    return false
                }
            }
            return ((nrOfEqualKeys == lenA) && (nrOfEqualKeys == lenB)) ? true : false
        }
    }


    static _areEqual(a, b, keyEnumerateMethod, arrayCompareMethod = ObjectCompare.areArraysEqual){
        // dates, bigInts, Map, Set
        if (!ObjectCompare._areAllOfEqualType([a, b])) {
            return false;
        } 
        else if (ObjectCompare.isPrimitive(a) && ObjectCompare.isPrimitive(b)) { 
            return ObjectCompare.arePrimitivesEqual(a, b)
        } 
        else if (ObjectCompare._areFunctions([a, b])) {
            return ObjectCompare.areFunctionsEqual(a, b)
        } 
        else if (ObjectCompare._areDates([a, b])) {
            return ObjectCompare.areDatesEqual(a, b)
        } 
        else if (ObjectCompare._areMaps([a, b])) {
            return ObjectCompare.areMapsEqual(a, b)
        } 
        else if (ObjectCompare._areArrays([a, b])){
            return arrayCompareMethod(a, b, keyEnumerateMethod)
        } 
        else {
            return ObjectCompare._areObjectsEqual(a, b, keyEnumerateMethod)
        }
    }


    static areEqualEnumerable(a, b){
        return ObjectCompare._areEqual(a, b, Object.keys)
    }


    static areEqualEnumerableArrayValuesCompare(a, b){
        return ObjectCompare._areEqual(a, b, Object.keys, ObjectCompare.haveArraysSameValues)
    }


    static areEqualNotEnumerable(a, b) {
        return  ObjectCompare._areEqual(a, b, Reflect.ownKeys)
    }


    static areEqualNotEnumerableArrayValueCompare(a, b) {
        return  ObjectCompare._areEqual(a, b, Reflect.ownKeys, ObjectCompare.haveArraysSameValues)
    }


    static areFunctionsEqual(a, b){
        // Do not use JSON.stringify, as it often returns undefined while converting functions
        return a.toString() == b.toString()
    }


    static areMapsEqual(a, b) {
        console.log(a)
        console.log(ObjectCompare._areArrays([a, b]))
        console.log(b)
        console.dir(a)
        return a == b
    }


    static areDatesEqual(a, b){
        return a.toString() == b.toString()
    }
}