// 1. Змінні гри
let balance = 0;
let coinsPerSecond = 0;

let gpuCost = 15;
let gpuCount = 0;

// Нові змінні для другого товару
let asicCost = 100;
let asicCount = 0;

// 2. Завантаження гри
function loadGame() {
    const savedBalance = localStorage.getItem('crypto_clicker_balance');
    const savedCps = localStorage.getItem('crypto_clicker_cps');
    const savedGpuCost = localStorage.getItem('crypto_clicker_gpuCost');
    const savedGpuCount = localStorage.getItem('crypto_clicker_gpuCount');
    
    // Завантаження даних для Асіка
    const savedAsicCost = localStorage.getItem('crypto_clicker_asicCost');
    const savedAsicCount = localStorage.getItem('crypto_clicker_asicCount');

    if (savedBalance !== null) balance = parseFloat(savedBalance);
    if (savedCps !== null) coinsPerSecond = parseInt(savedCps);
    if (savedGpuCost !== null) gpuCost = parseInt(savedGpuCost);
    if (savedGpuCount !== null) gpuCount = parseInt(savedGpuCount);
    
    if (savedAsicCost !== null) asicCost = parseInt(savedAsicCost);
    if (savedAsicCount !== null) asicCount = parseInt(savedAsicCount);
}

// 3. Збереження гри
function saveGame() {
    localStorage.setItem('crypto_clicker_balance', balance);
    localStorage.setItem('crypto_clicker_cps', coinsPerSecond);
    localStorage.setItem('crypto_clicker_gpuCost', gpuCost);
    localStorage.setItem('crypto_clicker_gpuCount', gpuCount);
    
    // Зберігаємо Асік
    localStorage.setItem('crypto_clicker_asicCost', asicCost);
    localStorage.setItem('crypto_clicker_asicCount', asicCount);
}

// 4. Пошук елементів на сторінці
const balanceDisplay = document.getElementById('balance');
const cpsDisplay = document.getElementById('cps-value');
const coinBtn = document.getElementById('coin-btn');

const buyGpuBtn = document.getElementById('buy-gpu-btn');
const gpuCostDisplay = document.getElementById('gpu-cost');

const buyAsicBtn = document.getElementById('buy-asic-btn');
const asicCostDisplay = document.getElementById('asic-cost');

// 5. Оновлення екрану
function updateUI() {
    balanceDisplay.textContent = Math.floor(balance);
    cpsDisplay.textContent = coinsPerSecond;
    
    gpuCostDisplay.textContent = gpuCost;
    asicCostDisplay.textContent = asicCost;

    // Перевірка для кнопки GPU
    if (balance >= gpuCost) {
        buyGpuBtn.disabled = false;
    } else {
        buyGpuBtn.disabled = true;
    }

    // Перевірка для кнопки ASIC
    if (balance >= asicCost) {
        buyAsicBtn.disabled = false;
    } else {
        buyAsicBtn.disabled = true;
    }
}

// 6. Клік по монеті
coinBtn.addEventListener('click', () => {
    balance += 1;
    updateUI();
    saveGame();
});

// 7. Покупка GPU
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

// 8. Покупка ASIC
buyAsicBtn.addEventListener('click', () => {
    if (balance >= asicCost) {
        balance -= asicCost;
        asicCount += 1;
        coinsPerSecond += 10; // Додає одразу +10 монеток в сек!
        asicCost = Math.round(asicCost * 1.5); // Наступний дорожчає в півтора рази
        updateUI();
        saveGame();
    }
});

// 9. Таймер пасивного доходу
setInterval(() => {
    if (coinsPerSecond > 0) {
        balance += coinsPerSecond;
        updateUI();
        saveGame();
    }
}, 1000);

// Запуск
loadGame();
updateUI();