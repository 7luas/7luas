// app.js

let allProjects = [];
let filteredProjects = [];

// Fetch the data from the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    allProjects = data.projects; // Store the original projects data
    filteredProjects = [...allProjects]; // Initially show all projects
    renderTagFilters();
    renderProjects(filteredProjects);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Render the tags filter
function renderTagFilters() {
  const tags = new Set();
  allProjects.forEach(project => {
    project.tags.forEach(tag => {
      tags.add(tag);
    });
  });

  const tagFiltersContainer = document.getElementById('tag-filters');
  tags.forEach(tag => {
    const tagButton = document.createElement('div');
    tagButton.classList.add('tag');
    tagButton.textContent = tag;
    tagButton.onclick = () => toggleTagFilter(tag);
    tagFiltersContainer.appendChild(tagButton);
  });
}

// Filter projects by tag
function toggleTagFilter(tag) {
  const tagButtons = document.querySelectorAll('.tag');
  tagButtons.forEach(button => {
    if (button.textContent === tag) {
      button.classList.toggle('active');
    }
  });

  if (isAnyTagActive()) {
    filteredProjects = allProjects.filter(project => {
      return project.tags.some(tag => isTagActive(tag));
    });
  } else {
    filteredProjects = [...allProjects];
  }

  renderProjects(filteredProjects);
}

// Show all projects
function filterByAll() {
  const tagButtons = document.querySelectorAll('.tag');
  tagButtons.forEach(button => {
    button.classList.remove('active');
  });

  filteredProjects = [...allProjects];
  renderProjects(filteredProjects);
}

// Check if any tag is active
function isAnyTagActive() {
  return document.querySelectorAll('.tag.active').length > 0;
}

// Check if a specific tag is active
function isTagActive(tag) {
  const tagButton = [...document.querySelectorAll('.tag')].find(button => button.textContent === tag);
  return tagButton && tagButton.classList.contains('active');
}

// Render the filtered projects
function renderProjects(projects) {
  const projectsList = document.getElementById('projects-list');
  projectsList.innerHTML = ''; // Clear the existing projects

  projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');

    // Add the main image and project details
    projectElement.innerHTML = `
      <img src="${project.mainImage}" alt="${project.name}" />
      <h3>${project.name}</h3>
      ${project.description}
      <div class="tags">
        ${project.tags.map(tag => `<div class="tag">${tag}</div>`).join('')}
      </div>
    `;

    projectsList.appendChild(projectElement);
  });
}
