<template>
    <div>
        <CRow>
            <CCol col="12" xl="12">

                <div class="page">
                    <h2 class="page--heading">{{ $route.name }}</h2>
                    <router-link to="product/create"
                    class="btn page--action btn-outline-primary btn-sm">
                    <CIcon name="cil-plus"/>&nbsp; Create Product</router-link>
                </div>

                <CCard>
                    <CCardBody>
                        <CDataTable
                        hover
                        :items="tableData"
                        :fields="fields"
                        :items-per-page="10"
                        head-color="light"
                        :loading="isLoading"
                        :pagination="{ doubleArrows: false, align: 'center'}"
                        @page-change="pageChange"
                        >
                            <template #sr_no="data">
                                <td>{{data.index + 1}}</td>
                            </template>
                            
                            <td slot="tags" slot-scope="{ item }">
                                <div class="tags-data" v-html="parseJsonData(item.tags)"></div>
                            </td>

                            <template #actions="data">
                                <td>
                                    <CButton
                                    size="sm" color="primary"
                                    @click="[goToEdit(data.index)]"
                                    v-c-tooltip.hover.click="'Edit'">
                                        <CIcon name="cil-pencil"/>
                                    </CButton>
                                    <CButton
                                    v-c-tooltip.hover.click="'Delete'"
                                    @click="[goToDelete(data.index)]"
                                    size="sm" color="danger">
                                        <CIcon name="cil-x-circle"/>
                                    </CButton>
                                </td>
                            </template>
                        </CDataTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

        <CModal
        :show.sync="modalCreateUpdate" :close-on-backdrop="false"
        :close-on-esc="false" :centered="true"
        title="Modal title 2" size="lg" color="dark">
            <CForm enctype="multipart/form-data">
                
                <CInput
                label="Attribute Name *" placeholder="Color"
                v-model="form.name" horizontal
                @keyup="createSlug"
                :is-valid="errors.name ? false : null"
                :invalid-feedback="errors.name ? errors.name[0] : ''" />

                <CInput
                label="Attribute Slug *" placeholder="color"
                v-model="form.slug" horizontal
                :is-valid="errors.slug ? false : null"
                :invalid-feedback="errors.slug ? errors.slug[0] : ''" />
                
                <div class="form-group form-row">
                    <label class="col-form-label col-sm-3"> Attribute Tags </label>
                    <div class="col-sm-9">
                        <vue-tags-input
                        v-model="tag"
                        :tags="tags"
                        @tags-changed="newTags => tags = newTags" />
                        <small class="form-text text-muted w-100">Press enter for adding multiple tags</small>
                    </div>
                </div>
            </CForm>
            
            <template #header>
                <h6 class="modal-title">{{ HEADERS.TITLES[activeModal] }}</h6>
                <CButtonClose @click="modalCreateUpdate = false" class="text-white"/>
            </template>
            <template #footer>
                <CButton @click="modalCreateUpdate = false" color="danger">Cancel</CButton>
                <CButton
                @click="[activeModal === PAGES.CREATE_DATA ? create() : update(form.index)]"
                color="success">{{ HEADERS.BUTTONS[activeModal] }}</CButton>
            </template>
        </CModal>

        <CModal
        :show.sync="modalRemove" :close-on-backdrop="false"
        :close-on-esc="false" :centered="true"
        title="Modal title 2" size="sm" color="dark">
            
            Are you sure you want to {{ HEADERS.TITLES[activeModal] }}?

            <template #header>
                <h6 class="modal-title">{{ HEADERS.TITLES[activeModal] }}</h6>
                <CButtonClose @click="modalRemove = false" class="text-white"/>
            </template>
            <template #footer>
                <CButton @click="modalRemove = false" color="secondary">Cancel</CButton>
                <CButton
                @click="deleteData(form.index)"
                color="warning">{{ HEADERS.BUTTONS[activeModal] }}</CButton>
            </template>
        </CModal>
    </div>
</template>

<script>
const PAGES = Object.freeze({
    CREATE_DATA: 'CREATE_DATA',
    UPDATE_DATA: 'UPDATE_DATA',
    DELETE_DATA: 'DELETE_DATA'
});

const TITLES = Object.freeze({
    CREATE_DATA: `Create Attribute`,
    UPDATE_DATA: 'Update Attribute',
    DELETE_DATA: 'Delete Attribute'
});

