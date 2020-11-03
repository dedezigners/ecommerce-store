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
    }
};