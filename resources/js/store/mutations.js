export default {
    toggleSidebarDesktop (state) {
        const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile (state) {
        const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
        state[variable] = value
    },
    saveParentCategories (state, parentCategories) {
        parentCategories.forEach(category => {
            state.parentCategories.push(category);
        });
    }
};