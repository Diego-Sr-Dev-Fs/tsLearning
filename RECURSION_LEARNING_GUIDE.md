# Recursion learning guide

Recursion is a technique where a function solves a problem by calling itself with a smaller or simpler input. A correct recursive solution must move toward a stopping condition.

## 1. The recursive mental model

Every recursive function has three important parts:

1. **Base case:** the smallest input with a direct answer.
2. **Recursive case:** a call to the same function with a smaller or simpler input.
3. **Progress:** each call must move closer to the base case.

```js
function countDown(number) {
  if (number === 0) return; // base case

  console.log(number);
  countDown(number - 1); // progress toward zero
}

countDown(3);
// 3
// 2
// 1
```

If there is no reachable base case, the function eventually throws `RangeError: Maximum call stack size exceeded`.

## 2. How the call stack works

Each function call creates a stack frame containing its parameters, local variables, and return location. A recursive call adds another frame. Frames return in reverse order after the deepest call reaches its base case.

```js
function trace(number) {
  console.log("enter", number);

  if (number > 0) trace(number - 1);

  console.log("leave", number);
}

trace(2);
// enter 2
// enter 1
// enter 0
// leave 0
// leave 1
// leave 2
```

This explains why recursive code can perform one action while going deeper and another while unwinding.

## 3. A first recursive function: sum from one to n

Define the problem in terms of a smaller version of itself:

$$
\operatorname{sum}(n) = n + \operatorname{sum}(n - 1)
$$

The base case is `sum(0) = 0`.

```js
function sumTo(number) {
  if (number <= 0) return 0;
  return number + sumTo(number - 1);
}

sumTo(4); // 10
```

The calls expand as `4 + sumTo(3)`, then `3 + sumTo(2)`, until `sumTo(0)` returns `0`.

## 4. Choosing and checking a base case

Before writing the recursive call, identify the smallest valid input and decide what it returns.

```js
function factorial(number) {
  if (number < 0 || !Number.isInteger(number)) {
    throw new Error("factorial expects a non-negative integer");
  }

  if (number === 0) return 1;
  return number * factorial(number - 1);
}

factorial(5); // 120
```

For factorial:

$$
0! = 1, \qquad n! = n \times (n - 1)!\text{ for }n > 0
$$

Always test the base input directly, then test one value above it.

## 5. Recursing over an array

A common pattern is to process the first item and recurse over the rest.

```js
function sumArray(numbers, index = 0) {
  if (index === numbers.length) return 0;
  return numbers[index] + sumArray(numbers, index + 1);
}

sumArray([2, 4, 6]); // 12
```

The `index` is the changing state. It must move from `0` toward `numbers.length`.

## 6. Recursing with an accumulator

An accumulator carries the result built so far. It can make the state explicit.

```js
function sumArrayWithAccumulator(numbers, index = 0, total = 0) {
  if (index === numbers.length) return total;
  return sumArrayWithAccumulator(
    numbers,
    index + 1,
    total + numbers[index],
  );
}

sumArrayWithAccumulator([2, 4, 6]); // 12
```

An accumulator is useful when the recursive operation naturally updates a running result.

## 7. Recursive string processing

Strings can be processed one character at a time.

```js
function reverseString(text) {
  if (text.length <= 1) return text;
  return reverseString(text.slice(1)) + text[0];
}

reverseString("code"); // "edoc"
```

This is easy to understand, but repeated `slice` and concatenation can allocate many strings. For large input, an iterative solution or an array of characters may be more efficient.

## 8. Palindrome checking

A palindrome reads the same from both directions. Compare the outer characters, then recurse inward.

```js
function isPalindrome(text, left = 0, right = text.length - 1) {
  if (left >= right) return true;
  if (text[left] !== text[right]) return false;
  return isPalindrome(text, left + 1, right - 1);
}

isPalindrome("level"); // true
isPalindrome("paper"); // false
```

Two indices move toward each other, so the input size decreases every call.

## 9. Greatest common divisor

The Euclidean algorithm uses a smaller remainder at every step.

```js
function greatestCommonDivisor(left, right) {
  if (!Number.isInteger(left) || !Number.isInteger(right)) {
    throw new Error("arguments must be integers");
  }

  left = Math.abs(left);
  right = Math.abs(right);
  if (right === 0) return left;
  return greatestCommonDivisor(right, left % right);
}

greatestCommonDivisor(48, 18); // 6
```

This is an example where recursion expresses the mathematical definition clearly and each call reduces the problem quickly.

## 10. Fibonacci: the simple but expensive version

The Fibonacci sequence is defined by two base cases and two recursive branches.

```js
function fibonacci(number) {
  if (number < 0 || !Number.isInteger(number)) {
    throw new Error("fibonacci expects a non-negative integer");
  }

  if (number <= 1) return number;
  return fibonacci(number - 1) + fibonacci(number - 2);
}

fibonacci(7); // 13
```

