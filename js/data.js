// ==========================================
// 0. СПИСОК ИНГРЕДИЕНТОВ НА ПОЛКЕ
// ==========================================
const BASE_INGREDIENTS = [
    // Рыба и Мясо
    'sturgeon_raw', 'steak_raw', 'pork', 'beef_mince', 'salmon_raw', 'chicken', 
    'rat', 'shaman', 'herring',
    
    // Овощи и Фрукты
    'lemon', 'greens', 'cabbage', 'onion', 'garlic', 'cabbage_white', 'cucumber', 'tomato', 'carrot', 'cherry',
    
    // Бакалея
    'oil', 'water', 'flour', 'soy_sauce', 'spices', 'spaghetti', 'pancetta', 'eggs', 'cheese', 'pepper', 'cream', 
    'chocolate', 'butter', 'sugar', 'lavash', 'sauce', 'cocoa', 'biscuit', 'gelatin', 'snow', 'matches', 'soda',
    'tea_leaves', 'milk_condensed' // Новые!
];

// ==========================================
// 1. БАЗА ПРЕДМЕТОВ (НАЗВАНИЯ)
// ==========================================
const ITEMS = {
    // --- ИСХОДНЫЕ ---
    'sturgeon_raw': 'Осетр (сырой)',
    'salmon_raw': 'Лосось (сырой)',
    'steak_raw': 'Стейк (сырой)',
    'pork': 'Свинина',
    'beef_mince': 'Гов. фарш',
    'chicken': 'Курица',
    'rat': 'Крыса',
    'shaman': 'Шаман',
    'herring': 'Селедка',
    
    'lemon': 'Лимон',
    'greens': 'Зелень',
    'cabbage': 'Пек. капуста',
    'cabbage_white': 'Бел. капуста',
    'onion': 'Лук',
    'garlic': 'Чеснок',
    'cucumber': 'Огурцы',
    'tomato': 'Помидоры',
    'carrot': 'Морковь',
    'cherry': 'Вишня',
    
    'oil': 'Оливк. масло',
    'water': 'Вода',
    'flour': 'Мука',
    'soy_sauce': 'Соевый соус',
    'spices': 'Приправы', // Универсальные специи
    'spaghetti': 'Спагетти',
    'pancetta': 'Панчетта',
    'eggs': 'Яйца',
    'cheese': 'Сыр',
    'pepper': 'Перец',
    'cream': 'Сливки',
    'chocolate': 'Шоколад',
    'butter': 'Слив. масло',
    'sugar': 'Сахар',
    'lavash': 'Лаваш',
    'sauce': 'Соус',
    'cocoa': 'Какао',
    'biscuit': 'Коржи',
    'gelatin': 'Желатин',
    'snow': 'Снег',
    'matches': 'Спички',
    'soda': 'Газировка',
    'tea_leaves': 'Чайные листья',
    'milk_condensed': 'Сгущенка',

    // --- ПРОМЕЖУТОЧНЫЕ ---
    'lemon_mix': 'Нарезка (Лимон+Зелень)',
    'sturgeon_stuffed': 'Нафарш. осетр',
    'sturgeon_oiled': 'Осетр в масле',
    'salmon_stuffed': 'Нафарш. лосось',
    'salmon_oiled': 'Лосось в масле',
    
    'dough': 'Тесто',
    'meat_base': 'Нарезка (Свинина+Капуста)',
    'meat_greens': 'Фарш с зеленью',
    'filling_chinese': 'Начинка для пельменей',
    'dumpling_raw': 'Сырые пельмени',
    
    'steak_oiled': 'Стейк в масле',
    'steak_spiced': 'Стейк в приправах',
    
    'pasta_boiled': 'Отварная паста',
    'pancetta_fried': 'Жареная панчетта',
    'egg_mix': 'Смесь (Яйца+Сыр+Перец)',
    
    'salmon_spiced': 'Лосось в специях',
    'salmon_lemon': 'Лосось с лимоном',
    'cream_sauce': 'Сливочный соус',
    'fish_prepared': 'Рыба в соусе (сырая)',
    
    'choco_cream': 'Шоколад со сливками',
    'choco_butter': 'Шоколадная масса',
    'egg_sugar': 'Взбитые яйца',
    'cake_dough': 'Тесто для торта',
    
    'chicken_baked': 'Запеченная курица',
    'shawarma_veg': 'Нарезка овощей',
    'shawarma_fill': 'Начинка для шаурмы',
    'lavash_wet': 'Лаваш с соусом',
    'shawarma_raw': 'Шаурма (Сырая)',
    
    'onion_garlic': 'Нарезка (Лук+Чеснок)',
    'meat_mix': 'Смесь фаршей',
    'filling_ru': 'Начинка (Рус.)',
    'dumpling_raw_ru': 'Сырые пельмени (Рус.)',

    'rat_stuffed': 'Фаршированная крыса',
    'rat_oiled': 'Крыса в масле',
    'shaman_broth': 'Бульон из Шамана',
    'shaman_jelly_raw': 'Холодец (не застыл)',
    'herring_cut': 'Кубики селедки',
    'cake_layer_1': 'Корж+Крем',
    'cake_layer_2': 'Корж+Морковь',
    'cocoa_mix': 'Мука+Какао',
    'butter_sugar': 'Масло+Сахар',
    'wet_mix': 'Масло+Яйца',
    'portal_dough': 'Тесто (Портальное)',
    'cake_base': 'Коржи (Печеные)',
    'cherry_mix': 'Вишня+Масло+Сгущенка', // Обновлено
    'portal_cake_base': 'Торт с кремом',

    // --- ГОТОВЫЕ БЛЮДА ---
    'sturgeon': 'Осетр по-царски',
    'dumplings_chinese': 'Китайские пельмени',
    'steak': 'Стейк с кровью',
    'carbonara': 'Паста Карбонара',
    'fish_creamy': 'Красная рыба в сливках',
    'chocolate_cake': 'Шоколадный торт', 
    'sweet_combo_kid': 'Сладкое комбо (Детское)', 
    'sweet_combo_adult': 'Сладкое комбо (Взрослое)', 
    'dumplings_russian': 'Русские пельмени',
    'salmon_royal': 'Лосось по-царски',
    'shawarma': 'Шаурма',
    'tea': 'Зеленый чай',
    'fried_snow': 'Жареный снег',
    'rat_royal': 'Крыса по-царски',
    'shaman_jelly': 'Холодец Шаманка',
    'herring_cake': 'Торт из селедки',
    'portal_cake': 'Торт Портальный',

    'trash': 'Мусор (Ошибка)'
};

// ==========================================
// 2. БАЗА СПРАЙТОВ (CHARACTERS)
// ==========================================
const CHARACTERS = {
    'krapiva_pain': 'assets/krapiva_pain.png',
    'krapiva_dizzy': 'assets/krapiva_dizzy.png',
    'krapiva_confused': 'assets/krapiva_confused.png',
    'krapiva_scared': 'assets/krapiva_scared.png',
    'krapiva_angry': 'assets/krapiva_angry.png',
    'krapiva_calm': 'assets/krapiva_calm.png',
    'murlyka': 'assets/murlyka_neutral.png',
    'plamen': 'assets/plamen_neutral.png',
    'vecher': 'assets/vecher_neutral.png',
    'zarya': 'assets/zarya_neutral.png',
    'sun': 'assets/sun_neutral.png',
    'osetrik': 'assets/osetrik_neutral.png'
};

// ==========================================
// 3. ТАБЛИЦА КРАФТА (CRAFTING_TABLE)
// ==========================================
const CRAFTING_TABLE = [
    // --- 1. ОСЕТР ПО-ЦАРСКИ ---
    { inputs: ['lemon', 'greens'], action: 'cut', result: 'lemon_mix' }, 
    { inputs: ['sturgeon_raw', 'lemon_mix'], action: 'mix', result: 'sturgeon_stuffed' },
    { inputs: ['sturgeon_stuffed', 'oil'], action: 'mix', result: 'sturgeon_oiled' },
    { inputs: ['sturgeon_oiled'], action: 'bake', result: 'sturgeon' },

    // --- 2. КИТАЙСКИЕ ПЕЛЬМЕНИ ---
    { inputs: ['water', 'flour'], action: 'mix', result: 'dough' },
    { inputs: ['pork', 'cabbage'], action: 'cut', result: 'meat_base' }, 
    { inputs: ['meat_base', 'greens'], action: 'mix', result: 'meat_greens' },
    { inputs: ['meat_greens', 'soy_sauce'], action: 'mix', result: 'filling_chinese' },
    { inputs: ['filling_chinese', 'dough'], action: 'mix', result: 'dumpling_raw' },
    { inputs: ['dumpling_raw'], action: 'boil', result: 'dumplings_chinese' },

    // --- 3. СТЕЙК С КРОВЬЮ ---
    { inputs: ['steak_raw', 'oil'], action: 'mix', result: 'steak_oiled' },
    { inputs: ['steak_oiled', 'spices'], action: 'mix', result: 'steak_spiced' },
    { inputs: ['steak_spiced'], action: 'fry', result: 'steak' },

    // --- 4. ПАСТА КАРБОНАРА ---
    { inputs: ['spaghetti', 'water'], action: 'boil', result: 'pasta_boiled' },
    { inputs: ['pancetta'], action: 'fry', result: 'pancetta_fried' },
    { inputs: ['eggs', 'cheese', 'pepper'], action: 'mix', result: 'egg_mix' },
    { inputs: ['pasta_boiled', 'pancetta_fried', 'egg_mix'], action: 'mix', result: 'carbonara' },

    // --- 5. КРАСНАЯ РЫБА В СЛИВКАХ ---
    { inputs: ['salmon_raw', 'spices'], action: 'mix', result: 'salmon_spiced' },
    { inputs: ['salmon_spiced', 'lemon'], action: 'mix', result: 'salmon_lemon' },
    { inputs: ['cream', 'garlic', 'spices'], action: 'mix', result: 'cream_sauce' }, // 3 ингр
    { inputs: ['cream_sauce', 'salmon_lemon'], action: 'mix', result: 'fish_prepared' },
    { inputs: ['fish_prepared'], action: 'bake', result: 'fish_creamy' },

    // --- 6. СЛАДКОЕ КОМБО ---
    { inputs: ['chocolate', 'cream'], action: 'mix', result: 'choco_cream' },
    { inputs: ['choco_cream', 'butter'], action: 'mix', result: 'choco_butter' },
    { inputs: ['eggs', 'sugar'], action: 'mix', result: 'egg_sugar' },
    { inputs: ['choco_butter', 'egg_sugar'], action: 'mix', result: 'cake_dough' },
    { inputs: ['cake_dough'], action: 'bake', result: 'chocolate_cake' },
    // Комбо сборка (ИСПРАВЛЕНО: Чай из листьев)
    { inputs: ['water', 'tea_leaves'], action: 'boil', result: 'tea' },
    { inputs: ['chocolate_cake', 'tea'], action: 'mix', result: 'sweet_combo_adult' },
    { inputs: ['chocolate_cake', 'soda'], action: 'mix', result: 'sweet_combo_kid' },

    // --- 7. ШАУРМА ---
    { inputs: ['chicken'], action: 'bake', result: 'chicken_baked' },
    { inputs: ['cabbage_white', 'cucumber', 'tomato'], action: 'cut', result: 'shawarma_veg' }, // 3 ингр
    { inputs: ['chicken_baked', 'shawarma_veg'], action: 'mix', result: 'shawarma_fill' },
    { inputs: ['lavash', 'sauce'], action: 'mix', result: 'lavash_wet' },
    { inputs: ['lavash_wet', 'shawarma_fill'], action: 'mix', result: 'shawarma_raw' },
    { inputs: ['shawarma_raw'], action: 'fry', result: 'shawarma' },

    // --- 8. РУССКИЕ ПЕЛЬМЕНИ ---
    { inputs: ['water', 'eggs', 'flour'], action: 'mix', result: 'dough' }, // 3 ингр
    { inputs: ['onion', 'garlic'], action: 'cut', result: 'onion_garlic' },
    { inputs: ['pork', 'beef_mince'], action: 'mix', result: 'meat_mix' }, // Свинина + Гов.Фарш
    { inputs: ['meat_mix', 'onion_garlic', 'spices'], action: 'mix', result: 'filling_ru' },
    { inputs: ['filling_ru', 'dough'], action: 'mix', result: 'dumpling_raw_ru' },
    { inputs: ['dumpling_raw_ru'], action: 'boil', result: 'dumplings_russian' },

    // --- 9. ЛОСОСЬ ПО-ЦАРСКИ ---
    { inputs: ['salmon_raw', 'lemon_mix'], action: 'mix', result: 'salmon_stuffed' },
    { inputs: ['salmon_stuffed', 'oil'], action: 'mix', result: 'salmon_oiled' },
    { inputs: ['salmon_oiled'], action: 'bake', result: 'salmon_royal' },

    // --- ДИКИЕ РЕЦЕПТЫ ---
    { inputs: ['snow', 'matches'], action: 'fry', result: 'fried_snow' },
    { inputs: ['rat', 'lemon_mix'], action: 'mix', result: 'rat_stuffed' },
    { inputs: ['rat_stuffed', 'oil'], action: 'mix', result: 'rat_oiled' },
    { inputs: ['rat_oiled'], action: 'bake', result: 'rat_royal' },
    { inputs: ['shaman', 'water'], action: 'boil', result: 'shaman_broth' },
    { inputs: ['shaman_broth', 'gelatin'], action: 'mix', result: 'shaman_jelly' },
    { inputs: ['herring'], action: 'cut', result: 'herring_cut' },
    { inputs: ['biscuit', 'cream'], action: 'mix', result: 'cake_layer_1' },
    { inputs: ['biscuit', 'carrot'], action: 'mix', result: 'cake_layer_2' },
    { inputs: ['cake_layer_1', 'cake_layer_2', 'herring_cut'], action: 'mix', result: 'herring_cake' },
    
    // ТОРТ ПОРТАЛЬНЫЙ (ИСПРАВЛЕНО: СГУЩЕНКА)
    { inputs: ['flour', 'cocoa'], action: 'mix', result: 'cocoa_mix' },
    { inputs: ['butter', 'sugar'], action: 'mix', result: 'butter_sugar' },
    { inputs: ['butter_sugar', 'eggs'], action: 'mix', result: 'wet_mix' },
    { inputs: ['wet_mix', 'cocoa_mix'], action: 'mix', result: 'portal_dough' },
    { inputs: ['portal_dough'], action: 'bake', result: 'cake_base' },
    { inputs: ['cherry', 'butter', 'milk_condensed'], action: 'mix', result: 'cherry_mix' }, // 3 ингр: Вишня+Масло+Сгущенка
    { inputs: ['cake_base', 'cherry_mix'], action: 'mix', result: 'portal_cake' }
];

