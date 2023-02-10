<template>
  <div>
    <el-row>
      <el-col :span="12" class="content-r">
        <el-button
          type="info"
          icon="el-icon-menu"
          size="mini"
          @click="ismenubtn"
        ></el-button>
      </el-col>
      <el-col :span="12">
        <el-dropdown
          trigger="click"
          style="float: right"
          @command="handleCommand"
        >
          <span class="dropdown-user">
            <img
              src="../assets/img/user.jpeg"
              alt=""
              width="50px"
              height="50px"
            />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'MyHeader',
  methods: {
    ...mapMutations(['ismenubtn']),
    // 下拉菜单的触发事件函数
    handleCommand(val) {
      if (val === 'b') {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.content-r {
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.dropdown-user {
  margin-top: 5px;
  width: 50px;
  height: 50px;
  display: block;
  border-radius: 50%;
  overflow: hidden;
}
</style>
