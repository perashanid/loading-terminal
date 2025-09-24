import type { CodeSnippet } from '../types';

export const defaultCodeSnippets: CodeSnippet[] = [
  {
    language: 'typescript',
    filename: 'dijkstra.ts',
    code: `interface Graph {
  [key: string]: { [neighbor: string]: number };
}

class PriorityQueue<T> {
  private items: Array<{ element: T; priority: number }> = [];

  enqueue(element: T, priority: number): void {
    this.items.push({ element, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.element;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

function dijkstra(graph: Graph, start: string, end: string) {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const pq = new PriorityQueue<string>();
  
  // Initialize distances
  for (const vertex in graph) {
    distances[vertex] = vertex === start ? 0 : Infinity;
    previous[vertex] = null;
    pq.enqueue(vertex, distances[vertex]);
  }

  while (!pq.isEmpty()) {
    const current = pq.dequeue()!;
    
    if (current === end) break;
    
    for (const neighbor in graph[current]) {
      const alt = distances[current] + graph[current][neighbor];
      
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = current;
        pq.enqueue(neighbor, alt);
      }
    }
  }

  // Reconstruct path
  const path: string[] = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return { distances, previous, path };
}`,
    typingSpeed: 30,
  },
  {
    language: 'typescript',
    filename: 'quicksort.ts',
    code: `function quickSort<T>(arr: T[], compare?: (a: T, b: T) => number): T[] {
  if (arr.length <= 1) return arr;
  
  const compareFn = compare || ((a, b) => a < b ? -1 : a > b ? 1 : 0);
  const pivot = arr[Math.floor(arr.length / 2)];
  const left: T[] = [];
  const right: T[] = [];
  const equal: T[] = [];

  for (const element of arr) {
    const comparison = compareFn(element, pivot);
    if (comparison < 0) {
      left.push(element);
    } else if (comparison > 0) {
      right.push(element);
    } else {
      equal.push(element);
    }
  }

  return [
    ...quickSort(left, compareFn),
    ...equal,
    ...quickSort(right, compareFn)
  ];
}

// In-place version for better memory efficiency
function quickSortInPlace<T>(
  arr: T[], 
  low: number = 0, 
  high: number = arr.length - 1,
  compare?: (a: T, b: T) => number
): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high, compare);
    quickSortInPlace(arr, low, pivotIndex - 1, compare);
    quickSortInPlace(arr, pivotIndex + 1, high, compare);
  }
}

function partition<T>(
  arr: T[], 
  low: number, 
  high: number,
  compare?: (a: T, b: T) => number
): number {
  const compareFn = compare || ((a, b) => a < b ? -1 : a > b ? 1 : 0);
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (compareFn(arr[j], pivot) <= 0) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    typingSpeed: 25,
  },
  {
    language: 'typescript',
    filename: 'binary-search.ts',
    code: `function binarySearch<T>(
  arr: T[], 
  target: T, 
  compare?: (a: T, b: T) => number
): number {
  const compareFn = compare || ((a, b) => a < b ? -1 : a > b ? 1 : 0);
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = compareFn(arr[mid], target);

    if (comparison === 0) {
      return mid; // Found the target
    } else if (comparison < 0) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}

// Recursive version
function binarySearchRecursive<T>(
  arr: T[], 
  target: T, 
  left: number = 0, 
  right: number = arr.length - 1,
  compare?: (a: T, b: T) => number
): number {
  if (left > right) return -1;

  const compareFn = compare || ((a, b) => a < b ? -1 : a > b ? 1 : 0);
  const mid = Math.floor((left + right) / 2);
  const comparison = compareFn(arr[mid], target);

  if (comparison === 0) {
    return mid;
  } else if (comparison < 0) {
    return binarySearchRecursive(arr, target, mid + 1, right, compareFn);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1, compareFn);
  }
}

// Find insertion point for maintaining sorted order
function binarySearchInsertionPoint<T>(
  arr: T[], 
  target: T, 
  compare?: (a: T, b: T) => number
): number {
  const compareFn = compare || ((a, b) => a < b ? -1 : a > b ? 1 : 0);
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (compareFn(arr[mid], target) < 0) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}`,
    typingSpeed: 28,
  },
  {
    language: 'typescript',
    filename: 'merge-sort.ts',
    code: `function mergeSort<T>(arr: T[], compare?: (a: T, b: T) => number): T[] {
  if (arr.length <= 1) return arr;

  const compareFn = compare || ((a, b) => a < b ? -1 : a > b ? 1 : 0);
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(
    mergeSort(left, compareFn), 
    mergeSort(right, compareFn), 
    compareFn
  );
}

function merge<T>(
  left: T[], 
  right: T[], 
  compare: (a: T, b: T) => number
): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (compare(left[leftIndex], right[rightIndex]) <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Add remaining elements
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}

// In-place merge sort for better memory efficiency
function mergeSortInPlace<T>(
  arr: T[], 
  temp: T[] = new Array(arr.length),
  left: number = 0, 
  right: number = arr.length - 1,
  compare?: (a: T, b: T) => number
): void {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    mergeSortInPlace(arr, temp, left, mid, compare);
    mergeSortInPlace(arr, temp, mid + 1, right, compare);
    mergeInPlace(arr, temp, left, mid, right, compare);
  }
}`,
    typingSpeed: 26,
  },
  {
    language: 'typescript',
    filename: 'bfs-dfs.ts',
    code: `interface GraphNode<T> {
  value: T;
  neighbors: GraphNode<T>[];
}

