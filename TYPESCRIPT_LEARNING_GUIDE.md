# TypeScript learning guide

Use this order. For every topic, understand both what the compiler checks and what JavaScript does at runtime.

## 1. TypeScript workflow

TypeScript adds static types and compiles to JavaScript. Types are removed from the output.

```ts
const username: string = "Diego";
const score: number = 95;
const active: boolean = true;
```

Learn the compiler commands:

```bash
tsc -p tsconfig.json
npx tsx path/to/file.ts
```

## 2. Primitive types, inference, and literals

TypeScript can infer obvious types. Use annotations when they clarify a public contract.

```ts
let age = 30; // inferred as number
const role = "admin" as const; // literal type: "admin"
let id: string | number = 10;
```

Know `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`, and `void`.

## 3. Arrays and readonly arrays

```ts
const names: string[] = ["Ana", "Luis"];
const scores: Array<number> = [10, 20];
const fixedScores: readonly number[] = [10, 20];
```

`readonly` prevents mutation through that variable.

## 4. Tuples

A tuple has a fixed order and known types at each position.

```ts
type UserRecord = [id: number, name: string, enabled: boolean];
const user: UserRecord = [1, "Ana", true];
```

## 5. Objects, type aliases, and interfaces

```ts
type Product = { name: string; price: number };

interface Account {
  id: number;
  email: string;
  nickname?: string;
}
```

Use `?` for optional properties and `readonly` for properties that should not be reassigned.

## 6. Unions, intersections, and literal types

A union means one of several possibilities. An intersection combines requirements.

```ts
type Status = "loading" | "success" | "error";
type Person = { name: string };
type Employee = Person & { employeeId: number };
```

## 7. Narrowing and type guards

A type guard is a function or check that tells TypeScript, "if this returns true, then the value has this type." Narrow the union before using a type-specific operation.

```ts
function format(value: string | number): string {
  // typeof narrows the value from string | number to number
  if (typeof value === "number") return value.toFixed(2);

  // Here TypeScript knows value is a string, so this is safe
  return value.toUpperCase();
}

// A custom type guard: if the function returns true, the value is a string.
function isString(value: unknown): value is string {
  // Runtime check: we verify the actual JavaScript value before trusting it.
  return typeof value === "string";
}

const maybeValue: unknown = "hello";

if (isString(maybeValue)) {
  // Inside this block, TypeScript narrows maybeValue to string.
  console.log(maybeValue.toUpperCase());
}
```

Know `typeof`, `instanceof`, `in`, equality checks, and custom predicates. Type guards are useful when a value starts as `unknown`, `string | number`, or another union and must be checked before using type-specific methods.

## 8. Discriminated unions

A shared literal property makes related object variants easy to narrow.

```ts
type Result =
  | { status: "success"; value: number }
  | { status: "error"; message: string };

function readResult(result: Result): string {
  return result.status === "success" ? String(result.value) : result.message;
}
```

## 9. Functions

Learn parameter types, return types, optional parameters, default values, rest parameters, and callbacks. A function type describes a callable contract: what arguments it accepts and what it returns.

```ts
// This is a function type. It says: a function that takes two numbers and returns one number.
type Operation = (left: number, right: number) => number;
const add: Operation = (left, right) => left + right;

// name is required, title is optional because it has a default value.
function greet(name: string, title = "Developer"): string {
  return `${title} ${name}`;
}

// A callback is a function passed to another function to be called later.
// The function that receives the callback is usually called a higher-order function.
// It decides when to call it, while the caller decides what to do when it runs.
function processUser(name: string, onReady: (message: string) => void): void {
  const message = `User ${name} is ready`;

  // We finish the work first, then call the callback with the result.
  onReady(message);
}

// This callback runs after the processUser logic finishes.
processUser("Ana", message => {
  console.log(message);
});
```

`(left: number, right: number) => number` is the shape of the function. The `title = "Developer"` parameter means: if no second argument is passed, use "Developer" instead. In the callback example, `onReady` is the function that will be called later, and it receives the computed message.

