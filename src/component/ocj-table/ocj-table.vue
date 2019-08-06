<template>
    <el-table :data="data" style="width: 100%" :cell-class-name="cellClassName" @select="$comSelect" @select-all="$comSelect">
        <template slot="empty" class="flex-ju-al-center">
            <img src="http://img95.699pic.com/photo/40052/8563.jpg_wh300.jpg" alt="" />
        </template>
        <!-- 组件需求： 多选框列和内容列第一列固定 -->
        <el-table-column v-if="checkbox" type="selection" width="30" fixed></el-table-column>
        <div v-for="(item, index) in column" :key="'otable' + index">
            <el-table-column
                v-if="!isShowSlots(Object.keys(item)[0])"
                :prop="`${Object.keys(item)[0]}`"
                :label="item[Object.keys(item)[0]]"
                :width="item.width || ''"
                :formatter="item.formatter"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                v-if="isShowSlots(Object.keys(item)[0])"
                :prop="`${Object.keys(item)[0]}`"
                :label="item[Object.keys(item)[0]]"
                :width="item.width || ''"
                :formatter="item.formatter"
                show-overflow-tooltip
            >
                <template slot-scope="scope">
                    <slot v-bind="scope" :name="Object.keys(item)[0]"></slot>
                    <!--                <slot v-if="item[Object.keys(item)[0]] === column[index][Object.keys(item)[0]]" v-bind="scope" :name="Object.keys(item)[0]"></slot>-->
                </template>
            </el-table-column>
        </div>
        <!-- 组件需求： 操作列固定 -->
        <el-table-column v-if="showOperation" fixed="right" label="操作项" :width="operationWidth">
            <template slot-scope="scope">
                <slot v-bind="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'oTable',
    props: {
        // 表单数据
        data: {
            type: Array,
            default: () => []
        },
        // 表单列内容
        column: {
            type: Array,
            default: () => []
        },
        // 是否展示checkbox
        checkbox: {
            type: Boolean,
            default: true
        },
        // 样式设置回调函数，返回参数为cell数据
        cellClassName: {
            type: Function
        },
        // 设置操作项宽度
        operationWidth: {
            type: String,
            default: 'auto'
        },
        showOperation: {
            type: Boolean,
            default: false
        },
        showSlots: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        // 将选中的状态值抛出去接收
        $comSelect(selectData) {
            if (!this.checkbox) {
                return false;
            }
            this.$emit('onSelect', selectData);
        },
        isShowSlots(val) {
            return this.showSlots.includes(val);
        }
    }
};
</script>
<style src="../index.scss"></style>
