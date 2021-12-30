<template>
  <div>
    <component :is="layout">
      <h1 class="h2">Disclaimer</h1>
      <h3 class="my-3 h5 font-weight-light">Last updated December 23, 2020</h3>
      <p>
        <span style="font-weight: 400"
          >The information provided by IInnovate Rwanda (&ldquo;we,&rdquo;
          &ldquo;us&rdquo; or &ldquo;our&rdquo;) on </span
        ><a href="https://innovaterwanda.rw"
          ><span style="font-weight: 400">https://innovaterwanda.rw</span></a
        ><span style="font-weight: 400">
          (the &ldquo;Site&rdquo;) is for general information purposes only.
        </span>
      </p>
      <p>
        <span style="font-weight: 400"
          >All information on the Site is provided in good faith, however we
          make no representation or warranty of any kind, express or implied,
          regarding the accuracy, adequacy, validity, reliability, availability
          or completeness of any information on the Site.</span
        >
      </p>
      <p>
        <span style="font-weight: 400"
          >UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS
          OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR
          RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE
          AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN
          RISK.
        </span>
      </p>
    </component>
  </div>
</template>
<script>
export default {
  name: "disclaimer-terms",
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>