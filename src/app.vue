<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height:calc(100vh - 174px);
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu :active-key="menukey" theme="dark" width="auto" @on-select="selectHandle">
                    <div class="layout-logo-left"></div>
                    <Menu-item key="index">
                        <Icon type="ios-world" :size="iconSize"></Icon>
                        <span class="layout-text">开始</span>
                    </Menu-item>
                    <Menu-item key="user">
                        <Icon type="ios-person" :size="iconSize"></Icon>
                        <span class="layout-text">人员管理</span>
                    </Menu-item>
                    <Menu-item key="prescription">
                        <Icon type="clipboard" :size="iconSize"></Icon>
                        <span class="layout-text">处方管理</span>
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item>xxx</Breadcrumb-item>
                        <Breadcrumb-item>xxx</Breadcrumb-item>
                        <Breadcrumb-item>xxx</Breadcrumb-item>
                        <div style="float:right" @click="goback()"><Icon type="arrow-return-left" size="30"></Icon></div>
                    </Breadcrumb>

                </div>
                <div class="layout-content">
                    <div class="layout-content-main"><router-view></router-view></div>
                </div>
                <div class="layout-copy">
                    2018-2020 &copy; zyh
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19,
                menukey:'index'
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            },
            menukey(){
                if(this.$route.path.indexOf('index')>0){
                    return 'index'
                }else if(this.$route.path.indexOf('user')>0){
                    return 'user'
                }else if(this.$route.path.indexOf('prescription')>0){
                    return 'prescription';
                }
                return 'index'
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            goback(){
                window.history.go(-1);
            },
            selectHandle(key){
                this.$router.go("/"+key);
            }
        },
        created(){

        }
    }
</script>