This version repeats the same work many times. Its time complexity is exponential, approximately $O(2^n)$, so it is useful for learning but not for large inputs.

## 11. Memoization

Memoization stores results for inputs already solved. This turns repeated subproblems into lookups.

```js
function fibonacciMemoized(number, cache = new Map([[0, 0], [1, 1]])) {
  if (cache.has(number)) return cache.get(number);

  const result =
    fibonacciMemoized(number - 1, cache) +
    fibonacciMemoized(number - 2, cache);

  cache.set(number, result);
  return result;
}

fibonacciMemoized(50); // 12586269025
```

With memoization, Fibonacci takes $O(n)$ time and $O(n)$ extra space.

## 12. Bottom-up dynamic programming

The same repeated-subproblem idea can be solved iteratively. This avoids recursive call-stack growth.

```js
function fibonacciBottomUp(number) {
  if (number <= 1) return number;

  let previous = 0;
  let current = 1;

  for (let index = 2; index <= number; index += 1) {
    [previous, current] = [current, previous + current];
  }

  return current;
}

fibonacciBottomUp(50); // 12586269025
```

Know both top-down recursion with memoization and bottom-up iteration. Choose based on clarity, constraints, and stack depth.

## 13. Recursing through nested arrays

Nested data often has an unknown depth. Recursion follows each child collection naturally.

```js
function flatten(values) {
  const result = [];

  for (const value of values) {
    if (Array.isArray(value)) {
      result.push(...flatten(value));
    } else {
      result.push(value);
    }
  }

  return result;
}

flatten([1, [2, [3, 4]], 5]); // [1, 2, 3, 4, 5]
```

The base case is an item that is not an array. The recursive case processes a nested array.

## 14. Recursing through an object tree

Trees have a root and children. A node can contain child nodes of the same shape.

```js
const fileTree = {
  name: "src",
  children: [
    { name: "app.js", children: [] },
    {
      name: "utils",
      children: [{ name: "format.js", children: [] }],
    },
  ],
};

function collectNames(node, names = []) {
  names.push(node.name);

  for (const child of node.children) {
    collectNames(child, names);
  }

  return names;
}

collectNames(fileTree);
// ["src", "app.js", "utils", "format.js"]
```

The node with no children is a leaf. The function applies the same rule to every child.

## 15. Tree traversal orders

For binary trees, common traversal orders are:

- **Preorder:** visit node, left subtree, right subtree.
- **Inorder:** visit left subtree, node, right subtree.
- **Postorder:** visit left subtree, right subtree, node.

```js
function inorder(node, values = []) {
  if (node === null) return values;

  inorder(node.left, values);
  values.push(node.value);
  inorder(node.right, values);

  return values;
}

const tree = {
  value: 2,
  left: { value: 1, left: null, right: null },
  right: { value: 3, left: null, right: null },
};

inorder(tree); // [1, 2, 3]
```

For a binary search tree, inorder traversal returns values in sorted order.

## 16. Searching a tree

Return immediately when a match is found; otherwise search the children.

```js
function containsValue(node, target) {
  if (node === null) return false;
  if (node.value === target) return true;

  return (
    containsValue(node.left, target) ||
    containsValue(node.right, target)
  );
}

containsValue(tree, 3); // true
```

The `||` operator short-circuits, so the right subtree is not visited after the left subtree finds the target.

## 17. Recursive descent through a graph

Graphs can contain cycles, so a graph traversal needs a `visited` set. Without it, recursion may never stop.

```js
function depthFirstSearch(graph, start, target, visited = new Set()) {
  if (visited.has(start)) return false;
  visited.add(start);

  if (start === target) return true;

  for (const neighbor of graph[start] ?? []) {
    if (depthFirstSearch(graph, neighbor, target, visited)) {
      return true;
    }
  }

  return false;
}

const graph = {
  A: ["B", "C"],
  B: ["D"],
  C: ["A"],
  D: [],
};

depthFirstSearch(graph, "A", "D"); // true
```

With a visited set, depth-first search runs in $O(V + E)$ time for $V$ vertices and $E$ edges.

## 18. Divide and conquer: binary search

Binary search repeatedly discards half of a sorted range.

```js
function binarySearch(sortedValues, target, left = 0, right = sortedValues.length - 1) {
  if (left > right) return -1;

  const middle = Math.floor((left + right) / 2);
  const value = sortedValues[middle];

  if (value === target) return middle;
  if (value > target) {
    return binarySearch(sortedValues, target, left, middle - 1);
  }
  return binarySearch(sortedValues, target, middle + 1, right);
}

binarySearch([1, 3, 5, 7, 9], 7); // 3
```

The input range is halved on every call, giving $O(\log n)$ time.

