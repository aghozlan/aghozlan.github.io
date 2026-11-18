# Physics with Mr. Ghozlan

**Live:** https://aghozlan.github.io/physics/

The student platform for Ahmad Ghozlan's physics classes. It lists every confirmed student sheet (lesson sheets, practice sheets, exam practice papers), sorted by grade, unit and lesson.
Students can open a sheet in the page, print it, download its PDF, mark it as done and tick the objectives they master. Their progress stays in their own browser.

Only **student versions** go here. Answer keys and teacher guides are never published.

## Folder layout

```
physics/
  index.html      the platform (reads catalog.json, nothing else to edit)
  catalog.json    the list of grades, lessons and sheets
  sheets/
    grade-7/      one .html and one .pdf per sheet
    grade-9/
    grade-10/
    grade-11/
```

## Add a new sheet (two steps)

1. Copy `my-sheet.html` and `my-sheet.pdf` into `physics/sheets/grade-N/`.
2. Add one entry to `"resources"` in `catalog.json`:

```json
{ "id": "my-sheet", "lesson": "g10-rectilinear", "type": "practice",
  "title": "Short title", "desc": "One line on what is inside.",
  "html": "sheets/grade-10/my-sheet.html", "pdf": "sheets/grade-10/my-sheet.pdf",
  "date": "2026-12-01", "pages": 3 }
```

- `id`: unique, letters, digits and dashes only (it is used in share links: `…/physics/#r=my-sheet`).
- `type`: `lesson`, `practice` or `exam` (add more in `"types"` if needed, e.g. `{ "id": "lab", "label": "Virtual lab", "icon": "🧪" }`).
- `date`: sheets dated within 10 days of `"updated"` show a **NEW** badge. Update `"updated"` at the top of the file each time.
- `group` (optional): sheets with the same group are shown as one card with version buttons (A, B, C…), as for the BJSS exams. Put `Version X` at the end of their titles.

## Add a new lesson, unit or grade

- **Lesson:** add to `"lessons"`: `{ "id": "g9-hooke", "grade": "g9", "unit": "Mechanics", "title": "Hooke's law", "order": 4, "objectives": ["…", "…"] }`.
  The objectives become the "What you should know" checklist.
- **Unit:** just use a new `"unit"` name in a lesson; units appear in the order of their first lesson.
- **Grade:** add to `"grades"`: `{ "id": "g12", "label": "Grade 12", "short": "G12", "color": "#c0392b", "note": "…" }`.

## Share links

- One sheet: `https://aghozlan.github.io/physics/#r=<id>`
- One grade: `https://aghozlan.github.io/physics/#g=g9`
