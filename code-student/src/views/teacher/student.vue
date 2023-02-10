<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb
      style="margin-bottom: 20px"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            @input="searchbtn"
            :clearable="true"
            @clear="clearbtn"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchbtn"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" @click="addstu('add')"
            >添加学生</el-button
          ></el-col
        >
      </el-row>
      <el-table
        border
        stripe
        :data="tabledata"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="sname" label="姓名" width="110">
        </el-table-column>
        <el-table-column prop="stu_age" label="年龄" width="80">
        </el-table-column>
        <el-table-column prop="stu_attd" label="地址"> </el-table-column>
        <el-table-column prop="stu_birth" label="出生日期" width="120">
        </el-table-column>
        <el-table-column prop="stu_yx" label="院系" width="140">
        </el-table-column>
        <el-table-column prop="stu_zy" label="专业" width="180">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px; float: right; margin-bottom: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加学生对话框 -->
    <el-dialog
      :title="this.showStu === 'add' ? '添加学生' : '编辑学生'"
      :visible.sync="dialogVisibleStu"
      width="30%"
      @close="closeStu"
    >
      <el-form
        ref="formSturef"
        :model="formStu"
        label-width="100px"
        :rules="rulesStu"
      >
        <el-form-item label="用户名" prop="sname">
          <el-input v-model.trim="formStu.sname" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            v-model.trim="formStu.pwd"
            style="width: 70%"
            :disabled="showStu === 'add' ? true : false"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="stu_sex">
          <!-- <el-input v-model="formStu.stu_sex" style="width: 70%"></el-input> -->
          <el-radio v-model.trim="formStu.stu_sex" label="0">男</el-radio>
          <el-radio v-model.trim="formStu.stu_sex" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" prop="stu_age">
          <el-input
            v-model.trim="formStu.stu_age"
            type="number"
            min="0"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="stu_attd">
          <el-input
            v-model.trim="formStu.stu_attd"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="stu_birth">
          <el-input
            type="date"
            v-model.trim="formStu.stu_birth"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="院系" prop="stu_yx">
          <el-input
            v-model.trim="formStu.stu_yx"
            style="width: 70%"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="stu_zy">
          <!-- <el-input v-model.trim="formStu.stu_zy" style="width: 70%"></el-input> -->
          <el-select
            v-model="formStu.stu_zy"
            placeholder="请选择专业"
            style="width: 70%"
          >
            <el-option
              v-for="(item, index) in optionDate"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="stu_bj">
          <el-input v-model.trim="formStu.stu_bj" style="width: 70%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleStu = false">取 消</el-button>
        <el-button type="primary" @click="StuBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: 'MyStudent',
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
      // 搜索框
      input: '',
      // table数据
      tabledata: [],
      // 学生对话框显示与隐藏
      dialogVisibleStu: false,
      // 添加学生表单
      formStu: {
        sname: '',
        pwd: '123456',
        stu_sex: '',
        stu_age: '18',
        stu_attd: '',
        stu_birth: '',
        stu_bj: '',
        stu_yx: '信息工程学院',
        stu_zy: ''
      },
      rulesStu: {
        sname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        stu_sex: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        stu_age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        stu_attd: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        stu_birth: [
          { required: true, message: '请输入出生日期', trigger: 'blur' }
        ],
        stu_bj: [{ required: true, message: '请输入班级', trigger: 'blur' }],
        stu_yx: [{ required: true, message: '请输入院系', trigger: 'blur' }],
        stu_zy: [{ required: true, message: '请输入专业', trigger: 'blur' }]
      },
      showStu: '',
      // 总条数
      total: 0,
      // 当前页
      pagenum: 1,
      // 条数页数
      pagesize: 5
    }
  },
  methods: {
    async getstudent() {
      const { data: res } = await this.$http.get('/student', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      this.tabledata = res.data
      // console.log(res)
      this.total = res.total
    },
    // 编辑信息按钮事件函数
    async edit(val) {
      this.showStu = 'edit'
      this.formStu = val
      this.dialogVisibleStu = true
      // console.log(val)
    },
    // 删除信息按钮事件函数
    async del(val) {
      // console.log(val)
      const flag = await this.$confirm(
        // 提示信息
        '此操作将永久删除该学生信息, 是否继续?',
        '提示',
        {
          // 确定按钮文本内容
          confirmButtonText: '确定',
          // 取消按钮文本内容
          cancelButtonText: '取消',
          // 显示图标
          type: 'warning'
        }
        // catch捕获错误信息
      ).catch((err) => err)
      if (flag !== 'confirm') return this.$message.info('删除操作取消！')
      const { data: res } = await this.$http.delete(`/student/delete/${val.id}`)
      if (res.status !== 200) return this.$message.error(res.msg)
      // console.log(res)
      this.getstudent()
    },
    // 添加学生信息
    addstu(val) {
      this.showStu = val
      this.dialogVisibleStu = true
    },
    // 添加学生对话框关闭事件函数
    closeStu() {
      this.$refs.formSturef.resetFields()
      this.getstudent()
    },
    // 添加学生确定按钮事件函数
    StuBtn() {
      this.$refs.formSturef.validate(async (valid) => {
        if (!valid) return this.$message.error('验证失败！')
        if (this.showStu === 'add') {
          const { data: res } = await this.$http.post(
            '/student/add',
            qs.stringify(this.formStu)
          )
          if (res.status !== 200) return this.$message.error(res.msg)
          this.getstudent()
        } else {
          const { data: res } = await this.$http.put(
            '/student/update',
            qs.stringify(this.formStu)
          )
          if (res.status !== 200) return this.$message.error(res.msg)
          this.getstudent()
        }
      })
      this.dialogVisibleStu = false
    },
    // 搜索按钮事件函数
    async searchbtn() {
      const { data: res } = await this.$http.get('/student', {
        params: { sname: this.input, search: this.pagesize }
      })
      if (res.status !== 200) {
        this.tabledata = res.data
        return
      }
      // console.log(res)
      this.tabledata = res.data
    },
    // 搜索输入框清空按钮事件函数
    clearbtn() {
      this.getstudent()
    },
    // 每页条数
    handleSizeChange(val) {
      this.pagesize = val
      this.getstudent()
    },
    // 当前页码
    handleCurrentChange(val) {
      this.pagenum = val
      this.getstudent()
    }
  },
  created() {
    this.getstudent()
  }
}
</script>
<style lang="less" scoped></style>
