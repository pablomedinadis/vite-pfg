import express, { json } from 'express'
import cors from 'cors'
import { usersRouter } from './routes/users.js'
import { languageRouter } from './routes/languages.js'
import { skillRouter } from './routes/skills.js'
import { mdRouter } from './routes/main_datas.js'

const app = express()

app.use(json())
app.use(cors()) // soluciona pero pone todo con '*'
app.disable('x-powered-by') // deshabilitar la cabecera de express

app.use('/users', usersRouter)
app.use('/lang', languageRouter)
app.use('/skills', skillRouter)
app.use('/md', mdRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
