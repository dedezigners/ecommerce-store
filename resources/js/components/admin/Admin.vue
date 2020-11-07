<template>
    <router-view />
</template>

<script>
export default {
    name: 'admin',
    created() {
        this.initStoreData();
    },
    methods: {
        initStoreData() {
            this.$store.dispatch('getParentCategories');
            this.$store.dispatch('getMediaLibrary');
        }
    }
}
</script>

<style lang="scss">
    // Import Main styles for this application
    @import '../../assets/scss/style';
</style>
