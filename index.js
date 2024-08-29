
 const PATH = "https://newsdata.io/api/1/latest?apikey=pub_514115d4ccc2db06e79944a4d383758334fdc";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${PATH}&q=${query}`);
    const data = await res.json();
    console.log(data);
    bindData(data.results);
}

function bindData(results) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    results.forEach((result) => {
        if (!result.image_url) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, result);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, result) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
   // const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    newsImg.src = result.image_url;
    newsTitle.innerHTML = result.title.length >100 ? result.title.substring(0,100)+ "..." : result.title;
    newsDesc.innerHTML = result.description.length > 300 ? result.description.substring(0,300)+ "..." : result.description;

    // const date = new Date(result.publishedAt).toLocaleString("en-US", {
    //     timeZone: "Asia/Jakarta",
    // });

    // newsSource.innerHTML = `${result.source_name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(result.link, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("nav-active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("nav-active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("nav-active");
    curSelectedNav = null;
});

function navtoggle(){
  const toggle =  document.getElementById('ham');
  toggle.classList.toggle('active');
}




// https://newsdata.io/api/1/latest?apikey=pub_514115d4ccc2db06e79944a4d383758334fdc&q=pizza
// https://newsdata.io/api/1/archive?apikey=pub_514115d4ccc2db06e79944a4d383758334fdc&q=example&language=en&from_date=2023-01-19&to_date=2023-01-25
// https://newsdata.io/api/1/latest?apikey=pub_514115d4ccc2db06e79944a4d383758334fdc&q=YOUR-QUERY&page=XXXPPPXXXXXXXXXX

// https://newsdata.io/api/1/latest?apikey=pub_514115d4ccc2db06e79944a4d383758334fdc