A callback is a common pattern when one function does some work and then lets an external function respond. The key idea is inversion of control: the outer function decides when the callback is invoked, but the callback itself defines what should happen when that event or result arrives. This is useful for event handlers, async code, iteration helpers, and custom logic flows.

For example, `processUser` does the work of preparing the message and then calls `onReady(message)`. The caller chooses what to do with that message: log it, update the UI, trigger another action, or ignore it. Callbacks are especially important in asynchronous code because the function that starts the work may finish long before the result is ready, so the callback is used as a notification point.

You will also see callbacks in functions like `setTimeout`, DOM event listeners, and array methods such as `map`, `filter`, and `forEach`. In each case, the callback provides the behavior that should run at a later point in time or after a condition is met.

## 10. Enums

Enums create named constants. String enums are clearer when values cross an API boundary.

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
}
const direction: Direction = Direction.Up;
```

Also understand when a union of string literals is simpler than an enum.

## 11. Generics

Generics let a function or type work with many data types while preserving the relationship between them. In simple terms: "I don't know the exact type yet, but I will keep it consistent across the function." 

```ts
// <T> means: "this function is generic over a type called T".
// T is a type placeholder, not a runtime value.
// TypeScript decides what T is based on the arguments you pass.
function first<T>(items: T[]): T | undefined {
  // If items is number[], then T is number.
  // If items is string[], then T is string.
  // The function returns the same item type, or undefined if the array is empty.
  return items[0];
}

const firstNumber = first([1, 2, 3]); // T is number, so result is number | undefined
const firstWord = first(["a", "b", "c"]); // T is string, so result is string | undefined
```

`T` is a placeholder type. If the input is `number[]`, the output is `number | undefined`; if the input is `string[]`, the output is `string | undefined`.

Not every generic function has to return the exact same type as the parameter. The return type can be the same type, a union with `undefined`, or even a completely different type. The point of generics is to keep the relationship consistent when needed, not to force every function to return the same shape. For example, `function makePair<T, U>(left: T, right: U): [T, U]` returns a tuple with both types, and `function count<T>(items: T[]): number` returns a `number` even though the input items can be anything.

## 12. Generic constraints

A constraint says: this generic type must have some required property or behavior. It prevents invalid types from being used.

```ts
interface HasId { id: number }

// The `extends` is inside the generic parameter list because we are not creating
// a class that inherits from HasId. We are saying: "T is a type parameter that
// must satisfy the contract of HasId".
// This is different from regular inheritance like `class User extends Person`.
// In generics, `extends` is a constraint on the allowed type arguments.
function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}
```

`T extends HasId` means: the generic type `T` must at least have an `id: number` property. That makes `item.id` safe inside the function. Without the constraint, TypeScript could not assume every item has an `id`.

The important difference is that `extends` here is not saying "T is a subclass of HasId" in the JavaScript class sense. It means "T must be compatible with the shape of `HasId`". This lets TypeScript accept any object type that has the required `id` property, without forcing you to literally inherit from an interface or class.

A clearer example is a function that works only with objects that have an `id` and a `name`:

```ts
interface UserLike {
  id: number;
  name: string;
}

function printUser<T extends UserLike>(user: T): void {
  console.log(user.id, user.name);
}

const user1 = { id: 1, name: "Ana", role: "admin" };
const user2 = { id: 2, name: "Luis" };

printUser(user1); // OK: has id and name
printUser(user2); // OK: has id and name

// printUser({ name: "No id" }); // Error: missing id
```

This makes the constraint very concrete: TypeScript guarantees that inside `printUser`, the value always has at least the properties required by `UserLike`. The generic constraint is a way to say, "I only accept types that satisfy this contract."

## 13. Classes and access modifiers

Know constructors, `public`, `private`, `protected`, `readonly`, and parameter properties.

```ts
class Counter {
  public count = 0; // public is the default; accessible from anywhere

  private value = 0; // private: only inside this class

  protected total = 0; // protected: available in this class and subclasses

  readonly id: string; // readonly: can be assigned only once

