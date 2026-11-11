/* Autocomplete catalog + static fallback. Jedi results are merged when ready. */

export const KEYWORDS = [
  "False","None","True","and","as","assert","async","await","break","class",
  "continue","def","del","elif","else","except","finally","for","from","global",
  "if","import","in","is","lambda","nonlocal","not","or","pass","raise",
  "return","try","while","with","yield",
];

export const BUILTINS = [
  { name: "print", sig: "print(*objects, sep=' ', end='\\n')", doc: "Print values to the output." },
  { name: "input", sig: "input(prompt='')", doc: "Read a line of text from the user." },
  { name: "len", sig: "len(obj)", doc: "Return the number of items." },
  { name: "range", sig: "range(stop) or range(start, stop, step=1)", doc: "A sequence of integers, used in for loops." },
  { name: "int", sig: "int(x=0)", doc: "Convert x to an integer." },
  { name: "float", sig: "float(x=0.0)", doc: "Convert x to a decimal number." },
  { name: "str", sig: "str(x='')", doc: "Convert x to a string." },
  { name: "bool", sig: "bool(x=False)", doc: "Convert x to True or False." },
  { name: "list", sig: "list(iterable=[])", doc: "Create a list." },
  { name: "dict", sig: "dict()", doc: "Create a dictionary of key-value pairs." },
  { name: "tuple", sig: "tuple(iterable=())", doc: "Create a tuple." },
  { name: "set", sig: "set(iterable=())", doc: "Create a set of unique values." },
  { name: "type", sig: "type(obj)", doc: "Return the type of obj." },
  { name: "sum", sig: "sum(iterable, start=0)", doc: "Add up all items." },
  { name: "min", sig: "min(iterable)", doc: "Return the smallest item." },
  { name: "max", sig: "max(iterable)", doc: "Return the largest item." },
  { name: "abs", sig: "abs(x)", doc: "Absolute value of x." },
  { name: "round", sig: "round(number, ndigits=0)", doc: "Round a number." },
  { name: "sorted", sig: "sorted(iterable, reverse=False)", doc: "Return a new sorted list." },
  { name: "reversed", sig: "reversed(seq)", doc: "Iterate over a sequence backwards." },
  { name: "enumerate", sig: "enumerate(iterable, start=0)", doc: "Pairs of (index, item)." },
  { name: "zip", sig: "zip(*iterables)", doc: "Combine sequences item by item." },
  { name: "map", sig: "map(function, iterable)", doc: "Apply a function to every item." },
  { name: "filter", sig: "filter(function, iterable)", doc: "Keep items for which function is True." },
  { name: "open", sig: "open(file, mode='r')", doc: "Open a file for reading or writing." },
  { name: "isinstance", sig: "isinstance(obj, classinfo)", doc: "True if obj is of that type." },
  { name: "hasattr", sig: "hasattr(obj, name)", doc: "True if obj has that attribute." },
  { name: "getattr", sig: "getattr(obj, name, default)", doc: "Get an attribute from obj." },
  { name: "setattr", sig: "setattr(obj, name, value)", doc: "Set an attribute on obj." },
  { name: "dir", sig: "dir(obj)", doc: "List names belonging to obj." },
  { name: "id", sig: "id(obj)", doc: "Unique identity of obj." },
  { name: "pow", sig: "pow(base, exp)", doc: "Raise base to the power exp." },
  { name: "divmod", sig: "divmod(a, b)", doc: "Return (a // b, a % b)." },
  { name: "all", sig: "all(iterable)", doc: "True if every item is true." },
  { name: "any", sig: "any(iterable)", doc: "True if any item is true." },
  { name: "chr", sig: "chr(i)", doc: "Character for Unicode code i." },
  { name: "ord", sig: "ord(c)", doc: "Unicode code for a one-character string." },
  { name: "hex", sig: "hex(x)", doc: "Hexadecimal string for an integer." },
  { name: "bin", sig: "bin(x)", doc: "Binary string for an integer." },
  { name: "oct", sig: "oct(x)", doc: "Octal string for an integer." },
  { name: "format", sig: "format(value, format_spec='')", doc: "Format a value as a string." },
  { name: "repr", sig: "repr(obj)", doc: "Official string representation." },
  { name: "iter", sig: "iter(obj)", doc: "Return an iterator." },
  { name: "next", sig: "next(iterator, default)", doc: "Next item from an iterator." },
  { name: "slice", sig: "slice(start, stop, step)", doc: "A slice object." },
  { name: "super", sig: "super()", doc: "Access methods from a parent class." },
  { name: "property", sig: "property(fget=None, fset=None)", doc: "Create a managed attribute." },
  { name: "staticmethod", sig: "staticmethod(fn)", doc: "A method that does not take self." },
  { name: "classmethod", sig: "classmethod(fn)", doc: "A method that receives the class." },
  { name: "Exception", sig: "Exception(*args)", doc: "Base class for errors." },
  { name: "ValueError", sig: "ValueError(*args)", doc: "The value is wrong." },
  { name: "TypeError", sig: "TypeError(*args)", doc: "The type is wrong." },
  { name: "KeyError", sig: "KeyError(*args)", doc: "A dictionary key is missing." },
  { name: "IndexError", sig: "IndexError(*args)", doc: "A sequence index is out of range." },
  { name: "NameError", sig: "NameError(*args)", doc: "A name is not defined." },
  { name: "ZeroDivisionError", sig: "ZeroDivisionError(*args)", doc: "Division by zero." },
  { name: "FileNotFoundError", sig: "FileNotFoundError(*args)", doc: "The file does not exist." },
  { name: "StopIteration", sig: "StopIteration(*args)", doc: "The iterator is finished." },
];

