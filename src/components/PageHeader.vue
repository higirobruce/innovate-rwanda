<template>
  <div
    class="page-header"
    :style="{
      'background-image': 'url(' + require('@/assets/images/' + image) + ')',
    }"
  >
    <div class="page-overlay" :style="{ 'background-color': rgba }"></div>
    <h1>{{ title }}</h1>
    <div>{{ subtitle || "" }}</div>
  </div>
</template>
<script>
export default {
  props: ["title", "image", "rgba", "subtitle"],
};
</script>

<style scoped>
.page-header {
  background-attachment: scroll;
  background-position: center top;
  padding: 100px 0;
  text-align: center;
  position: relative;
  margin-bottom: 120px;
}
.page-header h1{
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
</style>