export const listConfing = (SELF) => {
  return {
    $queryForm: SELF.$refs,
    title: '预约管理',
    api: SELF.getList,
    isPage: true, // 是否含有分页
    isSelection: false, // 是否显示多选复选框
    columns: [
      { label: '预约单号', prop: 'sn', minWidth: 90 },
      { label: '客户名称', prop: 'name', width: 120 },
      { label: '车辆VIM', prop: 'type', minWidth: 110, sortable: 'custom' },
      { label: '车辆底盘号', prop: 'company_name' },
      { label: '车辆类型', prop: 'option', handle: SELF.look },
      { label: '检查类型', prop: 'caroption', handle: SELF.look },
      { label: '实验项目', prop: 'option', handle: SELF.look },
      { label: '负责人', prop: 'option', handle: SELF.look },
      { label: '起止时间', prop: 'option', handle: SELF.look },
      { label: '预约来源', prop: 'option', handle: SELF.look },
      { label: '预约状态', prop: 'option', handle: SELF.look },
      { label: '操作', prop: 'option', handle: SELF.look }
    ],
    data: [
      { sn: 'JBTC-PXB-A16-1', id: '0', name: '电力沟道', length: 7.3, residual_num: 1, all_fibercore_quantity: 12, used_fibercore_quantity: 6, fibercore_quantity: 6, cablesub_rate: 50, start_devicename: '市北', end_devicename: '盘溪', fiber: { allNum: 12, ableNum: 6, unableNum: 6, bad: 0, booked: 0 } },
      { sn: 'JBTC-BLB-A24-1', id: '1', name: '移动沟道', length: 7.84, residual_num: 0, all_fibercore_quantity: 24, used_fibercore_quantity: 2, fibercore_quantity: 22, cablesub_rate: 8, start_devicename: '市北', end_devicename: '柏林', fiber: { allNum: 24, ableNum: 22, unableNum: 2, bad: 0, booked: 0 } },
      { sn: 'JBTC-YHB-G6-1', id: '2', name: '10kV电力沟道', length: 5.324, residual_num: 0, all_fibercore_quantity: 6, used_fibercore_quantity: 0, fibercore_quantity: 6, cablesub_rate: 0, start_devicename: '市北', end_devicename: '洋河', fiber: { allNum: 6, ableNum: 6, unableNum: 0, bad: 0, booked: 0 } },
      { sn: 'JBTC-SSQB-G8-1', id: '3', name: '公司大院沟道', length: 1.92, residual_num: 1, all_fibercore_quantity: 8, used_fibercore_quantity: 8, fibercore_quantity: 0, cablesub_rate: 100, start_devicename: '市北', end_devicename: '松树桥', fiber: { allNum: 8, ableNum: 0, unableNum: 8, bad: 0, booked: 0 } },
      { sn: 'JBTC-RHB-A24-1', id: '4', name: '电力沟道', length: 4.26, residual_num: 0, all_fibercore_quantity: 24, used_fibercore_quantity: 10, fibercore_quantity: 14, cablesub_rate: 42, start_devicename: '市北', end_devicename: '人和', fiber: { allNum: 24, ableNum: 14, unableNum: 10, bad: 0, booked: 0 } }
    ],
    pageNum: 1,
    pageSize: 13,
    pageOpt: [13, 30, 50, 100],
    total: 0
  }
}
