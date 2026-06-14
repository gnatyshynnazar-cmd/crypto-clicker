// 1. Змінні гри
let balance = 0;
let coinsPerSecond = 0;
let clickPower = 1; // Сила кліку за замовчуванням

let clickCost = 50; // Ціна прокачки кліку
let gpuCost = 15;
let gpuCount = 0;
let asicCost = 100;
let asicCount = 0;

// 2. Завантаження гри
function loadGame() {
    const savedBalance = localStorage.getItem('crypto_clicker_balance');
    const savedCps = localStorage.getItem('crypto_clicker_cps');
    const savedClickPower = localStorage.getItem('crypto_clicker_clickPower');
    const savedClickCost = localStorage.getItem('crypto_clicker_clickCost');
    
    const savedGpuCost = localStorage.getItem('crypto_clicker_gpuCost');
    const savedGpuCount = localStorage.getItem('crypto_clicker_gpuCount');
    const savedAsicCost = localStorage.getItem('crypto_clicker_asicCost');
    const savedAsicCount = localStorage.getItem('crypto_clicker_asicCount');

    if (savedBalance !== null) balance = parseFloat(savedBalance);
    if (savedCps !== null) coinsPerSecond = parseInt(savedCps);
    if (savedClickPower !== null) clickPower = parseInt(savedClickPower);
    if (savedClickCost !== null) clickCost = parseInt(savedClickCost);
    
    if (savedGpuCost !== null) gpuCost = parseInt(savedGpuCost);
    if (savedGpuCount !== null) gpuCount = parseInt(savedGpuCount);
    if (savedAsicCost !== null) asicCost = parseInt(savedAsicCost);
    if (savedAsicCount !== null) asicCount = parseInt(savedAsicCount);
}

// 3. Збереження гри
function saveGame() {
    localStorage.setItem('crypto_clicker_balance', balance);
    localStorage.setItem('crypto_clicker_cps', coinsPerSecond);
    localStorage.setItem('crypto_clicker_clickPower', clickPower);
    localStorage.setItem('crypto_clicker_clickCost', clickCost);
    
    localStorage.setItem('crypto_clicker_gpuCost', gpuCost);
    localStorage.setItem('crypto_clicker_gpuCount', gpuCount);
    localStorage.setItem('crypto_clicker_asicCost', asicCost);
    localStorage.setItem('crypto_clicker_asicCount', asicCount);
}

// 4. Пошук елементів на сторінці
const balanceDisplay = document.getElementById('balance');
const cpsDisplay = document.getElementById('cps-value');
const coinBtn = document.getElementById('coin-btn');

const buyClickBtn = document.getElementById('buy-click-btn');
const clickCostDisplay = document.getElementById('click-cost');

const buyGpuBtn = document.getElementById('buy-gpu-btn');
const gpuCostDisplay = document.getElementById('gpu-cost');

const buyAsicBtn = document.getElementById('buy-asic-btn');
const asicCostDisplay = document.getElementById('asic-cost');

// 5. Оновлення екрану (UI)
function updateUI() {
    balanceDisplay.textContent = Math.floor(balance);
    cpsDisplay.textContent = coinsPerSecond;
    
    clickCostDisplay.textContent = clickCost;
    gpuCostDisplay.textContent = gpuCost;
    asicCostDisplay.textContent = asicCost;

    // Перевірка доступності кнопок в магазині
    buyClickBtn.disabled = balance < clickCost;
    buyGpuBtn.disabled = balance < gpuCost;
    buyAsicBtn.disabled = balance < asicCost;
}

// 6. Клік по монеті з динамічними цифрами
coinBtn.addEventListener('click', (e) => {
    balance += clickPower; // Додаємо силу кліку замість +1
    updateUI();
    saveGame();

    // Створюємо елемент для цифри
    const floatingNum = document.createElement('div');
    floatingNum.classList.add('floating-number');
    floatingNum.textContent = `+${clickPower}`; // Показує реальну силу кліку!

    const rect = coinBtn.getBoundingClientRect();
    const x = e.clientX ? (e.clientX - rect.left) : (rect.width / 2);
    const y = e.clientY ? (e.clientY - rect.top) : (rect.height / 2);

    floatingNum.style.left = `${x}px`;
    floatingNum.style.top = `${y}px`;

    coinBtn.parentElement.appendChild(floatingNum);

    setTimeout(() => {
        floatingNum.remove();
    }, 600);
});

// 7. Покупка Мульти-тапу
buyClickBtn.addEventListener('click', () => {
    if (balance >= clickCost) {
        balance -= clickCost;
        clickPower += 1; // Тепер тапає сильніше
        clickCost = Math.round(clickCost * 2); // Кожен наступний рівень вдвічі дорожчий
        updateUI();
        saveGame();
    }
});

// 8. Покупка GPU
buyGpuBtn.addEventListener('click', () => {
    if (balance >= gpuCost) {
        balance -= gpuCost;
        gpuCount += 1;
        coinsPerSecond += 1;
        gpuCost = Math.round(gpuCost * 1.4); 
        updateUI();
        saveGame();
    }
});

// 9. Покупка ASIC
buyAsicBtn.addEventListener('click', () => {
    if (balance >= asicCost) {
        balance -= asicCost;
        asicCount += 1;
        coinsPerSecond += 10;
        asicCost = Math.round(asicCost * 1.5); 
        updateUI();
        saveGame();
    }
});

// 10. Таймер пасивного доходу
setInterval(() => {
    if (coinsPerSecond > 0) {
        balance += coinsPerSecond;
        updateUI();
        saveGame();
    }
}, 1000);

// Запуск гри
loadGame();
updateUI();