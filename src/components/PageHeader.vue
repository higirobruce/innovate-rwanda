<template>
  <div
    class="page-header"
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
