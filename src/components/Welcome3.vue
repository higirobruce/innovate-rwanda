<template>
  <!-- welcome to innovate -->
  <div class="welcome-screen text-sm-center text-md-center text-lg-left">
    <div class="container">
      <div class="welcome-info">
        <h1 class="text-blue-dark mb-4">
          Bringing Rwanda's Innovation Community Together
        </h1>
        <router-link
          :to="'/join'"
          class="btn btn-home btn-lg font-weight-bold bg-blue text-white mt-3 mr-lg-5 mt-3"
        >
          Join the community
        </router-link>
        <router-link
          :to="'/about'"
          class="btn btn-home btn-lg font-weight-bold bg-orange text-white mt-3"
        >
          Learn more
        </router-link>
        <div class="clear"></div>
        <form @submit="search" class="home-search my-4">
          <input
            v-model="query"
            type="text"
            placeholder="Search the directory..."
          />
          <button
            type="submit"
            :disabled="_.isEmpty(query)"
            @click.prevent="search"
            class="btn btn-transparent"
          >
            <img src="@/assets/images/search.png" alt="Search" />
          </button>
        </form>
      </div>
    </div>
    <div class="innovate-bg">
      <img src="@/assets/images/bg-welcome-innovate-2.png" alt="Innovate" />
    </div>
  </div>
</template>
<script>
export default {
  name: "welcome",
  data() {
    return {
      query: "",
    };
  },
  methods: {
    search() {
      this.$router.push(`/directory/companies?search=${this.query}`);
    },
  },
};
</script>
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
    width: 1350px;
    position: absolute;
    right: -90px;
    bottom: 0;
    z-index: -1;
  }
  .innovate-bg img {
    position: relative;
    right: -10px;
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
  .btn-home {
    margin-right: 10px;
  }
}
@media (max-width: 768px) {
  .btn-home {
    display: block;
    margin: 10px 0;
  }
  .innovate-bg {
    display: none;
  }
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
  padding: 3px 6px;
  width: 100%;
  max-width: 496px;
  display: grid;
  grid-template-areas: "search-input search-button";
  grid-template-columns: 5fr 1fr;
  grid-gap: 5px;
}
.home-search input {
  grid-area: search-input;
  background: transparent;
  padding: 3px 15px;
  border: none;
}
.home-search input::placeholder {
  color: #c0c6d8;
}
.home-search button {
  grid-area: search-button;
  width: 80px;
  padding: 5px 0;
}
</style>