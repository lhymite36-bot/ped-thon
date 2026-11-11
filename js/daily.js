import { todayStamp } from "./storage.js";

export const dailyChallenges = [
  {
    id: "d-fizz",
    level: "beginner",
    title: "Fizz at five",
    prompt: "Print the numbers 1 to 15, each on its own line, but print Fizz instead of the number when it is a multiple of 5.",
    starter: "",
    checks: [{
      type: "stdout_lines",
      value: ["1","2","3","4","Fizz","6","7","8","9","Fizz","11","12","13","14","Fizz"],
      message: "Print 1–15, replacing multiples of 5 with Fizz.",
    }],
    hints: [
      "Loop from 1 to 15 with range(1, 16).",
      "A multiple of 5 has n % 5 == 0.",
      "if n % 5 == 0: print(\"Fizz\") else: print(n)",
    ],
    solution: "for n in range(1, 16):\n    if n % 5 == 0:\n        print(\"Fizz\")\n    else:\n        print(n)",
    xp: 20,
  },
  {
    id: "d-reverse",
    level: "beginner",
    title: "Backwards word",
    prompt: "Set word = \"python\" and print it reversed (nohtyP — wait, the word is lowercase, so it should print nohtyp).",
    starter: "word = \"python\"\n",
    checks: [{ type: "stdout_equals", value: "nohtyp", message: "Print python reversed: nohtyp." }],
    hints: [
      "A slice of [::-1] reverses a string.",
      "print(word[::-1])",
    ],
    solution: "word = \"python\"\nprint(word[::-1])",
    xp: 16,
  },
  {
    id: "d-max",
    level: "beginner",
    title: "The biggest",
    prompt: "nums = [4, 17, 9, 2, 13]. Print the largest number. You may use max() or a loop.",
    starter: "nums = [4, 17, 9, 2, 13]\n",
    checks: [{ type: "stdout_equals", value: "17", message: "Print 17." }],
    hints: ["max(nums) returns the largest item.", "print(max(nums))"],
    solution: "nums = [4, 17, 9, 2, 13]\nprint(max(nums))",
    xp: 14,
  },
  {
    id: "d-count-a",
    level: "beginner",
    title: "How many A's",
    prompt: "text = \"Anaconda and data\". Count how many times the letter a appears, ignoring case, store it in count, and print count.",
    starter: "text = \"Anaconda and data\"\n",
    checks: [
      { type: "var_equals", name: "count", value: 6, message: "There are 6 letter a's if you ignore case." },
      { type: "stdout_contains", value: "6", message: "Print 6." },
    ],
    hints: [
      "Lowercase the text first so A and a count together.",
      "The string method .count(\"a\") is useful.",
      "count = text.lower().count(\"a\")\nprint(count)",
    ],
    solution: "text = \"Anaconda and data\"\ncount = text.lower().count(\"a\")\nprint(count)",
    xp: 16,
  },
  {
    id: "d-join",
    level: "beginner",
    title: "Comma list",
    prompt: "words = [\"red\", \"green\", \"blue\"]. Print them as one string joined with commas and a space: red, green, blue",
    starter: "words = [\"red\", \"green\", \"blue\"]\n",
    checks: [{ type: "stdout_equals", value: "red, green, blue", message: "Print red, green, blue" }],
    hints: [
      "\", \".join(words) joins a list with that separator.",
      "print(\", \".join(words))",
    ],
    solution: "words = [\"red\", \"green\", \"blue\"]\nprint(\", \".join(words))",
    xp: 16,
  },
  {
    id: "d-dict-sum",
    level: "beginner",
    title: "Add the scores",
    prompt: "scores = {\"math\": 80, \"english\": 70, \"science\": 90}. Print the total of all the values.",
    starter: "scores = {\"math\": 80, \"english\": 70, \"science\": 90}\n",
    checks: [{ type: "stdout_equals", value: "240", message: "Print 240." }],
    hints: ["scores.values() gives the numbers.", "print(sum(scores.values()))"],
    solution: "scores = {\"math\": 80, \"english\": 70, \"science\": 90}\nprint(sum(scores.values()))",
    xp: 16,
  },
  {
    id: "d-palindrome",
    level: "intermediate",
    title: "Palindrome check",
    prompt: "Write is_palindrome(s) that returns True if s reads the same forwards and backwards, and False otherwise. Compare the string as it is (do not change case).",
    starter: "def is_palindrome(s):\n    ",
    checks: [
      { type: "func", name: "is_palindrome", args: ["level"], expect: true, message: "level is a palindrome." },
      { type: "func", name: "is_palindrome", args: ["python"], expect: false, message: "python is not a palindrome." },
      { type: "func", name: "is_palindrome", args: ["aa"], expect: true, message: "aa is a palindrome." },
    ],
    hints: [
      "Compare s with s[::-1].",
      "return s == s[::-1]",
    ],
    solution: "def is_palindrome(s):\n    return s == s[::-1]",
    xp: 20,
  },
  {
    id: "d-unique-words",
    level: "intermediate",
    title: "Unique words",
    prompt: "sentence = \"data data science is fun\". Create a variable n that is the number of unique words, and print n.",
    starter: "sentence = \"data data science is fun\"\n",
    checks: [
      { type: "var_equals", name: "n", value: 4, message: "There are 4 unique words." },
      { type: "stdout_equals", value: "4", message: "Print 4." },
    ],
    hints: [
      "sentence.split() breaks the text into words.",
      "A set drops duplicates.",
      "n = len(set(sentence.split()))\nprint(n)",
    ],
    solution: "sentence = \"data data science is fun\"\nn = len(set(sentence.split()))\nprint(n)",
    xp: 16,
  },
  {
    id: "d-factorial",
    level: "intermediate",
    title: "Factorial of 6",
    prompt: "Compute 6 factorial (6 × 5 × 4 × 3 × 2 × 1) with a loop, store it in a variable named result, and print it.",
    starter: "result = 1\n",
    checks: [
      { type: "var_equals", name: "result", value: 720, message: "6! is 720." },
      { type: "stdout_contains", value: "720", message: "Print 720." },
    ],
    hints: [
      "Start with result = 1 and multiply by each number from 1 to 6.",
      "for i in range(1, 7):\n    result = result * i",
    ],
    solution: "result = 1\nfor i in range(1, 7):\n    result = result * i\nprint(result)",
    xp: 18,
  },
  {
    id: "d-filter-len",
    level: "intermediate",
    title: "Long words",
    prompt: "words = [\"hi\", \"python\", \"ai\", \"science\", \"ok\"]. Create long as the list of words with more than 3 letters, then print long.",
    starter: "words = [\"hi\", \"python\", \"ai\", \"science\", \"ok\"]\n",
    checks: [
      { type: "var_equals", name: "long", value: ["python", "science"], message: "long should be ['python', 'science']." },
    ],
    hints: [
      "Use a list comprehension with if len(w) > 3.",
      "long = [w for w in words if len(w) > 3]\nprint(long)",
    ],
    solution: "words = [\"hi\", \"python\", \"ai\", \"science\", \"ok\"]\nlong = [w for w in words if len(w) > 3]\nprint(long)",
    xp: 16,
  },
  {
    id: "d-title",
    level: "beginner",
    title: "Title case",
    prompt: "title = \"data science with python\". Print it in title case: Data Science With Python",
    starter: "title = \"data science with python\"\n",
    checks: [{ type: "stdout_equals", value: "Data Science With Python", message: "Print Data Science With Python" }],
    hints: ["Strings have a .title() method.", "print(title.title())"],
    solution: "title = \"data science with python\"\nprint(title.title())",
    xp: 12,
  },
  {
    id: "d-minmax",
    level: "beginner",
    title: "Spread",
    prompt: "temps = [28, 31, 27, 34, 30]. Print the difference between the highest and the lowest value.",
    starter: "temps = [28, 31, 27, 34, 30]\n",
    checks: [{ type: "stdout_equals", value: "7", message: "34 - 27 is 7." }],
    hints: ["Use max() and min().", "print(max(temps) - min(temps))"],
    solution: "temps = [28, 31, 27, 34, 30]\nprint(max(temps) - min(temps))",
    xp: 14,
  },
  {
    id: "d-initials",
    level: "beginner",
    title: "Initials",
    prompt: "full = \"Pedro Eshun\". Print the initials with dots: P.E.",
    starter: "full = \"Pedro Eshun\"\n",
    checks: [{ type: "stdout_equals", value: "P.E.", message: "Print P.E." }],
    hints: [
      "Split the name into words, then take the first letter of each.",
      "parts = full.split()\nprint(parts[0][0] + \".\" + parts[1][0] + \".\")",
    ],
    solution: "full = \"Pedro Eshun\"\nparts = full.split()\nprint(parts[0][0] + \".\" + parts[1][0] + \".\")",
    xp: 18,
  },
  {
    id: "d-seconds",
    level: "beginner",
    title: "Hours and minutes",
    prompt: "Write to_seconds(hours, minutes) that returns the total number of seconds.",
    starter: "def to_seconds(hours, minutes):\n    ",
    checks: [
      { type: "func", name: "to_seconds", args: [1, 0], expect: 3600, message: "1 hour is 3600 seconds." },
      { type: "func", name: "to_seconds", args: [0, 2], expect: 120, message: "2 minutes is 120 seconds." },
      { type: "func", name: "to_seconds", args: [1, 1], expect: 3660, message: "1 hour 1 minute is 3660 seconds." },
    ],
    hints: [
      "An hour has 3600 seconds. A minute has 60.",
      "return hours * 3600 + minutes * 60",
    ],
    solution: "def to_seconds(hours, minutes):\n    return hours * 3600 + minutes * 60",
    xp: 16,
  },

  {
    id: "d-two-sum",
    level: "advanced",
    title: "Two sum indices",
    prompt: "Write two_sum(nums, target) that returns a list of two indices i, j (i < j) such that nums[i] + nums[j] == target. You may assume exactly one solution exists.",
    starter: "def two_sum(nums, target):\n    ",
    checks: [
      { type: "func", name: "two_sum", args: [[2, 7, 11, 15], 9], expect: [0, 1], message: "2 + 7 = 9 at indices 0 and 1." },
      { type: "func", name: "two_sum", args: [[3, 2, 4], 6], expect: [1, 2], message: "2 + 4 = 6 at indices 1 and 2." },
    ],
    hints: ["A dict of value to index lets you find target - num in one pass."],
    solution: "def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i",
    xp: 24,
  },
  {
    id: "d-anagram",
    level: "advanced",
    title: "Valid anagram",
    prompt: "Write is_anagram(s, t) that returns True if t uses exactly the same letters as s, otherwise False.",
    starter: "def is_anagram(s, t):\n    ",
    checks: [
      { type: "func", name: "is_anagram", args: ["listen", "silent"], expect: true, message: "listen / silent should be True." },
      { type: "func", name: "is_anagram", args: ["rat", "car"], expect: false, message: "rat / car should be False." },
    ],
    hints: ["sorted(s) == sorted(t) is a quick check."],
    solution: "def is_anagram(s, t):\n    return sorted(s) == sorted(t)",
    xp: 20,
  },
  {
    id: "d-brackets",
    level: "advanced",
    title: "Balanced brackets",
    prompt: "Write is_balanced(s) that returns True if every (, [, { is closed in the right order, otherwise False. Ignore other characters.",
    starter: "def is_balanced(s):\n    ",
    checks: [
      { type: "func", name: "is_balanced", args: ["(a[b]{c})"], expect: true, message: "(a[b]{c}) is balanced." },
      { type: "func", name: "is_balanced", args: ["([)]"], expect: false, message: "([)] is not balanced." },
      { type: "func", name: "is_balanced", args: ["((()"], expect: false, message: "Unclosed brackets should be False." },
    ],
    hints: ["Push opening brackets on a stack. A closer must match the most recent opener."],
    solution: "def is_balanced(s):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack",
    xp: 24,
  },
  {
    id: "d-climb",
    level: "advanced",
    title: "Climbing stairs",
    prompt: "You can climb 1 or 2 steps at a time. Write climb_stairs(n) that returns how many distinct ways you can climb n stairs.",
    starter: "def climb_stairs(n):\n    ",
    checks: [
      { type: "func", name: "climb_stairs", args: [2], expect: 2, message: "2 stairs: 2 ways." },
      { type: "func", name: "climb_stairs", args: [5], expect: 8, message: "5 stairs: 8 ways." },
    ],
    hints: ["ways(n) = ways(n-1) + ways(n-2), with ways(1)=1, ways(2)=2."],
    solution: "def climb_stairs(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b",
    xp: 24,
  },
  {
    id: "d-stock",
    level: "advanced",
    title: "Best stock profit",
    prompt: "Write max_profit(prices) that returns the best profit from buying on one day and selling on a later day, or 0 if you should not trade.",
    starter: "def max_profit(prices):\n    ",
    checks: [
      { type: "func", name: "max_profit", args: [[7, 1, 5, 3, 6, 4]], expect: 5, message: "Buy at 1, sell at 6, profit 5." },
      { type: "func", name: "max_profit", args: [[7, 6, 4, 3, 1]], expect: 0, message: "Prices only fall, so profit is 0." },
    ],
    hints: ["Track the lowest price so far and the best profit as you walk the list."],
    solution: "def max_profit(prices):\n    if not prices:\n        return 0\n    lo = prices[0]\n    best = 0\n    for p in prices[1:]:\n        best = max(best, p - lo)\n        lo = min(lo, p)\n    return best",
    xp: 24,
  },
  {
    id: "d-roman",
    level: "advanced",
    title: "Roman to integer",
    prompt: "Write roman_to_int(s). I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Subtractive pairs include IV, IX, XL, XC, CD, CM. MCMXCIV is 1994.",
    starter: "def roman_to_int(s):\n    ",
    checks: [
      { type: "func", name: "roman_to_int", args: ["LVIII"], expect: 58, message: "LVIII is 58." },
      { type: "func", name: "roman_to_int", args: ["MCMXCIV"], expect: 1994, message: "MCMXCIV is 1994." },
    ],
    hints: ["If the current value is less than the next, subtract it; otherwise add it."],
    solution: "def roman_to_int(s):\n    val = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}\n    total = 0\n    for i, ch in enumerate(s):\n        if i + 1 < len(s) and val[ch] < val[s[i + 1]]:\n            total -= val[ch]\n        else:\n            total += val[ch]\n    return total",
    xp: 26,
  },
  {
    id: "d-flatten",
    level: "advanced",
    title: "Flatten nested lists",
    prompt: "Write flatten(items) that takes a list which may contain more lists (any depth) and returns one flat list of the non-list values, in order.",
    starter: "def flatten(items):\n    ",
    checks: [
      { type: "func", name: "flatten", args: [[1, [2, 3], [[4]]]], expect: [1, 2, 3, 4], message: "flatten([1, [2, 3], [[4]]]) should be [1, 2, 3, 4]." },
      { type: "func", name: "flatten", args: [[[1], 2, [3, [4, 5]]]], expect: [1, 2, 3, 4, 5], message: "Deeper nesting should also flatten." },
    ],
    hints: ["If an item is a list, extend with flatten(item)."],
    solution: "def flatten(items):\n    out = []\n    for x in items:\n        if isinstance(x, list):\n            out.extend(flatten(x))\n        else:\n            out.append(x)\n    return out",
    xp: 24,
  },
  {
    id: "d-first-unique",
    level: "advanced",
    title: "First unique letter",
    prompt: "Write first_unique(s) that returns the first character that appears exactly once in s, or None if there is no such character.",
    starter: "def first_unique(s):\n    ",
    checks: [
      { type: "func", name: "first_unique", args: ["abacabad"], expect: "c", message: "In abacabad the first unique letter is c." },
      { type: "func", name: "first_unique", args: ["aabb"], expect: null, message: "No unique letter should return None." },
    ],
    hints: ["Count letters first, then walk the string again and return the first with count 1."],
    solution: "def first_unique(s):\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    for ch in s:\n        if counts[ch] == 1:\n            return ch\n    return None",
    xp: 22,
  },
  {
    id: "d-plus-one",
    level: "advanced",
    title: "Plus one to digits",
    prompt: "Write plus_one(digits) where digits is a number stored as a list of digits (e.g. [1, 2, 9] is 129). Return the list for that number plus one.",
    starter: "def plus_one(digits):\n    ",
    checks: [
      { type: "func", name: "plus_one", args: [[1, 2, 9]], expect: [1, 3, 0], message: "129 + 1 = 130." },
      { type: "func", name: "plus_one", args: [[9, 9]], expect: [1, 0, 0], message: "99 + 1 = 100." },
    ],
    hints: ["Walk from the end. A 9 becomes 0 and you carry 1."],
    solution: "def plus_one(digits):\n    d = list(digits)\n    for i in range(len(d) - 1, -1, -1):\n        if d[i] < 9:\n            d[i] += 1\n            return d\n        d[i] = 0\n    return [1] + d",
    xp: 22,
  },
  {
    id: "d-binsearch",
    level: "advanced",
    title: "Binary search",
    prompt: "Write binary_search(arr, target) that takes a sorted list and returns the index of target, or -1 if it is missing.",
    starter: "def binary_search(arr, target):\n    ",
    checks: [
      { type: "func", name: "binary_search", args: [[1, 3, 5, 7, 9], 7], expect: 3, message: "7 is at index 3." },
      { type: "func", name: "binary_search", args: [[1, 3, 5, 7, 9], 2], expect: -1, message: "2 is missing, so return -1." },
    ],
    hints: ["Keep lo and hi indices and look at the middle."],
    solution: "def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target:\n            return mid\n        if arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1",
    xp: 24,
  },
  {
    id: "d-emails",
    level: "advanced",
    title: "Find the emails",
    prompt: "Write find_emails(text) that returns a list of email addresses. An email is letters/digits/._%+- , then @, then a domain with at least one dot.",
    starter: "import re\n\ndef find_emails(text):\n    ",
    checks: [
      { type: "func", name: "find_emails", args: ["Write to ada@ex.com and mee@data.org please"], expect: ["ada@ex.com", "mee@data.org"], message: "Should find both addresses." },
      { type: "func", name: "find_emails", args: ["no mail here"], expect: [], message: "No emails should return []." },
    ],
    hints: ["Use re.findall with a pattern like r'[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,}'."],
    solution: "import re\n\ndef find_emails(text):\n    return re.findall(r\"[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,}\", text)",
    xp: 22,
  },
  {
    id: "d-majority",
    level: "advanced",
    title: "Majority element",
    prompt: "Write majority_element(nums) that returns the value that appears more than n/2 times. You may assume it always exists.",
    starter: "def majority_element(nums):\n    ",
    checks: [
      { type: "func", name: "majority_element", args: [[3, 2, 3]], expect: 3, message: "3 appears twice in [3,2,3]." },
      { type: "func", name: "majority_element", args: [[2, 2, 1, 1, 1, 2, 2]], expect: 2, message: "2 is the majority." },
    ],
    hints: ["Count with a dict, or sort and pick the middle item."],
    solution: "def majority_element(nums):\n    counts = {}\n    for n in nums:\n        counts[n] = counts.get(n, 0) + 1\n        if counts[n] > len(nums) / 2:\n            return n",
    xp: 22,
  },
];

