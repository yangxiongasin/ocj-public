import comOcjPager from './component/ocj-pager/ocj-pager.vue'
import comOcjPopover from './component/ocj-popover/ocj-popover.vue'
import comOcjSelectTrans from './component/ocj-select-trans/ocj-select-trans.vue'
import comOcjTable from './component/ocj-table/ocj-table.vue'
import comOcjTree from './component/ocj-tree/ocj-tree.vue'

const components = {
    comOcjPager,
    comOcjPopover,
    comOcjSelectTrans,
    comOcjTable,
    comOcjTree
}
const install = function (Vue, opts = {}) {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[ key ])
    })
}
export default Object.assign(components, {install})
