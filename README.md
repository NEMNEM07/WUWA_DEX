# 명조 육성 & 파티 조합 데이터베이스

정적 사이트 (순수 HTML/CSS/JS). GitHub + Cloudflare Pages 무료 플랜 배포용.

## 폴더 구조

```
index.html          메인 페이지 (캐릭터 그리드)
tower.html           역경의 탑
hologram.html         죽음의 노래
characters/
  example-char.html    캐릭터 상세 페이지 (복사해서 새 캐릭터 추가)
css/style.css         전체 스타일 (다크 테마)
js/
  main.js              메인 페이지 렌더링
  character-page.js     캐릭터 상세 페이지 공통 렌더러
  tower.js               역경의 탑 렌더링
  hologram.js            죽음의 노래 렌더링
data/
  characters.json        캐릭터 데이터 (실제 데이터로 채워야 함)
  tower.json              역경의 탑 데이터
  hologram.json           죽음의 노래 데이터
assets/
  icons/, portraits/      캐릭터 이미지 (직접 준비 필요)
```

## 캐릭터 추가하는 법

1. `data/characters.json`에 새 캐릭터 객체 추가 (id는 영문 slug 권장, 예: `carlotta`)
2. `characters/example-char.html`을 복사해 `characters/carlotta.html`로 저장
3. 파일 하단의 `const CHAR_ID = "example-char";` 를 `"carlotta"`로 수정
4. `assets/icons/`, `assets/portraits/`에 이미지 추가하고 JSON의 icon/portrait 경로 맞추기

메인 페이지, 역경의 탑, 죽음의 노래 페이지의 캐릭터 아이콘은 characters.json 하나만 갱신하면 전부 자동 반영됩니다.

## 역경의 탑 / 죽음의 노래 업데이트

시즌이 바뀔 때마다 `data/tower.json`, `data/hologram.json`만 수정하면 됩니다. HTML/JS는 손댈 필요 없음.

## 이미지 관련 주의사항

- 게임 공식 아이콘/일러스트를 그대로 사용하는 것은 저작권 이슈 소지가 있습니다.
- 직접 캡처한 스크린샷을 최소한으로 쓰거나, 자체 제작한 아이콘/실루엣으로 대체하는 것을 권장합니다.
- 사이트 하단에 "비공식 팬 제작 사이트" 고지 문구가 이미 포함되어 있습니다.

## 배포 (Cloudflare Pages)

1. 이 폴더를 GitHub 저장소에 push
2. Cloudflare Pages에서 저장소 연결
3. Build command: 없음 (정적 파일이라 빌드 불필요)
4. Build output directory: `/` (루트)
