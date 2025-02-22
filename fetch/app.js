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
      const matchAllCheckbox = document.getElementById('matchAllCheckbox'); // This might be null if hidden

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
        // First, separate the featured projects
        const featuredProjects = projects.filter(project => project.tags.includes('featured') && 
          (selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag)))
        );

        // Then, filter the non-featured projects
        const nonFeaturedProjects = projects.filter(project => !project.tags.includes('featured') && 
          (selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag)))
        );

        // Combine featured first, then non-featured
        const filteredProjects = [...featuredProjects, ...nonFeaturedProjects];

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
        if (showAllBtn.classList.contains('active')) {
          // Reset the tags when Show All is active
          selectedTags = [];
        }

        if (selectedTags.includes(tag)) {
          selectedTags = selectedTags.filter(t => t !== tag);
        } else {
          selectedTags.push(tag);
        }

        displayProjects();
      }

      // Event listener for Show All button
      showAllBtn.addEventListener('click', function() {
        selectedTags = [];  // Reset tags when Show All is clicked
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

      // Initialize the Match All checkbox visibility
      function toggleMatchAllVisibility() {
        if (showAllBtn.classList.contains('active')) {
          if (matchAllCheckbox) {  // Only modify style if matchAllCheckbox exists
            matchAllCheckbox.style.display = 'none';
          }
        } else {
          if (matchAllCheckbox) {  // Only modify style if matchAllCheckbox exists
            matchAllCheckbox.style.display = 'inline-block';
          }
        }
      }

      // Only add event listener to the checkbox if it's visible
      if (matchAllCheckbox) {
        matchAllCheckbox.addEventListener('change', function() {
          isMatchAll = this.checked;
          displayProjects();
        });
      }

      // Initial display with all projects visible
      displayProjects();
      toggleMatchAllVisibility();
    });
});
