function nacitajKnihy() {
    fetch("/api/knihy")
        .then(odpoved => odpoved.json())
        .then(knihy => {
            const zoznam = document.getElementById("zoznam");
            zoznam.innerHTML = "";
            knihy.forEach(kniha => {
                const riadok = document.createElement("tr");
                [kniha.id, kniha.nazov, kniha.autor, kniha.rok, kniha.cena]
                    .forEach(hodnota => {
                        const bunka = document.createElement("td");
                        bunka.textContent = hodnota;
                        riadok.appendChild(bunka);
                    });

                const bunka = document.createElement("td");

                // PATCH: zmena ceny
                const tlacidloCena = document.createElement("button");
                tlacidloCena.textContent = "Zmeniť cenu";
                tlacidloCena.onclick = () => {
                    const zmena = prompt("O koľko € zmeniť cenu? (napr. 2 alebo -1.5)");
                    if (zmena === null || zmena.trim() === "") return;
                    fetch("/api/knihy/" + kniha.id + "/cena", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ zmena: Number(zmena.replace(",", ".")) })
                    }).then(() => nacitajKnihy());
                };

                // PUT: úprava celej knihy
                const tlacidloUprav = document.createElement("button");
                tlacidloUprav.textContent = "Upraviť";
                tlacidloUprav.onclick = () => {
                    const nazov = prompt("Názov:", kniha.nazov);
                    if (nazov === null) return;
                    const autor = prompt("Autor:", kniha.autor);
                    if (autor === null) return;
                    const rok = prompt("Rok:", kniha.rok);
                    if (rok === null) return;
                    const cena = prompt("Cena (€):", kniha.cena);
                    if (cena === null) return;
                    fetch("/api/knihy/" + kniha.id, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            nazov: nazov,
                            autor: autor,
                            rok: Number(rok),
                            cena: Number(cena.replace(",", "."))
                        })
                    }).then(() => nacitajKnihy());
                };

                // DELETE
                const tlacidlo = document.createElement("button");
                tlacidlo.textContent = "Vymazať";
                tlacidlo.onclick = () => {
                    fetch("/api/knihy/" + kniha.id, { method: "DELETE" })
                        .then(() => nacitajKnihy());
                };

                bunka.appendChild(tlacidloCena);
                bunka.appendChild(tlacidloUprav);
                bunka.appendChild(tlacidlo);
                riadok.appendChild(bunka);
                zoznam.appendChild(riadok);
            });
        });
}

const formular = document.getElementById("formular");
formular.addEventListener("submit", event => {
    event.preventDefault();
    const kniha = {
        nazov: document.getElementById("nazov").value,
        autor: document.getElementById("autor").value,
        rok: Number(document.getElementById("rok").value),
        cena: Number(document.getElementById("cena").value)
    };

    fetch("/api/knihy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kniha)
    }).then(() => {
        formular.reset();
        nacitajKnihy();
    });
});

nacitajKnihy();