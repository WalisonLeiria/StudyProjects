<template>
  <div class="article-admin">
    <b-form>
      <input type="hidden" id="article-id" v-model="article.id">
      <b-row>
        <b-col xs="12">
          <b-form-group label="Nome:" label-for="article-name">
            <b-form-input id="article-name" type="text" v-model="article.name"
              :readonly="mode === 'remove'"
              required placeHolder="Informe o nome do artigo"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Descrição:" label-for="article-description">
            <b-form-input id="article-description" type="text" v-model="article.description"
              :readonly="mode === 'remove'"
              required placeHolder="Informe a descrição do artigo"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Imagem (URL):" label-for="article-url-image">
            <b-form-input id="article-url-image" type="text" v-model="article.imageUrl"
              :readonly="mode === 'remove'"
              required placeHolder="Informe o link da imagem do artigo"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Categoria:" label-for="article-categoryId">
            <b-form-select id="article-categoryId" :options="categories" v-model="article.categoryId" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Autor:" label-for="article-userId">
            <b-form-select id="article-userId" :options="users" v-model="article.userId" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Conteúdo:" label-for="article-content">
            <VueEditor v-model="article.content" placeholder="Informe o conteúdo do artigo..." />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <b-table hover striped :items="articles" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
          <font-awesome-icon icon="fa-solid fa-pencil" />
        </b-button>
        <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
          <font-awesome-icon icon="fa-solid fa-trash" />
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>
<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
import { baseUrl, showError } from "../../global";

export default {
  name: "ArticleAdmin",
  components: {
    VueEditor
  },
  data: function() {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sorteble: true },
        { key: "name", label: "Nome", sorteble: true },
        { key: "description", label: "Descrição", sorteble: true },
        { key: "actions", label: "Ações" },
      ]
    }
  },
  methods: {
    loadArticles() {
      const url = `${baseUrl}/articles?page=${this.page}`;
      axios.get(url).then(resp => {
        this.articles = resp.data.data;
        this.count = resp.data.count;
        this.limit = resp.data.limit;
      });
    },
    loadCategories() {
      const url = `${baseUrl}/categories`;
      axios.get(url).then(resp => {
        this.categories = resp.data.map(category => {
          return { value: category.id, text: category.path };
        })
      });
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;
      axios.get(`${baseUrl}/articles/${article.id}`)
        .then(resp => this.article = resp.data);
    },
    loadUsers() {
      const url = `${baseUrl}/users`;
      axios.get(url).then(resp => {
        this.users = resp.data.map(user => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        })
      });
    },
    reset() {
      this.mode = "save";
      this.article = {};
      this.loadArticles();
    },
    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";
      axios[method](`${baseUrl}/articles${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.article.id;
      axios.delete(`${baseUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    }
  },
  watch: {
    page() {
      this.loadArticles();
    }
  },
  mounted() {
    this.loadCategories();
    this.loadArticles();
    this.loadUsers();
  },
}
</script>
<style>
  /* .article-admin {

  } */
</style>