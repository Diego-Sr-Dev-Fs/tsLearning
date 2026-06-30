export {};
//Simple types samples
let age: number = 30
let name: string = "Diego"
let isWorking:boolean = false;
const uniqueKey: symbol = Symbol('description');
const obj = {
  ["uniqueKey"]: 'This is a unique property'
};
/*console.log("the unique key is: ", uniqueKey.toString());
console.log("the unique property is: ", obj["uniqueKey"]);*/
//Explicit types and inference
let charge: string = "Developer Sr";
let yearsOfExperience: number = 10;
//Type inference means TS guesses the type of a variable based on its value. For example, if you assign a string to a variable, TypeScript will infer that the variable is of type string. However, if you want to explicitly specify the type of a variable, you can do so using a type annotation. 
// For example, you can declare a variable as follows:
let knowLanguages = ["JavaScript", "TypeScript", "Python"];
let amountOfLanguages = knowLanguages.length; 
/*console.log("The amount of languages I know is: ", amountOfLanguages);
console.log("The language type is: ", typeof knowLanguages[0]);
console.log("The languages I know are: ", knowLanguages[0], knowLanguages[1], knowLanguages[2]);*/
/*******ANY TYPE *******/
//Type any means that a variable can hold any type of value, 
// and TypeScript will not perform any type checking on it. This can be useful in certain situations where you need to work with dynamic data or when you are not sure what type of data you will be working with. However, using the any type can also lead to potential issues and bugs in your code, as it allows for more flexibility but also less safety. 
// Therefore, it's generally recommended to use more specific types whenever possible to take advantage of TypeScript's static type checking capabilities.
let dynamicValue: any = "This is a string";
/*console.log("The dynamic value is: ", dynamicValue);
dynamicValue = 42;
console.log("The dynamic value is: ", dynamicValue);
dynamicValue = true;
console.log("The dynamic value is: ", dynamicValue);*/

/*******ARRAY TYPE *******/
//array with different types of values
let diffValues=  ["JavaScript", true, 23];
//console.log("The array values are: ", diffValues[0], diffValues[1], diffValues[2]);
// array explicit type
let languages: string[] = ["JavaScript", "TypeScript", "Python"];
// array with inferred type
let numbers = [1, 2, 3, 4, 5];
// array readonly type
let readonlyNumbers: readonly number[] = [1, 2, 3, 4, 5];
//readonlyNumbers.push(6); // Error: Property 'push' does not exist on type 'readonly number[]'.

//UNION ARRAY TYPES
//Union types only allow the types defined, but the amount and order doesn't matter. 
let unionValues: (string | number)[] = ["JavaScript", 42, "TypeScript"];

/***TUPLE TYPES */
//Tuples only admit the same order and amount of values defined in the tuple type.
let tupleSample: [string, number, boolean];
tupleSample = ["JQuery", 55, false]; // This is allowed because the order and types of the elements match the defined tuple type.
console.log("The tuple sample values are: ", tupleSample[0], tupleSample[1], tupleSample[2]);
//ARRAY OF TUPLES
let tupleValues: [string, number, boolean][] = [["JavaScript", 42, true]];
tupleValues[0].push("TypeScript"); // This is allowed because push can add elements to the end of the tuple, but it will not change the defined types of the existing elements.
tupleValues[1] = ["TypeScript", 42, false]; // This is allowed because the order and types of the elements match the defined tuple type.
console.log("tuple values:", tupleValues);
console.log("The tuple values are: ", tupleValues[0], tupleValues[1]);
