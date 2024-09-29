<template>
    <div class="menu-container">
        <template v-for="v in menuList">
            <el-submenu :index="v.name" v-if="!v.hidden && v.children && v.children.length > 0" :key="v.name">
                <template slot="title">
                    <i :class="v.meta.icon"></i>
                    <span>{{v.meta.title}}</span>
                </template>
                <el-menu-item-group>
                    <!-- <template v-for="subItem in v.children">
                        <el-menu-item :key="subItem.name" :index="subItem.name" v-if="!subItem.hidden" @click="gotoRoute(subItem.name)">
                        <i class="iconfont" :class="subItem.meta.icon"></i>
                        <span slot="title">{{subItem.meta.title}}</span>
                        </el-menu-item>
                    </template>  -->
                    <!-- 核心：当前组件的name 循环自调用 太屌了! -->
                    <my-nav :menuList="v.children"></my-nav>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item :key="v.name" :index="v.name" @click="gotoRoute(v, $event)" v-else-if="!v.hidden">
                <i :class="v.meta.icon"></i>
                <span slot="title">{{v.meta.title}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'my-nav',
        props: {
            menuList: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        methods: {
            gotoRoute(item, ev) {
                //其他菜单重置
                this.menuReset($(ev.$el).siblings(), this.menuList)
                $(ev.$el).find('i').attr('class', item.meta.activeIcon)
                this.$router.push({name: item.name})
            },
            //其他菜单重置
            menuReset(domArr, menuList){
                domArr.toArray().forEach(item => {
                    menuList.forEach(subItem => {
                        if($(item).find('span').text() === subItem.meta.title){
                            $(item).find('i').attr('class', subItem.meta.icon)
                        }
                    })
                })
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
.el-menu{
    background: #001A42;
    .el-menu-item{
        color: #999;
    }
}
.el-submenu{
    .el-submenu__title{
        color: #999;
        &:hover{
            background: #001A42;
            color: #999;
        }
    }
    .el-menu-item{
        &:hover{
            background: #001A42;
            color: #fff;
        }
        &.is-active{
            background-color: #2e80ff;
            color: #fff;
        }
    }
    &.is-active .el-submenu__title{
        color: #fff;
        .iconfont{
            color: #fff;
        }
    }
}
</style>
