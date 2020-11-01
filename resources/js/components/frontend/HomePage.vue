<template>
    <main>
		<slider />
		<collection-grid />
		<top-selling />
		<featured-product />
		<featured-products />
		<brands />
		<blog />
	</main>
</template>

<script>
import Slider from './widgets/Slider';
import CollectionGrid from './widgets/CollectionGrid';
import TopSelling from './widgets/TopSelling';
import FeaturedProduct from './widgets/FeaturedProduct';
import FeaturedProducts from './widgets/FeaturedProducts';
import Brands from './widgets/Brands';
import Blog from './widgets/Blog';

export default {
	name: 'home-page',
	components: {
		Slider, CollectionGrid, TopSelling, FeaturedProduct, FeaturedProducts, Brands, Blog
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/front/home.css';
</style>