// ==========================================
// 4. ТЕКСТ КНИГИ РЕЦЕПТОВ (RECIPE_PAGES)
// ==========================================
const RECIPE_PAGES = [
    `<h3>Осетр по-царски</h3>
    <p>Нарезать лимон полукольцами. Мелко измельчить петрушку и лук-порей. Нафаршировать этим выпотрошенного осетра, туда же запихнуть несколько веточек тимьяна. Смазать рыбу оливковым маслом. Запекать при температуре 180 градусов в течение 55 минут; достать, снова смазать оливковым маслом, отправить в духовку еще на 5 минут. Достать, дать пять минут настояться. Перед нарезкой снять кожицу. По желанию подавать с хреном и запеченным картофелем.</p>
    <ol>
        <li>Лимон + Зелень (Нарезать).</li>
        <li>Нарезка + Осетр (Смешать).</li>
        <li>Осетр + Масло (Смешать).</li>
        <li>Запечь.</li>
    </ol>`,

    `<h3>Китайские пельмени</h3>
    <p><i>Жгучая:</i> Мамино любимое. Тесто должно быть тонким.</p>
    <ol>
        <li>Вода + Мука (Смешать) -> Тесто.</li>
        <li>Свинина + Пек. капуста (Нарезать).</li>
        <li>Нарезка + Зелень (Смешать).</li>
        <li>Фарш + Соевый соус (Смешать).</li>
        <li>Тесто + Начинка (Смешать).</li>
        <li>Варить.</li>
    </ol>`,

    `<h3>Стейк с кровью</h3>
    <p><i>Жгучая:</i> Наше с Мурлыкой любимое. Только Medium Rare.</p>
    <ol>
        <li>Стейк + Масло (Смешать).</li>
        <li>Стейк + Приправы (Смешать).</li>
        <li>Жарить.</li>
    </ol>`,

    `<h3>Паста Карбонара</h3>
    <p><i>Жгучая:</i> Вождь обожает это. Никаких сливок!</p>
    <ol>
        <li>Спагетти + Вода (Варить).</li>
        <li>Панчетта (Жарить).</li>
        <li>Яйца + Сыр + Перец (Смешать) -> Соус.</li>
        <li>Паста + Панчетта + Соус (Смешать).</li>
    </ol>`,

    `<h3>Красная рыба в сливках</h3>
    <p><i>Жгучая:</i> Для мамы Солнца. Нежно и сливочно.</p>
    <ol>
        <li>Лосось + Приправы (Смешать).</li>
        <li>Лосось + Лимон (Смешать).</li>
        <li>Сливки + Чеснок + Приправы (Смешать).</li>
        <li>Соус + Рыба (Смешать).</li>
        <li>Запечь.</li>
    </ol>`,

    `<h3>Сладкое комбо</h3>
    <p><i>Жгучая:</i> Для моих девочек. Не перепутать напитки!</p>
    <ol>
        <li>Шоколад + Сливки (Смешать).</li>
        <li>Смесь + Масло (Смешать).</li>
        <li>Яйца + Сахар (Смешать).</li>
        <li>Две смеси (Смешать) -> Тесто.</li>
        <li>Запечь торт.</li>
        <li><b>Взрослым:</b> Торт + Чай (Смешать).</li>
        <li><b>Детям:</b> Торт + Газировка (Смешать).</li>
    </ol>`,

    `<h3>Шаурма</h3>
    <p><i>Жгучая:</i> Когда хочется вредного и быстрого.</p>
    <ol>
        <li>Курица (Запечь).</li>
        <li>Бел. капуста + Огурцы + Помидоры (Нарезать).</li>
        <li>Курица + Овощи (Смешать).</li>
        <li>Лаваш + Соус (Смешать).</li>
        <li>Лаваш + Начинка (Смешать).</li>
        <li>Жарить.</li>
    </ol>`,

    `<h3>Русские пельмени</h3>
    <p><i>Жгучая:</i> Сытно и по-домашнему.</p>
    <ol>
        <li>Вода + Яйца + Мука (Смешать) -> Тесто.</li>
        <li>Лук + Чеснок (Нарезать).</li>
        <li>Свинина + Гов. фарш (Смешать).</li>
        <li>Фарш + Нарезка + Приправы (Смешать).</li>
        <li>Тесто + Начинка (Смешать).</li>
        <li>Варить.</li>
    </ol>`,

    `<h3>Напитки</h3>
    <p><b>Зеленый чай:</b> Вода + Чайные листья (Варить).</p>
    <p><b>Газировка:</b> Просто взять с полки.</p>
    <h3>Жареный снег</h3>
    <p><i>Жгучая:</i> Кто вообще это придумал?</p>
    <p>Снег + Спички (Жарить).</p>`,

    `<h3>Торт Портальный</h3>
    <p><i>Жгучая:</i> Экспериментальный рецепт. Выглядит странно.</p>
    <ol>
        <li>Мука + Какао (Смешать).</li>
        <li>Слив. масло + Сахар (Смешать).</li>
        <li>Смесь(масло) + Яйца (Смешать).</li>
        <li>Смесь(жидкая) + Смесь(сухая) (Смешать) -> Тесто.</li>
        <li>Запечь корж.</li>
        <li>Вишня + Слив. масло + Сгущенка (Смешать) -> Крем.</li>
        <li>Корж + Крем (Смешать).</li>
    </ol>`,
];


// ==========================================
// 5. СПИСОК ГОСТЕЙ
// ==========================================
const GUESTS_LIST = [
    { id: 'murlyka', name: 'Чёрный Мурлыка', dialogues: ['murlyka_d1_start', 'murlyka_d2_start', 'murlyka_d3_start'] },
    { id: 'plamen', name: 'Пламенеющая', dialogues: ['plamen_d1_start', 'plamen_d2_start', 'plamen_d3_start'] },
    { id: 'vecher', name: 'Тёплый Вечер', dialogues: ['vecher_d1_start', 'vecher_d2_start', 'vecher_d3_start'] },
    { id: 'zarya', name: 'Полуденная Заря', dialogues: ['zarya_d1_start', 'zarya_d2_start', 'zarya_d3_start'] },
    { id: 'sun', name: 'Песнь Солнца', dialogues: ['sun_d1_start', 'sun_d2_start', 'sun_d3_start'] },
    { id: 'osetrik', name: 'Осётрик', dialogues: ['osetrik_d1_start', 'osetrik_d2_start', 'osetrik_d3_start'] }
];

