window.onload = async () => {
  const list = document.getElementById("link-list");
  const error = document.getElementById("error");

  try {
    const res = await fetch("/api/spins");
    const data = await res.json();

    if (data && data.links && data.links.length > 0) {
      list.innerHTML = "";
      data.links.forEach(link => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
        list.appendChild(li);
      });
    } else {
      error.textContent = "❌ Không có link hợp lệ.";
    }
  } catch {
    error.textContent = "❌ Không thể lấy dữ liệu từ server.";
  }
};

function copyLink() {
  const text = document.querySelector("#link-list a")?.href || "";
  if (text) {
    navigator.clipboard.writeText(text);
    alert("📋 Đã sao chép link spin!");
  }
}

function share() {
  alert("📣 Chia sẻ tính năng sắp ra mắt!");
}

function downloadApp() {
  alert("⬇️ Mở App Store hoặc CH Play để tải Coin Master!");
}
