async function loadCharactersMap() {
  const res = await fetch("data/characters.json");
  const list = await res.json();
  return Object.fromEntries(list.map((c) => [c.id, c]));
}

async function loadHologram() {
  const res = await fetch("data/hologram.json");
  if (!res.ok) throw new Error("죽음의 노래 데이터를 불러오지 못했습니다.");
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
    const [data, charMap] = await Promise.all([loadHologram(), loadCharactersMap()]);

    document.getElementById("updatedBadge").textContent = `${data.season} · 업데이트 ${data.updated}`;

    const list = document.getElementById("stageList");
    list.innerHTML = data.resistances
      .map(
        (r) => `
        <div class="boss-card">
          <div class="boss-card__header">
            <div class="boss-card__name">${r.stage}</div>
          </div>
          <p style="color:var(--text-secondary); font-size:0.88rem;">${r.notes}</p>
          <div class="weakness-row">
            <span class="tag" style="color:var(--accent-danger); border-color:var(--accent-danger);">내성: ${r.resistantElements.join(", ")}</span>
          </div>
          <div class="team-card" style="margin-top:14px; background:var(--bg-elevated);">
            <div class="team-card__members">${renderTeamMembers(r.recommendedTeam, charMap)}</div>
            <div class="team-card__info">
              <div class="team-card__role">추천 조합</div>
            </div>
          </div>
        </div>`
      )
      .join("");
  } catch (err) {
    document.getElementById("stageList").innerHTML =
      `<p style="color:var(--accent-danger)">${err.message}</p>`;
  }
}

init();
