export {};
//Simple types samples
let age: number = 30
let name: string = "Diego"
let isWorking:boolean = false;
const uniqueKey: symbol = Symbol('description');
const obj = {
  ["uniqueKey"]: 'This is a unique property'
};
console.log("the unique key is: ", uniqueKey.toString());
console.log("the unique property is: ", obj["uniqueKey"]);
//Explicit types and inference
let charge: string = "Developer Sr";
let yearsOfExperience: number = 10;
//Type inference means TS guesses the type of a variable based on its value. For example, if you assign a string to a variable, TypeScript will infer that the variable is of type string. However, if you want to explicitly specify the type of a variable, you can do so using a type annotation. 
// For example, you can declare a variable as follows:
let knowLanguages = ["JavaScript", "TypeScript", "Python"];
let amountOfLanguages = knowLanguages.length; 
console.log("The amount of languages I know is: ", amountOfLanguages);
console.log("The language type is: ", typeof knowLanguages[0]);
console.log("The languages I know are: ", knowLanguages[0], knowLanguages[1], knowLanguages[2]);
//Type any means that a variable can hold any type of value, 
// and TypeScript will not perform any type checking on it. This can be useful in certain situations where you need to work with dynamic data or when you are not sure what type of data you will be working with. However, using the any type can also lead to potential issues and bugs in your code, as it allows for more flexibility but also less safety. 
// Therefore, it's generally recommended to use more specific types whenever possible to take advantage of TypeScript's static type checking capabilities.
let dynamicValue: any = "This is a string";
console.log("The dynamic value is: ", dynamicValue);
dynamicValue = 42;
console.log("The dynamic value is: ", dynamicValue);
dynamicValue = true;
console.log("The dynamic value is: ", dynamicValue);