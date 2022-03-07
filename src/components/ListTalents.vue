<template>
  <div class="wrap-users">
    <div class="row one-company" v-for="(user, index) in users" :key="index">
      <div class="col-sm-12 col-md-4 col-lg-2">
        <div class="company-logo">
          <img
            v-if="user && user.picture"
            :src="`${IMAGE_URL}c_fill,g_center,h_120,w_120/${user.picture}`"
            :alt="user.lastName"
          />
          <img
            v-else
            src="@/assets/images/logos_placeholder.png"
            :alt="user.coName"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-8 col-lg-10">
        <h2>{{ user.lastName }} {{ user.firstName }}</h2>
        <div>
          <div class="mb-2 co-info" v-if="user.location">
            <i class="icon-marker-stroked" />
            <span class="ml-2">{{ user.location }} </span>
          </div>
          <div class="mb-2 co-info">
            <i class="icon-tag-1" />
            <span class="ml-2" v-if="user.accType === 'mentor'">Mentor</span>
            <span class="ml-2" v-if="user.accType === 'volunteer'"
              >Volunteer</span
            >
            <span class="ml-2" v-if="user.accType === 'profession'"
              >Open for opportunities
            </span>
          </div>
          <!-- <div class="mb-2 co-info">
              <i class="icon-calendar" />
              <span class="ml-2">{{ user.BusinessActivity.name }} </span>
            </div> -->
          <div class="mb-2 co-info">
            <i class="icon-linkedin" />
            <a
              class="text-blue-dark link-social"
              :href="`${user.linkedin}`"
              target="_blank"
              v-if="user.linkedin"
            >
              <!-- <router-link class="text-blue-dark" :to="`blog/${user.slug}`"> -->
              LinkedIn
            </a>
            {{ " | " }}
             <i class="icon-world" />
            <a
              class="text-blue-dark link-social"
              :href="`${user.portfolio}`"
              target="_blank"
              v-if="user.portfolio"
            >
              <!-- <router-link class="text-blue-dark" :to="`blog/${user.slug}`"> -->
              Portfolio
            </a>
          </div>
          <div class="mb-2 co-info" v-if="user.shortDescription">
            <i class="icon-comment" />
            <span class="ml-2"
              >{{ user.shortDescription | truncate(300) }}
            </span>
          </div>
        </div>
      </div>
      <div class="info-separator clear my-3">&nbsp;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-users",
  props: ["users"],
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
    let remainder = 0;
    this.count = this.users && this.users.length;
    this.response = this.users.slice(
      this.currentPage,
      this.numberOnPage >= this.count ? this.count : this.numberOnPage
    );
    remainder = this.count % this.numberOnPage;
    if (this.count < this.numberOnPage) {
      this.allPages = 1;
    } else if (remainder === 0) {
      this.allPages = this.count / this.numberOnPage;
    } else {
      this.allPages = Math.floor(this.count / this.numberOnPage) + 1;
    }
  },
  methods: {
    // goToPrevious() {
    //   this.currentPage = this.currentPage - 1;
    //   this.response = this.users.slice(
    //     this.currentPage,
    //     this.numberOnPage + this.currentPage
    //   );
    // },
    // goToNext() {
    //   this.currentPage = this.currentPage + 1;
    //   this.response = this.users.slice(
    //     this.currentPage,
    //     this.numberOnPage + this.currentPage
    //   );
    // },
    goTo(page) {
      this.currentPage = page;
      this.response = this.users.slice(
        this.currentPage,
        this.numberOnPage + this.currentPage
      );
    },
  },
};
</script>

<style scoped>
.wrap-users {
  padding: 40px 0;
  box-shadow: 0px 17px 36px #1b295814;
  /* border-radius: 3px; */
  border-radius: 40px;
  margin: 0 auto;
  max-width: 1200px;
  background: #ffffff;
  margin-bottom: 40px;
}
.one-company {
  margin: 25px 0;
}
.company-logo {
  margin: 25px;
  border-radius: 4px;
}
.company-logo img {
  max-width: 140px;
  border-radius: 4px;
}
.one-company h2 {
  margin: 16px 0;
  font-size: 22px;
  font-weight: 900;
  color: #1b2958;
}

.link-social:hover {
  text-decoration: underline;
}
</style>
