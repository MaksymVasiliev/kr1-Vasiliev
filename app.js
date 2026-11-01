const announcements = [
  { title: "Консультація з веб-технологій", category: "Навчання", date: "2026-10-28", urgent: false, text: "Ауд. 305, 14:00. Приносьте питання по PR." },
  { title: "Зміна розкладу на п'ятницю", category: "Адмін", date: "2026-10-30", urgent: true, text: "Пари переносяться на годину раніше." },
  { title: "Хакатон кафедри", category: "Події", date: "2026-11-14", urgent: false, text: "Реєстрація до 10 листопада. Команди по 3." },
  { title: "Здати залікові книжки", category: "Адмін", date: "2026-11-03", urgent: true, text: "Деканат, до 16:00." },
  { title: "Лекція гостя з індустрії", category: "Події", date: "2026-11-06", urgent: false, text: "Про роботу з ШІ-агентами в команді." },
  { title: "Дедлайн по лабораторній 5", category: "Навчання", date: "2026-10-31", urgent: true, text: "PR має бути злитий до пари." },
];

const list = document.querySelector("#list");
const empty = document.querySelector("#empty");
const select = document.querySelector("#category");

function render(items) {
  list.textContent = "";
  for (const a of items) {
    const li = document.createElement("li");
    li.className = "card";
    const tag = document.createElement("span");
    tag.className = a.urgent ? "tag urgent" : "tag";
    tag.textContent = a.category;
    const h3 = document.createElement("h3");
    h3.textContent = a.title;
    const date = document.createElement("time");
    date.dateTime = a.date;
    date.textContent = a.date;
    const p = document.createElement("p");
    p.textContent = a.text;
    li.append(tag, h3, date, p);
    list.append(li);
  }
  empty.hidden = items.length > 0;
}

function applyFilter() {
  const value = select.value;
  const filtered = value === "all" ? announcements : announcements.filter((a) => a.category.toLowerCase() === value);
  render(filtered);
}

select.addEventListener("change", applyFilter);
render(announcements);

const holidaysBtn = document.querySelector("#holidays-btn");
const holidaysStatus = document.querySelector("#holidays-status");
const holidaysList = document.querySelector("#holidays-list");

function todayISO() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function renderHolidays(items) {
  holidaysList.textContent = "";
  for (const h of items) {
    const li = document.createElement("li");
    const date = document.createElement("time");
    date.dateTime = h.date;
    date.textContent = h.date;
    const name = document.createElement("span");
    name.textContent = h.localName;
    li.append(date, " — ", name);
    holidaysList.append(li);
  }
}

async function loadHolidays() {
  const year = new Date().getFullYear();
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/UA`;
  holidaysBtn.disabled = true;
  holidaysStatus.textContent = "Завантажую…";
  holidaysList.textContent = "";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`сервер відповів ${response.status}`);
    }
    const holidays = await response.json();
    const today = todayISO();
    const upcoming = holidays.filter((h) => h.date > today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
    renderHolidays(upcoming);
    holidaysStatus.textContent = upcoming.length > 0 ? "" : "До кінця року свят більше немає.";
  } catch (err) {
    holidaysStatus.textContent = `Не вдалося завантажити свята (${err.message}). Перевірте з'єднання і спробуйте ще раз.`;
  } finally {
    holidaysBtn.disabled = false;
  }
}

holidaysBtn.addEventListener("click", loadHolidays);
