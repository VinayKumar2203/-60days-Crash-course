const departmentSelect = document.getElementById('department');
const genderSelect = document.getElementById('gender');
const sortSelect = document.getElementById('sort');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const employeeData = document.getElementById('employee-data');

let currentPage = 1;
let totalPages = 1;
let filteredData = [];

// Function to fetch employee data from the API
function fetchEmployees(page = 1) {
  const url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=10`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      totalPages = Math.ceil(data.totalCount / 10);
      filteredData = data.data; // Save the fetched data for filtering
      applyFiltersAndSort(); // Apply filters and sorting
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to render employee data in the table
function renderEmployees(data) {
  employeeData.innerHTML = '';
  data.forEach((employee, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${(currentPage - 1) * 10 + index + 1}</td>
      <td>${employee.name}</td>
      <td>${employee.gender}</td>
      <td>${employee.department}</td>
      <td>${employee.salary}</td>
    `;
    employeeData.appendChild(row);
  });
}

// Function to apply filters and sorting to the data
function applyFiltersAndSort() {
  let filtered = filteredData.slice();
  const departmentFilter = departmentSelect.value;
  const genderFilter = genderSelect.value;
  const sortOption = sortSelect.value;

  // Apply department filter
  if (departmentFilter) {
    filtered = filtered.filter(employee => employee.department === departmentFilter);
  }

  // Apply gender filter
  if (genderFilter) {
    filtered = filtered.filter(employee => employee.gender === genderFilter);
  }

  // Apply sorting
  if (sortOption === 'asc') {
    filtered.sort((a, b) => a.salary - b.salary);
  } else if (sortOption === 'desc') {
    filtered.sort((a, b) => b.salary - a.salary);
  }

  renderEmployees(filtered);
}

// Function to handle department filter change
function handleDepartmentChange() {
  applyFiltersAndSort();
}

// Function to handle gender filter change
function handleGenderChange() {
  applyFiltersAndSort();
}

// Function to handle sort option change
function handleSortChange() {
  applyFiltersAndSort();
}

// Function to handle previous button click
function handlePrevButtonClick() {
  if (currentPage > 1) {
    currentPage--;
    fetchEmployees(currentPage);
  }
}

// Function to handle next button click
function handleNextButtonClick() {
  if (currentPage < totalPages) {
    currentPage++;
    fetchEmployees(currentPage);
  }
}

// Add event listeners
departmentSelect.addEventListener('change', handleDepartmentChange);
genderSelect.addEventListener('change', handleGenderChange);
sortSelect.addEventListener('change', handleSortChange);
prevButton.addEventListener('click', handlePrevButtonClick);
nextButton.addEventListener('click', handleNextButtonClick);

// Initial fetch when the page loads
fetchEmployees();
