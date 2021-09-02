<template>
  <div>
    <component :is="layout">
      <div class="wrap-choose-section" v-if="!_.isEmpty(types)">
        <h1>Choose a preferred section</h1>
        <div class="row">
          <div
            class="col-sm-12 col-lg-4 col-md-4 one-box"
            v-for="(type, index) in types"
            :key="index"
          >
            <div class="box-image">
              <img
                v-if="type.image"
                :src="`${IMAGE_URL}c_fill,g_center,h_420,w_420/${type.image}`"
                :alt="type.name"
              />
              <img
                v-else
                src="@/assets/images/enablers.svg"
                :alt="type.name"
              />
            </div>
            <h3>{{ type.name }}</h3>
            <div>
              {{ type.description }}
            </div>

            <router-link :to="`/directory/${type.slug}`" class="btn">
              Discover <img src="@/assets/images/arrow-right.png"
            /></router-link>
          </div>
        </div>
      </div>
    </component>
  </div>
</template> 


<script>
import AxiosHelper from "@/helpers/AxiosHelper";
export default {
  name: "institutions",
  data() {
    return {
      types: [],
    };
  },
  created() {
    this.loadCompanyTypes();
  },
  methods: {
    loadCompanyTypes() {
      AxiosHelper.get("company-types")
        .then((response) => {
          this.types = response.data.result;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>
<style scoped>
.wrap-choose-section {
  margin: 25px auto 55px auto;
  max-width: 1100px;
}

.wrap-choose-section h1 {
  color: #00aeef;
  font-size: 48px;
  margin: 32px 0;
  padding: 45px 0;
}
.one-box h3 {
  color: #1b2958;
  font-size: 30px;
  font-weight: 600;
  min-height: 70px;
}
.one-box div {
  height: 80px;
  font-size: 16px;
  font-weight: 200;
}
.one-box .box-image {
  width: 100px;
  height: 130px;
}
.one-box img {
  width: 100%;
  height: auto;
  margin: 0;
}
.one-box .btn {
  border: 2px solid #c0c6d8;
  padding: 13px 56px 13px 36px;
  position: relative;
}
.one-box .btn .icon {
  top: 18px;
  right: 25px;
  position: absolute;
}
.one-box .btn img {
  width: 18px;
  position: absolute;
  right: 18px;
  top: 14px;
}

@media (min-width: 1025px) {
  .one-box {
    margin-bottom: 25px;
    padding: 25px;
  }
}
@media (max-width: 1024px) {
  .wrap-choose-section {
    margin: 0 auto 55px auto;
    padding: 0 30px;
  }
  .wrap-choose-section h1 {
    color: #00aeef;
    font-size: 48px;
    margin: 10px 0;
    padding: 5px 0;
  }
  .one-box {
    margin-bottom: 25px;
    padding: 25px;
    background: #ffffff;
    box-shadow: 0px 17px 36px #1b295814;
  }
  .one-box div {
    height: auto;
    margin-top: 10px;
  }
}
</style>