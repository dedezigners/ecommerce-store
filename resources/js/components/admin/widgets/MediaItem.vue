<template>
    <div class="media-item">
        <img :src="item.link" width="1px" :alt="item.name" />
    </div>
</template>

<script>
export default {
    name: 'MediaItem',
    props: {
        item: {
            type: Object,
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>
.media-item{
    display: flex;
    width: 100%;
    height: 100%;
    max-height: 100%;
    align-items: center;
    vertical-align: middle;
    
    img {
        flex: 1;
        text-align: center;
        max-width: 100%;
    }
}
</style>