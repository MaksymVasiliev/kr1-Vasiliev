# DIAGNOSIS

## Тикет 1 — «Додати» веде на 404 на Pages

- **Шар:** HTTP
- **Інструмент:** DevTools > Network. Клік по «Додати» > запит `GET /Add.html` > **404 Not Found**. Файлу з такою назвою в репозиторії немає, є лише `add.html`
- **Винуватець:** `index.html:17` - `<a href="Add.html">`
- **Причина:** GitHub Pages чутливий до регістру
- **Виправлення:** `href="Add.html"` > `href="add.html"`

## Тикет 2 — термінові оголошення без червоної позначки

- **Шар:** CSS
- **Інструмент:** DevTools > Elements > Styles. На `<span class="tag urgent">` застосовується лише `.tag`
- **Винуватець:** `style.css:26` — `.tag .urgent { … }`
- **Причина:** зайвий пробіл
- **Виправлення:** `.tag .urgent` > `.tag.urgent`

## Тикет 3 — фільтр за категорією показує «Нічого не знайдено»

- **Шар:** JS
- **Інструмент:** DevTools > Sources, точка зупинки в `applyFilter` (`app.js:37`). Після вибору «навчання»: `value = "навчання"`, а `announcements[0].category = "Навчання"` > порівняння `===` дає `false`, `filtered.length === 0`.
- **Винуватець:** `app.js:37` — `a.category === value`
- **Причина:** строге порівняння чутливе до регістру
- **Виправлення:** `a.category === value` > `a.category.toLowerCase() === value`.
