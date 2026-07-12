# Jru Academy

Jru Academy is a responsive, browser-based digital learning app built for Jru.

## Live site

https://iamjavondavis.github.io/Jruacademy/

## Current release

### Math Galaxy

- 10 progressive multiplication missions
- 50 total math questions
- Equal groups, 2s, 3s, 4s, 5s, 6s, 7s, 8s, 9s, 10s, arrays, word problems, and mixed mastery
- 80% mastery requirement
- Locked progression
- Final Galaxy Boss Battle

### Reading Forest

- 10 reading-comprehension stories
- 40 total reading questions
- Three difficulty levels
- Main idea, details, sequence, inference, cause and effect, context clues, character traits, compare and contrast, prediction, and problem/solution
- 75% mastery requirement
- Locked progression

### Parent tools

- XP and student levels
- Badges
- Best-score tracking
- Skill recommendations
- Dad Dashboard
- Progress export

## Content architecture

The app engine is stored in `index.html`.

Lesson content is stored separately:

- `data/math-lessons.js`
- `data/reading-lessons.js`

New lessons can be added to the data files without rebuilding the app interface.

## Progress storage

Progress is currently saved in the browser using `localStorage`. Progress remains on the specific device and browser being used.

## Next production upgrades

1. Firebase cloud progress syncing
2. Student and parent login
3. Science Island
4. Parent-controlled AI tutor
5. Weekly progress reports
6. Expanded 30-story reading curriculum and 40-mission math curriculum
