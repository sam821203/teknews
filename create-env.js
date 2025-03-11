const fs = require("fs")
const apiKey = process.env.API_KEY || ""
const path = "./src/environments"

if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true })
}

const envConfig = `export const environment = {
  production: true,
  apiKey: "${process.env.API_KEY}"
};`

fs.writeFileSync("./src/environments/environment.prod.ts", envConfig)
console.log("✅ environment.prod.ts created!")
