class CookingSystem {
    constructor() {
        this.slots = [null, null, null];    // 3 слота для смешивания (ввод)
        this.results = [null, null, null];  // 3 слота для готовых блюд (вывод)
        this.isInit = false;
        this.targetOrder = null;            // Что заказал гость (id)
        this.currentPage = 0;               // Страница книги рецептов
    }

    // Запуск кухни (вызывается из game.js)
    start(orderId, dishName) {
        console.log("Кухня открыта. Цель:", orderId);
        this.targetOrder = orderId; 
        this.resetTable();
        
        // Обновляем табличку с заказом
        const display = document.getElementById('current-order-display');
        if (display) {
            display.innerText = dishName || "Что-то вкусное";
        }

        // Перерисовываем ингредиенты (зависит от хоррор режима)
        this.renderPantry();

        // Инициализируем кнопки один раз
        if (!this.isInit) {
            this.initButtons();
            this.isInit = true;
        }
    }

    resetTable() {
        this.slots = [null, null, null];
        this.results = [null, null, null];
        this.updateTableUI();
    }

    initButtons() {
        // Кнопки действий (Смешать, Нарезать и т.д.)
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.onclick = () => this.performAction(btn.dataset.act);
        });

        // Кнопка очистки стола
        const trashBtn = document.getElementById('trash-btn');
        if (trashBtn) trashBtn.onclick = () => this.resetTable();

        // === ГЛАВНАЯ ЛОГИКА: КНОПКА "ПОДАТЬ" ===
        const serveBtn = document.getElementById('serve-dish-btn');
        if (serveBtn) {
            serveBtn.onclick = () => {
                // Собираем всё, что лежит в слотах результата (кроме пустоты)
                // 'trash' (мусор) тоже считаем предметом, который можно подать (как ошибку)
                const dishesOnTable = this.results.filter(item => item !== null);

                if (dishesOnTable.length === 0) {
                    alert("Сначала приготовьте блюдо!");
                    return;
                }

                // 1. ПРОВЕРКА НА КОМБО (Для Пламенеющей)
                // Ей нужно 2 блюда: Детское и Взрослое комбо одновременно
                if (this.targetOrder === 'sweet_combo_duo') {
                    const hasKid = dishesOnTable.includes('sweet_combo_kid');
                    const hasAdult = dishesOnTable.includes('sweet_combo_adult');

                    if (hasKid && hasAdult) {
                        if (window.game) window.game.finishCooking('sweet_combo_duo');
                        return;
                    }
                }

                // 2. ОБЫЧНАЯ ЛОГИКА
                // Пытаемся найти среди приготовленного то, что заказали
                let dishToServe = dishesOnTable.find(d => d === this.targetOrder);
                
                // Если правильного блюда нет, берем ПЕРВОЕ попавшееся (чтобы засчитать ошибку)
                if (!dishToServe) {
                    dishToServe = dishesOnTable[0];
                }

                // Отправляем результат в game.js
                if (dishToServe && window.game) {
                    window.game.finishCooking(dishToServe);
                }
            };
        }

        // КНИГА РЕЦЕПТОВ
        const bookBtn = document.getElementById('recipe-book-btn');
        if (bookBtn) {
            bookBtn.onclick = () => {
                document.getElementById('recipe-modal').classList.remove('hidden');
                this.currentPage = 0; 
                this.renderBookPage();
            };
        }
        
        const closeBookBtn = document.getElementById('close-book-btn');
        if (closeBookBtn) {
            closeBookBtn.onclick = () => {
                document.getElementById('recipe-modal').classList.add('hidden');
            };
        }
    }

    // Перенос готового блюда обратно в слот готовки (если нужно доработать)
    moveResultToInput(resultIndex) {
        const item = this.results[resultIndex];
        if (!item) return; // Нельзя переносить пустоту

        // Ищем свободный слот ввода
        for (let i = 0; i < 3; i++) {
            if (!this.slots[i]) {
                this.slots[i] = item;
                this.results[resultIndex] = null; // Убираем из результата
                this.updateTableUI();
                return;
            }
        }
        alert("На разделочном столе нет места!");
    }

    // ОТРИСОВКА ПОЛКИ С ИНГРЕДИЕНТАМИ
    renderPantry() {
        const grid = document.getElementById('pantry-grid');
        if (!grid) return;
        grid.innerHTML = ''; 

        // Проверяем режим через глобальный объект игры
        const isHorror = window.game && window.game.isHorrorMode;
        const currentList = isHorror ? HORROR_INGREDIENTS : BASE_INGREDIENTS;

        if (currentList) {
            currentList.forEach(key => {
                const el = document.createElement('div');
                el.className = 'item-card';
                // Берем название из ITEMS или используем ID, если названия нет
                el.innerText = ITEMS[key] || key;
                
                // Клик добавляет предмет в слот
                el.onclick = () => this.addToSlot(key);
                grid.appendChild(el);
            });
        }
    }

    // ОТРИСОВКА СТРАНИЦЫ КНИГИ
    renderBookPage() {
        const bookArea = document.getElementById('book-text-area');
        if (!bookArea) return;
        
        const isHorror = window.game && window.game.isHorrorMode;
        const currentBook = isHorror ? HORROR_BOOK : RECIPE_PAGES;

        // Защита от выхода за пределы массива
        if (this.currentPage >= currentBook.length) this.currentPage = 0;
        if (this.currentPage < 0) this.currentPage = currentBook.length - 1;

        const pageContent = currentBook[this.currentPage];
        
        bookArea.innerHTML = `
            <div class="book-page-text">${pageContent}</div>
            <div class="book-nav">
                <button class="book-btn" id="prev-page-btn">← Назад</button>
                <span>Стр. ${this.currentPage + 1} из ${currentBook.length}</span>
                <button class="book-btn" id="next-page-btn">Вперед →</button>
            </div>
        `;

        // Навешиваем обработчики на новые кнопки
        document.getElementById('prev-page-btn').onclick = () => {
            this.currentPage--;
            this.renderBookPage();
        };
        document.getElementById('next-page-btn').onclick = () => {
            this.currentPage++;
            this.renderBookPage();
        };
    }

    // Добавление ингредиента в слот ввода
    addToSlot(itemId) {
        for (let i = 0; i < 3; i++) {
            if (!this.slots[i]) {
                this.slots[i] = itemId;
                this.updateTableUI();
                return;
            }
        }
        // Если места нет, ничего не делаем (или можно добавить звук ошибки)
    }

    // Очистка конкретного слота
    clearSlot(index) {
        this.slots[index] = null;
        this.updateTableUI();
    }

    // Обновление HTML (картинки/текст в слотах)
    updateTableUI() {
        // 1. Слоты ввода (где смешиваем)
        for (let i = 0; i < 3; i++) {
            const el = document.getElementById(`slot-${i+1}`);
            if (el) {
                const itemKey = this.slots[i];
                el.innerText = itemKey ? (ITEMS[itemKey] || itemKey) : "";
                // Визуально показываем, занят слот или нет
                el.style.borderColor = itemKey ? "var(--pink-dark)" : "var(--pink-accent)";
                el.style.background = itemKey ? "#fff0f5" : "#fafafa";
            }
        }

        // 2. Слоты результата (готовое)
        for (let i = 0; i < 3; i++) {
            const el = document.getElementById(`craft-result-${i+1}`);
            if (el) {
                const itemKey = this.results[i];
                el.innerText = itemKey ? (ITEMS[itemKey] || itemKey) : "";
                
                // Подсветка готового блюда
                if (itemKey === 'trash') {
                     el.style.background = "#fab1a0"; // Красный оттенок для мусора
                     el.innerText = "Мусор (Ошибка)";
                } else if (itemKey) {
                     el.style.background = "#ffeaa7"; // Желтый для еды
                } else {
                     el.style.background = "#fffbe6"; // Пусто
                }
            }
        }

        // 3. Видимость кнопок
        const hasInput = this.slots.some(s => s !== null);
        const hasResult = this.results.some(r => r !== null);
        
        const trashBtn = document.getElementById('trash-btn');
        const serveBtn = document.getElementById('serve-dish-btn');

        // Кнопка "Очистить" видна, если хоть что-то где-то лежит
        if (trashBtn) {
            if (hasInput || hasResult) trashBtn.classList.remove('hidden');
            else trashBtn.classList.add('hidden');
        }

        // Кнопка "Подать" видна, если есть результат
        if (serveBtn) {
            if (hasResult) serveBtn.classList.remove('hidden');
            else serveBtn.classList.add('hidden');
        }
    }

    // Логика крафта
    performAction(actionType) {
        // Берем только непустые слоты
        const inputs = this.slots.filter(i => i !== null);
        if (inputs.length === 0) return;

        let foundRecipe = null;
        
        // Перебираем рецепты из CRAFTING_TABLE
        for (let r of CRAFTING_TABLE) {
            if (r.action !== actionType) continue; // Действие должно совпадать (напр. 'fry')
            if (r.inputs.length !== inputs.length) continue; // Кол-во ингредиентов тоже

            // Сортируем ингредиенты, чтобы порядок не имел значения
            // (Мука + Вода = Вода + Мука)
            const rInputs = [...r.inputs].sort();
            const currentInputs = [...inputs].sort();
            
            // Сравниваем массивы
            if (JSON.stringify(rInputs) === JSON.stringify(currentInputs)) {
                foundRecipe = r;
                break;
            }
        }

        // Очищаем слоты ввода
        this.slots = [null, null, null];
        
        // Определяем результат
        const resultItem = foundRecipe ? foundRecipe.result : 'trash';

        // Кладем результат в первый свободный слот вывода
        let placed = false;
        for (let i = 0; i < 3; i++) {
            if (!this.results[i]) {
                this.results[i] = resultItem;
                placed = true;
                break;
            }
        }
        
        // Если места нет, перезаписываем первый слот (чтобы игрок не застрял)
        if (!placed) {
            this.results[0] = resultItem;
        }

        this.updateTableUI();
    }
}

// Создаем глобальный экземпляр
const cookingSystem = new CookingSystem();