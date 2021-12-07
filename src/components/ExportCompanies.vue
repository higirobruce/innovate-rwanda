<template>
  <table class="table table-responsive-sm">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Type</th>
        <th scope="col">Based in</th>
        <th scope="col">Contact</th>
        <th scope="col">Main activity</th>
        <th scope="col">Activities</th>
        <th scope="col">Date joined</th>
      </tr>
    </thead>
   <tbody v-if="directory && directory">
      <tr v-for="(dir, index) in directory" :key="index">
        <td>{{ index + 1 }}</td>
        <td>
          {{ dir.coName }}({{ dir.status }})<br />
          <u>{{ dir.coWebsite }}</u>
        </td>
        <td>{{ dir.CompanyType.name }}</td>
        <td>{{ dir.districtBasedIn }}</td>
        <td>{{ dir.contactEmail }}/<br>{{ dir.contactPhone }}</td>
        <td>
          {{ dir.BusinessActivity.name }}
        </td>
        <td style="max-width: 200px">
          <span v-if="!_.isEmpty(dir.ActivitiesOfCompanies)">
            <span
              v-for="(act, index) in dir.ActivitiesOfCompanies"
              :key="index"
            >
              <span v-if="index !== 0">,</span>
              {{ act.BusinessActivity.name }}
            </span>
          </span>
        </td>
        <td>{{ dir.createdAt | date("DD MMM, YYYY") }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "list-companies-export",
  props: ["directory"],
  data() {
    return {
      company: {},
    };
  },
};
</script>
<style scoped>
td {
  /* text-align: center; */
  vertical-align: middle;
}
</style>