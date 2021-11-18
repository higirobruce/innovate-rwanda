<template>
  <div class="wrap-one-event">
    <router-link :to="`event/${event.id}`">
      <div class="one-event-image">
        <img
          v-if="event.flyer"
          :src="`${IMAGE_URL}c_fill,g_center,w_500,h_250/${event.flyer}`"
          :alt="event.title"
        />
        <img
          v-else
          src="@/assets/images/post_placeholder.svg"
          :alt="event.title"
        />
        <h2>
          {{ event.title | truncate(58) }}
        </h2>
      </div>
    </router-link>
    <div class="post-info">
      <h3 class="h5 text-blue-dark">
        <i class="icon-calendar mr-2" />
        {{ event.eventDate | date("DD MMM YYYY") }}
      </h3>
      <div style="font-size: 14px">
        <span>
          <span>{{ event.category }}</span>
        </span>
        <span class="float-right text-blue"> {{ event.eventTime }} CAT</span>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
export default {
  name: "event-component",
  props: ["event"],
};
</script>