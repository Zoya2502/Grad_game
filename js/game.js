class Game {
    constructor() {
        this.currentScene = null;
        this.screenyUnlocked = false;
        
        // Состояние игры
        this.day = 1; 
        this.maxGuestsPerDay = 3; 
        this.dailyQueue = []; 
        this.currentOrder = null;
        this.currentGuestData = null;
        this.karma = 0;
        
        // Флаги режимов
        this.isHorrorMode = false; 
        this.sawGlitch = false;
        this.isSans = false;
        
        this.lastOrderText = ""; 
    }

    init() {
        document.getElementById('start-btn').onclick = () => this.startPrologue();
        document.getElementById('next-btn').onclick = () => this.nextStep();
        document.getElementById('cook-btn').onclick = () => this.goToKitchen();
    }

    startPrologue() {
        document.getElementById('menu-screen').classList.add('hidden');
        document.getElementById('vn-screen').classList.remove('hidden');
        this.loadScene('prologue_start');
    }

    nextStep() {
        if (this.currentScene && this.currentScene.type === 'blocking') {
            this.goToKitchen();
            return;
        }
        if (this.nextSceneId) {
            this.loadScene(this.nextSceneId);
        }
    }

    loadScene(sceneId) {
        if (sceneId === 'START_GAME') {
            this.startKitchenDay(); return;
        }
        if (sceneId === 'START_HORROR_DAY') {
            // Начало нового дня в хорроре (переход к гостям)
            this.transitionToDay(); return;
        }

        let scene = SCENES[sceneId] || SCREENY_DIALOGUES[sceneId] || HORROR_SCENES[sceneId];
        if (!scene) { console.error(`Сцена "${sceneId}" не найдена!`); return; }
        
        this.currentScene = scene;

        // 1. СПРАЙТЫ
        const charLeft = document.getElementById('char-left');
        const charRight = document.getElementById('char-right');

        // Жгучая
        if (scene.sprite && CHARACTERS[scene.sprite]) {
            charLeft.style.backgroundImage = `url('${CHARACTERS[scene.sprite]}')`;
            charLeft.classList.add('visible');
        } else {
            if (!charLeft.style.backgroundImage) charLeft.style.backgroundImage = `url('${CHARACTERS['krapiva_calm']}')`;
            charLeft.classList.add('visible');
        }

        // Гость
        if (scene.guestSprite && CHARACTERS[scene.guestSprite]) {
            charRight.style.backgroundImage = `url('${CHARACTERS[scene.guestSprite]}')`;
            charRight.classList.add('visible');
        } else if (!this.currentGuestData && !this.isHorrorMode && scene.speaker !== "Экранчик") {
            charRight.classList.remove('visible');
        }

        // Подсветка
        charLeft.classList.remove('is-speaking');
        charRight.classList.remove('is-speaking');
        if (scene.speaker === "Жгучая Крапива") charLeft.classList.add('is-speaking');
        else if (scene.speaker && scene.speaker !== "Экранчик") charRight.classList.add('is-speaking');

        // 2. ЭКРАНЧИК
        const monitor = document.getElementById('monitor-helper');
        
        // СБРОС ВСЕХ ПОЗИЦИЙ
        monitor.classList.remove('screeny-center');
        monitor.classList.remove('kitchen-mode'); // Важный фикс: убираем режим кухни
        monitor.classList.remove('sans-shake');

        if (this.isSans) {
            monitor.classList.add('sans-visual');
        } else {
            monitor.classList.remove('sans-visual');
        }

        if (scene.showScreeny) {
            this.screenyUnlocked = true;
            monitor.classList.remove('hidden');
            if (scene.speaker === "Экранчик") {
                monitor.classList.add('screeny-center');
                if (sceneId === 'sans_event') monitor.classList.add('sans-shake');
            }
        } else {
            if (!this.screenyUnlocked) monitor.classList.add('hidden');
        }

        // 3. ТЕКСТ И КНОПКИ
        document.getElementById('dialogue-text').innerText = scene.text;
        document.getElementById('speaker-name').innerText = scene.speaker || "???";
        document.getElementById('speaker-name').style.display = scene.speaker ? 'block' : 'none';

        const choicesContainer = document.getElementById('choices-container');
        const nextBtn = document.getElementById('next-btn');
        const cookBtn = document.getElementById('cook-btn');
        
        choicesContainer.innerHTML = '';
        nextBtn.classList.add('hidden');
        cookBtn.classList.add('hidden');

        if (scene.type === 'order_placed') {
            cookBtn.classList.remove('hidden');
            this.currentOrder = scene.order;
            this.lastOrderText = scene.text; 
        } 
        else if (scene.choices) {
            scene.choices.forEach(choice => {
                // Если есть условие (glitch_seen), проверяем его
                if (choice.condition === 'glitch_seen' && !this.sawGlitch) return;
                
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.innerText = choice.text;
                btn.onclick = () => {
                    if (choice.karma) this.karma += choice.karma;
                    this.loadScene(choice.target);
                };
                choicesContainer.appendChild(btn);
            });
        } 
        else {
            nextBtn.classList.remove('hidden');
            this.nextSceneId = scene.next;
        }
    }

    // --- СМЕНА ДНЯ ---
    transitionToDay() {
        const overlay = document.getElementById('glitch-overlay');
        const textEl = document.getElementById('transition-text');
        
        overlay.classList.remove('hidden');
        textEl.innerText = ""; 
        
        setTimeout(() => { 
            overlay.style.opacity = '1'; 
        }, 10);

        setTimeout(() => {
            textEl.innerText = this.isHorrorMode ? "НАЧАЛО ДНЯ ???" : `НАЧАЛО ДНЯ ${this.day}`;
            
            setTimeout(() => {
                textEl.innerText = ""; 
                
                // В Хорроре утро начинается с молчания
                if (this.isHorrorMode) {
                     this.startScreenyMorning();
                } 
                // В обычном режиме диалог только во 2 и 3 день
                else if (this.day === 2 || this.day === 3) {
                    this.startScreenyMorning();
                } else {
                    this.startKitchenDay();
                }
                
                overlay.style.opacity = '0';
                setTimeout(() => { overlay.classList.add('hidden'); }, 1000);
            }, 2000);
        }, 1000);
    }

    // --- УТРО С ЭКРАНЧИКОМ ---
    startScreenyMorning() {
        document.getElementById('kitchen-screen').classList.add('hidden');
        document.getElementById('vn-screen').classList.remove('hidden');
        
        if (this.isHorrorMode) {
            this.loadScene('morning_horror');
        } else if (this.day === 2 || this.day === 3) {
            this.loadScene('morning_d2_start');
        } else {
            this.startKitchenDay();
        }
    }
    
    // --- НАЧАЛО РАБОТЫ ---
    startKitchenDay() {
        console.log(`--- НАЧАЛО ДНЯ ${this.day} ---`);
        document.getElementById('vn-screen').classList.add('hidden');
        
        let availableGuests = [...GUESTS_LIST];
        availableGuests.sort(() => Math.random() - 0.5); 
        this.dailyQueue = availableGuests.slice(0, this.maxGuestsPerDay);
        
        this.nextGuest();
    }

    // --- СЛЕДУЮЩИЙ ГОСТЬ ---
    nextGuest() {
        if (this.dailyQueue.length === 0) {
            this.endDay(); 
            return;
        }
        
        this.currentGuestData = this.dailyQueue.pop();
        
        if (this.isHorrorMode) {
            const horrorId = this.currentGuestData.id + '_horror';
            if (HORROR_SCENES[horrorId]) this.loadScene(horrorId);
            else this.loadScene(this.currentGuestData.dialogues[0]); 
        } else {
            const randomDialogId = this.currentGuestData.dialogues[Math.floor(Math.random() * this.currentGuestData.dialogues.length)];
            this.loadScene(randomDialogId);
        }
        
        document.getElementById('kitchen-screen').classList.add('hidden');
        document.getElementById('vn-screen').classList.remove('hidden');
        
        const charRight = document.getElementById('char-right');
        charRight.classList.remove('visible');
        setTimeout(() => {
            charRight.style.backgroundImage = `url('${CHARACTERS[this.currentGuestData.id]}')`;
            charRight.classList.add('visible');
        }, 100);
    }

    // --- ПЕРЕХОД НА КУХНЮ ---
    goToKitchen() {
        document.getElementById('vn-screen').classList.add('hidden');
        document.getElementById('kitchen-screen').classList.remove('hidden');
        
        const monitor = document.getElementById('monitor-helper');
        monitor.classList.remove('screeny-center'); 
        monitor.classList.remove('sans-shake');
        if (this.isSans) monitor.classList.add('sans-visual');
        monitor.classList.add('kitchen-mode');      
        monitor.classList.remove('hidden');

        let textToShow = this.lastOrderText || "Жду заказ...";
        if (typeof cookingSystem !== 'undefined') {
            cookingSystem.start(this.currentOrder, textToShow);
        }
    }

    // --- ФИНАЛ ГОТОВКИ ---
    finishCooking(resultItem) {
        const isCorrect = (resultItem === this.currentOrder);
        
        // 0. ПАСХАЛКА
        if (this.day <= 2 && resultItem === 'fried_snow') {
            document.getElementById('kitchen-screen').classList.add('hidden');
            document.getElementById('vn-screen').classList.remove('hidden');
            this.isSans = true; 
            const monitor = document.getElementById('monitor-helper');
            monitor.classList.remove('kitchen-mode'); 
            this.loadScene('sans_event'); 
            return;
        }

        // 1. КОНТРОЛЬ (Дни 1-2)
        if (this.day <= 2 && !isCorrect) {
            document.getElementById('kitchen-screen').classList.add('hidden');
            document.getElementById('vn-screen').classList.remove('hidden');
            document.getElementById('monitor-helper').classList.remove('kitchen-mode');
            this.loadScene('block_mistake'); 
            return;
        }

        // 3. УСПЕШНАЯ ПОДАЧА (ИЛИ ОШИБКА В 3+ ДЕНЬ, КОТОРАЯ ПРИВЕДЕТ К ХОРРОРУ)
        document.getElementById('kitchen-screen').classList.add('hidden');
        document.getElementById('vn-screen').classList.remove('hidden');
        
        const monitor = document.getElementById('monitor-helper');
        monitor.classList.remove('kitchen-mode'); 

        const nextBtn = document.getElementById('next-btn');
        const cookBtn = document.getElementById('cook-btn');
        cookBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');

        // РЕАКЦИИ
        let reactionText = "";
        let speakerName = this.currentGuestData.name;

        if (this.isHorrorMode) {
            // В Хорроре реакция другая
            if (isCorrect) {
                const randomPhrase = HORROR_PHRASES[Math.floor(Math.random() * HORROR_PHRASES.length)];
                reactionText = randomPhrase.text;
                speakerName = randomPhrase.speaker;
            } else {
                reactionText = "Гость молча смотрит на тарелку. Его лицо искажается...";
                speakerName = "???";
            }
        } else {
            // В обычном режиме
            const guestId = this.currentGuestData.id;
            const reactionData = GUEST_REACTIONS_DATA[guestId];
            if (isCorrect) {
                this.karma++;
                reactionText = (resultItem === reactionData.fav_dish) ? reactionData.favorite : reactionData.correct;
            } else {
                this.karma--;
                reactionText = reactionData.wrong;
            }
        }

        // Мысли Жгучей
        const thought = KRAPIVA_THOUGHTS.serving[Math.floor(Math.random() * KRAPIVA_THOUGHTS.serving.length)];
        document.getElementById('speaker-name').innerText = "Жгучая Крапива";
        document.getElementById('dialogue-text').innerText = `(${thought})`;
        document.getElementById('char-left').classList.add('is-speaking');
        document.getElementById('char-right').classList.remove('is-speaking');

        // Клик 1: Показываем реакцию
        nextBtn.onclick = () => {
            document.getElementById('speaker-name').innerText = speakerName;
            document.getElementById('dialogue-text').innerText = reactionText;
            document.getElementById('char-left').classList.remove('is-speaking');
            document.getElementById('char-right').classList.add('is-speaking');
            
            // Клик 2: Гость уходит ИЛИ запускается хоррор
            nextBtn.onclick = () => {
                nextBtn.onclick = () => this.nextStep(); 
                document.getElementById('char-right').classList.remove('visible');
                this.currentGuestData = null;

                // ЕДИНСТВЕННОЕ МЕСТО, ГДЕ ЗАПУСКАЕТСЯ ХОРРОР
                if (!this.isHorrorMode && this.day > 2 && !isCorrect) {
                    this.triggerHorrorMode();
                } else {
                    this.nextGuest();
                }
            };
        };
    }

    // --- КОНЕЦ ДНЯ ---
    endDay() {
        if (this.isHorrorMode) {
            this.day++; 
            // В хорроре в конце дня - диалог с вопросами
            document.getElementById('kitchen-screen').classList.add('hidden');
            document.getElementById('vn-screen').classList.remove('hidden');
            this.loadScene('horror_end_day');
        } else {
            this.day++;
            this.transitionToDay();
        }
    }

    // --- ХОРРОР-ТРИГГЕР (ПЕРЕЗАПУСК ДНЯ В РЕЖИМЕ ХОРРОР) ---
    triggerHorrorMode() {
        console.log("!!! HORROR MODE ACTIVATED !!!");
        this.isHorrorMode = true;
        this.sawGlitch = true;
        document.body.classList.add('horror-mode');
        
        const overlay = document.getElementById('glitch-overlay');
        const textEl = document.getElementById('transition-text');
        overlay.classList.remove('hidden');
        textEl.innerText = "";
        
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        
        setTimeout(() => {
            textEl.innerText = "ЧТО-ТО ПОШЛО НЕ ТАК";
            setTimeout(() => {
                textEl.innerText = "";
                // ЗАПУСКАЕМ СЛЕДУЮЩИЙ ДЕНЬ УЖЕ В ХОРРОРЕ
                // (Это сбросит текущую смену и начнет новую с хоррор-гостями)
                this.transitionToDay(); 
            }, 3000);
        }, 1000);
    }
}

// Запуск
const game = new Game();
window.game = game;
window.onload = () => game.init();