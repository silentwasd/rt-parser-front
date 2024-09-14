// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools         : {enabled: true},
    extends          : ['@nuxt/ui-pro'],
    modules          : ["@nuxt/ui", "@vueuse/nuxt"],
    compatibilityDate: "2024-09-14",

    runtimeConfig: {
        public: {
            apiUrl  : process.env.NUXT_API_URL,
            assetUrl: process.env.NUXT_ASSET_URL
        }
    },
})