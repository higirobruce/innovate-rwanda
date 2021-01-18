<template>
  <div>
    <component :is="layout">
      <div class="page-info">
        <h2 class="h2 font-weight-bold">Settings</h2>
        <MenuSettings active="type" />
      </div>
      <div class="dash-container">
        <div class="wrap-dash-box">
          <h1 class="font-weight-light text-blue-dark h3">
            Company/Institution types
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
          <ul v-if="!loading && types" class="list-group list-group-flush">
            <li
              class="list-group-item py-4 px-0"
              v-for="(act, index) in types"
              :key="index"
            >
              <div>
                <h4 class="h5 p-0 m-0">
                  {{ act.name }}
                </h4>
                <div>{{ act.name }}</div>
              </div>
              <span class="float-right wrap-actions">
                <button type="button" @click.prevent="editType(act)">
                  <img src="@/assets/images/edit.png" alt="edit" />
                </button>
                <button @click.prevent="deleteRecord(act.id)">
                  <img src="@/assets/images/delete.png" alt="delete" />
                </button>
              </span>
            </li>
            <li
              v-if="!loading && _.size(types) === 0"
              class="list-group-item px-1 py-4"
            >
              No type yet
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
        <DeleteModal
          :url="`company-types/remove-type?type=${recordId}`"
          entity="company type"
        />
      </modal>
      <!-- ADD NEW ACTIVITY -->
      <modal
        name="openAddActivity"
        :adaptive="true"
        :scrollable="true"
        :height="440"
        :width="600"
      >
        <h3 class="p-4 bottom-shadow shadow">Create company type</h3>
        <div class="m-4">
          <form @submit="submitType">
            <h4 class="mt-3">Institution type</h4>
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
                placeholder="Institution type..."
              />
            </div>
            <h4 class="mt-3">Description</h4>
            <div
              :class="`${
                $v.form.$invalid === true
                  ? 'form-group has-error'
                  : 'form-group'
              }`"
            >
              <input
                type="text"
                v-model="form.description"
                required
                class="form-control custom-input"
                placeholder="Typp description..."
              />
            </div>
          </form>
        </div>
        <div class="my-2 mx-4">
          <span class="float-left">
            <button
              @click="submitType"
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
        name="openEditType"
        :adaptive="true"
        :scrollable="true"
        :height="340"
        :width="600"
      >
        <h3 class="p-4 bottom-shadow shadow">Edit company type</h3>

        <div class="m-4">
          <form @submit="submitEditType">
            <h4 class="mt-3">Type</h4>
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
                placeholder="Company name"
              />
            </div>
          </form>
        </div>
        <div class="my-2 mx-4">
          <span class="float-left">
            <button
              @click="submitEditType"
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
      types: [],
      recordId: "",
      form: {
        name: "",
        description: "",
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
    this.loadCompanyTypes();
  },
  methods: {
    submitEditType() {
      this.edited = false;
      this.editing = true;
      AxiosHelper.patch("company-types/edit-type", this.activity)
        .then(() => {
          Vue.$toast.open({
            message: "Company type has been edited successfully",
            type: "success",
          });
          this.loadCompanyTypes();
          this.edited = true;
          this.editing = false;
          this.$modal.hide("openEditType");
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
    submitType() {
      this.added = false;
      this.adding = true;
      AxiosHelper.post("company-types/add-type", this.form)
        .then(() => {
          Vue.$toast.open({
            message: "Company type has been added successfully",
            type: "success",
          });
          this.loadCompanyTypes();
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
    loadCompanyTypes() {
      AxiosHelper.get("company-types")
        .then((response) => {
          this.types = response.data.result;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    deleteRecord(id) {
      this.recordId = id;
      this.$modal.show("openDeleteRecord");
    },
    addActivity() {
      this.form = {};
      this.$modal.show("openAddActivity");
    },
    editType(act) {
      this.activity = act;
      this.$modal.show("openEditType");
    },
    closeModal() {
      this.$modal.hide("openAddActivity");
      this.$modal.hide("openEditType");
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
        maxLength: maxLength(55),
      },
      description: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(140),
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
