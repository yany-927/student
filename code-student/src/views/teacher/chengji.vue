<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb
      style="margin-bottom: 20px"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card v-if="userDate.sname !== 'admin'">
      <el-table
        :data="tableDatecjs"
        border
        stripe
        style="width: 100%; margin-top: 50px"
      >
        <el-table-column prop="scDatep" label="php" width="180">
        </el-table-column>
        <el-table-column prop="scDatec" label="c语言" width="180">
        </el-table-column>
        <el-table-column prop="scDatepy" label="python"> </el-table-column>
        <el-table-column prop="scDatej" label="java"> </el-table-column>
        <el-table-column prop="scDatejs" label="javascript"> </el-table-column>
        <el-table-column prop="scDatew" label="javaweb"> </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top: 20px" v-else>
      <el-row type="flex" justify="column">
        <el-col :span="6"
          ><el-button type="primary" @click="scbtn">上传成绩</el-button
          ><el-button type="danger" style="margin-left: 20px" @click="delbtn"
            >删除成绩</el-button
          ></el-col
        >
        <el-col>
          <el-select
            v-model="value"
            placeholder="请选择"
            @change="xzchengjibtn"
          >
            <el-option
              v-for="item in options"
              :key="item.value + item.id"
              :label="item.label"
              :value="item.value + item.id"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-table
        :data="tableDatecj"
        border
        stripe
        style="width: 100%; margin-top: 50px"
        v-if="this.value !== ''"
      >
        <el-table-column prop="scDatep" label="php" width="180">
        </el-table-column>
        <el-table-column prop="scDatec" label="c语言" width="180">
        </el-table-column>
        <el-table-column prop="scDatepy" label="python"> </el-table-column>
        <el-table-column prop="scDatej" label="java"> </el-table-column>
        <el-table-column prop="scDatejs" label="javascript"> </el-table-column>
        <el-table-column prop="scDatew" label="javaweb"> </el-table-column>
      </el-table>
      <el-empty description="没有选择选择成绩" v-else></el-empty>
    </el-card>
    <!-- 上传成绩对话框 -->
    <el-dialog
      title="上传成绩"
      :visible.sync="dialogVisiblecj"
      width="30%"
      @close="scclosebtn"
    >
      <el-form
        ref="formscref"
        :model="formsc"
        label-width="120px"
        :rules="rulessc"
      >
        <el-form-item label="选择学生" prop="cname">
          <el-select
            v-model="formsc.cname"
            placeholder="请选择"
            @change="scchengjibtn"
          >
            <el-option
              v-for="item1 in options"
              :key="item1.value + item1.id"
              :label="item1.label"
              :value="item1.value + item1.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="scDate[0]" prop="scDatep">
          <el-input
            v-model="formsc.scDatep"
            style="width: 64%"
            :disabled="disables[0].flag"
          ></el-input>
        </el-form-item>
        <el-form-item :label="scDate[1]" prop="scDatec">
          <el-input
            v-model="formsc.scDatec"
            style="width: 64%"
            :disabled="disables[1].flag"
          ></el-input>
        </el-form-item>
        <el-form-item :label="scDate[2]" prop="scDatepy">
          <el-input
            v-model="formsc.scDatepy"
            style="width: 64%"
            :disabled="disables[2].flag"
          ></el-input>
        </el-form-item>
        <el-form-item :label="scDate[3]" prop="scDatej">
          <el-input
            v-model="formsc.scDatej"
            style="width: 64%"
            :disabled="disables[3].flag"
          ></el-input>
        </el-form-item>
        <el-form-item :label="scDate[4]" prop="scDatejs">
          <el-input
            v-model="formsc.scDatejs"
            style="width: 64%"
            :disabled="disables[4].flag"
          ></el-input>
        </el-form-item>
        <el-form-item :label="scDate[5]" prop="scDatew">
          <el-input
            v-model="formsc.scDatew"
            style="width: 64%"
            :disabled="disables[5].flag"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblecj = false">取 消</el-button>
        <el-button type="primary" @click="scbtncj">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除成绩对话框 -->
    <el-dialog title="删除成绩" :visible.sync="dialogVisibledel" width="30%">
      <el-form label-width="150px">
        <el-form-item label="选择学生">
          <el-select v-model="delvalue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value + item.id"
              :label="item.label"
              :value="item.value + item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibledel = false">取 消</el-button>
        <el-button type="primary" @click="delbtnsc">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import qs from 'qs'
