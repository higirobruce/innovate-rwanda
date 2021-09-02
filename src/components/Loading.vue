<template>
  <div class="loading"></div>
</template>

<style scoped>
.loading {
  border: 4px solid #ffffff;
  border-top: 4px solid #00aeef;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin: 20px auto;
  display: block;
  animation: spin 1.5s linear infinite;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>