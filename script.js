const baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures';

let nav = document.querySelectorAll("h2");
let select = document.getElementById("mesure");

// utiliser le "select" en cours pour déterminer la valeur à afficher


//Ecouteurs sur les éléments du menu
select.addEventListener("input", function () {
    console.log(select.value);
})

console.log(nav[0]);


// Dernière mesure nav[0]
nav[0].addEventListener("click", function () {
    fetch(baseApiUrl + '/last?measure-type=' + select.value).then(function (response) {
        response.json().then(function (result) {
            console.log(result);

            // Supprimer le bloc résultat s'il existe
            let deleteResult = document.getElementById("result");
            if (deleteResult.firstElementChild !== null) {
                deleteResult.removeChild(deleteResult.firstElementChild);
            }
            // Créer un bloc avec les résultats (h3+h4)
            let blocResult = document.createElement("div");

            // Demander de l'aide à Jules pour bien afficher la date
            let h3 = document.createElement("h3");
            let measureDate = new Date(result.measureDate);
            h3.textContent = nav[0].textContent + " du " + measureDate.getDate()
                + "/" + measureDate.getMonth()
                + "/" + measureDate.getFullYear()
            blocResult.appendChild(h3);

            let h4 = document.createElement("h4");
            h4.textContent = result.type + " : " + result.value + " " + result.unit
            blocResult.appendChild(h4);

            document.getElementById("result").appendChild(blocResult);

        });
    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });
});


// TOP mesures

nav[1].addEventListener("click", function () {
    fetch(baseApiUrl + '/top?measure-type=' + select.value).then(function (response) {
        response.json().then(function (result) {
            console.log(result);


            // Supprimer le bloc résultat s'il existe
            let deleteResult = document.getElementById("result");
            if (deleteResult.firstElementChild !== null) {
                deleteResult.removeChild(deleteResult.firstElementChild);
            }
            // Créer un bloc avec les résultats (h3+h4)
            let blocResult = document.createElement("div");

            // Affichage
            let h3 = document.createElement("h3");
            let measureDate = new Date(result.measureDate);
            h3.textContent = nav[1].textContent + " du " + measureDate.getDate() // à noter la possibilité d'utiliser la fonction .slice (1,10)
                + "/" + measureDate.getMonth()
                + "/" + measureDate.getFullYear()
            blocResult.appendChild(h3);

            let h4 = document.createElement("h4");
            h4.textContent = result.type + " : " + result.value + " " + result.unit
            blocResult.appendChild(h4);

            document.getElementById("result").appendChild(blocResult);

        });
    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });
});

// Tableaux de mesures

nav[2].addEventListener("click", function () {

    // ajouter le cadre pour choisir les dates
    let inputDateStart = document.createElement("input");
    inputDateStart.type = "datetime-local";
    inputDateStart.id = "Start";
    let labelSD = document.createElement("label");
    labelSD.textContent = "Date de début";
    let inputDateEnd = document.createElement("input");
    inputDateEnd.type = "datetime-local";
    inputDateEnd.id = "End";
    let labelED = document.createElement("label");
    labelED.textContent = "Date de fin";


    // Vérifier si le cadre des dates existe
    let dateChoice = document.getElementById("date");
    if (dateChoice.firstElementChild === null) {

        dateChoice.appendChild(labelSD);
        dateChoice.appendChild(inputDateStart);
        dateChoice.appendChild(labelED);
        dateChoice.appendChild(inputDateEnd);
    }
    let dateStartChoice = document.getElementById("Start");
    let dateEndChoice = document.getElementById("End");

    // Afficher la date en console (test)
    if (inputDateStart.value !== null) {
        console.log(document.getElementById("Start").value);
        console.log(document.getElementById("End").value);
    }

// Selection des dates par l'utilisateur

// Récupération des données sur le serveur
    fetch(baseApiUrl + '?measure-type=' + select.value + '&start-date=' + dateStartChoice.value + '&end-date=' + dateEndChoice.value).then(function (response) {
        response.json().then(function (result) {
            console.log(result);
        });

        // Supprimer le bloc résultat s'il existe
        let deleteResult = document.getElementById("result");
        if (deleteResult.firstElementChild !== null) {
            deleteResult.removeChild(deleteResult.firstElementChild);
        }
        // Créer le tableau sur la page

        let tableResult = document.createElement("table");
        let tableHead = document.createElement("thead");

        let headRow = document.createElement("tr");
        document.getElementById("result").appendChild(headRow);

        let th1 = document.createElement("th");
        th1.textContent = "Date";
        headRow.appendChild(th1);

        let th2 = document.createElement("th");
        th2.textContent = "Valeurs de mesure";
        headRow.appendChild(th2);

        let newRow = document.createElement("tr")
        document.getElementById("result").appendChild(newRow);

        let td1 = document.createElement("td");
        td1.textContent = "test 1";
        newRow.appendChild(td1);

        let td2 = document.createElement("td");
        td2.textContent = "test 2";
        newRow.appendChild(td2);



        // Affichage - à modifier .
        // let h3 = document.createElement("h3");
        // let measureDate = new Date(result.measureDate);
        // h3.textContent = nav[1].textContent + " du " + measureDate.getDate() // à noter la possibilité d'utiliser la fonction .slice (1,10)
        //     + "/" + measureDate.getMonth()
        //     + "/" + measureDate.getFullYear()
        // blocResult.appendChild(h3);
        //
        // let h4 = document.createElement("h4");
        // h4.textContent = result.type + " : " + result.value + " " + result.unit
        // blocResult.appendChild(h4);
        //
        // document.getElementById("result").appendChild(blocResult);


    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });

});






