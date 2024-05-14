import express, { json } from 'express'
import cors from 'cors'
import { usersRouter } from './routes/users.js'
import { languageRouter } from './routes/languages.js'
import { skillRouter } from './routes/skills.js'

const app = express()

app.use(json())
app.use(cors()) // soluciona pero pone todo con '*'
app.disable('x-powered-by') // deshabilitar la cabecera de express

app.use('/users', usersRouter)
app.use('/lang', languageRouter)
app.use('/skills', skillRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