  constructor(id: string, public name: string) {
    this.id = id; // parameter property: public name is created from the constructor parameter
  }

  increment(): void {
    this.value += 1;
    this.total += 1;
    this.count += 1;
  }

  getValue(): number {
    return this.value;
  }
}

class BetterCounter extends Counter {
  showTotals(): void {
    console.log(this.total); // OK: protected is accessible in subclasses
    // console.log(this.value); // Error: private is not accessible here
  }
}
```

`public` is the default visibility and means the member can be accessed anywhere. `private` restricts access to the class itself. `protected` allows access in the class and in subclasses. `readonly` prevents reassignment after initialization. Constructor parameter properties such as `public name: string` shorten the common pattern of declaring a field and assigning it from the constructor.

## 14. `unknown`, `any`, `never`, and `void`

- `unknown` is safe input: narrow it before using it.
- `any` disables checking; avoid it unless integrating with untyped code.
- `void` describes a function whose useful result is absent.
- `never` describes impossible values or functions that never return.

```ts
// unknown: we do not know the type yet, so we must check before using it.
function parseInput(value: unknown): string {
  if (typeof value !== "string") throw new Error("Expected text");
  return value.trim();
}

// any: no type safety, so TS does not help us.
let data: any = "hello";
data.toUpperCase(); // OK

data = 42;
data.toFixed(); // Also OK at compile time, even though it is not a string.

// void: a function that performs work but does not return a meaningful value.
function logMessage(message: string): void {
  console.log(message);
}

// never: impossible value, or a function that always throws or loops forever.
function fail(message: string): never {
  throw new Error(message);
}

// never is also useful in exhaustive checks.
function handleStatus(status: "success" | "error") {
  if (status === "success") {
    console.log("OK");
    return;
  }

  return fail("Unexpected status");
}
```

`unknown` is the safe choice when a value comes from outside the code and you need to validate it before using it. `any` turns off checking completely, which is convenient in legacy code but risky for correctness and maintainability. `void` means “this function returns nothing useful,” while `never` means “this code path should never happen” or “this function cannot finish normally.”

## 15. `null`, `undefined`, and strict null checks

`strictNullChecks` makes `null` and `undefined` distinct types instead of allowing them wherever a value is expected. When it is enabled, a value typed as `string` must be a string; it cannot also be `null` or `undefined`. If a value can be missing, include that possibility in its type and handle it before using it.

```ts
function greet(name: string | null): string {
  if (name === null) {
    return "Hello, guest";
  }

  // After the check, TypeScript knows name is a string.
  return `Hello, ${name.toUpperCase()}`;
}

greet("Ana");
greet(null);
```

Without `strictNullChecks`, TypeScript permits code such as assigning `null` to a `string`, which can lead to runtime errors when string methods are called. With it enabled, the following assignment is a compile-time error:

```ts
let displayName: string;
// Error with strictNullChecks: null is not assignable to string.
displayName = null;
```

If `undefined` is a valid possibility too, include it in the union and handle it. Optional properties also have this behavior: reading an optional property can produce `undefined`.

```ts
interface User {
  name?: string;
}

function getDisplayName(user: User): string {
  return user.name ?? "Guest";
}

const maybeName: string | undefined = undefined;
const name = maybeName ?? "Unknown";
```

`?.` means “if the value before this operator is not `null` or `undefined`, continue accessing the property; otherwise return `undefined`.” `??` uses a fallback only for `null` or `undefined`. This is safer than `||` when empty strings or `0` are valid values, because `||` treats those as falsey too.

Think of `strict` as a master switch for TypeScript's stricter checks. Setting it to `true` also turns on `strictNullChecks`, so the compiler will require you to handle `null` and `undefined` as shown above. For example, this is enough in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

You do not need to add `"strictNullChecks": true` as well, because `"strict": true` already enables it. This project currently has both settings; the explicit `strictNullChecks` line repeats what `strict` already turns on.

One related detail: strict null checking alone does not make TypeScript treat every array lookup as possibly `undefined`. For that additional protection, enable `noUncheckedIndexedAccess` and still handle a missing element, for example with `names[index] ?? "Unknown"`.

## 16. Type assertions and non-null assertions

Assertions tell the compiler what you know; they do not validate data at runtime.

```ts
const element = document.querySelector("input") as HTMLInputElement | null;
const value = element?.value ?? "";
```

Prefer narrowing and runtime validation over `as` and `!`.

## 17. Utility types

Utility types transform existing types without rewriting the original object definition. They are shortcuts for common type transformations.

```ts
interface User { id: number; name: string; email: string }

