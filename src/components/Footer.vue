<template>
  <footer :style="`${firstTime ? 'padding-bottom: 90px' : ''}`">
    <!-- Footer -->
    <div class="wrap-footer">
      <div class="container position-relative">
        <div class="footer-logo">
          <img src="@/assets/images/logo-white.svg" alt="Innovate" />
        </div>
        <div class="footer-about text-center">
          Innovation and Technology are at the core of Rwanda’s social and
          economic transformation strategy. Innovate Rwanda was created to
          showcase Rwanda’s growing ecosystem of technology and
          technology-enabled corporations, SMEs and startups and enablers. It
          represents the shared interests of the community to profile
          themselves, discover partners and support opportunities, and establish
          partnerships for growth.
        </div>
        <div class="footer-bg hide-on-small">
          <img src="@/assets/images/icon-colorful.svg" alt="Innovate" />
        </div>
        <div class="d-flex">
          <ul
            class="footer-links list-inline mx-auto py-3 justify-content-center"
          >
            <li class="list-inline-item">
              <router-link :to="'/'">Home</router-link>
            </li>
            <li class="list-inline-item">
              <router-link :to="'/about'">About</router-link>
            </li>
            <li class="list-inline-item">
              <router-link :to="'/why-rwanda'">Why Rwanda</router-link>
            </li>
            <li class="list-inline-item">
              <router-link :to="'/directory'">Community Directory</router-link>
            </li>
            <li class="list-inline-item">
              <router-link :to="'/events'">Events</router-link>
            </li>
            <li class="list-inline-item">
              <router-link :to="'/blog'">Blog</router-link>
            </li>
            <li class="list-inline-item">
              <router-link :to="'/resources'">Resources</router-link>
            </li>
            <li class="list-inline-item">
              <router-link :to="'/jobs'">Jobs</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-divider my-2"></div>
        <div class="wrap-socials text-md-center mt-5">
          <div class="float-lg-left">
            <h4 class="h6">Follow us</h4>
            <div>
              <a target="_blank" href="https://twitter.com/innovate_rwanda">
                <i class="icon-twitter mr-2"
              /></a>
            </div>
          </div>
          <div class="float-lg-right">
            <h4 class="h6">Email us</h4>
            <div>
              <router-link :to="'/'" class="email-us">
                <i class="icon-envelope mr-2" />
                <span class="">info@innovaterwanda.rw</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap-copyright">
      <div class="container">
        <div class="trademark float-lg-left">
          &copy; Copyright {{ new Date().getFullYear() }}, Innovate Rwanda
        </div>
        <div class="copyright-links float-sm-left float-lg-right">
          <router-link :to="'/terms'" class="mr-4">Terms</router-link>
          <router-link :to="'/privacy-policy'" class="mr-4"
            >Privacy</router-link
          >
          <router-link :to="'/disclaimer'" class="mr-4">Disclaimer</router-link>
          <a to="techclick.rw" target="_blank"> Powered by Techclick </a>
        </div>
      </div>
    </div>
    <div class="wrap-cookie" v-if="firstTime">
      <div class="cookie">
        <div>
          We use cookies to offer you a better experience and analyze site
          traffic. By continuing to use this website, you consent to the use of
          cookies in accordance with our
          <router-link :to="'/cookies-policy'">Cookie Policy</router-link>
        </div>
        <button @click.prevent="accept" type="button">Accept</button>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      firstTime: true,
    };
  },
  mounted() {
    const accepted = localStorage.getItem("acceptedCookies");
    if (accepted) {
      this.firstTime = false;
    }
  },
  methods: {
    accept() {
      localStorage.setItem("acceptedCookies", true);
      this.firstTime = false;
    },
  },
};
</script>

<style scoped>
.wrap-cookie {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px 0;
  z-index: 12000;
  background: #343434;
}
.cookie {
  margin: 0 auto;
  display: flex;
  max-width: 1000px;
  padding: 10px 0;
  font-size: 14px;
}
.cookie a {
  color: #06adef;
  font-weight: bold;
  text-decoration: underline;
}
.cookie button {
  width: 100px;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  background: #06adef;
  font-weight: bold;
}
@media screen and (max-width: 760px) {
  .cookie {
    display: block;
    width: 96%;
    padding: 2%;
  }
  .cookie div {
    width: 100%;
  }
  .cookie button {
    margin: 5px 0;
    float: left;
  }
}
footer {
  color: #ffffff;
  background-color: #00abdf;
}
.wrap-footer {
  padding: 10px 0 55px 0;
  position: relative;
  z-index: 1;
}
.footer-bg {
  position: absolute;
  top: -15px;
  left: 0;
  width: 480px;
  height: auto;
  z-index: -1;
}
.footer-bg img {
  width: 100%;
  height: auto;
}
footer a {
  color: #ffffff;
}
.wrap-copyright {
  margin-top: 40px;
  position: relative;
  z-index: 2;
  background: #5e7c8d;
  padding: 30px 0;
  font-size: 16px;
  display: flex;
}
.footer-logo {
  max-width: 230px;
  display: block;
  margin: 0 auto;
}
.footer-about {
  max-width: 870px;
  font-size: 16px;
  display: block;
  margin: 15px auto;
  position: relative;
  z-index: 4;
}
.footer-links li {
  padding: 0 22px;
}
.footer-links a {
  font-weight: 100;
  font-size: 16px;
}
.footer-divider {
  background: #c0c6d8;
  height: 1px;
  max-width: 980px;
  display: block;
  margin: 10px auto;
}
.wrap-socials {
  max-width: 870px;
  font-size: 16px;
  margin: 30px auto;
}
.wrap-socials a {
  font-size: 40px;
  margin-right: 25px;
}
.wrap-socials a span {
  font-size: 14px;
}
.email-us {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.email-us span {
  margin-left: 10px;
}
</style>