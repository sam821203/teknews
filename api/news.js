// api/news.js
const axios = require("axios")

module.exports = async (req, res) => {
  try {
    // 從請求中提取參數
    const { country, category, pageSize, page, apiKey } = req.query

    // 呼叫外部 API
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        apiKey,
        country,
        category,
        pageSize,
        page,
      },
    })

    // 回傳 API 的結果
    res.status(200).json(response.data)
  } catch (error) {
    console.error("Error fetching news:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
