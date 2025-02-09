document.addEventListener('DOMContentLoaded', function() {
  fetch('data.json') // Fetch the JSON file
    .then(response => response.json())
    .then(data => {
      const projects = data.projects;
      let selectedTags = [];
      let isMatchAll = false;

      const projectList = document.getElementById('project-list');
      const showAllBtn = document.getElementById('showAllBtn');
      const tagsContainer = document.getElementById('tags');
      const projectCount = document.getElementById('projectCount');

      // Extract all unique tags from the data
      const tags = [...new Set(projects.flatMap(project => project.tags))];

      // Dynamically generate the filter buttons based on the tags in the JSON
      tags.forEach(tag => {
        const button = document.createElement('div');
        button.classList.add('filter-btn');
        button.dataset.tag = tag;
        button.textContent = tag;
        tagsContainer.appendChild(button);

        // Add event listener to toggle tag selection
        button.addEventListener('click', function() {
          toggleTag(tag);
          this.classList.toggle('active');
          updateShowAllButton();
        });
      });

      // Show projects
      function displayProjects() {
        const filteredProjects = projects.filter(project => {
          const hasTags = selectedTags.every(tag => project.tags.includes(tag));
          return selectedTags.length === 0 || (isMatchAll ? hasTags : project.tags.some(tag => selectedTags.includes(tag)));
        });

        projectList.innerHTML = filteredProjects.map(project => `
          <div class="project-item">
            <h2 class="project-title">${project.name} <span>(${project.additionalImages.length} images)</span></h2>
            <p class="project-description">${project.description}</p>
            <p class="project-tags">${project.tags.join(', ')}</p>
          </div>
        `).join('');

        projectCount.textContent = `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} match your selection`;
      }

      // Toggle selected tag
      function toggleTag(tag) {
        if (selectedTags.includes(tag)) {
          selectedTags = selectedTags.filter(t => t !== tag);
        } else {
          selectedTags.push(tag);
        }
        displayProjects();
      }

      // Event listener for Show All button
      showAllBtn.addEventListener('click', function() {
        selectedTags = [];
        tagsContainer.querySelectorAll('.filter-btn').forEach(button => button.classList.remove('active'));
        displayProjects();
        updateShowAllButton();
      });

      // Update Show All button state
      function updateShowAllButton() {
        if (selectedTags.length === 0) {
          showAllBtn.classList.add('active');
        } else {
          showAllBtn.classList.remove('active');
        }

        // If all tags are selected, Show All should be active and all other tags unselected
        if (selectedTags.length === tags.length) {
          showAllBtn.classList.add('active');
          tagsContainer.querySelectorAll('.filter-btn').forEach(button => button.classList.remove('active'));
        }
      }

      // Initial display with all projects visible
      displayProjects();
    });
});
