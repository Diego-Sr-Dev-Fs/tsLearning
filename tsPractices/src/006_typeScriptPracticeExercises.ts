export {};

/**
 * Practice file for TYPESCRIPT_LEARNING_GUIDE.md.
 *
 * Instructions:
 * 1. Solve every TODO.
 * 2. Run: npx tsx tsPractices/src/006_typeScriptPracticeExercises.ts
 * 3. If a test fails, fix the function until all assertions pass.
 */

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Test failed: ${message}`);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  assert(Object.is(actual, expected), `${message}. Expected ${String(expected)}, received ${String(actual)}`);
}

// 1. Primitive types and inference
function getScore(): number {
  // TODO: return the number 95
  return 95;
  throw new Error("TODO: solve exercise 1");
}

// 2. Arrays and readonly arrays
function doubleNumbers(values: readonly number[]): number[] {
  // TODO: multiply each value by 2
  return values.map((value) => value * 2);
  throw new Error("TODO: solve exercise 2");
}

// 3. Tuples
type UserRecord = [id: number, name: string, enabled: boolean];

function userLabel(user: UserRecord): string {
  // TODO: return a string like "1:Ana:true"
  return `${user[0]}:${user[1]}:${user[2]}`;
  throw new Error("TODO: solve exercise 3");
}

// 4. Objects and optional properties
interface Account {
  readonly id: number;
  email: string;
  nickname?: string;
}

function accountLabel(account: Account): string {
  //return `${account.email}${account.nickname}?(${account.nickname}):'' `;
  return `${account.email}${account.nickname?`(${account.nickname})`:''}`;
  //return `${account.email}${account.nickname ? ` (${account.nickname})` : ''}`;
  throw new Error("TODO: solve exercise 4");
}

//console.log(accountLabel({ id: 1, email: "john@example.com", nickname: "" }));
// 5. Union types and literal types
type Status = "loading" | "success" | "error";

function statusMessage(status: Status): string {
  // TODO: return "Waiting", "Ready" or "Failed" depending on the status
  switch (status){
    case "loading":
        return "Waiting";
    case "success":
        return "Ready";
    default:
        return "Failed";
  }
  throw new Error("TODO: solve exercise 5");
}
console.log(statusMessage("error"));

// 6. Intersection types
type Person = { name: string };
type Employee = { employeeId: number; department: string };

function employeeLabel(employee: Person & Employee): string {
  // TODO: return a string like "Luis #7"
  return employee.name+' #'+employee.employeeId;
  throw new Error("TODO: solve exercise 6");
}

// 7. Type guards and narrowing
function isString(value: unknown): value is string {
  // TODO: return true only if the value is a string
  return typeof value === "string";
  throw new Error("TODO: solve exercise 7");
}

function formatValue(value: string | number): string {
  // TODO: if it is a string, uppercase it; otherwise format the number with 2 decimals
  switch (typeof value) {
    case "string":
        return value.toUpperCase();
    default:
        return value.toFixed(2);            //add decimals to numbers and return as string
  }
  throw new Error("TODO: solve exercise 7b");
}

// 8. Discriminated unions
type Result =
  | { status: "success"; value: number }
  | { status: "error"; message: string };

function readResult(result: Result): string {
  // TODO: return "Value: 42" or "Error: No data"
  return result.status === "success" ? `Value: ${result.value}` : `Error: ${result.message}`;
  throw new Error("TODO: solve exercise 8");
}

// 9. Functions, defaults and callbacks
type Operation = (left: number, right: number) => number;

function calculate(operation: Operation, l: number, r: number): number {
  // TODO: call the operation with the two numbers
  return operation(l,r);
  throw new Error("TODO: solve exercise 9");
}

function greet(name: string, title = "Developer"): string {
  // TODO: return "Developer Diego" when title is not provided
  return title==""?`Developer Diego`:`${title} ${name}`;
  throw new Error("TODO: solve exercise 9b");
}

// 10. Enums
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

function directionMessage(direction: Direction): string {
  // TODO: return "moving up" for Up, otherwise "moving down"
  //return direction === Direction.Up?"moving up":"moving down";
  //console.log(`the direction is ${direction}`);
  return `moving ${direction.toLowerCase()}`;
  throw new Error("TODO: solve exercise 10");
}
//console.log(directionMessage(Direction.Right));
// 11. Generics
function first<T>(items: T[]): T | undefined |number {
  // TODO: return the first item or undefined if there are no items
  return items.length>0?items[0]:undefined;
  throw new Error("TODO: solve exercise 11");
}

// 12. Generic constraints
interface HasId {
  id: number;
}
/** 
  * MAP TYPES TO WORK WITH ARRAYS
  * What you actually need	Use this
  * Transform every item, keep them all	.map()
  * Find one item matching a condition	.find()
  * Check if any item matches (true/false)	.some()
  * Check if all items match	.every()
  * Get only the items matching a condition (could be many)	.filter()
  * Combine all items into one single value (sum, object, etc.)	.reduce() 
 **/
function findById<T extends HasId>(items: T[], id: number): T | undefined {
  //const response: T|undefined = items.find((item) => item.id === id);
  const response: T|undefined = items[0];
  return items.find((item) => item.id === id);
  //return items[0];
  throw new Error("TODO: solve exercise 12");
}
  // TODO: return the item whose id matches, otherwise undefined
  /*const response = items.map((item) => (
    item.id === id ? item :undefined
  ));
  //console.log(response[0]);
  return 2;
  throw new Error("TODO: solve exercise 12");
}*/

// 13. Classes and access modifiers
class Counter {
  private value = 0;

  increment(): void {
    // TODO: increase the internal value by 1
    this.value +=1;
    //throw new Error("TODO: solve exercise 13");
  }

  getValue(): number {
    // TODO: return the current value
    return this.value;
    throw new Error("TODO: solve exercise 13b");
  }
}

// 14. unknown, any, void, never
function parseInput(value: unknown): string {
  // TODO: if value is not a string, throw an error; otherwise trim it
  if (typeof value === "string") {
    return value.trim();
  }
  throw new Error("TODO: solve exercise 14");
}

function fail(message: string): never {
  // TODO: throw an error using the message
  throw new Error(message);
  //throw new Error("TODO: solve exercise 14b");
}

// 15. null, undefined and strict null checks
function getName(names: string[], index: number): string {
  // TODO: return the name at that index or "Unknown" if missing
  return (names[index] !== undefined) ? names[index] : "Unknown";
  throw new Error("TODO: solve exercise 15");
}

// 16. Utility types
interface User {
  id: number;
  name: string;
  email: string;
}

type UserDraft = Partial<User>;
type UserPreview = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;

function buildDraft(): UserDraft {
  // TODO: return an object with only name and maybe id
  return { name: "Draft User", id:2 };
  throw new Error("TODO: solve exercise 16");
}

// 17. keyof, indexed access, and mapped types
function getUserKey(): keyof User {
  // TODO: return the key "email"
  return "email";
  throw new Error("TODO: solve exercise 17");
}

// 18. Map collections
function buildScoreMap(entries: Array<[string, number]>): Map<string, number> {
  // TODO: create a Map and store each [key, value] pair
  throw new Error("TODO: solve exercise 18");
}

// 19. Async and Promise
async function loadUser(): Promise<{ id: number; name: string }> {
  // TODO: return an object with id and name
  throw new Error("TODO: solve exercise 19");
}

// ------------------------------------------------------------------------
// Test runner: solve each function and then run this file.
// ------------------------------------------------------------------------

async function runExercises(): Promise<void> {
  assertEqual(getScore(), 95, "exercise 1");
  assertEqual(JSON.stringify(doubleNumbers([1, 2, 3])), "[2,4,6]", "exercise 2");
  assertEqual(userLabel([1, "Ana", true]), "1:Ana:true", "exercise 3");
  assertEqual(accountLabel({ id: 1, email: "ana@example.com" }), "ana@example.com", "exercise 4");
  assertEqual(statusMessage("success"), "Ready", "exercise 5");
  assertEqual(employeeLabel({ name: "Luis", employeeId: 7, department: "IT" }), "Luis #7", "exercise 6");
  assertEqual(formatValue("typescript"), "TYPESCRIPT", "exercise 7");
  assertEqual(formatValue(12), "12.00", "exercise 7b");
  assertEqual(readResult({ status: "success", value: 42 }), "Value: 42", "exercise 8");
  assertEqual(calculate((left, right) => left + right, 2, 3), 5, "exercise 9");
  assertEqual(greet("Diego"), "Developer Diego", "exercise 9b");
  assertEqual(directionMessage(Direction.Up), "moving up", "exercise 10");
  assertEqual(first([10, 20]), 10, "exercise 11");
  assertEqual(findById([{ id: 1, name: "Ana" }, { id: 2, name: "Luis" }], 2)?.name, "Luis", "exercise 12");

  const counter = new Counter();
  //console.log("the first value is:"+counter.getValue());
  counter.increment();
  counter.increment();
  //console.log("the value is:"+counter.getValue());
  assertEqual(counter.getValue(), 2, "exercise 13");

  assertEqual(parseInput("  text  "), "text", "exercise 14");
  let caughtError = false;
  try {
    fail("expected failure");
  } catch {
    caughtError = true;
  }
  assert(caughtError, "exercise 14b");

  assertEqual(getName([], 0), "Unknown", "exercise 15");
  assertEqual(buildDraft().email, undefined, "exercise 16");
  assertEqual(getUserKey(), "email", "exercise 17");

  const scoreMap = buildScoreMap([["Math", 95], ["TS", 100]]);
  assertEqual(scoreMap.get("TS"), 100, "exercise 18");

  const user = await loadUser();
  assertEqual(user.name, "Ana", "exercise 19");

  console.log("All practice exercises passed.");
}

void runExercises();
