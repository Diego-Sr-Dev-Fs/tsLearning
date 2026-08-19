export {};

/**
 * TypeScript exercise test
 *
 * Instructions:
 * 1. Solve each exercise without using `any`.
 * 2. Replace each TODO error with your implementation.
 * 3. Uncomment the examples at the bottom as you finish each exercise.
 */

// 1. Arrays and unions
// Return a new array containing only the numbers from the mixed input.
type MixedValue = string | number;

function getNumbers(values: MixedValue[]): number[] {
  throw new Error("TODO: solve exercise 1");
}

// 2. Tuple types
// A score contains: player name, points, and whether the player won.
type Score = [string, number, boolean];

function formatScore(score: Score): string {
  throw new Error("TODO: solve exercise 2");
}

// 3. Optional object properties
// Create a short profile description. Include the nickname only when it exists.
interface Profile {
  name: string;
  age: number;
  nickname?: string;
}

function describeProfile(profile: Profile): string {
  throw new Error("TODO: solve exercise 3");
}

// 4. Enums
// Use this enum to describe the direction in which a character should move.
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

function moveCharacter(direction: Direction): string {
  throw new Error("TODO: solve exercise 4");
}

// 5. Union types and type narrowing
// Return a readable message for either a successful or failed operation.
type OperationResult =
  | { status: "success"; value: number }
  | { status: "error"; message: string };

function describeResult(result: OperationResult): string {
  throw new Error("TODO: solve exercise 5");
}

// 6. Intersection types
// Combine the two types and return a label using all available information.
type Person = { name: string };
type Employee = { employeeId: number; department: string };

function employeeLabel(employee: Person & Employee): string {
  throw new Error("TODO: solve exercise 6");
}

// 7. Map and explicit return type
// Count how many times each word appears. Treat uppercase and lowercase as equal.
function countWords(words: string[]): Map<string, number> {
  throw new Error("TODO: solve exercise 7");
}

// 8. Destructuring
// Calculate the total price and return a sentence describing the product.
type Product = [name: string, price: number, quantity: number];

function productSummary([name, price, quantity]: Product): string {
  throw new Error("TODO: solve exercise 8");
}

// 9. Generic function with a constraint
// Find the first item whose id matches the requested id.
interface HasId {
  id: number;
}

function findItemById<T extends HasId>(items: T[], id: number): T | undefined {
  throw new Error("TODO: solve exercise 9");
}

// 10. Generic class
// Store values and provide methods to add one value and read the first value.
class Box<T> {
  private value: T | undefined;

  add(value: T): void {
    throw new Error("TODO: solve exercise 10");
  }

  get(): T | undefined {
    throw new Error("TODO: solve exercise 10");
  }
}

/*
 * Uncomment these checks after solving each exercise.
 * Add your own edge cases too.
 *
 * console.log(getNumbers(["one", 2, "three", 4]));
 * console.log(formatScore(["Diego", 95, true]));
 * console.log(describeProfile({ name: "Ana", age: 25 }));
 * console.log(moveCharacter(Direction.Left));
 * console.log(describeResult({ status: "success", value: 42 }));
 * console.log(employeeLabel({ name: "Luis", employeeId: 7, department: "IT" }));
 * console.log(countWords(["TS", "js", "ts", "JS", "ts"]));
 * console.log(productSummary(["Keyboard", 40, 2]));
 * console.log(findItemById([{ id: 1, name: "A" }], 1));
 * const numberBox = new Box<number>();
 * numberBox.add(10);
 * console.log(numberBox.get());
 */
