<template>
  <div class="logs-wrapper">
    <component :is="layout">
      <div class="logs-section">
        <h1 class="logs-title">Activity Log</h1>
        <Loading v-if="loading" />
        <table
          class="table table-responsive-sm"
          v-if="!loading && logs.length > 0"
        >
          <thead>
            <tr>
                <th>Actor</th>
              <th>Description</th>
              <th>Done at</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(log, index) in logs" :key="index">
                <td>
                    <span v-if="!_.isEmpty(log.user)">
                        {{`${log.user.firstName} ${log.user.lastName}`}}
                    </span>
                    <span v-else>---</span>
                </td>
              <td>{{ log.description }}</td>
              <td>{{ moment(log.createdAt).format('llll') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </component>
  </div>
</template>
<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from "@/helpers/isTokenExpired";
import Loading from "@/components/Loading";
export default {
  name: "Logs",
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  data() {
    return {
      logs: [],
      loading: false,
      error: null,
    };
  },
  components: {
    Loading,
  },
  created() {
    this.fetchLogs();
  },
  methods: {
    async fetchLogs() {
      this.loading = true;
      try {
        const { data } = await AxiosHelper.get("logs?limit=100");

        console.log("DDD", data);
        this.logs = data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log({ error });
        if (isTokenExpired(error)) {
          window.location.href = "/login";
        }
      }
    },
  },
};
</script>

<style scoped>
   .logs-section {
       margin: auto 10%;
   }
   .logs-title {
       margin-bottom: 20px;
   }
</style>
