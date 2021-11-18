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
      <div class="home-categories bg-blue-light-1 my-4 py-4">
        <div class="container text-center my-5">
          <h2 class="text-blue-dark font-weight-bold py-3 mb-4">Categories</h2>
          <agile v-if="categories && !_.isEmpty(categories)" :options="options">
            <div
              class="slide"
              v-for="(category, index) in categories"
              :key="index"
            >
              <div class="wrap-cat">
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
            </div>
          </agile>
        </div>
      </div>
      <div class="home-categories my-4 py-4" v-if="events && events.length">
        <div class="container">
          <h2 class="text-blue-dark text-center font-weight-bold py-3">
            Upcoming Events
          </h2>

          <div class="row">
            <div
              class="col-sm-12 col-md-6 col-lg-4"
              v-for="(post, index) in events"
              :key="index"
            >
              <div class="wrap-one-event">
                <router-link :to="`event/${post.id}`">
                  <div class="one-event-image">
                    <img
                      v-if="post.flyer"
                      :src="`${IMAGE_URL}c_fill,g_center,w_500,h_250/${post.flyer}`"
                      :alt="post.title"
                    />
                    <img
                      v-else
                      src="@/assets/images/post_placeholder.svg"
                      :alt="post.title"
                    />
                    <h2>
                      {{ post.title | truncate(58) }}
                    </h2>
                  </div>
                </router-link>
                <div class="post-info">
                  <h3 class="h5 text-blue-dark">
                    <i class="icon-calendar mr-2" />
                    {{ post.eventDate | date("DD MMM YYYY") }}
                  </h3>
                  <div>
                    <span>
                      <span class="text-blue">{{ post.category }}</span>
                    </span>
                    <span class="float-right">
                      <i class="icon-calendar mr-2" />
                      {{ post.eventTime }} CAT</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <router-link
            :to="'/events'"
            class="
              btn btn-home btn-lg
              font-weight-bold
              bg-blue
              text-white
              mt-3
              mr-lg-5
              mt-3
            "
          >
            More events
          </router-link>
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
                <img :src="partnerUrl(partners[num].hover)" />
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
                <img :src="partnerUrl(partners[num].hover)" />
              </router-link>
            </div>
          </div>

          <div class="newsletter-divider my-5"></div>
          <div class="wrap-newsletter mt-5">
            <h5 class="h4 text-center">
              Keep me updated on news, events, and offers from Innovate Rwanda
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
                @click.prevent="subscribeNow"
                type="button"
              >
                <span> Subscribe </span>
              </button>
            </div>
            <div
              v-if="subscribing && !subscribed"
              class="spinner-border"
              role="status"
            >
              <span class="sr-only">Loading...</span>
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
import moment from "moment";
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
      events: [],
      comingEvents: [],
      categories: [],
      partners: {
        0: {
          image: "myict-b.png",
          hover: "myict.png",
          link: "minict.gov.rw",
          isHover: false,
        },
        1: {
          image: "giz-b.png",
          hover: "giz.png",
          link: "giz.de/en/worldwide/332.html",
          isHover: false,
        },
        2: {
          image: "kic-b.png",
          hover: "kic.png",
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
          link: "innovation.rw",
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
      timeNow: "",
      subscribing: false,
      subscribed: false,
      query: "",
      settings: {
        dots: true,
        adaptiveHeight: true,
        arrows: true,
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        swipeToSlide: true,
        centerMode: true,
        centerPadding: "20px",
      },
      options: {
        slidesToShow: 2,
        navButtons: false,
        dots: true,
        autoplaySpeed: 5000,
        speed: 2500,
        infinite: true,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 740,
            settings: {
              slidesToShow: 5,
            },
          },
        ],
      },
    };
  },
  created() {
    AxiosHelper.get("company-categories", this.subscribe).then((response) => {
      this.categories = response.data.result;
    });
    this.timeNow = moment().format("YYYY-MM-DD");
    AxiosHelper.get(`events/public`).then((response) => {
      response.data.result &&
        response.data.result.forEach((event) => {
          if (event.eventDate >= this.timeNow) {
            console.log("comingEvents", event);
            this.events = [...this.events, event];
          }
        });
    });
  },
  methods: {
    showPrev() {
      this.$refs.carousel.prev();
    },
    showNext() {
      this.$refs.carousel.next();
    },
    search() {
      this.$router.push(`/directory?search=${this.query}`);
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
          this.subscribing = false;
          this.subscribe = {
            email: "",
          };
        })
        .catch((error) => {
          if (error.response.status === 409) {
            Vue.$toast.open({
              message: "You have already subscribed",
              type: "warning",
            });
          } else {
            Vue.$toast.open({
              message: "Sorry, something went wrong. try again later!",
              type: "error",
            });
          }
          this.subscribed = false;
          this.subscribing = false;
        });
    },
    // getUpcomingEvents() {
    //   let comingEvents = [];
    //   AxiosHelper.get(`events/public`)
    //     .then((response) => {
    //       this.posts = response.data.result;
    //       this.loaded = true;
    //     })
    //     .catch(() => {
    //       this.loading = false;
    //       this.loaded = true;
    //     });
    //   if (this.posts && this.posts.length > 0) {
    //     this.posts.forEach((event) => {
    //       if (event.eventDate >= this.timeNow) {
    //         comingEvents = [...comingEvents, event];
    //       }
    //     });
    //   }
    //   return comingEvents;
    // },
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
@media screen and (max-width: 424px) {
  .newsletter-form {
    border: none;
    display: block;
  }
  .newsletter-form input {
    width: 100%;
    border: 1px solid #c0c6d8;
  }
  .newsletter-form button {
    float: none;
    display: block;
    margin: 5px auto;
  }
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