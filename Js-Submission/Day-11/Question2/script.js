const sections = [
  {
    title: "Section 1",
    content: "Content for section 1. This is some detailed information.",
  },
  {
    title: "Section 2",
    content: "Content for section 2. This is some detailed information.",
  },
  {
    title: "Section 3",
    content: "Content for section 3. This is some detailed information.",
  },
];

const accordionDiv = document.getElementById("accordion");

let activeIndex = null;

function renderAccordion() {
  accordionDiv.innerHTML = "";

  sections.forEach((section, index) => {
    const item = document.createElement("div");
    item.className = "accordion-item";

    if (activeIndex === index) {
      item.classList.add("active");
    }

    item.innerHTML = `
      <div class="accordion-header">${section.title}</div>
      <div class="accordion-content">
        <p>${section.content}</p>
      </div>
    `;

    item.querySelector(".accordion-header").onclick = () => {
      activeIndex = activeIndex === index ? null : index;
      renderAccordion();
    };

    accordionDiv.appendChild(item);
  });
}

renderAccordion();
