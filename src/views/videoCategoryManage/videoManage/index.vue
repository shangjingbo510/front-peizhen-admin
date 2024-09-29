<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="视频上传" name="first">
            <Left v-if="activeName=='first'" />
        </el-tab-pane>
        <el-tab-pane label="视频管理" name="second">
            <Right v-if="activeName=='second'" @videoModify="videoModify" />
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import Left from "./Upload.vue";
import Right from "./Manage.vue";
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