export default {
  name: 'MyCj',
  data() {
    return {
      options: [],
      value: '',
      // 上传成绩对话框
      dialogVisiblecj: false,
      // 上传成绩对话框表单数据
      formsc: {
        cname: '',
        scDatep: 0,
        scDatec: 0,
        scDatepy: 0,
        scDatej: 0,
        scDatejs: 0,
        scDatew: 0
      },
      rulessc: {
        cname: [{ required: true, message: '这是必填项', trigger: 'blur' }],
        scDatep: [{ required: true, message: '这是必填项', trigger: 'blur' }],
        scDatec: [{ required: true, message: '这是必填项', trigger: 'blur' }],
        scDatepy: [{ required: true, message: '这是必填项', trigger: 'blur' }],
        scDatej: [{ required: true, message: '这是必填项', trigger: 'blur' }],
        scDatejs: [{ required: true, message: '这是必填项', trigger: 'blur' }],
        scDatew: [{ required: true, message: '这是必填项', trigger: 'blur' }]
      },
      // 开设的课程数据
      scarr: [],
      scDate: ['php', 'c语言', 'python', 'java', 'javascript', 'javaweb'],
      // 设置课程输入的禁止状态
      disables: [
        { flag: true, name_zy: 'php' },
        { flag: true, name_zy: 'c语言' },
        { flag: true, name_zy: 'python' },
        { flag: true, name_zy: 'java' },
        { flag: true, name_zy: 'javascript' },
        { flag: true, name_zy: 'javaweb' }
      ],
      // 成绩数据
      tableDatecj: [],
      tableDatecjs: [],
      // 删除下拉框数据
      delvalue: '',
      // 删除对话框显示与隐藏
      dialogVisibledel: false
    }
  },
  methods: {
    // 上传成绩按钮事件函数
    scbtn() {
      this.dialogVisiblecj = true
    },
    // 上传成绩对话框关闭事件函数
    scclosebtn() {
      this.$refs.formscref.resetFields()
    },
    // 获取学生全部信息
    async getsclist() {
      const { data: res } = await this.$http.get('/student/user')
      if (res.status !== 200) return this.$message.error(res.msg)
      // console.log(res)
      res.data.forEach((x) => {
        this.options.push({ value: x.stu_zy, label: x.sname, id: x.id })
      })
      // console.log(this.options)
    },
    // 上传成绩对话框的学生select事件函数
    async scchengjibtn(val) {
      let count = val.length
      const { data: res } = await this.$http.get('/kecheng/getkc', {
        params: { zyDate: val.slice(0, count - 1) }
      })
      if (res.status !== 200) {
        return this.$message.error(res.msg)
      }
      let arr = []
      res.data.forEach((x) => {
        arr.push(x.kcDate)
      })
      // 课程数据 去重Array.from(new Set(arr)
      this.scarr = Array.from(new Set(arr))
      // 重新赋值disables
      this.disables.forEach((x) => (x.flag = true))
      // 没有设置的课程禁止输入
      this.disables.forEach((x) => {
        let a = this.scarr.some((y) => y === x.name_zy)
        if (a) {
          x.flag = false
        }
      })
      console.log(this.scarr)
      console.log(this.disables)
    },
    // 添加学生成绩
    scbtncj() {
      this.$refs.formscref.validate(async (valid) => {
        if (!valid) return this.$message.error('验证失败！')
        const arrs = this.formsc.cname.split('')
        let count = ''
        arrs.forEach((x) => {
          if (10 - x) {
            count = count + x
          }
        })
        // let count = this.formsc.cname.length
        this.formsc.cname = count
        const { data: res } = await this.$http.post(
          '/chengji/add',
          qs.stringify(this.formsc)
        )
        if (res.status !== 200) {
          this.formsc.cname = ''
          this.$refs.formscref.resetFields()
          return this.$message.error(res.msg)
        }
        this.dialogVisiblecj = false
      })
    },
    // 选择学生查看成绩
    async xzchengjibtn(val) {
      const arr = val.split('')
      let count = ''
      arr.forEach((x) => {
        if (10 - x) {
          count = count + x
        }
      })
      const { data: res } = await this.$http.get('/chengji/getcj', {
        params: { id: count }
      })
      if (res.status !== 200) return this.$message.error(res.mag)
      // console.log(res)
      this.tableDatecj = res.data
    },
    // 删除成绩按钮
    delbtn() {
      this.dialogVisibledel = true
    },
    // 删除对话框确定按钮
    async delbtnsc() {
      const arrs = this.delvalue.split('')
      let count = ''
      arrs.forEach((x) => {
        if (10 - x) {
          count = count + x
        }
      })
      const { data: res } = await this.$http.delete(`/chengji/del/${count}`)
      if (res.status !== 200) {
        this.delvalue = ''
        this.dialogVisibledel = false
        return this.$message.error(res.msg)
      }
      // console.log(res)
      this.delvalue = ''
      this.dialogVisibledel = false
    },
    async getxsdata() {
      const { data: res } = await this.$http.get('/chengji/getcj', {
        params: { id: this.userDate.id }
      })
      if (res.status !== 200) return this.$message.error(res.mag)
      console.log(res)
      this.tableDatecjs = res.data
    }
  },
  created() {
    this.getsclist()
    if (this.userDate.sname !== 'admin') {
      this.getxsdata()
    }
  },
  computed: {
    ...mapState(['userDate'])
  }
}
</script>
<style lang="less" scoped>
.el-card {
  height: 800px;
}
.el-empty {
  width: 1200px;
  height: 773px;
}
</style>
