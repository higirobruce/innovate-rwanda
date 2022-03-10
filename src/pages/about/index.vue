<template>
  <div>
    <component :is="layout">
      <PageHeader
        image="bg-why.png"
        rgba="rgba(4, 137, 187, 0.83)"
        title="About us"
        subtitle=""
      />
      <div class="container">
        <div class="wrap-about">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-5 col-xs-12">
              <div class="p-3">
                <div class="image">
                  <img src="@/assets/images/about-rocket.png" />
                </div>
                <h2 class="text-blue-dark h1" style="max-width: 300px">
                  Boosting and growing Rwanda start-ups and the ecosystem
                </h2>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-7 col-xs-12">
              <div class="my-4 py-5">
                Innovate Rwanda also has a refined list of innovation ecosystem
                enablers, who in most cases are corporations, government
                institutions, regulators and other bigger companies that are
                looking to innovate their working models. These enablers can
                both provide income to the start-ups through projects,
                collaborations, access to facilities, access to information and
                capacity building, exposure to real market projects etc.
              </div>
            </div>
          </div>
          <div class="divider my-4"></div>
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-5 col-xs-12">
              <div class="p-3">
                <div class="image">
                  <img src="@/assets/images/about-idea.png" />
                </div>
                <h2 class="text-blue-dark h1" style="max-width: 300px">
                  Innovation for organizations and corporations
                </h2>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-7 col-xs-12">
              <div class="my-4 py-5">
                Innovate Rwanda also has a refined list of innovation ecosystem
                enablers, who in most cases are corporations, government
                institutions, regulators and other bigger companies that are
                looking to innovate their working models. These enablers can
                both provide income to the start-ups through projects,
                collaborations, access to facilities, access to information and
                capacity building, exposure to real market projects etc.
              </div>
            </div>
          </div>
          <div class="divider my-4"></div>
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-5 col-xs-12">
              <div class="p-3">
                <div class="image">
                  <img src="@/assets/images/about-connect.png" />
                </div>
                <h2 class="text-blue-dark h1" style="max-width: 300px">
                  Democratize capital and ecosystem growth
                </h2>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-7 col-xs-12">
              <div class="my-4 py-5">
                The platform has an event, talent acquisition and blog section
                for success stories, intercompany collaboration from the
                platform, pitching access, funding as well as showcase
                possibilities within the Rwandan tech ecosystem. These sections
                are meant to promote collaboration in the Rwandan tech
                ecosystem, the region and abroad
              </div>
            </div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
export default {
  name: "why-rwanda",
  components: {
    PageHeader,
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
.wrap-about {
  background: #ffffff;
  max-width: 1200px;
  margin: 40px auto;
  display: block;
  padding: 60px 40px;
  box-shadow: 0px 17px 36px #1b295814;
}
.wrap-about .divider {
  background: #c0c6d8;
}
.wrap-about h2 {
  font-size: 28px;
}
.wrap-about img {
  width: 80px;
  margin: 10px 0;
}
</style>