export const SNIPPETS = [
  { name: "for", detail: "for loop", template: "for ${1:item} in ${2:iterable}:\n    ${3:pass}" },
  { name: "if", detail: "if statement", template: "if ${1:condition}:\n    ${2:pass}" },
  { name: "elif", detail: "elif branch", template: "elif ${1:condition}:\n    ${2:pass}" },
  { name: "else", detail: "else branch", template: "else:\n    ${1:pass}" },
  { name: "while", detail: "while loop", template: "while ${1:condition}:\n    ${2:pass}" },
  { name: "def", detail: "function", template: "def ${1:name}(${2:}):\n    ${3:pass}" },
  { name: "class", detail: "class", template: "class ${1:Name}:\n    def __init__(self${2:}):\n        ${3:pass}" },
  { name: "try", detail: "try / except", template: "try:\n    ${1:pass}\nexcept ${2:Exception} as e:\n    ${3:pass}" },
  { name: "with", detail: "with open", template: "with open(${1:'file.txt'}) as ${2:f}:\n    ${3:pass}" },
  { name: "import", detail: "import module", template: "import ${1:module}" },
  { name: "from", detail: "from import", template: "from ${1:module} import ${2:name}" },
  { name: "lambda", detail: "lambda", template: "lambda ${1:x}: ${2:x}" },
  { name: "ifn", detail: "if / else", template: "if ${1:condition}:\n    ${2:pass}\nelse:\n    ${3:pass}" },
  { name: "forr", detail: "for in range", template: "for ${1:i} in range(${2:n}):\n    ${3:pass}" },
  { name: "lc", detail: "list comprehension", template: "[${1:x} for ${2:x} in ${3:iterable}]" },
];

export const STR_METHODS = [
  { name: "upper", sig: "upper()", doc: "Return a copy in UPPERCASE." },
  { name: "lower", sig: "lower()", doc: "Return a copy in lowercase." },
  { name: "title", sig: "title()", doc: "Capitalize each word." },
  { name: "capitalize", sig: "capitalize()", doc: "Capitalize the first character." },
  { name: "strip", sig: "strip(chars=None)", doc: "Remove spaces from both ends." },
  { name: "lstrip", sig: "lstrip(chars=None)", doc: "Remove spaces from the start." },
  { name: "rstrip", sig: "rstrip(chars=None)", doc: "Remove spaces from the end." },
  { name: "split", sig: "split(sep=None)", doc: "Split into a list of words." },
  { name: "join", sig: "join(iterable)", doc: "Join strings with this separator." },
  { name: "replace", sig: "replace(old, new)", doc: "Replace every old with new." },
  { name: "find", sig: "find(sub)", doc: "Index of sub, or -1 if missing." },
  { name: "index", sig: "index(sub)", doc: "Index of sub, or raise an error." },
  { name: "startswith", sig: "startswith(prefix)", doc: "True if the string starts with prefix." },
  { name: "endswith", sig: "endswith(suffix)", doc: "True if the string ends with suffix." },
  { name: "isalpha", sig: "isalpha()", doc: "True if all characters are letters." },
  { name: "isdigit", sig: "isdigit()", doc: "True if all characters are digits." },
  { name: "isalnum", sig: "isalnum()", doc: "True if all characters are letters or digits." },
  { name: "isspace", sig: "isspace()", doc: "True if all characters are whitespace." },
  { name: "count", sig: "count(sub)", doc: "How many times sub appears." },
  { name: "format", sig: "format(*args, **kwargs)", doc: "Fill in {} placeholders." },
  { name: "center", sig: "center(width)", doc: "Center the string in a field of width." },
  { name: "zfill", sig: "zfill(width)", doc: "Pad with zeros on the left." },
  { name: "splitlines", sig: "splitlines()", doc: "Split on line breaks." },
  { name: "encode", sig: "encode(encoding='utf-8')", doc: "Encode the string to bytes." },
];

