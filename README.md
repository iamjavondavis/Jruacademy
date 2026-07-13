# Jru Academy

Jru Academy is a responsive, browser-based digital learning app built for Jru.

## Live site

https://iamjavondavis.github.io/Jruacademy/

## Current release

### Math Galaxy

- 10 progressive multiplication missions
- 50 total math questions
- 80% mastery requirement and locked progression
- Randomized question and answer order
- Hint button before answering
- Repeated-addition and skip-counting explanations
- Missed facts tracked for parent recommendations

### Quick Challenges

- Multiplication tables 1–12
- 12 randomized typed-answer problems per table
- 144 multiplication facts
- Hint button, answer explanations, timer, best-time tracking, XP, and badges
- Mastery requires at least 10 correct answers out of 12

### Reading Forest

- 10 reading-comprehension stories and 40 questions
- Three difficulty levels
- Randomized questions and answer choices
- Reading-strategy hints before answering
- Correct-answer explanations after each response
- Main idea, inference, sequence, vocabulary, cause and effect, character traits, compare and contrast, prediction, and problem/solution
- Somebody–Wanted–But–So–Then summary framework

### Roblox Builder Lab

- Eight progressive Roblox Studio lessons
- Original game project: **Harvest a Galaxy**
- Studio basics, parts, anchoring, Lua, events, leaderstats, collectibles, cloning, TweenService, rarity systems, user interfaces, testing, and safe publishing
- Guided build tasks, starter Lua code, checkpoint quizzes, XP, locked progression, and developer badges
- Originality and child-safety reminders included throughout

### Parent tools

- XP and student levels
- Badges
- Best-score and best-time tracking
- Missed-fact recommendations
- Math, reading, quick-table, and Roblox course progress
- Dad Dashboard and progress export

## Content architecture

The app engine is stored in `index.html`. Lesson content is stored separately:

- `data/math-lessons.js`
- `data/reading-lessons.js`
- `data/quick-challenges.js`
- `data/roblox-course.js`

## Progress storage

Progress is currently saved in the browser using `localStorage`. Progress remains on the specific device and browser being used.

## Learning rules

- Correct answers must not remain in predictable positions.
- Questions should shuffle each session.
- Hints should guide thinking without immediately giving away answers.
- Wrong answers should provide a clear explanation.
- New game projects must use original names, code, artwork, models, and sound or properly licensed assets.
- Child publishing, chat, privacy, and monetization settings must be reviewed by a parent.

## Next production upgrades

1. Firebase cloud progress syncing
2. Student and parent login
3. Daily adaptive review using missed facts
4. Expanded 30-story reading curriculum
5. Additional Roblox coding projects
6. Science Island
7. Weekly progress reports