(() => {
  const menuRoot = document.querySelector('#menu-root');
  const categoryRoot = document.querySelector('#menu-categories');
  const dialog = document.querySelector('#dish-dialog');
  if (!menuRoot || !categoryRoot || !dialog) return;
  if (!window.RUMBIA) {
    menuRoot.innerHTML = '<p>The menu is temporarily unavailable. Please try reloading this page.</p>';
    return;
  }

  const { categories, dishes } = window.RUMBIA;
  const knownCategories = new Set(categories.map((category) => category.id));

  function currentCategory() {
    const hash = location.hash.replace('#', '');
    return knownCategories.has(hash) ? hash : categories[0].id;
  }

  function formatPrice(price) {
    return `BND ${price.toFixed(2)}`;
  }

  function openDish(dish) {
    dialog.querySelector('[data-dish-name]').textContent = dish.name;
    dialog.querySelector('[data-dish-description]').textContent = dish.description;
    dialog.querySelector('[data-dish-price]').textContent = formatPrice(dish.price);
    dialog.querySelector('[data-dish-dietary]').textContent = dish.dietary;
    const media = dialog.querySelector('.dish-dialog-media');
    const image = media.querySelector('img');
    if (dish.image) {
      image.src = dish.image;
      image.alt = `${dish.name}, a featured Rumbia dish`;
      media.hidden = false;
    } else {
      media.hidden = true;
      image.removeAttribute('src');
    }
    dialog.showModal();
  }

  function render(categoryId, updateHistory = false) {
    const category = categories.find((item) => item.id === categoryId) || categories[0];
    const filtered = dishes.filter((dish) => dish.category === category.id);

    categoryRoot.innerHTML = categories.map((item) => `
      <button class="category-button" type="button" data-category="${item.id}" aria-pressed="${item.id === category.id}">
        <span>${item.label}</span><small lang="ms">${item.malay}</small>
      </button>
    `).join('');

    menuRoot.classList.add('is-changing');
    window.setTimeout(() => {
      menuRoot.innerHTML = `
        <header class="menu-group-heading">
          <h2>${category.label}</h2>
          <p lang="ms">${category.malay}</p>
        </header>
        <div class="dish-list">
          ${filtered.map((dish) => `
            <button class="dish-row" type="button" data-dish="${dishes.indexOf(dish)}" aria-label="View details for ${dish.name}">
              <span class="dish-copy"><strong>${dish.name}</strong><span>${dish.description}</span><small>${dish.dietary}</small></span>
              <span class="dish-price">${formatPrice(dish.price)}</span>
            </button>
          `).join('')}
        </div>
      `;
      menuRoot.classList.remove('is-changing');
      menuRoot.querySelectorAll('[data-dish]').forEach((button) => {
        button.addEventListener('click', () => openDish(dishes[Number(button.dataset.dish)]));
      });
    }, 120);

    categoryRoot.querySelectorAll('[data-category]').forEach((button) => {
      button.addEventListener('click', () => render(button.dataset.category, true));
    });

    if (updateHistory) history.pushState({ category: category.id }, '', `#${category.id}`);
  }

  dialog.querySelector('[data-dialog-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  window.addEventListener('popstate', () => render(currentCategory()));
  render(currentCategory());
})();
