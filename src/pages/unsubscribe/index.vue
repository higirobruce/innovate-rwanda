<template>
  <div>
    <component :is="layout">
      <div class="m-2 radius-2">
        <div class="m-3 py-4">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 h-100">
              <div class="mx-auto" style="max-width: 600px">
                <div class="wrap-unsubscribe p-5 my-3 bg-white shadow">
                  <div class="image">
                    <img src="@/assets/images/envelope.png" alt="Unsubscribe" />
                  </div>
                  <h2 class="text-center font-weight-light">Unsubscribe</h2>
                  <div v-if="!unsubscribed">
                    <div>
                      Provide your email to unsubscribe.<br />We will stop
                      sending you notifications your email.
                    </div>

                    <form @submit.prevent="unsubscribing">
                      <div class="my-3 form-group">
                        <div class="form-group">
                          <input
                            type="text"
                            v-model="email"
                            required
                            class="form-control custom-input"
                            placeholder="Your email"
                          />
                        </div>
                        <button
                          :disabled="!_.size(email)"
                          @click.prevent="unsubscribing"
                          type="button"
                          class="btn btn-primary"
                        >
                          Unsubscribe
                        </button>
                      </div>
                    </form>
                  </div>

                  <div class="text-success" v-if="unsubscribed && !loading">
                    You have been successfully unsubscribed from our
                    notifications.

                    <div class="my-4">
                      <router-link class="btn btn-gray-outline" :to="'/'"
                        >Go home</router-link
                      >
                    </div>
                  </div>
                  <div class="text-danger" v-if="!unsubscribed && error">
                    It seems like your email is not subscribed to our notications.
                  </div>
                </div>
                <div v-if="!unsubscribed && loading">
                  <Loading />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </component>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import AxiosHelper from "@/helpers/AxiosHelper";
export default {
  components: {
    Loading,
    PageHeader,
  },
  name: "unsubscribe-page",
  data() {
    return {
      email: "",
      loading: false,
      unsubscribed: false,
      error: false,
    };
  },
  methods: {
    unsubscribing() {
      this.loading = true;
      this.error = false;
      AxiosHelper.delete(`unsubscribe/${this.email}`)
        .then(() => {
          this.unsubscribed = true;
          this.error = false;
        })
        .catch(() => {
          this.unsubscribed = false;
          this.error = true;
        });
      this.loading = false;
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
.vertical-center {
  min-height: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
}
.wrap-unsubscribe .image {
  width: 120px;
  margin: 10px auto;
  display: block;
}
</style>
