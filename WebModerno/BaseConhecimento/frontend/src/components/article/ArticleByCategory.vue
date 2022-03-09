<template>
  <div class="articles-by-category">
    <PageTitle icon="fa-solid fa-folder" :main="category.name" sub="Categoria" />
    <ul>
      <li v-for="article in articles" :key="article.id">
        <ArticleItem :article="article" />
      </li>
    </ul>
    <div class="load-more">
      <button v-if="loadMore" class="btn btn-lg btn-outline-primary" @click="loadArticles">
        Carregar Mais!
      </button>
    </div>
  </div>
</template>
<script>
import PageTitle from "../template/PageTitle.vue";
import ArticleItem from "./ArticleItem.vue";
import axios from "axios";
import { baseUrl } from "../../global";

export default {
  name: "ArticleByCategory",
  components: {
    PageTitle,
    ArticleItem
  },
  data: function() {
    return {
      category: {},
      articles: [],
      loadMore: true
    }
  },
  methods: {
    loadCategory() {
      const url = `${baseUrl}/categories/${this.category.id}`;
      axios(url).then(resp => this.category = resp.data);
    },
    loadArticles() {
      const url = `${baseUrl}/categories/${this.category.id}/articles?page=${this.page}`;
      axios(url).then(resp => {
        this.articles = this.articles.concat(resp.data)
        this.page++;

        if (resp.data.length === 0) this.loadMore = false;
      });
    }
  },
  mounted() {
    this.category.id = this.$route.params.id;
    this.loadCategory();
    this.loadArticles();
  },
}
</script>
<style>
  .articles-by-category ul {
    list-style-type: none;
    padding: 0px;
  }

  .articles-by-category .load-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
  }
</style>