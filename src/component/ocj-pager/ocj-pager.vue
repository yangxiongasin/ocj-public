<template>
    <el-pagination
        background
        @size-change="$onSizeChange"
        @current-change="$onCurrentChange"
        :current-page="pager.pageNo"
        :page-sizes="pageSizes"
        :page-size="pager.pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
        class="flex-ju-end mt-20"
    >
    </el-pagination>
</template>
<script>
export default {
    props: {
        total: {
            type: Number,
            default: 0
        },
        pageSizes: {
            type: Array,
            default: () => [5, 10, 15, 20]
        }
    },
    data() {
        return {
            pager: {
                pageNo: 1,
                pageSize: 10
            }
        };
    },
    methods: {
        // 分页
        $onSizeChange(val) {
            this.pager.pageSize = val;
            this.pager.pageNo = 1;
            this.$emit('change', this.pager);
        },
        $onCurrentChange(val) {
            this.pager.pageNo = val;
            this.$emit('change', this.pager);
        }
    }
};
</script>
