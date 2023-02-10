const express = require('express')
// 跨域
const cors = require('cors')
// 解析 post 表单数据的中间件
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use(express.static('./dist'))

const router = require('./router/index.js')

app.use('/api', router)

app.listen(8888, () => {
  console.log('开启成功！')
})
