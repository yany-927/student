<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb
      style="margin-bottom: 20px"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>科目管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <el-row>
        <el-col>
          <el-button type="primary" @click="addKc">添加课程</el-button>
          <el-button type="danger" @click="delKc">删除课程</el-button>
          <el-select
            style="margin-left: 20px"
            v-model="value"
            placeholder="请选择专业"
            @change="xuanzeke"
            clear
          >
            <el-option
              v-for="(item, index) in optionDate"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
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
                item1.xingDate === '2' && item1.jieDate - 1 === index
                  ? `${item1.attdDate}\n${item1.kcDate}\n${item1.lsDate}`
                  : ''
              }}
            </p>
          </div>
        </div>
      </div>
      <el-empty description="没有选择专业课表" v-else></el-empty>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog
      title="添加课程"
      :visible.sync="dialogVisiblekc"
      width="30%"
      @close="closeKc"
    >
      <el-form
        ref="formKcref"
        :model="formKc"
        label-width="130px"
        :rules="rulesKc"
      >
        <el-form-item label="专业" prop="zyDate">
          <el-select v-model="formKc.zyDate" placeholder="请选择专业">
            <el-option
              v-for="(item, index) in optionDate"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程" prop="kcDate">
          <el-select v-model="formKc.kcDate" placeholder="请选择课程">
            <el-option
              v-for="(item, index) in kcDate"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="老师" prop="lsDate">
          <el-select v-model="formKc.lsDate" placeholder="请选择老师">
            <el-option
              v-for="(item, index) in lsDate"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地点" prop="attdDate">
          <el-select v-model="formKc.attdDate" placeholder="请选择地点">
            <el-option
              v-for="(item, index) in attdDate"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="xingDate">
          <el-select v-model="formKc.xingDate" placeholder="请选择日期">
            <el-option
              v-for="(item, index) in xingDate"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第几节" prop="jieDate">
          <el-select v-model="formKc.jieDate" placeholder="请选择第几节">
            <el-option
              v-for="(item, index) in jieDate"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblekc = false">取 消</el-button>
        <el-button type="primary" @click="kcbtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除对话框 -->
    <el-dialog
      title="删除课程"
      :visible.sync="dialogVisibleDel"
      width="30%"
      @close="closeKc"
    >
      <el-form
        ref="formKcref"
        :model="formKc"
        label-width="130px"
        :rules="rulesKc"
      >
        <el-form-item label="专业" prop="zyDate">
          <el-select v-model="formKc.zyDate" placeholder="请选择专业">
            <el-option
              v-for="(item, index) in optionDate"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程" prop="kcDate">
          <el-select v-model="formKc.kcDate" placeholder="请选择课程">
            <el-option
              v-for="(item, index) in kcDate"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDel = false">取 消</el-button>
        <el-button type="primary" @click="delkcbtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: 'MyKc',
  data() {
    return {
      optionDate: [
        {
          value: '软件技术',
          label: '软件技术'
        },
        {
          value: '计算机应用与技术',
          label: '计算机应用与技术'
        },
        {
          value: '大数据应用与技术',
          label: '大数据应用与技术'
        },
        {
          value: '电子商务与技术',
          label: '电子商务与技术'
        }
      ],
      value: '',
      formKc: {
        zyDate: '',
        kcDate: '',
        lsDate: '',
        attdDate: '',
        jieDate: '',
        xingDate: ''
      },
      rulesKc: {
        zyDate: [{ required: true, message: '请输入专业', trigger: 'blur' }],
        kcDate: [{ required: true, message: '请输入课程', trigger: 'blur' }],
        lsDate: [{ required: true, message: '请输入老师', trigger: 'blur' }],
        attdDate: [{ required: true, message: '请选择地点', trigger: 'blur' }],
        jieDate: [{ required: true, message: '请选择第几节', trigger: 'blur' }],
        xingDate: [{ required: true, message: '请选择日期', trigger: 'blur' }]
      },
      // 添加对话框显示与隐藏
      dialogVisiblekc: false,
      // 课程
      kcDate: ['php', 'c语言', 'python', 'java', 'javascript', 'javaweb'],
      lsDate: ['小红', '小花', '小张', '小华'],
      attdDate: ['1栋113', '1栋115', '1栋123', '1栋101', '1栋106'],
      jieDate: [
        { value: '1', label: '第一节' },
        { value: '2', label: '第二节' },
        { value: '3', label: '第三节' },
        { value: '4', label: '第四节' },
        { value: '5', label: '第五节' }
      ],
      xingDate: [
        { value: '1', label: '星期一' },
        { value: '2', label: '星期二' },
        { value: '3', label: '星期三' },
        { value: '4', label: '星期四' },
        { value: '5', label: '星期五' }
      ],
      // 删除对话框显示与隐藏
      dialogVisibleDel: false,
      // 课表数据
      ketable: [],
      jienum: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    // 对话框关闭事件函数
    closeKc() {
      this.$refs.formKcref.resetFields()
    },
    // 添加课程按钮事件函数
    addKc() {
      this.dialogVisiblekc = true
    },
    // 添加对话框确定按钮事件函数
    kcbtn() {
      this.$refs.formKcref.validate(async (valid) => {
        if (!valid) return this.$message.error('验证失败！')
        const { data: res } = await this.$http.post(
          '/kecheng/add',
          qs.stringify(this.formKc)
        )
        if (res.status !== 200) return this.$message.error(res.msg)
        // console.log(res)
      })
      this.value = ''
      this.dialogVisiblekc = false
    },
    // 删除课程按钮事件函数
    delKc() {
      // console.log('del')
      this.dialogVisibleDel = true
    },
    // 删除对话框确定按钮事件函数
    delkcbtn() {
      this.$refs.formKcref.validate(async (valid) => {
        if (!valid) return this.$message.error('验证失败！')
        const { data: res } = await this.$http.delete('/kecheng/del', {
          params: this.formKc
        })
        if (res.status !== 200) this.$message.error(res.msg)
        this.value = ''
        this.dialogVisibleDel = false
      })
    },
    // 获取专业课表
    async xuanzeke(val) {
      const { data: res } = await this.$http.get('/kecheng/getkc', {
        params: { zyDate: val }
      })
      if (res.status !== 200) {
        this.value = ''
        return this.$message.error(res.msg)
      }
      this.ketable = res.data
      // console.log(this.ketable)
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
</style>
