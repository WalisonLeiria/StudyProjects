<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-dropdown-img">
        <Gravatar :email="user.email" alt="User" />
      </div>
      <font-awesome-icon icon="fa-solid fa-angle-down" />
    </div>
    <div class="user-dropdown-content">
      <router-link to="/admin" v-if="user.admin"><font-awesome-icon icon="fa-solid fa-gears" /> Administração</router-link>
      <a href="javascript:;" @click.prevent="signOut"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /> Sair</a>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Gravatar from "vue-gravatar";
import global from "../../global";

export default {
  name: "UserDropdown",
  components: {
    Gravatar
  },
  computed: mapState(["user"]),
  methods: {
    signOut() {
      localStorage.removeItem(global.userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name:"auth" });
    }
  },
}
</script>
<style>
  .user-button {
    display: flex;
    align-items: center;
    color: white;
    font-weight: 100;
    height: 100%;
    padding: 0px 20px;
  }

  .user-dropdown {
    position: relative;
    height: 100%;
  }

  .user-dropdown:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .user-dropdown-img {
    margin: 0px 10px;
  }

  .user-dropdown-img > img {
    max-height: 37px;
    border-radius: 5px;
  }

  .user-dropdown-content {
    position: absolute;
    right: 0px;
    background-color: #f9f9f9;
    min-width: 170px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 10px;
    z-index: 1;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
  }

  .user-dropdown:hover .user-dropdown-content {
    visibility: visible;
    opacity: 1;
  }

  .user-dropdown-content a {
    text-decoration: none;
    color: black;
    padding: 10px;
  }

  .user-dropdown-content a:hover {
    text-decoration: none;
    color: black;
    background-color: #ededed;
  }
</style>