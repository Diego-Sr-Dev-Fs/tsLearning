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