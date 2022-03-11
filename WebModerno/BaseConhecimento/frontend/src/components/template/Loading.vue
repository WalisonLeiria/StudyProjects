<template>
  <div class="loading">
    <h1>Carregando!!!</h1>
  </div>
</template>
<script>
export default {
  name: "Loading"
}
</script>
<style>
  .loading {
    grid-area: content;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>