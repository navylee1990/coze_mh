'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  ArrowLeft,
  Plus,
  FileText,
  MessageSquare,
  BarChart3,
  Target,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  ShoppingCart,
  Upload
} from 'lucide-react';

// 模拟数据
const mockDashboard = {
  totalProjects: 48,
  activeProjects: 12,
  pendingApprovals: 3,
  totalRevenue: 2850000,
  monthRevenue: 485000,
  conversionRate: 35
};

const mockProjects = [
  {
    id: 'PRJ001',
    name: '某大型制造企业智能化改造项目',
    stage: '跟进中',
    probability: 60,
    value: 850000,
    createdAt: '2025-01-15',
    aosManager: '张经理'
  },
  {
    id: 'PRJ002',
    name: '智慧园区能源管理系统',
    stage: '报价中',
    probability: 75,
    value: 1200000,
    createdAt: '2025-01-10',
    aosManager: '李经理'
  },
  {
    id: 'PRJ003',
    name: '医院信息化升级项目',
    stage: '待审批',
    probability: 40,
    value: 650000,
    createdAt: '2025-01-08',
    aosManager: '王经理'
  },
  {
    id: 'PRJ004',
    name: '高校实验室设备采购',
    stage: '谈判中',
    probability: 85,
    value: 420000,
    createdAt: '2025-01-05',
    aosManager: '赵经理'
  }
];

const mockRequests = [
  {
    id: 'REQ001',
    type: '资源申请',
    subject: '技术支持资源申请',
    status: '待审批',
    submittedAt: '2025-01-18',
    amount: '2名工程师'
  },
  {
    id: 'REQ002',
    type: '报价申请',
    subject: '智慧园区项目报价',
    status: '审批通过',
    submittedAt: '2025-01-15',
    amount: '¥1,200,000'
  }
];

