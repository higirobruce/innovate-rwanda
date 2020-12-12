<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">Messages</h2>
      </div>
      <div
        class="dash-container"
        v-if="messages && Object.keys(messages).length > 0"
      >
        <div class="wrap-messages">
          <div class="wrap-senders">
            <div class="wrap-search">
              <div class="form-group">
                <input
                  type="text"
                  v-model="search"
                  class="form-control custom-input"
                  placeholder="Search..."
                />
              </div>
            </div>
            <!-- list of senders -->
            <ul class="list-unstyled">
              <li
                v-for="(message, index) in messages"
                :key="index"
                @click="viewMessage(message)"
                :class="`${
                  message.id === activeMessage
                    ? 'media cursor-pointer active'
                    : 'media cursor-pointer'
                }`"
              >
                <img
                  :class="`${
                    message.id === activeMessage
                      ? 'mr-3 avatar active'
                      : 'mr-3 avatar'
                  }`"
                  src="@/assets/images/user-avatar.svg"
                  :alt="message.email"
                />
                <div class="media-body">
                  <h5 class="mt-0 mb-1">{{ message.email }}</h5>
                  {{ message.createdAt | date("DD MMM YYYY") }}
                </div>
              </li>
            </ul>
          </div>
          <div class="wrap-read-message">
            <ReadMessage :message="message" />
          </div>
        </div>
      </div>
      <div v-else class="no-message"></div>
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import ReadMessage from "@/components/ReadMessage";
export default {
  name: "messages",
  components: {
    ReadMessage,
  },
  data() {
    return {
      messages: [],
      search: "",
      message: {},
      activeMessage: 0,
    };
  },
  mounted() {
    const companyId = `${this.profile.companyId}`;
    AxiosHelper.get(`message/company/${companyId}`)
      .then((response) => {
        this.messagesLoaded = true;
        this.messages = response.data.result;
        this.message = response.data.result[0];
        this.activeMessage = response.data.result[0].id;
      })
      .catch(() => {
        this.messagesLoaded = false;
      });
  },
  methods: {
    viewMessage(message) {
      this.message = message;
      this.activeMessage = message.id;
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
.dash-container {
  background: #eeeff3 !important;
}
.wrap-read-message {
  position: relative;
}
.wrap-read-message::before {
  position: absolute;
  width: 1px;
  height: 100%;
  background: #dce0e9;
  content: "";
}
.wrap-messages {
  display: flex;
  flex-direction: row;
  height: 78vh;
}
.wrap-senders {
  width: 450px;
  background: #ffffff !important;
}
.wrap-senders ul {
  height: 65vh;
  overflow-y: auto;
}
.wrap-read-message {
  width: calc(100% - 450px);
}
.wrap-search {
  margin: 30px;
}
.wrap-search input {
  background: #dce0e9;
}
.media img {
  width: 45px;
}
.media {
  padding: 30px 10px;
  border-top: 1px solid #dce0e9;
}
.media:last-child {
  border-bottom: 1px solid #dce0e9;
}
.media.active {
  background: #dce0e9;
}
.avatar.active {
  background: #00aeef;
}
</style>