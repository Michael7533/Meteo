// Emplacement de l'API météo sur le net
const baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures';

// Variables à définir
let resultat;
let measureSelected = "CO2";
let buttonSelected = "";
let boutonSelectionne = "";
let period = "";
let dateDebutFormat = "";
let dateFinFormat = "";


// on récupère la valeur selectionnée dans la liste "measure selected"

document.getElementById("measureSelection").addEventListener("input", function () {
    measureSelected = document.getElementById("measureSelection").value
})

//on récupère la liste des boutons
const menu = document.querySelectorAll("button");

// on ajoute le listener sur les bouttons de la liste menu

for (let i = 0; i < menu.length; i++) {
    menu[i].addEventListener("click", function () {

        // on parametre la requete d'appel à l'API en fonction du boutton selectionné et de la mesure selectionnée

        if (i == 0) {
            hideSection();
            buttonSelected = "/last?measure-type=";
            boutonSelectionne = "Dernière mesure";
            query(baseApiUrl, buttonSelected, measureSelected, period);


        }
        if (i == 1) {
            hideSection();
            buttonSelected = "/top?measure-type=";
            boutonSelectionne = "TOP mesure";
            query(baseApiUrl, buttonSelected, measureSelected, period);

        }
        if (i == 2) {
            showSection();
            Erase();
            recupPeriod();
            buttonSelected = "/?measure-type=";

            // on récupère les dates selectionnées pour en faire une chaine de caratères et parametrer la requete

            document.getElementById("dateValidation").addEventListener("click", function () {
                let dateDebutPeriod = document.getElementById("dateStart").value;
                let strDD = dateDebutPeriod.split('-');
                dateDebutFormat = "&start-date=" + (strDD[0]) + "-" + (strDD[1]) + "-" + (strDD[2]) + "T00:00";

            })
            ;

            document.getElementById("dateValidation").addEventListener("click", function () {
                let dateFinPeriod = document.getElementById("dateEnd").value;
                let strDF = dateFinPeriod.split('-');
                dateFinFormat = "&end-date=" + (strDF[0]) + "-" + (strDF[1]) + "-" + (strDF[2]) + "T00:00";
                period = dateDebutFormat + dateFinFormat;

                queryTable(baseApiUrl, buttonSelected, measureSelected, period)
            })



        }
        ;

    })
            if (i == 3) {
                showSection();
                Erase();
            }


}

// fonction d'appel à l'API simple (last et top)

function query(baseApiUrl, boutonSelected, measureSelected, period) {
    fetch(baseApiUrl + boutonSelected + measureSelected + period).then(function (response) {
        response.json().then(function (result) {
            resultat = result;
            display(resultat);
        });
    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });

}


// fonction display mesure simple (last et top)

function display(resultat) {
    Erase();
    let blocButton = document.createElement("restitution");
    blocButton.innerText = boutonSelectionne;
    document.getElementById("restitution").appendChild(blocButton);

    let blocValue = document.createElement("restitution");
    blocValue.innerText = "Mesure relevée: " + resultat.type;
    document.getElementById("restitution").appendChild(blocValue);

    let blocData = document.createElement("restitution");
    blocData.innerText = resultat.value + " " + resultat.unit;
    document.getElementById("restitution").appendChild(blocData);

    let blocDate = document.createElement("restitution");
    FormateDate(resultat.measureDate);
    blocDate.innerText = "date et heure du relevé: " + dateDisplay;
    document.getElementById("restitution").appendChild(blocDate);
}

// fonction d'appel à l'API avec période

function queryTable(baseApiUrl, boutonSelected, measureSelected, period) {
    fetch(baseApiUrl + boutonSelected + measureSelected + period).then(function (response) {
        response.json().then(function (result) {
            resultat = result;
            displayTable(resultat);
        });
    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });

}

// fonction display mesure avec période (tableau)

function displayTable(resultatTable) {

    Erase();
    for (i = 1; i < resultatTable.length; i++) {
        let ligneValue = document.createElement("restitution");
        FormateDate(resultat[i].measureDate);
        ligneValue.innerText = "Le " + dateDisplay + " : " + resultat[i].value + "  " + resultat[i].unit;
        document.getElementById("restitution").appendChild(ligneValue);
    }

}


// fonction qui efface les données de la section restitution

function Erase() {
    let blocDelete = document.getElementById("restitution").querySelectorAll("restitution");
    for (let i = 0; i < blocDelete.length; i++) {
        document.getElementById("restitution").removeChild(blocDelete[i])
    }
}

// fonction qui formate la (les) date(s) retournée par la requete au format affichable sur la page

function FormateDate(date) {
    let char = date.split('');
    dateDisplay = (char[8]) +
        (char[9]) +
        (char[7]) +
        (char[5]) +
        (char[6]) +
        (char[4]) +
        (char[0]) +
        (char[1]) +
        (char[2]) +
        (char[3]) + " " +
        (char[11]) +
        (char[12]) +
        (char[13]) +
        (char[14]) +
        (char[15]);

}

// fonction qui cache le formulaire de dates dans la section periodSelection

function hideSection() {
    let option = document.getElementById("periodSelection")
    option.style.display = "none";
}

// fonction qui on affiche le formulaire de dates dans la section periodSelection

function showSection() {
    let option = document.getElementById("periodSelection")
    option.style.display = "block";
}

// fonction qui ajoute un listener sur le bouton valider dans periodSelect et on recupere et on formate  les dates de début et de fin (DD et DF) par deux fonctions

function recupPeriod() {
    document.getElementById("dateValidation").addEventListener("click", function () {
        let dateDebutPeriod = document.getElementById("dateStart").value;
        let strDD = dateDebutPeriod.split('-');
        dateDebutFormat = "&start-date=" + (strDD[0]) + "-" + (strDD[1]) + "-" + (strDD[2]) + "T00:00";
    })
    ;

    document.getElementById("dateValidation").addEventListener("click", function () {
        let dateFinPeriod = document.getElementById("dateEnd").value;
        let strDF = dateFinPeriod.split('-');
        dateFinFormat = "&end-date=" + (strDF[0]) + "-" + (strDF[1]) + "-" + (strDF[2]) + "T00:00";
        period = dateDebutFormat + dateFinFormat;
    })


}
hideSection();





