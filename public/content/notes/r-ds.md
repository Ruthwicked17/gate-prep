Data Structures

KEY IDEAS
- Stack: Last In First Out (LIFO). Push and pop act on the top only, each $O(1)$. Uses: recursion and function calls, postfix evaluation, undo, depth-first search, bracket matching.
- Queue: First In First Out (FIFO). Enqueue at the rear, dequeue at the front, each $O(1)$. A circular queue in an array of size $n$ reuses slots with index arithmetic mod $n$. Uses: buffers, scheduling, breadth-first search.
- Linked list: nodes holding data plus a pointer to the next node (doubly linked lists also point back). Insert after a known node is $O(1)$; deleting a known node is $O(1)$ in a doubly linked list but needs its predecessor in a singly linked list. However, reaching the $k$-th element is $O(k)$. Arrays are the reverse: $O(1)$ indexing, $O(n)$ insertion in the middle.
- Binary search tree (BST): left subtree keys are smaller, right subtree keys larger, at every node. Inorder traversal (left, node, right) gives sorted order. Search, insert and delete cost $O(h)$ for height $h$: $O(\log n)$ if balanced, $O(n)$ if keys arrive sorted (the tree becomes a chain).
- Deleting a BST node with two children: replace it with its inorder successor (smallest key in the right subtree) or predecessor.
- Heap: a complete binary tree stored in an array. In a max-heap every parent is at least as large as its children, so the maximum is at the root. Insert and delete-max are $O(\log n)$, building from $n$ items bottom-up is $O(n)$. Used for priority queues and heapsort.
- Graph: vertices $V$ and edges $E$, directed or undirected, weighted or not. Adjacency matrix: $O(V^2)$ space, $O(1)$ edge lookup. Adjacency list: $O(V+E)$ space, suits sparse graphs. BFS (queue) and DFS (stack) run in $O(V+E)$ with a list.

FORMULAS
- Heap in an array, 1-based index $i$: children $2i$ and $2i+1$, parent $\lfloor i/2 \rfloor$. With 0-based index: children $2i+1$, $2i+2$, parent $\lfloor (i-1)/2 \rfloor$.
- Height of a heap with $n$ nodes: $\lfloor \log_2 n \rfloor$.
- A binary tree of height $h$ (counted in edges) has at most $2^{h+1}-1$ nodes.
- Undirected simple graph: at most $\frac{V(V-1)}{2}$ edges; sum of degrees $= 2E$.

WORKED EXAMPLE
- Evaluate the postfix expression 2 3 4 * + 5 - with a stack.
- Push 2, 3, 4. Operator * pops 4 and 3, pushes 12. Stack: 2, 12.
- Operator + pops 12 and 2, pushes 14. Push 5. Operator - pops 5 then 14, pushes $14 - 5 = 9$.
- Result: 9. Check via infix: $(2 + 3 \times 4) - 5 = 9$. Both agree.
- BST part: insert 50, 30, 70, 20, 40, 60, 80. Children of 50 are 30 and 70; 20, 40 hang under 30 and 60, 80 under 70. Height is 2 and inorder gives 20 30 40 50 60 70 80, sorted as expected. Deleting 50 puts its successor 60 at the root.

COMMON TRAPS
- In postfix, the first item popped is the right operand; order matters for subtraction and division.
- Height conventions differ (edges or nodes). Check the definition before using $2^{h+1}-1$.
- A heap is not a BST: its inorder traversal is not sorted and searching for a key is $O(n)$.
- BST worst case is $O(n)$ unless the tree is stated to be balanced.

GATE PATTERN
- Expect tracing questions: stack contents, postfix evaluation, a BST or heap after insertions or deletions.
- Numerical answer questions on node counts, heap index arithmetic and edge counts.
- Shortcut: the inorder sequence of a BST is just the sorted keys, so only preorder or postorder needs work.
- Shortcut: in a max-heap of $n$ nodes the minimum lies among the leaves, positions $\lfloor n/2 \rfloor + 1$ to $n$ (1-based).
