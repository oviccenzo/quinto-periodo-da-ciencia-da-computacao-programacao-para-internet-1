document.addEventListener('DOMContentLoaded', () => {

  const extensionsGrid = document.getElementById('extensions-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const themeToggleButton = document.getElementById('theme-toggle');
  const themeIcon = themeToggleButton.querySelector('i');
  const body = document.body;

  let allExtensions = [];
  let currentFilter = 'all';


  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      body.classList.remove('dark-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  };

  themeToggleButton.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark-theme');
    const newTheme = isDarkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme); // Salva a preferência
    applyTheme(newTheme);
  });

 
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);


  async function fetchExtensions() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      allExtensions = await response.json();
      renderExtensions();
    } catch (error) {
      console.error("Could not fetch extensions:", error);
      extensionsGrid.innerHTML = '<p>Failed to load extensions.</p>';
    }
  }

 
  function renderExtensions() {
    extensionsGrid.innerHTML = '';

    const filteredExtensions = allExtensions.filter(ext => {
      if (currentFilter === 'active') return ext.isActive;
      if (currentFilter === 'inactive') return !ext.isActive;
      return true; // 'all'
    });

    if (filteredExtensions.length === 0) {
      extensionsGrid.innerHTML = '<p style="text-align: center; width: 100%;">No extensions match the current filter.</p>';
      return;
    }

    filteredExtensions.forEach((ext) => {
      const card = document.createElement('div');
      card.dataset.id = ext.name;
      card.className = `extension-card ${ext.isActive ? '' : 'inactive'}`;

      card.innerHTML = `
        <div class="card-header">
          <img src="${ext.logo}" alt="${ext.name} logo" class="card-logo">
          <h2 class="card-title">${ext.name}</h2>
        </div>
        <p class="card-description">${ext.description}</p>
        <div class="card-footer">
          <button class="remove-btn">Remove</button>
          <label class="toggle-switch">
            <input type="checkbox" class="toggle-input" ${ext.isActive ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        </div>
      `;
      extensionsGrid.appendChild(card);
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentFilter = button.id.replace('filter-', '');
      renderExtensions();
    });
  });

  extensionsGrid.addEventListener('click', (event) => {
    const card = event.target.closest('.extension-card');
    if (!card) return;

    const extensionId = card.dataset.id;
    const extensionIndex = allExtensions.findIndex(ext => ext.name === extensionId);
    if (extensionIndex === -1) return;

    if (event.target.classList.contains('remove-btn')) {
      allExtensions.splice(extensionIndex, 1);
      renderExtensions();
    }

    if (event.target.classList.contains('toggle-input')) {
      allExtensions[extensionIndex].isActive = !allExtensions[extensionIndex].isActive;
      renderExtensions();
    }
  });

  fetchExtensions();
});