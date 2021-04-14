const baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures';

let select = document.getElementById("mesure");

// Dernière mesure
document.getElementById("lastMeasure").addEventListener("click", function () {
    fetch(baseApiUrl + '/last?measure-type=' + select.value).then(function (response) {
        response.json().then(function (result) {

            // Supprimer le bloc résultat s'il existe
            deleteResultInDOM();
            // Créer un bloc avec les résultats (h3+h4)
            let blocResult = document.createElement("div");

            // Demander de l'aide à Jules pour bien afficher la date
            let h3 = document.createElement("h3");
            let measureDate = new Date(result.measureDate);
            h3.textContent = document.getElementById("lastMeasure").textContent + " du " + measureDate.getDate()
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

document.getElementById("topMeasure").addEventListener("click", function () {
    fetch(baseApiUrl + '/top?measure-type=' + select.value).then(function (response) {
        response.json().then(function (result) {
            // console.log(result);


            // Supprimer le bloc résultat s'il existe
            deleteResultInDOM();
            // Créer un bloc avec les résultats (h3+h4)
            let blocResult = document.createElement("div");

            // Affichage
            let h3 = document.createElement("h3");
            let measureDate = new Date(result.measureDate);
            h3.textContent = document.getElementById("topMeasure").textContent + " du " + measureDate.getDate() // à noter la possibilité d'utiliser la fonction .slice (1,10)
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

document.getElementById("tableMeasure").addEventListener("click", function () {

    // ajouter le cadre pour choisir les dates
    let today = new Date()
    let inputDateStart = document.createElement("input");
    inputDateStart.type = "datetime-local";
    inputDateStart.id = "Start";
    inputDateStart.value = today.getFullYear() + "-" + "0" + (today.getMonth() + 1) + "-" + today.getDate() + "T00:00"
    let labelSD = document.createElement("label");
    labelSD.textContent = "Date de début";
    let inputDateEnd = document.createElement("input");
    inputDateEnd.type = "datetime-local";
    inputDateEnd.id = "End";
    inputDateEnd.value = today.getFullYear() + "-" + "0" + (today.getMonth() + 1) + "-" + today.getDate() + "T23:59"
    inputDateEnd.min = inputDateStart.value;
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
        // console.log(document.getElementById("Start").value);
        // console.log(document.getElementById("End").value);
    }
    // Supprimer le bloc résultat s'il existe
    deleteResultInDOM();

    // Créer le tableau vide sur la page
    let tableResult = document.createElement("table");
    document.getElementById("result").appendChild(tableResult);

    // Création des entêtes
    let tableHead = document.createElement("thead");
    tableResult.appendChild(tableHead);

    let headRow = document.createElement("tr");
    tableHead.appendChild(headRow);

    let th1 = document.createElement("th");
    th1.textContent = "Date";
    headRow.appendChild(th1);

    let th2 = document.createElement("th");
    th2.textContent = "Valeur de mesure";
    headRow.appendChild(th2);


    // Création des données du tableau
    let tableBody = document.createElement("tbody");
    tableResult.appendChild(tableBody);


// Récupération des données sur le serveur
    fetch(baseApiUrl + '?measure-type=' + select.value + '&start-date=' + dateStartChoice.value + '&end-date=' + dateEndChoice.value).then(function (response) {
        response.json().then(function (result) {
            for (let i = 0; i < result.length; i++) {
                let measureDate = new Date(result[i].measureDate);
                let date = measureDate.getDate() + "/" + measureDate.getMonth() + "/" + measureDate.getFullYear() + " " + measureDate.getHours() + ":" + measureDate.getMinutes() + ":" + measureDate.getSeconds();
                // console.log(date);
                let value = result[i].value + " " + result[i].unit;
                // console.log(value);
                let newRow = document.createElement("tr")
                let td1 = document.createElement("td");
                td1.textContent = date;
                newRow.appendChild(td1);
                let td2 = document.createElement("td");
                td2.textContent = value;
                newRow.appendChild(td2);

                tableBody.appendChild(newRow);
            }
        });


    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });

});


// Graph de mesures

document.getElementById("chartMeasure").addEventListener("click", function () {

    // ajouter le cadre pour choisir les dates
    let today = new Date()
    let inputDateStart = document.createElement("input");
    inputDateStart.type = "datetime-local";
    inputDateStart.id = "Start";
    //Date par défaut
    inputDateStart.value = today.getFullYear() + "-" + "0" + (today.getMonth() + 1) + "-" + today.getDate() + "T00:00"
    let labelSD = document.createElement("label");
    labelSD.textContent = "Date de début";
    let inputDateEnd = document.createElement("input");
    inputDateEnd.type = "datetime-local";
    inputDateEnd.id = "End";
    //Date par défaut
    inputDateEnd.value = today.getFullYear() + "-" + "0" + (today.getMonth() + 1) + "-" + today.getDate() + "T23:59"
    inputDateEnd.min = inputDateStart.value;
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


    // Supprimer le bloc résultat s'il existe
    deleteResultInDOM();

    // Création de la zone de graphique
    let graphResult = document.createElement("canvas");
    document.getElementById("result").appendChild(graphResult);
    graphResult.id = "myChart";

    let graphDate = new Array();
    let graphData = new Array();
    let unit = "";

// Récupération des données sur le serveur ***
    fetch(baseApiUrl + '?measure-type=' + select.value + '&start-date=' + dateStartChoice.value + '&end-date=' + dateEndChoice.value).then(function (response) {
        response.json().then(function (result) {
            unit = result[0].unit
            for (let i = 0; i < result.length; i++) {
                let measureDate = result[i].measureDate.slice(0, 16);
                let value = result[i].value;
                graphDate.push(measureDate);
                graphData.push(value);
            }
            console.log(graphDate);
            console.log(graphData);


            //Création du graphique ***
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: graphDate,// date
                    datasets: [{
                        label: unit,
                        data: graphData,// valeurs
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            min: 17,
                            max: 22,
                            beginAtZero: false
                        }
                    }
                }
            });
        });

    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });

});




