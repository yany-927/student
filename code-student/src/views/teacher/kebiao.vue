<template>
  <div>
    <div class="alert-content" ref="showref">
      今天的课程有：
      <p v-for="itmedate in timedate" :key="itmedate.id">
        {{ itmedate.kcDate }}课程，第{{ itmedate.jieDate }}节，地点：{{
          itmedate.attdDate
        }}
      </p>
    </div>
    <!-- 面包屑区域 -->
    <el-breadcrumb
      style="margin-bottom: 20px"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课表查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px" v-if="userDate.sname === 'admin'">
      <el-row>
        <el-col>
          <el-select
            v-model="value"
            placeholder="请选择"
            @change="handleChange"
          >
            <el-option
              v-for="(item, index) in options"
              :key="item.label"
              :label="item.label"
              :value="item.value + index"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 课表区域 -->
      <div class="header-kc" v-if="value !== ''">
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-right: 0"
          ></el-col>
          <el-col class="header-content" style="border-right: 0">星期一</el-col>
          <el-col class="header-content" style="border-right: 0">星期二</el-col>
          <el-col class="header-content" style="border-right: 0">星期三</el-col>
          <el-col class="header-content" style="border-right: 0">星期四</el-col>
          <el-col class="header-content" style="border-right: 0">星期五</el-col>
        </el-row>
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-right: 0"
          >
            第一节
          </el-col>
          <el-col
            class="header-content"
            style="border-right: 0"
            v-for="(item, index) in jieDate"
            :key="index"
          ></el-col>
        </el-row>
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-right: 0"
          >
            第二节
          </el-col>
          <el-col
            class="header-content"
            style="border-right: 0"
            v-for="(item, index) in jieDate"
            :key="index"
          ></el-col>
        </el-row>
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-right: 0"
          >
            第三节
          </el-col>
          <el-col
            class="header-content"
            style="border-right: 0"
            v-for="(item, index) in jieDate"
            :key="index"
          ></el-col>
        </el-row>
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-right: 0"
          >
            第四节
          </el-col>
          <el-col
            class="header-content"
            style="border-right: 0"
            v-for="(item, index) in jieDate"
            :key="index"
          ></el-col>
        </el-row>
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-bottom: 0; border-right: 0"
          >
            第五节
          </el-col>
          <el-col
            class="header-content"
            style="border-right: 0; border-bottom: 0"
            v-for="(item, index) in jieDate"
            :key="index"
          ></el-col>
        </el-row>
        <!-- 对角线 -->
        <div class="duijiaoxian"></div>
        <div class="kecontent1">
          <div
            style="white-space: pre-line"
            v-for="(item, index) in jienum"
            :key="index"
          >
            <p v-for="(item1, index1) in ketable" :key="index1">
              {{
                item1.xingDate === '1' && item1.jieDate - 1 === index
                  ? `${item1.attdDate}\n${item1.kcDate}\n${item1.lsDate}`
                  : ''
              }}
            </p>
          </div>
        </div>
        <div class="kecontent2">
          <div
            style="white-space: pre-line"
            v-for="(item, index) in jienum"
            :key="index"
          >
            <p v-for="(item2, index1) in ketable" :key="index1">
              {{
                item2.xingDate === '2' && item2.jieDate - 1 === index
                  ? `${item2.attdDate}\n${item2.kcDate}\n${item2.lsDate}`
                  : ''
              }}
            </p>
          </div>
        </div>
        <div class="kecontent3">
          <div
            style="white-space: pre-line"
            v-for="(item, index) in jienum"
            :key="index"
          >
            <p v-for="(item3, index1) in ketable" :key="index1">
              {{
                item3.xingDate === '3' && item3.jieDate - 1 === index
                  ? `${item3.attdDate}\n${item3.kcDate}\n${item3.lsDate}`
                  : ''
              }}
            </p>
          </div>
        </div>
        <div class="kecontent4">
          <div
            style="white-space: pre-line"
            v-for="(item, index) in jienum"
            :key="index"
          >
            <p v-for="(item4, index1) in ketable" :key="index1">
              {{
                item4.xingDate === '4' && item4.jieDate - 1 === index
                  ? `${item4.attdDate}\n${item4.kcDate}\n${item4.lsDate}`
                  : ''
              }}
            </p>
          </div>
        </div>
        <div class="kecontent5">
          <div
            style="white-space: pre-line"
            v-for="(item, index) in jienum"
            :key="index"
          >
            <p v-for="(item5, index1) in ketable" :key="index1">
              {{
                item5.xingDate === '5' && item5.jieDate - 1 === index
                  ? `${item5.attdDate}\n${item5.kcDate}\n${item5.lsDate}`
                  : ''
              }}
            </p>
          </div>
        </div>
      </div>
      <el-empty description="没有选择学生课表" v-else></el-empty>
    </el-card>
    <el-card v-else>
      <div class="header-kc">
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-right: 0"
          ></el-col>
          <el-col class="header-content" style="border-right: 0">星期一</el-col>
          <el-col class="header-content" style="border-right: 0">星期二</el-col>
          <el-col class="header-content" style="border-right: 0">星期三</el-col>
          <el-col class="header-content" style="border-right: 0">星期四</el-col>
          <el-col class="header-content" style="border-right: 0">星期五</el-col>
        </el-row>
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-right: 0"
          >
            第一节
          </el-col>
          <el-col
            class="header-content"
            style="border-right: 0"
            v-for="(item, index) in jieDate"
            :key="index"
          ></el-col>
        </el-row>
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-right: 0"
          >
            第二节
          </el-col>
          <el-col
            class="header-content"
            style="border-right: 0"
            v-for="(item, index) in jieDate"
            :key="index"
          ></el-col>
        </el-row>
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-right: 0"
          >
            第三节
          </el-col>
          <el-col
            class="header-content"
            style="border-right: 0"
            v-for="(item, index) in jieDate"
            :key="index"
          ></el-col>
        </el-row>
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-right: 0"
          >
            第四节
          </el-col>
          <el-col
            class="header-content"
            style="border-right: 0"
            v-for="(item, index) in jieDate"
            :key="index"
          ></el-col>
        </el-row>
        <el-row type="flex">
          <el-col
            class="header-content"
            style="border-left: 0; border-bottom: 0; border-right: 0"
          >
            第五节
          </el-col>
          <el-col
            class="header-content"
            style="border-right: 0; border-bottom: 0"
            v-for="(item, index) in jieDate"
            :key="index"
          ></el-col>
        </el-row>
        <!-- 对角线 -->
        <div class="duijiaoxian"></div>
        <div class="kecontent1">
          <div
            style="white-space: pre-line"
            v-for="(item, index) in jienum"
            :key="index"
          >
            <p v-for="(item1, index1) in ketable" :key="index1">
              {{
                item1.xingDate === '1' && item1.jieDate - 1 === index
                  ? `${item1.attdDate}\n${item1.kcDate}\n${item1.lsDate}`
                  : ''
              }}
            </p>
          </div>
        </div>
        <div class="kecontent2">
          <div
            style="white-space: pre-line"
            v-for="(item, index) in jienum"
            :key="index"
          >
            <p v-for="(item1, index1) in ketable" :key="index1">
              {{
                item1.xingDate === '2' && item1.jieDate - 1 === index
                  ? `${item1.attdDate}\n${item1.kcDate}\n${item1.lsDate}`
                  : ''
              }}
            </p>
          </div>
        </div>
        <div class="kecontent3">
          <div
            style="white-space: pre-line"
            v-for="(item, index) in jienum"
            :key="index"
          >
            <p v-for="(item1, index1) in ketable" :key="index1">
              {{
                item1.xingDate === '3' && item1.jieDate - 1 === index
                  ? `${item1.attdDate}\n${item1.kcDate}\n${item1.lsDate}`
                  : ''
              }}
            </p>
          </div>
        </div>
        <div class="kecontent4">
          <div
            style="white-space: pre-line"
            v-for="(item, index) in jienum"
            :key="index"
          >
            <p v-for="(item1, index1) in ketable" :key="index1">
              {{
                item1.xingDate === '4' && item1.jieDate - 1 === index
                  ? `${item1.attdDate}\n${item1.kcDate}\n${item1.lsDate}`
                  : ''
              }}
            </p>
          </div>
        </div>
        <div class="kecontent5">
          <div
            style="white-space: pre-line"
            v-for="(item, index) in jienum"
            :key="index"
          >
            <p v-for="(item1, index1) in ketable" :key="index1">
              {{
                item1.xingDate === '5' && item1.jieDate - 1 === index
                  ? `${item1.attdDate}\n${item1.kcDate}\n${item1.lsDate}`
                  : ''
              }}
            </p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'MyKb',
  data() {
    return {
      options: [],
      value: '',
      jieDate: [
        { value: '1', label: '第一节' },
        { value: '2', label: '第二节' },
        { value: '3', label: '第三节' },
        { value: '4', label: '第四节' },
        { value: '5', label: '第五节' }
      ],
      jienum: [1, 2, 3, 4, 5],
      ketable: [],
      timedate: [],
      num: 0
    }
  },
  methods: {
    async handleChange(val) {
      const arrs = val.split('')
      let counts = ''
      arrs.forEach((x) => {
        if (10 - x) {
          counts = counts + x + ''
        }
      })

      // console.log(val)
      let count = val.length
      const { data: res } = await this.$http.get('/kecheng/getkc', {
        params: { zyDate: val.slice(0, count - counts.length) }
      })
      // console.log(res)
      if (res.status !== 200) {
        this.value = ''
        return this.$message.error('没有添加课程！')
      }
      this.ketable = res.data
    },
    async getStulist() {
      const { data: res } = await this.$http.get('/student/user')
      if (res.status !== 200) return this.$message.error(res.msg)
      // console.log(res)
      res.data.forEach((x) => {
        this.options.push({ value: x.stu_zy, label: x.sname })
      })
    },
    async getkbDate() {
      const { data: res } = await this.$http.get('/kecheng/getkc', {
        params: { zyDate: this.userDate.stu_zy }
      })
      // console.log(res)
      if (res.status !== 200) {
        this.value = ''
        return this.$message.error('没有添加课程！')
      }
      this.ketable = res.data
      console.log(res)
      this.ketable.forEach((x) => {
        let time = new Date().getDay() + ''
        if (time === x.xingDate) {
          this.timedate.push(x)
        }
      })
    }
  },
  created() {
    this.getStulist()
    if (this.userDate.sname !== 'admin') {
      this.getkbDate()
    }
  },
  computed: {
    ...mapState(['userDate'])
  },
  mounted() {
    if (this.userDate.sname !== 'admin') {
      if (window.sessionStorage.getItem('num') === '0') {
        this.$refs.showref.style.display = 'block'
        setTimeout(() => {
          this.$refs.showref.style.display = 'none'
        }, 3000)
      }
      window.sessionStorage.setItem('num', 1)
    }
  }
}
</script>
<style lang="less" scoped>
.header-kc {
  margin: 85px;
  border: 1px solid #999;
  width: 1200px;
  height: 600px;
  position: relative;
}
.header-content {
  height: 100px;
  border: 1px solid #999;
  border-top: 0;
  text-align: center;
  line-height: 100px;
}
.duijiaoxian {
  position: absolute;
  top: 0;
  left: -24px;
  border-bottom: 1px solid #999;
  width: 224px;
  height: 100px;
  transform-origin: bottom right;
  transform: rotate(26.5deg);
}
.kecontent1,
.kecontent2,
.kecontent3,
.kecontent4,
.kecontent5 {
  position: absolute;
  top: 100px;
  left: 200px;
  // border: 1px solid pink;
  width: 200px;
  height: 500px;
  overflow: hidden;
  div {
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    padding: 20px;
  }
}
.kecontent2 {
  left: 400px;
}
.kecontent3 {
  left: 600px;
}
.kecontent4 {
  left: 800px;
}
.kecontent5 {
  left: 1000px;
}
.el-empty {
  width: 1200px;
  height: 773px;
}
.alert-content {
  color: #fff;
  position: absolute;
  top: 65px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 40px;
  border-radius: 10px;
  padding: 50px;
  background-color: #545c64;
  box-shadow: 0 0 10px;
  display: none;
  p {
    padding-bottom: 5px;
    border-bottom: 2px solid #fff;
  }
}
</style>
