class CookingSystem {
    constructor() {
        this.slots = [null, null, null]; // 3 слота ввода
        this.results = [null, null, null]; // 3 слота хранения
        this.isInit = false;
        this.targetOrder = null;   
        this.currentPage = 0;
    }

    start(orderId, dishName) {
        console.log("Кухня открыта. Готовим:", dishName);
        this.targetOrder = orderId; 
        this.resetTable();
        
        const display = document.getElementById('current-order-display');
        if (display) {
            // Если передан текст - показываем его, иначе дефолт
            display.innerText = dishName || "Что-то вкусное";
            display.style.fontStyle = 'normal';
            display.style.fontWeight = 'bold';
        }

        this.renderPantry();

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
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.onclick = () => this.performAction(btn.dataset.act);
        });

        document.getElementById('trash-btn').onclick = () => this.resetTable();

        // Внутри initButtons() в файле cooking.js

        document.getElementById('serve-dish-btn').onclick = () => {
            // 1. Собираем все готовые блюда, которые лежат в слотах результатов
            const dishesOnTable = this.results.filter(item => item && item !== 'trash');

            // 2. Логика для ДВОЙНОГО ЗАКАЗА (Пламенеющая и Незабудочка)
            if (this.targetOrder === 'sweet_combo_duo') {
                const hasKid = dishesOnTable.includes('sweet_combo_kid');
                const hasAdult = dishesOnTable.includes('sweet_combo_adult');

                if (hasKid && hasAdult) {
                    // Если на столе есть ОБА блюда - подаем "виртуальный" двойной заказ
                    if (window.game) window.game.finishCooking('sweet_combo_duo');
                    return;
                }
            }

            // 3. Логика для обычных одиночных заказов          
            let dishToServe = dishesOnTable.find(d => d === this.targetOrder);
            
            // Если идеального совпадения нет, берем первое попавшееся (игрок ошибся)
            if (!dishToServe && dishesOnTable.length > 0) {
                dishToServe = dishesOnTable[0];
            }

            if (dishToServe && window.game) {
                window.game.finishCooking(dishToServe);
            }
        };

        document.getElementById('recipe-book-btn').onclick = () => {
            document.getElementById('recipe-modal').classList.remove('hidden');
            this.currentPage = 0; 
            this.renderBookPage();
        };
        document.getElementById('close-book-btn').onclick = () => {
            document.getElementById('recipe-modal').classList.add('hidden');
        };
    }

    // Перенос из результата обратно на стол
    moveResultToInput(resultIndex) {
        const item = this.results[resultIndex];
        if (!item || item === 'trash') return;

        // Ищем свободный слот
        for (let i = 0; i < 3; i++) {
            if (!this.slots[i]) {
                this.slots[i] = item;
                this.results[resultIndex] = null;
                this.updateTableUI();
                return;
            }
        }
        alert("На столе нет места!");
    }

    // --- В файле cooking.js ---

    // 1. УМНЫЙ ФИЛЬТР ИНГРЕДИЕНТОВ
    renderPantry() {
        const grid = document.getElementById('pantry-grid');
        if (!grid) return;
        grid.innerHTML = ''; 

        if (typeof BASE_INGREDIENTS !== 'undefined') {
            BASE_INGREDIENTS.forEach(key => {
                // ПРОВЕРКА НА ХОРРОР
                const isHorrorItem = ['rat', 'shaman',  'herring'].includes(key);
                
                // Если сейчас НЕ хоррор режим, а предмет страшный - пропускаем его
                if (!window.game.isHorrorMode && isHorrorItem) {
                    return; 
                }

                const el = document.createElement('div');
                el.className = 'item-card';
                el.innerText = ITEMS[key] || key;
                el.onclick = () => this.addToSlot(key);
                grid.appendChild(el);
            });
        }
    }

    // 2. УМНАЯ КНИГА РЕЦЕПТОВ
    renderBookPage() {
        const bookArea = document.getElementById('book-text-area');
        
        // Фильтруем страницы: показываем хоррор-рецепты (последние 3) ТОЛЬКО в хоррор-режиме
        // Обычных рецептов 9 штук (0-8), Хоррор (9-11)
        
        let content = "";
        
        // Если это обычная страница
        if (this.currentPage < 9) {
            content = RECIPE_PAGES[this.currentPage];
        } 
        // Если это страница с хоррором
        else {
            if (window.game.isHorrorMode) {
                content = RECIPE_PAGES[this.currentPage];
            } else {
                // Если мы долистали до конца в обычном режиме - показываем пустую страницу или "Конец"
                content = "<h3>Заметки</h3><p>Здесь пока пусто...</p>";
            }
        }
        
        bookArea.innerHTML = `
            <div class="book-page-text">${content}</div>
            <div class="book-nav">
                <button class="book-btn" id="prev-page-btn">←</button>
                <span>${this.currentPage + 1} / ${RECIPE_PAGES.length}</span>
                <button class="book-btn" id="next-page-btn">→</button>
            </div>
        `;
        
    }

    addToSlot(itemId) {
        for (let i = 0; i < 3; i++) {
            if (!this.slots[i]) {
                this.slots[i] = itemId;
                this.updateTableUI();
                return;
            }
        }
    }

    clearSlot(index) {
        this.slots[index] = null;
        this.updateTableUI();
    }

    updateTableUI() {
        // Обновляем слоты ввода
        for (let i = 0; i < 3; i++) {
            const el = document.getElementById(`slot-${i+1}`);
            if (el) el.innerText = this.slots[i] ? (ITEMS[this.slots[i]] || this.slots[i]) : "";
        }

        // Обновляем слоты результата
        for (let i = 0; i < 3; i++) {
            const el = document.getElementById(`craft-result-${i+1}`);
            if (el) {
                const itemKey = this.results[i];
                el.innerText = itemKey ? (ITEMS[itemKey] || itemKey) : "";
                el.style.background = itemKey ? "#fffacd" : "#fffbe6";
            }
        }

        // Кнопки
        const hasResult = this.results.some(r => r !== null);
        const trashBtn = document.getElementById('trash-btn');
        const serveBtn = document.getElementById('serve-dish-btn');

        if (this.slots.some(s => s) || hasResult) {
            trashBtn.classList.remove('hidden');
        } else {
            trashBtn.classList.add('hidden');
        }

        // Показываем кнопку подачи, если есть хоть один результат не-мусор
        const hasGoodResult = this.results.some(r => r && r !== 'trash');
        if (hasGoodResult) {
            serveBtn.classList.remove('hidden');
        } else {
            serveBtn.classList.add('hidden');
        }
    }

    performAction(actionType) {
        const inputs = this.slots.filter(i => i !== null);
        if (inputs.length === 0) return;

        let foundRecipe = null;
        
        // Поиск рецепта
        for (let r of CRAFTING_TABLE) {
            if (r.action !== actionType) continue;
            
            const rInputs = [...r.inputs].sort();
            const currentInputs = [...inputs].sort();
            
            // Сравниваем массивы (JSON.stringify работает для простых массивов строк)
            if (JSON.stringify(rInputs) === JSON.stringify(currentInputs)) {
                foundRecipe = r;
                break;
            }
        }

        // Очищаем слоты
        this.slots = [null, null, null];
        
        const resultItem = foundRecipe ? foundRecipe.result : 'trash';

        // Кладем результат в первый свободный слот результатов
        let placed = false;
        for (let i = 0; i < 3; i++) {
            if (!this.results[i]) {
                this.results[i] = resultItem;
                placed = true;
                break;
            }
        }
        
        if (!placed) {
            // Если места нет, перезаписываем первый слот (или можно выдавать ошибку)
            this.results[0] = resultItem; 
        }

        this.updateTableUI();
    }

    renderBookPage() {
        // (Этот код не меняется, он просто берет текст из data.js)
        const bookArea = document.getElementById('book-text-area');
        const pageContent = RECIPE_PAGES[this.currentPage];
        bookArea.innerHTML = `
            <div class="book-page-text">${pageContent}</div>
            <div class="book-nav">
                <button class="book-btn" id="prev-page-btn">←</button>
                <span>${this.currentPage + 1} / ${RECIPE_PAGES.length}</span>
                <button class="book-btn" id="next-page-btn">→</button>
            </div>
        `;
        // ... (обработчики кнопок книги как раньше) ...
        const prevBtn = document.getElementById('prev-page-btn');
        const nextBtn = document.getElementById('next-page-btn');
        if (this.currentPage === 0) prevBtn.style.visibility = 'hidden';
        if (this.currentPage === RECIPE_PAGES.length - 1) nextBtn.style.visibility = 'hidden';
        prevBtn.onclick = () => { if (this.currentPage > 0) { this.currentPage--; this.renderBookPage(); }};
        nextBtn.onclick = () => { if (this.currentPage < RECIPE_PAGES.length - 1) { this.currentPage++; this.renderBookPage(); }};
    }
}

const cookingSystem = new CookingSystem();