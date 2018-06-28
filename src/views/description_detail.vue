<template>
   <div class="layout-content"  style="min-height:480px">
       <Card style="width:100%;min-height:380px">
           <p slot="title">
               <Icon type="ios-person" size="20" style="margin-bottom:-5px"></Icon>
               <span>{{detail.user.name}} | {{userSex}} | {{detail.user.age||'*'}}岁</span>
               <Icon type="p"></Icon>
           </p>
           <div>
               <h3 style="text-align:center;margin-bottom:20px;">{{detail.name}}</h3>
               <hr/>
               <div style="padding:20px 40px;">
                   <Row>
                       <i-col span="12" v-for="item in detail.medicals" style="text-align:center;"><div>{{item.name}}<span style="margin-left:30px;">{{item.count}}</span></div></i-col>
                   </Row>
               </div>
           </div>
       </Card>
   </div>
</template>
<script>
    import ajax from '../libs/ajax';
    export default {
        name: "descriptionDetail",
        props:['dataid'],
        data(){
          return {
              detail:{}
          }
        },
        computed:{
            userSex:function(){
                var zd={
                    'nan':"男",
                    'nv':'女',
                    '':'保密'
                };
                var sex='';
                if(this.detail&&this.detail.user){
                    if(this.detail.user.sex){
                        return zd[this.detail.user.sex];
                    }
                }
                return "*";
            }
        },
        watch:{
            dataid:function(val){
                this.detail={};
                if(val&&val!==''){
                    this.getData(val);
                }
            }
        },
        methods:{
            getData:function(id){
                var _self=this;
                ajax.get(apiPath+'prescription/'+id).then(function(result){
                    _self.detail=result.data;
                })
            }
        }
    }
</script>

<style scoped>

</style>
