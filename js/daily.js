import { todayStamp } from "./storage.js";

export const dailyChallenges = [
  {
    id: "d-fizz",
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
];

export const quizBank = [
  { q: "What does print(2 + 3 * 4) output?", options: ["20", "14", "24", "10"], answer: 1, explain: "Multiplication happens first: 3 * 4 is 12, then 2 + 12 is 14." },
  { q: "What is type(\"3\")?", options: ["int", "str", "float", "bool"], answer: 1, explain: "Quotes make it a string, even if the characters look like a number." },
  { q: "What does this print?\n\nx = [1, 2, 3]\nprint(x[-1])", options: ["1", "2", "3", "Error"], answer: 2, explain: "Index -1 is the last item, which is 3." },
  { q: "Which operator checks equality?", options: ["=", "==", "===", "eq"], answer: 1, explain: "= assigns a value. == asks whether two values are equal." },
  { q: "What does len(\"Ada\") return?", options: ["2", "3", "4", "\"Ada\""], answer: 1, explain: "A, d, and a — three characters." },
  { q: "What is the output?\n\nprint(\"hi\" * 3)", options: ["hihihi", "hi3", "error", "hi hi hi"], answer: 0, explain: "Multiplying a string repeats it." },
  { q: "range(3) gives which numbers?", options: ["1, 2, 3", "0, 1, 2, 3", "0, 1, 2", "3"], answer: 2, explain: "range(n) starts at 0 and stops before n." },
  { q: "What does bool(0) return?", options: ["True", "False", "0", "Error"], answer: 1, explain: "0 is treated as False. Any other number is True." },
  { q: "After nums = [1, 2]; nums.append(3), what is nums?", options: ["[1, 2]", "[1, 2, 3]", "3", "[3]"], answer: 1, explain: "append adds the item at the end of the same list." },
  { q: "What does \"python\"[0:2] return?", options: ["py", "pyt", "yth", "p"], answer: 0, explain: "A slice goes up to, but not including, the end index." },
  { q: "Which collection uses key-value pairs?", options: ["list", "tuple", "set", "dict"], answer: 3, explain: "A dictionary maps keys to values, like {\"name\": \"Ama\"}." },
  { q: "What does this print?\n\na = 5\nb = a\na = 7\nprint(b)", options: ["5", "7", "12", "Error"], answer: 0, explain: "b holds 5. Changing a later does not change b." },
  { q: "How do you start a comment?", options: ["//", "#", "--", "/*"], answer: 1, explain: "Python comments start with #." },
  { q: "What is the result of 7 // 2?", options: ["3.5", "3", "4", "1"], answer: 1, explain: "// is integer division, so it throws away the decimal." },
  { q: "What is the result of 7 % 2?", options: ["3", "1", "0", "3.5"], answer: 1, explain: "% is the remainder. 7 divided by 2 leaves 1." },
  { q: "Which is a valid variable name?", options: ["2name", "first-name", "first_name", "class"], answer: 2, explain: "Names cannot start with a digit or contain a hyphen, and class is a keyword." },
  { q: "What does this print?\n\nfor i in range(0):\n    print(i)", options: ["0", "nothing", "Error", "0 then stop"], answer: 1, explain: "range(0) is empty, so the loop body never runs." },
  { q: "input() always returns a…", options: ["int", "str", "float", "bool"], answer: 1, explain: "Even if the person types 5, input() gives you the string \"5\"." },
  { q: "What does \"ada\".upper() return?", options: ["Ada", "ADA", "ada", "None"], answer: 1, explain: "upper() returns a new string in ALL CAPS." },
  { q: "Which line creates an empty list?", options: ["l = {}", "l = ()", "l = []", "l = set()"], answer: 2, explain: "Square brackets make a list. {} is an empty dict." },
  { q: "What does this print?\n\nprint(type(3.0))", options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "3.0"], answer: 1, explain: "A number with a decimal point is a float." },
  { q: "In if x = 5:, what is wrong?", options: ["x should be in quotes", "Use == for comparison", "5 should be 5.0", "Nothing"], answer: 1, explain: "A single = assigns. The condition should use ==." },
  { q: "What is the value of not True?", options: ["True", "False", "None", "Error"], answer: 1, explain: "not flips a boolean: not True is False." },
  { q: "Which of these is immutable?", options: ["list", "dict", "set", "tuple"], answer: 3, explain: "A tuple cannot be changed after you create it." },
  { q: "What does set([1, 1, 2]) equal?", options: ["[1, 1, 2]", "{1, 2}", "{1, 1, 2}", "3"], answer: 1, explain: "Sets keep only unique values." },
  { q: "A function without return gives back…", options: ["0", "False", "None", "an error"], answer: 2, explain: "If you do not return a value, Python returns None." },
  { q: "What does this print?\n\nprint(\"1\" + \"2\")", options: ["3", "12", "1 2", "Error"], answer: 1, explain: "Adding strings concatenates them. \"1\" + \"2\" is \"12\"." },
  { q: "Which keyword skips to the next loop cycle?", options: ["pass", "break", "continue", "skip"], answer: 2, explain: "continue jumps to the next iteration. break leaves the loop entirely." },
  { q: "[n for n in range(4) if n % 2 == 0] equals…", options: ["[0, 2]", "[0, 2, 4]", "[1, 3]", "[2, 4]"], answer: 0, explain: "range(4) is 0,1,2,3. The evens are 0 and 2." },
  { q: "In class methods, the first parameter is usually named…", options: ["this", "cls", "self", "me"], answer: 2, explain: "By convention it is self — it means this object." },
];

function dayOfYear(stamp = todayStamp()) {
  const [y, m, d] = stamp.split("-").map(Number);
  const start = new Date(y, 0, 0);
  const now = new Date(y, m - 1, d);
  return Math.floor((now - start) / 86400000);
}

export function getDailyChallenge(stamp = todayStamp()) {
  const i = dayOfYear(stamp) % dailyChallenges.length;
  return { ...dailyChallenges[i], moduleId: "daily" };
}

export function getDailyQuiz(stamp = todayStamp(), count = 5) {
  const start = (dayOfYear(stamp) * 5) % quizBank.length;
  const items = [];
  for (let i = 0; i < count; i++) items.push(quizBank[(start + i) % quizBank.length]);
  return items;
}