type UserDraft = Partial<User>; // all properties become optional

type UserPreview = Pick<User, "id" | "name">; // keep only selected properties

type UserWithoutEmail = Omit<User, "email">; // remove one property

type ReadonlyUser = Readonly<User>; // all properties become readonly
```

A `Partial<User>` means every field may be missing. `Pick<User, "id" | "name">` keeps only those two fields. `Omit<User, "email">` removes one field. `Readonly<User>` prevents reassignment of object properties. Learn `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, and `ReturnType`.

## 18. `keyof`, indexed access, and mapped types

`keyof` extracts the property names of a type. Indexed access gets the value type for those keys. Mapped types transform every property of an existing type.

```ts
type UserKey = keyof User; // "id" | "name" | "email"
type UserValue = User[UserKey]; // number | string: both name and email are strings

type Optional<T> = { [Key in keyof T]?: T[Key] };
type OptionalUser = Optional<User>;
// Equivalent to: { id?: number; name?: string; email?: string }
```

`keyof User` means all valid property names of `User`: `"id" | "name" | "email"`. `User[UserKey]` asks for the type of a property at any of those keys, so it produces `number | string`: `id` is a number, while `name` and `email` are strings. TypeScript combines duplicate union members, so `number | string | string` simplifies to `number | string`.

In `Optional<T>`, `Key in keyof T` loops over every property key in `T` to create a corresponding property in a new type. `T[Key]` keeps that property's original value type, and `?` makes the property optional. For example, `Optional<User>` allows `{}`, `{ name: "Ana" }`, or `{ id: 1, name: "Ana", email: "ana@example.com" }`, while still requiring any provided `id` to be a number and any provided `name` or `email` to be a string.

## 19. Modules

Use `export` and `import` to define boundaries between files.

```ts
// math.ts
export function multiply(a: number, b: number): number {
  return a * b;
}

// app.ts
import { multiply } from "./math";
```

## 20. Async code and promises

An `async` function always returns a `Promise`. Use `await` inside another `async` function to wait for that promise and work with its resolved value. This example simulates a network response with a short delay:

```ts
type User = { id: number; name: string };

function simulateApiResponse(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: "Ana" }), 500);
  });
}

async function loadUser(): Promise<User> {
  const response = await simulateApiResponse();
  return response;
}

async function main(): Promise<void> {
  const user = await loadUser();
  console.log(`Loaded user: ${user.name} (id: ${user.id})`);
}

void main();
```

`simulateApiResponse()` returns a `Promise<User>`. `loadUser()` awaits that promise and returns the resolved user, and `main()` awaits `loadUser()` before using the result. Calling `void main()` starts the example without blocking the rest of the program.

## 21. Declaration files and external data

Learn how `.d.ts` files describe JavaScript libraries and why JSON/API data still needs runtime validation. TypeScript checks your assumptions, but it does not validate data received over the network.

## 22. Compiler configuration

Understand `strict`, `strictNullChecks`, `target`, `module`, `moduleResolution`, `rootDir`, `outDir`, and source maps. Keep strict checking enabled while learning.

## Suggested practice path

1. Finish the primitive, array, tuple, object, union, and function exercises.
2. Add narrowing and discriminated-union exercises.
3. Practice generics, constraints, utility types, and classes.
4. Split code into modules and add async examples.
5. Run `tsc -p tsconfig.json` after every meaningful change.
6. Read the generated JavaScript to understand what types disappear at runtime.

The companion file `tsPractices/src/005_typeScriptConcepts.test.ts` contains one executable test for each major concept above.
