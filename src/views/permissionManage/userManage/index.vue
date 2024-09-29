<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户新增" name="first">
            <AddUser v-if="activeName=='first'" />
        </el-tab-pane>
        <el-tab-pane label="用户查询管理" name="second">
            <UserSearch v-if="activeName=='second'" />
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import AddUser from "./addUser.vue";
import UserSearch from "./userSearch.vue";
export default {
    components: {
        AddUser,
        UserSearch,
    },
    data() {
        return {
            activeName: "second"
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style lang="less" scoped></style>
