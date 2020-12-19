<template>
  <footer>
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
              <router-link :to="'/resources'">Resources</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-divider my-2"></div>
        <div class="wrap-socials text-md-center mt-5">
          <div class="float-lg-left">
            <h4 class="h6">Follow us</h4>
            <div>
              <router-link :to="'/'"> <i class="icon-facebook-official mr-2" /></router-link>
              <router-link :to="'/'"> <i class="icon-twitter mr-2" /></router-link>
              <router-link :to="'/'"> <i class="icon-instagrem mr-2" /></router-link>
            </div>
          </div>
          <div class="float-lg-right">
            <h4 class="h6">Email us</h4>
            <div>
              <router-link :to="'/'" class="email-us">
                <i class="icon-envelope mr-2" />
                <span class="">info@innovaterwanda.com</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap-copyright">
      <div class="container">
        <div class="trademark float-lg-left">
          Trademark Notice: Innovate Rwanda Is A Registered Trademark Of Kigali
          Innovation City.
        </div>
        <div class="copyright-links float-sm-left float-lg-right">
          <router-link :to="'/'" class="mr-4">Terms</router-link>
          <router-link :to="'/'" class="mr-4">Privacy</router-link>
          <router-link :to="'/'" class="mr-4">Support</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  color: #ffffff;
  background-color: #00abdf;
}
.wrap-footer {
  padding: 10px 0 55px 0;
}
.footer-bg {
  position: absolute;
  top: -15px;
  left: 0;
  width: 480px;
  height: auto;
  z-index: 0;
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