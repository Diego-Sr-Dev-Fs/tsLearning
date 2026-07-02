/********OBJECT TYPES ********/
//Basic type
const pokemon: { name: string; type: string; level: number } = {
  name: "Pikachu",
  type: "Electric",
  level: 25,
};
console.log("The pokemon is: ", pokemon.name, pokemon.type, pokemon.level);
//Object type with optional properties
const trainer: { name: string; age: number; team?: string } = {
  name: "Ash",
  age: 10,
};
trainer.team = "Pallet Town";
console.log("The trainer is: ", trainer.name, trainer.age, trainer.team);
/********ENUMS ********/
//Allow to define numeric or string values
//Prevent the raw strings or numbers to be used in the code, making it more readable and maintainable.
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
console.log("The direction is: ", Direction.Up, Direction.Down, Direction.Left, Direction.Right);
//Increment values in base of the first value, if the first value is not defined, the default value is 0.
//Also allows fully initialized enums, that not will be initialized.
enum NumericDirection {
  Up = 5,
  Down,
  Left,
  Right,
}
console.log("The numeric direction is: ", NumericDirection.Up, NumericDirection.Down, NumericDirection.Left, NumericDirection.Right);
/*** TYPE ALIASES AND INTERFACES ***/
/*** ALIASES ***/
//Allow to customize types like String, Number or more complex types with other names
type PokemonType = string;
type TrainerName = string;
type TrainerAge = number;
/*** INTERFACES ***/
interface IPokemon {
  name: string;
  type: PokemonType;
  level: number;
}
interface ITrainer {
  name: TrainerName;
  age: TrainerAge;
  team?: string;
}
//TYPE ALIASES UNION AND INTERSECTION
//Intersection types allow to combine multiple types into one

//Union types allow to define a type that can be one of several types. 
type Status = "success" | "error";
type Responsable = { status: Status; message: string };
const useResponsable: Responsable = { status: "success", message: "The operation was successful" };
let response: Status = "error"; // This will cause a TypeScript error because "mistake" is not assignable to type 'Status'
console.log("The response is: ", useResponsable);

/*** INTERFACES ***/
//Allow to define the structure of an object,
//and can be extended or implemented by other interfaces or classes.

interface pokeTrainer {
  region : string;
  name: string;
  age: number;
  initialPoke: string
}

const trainer1: pokeTrainer = {
  region: "Kanto",
  name: "Ash",
  age: 10,
  initialPoke: "Pikachu"
}
console.log("The trainer is: ", trainer1.region, trainer1.name, trainer1.age, trainer1.initialPoke);