// ==========================================
// 6. СЦЕНАРИЙ (ДИАЛОГИ)
// ==========================================
const SCENES = {
    // --- ПАСХАЛКА ---
    'sans_event': {
        text: "Внезапно свет гаснет. Левый глаз Экранчика загорается синим пламенем.\n«d0 y0u wanna hav3 a bad t1m3?»",
        speaker: "Экранчик", // Чтобы он вылетел в центр
        showScreeny: true,
        type: 'blocking', // Блокирует дальнейший проход
        next: 'sans_event_2'
    },
    'sans_event_2': {
        text: "«Ладно, шучу. Но снег жарить нельзя. Это против законов физики и Кулинарного Кодекса. Переделывай, малая». *Звук тромбона*",
        speaker: "Экранчик",
        showScreeny: true,
        type: 'blocking', // Вернет на кухню при нажатии кнопки
        next: null 
    },

    // ---------------- ПРОЛОГ ----------------
    'prologue_start': { text: "Отвратительный, раздражающий звон в висках. Веки будто налиты свинцом, и я едва смогла распахнуть глаза, но тут же была вынуждена прикрыть их лапой. Мир вокруг слишком яркий, слишком броский, проступающий будто сквозь мутную воду.", speaker: "", next: 'prologue_1' },
    'prologue_1': { text: "Тупая боль пульсирует где-то в затылке. Как-то запоздало приходит осознание, что лежу на холодной плитке. Сверху нависает приторно-розовый, отвратно яркий потолок.", speaker: "", sprite: "krapiva_pain", choices: [{ text: "[Сесть]", target: 'action_sit' }] },
    'action_sit': { text: "Голова на секунду идет кругом из-за резкой смены положения. Шкафчики цвета сахарной ваты пускаются в хоровод, и приходится ухватиться за ножку стола, чтобы не плюхнуться обратно спиной вперёд. ", speaker: "", sprite: "krapiva_dizzy", next: 'desc_kitchen_1' },
    'desc_kitchen_1': { text: "Окружающее пространство не спешит обретать смысл. Более того, от интерьера пульсация в голове усиливается. Это кухня, но словно сошедшая с детского рисунка. Возникает ощущение, будто кто-то специально подбирал самые тошнотворные цвета.", speaker: "", sprite: "krapiva_dizzy", next: 'desc_music' },
    'desc_music': { text: "В воздухе витает приторный, искусственный аромат, похожий на жевательную резинку. Сквозь вату в ушах наконец прорезается мелодия – беззаботная, весёлая, с назойливыми синтезаторными переливами, застревающая в голове.", speaker: "", sprite: "krapiva_dizzy", next: 'thoughts_1' },
    'thoughts_1': { text: "«Что это за место? Как я здесь очутилась?»  – кружатся вопросы в голове, не находя ответа в затуманенном разуме.", speaker: "Жгучая Крапива", sprite: "krapiva_confused", next: 'thoughts_2' },
    'thoughts_2': { text: "Последнее, что вспоминается, — вспышка ослепительного света, резкий запах озона и ощущение падения сквозь слои реальности. И вот результат: розовая клетка.", speaker: "", sprite: "krapiva_dizzy", next: 'screen_appears' },
    'screen_appears': { text: "Внезапно воздух потрескивает, и перед лицом появляется улыбчивая мордочка. Летающий в воздухе экран, висящий в пространстве без всяких проводов и крепежей, излучая розоватое свечение. На нем только один статичный смайлик: неестественно широкая нарисованная улыбка.", speaker: "", sprite: "krapiva_dizzy", showScreeny: true, next: 'screen_hello' },
    'screen_hello': { text: "«Добро пожаловать, Жгучая Крапива! – раздается звонкий, механически-бодрый голос, исходящий отовсюду и ниоткуда одновременно. – Мы так рады видеть Вас на Вашем новом рабочем месте!»", speaker: "Экранчик", sprite: "krapiva_dizzy", showScreeny: true, choices: [{ text: "[Отпрянуть]", target: 'action_recoil' }] },
    'action_recoil': { text: "Я дергаюсь назад, инстинктивно приняв оборонительную позу. Волоски на загривке встают дыбом, словно частокол шерстяных копьев. ", speaker: "", sprite: "krapiva_scared", showScreeny: true, next: 'screen_task' },
    'screen_task': { text: "«Не стоит волноваться! Ваша задача проста и увлекательна!» — продолжает экран, его улыбка, кажется, становится ещё шире, ещё неестественнее.", speaker: "Экранчик", sprite: "krapiva_dizzy", showScreeny: true, next: 'screen_task_2' },
    'screen_task_2': { text: "«Вам предстоит обслуживать гостей. Очень, очень важных гостей. Они будут счастливы, сыты и довольны. А ваша цель — сделать их счастливыми, сытыми и довольными!»", speaker: "Экранчик", sprite: "krapiva_dizzy", showScreeny: true, choices: [{ text: "[Спросить про это место]", target: 'screen_book' }, { text: "[Потребовать ответы]", target: 'screen_book' }] },
    'screen_book': { text: "«Для вашего удобства вот книга рецептов. Строго следуйте инструкциям. Творчество приветствуется, но только в разрешённых рамках! Удачи! Помните: улыбка — лучший соус!»", speaker: "Экранчик", sprite: "krapiva_dizzy", showScreeny: true, next: 'book_get' },
    'book_get': { text: "С легким щелчком из ниоткуда в мои руки падает тяжелый том. Кожаный переплёт холодный и странно живой на ощупь. На обложке ровными золотыми буквами выведено: «Кулинарный кодекс. Том I. Основы угождения».", speaker: "", sprite: "krapiva_dizzy", showScreeny: true, next: 'kitchen_alive' },
    'kitchen_alive': { text: "Кухня вокруг моментально оживает. Музыка будто становится громче, цвета – ярче (куда ещё ярче-то?). Конфорки на плите зажигаются сами собой, шкафчики приветственно хлопают своими дверцами, знаменуя начало смены. Головная боль притупляется.", speaker: "", sprite: "krapiva_dizzy", showScreeny: true, choices: [{ text: "[Ущипнуть себя]", target: 'choice_pinch' }, { text: "[Подняться на ноги]", target: 'choice_stand' }] },
    'choice_pinch': { text: "Резкая, но скоротечная боль расцветает на коже, заставляя меня раздосадованно зашипеть. Всё-таки не бредовый сон. Значит, так просто улизнуть не получится. Приходится ухватиться за столешницу и подняться на ноги.", speaker: "Жгучая Крапива", sprite: "krapiva_angry", showScreeny: true, next: 'final_stand' },
    'choice_stand': { text: "Хватаясь лапой за столешницу, что так услужливо пристроилась рядом, я поднимаюсь на ноги. Мир больше не идёт кругом, что, наверное, уже хорошо. Хотя могло быть и лучше.", speaker: "Жгучая Крапива", sprite: "krapiva_calm", showScreeny: true, next: 'final_stand' },
    'final_stand': { text: "Что ж... Кажется, выбора пока нет. Придется играть по правилам.", speaker: "Жгучая Крапива", sprite: "krapiva_calm", showScreeny: true, next: 'START_GAME' },

    // ==========================================
    // ДИАЛОГИ ГОСТЕЙ (ПОЛНЫЕ, РАЗБИТЫЕ)
    // ==========================================

    // --- ЧЕРНЫЙ МУРЛЫКА ---
    'murlyka_d1_start': { text: "Колокольчик звякает тихо, почти неслышно. Одиночные, тяжелые шаги приближаются к прилавку – неторопливые, уверенные.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d1_1' },
    'murlyka_d1_1': { text: "В дверном проеме возникает силуэт, заслоняющий свет уличного фонаря. Черный Мурлыка снимает шляпу, аккуратно стряхивает с нее невидимую пыль и вешает на вешалку.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d1_1_1' },
    'murlyka_d1_1_1': { text: "«Вечер», – его голос звучит как теплый бархат, заглушающий гудение ламп над головой. Он подходит к прилавку, кладет локти на столешницу и смотрит на меня долгим, изучающим взглядом.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d1_1_2' },
    'murlyka_d1_1_2': { text: "Приторный аромат кухни заглушается запахом старых книг, кофе и ночным холодком.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", choices: [{ text: "Привет. Тяжелый день?", target: 'murlyka_d1_good', karma: 1 }, { text: "Что брать будешь?", target: 'murlyka_d1_bad', karma: -1 }] },
    'murlyka_d1_good': { text: "Черный Мурлыка слегка прикрывает глаза, будто прислушиваясь к эху моего вопроса. «Дни бывают разными. Сегодняшний был... насыщенным», – он проводит ладонью по лицу, и на секунду в его позе проскальзывает усталость.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d1_good_2' },
    'murlyka_d1_good_2': { text: "«Твой запах здесь – он как якорь. Успокаивает». Черный Мурлыка оглядывается, его взгляд скользит по полкам, затем останавливается на моих руках", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d1_good_2_2' },
    'murlyka_d1_good_2_2': {text: "Экранчик над моей головой замирает, его улыбка кажется чуть менее навязчивой под этим тяжелым, осознающим взглядом.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d1_good_2_3'},
    'murlyka_d1_good_2_3': {text: "«Это место... сегодня оно не давит на тебя сильнее обычного?» – интересуется он, не отрывая от меня глаз. Я лишь качаю головой.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d1_order'},
    'murlyka_d1_bad': { text: "Уголок его рта чуть дергается – что-то между улыбкой и усмешкой. «Прямолинейно. Огрызаешься на меня уже, я так понимаю?» Он откидывается назад, скрещивая руки на груди.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d1_order' },
    'murlyka_d1_order': { text: "«Мне бы чего-то... простого. Мясного, может. Без излишеств, – Черный Мурлыка фыркает. – Ты ведь помнишь мои вкусы лучше, чем я сам, в последнее время».", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", type: 'order_placed', order: 'steak' },

    'murlyka_d2_start': { text: "Дверь открывается без звона – он, кажется, умеет это делать. В кафе вплывает струйка холодного воздуха и запах осеннего дождя.", speaker: "", guestSprite: "murlyka", next: 'murlyka_d2_1_1' },
    'murlyka_d2_1_1': { text: "Черный Мурлыка стоит на пороге, капельки воды поблескивают на темной шерсти, как крошечные звезды. Он не спешит вытираться.", speaker: "", guestSprite: "murlyka", next: 'murlyka_d2_1_2' },
    'murlyka_d2_1_2': { text: "«Ты еще здесь», – замечает он, и в его тоне слышится не вопрос, а констатация факта, смешанная с легким облегчением.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d2_1_3' },
    'murlyka_d2_1_3': { text: "Он подходит и кладет на прилавок маленький, идеально гладкий камень цвета речного ила.", speaker: "", guestSprite: "murlyka", next: 'murlyka_d2_1' },
    'murlyka_d2_1': { text: "«Нашел. Подумал, тебе понравится», – говорит он просто, как о чем-то само собой разумеющемся.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", choices: [{ text: "Что это?", target: 'murlyka_d2_good', karma: 1 }, { text: "Зачем тащить мусор?", target: 'murlyka_d2_bad', karma: -1 }] },
    'murlyka_d2_good': { text: "Я беру камень. Он холодный и невероятно гладкий на ощупь.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d2_good_1' },
    'murlyka_d2_good_1': { text: "«Просто камень. Но он молчал под дождем тысячу лет. И теперь будет молчать здесь». Его взгляд становится пристальным, почти пронзительным. «Иногда немые вещи – самые честные собеседники. В отличие от... навязчивых голосов»", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d2_good_2' },
    'murlyka_d2_good_2': { text: "Его разноцветные глаза на мгновение скользят вверх, туда, где висит экранчик. Мое сердце замирает. Он что, видит его?", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", choices: [{ text: "Ты... о чем?", target: 'murlyka_d2_good_3' }] },
    'murlyka_d2_good_3': { text: "Я сжимаю камень в ладони, и он постепенно согревается. Мурлыка медленно выдыхает, и его плечи чуть опускаются. «Ни о чем, дорогая. Заработался, брежу. Забудь».", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d2_order'},
    'murlyka_d2_bad': { text: "Он замирает. Тишина становится плотной, как вода. Затем он медленно, очень медленно забирает камень с прилавка и прячет его обратно в карман.", speaker: "", guestSprite: "murlyka", next: 'murlyka_d2_bad_1' },
    'murlyka_d2_bad_1': { text: "«Понятно», – говорит он, и в этом одном слове – целая вселенная разочарования и отстранения. Он больше не смотрит на меня, а разглядывает меню над прилавком.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d2_order'},
    'murlyka_d2_order': { text: "Тихий стук хвоста о стойку прерывает неловкую тишину. Едва заметная дрожь пробегает по его лапам.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d2_order_1' },
    'murlyka_d2_order_1': { text: "«Мне чего-нибудь горячего. Чай, может, – наконец произносит он. – Продрог до костей».", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", type: 'order_placed', order: 'tea' },
    
    'murlyka_d3_start': { text: "Колокольчик на двери звучит сдержанно, почти лениво. Одна пара неторопливых, тяжелых шагов приближается к прилавку. Черный Мурлыка останавливается напротив, облокотившись о стойку широкими ладонями.", speaker: "", guestSprite: "murlyka", next: 'murlyka_d3_1_1' },
    'murlyka_d3_1_1': { text: "Его длинный пушистый хвост медленно раскачивается из стороны в сторону, сметая невидимую пыль с пола.", speaker: "", guestSprite: "murlyka", next: 'murlyka_d3_1_2'},
    'murlyka_d3_1_2': { text: "«Привет, милая, — его голос похож на урчание старого самовара. Он смотрит на меня не моргая, разноцветные глаза-щелки отражают свет лампы.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d3_1' },
    'murlyka_d3_1': { text: "В воздухе витает слабый запах старой книги, кофе и чего-то теплого — шерсти, нагретой солнцем. – Ты как тут?»", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", choices: [ {text: "Все в порядке. Как сам?", target: 'murlyka_d3_2_1' }] },
    'murlyka_d3_2_1': { text: "«Жив-здоров. Хвост цел, усы на месте», — он лениво проводит рукой по усам, расправляя их.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d3_2_2' },
    'murlyka_d3_2_2': { text: "Взгляд скользит по полкам за моей спиной, будто составляет инвентарную опись. «Тихо тут сегодня. Слишком тихо, не находишь?»", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d3_2_3' },
    'murlyka_d3_2_3': { text: "Он отрывается от прилавка и делает медленный круг, осматривая зал. Останавливается у окна, заглядывая в темноту снаружи.", speaker: "", guestSprite: "murlyka", next: 'murlyka_d3_2_4' },
    'murlyka_d3_2_4': { text: "«Мне слышится, будто стены тут сегодня потоньше. Сквозит чем-то... знакомым. Ты не чувствуешь?» — его вопрос висит в воздухе, обволакивающий и тихий.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", choices: [{ text: "Нет, не чувствую. Ты устал, наверное.", target: 'murlyka_d3_bad', karma: -1 }, { text: "Чувствую.", target: 'murlyka_d3_good', karma: 1 }] },
    'murlyka_d3_good': { text: "Ответ сам слетает с губ. Взгляд Черного Мурлыки от этого, кажется, обостряется.", speaker: "", guestSprite: "murlyka", next: 'murlyka_d3_good_1' },
    'murlyka_d3_good_1': { text: "«Знаешь, это место…» – резкий треск прямо над ухом обрывает мои слова. Я поднимаю глаза. Экранчик пялится в ответ, и его улыбка давит на мои плечи сильнее обычного.", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d3_good_2' },
    'murlyka_d3_good_2': { text: "Я делаю незаметный полушаг ближе к Черному Мурлыке, но от него больше не веет теплом и уютом. Как будто я застряла меж двух зол.", speaker: "", guestSprite: "murlyka", next: 'murlyka_d3_order' },
    'murlyka_d3_bad': { text: "Черный Мурлыка возвращается к прилавку, и на его морде появляется тень улыбки — едва заметное движение усов. «Возможно. А возможно, это просто запах твоих блюд, который сводит меня с ума».", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", next: 'murlyka_d3_bad_1' },
    'murlyka_d3_bad_1': { text: "Он наклоняется чуть ближе, и кажется, будто от него исходит тихое мурчание, низкая вибрация, которую чувствуешь кожей, а не слышишь ушами.", speaker: "", guestSprite: "murlyka", next: 'murlyka_d3_order' },
    'murlyka_d3_order': { text: "«В любом случае, – наконец говорит он, отряхивая с плеча невидимую пыль. – Угостишь чем-нибудь быстрым, навынос? Нет времени засиживаться, работа, работа, одна работа».", speaker: "Чёрный Мурлыка", guestSprite: "murlyka", type: 'order_placed', order: 'shawarma' },

    // --- ПЛАМЕНЕЮЩАЯ И НЕЗАБУДОЧКА ---
    'plamen_d1_start': { text: "Колокольчик на двери бодро звякает. Две пары шагов – одна более шебутная, частая, вторая размереннее, но не менее энергичная, – приближаются к прилавку", speaker: "", guestSprite: "plamen", next: 'plamen_d1_1_1' },
    'plamen_d1_1_1': { text: "«Привет, ба!» – звонко проносится детский голосок. Незабудочка встает на цыпочки, чтобы заглянуть через прилавок. Рядом с ней с добродушной улыбкой стоит Пламенеющая.", speaker: "Незабудочка", guestSprite: "plamen", next: 'plamen_d1_1' }, 
    'plamen_d1_1': { text: "«Привет-привет! Как дела?» – Пламенеющая опирается локтем на столешницу, с интересом глядя на меня.", speaker: "Пламенеющая", choices: [{ text: "Все в порядке. У вас как?", target: 'plamen_d1_good', karma: 1 }, { text: "Могло быть и лучше", target: 'plamen_d1_bad', karma: -1 }] },
    'plamen_d1_good': { text: "«За-ме-ча-тель-но! – Незабудочка приподнимается из-за прилавка чуть выше, ее глаза светятся энтузиазмом. – Мы видели уток в парке!»", speaker: "Незабудочка", guestSprite: "plamen", next: 'plamen_d1_good_2' },
    'plamen_d1_good_2': { text: "Как бы подтверждая свои слова, она достает перо из кармана, вытягивая его вперед как трофей.", speaker: "", guestSprite: "plamen", next: 'plamen_d1_good_3' },
    'plamen_d1_good_3': { text: "Пламенеющая тепло смеется, ероша шерстку на макушке дочери: «Да, они сегодня особенно храбрые — чуть не выпросили у нас все печенье. А у тебя тут новинок не появилось?»", speaker: "Пламенеющая", guestSprite: "plamen", next: 'plamen_d1_good_4' },
    'plamen_d1_good_4': { text: "Незабудочка начинает с любопытством разглядывать полки за моей спиной.", guestSprite: "plamen", choices: [{ text: "Да вроде нет?", target: 'plamen_d1_good_5' }] },
    'plamen_d1_good_5': { text: "Я оглядываюсь на книгу рецептов, словно она может дать мне ответ. Книга упорно молчит, храня тайну появления новинок.", speaker: "", guestSprite: "plamen", next: 'plamen_d1_good_6' },
    'plamen_d1_good_6': { text: "Экранчик над моей головой тоже притих, только пялится жутко с этой своей слишком уж дружелюбной улыбкой.", speaker: "", guestSprite: "plamen", next: 'plamen_d1_good_7' },
    'plamen_d1_good_7': { text: "«Да нет вроде? – я неловко чешу затылок. – Все по-старому, наверное.»", speaker: "Жгучая Крапива", guestSprite: "plamen", next: 'plamen_d1_order' },
    'plamen_d1_bad': { text: "Пламенеющая озабоченно хмурится, рассеянно кладя руку на макушку дочери, не сводя с меня внимательного взгляда.", speaker: "Пламенеющая", guestSprite: "plamen", next: 'plamen_d1_bad_2' },
    'plamen_d1_bad_2': { text: "«Все в порядке?»", speaker: "Пламенеющая", guestSprite: "plamen", next: 'plamen_d1_bad_3' },
    'plamen_d1_bad_3': { text: "«У тебя болит голова? – добавляет Незабудочка с внезапной серьезностью. – Я могу подуть, чтобы прошло».", speaker: "Незабудочка", guestSprite: "plamen", next: 'plamen_d1_bad_4' },
    'plamen_d1_bad_4': { text: "Где-то на задворках сознания мелькает мысль: «Скажи им. Спроси, что это за место. Попроси помочь найти выход».", speaker: "", guestSprite: "plamen", next: 'plamen_d1_bad_5' },
    'plamen_d1_bad_5': { text: "Но улыбка нависающего над головой экранчика продолжает невесомо давить на плечи, поэтому я держу рот на замке и просто качаю головой: «Пройдет».", speaker: "Жгучая Крапива", guestSprite: "plamen", next: 'plamen_d1_order' },
    'plamen_d1_order': { text: "«Так вот... Мы тут думали зайти, сладкого чего-нибудь хватануть. И шоколад.»", speaker: "Пламенеющая", next: 'plamen_d1_order_2' },
    'plamen_d1_order_2': { text: "«И шоколад! Сделаешь?»", speaker: "Незабудочка", type: 'order_placed', order: 'sweet_combo_duo' },

    'plamen_d2_start': { text: "Звякает дверной колокольчик, и на несколько секунд кухню окутывает запах озона и шелест капель по стеклу. Кто-то стучит мокрыми ботинками по коврику, после чего две пары шагов приближаются к прилавку.", speaker: "", guestSprite: "plamen", next: 'plamen_d2_0' },
    'plamen_d2_0': { text: "«Привет, мам! – окликает Пламенеющая, закрывая промокший зонтик и ставя его напротив прилавка. – Там льет как из ведра! До тебя пришлось плыть.»", speaker: "Пламенеющая", guestSprite: "plamen", next: 'plamen_d2_1' },
    'plamen_d2_1': { text: "Незабудочка стягивает яркий дождевичок и пытается закинуть его на вешалку. Несмотря на разницу в росте между ней и железным деревом, повесить плащ все-таки удается, и она торопливо семенит к матери под бок.", speaker: "", guestSprite: "plamen", choices: [{ text: "Рада вас видеть. Как дела?", target: 'plamen_d2_good', karma: 1 }, { text: "Побыстрее. Что брать-то будете?", target: 'plamen_d2_bad', karma: -1 }] },
    'plamen_d2_good': { text: "«Да нормально. Вот вышли погулять, а там дождь ливанул – дальше носа ни зги не видно», – Пламенеющая оборачивается к окну, наблюдая, как капли стремительно стекают вниз по стеклу.", speaker: "Пламенеющая", guestSprite: "plamen", next: 'plamen_d2_good_1' },
    'plamen_d2_good_1': { text: "«Мы были в парке. – добавляет Незабудочка, заглядывая через прилавок. Она тянется к карману и выкладывает что-то на розовую поверхность. – Держи гриб».", speaker: "Незабудочка", guestSprite: "plamen", choices: [{ text: "Взять гриб", target: 'plamen_d2_good_2' }] },
    'plamen_d2_good_2': { text: "Я недоуменно моргаю, прежде чем взять гриб и присмотреться. Он все еще сыроватый после улицы, но вроде не червивый и выглядит съедобно.", speaker: "", guestSprite: "plamen", next: 'plamen_d2_good_3' },
    'plamen_d2_good_3': { text: "С другой стороны, а дала бы Пламя дочери таскать с собой ядовитый гриб в кармане? Хотя может и да.", speaker: "", guestSprite: "plamen", next: 'plamen_d2_order' },
    'plamen_d2_bad': { text: "Пламенеющая чуть хмурится от грубого тона. Ушки Незабудочки чуть отклоняются назад, и она с легкой нервозностью переводит взгляд между матерью и бабушкой.", speaker: "", guestSprite: "plamen", next: 'plamen_d2_bad_1' },
    'plamen_d2_bad_1': { text: "«У тебя все хорошо? – спрашивает Пламенеющая, поправляя зонтик, чтобы он не свалился на пол.", speaker: "Пламенеющая", guestSprite: "plamen", next: 'plamen_d2_bad_2' },
    'plamen_d2_bad_2': { text: "В ее глазах мелькает беспокойство, впрочем, она быстро пытается разрядить обстановку. – Это не мы дождь наколдовали, если что. Не надо в нас молниями кидаться».", speaker: "Пламенеющая", guestSprite: "plamen", next: 'plamen_d2_bad_3' },
    'plamen_d2_bad_3': { text: "Я хмыкаю против своей воли: «Ничего особенного. Просто… День тяжелый, я думаю. Так что брать будете?»", speaker: "Жгучая Крапива", guestSprite: "plamen", next: 'plamen_d2_order' },
    'plamen_d2_order': { text: "«Мы тут подумали… Хватануть чего-нибудь быстренько. Не будем тут засиживаться, нам домой еще плыть.", speaker: "Пламенеющая", guestSprite: "plamen", next: 'plamen_d2_order_1' },
    'plamen_d2_order_1': { text: "Пламенеющая демонстративно взмахивает хвостом в сторону окна. – Есть у тебя какая-нибудь отрава вокзальная?»", speaker: "Пламенеющая", guestSprite: "plamen", type: 'order_placed', order: 'shawarma' },

    'plamen_d3_start': { text: "Колокольчик у двери звякает громко и радостно. Первой в кафе прошмыгивает Незабудочка, сжимая что-то в лапках, сразу за ней – Пламенеющая.", speaker: "", guestSprite: "plamen", next: 'plamen_d3_0' },
    'plamen_d3_0': { text: "«Ба, смотри!» – Незабудочка кладет листок на прилавок, слегка подталкивая в мою сторону. Я склоняюсь поближе.", speaker: "Незабудочка", guestSprite: "plamen", next: 'plamen_d3_0_1' },
    'plamen_d3_0_1': { text: "На бумаге не совсем аккуратными, но очень старательными линиями выведены три фигурки за прилавком, уставленным пирожными. Все улыбаются.", speaker: "", guestSprite: "plamen", next: 'plamen_d3_0_2' },
    'plamen_d3_0_2': { text: "«Глума нарисовала тебе новую вывеску. – Пламенеющая подходит ближе, нежно взъерошивая шерстку на макушке дочери.", speaker: "Пламенеющая", guestSprite: "plamen", next: 'plamen_d3_1' },
    'plamen_d3_1': { text: "Та фыркает с наигранной серьезностью. – Говорит, тебе тут не хватает семейного уюта».", speaker: "Пламенеющая", guestSprite: "plamen", choices: [{ text: "Очень красиво. Спасибо.", target: 'plamen_d3_good', karma: 1 }, { text: "У тебя что, уроков нет? Зачем тратить время на рисунки?", target: 'plamen_d3_bad', karma: -1 }] },
    'plamen_d3_good': { text: "Я поднимаю рисунок, скользя глазами по силуэтам. Линии неровные, цвета чуть выходят за края, но в этом и вся прелесть, не так ли? Незабудочка смотрит на меня выжидающе, теребя выбившуюся из рукава нитку.", speaker: "", guestSprite: "plamen", next: 'plamen_d3_good_1' },
    'plamen_d3_good_1': { text: "«Красиво. – искренне говорю я. – Мне очень нравится. Особенно то, что ты нарисовала всем улыбки».", speaker: "Жгучая Крапива", guestSprite: "plamen", next: 'plamen_d3_good_2' },
    'plamen_d3_good_2': { text: "Детские глаза сверкают от радости. Незабудочка улыбается, взволнованно помахивая хвостиком. Взгляд Пламенеющей теплеет.", speaker: "", guestSprite: "plamen", next: 'plamen_d3_good_3' },
    'plamen_d3_good_3': { text: "Экранчик же продолжает висеть над моей головой, выжидающе наблюдая. Они не видят его. Он что, в моей голове?", speaker: "", guestSprite: "plamen", next: 'plamen_d3_order' },
    'plamen_d3_bad': { text: "Пламенеющая насупливается: «Это не «трата времени». Это важно»", speaker: "Пламенеющая", guestSprite: "plamen", next: 'plamen_d3_bad_1' },
    'plamen_d3_bad_1': { text: "Незабудочка чуть прижимает ушки к голове и подтягивает бумажку обратно к себе, прижимая ее к груди. «Я хотела сделать тебе приятно», – негромко поясняет она, глядя в пол.", speaker: "Незабудочка", guestSprite: "plamen", next: 'plamen_d3_bad_2' },
    'plamen_d3_bad_2': { text: "Повисает неловкое молчание. Экранчик пялится мне в затылок, кажется, пытается прожечь там дыру интенсивностью своей – ненастоящей – дружелюбной улыбки.", speaker: "", guestSprite: "plamen", next: 'plamen_d3_order' },
    'plamen_d3_order': { text: "Пламенеющая прокашливается, привлекая к себе внимание. «Мы думали чего-нибудь на ужин взять. Не было времени готовить, – протягивает она. – Пельменей что ли каких, но не китайщины всякой».", speaker: "Пламенеющая", guestSprite: "plamen", type: 'order_placed', order: 'dumplings_russian' },
    
    // --- ТЕПЛЫЙ ВЕЧЕР ---
    'vecher_d1_start': { text: "Торопливо открывается дверь, безжалостно встряхивая дверной колокольчик. Растрепанный вождь заходит в кафе, длинными шагами приближаясь к прилавку и параллельно крича на кого-то в трубку телефона.", speaker: "", guestSprite: "vecher", next: 'vecher_d1_0' },
    'vecher_d1_0': { text: "«Алло, бизнес?! – быстрый кивок в знак приветствия. – Да-да, деньги!» Теплый Вечер на мгновение прижимает трубку к шее, окидывая меня взглядом.", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d1_1' },
    'vecher_d1_1': { text: "«Ты давно здесь?»", speaker: "Тёплый Вечер", guestSprite: "vecher", choices: [{ text: "Да?", target: 'vecher_d1_good', karma: 1 }, { text: "Нет?", target: 'vecher_d1_good_0', karma: 1 }, { text: "А тебя это колупать не должно", target: 'vecher_d1_bad', karma: -1 }] },
    'vecher_d1_good': { text: "Он поднимает бровь.\n«Я тут вчера был. Закрыто было. Дверь толкнул – не открылось».", speaker: "Тёплый Вечер", guestSprite: "vecher", choices: [{ text: "Но дверь открывается в другую сторону", target: 'vecher_d1_good_1' }] },
    'vecher_d1_good_1': { text: "Он замолкает. В трубке что-то гремит, но он не обращает внимания.\n«Ну так я так и сказал? Не важно».", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d1_order' },
    'vecher_d1_good_0': { text: "Он щурится, глядя на меня пристально, затем фыркает.\n«Партия будет гордиться твоими гастрономическими достижениями. Никто не забыт, ничто не забыто».", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d1_order' },
    'vecher_d1_bad': { text: "В трубке кто-то орет «Да не может шаурма стоить три изумруда!»\nЗа окном кафе приглушенно доносится «Полковнику никто не пишет» из чьей-то машины.\nТеплый Вечер лишь дергает ухом: «О как».", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d1_order' },
    'vecher_d1_order': { text: "Я пялюсь на него в ответ. Даже Экранчик, кажется, несколько ошеломлен.", speaker: "", guestSprite: "vecher", next: 'vecher_d1_order_1' },
    'vecher_d1_order_1': { text: "«Ну, – тараторит Теплый Вечер, сбрасывая звонок под чей-то недовольный вопль, – сваргань чего-нибудь итальяно. Настроение сегодня взорвать мафию».", speaker: "Тёплый Вечер", type: 'order_placed', order: 'carbonara' },

    'vecher_d2_start': { text: "Дверной колокольчик громко бряцает. Теплый Вечер появляется на пороге, слегка запыхавшийся. Его шерсть слегка влажная от дождя или снега. В лапах у него два стаканчика с чем-то горячим.", speaker: "", guestSprite: "vecher", next: 'vecher_d2_1' },
    'vecher_d2_1': { text: "«Так, стой, не двигайся! – командует он, аккуратно проходя к прилавку. – Я нес эссенцию тепла и бодрости через суровые внешние условия.", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d2_2' },
    'vecher_d2_2': { text: "Один стаканчик, к сожалению, пал в неравном бою с внезапно появившейся лестницей. Этот – твой».", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d2_3' },
    'vecher_d2_3': { text: "Он торжественно ставит передо мной стаканчик, от которого пахнет корицей и имбирем.", speaker: "", guestSprite: "vecher", choices: [{ text: "Спасибо. Ты как?", target: 'vecher_d2_good', karma: 1 }, { text: "Ты опять опоздал на собрание", target: 'vecher_d2_bad', karma: -1 }] },
    'vecher_d2_good': { text: "«Я? – Теплый Вечер опирается локтем на прилавок и смотрит в потолок. – Да нормально. Шел сюда мимо парка, а там уточки… Нет, вру, не уточки.", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d2_good_1' },
    'vecher_d2_good_1': { text: "Сидят, обсуждают миграционную политику. Я, конечно, задержался, вступил в дискуссию. Теперь они считают меня своим. Надеюсь, ты не против?»", speaker: "Тёплый Вечер", guestSprite: "vecher", choices: [{ text: "Только не курлыкай на моих клиентов", target: 'vecher_d2_good_2' }] },
    'vecher_d2_good_2': { text: "Он хитро улыбается, глаза искрятся озорством.\n«Никаких обещаний, никаких клятв. Я подумаю», – он делает добротный глоток из своего стаканчика, стряхивая влажную шерсть с глаз.", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d2_order' },
    'vecher_d2_bad': { text: "«Опоздал? – переспрашивает он, поднимая бровь. – Или переформатировал? Смотри, иногда хаос – это просто неупорядоченный творческий процесс.", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d2_bad_1' },
    'vecher_d2_bad_1': { text: "Без моего... эээ... структурирующего отсутствия они бы никогда не узнали, что могут принимать решения самостоятельно! Это ценный опыт.", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d2_bad_2' },
    'vecher_d2_bad_2': { text: "Я, можно сказать, создал учебную ситуацию. Педагогический прием».\nОн делает глоток из своего стаканчика, улыбаясь крайне самодовольно.", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d2_order' },
    'vecher_d2_order': { text: "«Слушай, а есть у тебя что-нибудь рыбное? – он подпирает щеку кулаком и барабанит пальцами по столешнице. – Че-нибудь царское… Вождевское, то есть, конечно».", speaker: "Тёплый Вечер", guestSprite: "vecher", type: 'order_placed', order: 'sturgeon' },

    'vecher_d3_start': { text: "Дверь открывается, и Теплый Вечер замирает на пороге, озираясь.\n«Так, — произносит он. — Новый день. Новая попытка».", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d3_1' },
    'vecher_d3_1': { text: "Он заходит, на этот раз в футболке с пиксельным кактусом и подписью «Выживаю».\nПод мышкой у него скрюченный, явно помятый лист бумаги.", speaker: "", guestSprite: "vecher", next: 'vecher_d3_2' },
    'vecher_d3_2': { text: "«Привет. Я, вроде как, по делу. — он кладет бумагу на прилавок. Это что-то вроде плана дежурств, но половина имен зачеркнута, в углу нарисован смайлик, а внизу приписка: «или как получится».", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d3_3' },
    'vecher_d3_3': { text: "Нужно будет вот это… обсудить. Но не сейчас. Сейчас я функционально ограничен. Мозг требует углеводов».", speaker: "Тёплый Вечер", guestSprite: "vecher", choices: [{ text: "Разумеется. Ну ты как сам?", target: 'vecher_d3_good', karma: 1 }, { text: "Углеводов? Чем это ты таким утомительным занимался?", target: 'vecher_d3_bad', karma: -1 }] },
    'vecher_d3_good': { text: "Теплый Вечер трет лицо рукой.\n«Туда-сюда я эти ваши утры, – бормочет он. – А еще наглый воробей украл у меня крошку. Я теперь в долгу перед силами природы.", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d3_good_1' },
    'vecher_d3_good_1': { text: "Придется повесить кормушку. Добавлю это в свой список дел, между «изобрести вечный двигатель» и «найти пропавший носок», ну, очень важный лист, знаешь»", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d3_order' },
    'vecher_d3_bad': { text: "Он обмякает на прилавок, кажется, не замечая язвительный тон или просто игнорируя его.\n«Это капут. Меня убили, – он комкает бумажку и убирает ее обратно в карман. – Три часа.", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d3_order' },
    'vecher_d3_bad_1': { text: "Три часа я слушал отчет о динамике запасов мха! И теперь мой мозг… он как этот мох. Сухой и местами потрескавшийся. Спасай».", speaker: "Тёплый Вечер", guestSprite: "vecher", next: 'vecher_d3_bad_1' },
    'vecher_d3_order': { text: "Он встает ровнее, поправляя футболку и скидывая шерсть с глаз.\n«Давай чего-нибудь такого, от чего в голове снова появятся цветные картинки, – он наконец решает. – И чтобы сладко».", speaker: "Тёплый Вечер", guestSprite: "vecher", type: 'order_placed', order: 'portal_cake' },

    // --- ПОЛУДЕННАЯ ЗАРЯ ---
    'zarya_d1_start': { text: "Колокольчик на двери звякает мягко и мелодично, будто ему тоже не хочется нарушать тишину. Шаги неспешные, легкие — сначала слышен стук каблучков, а затем более тяжелый, но все такой же неторопливый след.", speaker: "", guestSprite: "zarya", next: 'zarya_d1_0' },
    'zarya_d1_0': { text: "За прилавок заглядывает пара добрых, чуть усталых глаз, а следом появляется и вся Полуденная Заря.", speaker: "", guestSprite: "zarya", next: 'zarya_d1_1' },
    'zarya_d1_1': { text: "«Здравствуй. Ты как тут? – произносит она негромко, подходя ближе и опираясь на столешницу локтем».", speaker: "Полуденная Заря", guestSprite: "zarya", choices: [{text:"Все в порядке", target:'zarya_d1_good', karma: 1}, {text:"Лучше видали", target:'zarya_d1_bad', karma: -1}] },
    'zarya_d1_good': { text: "Она щурится чуть, будто чуя мою ложь, но все-таки решает не комментировать. Только вздыхает тихо и трет лицо тыльной стороной ладони.", speaker: "Полуденная Заря", guestSprite: "zarya", next: 'zarya_d1_good_1' },
    'zarya_d1_good_1': { text: "«Хорошо, – наконец говорит она. – Но, если что, я всегда готова выслушать, ладно?»", speaker: "Полуденная Заря", guestSprite: "zarya", next: 'zarya_d1_good_2' },
    'zarya_d1_good_2': { text: "Я выдавливаю маленькую ободряющую улыбку и киваю.", speaker: "", guestSprite: "zarya", next: 'zarya_d1_order' },
    'zarya_d1_bad': { text: "Она хмурится, разглядывая мое лицо, будто может прочитать на нем ответы.\n«Ты в последнее время сама не своя. Ты словно не здесь. Будто на тебе гиря висит, невидимая»", speaker: "Полуденная Заря", guestSprite: "zarya", next: 'zarya_d1_bad_1' },
    'zarya_d1_bad_1': { text: "Экранчик над головой продолжает улыбаться – хочется схватить что-то потяжелее и запустить в него, чтоб перестал. Но я только пожимаю плечами, мол, ну висит и висит, тебе-то что.", speaker: "", guestSprite: "zarya", next: 'zarya_d1_order' },
    'zarya_d1_order': { text: "Полуденная Заря выпрямляется, прогоняя напряженную тишину.\n«Ну ладно, – произносит она тихим голосом. – Приготовишь чего-нибудь? Пельменей каких-то, например».", speaker: "Полуденная Заря", guestSprite: "zarya", type: 'order_placed', order: 'dumplings_chinese' },
    
    'zarya_d2_start': { text: "Дверь открывается с лёгким скрипом. С улицы тянет запахом мокрой земли и нагретого асфальта.", speaker: "", guestSprite: "zarya", next: 'zarya_d2_0' },
    'zarya_d2_0': { text: "Полуденная Заря встряхивает скромный, но прочный плащ и вешает его на крючок с таким видом, будто он здесь всегда и висел. Подходит к прилавку, оставляя на полу аккуратные влажные следы.", speaker: "", guestSprite: "zarya", next: 'zarya_d2_1' },
    'zarya_d2_1': { text: "«Прибьёт дождь пыль — и сразу светлее. И в голове, и на улице, — говорит она, скорее себе, глядя в окно. Потом поворачивается ко мне. — Не замочило тебя? Окно-то тут подтекает, помнится».", speaker: "Полуденная Заря", guestSprite: "zarya", choices: [{text:"Нет, все сухо. Сама как?", target:'zarya_d2_good', karma:1}, {text:"Есть немного. Что заказывать будешь?", target:'zarya_d2_order'}] },
    'zarya_d2_good': { text: "«Я-то... Прогулялась, пока лило. — В её глазах мелькает далёкий, задумчивый огонёк. — Старое дерево на холме новые побеги дало.", speaker: "Полуденная Заря", guestSprite: "zarya", next: 'zarya_d2_good_1' },
    'zarya_d2_good_1': { text: "Радость это. — Она облокачивается на прилавок, изучая мое выражение лица. — А у тебя взгляд...занятой. Я тебе помехой?»", speaker: "Полуденная Заря", guestSprite: "zarya", next: 'zarya_d2_good_2' },
    'zarya_d2_good_2': { text: "«Нет, что ты, – спешу заверить я. – Всегда рада».", speaker: "Жгучая Крапива", guestSprite: "zarya", next: 'zarya_d2_good_3' },
    'zarya_d2_good_3': { text: "«Радость — она тихая птица. Шуму не любит, — усмехается она уголком губ. — Ну, раз не гонишь… Давай мне с собой чего-нибудь. Ты свое дело знаешь»", speaker: "Полуденная Заря", guestSprite: "zarya", next: 'zarya_d2_order' },
    'zarya_d2_order': { text: "Она чуть отстраняется, уловив спешку в моем тоне. Не обижается, но принимает это к сведению, как смену ветра.", speaker: "", guestSprite: "zarya", next: 'zarya_d2_order_1' },
    'zarya_d2_order_1': { text: "«Дела, дела... Беготня суетная. Ладно, не буду задерживать. — Она выпрямляет спину. — Давай мне с собой чего-нибудь. Ты свое дело знаешь».", speaker: "Полуденная Заря", type: 'order_placed', order: 'dumplings_russian' },

    'zarya_d3_start': { text: "Колокольчик звучит, и через мгновение в кафе вносит стойкий, уютный запах сушеных трав и печеных яблок. Полуденная Заря несет небольшую, тщательно завязанную льняную сумку. Она ставит её на прилавок с мягким стуком.", speaker: "", guestSprite: "zarya", next: 'zarya_d3_1' },
    'zarya_d3_1': { text: "«На, — говорит она просто, слегка подталкивая сверток ко мне. — Для воздуха. Ты тут в запахах кофе да сладостей плаваешь, а душе иногда иное требуется»", speaker: "Полуденная Заря", guestSprite: "zarya", choices: [{text:"Это что?", target:'zarya_d3_2'}] },
    'zarya_d3_2': { text: "«Обычно такое спрашивают, когда не знают, как спасибо сказать, – замечает она, но в ее голосе нет досады. Только мягкая ирония. – Полынь да чабрец. И лаванды немного. Разложи где подальше от глаз. Работать будет»", speaker: "Полуденная Заря", guestSprite: "zarya", next: 'zarya_d3_3' },
    'zarya_d3_3': { text: "Она наблюдает, как я развязываю тесьму.", speaker: "", guestSprite: "zarya", choices: [{text:"Пахнет… как в детстве. Спасибо", target:'zarya_d3_good', karma: 1}, {text:"Зачем тратиться? У меня всего хватает", target:'zarya_d3_bad', karma: -1}] },
    'zarya_d3_good': { text: "Морщинки у ее глаз углубляются. На лице появляется улыбка – родная, теплая.", speaker: "", guestSprite: "zarya", next: 'zarya_d3_good_2' },
    'zarya_d3_good_2': { text: "«Детство – оно не в прошлом, Жгуча. Оно с тобой всегда и остается. В памяти, в ощущениях, – она кивает на сверток, – в запахах».", speaker: "Полуденная Заря", guestSprite: "zarya", next: 'zarya_d3_order' },
    'zarya_d3_bad': { text: "Она замирает на секунду, окидывая меня взглядом. По кафе расползается напряжение, даже Экранчик, кажется, начал тихо потрескивать.", speaker: "", guestSprite: "zarya", next: 'zarya_d3_bad_1' },
    'zarya_d3_bad_1': { text: "«Забота – не трата. Она – посев, – качает головой Полуденная Заря. – Но раз тебе всего хватает… Я не навязываюсь».", speaker: "Полуденная Заря", guestSprite: "zarya", next: 'zarya_d3_order' },
    'zarya_d3_order': { text: "«Сделай мне с рыбой что-нибудь, – она опирается на столешницу, разглядывая полки за моей спиной отстраненным взглядом. – С лососем».", speaker: "Полуденная Заря", type: 'order_placed', order: 'fish_creamy' },

    // --- ПЕСНЬ СОЛНЦА ---
    'sun_d1_start': { text: "Колокольчик звучит приглушенно, будто обернутый тканью. К прилавку подходит фигура. Контуры ее плывут, как в жаркий день над асфальтом – силуэт есть, а деталей не схватить. ", speaker: "", guestSprite: "sun", next: 'sun_d1_0' },
    'sun_d1_0': { text: "От нее пахнет пыльцой, сухой травой и чем-то далеким – как воспоминание о лете, которое уже почти стерлось.", speaker: "", guestSprite: "sun", next: 'sun_d1_1' },
    'sun_d1_1': { text: "«Здравствуй, – голос тихий, похожий на шелест страниц старого альбома. Он будто доносится не через уши, а возникает прямо в голове. – Какое у тебя здесь… тихое место».", speaker: "Песнь Солнца", guestSprite: "sun", choices: [{ text: "Привет. Что-то нужно?", target: 'sun_d1_2' }] },
    'sun_d1_2': { text: "Фигура чуть склоняет голову, и на мгновение в дымке проступает смутная улыбка.", speaker: "Песнь Солнца", guestSprite: "sun", next: 'sun_d1_3' },
    'sun_d1_3': { text: "«Нужно... Да, пожалуй. Просто постоять тут, послушать тишину. Она у тебя густая, как кисель. — Она проводит расплывчатой рукой по воздуху, словно трогая незримую ткань. — Меня не гонят?»", speaker: "Песнь Солнца", guestSprite: "sun", choices: [{text:"Нет конечно. Проходи", target:'sun_d1_good', karma: 1}, {text:"Если только мешать не будешь", target:'sun_d1_bad', karma: -1}] },
    'sun_d1_good': { text: "«Спасибо, – фигура движется ближе к прилавку, ее шаги бесшумны. Кажется, будто тень от нее падает не в ту сторону. – В такой тишине мысли наконец перестают звенеть. Будто компресс ко лбу прикладываешь».", speaker: "Песнь Солнца", guestSprite: "sun", next: 'sun_d1_order' },
    'sun_d1_bad': { text: "Фигура слегка вздрагивает, будто от легкого ветерка.\n«Ох, прости. Я и правда отвлекаю, – бормочет она. – Не хотела нарушать твой покой. Просто потянуло сюда… Как магнитом, знаешь».", speaker: "Песнь Солнца", guestSprite: "sun", next: 'sun_d1_order' },
    'sun_d1_order': { text: "«В любом случае… – ее голос снова становится шелестящим. – Можно мне чего-нибудь… Такого, ты понимаешь? Чего-то теплого, что держишь в ладонях, и оно согревает изнутри».", speaker: "Песнь Солнца", guestSprite: "sun", type: 'order_placed', order: 'tea' },
    
    'sun_d2_start': { text: "Дверь открывается беззвучно, лишь холодок пробегает по спине. Песнь Солнца уже стоит у прилавка, слушая заедающую музыку из колонок.", speaker: "", guestSprite: "sun", next: 'sun_d2_0' },
    'sun_d2_0': { text: "Ее образ сегодня чуть яснее — угадывается рост, плавный изгиб плеча под легкой, будто из марева сшитой тканью.", speaker: "", guestSprite: "sun", next: 'sun_d2_1' },
    'sun_d2_1': { text: "«Эта мелодия... — она напевает пару нот, точь-в-точь попадая в такт. Голос ее чистый, но без вибрации, как звук стеклянного колокольчика. — Она все еще играет здесь. Я думала, ее давно забыли»", speaker: "Песнь Солнца", guestSprite: "sun", choices: [{ text: "Ты слышала ее раньше?", target: 'sun_d2_good', karma: 1 }, { text: "Что такого? Обычный фоновый шум", target: 'sun_d2_bad', karma: -1 }] },
    'sun_d2_good': { text: "Я поднимаю бровь против своей воли. Посетительнице известна эта приедающаяся мелодия, что никогда не выключается на кухне?", speaker: "", guestSprite: "sun", next: 'sun_d2_good_1' },
    'sun_d2_good_1': { text: "«Слышала? – она наклоняет голову набок. Я не вижу ее глаз, но чувствую, что она смотрит сквозь меня, на полки, отсутствующим взглядом. – Да. Думаю, да, слышала».", speaker: "Песнь Солнца", guestSprite: "sun", next: 'sun_d2_order' },
    'sun_d2_bad': { text: "«А... — звук обрывается, будто оборвалась струна. В тишине слышно лишь эту самую приторно бодрую мелодию. — Да, конечно. Просто шум", speaker: "Песнь Солнца", guestSprite: "sun", next: 'sun_d2_bad_1' },
    'sun_d2_bad_1': { text: "Она отступает на шаг, и контуры снова начинают терять четкость. — Извини, я, кажется, отвлекла тебя от работы».", speaker: "Песнь Солнца", guestSprite: "sun", next: 'sun_d2_order' },
    'sun_d2_order': { text: "«Мне бы… – Она бормочет тихо. – Чего-то со сливками, несложного. И без сахара, пожалуйста».", speaker: "Песнь Солнца", guestSprite: "sun", type: 'order_placed', order: 'fish_creamy' },

    'sun_d3_start': { text: "Колокольчик не звенит. Песнь Солнца просто появляется у прилавка, внезапно, как и ее имя в моей голове. От нее пахнет скошенной травой и горячим камнем.", speaker: "", guestSprite: "sun", next: 'sun_d3_0' },
    'sun_d3_0': { text: "«Можно вопрос? – спрашивает она сразу, без предисловий. – Тебе здесь не одиноко? В этой тишине между звонами колокольчика».", speaker: "Песнь Солнца", guestSprite: "sun", next: 'sun_d3_1' },
    'sun_d3_1': { text: "Я бросаю взгляд на Экранчик над своей головой. Тот продолжает улыбаться.", speaker: "Песнь Солнца", guestSprite: "sun", choices: [{ text: "Одиноко. Иногда очень", target: 'sun_d3_good', karma: 1 }, { text: "А что? Бывает и похуже", target: 'sun_d3_bad', karma: -1 }] },
    'sun_d3_good': { text: "Тихое, почти сочувственное «ах» срывается с ее губ. Ее форма смягчается, будто хочет обнять, но не решается.", speaker: "", guestSprite: "sun", next: 'sun_d3_good_1' },
    'sun_d3_good_1': { text: "«Пустота тоже может гудеть, да. Как ракушка у уха. — Она замолкает, и кажется, что от нее исходит беззвучное тепло. — Но ты не одна. Просто... некоторые связи невидимы, пока на них не упадет свет».", speaker: "Песнь Солнца", guestSprite: "sun", next: 'sun_d3_order' },
    'sun_d3_bad': { text: "Шерсть у меня на загривке неосознанно встает дыбом. Одиноко? Я заперта в этой розовой клетке без возможности сбежать, а у меня спрашивают про одиночество?", speaker: "Песнь Солнца", guestSprite: "sun", next: 'sun_d3_bad_1' },
    'sun_d3_bad_1': { text: "«А что? – ворчу я недовольно. – Бывает и похуже».", speaker: "Жгучая Крапива", guestSprite: "sun", next: 'sun_d3_bad_2' },
    'sun_d3_bad_2': { text: "«Похуже… – она повторяет рассеянно, и в ее голосе почти слышно одобрение. – Не сломалась, значит. Это радует».", speaker: "Песнь Солнца", guestSprite: "sun", next: 'sun_d3_order' },
    'sun_d3_order': { text: "«Так, пожалуйста… – она отводит взгляд (если он у нее вообще есть). – Дай мне что-нибудь вишневое. С собой, если не затруднит».", speaker: "Песнь Солнца", guestSprite: "sun", type: 'order_placed', order: 'portal_cake' },

    // --- ОСЕТРИК ---
    'osetrik_d1_start': { text: "Дверь распахивается резко, бодро – колокольчики протестующе звенят. В кафе врывается поток свежего уличного воздуха.", speaker: "", guestSprite: "osetrik", next: 'osetrik_d1_1' },
    'osetrik_d1_1': { text: "«Приве-е-ет, мам! – Осетрик опирается на прилавок, его дыхание частое, чуть сбитое. Видимо, бежал. – Мимо проносился, подумал, дай заскочу».", speaker: "Осётрик", guestSprite: "osetrik", choices: [{ text: "Привет, сынок. Как сам?", target: 'osetrik_d1_good', karma: 1 }, { text: "Быстро, Осетрик, я занята.", target: 'osetrik_d1_bad', karma: -1 }] },
    'osetrik_d1_good': { text: "«Да хорошо все! – в его глазах сверкают озорные искорки, хвост виляет туда-сюда. – Солнце светит, листья падают, трава растет. Что плохо-то пойдет?»", speaker: "Осётрик", guestSprite: "osetrik", next: 'osetrik_d1_good_1' },
    'osetrik_d1_good_1': { text: "Он перевешивается через прилавок, оглядывая меня с улыбкой.\n«А ты как, миссис Всея Повар?»", speaker: "Осётрик", guestSprite: "osetrik", choices: [{ text: "Все в порядке", target: 'osetrik_d1_good_1_1', karma: 1 }, { text: "Лучше видали.", target: 'osetrik_d1_bad_1_1', karma: -1 }] },
    'osetrik_d1_good_1_1': { text: "Осетрик щелкает пальцами и показывает на меня. Своеобразный «я-же-говорил» жест.\n«Вот это дело!»", speaker: "Осётрик", guestSprite: "osetrik", next: 'osetrik_d1_order' },
    'osetrik_d1_bad_1_1': { text: "Его улыбка замирает на секунду, затем сползает с лица полностью. Он озадаченно поднимает бровь, затем неловко кашляет в кулак.\n«Кто-то не в настроении сегодня. Понял»", speaker: "Осётрик", guestSprite: "osetrik", next: 'osetrik_d1_order' },
    'osetrik_d1_bad': { text: "Энергичная улыбка на его морде чуть меркнет, уши прижимаются чуть ближе к голове. Он проводит лапой по стойке, смахивая невидимую крошку.", speaker: "", guestSprite: "osetrik", next: 'osetrik_d1_bad_1' },
    'osetrik_d1_bad_1': { text: "«Ой, ма, ты как начальник цеха. Ладно, ладно, не буду мешать священному процессу, – говорит он, но в его голосе слышна легкая обида. – Просто забежал, поздороваться хотел».", speaker: "Осётрик", guestSprite: "osetrik", next: 'osetrik_d1_order' },
    'osetrik_d1_order': { text: "«Я тут пронюхал, что у тебя рыбное что-то в менюшке есть. – он барабанит пальцами по столешнице. – Сварганишь по-быстрому, а?»", speaker: "Осётрик", type: 'order_placed', order: 'sturgeon' },

    'osetrik_d2_start': { text: "Дверь открывается с натужным скрипом – Осетрик явно пытался войти тихо и потерпел неудачу. Он стоит на пороге, за его спиной льёт осенний дождь, а сам он прячет что-то объёмное за спиной.", speaker: "", guestSprite: "osetrik", next: 'osetrik_d2_0' },
    'osetrik_d2_0': { text: "«Тссс, мам, не смотри! Это секретный проект!»\nОн крадется к прилавку, шумно шаркая мокрыми кроссовками, и ставит на столешницу загадочный сверток, обернутый в промокшую газету.", speaker: "Осётрик", guestSprite: "osetrik", next: 'osetrik_d2_1' }, 
    'osetrik_d2_1': { text: "«Все, можно смотреть. Я сегодня не просто так. Я – гений. Почти. Но мне для полного раскрытия гениального потенциала нужна подзаправка».", speaker: "Осётрик", guestSprite: "osetrik", choices: [{ text: "Выглядишь довольным. Что намастерил?", target: 'osetrik_d2_good', karma: 1 }, { text: "Опять всякий хлам с улицы тащишь?", target: 'osetrik_d2_bad', karma: -1 }] },
    'osetrik_d2_good': { text: "Его глаза загораются, уши встают торчком.\n«Это будет вечный... ну, или очень долгоиграющий двигатель для моей модели космолета! Ну, почти. Пока это просто батарейка, старая пружина и эта штуковина.", speaker: "Осётрик", guestSprite: "osetrik", next: 'osetrik_d2_good_1' },
    'osetrik_d2_good_1': { text: "Он достает из кармана тот самый болт и крутит его в пальцах. – Но идея-то гениальная!»", speaker: "Осётрик", guestSprite: "osetrik", next: 'osetrik_d2_order' },
    'osetrik_d2_bad': { text: "Он надувает щеки, подтягивает сверток ближе к себе и дуется. Его хвост больше не виляет радостно.", speaker: "", guestSprite: "osetrik", next: 'osetrik_d2_bad_1' },
    'osetrik_d2_bad_1': { text: "«Это не хлам, это компоненты... Ладно. – он вздыхает. – Будешь смеяться, но я проголодался. После... умственной работы».", speaker: "Осётрик", guestSprite: "osetrik", next: 'osetrik_d2_order' },
    'osetrik_d2_order': { text: "«Слушай, сделай мне чего-нибудь, а? Только с чаем. И без мяса. А то, знаешь, один повар был так увлечен нарезкой мяса, что сам не заметил, как начал отдавать себя работе», – он усердно делает серьезное лицо. Мне на мгновение кажется, что Экранчик над моей головой фыркает.", speaker: "Осетрик", guestSprite: "osetrik", type: 'order_placed', order: 'sweet_combo_adult' },

    'osetrik_d3_start': { text: "Дверь открывается медленно. Осетрик заходит не прыжком, а обычным шагом. Его уши слегка опущены, на толстовке – новое пятно, похожее на машинное масло. Он молча подходит к прилавку, кладет на него согнутый, но тщательно выпрямленный гвоздь.", speaker: "", guestSprite: "osetrik", next: 'osetrik_d3_1' },
    'osetrik_d3_1': { text: "«Привет. Это... я нашел. Кажется, крепкий».\nОн избегает прямого взгляда, изучая свои слегка потертые лапы. Его голос тихий, без привычной искринки.", speaker: "Осётрик", guestSprite: "osetrik", choices: [{ text: "Что стряслось?", target: 'osetrik_d3_good', karma: 1 }, { text: "Я же говорила тебе перестать возиться с хламом.", target: 'osetrik_d3_bad', karma: -1 }] },
    'osetrik_d3_good': { text: "«Да так... – он пожимает плечами. – Мой «вечный двигатель» решил стать одноразовым. Взорвался. Немного. Никто не пострадал, кроме моей гордости и твоего горшка с геранью... прости».", speaker: "Осётрик", guestSprite: "osetrik", next: 'osetrik_d3_good_2' },
    'osetrik_d3_good_2': { text: "Он наконец смотрит на меня, и в его глазах – редкая для него неуверенность.\n«Я думал, у меня получается... А оно – бац. Ладно. Можно я просто посижу тут немного? И... поем чего-нибудь?»", speaker: "Осётрик", guestSprite: "osetrik", next: 'osetrik_d3_order' },
    'osetrik_d3_bad': { text: "Слово «хлам» тяжело повисает в воздухе. Осетрик резко втягивает воздух, как будто его укололи. Все его тело мгновенно выпрямляется, становясь неестественно прямым и жестким.", speaker: "", guestSprite: "osetrik", next: 'osetrik_d3_bad_1' },
    'osetrik_d3_bad_1': { text: "Он отводит взгляд, и его лицо застывает в нейтральной маске. Медленно, слишком осознанно, он забирает с прилавка свой гвоздь и прячет его в карман.", speaker: "", guestSprite: "osetrik", next: 'osetrik_d3_bad_2' },
    'osetrik_d3_bad_2': { text: "«Понял. – голос звучит глухо, без обычных переливов. – Не буду мешать».", speaker: "Осётрик", guestSprite: "osetrik", next: 'osetrik_d3_order' },
    'osetrik_d3_order': { text: "«Сделай мне… Что-то на свое усмотрение, хорошо? – он произносит, оборачиваясь и глядя в окно, избегая моего взгляда. – Только с сыром».", speaker: "Осётрик", type: 'order_placed', order: 'carbonara' }
};

// ==========================================
// 7. РЕАКЦИИ ГОСТЕЙ (ИЗ ДОКУМЕНТА)
// ==========================================
const GUEST_REACTIONS_DATA = {
    'murlyka': {
        fav_dish: 'steak',
        favorite: "Взгляд Чёрного Мурлыки смягчается. Он закрывает глаза в блаженстве.\n«Ты определённо знаешь, как готовить то, что мы оба любим».",
        correct: "Он чуть наклоняется, пробуя, и улыбается.\n«Интересное сочетание. Думаю, мне стоит заказывать это почаще?»",
        wrong: "Он пробует, и его лицо не выражает ничего.\n«Сомневаюсь, что это то, что я заказывал. Может, ты переработала?»"
    },
    'plamen': {
        fav_dish: 'sweet_combo_duo',
        favorite: "«Ты единственная, кто делает его… правильно. Без компромиссов. Прямо как дома».",
        correct: "«М-м-м… Да! Это именно то, что мне было нужно. Ты читаешь мои мысли, мам!»",
        wrong: "«Ма-а-ам, ты что, подменила мой заказ на какой-то... экспериментальный проект? Ну ладно, съем»."
    },
    'vecher': {
        fav_dish: 'carbonara',
        favorite: "«Сю-ю-юда! Мое любимое итальянское солнце из лапши. Спасибо!»",
        correct: "«Ах, вот оно что! Я в прошлый раз говорил, что хочу попробовать что-то новое? Ты меня поймала!»",
        wrong: "«Хм. На вкус как… недоразумение с хорошими намерениями. Давай засчитаем это за творческий порыв?»"
    },
    'zarya': {
        fav_dish: 'dumplings_chinese',
        favorite: "«О, спасибо. Как раз то, что прописал доктор для души. Любимое».",
        correct: "«Ты всегда знаешь, как меня приятно удивить. Может, и правда стоит менять привычки?»",
        wrong: "«Милая, это определенно… Блюдо. Но, боюсь, не то, что вращалось в моих мыслях»."
    },
    'sun': {
        fav_dish: 'fish_creamy',
        favorite: "Её губы расплываются в улыбке.\n«Любимое блюдо приготовлено прямо как мне нравится. Ты определённо знаешь, что делаешь».",
        correct: "«Интересно. Ты, кажется, видишь связь между ингредиентами, которую я упускала. Мне нравится».",
        wrong: "Она ест молча, но фигура её напряжённая.\n«Спасибо...»"
    },
    'osetrik': {
        fav_dish: 'sturgeon',
        favorite: "«О! М-м-м. Мое самое-самое. Спасибо, ма!»",
        correct: "«Ага-а-а! Ты угадала мою секретную мысль! Подумал про это, пока сюда шёл».",
        wrong: "«Ма… Это не то. Может, я лучше бутерброд поем? А это… уткам отдам»."
    }
};

const KRAPIVA_THOUGHTS = {
    'serving': [
        "Надеюсь, это то, что нужно...",
        "Выглядит съедобно. Отдаю.",
        "Ну, с богом...",
        "Пахнет неплохо. Посмотрим, что скажет."
    ]
};

// ==========================================
// 8. ДИАЛОГИ ЭКРАНЧИКА (УТРО) - ОБНОВЛЕНО
// ==========================================
const SCREENY_DIALOGUES = {
    // ДЕНЬ 2: ОБЫЧНЫЙ
    'morning_d2_start': {
        text: "«Какие-то вопросы? Я здесь, чтобы помогать. Задавайте!»",
        speaker: "Экранчик", showScreeny: true,
        choices: [
            { text: "Что это за место?", target: 'screen_q_place' },
            { text: "Почему гости не помнят вчера?", target: 'screen_q_memory' },
            { text: "Когда я смогу уйти?", target: 'screen_q_leave' },
            { text: "Что будет, если я нагрублю?", target: 'screen_q_rude' }
        ]
    },
    // Ответы для Дня 2
    'screen_q_place': { text: "«Это кафе «Дримсайд»! Место абсолютного счастья!»", speaker: "Экранчик", showScreeny: true, next: 'screen_morning_end' },
    'screen_q_memory': { text: "«Для свежести впечатлений! Каждый визит как первый!»", speaker: "Экранчик", showScreeny: true, next: 'screen_morning_end' },
    'screen_q_leave': { text: "«О каком «уходе» речь? Поток гостей бесконечен!»", speaker: "Экранчик", showScreeny: true, next: 'screen_morning_end' },
    'screen_q_rude': { text: "«Ошибки вносят дисгармонию. Просто следуйте инструкциям!»", speaker: "Экранчик", showScreeny: true, next: 'screen_morning_end' },

    // ДЕНЬ 3: ПРЕДУПРЕЖДЕНИЕ
    'morning_d3_start': {
        text: "«День третий. Теперь ты работаешь самостоятельно. Экранчик больше не будет исправлять твои ошибки. Будь внимательна.»",
        speaker: "", // Рассказчик
        next: 'START_GAME'
    },
    
    // ХОРРОР-РЕЖИМ: Утро
    'morning_horror': {
        text: "Экранчик молча смотрит на тебя. Его улыбка кажется шире.",
        speaker: "", showScreeny: true,
        choices: [
            { text: "Что это за место?", target: 'horror_q_ignore' },
            { text: "Почему гости...", target: 'horror_q_ignore' },
            { text: "Когда я уйду?", target: 'horror_q_ignore' }
        ]
    },
    'horror_q_ignore': {
        text: "«...»",
        speaker: "Экранчик", showScreeny: true, next: 'START_GAME'
    },

    // ХОРРОР-РЕЖИM: Конец дня
    'horror_end_day': {
        text: "Я смотрю на Экранчика. Экранчик смотрит на меня в ответ.",
        speaker: "", showScreeny: true,
        choices: [
            { text: "Что было с тем гостем? Он был как… глитч", target: 'horror_end_day_answer' }
        ]
    },
    'horror_end_day_answer': {
        text: "Улыбка Экранчика чуть увеличивается.\n«Глитч? Ох, кажется, кое-кто переработал! Это же было просто микроволновое помешательство — безобидный сбой. Ничего страшного. А теперь — глубокий вдох, улыбка, и продолжаем дарить радость!»",
        speaker: "Экранчик", showScreeny: true, next: 'START_HORROR_DAY' // Метка для начала нового хоррор-дня
    },
    
    // Финал утра -> СТАРТ СМЕНЫ
    'screen_morning_end': {
        text: "«Не все сразу! Другие вопросы задашь завтра. А сейчас – твоя смена начинается!»",
        speaker: "Экранчик", showScreeny: true, next: 'START_GAME'
    },

    // Блокировка ошибки
    'block_mistake': {
        text: "Экранчик преграждает путь: «Ай-ай-ай! Это не то, что заказал наш Дорогой Гость! Переделай!»",
        speaker: "Экранчик", showScreeny: true, type: 'blocking'
    }
};

// ==========================================
// 9. ХОРРОР ДИАЛОГИ (ИЗ PDF)
// ==========================================
// Здесь "id" соответствует гостю, который превратился в монстра
const HORROR_SCENES = {
    'murlyka_horror': {
        text: "Тишина... Тяжелая, неуютная. Гость склоняет голову набок под неестественным углом.",
        speaker: "", 
        guestSprite: "murlyka", // Тут должна быть хоррор-версия спрайта
        choices: [
            { text: "С тобой все хорошо? (Беспокойство)", target: 'murlyka_horror_good', karma: 1 },
            { text: "Что тебе надо? (Отвращение)", target: 'murlyka_horror_bad', karma: -1 }
        ]
    },
    'murlyka_horror_good': {
        // Расшифровка из PDF: "Открой глаза. Проснись."
        text: "«Jnrhjq ukfpf. Ghjcybcm...» Он отстукивает пальцем ритм по стеклу. Его глаза смотрят в пустоту.", 
        speaker: "???",
        next: 'murlyka_horror_order'
    },
    'murlyka_horror_bad': {
        text: "«VJZ HTFKMYJCNM NFR :T {HEGRF?» (МОЯ РЕАЛЬНОСТЬ ТАК ЖЕ ХРУПКА?) Он скалится.",
        speaker: "???",
        next: 'murlyka_horror_order'
    },
    'murlyka_horror_order': {
        text: "«КРОВЬ... То есть... Стейк с кровью. Сейчас».",
        speaker: "???",
        type: 'order_placed',
        order: 'steak' // Всегда любимое блюдо
    },

    // Для остальных гостей можно добавить аналогичные блоки
    'plamen_horror': {
        text: "Фигура дергается, как сломанная кукла. «Drec 'njuj njhnf...»",
        speaker: "", guestSprite: "plamen",
        choices: [{text:"Вы в порядке?", target:'plamen_h_good', karma:1}, {text:"Заказывай!", target:'plamen_h_bad', karma:-1}]
    },
    'plamen_h_good': { text: "«Он знает то, о чем ты еще не догадываешься...»", speaker: "???", next: 'plamen_h_order' },
    'plamen_h_bad': { text: "«СЛАДКОЕ! ДАЙ СЛАДКОЕ!»", speaker: "???", next: 'plamen_h_order' },
    'plamen_h_order': { text: "«Торт... и газировку... и чай... Двойное...»", speaker: "???", type:'order_placed', order:'sweet_combo_duo' }
};