//Function could define explicitly the return type of the function
//also has an specifict syntax
function lettersToNumbers(letters: string): number {
  const letterMap: { [key: string]: number } = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5};
    let total = 0;
    for (const letter of letters) { 
      if (letterMap[letter]) {
        total += letterMap[letter];
      }
    }
    return total;
  }
console.log("The total of letters is: ", lettersToNumbers("ABCDE"));

// VOID RETURN TYPE
// The 'void' type is used for functions that do not return a value.
// Their purpose is to perform an action (a "side effect"), like logging to the console.
function logMessage(message: string): void {
  console.log(message);
}
logMessage("This function doesn't return anything.");

// JAVASCRIPT MAP OBJECT
// While the `letterMap` above uses a plain object as a map (a very common pattern),
// TypeScript also supports the built-in `Map` object, which offers some advantages.
// - Keys can be any type (not just strings/numbers/symbols).
// - It has a `size` property and methods like `get()`, `set()`, `has()`, `delete()`.
// - It's optimized for frequent additions and removals.

function lettersToNumbersWithMap(letters: string): number {
  const letterMap = new Map<string, number>([
    ["A", 1],
    ["B", 2],
    ["C", 3],
    ["D", 4],
    ["E", 5]
  ]);

  let total = 0;
  for (const letter of letters) {
    // Use .get() to retrieve a value. It returns `undefined` if the key doesn't exist.
    total += letterMap.get(letter) || 0;
  }
  return total;
}
console.log("The total of letters (using Map object) is: ", lettersToNumbersWithMap("ACE"));

// GENERIC RETURN TYPE
// Generics allow you to create reusable components that work with a variety of types rather than a single one.
// In this example, we define a generic function that takes an array of any type and returns the first element of that array.
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 1. GENERIC WITH WRAPPER OBJECT
// A function that wraps any value into an object with a timestamp.
interface WrappedValue<T> {
  value: T;
  timestamp: Date;
}

function wrapValue<T>(input: T): WrappedValue<T> {
  return {
    value: input,
    timestamp: new Date()
  };
}

const wrappedStr = wrapValue("Hello"); // Type is WrappedValue<string>
const wrappedNum = wrapValue(100);     // Type is WrappedValue<number>
console.log("Wrapped String:", wrappedStr);

// 2. GENERIC WITH CONSTRAINTS (extends)
// A function that only works on objects that have an 'id' property.
interface Identifiable {
  id: string | number;
}

function findById<T extends Identifiable>(items: T[], id: string | number): T | undefined {
  return items.find(item => item.id === id);
}

const users = [{ id: 1, name: "Diego" }, { id: 2, name: "Ana" }];
const foundUser = findById(users, 1);
console.log("Found User:", foundUser);

// 3. GENERIC CLASS
// A simple data storage class that can hold any type of data.
class DataHolder<T> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  getAll(): T[] {
    return this.data;
  }
}

const stringHolder = new DataHolder<string>();
stringHolder.addItem("TypeScript");
stringHolder.addItem("Generics");
console.log("String Holder Data:", stringHolder.getAll());

// 4. MULTIPLE GENERIC PARAMETERS
// Merging two different objects into one.
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Diego" }, { age: 30 });
console.log("Merged Object:", merged.name, merged.age);