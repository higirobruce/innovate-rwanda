<template>
  <div>
    <component :is="layout">
      <div class="page-info">
        <h2 class="h2 font-weight-bold">Notifications</h2>
      </div>
      <div class="dash-container">
        <div class="wrap-dash-box">
          <div v-if="loading">
            <Loading />
          </div>
          <ul
            v-if="!loading && notifications"
            class="list-group list-group-flush"
          >
            <li
              class="list-group-item wrap-notification py-4"
              v-for="(notification, index) in notifications"
              :key="index"
            >
              <img src="@/assets/images/notification.png" />
              <div class="noti-content">
                <h3 class="h5 font-weight-light text-blue">
                  {{ notification.subject }}
                </h3>
                <div>
                  {{ notification.content }}
                </div>
                <div class="text-danger">
                  <span>
                    {{ notification.createdAt | date("MMM DD, YY") }}
                  </span>
                  <span v-if="notification.linkForMore" class="float-right">
                    <router-link :to="`/${notification.linkForMore}`">Read more</router-link>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import MenuSettings from "@/components/MenuSettings";
import AxiosHelper from "@/helpers/AxiosHelper";
import DeleteModal from "@/components/DeleteModal";
import Loading from "@/components/Loading";

import VModal from "vue-js-modal";
Vue.use(VModal);
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "dashboard-notifications",
  components: { MenuSettings, DeleteModal, Loading },
  data() {
    return {
      notifications: [],
      recordId: "",
      form: {
        name: "",
      },
      activity: {},
      loading: true,
      added: false,
      adding: false,
      editing: false,
      edited: false,
    };
  },
  created() {
    this.loadBusinessActivities();
    this.profile &&
      this.profile.companyId &&
      AxiosHelper.get("notification/company").then((response) => {
        this.notifications = response.data.result;
      });
  },
  methods: {
    submitEditActivity() {
      this.edited = false;
      this.editing = true;
      AxiosHelper.patch("business-activities/edit-activity", this.activity)
        .then(() => {
          Vue.$toast.open({
            message: "Business activity has been edited successfully",
            type: "success",
          });
          this.loadBusinessActivities();
          this.edited = true;
          this.editing = false;
          this.$modal.hide("openEditActivity");
        })
        .catch(() => {
          this.editing = false;
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while updating a business activity",
            type: "error",
          });
        });
    },
    submitActivity() {
      this.added = false;
      this.adding = true;
      AxiosHelper.post("business-activities/add-activity", this.form)
        .then(() => {
          Vue.$toast.open({
            message: "Business activity has been added successfully",
            type: "success",
          });
          this.loadBusinessActivities();
          this.added = true;
          this.adding = false;
          this.$modal.hide("openAddActivity");
        })
        .catch(() => {
          this.adding = false;
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while creating a business activity",
            type: "error",
          });
        });
    },
    loadBusinessActivities() {
      AxiosHelper.get("business-activities")
        .then((response) => {
          this.listOfBusinessActivities = response.data.result;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    deleteRecord(id) {
      this.recordId = id;
      this.$modal.show("openDeleteRecord");
    },
    addActivity() {
      this.$modal.show("openAddActivity");
    },
    editActivity(act) {
      this.activity = act;
      this.$modal.show("openEditActivity");
    },
    closeModal() {
      this.$modal.hide("openAddActivity");
      this.$modal.hide("openEditActivity");
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
    },
    activity: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
    },
  },
};
</script>

<style scoped>
.wrap-notification {
  display: flex;
}
.wrap-notification img {
  height: 30px;
  width: 25px;
  margin: 5px 40px 0 0;
}
</style>
