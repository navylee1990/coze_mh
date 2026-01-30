'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Calendar,
  Search,
  Download,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Target,
  TrendingUp
} from 'lucide-react';

// 模拟客户开发数据
const mockCustomers = [
  {
    id: 'CUST001',
    companyName: '南京智能制造科技有限公司',
    contactPerson: '张总',
    phone: '138****1234',
    industry: '制造业',
    status: '洽谈中',
    stage: '初步沟通',
    potentialValue: 500000,
    lastContact: '2025-01-20',
    probability: 60
  },
  {
    id: 'CUST002',
    companyName: '上海环保工程有限公司',
    contactPerson: '李经理',
    phone: '139****5678',
    industry: '环保',
    status: '跟进中',
    stage: '需求调研',
    potentialValue: 800000,
    lastContact: '2025-01-18',
    probability: 75
  },
  {
    id: 'CUST003',
    companyName: '杭州医疗器械有限公司',
    contactPerson: '王总',
    phone: '137****9012',
    industry: '医疗',
    status: '已签约',
    stage: '合同签署',
    potentialValue: 1200000,
    lastContact: '2025-01-25',
    probability: 100
  },
  {
    id: 'CUST004',
    companyName: '苏州新材料科技有限公司',
    contactPerson: '赵经理',
    phone: '136****3456',
    industry: '新材料',
    status: '洽谈中',
    stage: '方案演示',
    potentialValue: 600000,
    lastContact: '2025-01-22',
    probability: 50
  },
  {
    id: 'CUST005',
    companyName: '无锡智能制造产业园',
    contactPerson: '孙总',
    phone: '135****7890',
    industry: '园区',
    status: '跟进中',
    stage: '初步沟通',
    potentialValue: 1500000,
    lastContact: '2025-01-21',
    probability: 40
  }
];

// 模拟节奏管理数据
const mockRhythmManagement = [
  {
    id: 'RHY001',
    quarter: '2025 Q1',
    targetChannels: 12,
    completedChannels: 8,
    revenueTarget: 15000000,
    revenueCompleted: 12000000,
    progress: 67,
    status: '进行中',
    keyTasks: [
      { task: '南京区域渠道拓展', status: '进行中', dueDate: '2025-02-28' },
      { task: '杭州市场调研', status: '已完成', dueDate: '2025-01-31' },
      { task: '重点客户拜访', status: '进行中', dueDate: '2025-02-15' }
    ]
  },
  {
    id: 'RHY002',
    quarter: '2025 Q2',
    targetChannels: 15,
    completedChannels: 0,
    revenueTarget: 20000000,
    revenueCompleted: 0,
    progress: 0,
    status: '未开始',
    keyTasks: [
      { task: '渠道培训计划', status: '未开始', dueDate: '2025-04-30' },
      { task: '新产品推广', status: '未开始', dueDate: '2025-05-31' },
      { task: '行业展会参展', status: '未开始', dueDate: '2025-06-15' }
    ]
  },
  {
    id: 'RHY003',
    quarter: '2025 Q3',
    targetChannels: 18,
    completedChannels: 0,
    revenueTarget: 25000000,
    revenueCompleted: 0,
    progress: 0,
    status: '未开始',
    keyTasks: [
      { task: '渠道拓展计划', status: '未开始', dueDate: '2025-07-31' },
      { task: '市场活动策划', status: '未开始', dueDate: '2025-08-31' },
      { task: '客户满意度调查', status: '未开始', dueDate: '2025-09-30' }
    ]
  },
  {
    id: 'RHY004',
    quarter: '2025 Q4',
    targetChannels: 20,
    completedChannels: 0,
    revenueTarget: 30000000,
    revenueCompleted: 0,
    progress: 0,
    status: '未开始',
    keyTasks: [
      { task: '年度总结规划', status: '未开始', dueDate: '2025-10-31' },
      { task: '年终冲刺计划', status: '未开始', dueDate: '2025-12-31' },
      { task: '来年战略制定', status: '未开始', dueDate: '2025-12-15' }
    ]
  }
];

type ChannelSubKey = 'customers' | 'rhythm';

