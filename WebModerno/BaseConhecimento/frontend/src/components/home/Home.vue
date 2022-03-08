<template>
  <div class="home">
    <PageTitle icon="fa-solid fa-home" main="Dashboard" sub="Base de conhecimento" />
    <div class="stats">
      <Stat title="Categorias" :value="stat.categories" icon="fa-solid fa-folder" color="#d54d50"></Stat>
      <Stat title="Artigos" :value="stat.articles" icon="fa-solid fa-file" color="#3bc480"></Stat>
      <Stat title="Usuários" :value="stat.users" icon="fa-solid fa-user" color="#3282cd"></Stat>
    </div>
  </div>
</template>
<script>
import PageTitle from "../template/PageTitle.vue";
import Stat from "./Stat.vue";
import axios from "axios";
import { baseUrl } from "../../global";

export default {
  name: "Home",
  components: {
    PageTitle,
    Stat
  },
  data: function() {
    return {
      stat: {}
    }
  },
  methods: {
    getStat() {
      axios.get(`${baseUrl}/stats`).then(resp => this.stat = resp.data);
    }
  },
  mounted() {
    this.getStat();
  },
}
</script>
<style>
  /* .home {
    
  } */

  .stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>