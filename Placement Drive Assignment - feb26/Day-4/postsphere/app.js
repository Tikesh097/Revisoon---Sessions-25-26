const API = "https://jsonplaceholder.typicode.com";

let posts = [];
let users = [];
let comments = [];
let commentCountMap = {};

let currentPage = 1;
const limit = 10;

let transformers = [];


   //FETCH DATA

async function fetchData() {
  try {
    const [p, u, c] = await Promise.all([
      fetch(`${API}/posts`).then(r => r.json()),
      fetch(`${API}/users`).then(r => r.json()),
      fetch(`${API}/comments`).then(r => r.json())
    ]);

    posts = p;
    users = u;
    comments = c;

    commentCountMap = comments.reduce((acc, c) => {
      acc[c.postId] = (acc[c.postId] || 0) + 1;
      return acc;
    }, {});

    render();
  } catch (err) {
    document.getElementById("feed").innerText = "Failed to load data";
  }
}


function highlightLongPosts(list) {
  return list.map(p => ({
    ...p,
    highlight: p.body.length > 120
  }));
}

//Sort by comment count
function sortByCommentCount(list) {
  return [...list].sort(
    (a, b) => (commentCountMap[b.id] || 0) - (commentCountMap[a.id] || 0)
  );
}

//Group posts by user
function groupByUser(list) {
  const grouped = [];
  const seenUsers = new Set();

  list.forEach(p => {
    if (!seenUsers.has(p.userId)) {
      seenUsers.add(p.userId);
      const user = users.find(u => u.id === p.userId);
      grouped.push({ separator: user.name });
    }
    grouped.push(p);
  });

  return grouped;
}


function applyTransformers(list) {
  return transformers.reduce((acc, fn) => fn(acc), list);
}


   //SEARCH (DEBOUNCED)

let timer;

document.getElementById("searchInput").addEventListener("input", e => {
  clearTimeout(timer);
  timer = setTimeout(() => search(e.target.value), 400);
});

function fuzzyMatch(source, query) {
  return query
    .toLowerCase()
    .split("")
    .every(ch => source.includes(ch));
}

function search(text) {
  const mode = document.getElementById("searchMode").value;
  const query = text.toLowerCase();

  const filtered = posts.filter(p => {
    const user = users.find(u => u.id === p.userId);
    const fullText = (p.title + p.body + user.name).toLowerCase();

    if (mode === "title") {
      return p.title.toLowerCase().includes(query);
    }

    if (mode === "fuzzy") {
      return fuzzyMatch(fullText, query);
    }

    return fullText.includes(query);
  });

  currentPage = 1;
  render(filtered);
}


   //RENDER FEED

function render(customPosts = posts) {
  let list = applyTransformers(customPosts);

  list = list.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  if (list.length === 0) {
    feed.innerHTML = "<p>No posts found.</p>";
    return;
  }

  list.forEach(p => {
    if (p.separator) {
      feed.innerHTML += `<div class="user-separator">${p.separator}</div>`;
      return;
    }

    feed.innerHTML += `
      <div class="post ${p.highlight ? "highlight" : ""}" onclick="openPost(${p.id})">
        <h3>${p.title}</h3>
        <p>${p.body.slice(0, 100)}...</p>
      </div>
    `;
  });

  document.getElementById("pageInfo").innerText = `Page ${currentPage}`;
}


   //POST DETAIL VIEW

async function openPost(id) {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");

  try {
    const postUserId = posts.find(p => p.id === id).userId;

    const [post, user, postComments] = await Promise.all([
      fetch(`${API}/posts/${id}`).then(r => r.json()),
      fetch(`${API}/users/${postUserId}`).then(r => r.json()),
      fetch(`${API}/comments?postId=${id}`).then(r => r.json())
    ]);

    modal.innerHTML = `
      <div id="modalContent">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <h4>Author: ${user.name}</h4>
        <h4>Comments</h4>
        ${postComments.map(c => `<p>${c.body}</p>`).join("")}
        <button onclick="closeModal()">Close</button>
      </div>
    `;
  } catch {
    modal.innerHTML = "<p>Failed to load post details</p>";
  }
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}


   //TRANSFORMER TOGGLES
document.getElementById("longPosts").onchange = e =>
  toggleTransformer(highlightLongPosts, e.target.checked);

document.getElementById("sortByComments").onchange = e =>
  toggleTransformer(sortByCommentCount, e.target.checked);

document.getElementById("groupByUser").onchange = e =>
  toggleTransformer(groupByUser, e.target.checked);

function toggleTransformer(fn, enabled) {
  if (enabled) transformers.push(fn);
  else transformers = transformers.filter(t => t !== fn);

  currentPage = 1;
  render();
}

   //PAGINATION CONTROLS
document.getElementById("next").onclick = () => {
  currentPage++;
  render();
};

document.getElementById("prev").onclick = () => {
  if (currentPage > 1) currentPage--;
  render();
};

/* =====================
   INIT
===================== */
fetchData();
