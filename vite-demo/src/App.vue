<template>
  <ul>
    <li>
      <router-link to="/home">首页</router-link>
    </li>
    <li>
      <router-link to="/chart">图表</router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
