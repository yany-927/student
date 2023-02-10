<template>
  <div>
    <vue-particles
      class="login-bg"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="content">
      <h3 style="margin-top: 0">学生课程系统</h3>
      <!-- 学生登录 -->
      <el-form
        ref="formLoginref"
        :model="formLgoin"
        label-width="55px"
        :rules="rulesLogin"
        :hide-required-asterisk="true"
      >
        <el-form-item label="帐号" prop="username">
          <el-input
            v-model="formLgoin.username"
            prefix-icon="el-icon-user"
            placeholder="请输入帐号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="formLgoin.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="margin-bottom: 10px"
          label="验证码"
          prop="randlist"
        >
          <el-input
            style="float: left; width: 50%; margin-right: 20px"
            ref="iptref"
            v-model="formLgoin.randlist"
            size="medium"
          ></el-input>
          <img
            @click="imgbtn"
            :src="dataUrl"
            alt=""
            width="100px"
            height="40px"
            ref="imgcanvas"
          />
          <canvas
            ref="canvas"
            width="100px"
            height="40px"
            style="display: none"
          ></canvas>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-radio v-model="radio" label="1">学生</el-radio>
          <el-radio v-model="radio" label="2">教师</el-radio>
        </el-form-item>
        <el-row>
          <el-col :span="16">
            <el-button
              size="mini"
              type="primary"
              style="margin-left: 40px"
              @click="submitbtn"
              >登录</el-button
            >
          </el-col>
          <el-col :span="8">
            <el-button size="mini" type="info" @click="closebtn"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyLogin',
  data() {
    return {
      formLgoin: {
        username: '',
        password: '',
        randlist: ''
      },
      rulesLogin: {
        username: [
          {
            required: true,
            message: '请输入帐号',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        randlist: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      // 验证码照片base64数据
      dataUrl: '',
      // 验证码的数据
      contentCanvas: [],
      // 表单单选框数据
      radio: '1'
    }
  },
  methods: {
    // 登录按钮事件函数
    submitbtn() {
      this.$refs.formLoginref.validate(async (valid) => {
        if (!valid) return this.$message.error('验证失败！')
        if (
          this.contentCanvas.join('').toLocaleUpperCase() !==
          this.formLgoin.randlist.toLocaleUpperCase()
        ) {
          return this.$message.error('验证码错误！')
        }
        // 判断选择的是学生登录还是教师登录
        if (this.radio === '1') {
          const { data: res } = await this.$http.get('/login/student', {
            params: {
              username: this.formLgoin.username,
              password: this.formLgoin.password
            }
          })
          // console.log(res)
          if (res.status !== 200) return this.$message.error(res.msg)
          this.$store.commit('getUserDate', res.data)
          // 将登录的用户信息保存在本地存储
          window.sessionStorage.setItem('userdata', JSON.stringify(res.data))
          // 将获取的token存储在本地上
          window.sessionStorage.setItem('token', res.token)
          // 动态渲染侧边栏的页面个数
          const str = res.data.stu_order.split(',')
          const icon = res.data.stu_icon.split(',')
          const content = res.data.stu_content.split(',')
          const arr = []
          for (let i = 0; i < 4; i++) {
            arr.push({
              id: i + 1,
              menu: str[i],
              icon: icon[i],
              content: content[i]
            })
          }
          this.$store.commit('setloginmenu', arr)
          this.$message.success('登录成功！')
          this.$router.push('/home')
        } else {
          const { data: res } = await this.$http.get('/login/admin', {
            params: {
              username: this.formLgoin.username,
              password: this.formLgoin.password
            }
          })
          // console.log(res)
          if (res.status !== 200) return this.$message.error(res.msg)
          this.$store.commit('getUserDate', res.data)
          // 将登录的用户信息保存在本地存储
          window.sessionStorage.setItem('userdata', JSON.stringify(res.data))
          window.sessionStorage.setItem('token', res.token)
          const str = res.data.admin_order.split(',')
          const icon = res.data.admin_icon.split(',')
          const content = res.data.admin_content.split(',')
          const arr1 = []
          for (let i = 0; i < 4; i++) {
            arr1.push({
              id: i + 1,
              menu: str[i],
              icon: icon[i],
              content: content[i]
            })
          }
          this.$store.commit('setloginmenu', arr1)
          this.$message.success('登录成功！')
          this.$router.push('/home')
        }
      })
    },
    // 重置按钮事件函数
    closebtn() {
      this.$refs.formLoginref.resetFields()
    },
    canvas() {
      const nums = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ]
      // 创建画布
      const cxs = this.$refs.canvas.getContext('2d')
      // 填充画布背景
      cxs.fillStyle = '#0000ff'
      // 规定画布的宽高
      cxs.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
      // 实现渐变
      const gradient = cxs.createLinearGradient(
        0,
        0,
        this.$refs.canvas.width,
        0
      )
      // 0到0.5到1之间的渐变色
      gradient.addColorStop(0, 'pink')
      gradient.addColorStop(0.5, 'red')
      gradient.addColorStop(1, 'yellow')
      // 填充渐变
      cxs.fillStyle = gradient
      // 规定文字的大小和字体
      cxs.font = '25px Arial'
      // 定义三个数组文字数组，x轴数组，y轴数组
      const rand = []
      const x = []
      const y = []
      // 使用for循环填充4个文字
      for (let i = 0; i < 4; i++) {
        // 随机填充文字
        rand[i] = nums[Math.floor(Math.random() * nums.length)]
        // 随机x轴位置
        x[i] = i * 16 + 10
        //  随机y轴位置
        y[i] = Math.random() * 20 + 20
        // 填充文字
        cxs.fillText(rand[i], x[i], y[i])
      }
      // // 添加直线干扰
      // for (let i = 0; i < 3; i++) {
      //   this.domove(this.$refs.canvas, cxs)
      // }
      // // 添加点干扰
      // for (let i = 0; i < 30; i++) {
      //   this.dod(this.$refs.canvas, cxs)
      // }
      // 将toDataURL()返回的base64的数据赋值给img的src
      this.dataUrl = this.$refs.canvas.toDataURL()
      this.contentCanvas = rand
    },
    // 直线函数
    domove(canvas, cvs) {
      cvs.moveTo(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height)
      )
      cvs.lineTo(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height)
      )
      cvs.lineWidth = 0.5
      cvs.fillStyle = 'rgba(50,50,50,0.3)'
      cvs.stroke()
    },
    // 点函数
    dod(canvas, cvs) {
      const a = Math.floor(Math.random() * canvas.width)
      const b = Math.floor(Math.random() * canvas.height)
      cvs.moveTo(a, b)
      cvs.lineTo(a + 1, b + 1)
      cvs.lineWidth = 0.2
      cvs.stroke()
    },
    // 点击刷新验证图片
    imgbtn() {
      this.canvas()
    }
  },
  mounted() {
    this.canvas()
    window.sessionStorage.setItem('num', 0)
  }
}
</script>
<style lang="less" scoped>
.content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 370px;
  // border: 1px solid pink;
  border-radius: 10px;
  background-color: #fff;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 5px #999999;
}
.admin {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 14px;
  cursor: pointer;
  color: #999;
}
.login-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // background-color: #3e3e3e;
}
</style>