export default function DealerPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 顶部导航栏 */}
      <header className="border-b bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  返回首页
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900 dark:text-white">经销商门户</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">北京科技有限公司</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1">
                <MessageSquare className="h-3 w-3" />
                3条新消息
              </Badge>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                经
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-8">
        {/* 页面标题和操作按钮 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">工作台</h2>
            <p className="text-slate-600 dark:text-slate-400">管理您的项目、申请和订单</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              导入数据
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              新增项目线索
            </Button>
          </div>
        </div>

        {/* 标签页切换 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">数据看板</TabsTrigger>
            <TabsTrigger value="projects">项目线索</TabsTrigger>
            <TabsTrigger value="requests">我的申请</TabsTrigger>
            <TabsTrigger value="orders">订单管理</TabsTrigger>
            <TabsTrigger value="policies">政策文档</TabsTrigger>
          </TabsList>

          {/* 数据看板 */}
          <TabsContent value="dashboard">
            <div className="grid gap-6">
              {/* 统计卡片 */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  icon={<Target className="h-4 w-4" />}
                  title="项目总数"
                  value={mockDashboard.totalProjects}
                  change="+12%"
                  color="blue"
                />
                <StatCard
                  icon={<Clock className="h-4 w-4" />}
                  title="进行中项目"
                  value={mockDashboard.activeProjects}
                  change="+5%"
                  color="purple"
                />
                <StatCard
                  icon={<AlertCircle className="h-4 w-4" />}
                  title="待审批"
                  value={mockDashboard.pendingApprovals}
                  change="0"
                  color="orange"
                />
                <StatCard
                  icon={<DollarSign className="h-4 w-4" />}
                  title="本月营收"
                  value={`¥${(mockDashboard.monthRevenue / 10000).toFixed(0)}万`}
                  change="+23%"
                  color="green"
                />
              </div>

              {/* 最近项目和待处理申请 */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* 最近项目 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      最近项目
                    </CardTitle>
                    <CardDescription>您最近跟进的项目线索</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProjects.slice(0, 3).map((project) => (
                        <ProjectItem key={project.id} project={project} />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 待处理申请 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      待处理申请
                    </CardTitle>
                    <CardDescription>需要您关注和处理的申请</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRequests.map((request) => (
                        <RequestItem key={request.id} request={request} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 业绩趋势 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    业绩趋势
                  </CardTitle>
                  <CardDescription>近6个月的销售业绩变化</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-64 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <div className="text-center">
                      <BarChart3 className="mx-auto h-12 w-12 mb-2 opacity-50" />
                      <p className="text-sm">图表组件待集成</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 项目线索 */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>项目线索管理</CardTitle>
                    <CardDescription>管理所有项目线索和跟进进度</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    新增线索
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProjects.map((project) => (
                    <ProjectItem key={project.id} project={project} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 我的申请 */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>我的申请</CardTitle>
                    <CardDescription>资源申请、报价申请等提交记录</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    新增申请
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRequests.map((request) => (
                    <RequestItem key={request.id} request={request} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 订单管理 */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>订单管理</CardTitle>
                <CardDescription>查看和管理所有销售订单</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-96 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  <div className="text-center">
                    <ShoppingCart className="mx-auto h-12 w-12 mb-2 opacity-50" />
                    <p className="text-sm">订单管理模块开发中</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 政策文档 */}
          <TabsContent value="policies">
            <Card>
              <CardHeader>
                <CardTitle>政策文档</CardTitle>
                <CardDescription>查看最新的销售政策和产品文档</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <PolicyItem
                    title="2025年一季度销售政策"
                    type="销售政策"
                    date="2025-01-01"
                    status="最新"
                  />
                  <PolicyItem
                    title="新产品系列价格表"
                    type="价格政策"
                    date="2024-12-20"
                    status="有效"
                  />
                  <PolicyItem
                    title="经销商返利政策说明"
                    type="返利政策"
                    date="2024-12-15"
                    status="有效"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// 统计卡片组件
function StatCard({
  icon,
  title,
  value,
  change,
  color
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: string;
  color: 'blue' | 'purple' | 'orange' | 'green';
}) {
  const colorClasses = {
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    green: 'bg-green-600'
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            {change !== '0' && (
              <p className="mt-1 text-xs text-green-600 dark:text-green-400">{change} 较上月</p>
            )}
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colorClasses[color]}`}>
            <span className="text-white">{icon}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 项目项组件
function ProjectItem({ project }: { project: typeof mockProjects[0] }) {
  const stageColors: Record<string, string> = {
    '跟进中': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    '报价中': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    '待审批': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    '谈判中': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-semibold text-slate-900 dark:text-white">{project.name}</h3>
          <Badge variant="secondary" className={stageColors[project.stage]}>
            {project.stage}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span>ID: {project.id}</span>
          <span>AOS经理: {project.aosManager}</span>
          <span>创建: {project.createdAt}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-slate-900 dark:text-white">
          ¥{(project.value / 10000).toFixed(0)}万
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          成交概率: <span className="font-semibold text-slate-900 dark:text-white">{project.probability}%</span>
        </p>
      </div>
    </div>
  );
}

// 申请项组件
function RequestItem({ request }: { request: typeof mockRequests[0] }) {
  const statusColors: Record<string, string> = {
    '待审批': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    '审批通过': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    '审批驳回': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-semibold text-slate-900 dark:text-white">{request.subject}</h3>
          <Badge variant="secondary" className={statusColors[request.status]}>
            {request.status}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span>{request.type}</span>
          <span>提交: {request.submittedAt}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-slate-900 dark:text-white">{request.amount}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">ID: {request.id}</p>
      </div>
    </div>
  );
}

// 政策文档项组件
function PolicyItem({ title, type, date, status }: { title: string; type: string; date: string; status: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
          <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <span>{type}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      <Badge variant={status === '最新' ? 'default' : 'secondary'}>{status}</Badge>
    </div>
  );
}
