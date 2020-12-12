<template>
  <div
    class="page-header-sm"
    :style="{
      'background-image': 'url(' + require('@/assets/images/' + image) + ')',
    }"
  >
    <div class="page-overlay" :style="{ 'background-color': rgba }"></div>
    <h1>{{ title }}</h1>
    <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
  </div>
</template>
<script>
export default {
  props: ["title", "image", "rgba", "subtitle"],
};
</script>

<style scoped>
.page-header-sm {
  background-attachment: scroll;
  background-position: center top;
  padding: 30px 0;
  text-align: center;
  position: relative;
  margin-bottom: 20px;
}
.page-header-sm h1,
.subtitle {
  color: #ffffff;
  position: relative;
  z-index: 5;
}
.page-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.subtitle {
  max-width: 770px;
  margin: 0 auto;
  display: block;
}
</style>