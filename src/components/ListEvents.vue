<template>
  <div class="wrap-blog">
    <div class="row">
      <div
        class="col-sm-12 col-md-6 col-lg-4"
        v-for="(post, index) in events"
        :key="index"
      >
        <div class="wrap-one-event border rounded-md">
          <router-link :to="`event/${post.id}`">
            <div class="one-event-image">
              <img
                v-if="post.flyer"
                :src="`${IMAGE_URL}c_fill,g_center,w_500,h_250/${post.flyer}`"
                :alt="post.title"
                class="rounded-big-img"
              />
              <img
                v-else
                src="@/assets/images/post_placeholder.svg"
                :alt="post.title"
                class="rounded-big-img"
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
                by
                <span class="text-blue">{{ post.category }}</span>
              </span>
              <span class="ml-2"> {{ post.eventTime }} CAT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- START PAGINATION -->
    <!-- <div class="wrap-pagination">
      <button
        type="button"
        :disabled="currentPage < 1"
        @click.prevent="goToPrevious"
      >
        <img src="@/assets/images/left-arrow.png" />
      </button>
      <span
        v-for="(page, index) in allPages"
        :class="`${page === currentPage + 1 ? 'active-page' : ''}`"
        :key="index"
        @click.prevent="goTo(page - 1)"
      >
        {{ page }}
      </span>
      <button
        type="button"
        :disabled="allPages === currentPage + 1"
        @click="goToNext"
      >
        <img src="@/assets/images/right-arrow.png" />
      </button>
    </div> -->
    <!-- END PAGINATION -->
  </div>
</template>

<script>
export default {
  name: "list-events",
  props: ["events"],
  data() {
    return {
      response: [],
      numberOnPage: 3,
      currentPage: 0,
      allPages: 0,
      count: 0,
    };
  },
  created() {
    // console.log("event", this.events);
    // this.count = this.events && this.events.length;
    // this.response = this.events.slice(
    //   this.currentPage,
    //   this.numberOnPage >= this.count ? this.count : this.numberOnPage
    // );
    // this.allPages =
    //   this.count > this.numberOnPage ? this.count / this.numberOnPage : 1;
  },
  methods: {
    filterHtml(str) {
      return `${str.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 200)}...`;
    },
    // goToPrevious() {
    //   this.currentPage = this.currentPage - 1;
    //   this.response = this.events.slice(
    //     this.currentPage,
    //     this.numberOnPage + this.currentPage
    //   );
    // },
    // goToNext() {
    //   this.currentPage = this.currentPage + 1;
    //   this.response = this.events.slice(
    //     this.currentPage,
    //     this.numberOnPage + this.currentPage
    //   );
    // },
    // goTo(page) {
    //   this.currentPage = page;
    //   this.response = this.events.slice(
    //     this.currentPage,
    //     this.numberOnPage + this.currentPage
    //   );
    // },
  },
};
</script>