export const LIST_METHODS = [
  { name: "append", sig: "append(item)", doc: "Add an item at the end." },
  { name: "extend", sig: "extend(iterable)", doc: "Add all items from another list." },
  { name: "insert", sig: "insert(index, item)", doc: "Insert an item at a position." },
  { name: "remove", sig: "remove(item)", doc: "Remove the first matching item." },
  { name: "pop", sig: "pop(index=-1)", doc: "Remove and return an item." },
  { name: "clear", sig: "clear()", doc: "Remove every item." },
  { name: "copy", sig: "copy()", doc: "Return a shallow copy." },
  { name: "count", sig: "count(item)", doc: "How many times item appears." },
  { name: "index", sig: "index(item)", doc: "Position of the first match." },
  { name: "reverse", sig: "reverse()", doc: "Reverse the list in place." },
  { name: "sort", sig: "sort(reverse=False)", doc: "Sort the list in place." },
];

export const DICT_METHODS = [
  { name: "get", sig: "get(key, default=None)", doc: "Return the value for key, or default." },
  { name: "keys", sig: "keys()", doc: "A view of the keys." },
  { name: "values", sig: "values()", doc: "A view of the values." },
  { name: "items", sig: "items()", doc: "A view of (key, value) pairs." },
  { name: "update", sig: "update(other)", doc: "Add or overwrite keys from other." },
  { name: "pop", sig: "pop(key, default)", doc: "Remove a key and return its value." },
  { name: "popitem", sig: "popitem()", doc: "Remove and return one (key, value)." },
  { name: "setdefault", sig: "setdefault(key, default=None)", doc: "Get key, or set it to default." },
  { name: "clear", sig: "clear()", doc: "Remove every key." },
  { name: "copy", sig: "copy()", doc: "Return a shallow copy." },
];

export const SET_METHODS = [
  { name: "add", sig: "add(item)", doc: "Add an item." },
  { name: "update", sig: "update(iterable)", doc: "Add several items." },
  { name: "remove", sig: "remove(item)", doc: "Remove an item, or raise KeyError." },
  { name: "discard", sig: "discard(item)", doc: "Remove an item if it is present." },
  { name: "pop", sig: "pop()", doc: "Remove and return an arbitrary item." },
  { name: "clear", sig: "clear()", doc: "Remove every item." },
  { name: "union", sig: "union(other)", doc: "A new set with items from both." },
  { name: "intersection", sig: "intersection(other)", doc: "A new set with items in both." },
  { name: "difference", sig: "difference(other)", doc: "Items in this set but not in other." },
];

