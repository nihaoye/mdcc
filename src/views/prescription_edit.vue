<template>
    <i-form v-ref:form-data :model="formData" :label-width="80">
        <Card style="width:100%">
            <p slot="title">
                <Icon type="ios-person" size="20" style="margin-bottom:-5px"></Icon>
                人员信息
            </p>
            <div v-if="!formData.user.uid">
                <Form-item label="姓名">
                    <!--<AutoComplete
                            v-model="formData.user.name"
                            @on-focus="focusUser"
                            @on-search="listUser"
                            placeholder="输入姓名..."
                            style="width:200px">
                            <Option v-for="option in userList" :value="option.name" :key="option.name" @click="selectUser(option)">
                                <span class="demo-auto-complete-title">{{ option.name }}</span>
                                <span class="demo-auto-complete-count">({{ option.uid }})</span>
                            </Option>
                    </AutoComplete>
                    <Button type="primary" shape="circle" icon="ios-search" @click="listUser"></Button>-->
                    <i-input :value.sync="formData.user.name" placeholder="请输入姓名"></i-input>
                </Form-item>
                <Form-item label="年龄">
                    <i-input :value.sync="formData.user.age" placeholder="请输入年龄"></i-input>
                </Form-item>
                <Form-item label="性别">
                    <Radio-group :model.sync="formData.user.sex">
                        <Radio value="nan">男</Radio>
                        <Radio value="nv">女</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="手机号">
                    <i-input :value.sync="formData.user.phone" placeholder="请输入手机号"></i-input>
                </Form-item>
            </div>
            <div v-if="!!formData.user.uid">
                <Form-item label="姓名">
                    {{formData.user.name}}({{formData.user.uid}})
                    <i-button type='ghost' size='small' style="margin-left:50px;" @click="resetUser" v-if="!id">重置</i-button>
                </Form-item>
                <Form-item label="年龄">
                    {{formData.user.age}}
                </Form-item>
                <Form-item label="性别">
                    <span v-if="formData.user.sex==='nan'">男</span>
                    <span v-if="formData.user.sex==='nv'">女</span>
                    <span v-if="!formData.user.sex">保密</span>
                </Form-item>
                <Form-item label="手机号">
                    {{formData.user.phone}}
                </Form-item>
            </div>
        </Card>
        <br/>
        <Card style="width:100%">
            <p slot="title">
                <Icon type="clipboard" size="20" style="margin-bottom:-5px"></Icon>
                处方信息
            </p>
            <Form-item label="处方名">
                <i-input :value.sync="formData.name" placeholder="请输入"></i-input>
            </Form-item>
            <Form-item label="简述">
                <i-input :value.sync="formData.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入处方简述..."></i-input>
            </Form-item>
            <h3>药方</h3>
            <hr/>
            <br/>
            <Form-item
                    v-for="item in formData.medicals"
                    :prop="'medicals.' + $index + '.name'"
                    :rules="{required: true, message: '不填请删除', trigger: 'blur'}">
                <Row>
                    <i-col span="9">
                        <i-input type="text" :value.sync="item.name" placeholder="请输入药名..."><span slot="prepend">药名</span></i-input>
                    </i-col>
                    <i-col span="6">
                        <i-input type="text" :value.sync="item.count" placeholder="请输入用量..."><span slot="prepend">用量</span></i-input>
                    </i-col>
                    <i-col span="4" offset="1">
                        <i-button type="ghost" @click="handleRemove(item)">删除</i-button>
                    </i-col>
                </Row>
            </Form-item>
            <Form-item>
                <Row>
                    <i-col span="12">
                        <i-button type="dashed" long @click="handleAdd" icon="plus-round">新增</i-button>
                    </i-col>
                </Row>
            </Form-item>
        </Card>
        <br/>
        <br/>
        <Form-item style="text-align:center">
            <i-button type="primary" @click="handleSubmit()">提交</i-button>
            <i-button type="ghost" @click="handleReset()" style="margin-left: 8px">重置</i-button>
        </Form-item>
    </i-form>
</template>

<script>
    import ajax from '../libs/ajax';
    import objTools from 'object-tools';
    var submitlock=false;
    export default {
        name: "prescriptionEdit",
        data(){
            return {
                id:this.$route.params.id,
                readonly:false,
                psp:{},
                userList:[],
                formData: {
                    name: '',
                    description: '',
                    medicals:[{
                        name:'',
                        count:''
                    }],
                    user:{
                        uid:'',
                        name:'',
                        age:'',
                        sex:'',
                        phone:''
                    }
                }
            }
        },
        methods:{
            handleSubmit () {
                submitlock=true;
                setTimeout(function(){
                    submitlock=false;
                },3000);
                this.$refs['formData'].validate((valid) => {
                    if (!valid) {
                        this.$Message.error('表单验证失败!');
                        return ;
                    }
                    if(this.id){
                        this.update();
                    }else{
                        this.add();
                    }
                })
            },
            handleReset () {
                this.$refs['formData'].resetFields();
            },
            handleAdd () {
                this.formData.medicals.push({
                    name: undefined,
                    count:undefined
                });
            },
            handleRemove (item) {
                this.formData.medicals.$remove(item);
            },
            add(){
                var _self=this;
                var params=objTools.clone(this.formData);
                ajax.post(apiPath+'prescription/add',params).then(function(result){
                    if(result.data){
                        _self.$Message.success('新增成功!');
                        setTimeout(function(){
                            _self.$router.go('prescription/edit/'+result.data);
                        },1000)
                    }
                }).catch(function(){
                    _self.$Message.error('提交失败!');
                });
            },
            update(){
                var _self=this;
                var params=objTools.clone(this.formData);
                ajax.post(apiPath+'prescription/update',params).then(function(result){
                    if(result.data){
                        _self.$Message.success('更新成功!');
                    }
                }).catch(function(){
                    _self.$Message.error('提交失败!');
                });
            },
            listUser(){
                var _self=this;
                if(!!this.formData.user.name){
                    this.userList=[];
                    return;
                }
                ajax(window.apiPath+'users/search/'+this.formData.user.name).then(function(res){
                    _self.userList=res.data;
                })
            },
            focusUser:function(){
                this.userList=[];
            },
            selectUser:function(user){
                this.formData.user=objTools.clone(user);
                this.psp.user=objTools.clone(user);
            },
            resetUser:function(){
                this.formData.user={};
                this.psp.user={};
            }
        },
        created(){
            var _self=this;
            if(this.id){
                ajax.get(apiPath+'prescription/'+this.id).then(function(result){
                    _self.psp=result.data;
                    _self.formData=objTools.clone(_self.psp);
                });
            }
            if(!!this.$router._currentRoute.query.uid){
                ajax.get(window.apiPath+'user/'+encodeURIComponent(this.$router._currentRoute.query.uid)).then(function(result){
                    _self.psp.user=result.data;
                    _self.formData.user=objTools.clone(result.data);
                })
            }
        }
    }
</script>

<style scoped>

</style>
