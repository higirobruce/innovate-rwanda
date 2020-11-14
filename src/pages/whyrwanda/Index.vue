<template>
  <div>
    <component :is="layout">
      <PageHeader
        image="bg-why.png"
        rgba="rgba(0,0, 0, 0.5)"
        title="Why Rwanda"
        subtitle=""
      />
      <div class="container">
        <div class="one-row">
          <div class="image-row">
            <img src="@/assets/images/economic_growth@2x.png" alt="" />
          </div>
          <div class="content-row">
            <h2 class="font-weight-bold h3 text-blue-dark">
              Sustained Economic Growth
            </h2>
            <div>
              Innovate Rwanda was created to showcase Rwanda’s growing ecosystem
              of technology and technology-enabled corporations, SMEs and
              startups and enablers. Innovation and Technology are at the core
              of Rwanda’s strategy for economic and social transformation and
              this platform represents the shared interests of the community to
              connect, collaborate and innovate for growth.
            </div>
          </div>
        </div>
        <div class="one-row content-inverted">
          <div class="image-row">
            <img src="@/assets/images/business_friedly@2x.png" alt="" />
          </div>
          <div class="content-row">
            <h2 class="font-weight-bold h3 text-blue-dark">
              Business Friendly and Modern
            </h2>
            <div>
              Innovate Rwanda was created to showcase Rwanda’s growing ecosystem
              of technology and technology-enabled corporations, SMEs and
              startups and enablers. Innovation and Technology are at the core
              of Rwanda’s strategy for economic and social transformation and
              this platform represents the shared interests of the community to
              connect, collaborate and innovate for growth.
            </div>
          </div>
        </div>
        <div class="one-row">
          <div class="image-row">
            <img src="@/assets/images/stem_talent@2x.png" alt="" />
          </div>
          <div class="content-row">
            <h2 class="font-weight-bold h3 text-blue-dark">
              World Class Pan African Stem Talent
            </h2>
            <div>
              Innovate Rwanda was created to showcase Rwanda’s growing ecosystem
              of technology and technology-enabled corporations, SMEs and
              startups and enablers. Innovation and Technology are at the core
              of Rwanda’s strategy for economic and social transformation and
              this platform represents the shared interests of the community to
              connect, collaborate and innovate for growth.
            </div>
          </div>
        </div>
        <div class="one-row content-inverted">
          <div class="image-row">
            <img src="@/assets/images/economic_growth@2x.png" alt="" />
          </div>
          <div class="content-row">
            <h2 class="font-weight-bold h3 text-blue-dark">
              Proof of Concept Hub
            </h2>
            <div>
              Innovate Rwanda was created to showcase Rwanda’s growing ecosystem
              of technology and technology-enabled corporations, SMEs and
              startups and enablers. Innovation and Technology are at the core
              of Rwanda’s strategy for economic and social transformation and
              this platform represents the shared interests of the community to
              connect, collaborate and innovate for growth.
            </div>
          </div>
        </div>
        <div class="one-row">
          <div class="image-row">
            <img src="@/assets/images/connected_world@2x.png" alt="" />
          </div>
          <div class="content-row">
            <h2 class="font-weight-bold h3 text-blue-dark">
              Open and Connected to The World
            </h2>
            <div>
              Innovate Rwanda was created to showcase Rwanda’s growing ecosystem
              of technology and technology-enabled corporations, SMEs and
              startups and enablers. Innovation and Technology are at the core
              of Rwanda’s strategy for economic and social transformation and
              this platform represents the shared interests of the community to
              connect, collaborate and innovate for growth.
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
@media (min-width: 1025px) {
  .one-row {
    margin: 0 0 40px 0;
    padding: 20px;
    box-shadow: 0px 17px 36px #1b295814;
    border-radius: 3px;
    display: grid;
    grid-template-areas: "image-row content-row";
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: flex-start;
    background: #ffffff;
  }
  .one-row.content-inverted {
    grid-template-areas: "content-row image-row";
  }
  .one-row.content-inverted .content-row {
    text-align: right;
  }
  .image-row {
    grid-area: image-row;
  }
  .content-row {
    grid-area: content-row;
  }
  .image-row img {
    width: 260px;
    margin: 0 auto;
    display: block;
  }
}
@media (max-width: 1024px) {
  .one-row {
    margin: 0 0 40px 0;
    padding: 20px;
    box-shadow: 0px 17px 36px #1b295814;
    border-radius: 3px;
    display: grid;
    grid-template-areas: "image-row "
    "content-row"
    ;
    grid-template-columns: 1fr/1fr;
    align-items: center;
    justify-content: flex-start;
    background: #ffffff;
  }
  .image-row {
    grid-area: image-row;
  }
  .content-row {
    grid-area: content-row;
    text-align: center;
  }
  .content-row h2 {
    margin: 25px 0;
  }
  .image-row img {
    width: 260px;
    margin: 0 auto;
    display: block;
  }
}
</style>