export function ChannelOperation() {
  const [activeSub, setActiveSub] = useState<ChannelSubKey>('customers');

  const subMenuItems = [
    { key: 'customers' as ChannelSubKey, icon: Users, label: '客户开发' },
    { key: 'rhythm' as ChannelSubKey, icon: Calendar, label: '节奏管理' }
  ];

  return (
    <div className="space-y-6">
      {/* 子菜单 */}
      <div className="flex gap-2">
        {subMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSub === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveSub(item.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 内容区域 */}
      {activeSub === 'customers' && <CustomerDevelopment />}
      {activeSub === 'rhythm' && <RhythmManagement />}
    </div>
  );
}

// 客户开发
function CustomerDevelopment() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">客户开发</h2>
        <p className="text-slate-600 dark:text-slate-400">潜在客户开发与管理</p>
      </div>

      {/* 查询条件 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">公司名称</Label>
                <Input id="companyName" placeholder="请输入公司名称" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">联系人</Label>
                <Input id="contactPerson" placeholder="请输入联系人" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">行业</Label>
                <Input id="industry" placeholder="请选择行业" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Input id="status" placeholder="请选择状态" />
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 pt-2">
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                <Search className="h-4 w-4" />
                查询
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                导出
              </Button>
              <Button variant="default" className="gap-2">
                <Plus className="h-4 w-4" />
                添加客户
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 客户列表 */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    公司
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    联系人
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    行业
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    状态
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    阶段
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    潜在价值
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    成交概率
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    最后联系
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {customer.companyName}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      <div>{customer.contactPerson}</div>
                      <div className="text-xs">{customer.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {customer.industry}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          customer.status === '已签约'
                            ? 'default'
                            : customer.status === '跟进中'
                            ? 'secondary'
                            : 'outline'
                        }
                        className={
                          customer.status === '已签约'
                            ? 'bg-green-600'
                            : customer.status === '跟进中'
                            ? 'bg-blue-600'
                            : ''
                        }
                      >
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {customer.stage}
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                      ¥{(customer.potentialValue / 10000).toFixed(0)}万
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-600"
                            style={{ width: `${customer.probability}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-900 dark:text-white">
                          {customer.probability}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {customer.lastContact}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button size="sm" variant="ghost">
                        跟进
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

// 节奏管理
function RhythmManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">节奏管理</h2>
        <p className="text-slate-600 dark:text-slate-400">季度节奏规划与执行跟踪</p>
      </div>

      {/* 季度概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        {mockRhythmManagement.map((quarter) => (
          <Card
            key={quarter.id}
            className={`hover:shadow-lg transition-shadow ${
              quarter.status === '进行中'
                ? 'border-2 border-purple-200 dark:border-purple-800'
                : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {quarter.quarter}
                </div>
                <Badge
                  variant={
                    quarter.status === '进行中'
                      ? 'default'
                      : quarter.status === '已完成'
                      ? 'secondary'
                      : 'outline'
                  }
                  className={
                    quarter.status === '进行中' ? 'bg-purple-600' : ''
                  }
                >
                  {quarter.status}
                </Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                    渠道目标
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {quarter.completedChannels}/{quarter.targetChannels}
                    </span>
                    <span className="text-purple-600 dark:text-purple-400">
                      {((quarter.completedChannels / quarter.targetChannels) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                    业绩目标
                  </div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    ¥{(quarter.revenueTarget / 10000).toFixed(0)}万
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                    完成进度
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-500"
                      style={{ width: `${quarter.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 详细计划 */}
      {mockRhythmManagement.map((quarter) => (
        <Card key={quarter.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                {quarter.quarter} - 详细计划
              </CardTitle>
              <Badge
                variant={
                  quarter.status === '进行中'
                    ? 'default'
                    : quarter.status === '已完成'
                    ? 'secondary'
                    : 'outline'
                }
                className={
                  quarter.status === '进行中' ? 'bg-purple-600' : ''
                }
              >
                {quarter.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    渠道拓展
                  </span>
                  <Users className="h-4 w-4 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {quarter.completedChannels}/{quarter.targetChannels}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  目标: {quarter.targetChannels}个
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    业绩目标
                  </span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  ¥{(quarter.revenueCompleted / 10000).toFixed(0)}万
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  目标: ¥{(quarter.revenueTarget / 10000).toFixed(0)}万
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    完成进度
                  </span>
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {quarter.progress}%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  总体进度
                </div>
              </div>
            </div>

            {/* 关键任务 */}
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                关键任务
              </h4>
              <div className="space-y-3">
                {quarter.keyTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        flex items-center justify-center w-6 h-6 rounded-full
                        ${
                          task.status === '已完成'
                            ? 'bg-green-100 dark:bg-green-900'
                            : task.status === '进行中'
                            ? 'bg-blue-100 dark:bg-blue-900'
                            : 'bg-slate-100 dark:bg-slate-700'
                        }
                      `}>
                        {task.status === '已完成' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : task.status === '进行中' ? (
                          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {task.task}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          截止日期: {task.dueDate}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        task.status === '已完成'
                          ? 'default'
                          : task.status === '进行中'
                          ? 'secondary'
                          : 'outline'
                      }
                      className={
                        task.status === '已完成'
                          ? 'bg-green-600'
                          : task.status === '进行中'
                          ? 'bg-blue-600'
                          : ''
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
