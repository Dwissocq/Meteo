// Supprimer le bloc résultat s'il existe
const deleteResultInDOM = function () {
    let deleteResult = document.getElementById("result");
    if (deleteResult.firstElementChild !== null) {
        deleteResult.removeChild(deleteResult.firstElementChild);
    }
};

// Création du bloc résultat, choix du last ou top mesure en argument
const createResult = function (result,a) {

    // Création d'une section DIV pour regrouper les deux titres h3 et h4  en un seul bloc supprimable
    let blocResult = document.createElement("div");
    let h3 = document.createElement("h3");
    let measureDate = new Date(result.measureDate);
    h3.textContent = document.getElementById(a).textContent + " du " + measureDate.getDate()
        + "/" + (measureDate.getMonth()+1)
        + "/" + measureDate.getFullYear()
    blocResult.appendChild(h3);

    let h4 = document.createElement("h4");
    h4.textContent = result.type + " : " + result.value + " " + result.unit
    blocResult.appendChild(h4);

    document.getElementById("result").appendChild(blocResult);
}

// Création du bloc calendrier
const createCalendar = function (){

    let inputDateStart = document.createElement("input");
    inputDateStart.type = "datetime-local";
    inputDateStart.id = "Start";
    let labelSD = document.createElement("label");
    labelSD.textContent = "Date de début";
    let inputDateEnd = document.createElement("input");
    inputDateEnd.type = "datetime-local";
    inputDateEnd.id = "End";
    inputDateEnd.min = inputDateStart.value;
    let labelED = document.createElement("label");
    labelED.textContent = "Date de fin";

    // Initialisation avec une date par défaut basée sur today (date du jour)
    let today = new Date()
    inputDateStart.value = today.getFullYear() + "-" + "0" + (today.getMonth() + 1) + "-" + today.getDate() + "T00:00"
    inputDateEnd.value = today.getFullYear() + "-" + "0" + (today.getMonth() + 1) + "-" + today.getDate() + "T23:59"

    // Vérifier si le cadre des dates existe, affichage si aucun cadre
    let dateChoice = document.getElementById("date");
    if (dateChoice.firstElementChild === null) {

        dateChoice.appendChild(labelSD);
        dateChoice.appendChild(inputDateStart);
        dateChoice.appendChild(labelED);
        dateChoice.appendChild(inputDateEnd);
    }
}