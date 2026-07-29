// 캐릭터 상세 페이지 공통 렌더러
// 각 characters/*.html 파일 상단에서 `const CHAR_ID = "xxx";` 를 지정한 뒤 이 스크립트를 로드합니다.

async function loadAllCharacters() {
  const res = await fetch("../data/characters.json");
  if (!res.ok) throw new Error("데이터를 불러오지 못했습니다.");
  return res.json();
}

function findById(list, id) {
  return list.find((c) => c.id === id);
}

function renderHero(c) {
  document.title = `${c.name} - 육성 및 파티 조합 | 공명 데이터베이스`;
  document.getElementById("heroPortrait").src = c.portrait;
  document.getElementById("heroPortrait").alt = c.name;
  document.getElementById("heroName").textContent = c.name;
  document.getElementById("heroDesc").textContent = c.shortDesc;
  document.getElementById("tagElement").textContent = c.element;
  document.getElementById("tagWeapon").textContent = c.weapon;
  document.getElementById("tagRarity").textContent = "★".repeat(c.rarity);
}

function renderMaterials(c) {
  const wrap = document.getElementById("materialGrid");
  wrap.innerHTML = c.materials
    .map(
      (m) => `
      <div class="material-item">
        <span>${m.name}</span>
        <span class="material-item__count">×${m.count}</span>
      </div>`
    )
    .join("");
}

function renderStatPriority(c) {
  const body = document.getElementById("statTableBody");
  body.innerHTML = c.statPriority
    .map(
      (s) => `
      <tr>
        <td>${s.stat}</td>
        <td class="mono-val">${s.priority}</td>
      </tr>`
    )
    .join("");
}

function renderEchoes(c) {
  const wrap = document.getElementById("echoGrid");
  wrap.innerHTML = c.recommendedEchoes
    .map(
      (e) => `
      <div class="echo-card">
        <div class="echo-card__set">${e.set}</div>
        <div class="echo-card__desc">${e.desc}</div>
        <div class="echo-card__priority">${e.priority}</div>
      </div>`
    )
    .join("");
}

function renderTeams(c, allCharacters) {
  const wrap = document.getElementById("teamGrid");
  wrap.innerHTML = c.teamComps
    .map((t) => {
      const members = t.members
        .map((id) => {
          const m = findById(allCharacters, id);
          const icon = m ? m.icon : "";
          const name = m ? m.name : id;
          return `<div class="team-card__member"><img src="${icon}" alt="${name}" onerror="this.style.opacity=0"></div>`;
        })
        .join("");
      return `
        <div class="team-card">
          <div class="team-card__members">${members}</div>
          <div class="team-card__info">
            <div class="team-card__role">${t.role}</div>
            <div class="team-card__desc">${t.desc}</div>
          </div>
        </div>`;
    })
    .join("");
}

async function initCharacterPage() {
  try {
    const all = await loadAllCharacters();
    const c = findById(all, CHAR_ID);
    if (!c) throw new Error("캐릭터 데이터를 찾을 수 없습니다: " + CHAR_ID);

    renderHero(c);
    renderMaterials(c);
    renderStatPriority(c);
    renderEchoes(c);
    renderTeams(c, all);
  } catch (err) {
    document.querySelector("main").innerHTML =
      `<p style="color:var(--accent-danger)">${err.message}</p>`;
  }
}

initCharacterPage();
