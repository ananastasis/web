document.addEventListener("DOMContentLoaded", () => {
    // Получаем элементы формы
    const menoInput = document.getElementById("meno");
    const emailInput = document.getElementById("email");
    const kurzSelect = document.getElementById("kurz");
    const poznamkaTextarea = document.getElementById("poznamka");
    const urovenRadios = document.querySelectorAll("input[name='uroven']");
    const form = document.getElementById("zadanieForm");

    // Получаем элементы живого превью
    const prevMeno = document.getElementById("prevMeno");
    const prevEmail = document.getElementById("prevEmail");
    const prevKurz = document.getElementById("prevKurz");
    const prevUroven = document.getElementById("prevUroven");
    const prevPoznamka = document.getElementById("prevPoznamka");

    // Отслеживаем ввод текста
    menoInput.addEventListener("input", () => {
        prevMeno.textContent = menoInput.value || "-";
    });

    emailInput.addEventListener("input", () => {
        prevEmail.textContent = emailInput.value || "-";
    });

    poznamkaTextarea.addEventListener("input", () => {
        prevPoznamka.textContent = poznamkaTextarea.value || "-";
    });

    // Отслеживаем выбор курса в select
    kurzSelect.addEventListener("change", () => {
        prevKurz.textContent = kurzSelect.value || "-";
    });

    // Отслеживаем выбор радиокнопок уровня
    urovenRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.checked) {
                prevUroven.textContent = radio.value;
            }
        });
    });

    // Симуляция отправки формы
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Запрещаем реальную отправку и перезагрузку страницы[cite: 2]

        // Скрываем форму[cite: 2]
        form.style.display = "none";

        // Показываем требуемое системное сообщение[cite: 2]
        alert("Formulár bol úspešne odoslaný.");
    });
});