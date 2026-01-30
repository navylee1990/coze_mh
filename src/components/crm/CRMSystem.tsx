'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  FolderKanban,
  Building,
  ShoppingCart,
  FileText,
  Headphones,
  Cpu,
  Search,
  Download,
  Plus,
  Filter,
  ArrowRight,
  Package,
  RefreshCw,
  Users
} from 'lucide-react';

// 模拟项目数据
const mockProjects = [
  {
    id: 'PRJ202501001',
    name: '某大型制造企业智能化改造项目',
    address: '江苏省南京市江宁区',
    phone: '025-88888888',
    status: '跟进中',
    stage: '需求调研',
    submitDate: '2025-01-15',
    value: 850000
  },
  {
    id: 'PRJ202501002',
    name: '智慧园区能源管理系统',
    address: '上海市浦东新区',
    phone: '021-66666666',
    status: '报价中',
    stage: '方案设计',
    submitDate: '2025-01-10',
    value: 1200000
  },
  {
    id: 'PRJ202501003',
    name: '医院信息化升级项目',
    address: '北京市朝阳区',
    phone: '010-55555555',
    status: '谈判中',
    stage: '合同谈判',
    submitDate: '2025-01-08',
    value: 650000
  },
  {
    id: 'PRJ202501004',
    name: '高校实验室设备采购',
    address: '广东省广州市天河区',
    phone: '020-77777777',
    status: '已完成',
    stage: '项目交付',
    submitDate: '2025-01-05',
    value: 420000
  },
  {
    id: 'PRJ202501005',
    name: '金融中心安防系统',
    address: '浙江省杭州市滨江区',
    phone: '0571-99999999',
    status: '跟进中',
    stage: '技术交流',
    submitDate: '2025-01-18',
    value: 580000
  }
];

// 模拟办事大厅数据
const mockProcesses = [
  {
    processId: 'PROC202501001',
    processTitle: '经销商资质认证流程',
    processName: '经销商资质认证',
    creator: '张经理',
    createTime: '2025-01-15',
    currentNode: '审批中',
    currentOperator: '李总监',
    status: '进行中',
    processCode: 'PC-001'
  },
  {
    processId: 'PROC202501002',
    processTitle: '价格申请审批流程',
    processName: '价格申请',
    creator: '王经理',
    createTime: '2025-01-12',
    currentNode: '待审批',
    currentOperator: '财务部',
    status: '待处理',
    processCode: 'PC-002'
  },
  {
    processId: 'PROC202501003',
    processTitle: '合同审批流程',
    processName: '合同审批',
    creator: '赵经理',
    createTime: '2025-01-10',
    currentNode: '已完成',
    currentOperator: '-',
    status: '已完成',
    processCode: 'PC-003'
  }
];

// 模拟租赁订单数据
const mockLeaseOrders = [
  {
    orderId: 'ORD202501001',
    orderNo: 'LZ202501001',
    customerName: '某大型制造企业',
    contractDate: '2025-01-15',
    startDate: '2025-01-20',
    endDate: '2026-01-19',
    quantity: 50,
    amount: 450000,
    status: '进行中'
  },
  {
    orderId: 'ORD202501002',
    orderNo: 'LZ202501002',
    customerName: '智慧园区项目',
    contractDate: '2025-01-10',
    startDate: '2025-01-15',
    endDate: '2026-01-14',
    quantity: 80,
    amount: 720000,
    status: '进行中'
  }
];

// 模拟买断订单数据
const mockBuyOrders = [
  {
    orderId: 'ORD202501003',
    orderNo: 'BD202501001',
    customerName: '医院信息化项目',
    contractDate: '2025-01-08',
    deliveryDate: '2025-01-20',
    quantity: 100,
    amount: 950000,
    status: '待交付'
  },
  {
    orderId: 'ORD202501004',
    orderNo: 'BD202501002',
    customerName: '高校实验室项目',
    contractDate: '2025-01-05',
    deliveryDate: '2025-01-18',
    quantity: 60,
    amount: 570000,
    status: '已完成'
  }
];

// 模拟续租订单数据
const mockRenewOrders = [
  {
    orderId: 'ORD202501005',
    orderNo: 'XR202501001',
    originalOrderNo: 'LZ202401015',
    customerName: '某金融机构',
    originalEndDate: '2025-01-15',
    newEndDate: '2026-01-14',
    quantity: 40,
    amount: 360000,
    status: '待确认'
  }
];

