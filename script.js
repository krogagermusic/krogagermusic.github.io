// Функция для выбора случайного элемента из массива
function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// Функция для выбора случайного названия песни из iframe элементов
function getRandomSongTitle() {
    const iframes = Array.from(document.querySelectorAll('iframe'));
    const songTitles = iframes.map(iframe => {
        // Создаем временный элемент для парсинга содержимого iframe
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = iframe.innerHTML;

        // Извлекаем первый тег <a> и берем его текст
        const firstLink = tempDiv.querySelector('a');
        return firstLink ? firstLink.textContent.trim() : '';
    }).filter(title => title); // фильтруем пустые элементы

    return getRandomElement(songTitles);
}

// Функция для смены названия кнопки
function updateButtonTitle() {
    const songTitleElement = document.getElementById('songTitle');
    const randomSongTitle = getRandomSongTitle();
    if (randomSongTitle) {
        songTitleElement.textContent = randomSongTitle;
    }
}

// Обновление названия кнопки каждые 2 секунды
setInterval(updateButtonTitle, 2000);

// Начальная установка названия кнопки
updateButtonTitle();

document.getElementById('randomButton').addEventListener('click', function() {
    // Получаем текущее название песни на кнопке
    const currentSongTitle = document.getElementById('songTitle').textContent;

    // Ищем iframe, содержащий текущую песню
    const targetIframe = Array.from(document.querySelectorAll('iframe')).find(iframe => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = iframe.innerHTML;
        const firstLink = tempDiv.querySelector('a');
        return firstLink && firstLink.textContent.trim() === currentSongTitle;
    });

    if (targetIframe) {
        // Получаем родительский элемент секции
        const targetSection = targetIframe.closest('section');

        if (targetSection) {
            // Вычисляем координаты секции
            const sectionRect = targetSection.getBoundingClientRect();
            const sectionTop = sectionRect.top + window.scrollY;
            const sectionMiddle = sectionTop + (sectionRect.height / 2) - (window.innerHeight / 2);

            // Прокручиваем к середине секции
            window.scrollTo({
                top: sectionMiddle,
                behavior: 'smooth'
            });
        }
    }
});
