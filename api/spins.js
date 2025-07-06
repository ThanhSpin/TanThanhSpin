export default async function handler(req, res) {
  try {
    const response = await fetch('https://m.facebook.com/coinmaster/posts');
    const html = await response.text();
    const regex = /https:\/\/coin-master\.co\/[A-Za-z0-9]+/g;
    const matches = html.match(regex) || [];
    const uniqueLinks = [...new Set(matches)];
    res.status(200).json(uniqueLinks.map(link => ({ url: link })));
  } catch (error) {
    res.status(500).json({ error: '❌ Không thể lấy dữ liệu từ Fanpage.' });
  }
}
