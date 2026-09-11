export {};

/**
 * Runtime practice tests for TYPESCRIPT_LEARNING_GUIDE.md.
 * Run with: npx tsx tsPractices/src/005_typeScriptConcepts.test.ts
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
    const score: number = 95;
    return score;
}

assertEqual(getScore(), 95, "primitive number type");

// 2. Arrays and readonly arrays
function double(values: readonly number[]): number[] {
    return values.map(value => value * 2);
}

assertEqual(JSON.stringify(double([1, 2, 3])), "[2,4,6]", "array types");

// 3. Tuples
 type UserRecord = [id: number, name: string, enabled: boolean];

function userLabel(user: UserRecord): string {
    return `${user[0]}:${user[1]}:${user[2]}`;
}

assertEqual(userLabel([1, "Ana", true]), "1:Ana:true", "tuple positions");

// 4. Objects, interfaces, optional properties, and readonly properties
interface Account {
    readonly id: number;
    email: string;
    nickname?: string;
}

function accountLabel(account: Account): string {
    return account.nickname ? `${account.email} (${account.nickname})` : account.email;
}

assertEqual(accountLabel({ id: 1, email: "ana@example.com" }), "ana@example.com", "object properties");

// 5. Unions and literal types
 type Status = "loading" | "success" | "error";

function statusMessage(status: Status): string {
    return status === "success" ? "Ready" : status === "error" ? "Failed" : "Waiting";
}

assertEqual(statusMessage("success"), "Ready", "literal union");

// 6. Intersections
 type Person = { name: string };
 type Employee = Person & { employeeId: number };

function employeeLabel(employee: Employee): string {
    return `${employee.name} #${employee.employeeId}`;
}

assertEqual(employeeLabel({ name: "Luis", employeeId: 7 }), "Luis #7", "intersection type");

// 7. Narrowing with typeof and a custom type guard
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function formatValue(value: string | number): string {
    return isString(value) ? value.toUpperCase() : value.toFixed(2);
}

assertEqual(formatValue("typescript"), "TYPESCRIPT", "string narrowing");
assertEqual(formatValue(12), "12.00", "number narrowing");

// 8. Discriminated unions
 type Result =
    | { status: "success"; value: number }
    | { status: "error"; message: string };

function readResult(result: Result): string {
    return result.status === "success" ? `Value: ${result.value}` : `Error: ${result.message}`;
}

assertEqual(readResult({ status: "success", value: 42 }), "Value: 42", "success discriminant");
assertEqual(readResult({ status: "error", message: "No data" }), "Error: No data", "error discriminant");

// 9. Functions, optional parameters, defaults, callbacks, and rest parameters
 type Operation = (left: number, right: number) => number;

function calculate(operation: Operation, ...values: [number, number]): number {
    return operation(...values);
}

function greet(name: string, title = "Developer"): string {
    return `${title} ${name}`;
}

assertEqual(calculate((left, right) => left + right, 2, 3), 5, "callback function");
assertEqual(greet("Diego"), "Developer Diego", "default parameter");

// 10. Enums
 enum Direction {
    Up = "UP",
    Down = "DOWN",
}

function directionMessage(direction: Direction): string {
    return direction === Direction.Up ? "moving up" : "moving down";
}

assertEqual(directionMessage(Direction.Up), "moving up", "string enum");

// 11. Generics
function first<T>(items: T[]): T | undefined {
    return items[0];
}

assertEqual(first([10, 20]), 10, "generic function preserves number");
assertEqual(first<string>([]), undefined, "generic function handles empty arrays");

// 12. Generic constraints
interface HasId {
    id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}

const foundUser = findById([{ id: 1, name: "Ana" }], 1);
assertEqual(foundUser?.name, "Ana", "generic constraint");

// 13. Classes, private state, and methods
class Counter {
    private value = 0;

    increment(): void {
        this.value += 1;
    }

    getValue(): number {
        return this.value;
    }
}

const counter = new Counter();
counter.increment();
counter.increment();
assertEqual(counter.getValue(), 2, "class encapsulation");

// 14. unknown, any avoidance, void, and never
function parseInput(value: unknown): string {
    if (typeof value !== "string") {
        throw new Error("Expected text");
    }
    return value.trim();
}

function fail(message: string): never {
    throw new Error(message);
}

assertEqual(parseInput("  text  "), "text", "unknown narrowing");
let caughtError = false;
try {
    fail("expected failure");
} catch {
    caughtError = true;
}
assert(caughtError, "never function throws");

// 15. null, undefined, optional chaining, and nullish coalescing
function getName(names: string[], index: number): string {
    return names[index] ?? "Unknown";
}

assertEqual(getName([], 0), "Unknown", "undefined handling");
assertEqual(({ profile: { name: "Ana" } } as { profile?: { name: string } }).profile?.name, "Ana", "optional chaining");

// 16. Type assertions used at a boundary
function readLength(value: unknown): number {
    const text = value as string;
    return text.length;
}

assertEqual(readLength("hello"), 5, "type assertion");

// 17. Utility types
interface User {
    id: number;
    name: string;
    email: string;
}

type UserDraft = Partial<User>;
type UserPreview = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;

const draft: UserDraft = { name: "Ana" };
const preview: UserPreview = { id: 1, name: "Ana" };
const withoutEmail: UserWithoutEmail = { id: 1, name: "Ana" };
assert(draft.name === "Ana" && preview.id === 1 && withoutEmail.name === "Ana", "utility types");

// 18. keyof, indexed access, and mapped types
 type UserKey = keyof User;
 type UserValue = User[UserKey];
 type Optional<T> = { [Key in keyof T]?: T[Key] };

const key: UserKey = "email";
const value: UserValue = "ana@example.com";
const optionalUser: Optional<User> = { email: "ana@example.com" };
assert(key === "email" && value === optionalUser.email, "mapped and indexed types");

// 19. Modules are represented by this file's export and import-ready declarations.
function moduleBoundaryExample(): string {
    return "module";
}

assertEqual(moduleBoundaryExample(), "module", "module boundary example");

// 20. Async functions and Promise<T>
async function loadUser(): Promise<UserPreview> {
    return { id: 1, name: "Ana" };
}

// 21. Runtime data must still be validated
function isUser(value: unknown): value is User {
    if (typeof value !== "object" || value === null) return false;
    const candidate = value as Record<string, unknown>;
    return typeof candidate.id === "number"
        && typeof candidate.name === "string"
        && typeof candidate.email === "string";
}

assert(isUser({ id: 1, name: "Ana", email: "ana@example.com" }), "runtime validation accepts valid data");
assert(!isUser({ id: "1", name: "Ana", email: "ana@example.com" }), "runtime validation rejects invalid data");

// 22. Compiler settings are checked by compiling this strict TypeScript file.
async function runTests(): Promise<void> {
    const user = await loadUser();
    assertEqual(user.name, "Ana", "Promise resolved value");
    console.log("All TypeScript concept tests passed.");
}

void runTests();
