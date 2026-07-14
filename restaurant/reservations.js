(() => {
  const form = document.querySelector('#reservation-form');
  if (!form || !window.RUMBIA) return;

  const dateInput = form.querySelector('#reservation-date');
  const timeField = form.querySelector('#reservation-times');
  const timeError = form.querySelector('#time-error');
  const submitButton = form.querySelector('button[type="submit"]');
  const formView = document.querySelector('#reservation-form-view');
  const confirmation = document.querySelector('#reservation-confirmation');
  const status = document.querySelector('#reservation-status');
  let selectedTime = '';

  const today = new Date();
  const latest = new Date(today);
  latest.setDate(today.getDate() + 60);
  const toDateValue = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  dateInput.min = toDateValue(today);
  dateInput.max = toDateValue(latest);

  function renderTimes() {
    selectedTime = '';
    timeError.textContent = '';
    timeField.setAttribute('aria-busy', 'true');
    timeField.innerHTML = '<span class="time-loading"></span><span class="time-loading"></span><span class="time-loading"></span>';
    window.setTimeout(() => {
      timeField.innerHTML = window.RUMBIA.reservationTimes.map((time, index) => `
        <button type="button" class="time-option" aria-pressed="false" ${index === 3 && Number(form.party.value) >= 7 ? 'disabled' : ''}>${time}</button>
      `).join('');
      timeField.removeAttribute('aria-busy');
      timeField.querySelectorAll('button:not(:disabled)').forEach((button) => {
        button.addEventListener('click', () => {
          selectedTime = button.textContent;
          timeField.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
          timeError.textContent = '';
        });
      });
    }, 360);
  }

  dateInput.addEventListener('change', renderTimes);
  form.party.addEventListener('change', () => { if (dateInput.value) renderTimes(); });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!selectedTime) {
      timeError.textContent = 'Choose an available time.';
      timeField.querySelector('button:not(:disabled)')?.focus();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Holding your table...';
    status.textContent = 'Preparing your demo reservation.';

    window.setTimeout(() => {
      const values = new FormData(form);
      const date = new Date(`${values.get('date')}T12:00:00`);
      confirmation.querySelector('[data-confirmation-name]').textContent = values.get('name');
      confirmation.querySelector('[data-confirmation-details]').textContent = `${values.get('party')} guests, ${date.toLocaleDateString('en-BN', { weekday: 'long', day: 'numeric', month: 'long' })} at ${selectedTime}`;
      formView.hidden = true;
      confirmation.hidden = false;
      status.textContent = 'Demo reservation confirmed. Nothing was sent.';
      confirmation.querySelector('button').focus();
    }, 700);
  });

  confirmation.querySelector('button').addEventListener('click', () => {
    form.reset();
    selectedTime = '';
    timeField.innerHTML = '<p class="time-prompt">Choose a date to see times.</p>';
    confirmation.hidden = true;
    formView.hidden = false;
    submitButton.disabled = false;
    submitButton.textContent = 'Reserve a table';
    status.textContent = '';
    form.party.focus();
  });
})();
