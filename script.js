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


let nav=document.querySelectorAll("h2");
let select=document.getElementById("mesure");

// utiliser le "select" en cours pour déterminer la valeur à afficher
//if + valeur du select +fonction de branchement API
let SelectMenu

//boucle sur les éléments du menu

select.addEventListener("input", function (){
    console.log(select.value);
})

console.log (nav[0]);

    nav[0].addEventListener("click", function() {
              fetch(baseApiUrl + '/last?measure-type='+ select.value).then(function (response) {
    response.json().then(function (result) {
        console.log(result);

        // A vous de jouer ! Il faut utiliser l'objet result qui contient la dernière valeur
    });
}).catch(function (error) {
    console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
});

        }
    )


