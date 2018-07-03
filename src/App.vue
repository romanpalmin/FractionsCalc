<template>
  <div id="app">
    <nav class="nav-bar">
      <router-link to="/Calculator" class="nav-bar-item">Дробный калькулятор</router-link>
      <router-link to="/Comments" class="nav-bar-item">Управление комментариями</router-link>
    </nav>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .content {
    width: 90%;
    min-height: 100px;
    margin: 0 auto;
    background-color: lightgray;
    border: 1px solid;
    border-radius: 10px;
    padding: 10px;
  }
  .nav-bar{
    padding: 20px;
    /*background-color: yellow;*/
    text-decoration: none;
    text-transform: uppercase;
  }
  .nav-bar-item{
    text-decoration: none;
    padding: 10px 40px;
    border-radius: 5px;
  }
  .nav-bar-item:hover{
    background-color: lightgrey;
  }
</style>
