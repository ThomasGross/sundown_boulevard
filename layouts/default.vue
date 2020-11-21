<template>
  <div>
    <Header />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Header from "~/components/molecules/Header";

export default {
  components: {
    Header,
  },
};
</script>

<style>
html {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;

  background: #f7f4ec;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 100px);
}
</style>
