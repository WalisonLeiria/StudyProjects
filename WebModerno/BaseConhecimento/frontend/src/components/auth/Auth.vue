<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="../../assets/logo.png" alt="logo" width="200" />
      <hr>
      <div class="auth-title">
        {{ showSignUp ? "Cadastro" : "Login" }}
      </div>

      <input type="text" v-if="showSignUp" v-model="user.name" placeholder="Nome" />
      <input type="text" v-model="user.email" placeholder="E-mail" />
      <input type="password" v-model="user.password" placeholder="Senha" />
      <input type="password" v-if="showSignUp" v-model="user.confirmPassword" placeholder="Confirme a Senha" />

      <button v-if="showSignUp" @click="signUp">Registrar</button>
      <button v-else @click="signIn">Entrar</button>

      <a href="javascript:;" @click.prevent="showSignUp = !showSignUp">
        <span v-if="showSignUp">Já tem cadastro? Acesse o login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import global from "../../global";

export default {
  name: "Auth",
  data: function() {
    return {
      showSignUp: false,
      user: {}
    }
  },
  methods: {
    signIn() {
      axios.post(`${global.baseUrl}/signin`, this.user)
        .then(resp => {
          this.$store.commit("setUser", resp.data);
          localStorage.setItem(global.userKey, JSON.stringify(resp.data));
          this.$router.push({ path: "/" });
        })
        .catch(global.showError);
    },
    signUp() {
      axios.post(`${global.baseUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignUp = false;
        })
        .catch(global.showError);
    }
  },
}
</script>
<style>
  .auth-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auth-modal {
    background-color: #fff;
    width: 350px;
    padding: 35px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .auth-title {
    font-size: 1.2rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 15px;
  }

  .auth-modal input {
    border: 1px solid #bbb;
    width: 100%;
    margin-bottom: 15px;
    padding: 3px 8px;
    outline: none;
  }

  .auth-modal button {
    align-self: flex-end;
    background-color: #2460ae;
    color: #fff;
    padding: 5px 15px;
  }

  .auth-modal hr {
    border: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right,
      rgba(120, 120, 120, 0),
      rgba(120, 120, 120, 0.75)
      rgba(120, 120, 120, 0));
  }

  .auth-modal a {
    text-decoration: none;
    margin-top: 35px;
  }
</style>