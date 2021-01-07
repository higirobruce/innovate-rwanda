<template>
  <div class="wrap-dash-header">
    <ul class="list-inline my-2 mr-4 py-1 float-right">
      <li
        class="list-inline-item px-1 position-relative"
      >
        <router-link
          class="dash-header-btn dash-notification-badge"
          :to="'/dashboard/messages'"
        >
          <img src="@/assets/images/message.png" />
          <span
            class="notification-badge"
            v-if="number && number.newMessages > 0"
          >
            {{ number && number.newMessages }}
          </span>
        </router-link>
      </li>
      <li
        class="list-inline-item px-1 position-relative"
      >
        <button
          class="dash-header-btn dash-notification-badge"
          @click.prevent="toggleNotifications"
        >
          <img src="@/assets/images/notification.png" />
          <span
            class="notification-badge"
            v-if="number && number.newNotifications > 0"
          >
            {{ number.newNotifications }}
          </span>
        </button>
        <div
          v-if="showNotifications"
          v-on-clickaway="hideNotifications"
          class="wrap-notifications shadow position-absolute"
        >
          <ul class="list-group">
            <li class="list-group-item active">Notifications</li>
            <li
              class="list-group-item one-notification position-relative"
              v-for="(notification, index) in notifications.slice(0,20)"
              :key="index"
            >
              <span class="date">
                {{ notification.createdAt | date("YYYY.MM.DD") }}
              </span>
              <div class="noti-subject">
                {{ notification.subject }}
              </div>
              <div class="noti-content">
                {{ notification.content | truncate(70) }}
              </div>
            </li>
            <li
              class="list-group-item text-center"
            >
              <router-link
                class="text-blue-dark"
                :to="'/dashboard/notifications'"
                >See all notifications</router-link
              >
            </li>
          </ul>
        </div>
      </li>
      <li class="list-inline-item px-1 position-relative">
        <button class="dash-header-user" @click="toggleUserDropDown">
          <div class="image avatar">
            <img src="@/assets/images/user-avatar.png" />
          </div>
        </button>
        <div
          class="card profile-card"
          v-if="isUserDropdownOn"
          v-on-clickaway="hideUserDropDown"
        >
          <div class="card-body">
            <h5 class="card-title">
              {{ profile.lastName }} {{ profile.firstName }}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ profile.email }}</h6>
            <p class="card-text">
              {{ profile.jobTitle || "" }}
            </p>
            <button @click="logout" class="btn border btn-sm bg-white">
              Logout
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  name: "dashboard-header",
  data() {
    return {
      isUserDropdownOn: false,
      notifications: [],
      showNotifications: false,
      number: {},
    };
  },
  created() {
    this.profile && this.profile.companyId && AxiosHelper.get("notification/company").then((response) => {
      this.notifications = response.data.result;
    });
    this.checkNoficationsNumber();
  },
  methods: {
    hideUserDropDown() {
      this.isUserDropdownOn = false;
    },

    toggleUserDropDown() {
      this.isUserDropdownOn = !this.isUserDropdownOn;
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      let notificationsToMarkAsRead = [];
      this.notifications.map((e) => {
        if (e.firstread === null) {
          notificationsToMarkAsRead = [...notificationsToMarkAsRead, e.id];
        }
      });
      const data = {
        notifications: notificationsToMarkAsRead.toString(),
      };
      console.log("hey", data);
      AxiosHelper.put("notification/read", data).then(() => {
        this.checkNoficationsNumber();
      });
      //   .catch(() => {});
    },
    hideNotifications() {
      this.showNotifications = false;
    },
    checkNoficationsNumber() {
      AxiosHelper.get("countsNew")
        .then((res) => {
          this.number = res.data.result;
        })
        .catch(() => {});
    },
    logout() {
      localStorage.removeItem("profile");
      localStorage.removeItem("company");
      localStorage.removeItem("isAuth", true);
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.wrap-dash-header {
  width: 100%;
  background: #f0f2f8;
  height: 60px;
}
.dash-header-btn {
  border: 0;
}
.dash-header-btn img {
  width: 26px;
}
.dash-header-user {
  border: none;
  background: none;
}
.dash-header-user img {
  width: 36px;
}
.profile-card {
  position: absolute;
  top: 40px;
  right: 0;
  width: 280px;
  z-index: 100000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.dash-notification-badge {
  position: relative;
}
.wrap-notifications {
  max-height: 600px;
  overflow-y: auto;
}
.notification-badge {
  position: absolute;
  top: 3px;
  right: -14px;
  font-size: 12px;
  padding-top: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #aa1f1f;
  color: #fff;
  text-align: center;
}
.date {
  position: absolute;
  top: 13px;
  right: 10px;
  font-size: 14px;
  color: #a5a5a5;
}
.list-group-item.active {
  background: #06adef;
  border: none;
}
.noti-subject {
  color: #565656;
  font-size: 16px;
  width: 80%;
}
.noti-content {
  color: #a5a5a5;
  font-size: 14px;
}
.one-notification {
  margin: 10px 15px 10px 15px;
  border: none;
  background: #f0f2f8;
}
</style>
