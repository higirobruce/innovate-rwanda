<template>
  <div>
    <component :is="layout">
      <div class="overlay">
        <div class="page-info px-5 position-relative">
          <h2 class="h2 font-weight-bold">Subscribers</h2>
        </div>
        <Loading v-if="loading && !loaded" />
        <div class="dash-container" v-if="!loading && loaded">
          <div class="wrap-subscribers">
            <table
              class="table table-responsive-sm"
              v-if="
                (!loading && profile.role === 'admin-user') ||
                profile.role === 'super-admin'
              "
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody v-if="subscribers && Object.keys(subscribers).length">
                <tr v-for="(user, index) in subscribers" :key="index">
                  <td>
                    {{ user.id }}
                  </td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.status || "-" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Loading v-if="loading && !loaded" class="not-found" />
          <div
            v-if="!loading && loaded && noSubscribers"
            class="not-found"
          ></div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import Loading from "@/components/Loading";
export default {
  components: { Loading },
  data() {
    return {
      subscribers: [],
      loading: false,
      loaded: false,
      noSubscribers: false,
    };
  },
  created() {
    this.loading = true;
    this.loadSubscribers();
  },
  methods: {
    loadSubscribers() {
      this.noSubscribers = false;
      this.loading = true;
      this.loaded = false;
      AxiosHelper.get("subscriptions")
        .then((response) => {
          this.subscribers = response.data.result;
          this.loading = false;
          this.loaded = true;
        })
        .catch((error) => {
          this.subscribers = [];
          if (error.response.status === 404 || error.response.status === 400) {
            this.noSubscribers = true;
          }
          this.loading = false;
          this.loaded = false;
        });
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
.wrap-subscribers {
  margin: 0 auto;
  width: 860px;
  display: block;
}
table .form-control {
  background: #f0f2f8;
  border: none !important;
}
.my-account {
  background: #f7f9fc !important;
}
.role-button {
  background: #eff2f7;
  padding: 6px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.role-button img {
  width: 20px;
  padding: 0 4px;
}
.list-check-role {
  padding: 7px 18px;
}
.form-check label {
  cursor: pointer;
}
</style>
