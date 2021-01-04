<template>
  <div>
       <VueShowdown :markdown="fileContent"></VueShowdown>
  </div>
</template>
<script>
import Vue from 'vue'
import VueShowdown from 'vue-showdown'

// the second parameter of Vue.use() is optional
Vue.use(VueShowdown, {
  // set default flavor of showdown
  flavor: 'github',
  // set default options of showdown (will override the flavor options)
  options: {
    emoji: true,
  },
})
import mdFile from './file.md'
export default {
  name: 'VueMarkdown',
  data() {
    return {
      fileContent: '',
    }
  },
  mounted() {
    this.getMDFile()
  },
  methods: {
    getMDFile() {
      this.fileContent = mdFile
    },
  },
}
</script>