// 模拟宣传物料数据
const mockMaterials = [
  {
    materialId: 'MAT001',
    materialName: '产品宣传册（A4版）',
    category: '宣传册',
    stock: 500,
    unit: '册',
    status: '充足'
  },
  {
    materialId: 'MAT002',
    materialName: '产品介绍海报',
    category: '海报',
    stock: 200,
    unit: '张',
    status: '充足'
  },
  {
    materialId: 'MAT003',
    materialName: '公司宣传视频',
    category: '视频',
    stock: 1,
    unit: '个',
    status: '充足'
  },
  {
    materialId: 'MAT004',
    materialName: '技术参数手册',
    category: '手册',
    stock: 300,
    unit: '本',
    status: '充足'
  },
  {
    materialId: 'MAT005',
    materialName: '产品样品包',
    category: '样品',
    stock: 50,
    unit: '套',
    status: '充足'
  }
];

// 模拟移机申请数据
const mockMoveApplications = [
  {
    applicationId: 'MAPP202501001',
    customerName: '某大型制造企业',
    moveDate: '2025-02-01',
    deviceCount: 5,
    originalAddress: '江苏省南京市江宁区',
    newAddress: '江苏省南京市鼓楼区',
    applicant: '张经理',
    applyDate: '2025-01-20',
    status: '待审批'
  },
  {
    applicationId: 'MAPP202501002',
    customerName: '智慧园区项目',
    moveDate: '2025-02-05',
    deviceCount: 8,
    originalAddress: '上海市浦东新区',
    newAddress: '上海市闵行区',
    applicant: '王经理',
    applyDate: '2025-01-18',
    status: '审批中'
  }
];

// 模拟退机申请数据
const mockReturnApplications = [
  {
    applicationId: 'RAPP202501001',
    customerName: '某金融机构',
    orderNo: 'LZ202401010',
    returnDate: '2025-02-10',
    deviceCount: 10,
    returnReason: '项目结束',
    applicant: '李经理',
    applyDate: '2025-01-22',
    status: '待确认'
  }
];

// 模拟IOT用户数据
const mockIotUsers = [
  {
    userId: 'IOTU001',
    userName: '南京雪濠洋环保科技有限公司',
    contact: '季晓东',
    phone: '138****5678',
    deviceCount: 50,
    status: '正常'
  },
  {
    userId: 'IOTU002',
    userName: '上海智慧园区科技有限公司',
    contact: '张经理',
    phone: '139****1234',
    deviceCount: 80,
    status: '正常'
  },
  {
    userId: 'IOTU003',
    userName: '北京医疗器械有限公司',
    contact: '王经理',
    phone: '137****9876',
    deviceCount: 35,
    status: '异常'
  }
];

type MenuKey = 'project' | 'service' | 'order' | 'materials' | 'support' | 'iot';
type OrderSubKey = 'lease' | 'buy' | 'renew';
type SupportSubKey = 'move' | 'return';
type IotSubKey = 'user';

interface CRMSystemProps {
  showHeader?: boolean;
}

