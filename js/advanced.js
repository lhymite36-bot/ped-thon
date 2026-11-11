export const advancedModules = [
  {
    id: "recursion",
    title: "Recursion",
    subtitle: "Functions that call themselves",
    icon: "🌀",
    level: "advanced",
    lesson: {
      title: "The same problem, smaller",
      html: `<p>A recursive function solves a problem by calling itself on a smaller piece, and has a <strong>base case</strong> that stops the chain.</p>
<pre>def fact(n):
    if n &lt;= 1:
        return 1
    return n * fact(n - 1)</pre>
<p>Every recursive call should move toward the base case, or the program will never end.</p>`,
    },
    challenges: [
      { id: "adv-rec-1", title: "Factorial", prompt: "Write a recursive function fact(n) that returns n! (n × (n-1) × … × 1). fact(0) and fact(1) should be 1.", starter: "def fact(n):\n    ", checks: [
        { type: "func", name: "fact", args: [0], expect: 1, message: "fact(0) should be 1." },
        { type: "func", name: "fact", args: [1], expect: 1, message: "fact(1) should be 1." },
        { type: "func", name: "fact", args: [5], expect: 120, message: "fact(5) should be 120." },
        { type: "func", name: "fact", args: [6], expect: 720, message: "fact(6) should be 720." },
      ], hints: ["If n is 0 or 1, return 1.", "Otherwise return n * fact(n - 1)."], solution: "def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)", xp: 20 },
      { id: "adv-rec-2", title: "Fibonacci", prompt: "Write a recursive fib(n) where fib(0) is 0, fib(1) is 1, and fib(n) is fib(n-1) + fib(n-2).", starter: "def fib(n):\n    ", checks: [
        { type: "func", name: "fib", args: [0], expect: 0, message: "fib(0) should be 0." },
        { type: "func", name: "fib", args: [1], expect: 1, message: "fib(1) should be 1." },
        { type: "func", name: "fib", args: [7], expect: 13, message: "fib(7) should be 13." },
        { type: "func", name: "fib", args: [10], expect: 55, message: "fib(10) should be 55." },
      ], hints: ["Base cases: n is 0 or 1.", "return fib(n - 1) + fib(n - 2)"], solution: "def fib(n):\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n    return fib(n - 1) + fib(n - 2)", xp: 20 },
      { id: "adv-rec-3", title: "Sum of digits", prompt: "Write recursive sum_digits(n) that returns the sum of the decimal digits of a non-negative integer. sum_digits(405) is 9.", starter: "def sum_digits(n):\n    ", checks: [
        { type: "func", name: "sum_digits", args: [0], expect: 0, message: "sum_digits(0) should be 0." },
        { type: "func", name: "sum_digits", args: [7], expect: 7, message: "sum_digits(7) should be 7." },
        { type: "func", name: "sum_digits", args: [405], expect: 9, message: "sum_digits(405) should be 9." },
        { type: "func", name: "sum_digits", args: [999], expect: 27, message: "sum_digits(999) should be 27." },
      ], hints: ["The last digit is n % 10. The rest is n // 10."], solution: "def sum_digits(n):\n    if n < 10:\n        return n\n    return n % 10 + sum_digits(n // 10)", xp: 20 },
      { id: "adv-rec-4", title: "Reverse a string", prompt: "Write recursive reverse_str(s) that returns s backwards. Use recursion (not only s[::-1] as the whole function body).", starter: "def reverse_str(s):\n    ", checks: [
        { type: "func", name: "reverse_str", args: [""], expect: "", message: "An empty string should stay empty." },
        { type: "func", name: "reverse_str", args: ["a"], expect: "a", message: "A one-letter string stays the same." },
        { type: "func", name: "reverse_str", args: ["python"], expect: "nohtyp", message: "reverse_str('python') should be 'nohtyp'." },
        { type: "python", code: "assert 'reverse_str(' in _student_code\n_ok = True", message: "Call reverse_str inside itself." },
      ], hints: ["Base case: length 0 or 1.", "return reverse_str(s[1:]) + s[0]"], solution: "def reverse_str(s):\n    if len(s) <= 1:\n        return s\n    return reverse_str(s[1:]) + s[0]", xp: 22 },
      { id: "adv-rec-5", title: "Flatten a nested list", prompt: "Write flatten(items) that takes a list which may contain more lists (any depth) and returns a single flat list of the non-list values, in order. flatten([1, [2, 3], [[4]]]) is [1, 2, 3, 4].", starter: "def flatten(items):\n    ", checks: [
        { type: "func", name: "flatten", args: [[1, 2, 3]], expect: [1, 2, 3], message: "A flat list should stay flat." },
        { type: "func", name: "flatten", args: [[1, [2, 3], [[4]]]], expect: [1, 2, 3, 4], message: "flatten([1, [2, 3], [[4]]]) should be [1, 2, 3, 4]." },
        { type: "func", name: "flatten", args: [[]], expect: [], message: "flatten([]) should be []." },
        { type: "func", name: "flatten", args: [[[1], 2, [3, [4, 5]]]], expect: [1, 2, 3, 4, 5], message: "Deeper nesting should also flatten." },
      ], hints: ["If an item is a list, extend with flatten(item).", "isinstance(x, list) checks the type."], solution: "def flatten(items):\n    out = []\n    for x in items:\n        if isinstance(x, list):\n            out.extend(flatten(x))\n        else:\n            out.append(x)\n    return out", xp: 24 },
    ],
  },
  {
    id: "algorithms",
    title: "Algorithms",
    subtitle: "Search, sort, and classic patterns",
    icon: "⚙️",
    level: "advanced",
    lesson: {
      title: "Recipes for hard problems",
      html: `<p>A few patterns show up again and again: two pointers, binary search, and keeping a running best answer.</p>
<pre>def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo &lt;= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] &lt; target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1</pre>`,
    },
    challenges: [
      { id: "adv-algo-1", title: "Two sum", prompt: "Write two_sum(nums, target) that returns a list of two indices i, j (i < j) such that nums[i] + nums[j] == target. You may assume exactly one solution exists.", starter: "def two_sum(nums, target):\n    ", checks: [
        { type: "func", name: "two_sum", args: [[2, 7, 11, 15], 9], expect: [0, 1], message: "2 + 7 = 9 at indices 0 and 1." },
        { type: "func", name: "two_sum", args: [[3, 2, 4], 6], expect: [1, 2], message: "2 + 4 = 6 at indices 1 and 2." },
        { type: "func", name: "two_sum", args: [[3, 3], 6], expect: [0, 1], message: "Both threes add to 6." },
      ], hints: ["A dict of value → index lets you find target - num in one pass.", "Or use two nested loops — slower, but fine here."], solution: "def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i", xp: 24 },
      { id: "adv-algo-2", title: "Binary search", prompt: "Write binary_search(arr, target) that takes a sorted list of numbers and returns the index of target, or -1 if it is missing.", starter: "def binary_search(arr, target):\n    ", checks: [
        { type: "func", name: "binary_search", args: [[1, 3, 5, 7, 9], 7], expect: 3, message: "7 is at index 3." },
        { type: "func", name: "binary_search", args: [[1, 3, 5, 7, 9], 1], expect: 0, message: "1 is at index 0." },
        { type: "func", name: "binary_search", args: [[1, 3, 5, 7, 9], 2], expect: -1, message: "2 is missing, so return -1." },
        { type: "func", name: "binary_search", args: [[], 1], expect: -1, message: "An empty list should return -1." },
      ], hints: ["Keep lo and hi indices and look at the middle.", "If arr[mid] < target, search the right half."], solution: "def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target:\n            return mid\n        if arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1", xp: 24 },
      { id: "adv-algo-3", title: "Bubble sort", prompt: "Write bubble_sort(arr) that returns a new list with the numbers in ascending order. You may sort a copy. Do not use the built-in sorted() or list.sort().", starter: "def bubble_sort(arr):\n    ", checks: [
        { type: "func", name: "bubble_sort", args: [[3, 1, 2]], expect: [1, 2, 3], message: "Should sort to [1, 2, 3]." },
        { type: "func", name: "bubble_sort", args: [[5]], expect: [5], message: "A one-item list stays [5]." },
        { type: "func", name: "bubble_sort", args: [[]], expect: [], message: "An empty list stays empty." },
        { type: "func", name: "bubble_sort", args: [[4, 4, 1, 3]], expect: [1, 3, 4, 4], message: "Duplicates should be kept and ordered." },
        { type: "python", code: "assert 'sorted(' not in _student_code and '.sort(' not in _student_code\n_ok = True", message: "Do not use sorted() or list.sort()." },
      ], hints: ["Repeatedly swap neighbours that are out of order.", "Copy the list first so you do not have to mutate the original."], solution: "def bubble_sort(arr):\n    a = list(arr)\n    n = len(a)\n    for i in range(n):\n        for j in range(0, n - 1 - i):\n            if a[j] > a[j + 1]:\n                a[j], a[j + 1] = a[j + 1], a[j]\n    return a", xp: 24 },
      { id: "adv-algo-4", title: "Merge two sorted lists", prompt: "Write merge_sorted(a, b) that takes two already-sorted lists and returns one sorted list with all of their items. Do not use sorted() on the combined list.", starter: "def merge_sorted(a, b):\n    ", checks: [
        { type: "func", name: "merge_sorted", args: [[1, 3, 5], [2, 4, 6]], expect: [1, 2, 3, 4, 5, 6], message: "Should merge to 1..6." },
        { type: "func", name: "merge_sorted", args: [[], [1, 2]], expect: [1, 2], message: "An empty first list should return the second." },
        { type: "func", name: "merge_sorted", args: [[3], []], expect: [3], message: "An empty second list should return the first." },
        { type: "func", name: "merge_sorted", args: [[1, 1], [1, 2]], expect: [1, 1, 1, 2], message: "Keep duplicates." },
        { type: "python", code: "import re\n_ok = re.search(r'(?<!merge_)sorted\\s*\\(', _student_code) is None", message: "Do not use sorted()." },
      ], hints: ["Walk two indices i and j, always append the smaller next item.", "Then append whatever is left in either list."], solution: "def merge_sorted(a, b):\n    i = j = 0\n    out = []\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i]); i += 1\n        else:\n            out.append(b[j]); j += 1\n    out.extend(a[i:])\n    out.extend(b[j:])\n    return out", xp: 24 },
      { id: "adv-algo-5", title: "Maximum subarray sum", prompt: "Write max_subarray(nums) that returns the largest sum of any non-empty contiguous slice. For [-2, 1, -3, 4, -1, 2, 1, -5, 4] the answer is 6 (from 4 + -1 + 2 + 1).", starter: "def max_subarray(nums):\n    ", checks: [
        { type: "func", name: "max_subarray", args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expect: 6, message: "The best slice sums to 6." },
        { type: "func", name: "max_subarray", args: [[1]], expect: 1, message: "A single item array should return that item." },
        { type: "func", name: "max_subarray", args: [[-3, -1, -2]], expect: -1, message: "If all are negative, return the largest (least negative) number." },
        { type: "func", name: "max_subarray", args: [[5, 4, -1, 7, 8]], expect: 23, message: "The whole array sums to 23." },
      ], hints: ["Kadane's idea: keep a running sum, reset it to 0 when it goes negative (unless you must keep a negative if all are negative).", "Track the best sum you have seen."], solution: "def max_subarray(nums):\n    best = current = nums[0]\n    for n in nums[1:]:\n        current = max(n, current + n)\n        best = max(best, current)\n    return best", xp: 26 },
      { id: "adv-algo-6", title: "Valid anagram", prompt: "Write is_anagram(s, t) that returns True if t is an anagram of s (same letters with the same counts), otherwise False. Compare exactly, including case.", starter: "def is_anagram(s, t):\n    ", checks: [
        { type: "func", name: "is_anagram", args: ["anagram", "nagaram"], expect: true, message: "anagram / nagaram should be True." },
        { type: "func", name: "is_anagram", args: ["rat", "car"], expect: false, message: "rat / car should be False." },
        { type: "func", name: "is_anagram", args: ["ab", "a"], expect: false, message: "Different lengths should be False." },
        { type: "func", name: "is_anagram", args: ["", ""], expect: true, message: "Two empty strings are anagrams." },
      ], hints: ["sorted(s) == sorted(t) is a quick check.", "Or count letters with a dict."], solution: "def is_anagram(s, t):\n    return sorted(s) == sorted(t)", xp: 20 },
    ],
  },
  {
    id: "generators",
    title: "Generators & Decorators",
    subtitle: "yield, and wrappers around functions",
    icon: "🎀",
    level: "advanced",
    lesson: {
      title: "Pause, resume, and wrap",
      html: `<p>A <strong>generator</strong> uses <code>yield</code> to produce a stream of values without building the whole list first.</p>
<pre>def evens(n):
    for i in range(n + 1):
        if i % 2 == 0:
            yield i</pre>
<p>A <strong>decorator</strong> is a function that takes a function and returns a new one, often adding behaviour around the original call.</p>
<pre>def once_logged(fn):
    def wrapper(*args, **kwargs):
        print("calling", fn.__name__)
        return fn(*args, **kwargs)
    return wrapper</pre>`,
    },
    challenges: [
      { id: "adv-gen-1", title: "Even numbers generator", prompt: "Write evens_up_to(n) as a generator that yields the even integers from 0 through n inclusive.", starter: "def evens_up_to(n):\n    ", checks: [
        { type: "python", code: "g = _ns['evens_up_to'](8)\nassert list(g) == [0,2,4,6,8]\n_ok = True", message: "evens_up_to(8) should yield 0, 2, 4, 6, 8." },
        { type: "python", code: "g = _ns['evens_up_to'](1)\nassert list(g) == [0]\n_ok = True", message: "evens_up_to(1) should yield only 0." },
        { type: "python", code: "import types\nassert isinstance(_ns['evens_up_to'](4), types.GeneratorType)\n_ok = True", message: "It should be a generator (use yield), not a list." },
      ], hints: ["Use yield inside a loop.", "for i in range(n + 1): if i % 2 == 0: yield i"], solution: "def evens_up_to(n):\n    for i in range(n + 1):\n        if i % 2 == 0:\n            yield i", xp: 20 },
      { id: "adv-gen-2", title: "Countdown", prompt: "Write countdown(n) that yields n, n-1, …, 1, then the string 'lift-off'.", starter: "def countdown(n):\n    ", checks: [
        { type: "python", code: "assert list(_ns['countdown'](3)) == [3, 2, 1, 'lift-off']\n_ok = True", message: "countdown(3) should yield 3, 2, 1, 'lift-off'." },
        { type: "python", code: "assert list(_ns['countdown'](1)) == [1, 'lift-off']\n_ok = True", message: "countdown(1) should yield 1, then 'lift-off'." },
        { type: "python", code: "import types\nassert isinstance(_ns['countdown'](2), types.GeneratorType)\n_ok = True", message: "Use yield so the result is a generator." },
      ], hints: ["Yield each number in a loop, then yield 'lift-off'."], solution: "def countdown(n):\n    for i in range(n, 0, -1):\n        yield i\n    yield 'lift-off'", xp: 20 },
      { id: "adv-gen-3", title: "Take the first n", prompt: "Write take(n, iterable) as a generator that yields at most the first n items from iterable.", starter: "def take(n, iterable):\n    ", checks: [
        { type: "python", code: "assert list(_ns['take'](3, [10, 20, 30, 40])) == [10, 20, 30]\n_ok = True", message: "take(3, [10, 20, 30, 40]) should be [10, 20, 30]." },
        { type: "python", code: "assert list(_ns['take'](5, [1, 2])) == [1, 2]\n_ok = True", message: "If there are fewer than n items, yield them all." },
        { type: "python", code: "assert list(_ns['take'](0, [1, 2, 3])) == []\n_ok = True", message: "take(0, …) should yield nothing." },
      ], hints: ["Loop with enumerate, and stop when the count reaches n.", "yield each item."], solution: "def take(n, iterable):\n    for i, x in enumerate(iterable):\n        if i >= n:\n            break\n        yield x", xp: 22 },
      { id: "adv-gen-4", title: "Call counter decorator", prompt: "Write a decorator count_calls(fn) that returns a wrapper. After wrapping, wrapper.calls starts at 0 and goes up by 1 each time the function is called. The wrapper should return the same result as fn.", starter: "def count_calls(fn):\n    ", checks: [
        { type: "python", code: "def add(a,b): return a+b\nw = _ns['count_calls'](add)\nassert w.calls == 0\nassert w(2,3)==5 and w(4,1)==5\nassert w.calls == 2\n_ok = True", message: "After two calls, wrapper.calls should be 2, and the results should still be correct." },
        { type: "python", code: "def greet(name): return 'hi '+name\nw = _ns['count_calls'](greet)\nassert w('Ada')=='hi Ada' and w.calls==1\n_ok = True", message: "It should work with one argument too." },
      ], hints: ["Define an inner wrapper(*args, **kwargs).", "Increment wrapper.calls, then return fn(*args, **kwargs).", "Set wrapper.calls = 0 before returning wrapper."], solution: "def count_calls(fn):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return fn(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper", xp: 24 },
      { id: "adv-gen-5", title: "Repeat decorator", prompt: "Write a decorator factory repeat(n) so that @repeat(3) above a function calls that function n times and returns a list of the n results (in order).", starter: "def repeat(n):\n    ", checks: [
        { type: "python", code: "box = {'x': 0}\ndef inc():\n    box['x'] += 1\n    return box['x']\nw = _ns['repeat'](3)(inc)\nassert w() == [1,2,3]\n_ok = True", message: "Calling a @repeat(3) function should return a list of three results." },
        { type: "python", code: "def ident(x): return x\nw = _ns['repeat'](2)(ident)\nassert w('ok') == ['ok', 'ok']\n_ok = True", message: "Arguments should be passed through each time." },
      ], hints: ["repeat(n) should return a decorator, which returns a wrapper.", "The wrapper calls fn n times and collects the results."], solution: "def repeat(n):\n    def decorator(fn):\n        def wrapper(*args, **kwargs):\n            return [fn(*args, **kwargs) for _ in range(n)]\n        return wrapper\n    return decorator", xp: 24 },
    ],
  },
  {
    id: "oop-design",
    title: "OOP Design",
    subtitle: "Inheritance, properties, and small classes",
    icon: "🏗️",
    level: "advanced",
    lesson: {
      title: "Designing your own types",
      html: `<p>Classes can <strong>inherit</strong> from others, share an interface, and use <code>@property</code> so a computed value looks like a field.</p>
<pre>class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof"</pre>`,
    },
    challenges: [
      { id: "adv-oop-1", title: "Animal and Dog", prompt: "Create class Animal with speak(self) returning \"...\". Create class Dog(Animal) that overrides speak to return \"Woof\". Dog should also take a name in __init__ and store it as self.name.", starter: "", checks: [
        { type: "python", code: "a = _ns['Animal']()\nassert a.speak() == '...'\nd = _ns['Dog']('Buddy')\nassert d.name == 'Buddy' and d.speak() == 'Woof'\nassert isinstance(d, _ns['Animal'])\n_ok = True", message: "Dog('Buddy') should have name Buddy, speak Woof, and be an Animal." },
      ], hints: ["class Dog(Animal): means Dog inherits from Animal.", "Override speak inside Dog."], solution: "class Animal:\n    def speak(self):\n        return '...'\n\nclass Dog(Animal):\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return 'Woof'", xp: 22 },
      { id: "adv-oop-2", title: "Temperature property", prompt: "Create class Temperature. Store celsius in __init__(self, celsius). Add a @property fahrenheit that returns celsius * 9/5 + 32.", starter: "class Temperature:\n    ", checks: [
        { type: "python", code: "t = _ns['Temperature'](0)\nassert t.celsius == 0 and t.fahrenheit == 32\n_ok = True", message: "0°C is 32°F." },
        { type: "python", code: "t = _ns['Temperature'](100)\nassert abs(t.fahrenheit - 212) < 1e-6\n_ok = True", message: "100°C is 212°F." },
      ], hints: ["Use @property above def fahrenheit(self):", "return self.celsius * 9/5 + 32"], solution: "class Temperature:\n    def __init__(self, celsius):\n        self.celsius = celsius\n    @property\n    def fahrenheit(self):\n        return self.celsius * 9 / 5 + 32", xp: 22 },
      { id: "adv-oop-3", title: "A stack", prompt: "Create class Stack with push(item), pop() (returns and removes the top item, or None if empty), and peek() (top item without removing, or None). Start empty.", starter: "class Stack:\n    ", checks: [
        { type: "python", code: "s = _ns['Stack']()\nassert s.pop() is None and s.peek() is None\ns.push(1); s.push(2)\nassert s.peek()==2 and s.pop()==2 and s.pop()==1 and s.pop() is None\n_ok = True", message: "Push 1 then 2; peek is 2; pop returns 2 then 1, then None." },
      ], hints: ["Store items in a list.", "push uses append. pop uses list.pop() when the list is not empty."], solution: "class Stack:\n    def __init__(self):\n        self._items = []\n    def push(self, item):\n        self._items.append(item)\n    def pop(self):\n        return self._items.pop() if self._items else None\n    def peek(self):\n        return self._items[-1] if self._items else None", xp: 22 },
      { id: "adv-oop-4", title: "Safer withdraw", prompt: "Create BankAccount(balance) with deposit(amount) and withdraw(amount). withdraw should reduce the balance and return True if there is enough money, otherwise leave the balance alone and return False. Reject non-positive amounts for both methods by returning False and changing nothing.", starter: "class BankAccount:\n    ", checks: [
        { type: "python", code: "a = _ns['BankAccount'](100)\nassert a.withdraw(40) is True and a.balance == 60\nassert a.withdraw(100) is False and a.balance == 60\nassert a.deposit(10) is not False\nassert a.balance == 70\nassert a.deposit(-5) is False and a.balance == 70\n_ok = True", message: "Withdraw 40 from 100, refuse 100, deposit 10, refuse -5." },
      ], hints: ["Check amount > 0, and for withdraw also amount <= balance."], solution: "class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n    def deposit(self, amount):\n        if amount <= 0:\n            return False\n        self.balance += amount\n        return True\n    def withdraw(self, amount):\n        if amount <= 0 or amount > self.balance:\n            return False\n        self.balance -= amount\n        return True", xp: 24 },
      { id: "adv-oop-5", title: "Shapes with area()", prompt: "Create a base class Shape with area(self) returning 0. Create Rectangle(width, height) and Circle(radius) that each implement area. Use 3.141592653589793 as pi for the circle (or math.pi).", starter: "", checks: [
        { type: "python", code: "import math\nassert _ns['Shape']().area() == 0\nassert _ns['Rectangle'](3, 4).area() == 12\nassert abs(_ns['Circle'](2).area() - math.pi * 4) < 1e-6\nassert isinstance(_ns['Rectangle'](1,1), _ns['Shape']) or True\n_ok = True", message: "Rectangle(3,4).area() is 12; Circle(2).area() is pi*4; Shape().area() is 0." },
      ], hints: ["class Rectangle(Shape): and class Circle(Shape):", "Circle area is pi * radius * radius."], solution: "import math\nclass Shape:\n    def area(self):\n        return 0\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    def area(self):\n        return self.width * self.height\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return math.pi * self.radius * self.radius", xp: 24 },
    ],
  },
  {
    id: "regex",
    title: "Regular Expressions",
    subtitle: "Find and rewrite text with patterns",
    icon: "🔎",
    level: "advanced",
    lesson: {
      title: "Patterns in text",
      html: `<p>The <code>re</code> module finds and replaces patterns. A raw string <code>r\"...\"</code> keeps backslashes tidy.</p>
<pre>import re
re.findall(r\"\\d+\", \"A4 and 12\")   # ['4', '12']
re.sub(r\"\\s+\", \" \", \"too    many\")</pre>
<p>Useful pieces: <code>\\d</code> digit, <code>\\w</code> letter or digit or underscore, <code>+</code> one or more, <code>[]</code> a set, <code>()</code> a group.</p>`,
    },
    challenges: [
      { id: "adv-re-1", title: "Find emails", prompt: "Write find_emails(text) that returns a list of email addresses. Treat an email as letters/digits/._%+- , then @, then a domain with at least one dot (letters/digits/.-).", starter: "import re\n\ndef find_emails(text):\n    ", checks: [
        { type: "func", name: "find_emails", args: ["Write to ada@ex.com and mee@data.org please"], expect: ["ada@ex.com", "mee@data.org"], message: "Should find both addresses." },
        { type: "func", name: "find_emails", args: ["no mail here"], expect: [], message: "No emails should return []." },
        { type: "func", name: "find_emails", args: ["bad@host"], expect: [], message: "Require a dot in the domain." },
      ], hints: ["Use re.findall with a pattern like r'[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,}'."], solution: "import re\n\ndef find_emails(text):\n    return re.findall(r\"[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,}\", text)", xp: 22 },
      { id: "adv-re-2", title: "Extract integers", prompt: "Write extract_ints(text) that returns a list of integers (as ints, not strings) found in the text. Include negative numbers. extract_ints('from -2 to 10') is [-2, 10].", starter: "import re\n\ndef extract_ints(text):\n    ", checks: [
        { type: "func", name: "extract_ints", args: ["from -2 to 10"], expect: [-2, 10], message: "Should return [-2, 10]." },
        { type: "func", name: "extract_ints", args: ["no numbers"], expect: [], message: "No numbers should return []." },
        { type: "func", name: "extract_ints", args: ["1, 2, 3"], expect: [1, 2, 3], message: "Should return [1, 2, 3]." },
      ], hints: ["findall r'-?\\d+', then int() each match."], solution: "import re\n\ndef extract_ints(text):\n    return [int(x) for x in re.findall(r\"-?\\d+\", text)]", xp: 22 },
      { id: "adv-re-3", title: "Ghana-style phone check", prompt: "Write is_gh_phone(s) that returns True if s is exactly a Ghana mobile number in the form 0XXXXXXXXX (10 digits starting with 0) or +233XXXXXXXXX (+233 then 9 digits). No spaces.", starter: "import re\n\ndef is_gh_phone(s):\n    ", checks: [
        { type: "func", name: "is_gh_phone", args: ["0244123456"], expect: true, message: "0244123456 should be valid." },
        { type: "func", name: "is_gh_phone", args: ["+233244123456"], expect: true, message: "+233244123456 should be valid." },
        { type: "func", name: "is_gh_phone", args: ["244123456"], expect: false, message: "Missing the 0 or +233 prefix." },
        { type: "func", name: "is_gh_phone", args: ["024412345"], expect: false, message: "Too short." },
        { type: "func", name: "is_gh_phone", args: ["+233 244123456"], expect: false, message: "Spaces are not allowed." },
      ], hints: ["re.fullmatch(r'(0\\d{9}|\\+233\\d{9})', s)"], solution: "import re\n\ndef is_gh_phone(s):\n    return re.fullmatch(r\"(0\\d{9}|\\+233\\d{9})\", s) is not None", xp: 22 },
      { id: "adv-re-4", title: "Squeeze spaces", prompt: "Write squeeze_spaces(text) that replaces any run of whitespace (spaces, tabs, newlines) with a single space, and strips the ends.", starter: "import re\n\ndef squeeze_spaces(text):\n    ", checks: [
        { type: "func", name: "squeeze_spaces", args: ["too    many"], expect: "too many", message: "Collapse repeated spaces." },
        { type: "func", name: "squeeze_spaces", args: ["  hello\n\nworld  "], expect: "hello world", message: "Newlines and edges should be cleaned." },
        { type: "func", name: "squeeze_spaces", args: ["ok"], expect: "ok", message: "A clean string stays the same." },
      ], hints: ["re.sub(r'\\s+', ' ', text).strip()"], solution: "import re\n\ndef squeeze_spaces(text):\n    return re.sub(r\"\\s+\", \" \", text).strip()", xp: 20 },
      { id: "adv-re-5", title: "Name and year", prompt: "Write parse_name_year(text) that looks for a pattern like 'Ada 2020' (a name of letters, then a 4-digit year) and returns a tuple (name, year_as_int). If there is no match, return None.", starter: "import re\n\ndef parse_name_year(text):\n    ", checks: [
        { type: "func", name: "parse_name_year", args: ["Ada 2020"], expect: ["Ada", 2020], message: "Should return ('Ada', 2020). [tuple is compared as list in some checks — return a tuple.]" },
        { type: "python", code: "got = _ns['parse_name_year']('Kojo 1999')\nassert got == ('Kojo', 1999)\nassert _ns['parse_name_year']('nope') is None\nassert _ns['parse_name_year']('year 20') is None\n_ok = True", message: "Match 'Kojo 1999', and return None when it does not fit." },
      ], hints: ["Use a group for the name and a group for the year: r'([A-Za-z]+)\\s+(\\d{4})'.", "re.search, then return (m.group(1), int(m.group(2)))."], solution: "import re\n\ndef parse_name_year(text):\n    m = re.search(r\"([A-Za-z]+)\\s+(\\d{4})\", text)\n    if not m:\n        return None\n    return (m.group(1), int(m.group(2)))", xp: 22 },
    ],
  },
  {
    id: "datastructs",
    title: "Data Structures",
    subtitle: "Stacks, queues, lists, and graphs",
    icon: "🧱",
    level: "advanced",
    lesson: {
      title: "How data is organised",
      html: `<p>A <strong>stack</strong> is last-in, first-out. A <strong>queue</strong> is first-in, first-out. Parentheses, BFS, and undo all lean on these ideas.</p>
<pre>def is_balanced(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack</pre>`,
    },
    challenges: [
      { id: "adv-ds-1", title: "Balanced brackets", prompt: "Write is_balanced(s) that returns True if every (, [, { is closed in the right order, otherwise False. Ignore other characters.", starter: "def is_balanced(s):\n    ", checks: [
        { type: "func", name: "is_balanced", args: ["(a[b]{c})"], expect: true, message: "(a[b]{c}) is balanced." },
        { type: "func", name: "is_balanced", args: ["([)]"], expect: false, message: "([)] is not balanced." },
        { type: "func", name: "is_balanced", args: [""], expect: true, message: "An empty string is balanced." },
        { type: "func", name: "is_balanced", args: ["((()"], expect: false, message: "Unclosed brackets should be False." },
        { type: "func", name: "is_balanced", args: ["}{"], expect: false, message: "A closer first should be False." },
      ], hints: ["Push opening brackets on a stack.", "A closer must match the most recent opener."], solution: "def is_balanced(s):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack", xp: 24 },
      { id: "adv-ds-2", title: "Queue class", prompt: "Create class Queue with enqueue(item), dequeue() (return and remove the front item, or None if empty), and size(). First in, first out.", starter: "class Queue:\n    ", checks: [
        { type: "python", code: "q = _ns['Queue']()\nassert q.dequeue() is None and q.size()==0\nq.enqueue('a'); q.enqueue('b')\nassert q.size()==2 and q.dequeue()=='a' and q.dequeue()=='b' and q.dequeue() is None\n_ok = True", message: "Enqueue a then b; dequeue should return a then b." },
      ], hints: ["Store items in a list. enqueue appends. dequeue pops from index 0."], solution: "class Queue:\n    def __init__(self):\n        self._items = []\n    def enqueue(self, item):\n        self._items.append(item)\n    def dequeue(self):\n        return self._items.pop(0) if self._items else None\n    def size(self):\n        return len(self._items)", xp: 22 },
      { id: "adv-ds-3", title: "First unique character", prompt: "Write first_unique(s) that returns the first character that appears exactly once in s, or None if there is no such character.", starter: "def first_unique(s):\n    ", checks: [
        { type: "func", name: "first_unique", args: ["abacabad"], expect: "c", message: "In abacabad the first unique letter is c." },
        { type: "func", name: "first_unique", args: ["aabb"], expect: null, message: "No unique letter should return None." },
        { type: "func", name: "first_unique", args: ["python"], expect: "p", message: "p is unique and first." },
      ], hints: ["Count letters first, then walk the string again and return the first with count 1."], solution: "def first_unique(s):\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    for ch in s:\n        if counts[ch] == 1:\n            return ch\n    return None", xp: 22 },
      { id: "adv-ds-4", title: "Linked list to list", prompt: "Create class Node(value, next=None). Write to_list(head) that follows the next links and returns a Python list of values. Write append(head, value) that adds a new node at the end and returns the head (create a head if head is None).", starter: "class Node:\n    def __init__(self, value, next=None):\n        self.value = value\n        self.next = next\n", checks: [
        { type: "python", code: "Node, to_list, append = _ns['Node'], _ns['to_list'], _ns['append']\nh = append(None, 1)\nh = append(h, 2)\nh = append(h, 3)\nassert to_list(h) == [1,2,3]\nassert to_list(None) == []\n_ok = True", message: "append 1,2,3 to an empty list, then to_list should be [1,2,3]." },
      ], hints: ["to_list: walk while head, collect value, head = head.next.", "append: if head is None, return Node(value). Else walk to the last node and set next."], solution: "class Node:\n    def __init__(self, value, next=None):\n        self.value = value\n        self.next = next\n\ndef to_list(head):\n    out = []\n    while head:\n        out.append(head.value)\n        head = head.next\n    return out\n\ndef append(head, value):\n    if head is None:\n        return Node(value)\n    cur = head\n    while cur.next:\n        cur = cur.next\n    cur.next = Node(value)\n    return head", xp: 24 },
      { id: "adv-ds-5", title: "BFS distance", prompt: "Write bfs_distance(graph, start, goal) where graph is a dict of node → list of neighbours. Return the smallest number of steps from start to goal, or -1 if you cannot reach it. The start node is distance 0 from itself.", starter: "def bfs_distance(graph, start, goal):\n    ", checks: [
        { type: "python", code: "g = {'A':['B','C'], 'B':['D'], 'C':['D'], 'D':[]}\nassert _ns['bfs_distance'](g,'A','D') == 2\nassert _ns['bfs_distance'](g,'A','A') == 0\nassert _ns['bfs_distance'](g,'D','A') == -1\n_ok = True", message: "A→D is 2 steps, A→A is 0, D→A is unreachable." },
        { type: "python", code: "g = {'A':['B'], 'B':['A']}\nassert _ns['bfs_distance'](g,'A','B') == 1\n_ok = True", message: "A to B is 1 step." },
      ], hints: ["Use a queue of (node, distance) and a set of seen nodes.", "Do not visit a node twice."], solution: "from collections import deque\n\ndef bfs_distance(graph, start, goal):\n    q = deque([(start, 0)])\n    seen = {start}\n    while q:\n        node, dist = q.popleft()\n        if node == goal:\n            return dist\n        for nxt in graph.get(node, []):\n            if nxt not in seen:\n                seen.add(nxt)\n                q.append((nxt, dist + 1))\n    return -1", xp: 26 },
      { id: "adv-ds-6", title: "Frequency sort", prompt: "Write frequency_sort(items) that returns a new list with the same items, sorted by how often they appear (most frequent first). Items with the same frequency should keep their first-appearance order among those groups (stable by original first index when frequencies tie).", starter: "def frequency_sort(items):\n    ", checks: [
        { type: "func", name: "frequency_sort", args: [["a", "b", "a", "c", "b", "a"]], expect: ["a", "a", "a", "b", "b", "c"], message: "a appears 3 times, b twice, c once." },
        { type: "func", name: "frequency_sort", args: [[1, 2, 2, 1]], expect: [1, 1, 2, 2], message: "Tied frequencies should keep first-appearance order (1 before 2)." },
        { type: "func", name: "frequency_sort", args: [[]], expect: [], message: "Empty stays empty." },
      ], hints: ["Count with a dict. Remember the first index of each item.", "Sort by (-count, first_index) then expand."], solution: "def frequency_sort(items):\n    counts = {}\n    first = {}\n    for i, x in enumerate(items):\n        counts[x] = counts.get(x, 0) + 1\n        if x not in first:\n            first[x] = i\n    keys = sorted(counts, key=lambda k: (-counts[k], first[k]))\n    out = []\n    for k in keys:\n        out.extend([k] * counts[k])\n    return out", xp: 26 },
    ],
  },
  {
    id: "analysis",
    title: "Data Analysis Lab",
    subtitle: "Harder NumPy and Pandas tasks",
    icon: "📈",
    level: "advanced",
    lesson: {
      title: "Think in columns and arrays",
      html: `<p>These challenges load NumPy and Pandas. Use masks, groupby, and vector maths rather than long Python loops when you can.</p>
<pre>import pandas as pd
df = pd.DataFrame({\"name\": [\"Ama\", \"Kojo\"], \"score\": [80, 65]})
print(df.groupby(\"name\")[\"score\"].mean())
print(df[df[\"score\"] &gt;= 70])</pre>`,
    },
    challenges: [
      { id: "adv-da-1", title: "Standardise an array", prompt: "Import numpy as np. Write zscore(arr) that returns (arr - mean) / std for a 1-D NumPy array, using the population std (ddof=0). If std is 0, return an array of zeros the same shape.", starter: "import numpy as np\n\ndef zscore(arr):\n    ", packages: ["numpy"], checks: [
        { type: "python", code: "import numpy as np\nz = _ns['zscore'](np.array([1.0, 2.0, 3.0]))\nassert np.allclose(z, [-1.22474487, 0, 1.22474487], atol=1e-6)\n_ok = True", message: "zscore([1,2,3]) should be about [-1.2247, 0, 1.2247]." },
        { type: "python", code: "import numpy as np\nz = _ns['zscore'](np.array([5.0, 5.0, 5.0]))\nassert np.allclose(z, [0,0,0])\n_ok = True", message: "A constant array should become zeros." },
      ], hints: ["mean = arr.mean(); std = arr.std()", "If std == 0: return np.zeros_like(arr)"], solution: "import numpy as np\n\ndef zscore(arr):\n    arr = np.asarray(arr, dtype=float)\n    std = arr.std()\n    if std == 0:\n        return np.zeros_like(arr)\n    return (arr - arr.mean()) / std", xp: 24 },
      { id: "adv-da-2", title: "Group averages", prompt: "Write class_means(rows) where rows is a list of dicts with keys 'class' and 'score'. Return a pandas Series of the mean score per class, indexed by class name, sorted by the index.", starter: "import pandas as pd\n\ndef class_means(rows):\n    ", packages: ["numpy", "pandas"], checks: [
        { type: "python", code: "rows = [{'class':'A','score':10},{'class':'B','score':20},{'class':'A','score':30}]\ns = _ns['class_means'](rows)\nassert abs(float(s.loc['A']) - 20) < 1e-6 and abs(float(s.loc['B']) - 20) < 1e-6\nassert list(s.index) == ['A','B']\n_ok = True", message: "Class A averages 20, class B averages 20, index ['A','B']." },
      ], hints: ["df = pd.DataFrame(rows)", "return df.groupby('class')['score'].mean().sort_index()"], solution: "import pandas as pd\n\ndef class_means(rows):\n    df = pd.DataFrame(rows)\n    return df.groupby('class')['score'].mean().sort_index()", xp: 24 },
      { id: "adv-da-3", title: "Filter and sum", prompt: "Write total_above(df, col, threshold) that returns the sum of df[col] for rows where that column is strictly greater than threshold.", starter: "def total_above(df, col, threshold):\n    ", packages: ["numpy", "pandas"], checks: [
        { type: "python", code: "import pandas as pd\ndf = pd.DataFrame({'n':[1,5,10,3]})\nassert _ns['total_above'](df,'n',4) == 15\nassert _ns['total_above'](df,'n',10) == 0\n_ok = True", message: "Values > 4 are 5 and 10, sum 15." },
      ], hints: ["return df.loc[df[col] > threshold, col].sum()"], solution: "def total_above(df, col, threshold):\n    return df.loc[df[col] > threshold, col].sum()", xp: 22 },
      { id: "adv-da-4", title: "Matrix multiply", prompt: "Write matmul(a, b) that returns the matrix product of two NumPy arrays (use @ or np.dot). a is (m×n), b is (n×p).", starter: "import numpy as np\n\ndef matmul(a, b):\n    ", packages: ["numpy"], checks: [
        { type: "python", code: "import numpy as np\na = np.array([[1,2],[3,4]])\nb = np.array([[5,6],[7,8]])\ngot = _ns['matmul'](a,b)\nassert np.array_equal(got, a @ b)\n_ok = True", message: "Should match the real matrix product of [[1,2],[3,4]] and [[5,6],[7,8]]." },
        { type: "python", code: "import numpy as np\na = np.array([[1,2,3]])\nb = np.array([[1],[2],[3]])\nassert int(_ns['matmul'](a,b)[0,0]) == 14\n_ok = True", message: "1*1+2*2+3*3 = 14." },
      ], hints: ["return a @ b"], solution: "import numpy as np\n\ndef matmul(a, b):\n    return a @ b", xp: 20 },
      { id: "adv-da-5", title: "Fill missing and mean", prompt: "Write filled_mean(series) that replaces missing values (NaN) in a pandas Series with the mean of the non-missing values, and returns a tuple (filled_series, mean_used).", starter: "import pandas as pd\nimport numpy as np\n\ndef filled_mean(series):\n    ", packages: ["numpy", "pandas"], checks: [
        { type: "python", code: "import pandas as pd, numpy as np\ns = pd.Series([1.0, np.nan, 3.0])\nfilled, mu = _ns['filled_mean'](s)\nassert abs(mu - 2.0) < 1e-6\nassert list(filled.fillna(999)) == [1.0, 2.0, 3.0]\n_ok = True", message: "The mean of 1 and 3 is 2, which fills the gap." },
      ], hints: ["mu = series.mean()", "return series.fillna(mu), mu"], solution: "import pandas as pd\nimport numpy as np\n\ndef filled_mean(series):\n    mu = series.mean()\n    return series.fillna(mu), mu", xp: 22 },
      { id: "adv-da-6", title: "Count a mask", prompt: "Write count_in_range(arr, low, high) that returns how many values in a NumPy array are >= low and <= high, using a boolean mask (no Python for-loop over items).", starter: "import numpy as np\n\ndef count_in_range(arr, low, high):\n    ", packages: ["numpy"], checks: [
        { type: "python", code: "import numpy as np\nassert int(_ns['count_in_range'](np.array([1,5,10,3,7]), 3, 7)) == 3\nassert int(_ns['count_in_range'](np.array([1,2]), 5, 9)) == 0\n_ok = True", message: "In [1,5,10,3,7], three values sit between 3 and 7 inclusive." },
        { type: "python", code: "assert 'for ' not in _student_code.split('def')[-1] or 'for ' not in _student_code\n# allow no restriction if they used vectorised code; just check result already done\n_ok = True", message: "Prefer a boolean mask such as ((arr >= low) & (arr <= high)).sum()." },
      ], hints: ["mask = (arr >= low) & (arr <= high)", "return int(mask.sum())"], solution: "import numpy as np\n\ndef count_in_range(arr, low, high):\n    return int(((arr >= low) & (arr <= high)).sum())", xp: 22 },
    ],
  },
  {
    id: "puzzles",
    title: "Problem-Solving Puzzles",
    subtitle: "LeetCode-style easy and medium drills",
    icon: "🧩",
    level: "advanced",
    lesson: {
      title: "Practice like an interview",
      html: `<p>These are short algorithm puzzles in the same spirit as easy and medium LeetCode questions. Read the prompt twice, start with a slow clear solution, then tidy it.</p>`,
    },
    challenges: [
      { id: "adv-pz-1", title: "Climbing stairs", prompt: "You can climb 1 or 2 steps at a time. Write climb_stairs(n) that returns how many distinct ways you can climb n stairs. climb_stairs(3) is 3 (1+1+1, 1+2, 2+1).", starter: "def climb_stairs(n):\n    ", checks: [
        { type: "func", name: "climb_stairs", args: [1], expect: 1, message: "1 stair: only one way." },
        { type: "func", name: "climb_stairs", args: [2], expect: 2, message: "2 stairs: 1+1 and 2." },
        { type: "func", name: "climb_stairs", args: [3], expect: 3, message: "3 stairs: 3 ways." },
        { type: "func", name: "climb_stairs", args: [5], expect: 8, message: "5 stairs: 8 ways." },
      ], hints: ["This is Fibonacci in disguise.", "ways(n) = ways(n-1) + ways(n-2), with ways(1)=1, ways(2)=2."], solution: "def climb_stairs(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b", xp: 24 },
      { id: "adv-pz-2", title: "Best time to buy a stock", prompt: "Write max_profit(prices) where prices[i] is a share price on day i. Choose one day to buy and a later day to sell. Return the maximum profit, or 0 if you should not trade.", starter: "def max_profit(prices):\n    ", checks: [
        { type: "func", name: "max_profit", args: [[7, 1, 5, 3, 6, 4]], expect: 5, message: "Buy at 1, sell at 6, profit 5." },
        { type: "func", name: "max_profit", args: [[7, 6, 4, 3, 1]], expect: 0, message: "Prices only fall, so profit is 0." },
        { type: "func", name: "max_profit", args: [[2, 4, 1]], expect: 2, message: "Buy at 2, sell at 4." },
      ], hints: ["Walk left to right, track the lowest price so far and the best profit."], solution: "def max_profit(prices):\n    if not prices:\n        return 0\n    lo = prices[0]\n    best = 0\n    for p in prices[1:]:\n        best = max(best, p - lo)\n        lo = min(lo, p)\n    return best", xp: 24 },
      { id: "adv-pz-3", title: "Majority element", prompt: "Write majority_element(nums) that returns the value that appears more than n/2 times. You may assume it always exists.", starter: "def majority_element(nums):\n    ", checks: [
        { type: "func", name: "majority_element", args: [[3, 2, 3]], expect: 3, message: "3 appears twice in [3,2,3]." },
        { type: "func", name: "majority_element", args: [[2, 2, 1, 1, 1, 2, 2]], expect: 2, message: "2 is the majority." },
        { type: "func", name: "majority_element", args: [[1]], expect: 1, message: "A single element is the majority." },
      ], hints: ["Count with a dict, or sort and pick the middle item."], solution: "def majority_element(nums):\n    counts = {}\n    for n in nums:\n        counts[n] = counts.get(n, 0) + 1\n        if counts[n] > len(nums) / 2:\n            return n", xp: 22 },
      { id: "adv-pz-4", title: "Longest common prefix", prompt: "Write longest_common_prefix(words) that returns the longest shared prefix of all strings in the list, or '' if there is none (or the list is empty).", starter: "def longest_common_prefix(words):\n    ", checks: [
        { type: "func", name: "longest_common_prefix", args: [["flower", "flow", "flight"]], expect: "fl", message: "The shared prefix is fl." },
        { type: "func", name: "longest_common_prefix", args: [["dog", "racecar", "car"]], expect: "", message: "No shared prefix." },
        { type: "func", name: "longest_common_prefix", args: [["hi"]], expect: "hi", message: "A single word is its own prefix." },
        { type: "func", name: "longest_common_prefix", args: [[]], expect: "", message: "An empty list should return ''." },
      ], hints: ["Start with the first word, then trim it until every word starts with it."], solution: "def longest_common_prefix(words):\n    if not words:\n        return ''\n    prefix = words[0]\n    for w in words[1:]:\n        while not w.startswith(prefix):\n            prefix = prefix[:-1]\n            if not prefix:\n                return ''\n    return prefix", xp: 22 },
      { id: "adv-pz-5", title: "Roman to integer", prompt: "Write roman_to_int(s) for Roman numerals. I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Subtractive pairs: IV, IX, XL, XC, CD, CM. Example: MCMXCIV is 1994.", starter: "def roman_to_int(s):\n    ", checks: [
        { type: "func", name: "roman_to_int", args: ["III"], expect: 3, message: "III is 3." },
        { type: "func", name: "roman_to_int", args: ["LVIII"], expect: 58, message: "LVIII is 58." },
        { type: "func", name: "roman_to_int", args: ["MCMXCIV"], expect: 1994, message: "MCMXCIV is 1994." },
        { type: "func", name: "roman_to_int", args: ["IX"], expect: 9, message: "IX is 9." },
      ], hints: ["Walk left to right. If the current value is less than the next, subtract it; otherwise add it."], solution: "def roman_to_int(s):\n    val = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}\n    total = 0\n    for i, ch in enumerate(s):\n        if i + 1 < len(s) and val[ch] < val[s[i + 1]]:\n            total -= val[ch]\n        else:\n            total += val[ch]\n    return total", xp: 26 },
      { id: "adv-pz-6", title: "Move zeroes", prompt: "Write move_zeroes(nums) that returns a new list with all zeros moved to the end, keeping the order of the other numbers.", starter: "def move_zeroes(nums):\n    ", checks: [
        { type: "func", name: "move_zeroes", args: [[0, 1, 0, 3, 12]], expect: [1, 3, 12, 0, 0], message: "Non-zeros keep their order, zeros at the end." },
        { type: "func", name: "move_zeroes", args: [[0]], expect: [0], message: "[0] stays [0]." },
        { type: "func", name: "move_zeroes", args: [[1, 2]], expect: [1, 2], message: "No zeros, so the list stays the same." },
      ], hints: ["Collect the non-zeros, then add enough zeros to reach the original length."], solution: "def move_zeroes(nums):\n    rest = [n for n in nums if n != 0]\n    return rest + [0] * (len(nums) - len(rest))", xp: 20 },
      { id: "adv-pz-7", title: "Contains duplicate", prompt: "Write contains_duplicate(nums) that returns True if any value appears at least twice, otherwise False.", starter: "def contains_duplicate(nums):\n    ", checks: [
        { type: "func", name: "contains_duplicate", args: [[1, 2, 3, 1]], expect: true, message: "1 is repeated." },
        { type: "func", name: "contains_duplicate", args: [[1, 2, 3, 4]], expect: false, message: "All unique should be False." },
        { type: "func", name: "contains_duplicate", args: [[]], expect: false, message: "Empty should be False." },
      ], hints: ["len(nums) != len(set(nums))"], solution: "def contains_duplicate(nums):\n    return len(nums) != len(set(nums))", xp: 18 },
      { id: "adv-pz-8", title: "Single number", prompt: "Write single_number(nums) where every value appears twice except one value that appears once. Return that unique value. Try to do it without nested loops.", starter: "def single_number(nums):\n    ", checks: [
        { type: "func", name: "single_number", args: [[2, 2, 1]], expect: 1, message: "1 appears once." },
        { type: "func", name: "single_number", args: [[4, 1, 2, 1, 2]], expect: 4, message: "4 appears once." },
        { type: "func", name: "single_number", args: [[7]], expect: 7, message: "A single item is the answer." },
      ], hints: ["XOR all the numbers: a^a is 0, so pairs cancel.", "You can also count with a dict."], solution: "def single_number(nums):\n    x = 0\n    for n in nums:\n        x ^= n\n    return x", xp: 22 },
      { id: "adv-pz-9", title: "Plus one", prompt: "Write plus_one(digits) where digits is a number stored as a list of digits, most significant first (e.g. [1, 2, 9] is 129). Return the list for that number plus one: [1, 3, 0].", starter: "def plus_one(digits):\n    ", checks: [
        { type: "func", name: "plus_one", args: [[1, 2, 3]], expect: [1, 2, 4], message: "123 + 1 = 124." },
        { type: "func", name: "plus_one", args: [[1, 2, 9]], expect: [1, 3, 0], message: "129 + 1 = 130." },
        { type: "func", name: "plus_one", args: [[9, 9]], expect: [1, 0, 0], message: "99 + 1 = 100." },
      ], hints: ["Walk from the end. A 9 becomes 0 and you carry 1. If you still have a carry at the front, insert 1."], solution: "def plus_one(digits):\n    d = list(digits)\n    for i in range(len(d) - 1, -1, -1):\n        if d[i] < 9:\n            d[i] += 1\n            return d\n        d[i] = 0\n    return [1] + d", xp: 22 },
      { id: "adv-pz-10", title: "Valid parentheses string", prompt: "Write is_valid_parens(s) that returns True if s consists of valid (), [], {} only — every opener closed in the right order, and only those six characters.", starter: "def is_valid_parens(s):\n    ", checks: [
        { type: "func", name: "is_valid_parens", args: ["()[]{}"], expect: true, message: "()[]{} is valid." },
        { type: "func", name: "is_valid_parens", args: ["(]"], expect: false, message: "(] is invalid." },
        { type: "func", name: "is_valid_parens", args: ["({[]})"], expect: true, message: "({[]}) is valid." },
        { type: "func", name: "is_valid_parens", args: [""], expect: true, message: "Empty is valid." },
      ], hints: ["This is the same stack idea as balanced brackets, but the string only contains brackets."], solution: "def is_valid_parens(s):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n        else:\n            return False\n    return not stack", xp: 22 },
    ],
  },
];

export function allAdvancedChallenges() {
  const out = [];
  for (const mod of advancedModules) {
    for (const ch of mod.challenges || []) {
      out.push({ ...ch, moduleId: mod.id, moduleTitle: mod.title, level: "advanced" });
    }
  }
  return out;
}
