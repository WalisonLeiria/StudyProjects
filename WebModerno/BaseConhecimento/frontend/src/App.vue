<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <Header title="Cod3r - Base de Conhecimento" :hideToggle="!user" :hideUserDropdown="!user" />
    <Menu v-if="user" />
    <Loading v-if="validatingToken"/>
    <Content v-else/>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import global from "./global";
import Content from "./components/template/Content.vue"
import Footer from "./components/template/Footer.vue";
import Header from "./components/template/Header.vue";
import Menu from "./components/template/Menu.vue";
import Loading from "./components/template/Loading.vue";

import { mapState } from "vuex";

export default {
  name: 'App',
  components: {
    Content,
    Footer,
    Header,
    Menu,
    Loading
  },
  computed: mapState(["isMenuVisible", "user"]),
  data() {
    return {
      validatingToken: true
    }
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;
      const json = localStorage.getItem(global.userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        return this.$router.push({ name: "auth" });
      }

      const resp = await axios.post(`${global.baseUrl}/validateToken`, userData);

      if (resp.data) {
        this.$store.commit("setUser", userData);
        
        if (this.$mq === "sm" || this.$mq === "xs") {
          this.$store.commit("toggleMenu", false);
        }
      } else {
        localStorage.removeItem(global.userKey);
        this.$router.push({ name: "auth" });
      }

      this.validatingToken = false;
    }
  },
  created() {
    this.validateToken();
  },
}
</script>

<style>
  * {
    font-family: 'Lato', sans-serif;
  }

  body {
    margin: 0px;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100vh;
    display: grid;
    grid-template-rows: 60px 1fr 40px;
    grid-template-columns: 300px 1fr;
    grid-template-areas: "header header" "menu content" "menu footer";
  }

  #app.hide-menu {
    grid-template-areas: "header header" "content content" "footer footer";
  }
</style>
