const events = [];

document.addEventListener('DOMContentLoaded', () => {
    createCalendar();
    document.getElementById('add-event').addEventListener('click', addEvent);
});

function createCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    for (let day = 1; day <= 30; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');
        dayCell.dataset.day = day;
        dayCell.innerHTML = `<strong>${day}</strong>`;
        calendarGrid.appendChild(dayCell);
    }
    loadEvents();
}

function addEvent() {
    const day = document.getElementById('event-day').value;
    const eventName = document.getElementById('event-name').value;

    if (day && eventName) {
        events.push({ day, name: eventName });
        saveEvents();
        displayEvent(day, eventName);
        document.getElementById('event-name').value = ''; // Clear input
    } else {
        alert('Por favor, selecciona un día y escribe un nombre de evento.');
    }
}

function displayEvent(day, name) {
    const dayCell = document.querySelector(`.day[data-day='${day}']`);
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.innerText = name;
    dayCell.appendChild(eventDiv);
}

function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

function loadEvents() {
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    savedEvents.forEach(event => displayEvent(event.day, event.name));
    events.push(...savedEvents);
}
