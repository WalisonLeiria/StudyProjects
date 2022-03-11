<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i><font-awesome-icon icon="fa-solid fa-search" /></i>
      <input type="text" class="filter-field" placeholder="Digite para filtrar..." v-model="treeFilter">
    </div>
    <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree" />
  </aside>
</template>
<script>
import { mapState } from "vuex";
import Tree from "liquor-tree";
import axios from "axios";
import { baseUrl } from "../../global";

export default {
  name: "Menu",
  components: {
    Tree
  },
  computed: mapState(["isMenuVisible"]),
  data: function() {
    return {
      treeFilter: "",
      treeData: this.loadTree(),
      treeOptions: {
        propertyNames: {
          "text": "name"
        },
        filter: {
          emptyText: "Categoria não encontrada!"
        }
      }
    }
  },
  methods: {
    loadTree() {
      const url = `${baseUrl}/categories/tree`;
      return axios.get(url).then(resp => resp.data);
    },
    onNodeSelect(node) {
      this.$router.push({
        name: "articlesByCategory",
        params: {
          id: node.id
        }
      });

      if (this.$mq === "sm" || this.$mq === "xs") {
        this.$store.commit("toggleMenu", false);
      }
    }
  },
  mounted() {
    this.$refs.tree.$on("node:selected", this.onNodeSelect);
  },
}
</script>
<style>
  .menu {
    grid-area: menu;
    background: linear-gradient(to right, #232526, #414345);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .menu input {
    color: #ccc;
    font-size: 1.3rem;
    border: 0;
    outline: 0;
    width: 100%;
    background: transparent;
  }

  .menu a,
  .menu a:hover {
    color: #fff;
    text-decoration: none;
  }

  .menu .menu-filter {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #aaa;
  }

  .menu .menu-filter i {
    font-size: 1.1rem;
    color: #aaa;
    margin-right: 10px;
  }

  /* .filter-field {} */

  .tree-filter-empty {
    color: #ccc;
    font-size: 1.3rem;
    margin-left: 20px;
  }

  .menu .tree-node.selected > .tree-content,
  .menu .tree-node .tree-content:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .tree-arrow.has-child {
    filter: brightness(2);
  }
</style>