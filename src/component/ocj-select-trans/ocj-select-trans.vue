<template>
    <div class="selectTrans">
        <div class="mt-12 border-outline searchBlock" v-loading="loading">
            <div class="listBlock pl-16 pr-16" v-for="(blockMount,index) in allOptions" :key="index">
                <el-autocomplete
                        v-model="queryStringEnter[index]"
                        class="inline-input searchList"
                        :fetch-suggestions="querySearch"
                        placeholder="名称/拼音首字母"
                        @select="handleSelect"
                        value-key="name"
                        suffix-icon="el-icon-search"
                        size="small"
                        @focus="changeItemContent(allOptions[index],index)"
                ></el-autocomplete>
                <div class="mt-20 pl-4 searchItemList"  v-loading="itemLoading">
                    <div v-for="(item) in allOptions[index]" :key="item.index" @click="clickThis(item,index)" :class="breadcrumbCSS.indexOf(item.parentId)!=-1?'activeSelect':'curser'">
                        <!--<el-tooltip v-if="item.name.length > 20" :content="item.name" placement="top">-->
                            <!--<span class="searchItemList-text text-truncate d-inline-block">{{item.name}}</span>-->
                        <!--</el-tooltip>-->
                        <span class="searchItemList-text text-truncate d-inline-block">{{item.name}}</span>
                        <span class="float-right o-icon" v-if="item.leaf==0">&#xe6d2;</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="breadcrumb p-8 pl-16 mt-12">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="d-inline-block">
                <span class="float-left">已选类目：</span>
                <el-breadcrumb-item v-for="item in breadcrumbName" :key="item.index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        url: String,
        selectType: String
    },
    data () {
        return {
            loading: true,
            itemLoading: false,
            currentIndex: null,
            queryStringEnter: [],
            allOptions: [],
            suggesList: [],
            breadcrumbList: [],
            breadcrumbCSS: [],
            breadcrumbName: [],
            selectedItem: []
        };
    },
    methods: {
        clickThis (item, index) {
            this.breadcrumbList.splice(index);
            this.breadcrumbList.push(item);
            this.breadcrumbName.splice(index);
            this.breadcrumbName.push(item.name);
            this.$emit('breadcrumbName', this.breadcrumbName);
            this.selectedItem = [];
            this.selectedItem.push(item);
            if (item.leaf === 1 || this.selectType === 'selectClass') {
                this.$emit('selectedItem', this.selectedItem);
            } else {
                this.selectedItem = [];
                this.$emit('selectedItem', this.selectedItem);
            }
            this.breadcrumbCSS = [];
            this.breadcrumbList.forEach(el => {
                this.breadcrumbCSS.push(el.parentId);
            });
            let thisIndex = index + 1;
            this.allOptions.splice(thisIndex);
            if (item.leaf === 0) {
                ocj.post({
                    url: this.url, //http请求的URL
                    data: {
                        parentId: item.parentId
                    }, //请求的参数
                    //请求成功回调函数,
                    success: res => {
                        this.allOptions.push(res);
                        console.log('allOptions', this.allOptions);
                    }
                });
            }
        },
        // 搜索建议
        changeItemContent (data, index) {
            this.suggesList = data;
            this.currentIndex = index;
        },
        querySearch (queryString, cb) {
            let suggesList = this.suggesList,
                results = queryString ? suggesList.filter(this.createFilter(queryString)) : suggesList;
            cb(results);
        },
        createFilter (queryString) {
            return (suggesList) => {
                return (suggesList.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect (item) {
            this.clickThis(item, this.currentIndex);
        }
    },
    mounted () {
        ocj.post({
            url: this.url,
            data: {
                parentId: ''
            },
            success: res => {
                console.log(res);
                this.allOptions.push(res);
                this.loading = false;
                console.log('allOptions', this.allOptions);
            }
        });
    }
};
</script>
