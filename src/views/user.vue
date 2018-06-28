<template>
    <div>
        <i-table height="560" :columns="columns" :data="datas"></i-table>
    </div>
    <Modal :visible.sync="isShowBl" title="历史病历" width="800">
        <user-bl :userid.sync="userId" :username.sync="username" :useruid.sync="useruid"></user-bl>
    </Modal>
</template>
<script>
    import Vue from 'vue';
    import ajax from '../libs/ajax';
    import userbl from './user_bl';
    Vue.component('userBl',userbl);
    export default {
        name: "user",
        data(){
            return {
                username:null,
                userId:null,
                useruid:null,
                isShowBl:false,
                columns: [
                    {
                        title: 'uid',
                        key: 'uid'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        render(row, column, index){
                            var zd={
                                'nan':"男",
                                'nv':'女',
                                '':'保密'
                            };
                            if(this.datas&&this.datas[index]){
                                return zd[this.datas[index].sex];
                            }
                            return "*";
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '电话号码',
                        key: 'phone'
                    },
                    {
                        title:"操作",
                        key:'opt',
                        render(row, column, index){
                            return `<i-button type="default" @click="show(${index})">病历本</i-button>`;
                        }
                    }
                ],
                datas:[]
            }
        },
        created(){
            var _self=this;
            ajax.get(window.apiPath+'users').then(function(res){
                _self.datas=res.data;
            });
        },
        methods:{
            show:function(index){
                this.userId=this.datas[index].id;
                this.username=this.datas[index].name;
                this.useruid=this.datas[index].uid;
                this.isShowBl=true;
            }
        }
    }
</script>

<style scoped>

</style>
