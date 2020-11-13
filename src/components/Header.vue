<template>
  <div class="bg-white wrap-header">
    <div class="py-2 middle-header">
      <div class="container">
        <div class="wrap-middle-header">
          <button class="sidebar-btn" @click="toggleMenu">
            <img src="@/assets/images/menu.svg" />
          </button>
          <div class="wrap-logo">
            <div class="main-logo">
              <a to="/">
                <img src="@/assets/images/logo.svg" alt="Innovate Rwanda" />
              </a>
            </div>
          </div>
          <div class="wrap-main-nav">
            <ul class="list-inline py-3 my-2">
              <li class="list-inline-item">
                <a href="#">About</a>
              </li>
              <li class="list-inline-item">
                <a href="#">Why Rwanda</a>
              </li>
              <li class="list-inline-item">
                <a href="#">Community Directory</a>
              </li>
              <li class="list-inline-item">
                <a href="#">Events</a>
              </li>
              <li class="list-inline-item">
                <a href="#">Blog</a>
              </li>
              <li class="list-inline-item">
                <a href="#">Find Talent</a>
              </li>
            </ul>
          </div>
          <div class="wrap-hotlinks">
            <div class="py-2 float-right">
              <button class="btn btn-transparent">
                <img src="@/assets/images/search.svg" alt="Search" />
              </button>
              <button class="btn font-weight-bold btn-primary-outline mr-2">
                Login
              </button>
              <button class="btn font-weight-bold btn-primary">
                Join The Community
              </button>
            </div>
          </div>
          <button class="auth-btn" @click="toggleAuthModal">
            <img src="@/assets/images/user.svg" />
          </button>
        </div>
      </div>
    </div>
    <!-- Sidebar -->
    <div class="wrap-sidebar" v-if="isSidebarOpen">
      <button class="close" @click="isSidebarOpen = false">
        <icon class="icon" icon="times" />
      </button>
      <div class="sidebar-nav mt-5">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <a href="#">About</a>
          </li>
          <li class="list-group-item">
            <a href="#">Why Rwanda</a>
          </li>
          <li class="list-group-item">
            <a href="#">Community Directory</a>
          </li>
          <li class="list-group-item">
            <a href="#">Events</a>
          </li>
          <li class="list-group-item">
            <a href="#">Blog</a>
          </li>
          <li class="list-group-item">
            <a href="#">Find Talents</a>
          </li>
          <li class="list-group-item">
            <a href="#">Search</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- AuthButtonModal -->
    <div class="wrap-auth-modal" v-if="isAuthModelOpen">
      <div class="auth-modal">
        <button class="close" @click="isAuthModelOpen = false">
          <icon class="icon" icon="times" />
        </button>
        <div class="auth-wrap-btns mb-4">
          <button
            class="btn btn-block font-weight-bold btn-primary-outline mr-2"
          >
            Login
          </button>
          <button class="btn btn-block font-weight-bold btn-primary mt-4">
            Join The Community
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      isAuthModelOpen: false,
    };
  },

  methods: {
    toggleMenu() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleAuthModal() {
      this.isAuthModelOpen = !this.isAuthModelOpen;
    },
  },
};
</script>


<style scoped>
.wrap-header {
  position: relative;
}

@media (min-width: 1025px) {
  .main-logo {
    max-width: 220px;
  }
  .wrap-middle-header {
    display: grid;
    grid-template-areas: "wrap-logo wrap-main-nav wrap-hotlinks";
    grid-template-columns: 1fr 3fr 2fr;
    grid-gap: 20px;
    height: auto;
  }
  .wrap-logo {
    grid-area: wrap-logo;
    max-width: 220px;
  }
  .main-logo {
    margin: 4px 0;
    position: relative;
  }
  .wrap-main-nav {
    grid-area: wrap-main-nav;
  }
  .wrap-hotlinks {
    grid-area: wrap-hotlinks;
    padding: 5px 0;
  }
  .sidebar-btn,
  .auth-btn {
    display: none;
  }
}
@media (max-width: 1024px) {
  .main-logo {
    max-width: 140px;
  }
  .wrap-middle-header {
    display: inline-flex;
    flex-flow: row wrap;
    height: auto;
    width: 100%;
  }
  .wrap-logo {
    flex: 0 0 calc(100% - 100px);
  }
  .main-logo {
    margin: 4px auto;
    position: relative;
  }
  .wrap-main-nav,
  .wrap-hotlinks {
    display: none;
  }
  /* .sidebar-btn {
    grid-area: sidebar-btn;
  }
  .auth-btn {
    grid-area: auth-btn;
  } */
  .sidebar-btn,
  .auth-btn {
    border: none;
    padding: 0 5px;
    background: transparent;
    width: 50px;
  }
}
.sidebar-btn img,
.auth-btn img {
  width: 26px;
}

.main-logo img {
  margin: 0;
  width: 100%;
}
.middle-header {
  border-bottom: 1px solid #c0c6d8;
}
.wrap-main-nav a {
  color: #5e7c8d;
  font-size: 15px;
  padding: 0 8px;
  font-weight: 100;
}
.wrap-sidebar {
  background: #ffffff;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100000;
}
.wrap-auth-modal {
  background: rgba(42, 104, 139, 0.8);
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100000;
}
.auth-modal {
  position: relative;
  background: #ffffff;
  top: 25%;
  padding: 40px 20px 20px 20px;
  margin: 0 auto;
  display: block;
  max-width: 90%;
  border-radius: 3px;
}
.auth-modal .close,
.wrap-sidebar .close {
  position: absolute;
  right: 15px;
  top: 10px;
}
.auth-wrap-btns {
  margin: 0 auto;
  display: block;
  max-width: 200px;
}
.sidebar-nav {
  width: 100%;
}
.sidebar-nav li {
  padding: 25px 0;
  text-align: center;
  border: none;
}
.sidebar-nav li a {
  color: #5E7C8D;
}
</style>

