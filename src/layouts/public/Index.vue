<template>
  <v-app>
    <public-view />
  </v-app>
</template>

<script>
  export default {
    name: 'PublicLayout',

    components: {
      PublicView: () => import(
        /* webpackChunkName: "public-view" */
        './View'
      ),
    },
  }
</script>
