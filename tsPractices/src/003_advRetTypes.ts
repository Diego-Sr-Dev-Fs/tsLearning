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