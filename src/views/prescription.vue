<template>
    <div>
        <Row>
            <i-col span="6">
                <Date-picker type="datetimerange" format="yyyy-MM-dd" placeholder="记录时间" :value.sync="params.daterange"></Date-picker>
            </i-col>
            <i-col span="5">
                <i-input :value.sync="params.name">
                    <span slot="prepend">处方名称</span>
                </i-input>
            </i-col>
            <i-col span="4" >
                <i-input :value.sync="params.username">
                    <span slot="prepend">人员</span>
                </i-input>
            </i-col>
            <i-col span="5">
                <i-input :value.sync="params.medicalname">
                    <span slot="prepend">包含药名</span>
                </i-input>
            </i-col>
            <i-col span="3">
                <i-button size="small" type="primary" @click="query()"><Icon type="search" size="20"></Icon></i-button>
                <i-button size="small" type="warning" @click="toAdd"><Icon type="plus-round" size="20"></Icon></i-button>
            </i-col>
        </Row>
    </div>
    <br/>
    <div>
        <i-table height="560" :columns="columns" :data="datas"></i-table>
    </div>
    <Modal :visible.sync="isShowDetail" title="处方详情" @on-ok="ok" @on-cancel="cancel" width="800">
        <description-detail :dataid.sync="descriptionId"></description-detail>
    </Modal>
</template>
<script>
    import descriptionDetail from './description_detail';
    import ajax from '../libs/ajax';
    import objTools from 'object-tools';
    import moment from 'moment';
    import Vue from 'vue';
    Vue.component('descriptionDetail',descriptionDetail);
    export default {
        data(){
            return {
                isShowDetail:false,
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
                        title: '处方所属人',
                        key: 'username'
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
                            return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="default" size="small" @click="edit(${index})">编辑</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
                        }
                    }
                ],
                datas:[],
                descriptionId:null,
                params:{}
            }
        },
        methods: {
            show (index) {
                this.isShowDetail=true;
                this.descriptionId=this.datas[index].id;
            },
            edit(index){
                this.$router.go('/prescription/edit/'+this.datas[index].id);
            },
            remove (index) {

            },
            findData(){
                var _self=this;
                var params=objTools.clone(this.params);
                if(params.daterange&&params.daterange.length>0){
                    params.startDate=(!!params.daterange[0])?moment(params.daterange[0]).format("YYYY-MM-DD"):undefined;
                    params.endDate=(!!params.daterange[1])?moment(params.daterange[1]).format("YYYY-MM-DD"):undefined;
                }
                delete params.daterange;
                ajax.get(window.apiPath+'prescriptions/',{params:params}).then(function(result){
                    _self.datas=result.data;
                })
            },
            query(){
                this.findData();
            },
            toAdd(){
                this.$router.go('/prescription/add');
            }
        },
        created(){
            this.query()
        }
    }
</script>

<style scoped>

</style>
