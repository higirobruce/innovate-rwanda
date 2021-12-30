<template>
  <div :class="`${size} loading`"></div>
</template>

<script>
export default {
  name: "LoadingComponent",
  props: ["size"],
};
</script>
  <style scoped>
.loading {
  position: relative;
  height: 250px;
  width: 100%;
  display: flex;
  align-content: center;
}
.loading::before {
  position: absolute;
  content: "";
  border: 4px solid #ffffff;
  border-top: 4px solid #00aeef;
  border-radius: 50%;
  top: calc(50% - 22px);
  left: 0;
  right: 0;
  display: block;
  margin: 0 auto;
  width: 45px;
  height: 45px;
  animation: spin 1.5s linear infinite;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
}
.loading.small {
  height: 100px;
}
.loading.big {
  height: 400px;
}
.loading.big::before {
  border: 8px solid #ffffff;
  border-top: 8px solid #00aeef;
  width: 80px;
  height: 80px;
  top: calc(50% - 40px);
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