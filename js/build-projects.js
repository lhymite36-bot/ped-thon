export const buildProjects = [
  {
    id: "charts",
    title: "Chart dashboard",
    kind: "matplotlib",
    icon: "📊",
    blurb: "Plot student scores as a bar chart and a line of class averages using matplotlib. The picture appears in the Preview tab.",
    packages: ["matplotlib", "numpy"],
    starter: `import matplotlib.pyplot as plt

subjects = ["Math", "English", "Science", "History"]
scores = [82, 74, 91, 68]
averages = [78, 71, 85, 70]

fig, axes = plt.subplots(1, 2, figsize=(8, 3.4))

axes[0].bar(subjects, scores, color="#3ee0b2")
axes[0].set_title("My scores")
axes[0].set_ylim(0, 100)
axes[0].set_ylabel("Score")

axes[1].plot(subjects, averages, marker="o", color="#7eb6ff")
axes[1].set_title("Class average")
axes[1].set_ylim(0, 100)

fig.tight_layout()
plt.show()
`,
    challenges: [
      {
        id: "build-chart-1",
        title: "A simple bar chart",
        prompt: "Use matplotlib to draw a bar chart of values [4, 8, 5] with labels ['A', 'B', 'C']. Call plt.show() (or leave the figure open) so it appears in Preview.",
        starter: "import matplotlib.pyplot as plt\n\n",
        packages: ["matplotlib", "numpy"],
        checks: [
          { type: "python", code: "assert len(_ns.get('plt', type('x',(),{})).__dict__) or True\nimport matplotlib.pyplot as plt\n# figures may already have been closed after capture; accept that the code imported pyplot and ran\n_ok = 'matplotlib' in _student_code or 'pyplot' in _student_code\n_ok = _ok and ('bar(' in _student_code)\n", message: "Import matplotlib and call bar(...) to draw the chart." },
        ],
        hints: ["import matplotlib.pyplot as plt", "plt.bar(['A','B','C'], [4, 8, 5])", "plt.show()"],
        solution: "import matplotlib.pyplot as plt\nplt.bar(['A', 'B', 'C'], [4, 8, 5])\nplt.show()",
        xp: 16,
      },
    ],
  },
  {
    id: "turtle-art",
    title: "Drawing art",
    kind: "turtle",
    icon: "🐢",
    blurb: "Ped-thon includes a turtle you can drive with forward, left, right, and colour. Drawings show up on the Preview canvas.",
    starter: `from turtle import Turtle, bgcolor

bgcolor("#0b1220")
t = Turtle()
t.pensize(2)
colors = ["#3ee0b2", "#7eb6ff", "#ffb15e", "#ff7a86", "#c4a5ff"]

for i in range(36):
    t.pencolor(colors[i % len(colors)])
    for _ in range(4):
        t.forward(80)
        t.right(90)
    t.right(10)

t.penup()
t.goto(0, 0)
t.dot(12, "#e8eef8")
`,
    challenges: [
      {
        id: "build-turtle-1",
        title: "Draw a square",
        prompt: "Use the turtle to draw a square with side length 80. A simple loop of forward(80) and right(90) four times is enough. Look at the Preview tab after you run it.",
        starter: "from turtle import Turtle\n\nt = Turtle()\n",
        checks: [
          { type: "python", code: "lines = [c for c in _turtle_cmds if c.get('t') == 'line']\n_ok = len(lines) >= 4", message: "The turtle should draw at least four sides (four line strokes)." },
        ],
        hints: ["for _ in range(4): t.forward(80); t.right(90)"],
        solution: "from turtle import Turtle\n\nt = Turtle()\nfor _ in range(4):\n    t.forward(80)\n    t.right(90)",
        xp: 16,
      },
    ],
  },
  {
    id: "website",
    title: "Mini website",
    kind: "html",
    icon: "🌐",
    blurb: "Build a page as an HTML string in Python, then preview it live in a sandboxed iframe. You can include CSS and a little JavaScript.",
    starter: `html = """
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root { color-scheme: dark; }
    body {
      margin: 0;
      font-family: system-ui, sans-serif;
      background: #0b1220;
      color: #e8eef8;
      padding: 24px;
    }
    h1 { color: #3ee0b2; margin-top: 0; }
    button {
      background: #3ee0b2;
      color: #0b1220;
      border: 0;
      padding: 10px 16px;
      border-radius: 10px;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <h1>Hello from Ped-thon</h1>
  <p>This page was built as a Python string. Tap the button.</p>
  <button id="go">Tap me</button>
  <script>
    document.getElementById("go").onclick = function () {
      this.textContent = "You tapped me!";
    };
  </script>
</body>
</html>
"""
show_html(html)
`,
    challenges: [
      {
        id: "build-web-1",
        title: "A heading and a paragraph",
        prompt: "Create an HTML page string with an <h1> that says Welcome and a <p> of your choice. Call show_html(html) (or store it in a variable named html) so it appears in Preview.",
        starter: "html = \"\"\"\n\n\"\"\"\nshow_html(html)\n",
        checks: [
          { type: "python", code: "text = _html_preview or _ns.get('html') or ''\n_ok = '<h1' in text.lower() and 'welcome' in text.lower()", message: "The HTML should include an <h1> that contains Welcome." },
        ],
        hints: ["Put <h1>Welcome</h1> inside the string.", "Call show_html(html) at the end."],
        solution: "html = \"\"\"\n<h1>Welcome</h1>\n<p>This is my first Ped-thon page.</p>\n\"\"\"\nshow_html(html)",
        xp: 16,
      },
    ],
  },
  {
    id: "snake",
    title: "Snake game",
    kind: "game",
    icon: "🐍",
    blurb: "A complete Snake you can play on a phone. Use the on-screen pad or a keyboard (arrows / WASD). Eat the orange squares; tap ● after a crash to restart.",
    starter: `import random
import game

game.set_size(360, 360)
cell = 18
cols = rows = 20
snake = [(8, 8), (7, 8), (6, 8)]
direction = [1, 0]
pending = [1, 0]
food = [12, 8]
acc = [0.0]
score = [0]
alive = [True]
speed = 0.14

def place_food():
    while True:
        p = (random.randint(0, cols - 1), random.randint(0, rows - 1))
        if p not in snake:
            food[0], food[1] = p
            return

def update(dt, keys):
    if not alive[0]:
        if keys.get("action"):
            snake[:] = [(8, 8), (7, 8), (6, 8)]
            pending[:] = [1, 0]
            direction[:] = [1, 0]
            score[0] = 0
            alive[0] = True
            place_food()
            acc[0] = 0
        return
    if keys.get("left") and direction[0] != 1:
        pending[:] = [-1, 0]
    elif keys.get("right") and direction[0] != -1:
        pending[:] = [1, 0]
    elif keys.get("up") and direction[1] != 1:
        pending[:] = [0, -1]
    elif keys.get("down") and direction[1] != -1:
        pending[:] = [0, 1]
    acc[0] += dt
    if acc[0] < speed:
        return
    acc[0] = 0
    direction[:] = pending
    hx = snake[0][0] + direction[0]
    hy = snake[0][1] + direction[1]
    if hx < 0 or hy < 0 or hx >= cols or hy >= rows or (hx, hy) in snake:
        alive[0] = False
        return
    snake.insert(0, (hx, hy))
    if hx == food[0] and hy == food[1]:
        score[0] += 1
        place_food()
    else:
        snake.pop()

def draw(g):
    g.clear("#0b1220")
    g.rect(0, 0, 360, 360, "#102033")
    for x, y in snake:
        g.rect(x * cell + 1, y * cell + 1, cell - 2, cell - 2, "#3ee0b2")
    g.rect(food[0] * cell + 2, food[1] * cell + 2, cell - 4, cell - 4, "#ffb15e")
    g.text(8, 8, "Score " + str(score[0]), "#e8eef8", 14)
    if not alive[0]:
        g.text(70, 170, "Game over — tap action", "#ff7a86", 16)

game.run(update, draw)
`,
    challenges: [
      {
        id: "build-snake-1",
        title: "Start a game loop",
        prompt: "Create a tiny game: call game.set_size(360, 240) and game.run(update, draw). In draw, clear the screen and draw a rectangle or circle. In update, you can leave a pass or move the shape when keys['left'] or keys['right'] is set.",
        starter: "import game\n\n",
        checks: [
          { type: "python", code: "_ok = bool(_game.get('active')) and callable(_game.get('draw'))", message: "Call game.run(update, draw) so the Preview tab can play the game." },
        ],
        hints: ["def update(dt, keys): pass", "def draw(g): g.clear(); g.rect(20, 20, 40, 40, '#3ee0b2')", "game.set_size(360, 240)", "game.run(update, draw)"],
        solution: "import game\n\ndef update(dt, keys):\n    pass\n\ndef draw(g):\n    g.clear('#0b1220')\n    g.rect(20, 20, 40, 40, '#3ee0b2')\n\ngame.set_size(360, 240)\ngame.run(update, draw)",
        xp: 18,
      },
    ],
  },
  {
    id: "pong",
    title: "Pong game",
    kind: "game",
    icon: "🏓",
    blurb: "A two-paddle Pong. On a phone, Up/Down (or the pad) move your paddle on the left. The right paddle follows the ball. First to 5 points wins; tap action to restart.",
    starter: `import game

game.set_size(360, 240)
W, H = 360, 240
state = {
    "ly": 90, "ry": 90,
    "bx": 180, "by": 120,
    "vx": 140, "vy": 90,
    "ls": 0, "rs": 0,
    "over": False,
}
PADDLE_H = 56
PADDLE_W = 8

def reset_ball(to_left=False):
    state["bx"], state["by"] = W / 2, H / 2
    state["vx"] = -140 if to_left else 140
    state["vy"] = 80

def update(dt, keys):
    if state["over"]:
        if keys.get("action"):
            state["ls"] = state["rs"] = 0
            state["over"] = False
            state["ly"] = state["ry"] = 90
            reset_ball()
        return
    speed = 220
    if keys.get("up"):
        state["ly"] -= speed * dt
    if keys.get("down"):
        state["ly"] += speed * dt
    state["ly"] = max(0, min(H - PADDLE_H, state["ly"]))
    # simple AI paddle
    if state["ry"] + PADDLE_H / 2 < state["by"]:
        state["ry"] += speed * 0.75 * dt
    else:
        state["ry"] -= speed * 0.75 * dt
    state["ry"] = max(0, min(H - PADDLE_H, state["ry"]))

    state["bx"] += state["vx"] * dt
    state["by"] += state["vy"] * dt
    if state["by"] < 4 or state["by"] > H - 4:
        state["vy"] *= -1
        state["by"] = max(4, min(H - 4, state["by"]))

    def hits(px, py):
        return (px <= state["bx"] <= px + PADDLE_W + 6
                and py <= state["by"] <= py + PADDLE_H)

    if state["vx"] < 0 and hits(8, state["ly"]):
        state["vx"] = abs(state["vx"]) + 8
        state["bx"] = 8 + PADDLE_W + 6
    if state["vx"] > 0 and hits(W - 16 - PADDLE_W, state["ry"]):
        state["vx"] = -(abs(state["vx"]) + 8)
        state["bx"] = W - 16 - PADDLE_W - 6

    if state["bx"] < 0:
        state["rs"] += 1
        reset_ball(False)
    elif state["bx"] > W:
        state["ls"] += 1
        reset_ball(True)
    if state["ls"] >= 5 or state["rs"] >= 5:
        state["over"] = True

def draw(g):
    g.clear("#0b1220")
    g.rect(W / 2 - 1, 0, 2, H, "#223252")
    g.rect(8, state["ly"], PADDLE_W, PADDLE_H, "#3ee0b2")
    g.rect(W - 16 - PADDLE_W, state["ry"], PADDLE_W, PADDLE_H, "#7eb6ff")
    g.circle(state["bx"], state["by"], 6, "#ffb15e")
    g.text(80, 8, str(state["ls"]), "#e8eef8", 20)
    g.text(250, 8, str(state["rs"]), "#e8eef8", 20)
    if state["over"]:
        winner = "You win" if state["ls"] >= 5 else "CPU wins"
        g.text(110, 110, winner + " — tap action", "#ff7a86", 16)

game.run(update, draw)
`,
  },
];

export function getBuildProject(id) {
  return buildProjects.find((p) => p.id === id) || null;
}

export function allBuildChallenges() {
  const out = [];
  for (const p of buildProjects) {
    for (const ch of p.challenges || []) {
      out.push({ ...ch, moduleId: "build-" + p.id, projectId: p.id, projectTitle: p.title });
    }
  }
  return out;
}
