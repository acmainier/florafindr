function displayResult(data) {
  const grid = document.getElementById("resultsGrid");
  grid.innerHTML = "";

  // Remove non-plant results that got through the initial fetch request
  const plants = data.results.filter(
    (taxon) => taxon.iconic_taxon_name === "Plantae",
  );

  // If no result
  if (plants.length === 0) {
    grid.innerHTML = "<p>No plant results found.</p>";
    return;
  }

  plants.forEach((taxon) => {
    const photoUrl = taxon.default_photo?.square_url ?? "";
    const commonName = taxon.preferred_common_name ?? "Unknown";
    const card = document.createElement("div");
    card.classList.add("plant-card");
    card.innerHTML = `
      ${photoUrl ? `<img src="${photoUrl}" alt="${commonName}">` : ""}
      <h3>Common name : ${commonName}</h3>
      <p class="scientific-name">Scientific name : <em>${taxon.name}</em></p>
      <p class="rank">${taxon.rank}</p>
      ${taxon.wikipedia_url ? `<a href="${taxon.wikipedia_url}" target="_blank" rel="noopener">Wikipedia</a>` : ""}
    `;
    grid.appendChild(card);
  });
}

function getPlant() {
  const plantname = document.getElementById("searchInput").value.trim();

  if (plantname === "") {
    console.log("There's no value. Please enter the name of a plant!");
  } else {
    // https://docs.trefle.io/docs/advanced/client-side-apps
    // This API doesn't work directly from the browser: they don't set the CORS headers
    // From their docs: "If you need to perform client-side requests you will have to request a client-side token from your own backend and get a JWT token in return."

    const url = `https://api.inaturalist.org/v1/taxa?q=${plantname}&iconic_taxa=Plantae&per_page=20`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Plant not found");
        }
        return response.json();
      })
      .then((data) => {
        displayResult(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
}

document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  getPlant();
});
