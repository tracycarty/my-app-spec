interface Student {
  id: string;
  firstName: string;
  course: string;
  year: string;
  section: string;
  isPresent: boolean;
}

function createTable(): HTMLTableElement {
  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  table.style.width = '100%';

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>First Name</th>
      <th>Course</th>
      <th>Year</th>
      <th>Section</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  tbody.id = 'students-body';
  table.appendChild(tbody);

  return table;
}

async function loadStudents() {
  const res = await fetch('http://localhost:3000/api/students');
  const students: Student[] = await res.json();
  const tbody = document.getElementById('students-body') as HTMLTableSectionElement;
  tbody.innerHTML = '';

  students.forEach((s) => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #ccc';
    row.style.padding = '8px';

    const statusText = s.isPresent ? 'Present' : 'Absent';
    const buttonText = s.isPresent ? 'Checked' : 'Present';
    const buttonDisabled = s.isPresent;

    row.innerHTML = `
      <td>${s.firstName}</td>
      <td>${s.course}</td>
      <td>${s.year}</td>
      <td>${s.section}</td>
      <td>${statusText}</td>
      <td></td>
    `;

    const actionCell = row.querySelector('td:last-child') as HTMLTableCellElement;
    const button = document.createElement('button');
    button.textContent = buttonText;
    button.disabled = buttonDisabled;
    button.style.padding = '5px 10px';
    button.style.borderRadius = '5px';
    button.style.cursor = buttonDisabled ? 'not-allowed' : 'pointer';
    button.style.backgroundColor = buttonDisabled ? '#95a5a6' : '#3498db';
    button.style.color = 'white';

    button.addEventListener('click', async () => {
      await fetch(`http://localhost:3000/api/students/${s.id}/present`, { method: 'POST' });
      loadStudents();
    });

    actionCell.appendChild(button);
    tbody.appendChild(row);
  });
}

function initApp() {
  const container = document.createElement('div');
  container.style.maxWidth = '900px';
  container.style.margin = '20px auto';
  container.style.fontFamily = 'Arial, sans-serif';

  const title = document.createElement('h1');
  title.textContent = 'Attendance Checker';
  container.appendChild(title);

  const table = createTable();
  container.appendChild(table);

  document.body.appendChild(container);
  loadStudents();
}

window.onload = initApp;
