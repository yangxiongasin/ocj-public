import ocjTable from './component/ocj-table/ocj-table.vue'
const components = {
    ocjTable
}
const install = function (Vue, opts = {}) {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[ key ])
    })
}
export default Object.assign(components, {install})
