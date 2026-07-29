async function loadCharactersMap() {
  const res = await fetch("data/characters.json");
  const list = await res.json();
  return Object.fromEntries(list.map((c) => [c.id, c]));
}

async function loadTower() {
  const res = await fetch("data/tower.json");
  if (!res.ok) throw new Error("역경의 탑 데이터를 불러오지 못했습니다.");
  return res.json();
}

function renderTeamMembers(ids, charMap) {
  return ids
    .map((id) => {
      const c = charMap[id];
      const icon = c ? c.icon : "";
      const name = c ? c.name : id;
      return `<div class="team-card__member" title="${name}"><img src="${icon}" alt="${name}" onerror="this.style.opacity=0"></div>`;
    })
    .join("");
}

async function init() {
  try {
    const [data, charMap] = await Promise.all([loadTower(), loadCharactersMap()]);

    document.getElementById("updatedBadge").textContent = `${data.season} · 업데이트 ${data.updated}`;

    const list = document.getElementById("floorList");
    list.innerHTML = data.floors
      .map(
        (f) => `
        <div class="boss-card">
          <div class="boss-card__header">
            <div class="boss-card__name">${f.boss}</div>
            <div class="boss-card__floor mono">${f.floor}</div>
          </div>
          <p style="color:var(--text-secondary); font-size:0.88rem;">${f.notes}</p>
          <div class="weakness-row">
            ${f.weaknesses.map((w) => `<span class="tag tag--element">${w}</span>`).join("")}
          </div>
          <div class="team-card" style="margin-top:14px; background:var(--bg-elevated);">
            <div class="team-card__members">${renderTeamMembers(f.recommendedTeam, charMap)}</div>
            <div class="team-card__info">
              <div class="team-card__role">추천 조합</div>
            </div>
          </div>
        </div>`
      )
      .join("");
  } catch (err) {
    document.getElementById("floorList").innerHTML =
      `<p style="color:var(--accent-danger)">${err.message}</p>`;
  }
}

init();
