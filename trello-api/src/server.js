import express from 'express'
import { connectDB } from '@/config/mongodb'
import { env } from '@/config/environment'
import { apiV1 } from '@/routes/v1'


const port = env.APP_PORT
const hostName = env.APP_HOST

//connect DB
connectDB()
  .then(() => console.log('Connected succesfully to database server!'))
  .then(() => bootServer())
  .catch(err => {
    console.log(err)
    process.exit()
  })


const bootServer = () => {
  const app = express()

  // enable req.body data
  app.use(express.json())

  //routes api v1
  app.use('/v1', apiV1)
  //
  app.listen(port, hostName, () => {
    console.log(`Trello clone app listening at http://${hostName}:${port}`)
  })
}