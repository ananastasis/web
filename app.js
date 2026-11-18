document.addEventListener("DOMContentLoaded", () => {
    fetch("topbar.html")
        .then(response => {
            if (response.ok) return response.text();
            throw new Error("Не удалось загрузить topbar.html");
        })
        .then(data => {
            const container = document.getElementById("topbar-container");
            if (container) {
                container.innerHTML = data;
            }
        })
        .catch(error => console.error("Ошибка:", error));
});