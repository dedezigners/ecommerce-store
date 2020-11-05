<template>
    <div>
        <CRow>
            <CCol col="12" xl="12">
                <CCard>
                    <CCardHeader>
                        <span class="h4">{{ $route.name }}</span>
                        <div class="card-header-actions">
                            <CButton
                            size="sm" color="success"
                            @click="goToCreate"
                            v-c-tooltip.hover.click="'Create'">
                                <CIcon name="cil-plus"/>
                            </CButton>
                        </div>
                    </CCardHeader>
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
                            
                            <template #image="data">
                                <td class="text-center">
                                    <div class="c-avatar">
                                        <img :src="data.item.image" class="c-avatar-img" alt="">
                                    </div>
                                </td>
                            </template>

                            <template #hidden='data'>
                                <td>
                                    <CSwitch
                                    :checked="!data.item.hidden ? true : false"
                                    @update:checked="hideUnhide(data.index)"
                                    color="success" variant="opposite"
                                    shape="pill" v-bind="labelIcon" />
                                </td>
                            </template>

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
                label="Category Name *" placeholder="Category Name"
                v-model="form.name" horizontal
                @keyup="createSlug"
                :is-valid="errors.name ? false : null"
                :invalid-feedback="errors.name ? errors.name[0] : ''" />

                <CInput
                label="Category Slug *" placeholder="Category Slug"
                v-model="form.slug" horizontal
                :is-valid="errors.slug ? false : null"
                :invalid-feedback="errors.slug ? errors.slug[0] : ''" />

                <CSelect
                label="Parent" :options="parentCategories"
                :value.sync="form.parent" horizontal
                :is-valid="errors.parent ? false : null"
                :invalid-feedback="errors.parent ? errors.parent[0] : ''" />
            </CForm>
            
            <template #header>
                <h6 class="modal-title">{{ HEADERS.TITLES[activeModal] }}</h6>
                <CButtonClose @click="modalCreateUpdate = false" class="text-white"/>
            </template>
            <template #footer>
                <CButton @click="modalCreateUpdate = false" color="danger">Cancel</CButton>
                <CButton
                @click="[activeModal === PAGES.CREATE_DATA ? createCategory() : updateCategory(form.index)]"
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
                @click="deleteCategory(form.index)"
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
    CREATE_DATA: `Create Category`,
    UPDATE_DATA: 'Update Category',
    DELETE_DATA: 'Delete Category'
});

const BUTTONS = Object.freeze({
    CREATE_DATA: `Create`,
    UPDATE_DATA: 'Update',
    DELETE_DATA: 'Delete Category'
});

export default {
    name: 'categories',
    data() {
        return {
            isLoading: true,
            tableData: [],
            fields: [
                { key: 'sr_no', label: 'Sr #', _classes: 'font-weight-bold' },
                { key: 'image', label: '' },
                { key: 'name', label: 'Category', _classes: 'font-weight-bold' },
                { key: 'slug', label: 'Slug' },
                { key: 'parent_name', label: 'Parent' },
                { key: 'created_at', label: 'Created' },
                { key: 'actions' }
            ],
            activePage: 1,
            modalCreateUpdate: false,
            modalRemove: false,
            activeModal: PAGES.CREATE_DATA,
            form: {
                index: null,
                image: null,
                uploadImage: null,
                name: '',
                slug: '',
                parent: '',
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
        }
    },
    mounted() {
        this.getTableData();
    },
    computed: {
        parentCategories() {
            return this.$store.state.parentCategories;
        }
    },
    methods: {
        getTableData() {
            axios.get(`categories`).then(res => {
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
            this.form.name = '';
            this.form.slug = '';
            this.form.parent = 0;
            this.form.index = null;
            this.form.image = null;
            this.form.uploadImage = null;
            this.modalCreateUpdate = true;
        },
        goToEdit(index) {
            this.errors = [];
            this.activeModal = PAGES.UPDATE_DATA;
            this.form.name = this.tableData[index].name;
            this.form.slug = this.tableData[index].slug;
            this.form.parent = this.tableData[index].parent;
            this.form.index = index;
            this.form.image = null;
            this.form.uploadImage = this.tableData[index].image;
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
        createCategory() {
            this.errors = [];
            let formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('slug', this.form.slug);
            if (this.form.parent) formData.append('parent', this.form.parent);
            if (this.form.image) formData.append('image', this.form.image);

            axios.post(`category`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            }).then(res => {
                this.tableData.unshift(res.data.data);
                this.modalCreateUpdate = false;
            }).catch(err => this.errors = err.response.data.errors);
        },
        updateCategory(index) {
            this.errors = [];
            let slug = this.tableData[index].slug;

            let formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('slug', this.form.slug);
            formData.append('parent', this.form.parent);
            if (this.form.image) formData.append('image', this.form.image);

            axios.post(`category/${slug}`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            }).then(res => {
                this.tableData.splice(index, 1);
                this.tableData.unshift(res.data.data);
                this.modalCreateUpdate = false;
            }).catch(err => this.errors = err.response.data.errors);
        },
        deleteCategory(index) {
            axios.delete(`category/${this.tableData[index].slug}`)
            .then(res => {
                this.tableData.splice(index, 1);
                this.modalRemove = false;
            }).catch(err => console.log(err));
        },
        onFileSelected(event) {
            this.form.image = event[0];
            console.log(event);
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
        }
    }
}
</script>

<style lang="sass" scoped>

</style>