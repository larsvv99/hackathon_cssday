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

    function createCard(container, name, title, link, description, avatar, day, country) {
      // Maak een div-element aan voor de kaart
      const card = document.createElement("div");
      card.classList.add("card");

      // Voeg inhoud toe aan de kaart
      card.innerHTML = `
        <h2>${title}</h2>
        <p>Host: ${name}</p>
        <p>Afkomst: ${country}</p>
        <p>Spreekt op dag: ${day}</p>
        <p>Link: ${link}</p>
        <p>${description}</p>
        <img src="${avatar}">
      `;

      // Voeg de kaart toe aan de container
      container.appendChild(card);
    }

    // Itereer over de sprekers en maak een kaart voor elke spreker
    Object.keys(speakers2023).forEach(speakerKey => {
      const speakerInfo = speakers2023[speakerKey];
      let speakerInfoDesc;

      if(speakerInfo.talk.description === false) {
        speakerInfoDesc = "";
      } else {
        speakerInfoDesc = speakerInfo.talk.description;
      }

      createCard(speakersContainer, speakerInfo.name, speakerInfo.talk.title, 
        speakerInfo.link, speakerInfoDesc, speakerInfo.avatar, speakerInfo.day, speakerInfo.country);
    });

    // Itereer over de mc's en maak een kaart voor elke mc
    Object.keys(mc2023).forEach(mcKey => {
      const mcInfo = mc2023[mcKey];
      createCard(speakersContainer, mcInfo.name, "", mcInfo.link, "", mcInfo.avatar, "", "");
    });
  })
  .catch(error => {
    // Vang eventuele fouten op
    console.error('There was a problem with the fetch operation:', error);
  });