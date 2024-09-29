<template>
    <el-menu
      :collapse="isSidebarNavCollapse"
      :default-active="sidebarCurrentMenu"
    >
      <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
    </el-menu>
</template>

<script>
import DynamicMenu from './dynamic-menu'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            title: '人和家办管理系统',
            isCollapse: false
        }
    },
    computed: {
        ...mapState(['isSidebarNavCollapse']),
        ...mapState('permission', ['sidebarMenu', 'sidebarCurrentMenu'])
    },
    methods: {},
    components: {
        DynamicMenu
    },
    mounted(){

    }
}
</script>
<style lang="scss">

</style>