export const MATH_MEMBERS = [
  { name: "sqrt", sig: "math.sqrt(x)", doc: "Square root of x." },
  { name: "ceil", sig: "math.ceil(x)", doc: "Round up to the next integer." },
  { name: "floor", sig: "math.floor(x)", doc: "Round down to the previous integer." },
  { name: "pi", sig: "math.pi", doc: "The constant π (3.14159…)." },
  { name: "e", sig: "math.e", doc: "The constant e (2.718…)." },
  { name: "sin", sig: "math.sin(x)", doc: "Sine of x radians." },
  { name: "cos", sig: "math.cos(x)", doc: "Cosine of x radians." },
  { name: "tan", sig: "math.tan(x)", doc: "Tangent of x radians." },
  { name: "log", sig: "math.log(x, base=e)", doc: "Logarithm of x." },
  { name: "log10", sig: "math.log10(x)", doc: "Base-10 logarithm." },
  { name: "exp", sig: "math.exp(x)", doc: "e raised to the power x." },
  { name: "pow", sig: "math.pow(x, y)", doc: "x raised to the power y." },
  { name: "fabs", sig: "math.fabs(x)", doc: "Absolute value as a float." },
  { name: "factorial", sig: "math.factorial(n)", doc: "n! for a non-negative integer." },
  { name: "gcd", sig: "math.gcd(a, b)", doc: "Greatest common divisor." },
  { name: "radians", sig: "math.radians(deg)", doc: "Convert degrees to radians." },
  { name: "degrees", sig: "math.degrees(rad)", doc: "Convert radians to degrees." },
];

export const RANDOM_MEMBERS = [
  { name: "random", sig: "random.random()", doc: "A float in the range [0.0, 1.0)." },
  { name: "randint", sig: "random.randint(a, b)", doc: "A random integer from a to b inclusive." },
  { name: "choice", sig: "random.choice(seq)", doc: "A random item from a sequence." },
  { name: "shuffle", sig: "random.shuffle(list)", doc: "Shuffle a list in place." },
  { name: "sample", sig: "random.sample(pop, k)", doc: "k unique items from pop." },
  { name: "uniform", sig: "random.uniform(a, b)", doc: "A random float between a and b." },
  { name: "seed", sig: "random.seed(a=None)", doc: "Set the random seed for repeatable results." },
  { name: "randrange", sig: "random.randrange(start, stop, step=1)", doc: "A random item from range(...)." },
];

export const NP_MEMBERS = [
  { name: "array", sig: "np.array(object)", doc: "Create a NumPy array." },
  { name: "arange", sig: "np.arange(start, stop, step)", doc: "Evenly spaced values in a range." },
  { name: "linspace", sig: "np.linspace(start, stop, num=50)", doc: "Evenly spaced numbers from start to stop." },
  { name: "zeros", sig: "np.zeros(shape)", doc: "An array of zeros." },
  { name: "ones", sig: "np.ones(shape)", doc: "An array of ones." },
  { name: "full", sig: "np.full(shape, fill_value)", doc: "An array filled with a value." },
  { name: "shape", sig: "array.shape", doc: "The dimensions of the array." },
  { name: "size", sig: "array.size", doc: "The number of items." },
  { name: "dtype", sig: "array.dtype", doc: "The data type of the items." },
  { name: "reshape", sig: "reshape(newshape)", doc: "Return an array with a new shape." },
  { name: "mean", sig: "np.mean(a)", doc: "The average of the values." },
  { name: "sum", sig: "np.sum(a)", doc: "The sum of the values." },
  { name: "min", sig: "np.min(a)", doc: "The smallest value." },
  { name: "max", sig: "np.max(a)", doc: "The largest value." },
  { name: "std", sig: "np.std(a)", doc: "The standard deviation." },
  { name: "median", sig: "np.median(a)", doc: "The median value." },
  { name: "dot", sig: "np.dot(a, b)", doc: "Dot product of two arrays." },
  { name: "sqrt", sig: "np.sqrt(a)", doc: "Square root of each item." },
  { name: "abs", sig: "np.abs(a)", doc: "Absolute value of each item." },
  { name: "concatenate", sig: "np.concatenate((a, b))", doc: "Join arrays together." },
  { name: "unique", sig: "np.unique(a)", doc: "The unique values, sorted." },
  { name: "where", sig: "np.where(condition, x, y)", doc: "Choose x or y by condition." },
  { name: "ndim", sig: "array.ndim", doc: "Number of dimensions." },
];

