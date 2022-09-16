<template>
  <main>
    <component :is="layout">
        <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">Directory</h2>
        <ul class="page-nav list-inline">
          <li class="list-inline-item mr-5">
            <router-link class="text-blue" :to="'/dashboard/directory'">
              All Companies
            </router-link>
          </li>
          <li class="list-inline-item mr-5">
            <router-link class="text-blue" :to="'/dashboard/directory/pending'">
              Pending Approval
            </router-link>
          </li>
          <li class="list-inline-item mr-5 list-active">
            <router-link class="text-blue" :to="'/dashboard/directory/individuals'">
              Individual Registrations
            </router-link>
          </li>
        </ul>
        <br />
      </div>
      <Loading v-if="loading" />
      <div class="individuals-container" v-if="!_.isEmpty(individuals)">
        <table class="table table-responsive-sm">
            <thead>
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">LinkedIn</th>
                    <th scope="col">Portfolio</th>
                    <th scope="col">Date Joined</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in individuals" :key="index">
                    <td>
                        <p v-if="user.firstName">{{user.firstName}}</p>
                        <p v-else>---</p>
                    </td>
                    <td>
                        <p v-if="user.lastName">{{user.lastName}}</p>
                        <p v-else>---</p>
                    </td>
                    <td>
                        <a :href="`mailto: ${user.contactEmail}`" target="_blank" class="text-blue" v-if="user.contactEmail">{{user.contactEmail}}</a>
                        <p v-else>---</p>
                    </td>
                    <td>
                        <p v-if="!_.isEmpty(user.contactPhone)">{{user.contactPhone}}</p>
                        <p v-else>---</p>
                    </td>
                    <td>
                        <a :href="makeURL(user.linkedin)" target="_blank" class="text-blue" v-if="user.linkedin">{{user.linkedin}}</a>
                        <p v-else>---</p>
                    </td>
                    <td>
                        <a :href="makeURL(user.portfolio)" target="_blank" class="text-blue" v-if="user.portfolio">{{user.portfolio}}</a>
                        <p v-else>---</p>
                    </td>
                    <td>
                        <p>{{moment(user.createdAt).format('LL')}}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </component>
  </main>
</template>

<script>
import isTokenExpired from '@/helpers/isTokenExpired';
import AxiosHelper from '@/helpers/AxiosHelper';
import Loading from '@/components/Loading';
export default {
    name: 'Individuals',
    computed: {
        layout() {
            return this.$route.meta.layout;
        },
        
    },
    data() {
        return {
            loading: false,
            loaded: false,
            error: '',
            individuals: [],
        }
    },
    methods: {
        loadIndividuals() {
            this.loading = true;
            this.loaded = false;

            AxiosHelper.get('/talent/admin').then((response) => {
                this.individuals = response.data.result;
                this.loading = false;
                this.loaded = true;
            }).catch((error) => {
                if (isTokenExpired(error)) {
                    window.location.href = '/login';
                }
                this.loaded = true;
                this.loading = false;
            })
        },
        makeURL(value) {
            let newUL = value;
            if (!newUL.startsWith('http://') || !newUL.startsWith('https://')) {
            newUL = `http://${newUL}`
            }

            return newUL
    }
    },
    created() {
        this.loadIndividuals();
    },
    components: {
    Loading,
   }
}
</script>

<style scoped>
  .link {
    color: #000000;
  }
</style>