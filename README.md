# Fact Bwalya — Web Portfolio

My personal student portfolio, built for the ICT251 Web Technologies module
(Mulungushi University). This site demonstrates semantic HTML, responsive CSS,
and interactive JavaScript.

**Live site:** https://myweb.onrender.com
**Repository:** https://github.com/factbwalya-creator/myweb

## About the site

The site presents:
- A hero introduction with name, programme and "View My Projects" button
- About Me, Hobbies, and a Study Learning Plan
- A Weekly Schedule table
- A photo gallery with a viewer
- An introduction video and a hobby audio clip
- A contact form (browser demonstration only — no data is sent)
- A Projects & Skills section with three examples

## JavaScript features

Four interactive JavaScript features are implemented in `js/script.js`.
Each responds to a user action and updates the page.

### 1. Contact form validation and preview (compulsory)
- Validates the name, email and message when the form is submitted.
- Rejects whitespace-only names or messages and invalid email formats.
- Displays a clear error message next to each invalid field.
- On success, shows a local preview of the validated data on the page
  (no server, no message is actually sent). Uses `textContent` for safe
  display of user input.

### 2. Gallery viewer
- Previous and Next buttons change the visible photo and its caption.
- The buttons disable correctly at the first and last photo, so the
  viewer cannot go out of range.

### 3. Study hours calculator
- Accepts hours per day and days per week (1–7).
- Rejects blank, non-numeric or negative hours, and days outside 1–7.
- Displays the total weekly hours.

### 4. Theme switch (light / dark)
- Toggles a dark theme on the page.
- Preference is saved to `localStorage` so it persists on reload.

### 5. Mobile navigation toggle
- Shows a ☰ Menu button on narrow screens.
- Opens and closes the navigation; state is clear via `aria-expanded`.

## How to test the features

Open the live site (or `index.html` locally via Live Server) and try:

1. **Form:** Submit it empty → errors appear. Enter `abc` as email → error.
   Fill in all fields → "Form data validated (not sent)" preview appears.
2. **Gallery:** Click Next through all three photos — Next disables on the
   last. Click Previous back to the first — Previous disables.
3. **Calculator:** Try `2` hours and `5` days → 10 hours/week. Try blank
   fields or days = 10 → validation errors.
4. **Theme switch:** Click 🌙 Dark mode → page goes dark. Reload → stays dark.
5. **Mobile nav:** Narrow the browser to phone width → ☰ Menu appears;
   click to open the links.

## Folder structure
myweb/
├── index.html
├── README.md
├── css/
│ └── styles.css
├── js/
│ └── script.js
├── images/
│ ├── photo1.jpg
│ ├── photo2.jpg
│ └── photo3.jpg
└── videos/
├── intro.mp4
└── voice.mp3


## Sources and references

- MDN Web Docs — HTML, CSS and JavaScript reference: https://developer.mozilla.org/
- FreeCodeCamp — used for revising JavaScript events and DOM methods.
- All written content, photos, video and audio are my own work.

## Author

Fact Bwalya
ICT251 — Web Technologies
Mulungushi University