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

### Multiplication Memory Match

- Six randomized pairs per round
- Match each multiplication fact with its product
- Tracks moves and elapsed time
- Saves the best result on the current device
- Mobile-friendly three- or four-column card layout

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

### 3D Avatar Studio

- Interactive WebGL block-style character
- Drag to rotate the character
- Pinch or scroll to zoom
- Live skin tone, hair, shirt, pants, shoes, and accessory changes
- 20 ready-made outfit presets
- Random outfit button
- Up to 10 saved looks on the current device
- Reward sounds for selections and saved outfits
- Uses original character parts and styles

### Academy Worlds

The complete-school expansion adds project-based learning across:

- Math Lab: place value, addition, subtraction, fractions, time, money, measurement, geometry, patterns, and logic
- Writer's Workshop: sentences, grammar, punctuation, journaling, and storytelling
- Science Island: plants, weather, matter, and space
- World Explorer: maps, geography, communities, cultures, and family history
- Money Mountain: needs and wants, saving, budgeting, banking, and entrepreneurship
- Code Kingdom: computer parts, algorithms, debugging, Scratch, and internet safety
- Creative Studio: Apple Freeform, color, shapes, posters, and game storyboards
- AI Factory: AI basics, prompting, fact-checking, privacy, and safety
- Life Skills: routines, organization, kitchen math, and public speaking
- Brain Gym: memory, chess, puzzles, and logic
- Parent Challenges: weekly real-world family projects

### Learning Hub

- Every Academy Worlds lesson includes a **Watch Example** option.
- Video links open targeted YouTube searches using trusted educational sources such as Khan Academy, Math Antics, Numberblocks, Homeschool Pop, SciShow Kids, National Geographic Kids, Code.org, Scratch, Apple Support, Canva Design School, and Common Sense Education.
- Parent approval is required before viewing.
- Autoplay should be disabled when possible.
- Jru returns to the Academy to complete a real task after watching.

### Parent tools

- XP and student levels
- Badges
- Best-score and best-time tracking
- Missed-fact recommendations
- Math, reading, quick-table, Roblox, Academy Worlds, Memory Match, and Avatar Studio progress
- Parents Dashboard and progress export

## Content architecture

The app engine is stored in `index.html`. Lesson content is stored separately:

- `data/math-lessons.js`
- `data/reading-lessons.js`
- `data/quick-challenges.js`
- `data/roblox-course.js`
- `data/academy-expansion.js`
- `data/avatar-studio.js`

## Progress storage

Progress is currently saved in the browser using `localStorage`. Progress remains on the specific device and browser being used.

## Learning rules

- Correct answers must not remain in predictable positions.
- Questions should shuffle each session.
- Hints should guide thinking without immediately giving away answers.
- Wrong answers should provide a clear explanation.
- Videos are references, not substitutes for completing the project or practice.
- New game projects must use original names, code, artwork, models, and sound or properly licensed assets.
- Child publishing, chat, privacy, video access, and monetization settings must be reviewed by a parent.

## Next production upgrades

1. Firebase cloud progress syncing
2. Student and parent login
3. Daily adaptive review using missed facts
4. Expanded 30-story reading curriculum
5. Additional Roblox coding projects
6. Weekly progress reports
7. Parent-managed video library with direct approved links