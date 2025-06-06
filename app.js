document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "pt-br",
    events: [
      { title: "Culto de Domingo", start: "2025-06-10" },
      { title: "Estudo Bíblico", start: "2025-06-12", end: "2025-06-13" },
      { title: "Reunião de Oração", start: "2025-06-14" },
    ],
    eventClick: function (info) {
      alert(`Evento: ${info.event.title}\nData: ${info.event.start.toLocaleDateString()}`);
    },
  });

  calendar.render();
});
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const categoryFilter = document.getElementById("categoryFilter");

  const eventsData = [
    { title: "Culto de Domingo", start: "2025-06-10", category: "Culto" },
    { title: "Estudo Bíblico", start: "2025-06-12", category: "Estudo Bíblico" },
    { title: "Reunião de Oração", start: "2025-06-14", category: "Reunião" },
  ];

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "pt-br",
    events: eventsData,
    eventClick: function (info) {
      alert(`Evento: ${info.event.title}\nData: ${info.event.start.toLocaleDateString()}`);
    },
  });

  function filterEvents() {
    const selectedCategory = categoryFilter.value;
    const filteredEvents = selectedCategory
      ? eventsData.filter(event => event.category === selectedCategory)
      : eventsData;
    calendar.removeAllEvents();
    calendar.addEventSource(filteredEvents);
  }

  categoryFilter.addEventListener("change", filterEvents);

  calendar.render();
});
const addEventForm = document.getElementById("addEventForm");

addEventForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("eventTitle").value;
  const date = document.getElementById("eventDate").value;
  const category = document.getElementById("eventCategory").value;

  if (title && date && category) {
    const newEvent = { title, start: date, category };
    eventsData.push(newEvent);
    calendar.addEvent(newEvent);

    alert("Evento adicionado com sucesso!");
    addEventForm.reset();
  } else {
    alert("Preencha todos os campos!");
  }
});
let eventsData = [];

fetch("./assets/events.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao carregar o arquivo JSON");
    }
    return response.json();
  })
  .then(data => {
    eventsData = data; // Salva os dados do JSON na variável
    initializeCalendar(eventsData); // Inicializa o calendário
  })
  .catch(error => console.error("Erro ao carregar eventos:", error));
function initializeCalendar(events) {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "pt-br",
    events: events, // Use os eventos carregados
    eventClick: function (info) {
      alert(`Evento: ${info.event.title}\nData: ${info.event.start.toLocaleDateString()}`);
    },
  });

  calendar.render();
}
