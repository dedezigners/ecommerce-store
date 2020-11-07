<template>
    <div>
        <CRow>
            <CCol col="12" xl="12">
                <input type="file" ref="file" style="display: none" multiple @change="onFileSelected" />
                
                <div class="h6 alert alert-danger" v-if="error">{{ error }}</div>
                
                <h3>
                    Media Library
                    <CButton
                    color="primary" size="sm" variant="outline"
                    @click="$refs.file.click()">
                    <CIcon name="cil-cloud-upload"/>&nbsp; Add Media</CButton>
                </h3>
                <hr />
            </CCol>

            <CCol col="12" xl="12">
                <div class="media-wrapper">
                    <div
                    v-for="item in mediaLibrary"
                    :key="item.id"
                    class="media-wrapper__item">
                        <media-item :item="item" />
                    </div>
                </div>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import MediaItem from '../widgets/MediaItem';
export default {
    name: 'media',
    components: {
        MediaItem
    },
    data() {
        return {
            isLoading: false,
            attachments: [],
            error: ''
        }
    },
    computed: {
        mediaLibrary: {
            get() { return this.$store.state.mediaLibrary; },
            set(val) { return val; }
        }
    },
    methods: {
        uploadMedia(val) {
            console.log('upload section');
        },
        onFileSelected(event) {
            this.attachments = [];
            event.target.files.forEach(file => {
                this.attachments.push(file);
            });
            this.reset();
            
            if (!this.attachments.length) {
                this.error = "No files selected please choose some files which you want to upload.";
            } else {
                let formData = new FormData();

                this.attachments.forEach(file => {
                    formData.append('media_files[]', file);
                });

                axios.post(`media`, formData, {
                    headers: {"Content-Type": "multipart/form-data"}
                }).then(res => {
                    this.$store.dispatch('saveMediaLibraryData', res.data.data);
                    this.reset();
                }).catch(err => console.log(err.response.data));
            }
        },
        reset() {
            const input = this.$refs.file;
            input.type = 'text';
            input.type = 'file';
        }
    }
}
</script>

<style lang="scss" scoped>
.media-wrapper {
    display: flex;
    flex-wrap: wrap;

    &__item {
        width: 100%;
        background: #fff;
        margin-top: 2%;
        border: 1px solid rgba(76, 124, 67, 0.2);
        padding: 5px;

        @media (min-width: 250px) {
            width: 49%;
            margin-right: 2%;
            &:nth-child(even) { margin-right: 0; }
        }
        
        @media (min-width: 400px) {
            width: 32%;
            &:nth-child(even) { margin-right: 2%; }
            &:nth-child(3n) { margin-right: 0; }
        }
        
        @media (min-width: 500px) {
            width: 23.5%;
            &:nth-child(3n) { margin-right: 2%;}
            &:nth-child(4n) { margin-right: 0; }
        }
        
        @media (min-width: 600px) {
            width: 18.4%;
            &:nth-child(4n) { margin-right: 2%;}
            &:nth-child(5n) { margin-right: 0; }
        }
        
        @media (min-width: 700px) {
            width: 15%;
            &:nth-child(5n) { margin-right: 2%;}
            &:nth-child(6n) { margin-right: 0; }
        }
        
        @media (min-width: 800px) {
            width: 12.571428571%;
            &:nth-child(6n) { margin-right: 2%;}
            &:nth-child(7n) { margin-right: 0; }
        }
        
        @media (min-width: 900px) {
            width: 10.75%;
            &:nth-child(7n) { margin-right: 2%;}
            &:nth-child(8n) { margin-right: 0; }
        }
        
        @media (min-width: 1000px) {
            width: 9.33%;
            &:nth-child(8n) { margin-right: 2%;}
            &:nth-child(9n) { margin-right: 0; }
        }

        &:before {
            content: "";
            float: left;
            padding-top: 100%;
        }
    }
}
</style>