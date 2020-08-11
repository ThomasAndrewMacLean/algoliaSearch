console.log("🚀🚀🚀");
const searchClient = algoliasearch(
  "X70IC4M3C7",
  "455137c21d322054345db28c47bb3c08"
);
const index = searchClient.initIndex("dev_NAME");

const inputDom = document.getElementById("searchInput");
const resultsDom = document.getElementById("results");
const searchWrapDom = document.getElementById("searchWrap");

// inputDom.addEventListener("focusout", () => {
//   setTimeout(() => {
//     inputDom.value = "";
//     resultsDom.innerHTML = "";
//   }, 150);
// });

const MAX_NUMBER_OF_RESULTS = 4;
let focussedOffer = -1;
let numberOfResults = 0;

inputDom.addEventListener("keyup", async (e) => {
  if (e.key === "ArrowDown") {
    focussedOffer++;
    console.log(focussedOffer);
    resultsDom.querySelectorAll("li").forEach((x, i) => {
      x.classList.remove("selected");

      if (i === focussedOffer) {
        x.classList.add("selected");
        inputDom.value = x.innerText.trim();
      }
    });
  } else if (e.key === "ArrowUp") {
    focussedOffer--;
    console.log(focussedOffer);
    resultsDom.querySelectorAll("li").forEach((x, i) => {
      x.classList.remove("selected");

      if (i === focussedOffer) {
        x.classList.add("selected");
        inputDom.value = x.innerText.trim();
      }
    });
  } else {
    focussedOffer = -1;
    const searchValue = e.target.value;

    const res = await index.search(searchValue);

    resultsDom.innerHTML = "";
    if (searchValue) {
      searchWrapDom.classList.add("hasResults");
      resultsDom.classList.add("hasResults");

      res.hits.slice(0, MAX_NUMBER_OF_RESULTS).forEach((res) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="offer/${res.Slug}"><img src="${res.image}"/> <p>${res.Name}</p></a>`;
        resultsDom.appendChild(li);
      });
    } else {
      searchWrapDom.classList.remove("hasResults");
      resultsDom.classList.remove("hasResults");
    }
  }
});
