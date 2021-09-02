<template>
  <!-- welcome to innovate -->
  <div class="welcome-screen text-sm-center text-md-center text-lg-left">
    <div class="container">
      <div class="welcome-info">
        <h1 class="text-white mb-4">
          Bringing Rwanda's Innovation Community Together
        </h1>
        <router-link
          :to="'/join'"
          class="btn btn-lg font-weight-bold bg-blue text-white mt-3 mr-lg-5 mt-3"
        >
          Join the community
        </router-link>
        <router-link
          :to="'/about'"
          class="btn btn-lg font-weight-bold bg-orange text-white mt-3"
        >
          Learn more
        </router-link>
        <div class="clear"></div>
        <form @submit="search" class="home-search rounded my-4">
          <input
            v-model="query"
            type="text"
            placeholder="Search the directory..."
          />
          <button
            type="submit"
            :disabled="_.isEmpty(query)"
            @click.prevent="search"
          >
            <img src="@/assets/images/search.png" alt="Search" />
          </button>
        </form>
      </div>
    </div>
    <div class="innovate-bg">
      <img src="@/assets/images/kgl.jpg" alt="Innovate" />
    </div>
    <div class="overlay-bg">
      <img src="@/assets/images/hm-layout-idea3.png" alt="Innovate" />
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1025px) {
  .welcome-screen {
    height: 800px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    z-index: 0;
  }
  .innovate-bg {
    width: 100%;
    position: absolute;
    top: 0;
    z-index: -1;
  }
  .innovate-bg img {
    position: relative;
    width: 100%;
  }
}
@media (max-width: 1024px) {
  .welcome-screen {
    text-align: center;
  }
  .welcome-info {
    padding: 35px 0 0 0;
  }
  .innovate-bg {
    width: 100%;
    position: relative;
  }
  .innovate-bg img {
    position: relative;
    left: -70px;
    width: 100%;
    margin: 0 auto;
    display: block;
  }
}
.innovate-bg::before {
  background-color: rgba(0, 0, 0, 0.6);
  content: "";
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}
.overlay-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  content: "";
  top: 0;
  z-index: -1;
}
.overlay-bg img{
  width: 100%;
  height: auto;
}
.welcome-screen {
  width: 100%;
}
.welcome-info {
  width: 100%;
  max-width: 900px;
}
.home-search {
  background: #f0f2f8;
  padding: 3px 0;
  width: 100%;
  max-width: 490px;
  display: grid;
  grid-template-areas: "search-input search-button";
  grid-template-columns: 5fr 1fr;
  grid-gap: 5px;
}
.home-search::before {
  background: #f0f2f8;
  padding: 3px 0;
  width: 100%;
  max-width: 490px;
  display: grid;
  grid-template-areas: "search-input search-button";
  grid-template-columns: 5fr 1fr;
  grid-gap: 5px;
}
.home-search input {
  grid-area: search-input;
  background: transparent;
  padding: 3px 0 3px 15px;
  margin-left: 15px;
  border: none;
}
.home-search input::placeholder {
  color: #c0c6d8;
}
.home-search button {
  grid-area: search-button;
  width: 80px;
  border: none;
  margin: 0 !important;
  padding: 5px !important;
}
.home-search button img {
  margin: 0;
  padding: 0;
}
</style>