'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Users,
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
  Building2,
  UserCheck,
  Search,
  Filter,
  Download
} from 'lucide-react';

// 模拟数据
const mockDashboard = {
  totalLeads: 156,
  newLeads: 23,
  pendingApprovals: 8,
  activeDealers: 45,
  monthRevenue: 12500000,
  conversionRate: 42
};

const mockLeads = [
  {
    id: 'LD001',
    projectName: '某大型制造企业智能化改造项目',
    dealerName: '北京科技有限公司',
    dealerContact: '李总',
    stage: '待分配',
    value: 850000,
    createdAt: '2025-01-18',
    priority: '高'
  },
  {
    id: 'LD002',
    projectName: '智慧园区能源管理系统',
    dealerName: '上海智能科技有限公司',
    dealerContact: '王总',
    stage: '跟进中',
    assignedTo: '张经理',
    value: 1200000,
    createdAt: '2025-01-15',
    priority: '高'
  },
  {
    id: 'LD003',
    projectName: '医院信息化升级项目',
    dealerName: '广州系统集成商',
    dealerContact: '陈总',
    stage: '跟进中',
    assignedTo: '李经理',
    value: 650000,
    createdAt: '2025-01-12',
    priority: '中'
  },
  {
    id: 'LD004',
    projectName: '高校实验室设备采购',
    dealerName: '深圳科技发展有限公司',
    dealerContact: '刘总',
    stage: '报价中',
    assignedTo: '王经理',
    value: 420000,
    createdAt: '2025-01-10',
    priority: '低'
  }
];

const mockApprovals = [
  {
    id: 'AP001',
    type: '报价申请',
    dealerName: '北京科技有限公司',
    projectName: '智慧园区项目',
    amount: '¥1,200,000',
    status: '待审批',
    submittedAt: '2025-01-18',
    priority: '高'
  },
  {
    id: 'AP002',
    type: '资源申请',
    dealerName: '上海智能科技有限公司',
    projectName: '智能制造项目',
    amount: '3名工程师',
    status: '待审批',
    submittedAt: '2025-01-16',
    priority: '中'
  },
  {
    id: 'AP003',
    type: '特价申请',
    dealerName: '广州系统集成商',
    projectName: '医院信息化项目',
    amount: '折扣85%',
    status: '待审批',
    submittedAt: '2025-01-14',
    priority: '高'
  }
];

const mockDealers = [
  {
    id: 'DL001',
    name: '北京科技有限公司',
    level: '金牌经销商',
    totalProjects: 28,
    totalRevenue: 4500000,
    status: '活跃',
    lastActive: '2025-01-18'
  },
  {
    id: 'DL002',
    name: '上海智能科技有限公司',
    level: '银牌经销商',
    totalProjects: 15,
    totalRevenue: 2800000,
    status: '活跃',
    lastActive: '2025-01-17'
  },
  {
    id: 'DL003',
    name: '广州系统集成商',
    level: '金牌经销商',
    totalProjects: 32,
    totalRevenue: 5200000,
    status: '活跃',
    lastActive: '2025-01-16'
  }
];

