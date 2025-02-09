fetch('data.json')  // Fetch the JSON file
  .then(response => response.json())  // Parse the JSON data
  .then(data => {
    const projects = data.projects;  // Access the "projects" array

    projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.classList.add('project');  // Add the 'project' class

      // Add content to the project element
      projectElement.innerHTML = `
        <h3>${project.name}</h3>
        <p>Tags: ${project.tags}</p>
      `;

      // Append the project element to the body or another container
      document.body.appendChild(projectElement);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });