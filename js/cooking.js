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

        // КНОПКА "ПОДАТЬ" (С ЛОГИКОЙ ДВОЙНОГО ЗАКАЗА)
        document.getElementById('serve-dish-btn').onclick = () => {
            const dishesOnTable = this.results.filter(item => item && item !== 'trash');

            // 1. Двойной заказ (Комбо)
            if (this.targetOrder === 'sweet_combo_duo') {
                const hasKid = dishesOnTable.includes('sweet_combo_kid');
                const hasAdult = dishesOnTable.includes('sweet_combo_adult');

                if (hasKid && hasAdult) {
                    if (window.game) window.game.finishCooking('sweet_combo_duo');
                    return;
                }
            }

            // 2. Обычный заказ
            // Ищем точное совпадение
            let dishToServe = dishesOnTable.find(d => d === this.targetOrder);
            
            // Если точного нет, берем первое попавшееся (ошибка)
            if (!dishToServe && dishesOnTable.length > 0) {
                dishToServe = dishesOnTable[0];
            }

            if (dishToServe && window.game) {
                window.game.finishCooking(dishToServe);
            }
        };

        // КНИГА РЕЦЕПТОВ
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

    // ОТРИСОВКА ИНГРЕДИЕНТОВ (С УЧЕТОМ РЕЖИМА)
    renderPantry() {
        const grid = document.getElementById('pantry-grid');
        if (!grid) return;
        grid.innerHTML = ''; 

        // Выбираем правильный список в зависимости от режима
        const currentList = window.game.isHorrorMode ? HORROR_INGREDIENTS : BASE_INGREDIENTS;

        if (currentList) {
            currentList.forEach(key => {
                const el = document.createElement('div');
                el.className = 'item-card';
                el.innerText = ITEMS[key] || key;
                el.onclick = () => this.addToSlot(key);
                grid.appendChild(el);
            });
        }
    }

    // ОТРИСОВКА КНИГИ (С УЧЕТОМ РЕЖИМА)
    renderBookPage() {
        const bookArea = document.getElementById('book-text-area');
        
        // Выбираем правильную книгу
        const currentBook = window.game.isHorrorMode ? HORROR_BOOK : RECIPE_PAGES;

        // Защита от выхода за границы
        if (this.currentPage >= currentBook.length) this.currentPage = 0;
        if (this.currentPage < 0) this.currentPage = currentBook.length - 1;

        const pageContent = currentBook[this.currentPage];
        
        bookArea.innerHTML = `
            <div class="book-page-text">${pageContent}</div>
            <div class="book-nav">
                <button class="book-btn" id="prev-page-btn">←</button>
                <span>${this.currentPage + 1} / ${currentBook.length}</span>
                <button class="book-btn" id="next-page-btn">→</button>
            </div>
        `;

        // Кнопки навигации
        document.getElementById('prev-page-btn').onclick = () => {
            this.currentPage--;
            this.renderBookPage();
        };
        document.getElementById('next-page-btn').onclick = () => {
            this.currentPage++;
            this.renderBookPage();
        };
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
        // Слоты ввода
        for (let i = 0; i < 3; i++) {
            const el = document.getElementById(`slot-${i+1}`);
            if (el) el.innerText = this.slots[i] ? (ITEMS[this.slots[i]] || this.slots[i]) : "";
        }

        // Слоты результата
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
        
        for (let r of CRAFTING_TABLE) {
            if (r.action !== actionType) continue;
            
            const rInputs = [...r.inputs].sort();
            const currentInputs = [...inputs].sort();
            
            if (JSON.stringify(rInputs) === JSON.stringify(currentInputs)) {
                foundRecipe = r;
                break;
            }
        }

        this.slots = [null, null, null];
        
        const resultItem = foundRecipe ? foundRecipe.result : 'trash';

        // Кладем результат в первый свободный слот
        let placed = false;
        for (let i = 0; i < 3; i++) {
            if (!this.results[i]) {
                this.results[i] = resultItem;
                placed = true;
                break;
            }
        }
        
        if (!placed) {
            this.results[0] = resultItem; // Перезапись, если нет места
        }

        this.updateTableUI();
    }
}

const cookingSystem = new CookingSystem();