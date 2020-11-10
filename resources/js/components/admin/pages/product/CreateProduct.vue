<template>
    <div>
        <CRow>
            <CForm>
            <CCol col="12" xl="8" lg="10" class="m-auto">

                <div class="page">
                    <h2 class="page--heading">{{ $route.name }}</h2>
                </div>

                <div class="product-wrapper">
                    <CCard>
                        <CCardBody>
                                <CRow class="form-group mb-0">
                                    <CCol col="12" md="6">
                                        <CInput label="Product Name" v-model="form.name" placeholder="Air X Fear" />
                                    </CCol>
                                    <CCol col="12" md="6">
                                        <CInput label="Product Slug" v-model="form.slug" placeholder="air-x-fear" />
                                    </CCol>
                                    <CCol col="12" md="6">
                                        <CInput label="Product Price" prepend="$" type="number" step="0.01" v-model="form.price" placeholder="99.98" />
                                    </CCol>
                                    <CCol col="12" md="6">
                                        <CInput label="Sale Price" prepend="$" type="number" step="0.01" disabled v-model="form.sale_price" placeholder="49.98" />
                                    </CCol>
                                    <CCol col="12" md="6">
                                        <CInput label="Product SKU" type="text" v-model="form.sku" placeholder="47687465" />
                                    </CCol>
                                    <CCol col="12" md="6">
                                        <CSelect label="Product Category" :options="parentCategories" placeholder="Please select" />
                                    </CCol>
                                    <CCol col="12">
                                        <template>
                                            <CRow form class="form-group">
                                            <CCol col="3">Product Ribbon</CCol>
                                            <CCol col="9">
                                                <CInputRadioGroup :options="ribbon" :inline="true" />
                                            </CCol>
                                            </CRow>
                                        </template>
                                    </CCol>
                                    <CCol col="12">
                                        <template>
                                            <CRow form class="form-group">
                                            <CCol col="3">On sale</CCol>
                                            <CCol col="9">
                                                <CInputRadioGroup :options="onSale" :inline="true" />
                                            </CCol>
                                            </CRow>
                                        </template>
                                    </CCol>
                                    <CCol col="12">
                                        <CTextarea label="Short Info" rows="3" placeholder="Write your short info here ..."></CTextarea>
                                    </CCol>
                                    <CCol col="12">
                                        <CTextarea class="mb-0" label="Detailed Description" rows="8" placeholder="Write your detailed description here ..."></CTextarea>
                                    </CCol>
                                </CRow>
                        </CCardBody>
                        <CCardFooter>
                            <CButton color="success">Create Product</CButton>
                            <CButton type="reset" color="danger">Reset</CButton>
                        </CCardFooter>
                    </CCard>
                </div>
            </CCol>
            </CForm>
        </CRow>
    </div>
</template>

<script>
export default {
    name: 'CreateProduct',
    data() {
        return {
            form: {
                name: '',
                slug: '',
                sku: '',
                category_id: '',
                price: '',
                stat: '',
                on_sale: '',
                sale_price: '',
                started: '',
                ended: '',
                attributes: '',
                short_intro: '',
                detail_intro: '',
                featured: '',
                secondary: '',
                images: ''
            },
            ribbon: [
                'New',
                'Hot',
                'Sale',
                'None'
            ],
            onSale: [
                'Active Sale',
                'Schedule Sale',
                'None'
            ],
            categories: [],

        }
    },
    mounted() {
        this.initTemplate();
    },
    computed: {
        parentCategories() {
            return this.$store.state.parentCategories;
        }
    },
    methods: {
        initTemplate() {
            axios.get('categories').then(res => {
                res.data.data.forEach(category => {
                    this.categories.push({
                        value: category.id,
                        label: category.name
                    })
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
