// 메인 페이지: characters.json을 읽어 캐릭터 그리드 + 속성 필터를 렌더링

const ELEMENT_ICON = {
  // 속성명 -> 표시할 짧은 기호. 실제 속성 아이콘 이미지로 교체 가능.
  "송곳니 (예시)": "🦷",
};

async function loadCharacters() {
  const res = await fetch("data/characters.json");
  if (!res.ok) throw new Error("캐릭터 데이터를 불러오지 못했습니다.");
  return res.json();
}

function renderFilters(characters) {
  const bar = document.getElementById("filterBar");
  const elements = [...new Set(characters.map((c) => c.element))];

  elements.forEach((el) => {
    const chip = document.createElement("button");
    chip.className = "filter-chip";
    chip.dataset.filter = el;
    chip.textContent = el;
    bar.appendChild(chip);
  });

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-chip");
    if (!btn) return;
    bar.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    renderGrid(characters, btn.dataset.filter);
  });
}

function renderGrid(characters, filter = "all") {
  const grid = document.getElementById("charGrid");
  grid.innerHTML = "";

  const list = filter === "all" ? characters : characters.filter((c) => c.element === filter);

  if (list.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-muted)">해당 조건의 캐릭터가 아직 없습니다.</p>`;
    return;
  }

  list.forEach((c) => {
    const card = document.createElement("a");
    card.className = "char-card";
    card.href = `characters/${c.id}.html`;
    card.innerHTML = `
      <div class="char-card__icon-wrap">
        <img src="${c.icon}" alt="${c.name}" loading="lazy" onerror="this.style.opacity=0">
        <div class="char-card__element">${ELEMENT_ICON[c.element] ?? c.element[0]}</div>
      </div>
      <div class="char-card__body">
        <div class="char-card__name">${c.name}</div>
        <div class="char-card__rarity">${"★".repeat(c.rarity)}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

loadCharacters()
  .then((characters) => {
    renderFilters(characters);
    renderGrid(characters);
  })
  .catch((err) => {
    document.getElementById("charGrid").innerHTML =
      `<p style="color:var(--accent-danger)">${err.message}</p>`;
  });
