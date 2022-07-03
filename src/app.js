const path = require('path')
const express = require('express')
const app = express()
const taskRoutes = require('./routes/tasks')
const connectDB = require('./config/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Use static folder
app.use(express.static(path.join(__dirname, 'public')))
// middleware
app.use(express.json())

app.use('/api/v1/tasks', taskRoutes)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
