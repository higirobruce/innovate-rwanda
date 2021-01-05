<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">Messages</h2>
      </div>
      <div class="dash-container" v-if="messages && profile && profile.role === 'normal'">
        <div class="wrap-messages">
          <div class="wrap-senders">
            <div class="wrap-search">
              <div class="form-group">
                <input
                  type="text"
                  v-model="search"
                  @input="searching($event)"
                  class="form-control custom-input"
                  placeholder="Search..."
                />
              </div>
            </div>
            <!-- list of senders -->

            <ul class="list-unstyled" v-if="!_.isEmpty(messages)">
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
            <div v-if="!_.isEmpty(message)">
              <ReadMessage :message="message" />
            </div>
            <div v-else class="no-search-message"></div>
          </div>
        </div>
      </div>
      <div v-else class="not-allowed"></div>
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
      searches: [],
      search: "",
      message: {},
      activeMessage: 0,
      seached: false,
      companyId: "",
    };
  },
  mounted() {
    this.loadMessages();
  },
  methods: {
    loadMessages() {
      this.companyId = `${this.profile.companyId}`;
      AxiosHelper.get(`message/company/${this.companyId}`)
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
    viewMessage(message) {
      this.message = message;
      this.activeMessage = message.id;
    },
    searching(e) {
      this.searches = [];
      this.seached = true;
      if (this._.size(e.target.value)) {
        Object.values(this.messages).some((item) => {
          if (
            item.message.toLowerCase().includes(e.target.value.toLowerCase())
          ) {
            this.searches = [...this.searches, item];
          }
        });
        if (this._.isEmpty(this.searches)) this.message = {};
        this.messages = this.searches;
      } else {
        this.loadMessages();
      }
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
  background: #f0f2f8;
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