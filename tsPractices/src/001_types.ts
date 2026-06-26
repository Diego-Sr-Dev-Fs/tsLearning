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
//Type inference
let knowLanguages = ["JavaScript", "TypeScript", "Python"];
let amountOfLanguages = knowLanguages.length; 
console.log("The amount of languages I know is: ", amountOfLanguages);
console.log("The languages I know are: ", knowLanguages[0], knowLanguages[1], knowLanguages[2]);
//tsc