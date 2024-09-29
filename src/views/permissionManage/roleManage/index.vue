<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="添加角色" name="first">
            <Left v-if="activeName=='first'" />
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="second">
            <Right v-if="activeName=='second'" />
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import Left from "./Left.vue";
import Right from "./Right.vue";
export default {
    components: {
        Left,
        Right
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