class Graph<T> {
  private nodes: Map<T, GraphNode<T>> = new Map();

  addNode(value: T): GraphNode<T> {
    if (!this.nodes.has(value)) {
      const node: GraphNode<T> = { value, neighbors: [] };
      this.nodes.set(value, node);
      return node;
    }
    return this.nodes.get(value)!;
  }

  addEdge(from: T, to: T): void {
    const fromNode = this.addNode(from);
    const toNode = this.addNode(to);
    fromNode.neighbors.push(toNode);
  }

  // Breadth-First Search
  bfs(start: T, target: T): T[] | null {
    const startNode = this.nodes.get(start);
    if (!startNode) return null;

    const queue: GraphNode<T>[] = [startNode];
    const visited = new Set<T>();
    const parent = new Map<T, T | null>();
    
    visited.add(start);
    parent.set(start, null);

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current.value === target) {
        return this.reconstructPath(parent, start, target);
      }

      for (const neighbor of current.neighbors) {
        if (!visited.has(neighbor.value)) {
          visited.add(neighbor.value);
          parent.set(neighbor.value, current.value);
          queue.push(neighbor);
        }
      }
    }

    return null; // Target not found
  }

  // Depth-First Search
  dfs(start: T, target: T): T[] | null {
    const visited = new Set<T>();
    const path: T[] = [];

    const dfsHelper = (current: T): boolean => {
      visited.add(current);
      path.push(current);

      if (current === target) return true;

      const currentNode = this.nodes.get(current);
      if (currentNode) {
        for (const neighbor of currentNode.neighbors) {
          if (!visited.has(neighbor.value)) {
            if (dfsHelper(neighbor.value)) return true;
          }
        }
      }

      path.pop(); // Backtrack
      return false;
    };

    return dfsHelper(start) ? path : null;
  }

  private reconstructPath(parent: Map<T, T | null>, start: T, end: T): T[] {
    const path: T[] = [];
    let current: T | null = end;

    while (current !== null) {
      path.unshift(current);
      current = parent.get(current) || null;
    }

    return path;
  }
}`,
    typingSpeed: 24,
  },
  {
    language: 'typescript',
    filename: 'dynamic-programming.ts',
    code: `// Fibonacci with memoization
function fibonacci(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  
  const result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  memo.set(n, result);
  return result;
}

// Longest Common Subsequence
function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// Knapsack Problem
function knapsack(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}

// Edit Distance (Levenshtein Distance)
function editDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // deletion
          dp[i][j - 1],     // insertion
          dp[i - 1][j - 1]  // substitution
        );
      }
    }
  }

  return dp[m][n];
}`,
    typingSpeed: 22,
  },
  {
    language: 'typescript',
    filename: 'heap-sort.ts',
    code: `class MaxHeap<T> {
  private heap: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number) {
    this.compare = compare || ((a, b) => a < b ? -1 : a > b ? 1 : 0);
  }

  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private leftChild(index: number): number {
    return 2 * index + 1;
  }

  private rightChild(index: number): number {
    return 2 * index + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value: T): void {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMax(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return max;
  }

  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.parent(index);
      if (this.compare(this.heap[index], this.heap[parentIndex]) <= 0) break;
      
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  private heapifyDown(index: number): void {
    while (this.leftChild(index) < this.heap.length) {
      let maxChildIndex = this.leftChild(index);
      const rightIndex = this.rightChild(index);
      
      if (rightIndex < this.heap.length && 
          this.compare(this.heap[rightIndex], this.heap[maxChildIndex]) > 0) {
        maxChildIndex = rightIndex;
      }

      if (this.compare(this.heap[index], this.heap[maxChildIndex]) >= 0) break;
      
      this.swap(index, maxChildIndex);
      index = maxChildIndex;
    }
  }

  size(): number {
    return this.heap.length;
  }
}

