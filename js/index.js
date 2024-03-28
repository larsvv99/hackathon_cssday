// // ---- API CALL ----

// // Definieer de URL van de API
const apiUrl = 'https://cssday.nl/data.json';
let dataSpeakers;

// // Maak een GET-verzoek met Fetch API
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
        console.log(data["2023"]);
        speakers2023 = data["2023"].speakers;
        talks2023 = data["2023"].talks;
        mc2023 = data["2023"].mc;
        attendees2023 = data["2023"].attendees;

        const speakersContainer = document.getElementById("speakers-container");
        let counter = 0;

        function createCard(container, name, title, link, description, avatar, day, country, attendees) {
            counter++;

            // Maak een element aan voor de kaart
            const card = document.createElement("a");
            card.id = `card-${counter}`;
            card.href = `#card-${counter}`;
            card.setAttribute("data-name", `${name}`);

            card.classList.add("card");

            // Voeg inhoud toe aan de kaart
            card.innerHTML = `
                <article>
                    <a href="#sluiten" class="sluiten"></a>
                    <ul>
                        <li><img src="${avatar}" alt="image of ${name}"></li>
                        <li><h2>Name: ${name}</h2></li>
                        <li>Nationality: ${country}</li>
                        <li>Title: ${title}</li>
                        <li>Description: ${description}</li>
                        <li>Speaks on: Day ${day}</li>
                        <li><a href="${link}">Website: ${link}</a></li>
                    </ul>
                </article>
            `;

            // Voeg de kaart toe aan de container
            container.appendChild(card);
        }

        // Itereer over de sprekers en maak een kaart voor elke spreker
        Object.keys(speakers2023).forEach(speakerKey => {
            const speakerInfo = speakers2023[speakerKey];
            let speakerInfoDesc;

            if (speakerInfo.talk.description === false) {
                speakerInfoDesc = "No description yet :)";
            } else {
                speakerInfoDesc = speakerInfo.talk.description;
            }

            createCard(speakersContainer, speakerInfo.name, speakerInfo.talk.title,
                speakerInfo.link, speakerInfoDesc, speakerInfo.avatar, speakerInfo.day, speakerInfo.country, speakerInfo.attendees);
        });

        // Itereer over de mc's en maak een kaart voor elke mc
        Object.keys(mc2023).forEach(mcKey => {
            const mcInfo = mc2023[mcKey];
            createCard(speakersContainer, mcInfo.name, "", mcInfo.link, "", mcInfo.avatar, "", "", "");
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
        const elements = document.querySelectorAll('.loaded a');
        console.log(elements);
        elements.forEach(element => {
            // Pas de --delay eigenschap aan naar 0
            element.style.setProperty('--delay', '0');
        });
    }

    // Wacht 6 seconden en roep dan de functie aan om de delay aan te passen
    setTimeout(updateDelay, 6000);
});