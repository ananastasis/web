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
                const tlacidlo = document.createElement("button");
                tlacidlo.textContent = "Vymazať";
                tlacidlo.onclick = () => {
                    fetch("/api/knihy/" + kniha.id, { method: "DELETE" })
                        .then(() => nacitajKnihy());
                };
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