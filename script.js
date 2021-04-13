const baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures';

//Récupération de la dernière valeur d'un type de mesure
// fetch(baseApiUrl + '/last?measure-type=' + measureType).then(function (response) {
//     response.json().then(function (result) {
//         console.log(result);
//
//         // A vous de jouer ! Il faut utiliser l'objet result qui contient la dernière valeur
//     });
// }).catch(function (error) {
//     console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
// });


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

            // Demander de l'aide à Jules pour bien afficher la date
            let h3 = document.createElement("h3");
            let measureDate = new Date(result.measureDate);
            h3.textContent = nav[1].textContent + " du " + measureDate.getDate()
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

//Problème récupération des données - à creuser!!
nav[2].addEventListener("click", function () {

    // ajouter le cadre pour choisir les dates


    fetch(baseApiUrl + '?measure-type=TEMPERATURE&start-date=2021-04-12T12%3A00&end-date=2021-04-13T12%3A00').then(function (response) {
        response.json().then(function (result) {
            console.log(result);
        });

    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });

});

// recupérer les données

//1. disposer d'un historique des données dans une base de données (à créer?)
// 2. requete pour chercher
//2. dans l'historique, chercher la MAX_VALUE pour l'afficher




