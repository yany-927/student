<template>
  <el-container>
    <el-aside :width="!ismenu ? '200px' : '60px'">
      <div>
        <h3>{{ !ismenu ? '学生后台管理系统' : '后台' }}</h3>
        <el-menu
          :default-active="loginmenuicon[0].menu"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="ismenu"
          :collapse-transition="false"
          :router="true"
          @select="selectbtn"
        >
          <el-menu-item
            :index="item.menu"
            v-for="item in loginmenuicon"
            :key="item.id"
          >
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{ item.content }}</span>
          </el-menu-item>
        </el-menu>
      </div></el-aside
    >
    <el-container>
      <el-header><MyHeader></MyHeader></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
import MyHeader from './Header.vue'
import { mapState } from 'vuex'
export default {
  name: 'MyHome',
  components: {
    MyHeader
  },
  computed: {
    ...mapState(['ismenu', 'loginmenuicon'])
  },
  methods: {
    // 则边栏的激活页面事件函数
    selectbtn(val) {
      // console.log(val)
      if (this.$route.path !== '/home') return
      this.$router.push(this.loginmenuicon[0].menu)
    }
  },
  created() {
    this.selectbtn()
  },
  updated() {
    this.selectbtn()
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  // text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #fff;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}
h3 {
  font-weight: 400;
  color: #333;
}
.el-menu {
  border: 0;
}
</style>
