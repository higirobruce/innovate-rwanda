<template>
  <div>
    <div class="message-head">
      <div class="image">
        <img
          class="avatar"
          src="@/assets/images/user-avatar.svg"
          :alt="message.email"
        />
      </div>
      <div class="head-info">
        <h6 class="mt-0 mb-1 font-weight-bold">
          Xroze Fleet
          <span class="badge badge-warning">Company</span>
        </h6>
        <div>Edward Nganyira - {{ message.email }}</div>
      </div>
    </div>
    <div class="message-body">
      <ul class="list-unstyled">
        <li>
          <!-- <img class="mr-3 avatar"
            src="@/assets/images/user-avatar.svg"
          /> -->
          <div class="media-body">
            <div class="one-message-read">
              <h6 class="mt-0 mb-1 font-weight-bold">
                You
                <span
                  class="float-right"
                  style="color: #7789a7; font-size: 12px; font-weight: 300"
                >
                  Today 9:30
                </span>
              </h6>
              <div>You</div>
              <div style="color: #7789a7">
                We look forward to seeing you for your appointment today. For
                your safety, we ask that you check in from your car when you
                arrive by responding with the word HERE to this text. You will
                then receive a text message when the doctor is ready to see you.
                Thank you for your cooperation.
              </div>
            </div>
            <div class="one-message-read">
              <h6 class="mt-0 mb-1 font-weight-bold">
                You
                <span
                  class="float-right"
                  style="color: #7789a7; font-size: 12px; font-weight: 300"
                >
                  Today 9:30
                </span>
              </h6>
              <div>Edward Nganyira</div>
              <div style="color: #7789a7">
                Thank you for scheduling an appointment with our office. You are
                confirmed for an appointment with INDIVIDUAL on DATE at TIME. If
                you have any questions, please respond to this text or call
                HIM/HER at NUMBER.
              </div>
            </div>
            <div class="one-message-read">
              <h6 class="mt-0 mb-1 font-weight-bold">
                You
                <span
                  class="float-right"
                  style="color: #7789a7; font-size: 12px; font-weight: 300"
                >
                  Today 9:30
                </span>
              </h6>
              <div>You</div>
              <div style="color: #7789a7">Hey man, supz?</div>
            </div>
            <div class="one-message-read">
              <h6 class="mt-0 mb-1 font-weight-bold">
                You
                <span
                  class="float-right"
                  style="color: #7789a7; font-size: 12px; font-weight: 300"
                >
                  Today 9:30
                </span>
              </h6>
              <div>Edward Nganyira</div>
              <div style="color: #7789a7">
                I won Huge in Bingo last night. you should have come
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "read-message",
  props: ["message"],
};
</script>

<style scoped>
.message-head {
  padding: 15px 50px;
  display: flex;
  background: #ffffff;
}
.message-head .image {
  width: 60px;
}
.message-head .head-info {
  width: calc(100% - 80px);
  padding: 2px 30px;
}
.message-body {
  padding: 30px 60px;
}
.one-message-read {
  padding: 20px 0;
  border-bottom: 1px solid #f0f2f8;
}
.avatar {
  background: #00aeef;
}

.media img {
  width: 45px;
}
.media {
  padding: 30px 10px;
  border-top: 1px solid #f0f2f8;
}
.media:last-child {
  border-bottom: 1px solid #f0f2f8;
}
.media.active {
  background: #f0f2f8;
}
.avatar.active {
  background: #00aeef;
}
</style>