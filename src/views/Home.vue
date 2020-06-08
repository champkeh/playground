<template>
    <div class="page">
      <h1>我的工具</h1>
      <ol class="tools">
        <router-link to="/idcard">
          <li class="tool">身份证号码生成器</li>
        </router-link>
        <router-link to="/linkedlist">
          <li class="tool">链表模拟</li>
        </router-link>
      </ol>
    </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
  h1 {
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  }
  .tools {
    width: 800px;
    margin: 50px auto;
    list-style: decimal;
    .tool {
      line-height: 40px;
      font-size: 20px;
    }
  }
</style>