export default function CRMSystem({ showHeader = true }: CRMSystemProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('project');
  const [activeOrderSub, setActiveOrderSub] = useState<OrderSubKey>('lease');
  const [activeSupportSub, setActiveSupportSub] = useState<SupportSubKey>('move');
  const [activeIotSub, setActiveIotSub] = useState<IotSubKey>('user');

  const menuItems = [
    { key: 'project' as MenuKey, icon: FolderKanban, label: '项目开发' },
    { key: 'service' as MenuKey, icon: Building, label: '办事大厅' },
    {
      key: 'order' as MenuKey,
      icon: ShoppingCart,
      label: '销售订单',
      hasSubmenu: true
    },
    { key: 'materials' as MenuKey, icon: FileText, label: '宣传物料' },
    {
      key: 'support' as MenuKey,
      icon: Headphones,
      label: '售后服务',
      hasSubmenu: true
    },
    {
      key: 'iot' as MenuKey,
      icon: Cpu,
      label: 'IOT管理',
      hasSubmenu: true
    }
  ];

  const orderSubItems = [
    { key: 'lease' as OrderSubKey, icon: Package, label: '租赁订单' },
    { key: 'buy' as OrderSubKey, icon: ShoppingCart, label: '买断订单' },
    { key: 'renew' as OrderSubKey, icon: RefreshCw, label: '续租订单' }
  ];

  const supportSubItems = [
    { key: 'move' as SupportSubKey, icon: ArrowRight, label: '移机申请' },
    { key: 'return' as SupportSubKey, icon: Package, label: '退机申请' }
  ];

  const iotSubItems = [
    { key: 'user' as IotSubKey, icon: Users, label: '用户管理' }
  ];

  return (
    <div className="space-y-6">
      {/* 顶部标题 */}
      {showHeader && (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <FolderKanban className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">商净CRM</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">客户关系管理系统</p>
          </div>
        </div>
      )}

      {/* 主体内容 */}
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* 左侧菜单 */}
        <Card className="h-fit sticky top-8">
          <CardContent className="p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.key;

                if (item.hasSubmenu) {
                  return (
                    <div key={item.key} className="space-y-1">
                      <button
                        onClick={() => {
                          setActiveMenu(item.key);
                          if (item.key === 'order') setActiveOrderSub('lease');
                          if (item.key === 'support') setActiveSupportSub('move');
                          if (item.key === 'iot') setActiveIotSub('user');
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>

                      {/* 子菜单 */}
                      {isActive && (
                        <div className="ml-4 space-y-1">
                          {item.key === 'order' &&
                            orderSubItems.map((subItem) => {
                              const SubIcon = subItem.icon;
                              const isSubActive = activeOrderSub === subItem.key;
                              return (
                                <button
                                  key={subItem.key}
                                  onClick={() => setActiveOrderSub(subItem.key)}
                                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                                    isSubActive
                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                  }`}
                                >
                                  <SubIcon className="h-4 w-4" />
                                  <span className="text-sm">{subItem.label}</span>
                                </button>
                              );
                            })}
                          {item.key === 'support' &&
                            supportSubItems.map((subItem) => {
                              const SubIcon = subItem.icon;
                              const isSubActive = activeSupportSub === subItem.key;
                              return (
                                <button
                                  key={subItem.key}
                                  onClick={() => setActiveSupportSub(subItem.key)}
                                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                                    isSubActive
                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                  }`}
                                >
                                  <SubIcon className="h-4 w-4" />
                                  <span className="text-sm">{subItem.label}</span>
                                </button>
                              );
                            })}
                          {item.key === 'iot' &&
                            iotSubItems.map((subItem) => {
                              const SubIcon = subItem.icon;
                              const isSubActive = activeIotSub === subItem.key;
                              return (
                                <button
                                  key={subItem.key}
                                  onClick={() => setActiveIotSub(subItem.key)}
                                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                                    isSubActive
                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                  }`}
                                >
                                  <SubIcon className="h-4 w-4" />
                                  <span className="text-sm">{subItem.label}</span>
                                </button>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveMenu(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* 右侧内容区 */}
        <div className="space-y-6">
          {activeMenu === 'project' && <ProjectFiling />}
          {activeMenu === 'service' && <ServiceHall />}
          {activeMenu === 'order' && <SalesOrder activeSub={activeOrderSub} />}
          {activeMenu === 'materials' && <PromotionalMaterials />}
          {activeMenu === 'support' && (
            <AfterSalesService activeSub={activeSupportSub} />
          )}
          {activeMenu === 'iot' && <IotManagement activeSub={activeIotSub} />}
        </div>
      </div>
    </div>
  );
}

// 项目备案界面
function ProjectFiling() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">项目备案</h2>
        <p className="text-slate-600 dark:text-slate-400">项目信息查询与管理</p>
      </div>

      {/* 查询条件 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="projectNo">项目号</Label>
                <Input id="projectNo" placeholder="请输入项目号" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectName">项目名称</Label>
                <Input id="projectName" placeholder="请输入项目名称" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectLevel">项目等级</Label>
                <Input id="projectLevel" placeholder="请输入项目等级" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectAddress">项目地址</Label>
                <Input id="projectAddress" placeholder="请输入项目地址" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="phone">电话</Label>
                <Input id="phone" placeholder="请输入电话" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Input id="status" placeholder="请选择状态" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage">节点</Label>
                <Input id="stage" placeholder="请选择节点" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="submitDate">提交日期</Label>
                <Input id="submitDate" type="date" />
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 pt-2">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
                查询
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                导出
              </Button>
              <Button variant="default" className="gap-2">
                <Plus className="h-4 w-4" />
                创建备案
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 明细列表 */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    项目号
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    项目名称
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    项目地址
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    电话
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    状态
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    节点
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    提交日期
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    项目金额
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {project.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {project.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {project.address}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {project.phone}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === '跟进中'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : project.status === '报价中'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                            : project.status === '谈判中'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {project.stage}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {project.submitDate}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900 dark:text-white">
                      ¥{(project.value / 10000).toFixed(0)}万
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        去跟踪
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 办事大厅界面
function ServiceHall() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">办事大厅</h2>
        <p className="text-slate-600 dark:text-slate-400">流程申请与管理</p>
      </div>

      {/* 查询条件 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="processId">申请单号</Label>
                <Input id="processId" placeholder="请输入申请单号" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applyTime">申请时间</Label>
                <Input id="applyTime" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applyType">申请类型</Label>
                <Input id="applyType" placeholder="请选择申请类型" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="processTitle">流程标题</Label>
                <Input id="processTitle" placeholder="请输入流程标题" />
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 pt-2">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
                查询
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                导出
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 明细列表 */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    流程标题
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    流程名称
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    创建人
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    创建时间
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    当前节点
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    当前未操作者
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    当前状态
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    流程编码
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockProcesses.map((process) => (
                  <tr
                    key={process.processId}
                    className="border-b hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {process.processTitle}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {process.processName}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {process.creator}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {process.createTime}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {process.currentNode}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {process.currentOperator}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          process.status === '进行中'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : process.status === '待处理'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}
                      >
                        {process.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {process.processCode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 销售订单界面
function SalesOrder({ activeSub }: { activeSub: OrderSubKey }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {activeSub === 'lease'
            ? '租赁订单'
            : activeSub === 'buy'
            ? '买断订单'
            : '续租订单'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {activeSub === 'lease'
            ? '设备租赁业务订单管理'
            : activeSub === 'buy'
            ? '设备买断业务订单管理'
            : '设备续租业务订单管理'}
        </p>
      </div>

      {/* 查询条件 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="orderNo">订单号</Label>
                <Input id="orderNo" placeholder="请输入订单号" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerName">客户名称</Label>
                <Input id="customerName" placeholder="请输入客户名称" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">订单状态</Label>
                <Input id="status" placeholder="请选择订单状态" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractDate">
                  {activeSub === 'lease' ? '合同日期' : '签订日期'}
                </Label>
                <Input id="contractDate" type="date" />
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 pt-2">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
                查询
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                导出
              </Button>
              <Button variant="default" className="gap-2">
                <Plus className="h-4 w-4" />
                创建订单
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 明细列表 */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    订单号
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    客户名称
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {activeSub === 'lease' || activeSub === 'renew'
                      ? '开始日期'
                      : '交付日期'}
                  </th>
                  {activeSub === 'lease' && (
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      结束日期
                    </th>
                  )}
                  {activeSub === 'renew' && (
                    <>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        原订单号
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        新结束日期
                      </th>
                    </>
                  )}
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    数量
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    金额
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    状态
                  </th>
                </tr>
              </thead>
              <tbody>
                {(activeSub === 'lease'
                  ? mockLeaseOrders
                  : activeSub === 'buy'
                  ? mockBuyOrders
                  : mockRenewOrders
                ).map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {order.orderNo}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {order.customerName}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {activeSub === 'lease' || activeSub === 'renew'
                        ? (order as any).startDate
                        : (order as any).deliveryDate}
                    </td>
                    {activeSub === 'lease' && (
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        {(order as any).endDate}
                      </td>
                    )}
                    {activeSub === 'renew' && (
                      <>
                        <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                          {(order as any).originalOrderNo}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                          {(order as any).newEndDate}
                        </td>
                      </>
                    )}
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {order.quantity}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900 dark:text-white">
                      ¥{(order.amount / 10000).toFixed(0)}万
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === '进行中'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : order.status === '待确认'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : order.status === '待交付'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 宣传物料界面
function PromotionalMaterials() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">宣传物料</h2>
        <p className="text-slate-600 dark:text-slate-400">宣传物料管理</p>
      </div>

      {/* 查询条件 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="materialName">物料名称</Label>
                <Input id="materialName" placeholder="请输入物料名称" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">物料类别</Label>
                <Input id="category" placeholder="请选择物料类别" />
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 pt-2">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
                查询
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                导出
              </Button>
              <Button variant="default" className="gap-2">
                <Plus className="h-4 w-4" />
                申请物料
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 明细列表 */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    物料编号
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    物料名称
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    物料类别
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    库存数量
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    单位
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    状态
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockMaterials.map((material) => (
                  <tr
                    key={material.materialId}
                    className="border-b hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {material.materialId}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {material.materialName}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {material.category}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {material.stock}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {material.unit}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {material.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button size="sm" variant="ghost">
                        申请
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 售后服务界面
function AfterSalesService({ activeSub }: { activeSub: SupportSubKey }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {activeSub === 'move' ? '移机申请' : '退机申请'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {activeSub === 'move'
            ? '设备移机服务申请管理'
            : '设备退机服务申请管理'}
        </p>
      </div>

      {/* 查询条件 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="applicationId">申请单号</Label>
                <Input id="applicationId" placeholder="请输入申请单号" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerName">客户名称</Label>
                <Input id="customerName" placeholder="请输入客户名称" />
              </div>
              {activeSub === 'move' && (
                <div className="space-y-2">
                  <Label htmlFor="newAddress">新地址</Label>
                  <Input id="newAddress" placeholder="请输入新地址" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Input id="status" placeholder="请选择状态" />
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 pt-2">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
                查询
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                导出
              </Button>
              <Button variant="default" className="gap-2">
                <Plus className="h-4 w-4" />
                创建申请
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 明细列表 */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    申请单号
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    客户名称
                  </th>
                  {activeSub === 'move' && (
                    <>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        原地址
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        新地址
                      </th>
                    </>
                  )}
                  {activeSub === 'return' && (
                    <>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        订单号
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        退机原因
                      </th>
                    </>
                  )}
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {activeSub === 'move' ? '移机日期' : '退机日期'}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    设备数量
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    申请人
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    申请日期
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    状态
                  </th>
                </tr>
              </thead>
              <tbody>
                {(activeSub === 'move'
                  ? mockMoveApplications
                  : mockReturnApplications
                ).map((application) => (
                  <tr
                    key={application.applicationId}
                    className="border-b hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {application.applicationId}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {application.customerName}
                    </td>
                    {activeSub === 'move' && (
                      <>
                        <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                          {(application as any).originalAddress}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                          {(application as any).newAddress}
                        </td>
                      </>
                    )}
                    {activeSub === 'return' && (
                      <>
                        <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                          {(application as any).orderNo}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                          {(application as any).returnReason}
                        </td>
                      </>
                    )}
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {activeSub === 'move'
                        ? (application as any).moveDate
                        : (application as any).returnDate}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {application.deviceCount}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {application.applicant}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {application.applyDate}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          application.status === '待审批'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : application.status === '审批中'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// IOT管理界面
function IotManagement({ activeSub }: { activeSub: IotSubKey }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">用户管理</h2>
        <p className="text-slate-600 dark:text-slate-400">IOT设备用户管理</p>
      </div>

      {/* 查询条件 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="userName">用户名称</Label>
                <Input id="userName" placeholder="请输入用户名称" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">联系人</Label>
                <Input id="contact" placeholder="请输入联系人" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Input id="status" placeholder="请选择状态" />
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 pt-2">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
                查询
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                导出
              </Button>
              <Button variant="default" className="gap-2">
                <Plus className="h-4 w-4" />
                添加用户
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 明细列表 */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    用户ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    用户名称
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    联系人
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    联系电话
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    设备数量
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    状态
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockIotUsers.map((user) => (
                  <tr
                    key={user.userId}
                    className="border-b hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {user.userId}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      {user.userName}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {user.contact}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {user.phone}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {user.deviceCount}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === '正常'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button size="sm" variant="ghost">
                        查看
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
