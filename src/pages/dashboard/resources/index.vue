<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Resources</h2>
        <div class="wrap-content-head-btns align-items-end" v-if="!loading">
          <router-link
            :to="'/dashboard/resources/new'"
            v-if="profile && profile.role !== 'normal'"
            class="btn font-weight-bold btn-primary-outline"
          >
            Add a resource
          </router-link>
        </div>
        <div class="clear" />
        <br />
      </div>
      <div class="dash-container" v-if="!loading">
        <table
          class="table table-responsive-sm"
          v-if="profile && profile.role !== 'normal'"
        >
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Attachment</th>
              <th scope="col">Date</th>
              <th scope="col">
                <span class="float-right px-3"> Actions </span>
              </th>
            </tr>
          </thead>
          <tbody v-if="resources">
            <tr v-for="(post, index) in resources" :key="index">
              <td style="max-width: 220px">
                <span>
                  {{ post.title | truncate(120) }}
                </span>
              </td>
              <td style="max-width: 220px">
                {{ post.description | truncate(120) }}
              </td>
              <td>
                <a
                  class="btn btn-outline-secondary"
                  :href="`${FILE_URL}${post.file}`"
                  target="_blank"
                >
                  <i class="icon-file" />
                  <span class="ml-2">Attachment</span>
                </a>
              </td>
              <td>{{ post.createdAt | date("DD/MM/YYYY") }}</td>
              <td>
                <div class="wrap-actions float-right">
                  <router-link :to="`/dashboard/resources/edit/${post.id}`">
                    <img src="@/assets/images/edit.png" alt="edit" />
                  </router-link>
                  <button
                    v-if="post.status !== 'deleted'"
                    @click="deleteRecord(post.id)"
                  >
                    <img src="@/assets/images/delete.png" alt="delete" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <div v-else class="not-allowed"></div> -->
        <modal
          name="openInfoJob"
          :adaptive="true"
          :scrollable="true"
          :height="700"
          :width="1100"
        >
          <button type="button" @click.prevent="closeModal" class="close">
            <img src="@/assets/images/close.png" />
          </button>
          <InfoJob :id="postId" />
        </modal>
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
            :url="`resources/remove-resource?resourceId=${recordId}`"
            entity="resource"
          />
        </modal>
      </div>
      <Loading v-if="loading" />
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
import MenuContent from "@/components/MenuContent";
import InfoJob from "@/components/InfoJob";
import DeleteModal from "@/components/DeleteModal";
import Loading from "@/components/Loading";
export default {
  name: "content-resources",
  components: {
    MenuContent,
    InfoJob,
    DeleteModal,
    Loading,
  },
  data() {
    return {
      resources: [],
      loading: false,
      postId: {},
      recordId: "",
    };
  },
  created() {
    this.loading = true;

    AxiosHelper.get("resources")
      .then((response) => {
        this.resources = response.data.result;
        this.loading = false;
      })
      .catch((error) => {
         if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
        if (error.response.status === 404 || error.response.status === 400) {
          this.error = "No content yet!";
        } else if (error.response.status === 403) {
          this.error = "No resources found at this moment";
          this.notAllowed = true;
        } else {
          this.error = "Something went wrong, try again later";
        }
        this.loading = false;
      });
  },
  methods: {
    convertTagsArray(object) {
      const arr = object
        .substring(1, object.length - 1)
        .replace(/"/g, "")
        .split(",");
      return arr;
    },
    loadPost(postId) {
      this.postId = postId;
      this.$modal.show("openInfoJob");
    },
    deleteRecord(id) {
      this.recordId = id;
      this.$modal.show("openDeleteRecord");
    },
    closeModal() {
      this.$modal.hide("openInfoJob");
      this.$modal.hide("openDeleteRecord");
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
table .btn {
  padding: 5px 15px !important;
  font-size: 12px !important;
}
</style>