export default function AOSSalesPortal() {
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
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900 dark:text-white">AOS营销人员门户</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">华北区营销部</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1">
                <MessageSquare className="h-3 w-3" />
                5条待处理
              </Badge>
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
                AOS
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
            <p className="text-slate-600 dark:text-slate-400">线索管理、审批流程与经销商支持</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              导出报表
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              创建政策
            </Button>
          </div>
        </div>

        {/* 标签页切换 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">数据看板</TabsTrigger>
            <TabsTrigger value="leads">线索管理</TabsTrigger>
            <TabsTrigger value="approvals">审批管理</TabsTrigger>
            <TabsTrigger value="dealers">经销商管理</TabsTrigger>
            <TabsTrigger value="analytics">数据分析</TabsTrigger>
          </TabsList>

          {/* 数据看板 */}
          <TabsContent value="dashboard">
            <div className="grid gap-6">
              {/* 统计卡片 */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  icon={<Target className="h-4 w-4" />}
                  title="线索总数"
                  value={mockDashboard.totalLeads}
                  change="+18%"
                  color="blue"
                />
                <StatCard
                  icon={<AlertCircle className="h-4 w-4" />}
                  title="新线索"
                  value={mockDashboard.newLeads}
                  change="+25%"
                  color="orange"
                />
                <StatCard
                  icon={<Clock className="h-4 w-4" />}
                  title="待审批"
                  value={mockDashboard.pendingApprovals}
                  change="+3"
                  color="purple"
                />
                <StatCard
                  icon={<Building2 className="h-4 w-4" />}
                  title="活跃经销商"
                  value={mockDashboard.activeDealers}
                  change="+5%"
                  color="green"
                />
              </div>

              {/* 待分配线索和待审批申请 */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* 待分配线索 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      待分配线索
                    </CardTitle>
                    <CardDescription>需要分配跟进人员的项目线索</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockLeads.filter(l => l.stage === '待分配').slice(0, 3).map((lead) => (
                        <LeadItem key={lead.id} lead={lead} />
                      ))}
                      {mockLeads.filter(l => l.stage === '待分配').length === 0 && (
                        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                          暂无待分配线索
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* 待审批申请 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      待审批申请
                    </CardTitle>
                    <CardDescription>需要您审批的申请事项</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockApprovals.map((approval) => (
                        <ApprovalItem key={approval.id} approval={approval} />
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
                    区域业绩趋势
                  </CardTitle>
                  <CardDescription>华北区近6个月的销售业绩变化</CardDescription>
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

          {/* 线索管理 */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>线索管理</CardTitle>
                    <CardDescription>管理所有项目线索的分配和跟进</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      筛选
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      新增线索
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeads.map((lead) => (
                    <LeadItem key={lead.id} lead={lead} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 审批管理 */}
          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>审批管理</CardTitle>
                    <CardDescription>处理报价、资源、特价等审批请求</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      筛选
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApprovals.map((approval) => (
                    <ApprovalItem key={approval.id} approval={approval} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 经销商管理 */}
          <TabsContent value="dealers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>经销商管理</CardTitle>
                    <CardDescription>查看和管理区域内的经销商信息</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Search className="mr-2 h-4 w-4" />
                      搜索
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      新增经销商
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDealers.map((dealer) => (
                    <DealerItem key={dealer.id} dealer={dealer} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 数据分析 */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>数据分析</CardTitle>
                <CardDescription>销售业绩和区域数据深度分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="flex h-64 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <div className="text-center">
                      <BarChart3 className="mx-auto h-12 w-12 mb-2 opacity-50" />
                      <p className="text-sm">销售趋势分析</p>
                    </div>
                  </div>
                  <div className="flex h-64 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <div className="text-center">
                      <Target className="mx-auto h-12 w-12 mb-2 opacity-50" />
                      <p className="text-sm">线索转化漏斗</p>
                    </div>
                  </div>
                  <div className="flex h-64 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <div className="text-center">
                      <Building2 className="mx-auto h-12 w-12 mb-2 opacity-50" />
                      <p className="text-sm">经销商业绩排名</p>
                    </div>
                  </div>
                  <div className="flex h-64 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <div className="text-center">
                      <DollarSign className="mx-auto h-12 w-12 mb-2 opacity-50" />
                      <p className="text-sm">产品销售分析</p>
                    </div>
                  </div>
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

// 线索项组件
function LeadItem({ lead }: { lead: typeof mockLeads[0] }) {
  const stageColors: Record<string, string> = {
    '待分配': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    '跟进中': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    '报价中': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    '谈判中': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  };

  const priorityColors: Record<string, string> = {
    '高': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    '中': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    '低': 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-semibold text-slate-900 dark:text-white">{lead.projectName}</h3>
          <Badge variant="secondary" className={stageColors[lead.stage]}>
            {lead.stage}
          </Badge>
          <Badge variant="outline" className={priorityColors[lead.priority]}>
            {lead.priority}优先级
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span>经销商: {lead.dealerName}</span>
          <span>联系人: {lead.dealerContact}</span>
          <span>创建: {lead.createdAt}</span>
          {lead.assignedTo && <span>负责: {lead.assignedTo}</span>}
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-slate-900 dark:text-white">
          ¥{(lead.value / 10000).toFixed(0)}万
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">ID: {lead.id}</p>
      </div>
    </div>
  );
}

// 审批项组件
function ApprovalItem({ approval }: { approval: typeof mockApprovals[0] }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-semibold text-slate-900 dark:text-white">{approval.dealerName}</h3>
          <Badge variant="outline">{approval.type}</Badge>
        </div>
        <div className="mb-1 text-sm text-slate-600 dark:text-slate-400">
          项目: {approval.projectName}
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span>金额: {approval.amount}</span>
          <span>提交: {approval.submittedAt}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
          待审批
        </Badge>
        <Button size="sm" variant="outline">
          查看详情
        </Button>
      </div>
    </div>
  );
}

// 经销商项组件
function DealerItem({ dealer }: { dealer: typeof mockDealers[0] }) {
  const levelColors: Record<string, string> = {
    '金牌经销商': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    '银牌经销商': 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
    '铜牌经销商': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
          <Building2 className="h-6 w-6 text-slate-600 dark:text-slate-400" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-slate-900 dark:text-white">{dealer.name}</h3>
            <Badge variant="secondary" className={levelColors[dealer.level]}>
              {dealer.level}
            </Badge>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              {dealer.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <span>项目数: {dealer.totalProjects}</span>
            <span>总营收: ¥{(dealer.totalRevenue / 10000).toFixed(0)}万</span>
            <span>最后活跃: {dealer.lastActive}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline">
          <UserCheck className="mr-2 h-4 w-4" />
          查看详情
        </Button>
      </div>
    </div>
  );
}
