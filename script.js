const baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures';

let select = document.getElementById("mesure");

// Dernière mesure
document.getElementById("lastMeasure").addEventListener("click", function () {
    fetch(baseApiUrl + '/last?measure-type=' + select.value).then(function (response) {
        response.json().then(function (result) {

            // Supprimer le bloc résultat s'il existe
            deleteResultInDOM();

            // Affichage
            createResult(result,"lastMeasure");

        });
    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });
});

// TOP mesures

document.getElementById("topMeasure").addEventListener("click", function () {
    fetch(baseApiUrl + '/top?measure-type=' + select.value).then(function (response) {
        response.json().then(function (result) {

            // Supprimer le bloc résultat s'il existe
            deleteResultInDOM();

            // Affichage
            createResult(result,"topMeasure");

        });
    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });
});

// Tableaux de mesures

document.getElementById("tableMeasure").addEventListener("click", function () {

    createCalendar();

    // Supprimer le bloc résultat s'il existe
    deleteResultInDOM();

    let dateStartChoice = document.getElementById("Start");
    let dateEndChoice = document.getElementById("End");

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
                let value = result[i].value + " " + result[i].unit;
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

    createCalendar();

    // Supprimer le bloc résultat s'il existe
    deleteResultInDOM();

    let dateStartChoice = document.getElementById("Start");
    let dateEndChoice = document.getElementById("End");

    // Création de la zone de graphique
    let graphResult = document.createElement("canvas");
    document.getElementById("result").appendChild(graphResult);
    graphResult.id = "myChart";

    let graphDate = new Array();
    let graphData = new Array();
    let unit = "";

// Récupération des données sur le serveur
    fetch(baseApiUrl + '?measure-type=' + select.value + '&start-date=' + dateStartChoice.value + '&end-date=' + dateEndChoice.value).then(function (response) {
        response.json().then(function (result) {
            unit = result[0].unit
            for (let i = 0; i < result.length; i++) {
                let measureDate = result[i].measureDate.slice(0, 16);
                let value = result[i].value;
                graphDate.push(measureDate);
                graphData.push(value);
            }

            //Création du graphique
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
            });
        });

    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });
});