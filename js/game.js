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
        this.currentTrack = null;
    }

    init() {
        console.log("Game Initialized");
        const startBtn = document.getElementById('start-btn');
        if(startBtn) startBtn.onclick = () => this.startPrologue();

        const nextBtn = document.getElementById('next-btn');
        if(nextBtn) nextBtn.onclick = () => this.nextStep();

        const cookBtn = document.getElementById('cook-btn');
        if(cookBtn) cookBtn.onclick = () => this.goToKitchen();
    }

    // --- УПРАВЛЕНИЕ МУЗЫКОЙ ---
    playMusic(trackId) {
        if (this.currentTrack && this.currentTrack.id === trackId && !this.currentTrack.paused) return;
        this.stopMusic();
        const newTrack = document.getElementById(trackId);
        if (newTrack) {
            newTrack.currentTime = 0;
            newTrack.volume = 0.5;
            newTrack.play().catch(e => console.warn("Audio play error for " + trackId + ":", e));
            this.currentTrack = newTrack;
        }
    }

    stopMusic() {
        if (this.currentTrack) {
            this.currentTrack.pause();
            this.currentTrack.currentTime = 0;
            this.currentTrack = null;
        }
    }

    // --- УПРАВЛЕНИЕ ВИДОМ ЭКРАНЧИКА ---
    updateMonitorVisual() {
        const monitor = document.getElementById('monitor-helper');
        monitor.style.backgroundImage = ''; 
        
        if (this.isHorrorMode) {
            monitor.style.backgroundImage = "url('assets/horror_telek.png')";
        } else if (this.isSans) {
            monitor.style.backgroundImage = "url('assets/sans_telek.png')";
        } else {
            monitor.style.backgroundImage = "url('assets/normal_telek.png')";
        }
    }

    startPrologue() {
        document.getElementById('menu-screen').classList.add('hidden');
        document.getElementById('vn-screen').classList.remove('hidden');
        this.playMusic('bgm-normal');
        this.loadScene('prologue_start');
    }

    nextStep() {
        if (this.currentScene && this.currentScene.type === 'blocking') {
            this.goToKitchen();
            return;
        }
        if (this.currentScene && this.currentScene.choices) return;

        if (this.nextSceneId) {
            this.loadScene(this.nextSceneId);
        }
    }

    loadScene(sceneId) {
        if (sceneId === 'START_GAME') { this.startKitchenDay(); return; }
        if (sceneId === 'START_HORROR_DAY') { this.transitionToDay(); return; }
        if (sceneId === 'menu_reload') { location.reload(); return; }

        let scene = SCENES[sceneId] || SCREENY_DIALOGUES[sceneId] || HORROR_SCENES[sceneId];
        if (!scene && typeof ENDING_SCENES !== 'undefined') {
            scene = ENDING_SCENES[sceneId];
        }

        if (!scene) { console.error(`Сцена "${sceneId}" не найдена!`); return; }
        
        this.currentScene = scene;
        this.nextSceneId = scene.next;

        // Музыка для концовок
        if (sceneId === 'ending_good_start') this.playMusic('bgm-ending-good');
        if (sceneId === 'ending_bad_start') this.playMusic('bgm-ending-bad');

        const vnUi = document.getElementById('vn-ui');
        const vnStage = document.getElementById('vn-stage');
        const endingLayer = document.getElementById('ending-art-layer');
        const flashLayer = document.getElementById('flash-overlay');
        const charLeft = document.getElementById('char-left');
        const charRight = document.getElementById('char-right');
        const monitor = document.getElementById('monitor-helper');
        const dialogueText = document.getElementById('dialogue-text');
        const nameBox = document.getElementById('speaker-name');

        vnUi.classList.remove('transparent-ui', 'black-void-ui', 'hidden');
        vnUi.style.display = 'flex';
        vnStage.style.opacity = '1';
        endingLayer.style.backgroundImage = 'none';
        endingLayer.style.backgroundColor = 'transparent';
        endingLayer.innerHTML = '';
        flashLayer.classList.remove('flash-anim');
        flashLayer.classList.add('hidden');

        if (scene.special === 'ending_black') {
            endingLayer.classList.remove('hidden');
            endingLayer.style.backgroundColor = '#000';
            vnUi.classList.add('black-void-ui');
            vnStage.style.opacity = '0';
        }
        else if (scene.special === 'ending_art') {
            endingLayer.classList.remove('hidden');
            const imgUrl = sceneId.includes('good') ? 'url("assets/good_ending.png")' : 'url("assets/bad_ending.png")';
            endingLayer.style.backgroundImage = imgUrl;
            endingLayer.style.backgroundSize = 'cover';
            vnUi.classList.add('transparent-ui');
            vnStage.style.opacity = '0';
        }
        else if (scene.special === 'ending_card') {
            this.stopMusic();
            vnUi.classList.add('hidden');
            vnStage.style.opacity = '0';
            monitor.classList.add('hidden');
            endingLayer.classList.remove('hidden');
            endingLayer.style.backgroundColor = '#000';
            
            const endingName = sceneId.includes('good') ? "ХОРОШАЯ КОНЦОВКА" : "ПЛОХАЯ КОНЦОВКА";
            const endingSub = sceneId.includes('good') ? "Дом, милый дом" : "Вечное одиночество";
            const imgSrc = sceneId.includes('good') ? "assets/good_ending.png" : "assets/bad_ending.png";
            const borderClass = sceneId.includes('good') ? "good-border" : "bad-border";

            endingLayer.innerHTML = `
                <div class="ending-card-container fade-in">
                    <div class="ending-card ${borderClass}">
                        <img src="${imgSrc}" alt="Ending Art">
                        <div class="ending-text">
                            <h2>${endingName}</h2>
                            <p>${endingSub}</p>
                        </div>
                    </div>
                    <button class="btn-primary" onclick="location.reload()">В МЕНЮ</button>
                </div>
            `;
            return;
        }
        else if (scene.special === 'jumpscare') {
            this.stopMusic();
            const jump = document.getElementById('jumpscare-layer');
            const audio = document.getElementById('sfx-scream');
            vnUi.classList.add('hidden');
            jump.classList.remove('hidden');
            if(audio) { audio.volume = 1.0; audio.currentTime = 0; audio.play().catch(e=>{}); }
            setTimeout(() => {
                jump.classList.add('hidden');
                this.loadScene('ending_bad_card'); 
            }, 2500);
            return;
        }
        else {
            endingLayer.classList.add('hidden');
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
            charLeft.classList.remove('is-speaking');
            charRight.classList.remove('is-speaking');
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
            this.screenyUnlocked = true;
            monitor.classList.remove('hidden');
            if (scene.speaker === "Экранчик") {
                monitor.classList.add('screeny-center');
                if (sceneId === 'sans_event') monitor.classList.add('sans-shake');
            }
        } else {
            if (scene.special) monitor.classList.add('hidden');
            else if (!this.screenyUnlocked) monitor.classList.add('hidden');
        }

        dialogueText.innerText = scene.text;
        if (scene.speaker) {
            nameBox.innerText = scene.speaker;
            nameBox.style.display = 'block'; 
        } else {
            nameBox.style.display = 'none';
        }

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
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.innerText = choice.text;
                btn.onclick = () => {
                    if (choice.karma) this.karma += choice.karma;
                    if (choice.target === 'menu_reload') location.reload();
                    else this.loadScene(choice.target);
                };
                choicesContainer.appendChild(btn);
            });
        } 
        else {
            nextBtn.classList.remove('hidden');
        }
    }

    transitionToDay() {
        this.stopMusic(); 
        const overlay = document.getElementById('glitch-overlay');
        const textEl = document.getElementById('transition-text');
        overlay.classList.remove('hidden');
        textEl.innerText = ""; 
        
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        setTimeout(() => {
            textEl.innerText = this.isHorrorMode ? "..." : `НАЧАЛО ДНЯ ${this.day}`;
            setTimeout(() => {
                textEl.innerText = ""; 
                if (this.isHorrorMode) this.startScreenyMorning();
                else if (this.day === 2 || this.day === 3) this.startScreenyMorning();
                else this.startKitchenDay();
                
                overlay.style.opacity = '0';
                setTimeout(() => { overlay.classList.add('hidden'); }, 1000);
            }, 2000);
        }, 1000);
    }

    startScreenyMorning() {
        if(this.isHorrorMode) this.playMusic('bgm-horror');
        else this.playMusic('bgm-normal');

        document.getElementById('kitchen-screen').classList.add('hidden');
        document.getElementById('vn-screen').classList.remove('hidden');
        
        if (this.isHorrorMode) this.loadScene('morning_horror');
        else if (this.day === 2) this.loadScene('morning_d2_start');
        else if (this.day === 3) this.loadScene('morning_d3_start');
        else this.startKitchenDay();
    }
    
    startKitchenDay() {
        if(this.isHorrorMode) this.playMusic('bgm-horror');
        else this.playMusic('bgm-normal');

        console.log(`--- НАЧАЛО ДНЯ ${this.day} (Horror: ${this.isHorrorMode}) ---`);
        document.getElementById('vn-screen').classList.add('hidden');
        
        let availableGuests = [...GUESTS_LIST];
        availableGuests.sort(() => Math.random() - 0.5); 
        this.dailyQueue = availableGuests.slice(0, this.maxGuestsPerDay);
        this.nextGuest();
    }

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
            if(CHARACTERS[this.currentGuestData.id]) {
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

        if (this.isHorrorMode) this.playMusic('bgm-horror');
        else this.playMusic('bgm-normal');

        let textToShow = this.lastOrderText || "Жду заказ...";
        if (typeof cookingSystem !== 'undefined') {
            cookingSystem.start(this.currentOrder, textToShow);
        }
    }

    finishCooking(resultItem) {
        const isCorrect = (resultItem === this.currentOrder);

        // --- ЛОГИКА ОЦЕНКИ ЗАКАЗА ---
        
        // 1. ПАСХАЛКА САНСА
        if (this.day <= 2 && resultItem === 'fried_snow') {
            this.isSans = true; 
            this.playMusic('bgm-megalovania'); 
            document.getElementById('kitchen-screen').classList.add('hidden');
            document.getElementById('vn-screen').classList.remove('hidden');
            document.getElementById('monitor-helper').classList.remove('kitchen-mode'); 
            this.loadScene('sans_event'); 
            return;
        }

        // 2. ХОРРОР-РЕЖИМ: ОШИБКА -> СРАЗУ КОНЕЦ ИГРЫ
        if (this.isHorrorMode && !isCorrect) {
            console.log("Horror mistake! Triggering ending...");
            document.getElementById('kitchen-screen').classList.add('hidden');
            document.getElementById('vn-screen').classList.remove('hidden');
            
            if (this.karma >= 0) {
                this.loadScene('ending_good_start');
            } else {
                this.loadScene('ending_bad_start');
            }
            return; // Прерываем функцию, чтобы не показывать реакцию гостя
        }

        // 3. ОБЫЧНЫЙ РЕЖИМ: ОШИБКА (ДНИ 1-2) -> БЛОКИРОВКА
        if (this.day <= 2 && !isCorrect && !this.isHorrorMode) {
            document.getElementById('kitchen-screen').classList.add('hidden');
            document.getElementById('vn-screen').classList.remove('hidden');
            document.getElementById('monitor-helper').classList.remove('kitchen-mode');
            this.loadScene('block_mistake'); 
            return;
        }

        // --- ПОКАЗ РЕАКЦИИ ГОСТЯ (Если не было раннего выхода) ---
        document.getElementById('kitchen-screen').classList.add('hidden');
        document.getElementById('vn-screen').classList.remove('hidden');
        const monitor = document.getElementById('monitor-helper');
        monitor.classList.remove('kitchen-mode'); 

        const nextBtn = document.getElementById('next-btn');
        const cookBtn = document.getElementById('cook-btn');
        cookBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');

        let reactionText = "";
        let speakerName = "???";

        if (this.currentGuestData) {
            speakerName = this.currentGuestData.name;
            if (this.isHorrorMode) {
                const randomPhrase = HORROR_PHRASES[Math.floor(Math.random() * HORROR_PHRASES.length)];
                reactionText = randomPhrase.text;
                speakerName = randomPhrase.speaker;
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

        const thought = KRAPIVA_THOUGHTS.serving[Math.floor(Math.random() * KRAPIVA_THOUGHTS.serving.length)];
        document.getElementById('speaker-name').innerText = "Жгучая Крапива";
        document.getElementById('dialogue-text').innerText = `(${thought})`;
        document.getElementById('char-left').classList.add('is-speaking');
        document.getElementById('char-right').classList.remove('is-speaking');

        nextBtn.onclick = () => {
            document.getElementById('speaker-name').innerText = speakerName;
            document.getElementById('dialogue-text').innerText = reactionText;
            document.getElementById('char-left').classList.remove('is-speaking');
            
            if(this.currentGuestData) document.getElementById('char-right').classList.add('is-speaking');
            
            nextBtn.onclick = () => {
                document.getElementById('char-right').classList.remove('visible');
                setTimeout(() => {
                    // ОБЫЧНЫЙ РЕЖИМ: ОШИБКА (ДЕНЬ 3+) -> ЗАПУСК ХОРРОРА
                    if (!this.isHorrorMode && this.day > 2 && !isCorrect) {
                        this.triggerHorrorMode();
                    } else {
                        this.currentGuestData = null; 
                        this.nextGuest();
                    }
                    nextBtn.onclick = () => this.nextStep(); 
                }, 500);
            };
        };
    }

    endDay() {
        if (this.isHorrorMode) {
            this.day++; 
            document.getElementById('kitchen-screen').classList.add('hidden');
            document.getElementById('vn-screen').classList.remove('hidden');
            this.loadScene('horror_end_day');
        } else {
            this.day++;
            this.transitionToDay();
        }
    }

    triggerHorrorMode() {
        console.log("!!! HORROR MODE ACTIVATED !!!");
        this.isHorrorMode = true;
        this.sawGlitch = true;
        document.body.classList.add('horror-mode');
        this.stopMusic(); 
        if (typeof cookingSystem !== 'undefined') cookingSystem.renderPantry(); 

        const overlay = document.getElementById('glitch-overlay');
        const textEl = document.getElementById('transition-text');
        overlay.classList.remove('hidden');
        textEl.innerText = "";
        
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        setTimeout(() => {
            textEl.innerText = "ЧТО-ТО ПОШЛО НЕ ТАК";
            setTimeout(() => {
                textEl.innerText = "";
                // Перезапускаем день, но уже с флагом isHorrorMode = true
                this.transitionToDay(); 
            }, 3000);
        }, 1000);
    }
}

// Запуск
const game = new Game();
window.game = game;
window.onload = () => game.init();