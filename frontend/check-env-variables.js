const c = require("ansi-colors")
const fs = require("fs")
const path = require("path")

const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_BACKEND_URL",
    description: "FastAPI backend URL, for example http://localhost:8001",
  },
]

function checkEnvVariables() {
  loadLocalEnv()

  const missingEnvs = requiredEnvs.filter(function (env) {
    return !process.env[env.key]
  })

  if (missingEnvs.length > 0) {
    console.error(c.red.bold("\nError: Missing required environment variables\n"))

    missingEnvs.forEach(function (env) {
      console.error(c.yellow(`  ${c.bold(env.key)}`))
      if (env.description) {
        console.error(c.dim(`    ${env.description}\n`))
      }
    })

    console.error(
      c.yellow(
        "\nPlease set these variables in your .env file or environment before starting the application.\n"
      )
    )

    process.exit(1)
  }
}

function loadLocalEnv() {
  const envFiles = [".env.local", ".env"]

  envFiles.forEach(function (fileName) {
    const filePath = path.join(process.cwd(), fileName)
    if (!fs.existsSync(filePath)) {
      return
    }

    const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/)
    lines.forEach(function (line) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) {
        return
      }

      const separatorIndex = trimmed.indexOf("=")
      if (separatorIndex === -1) {
        return
      }

      const key = trimmed.slice(0, separatorIndex).trim()
      const value = trimmed
        .slice(separatorIndex + 1)
        .trim()
        .replace(/^['"]|['"]$/g, "")

      process.env[key] ||= value
    })
  })
}

module.exports = checkEnvVariables
