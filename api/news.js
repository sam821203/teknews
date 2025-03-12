// api/news.js
const axios = require("axios")

export default async function handler(req, res) {
  try {
    const { category = "general", page = 1 } = req.query

    // 從 Vercel environment 變數中獲取 API_KEY
    const apiKey = process.env.API_KEY
    const url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us&category=${category}&pageSize=10&page=${page}`

    // 向 NewsAPI 發送請求
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    })

    // 返回 NewsAPI 的回應數據
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(error.response?.status || 500).json({ error: "API request failed" })
  }
}
