const express = require('express')

const jwt = require('jsonwebtoken')

const router = express.Router()

const db = require('../mysql/index.js')

const secretKey = 'yashi No1 ^_^'
// 管理员登录
router.get('/login/admin', (req, res) => {
  db.query('select * from teacher', (err, results) => {
    if (err) return console.log(err.message)
    let flag = results.some((element) => element.sname === req.query.username)
    if (!flag) {
      res.send({
        status: 201,
        msg: '用户不存在',
        data: null
      })
      return
    }
    let index = results.findIndex((x) => x.sname === req.query.username)
    if (
      req.query.username === results[index].sname &&
      Number(req.query.password) === results[index].pwd
    ) {
      res.send({
        status: 200,
        msg: '登录成功！',
        data: results[index],
        token:
          'Bearer ' +
          jwt.sign({ username: req.query.username }, secretKey, {
            expiresIn: '10h'
          })
      })
    } else {
      res.send({
        status: 201,
        msg: '用户名或密码错误！',
        data: null
      })
    }
  })
})
// 学生登录
router.get('/login/student', (req, res) => {
  db.query('select * from student', (err, results) => {
    if (err) return console.log(err.message)
    // console.log(results[0])
    let flag = results.some((element) => element.sname === req.query.username)
    if (!flag) {
      res.send({
        status: 201,
        msg: '用户不存在',
        data: null
      })
      return
    }
    let index = results.findIndex((x) => x.sname === req.query.username)
    if (
      req.query.username === results[index].sname &&
      Number(req.query.password) === results[index].pwd
    ) {
      res.send({
        status: 200,
        msg: '登录成功！',
        data: results[index],
        token:
          'Bearer ' +
          jwt.sign({ username: req.query.username }, secretKey, {
            expiresIn: '10h'
          })
      })
    } else {
      res.send({
        status: 201,
        msg: '用户名或密码错误！',
        data: null
      })
    }
  })
})
// 学生管理
router.get('/student', (req, res) => {
  if (req.query.sname) {
    db.query(
      `select * from student where sname like'%${req.query.sname}%'`,
      (err, results) => {
        if (err) return console.log(err.message)
        // console.log(results)
        if (results.length !== 0) {
          res.send({
            status: 200,
            msg: '搜索学生信息成功！',
            data: results
          })
        } else {
          res.send({
            status: 201,
            msg: '搜索学生信息不存在！',
            data: []
          })
        }
      }
    )
  } else if (req.query.pagesize) {
    let count = 0
    // console.log(req.query)
    db.query('select * from student', (err, results) => {
      if (err)
        return res.send({ status: 201, msg: '获取学生信息失败', data: null })
      count = results.length
    })
    pagesizes = Number(req.query.pagesize) * Number(req.query.pagenum)
    pagenums = pagesizes - Number(req.query.pagesize)
    db.query(
      `select * from student limit ${pagenums},${pagesizes}`,
      (err, results) => {
        if (err)
          return res.send({ status: 201, msg: '获取学生信息失败', data: null })
        res.send({
          status: 200,
          msg: '获取学生信息成功！',
          data: results,
          total: count
        })
        console.log(results)
      }
    )
  } else {
    db.query(
      `select * from student limit ${Number(req.query.search)}`,
      (err, results) => {
        if (err) return console.log(err.message)
        // console.log(results.length)
        res.send({
          status: 200,
          msg: '获取学生信息成功！',
          data: results
        })
      }
    )
  }
})
// 添加学生
router.post('/student/add', (req, res) => {
  // let flag = true
  let arr = {}
  arr = req.body
  arr.stu_order = '/kebiao,/chengji'
  arr.stu_icon = 's-order,s-data'
  arr.stu_content = '课表查询,成绩查询'
  db.query('select * from student', (err, results) => {
    if (err) return console.log(err)
    let flag = results.some((element) => element.sname === req.body.sname)
    if (flag) {
      res.send({
        status: 201,
        msg: '用户已存在',
        data: results
      })
      return
    }
    db.query('insert into student set ?', arr, (err, results) => {
      if (err) return console.log(err)
      if (results.affectedRows === 1) {
        res.send({
          status: 200,
          msg: '插入数据成功！',
          data: req.body
        })
      }
    })
  })
})
// 删除学生信息
router.delete('/student/delete/:id', (req, res) => {
  console.log(req.params)
  db.query(
    `select * from student where id=${Number(req.params.id)}`,
    (err, results) => {
      if (err) return console.log(err)
      if (results.length === 0)
        return res.send({ status: 201, msg: '用户不存在！', data: null })
      db.query(
        'delete from student where id=?',
        Number(req.params.id),
        (err, results) => {
          if (err) return console.log(err)
          res.send({
            status: 200,
            msg: '删除成功！',
            data: null
          })
        }
      )
    }
  )
})
// 更新学生信息数据
router.put('/student/update', (req, res) => {
  console.log(req.body)
  db.query(
    'update student set ? where id=?',
    [req.body, Number(req.body.id)],
    (err, results) => {
      if (err)
        return res.send({ status: 201, msg: '更新数据失败！', data: err })
      // console.log(results)
      res.send({
        status: 200,
        msg: '更新数据成功！',
        data: req.body
      })
    }
  )
})
// 添加课程信息数据
router.post('/kecheng/add', (req, res) => {
  db.query('select * from kecheng', (err, results) => {
    if (err) return console.log(err)
    // console.log(results)
    let count = 0
    results.filter((x) => {
      if (x.zyDate === req.body.zyDate) {
        count++
      }
    })
    if (count >= 6) {
      return res.send({
        status: 0,
        msg: '此专业课程已满',
        data: null
      })
    }
    let flag = results.some(
      (x) =>
        (req.body.zyDate === x.zyDate &&
          req.body.kcDate === x.kcDate &&
          req.body.lsDate === x.lsDate &&
          req.body.attdDate === x.attdDate &&
          req.body.jieDate === x.jieDate &&
          req.body.xingDate === x.xingDate) ||
        (req.body.xingDate === x.xingDate &&
          req.body.jieDate === x.jieDate &&
          req.body.zyDate === x.zyDate)
    )
    if (flag) {
      res.send({
        status: 201,
        msg: '课程信息重复！',
        data: null
      })
    } else {
      db.query('insert into kecheng set ?', req.body, (err, results) => {
        if (err) return console.log(err)
        if (results.affectedRows === 1) {
          res.send({
            status: 200,
            msg: '插入数据成功！',
            data: req.body
          })
          return
        }
        res.send({
          status: 201,
          msg: '插入数据失败！',
          data: null
        })
      })
    }
  })
})
// 删除课程信息数据
router.delete('/kecheng/del', (req, res) => {
  db.query(
    'delete from kecheng where zyDate=? and kcDate=?',
    [req.query.zyDate, req.query.kcDate],
    (err, results) => {
      if (err) return console.log(err)
      if (results.affectedRows === 0) {
        return res.send({
          status: 201,
          msg: '要删除的课程不存在！',
          data: results
        })
      }
      res.send({
        status: 200,
        msg: '删除课程成功！',
        data: results
      })
    }
  )
})
// 根据专业获取课表信息
router.get('/kecheng/getkc', (req, res) => {
  db.query(
    `select * from kecheng where zyDate='${req.query.zyDate}'`,
    (err, results) => {
      if (err) return console.log(err)
      if (results.length === 0) {
        res.send({
          status: 201,
          msg: '请添加课程！',
          data: results
        })
        return
      }
      res.send({
        status: 200,
        msg: '获取数据成功！',
        data: results
      })
    }
  )
})
// 获取学生信息数据
router.get('/student/user', (req, res) => {
  db.query('select * from student', (err, results) => {
    if (err) return console.log(err)
    res.send({
      status: 200,
      msg: '获取学生信全部息成功',
      data: results
    })
  })
})
// 插入成绩信息数据
router.post('/chengji/add', (req, res) => {
  db.query('select * from chengji', (err, results) => {
    if (err) return console.log(err)
    let flag = false
    results.forEach((x) => {
      if (x.cname === req.body.cname) {
        return (flag = true)
      }
    })
    console.log(req.body.cname)
    console.log(flag)
    if (flag) {
      return res.send({
        status: 201,
        msg: '请勿重复个人成绩！',
        data: null
      })
    }
    db.query('insert into chengji set ?', req.body, (err, results) => {
      if (err) return console.log(err)
      if (results.affectedRows === 0) {
        res.send({
          status: 201,
          msg: '添加成绩失败！',
          data: req.body
        })
        return
      }
      res.send({
        status: 200,
        msg: '添加成绩成功！',
        data: req.body
      })
    })
  })
})
// 获取成绩信息
router.get('/chengji/getcj', (req, res) => {
  db.query(
    `select * from chengji where cname='${req.query.id}'`,
    (err, results) => {
      if (err) return console.log(err)
      if (results.affectedRows === 0) {
        res.send({
          status: 201,
          msg: '获取成绩失败！',
          data: null
        })
        return
      }
      res.send({
        status: 200,
        msg: '获取成绩成功！',
        data: results
      })
    }
  )
})
// 删除成绩信息
router.delete('/chengji/del/:id', (req, res) => {
  db.query(
    'delete from chengji where cname=?',
    req.params.id,
    (err, results) => {
      if (err) return console.log(err)
      if (results.affectedRows === 0) {
        return res.send({
          status: 201,
          msg: '要删除的成绩不存在！',
          data: results
        })
      }
      res.send({
        status: 200,
        msg: '删除成绩成功！',
        data: results
      })
    }
  )
})
module.exports = router
