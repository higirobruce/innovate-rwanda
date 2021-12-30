<template>
  <div>
    <component :is="layout">
      <h1 class="h2">Cookie Policy</h1>
      <h3 class="my-3 h5 font-weight-light">Last updated December 23, 2020</h3>
      <p>
        <span style="font-weight: 400"
          >This Cookie Policy explains how Innovate Rwanda uses cookies and
          similar technologies to recognize you when you visit our website at
          innovaterwanda.rw ("Site"). It explains what these technologies are
          and why we use them, as well as your rights to control our use of
          them. In some cases we may use cookies to collect personal
          information, or that becomes personal information if we combine it
          with other information. In such cases our Privacy Policy
          (innovaterwanda.rw/privacypolicy) will apply in addition to this
          Cookie policy.
        </span>
      </p>
      <h3><strong>What are cookies? </strong></h3>
      <p>
        <span style="font-weight: 400"
          >Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners in order to make their websites work, or to work more
          efficiently, as well as to provide reporting information. Cookies set
          by the website owner (in this case, Innovate Rwanda) are called "first
          party cookies". Cookies set by parties other than the website owner
          are called "third party cookies". Third party cookies enable third
          party features or functionality to be provided on or through the
          website (e.g. like advertising, interactive content and analytics).
          The parties that set these third party cookies can recognize your
          computer both when it visits the website in question and also when it
          visits certain other websites.
        </span>
      </p>
      <h3><strong>Why do we use cookies? </strong></h3>
      <p>
        <span style="font-weight: 400"
          >We use first party cookies for several reasons. Some cookies are
          required for technical reasons in order for our Site to operate, and
          we refer to these as "essential" or "strictly necessary" cookies.
          Other cookies also enable us to track and target the interests of our
          users to enhance the experience on our online platform. This is
          described in more detail below.
        </span>
      </p>
      <p>
        <span style="font-weight: 400"
          >The specific types of first party cookies served through our Site and
          the purposes they perform are described below (please note that the
          specific cookies served may vary depending on the specific Online
          Properties you visit):
        </span>
      </p>
      <p><strong>Essential website cookies:</strong></p>
      <p><strong> </strong></p>
      <p>
        <span style="font-weight: 400"
          >These cookies are strictly necessary to provide you with services
          available through our Site and to use some of its features, such as
          access to secure areas.</span
        >
      </p>
      <h5>
        <span style="font-weight: 400"
          >How to refuse: Because these cookies are strictly necessary to
          deliver the Site to you, you cannot refuse them. You can block or
          delete them by changing your browser settings however, as described
          below under the heading "How can I control cookies?".
        </span>
      </h5>
      <p>
        <strong>Performance and functionality cookies: </strong>
      </p>
      <p>
        <span style="font-weight: 400"
          >These cookies are used to enhance the performance and functionality
          of our Site but are non essential to their use. However, without these
          cookies, certain functionality may become unavailable.</span
        >
      </p>
      <p>
        <span style="font-weight: 400"
          >How to refuse: To refuse these cookies, please follow the
          instructions below under the heading "How can I control cookies?". </span
        ><span style="font-weight: 400"> </span>
      </p>
      <h3>
        <strong>How can I control cookies? </strong>
      </h3>
      <p>
        <span style="font-weight: 400"
          >You can set or amend your web browser controls to accept or refuse
          cookies. If you choose to reject cookies, you may still use our Site
          though your access to some functionality and areas of our Site may be
          restricted. As the means by which you can refuse cookies through your
          web browser controls vary from browser&shy; to &shy;browser, you
          should visit your browser's help menu for more information.
        </span>
      </p>
      <p>
        <span style="font-weight: 400"
          >In addition, most advertising networks offer you a way to opt out of
          targeted advertising. If you would like to find out more information,
          please visit http://www.aboutads.info/choices/ or
          http://www.youronlinechoices.com.
        </span>
      </p>
      <h3>
        <strong>How often will you update this Cookie Policy?</strong>
      </h3>
      <p>
        <span style="font-weight: 400"
          >We may update this Cookie Policy from time to time in order to
          reflect, for example, changes to the cookies we use or for other
          operational, legal or regulatory reasons. Please therefore
          re&shy;visit this Cookie Policy regularly to stay informed about our
          use of cookies and related technologies. The date at the top of this
          Cookie Policy indicates when it was last updated.
        </span>
      </p>
      <h3>
        <strong>Where can I get further information? </strong>
      </h3>
      <p>
        <span style="font-weight: 400"
          >If you have any questions about our use of cookies or other
          technologies, please email us at info@innovaterwanda.rw or by post to:
        </span>
      </p>
      <p><span style="font-weight: 400">Innovate Rwanda </span></p>
      <p><span style="font-weight: 400">Kigali</span></p>
      <p><span style="font-weight: 400">Rwanda </span></p>
      <p>
        <span style="font-weight: 400">Phone: (+250) 780 000 000</span>
      </p>
    </component>
  </div>
</template>
<script>
export default {
  name: "cookies-terms",
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>