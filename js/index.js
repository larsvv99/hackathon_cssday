// ---- API CALL ----

// Definieer de URL van de API
const apiUrl = 'https://cssday.nl/data.json';
let dataSpeakers;

// Maak een GET-verzoek met Fetch API
fetch(apiUrl)
    .then(response => {
        // Controleer of het verzoek succesvol was
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parseer de JSON van de response
        return response.json();
    })
    .then(data => {

        const talks2023 = data["2023"].talks;

        const speakersContainer = document.getElementById("speakers-container");
        let counter = 0;

        function createCard(container, name, title, link, description, avatar, day, country, views, likes, videoThumbnail, videoLink) {
            counter++;

            // Maak een element aan voor de kaart
            const card = document.createElement("div");
            card.id = `card-${counter}`;
            card.setAttribute("data-name", `${name}`);
            card.classList.add("card");

            card.addEventListener("click", () => {
                window.location = `#${card.id}`;
            });

            // Voeg inhoud toe aan de kaart
            card.innerHTML = `
                <article class="card-face card-front">
                    <a href="#sluiten" class="sluiten"></a>
                    <div></div>
                    <section>
                        <ul>
                            <li><img src="${avatar}" alt="image of ${name}"></li>
                            <li><h2>${name}</h2></li>
                            <li>${country}</li>
                            <li>Title: ${title}</li>
                            <li>Description: ${description}</li>
                            <li>Speaks on: day ${day}</li>
                            <li>${link}</li>
                        </ul>
                        <button type="button" class="toggleCardBtnFront">More info...</button>
                    </section>
                    <div></div>
                </article>
                <article class="card-face card-back">
                    <div></div>
                    <section>
                        <img src="${videoThumbnail}" alt="Thumbnail">
                        <a href="${videoLink}" target="_blank">Link: ${videoLink}</a>
                        <p>Aantal views: ${views}</p>
                        <p>Aantal likes: ${likes}</p>
                        <button type="button" class="toggleCardBtnBack">Back</button>
                    </section>
                    <div></div>
                </article>
            `;

            // Voeg de kaart toe aan de container
            container.appendChild(card);
        }

        // Itereer over de sprekers en maak een kaart voor elke spreker
        Object.keys(talks2023).forEach(talksKey => {
            const talksInfo = talks2023[talksKey];
            let talksInfoDesc;

            if (talksInfo.description === false) {
                talksInfoDesc = "No description yet :)";
            } else {
                talksInfoDesc = talksInfo.description;
            }

            createCard(speakersContainer, talksInfo.speaker[0].name, talksInfo.title,
                talksInfo.speaker[0].link, talksInfoDesc, talksInfo.speaker[0].avatar, talksInfo.day,
                 talksInfo.speaker[0].country, talksInfo.video.views, talksInfo.video.likes, talksInfo.video.thumbnail, talksInfo.video['youtube-link']);
        });

        let cardsToFlip = document.querySelectorAll('.card');
        cardsToFlip.forEach(cardEl => {
            let cardButtonFront = cardEl.querySelector('.toggleCardBtnFront');
            let cardButtonBack = cardEl.querySelector('.toggleCardBtnBack');

            cardButtonFront.addEventListener('click', function() {
                cardEl.classList.add('is-flipped');
            });

            cardButtonBack.addEventListener('click', function() {
                cardEl.classList.remove("is-flipped");
            });
        });

        document.documentElement.classList.add('loaded');

    })
    .catch(error => {
        // Vang eventuele fouten op
        console.error('There was a problem with the fetch operation:', error);
    });

document.addEventListener("DOMContentLoaded", function () {
    // Functie om de delay aan te passen
    function updateDelay() {
        const elements = document.querySelectorAll('.loaded div');
        elements.forEach(element => {
            // Pas de --delay eigenschap aan naar 0
            element.style.setProperty('--delay', '0');
        });
    }

    // Wacht 6 seconden en roep dan de functie aan om de delay aan te passen
    setTimeout(updateDelay, 6000);
});