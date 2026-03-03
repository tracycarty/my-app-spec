# Spec 002 – Attendance Marking Feature (NestJS + TypeScript)

## Goal
Create an attendance feature that displays each student’s first name, course, year, and section, and allows a teacher to mark a student as **Present** using a button that updates their attendance status with a clean, modern UI.

---

## Tech Stack
- Framework: NestJS
- Language: TypeScript
- Storage: In-memory array (no database)
- Frontend: Static HTML + CSS + Vanilla JavaScript
- Styling: Simple modern responsive design (no external libraries)

---

## Non-goals
- No database integration
- No authentication or authorization
- No attendance history tracking
- No editing or deleting students
- No pagination or filtering
- No export functionality
- No UI framework (React, Vue, etc.)

---

## User Story
As a teacher,  
I want to mark students as present using a simple and clean interface,  
So that I can quickly manage attendance during class.

---

# API Design

## Base Route
`/api`

---

## 1. GET /api/students

Returns all students including attendance status.

### Response (200 OK)
```json
[
  {
    "id": "1",
    "firstName": "John",
    "course": "BSIT",
    "year": "3",
    "section": "A",
    "isPresent": false
  }
]
```

---

## 2. POST /api/students/:id/present

Marks a specific student as present.

### Success Response (200 OK)
```json
{
  "message": "Student marked as present",
  "student": {
    "id": "1",
    "firstName": "John",
    "course": "BSIT",
    "year": "3",
    "section": "A",
    "isPresent": true
  }
}
```

---

## Error Response

### 400 Bad Request
```json
{
  "message": "Student not found"
}
```

---

# Data Model

## Entity: Student

Fields:
- id: string
- firstName: string
- course: string
- year: string
- section: string
- isPresent: boolean (default: false)

At least 2 pre-seeded students must exist in memory.

---

# Project Structure

src/
 ├── main.ts
 ├── app.module.ts
 └── students/
      ├── students.module.ts
      ├── students.controller.ts
      ├── students.service.ts
      └── student.entity.ts

public/
 └── index.html

---

# Backend Requirements

## Service Layer
- Maintain private in-memory student array
- findAll(): returns students
- markPresent(id: string):
  - Find student
  - If not found → throw BadRequestException
  - Set isPresent = true
  - Return updated student

## Controller Layer
- Must remain thin
- Use:
  - @Controller('api/students')
  - @Get()
  - @Post(':id/present')
- Return JSON only

---

# UI & Design Requirements

## Design Goals
- Clean
- Minimal
- Professional classroom look
- Easy to read
- Responsive layout
- Clear visual status indicators

---

## Layout Structure

Page Sections:

1. Header
2. Attendance Card Container
3. Student Table

---

## Visual Design Specification

### Page Background
- Light gray background (#f4f6f9)
- Centered content

### Main Card Container
- White background
- Soft shadow
- Rounded corners (8px)
- Padding: 20px
- Max width: 900px
- Centered on page

### Header
- Title: "Attendance Checker"
- Subtitle: "Mark students as present"
- Font: clean sans-serif
- Bold title
- Slight margin spacing

---

## Table Design

- Full width table
- Soft borders
- Table header background: #2c3e50
- Header text color: white
- Row hover effect (light gray highlight)
- Proper cell padding (10–12px)

Columns:
- First Name
- Course
- Year
- Section
- Status
- Action

---

## Status Badge Design

If Absent:
- Text: "Absent"
- Background: Light red (#fdecea)
- Text color: Dark red (#c0392b)
- Rounded pill style

If Present:
- Text: "Present"
- Background: Light green (#eafaf1)
- Text color: Dark green (#27ae60)
- Rounded pill style

---

## Button Design

### Present Button
- Background: #3498db (blue)
- White text
- Rounded corners
- Cursor: pointer
- Hover: slightly darker blue

### Checked Button
- Background: #95a5a6 (gray)
- Disabled
- Cursor: not-allowed

---

## UI Behavior Flow

1. Page loads
2. Fetch GET /api/students
3. Render students in styled table
4. If isPresent = false → Show blue "Present" button
5. If isPresent = true → Show gray disabled "Checked" button
6. On click:
   - Send POST request
   - Refresh list
   - Update status badge
   - Disable button

---

# Static File Serving

- Use NestJS static assets configuration
- Serve files from `/public`
- Access via:
  http://localhost:3000

---

# Acceptance Criteria

- [ ] GET /api/students returns JSON array
- [ ] POST /api/students/:id/present updates isPresent
- [ ] Invalid ID returns 400 with proper message
- [ ] UI loads automatically
- [ ] Table displays students correctly
- [ ] Status badge changes visually
- [ ] Button changes from Present → Checked
- [ ] Checked button is disabled
- [ ] Page design matches specification
- [ ] No TypeScript errors
- [ ] App runs with `npm run start:dev`
- [ ] Controller remains thin
- [ ] Business logic is inside service only

---

# Implementation Constraints

- No external CSS libraries (Bootstrap, Tailwind, etc.)
- No frontend frameworks
- No database
- Follow NestJS best practices
- Keep code clean and modular

---

# Definition of Done

The feature is complete when:

- Backend API works correctly
- UI reflects attendance changes instantly
- Design matches specified layout and styling
- All acceptance criteria pass
- No runtime errors
- Clean architecture maintained