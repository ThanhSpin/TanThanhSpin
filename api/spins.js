import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const page = await fetch('https://www.facebook.com/coinmasterofficial/posts');
    const html = await page.text();

    const regex = /https:\/\/coin-master\.co\/[a-zA-Z0-9]+/g;
    const matches = html.match(regex) || [];

    // Lọc các link trùng lặp
    const uniqueLinks = [...new Set(matches)];

    res.setHeader('Cache-Control', 's-maxage=300');
    res.status(200).json({ links: uniqueLinks });
  } catch (err) {
    res.status(500).json({ error: 'Không thể lấy dữ liệu từ Facebook.' });
  }
}
