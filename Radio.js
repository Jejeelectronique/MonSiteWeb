function openTab(tabName) {
    var i, tabcontent, tablinks;        // Déclaration des variables locales

    tabcontent = document.getElementsByClassName("tabcontent");         // Récupération de tous les éléments avec la classe "tabcontent" (les contenus des onglets)
    for (i = 0; i < tabcontent.length; i++) {           // Parcours de tous les éléments avec la classe "tabcontent"
        tabcontent[i].style.display = "none";           // Masquage de chaque élément avec la classe "tabcontent"
    }
    tablinks = document.getElementsByClassName("tablink");     // Récupération de tous les éléments avec la classe "tablink" (les boutons des onglets)

    for (i = 0; i < tablinks.length; i++) {         // Parcours de tous les éléments avec la classe "tablink"
        tablinks[i].className = tablinks[i].className.replace(" active", "");      // Suppression de la classe "active" de chaque bouton d'onglet
    }
    document.getElementById(tabName).style.display = "block";     // Affichage du contenu de l'onglet sélectionné
    event.currentTarget.className += " active";    // Ajout de la classe "active" au bouton d'onglet actuellement sélectionné
}


function allumerLED() {
    var adresseIp = document.getElementById("adresseIp").value;
    var url = 'http://' + adresseIp + '/allumer_led';

    // Définir le délai maximal d'attente en millisecondes (par exemple, 5 secondes)
    var delaiMaximal = 5000;

    // Envoyer la requête HTTP
    var requete = fetch(url, {
        method: 'POST',
        body: JSON.stringify({ action: 'allumer' }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Lancer une action si la réponse n'est pas reçue dans le délai maximal
    var delaiDepasse = setTimeout(function() {
        alert("Aucune réponse de l'ESP32");
        console.error('Délai maximal dépassé : aucune réponse reçue de l\'ESP.');
    }, delaiMaximal);

    // Traiter la réponse si elle est reçue avant le délai maximal
    requete.then(response => {
        clearTimeout(delaiDepasse); // Annuler le délai si la réponse est reçue
        // Traiter la réponse si nécessaire
    })
    .catch(error => {
        clearTimeout(delaiDepasse); // Annuler le délai en cas d'erreur
        console.error('Erreur lors de l\'envoi de la requête :', error);
        // Afficher un message d'erreur à l'utilisateur
    });
}


function eteindreLED() {
    var adresseIp = document.getElementById("adresseIp").value;
    var url = 'http://' + adresseIp + '/eteindre_led';

    // Définir le délai maximal d'attente en millisecondes (par exemple, 5 secondes)
    var delaiMaximal = 5000;

    // Envoyer la requête HTTP
    var requete = fetch(url, {
        method: 'POST',
        body: JSON.stringify({ action: 'eteindre' }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Lancer une action si la réponse n'est pas reçue dans le délai maximal
    var delaiDepasse = setTimeout(function() {
        alert("Aucune réponse de l'ESP32");
        console.error('Délai maximal dépassé : aucune réponse reçue de l\'ESP.');
    }, delaiMaximal);

    // Traiter la réponse si elle est reçue avant le délai maximal
    requete.then(response => {
        clearTimeout(delaiDepasse); // Annuler le délai si la réponse est reçue
        // Traiter la réponse si nécessaire
    })
    .catch(error => {
        clearTimeout(delaiDepasse); // Annuler le délai en cas d'erreur
        console.error('Erreur lors de l\'envoi de la requête :', error);
        // Afficher un message d'erreur à l'utilisateur
    });
}

document.getElementById("allumerLed").addEventListener("click", allumerLED);        // Attacher les gestionnaires d'événements aux boutons
document.getElementById("eteindreLed").addEventListener("click", eteindreLED);      // Attacher les gestionnaires d'événements aux boutons


function sendRequest(action) {
    var adresseIp = document.getElementById("adresseIp").value;
    var url = 'http://' + adresseIp + '/' + action;

    var delaiMaximal = 5000;

    var requete = fetch(url, {
        method: 'POST',
        body: JSON.stringify({ action: action }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    var delaiDepasse = setTimeout(function() {
        alert("Aucune réponse de l'ESP32");
        console.error('Délai maximal dépassé : aucune réponse reçue de l\'ESP.');
    }, delaiMaximal);

    requete.then(response => {
        clearTimeout(delaiDepasse);
        // Traiter la réponse si nécessaire
    })
    .catch(error => {
        clearTimeout(delaiDepasse);
        console.error('Erreur lors de l\'envoi de la requête :', error);
    });
}

function allumerLED() {
    sendRequest('allumer_led');
}

function eteindreLED() {
    sendRequest('eteindre_led');
}

document.getElementById("allumerLed").addEventListener("click", allumerLED);
document.getElementById("eteindreLed").addEventListener("click", eteindreLED);

function validerAdresseIP() {
    var nouvelleAdresseIp = document.getElementById("adresseIp").value;
    var ipReg = /^(\d{1,3}\.){3}\d{1,3}$/;

    if (!ipReg.test(nouvelleAdresseIp)){
        document.getElementById("adresseIpEnregistree").textContent = "Format de l'adresse IP saisie invalide";
        return;
    }

    document.getElementById("adresseIpEnregistree").textContent = nouvelleAdresseIp;
}