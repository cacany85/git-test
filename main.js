const TOTAL_ROWS = 10;
const NUMBERS_PER_ROW = 6;
const MAX_LOTTO_NUMBER = 45;

const lottoContainer = document.getElementById("lotto-container");
const drawButton = document.getElementById("draw-button");
const copyButton = document.getElementById("copy-button");

drawButton.addEventListener("click", renderLottoRows);
copyButton.addEventListener("click", copyResults);

renderLottoRows();

function createLottoRow() {
  const selected = new Set();

  while (selected.size < NUMBERS_PER_ROW) {
    const randomNumber = Math.floor(Math.random() * MAX_LOTTO_NUMBER) + 1;
    selected.add(randomNumber);
  }

  return Array.from(selected).sort((a, b) => a - b);
}

function renderLottoRows() {
  lottoContainer.innerHTML = "";

  for (let i = 0; i < TOTAL_ROWS; i += 1) {
    const row = createLottoRow();
    const rowElement = document.createElement("div");
    rowElement.className = "lotto-row";

    const labelElement = document.createElement("span");
    labelElement.className = "row-label";
    labelElement.textContent = `${i + 1}조`;

    const ballsElement = document.createElement("div");
    ballsElement.className = "balls";

    row.forEach((num) => {
      const ball = document.createElement("span");
      ball.className = "lotto-ball";
      ball.style.backgroundColor = getBallColor(num);
      ball.textContent = String(num);
      ballsElement.appendChild(ball);
    });

    rowElement.appendChild(labelElement);
    rowElement.appendChild(ballsElement);
    lottoContainer.appendChild(rowElement);
  }
}

function getBallColor(num) {
  if (num <= 10) return "#f3b70a";
  if (num <= 20) return "#3f8efc";
  if (num <= 30) return "#ef6461";
  if (num <= 40) return "#767676";
  return "#4ea94b";
}

async function copyResults() {
  const rows = [...lottoContainer.querySelectorAll(".lotto-row")];
  if (rows.length === 0) return;

  const text = rows
    .map((row, idx) => {
      const nums = [...row.querySelectorAll(".lotto-ball")].map((el) => el.textContent);
      return `${idx + 1}조: ${nums.join(", ")}`;
    })
    .join("\n");

  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "복사 완료";
    setTimeout(() => {
      copyButton.textContent = "결과 복사";
    }, 1200);
  } catch (error) {
    copyButton.textContent = "복사 실패";
    setTimeout(() => {
      copyButton.textContent = "결과 복사";
    }, 1200);
  }
}
