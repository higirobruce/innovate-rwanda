<template>
  <div class="bg-white">
    <component :is="layout">
      <div class="container">
        <!-- welcome to innovate -->
        <div class="welcome-screen text-sm-center text-md-center text-lg-left">
          <div class="welcome-info">
            <h1 class="text-blue-dark mb-4">
              Bringing Rwanda's Innovation Community Together
            </h1>
            <router-link
              :to="'/join'"
              class="btn btn-lg font-weight-bold btn-primary-outline mt-3 mr-lg-5 mt-3"
            >
              Join the community
            </router-link>
            <button
              class="btn btn-lg font-weight-bold btn-secondary-outline mt-3"
            >
              Learn more
            </button>
            <div class="clear"></div>
            <form @submit="search" class="home-search my-4">
              <input
                v-model="query"
                type="text"
                placeholder="Search the directory..."
              />
              <button
                type="submit"
                :disabled="_.isEmpty(query)"
                @click.prevent="search"
                class="btn btn-transparent"
              >
                <img src="@/assets/images/search.png" alt="Search" />
              </button>
            </form>
          </div>
          <div class="innovate-bg">
            <img src="@/assets/images/bg-welcome-innovate.png" alt="Innovate" />
          </div>
        </div>
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
            <div
              v-for="(category, index) in categories.slice(
                startingPoint,
                endingPoint
              )"
              class="one-category"
              :style="{ borderColor: category.color }"
              :key="index"
            >
              <img :src="category.icon" :alt="category.name" />
              <h3>
                {{ category.name }}
              </h3>
            </div>
            <div class="wrap-dots">
              <button
                :class="{ active: selectedPage === 1 }"
                @click="pageOne(0, 5)"
              ></button>
              <button
                :class="{ active: selectedPage === 2 }"
                @click="pageTwo(5, 10)"
              ></button>
            </div>
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
              @mouseover="partnerHoverUrl(num)"
              @mouseout="partnerMouseoutUrl(num)"
            >
              <img
                :src="
                  partnerUrl(
                    partners[num].isHover
                      ? partners[num].hover
                      : partners[num].image
                  )
                "
              />
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
              <img
                :src="
                  partnerUrl(
                    partners[num].isHover
                      ? partners[num].hover
                      : partners[num].image
                  )
                "
              />
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

export default {
  name: "home",
  components: {
    Loading,
  },
  data() {
    return {
      categories: [
        {
          name: "Tech companies",
          icon: require("@/assets/images/cat-companies.svg"),
          color: "#00AEEF",
        },
        {
          name: "Co-working spaces",
          icon: require("@/assets/images/cat-space.svg"),
          color: "#EF8700",
        },
        {
          name: "Business networks",
          icon: require("@/assets/images/cat-network.svg"),
          color: "#0066AB",
        },
        {
          name: "Accelerators",
          icon: require("@/assets/images/cat-accelerator.svg"),
          color: "#C82027",
        },
        {
          name: "Government agencies",
          icon: require("@/assets/images/cat-gov.svg"),
          color: "#009040",
        },
        {
          name: "Ecosystem builders",
          icon: require("@/assets/images/cat-gov.svg"),
          color: "#45454",
        },
        {
          name: "Financer/Investors",
          icon: require("@/assets/images/cat-gov.svg"),
          color: "#45454",
        },
        {
          name: "Academic/Research institutions",
          icon: require("@/assets/images/cat-gov.svg"),
          color: "#45454",
        },
        {
          name: "Incubators",
          icon: require("@/assets/images/cat-gov.svg"),
          color: "#45454",
        },
        {
          name: "Talent Development",
          icon: require("@/assets/images/cat-gov.svg"),
          color: "#45454",
        },
      ],
      partners: {
        0: {
          image: "myict-b.png",
          hover: "myict.png",
          isHover: false,
        },
        1: {
          image: "giz-b.png",
          hover: "giz.png",
          isHover: false,
        },
        2: {
          image: "rdb-b.png",
          hover: "rdb.png",
          isHover: false,
        },
        3: {
          image: "dtc-b.png",
          hover: "dtc.png",
          isHover: false,
        },
        4: {
          image: "jica-b.png",
          hover: "jica.png",
          isHover: false,
        },
        5: {
          image: "ict_chamber-b.png",
          hover: "ict_chamber.png",
          isHover: false,
        },
        6: {
          image: "risa-b.png",
          hover: "risa.png",
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
    };
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
  .welcome-screen {
    height: 800px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    z-index: 0;
  }
  .innovate-bg {
    width: 1350px;
    position: absolute;
    right: -90px;
    bottom: 0;
    z-index: -1;
  }
  .innovate-bg img {
    position: relative;
    right: -10px;
    width: 100%;
  }
  .wrap-home-categories {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .one-category {
    padding: 25px 0 10px 0;
    border-width: 2px;
    border-style: solid;
    width: calc(20% - 20px);
    border-radius: 3px;
  }
}
@media (max-width: 1024px) {
  .welcome-screen {
    text-align: center;
  }
  .welcome-info {
    padding: 35px 0 0 0;
  }
  .innovate-bg {
    width: 100%;
    position: relative;
  }
  .innovate-bg img {
    position: relative;
    left: -70px;
    width: 100%;
    margin: 0 auto;
    display: block;
  }
  .wrap-home-categories {
    display: flex;
    flex-wrap: wrap;
  }
  .one-category {
    padding: 25px 0 10px 0;
    border-width: 2px;
    margin-bottom: 25px;
    border-style: solid;
    width: calc(100%);
    border-radius: 3px;
  }
}
.welcome-screen {
  width: 100%;
}
.welcome-info {
  width: 100%;
  max-width: 900px;
}
.home-search {
  background: #f0f2f8;
  padding: 3px 6px;
  width: 100%;
  max-width: 496px;
  display: grid;
  grid-template-areas: "search-input search-button";
  grid-template-columns: 5fr 1fr;
  grid-gap: 5px;
}
.home-search input {
  grid-area: search-input;
  background: transparent;
  padding: 3px 15px;
  border: none;
}
.home-search input::placeholder {
  color: #c0c6d8;
}
.home-search button {
  grid-area: search-button;
  width: 80px;
  padding: 5px 0;
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

.one-category img {
  display: block;
  max-width: 90px;
  margin: 5px auto;
  height: 100px;
}
.one-category h3 {
  padding: 10px 0;
  font-size: 23px;
  font-weight: 700;
  height: 65px;
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