import dotenv from 'dotenv'
import express from 'express'
import initializeDatabase from './db/db.connect.js'
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import cors from 'cors'
import tagRoutes from './routes/tags.routes.js'
import teamRoutes from './routes/team.routes.js'
import taskRoutes from './routes/task.routes.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    origin: ['https://project-gestionando.vercel.app','http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}))

app.get('/', (req,res) => {
    res.send("Welcome")
})
app.use('/api/auth', userRoutes)

app.use('/api/projects', projectRoutes)

app.use('/api/tags', tagRoutes)

app.use('/api/teams', teamRoutes)

app.use('/api/tasks', taskRoutes)

app.use((error,req,res,next) => {
    console.error(error);
    res.status(500).json(`${process.env.NODE_ENV === "development" ? error.message : "Internal server error"}`)
})

app.listen(PORT, () => {
    initializeDatabase()
    console.log("Server is running on port:",PORT)
})
