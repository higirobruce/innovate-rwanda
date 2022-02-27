<template>
  <div class="wrap-home-dash">
    <component :is="layout">
      <div class="wrap-body-dash">
        <div
          class="wrap-messages"
          v-if="
            company && company.company && company.company.status === 'declined'
          "
        >
          <div class="alert alert-warning shadow-sm">
            The registration of company "{{ company.company.coName }}" was
            declined. Go to
            <router-link
              class="font-weight-bold text-blue-dark"
              :to="`/dashboard/company/${company.company.id}`"
              >My Profile</router-link
            >
            for more information
          </div>
        </div>
        <div class="dash-welcome">
          <div class="welcome-content">
            <h1 class="h2 font-weight-bold text-blue-dark">Welcome</h1>
            <div>
              Innovate Rwanda was created to showcase Rwanda’s growing ecosystem
              of technology and technology-enabled corporations, SMEs and
              startups and enablers. Innovation and Technology are at the core
              of Rwanda’s strategy for economic and social transformation and
              this platform represents the shared interests of the community to
              connect, collaborate and innovate for growth.
            </div>
          </div>
          <div class="welcome-img">
            <img src="@/assets/images/welcome-image.png" />
          </div>
        </div>
        <Loading v-if="loading && !loaded" />
        <div
          class="wrap-counters"
          v-if="!_.isEmpty(summary) && profile.role !== 'normal'"
        >
          <div class="row">
            <div class="col-sm-12 col-lg-3">
              <div class="one-counter">
                <router-link :to="'/dashboard/directory'">
                  <img src="@/assets/images/counter-companies.png" />
                  <h3 class="ml-2">{{ summary.approvedCompaniesCount }}</h3>
                  <div class="counter-description">
                    Total registered Companies
                  </div>
                </router-link>
              </div>
            </div>
            <div class="col-sm-12 col-lg-3">
              <div class="one-counter">
                <router-link :to="'/dashboard/users'">
                  <img src="@/assets/images/counter-users.png" />
                  <h3 class="ml-2">{{ summary.usersCount }}</h3>
                  <div class="counter-description">Users</div>
                </router-link>
              </div>
            </div>
            <div class="col-sm-12 col-lg-3">
              <div class="one-counter">
                <router-link :to="'/dashboard/directory'">
                  <img src="@/assets/images/counter-pending.png" />
                  <h3 class="ml-2">{{ summary.pendingRequestsCount }}</h3>
                  <div class="counter-description">
                    Pending Registration Requests
                  </div>
                </router-link>
              </div>
            </div>
            <div class="col-sm-12 col-lg-3">
              <div class="one-counter">
                <router-link :to="'/dashboard/directory'">
                  <img src="@/assets/images/counter-startups.png" />
                  <h3 class="ml-2">{{ summary.startupsCount }}</h3>
                  <div class="counter-description">Startups/Companies</div>
                </router-link>
              </div>
            </div>
            <div class="col-sm-12 col-lg-3">
              <div class="one-counter">
                <router-link :to="'/dashboard/directory'">
                  <img src="@/assets/images/counter-enablers.png" />
                  <h3 class="ml-2">{{ summary.enablersCount }}</h3>
                  <div class="counter-description">Ecosystem Enablers</div>
                </router-link>
              </div>
            </div>
            <div class="col-sm-12 col-lg-3">
              <div class="one-counter">
                <router-link :to="'/dashboard/directory'">
                  <img src="@/assets/images/counter-govs.png" />
                  <h3 class="ml-2">{{ summary.govInstitutionsCount }}</h3>
                  <div class="counter-description">Government Institutions</div>
                </router-link>
              </div>
            </div>
            <div class="col-sm-12 col-lg-3">
              <div class="one-counter">
                <router-link :to="'/dashboard/subscribers'">
                  <img src="@/assets/images/counter-subscribers.png" />
                  <h3 class="ml-2">{{ summary.subscribersCount }}</h3>
                  <div class="counter-description">Subscribers</div>
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
                  <div class="counter-description">Blog posted</div>
                </div>
              </router-link>
            </div>
            <div class="col-sm-12 col-lg-4">
              <router-link :to="'/dashboard/content/events'">
                <div class="one-counter">
                  <img src="@/assets/images/counter-users.png" />
                  <h3 class="ml-2">{{ summary.events }}</h3>
                  <div class="counter-description">Events posted</div>
                </div>
              </router-link>
            </div>
            <div class="col-sm-12 col-lg-4">
              <router-link :to="'/dashboard/content/jobs'">
                <div class="one-counter">
                  <img src="@/assets/images/counter-pending.png" />
                  <h3 class="ml-2">{{ summary.jobs }}</h3>
                  <div class="counter-description">Jobs posted</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
import Loading from "@/components/Loading";
export default {
  name: "dashboard-overview",
  components: {
    Loading,
  },
  data() {
    return {
      summary: {},
      company: {},
      companyId: null,
      loading: false,
      loaded: false,
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  mounted() {
    this.loadCompanyInfo();
  },
  methods: {
    loadCompanyInfo() {
      this.companyId &&
        AxiosHelper.get(`company/${this.companyId}`).then((response) => {
          this.company = response.data.result;
        });
    },
  },
  created() {
    this.companyId = (this.profile && this.profile.companyId) || null;
    this.loadingDirectory = true;

    this.loading = true;
    this.loaded = false;
    if (this.profile.role === "normal") {
      AxiosHelper.get("countersCo")
        .then((response) => {
          this.summary = response.data.result;
          this.loading = false;
          this.loaded = true;
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.loading = false;
          this.loaded = false;
        });
    } else {
      AxiosHelper.get("counters")
        .then((response) => {
          this.summary = response.data.result;
          this.loading = false;
          this.loaded = true;
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.loading = false;
          this.loaded = false;
        });
    }
  },
};
</script>

<style scoped>
.wrap-body-dash {
  background: #eff2f7 !important;
}
.wrap-home-dash {
  min-height: 100vh;
  background: #eff2f7 !important;
}
.welcome-img {
  width: 400px;
}
.wrap-messages {
  width: 100%;
  max-width: 1380px;
  margin: 20px auto 0 auto;
  display: block;
}
.wrap-counters {
  width: 90%;
  max-width: 1200px;
  margin: 20px auto 40px auto;
  background: #eff2f7 !important;
}
.one-counter {
  padding: 15px;
  border-radius: 15px;
  background: #ffffff;
  margin-bottom: 20px;
}
.one-counter img {
  width: 50px;
  height: 50px;
}
.one-counter h3 {
  color: #00aeef;
  font-weight: 800;
  font-size: 40px;
}
.one-counter .counter-description {
  color: #5e7c8d;
  font-weight: normal;
  font-size: 16px;
}
.dash-welcome {
  width: 90%;
  max-width: 1200px;
  border-radius: 15px;
  /* max-width: 1024px; */
  background: #ffffff;
  margin: 20px auto !important;
}
@media (min-width: 1025px) {
  .dash-welcome {
    padding: 40px;
    /* box-shadow: 0px 17px 36px #1b295814; */
    display: flex;
    align-items: center;
    /* width: 100%; */
    /* max-width: 1380px; */
    margin: 20px auto 30px auto;
  }
  .dash-welcome img {
    width: 300px;
    float: right;
  }
  .welcome-content {
    flex: 0 0 calc(100% - 400px);
  }
  .welcome-content div {
    max-width: 670px;
  }
}
@media (max-width: 1024px) {
  .dash-welcome {
    padding: 30px;
    box-shadow: 0px 17px 36px #1b295814;
    display: block;
    /* width: 100%; */
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