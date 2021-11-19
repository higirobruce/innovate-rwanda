<template>
  <div class="company-large-info">
    <h4
      style="margin: 20px 0; font-size: 27px; font-weight: 900; color: #1b2958"
    >
      Contact {{ company.coName }}
    </h4>
    <div v-if="!sent">
      <div class="row mt-4">
        <div class="col-12">
          <div class="form-group">
            <input
              type="email"
              v-model.trim="$v.message.email.$model"
              class="form-control custom-input"
              placeholder="Your email address"
            />
            <div
              class="text-danger"
              v-if="$v.message.email.$dirty && $v.message.email.$invalid"
            >
              Provide a valid email
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="form-group">
            <textarea
              class="form-control"
              rows="7"
              v-model.trim="$v.message.message.$model"
              placeholder="Type your message...."
            >
            </textarea>
            <div
              class="text-danger mt-1"
              v-if="$v.message.message.$dirty && $v.message.message.$invalid"
            >
              Message should at least be 25 characters
            </div>
          </div>
        </div>
      </div>
      <div class="my-4 border float-right">
        <button @click="send" class="btn btn-primary-outline px-5">
          <span v-if="!sending">Send</span>
          <span v-if="sending">Sending</span>
        </button>
      </div>
      <div class="clear"></div>
    </div>
    <div v-if="sent">Thank you! Company has received your message successfully.</div>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "send-message",
  props: ["company"],
  data() {
    return {
      message: {
        email: "",
        message: "",
        companyId: "",
      },
      sending: false,
      sent: false,
    };
  },
  methods: {
    send() {
      this.sending = true;
      this.message.companyId = this.company.id;
      AxiosHelper.post("message/post", this.message)
        .then(() => {
          this.sent = true;
          Vue.$toast.open({
            message: "Your message has been sent.",
            type: "success",
          });
        })
        .catch(() => {
          this.sent = true;
          Vue.$toast.open({
            message:
              "Sorry, something went wrong. Try again later",
            type: "error",
          });
        });
      this.sending = false;
    },
  },
  validations: {
    message: {
      email: {
        email,
      },
      message: {
        required,
        minLength: minLength(35),
      },
    },
  },
};
</script>

<style scoped>
.text-danger {
  font-size: 14px;
}
</style>