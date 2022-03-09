<template>
  <div class="category-admin">
    <b-form>
      <input type="hidden" id="category-id" v-model="category.id">
      <b-row>
        <b-col xs="12">
          <b-form-group label="Nome:" label-for="category-name">
            <b-form-input id="category-name" type="text" v-model="category.name"
              :readonly="mode === 'remove'"
              required placeHolder="Informe o nome da categoria"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Categoria Pai:" label-for="category-parentId">
            <b-form-select id="category-parentId" :options="categories" v-model="category.parentId" />
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
    <b-table hover striped :items="categories" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
          <font-awesome-icon icon="fa-solid fa-pencil" />
        </b-button>
        <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
          <font-awesome-icon icon="fa-solid fa-trash" />
        </b-button>
      </template>
    </b-table>
  </div>
</template>
<script>
import axios from "axios";
import { baseUrl, showError } from "../../global";

export default {
  name: "CategoryAdmin",
  data: function() {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Código", sorteble: true },
        { key: "name", label: "Nome", sorteble: true },
        { key: "path", label: "Caminho", sorteble: true },
        { key: "actions", label: "Ações" },
      ]
    }
  },
  methods: {
    loadCategories() {
      const url = `${baseUrl}/categories`;
      axios.get(url).then(resp => {
        this.categories = resp.data.map(category => {
          return { ...category, value: category.id, text: category.path };
        })
      });
    },
    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = {
        id: category.id,
        name: category.name,
        parentId: category.parentId
      };
    },
    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    },
    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";
      axios[method](`${baseUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.category.id;
      axios.delete(`${baseUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    }
  },
  mounted() {
    this.loadCategories();
  },
}
</script>
<style>
  /* .category-admin {

  } */
</style>