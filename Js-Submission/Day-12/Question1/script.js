const allItems = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

const ITEMS_PER_LOAD = 10;
let currentIndex = 0;
let isLoading = false;

const container = document.getElementById("item-container");
const loading = document.getElementById("loading");

//Render items
function renderItems() {
  const nextItems = allItems.slice(currentIndex, currentIndex + ITEMS_PER_LOAD);

  nextItems.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    container.appendChild(div);
  });

  currentIndex += ITEMS_PER_LOAD;
}

//Load more items
function loadMoreItems() {
  if (isLoading || currentIndex >= allItems.length) return;

  isLoading = true;
  loading.style.display = "block";

  setTimeout(() => {
    renderItems();
    loading.style.display = "none";
    isLoading = false;

    if (currentIndex >= allItems.length) {
      loading.innerText = "No more items to load";
      loading.style.display = "block";
    }
  }, 1000);
}

renderItems();

//Scroll event
window.addEventListener("scroll", () => {
  const reachedBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

  if (reachedBottom) {
    loadMoreItems();
  }
});
