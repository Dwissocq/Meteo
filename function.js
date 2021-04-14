// Supprimer le bloc résultat s'il existe
const deleteResultInDOM = function () {
    let deleteResult = document.getElementById("result");
    if (deleteResult.firstElementChild !== null) {
        deleteResult.removeChild(deleteResult.firstElementChild);
    }
};