export const PD_MEMBERS = [
  { name: "DataFrame", sig: "pd.DataFrame(data)", doc: "Create a table of rows and columns." },
  { name: "Series", sig: "pd.Series(data)", doc: "A labeled one-dimensional array." },
  { name: "read_csv", sig: "pd.read_csv(path)", doc: "Load a CSV file into a DataFrame." },
  { name: "head", sig: "df.head(n=5)", doc: "The first n rows." },
  { name: "tail", sig: "df.tail(n=5)", doc: "The last n rows." },
  { name: "info", sig: "df.info()", doc: "A short summary of the DataFrame." },
  { name: "describe", sig: "df.describe()", doc: "Basic statistics for numeric columns." },
  { name: "shape", sig: "df.shape", doc: "Rows and columns as (rows, cols)." },
  { name: "columns", sig: "df.columns", doc: "The column names." },
  { name: "index", sig: "df.index", doc: "The row labels." },
  { name: "loc", sig: "df.loc[rows, cols]", doc: "Select by label." },
  { name: "iloc", sig: "df.iloc[rows, cols]", doc: "Select by integer position." },
  { name: "mean", sig: "df.mean()", doc: "Average of numeric columns." },
  { name: "sum", sig: "df.sum()", doc: "Sum of numeric columns." },
  { name: "max", sig: "df.max()", doc: "Largest value in each column." },
  { name: "min", sig: "df.min()", doc: "Smallest value in each column." },
  { name: "groupby", sig: "df.groupby(by)", doc: "Group rows to summarise them." },
  { name: "sort_values", sig: "df.sort_values(by)", doc: "Sort rows by a column." },
  { name: "drop", sig: "df.drop(labels, axis=0)", doc: "Remove rows or columns." },
  { name: "fillna", sig: "df.fillna(value)", doc: "Replace missing values." },
  { name: "isna", sig: "df.isna()", doc: "True where values are missing." },
  { name: "value_counts", sig: "series.value_counts()", doc: "Counts of unique values." },
  { name: "to_csv", sig: "df.to_csv(path, index=False)", doc: "Save the DataFrame as a CSV file." },
  { name: "merge", sig: "pd.merge(left, right, on=)", doc: "Join two DataFrames." },
  { name: "concat", sig: "pd.concat([df1, df2])", doc: "Stack DataFrames together." },
];

const MODULE_MEMBERS = {
  math: MATH_MEMBERS,
  random: RANDOM_MEMBERS,
  np: NP_MEMBERS,
  numpy: NP_MEMBERS,
  pd: PD_MEMBERS,
  pandas: PD_MEMBERS,
};

const KIND_RANK = { snippet: 0, keyword: 1, function: 2, class: 3, module: 4, method: 5, variable: 6, property: 7, value: 8 };

const PYTHON_WORDS = new Set([
  ...KEYWORDS,
  ...BUILTINS.map((b) => b.name),
]);

export function identifiersInCode(code) {
  const found = new Map();
  const defRe = /^\s*(def|class)\s+([A-Za-z_][A-Za-z0-9_]*)/gm;
  let m;
  while ((m = defRe.exec(code))) {
    found.set(m[2], m[1] === "class" ? "class" : "function");
  }
  const assignRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/gm;
  while ((m = assignRe.exec(code))) {
    if (!found.has(m[1]) && !PYTHON_WORDS.has(m[1])) found.set(m[1], "variable");
  }
  const importRe = /^\s*(?:import\s+([A-Za-z_][A-Za-z0-9_]*)(?:\s+as\s+([A-Za-z_][A-Za-z0-9_]*))?|from\s+[A-Za-z_.]+\s+import\s+([A-Za-z_][A-Za-z0-9_]*))/gm;
  while ((m = importRe.exec(code))) {
    const name = m[2] || m[1] || m[3];
    if (name && !found.has(name)) found.set(name, "module");
  }
  const anyRe = /\b([A-Za-z_][A-Za-z0-9_]*)\b/g;
  while ((m = anyRe.exec(code))) {
    if (PYTHON_WORDS.has(m[1]) || found.has(m[1])) continue;
    if (m[1].length < 2) continue;
    found.set(m[1], "variable");
  }
  return found;
}