## 19. Divide and conquer: merge sort

Merge sort divides the array, recursively sorts each half, then combines the sorted halves.

```js
function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex += 1;
    } else {
      result.push(right[rightIndex]);
      rightIndex += 1;
    }
  }

  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

function mergeSort(values) {
  if (values.length <= 1) return values;

  const middle = Math.floor(values.length / 2);
  const left = mergeSort(values.slice(0, middle));
  const right = mergeSort(values.slice(middle));

  return merge(left, right);
}

mergeSort([4, 1, 3, 2]); // [1, 2, 3, 4]
```

Merge sort takes $O(n \log n)$ time and uses additional memory for the split arrays.

## 20. Backtracking: generating choices

Backtracking explores a choice, recursively explores the result, then removes the choice before trying another option.

```js
function permutations(values) {
  const result = [];

  function build(path, remaining) {
    if (remaining.length === 0) {
      result.push([...path]);
      return;
    }

    for (let index = 0; index < remaining.length; index += 1) {
      path.push(remaining[index]);
      build(
        path,
        remaining.slice(0, index).concat(remaining.slice(index + 1)),
      );
      path.pop();
    }
  }

  build([], values);
  return result;
}

permutations(["A", "B", "C"]);
// [
//   ["A", "B", "C"], ["A", "C", "B"],
//   ["B", "A", "C"], ["B", "C", "A"],
//   ["C", "A", "B"], ["C", "B", "A"]
// ]
```

The `path.push` and `path.pop` pair is the backtracking step. Without `pop`, choices from one branch leak into the next branch.

## 21. Backtracking: subsets

At each item, make two choices: include it or skip it.

```js
function subsets(values) {
  const result = [];

  function build(index, current) {
    if (index === values.length) {
      result.push([...current]);
      return;
    }

    build(index + 1, current); // skip

    current.push(values[index]);
    build(index + 1, current); // include
    current.pop();
  }

  build(0, []);
  return result;
}

subsets([1, 2]); // [[], [2], [1], [1, 2]]
```

There are $2^n$ subsets, so exponential output is unavoidable when every subset must be returned.

## 22. Backtracking with pruning

Pruning stops exploring a branch as soon as it cannot produce a valid answer.

```js
function combinationsThatSum(values, target) {
  const result = [];

  function search(start, remaining, current) {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }

    if (remaining < 0) return;

    for (let index = start; index < values.length; index += 1) {
      current.push(values[index]);
      search(index + 1, remaining - values[index], current);
      current.pop();
    }
  }

  search(0, target, []);
  return result;
}

combinationsThatSum([2, 3, 5, 6], 8);
// [[2, 6], [3, 5]]
```

Pruning does not always change the worst-case complexity, but it can greatly reduce the work for real inputs.

## 23. Tail recursion and JavaScript limits

A tail call is the final operation of a function:

```js
function countDownTail(number) {
  if (number === 0) return;
  return countDownTail(number - 1);
}
```

Some languages optimize tail calls, but typical JavaScript environments should not be assumed to remove the stack frame. For very deep input, use a loop or an explicit stack.

## 24. Replacing recursion with an explicit stack

Depth-first traversal can be written iteratively with an array used as a stack.

```js
function depthFirstSearchIterative(graph, start, target) {
  const stack = [start];
  const visited = new Set();

  while (stack.length > 0) {
    const current = stack.pop();
    if (visited.has(current)) continue;
    visited.add(current);

    if (current === target) return true;
    stack.push(...(graph[current] ?? []));
  }

  return false;
}
```

Use an explicit stack when input depth may exceed the call-stack limit or when iterative state is easier to control.

## 25. Complexity and correctness checklist

For every recursive solution, ask:

- What is the exact base case?
- Does every path reach the base case?
- What gets smaller or simpler on each call?
- How many recursive calls does one call create?
- Are subproblems repeated?
- Is memoization useful?
- Does the function mutate shared state?
- Could input depth overflow the call stack?
- Can a loop or explicit stack express the same algorithm more safely?

Estimate both time and space complexity. Recursive calls use stack space even when the algorithm does not allocate an explicit data structure.

## Suggested practice path

1. Write `countDown`, `sumTo`, and `factorial` with explicit base cases.
2. Implement array sum, string reversal, and palindrome checking.
3. Compare naive Fibonacci, memoized Fibonacci, and bottom-up Fibonacci.
4. Traverse nested arrays and object trees in preorder, inorder, and postorder.
5. Implement depth-first search for a cyclic graph with a visited set.
6. Implement binary search and merge sort using divide and conquer.
7. Generate permutations and subsets with backtracking and verify the push/pop state.
8. Add pruning to a combination or maze-search problem.
9. Rewrite one recursive solution with a loop or explicit stack.
10. Test empty input, the base input, one step above the base case, invalid input, and very deep input.
