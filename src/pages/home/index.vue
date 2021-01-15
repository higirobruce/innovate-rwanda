<template>
  <div class="bg-white">
    <component :is="layout">
      <Welcome />
      <div class="container">
        <!-- What we do -->
        <div class="home-about text-center my-4 py-4">
          <h2 class="text-blue-dark py-3">What We Do</h2>
          <div class="py-4">
            Innovate Rwanda was created to showcase Rwanda’s growing ecosystem
            of technology and technology-enabled corporations, SMEs and startups
            and enablers. Innovation and Technology are at the core of Rwanda’s
            strategy for economic and social transformation and this platform
            represents the shared interests of the community to connect,
            collaborate and innovate for growth.
          </div>
        </div>
        <!-- Why the community -->
        <div class="home-why-join my-4 py-4">
          <h2 class="text-blue-dark text-center font-weight-bold py-3">
            Why Join The Community
          </h2>
          <h5 class="h4 text-center">
            The community is a virtual platform for you to:
          </h5>
          <div class="row my-5">
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div class="media px-4 py-5 rounded">
                <img class="mr-3" src="@/assets/images/join-company.png" />
                <div class="media-body">
                  Profile your company, startup or organization to local and
                  global ecosystem players
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div class="media px-4 py-5 rounded">
                <img class="mr-3" src="@/assets/images/join-partner.png" />
                <div class="media-body">
                  Discover partners, various avenues for support, resources and
                  events
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div class="media px-4 py-5 rounded">
                <img class="mr-3" src="@/assets/images/join-collaborate.svg" />
                <div class="media-body">
                  Connect, collaborate and innovate with other ecosystem players
                  for growth.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Categories -->
      <div class="home-categories bg-blue-light-1 my-4 py-4">
        <div class="container text-center my-5">
          <h2 class="text-blue-dark font-weight-bold py-3 mb-4">Categories</h2>
          <div class="wrap-home-categories">
            <agile :options="options">
              <div
                v-for="(category, index) in categories"
                class="slide one-category"
                :key="index"
              >
                <img
                  v-if="category.image"
                  :src="`${IMAGE_URL}c_fill,g_center,w_1200/${category.image}`"
                  :alt="category.name"
                />
                <img
                  v-else
                  src="@/assets/images/innovate-lamp.png"
                  :alt="category.name"
                />
                <h3>
                  {{ category.name }}
                </h3>
              </div>
            </agile>
          </div>
        </div>
      </div>
      <div class="my-4 py-4">
        <!-- Partners -->
        <div class="container text-center my-5">
          <h2 class="text-blue-dark font-weight-bold py-3">Our Partners</h2>
          <div class="wrap-partners-row-1">
            <div
              class="one-partner"
              v-for="(num, index) in [0, 1, 2]"
              :key="index"
            >
              <router-link :to="`redirect/${partners[num].link}`">
                <img
                  :src="
                    partnerUrl(
                      partners[num].hover
                    )
                  "
                />
              </router-link>
            </div>
          </div>
          <div class="wrap-partners-row-1">
            <div
              class="one-partner"
              v-for="(num, index) in [3, 4, 5, 6]"
              :key="index"
              @mouseover="partnerHoverUrl(num)"
              @mouseout="partnerMouseoutUrl(num)"
            >
              <router-link :to="`redirect/${partners[num].link}`">
                <img
                  :src="
                    partnerUrl(
                     partners[num].hover
                    )
                  "
                />
              </router-link>
            </div>
          </div>

          <div class="newsletter-divider my-5"></div>
          <div class="wrap-newsletter mt-5">
            <h5 class="h4 text-center">
              Keep me updated on news, events, and offers from
            </h5>
            <div class="newsletter-form">
              <input
                type="email"
                name="email"
                v-model.trim="$v.subscribe.email.$model"
                placeholder="Your email address"
              />

              <button
                :disabled="$v.subscribe.email.$invalid"
                @click="subscribeNow"
                type="button"
              >
                Subscribe
              </button>
            </div>
            <div v-if="subscribing && !subscribed">
              <Loading />
            </div>
            <div
              class="text-success text-center"
              v-if="!subscribing && subscribed"
            >
              Thank you for subscribing to our newsletter
            </div>
            <div
              class="text-danger text-center"
              v-if="
                $v.subscribe.email.$dirty &&
                $v.subscribe.email.$invalid &&
                !subscribed
              "
            >
              Provide a valid email
            </div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import { required, email } from "vuelidate/lib/validators";
import Loading from "@/components/Loading";
import Welcome from "@/components/Welcome3";
import { VueAgile } from "vue-agile";

