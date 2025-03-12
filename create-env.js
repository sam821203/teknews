const fs = require("fs")
const dotenv = require("dotenv").config({ path: "src/.env" })
const path = "./src/environments"

if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true })
}

const envFile = `export const environment = {
    API_KEY: '${process.env.API_KEY}',
};
`
fs.writeFileSync("./src/environments/environment.prod.ts", envFile)
console.log("✅ environment.prod.ts created!")
