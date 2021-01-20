<template>
  <div class="wrap-home-dash">
    <component :is="layout">
      <div class="dash-welcome">
        <div class="welcome-content">
          <h1 class="h2 font-weight-bold text-blue-dark">Welcome</h1>
          <div>
            Innovate Rwanda was created to showcase Rwanda’s growing ecosystem
            of technology and technology-enabled corporations, SMEs and startups
            and enablers. Innovation and Technology are at the core of Rwanda’s
            strategy for economic and social transformation and this platform
            represents the shared interests of the community to connect,
            collaborate and innovate for growth.
          </div>
        </div>
        <div class="welcome-img">
          <img src="@/assets/images/welcome-image.png" />
        </div>
      </div>
      <div
        class="wrap-counters"
        v-if="!_.isEmpty(summary) && profile.role !== 'normal'"
      >
        <div class="row">
          <div class="col-sm-12 col-lg-4">
            <div class="one-counter">
              <router-link :to="'/dashboard/directory'">
                <img src="@/assets/images/counter-companies.png" />
                <h3 class="ml-2">{{ summary.approvedCompaniesCount }}</h3>
                <h4 class="ml-2">Total registered Companies</h4>
              </router-link>
            </div>
          </div>
          <div class="col-sm-12 col-lg-4">
            <div class="one-counter">
              <router-link :to="'/dashboard/users'">
              <img src="@/assets/images/counter-users.png" />
              <h3 class="ml-2">{{ summary.usersCount }}</h3>
              <h4 class="ml-2">Users</h4>
              </router-link>
            </div>
          </div>
          <div class="col-sm-12 col-lg-4">
            <div class="one-counter">
              <router-link :to="'/dashboard/directory'">
              <img src="@/assets/images/counter-pending.png" />
              <h3 class="ml-2">{{ summary.pendingRequestsCount }}</h3>
              <h4 class="ml-2">Pending Registration Requests</h4>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div
        class="wrap-counters"
        v-if="!_.isEmpty(summary) && profile.role === 'normal'"
      >
        <div class="row">
          <div class="col-sm-12 col-lg-4">
            <router-link :to="'/dashboard/content'">
              <div class="one-counter">
                <img src="@/assets/images/counter-companies.png" />
                <h3 class="ml-2">{{ summary.blogs }}</h3>
                <h4 class="ml-2">Blog posted</h4>
              </div>
            </router-link>
          </div>
          <div class="col-sm-12 col-lg-4">
            <router-link :to="'/dashboard/content/events'">
              <div class="one-counter">
                <img src="@/assets/images/counter-users.png" />
                <h3 class="ml-2">{{ summary.events }}</h3>
                <h4 class="ml-2">Events posted</h4>
              </div>
            </router-link>
          </div>
          <div class="col-sm-12 col-lg-4">
            <router-link :to="'/dashboard/content/jobs'">
              <div class="one-counter">
                <img src="@/assets/images/counter-pending.png" />
                <h3 class="ml-2">{{ summary.jobs }}</h3>
                <h4 class="ml-2">Jobs posted</h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      summary: {},
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  created() {
    this.loadingDirectory = true;
    if (this.profile.role === "normal") {
      AxiosHelper.get("countersCo").then((response) => {
        this.summary = response.data.result;
      });
    } else {
      AxiosHelper.get("counters").then((response) => {
        this.summary = response.data.result;
      });
    }
  },
};
</script>

<style scoped>
.wrap-home-dash {
  min-height: 100vh;
}

.welcome-img {
  width: 400px;
}
.wrap-counters {
  width: 100%;
  max-width: 1380px;
  margin: 40px auto;
}
.one-counter {
  padding: 50px;
  box-shadow: 0px 17px 36px #1b295814;
  border-radius: 3px;
}
.one-counter h3 {
  color: #00aeef;
  font-weight: 800;
  font-size: 45px;
}
.one-counter h4 {
  color: #5e7c8d;
  font-size: 22px;
}

@media (min-width: 1025px) {
  .dash-welcome {
    padding: 50px;
    box-shadow: 0px 17px 36px #1b295814;
    border-radius: 3px;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1380px;
    margin: 40px auto;
  }
  .dash-welcome img {
    width: 300px;
    float: right;
  }
  .welcome-content {
    flex: 0 0 calc(100% - 400px);
  }
  .welcome-content div {
    max-width: 580px;
  }
}
@media (max-width: 1024px) {
  .dash-welcome {
    padding: 30px;
    box-shadow: 0px 17px 36px #1b295814;
    border-radius: 3px;
    display: block;
    width: 100%;
    margin: 20px auto;
  }
  .welcome-content {
    width: 100%;
  }
  .welcome-content div {
    width: 100%;
  }
  .dash-welcome img {
    display: none;
  }
}
</style>