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
//tsc