export default {
  name: "home",
  components: {
    Loading,
    agile: VueAgile,
    Welcome,
  },
  data() {
    return {
      categories: [],
      partners: {
        0: {
          image: "myict-b.png",
          hover: "myict.png",
          link: "miniict.gov.rw",
          isHover: false,
        },
        1: {
          image: "giz-b.png",
          hover: "giz.png",
          link: "giz.de",
          isHover: false,
        },
        2: {
          image: "rdb-b.png",
          hover: "rdb.png",
          link: "rdb.rw",
          isHover: false,
        },
        3: {
          image: "dtc-b.png",
          hover: "dtc.png",
          link: "digicenter.rw",
          isHover: false,
        },
        4: {
          image: "jica-b.png",
          hover: "jica.png",
          link: "jica.go.jp",
          isHover: false,
        },
        5: {
          image: "ict_chamber-b.png",
          hover: "ict_chamber.png",
          link: "ictchamber.rw",
          isHover: false,
        },
        6: {
          image: "risa-b.png",
          hover: "risa.png",
          link: "risa.rw",
          isHover: false,
        },
      },
      startingPoint: 0,
      endingPoint: 5,
      selectedPage: 1,
      subscribe: {
        email: "",
        status: "subscribed",
      },
      subscribing: false,
      subscribed: false,
      query: "",
      options: {
        infinite: true,
        slidesToShow: 5,
        initialSlide: 0,
        navButtons: false,
        dots: false,
        autoplay: true,
      },
    };
  },
  created() {
    AxiosHelper.get("company-categories", this.subscribe).then((response) => {
      this.categories = response.data.result;
    });
  },
  methods: {
    search() {
      this.$router.push(`/directory/companies?search=${this.query}`);
    },
    pageOne(start, end) {
      this.startingPoint = start;
      this.endingPoint = end;
      this.selectedPage = 1;
    },
    pageTwo(start, end) {
      this.startingPoint = start;
      this.endingPoint = end;
      this.selectedPage = 2;
    },
    partnerUrl(url) {
      return require(`@/assets/images/${url}`);
    },
    partnerHoverUrl(index) {
      this.partners[index].isHover = true;
    },
    partnerMouseoutUrl(index) {
      this.partners[index].isHover = false;
    },
    subscribeNow() {
      this.subscribing = true;
      this.subscribed = false;
      AxiosHelper.post("subscribe", this.subscribe)
        .then(() => {
          this.subscribed = true;
          this.subscribe = {
            email: "",
          };
        })
        .catch(() => {
          this.subscribed = false;
        });
      this.subscribing = false;
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  validations: {
    subscribe: {
      email: {
        email,
        required,
      },
    },
  },
};
</script>

<style scoped>
@media (min-width: 1025px) {
  .wrap-home-categories {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
}
@media (max-width: 1024px) {
  .wrap-home-categories {
    display: flex;
    flex-wrap: wrap;
  }
}
.home-about {
  max-width: 920px;
  display: block;
  margin: 0 auto;
}
.home-why-join .media {
  box-shadow: 0px 17px 36px #1b295814;
  font-size: 20px;
  display: flex;

  align-items: center;
  justify-content: flex-start;
}

.wrap-partners-row-1 {
  margin: 0 auto;
  max-width: 900px;
  display: flex;
}
.one-partner {
  padding: 15px;
  cursor: pointer;
}
.one-partner:hover {
  opacity: 0.5;
}
.one-partner img {
  width: 100%;
}
.wrap-newsletter {
  margin: 15px 0;
  margin: 0 auto;
  max-width: 860px;
}
.newsletter-form {
  margin: 25px 0;
  background: transparent;
  border: 1px solid #c0c6d8;
  border-radius: 3px;
  padding: 3px;
  width: 100%;
  display: grid;
  grid-template-areas: "search-input search-button";
  grid-template-columns: 5fr 1fr;
  grid-gap: 5px;
}
.newsletter-form input {
  grid-area: search-input;
  background: transparent;
  padding: 14px 25px;
  border: none;
}
.newsletter-form button {
  grid-area: search-button;
  color: #00aeef;
  background: #ffffff;
  border: 2px solid #00aeef;
  padding: 10px 22px;
  font-weight: 800;
  border-radius: 3px;
}
.newsletter-divider {
  background: #c0c6d8;
  height: 1px;
}
.wrap-dots {
  margin: 0 auto;
  display: block;
  width: 200px;
}
.wrap-dots button {
  margin: 0 5px;
  width: 24px;
  height: 24px;
  background: #ffffff;
  border: 1px solid #00aeef !important;
  opacity: 1;
  border-radius: 50%;
  border: none;
}
.wrap-dots button.active {
  background: #00aeef;
}
.wrap-dots button:hover {
  opacity: 0.5;
}
</style>