const BUTTONS = Object.freeze({
    CREATE_DATA: `Create`,
    UPDATE_DATA: 'Update',
    DELETE_DATA: 'Delete Attribute'
});

import VueTagsInput from '@johmun/vue-tags-input';

export default {
    name: 'attributes',
    components: {
        VueTagsInput
    },
    data() {
        return {
            isLoading: true,
            tableData: [],
            fields: [
                { key: 'sr_no', label: 'Sr #' },
                { key: 'name', label: 'Category', _classes: 'font-weight-bold' },
                { key: 'slug', label: 'Slug' },
                { key: 'tags', label: 'Tags' },
                { key: 'created_at', label: 'Created' },
                { key: 'actions' }
            ],
            activePage: 1,
            modalCreateUpdate: false,
            modalRemove: false,
            activeModal: PAGES.CREATE_DATA,
            form: {
                index: null,
                name: '',
                slug: '',
                tags: []
            },
            PAGES,
            HEADERS : {
                TITLES,
                BUTTONS
            },
            errors: [],
            labelIcon: {
                labelOn: '\u2713',
                labelOff: '\u2715'
            },
            tag: '',
            tags: []
        }
    },
    mounted() {
        this.getTableData();
    },
    methods: {
        getTableData() {
            axios.get(`attributes`).then(res => {
                this.isLoading = false;
                this.tableData = res.data.data;
            }).catch(err => console.log(err));
        },
        pageChange (val) {
            this.$router.push({ query: { page: val }})
        },
        goToCreate() {
            this.errors = [];
            this.activeModal = PAGES.CREATE_DATA;
            this.form.index = null;
            this.form.name = '';
            this.form.slug = '';
            this.tags = [];
            this.modalCreateUpdate = true;
        },
        goToEdit(index) {
            this.errors = [];
            this.activeModal = PAGES.UPDATE_DATA;
            this.form.index = index;
            this.form.name = this.tableData[index].name;
            this.form.slug = this.tableData[index].slug;
            this.tags = [];
            let tags = JSON.parse(this.tableData[index].tags);
            tags.forEach(tag => {
                this.tags.push({text: tag});
            });
            this.modalCreateUpdate = true;
        },
        goToDelete(index) {
            this.activeModal = PAGES.DELETE_DATA;
            this.form.slug = this.tableData[index].slug;
            this.form.index = index;
            this.modalRemove = true;
        },
        createSlug() {
            let name = this.form.name;
            this.form.slug = this.stringToSlug(name);
        },
        create() {
            let tags = this.tags;
            this.form.tags = [];
            tags.forEach(tag => { this.form.tags.push(tag.text); });
            this.errors = [];
            axios.post(`attribute`, this.form)
            .then(res => {
                this.tableData.unshift(res.data.data);
                this.modalCreateUpdate = false;
            }).catch(err => this.errors = err.response.data.errors);
        },
        update(index) {
            this.errors = [];
            let slug = this.tableData[index].slug;

            let tags = this.tags;
            this.form.tags = [];
            tags.forEach(tag => { this.form.tags.push(tag.text); });

            axios.post(`attribute/${slug}`, this.form)
            .then(res => {
                this.tableData.splice(index, 1);
                this.tableData.unshift(res.data.data);
                this.modalCreateUpdate = false;
            }).catch(err => this.errors = err.response.data.errors);
        },
        deleteData(index) {
            axios.delete(`attribute/${this.tableData[index].slug}`)
            .then(res => {
                this.tableData.splice(index, 1);
                this.modalRemove = false;
            }).catch(err => console.log(err));
        },
        stringToSlug(str) {
            str = str.replace(/^\s+|\s+$/g, ""); // trim
            str = str.toLowerCase();

            // remove accents, swap ñ for n, etc
            var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
            var to = "aaaaaaeeeeiiiioooouuuunc------";

            for (var i = 0, l = from.length; i < l; i++) {
                str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
            }

            str = str
                .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
                .replace(/\s+/g, "-") // collapse whitespace and replace by -
                .replace(/-+/g, "-") // collapse dashes
                .replace(/^-+/, "") // trim - from start of text
                .replace(/-+$/, ""); // trim - from end of text

            return str;
        },
        parseJsonData(data) {
            let tags = JSON.parse(data);
            data = '';
            tags.forEach((tag) => {
                data += '<span class="btn btn-secondary btn-sm mr-1">' + tag + '</span>';
            });
            return data;
        }
        
    }
}
</script>

<style lang="scss" scoped>

</style>