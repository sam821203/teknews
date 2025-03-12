const fs = require("fs")
const path = "./src/environments"

if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true })
}

const envConfig = `export const environment = {
    API_KEY: "${process.env.API_KEY}"
};
`
fs.writeFileSync("./src/environments/environment.dev.ts", envConfig)
console.log("✅ environment.prod.ts created!")
