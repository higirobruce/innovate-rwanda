<template>
  <div>
    <component :is="layout">
      <PageHeader
        image="auth-bg.jpg"
        rgba="rgba(4, 137, 187, 0.83)"
        title="Join The Community"
        subtitle="Whether you're a corporation looking for innovation, a startup looking for a boost, or a VC looking to meet great startups, we're the right place for you."
      />
      <div class="container">
        <h2 class="text-center">Tell us a little bit about yourself...</h2>
        <div class="choose-company-type">
          <div class="type-option">
            <h3>I am a startup compant</h3>
            <img src="@/assets/images/arrow-right.svg" />
          </div>
          <div class="type-option">
            <h3>I am a startup compant</h3>
            <img src="@/assets/images/arrow-right.svg" />
          </div>
          <div class="type-option">
            <h3>I am a startup compant</h3>
            <img src="@/assets/images/arrow-right.svg" />
          </div>
        </div>
        <div class="wrap-register">
          <h2 class="text-center mb-4">Some basic information about you</h2>
          <div class="register-form">
            <!-- names -->
            <h4 class="text-center mt-3">What is your name?</h4>
            <div class="row mt-4">
              <div class="col-lg-6 col-sm-12">
                <div class="form-group">
                  <input
                    type="firstname"
                    class="form-control custom-input"
                    placeholder="First name"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-sm-12">
                <div class="form-group">
                  <input
                    type="lastname"
                    class="form-control custom-input"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>
            <!-- email -->
            <h4 class="text-center mt-3">And your company email address?</h4>
            <div class="row mt-4">
              <div class="col-12">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control custom-input"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
            <!-- password -->
            <h4 class="text-center mt-3">Create password</h4>
            <div class="row mt-4">
              <div class="col-12">
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control custom-input"
                    placeholder="password"
                  />
                </div>
              </div>
            </div>
            <!-- website -->
            <h4 class="text-center mt-3">What is your company's website?</h4>
            <div class="row mt-4">
              <div class="col-12">
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control custom-input"
                    placeholder="Company's website"
                  />
                </div>
              </div>
            </div>
            <!-- job title -->
            <h4 class="text-center mt-3">
              What is your job title at the company?
            </h4>
            <div class="row mt-4">
              <div class="col-12">
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control custom-input"
                    placeholder="Job title"
                  />
                </div>
              </div>
            </div>
            <!-- district -->
            <h4 class="text-center mt-3">What District are you based in?</h4>
            <div class="row mt-4">
              <div class="col-12">
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control custom-input"
                    placeholder="Please Select District"
                  />
                </div>
              </div>
            </div>
            <!-- area -->
            <h4 class="text-center mt-3">
              Which area of interest closely fits your company?
            </h4>
            <div class="row mt-4">
              <div class="col-12">
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control custom-input"
                    placeholder="Please Select Area of Interest"
                  />
                </div>
              </div>
            </div>
            <!-- description -->
            <h4 class="text-center mt-3">
              short description about the company
            </h4>
            <div class="row mt-4">
              <div class="col-12">
                <div class="form-group">
                  <textarea class="form-control" rows="6"></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button
                  class="btn btn-lg font-weight-bold btn-primary-outline mr-lg-5 mt-3"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
export default {
  name: "why-rwanda",
  components: {
    PageHeader,
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 30px;
  color: #1b2958;
}
.choose-company-type {
  max-width: 1000px;
  margin: 30px auto;
  display: flex;
  gap: 20px;
}
.type-option {
  width: 33.3%;
  background: #ffffff;
  box-shadow: 0px 9px 36px #1b295826;
  border-radius: 3px;
  text-align: center;
  padding: 25px 0;
}
.type-option h3 {
  font-size: 22px;
  margin: 10px 0;
}
.wrap-register {
  max-width: 1200px;
  margin: 30px auto;
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 9px 36px #1b295826;
  border-radius: 3px;
}
.register-form {
  max-width: 860px;
  display: block;
  margin: 40px auto;
}
.register-form h4 {
  font-weight: 300;
  color: #1b2958;
}
</style>