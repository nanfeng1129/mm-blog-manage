<template>
  <div class="home">
    <div class="home-left">
        <Menu />
    </div>
    <div class="home-right">
        <Header />
        <div class="home-right-content">
            <router-view />
        </div>
        <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import Menu from "../component/Menu.vue";
import Header from "../component/Header.vue";
import Footer from "../component/Footer.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    Menu,
    Header,
    Footer
  },
  created(){
      //console.log(this.$route);
  }
});
</script>
<style lang="less" scoped>
.home{
    height: 100%;
    width: 100%;
    &-right{
        width: 82%;
        margin-left: 18%;
        &-content{
            background: #eee;
            padding: 20px;
            height: calc(100vh - 8vh - 8vh - 40px);
            min-height: 500px;
            //color: rgba(0, 0, 0, .2);
        }
    }
}
</style>
