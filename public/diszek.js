document.getElementById('diszlista').onclick = diszListHTML;

async function diszListHTML() {
    const response = await fetch("diszek");
    const diszek = await response.json();

    let diszTable = '<table id="mydiszTable"><tr><th>Dísz alakja: </th><th>Dísz átmérője(mm): </th><th>Dísz színe piros: </th><th>Térfogata: </th></tr>';
    for (const egyDisz of diszek) {
        var cellaClass = "arany";
        if (egyDisz.piros === "igaz")
            cellaClass = "piros";
        const terfogata = Math.round(4 * Math.PI * Math.pow(egyDisz.atmero / 2, 3) / 3 * 100) / 100;
        if (egyDisz.alakzat == "Gomb")
            diszTable += `<tr><td><img src="gomb.jpg"></td><td>${egyDisz.atmero}</td><td class=${cellaClass}>${egyDisz.piros}</td><td>${terfogata} mm<sup>3</sup></td>`;
        else
            diszTable += `<tr><td><img src="alma.jpg"></td><td>${egyDisz.atmero}</td><td class=${cellaClass}>${egyDisz.piros}</td><td>${terfogata} mm<sup>3</sup></td>`;
    }
    diszTable += '</table>';

    document.getElementById('kiir').innerHTML = diszTable;
}

document.getElementById("ujdiszform").onsubmit = async function (event) {
    event.preventDefault();
    const alakzat = event.target.elements.alakzat.value;
    const atmero = event.target.elements.atmero.value;  
    const pirose = event.target.elements.piros.checked;
    
    var piros = "hamis"    
    if( pirose == true)
    piros = "igaz";

    const res = await fetch("/diszek", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            alakzat,
            atmero,
            piros
        }),
    });

    if (res.ok) {
        diszListHTML();
    } else {
        alert("Server error");
    }
};