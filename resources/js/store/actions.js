export default {
    getParentCategories({ commit }) {
        let parentCategories = [];
        axios.get('parent-categories').then(res => {
            res.data.data.forEach(category => {
                parentCategories.push({
                    value: category.id,
                    label: category.name
                });
            });

            commit('saveParentCategories', parentCategories);
        });
    },
    getMediaLibrary({ commit }) {
        let mediaLibrary = [];
        axios.get('media').then(res => {
            res.data.data.forEach(media => {
                mediaLibrary.push(media);
            });

            commit('saveMediaLibrary', mediaLibrary);
        });
    },
    saveMediaLibraryData({ commit }, mediaData) {
        commit('saveUnshiftMediaLibrary', mediaData);
    }
};