<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">Directory</h2>
        <ul class="page-nav list-inline">
          <li class="list-inline-item mr-5">
            <router-link exact :to="'/dashboard/directory'"
              >Companies list</router-link
            >
          </li>
          <li class="list-inline-item mr-5 list-active">
            <router-link exact :to="'/dashboard/directory/pending'"
              >Pending requests</router-link
            >
          </li>
          <li class="list-inline-item mr-5">
            <router-link exact :to="'/dashboard/directory/area-of-interests'"
              >Areas of intrests</router-link
            >
          </li>
        </ul>
      </div>
      <div class="dash-container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Date joined</th>
              <th scope="col">Type</th>
              <th scope="col">Area of intrests</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody v-if="directory">
            <tr v-for="(dir, index) in directory" :key="index">
              <td>{{ dir.name }}</td>
              <td>{{ dir.createdAt }}</td>
              <td>{{ dir.type }}</td>
              <td>{{ dir.areaOfInterest }}</td>
              <td>
                <div class="wrap-switch-toggle">
                  <span
                    :class="`${
                      dir.status === true ? 'switch-text active' : 'switch-text'
                    }`"
                    >Off</span
                  >
                  <label class="switch">
                    <input type="checkbox" :checked="dir.status === false" />
                    <span class="slider round"></span>
                  </label>
                  <span
                    :class="`${
                      dir.status === true ? 'switch-text' : 'switch-text active'
                    }`"
                    >On</span
                  >
                </div>
              </td>
              <td>
                <div class="wrap-actions">
                  <button>
                    <img src="@/assets/images/view.svg" alt="view" />
                  </button>
                  <button>
                    <img src="@/assets/images/edit.svg" alt="edit" />
                  </button>
                  <button>
                    <img src="@/assets/images/delete.svg" alt="delete" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </component>
  </div>
</template>

<script>
import companies from "./../../../data/company.js";
export default {
  name: "dashboard",
  data() {
    return {
      directory: [],
      isAuthModelOpen: false,
    };
  },
  created() {
    this.directory = companies;
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
</style>