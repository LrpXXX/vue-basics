<template>
  <div>
    <treeselect v-if='!lazy' @select='nodeclick'  :disabled="disabled" :disable-branch-nodes="disableBranch" :close-on-select="closeOnSelect" noChildrenText='没有数据了' noOptionsText='暂无数据' placeholder=''  :searchable='searchable' :clearable='clearable' :multiple='multiple' :normalizer='setNormalizer'  v-model='selectValue' :options='staticOption.options'/>
    <treeselect v-if='lazy'  @select='nodeclick'  :disabled="disabled" :disable-branch-nodes="disableBranch" :close-on-select="closeOnSelect" noChildrenText='没有数据了' noOptionsText='暂无数据' placeholder=''  :searchable='searchable' :clearable='clearable' :multiple='multiple' :normalizer='setNormalizer'  v-model='selectValue' :options='lazyOption.options'  :load-options="urlLazyLoad">
    </treeselect>
  </div>
</template>
<script>
import zform from "@/modules/zform/service/api/zform/zformApi";  //调用后台api
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  export default {
    components: { Treeselect },
    data() {
      return {
        lock:false,
        selectValue:null,
        staticOption:{//静态配置
          options:[],
          },
        lazyOption:{//懒加载配置
          options: null
        }
      }
    },
    props:{
     value:{ //对应model
       type:Object | String | Number | Array,
       default:null
     },
     label:{//用于回显
       type:String,
       default:''
     },
     searchable:{//允许搜索
      type:Boolean,
      default:false
     },
     clearable:{//是否出现清空按钮
      type:Boolean,
      default:true
     },
     lazy:{//是否是懒加载
       type:Boolean,
       default:false
     },
     disableBranch:{//是否禁用分支
      type:Boolean,
      default:false
     },
     closeOnSelect:{//是否在选择时关闭
      type:Boolean,
      default:false
     },
     disabled:{//是否disabled
       type:Boolean,
       default:false
     },
     multiple:{//是否多选
       type:Boolean,
       default:false
     },
     dataType:{//数据类型  :数据源，元数据等
      type:String,
      default:null
     },
     normalizer:{//属性对应
      type:Object,
      default:function(){
        return {
          id:'id',
          label:'label',
          children:'children',
          parentCode:'levelcode',
          isLeaf:'isleaf'
        }
      }
     },
     dataSourceType:{//数据源类型
      type:String,
      default:'url'
     },
     dataSource://数据源
      [String,Array,Object],
     backModel:{//返回model的函数
      type:Function,
      default:function(callback){
      }
     }
    },
    created(){
      debugger
      if(!this.lazy&&this.dataSourceType=='url'){//url加载的一次性数据
        this.urlLoad();
      }
      if(!this.lazy&&this.dataSourceType=='static'){//静态数据
        this.staticLoad();
      }
    },
    methods: {
      setNormalizer(node){//设置属性对应 不动
        //处理叶子节点和非叶子节点
        let isLeaf=false;
        if(this.normalizer.isLeaf instanceof Function){
          isLeaf=this.normalizer.isLeaf(node);//是函数执行函数
        }else if(this.normalizer.isLeaf instanceof String || typeof this.normalizer.isLeaf == 'string'){
          isLeaf=node[this.normalizer.isLeaf];//是对应属性就找对应属性
        }else if(this.normalizer.isLeaf instanceof Boolean){
          isLeaf=this.normalizer.isLeaf;//是boolean就直接锁定
        }//其他的（包括没值的）不处理

        let childrenData;

        if(!isLeaf){//当前不是叶子节点
          this.normalizer.children=!this.normalizer.children?'children':this.normalizer.children;
          if(!node[this.normalizer.children]){//没定义了下级数据
            node[this.normalizer.children]=null;//树控件认为null是有下级的
          }
          childrenData=node[this.normalizer.children];
        }
        return {
          id:node[this.normalizer.id||'id'],
          label:node[this.normalizer.label||'label'],
          children:childrenData,
        }
      },
      setReflexion(){//设置数据反显
        if(this.lazy&&this.lazyOption.options){
          return false;
        }
        if(!this.lock&&this.value){ //给一个初值(反显)
           let initmodel={}
           if(!this.label){ //没有传入label时的懒加载
              zform.getSelectDownreeDataSource(this.dataSource+"/null/"+this.value,res => { 
                this.label=res.data.label;
                initmodel[this.normalizer.id]=this.value;
                initmodel[this.normalizer.label]=this.label;
                this.lazyOption.options=[initmodel];
              })
           }else{
            initmodel[this.normalizer.id]=this.value;
            initmodel[this.normalizer.label]=this.label;
            this.lazyOption.options=[initmodel];
           }
           this.lock=true;
         }
      },
      urlLazyLoad({ action, parentNode, callback }){//url懒加载时
      debugger
        this.setReflexion();//反显
        if(!this.dataSource){
          return false;
        }
        let levelcode;
        if(action == 'LOAD_CHILDREN_OPTIONS'){//加载子节点
          levelcode=parentNode[this.normalizer.parentCode];
        }
        zform.getSelectDownreeDataSource(this.dataSource+'/'+levelcode+"/"+null,res => { 
          if (res.code == 200){ 
            if(action == 'LOAD_CHILDREN_OPTIONS'){//加载子节点
              if(typeof parentNode[this.normalizer.children]!='undefined'){
                this.$set(parentNode,this.normalizer.children,res.data.treeNode);
                this.lazyOption.options.reverse().reverse(); //加这一步原因是让属性被监听到
              }
            }else{
              this.$set(this.lazyOption,'options',res.data.treeNode);
            }
            callback();
          }
        });
      },
      urlLoad(){//url普通一次性加载
        if(!this.dataSource){
          return false;
        }
        try{
          zform.getSelectDownreeDataSource(this.dataSource,res => { 
            if(res.code==200){
              this.staticOption.options=res.data;
            }
          });
        }catch(e){

        }
      },
      staticLoad(){//静态数据加载
        this.staticOption.options=this.dataSource;
      },
      nodeclick(node,instanceId){//选择点击事件
        this.backModel(node);//给上级返回选择的model
        this.selectValue=node[this.normalizer.id];
        this.$emit('popData',this.selectValue);//返回value v-model
      }
    },
    model:{
      event:'popData'
    },
    watch:{
      value:{
        handler:function(value){
          this.value = value
          if(this.value){
            this.selectValue=this.value;
          }
        }
      }
    }
  };
</script>
<style scoped>
 
</style>
