import express from "express"
import dotenv from "dotenv"
import { connectDatabase } from "./config/db.js"
import routerProducts from "./routes/products.routes.js"
import routerUsers from "./routes/user.routes.js"

dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT

app.use("/api/products", routerProducts)
app.use("/api/users", routerUsers)


connectDatabase()

app.listen(PORT, () => {
    console.log("El servidor se está ejecutando " + PORT)
})