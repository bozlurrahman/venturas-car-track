<template>
  <div id="app">
    <v-app
      id="inspire"
      :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }"
      :dark="darkTheme"
    >
      <v-container>
        <v-col
          sm="12"
          md="6"
          offset-md="3"
        >
          <validation-observer
            ref="observer"
            v-slot="{ invalid }"
          >
            <form @submit.prevent="submit">
              <v-card
                elevation="4"
                light
                tag="section"
              >
                <v-card-title>
                  <h3 class="text-center">
                    {{ platformName }}
                  </h3>
                </v-card-title>
                <v-divider />
                <v-card-text>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Name"
                    rules="required|max:10"
                  >
                    <v-radio-group
                      v-model="user_type"
                      row
                      required
                      :error-messages="errors"
                    >
                      <v-radio
                        label="Manager"
                        value="manager"
                      />
                      <v-radio
                        label="Operator"
                        value="operator"
                      />
                    </v-radio-group>
                  </validation-provider>
                  <!-- <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                  >
                    <v-text-field
                      v-model="email"
                      :error-messages="errors"
                      label="E-mail"
                      required
                    />
                  </validation-provider> -->
                  <validation-provider
                    v-slot="{ errors }"
                    name="username"
                    rules="required|max:10"
                  >
                    <v-text-field
                      v-model="username"
                      outline
                      :error-messages="errors"
                      label="Username"
                      type="text"
                    />
                  </validation-provider>
                  <v-text-field
                    v-model="password"
                    outline
                    hide-details
                    label="Password"
                    type="password"
                  />

                </v-card-text>
                <v-divider />
                <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
                  <v-btn
                    color="info"
                    text
                  >
                    Forgot password?
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    color="info"
                    class="mr-4"
                    type="submit"
                    :disabled="invalid"
                    :large="$vuetify.breakpoint.smAndUp"
                  >
                    Login
                  </v-btn>
                  <v-btn @click="clear" 
                    :large="$vuetify.breakpoint.smAndUp"
                  >
                    Clear
                  </v-btn>
                </v-card-actions>
              </v-card>
            </form>
          </validation-observer>
        </v-col>
        <v-col
          sm="12"
          md="6"
          offset-md="3"
        >
          <v-row
            align="center"
            justify="space-between"
          >
            <p class="text-caption my-3">
              <a href="#">Privacy Policy</a>
              |
              <a href="#">Terms of Service</a>
            </p>
            <p class="text-caption my-3">
              Powered by Bozlur Rahman
            </p>
          </v-row>
        </v-col>
      </v-container>
    </v-app>
  </div>
</template>

<script>
// Utilities
  import { get } from 'vuex-pathify'
  import '../plugins/vee-validate'

  export default {
    name: 'LoginView',
    data: () => ({
      darkTheme: true,
      platformName: 'Login',
      user_type: 'manager',
      password: null,
      username: null,
    }),
    computed: {
      sales: get('sales/sales'),
      totalSales () {
        return this.sales.reduce((acc, val) => acc + val.salesInM, 0)
      },
    },
    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.user_type='manager';
        this.password=null;
        this.username=null;
        this.$refs.observer.reset()
      },
    },
  }
</script>

<style scoped>
.v-btn,
.v-card {
  border-radius: 4px;
}
.v-card__title {
  text-transform: uppercase;
}
</style>