function inferAssignedType(code, name) {
  const re = new RegExp("(^|\\n)\\s*" + name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&") + "\\s*=\\s*(.+)", "g");
  let last = null, m;
  while ((m = re.exec(code))) last = m[2].trim();
  if (!last) return null;
  if (/^['"]/.test(last) || /\bstr\s*\(/.test(last)) return "str";
  if (/^\[/.test(last) || /\blist\s*\(/.test(last)) return "list";
  if (/^\{[^}]*:/.test(last) || /\bdict\s*\(/.test(last)) return "dict";
  if (/^\{/.test(last) || /\bset\s*\(/.test(last)) return "set";
  if (/^np\.|numpy\./.test(last)) return "numpy";
  if (/^pd\.|pandas\./.test(last)) return "pandas";
  return null;
}

function objectBeforeDot(line, dotCh, code) {
  let i = dotCh - 1;
  while (i >= 0 && /\s/.test(line[i])) i--;
  if (i < 0) return { kind: "unknown", name: "" };
  if (line[i] === ")" || line[i] === "]") {
    // walk back a name before the bracket if any, else look at the literal
  }
  if ((line[i] === '"' || line[i] === "'") || (i >= 1 && (line[i] === "'" || line[i] === '"'))) {
    return { kind: "str", name: "" };
  }
  // closing quote of a string: 'hello'.
  if (line[i] === '"' || line[i] === "'") return { kind: "str", name: "" };
  let end = i + 1;
  if (/[A-Za-z0-9_]/.test(line[i])) {
    while (i >= 0 && /[A-Za-z0-9_]/.test(line[i])) i--;
    const name = line.slice(i + 1, end);
    if (MODULE_MEMBERS[name]) return { kind: "module", name };
    const typ = inferAssignedType(code, name);
    if (typ) return { kind: typ, name };
    return { kind: "unknown", name };
  }
  if (line[i] === "]") return { kind: "list", name: "" };
  if (line[i] === "}") return { kind: "dict", name: "" };
  return { kind: "unknown", name: "" };
}

function membersFor(kind, name) {
  if (kind === "module" && MODULE_MEMBERS[name]) return MODULE_MEMBERS[name];
  if (kind === "str") return STR_METHODS;
  if (kind === "list") return LIST_METHODS;
  if (kind === "dict") return DICT_METHODS;
  if (kind === "set") return SET_METHODS;
  if (kind === "numpy" || name === "np" || name === "numpy") return NP_MEMBERS;
  if (kind === "pandas" || name === "pd" || name === "pandas") return PD_MEMBERS;
  // Unknown object: offer common methods from the main types, de-duplicated.
  const seen = new Set();
  const merged = [];
  for (const item of [...STR_METHODS, ...LIST_METHODS, ...DICT_METHODS, ...SET_METHODS]) {
    if (seen.has(item.name)) continue;
    seen.add(item.name);
    merged.push(item);
  }
  return merged;
}

function startsWith(name, prefix) {
  return name.toLowerCase().startsWith(prefix.toLowerCase());
}

export function staticCompletions({ code, lineText, ch }) {
  const before = lineText.slice(0, ch);
  const dot = /([A-Za-z_][A-Za-z0-9_]*|['"][^'"]*['"]|\)|\]|\})\s*\.\s*([A-Za-z_][A-Za-z0-9_]*)?$/.exec(before);
  const wordMatch = /[A-Za-z_][A-Za-z0-9_]*$/.exec(before);
  const prefix = wordMatch ? wordMatch[0] : "";
  const fromCh = wordMatch ? ch - prefix.length : ch;
  const list = [];

  if (/\.\s*[A-Za-z_][A-Za-z0-9_]*$/.test(before) || /.\s*$/.test(before) && before.trim().endsWith(".") || /\.\s*$/.test(before)) {
    const dotAt = before.lastIndexOf(".");
    const obj = objectBeforeDot(lineText, dotAt, code);
    const memberPrefix = prefix;
    const fromMember = /\.\s*$/.test(before) ? ch : fromCh;
    for (const mem of membersFor(obj.kind, obj.name)) {
      if (memberPrefix && !startsWith(mem.name, memberPrefix)) continue;
      list.push({
        name: mem.name,
        kind: "method",
        sig: mem.sig,
        doc: mem.doc,
        apply: "call",
      });
    }
    return { fromCh: fromMember, list, isMember: true };
  }

  if (!prefix) return { fromCh, list, isMember: false };

  for (const sn of SNIPPETS) {
    if (startsWith(sn.name, prefix) || startsWith(sn.detail, prefix)) {
      list.push({
        name: sn.name,
        kind: "snippet",
        sig: sn.detail,
        doc: "Insert a code template",
        template: sn.template,
      });
    }
  }
  for (const kw of KEYWORDS) {
    if (startsWith(kw, prefix)) {
      list.push({ name: kw, kind: "keyword", doc: "Python keyword" });
    }
  }
  for (const b of BUILTINS) {
    if (startsWith(b.name, prefix)) {
      const kind = /Error$|Exception$/.test(b.name) || ["bool","int","float","str","list","dict","tuple","set","type","property"].includes(b.name) && b.name[0] === b.name[0].toUpperCase()
        ? "class"
        : "function";
      const k = /^[A-Z]/.test(b.name) ? "class" : "function";
      list.push({ name: b.name, kind: k, sig: b.sig, doc: b.doc, apply: "call" });
    }
  }
  const ids = identifiersInCode(code);
  for (const [id, kind] of ids) {
    if (id === prefix && ids.size > 30) continue;
    if (!startsWith(id, prefix)) continue;
    if (KEYWORDS.includes(id) || BUILTINS.some((b) => b.name === id)) continue;
    list.push({ name: id, kind: kind === "function" ? "function" : kind, doc: kind === "function" ? "Function in your code" : kind === "class" ? "Class in your code" : "Name in your code" });
  }

  list.sort((a, b) => {
    const ar = KIND_RANK[a.kind] ?? 9;
    const br = KIND_RANK[b.kind] ?? 9;
    if (ar !== br) return ar - br;
    const aExact = a.name.toLowerCase() === prefix.toLowerCase() ? 0 : 1;
    const bExact = b.name.toLowerCase() === prefix.toLowerCase() ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    return a.name.localeCompare(b.name);
  });

  // Keep the popup short enough to scan on a phone.
  return { fromCh, list: list.slice(0, 40), isMember: false };
}

export function mergeJedi(staticList, jediList, prefix, isMember) {
  if (!jediList || !jediList.length) return staticList;
  const byName = new Map(staticList.map((x) => [x.name, { ...x }]));
  for (const j of jediList) {
    const name = j.name;
    if (!name || name.startsWith("__")) continue;
    if (prefix && !startsWith(name, prefix)) continue;
    const existing = byName.get(name);
    const kind = mapJediType(j.type, isMember);
    if (existing) {
      if (j.sig && !existing.sig) existing.sig = j.sig;
      if (j.doc && !existing.doc) existing.doc = j.doc;
      if (existing.kind === "variable" && kind !== "variable") existing.kind = kind;
    } else {
      byName.set(name, {
        name,
        kind,
        sig: j.sig || "",
        doc: j.doc || "",
        apply: kind === "function" || kind === "method" ? "call" : undefined,
      });
    }
  }
  const list = [...byName.values()];
  list.sort((a, b) => {
    const ar = KIND_RANK[a.kind] ?? 9;
    const br = KIND_RANK[b.kind] ?? 9;
    if (ar !== br) return ar - br;
    return a.name.localeCompare(b.name);
  });
  return list.slice(0, 50);
}

function mapJediType(t, isMember) {
  const x = (t || "").toLowerCase();
  if (x === "keyword") return "keyword";
  if (x === "module") return "module";
  if (x === "class") return "class";
  if (x === "function" || x === "statement" && false) return isMember ? "method" : "function";
  if (x === "function") return isMember ? "method" : "function";
  if (x === "instance" || x === "param" || x === "statement") return "variable";
  if (x === "property") return "property";
  if (isMember && (x === "function" || x === "")) return "method";
  return isMember ? "method" : (x || "value");
}

export function applyTemplate(template) {
  let first = null;
  let pos = 0;
  const out = template.replace(/\$\{(\d+):([^}]*)\}|\$0/g, (match, _n, def, offset) => {
    const text = def || "";
    if (first === null) {
      // offset is in the original string; recompute from current output length instead
      first = { length: text.length };
    }
    return text;
  });
  // Re-run to find the first placeholder position in the expanded text.
  let cursor = 0;
  let selLen = 0;
  let found = false;
  const re = /\$\{(\d+):([^}]*)\}|\$0/g;
  let last = 0;
  let built = "";
  const parts = [];
  const src = template;
  re.lastIndex = 0;
  let m;
  const rx = /\$\{(\d+):([^}]*)\}|\$0/g;
  while ((m = rx.exec(src))) {
    built += src.slice(last, m.index);
    const text = m[2] || "";
    if (!found) {
      cursor = built.length;
      selLen = text.length;
      found = true;
    }
    built += text;
    last = m.index + m[0].length;
  }
  built += src.slice(last);
  return { text: built, cursor, selLen };
}
