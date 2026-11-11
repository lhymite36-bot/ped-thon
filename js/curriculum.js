export const modules = [
  {
    id: "hello",
    title: "Hello, Python",
    subtitle: "Print text and comments",
    icon: "👋",
    lesson: {
      title: "Talking to the screen",
      html: `<p>Python runs your instructions from top to bottom. The simplest useful one is <code>print()</code>, which shows text in the output.</p>
<p>Put the text in quotes. Single or double quotes both work:</p>
<pre>print("Hello, Python")
print('This works too')</pre>
<p>A <strong>comment</strong> starts with <code>#</code>. Python ignores it. Use comments to leave notes for yourself.</p>
<pre># This is a note
print(20)</pre>
<p>You can print more than one value on the same line by separating them with commas. Python puts a space between them.</p>
<pre>print("Score", 10)</pre>`,
    },
    challenges: [
      {
        id: "hello-1",
        title: "Say hello",
        prompt: "Print exactly this text: Hello, Python",
        starter: "print()",
        checks: [{ type: "stdout_contains", value: "Hello, Python", message: "Print the text Hello, Python." }],
        hints: [
          "Use the print function, and put the text inside quotes.",
          "It looks like: print(\"your text here\")",
          "The text must include the comma and the word Python.",
        ],
        solution: "print(\"Hello, Python\")",
        xp: 10,
      },
      {
        id: "hello-2",
        title: "Two lines",
        prompt: "Print two lines. The first line should be Python and the second line should be I am learning.",
        starter: "",
        checks: [{ type: "stdout_lines", value: ["Python", "I am learning"], message: "Print Python on the first line and I am learning on the second." }],
        hints: [
          "Each print() starts a new line.",
          "Call print twice, once for each line.",
          "First: print(\"Python\")  then  print(\"I am learning\")",
        ],
        solution: "print(\"Python\")\nprint(\"I am learning\")",
        xp: 10,
      },
      {
        id: "hello-3",
        title: "A comment and a number",
        prompt: "Write a comment (any short note) on its own line, then print the number 20.",
        starter: "",
        checks: [
          { type: "stdout_equals", value: "20", message: "The program should print 20." },
          { type: "source_contains", value: "#", message: "Add a comment that starts with #." },
        ],
        hints: [
          "Comments start with #.",
          "On the next line, print the number 20. Numbers do not need quotes.",
          "Example:\n# my first comment\nprint(20)",
        ],
        solution: "# my first program\nprint(20)",
        xp: 10,
      },
      {
        id: "hello-4",
        title: "Two values at once",
        prompt: "Use a single print() to show the numbers 5 and 10 on the same line, separated by a space.",
        starter: "",
        checks: [
          { type: "stdout_equals", value: "5 10", message: "Print 5 and 10 on the same line, separated by a space." },
          { type: "source_contains", value: "print", message: "Use print()." },
        ],
        hints: [
          "print can take more than one value: print(a, b).",
          "Do not put quotes around the numbers if you want them as numbers.",
          "print(5, 10)",
        ],
        solution: "print(5, 10)",
        xp: 10,
      },
    ],
  },
  {
    id: "variables",
    title: "Variables & Types",
    subtitle: "Names, numbers, and True/False",
    icon: "📦",
    lesson: {
      title: "Boxes with names",
      html: `<p>A <strong>variable</strong> is a name that holds a value. You create one with <code>=</code>.</p>
<pre>city = "Accra"
age = 21
price = 9.5
is_student = True</pre>
<p>Python has a few basic types you will use all the time:</p>
<ul>
<li><code>int</code> — whole numbers, like <code>21</code></li>
<li><code>float</code> — decimals, like <code>9.5</code></li>
<li><code>str</code> — text in quotes</li>
<li><code>bool</code> — <code>True</code> or <code>False</code></li>
</ul>
<p>Use <code>type(x)</code> to ask what type something is. You can do maths with <code>+ - * /</code>.</p>
<pre>total = 9.5 * 4
print(total)
print(type(age))</pre>`,
    },
    challenges: [
      {
        id: "var-1",
        title: "Name a city",
        prompt: "Create a variable called city with the value \"Accra\", then print city.",
        starter: "",
        checks: [
          { type: "var_equals", name: "city", value: "Accra", message: "Create a variable named city with the value Accra." },
          { type: "stdout_contains", value: "Accra", message: "Print the city." },
        ],
        hints: [
          "Assign with = and put the text in quotes.",
          "city = \"Accra\"",
          "Then print(city) — no quotes around the variable name.",
        ],
        solution: "city = \"Accra\"\nprint(city)",
        xp: 12,
      },
      {
        id: "var-2",
        title: "Work out a total",
        prompt: "Set price to 9.5 and qty to 4. Create total as price times qty, then print total.",
        starter: "price = 9.5\nqty = 4\n",
        checks: [
          { type: "var_equals", name: "price", value: 9.5, message: "price should be 9.5." },
          { type: "var_equals", name: "qty", value: 4, message: "qty should be 4." },
          { type: "var_equals", name: "total", value: 38.0, message: "total should be price * qty, which is 38." },
          { type: "stdout_contains", value: "38", message: "Print the total." },
        ],
        hints: [
          "Multiply with *.",
          "total = price * qty",
          "Then print(total).",
        ],
        solution: "price = 9.5\nqty = 4\ntotal = price * qty\nprint(total)",
        xp: 12,
      },
      {
        id: "var-3",
        title: "What type is it?",
        prompt: "Create a variable year with the value 2026. Print the type of year.",
        starter: "",
        checks: [
          { type: "var_equals", name: "year", value: 2026, message: "year should be the integer 2026." },
          { type: "stdout_contains", value: "int", message: "Print type(year) so the output mentions int." },
        ],
        hints: [
          "year = 2026  (no quotes, so it stays a number)",
          "Use type(year).",
          "print(type(year))  will show <class 'int'>",
        ],
        solution: "year = 2026\nprint(type(year))",
        xp: 12,
      },
      {
        id: "var-4",
        title: "A year older",
        prompt: "Create is_student and set it to True. Create age and set it to 21. Print is_student on one line and age + 1 on the next.",
        starter: "",
        checks: [
          { type: "var_equals", name: "is_student", value: true, message: "is_student should be True." },
          { type: "var_equals", name: "age", value: 21, message: "age should be 21." },
          { type: "stdout_lines", value: ["True", "22"], message: "Print True on the first line and 22 (age + 1) on the second." },
        ],
        hints: [
          "True must start with a capital T. It is not a string, so no quotes.",
          "print(is_student) then print(age + 1)",
          "is_student = True\nage = 21\nprint(is_student)\nprint(age + 1)",
        ],
        solution: "is_student = True\nage = 21\nprint(is_student)\nprint(age + 1)",
        xp: 12,
      },
    ],
  },
  {
    id: "strings",
    title: "Strings",
    subtitle: "Text, slices, and f-strings",
    icon: "🔤",
    lesson: {
      title: "Working with text",
      html: `<p>A <strong>string</strong> is text. You can join strings with <code>+</code>, repeat them with <code>*</code>, and take pieces with <strong>slices</strong>.</p>
<pre>word = "python"
print(word[0])      # p  (first character, index 0)
print(word[-1])     # n  (last character)
print(word[0:3])    # pyt (up to, but not including, index 3)
print(word.upper()) # PYTHON</pre>
<p>An <strong>f-string</strong> lets you drop a variable into text. Put an <code>f</code> before the quotes, and wrap the variable in <code>{ }</code>:</p>
<pre>name = "Ada"
print(f"Hello, {name}!")</pre>`,
    },
    challenges: [
      {
        id: "str-1",
        title: "Shout it",
        prompt: "Create msg with the value \"python\". Print it in uppercase (PYTHON).",
        starter: "msg = \"python\"\n",
        checks: [
          { type: "var_equals", name: "msg", value: "python", message: "Keep msg equal to 'python'." },
          { type: "stdout_equals", value: "PYTHON", message: "Print PYTHON (the uppercase version)." },
        ],
        hints: [
          "Strings have useful methods, like .upper().",
          "msg.upper() returns a new uppercase string.",
          "print(msg.upper())",
        ],
        solution: "msg = \"python\"\nprint(msg.upper())",
        xp: 12,
      },
      {
        id: "str-2",
        title: "A friendly greeting",
        prompt: "Create name with the value \"Ada\". Print exactly: Hello, Ada!",
        starter: "name = \"Ada\"\n",
        checks: [
          { type: "var_equals", name: "name", value: "Ada", message: "name should be Ada." },
          { type: "stdout_equals", value: "Hello, Ada!", message: "Print exactly Hello, Ada!" },
        ],
        hints: [
          "An f-string is a nice way: f\"Hello, {name}!\"",
          "You could also use: \"Hello, \" + name + \"!\"",
          "print(f\"Hello, {name}!\")",
        ],
        solution: "name = \"Ada\"\nprint(f\"Hello, {name}!\")",
        xp: 12,
      },
      {
        id: "str-3",
        title: "First and last",
        prompt: "From word = \"programming\", print the first character and the last character on the same line, separated by a space (p g).",
        starter: "word = \"programming\"\n",
        checks: [
          { type: "stdout_equals", value: "p g", message: "Print the first and last characters, separated by a space." },
        ],
        hints: [
          "The first character is word[0].",
          "The last character is word[-1].",
          "print(word[0], word[-1])",
        ],
        solution: "word = \"programming\"\nprint(word[0], word[-1])",
        xp: 14,
      },
      {
        id: "str-4",
        title: "Slice out a word",
        prompt: "From s = \"Data Science\", print only Science by slicing the string.",
        starter: "s = \"Data Science\"\n",
        checks: [
          { type: "stdout_equals", value: "Science", message: "Print Science using a slice of s." },
          { type: "source_contains", value: "s[", message: "Use a slice, like s[something]." },
        ],
        hints: [
          "A slice looks like s[start:end]. The end index is not included.",
          "\"Science\" starts at index 5 (after the space).",
          "print(s[5:])  takes everything from index 5 to the end.",
        ],
        solution: "s = \"Data Science\"\nprint(s[5:])",
        xp: 14,
      },
    ],
  },
  {
    id: "decisions",
    title: "Input & Decisions",
    subtitle: "Ask questions and use if/else",
    icon: "🤔",
    lesson: {
      title: "Listening and choosing",
      html: `<p><code>input()</code> asks the user for text and returns a string. If you need a number, convert it with <code>int()</code> or <code>float()</code>.</p>
<pre>name = input("Name: ")
age = int(input("Age: "))</pre>
<p><strong>if / elif / else</strong> lets the program choose a path. Indent the lines that belong inside the branch (four spaces):</p>
<pre>if age >= 18:
    print("adult")
else:
    print("minor")</pre>
<p>Compare with <code>==</code> <code>!=</code> <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>. Combine conditions with <code>and</code> and <code>or</code>.</p>`,
    },
    challenges: [
      {
        id: "dec-1",
        title: "Say hi",
        prompt: "Ask for a name with input() (any prompt is fine). Then print Hi, followed by a comma, a space, and the name. For example, if the name is Ama, print Hi, Ama",
        starter: "",
        cases: [
          { inputs: ["Ama"], checks: [{ type: "stdout_contains", value: "Hi, Ama", message: "When the name is Ama, print Hi, Ama" }] },
          { inputs: ["Kojo"], checks: [{ type: "stdout_contains", value: "Hi, Kojo", message: "When the name is Kojo, print Hi, Kojo" }] },
        ],
        hints: [
          "Store the answer: name = input()",
          "Then print it with an f-string or with +.",
          "name = input()\nprint(f\"Hi, {name}\")",
        ],
        solution: "name = input()\nprint(f\"Hi, {name}\")",
        xp: 14,
      },
      {
        id: "dec-2",
        title: "Double a number",
        prompt: "Read a whole number with input(), convert it to an int, and print twice that number.",
        starter: "",
        cases: [
          { inputs: ["5"], checks: [{ type: "stdout_contains", value: "10", message: "When the input is 5, print 10." }] },
          { inputs: ["12"], checks: [{ type: "stdout_contains", value: "24", message: "When the input is 12, print 24." }] },
        ],
        hints: [
          "input() always gives you a string, even if the person types a number.",
          "Use int(...) to convert, then multiply by 2.",
          "n = int(input())\nprint(n * 2)",
        ],
        solution: "n = int(input())\nprint(n * 2)",
        xp: 14,
      },
      {
        id: "dec-3",
        title: "Pass or fail",
        prompt: "Read an integer score. If it is 50 or more, print Pass. Otherwise print Fail.",
        starter: "",
        cases: [
          { inputs: ["50"], checks: [{ type: "stdout_equals", value: "Pass", message: "A score of 50 should print Pass." }] },
          { inputs: ["49"], checks: [{ type: "stdout_equals", value: "Fail", message: "A score of 49 should print Fail." }] },
          { inputs: ["90"], checks: [{ type: "stdout_equals", value: "Pass", message: "A score of 90 should print Pass." }] },
        ],
        hints: [
          "Convert the input to int first.",
          "Use if score >= 50:",
          "score = int(input())\nif score >= 50:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")",
        ],
        solution: "score = int(input())\nif score >= 50:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")",
        xp: 16,
      },
      {
        id: "dec-4",
        title: "Warm or cold",
        prompt: "Read an integer temperature. If it is 30 or above, print Hot. If it is below 15, print Cold. Otherwise print Warm.",
        starter: "",
        cases: [
          { inputs: ["30"], checks: [{ type: "stdout_equals", value: "Hot", message: "30 should print Hot." }] },
          { inputs: ["14"], checks: [{ type: "stdout_equals", value: "Cold", message: "14 should print Cold." }] },
          { inputs: ["15"], checks: [{ type: "stdout_equals", value: "Warm", message: "15 should print Warm." }] },
          { inputs: ["29"], checks: [{ type: "stdout_equals", value: "Warm", message: "29 should print Warm." }] },
        ],
        hints: [
          "You will need if, elif, and else.",
          "Check the hot case first, then the cold case.",
          "temp = int(input())\nif temp >= 30:\n    print(\"Hot\")\nelif temp < 15:\n    print(\"Cold\")\nelse:\n    print(\"Warm\")",
        ],
        solution: "temp = int(input())\nif temp >= 30:\n    print(\"Hot\")\nelif temp < 15:\n    print(\"Cold\")\nelse:\n    print(\"Warm\")",
        xp: 16,
      },
    ],
  },
  {
    id: "loops",
    title: "Loops",
    subtitle: "for, range, and while",
    icon: "🔁",
    lesson: {
      title: "Doing things again",
      html: `<p>A <code>for</code> loop walks through a sequence. <code>range(n)</code> gives 0 up to, but not including, n. <code>range(1, 6)</code> gives 1, 2, 3, 4, 5.</p>
<pre>for i in range(1, 6):
    print(i)</pre>
<p>A <code>while</code> loop keeps going as long as a condition is True. Remember to change the variable, or it will never stop.</p>
<pre>total = 0
n = 1
while n <= 10:
    total = total + n
    n = n + 1
print(total)</pre>
<p>You can also loop over the characters in a string, or later, the items in a list.</p>`,
    },
    challenges: [
      {
        id: "loop-1",
        title: "Count to five",
        prompt: "Print the numbers 1, 2, 3, 4, and 5, each on its own line. Use a loop (not five separate print numbers typed by hand).",
        starter: "",
        checks: [
          { type: "stdout_lines", value: ["1", "2", "3", "4", "5"], message: "Print 1 through 5, each on its own line." },
          { type: "source_contains", value: "for", message: "Use a for loop.", caseSensitive: false },
        ],
        hints: [
          "range(1, 6) gives 1, 2, 3, 4, 5.",
          "for i in range(1, 6):",
          "    print(i)",
        ],
        solution: "for i in range(1, 6):\n    print(i)",
        xp: 14,
      },
      {
        id: "loop-2",
        title: "Add them up",
        prompt: "Add the numbers from 1 to 10 (inclusive) and store the result in a variable named total. Then print total. It should be 55.",
        starter: "total = 0\n",
        checks: [
          { type: "var_equals", name: "total", value: 55, message: "total should be 55 (the sum of 1 through 10)." },
          { type: "stdout_contains", value: "55", message: "Print total." },
        ],
        hints: [
          "Start with total = 0, then add each number in the loop.",
          "for n in range(1, 11):\n    total = total + n",
          "Then print(total).",
        ],
        solution: "total = 0\nfor n in range(1, 11):\n    total = total + n\nprint(total)",
        xp: 14,
      },
      {
        id: "loop-3",
        title: "Even numbers",
        prompt: "Print the even numbers from 2 to 10 inclusive, each on its own line: 2, 4, 6, 8, 10.",
        starter: "",
        checks: [
          { type: "stdout_lines", value: ["2", "4", "6", "8", "10"], message: "Print 2 4 6 8 10, each on its own line." },
        ],
        hints: [
          "range can take a step: range(2, 11, 2).",
          "Or loop and only print when n % 2 == 0.",
          "for n in range(2, 11, 2):\n    print(n)",
        ],
        solution: "for n in range(2, 11, 2):\n    print(n)",
        xp: 14,
      },
      {
        id: "loop-4",
        title: "Count the vowels",
        prompt: "The variable text is already set to \"education\". Count how many vowels (a, e, i, o, u) it contains, store that in a variable named count, and print count. Treat only lowercase vowels — this word is already lowercase.",
        starter: "text = \"education\"\ncount = 0\n",
        checks: [
          { type: "var_equals", name: "count", value: 5, message: "education has 5 vowels, so count should be 5." },
          { type: "stdout_contains", value: "5", message: "Print count." },
        ],
        hints: [
          "Loop over each character in text.",
          "If the character is in \"aeiou\", add 1 to count.",
          "for ch in text:\n    if ch in \"aeiou\":\n        count = count + 1\nprint(count)",
        ],
        solution: "text = \"education\"\ncount = 0\nfor ch in text:\n    if ch in \"aeiou\":\n        count = count + 1\nprint(count)",
        xp: 16,
      },
    ],
  },
  {
    id: "lists",
    title: "Lists",
    subtitle: "Collections you can change",
    icon: "📋",
    lesson: {
      title: "A row of values",
      html: `<p>A <strong>list</strong> holds several values in order, inside square brackets.</p>
<pre>colors = ["red", "green", "blue"]
print(colors[0])      # red
print(colors[-1])     # blue
colors.append("yellow")
print(len(colors))    # 4</pre>
<p>You can loop through a list, and use built-in helpers like <code>sum</code>, <code>min</code>, <code>max</code>, and <code>len</code>.</p>
<pre>scores = [70, 85, 90]
print(sum(scores) / len(scores))</pre>`,
    },
    challenges: [
      {
        id: "list-1",
        title: "Pick a color",
        prompt: "Create a list named colors with \"red\", \"green\", and \"blue\" in that order. Print the second item (green).",
        starter: "",
        checks: [
          { type: "var_equals", name: "colors", value: ["red", "green", "blue"], message: "colors should be ['red', 'green', 'blue']." },
          { type: "stdout_equals", value: "green", message: "Print the second item, green." },
        ],
        hints: [
          "Lists use square brackets and commas.",
          "The second item is at index 1 (counting starts at 0).",
          "colors = [\"red\", \"green\", \"blue\"]\nprint(colors[1])",
        ],
        solution: "colors = [\"red\", \"green\", \"blue\"]\nprint(colors[1])",
        xp: 14,
      },
      {
        id: "list-2",
        title: "Add an item",
        prompt: "Start with nums = [1, 2, 3]. Append 4, then print the list.",
        starter: "nums = [1, 2, 3]\n",
        checks: [
          { type: "var_equals", name: "nums", value: [1, 2, 3, 4], message: "After appending, nums should be [1, 2, 3, 4]." },
          { type: "stdout_contains", value: "1, 2, 3, 4", message: "Print the list so it shows 1, 2, 3, 4." },
        ],
        hints: [
          "Use the append method.",
          "nums.append(4)",
          "Then print(nums).",
        ],
        solution: "nums = [1, 2, 3]\nnums.append(4)\nprint(nums)",
        xp: 14,
      },
      {
        id: "list-3",
        title: "Average score",
        prompt: "scores = [70, 85, 90, 60]. Compute the average, store it in a variable named average, and print it.",
        starter: "scores = [70, 85, 90, 60]\n",
        checks: [
          { type: "var_equals", name: "average", value: 76.25, message: "average should be the mean of the four scores (76.25)." },
          { type: "stdout_contains", value: "76.25", message: "Print the average." },
        ],
        hints: [
          "Average is total divided by how many there are.",
          "sum(scores) adds them up. len(scores) counts them.",
          "average = sum(scores) / len(scores)\nprint(average)",
        ],
        solution: "scores = [70, 85, 90, 60]\naverage = sum(scores) / len(scores)\nprint(average)",
        xp: 14,
      },
      {
        id: "list-4",
        title: "Print each name",
        prompt: "Loop through names = [\"Kojo\", \"Ama\", \"Yaw\"] and print each name on its own line.",
        starter: "names = [\"Kojo\", \"Ama\", \"Yaw\"]\n",
        checks: [
          { type: "stdout_lines", value: ["Kojo", "Ama", "Yaw"], message: "Print each name on its own line, in order." },
          { type: "source_contains", value: "for", message: "Use a for loop.", caseSensitive: false },
        ],
        hints: [
          "for name in names: walks through the list.",
          "Print each name inside the loop.",
          "for name in names:\n    print(name)",
        ],
        solution: "names = [\"Kojo\", \"Ama\", \"Yaw\"]\nfor name in names:\n    print(name)",
        xp: 14,
      },
    ],
  },
  {
    id: "collections",
    title: "Dicts, Tuples & Sets",
    subtitle: "Keys, packed values, and unique items",
    icon: "🗂️",
    lesson: {
      title: "Three more containers",
      html: `<p>A <strong>dictionary</strong> maps keys to values:</p>
<pre>student = {"name": "Ama", "age": 20}
print(student["name"])     # Ama
student["course"] = "Python"</pre>
<p>A <strong>tuple</strong> is like a list, but you cannot change it. It uses parentheses. You can unpack it:</p>
<pre>point = (10, 20)
x, y = point</pre>
<p>A <strong>set</strong> keeps unique items only:</p>
<pre>unique = set([1, 2, 2, 3])
print(unique)  # {1, 2, 3}</pre>`,
    },
    challenges: [
      {
        id: "col-1",
        title: "Look up a name",
        prompt: "Create a dictionary named student with keys \"name\" and \"age\", values \"Ama\" and 20. Print the name.",
        starter: "",
        checks: [
          { type: "var_equals", name: "student", value: { name: "Ama", age: 20 }, message: "student should be a dict with name Ama and age 20." },
          { type: "stdout_equals", value: "Ama", message: "Print the name." },
        ],
        hints: [
          "Use curly braces and a colon between each key and value.",
          "student = {\"name\": \"Ama\", \"age\": 20}",
          "print(student[\"name\"])",
        ],
        solution: "student = {\"name\": \"Ama\", \"age\": 20}\nprint(student[\"name\"])",
        xp: 14,
      },
      {
        id: "col-2",
        title: "Add a course",
        prompt: "Start with student = {\"name\": \"Ama\", \"age\": 20}. Add a new key \"course\" with the value \"Python\". Print the course.",
        starter: "student = {\"name\": \"Ama\", \"age\": 20}\n",
        checks: [
          { type: "python", code: "assert _ns.get('student', {}).get('course') == 'Python'\n_ok = True", message: "student should have course set to Python." },
          { type: "stdout_equals", value: "Python", message: "Print the course." },
        ],
        hints: [
          "You can add a key with student[\"course\"] = \"Python\".",
          "Then print(student[\"course\"]).",
        ],
        solution: "student = {\"name\": \"Ama\", \"age\": 20}\nstudent[\"course\"] = \"Python\"\nprint(student[\"course\"])",
        xp: 14,
      },
      {
        id: "col-3",
        title: "The last of a tuple",
        prompt: "t = (10, 20, 30). Print the last item of the tuple.",
        starter: "t = (10, 20, 30)\n",
        checks: [
          { type: "var_type", name: "t", value: "tuple", message: "Keep t as a tuple." },
          { type: "stdout_equals", value: "30", message: "Print the last item, 30." },
        ],
        hints: [
          "Tuples use indexes just like lists.",
          "The last item is t[-1].",
          "print(t[-1])",
        ],
        solution: "t = (10, 20, 30)\nprint(t[-1])",
        xp: 12,
      },
      {
        id: "col-4",
        title: "Unique numbers",
        prompt: "From items = [1, 2, 2, 3, 3, 3], create a set named unique that holds the unique values. Print how many unique values there are (use len).",
        starter: "items = [1, 2, 2, 3, 3, 3]\n",
        checks: [
          { type: "var_equals", name: "unique", value: [1, 2, 3], message: "unique should be a set containing 1, 2, and 3." },
          { type: "stdout_equals", value: "3", message: "Print 3, the number of unique values." },
        ],
        hints: [
          "Wrap the list in set(...) to drop duplicates.",
          "unique = set(items)",
          "print(len(unique))",
        ],
        solution: "items = [1, 2, 2, 3, 3, 3]\nunique = set(items)\nprint(len(unique))",
        xp: 14,
      },
    ],
  },
  {
    id: "functions",
    title: "Functions",
    subtitle: "Reusable blocks of code",
    icon: "🧩",
    lesson: {
      title: "Give a task a name",
      html: `<p>A <strong>function</strong> is a reusable block of code. You define it with <code>def</code>, and send a result back with <code>return</code>.</p>
<pre>def square(n):
    return n * n

print(square(5))  # 25</pre>
<p>Names inside the function (the <strong>parameters</strong>) take the values you pass in (the <strong>arguments</strong>).</p>
<pre>def greet(name):
    return f"Hello, {name}"</pre>
<p>If you forget <code>return</code>, the function gives back <code>None</code>.</p>`,
    },
    challenges: [
      {
        id: "fn-1",
        title: "Square it",
        prompt: "Write a function square(n) that returns n times n.",
        starter: "def square(n):\n    ",
        checks: [
          { type: "func", name: "square", args: [5], expect: 25, message: "square(5) should return 25." },
          { type: "func", name: "square", args: [0], expect: 0, message: "square(0) should return 0." },
          { type: "func", name: "square", args: [-3], expect: 9, message: "square(-3) should return 9." },
        ],
        hints: [
          "Use return, not print — the tests call your function and use the value.",
          "return n * n",
        ],
        solution: "def square(n):\n    return n * n",
        xp: 14,
      },
      {
        id: "fn-2",
        title: "A greeting",
        prompt: "Write greet(name) that returns the string Hello, followed by a comma, a space, and the name. For example, greet(\"Ada\") returns \"Hello, Ada\".",
        starter: "def greet(name):\n    ",
        checks: [
          { type: "func", name: "greet", args: ["Ada"], expect: "Hello, Ada", message: "greet(\"Ada\") should return Hello, Ada" },
          { type: "func", name: "greet", args: ["Yaw"], expect: "Hello, Yaw", message: "greet(\"Yaw\") should return Hello, Yaw" },
        ],
        hints: [
          "Return a string. An f-string is handy.",
          "return f\"Hello, {name}\"",
        ],
        solution: "def greet(name):\n    return f\"Hello, {name}\"",
        xp: 14,
      },
      {
        id: "fn-3",
        title: "Average of two",
        prompt: "Write average(a, b) that returns the average of the two numbers (as a float, so divide with /).",
        starter: "def average(a, b):\n    ",
        checks: [
          { type: "func", name: "average", args: [4, 6], expect: 5, message: "average(4, 6) should return 5." },
          { type: "func", name: "average", args: [1, 2], expect: 1.5, message: "average(1, 2) should return 1.5." },
        ],
        hints: [
          "Add the two numbers, then divide by 2.",
          "Use / not // so 1 and 2 give 1.5.",
          "return (a + b) / 2",
        ],
        solution: "def average(a, b):\n    return (a + b) / 2",
        xp: 14,
      },
      {
        id: "fn-4",
        title: "Even or not",
        prompt: "Write is_even(n) that returns True if n is even, and False otherwise. (A number is even when n % 2 == 0.)",
        starter: "def is_even(n):\n    ",
        checks: [
          { type: "func", name: "is_even", args: [4], expect: true, message: "is_even(4) should be True." },
          { type: "func", name: "is_even", args: [7], expect: false, message: "is_even(7) should be False." },
          { type: "func", name: "is_even", args: [0], expect: true, message: "is_even(0) should be True." },
        ],
        hints: [
          "The remainder operator is %.",
          "You can return the comparison itself: return n % 2 == 0",
        ],
        solution: "def is_even(n):\n    return n % 2 == 0",
        xp: 14,
      },
    ],
  },
  {
    id: "errors",
    title: "Errors & Files",
    subtitle: "try/except and reading files",
    icon: "🛠️",
    lesson: {
      title: "When things go wrong — and saving work",
      html: `<p>Some operations can fail, like turning a word into an integer. Wrap risky code in <code>try</code> / <code>except</code> so the program can recover.</p>
<pre>try:
    n = int("hello")
except ValueError:
    n = None</pre>
<p>You can also write and read files. Ped-thon runs Python in your browser, so files live in a small virtual folder — perfect for practice.</p>
<pre>with open("notes.txt", "w") as f:
    f.write("hello")

with open("notes.txt") as f:
    content = f.read()
print(content)</pre>
<p><code>"w"</code> means write (this creates or overwrites the file). The default is read.</p>`,
    },
    challenges: [
      {
        id: "err-1",
        title: "Safe number",
        prompt: "Write safe_int(s) that returns int(s) when s is a valid integer string, and returns None if int(s) raises ValueError.",
        starter: "def safe_int(s):\n    ",
        checks: [
          { type: "func", name: "safe_int", args: ["42"], expect: 42, message: "safe_int(\"42\") should return 42." },
          { type: "func", name: "safe_int", args: ["-3"], expect: -3, message: "safe_int(\"-3\") should return -3." },
          { type: "func", name: "safe_int", args: ["hello"], expect: null, message: "safe_int(\"hello\") should return None." },
        ],
        hints: [
          "Put int(s) inside try, and return it.",
          "In except ValueError, return None.",
          "def safe_int(s):\n    try:\n        return int(s)\n    except ValueError:\n        return None",
        ],
        solution: "def safe_int(s):\n    try:\n        return int(s)\n    except ValueError:\n        return None",
        xp: 16,
      },
      {
        id: "err-2",
        title: "Write and read",
        prompt: "Write the text hello (no extra spaces) to a file named notes.txt. Then read the file back into a variable named content, and print content.",
        starter: "",
        checks: [
          { type: "var_equals", name: "content", value: "hello", message: "content should be the text hello from the file." },
          { type: "stdout_contains", value: "hello", message: "Print the content." },
          { type: "python", code: "assert open('notes.txt').read() == 'hello'\n_ok = True", message: "notes.txt should contain hello." },
        ],
        hints: [
          "Open the file with mode \"w\" to write.",
          "Then open it again (default mode) and call .read().",
          "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"hello\")\nwith open(\"notes.txt\") as f:\n    content = f.read()\nprint(content)",
        ],
        solution: "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"hello\")\nwith open(\"notes.txt\") as f:\n    content = f.read()\nprint(content)",
        xp: 16,
      },
      {
        id: "err-3",
        title: "Careful division",
        prompt: "Write divide(a, b) that returns a / b. If b is 0, return the string \"cannot divide\" instead of crashing.",
        starter: "def divide(a, b):\n    ",
        checks: [
          { type: "func", name: "divide", args: [10, 2], expect: 5, message: "divide(10, 2) should return 5." },
          { type: "func", name: "divide", args: [3, 0], expect: "cannot divide", message: "divide(3, 0) should return the string cannot divide." },
        ],
        hints: [
          "Check if b == 0 first, and return \"cannot divide\".",
          "Otherwise return a / b.",
          "You could also use try/except ZeroDivisionError.",
        ],
        solution: "def divide(a, b):\n    if b == 0:\n        return \"cannot divide\"\n    return a / b",
        xp: 16,
      },
      {
        id: "err-4",
        title: "Count the lines",
        prompt: "Write three lines to a file named lines.txt: apple, banana, and cherry (each ending with a newline). Then read the file and print how many lines it has.",
        starter: "",
        checks: [
          { type: "stdout_equals", value: "3", message: "Print 3, the number of lines." },
          { type: "python", code: "text = open('lines.txt').read().strip().splitlines()\nassert text == ['apple', 'banana', 'cherry']\n_ok = True", message: "lines.txt should have the three fruit names, one per line." },
        ],
        hints: [
          "You can write all three at once with a multi-line string, or write three times.",
          "f.readlines() gives a list of lines. len(...) counts them.",
          "with open(\"lines.txt\", \"w\") as f:\n    f.write(\"apple\\nbanana\\ncherry\\n\")\nwith open(\"lines.txt\") as f:\n    print(len(f.readlines()))",
        ],
        solution: "with open(\"lines.txt\", \"w\") as f:\n    f.write(\"apple\\nbanana\\ncherry\\n\")\nwith open(\"lines.txt\") as f:\n    print(len(f.readlines()))",
        xp: 16,
      },
    ],
  },
  {
    id: "comprehensions",
    title: "List Comprehensions",
    subtitle: "Build lists in one line",
    icon: "✨",
    lesson: {
      title: "A shorter way to build lists",
      html: `<p>A <strong>list comprehension</strong> builds a new list from an existing sequence, in one line.</p>
<pre>squares = [n * n for n in range(1, 6)]
# [1, 4, 9, 16, 25]

evens = [n for n in [1, 2, 3, 4, 5, 6] if n % 2 == 0]
# [2, 4, 6]</pre>
<p>The pattern is: <code>[expression for item in sequence if condition]</code>. The <code>if</code> part is optional.</p>
<p>You can also transform text:</p>
<pre>words = ["ada", "kojo"]
print([w.upper() for w in words])  # ['ADA', 'KOJO']</pre>`,
    },
    challenges: [
      {
        id: "comp-1",
        title: "Squares 1 to 5",
        prompt: "Create a list named squares with the squares of 1 through 5, using a list comprehension. Then print it.",
        starter: "",
        checks: [
          { type: "var_equals", name: "squares", value: [1, 4, 9, 16, 25], message: "squares should be [1, 4, 9, 16, 25]." },
          { type: "source_contains", value: "for", message: "Use a list comprehension (it contains for)." },
          { type: "stdout_contains", value: "1, 4, 9, 16, 25", message: "Print the list." },
        ],
        hints: [
          "It looks like [n * n for n in range(...)].",
          "range(1, 6) gives 1 through 5.",
          "squares = [n * n for n in range(1, 6)]\nprint(squares)",
        ],
        solution: "squares = [n * n for n in range(1, 6)]\nprint(squares)",
        xp: 16,
      },
      {
        id: "comp-2",
        title: "Only the evens",
        prompt: "From nums = [1, 2, 3, 4, 5, 6, 7, 8], create evens as a list of the even numbers, using a list comprehension. Print evens.",
        starter: "nums = [1, 2, 3, 4, 5, 6, 7, 8]\n",
        checks: [
          { type: "var_equals", name: "evens", value: [2, 4, 6, 8], message: "evens should be [2, 4, 6, 8]." },
          { type: "source_contains", value: "if", message: "Filter with if inside the comprehension." },
        ],
        hints: [
          "Add an if at the end of the comprehension.",
          "A number is even when n % 2 == 0.",
          "evens = [n for n in nums if n % 2 == 0]\nprint(evens)",
        ],
        solution: "nums = [1, 2, 3, 4, 5, 6, 7, 8]\nevens = [n for n in nums if n % 2 == 0]\nprint(evens)",
        xp: 16,
      },
      {
        id: "comp-3",
        title: "Uppercase words",
        prompt: "From words = [\"data\", \"science\", \"python\"], create a list named upper with each word in uppercase, using a list comprehension. Print upper.",
        starter: "words = [\"data\", \"science\", \"python\"]\n",
        checks: [
          { type: "var_equals", name: "upper", value: ["DATA", "SCIENCE", "PYTHON"], message: "upper should be ['DATA', 'SCIENCE', 'PYTHON']." },
        ],
        hints: [
          "Use the .upper() method on each word.",
          "upper = [w.upper() for w in words]",
          "Then print(upper).",
        ],
        solution: "words = [\"data\", \"science\", \"python\"]\nupper = [w.upper() for w in words]\nprint(upper)",
        xp: 16,
      },
      {
        id: "comp-4",
        title: "Short names only",
        prompt: "From names = [\"Ama\", \"Jonathan\", \"Kojo\", \"Elizabeth\", \"Yaw\"], create a list named short with only the names that have 4 letters or fewer, using a list comprehension. Print short.",
        starter: "names = [\"Ama\", \"Jonathan\", \"Kojo\", \"Elizabeth\", \"Yaw\"]\n",
        checks: [
          { type: "var_equals", name: "short", value: ["Ama", "Kojo", "Yaw"], message: "short should be ['Ama', 'Kojo', 'Yaw']." },
        ],
        hints: [
          "len(name) tells you how many letters a name has.",
          "Keep names where len(name) <= 4.",
          "short = [n for n in names if len(n) <= 4]\nprint(short)",
        ],
        solution: "names = [\"Ama\", \"Jonathan\", \"Kojo\", \"Elizabeth\", \"Yaw\"]\nshort = [n for n in names if len(n) <= 4]\nprint(short)",
        xp: 16,
      },
    ],
  },
  {
    id: "oop",
    title: "OOP Basics",
    subtitle: "Classes, objects, and methods",
    icon: "🏫",
    lesson: {
      title: "Your own types",
      html: `<p>A <strong>class</strong> is a blueprint for making objects. <code>__init__</code> runs when you create one, and sets up its data (the <strong>attributes</strong>).</p>
<pre>class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return "Woof"

buddy = Dog("Buddy")
print(buddy.name)      # Buddy
print(buddy.bark())    # Woof</pre>
<p>The first parameter of every method is <code>self</code> — it means "this object". You do not pass it yourself when you call the method.</p>`,
    },
    challenges: [
      {
        id: "oop-1",
        title: "A simple Dog",
        prompt: "Create a class Dog with an __init__ that takes name and stores it on the object as self.name.",
        starter: "class Dog:\n    ",
        checks: [
          { type: "python", code: "d = _ns['Dog']('Buddy')\nassert d.name == 'Buddy'\n_ok = True", message: "Dog('Buddy').name should be 'Buddy'." },
          { type: "python", code: "d = _ns['Dog']('Ama')\nassert d.name == 'Ama'\n_ok = True", message: "Dog('Ama').name should be 'Ama'." },
        ],
        hints: [
          "Define def __init__(self, name): inside the class.",
          "Then: self.name = name",
        ],
        solution: "class Dog:\n    def __init__(self, name):\n        self.name = name",
        xp: 16,
      },
      {
        id: "oop-2",
        title: "Let it bark",
        prompt: "Add a method bark(self) to Dog that returns the string Woof. Keep the __init__ that stores name.",
        starter: "class Dog:\n    def __init__(self, name):\n        self.name = name\n",
        checks: [
          { type: "python", code: "d = _ns['Dog']('Buddy')\nassert d.name == 'Buddy'\nassert d.bark() == 'Woof'\n_ok = True", message: "Dog('Buddy').bark() should return 'Woof'." },
        ],
        hints: [
          "Define bark under the class, at the same indent as __init__.",
          "def bark(self):\n    return \"Woof\"",
        ],
        solution: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return \"Woof\"",
        xp: 16,
      },
      {
        id: "oop-3",
        title: "A tiny bank",
        prompt: "Create a class BankAccount. __init__(self, balance) should store balance. Add a method deposit(self, amount) that adds amount to the balance.",
        starter: "class BankAccount:\n    ",
        checks: [
          { type: "python", code: "a = _ns['BankAccount'](100)\nassert a.balance == 100\na.deposit(40)\nassert a.balance == 140\n_ok = True", message: "Starting at 100, deposit(40) should make balance 140." },
          { type: "python", code: "a = _ns['BankAccount'](0)\na.deposit(5)\na.deposit(5)\nassert a.balance == 10\n_ok = True", message: "Two deposits of 5 starting from 0 should make balance 10." },
        ],
        hints: [
          "self.balance = balance in __init__.",
          "In deposit: self.balance = self.balance + amount",
        ],
        solution: "class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance = self.balance + amount",
        xp: 18,
      },
      {
        id: "oop-4",
        title: "Rectangle area",
        prompt: "Create a class Rectangle with __init__(self, width, height) storing both values. Add a method area(self) that returns width times height.",
        starter: "class Rectangle:\n    ",
        checks: [
          { type: "python", code: "r = _ns['Rectangle'](3, 4)\nassert r.width == 3 and r.height == 4\nassert r.area() == 12\n_ok = True", message: "Rectangle(3, 4).area() should be 12." },
          { type: "python", code: "r = _ns['Rectangle'](5, 5)\nassert r.area() == 25\n_ok = True", message: "Rectangle(5, 5).area() should be 25." },
        ],
        hints: [
          "Store both self.width and self.height.",
          "area should return self.width * self.height.",
        ],
        solution: "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    def area(self):\n        return self.width * self.height",
        xp: 18,
      },
    ],
  },
  {
    id: "data",
    title: "NumPy & Pandas",
    subtitle: "Arrays and tables for data work",
    icon: "📊",
    lesson: {
      title: "The tools data scientists reach for",
      html: `<p>These challenges load two popular libraries inside Ped-thon. The first time may take a little longer.</p>
<p><strong>NumPy</strong> gives you fast arrays and maths:</p>
<pre>import numpy as np
arr = np.array([1, 2, 3, 4, 5])
print(arr.mean())   # 3.0
print(arr * 2)      # [2 4 6 8 10]</pre>
<p><strong>Pandas</strong> gives you tables called DataFrames, with named columns — like a spreadsheet in Python:</p>
<pre>import pandas as pd
df = pd.DataFrame({
    "name": ["Ama", "Kojo", "Yaw"],
    "score": [80, 65, 90],
})
print(df[df["score"] >= 70])
print(df["score"].mean())</pre>`,
    },
    challenges: [
      {
        id: "data-1",
        title: "A NumPy array",
        prompt: "Import numpy as np. Create an array named arr with the numbers 1 through 5. Print the mean of arr.",
        starter: "import numpy as np\n",
        packages: ["numpy"],
        checks: [
          { type: "python", code: "import numpy as np\nassert isinstance(_ns['arr'], np.ndarray)\nassert list(_ns['arr']) == [1,2,3,4,5]\n_ok = True", message: "arr should be a NumPy array of 1, 2, 3, 4, 5." },
          { type: "stdout_contains", value: "3", message: "Print the mean, which is 3.0." },
        ],
        hints: [
          "np.array([1, 2, 3, 4, 5]) creates the array.",
          "arr.mean() or np.mean(arr) gives the average.",
          "print(arr.mean())",
        ],
        solution: "import numpy as np\narr = np.array([1, 2, 3, 4, 5])\nprint(arr.mean())",
        xp: 18,
      },
      {
        id: "data-2",
        title: "Double the array",
        prompt: "Start with arr as a NumPy array of 1 through 5. Create doubled as arr * 2, then print doubled.",
        starter: "import numpy as np\narr = np.array([1, 2, 3, 4, 5])\n",
        packages: ["numpy"],
        checks: [
          { type: "python", code: "import numpy as np\nassert list(_ns['doubled']) == [2,4,6,8,10]\n_ok = True", message: "doubled should be [2, 4, 6, 8, 10]." },
        ],
        hints: [
          "NumPy lets you multiply a whole array by a number in one go.",
          "doubled = arr * 2",
          "print(doubled)",
        ],
        solution: "import numpy as np\narr = np.array([1, 2, 3, 4, 5])\ndoubled = arr * 2\nprint(doubled)",
        xp: 18,
      },
      {
        id: "data-3",
        title: "Make a table",
        prompt: "Import pandas as pd. Create a DataFrame named df with two columns: name (Ama, Kojo, Yaw) and score (80, 65, 90). Print the shape of df.",
        starter: "import pandas as pd\n",
        packages: ["numpy", "pandas"],
        checks: [
          { type: "python", code: "import pandas as pd\ndf = _ns['df']\nassert list(df.columns) == ['name', 'score'] or set(df.columns) == {'name','score'}\nassert list(df['name']) == ['Ama', 'Kojo', 'Yaw']\nassert list(df['score']) == [80, 65, 90]\n_ok = True", message: "df should have name and score columns with the three rows given." },
          { type: "stdout_contains", value: "3, 2", message: "Print df.shape, which is (3, 2)." },
        ],
        hints: [
          "pd.DataFrame({ \"name\": [...], \"score\": [...] })",
          "df.shape is (rows, columns), so (3, 2).",
          "print(df.shape)",
        ],
        solution: "import pandas as pd\ndf = pd.DataFrame({\"name\": [\"Ama\", \"Kojo\", \"Yaw\"], \"score\": [80, 65, 90]})\nprint(df.shape)",
        xp: 18,
      },
      {
        id: "data-4",
        title: "Filter the scores",
        prompt: "Using the same df as before (you should create it), make a new DataFrame named passed with only the rows where score is 70 or more. Print how many rows passed has (use len or .shape[0]).",
        starter: "import pandas as pd\ndf = pd.DataFrame({\"name\": [\"Ama\", \"Kojo\", \"Yaw\"], \"score\": [80, 65, 90]})\n",
        packages: ["numpy", "pandas"],
        checks: [
          { type: "python", code: "passed = _ns['passed']\nassert list(passed['name']) == ['Ama', 'Yaw']\nassert list(passed['score']) == [80, 90]\n_ok = True", message: "passed should contain Ama (80) and Yaw (90)." },
          { type: "stdout_equals", value: "2", message: "Print 2, the number of passing rows." },
        ],
        hints: [
          "Filter with df[df[\"score\"] >= 70].",
          "passed = df[df[\"score\"] >= 70]",
          "print(len(passed))",
        ],
        solution: "import pandas as pd\ndf = pd.DataFrame({\"name\": [\"Ama\", \"Kojo\", \"Yaw\"], \"score\": [80, 65, 90]})\npassed = df[df[\"score\"] >= 70]\nprint(len(passed))",
        xp: 20,
      },
      {
        id: "data-5",
        title: "Average of a column",
        prompt: "Create the same df again. Compute the mean of the score column, store it in a variable named mean_score, and print it.",
        starter: "import pandas as pd\ndf = pd.DataFrame({\"name\": [\"Ama\", \"Kojo\", \"Yaw\"], \"score\": [80, 65, 90]})\n",
        packages: ["numpy", "pandas"],
        checks: [
          { type: "var_equals", name: "mean_score", value: 78.33333333333333, message: "mean_score should be the average of 80, 65, and 90 (about 78.33)." },
        ],
        hints: [
          "A column is df[\"score\"].",
          "mean_score = df[\"score\"].mean()",
          "print(mean_score)",
        ],
        solution: "import pandas as pd\ndf = pd.DataFrame({\"name\": [\"Ama\", \"Kojo\", \"Yaw\"], \"score\": [80, 65, 90]})\nmean_score = df[\"score\"].mean()\nprint(mean_score)",
        xp: 18,
      },
    ],
  },
];

export function getModule(id) {
  return modules.find((m) => m.id === id);
}

export function getChallenge(moduleId, challengeId) {
  const mod = getModule(moduleId);
  if (!mod) return null;
  return (mod.challenges || []).find((c) => c.id === challengeId) || null;
}

export function allChallenges() {
  const out = [];
  for (const mod of modules) {
    for (const ch of mod.challenges || []) {
      out.push({ ...ch, moduleId: mod.id, moduleTitle: mod.title });
    }
  }
  return out;
}

export function challengeIdsFor(moduleId) {
  const mod = getModule(moduleId);
  return (mod?.challenges || []).map((c) => c.id);
}

export function totalChallengeCount() {
  return modules.reduce((n, m) => n + (m.challenges || []).length, 0);
}