export const quizBank = [
  { level: "beginner", q: "What does print(2 + 3 * 4) output?", options: ["20", "14", "24", "10"], answer: 1, explain: "Multiplication happens first: 3 * 4 is 12, then 2 + 12 is 14." },
  { level: "beginner", q: "What is type(\"3\")?", options: ["int", "str", "float", "bool"], answer: 1, explain: "Quotes make it a string, even if the characters look like a number." },
  { level: "beginner", q: "What does this print?\n\nx = [1, 2, 3]\nprint(x[-1])", options: ["1", "2", "3", "Error"], answer: 2, explain: "Index -1 is the last item, which is 3." },
  { level: "beginner", q: "Which operator checks equality?", options: ["=", "==", "===", "eq"], answer: 1, explain: "= assigns a value. == asks whether two values are equal." },
  { level: "beginner", q: "What does len(\"Ada\") return?", options: ["2", "3", "4", "\"Ada\""], answer: 1, explain: "A, d, and a — three characters." },
  { level: "beginner", q: "What is the output?\n\nprint(\"hi\" * 3)", options: ["hihihi", "hi3", "error", "hi hi hi"], answer: 0, explain: "Multiplying a string repeats it." },
  { level: "beginner", q: "range(3) gives which numbers?", options: ["1, 2, 3", "0, 1, 2, 3", "0, 1, 2", "3"], answer: 2, explain: "range(n) starts at 0 and stops before n." },
  { level: "beginner", q: "What does bool(0) return?", options: ["True", "False", "0", "Error"], answer: 1, explain: "0 is treated as False. Any other number is True." },
  { level: "beginner", q: "After nums = [1, 2]; nums.append(3), what is nums?", options: ["[1, 2]", "[1, 2, 3]", "3", "[3]"], answer: 1, explain: "append adds the item at the end of the same list." },
  { level: "beginner", q: "What does \"python\"[0:2] return?", options: ["py", "pyt", "yth", "p"], answer: 0, explain: "A slice goes up to, but not including, the end index." },
  { level: "beginner", q: "Which collection uses key-value pairs?", options: ["list", "tuple", "set", "dict"], answer: 3, explain: "A dictionary maps keys to values, like {\"name\": \"Ama\"}." },
  { level: "beginner", q: "What does this print?\n\na = 5\nb = a\na = 7\nprint(b)", options: ["5", "7", "12", "Error"], answer: 0, explain: "b holds 5. Changing a later does not change b." },
  { level: "beginner", q: "How do you start a comment?", options: ["//", "#", "--", "/*"], answer: 1, explain: "Python comments start with #." },
  { level: "beginner", q: "What is the result of 7 // 2?", options: ["3.5", "3", "4", "1"], answer: 1, explain: "// is integer division, so it throws away the decimal." },
  { level: "beginner", q: "What is the result of 7 % 2?", options: ["3", "1", "0", "3.5"], answer: 1, explain: "% is the remainder. 7 divided by 2 leaves 1." },
  { level: "beginner", q: "Which is a valid variable name?", options: ["2name", "first-name", "first_name", "class"], answer: 2, explain: "Names cannot start with a digit or contain a hyphen, and class is a keyword." },
  { level: "beginner", q: "What does this print?\n\nfor i in range(0):\n    print(i)", options: ["0", "nothing", "Error", "0 then stop"], answer: 1, explain: "range(0) is empty, so the loop body never runs." },
  { level: "beginner", q: "input() always returns a…", options: ["int", "str", "float", "bool"], answer: 1, explain: "Even if the person types 5, input() gives you the string \"5\"." },
  { level: "intermediate", q: "What does \"ada\".upper() return?", options: ["Ada", "ADA", "ada", "None"], answer: 1, explain: "upper() returns a new string in ALL CAPS." },
  { level: "intermediate", q: "Which line creates an empty list?", options: ["l = {}", "l = ()", "l = []", "l = set()"], answer: 2, explain: "Square brackets make a list. {} is an empty dict." },
  { level: "intermediate", q: "What does this print?\n\nprint(type(3.0))", options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "3.0"], answer: 1, explain: "A number with a decimal point is a float." },
  { level: "intermediate", q: "In if x = 5:, what is wrong?", options: ["x should be in quotes", "Use == for comparison", "5 should be 5.0", "Nothing"], answer: 1, explain: "A single = assigns. The condition should use ==." },
  { level: "intermediate", q: "What is the value of not True?", options: ["True", "False", "None", "Error"], answer: 1, explain: "not flips a boolean: not True is False." },
  { level: "intermediate", q: "Which of these is immutable?", options: ["list", "dict", "set", "tuple"], answer: 3, explain: "A tuple cannot be changed after you create it." },
  { level: "intermediate", q: "What does set([1, 1, 2]) equal?", options: ["[1, 1, 2]", "{1, 2}", "{1, 1, 2}", "3"], answer: 1, explain: "Sets keep only unique values." },
  { level: "intermediate", q: "A function without return gives back…", options: ["0", "False", "None", "an error"], answer: 2, explain: "If you do not return a value, Python returns None." },
  { level: "intermediate", q: "What does this print?\n\nprint(\"1\" + \"2\")", options: ["3", "12", "1 2", "Error"], answer: 1, explain: "Adding strings concatenates them. \"1\" + \"2\" is \"12\"." },
  { level: "intermediate", q: "Which keyword skips to the next loop cycle?", options: ["pass", "break", "continue", "skip"], answer: 2, explain: "continue jumps to the next iteration. break leaves the loop entirely." },
  { level: "intermediate", q: "[n for n in range(4) if n % 2 == 0] equals…", options: ["[0, 2]", "[0, 2, 4]", "[1, 3]", "[2, 4]"], answer: 0, explain: "range(4) is 0,1,2,3. The evens are 0 and 2." },
  { level: "intermediate", q: "In class methods, the first parameter is usually named…", options: ["this", "cls", "self", "me"], answer: 2, explain: "By convention it is self — it means this object." },

  { level: "advanced", q: "What is the base case of a recursive function?", options: ["The first call", "The call that stops the recursion", "The fastest call", "A call with no arguments"], answer: 1, explain: "The base case returns a result without calling the function again, so the chain can end." },
  { level: "advanced", q: "What does yield do inside a function?", options: ["Stops the program", "Turns the function into a generator", "Returns a list", "Raises an error"], answer: 1, explain: "A function that uses yield produces values one at a time and is a generator." },
  { level: "advanced", q: "A decorator is…", options: ["A comment style", "A function that wraps another function", "A kind of list", "A loop keyword"], answer: 1, explain: "A decorator takes a function and returns a new function, usually adding behaviour around the original call." },
  { level: "advanced", q: "What does binary search require?", options: ["A random list", "A sorted list", "Only unique values", "A dictionary"], answer: 1, explain: "Binary search repeatedly cuts a sorted range in half." },
  { level: "advanced", q: "In a stack, the last item pushed is the first one…", options: ["ignored", "copied", "popped", "sorted"], answer: 2, explain: "A stack is last-in, first-out (LIFO)." },
  { level: "advanced", q: "What does re.findall(r'\\d+', 'ab12c3') return?", options: ["['ab12c3']", "['12', '3']", "['1', '2', '3']", "12"], answer: 1, explain: "\\d+ matches one or more digits, so it finds 12 and 3." },
  { level: "advanced", q: "Kadane's algorithm is typically used to find…", options: ["The longest word", "The maximum subarray sum", "A binary tree height", "Prime numbers"], answer: 1, explain: "It walks the array once, keeping a running sum and the best sum seen." },
  { level: "advanced", q: "df.groupby('class')['score'].mean() in pandas does what?", options: ["Sorts the scores", "Averages score for each class", "Drops missing values", "Draws a chart"], answer: 1, explain: "groupby splits rows by class, then mean() averages the score column in each group." },
  { level: "advanced", q: "What is (arr - arr.mean()) / arr.std() called?", options: ["A dot product", "A z-score (standardisation)", "A matrix inverse", "One-hot encoding"], answer: 1, explain: "Subtracting the mean and dividing by the standard deviation standardises the values." },
  { level: "advanced", q: "BFS finds the shortest path in an unweighted graph by using a…", options: ["stack only", "queue", "priority heap of edges", "binary tree of keys"], answer: 1, explain: "Breadth-first search explores nearer nodes first, usually with a queue." },
  { level: "advanced", q: "a ^ a in Python (for integers) equals…", options: ["2*a", "0", "1", "a"], answer: 1, explain: "Bitwise XOR of a number with itself is 0, which is why XOR can find a unique item among pairs." },
  { level: "advanced", q: "Roman IX equals which number?", options: ["11", "9", "10", "8"], answer: 1, explain: "I before X means 10 minus 1, which is 9." },
  { level: "intermediate", q: "What does this return?\n\n{n: n*n for n in range(3)}", options: ["[0, 1, 4]", "{0: 0, 1: 1, 2: 4}", "{0, 1, 4}", "Error"], answer: 1, explain: "A dict comprehension builds keys and values. range(3) is 0, 1, 2." },
  { level: "intermediate", q: "After s = {1, 2}; s.add(2), what is s?", options: ["{1, 2, 2}", "{1, 2}", "{2}", "Error"], answer: 1, explain: "A set only keeps unique values, so adding 2 again changes nothing." },

];

function dayOfYear(stamp = todayStamp()) {
  const [y, m, d] = stamp.split("-").map(Number);
  const start = new Date(y, 0, 0);
  const now = new Date(y, m - 1, d);
  return Math.floor((now - start) / 86400000);
}

function poolByLevel(items, difficulty) {
  const level = difficulty || "beginner";
  const pool = items.filter((c) => (c.level || "beginner") === level);
  return pool.length ? pool : items;
}

export function getDailyChallenge(stamp = todayStamp(), difficulty = "beginner") {
  const pool = poolByLevel(dailyChallenges, difficulty);
  const i = dayOfYear(stamp) % pool.length;
  return { ...pool[i], moduleId: "daily" };
}

export function getDailyQuiz(stamp = todayStamp(), count = 5, difficulty = "beginner") {
  const pool = poolByLevel(quizBank, difficulty);
  const start = (dayOfYear(stamp) * 5) % pool.length;
  const items = [];
  for (let i = 0; i < count; i++) items.push(pool[(start + i) % pool.length]);
  return items;
}
