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
  Filter
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

type MenuKey = 'project' | 'service' | 'order' | 'materials' | 'support' | 'iot';

interface CRMSystemProps {
  showHeader?: boolean;
}

export default function CRMSystem({ showHeader = true }: CRMSystemProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('project');

  const menuItems = [
    { key: 'project' as MenuKey, icon: FolderKanban, label: '项目开发' },
    { key: 'service' as MenuKey, icon: Building, label: '办事大厅' },
    { key: 'order' as MenuKey, icon: ShoppingCart, label: '销售订单' },
    { key: 'materials' as MenuKey, icon: FileText, label: '宣传物料' },
    { key: 'support' as MenuKey, icon: Headphones, label: '售后服务' },
    { key: 'iot' as MenuKey, icon: Cpu, label: 'IOT管理' }
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
          {activeMenu === 'order' && <SalesOrder />}
          {activeMenu === 'materials' && <PromotionalMaterials />}
          {activeMenu === 'support' && <AfterSalesService />}
          {activeMenu === 'iot' && <IotManagement />}
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
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">项目号</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">项目名称</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">项目地址</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">电话</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">状态</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">节点</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">提交日期</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">项目金额</th>
                </tr>
              </thead>
              <tbody>
                {mockProjects.map((project) => (
                  <tr key={project.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">{project.id}</td>
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">{project.name}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{project.address}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{project.phone}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{project.stage}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{project.submitDate}</td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-slate-900 dark:text-white">
                      ¥{(project.value / 10000).toFixed(0)}万
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

// 办事大厅
function ServiceHall() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <Building className="mx-auto h-12 w-12 text-slate-400 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">办事大厅</h3>
        <p className="text-slate-600 dark:text-slate-400">功能开发中...</p>
      </div>
    </div>
  );
}

// 销售订单
function SalesOrder() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <ShoppingCart className="mx-auto h-12 w-12 text-slate-400 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">销售订单</h3>
        <p className="text-slate-600 dark:text-slate-400">功能开发中...</p>
      </div>
    </div>
  );
}

// 宣传物料
function PromotionalMaterials() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <FileText className="mx-auto h-12 w-12 text-slate-400 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">宣传物料</h3>
        <p className="text-slate-600 dark:text-slate-400">功能开发中...</p>
      </div>
    </div>
  );
}

// 售后服务
function AfterSalesService() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <Headphones className="mx-auto h-12 w-12 text-slate-400 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">售后服务</h3>
        <p className="text-slate-600 dark:text-slate-400">功能开发中...</p>
      </div>
    </div>
  );
}

// IOT管理
function IotManagement() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <Cpu className="mx-auto h-12 w-12 text-slate-400 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">IOT管理</h3>
        <p className="text-slate-600 dark:text-slate-400">功能开发中...</p>
      </div>
    </div>
  );
}
