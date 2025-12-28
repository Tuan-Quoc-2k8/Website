document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const game = document.getElementById("game");
  const twoPlayerBtn = document.getElementById("twoPlayerBtn");
  const vsAiBtn = document.getElementById("vsAiBtn");

  // Chế độ 2 người
  twoPlayerBtn.addEventListener("click", () => {
    menu.style.display = "none";
    game.style.display = "flex"; // hiện bàn cờ
    initBoard();  // gọi hàm khởi tạo bàn cờ
    window.isVsAI = false;
  });

  // Chế độ đấu máy
  vsAiBtn.addEventListener("click", () => {
    menu.style.display = "none";
    game.style.display = "flex";
    initBoard();
    window.isVsAI = true;
  });
});

