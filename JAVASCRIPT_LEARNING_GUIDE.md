# JavaScript learning guide

Use this order. JavaScript is the runtime language underneath TypeScript, so understand what the engine actually executes.

## 1. Running JavaScript

Use Node.js for scripts and the browser console for browser APIs.

```bash
node path/to/file.js
node --check path/to/file.js
```

A JavaScript file runs from top to bottom, except when control flow, callbacks, promises, or events change when code executes.

## 2. Values and primitive types

JavaScript has seven primitive types: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, and `null`.

```js
const name = "Ana";
const score = 95;
const enabled = true;
const missing = undefined;
const empty = null;
const huge = 9007199254740993n;
```

Primitives are immutable values. Objects, arrays, and functions are reference values.

## 3. `let`, `const`, and variable scope

Prefer `const`; use `let` when a binding must be reassigned. Avoid `var` in modern code because its scope and hoisting rules are easier to misuse.

```js
const language = "JavaScript";
let attempts = 0;
attempts += 1;

if (true) {
  const blockOnly = "inside";
  console.log(blockOnly);
}
```

`const` prevents reassignment of the binding, not mutation of the object it references.

```js
const user = { name: "Ana" };
user.name = "Luis"; // allowed
// user = {}; // not allowed
```

## 4. Expressions, operators, and precedence

Expressions produce values. Learn arithmetic, comparison, logical, assignment, ternary, optional chaining, and nullish coalescing operators.

```js
const total = price * quantity;
const label = user?.name ?? "Unknown";
const message = enabled ? "Active" : "Inactive";
```

Use parentheses when precedence is not immediately obvious.

## 5. Equality and type coercion

Prefer strict equality (`===` and `!==`). Loose equality (`==`) performs coercion and can produce surprising results.

```js
0 === false; // false
"5" === 5; // false
"5" == 5; // true
```

Know common conversions such as `Number("42")`, `String(42)`, and `Boolean(value)`. Do not rely on implicit coercion for important logic.

## 6. Truthy, falsy, and nullish values

Falsy values include `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Arrays and objects are truthy, including empty ones.

```js
const title = input || "Untitled"; // replaces every falsy value
const count = input ?? 0; // replaces only null or undefined
```

Use `??` when `0`, `false`, or an empty string are valid values.

## 7. Numbers, `NaN`, and safe integers

JavaScript numbers use double-precision floating point.

```js
0.1 + 0.2 === 0.3; // false
Number.isNaN(Number("not a number")); // true
Number.isInteger(10); // true
Number.isSafeInteger(10); // true
```

Use `Number.EPSILON` for appropriate floating-point comparisons and `BigInt` for integers larger than `Number.MAX_SAFE_INTEGER`. Do not mix `number` and `bigint` in one arithmetic expression.

## 8. Strings and template literals

Strings are immutable. Template literals support interpolation and multiline text.

```js
const firstName = "Ana";
const greeting = `Hello, ${firstName}!`;

const normalized = greeting.trim().toLowerCase();
const parts = "red,green,blue".split(",");
```

Know `includes`, `startsWith`, `endsWith`, `slice`, `replace`, `replaceAll`, `split`, and `join`.

## 9. Functions and return values

Functions are first-class values: store them, pass them as arguments, and return them from other functions.

```js
function add(left, right) {
  return left + right;
}

const multiply = (left, right) => left * right;
const greet = (name = "friend") => `Hello, ${name}`;
```

Know declarations, expressions, arrow functions, default parameters, rest parameters, and callbacks.

## 10. `this` and arrow functions

The value of `this` depends on how a regular function is called. Arrow functions capture `this` from their surrounding scope and do not create their own `this`.

```js
const person = {
  name: "Ana",
  sayName() {
    return this.name;
  },
};

person.sayName(); // "Ana"
```

Do not detach a method and expect it to keep its receiver without binding it.

## 11. Arrays and common array methods

Arrays are ordered, zero-indexed, mutable objects.

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(number => number * 2);
const even = numbers.filter(number => number % 2 === 0);
const total = numbers.reduce((sum, number) => sum + number, 0);
const found = numbers.find(number => number > 2);
```

Know `push`, `pop`, `slice`, `splice`, `includes`, `find`, `some`, `every`, `map`, `filter`, `reduce`, and `sort`. `sort` mutates the array and compares values as strings unless given a comparator.

```js
const values = [10, 2, 5];
values.sort((left, right) => left - right);
```

## 12. Objects and property access

Use dot notation for known property names and bracket notation for dynamic names.

```js
const key = "email";
const account = { id: 1, email: "ana@example.com" };

account.email;
account[key];
account.role = "admin";
```

Know property existence, deletion, computed properties, and the difference between missing properties and properties whose value is `undefined`.

## 13. Destructuring and spread syntax

Destructuring extracts values. Spread creates shallow copies or expands iterable/object values.

```js
const { id, email } = account;
const [first, second] = ["a", "b"];

const updated = { ...account, active: true };
const combined = [...firstList, ...secondList];
```

