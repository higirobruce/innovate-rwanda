<template>
  <div>
    <component :is="layout">
      <div class="page-info">
        <h2 class="h2 font-weight-bold">Settings</h2>
        <MenuSettings active="activities" />
        <div class="clear" />
        <br />
      </div>
      <div class="dash-container">
        <div class="wrap-dash-box">
          <h1 class="font-weight-light text-blue-dark h3">
            Business activities
            <span class="float-right">
              <button
                class="btn btn-sm font-weight-bold btn-primary-outline"
                @click.prevent="addActivity"
                type="button"
              >
                Add
              </button>
            </span>
          </h1>
          <div class="clear"></div>
          <div v-if="loading">
            <Loading />
          </div>
          <ul
            v-if="!loading && listOfBusinessActivities"
            class="list-group list-group-flush"
          >
            <li
              class="list-group-item py-4 px-0"
              v-for="(act, index) in listOfBusinessActivities"
              :key="index"
            >
              {{ act.name }}
              <span class="float-right wrap-actions">
                <button type="button" @click.prevent="editActivity(act)">
                  <img src="@/assets/images/edit.png" alt="edit" />
                </button>
                <button @click.prevent="deleteRecord(act.id)">
                  <img src="@/assets/images/delete.png" alt="delete" />
                </button>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- DELETE ACTIVITY -->
      <modal
        name="openDeleteRecord"
        :adaptive="true"
        :scrollable="true"
        :height="240"
        :width="600"
      >
        <button type="button" @click.prevent="closeModal" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <DeleteModal
          :url="`business-activities/remove-activity?activityId=${recordId}`"
          entity="activity"
        />
      </modal>
      <!-- ADD NEW ACTIVITY -->
      <modal
        name="openAddActivity"
        :adaptive="true"
        :scrollable="true"
        :height="340"
        :width="600"
      >
        <button type="button" @click.prevent="closeModal" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <h3 class="p-4">Create business activity</h3>
        <div class="m-4">
          <form @submit="submitActivity">
            <h4 class="mt-3">Activity name</h4>
            <div
              :class="`${
                $v.form.$invalid === true
                  ? 'form-group has-error'
                  : 'form-group'
              }`"
            >
              <input
                type="text"
                v-model="form.name"
                required
                class="form-control custom-input"
                placeholder="Activity name"
              />
            </div>
          </form>
        </div>
        <div class="my-2 mx-4">
          <span class="float-left">
            <button
              @click="submitActivity"
              class="btn btn-success-outline float-right"
            >
              Submit
            </button>
          </span>
          <span class="float-right">
            <button @click="closeModal" class="btn btn-gray-outline mr-2">
              Close
            </button>
          </span>
          <Loading v-if="adding && !added" />
        </div>
      </modal>
      <!-- EDIT ACTIVITY -->
      <modal
        name="openEditActivity"
        :adaptive="true"
        :scrollable="true"
        :height="340"
        :width="600"
      >
        <button type="button" @click.prevent="closeModal" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <h3 class="p-4">Edit business activity</h3>

        <div class="m-4">
          <form @submit="submitEditActivity">
            <h4 class="mt-3">Activity name</h4>
            <div
              :class="`${
                $v.activity.$invalid === true
                  ? 'form-group has-error'
                  : 'form-group'
              }`"
            >
              <input
                type="text"
                v-model="activity.name"
                required
                class="form-control custom-input"
                placeholder="Activity name"
              />
            </div>
          </form>
        </div>
        <div class="my-2 mx-4">
          <span class="float-left">
            <button
              @click="submitEditActivity"
              class="btn btn-success-outline float-right"
            >
              Submit
            </button>
          </span>
          <span class="float-right">
            <button @click="closeModal" class="btn btn-gray-outline mr-2">
              Close
            </button>
          </span>
          <Loading v-if="editing && !edited" />
        </div>
      </modal>
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
  name: "dashboard",
  components: { MenuSettings, DeleteModal, Loading },
  data() {
    return {
      listOfBusinessActivities: [],
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
              "Sorry, something went wrong while updating your social media accounts",
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
              "Sorry, something went wrong while updating your social media accounts",
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

<style scoped></style>
