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

//Récupération des données
nav[2].addEventListener("click", function () {

    // ajouter le cadre pour choisir les dates
    let inputDateStart = document.createElement("input");
    inputDateStart.type="datetime-local";
    // let labelSD=document.createElement ("label");
    // labelSD.value="Start Date";
    // inputDateStart.appendChild(labelSD);
    let inputDateEnd = document.createElement("input");
    inputDateEnd.type="datetime-local";

    console.log(inputDateStart.value);

    // Vérifier si le cadre des dates existe
        let dateChoice = document.getElementById("date");
        if (dateChoice.firstElementChild === null) {

        dateChoice.appendChild(inputDateStart);
        dateChoice.appendChild(inputDateEnd);
    }
// Selection des dates par l'utilisateur



// Récupération des données sur le serveur
    fetch(baseApiUrl + '?measure-type='+ select.value + '&start-date='+ inputDateStart.value +'&end-date='+inputDateEnd.value).then(function (response) {
        response.json().then(function (result) {
            console.log(result);
        });


        // afficher le tableau sur la page
        // Créer un bloc avec les résultats (h3+h4)
        let blocResult = document.createElement("div");

        // Affichage - à modifier
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


    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });

});






