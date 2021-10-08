<template>
  <div class="home">
    <Menu />
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import Menu from "../component/Menu.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    Menu,
  },
  created(){
      console.log(this.$route);
  }
});
</script>
<style lang="less" scoped>
.home{
    height: 100%;
}
</style>
