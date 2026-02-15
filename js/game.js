class Game {
    constructor() {
        this.currentScene = null;
        this.screenyUnlocked = false;
        
        // --- ПАРАМЕТРЫ ДНЕЙ ---
        this.day = 1; 
        this.maxGuestsPerDay = 3; 
        this.guestsServedToday = 0;
        
        this.dailyQueue = []; 
        this.currentOrder = null;
        this.currentGuestData = null;
        this.karma = 0; // Карма ( >0 Хорошая, <0 Плохая)
        
        this.isHorrorMode = false; 
        this.isSans = false;
        this.currentTrack = null;
    }

    init() {
        console.log("Game Init");
        
        // --- ПАТЧ ДАННЫХ (Исправление логики переходов без изменения data.js) ---
        // Чтобы 2-й день не зацикливался на вопросах:
        if (typeof SCREENY_DIALOGUES !== 'undefined' && SCREENY_DIALOGUES['screen_morning_end_2']) {
            SCREENY_DIALOGUES['screen_morning_end_2'].next = 'START_GUESTS'; 
        }
        // Чтобы хоррор-утро тоже вело к гостям:
        if (typeof SCREENY_DIALOGUES !== 'undefined' && SCREENY_DIALOGUES['horror_end_day_answer_2']) {
            SCREENY_DIALOGUES['horror_end_day_answer_2'].next = 'START_GUESTS';
        }
        if (typeof SCREENY_DIALOGUES !== 'undefined' && SCREENY_DIALOGUES['horror_q_ignore']) {
            SCREENY_DIALOGUES['horror_q_ignore'].next = 'START_GUESTS';
        }

        // --- ПРИВЯЗКА КНОПОК ---
        document.getElementById('start-btn').onclick = () => this.startPrologue();
        document.getElementById('next-btn').onclick = () => this.nextStep();
        document.getElementById('cook-btn').onclick = () => this.goToKitchen();
    }

    // --- МУЗЫКА ---
    playMusic(trackId) {
        if (this.currentTrack && this.currentTrack.id === trackId && !this.currentTrack.paused) return;
        this.stopMusic();
        const newTrack = document.getElementById(trackId);
        if (newTrack) {
            newTrack.currentTime = 0; newTrack.volume = 0.4;
            newTrack.play().catch(e => console.warn(e));
            this.currentTrack = newTrack;
        }
    }
    stopMusic() { if(this.currentTrack) { this.currentTrack.pause(); this.currentTrack = null; } }

    // --- ВИЗУАЛ ЭКРАНЧИКА ---
    updateMonitorVisual() {
        const monitor = document.getElementById('monitor-helper');
        monitor.style.backgroundImage = ''; 
        if (this.isHorrorMode) monitor.style.backgroundImage = "url('assets/horror_telek.png')";
        else if (this.isSans) monitor.style.backgroundImage = "url('assets/sans_telek.png')";
        else monitor.style.backgroundImage = "url('assets/normal_telek.png')";
    }

    // --- СЦЕНАРНЫЙ ДВИЖОК ---
    startPrologue() {
        document.getElementById('menu-screen').classList.add('hidden');
        document.getElementById('vn-screen').classList.remove('hidden');
        this.playMusic('bgm-normal');
        this.loadScene('prologue_start');
    }

    nextStep() {
        // Если сцена блокирующая (ошибка на кухне), кнопка работает как "Назад", логика в loadScene
        if (this.currentScene && this.currentScene.type === 'blocking') return;
        
        // Если есть выбор, кнопка "Далее" не должна работать (обычно она скрыта)
        if (this.currentScene && this.currentScene.choices) return;

        // Переход к следующей сцене
        if (this.nextSceneId) this.loadScene(this.nextSceneId);
    }

    loadScene(sceneId) {
        console.log("Loading scene:", sceneId);

        if (sceneId === 'START_GAME') { this.startDayLogic(); return; }
        if (sceneId === 'START_HORROR_DAY') { this.startDayLogic(); return; }
        if (sceneId === 'START_GUESTS') { this.startGuestsQueue(); return; }
        if (sceneId === 'menu_reload') { location.reload(); return; }
        
        let scene = SCENES[sceneId] || SCREENY_DIALOGUES[sceneId] || HORROR_SCENES[sceneId];
        if (!scene && typeof ENDING_SCENES !== 'undefined') scene = ENDING_SCENES[sceneId];
        
        if (!scene) { console.error("Scene not found: " + sceneId); return; }
        
        this.currentScene = scene;
        this.nextSceneId = scene.next;

        if (sceneId === 'ending_good_start') this.playMusic('bgm-ending-good');
        if (sceneId === 'ending_bad_start') this.playMusic('bgm-ending-bad');

        const vnScreen = document.getElementById('vn-screen');
        const vnUi = document.getElementById('vn-ui');
        const vnStage = document.getElementById('vn-stage');
        const endingLayer = document.getElementById('ending-art-layer');
        const flashLayer = document.getElementById('flash-overlay');
        const charLeft = document.getElementById('char-left');
        const charRight = document.getElementById('char-right');
        const monitor = document.getElementById('monitor-helper');
        const nameBox = document.getElementById('speaker-name');
        const nextBtn = document.getElementById('next-btn');
        const choicesContainer = document.getElementById('choices-container');
        const cookBtn = document.getElementById('cook-btn');
        const vnControls = document.getElementById('vn-controls'); // Контейнер стрелки

        // === ПОЛНЫЙ СБРОС ===
        vnUi.className = ''; 
        vnUi.style.display = 'flex'; 
        vnStage.style.opacity = '1';
        vnScreen.style.display = 'flex';
        vnControls.classList.remove('hidden'); // Показываем стрелку по умолчанию

        if (!this.isHorrorMode) {
             vnScreen.style.background = "linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('assets/bg_kitchen_normal.png') no-repeat center center";
             vnScreen.style.backgroundSize = "cover";
        } else {
             vnScreen.style.background = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('assets/bg_kitchen_horror.png') no-repeat center center";
             vnScreen.style.backgroundSize = "cover";
        }

        endingLayer.classList.add('hidden');
        endingLayer.style.backgroundImage = 'none'; 
        
        flashLayer.classList.remove('flash-anim'); 
        flashLayer.classList.add('hidden');
        
        nextBtn.innerText = "➜"; 
        nextBtn.onclick = () => this.nextStep(); 
        choicesContainer.innerHTML = ''; 
        nextBtn.classList.add('hidden'); 
        cookBtn.classList.add('hidden');

        // === ТИПЫ СЦЕН ===

        if (scene.special === 'ending_black') {
            vnScreen.style.background = 'transparent'; 
            endingLayer.classList.remove('hidden'); 
            endingLayer.style.backgroundColor = '#000';
            vnUi.classList.add('black-void-ui');
            vnStage.style.opacity = '0'; 
            monitor.classList.add('hidden');
            nextBtn.classList.remove('hidden'); 
        }
        else if (scene.special === 'ending_art') {
            vnScreen.style.background = 'transparent'; 
            endingLayer.classList.remove('hidden');
            const isGood = sceneId.includes('good') || (this.karma >= 0 && !sceneId.includes('bad'));
            const imgUrl = isGood ? 'url("assets/good_ending.png")' : 'url("assets/bad_ending.png")';
            
            endingLayer.style.backgroundImage = imgUrl; 
            endingLayer.style.backgroundSize = 'cover';
            
            vnUi.classList.add('transparent-ui');
            vnStage.style.opacity = '0';
            monitor.classList.add('hidden');
            // Стрелка или выбор будут показаны ниже
        }
        else if (scene.special === 'ending_card') {
            this.stopMusic(); 
            vnScreen.style.display = 'none';
            monitor.classList.add('hidden'); 
            
            endingLayer.classList.remove('hidden'); 
            endingLayer.style.backgroundColor = '#000';
            
            const isGood = this.karma >= 0;
            endingLayer.innerHTML = `
                <div class="ending-card-container fade-in">
                    <div class="ending-card ${isGood?'good-border':'bad-border'}">
                        <img src="${isGood?'assets/good_ending.png':'assets/bad_ending.png'}">
                        <div class="ending-text">
                            <h2>${isGood?'ХОРОШАЯ КОНЦОВКА':'ПЛОХАЯ КОНЦОВКА'}</h2>
                            <p>${isGood?'Дом, милый дом':'Вечное одиночество'}</p>
                        </div>
                    </div>
                    <button class="btn-primary" onclick="location.reload()">В МЕНЮ</button>
                </div>`;
            return; 
        }
        // === СКРИМЕР (ИСПРАВЛЕНО) ===
        else if (scene.special === 'jumpscare') {
            this.stopMusic();
            const jump = document.getElementById('jumpscare-layer');
            const audio = document.getElementById('sfx-scream');
            
            vnScreen.style.display = 'none'; 
            jump.classList.remove('hidden');
            
            if(audio) { 
                audio.currentTime = 0; // Начинаем с начала
                audio.volume = 1.0; 
                audio.play().catch(e=>{}); 
            }
            
            // Уменьшаем время для резкости + останавливаем звук
            setTimeout(() => { 
                if (audio) {
                    audio.pause(); // ВАЖНО: Останавливаем звук
                    audio.currentTime = 0;
                }
                jump.classList.add('hidden'); 
                this.loadScene('ending_bad_card'); 
            }, 1500); // 1.5 секунды вместо 2.5
            return;
        }
        else {
            // ОБЫЧНАЯ СЦЕНА
            if (scene.sprite && CHARACTERS[scene.sprite]) { 
                charLeft.style.backgroundImage = `url('${CHARACTERS[scene.sprite]}')`; 
                charLeft.classList.add('visible'); 
            } else { 
                if (!charLeft.style.backgroundImage) charLeft.style.backgroundImage = `url('${CHARACTERS['krapiva_calm']}')`; 
                charLeft.classList.add('visible'); 
            }
            
            if (scene.guestSprite && CHARACTERS[scene.guestSprite]) { 
                charRight.style.backgroundImage = `url('${CHARACTERS[scene.guestSprite]}')`; 
                charRight.classList.add('visible'); 
            } else if (!this.currentGuestData && !this.isHorrorMode && scene.speaker !== "Экранчик") { 
                charRight.classList.remove('visible'); 
            }
            
            charLeft.classList.remove('is-speaking'); charRight.classList.remove('is-speaking');
            if (scene.speaker === "Жгучая Крапива") charLeft.classList.add('is-speaking');
            else if (scene.speaker && scene.speaker !== "Экранчик") charRight.classList.add('is-speaking');
        }

        if (scene.effect === 'flash') { 
            flashLayer.classList.remove('hidden'); 
            void flashLayer.offsetWidth; 
            flashLayer.classList.add('flash-anim'); 
        }

        monitor.classList.remove('screeny-center', 'kitchen-mode', 'sans-shake');
        this.updateMonitorVisual();

        if (scene.showScreeny) {
            this.screenyUnlocked = true; monitor.classList.remove('hidden');
            if (scene.speaker === "Экранчик") { 
                monitor.classList.add('screeny-center'); 
                if (sceneId === 'sans_event') monitor.classList.add('sans-shake'); 
            }
        } else {
            if (scene.special) monitor.classList.add('hidden'); 
            else if (!this.screenyUnlocked) monitor.classList.add('hidden');
        }

        document.getElementById('dialogue-text').innerText = scene.text;
        
        if (scene.speaker && scene.special !== 'ending_black') { 
            nameBox.innerText = scene.speaker; 
            nameBox.style.display = 'block'; 
        } else { 
            nameBox.style.display = 'none'; 
        }

        // === ЛОГИКА КНОПОК (ИСПРАВЛЕНО) ===
        if (scene.type === 'order_placed') {
            cookBtn.classList.remove('hidden'); 
            this.currentOrder = scene.order; 
            this.lastOrderText = scene.text; 
        } 
        else if (scene.type === 'blocking') {
             nextBtn.classList.remove('hidden');
             nextBtn.innerText = "↺";
             nextBtn.onclick = () => this.goToKitchen();
        }
        else if (scene.choices) {
            // ВАЖНО: Если есть выбор, скрываем стрелку по умолчанию
            vnControls.classList.add('hidden'); 
            
            scene.choices.forEach(choice => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn'; btn.innerText = choice.text;
                btn.onclick = () => {
                    if (choice.karma) this.karma += choice.karma;
                    if (choice.target === 'menu_reload') location.reload(); 
                    else this.loadScene(choice.target);
                };
                choicesContainer.appendChild(btn);
            });
        } else { 
            // Показываем стрелку, если нет других кнопок
            nextBtn.classList.remove('hidden'); 
        }
    }

    // --- ЛОГИКА ДНЕЙ ---

    changeDay() {
        if (this.isHorrorMode) {
             // В хорроре дни бесконечны, пока игрок не ошибется
             this.transitionAnimation("...");
        } else {
            this.day++;
            this.transitionAnimation(`НАЧАЛО ДНЯ ${this.day}`);
        }
    }

    transitionAnimation(text) {
        this.stopMusic(); 
        const overlay = document.getElementById('glitch-overlay');
        const textEl = document.getElementById('transition-text');
        overlay.classList.remove('hidden'); textEl.innerText = ""; 
        
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        
        setTimeout(() => {
            textEl.innerText = text;
            setTimeout(() => {
                textEl.innerText = ""; 
                overlay.style.opacity = '0';
                setTimeout(() => { overlay.classList.add('hidden'); this.startDayLogic(); }, 1000);
            }, 2000);
        }, 1000);
    }

    // Этап 1: Старт логики дня (Утро / Вопросы)
    startDayLogic() {
        this.playMusic(this.isHorrorMode ? 'bgm-horror' : 'bgm-normal');
        
        document.getElementById('kitchen-screen').classList.add('hidden');
        document.getElementById('vn-screen').classList.remove('hidden');

        if (this.isHorrorMode) {
            this.loadScene('morning_horror');
        } else if (this.day === 1) {
            this.startGuestsQueue(); // В 1 день сразу к гостям (после пролога)
        } else if (this.day === 2) {
            this.loadScene('morning_d2_start'); // Вопросы
        } else if (this.day >= 3) {
            this.loadScene('morning_d3_start'); // Предупреждение
        }
    }

    // Этап 2: Запуск очереди гостей
    startGuestsQueue() {
        this.guestsServedToday = 0; // Сброс счетчика только здесь
        
        // Формируем очередь случайным образом
        let availableGuests = [...GUESTS_LIST];
        availableGuests.sort(() => Math.random() - 0.5); 
        this.dailyQueue = availableGuests.slice(0, this.maxGuestsPerDay);
        
        console.log("Starting guests. Queue:", this.dailyQueue);
        this.nextGuest();
    }

    // Этап 3: Следующий гость
    nextGuest() {
        // Проверка конца дня
        if (this.guestsServedToday >= this.maxGuestsPerDay) {
            if (this.isHorrorMode) {
                this.loadScene('horror_end_day');
            } else {
                this.changeDay();
            }
            return;
        }

        // Если гостей не осталось в массиве (защита)
        if (this.dailyQueue.length === 0) {
            this.changeDay();
            return;
        }

        this.guestsServedToday++;
        this.currentGuestData = this.dailyQueue.pop();
        
        if (this.isHorrorMode) {
            const horrorId = this.currentGuestData.id + '_horror';
            if (HORROR_SCENES[horrorId]) this.loadScene(horrorId);
            else { 
                // Фолбэк, если хоррор сцены нет
                this.loadScene(this.currentGuestData.dialogues[0]); 
            }
        } else {
            const randomDialogId = this.currentGuestData.dialogues[Math.floor(Math.random() * this.currentGuestData.dialogues.length)];
            this.loadScene(randomDialogId);
        }
        
        // Показываем спрайт
        document.getElementById('kitchen-screen').classList.add('hidden');
        document.getElementById('vn-screen').classList.remove('hidden');
        const charRight = document.getElementById('char-right');
        charRight.classList.remove('visible');
        setTimeout(() => {
            if(this.currentGuestData && CHARACTERS[this.currentGuestData.id]) {
                charRight.style.backgroundImage = `url('${CHARACTERS[this.currentGuestData.id]}')`;
                charRight.classList.add('visible');
            }
        }, 100);
    }

    goToKitchen() {
        document.getElementById('vn-screen').classList.add('hidden');
        document.getElementById('kitchen-screen').classList.remove('hidden');
        const monitor = document.getElementById('monitor-helper');
        monitor.classList.remove('screeny-center', 'sans-shake');
        this.updateMonitorVisual();
        monitor.classList.add('kitchen-mode');      
        monitor.classList.remove('hidden');

        if(this.isSans && this.currentTrack && this.currentTrack.id === 'bgm-megalovania') {
             // pass
        } else { 
            this.playMusic(this.isHorrorMode ? 'bgm-horror' : 'bgm-normal'); 
        }
        
        let textToShow = this.lastOrderText || "Жду заказ...";
        if (typeof cookingSystem !== 'undefined') cookingSystem.start(this.currentOrder, textToShow);
    }

    // --- ФИНАЛ ГОТОВКИ (ГЛАВНАЯ ЛОГИКА ПЕРЕХОДОВ) ---
    finishCooking(resultItem) {
        const isCorrect = (resultItem === this.currentOrder);

        // Пасхалка
        if (this.day <= 2 && resultItem === 'fried_snow') {
            this.isSans = true; this.playMusic('bgm-megalovania'); 
            document.getElementById('kitchen-screen').classList.add('hidden');
            document.getElementById('vn-screen').classList.remove('hidden');
            document.getElementById('monitor-helper').classList.remove('kitchen-mode'); 
            this.loadScene('sans_event'); return;
        }

        // 1. БЛОКИРОВКА ОШИБКИ (Только в дни 1-2 и не в хорроре)
        if (!this.isHorrorMode && this.day < 3) {
            if (!isCorrect) {
                document.getElementById('kitchen-screen').classList.add('hidden');
                document.getElementById('vn-screen').classList.remove('hidden');
                document.getElementById('monitor-helper').classList.remove('kitchen-mode');
                this.loadScene('block_mistake'); // Сцена с кнопкой "Вернуться"
                return;
            }
        }

        // 2. УСПЕХ (ИЛИ ФАТАЛЬНАЯ ОШИБКА ДНЯ 3)
        document.getElementById('kitchen-screen').classList.add('hidden');
        document.getElementById('vn-screen').classList.remove('hidden');
        const monitor = document.getElementById('monitor-helper');
        monitor.classList.remove('kitchen-mode'); 

        const nextBtn = document.getElementById('next-btn');
        const cookBtn = document.getElementById('cook-btn');
        cookBtn.classList.add('hidden'); nextBtn.classList.remove('hidden');

        // Генерируем реакцию
        let reactionText = "...", speakerName = "???";
        if (this.currentGuestData) {
            speakerName = this.currentGuestData.name;
            if (this.isHorrorMode) {
                if (!isCorrect) {
                    // ОШИБКА В ХОРРОРЕ = КОНЦОВКА (без диалога)
                    if (this.karma >= 0) this.loadScene('ending_good_start');
                    else this.loadScene('ending_bad_start');
                    return;
                }
                const randomPhrase = HORROR_PHRASES[Math.floor(Math.random() * HORROR_PHRASES.length)];
                reactionText = randomPhrase.text; speakerName = randomPhrase.speaker;
            } else {
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
        }

        // Показываем мысль игрока
        const thought = KRAPIVA_THOUGHTS.serving[Math.floor(Math.random() * KRAPIVA_THOUGHTS.serving.length)];
        document.getElementById('speaker-name').innerText = "Жгучая Крапива";
        document.getElementById('dialogue-text').innerText = `(${thought})`;
        document.getElementById('char-left').classList.add('is-speaking');
        document.getElementById('char-right').classList.remove('is-speaking');

        // НАСТРАИВАЕМ ЦЕПОЧКУ КЛИКОВ (Чтобы не скипало гостей)
        
        // Клик 1: Показать реакцию гостя
        nextBtn.onclick = () => {
            document.getElementById('speaker-name').innerText = speakerName;
            document.getElementById('dialogue-text').innerText = reactionText;
            document.getElementById('char-left').classList.remove('is-speaking');
            if(this.currentGuestData) document.getElementById('char-right').classList.add('is-speaking');
            
            // Клик 2: Перейти к следующему (или в хоррор)
            nextBtn.onclick = () => {
                // Скрываем кнопку, чтобы не нажать дважды
                nextBtn.classList.add('hidden');
                document.getElementById('char-right').classList.remove('visible');
                
                setTimeout(() => {
                    // ЕСЛИ ОШИБКА НА 3+ ДЕНЬ -> ХОРРОР
                    if (!this.isHorrorMode && this.day >= 3 && !isCorrect) {
                        this.triggerHorrorMode();
                        return;
                    }
                    
                    // ОБЫЧНЫЙ ПЕРЕХОД
                    this.currentGuestData = null; 
                    this.nextGuest(); // Загружает следующую сцену и сбрасывает кнопку
                }, 500);
            };
        };
    }

    triggerHorrorMode() {
        console.log("!!! HORROR MODE ACTIVATED !!!");
        this.isHorrorMode = true; 
        document.body.classList.add('horror-mode'); 
        this.stopMusic(); 
        
        const overlay = document.getElementById('glitch-overlay');
        const textEl = document.getElementById('transition-text');
        overlay.classList.remove('hidden'); textEl.innerText = "";
        
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        setTimeout(() => {
            textEl.innerText = "ЧТО-ТО ПОШЛО НЕ ТАК";
            setTimeout(() => {
                textEl.innerText = ""; 
                overlay.style.opacity = '0';
                setTimeout(() => { 
                    overlay.classList.add('hidden'); 
                    this.startDayLogic(); // Запуск хоррор-утра
                }, 1000);
            }, 3000);
        }, 1000);
    }
}

const game = new Game();
window.game = game;
window.onload = () => game.init();