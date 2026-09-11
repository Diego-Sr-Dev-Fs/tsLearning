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

Narrow a union before using a type-specific operation.

```ts
function format(value: string | number): string {
  if (typeof value === "number") return value.toFixed(2);
  return value.toUpperCase();
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

Know `typeof`, `instanceof`, `in`, equality checks, and custom predicates.

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

Learn parameter types, return types, optional parameters, default values, rest parameters, and callbacks.

```ts
type Operation = (left: number, right: number) => number;
const add: Operation = (left, right) => left + right;

function greet(name: string, title = "Developer"): string {
  return `${title} ${name}`;
}
```

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

Generics preserve the relationship between input and output types.

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = first([1, 2, 3]); // number | undefined
```

## 12. Generic constraints

A constraint says what a generic value must provide.

```ts
interface HasId { id: number }

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}
```

## 13. Classes and access modifiers

Know constructors, `public`, `private`, `protected`, `readonly`, and parameter properties.

```ts
class Counter {
  private value = 0;

  increment(): void {
    this.value += 1;
  }

  getValue(): number {
    return this.value;
  }
}
```

## 14. `unknown`, `any`, `never`, and `void`

- `unknown` is safe input: narrow it before using it.
- `any` disables checking; avoid it unless integrating with untyped code.
- `void` describes a function whose useful result is absent.
- `never` describes impossible values or functions that never return.

```ts
function parseInput(value: unknown): string {
  if (typeof value !== "string") throw new Error("Expected text");
  return value.trim();
}
```

## 15. `null`, `undefined`, and strict null checks

With `strictNullChecks`, possibly missing values must be handled explicitly.

```ts
function getName(names: string[], index: number): string {
  return names[index] ?? "Unknown";
}
```

Know optional chaining (`?.`) and nullish coalescing (`??`).

## 16. Type assertions and non-null assertions

Assertions tell the compiler what you know; they do not validate data at runtime.

```ts
const element = document.querySelector("input") as HTMLInputElement | null;
const value = element?.value ?? "";
```

Prefer narrowing and runtime validation over `as` and `!`.

## 17. Utility types

Utility types transform existing types.

```ts
interface User { id: number; name: string; email: string }
type UserDraft = Partial<User>;
type UserPreview = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;
type ReadonlyUser = Readonly<User>;
```

Learn `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, and `ReturnType`.

## 18. `keyof`, indexed access, and mapped types

```ts
type UserKey = keyof User; // "id" | "name" | "email"
type UserValue = User[UserKey]; // number | string

type Optional<T> = { [Key in keyof T]?: T[Key] };
```

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

Type the resolved value of promises and async functions.

```ts
async function loadUser(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "Ana" };
}
```

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
