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
//if + valeur du select +fonction de branchement API

//boucle sur les éléments du menu

select.addEventListener("input", function () {
    console.log(select.value);
})

console.log(nav[0]);

nav[0].addEventListener("click", function () {
        fetch(baseApiUrl + '/last?measure-type=' + select.value).then(function (response) {
            response.json().then(function (result) {
                console.log(result);

                let deleteResult = document.getElementById("result");

                if (deleteResult.firstElementChild !== null) {
                    deleteResult.removeChild(deleteResult.firstElementChild);
                }

                let blocResult = document.createElement("div");

                let h3 = document.createElement("h3");
                h3.textContent = nav[0].textContent + " du " + result.measureDate;
                blocResult.appendChild(h3);

                let h4 = document.createElement("h4");
                h4.textContent = result.type + " : " + result.value + " " + result.unit
                blocResult.appendChild(h4);

                document.getElementById("result").appendChild(blocResult);


            });
        }).catch(function (error) {
            console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
        });

    }
)


