<template>
    <h3>{{username}}<i-button type="ghost" @click="addPsp">添加</i-button></h3>

    <div>
        <i-table height="560" :columns="columns" :data="bls"></i-table>
    </div>
    <Modal :visible.sync="isShowDetail" title="处方详情" @on-ok="ok" @on-cancel="cancel" width="800">
        <description-detail :dataid.sync="descriptionId"></description-detail>
    </Modal>
</template>
<script>
    import ajax from '../libs/ajax';
    import descriptionDetail from './description_detail';
    import Vue from 'vue';
    Vue.component('descriptionDetail',descriptionDetail);
    export default {
        props:['userid','username','useruid'],
        name: "userBl",
        data(){
            return {
                bls:[],
                isShowDetail:false,
                descriptionId:null,
                columns: [
                    {
                        title: '处方名',
                        key: 'name'
                    },
                    {
                        title: '简述',
                        key: 'description'
                    },
                    {
                        title: '创建时间',
                        key: 'createdAt'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="default" size="small" @click="show(${index})">编辑</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
                        }
                    }
                ],
            }
        },
        methods:{
            show (index) {
                this.isShowDetail=true;
                this.descriptionId=this.bls[index].id;
            },
            edit(index){
                this.$router.go('/prescription/edit/'+this.bls[index].id);
            },
            remove (index) {

            },
            findData(userid){
                var _self=this;
                ajax.get(window.apiPath+'user/'+userid+'/prescriptions/').then(function(result){
                    _self.bls=result.data;
                })
            },
            addPsp(){
                if(!this.useruid){
                    this.$Message.error('无法找到用户uid');
                    return;
                }
                this.$router.go('/prescription/add?uid='+this.useruid);
            }
        },
        watch:{
            userid:function(val){
                this.bls=[];
                this.findData(val);
            }
        }
    }
</script>

<style scoped>

</style>
