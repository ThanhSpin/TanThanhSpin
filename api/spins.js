export default async function handler(req, res) {
  try {
    const resp = await fetch("https://data.polyxgo.com/api/v1/datax/coinmaster");
    const data = await resp.json();
    if (!data || !Array.isArray(data.coinmaster) || data.coinmaster.length === 0) {
      return res.status(404).json({ error: "❌ Không có link spin trong API." });
    }
    // Giả sử trả về mảng object chứa trường 'link'
    const links = data.coinmaster
      .map(item => item.link)
      .filter(Boolean);
    const uniq = [...new Set(links)];
    res.setHeader('Cache-Control', 's-maxage=300');
    return res.status(200).json({ links: uniq });
  } catch (e) {
    console.error("API ERROR:", e);
    return res.status(500).json({ error: "❌ Không thể lấy dữ liệu từ PolyXGO." });
  }
}