function heapSort<T>(arr: T[], compare?: (a: T, b: T) => number): T[] {
  const heap = new MaxHeap<T>(compare);
  const result: T[] = [];

  // Build heap
  for (const item of arr) {
    heap.insert(item);
  }

  // Extract elements in sorted order
  while (heap.size() > 0) {
    result.unshift(heap.extractMax()!);
  }

  return result;
}`,
    typingSpeed: 20,
  },
  {
    language: 'typescript',
    filename: 'a-star.ts',
    code: `interface AStarNode {
  x: number;
  y: number;
  g: number; // Cost from start
  h: number; // Heuristic cost to goal
  f: number; // Total cost (g + h)
  parent: AStarNode | null;
}

class AStar {
  private grid: number[][];
  private rows: number;
  private cols: number;

  constructor(grid: number[][]) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0].length;
  }

  findPath(start: [number, number], goal: [number, number]): [number, number][] | null {
    const openSet: AStarNode[] = [];
    const closedSet = new Set<string>();
    
    const startNode: AStarNode = {
      x: start[0],
      y: start[1],
      g: 0,
      h: this.heuristic(start, goal),
      f: 0,
      parent: null
    };
    startNode.f = startNode.g + startNode.h;
    
    openSet.push(startNode);

    while (openSet.length > 0) {
      // Find node with lowest f score
      let current = openSet[0];
      let currentIndex = 0;
      
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < current.f) {
          current = openSet[i];
          currentIndex = i;
        }
      }

      // Remove current from open set and add to closed set
      openSet.splice(currentIndex, 1);
      closedSet.add(\`\${current.x},\${current.y}\`);

      // Check if we reached the goal
      if (current.x === goal[0] && current.y === goal[1]) {
        return this.reconstructPath(current);
      }

      // Check all neighbors
      const neighbors = this.getNeighbors(current);
      
      for (const neighbor of neighbors) {
        const neighborKey = \`\${neighbor.x},\${neighbor.y}\`;
        
        if (closedSet.has(neighborKey) || this.grid[neighbor.y][neighbor.x] === 1) {
          continue; // Skip if already processed or is obstacle
        }

        const tentativeG = current.g + this.getDistance(current, neighbor);
        
        const existingNode = openSet.find(n => n.x === neighbor.x && n.y === neighbor.y);
        
        if (!existingNode) {
          neighbor.g = tentativeG;
          neighbor.h = this.heuristic([neighbor.x, neighbor.y], goal);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
          openSet.push(neighbor);
        } else if (tentativeG < existingNode.g) {
          existingNode.g = tentativeG;
          existingNode.f = existingNode.g + existingNode.h;
          existingNode.parent = current;
        }
      }
    }

    return null; // No path found
  }

  private heuristic(a: [number, number], b: [number, number]): number {
    // Manhattan distance
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  }

  private getDistance(a: AStarNode, b: AStarNode): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  private getNeighbors(node: AStarNode): AStarNode[] {
    const neighbors: AStarNode[] = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (const [dx, dy] of directions) {
      const x = node.x + dx;
      const y = node.y + dy;

      if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
        neighbors.push({ x, y, g: 0, h: 0, f: 0, parent: null });
      }
    }

    return neighbors;
  }

  private reconstructPath(node: AStarNode): [number, number][] {
    const path: [number, number][] = [];
    let current: AStarNode | null = node;

    while (current) {
      path.unshift([current.x, current.y]);
      current = current.parent;
    }

    return path;
  }
}`,
    typingSpeed: 18,
  },
];

export const getRandomCodeSnippet = (): CodeSnippet => {
  return defaultCodeSnippets[Math.floor(Math.random() * defaultCodeSnippets.length)];
};