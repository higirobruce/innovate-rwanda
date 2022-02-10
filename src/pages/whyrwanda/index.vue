<template>
  <div>
    <component :is="layout">
      <PageHeader
        image="bg-why.png"
        rgba="rgba(4, 137, 187, 0.83)"
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
              Rwanda is fast growing, registering an average GDP growth rate of
              7.5% per annum over the decade to 2018 while per capita growth
              domestic product (GDP) grew at 5% annually. This growth has been
              accompanied by substantial improvements in living standards
              including reduced poverty rates and improvements in health
              outcomes.
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
              Rwanda is ranked 2 for Doing Business in Africa and 38 globally by
              the World Bank. Rwanda is recognized as the leading reformer of
              all time (from 150 in 2008 to 38 in 2019) due to continuous
              business improvements. In Rwanda, you can register your business
              online in less than 6 hours and there are no restrictions to
              foreign ownership and profit repatriation.
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
              Rwanda has attracted a pool of pan-African Science, Technology,
              Engineering and Mathematics talent developed locally through the
              presence of world-class institutions and organizations including
              Carnegie Mellon University, the Africa Institute of Mathematical
              Sciences, Africa Leadership University, University of Rwanda,
              Angela, Moringa School and more. These organizations are building
              critical skills in Computer Science, Software Development, Data
              Science, Machine Learning and Intelligence, Cyber Security and
              more.
            </div>
          </div>
        </div>
        <div class="one-row content-inverted">
          <div class="image-row">
            <img src="@/assets/images/proof_of_concept_hub.svg" alt="" />
          </div>
          <div class="content-row">
            <h2 class="font-weight-bold h3 text-blue-dark">
              Proof of Concept Hub
            </h2>
            <div>
              Rwanda has emerged as a test-bed for leading innovations by
              attracting and grooming innovators to test, launch and scale their
              ideas from Rwanda to the rest of the world including AC Group,
              Volkswagen Mobility, Zipline, and Babyl Health.
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
              Rwanda is increasingly open and connected to the world – an
              important element for market access - through a strong and growing
              airline network and its emergence as a preferred destination for
              MICE (Meetings, Incentives, Conferences and Events). Today Rwanda
              ranks 2nd in Africa as a MICE destination. Rwanda also has access
              to global and African markets via strong free trade agreements and
              is ranked highly for visa openness.
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
.content-row {
    text-align: justify;
  }
@media (min-width: 1025px) {
  .one-row {
    margin: 0 0 40px 0;
    padding: 20px;
    box-shadow: 0px 17px 36px #1b295814;
    border-radius: 40px;
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
    border-radius: 40px;
    display: grid;
    grid-template-areas:
      "image-row "
      "content-row";
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