These are shallow operations: nested objects and arrays still share references.

## 14. Object identity and copying

Objects are compared by reference, not by their contents.

```js
{} === {}; // false

const original = { settings: { theme: "dark" } };
const copy = { ...original };
copy.settings.theme = "light"; // also changes original.settings.theme
```

Use `structuredClone` for supported data when a deep copy is appropriate. Consider immutable updates instead of unexpected mutation.

## 15. `Map`, `Set`, and useful collections

Use `Set` for unique values and `Map` for key-value data when object keys or frequent lookups matter.

```js
const uniqueTags = new Set(["js", "web", "js"]);
const usersById = new Map([[1, { name: "Ana" }]]);

uniqueTags.has("js");
usersById.get(1);
```

Know `WeakMap` and `WeakSet` conceptually: they hold object references without preventing garbage collection.

## 16. Control flow and iteration

Know `if`, `switch`, loops, `for...of`, `for...in`, `break`, `continue`, and early returns.

```js
for (const value of [10, 20, 30]) {
  if (value === 20) continue;
  console.log(value);
}
```

Use `for...of` for iterable values such as arrays. Use `for...in` for enumerable property keys, generally with care around inherited properties.

## 17. Closures

A closure is a function plus access to variables from its lexical scope. Closures enable private state and function factories.

```js
function createCounter() {
  let value = 0;
  return () => {
    value += 1;
    return value;
  };
}

const next = createCounter();
next(); // 1
next(); // 2
```

Understand that closures keep referenced variables available after the outer function returns.

## 18. Hoisting and the temporal dead zone

Function declarations can be called before their declaration. `let` and `const` are hoisted but cannot be accessed before initialization; this period is the temporal dead zone.

```js
sayHello();
function sayHello() {
  console.log("Hello");
}

// console.log(value); // ReferenceError
const value = 10;
```

Initialize variables before use to keep control flow clear.

## 19. Prototypes and classes

Objects delegate property lookup through a prototype chain. Classes provide syntax for creating objects with shared methods.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `User: ${this.name}`;
  }
}

const user = new User("Ana");
user.describe();
```

Know inheritance with `extends` and `super`, but prefer composition when it keeps relationships simpler.

## 20. Errors and defensive handling

Throw `Error` objects and handle expected failures with `try...catch...finally`.

```js
function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Invalid JSON", { cause: error });
  }
}
```

Do not silently catch errors. Validate inputs at boundaries and preserve useful error context.

## 21. JSON and runtime data

JSON supports objects, arrays, strings, numbers, booleans, and `null`. It does not preserve functions, `undefined`, `Map`, `Set`, or class instances.

```js
const payload = JSON.stringify({ name: "Ana", active: true });
const data = JSON.parse(payload);
```

Parsed data is untrusted input. Check its shape before using it.

## 22. Promises and asynchronous functions

A promise represents a future result: pending, fulfilled, or rejected. `async` functions always return promises.

```js
async function loadUser() {
  const response = await fetch("/api/user");
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

loadUser()
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

Use `Promise.all` for independent operations and `Promise.allSettled` when every result matters even if some fail.

## 23. The event loop and execution order

Synchronous code runs first. Promise callbacks run in the microtask queue before timer callbacks in the task queue.

```js
console.log("first");
setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("last");

// first, last, promise, timer
```

Understand this ordering before debugging timing, loading, or UI behavior.

## 24. Modules

Use ES modules to create explicit file boundaries.

```js
// math.js
export function multiply(left, right) {
  return left * right;
}

// app.js
import { multiply } from "./math.js";
console.log(multiply(3, 4));
```

Know named exports, default exports, import paths, and the difference between ESM and CommonJS (`require` and `module.exports`).

## 25. Browser fundamentals

Know the DOM, events, forms, storage, and network APIs.

```js
const button = document.querySelector("button");

button?.addEventListener("click", event => {
  event.preventDefault();
  document.body.classList.toggle("ready");
});
```

Use `textContent` for plain text. Treat `innerHTML` as unsafe when it contains untrusted input. Understand event bubbling, delegation, and cleanup of listeners.

## 26. Testing, debugging, and strict habits

Use breakpoints, `console.log`, stack traces, and a test runner to verify behavior rather than relying only on inspection.

```js
console.assert(add(2, 3) === 5, "add should return 5");
```

Keep functions focused, avoid hidden mutation, name values clearly, and handle rejected promises. Learn to read error names such as `TypeError`, `ReferenceError`, and `SyntaxError`.

## Suggested practice path

1. Practice primitives, operators, coercion, functions, arrays, and objects.
2. Build exercises with destructuring, spread, closures, and array methods.
3. Add classes, modules, JSON parsing, and explicit error handling.
4. Build one asynchronous example with `fetch`, retries, and visible error states.
5. Build one browser example with DOM events and form validation.
6. Run the code with Node.js and inspect the order of synchronous, promise, and timer callbacks.
7. Before using TypeScript, make sure you can explain the JavaScript behavior your types will describe.
