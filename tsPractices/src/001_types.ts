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

//tsc