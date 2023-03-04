/*
  Element 全局配置文件
  如果在index.html 中引入了对应JS，则不需要import Element
*/
// import ELEMENT from 'element-ui'; 

import global from  '@/service/zdk/global_variable'//全局变量
//弹窗
ELEMENT.Dialog.props.lockScroll.default = false;//el-dialog弹出弹窗时，不显示滚动条，防止弹窗抖动。
ELEMENT.Dialog.props.closeOnClickModal.default = false; // 修改 el-dialog 默认点击遮照为不关闭

//分页
ELEMENT.Pagination.props.pageSizes.default=global.PAGE_SIZE_ARR;//每页显示条数下拉选项
ELEMENT.Pagination.props.pageSize.default=global.PAGE_SIZE_DEFAULT;//默认每页显示条数

//ELEMENT.Input.props.size.toString.length=20;