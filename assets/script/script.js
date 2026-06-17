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
        //displayResult(data);
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
