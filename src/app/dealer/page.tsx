'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
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
  Upload,
  Calendar,
  Timer,
  Zap,
  ArrowUpRight,
  Box,
  PieChart,
  Package,
  Building,
  Trophy
} from 'lucide-react';

// 模拟数据
const mockMonthlyTarget = {
  target: 2000000,
  completed: 1250000,
  gap: 750000
};

const mockReserveHealth = {
  reserveTarget: 50,
  reserveCompleted: 42,
  reserveProgress: 84,
  health: '良好',
  closedThisWeek: 3,
  expiringSoonCount: 5
};

const mockProjectDistribution = {
  within3Months: 12,
  months2To6: 15,
  months6To12: 18,
  months12To24: 8,
  over24Months: 5
};

const mockSalesFunnel = [
  { stage: '报备', count: 45, percentage: 100, color: 'bg-blue-500' },
  { stage: '跟进中', count: 32, percentage: 71, color: 'bg-indigo-500' },
  { stage: '报价中', count: 22, percentage: 49, color: 'bg-purple-500' },
  { stage: '谈判中', count: 15, percentage: 33, color: 'bg-pink-500' },
  { stage: '赢单', count: 8, percentage: 18, color: 'bg-green-500' }
];

const mockExpiringProjects = [
  {
    id: 'PRJ001',
    name: '某大型制造企业智能化改造项目',
    stage: '谈判中',
    probability: 85,
    value: 850000,
    expiryDate: '2025-02-15',
    daysRemaining: 16,
    aosManager: '张经理',
    hasExtension: false,
    selected: false
  },
  {
    id: 'PRJ002',
    name: '智慧园区能源管理系统',
    stage: '报价中',
    probability: 75,
    value: 1200000,
    expiryDate: '2025-02-08',
    daysRemaining: 9,
    aosManager: '李经理',
    hasExtension: true,
    selected: false
  },
  {
    id: 'PRJ003',
    name: '医院信息化升级项目',
    stage: '跟进中',
    probability: 60,
    value: 650000,
    expiryDate: '2025-02-03',
    daysRemaining: 4,
    aosManager: '王经理',
    hasExtension: false,
    selected: false
  },
  {
    id: 'PRJ004',
    name: '高校实验室设备采购',
    stage: '谈判中',
    probability: 80,
    value: 420000,
    expiryDate: '2025-01-31',
    daysRemaining: 1,
    aosManager: '赵经理',
    hasExtension: false,
    selected: false
  },
  {
    id: 'PRJ005',
    name: '金融中心安防系统',
    stage: '报价中',
    probability: 65,
    value: 580000,
    expiryDate: '2025-01-29',
    daysRemaining: -1,
    aosManager: '刘经理',
    hasExtension: false,
    selected: false
  }
];

const mockPendingOrders = [
  {
    id: 'ORD001',
    name: '某大型制造企业智能化改造项目',
    stage: '谈判中',
    probability: 85,
    predictedValue: 850000,
    predictedOrderDate: '2025-02-20',
    aosManager: '张经理'
  },
  {
    id: 'ORD002',
    name: '智慧园区能源管理系统',
    stage: '谈判中',
    probability: 80,
    predictedValue: 1200000,
    predictedOrderDate: '2025-02-25',
    aosManager: '李经理'
  },
  {
    id: 'ORD003',
    name: '医院信息化升级项目',
    stage: '报价中',
    probability: 70,
    predictedValue: 650000,
    predictedOrderDate: '2025-03-01',
    aosManager: '王经理'
  },
  {
    id: 'ORD004',
    name: '高校实验室设备采购',
    stage: '谈判中',
    probability: 90,
    predictedValue: 420000,
    predictedOrderDate: '2025-02-18',
    aosManager: '赵经理'
  }
];

const mockExtensionQuota = {
  totalQuota: 10,
  usedQuota: 6,
  availableQuota: 4
};

const mockTopProducts = [
  { rank: 1, name: '智能交互平板', sales: 128, revenue: 2560000, growth: '+23%' },
  { rank: 2, name: '录播系统', sales: 96, revenue: 1920000, growth: '+18%' },
  { rank: 3, name: '校园广播系统', sales: 85, revenue: 1275000, growth: '+15%' },
  { rank: 4, name: '数字标牌', sales: 72, revenue: 1440000, growth: '+12%' },
  { rank: 5, name: '智慧教室解决方案', sales: 64, revenue: 1920000, growth: '+28%' }
];

const mockIndustryAnalysis = [
  { name: '幼教', count: 12, percentage: 14, color: 'bg-pink-500' },
  { name: 'K12(小中高)', count: 28, percentage: 33, color: 'bg-blue-500' },
  { name: '大中专院校', count: 18, percentage: 21, color: 'bg-indigo-500' },
  { name: '医疗系统', count: 8, percentage: 9, color: 'bg-green-500' },
  { name: '金融系统', count: 5, percentage: 6, color: 'bg-yellow-500' },
  { name: '政府机关/事业单位', count: 6, percentage: 7, color: 'bg-purple-500' },
  { name: '国央企业', count: 4, percentage: 5, color: 'bg-red-500' },
  { name: '外资企业', count: 2, percentage: 2, color: 'bg-orange-500' },
  { name: '民营企业', count: 8, percentage: 9, color: 'bg-teal-500' },
  { name: '个人家用', count: 3, percentage: 4, color: 'bg-cyan-500' },
  { name: '楼宇BOT', count: 2, percentage: 2, color: 'bg-violet-500' },
  { name: '校园BOT', count: 4, percentage: 5, color: 'bg-rose-500' }
];

export default function DealerPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());

  const toggleProjectSelection = (projectId: string) => {
    const newSelected = new Set(selectedProjects);
    if (newSelected.has(projectId)) {
      newSelected.delete(projectId);
    } else {
      newSelected.add(projectId);
    }
    setSelectedProjects(newSelected);
  };

  const toggleAllSelections = () => {
    if (selectedProjects.size === mockExpiringProjects.length) {
      setSelectedProjects(new Set());
    } else {
      setSelectedProjects(new Set(mockExpiringProjects.map(p => p.id)));
    }
  };

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
              {/* 当月任务完成情况仪表盘 */}
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    当月任务完成情况
                    <Badge variant="outline" className="ml-2">
                      {new Date().getFullYear()}年{new Date().getMonth() + 1}月
                    </Badge>
                  </CardTitle>
                  <CardDescription>本月销售目标完成进度</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    {/* 当月目标 */}
                    <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 dark:from-blue-950 dark:to-blue-900">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                          <Target className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">当月目标</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        ¥{(mockMonthlyTarget.target / 10000).toFixed(0)}万
                      </p>
                    </div>

                    {/* 当月已完成 */}
                    <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6 dark:from-green-950 dark:to-green-900">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">当月已完成</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        ¥{(mockMonthlyTarget.completed / 10000).toFixed(0)}万
                      </p>
                    </div>

                    {/* 当月缺口 */}
                    <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-6 dark:from-orange-950 dark:to-orange-900">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600">
                          <AlertCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">当月缺口</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        ¥{(mockMonthlyTarget.gap / 10000).toFixed(0)}万
                      </p>
                    </div>
                  </div>

                  {/* 进度条 */}
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">完成进度</span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {Math.round((mockMonthlyTarget.completed / mockMonthlyTarget.target) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(mockMonthlyTarget.completed / mockMonthlyTarget.target) * 100}
                      className="h-3"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* 项目储备健康度 */}
              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    项目储备健康度
                  </CardTitle>
                  <CardDescription>项目储备和周期分布分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 lg:grid-cols-3">
                    {/* 汇总信息 */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          汇总信息
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                            <span className="text-sm text-slate-600 dark:text-slate-400">储备目标数</span>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                              {mockReserveHealth.reserveTarget}
                            </span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                            <span className="text-sm text-slate-600 dark:text-slate-400">已储备数</span>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                              {mockReserveHealth.reserveCompleted}
                            </span>
                          </div>
                          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm text-slate-600 dark:text-slate-400">储备完成进度</span>
                              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                {mockReserveHealth.reserveProgress}%
                              </span>
                            </div>
                            <Progress value={mockReserveHealth.reserveProgress} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                            <span className="text-sm text-slate-600 dark:text-slate-400">健康度</span>
                            <Badge
                              variant={mockReserveHealth.health === '良好' ? 'default' : 'secondary'}
                              className={
                                mockReserveHealth.health === '良好'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  : ''
                              }
                            >
                              {mockReserveHealth.health}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                            <span className="text-sm text-slate-600 dark:text-slate-400">本周已关闭项目数</span>
                            <span className="text-lg font-bold text-red-600 dark:text-red-400">
                              {mockReserveHealth.closedThisWeek}
                            </span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                            <span className="text-sm text-slate-600 dark:text-slate-400">即将到期（7日内）</span>
                            <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                              {mockReserveHealth.expiringSoonCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 项目周期分布 */}
                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        项目周期分布
                      </h4>
                      <div className="space-y-3">
                        {[
                          { label: '3个月内', value: mockProjectDistribution.within3Months, color: 'bg-blue-500' },
                          { label: '2-6个月', value: mockProjectDistribution.months2To6, color: 'bg-indigo-500' },
                          { label: '6-12个月', value: mockProjectDistribution.months6To12, color: 'bg-purple-500' },
                          { label: '12个月以上', value: mockProjectDistribution.months12To24, color: 'bg-pink-500' },
                          { label: '24个月以上', value: mockProjectDistribution.over24Months, color: 'bg-slate-500' }
                        ].map((item) => (
                          <div key={item.label} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm text-slate-600 dark:text-slate-400">{item.label}</span>
                              <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                              <div
                                className={`h-2 rounded-full ${item.color}`}
                                style={{
                                  width: `${(item.value / mockReserveHealth.reserveCompleted) * 100}%`
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 销售漏斗 */}
                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        销售漏斗
                      </h4>
                      <div className="space-y-3">
                        {mockSalesFunnel.map((item) => (
                          <div key={item.stage} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`h-3 w-3 rounded-full ${item.color}`} />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                  {item.stage}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                {item.count} ({item.percentage}%)
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                              <div
                                className={`h-2 rounded-full ${item.color}`}
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 畅销产品排行TOP5 和 行业分析 */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* 畅销产品排行TOP5 */}
                <Card className="border-2 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-green-600" />
                      畅销产品排行 TOP5
                    </CardTitle>
                    <CardDescription>本月产品销售情况统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTopProducts.map((product) => (
                        <div
                          key={product.rank}
                          className="flex items-center gap-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-800"
                        >
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                              product.rank === 1
                                ? 'bg-yellow-500'
                                : product.rank === 2
                                ? 'bg-gray-400'
                                : product.rank === 3
                                ? 'bg-orange-600'
                                : 'bg-slate-400'
                            }`}
                          >
                            {product.rank}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 dark:text-white">{product.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                              <span>销量: {product.sales}</span>
                              <span>营收: ¥{(product.revenue / 10000).toFixed(0)}万</span>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            {product.growth}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 行业分析 */}
                <Card className="border-2 border-indigo-200 dark:border-indigo-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-indigo-600" />
                      行业分析
                    </CardTitle>
                    <CardDescription>各行业项目分布统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {mockIndustryAnalysis.map((industry) => (
                        <div
                          key={industry.name}
                          className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`h-3 w-3 rounded-full ${industry.color}`} />
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {industry.name}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {industry.percentage}%
                            </Badge>
                          </div>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">{industry.count}个</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 近一月即将到期项目清单和待申请订单 */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* 近一月即将到期项目清单 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-red-600" />
                          近一月即将到期项目清单
                        </CardTitle>
                        <CardDescription>需要及时跟进即将到期的项目</CardDescription>
                      </div>
                      {/* 延期额度显示 */}
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border border-purple-200 dark:border-purple-800 p-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-slate-600 dark:text-slate-400">额度池:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{mockExtensionQuota.totalQuota}个</span>
                            <span className="text-slate-500">/</span>
                            <span className="text-slate-600 dark:text-slate-400">占用:</span>
                            <span className="font-bold text-purple-600 dark:text-purple-400">{mockExtensionQuota.usedQuota}个</span>
                          </div>
                        </div>
                        {selectedProjects.size > 0 && (
                          <Button size="sm" variant="default" className="bg-purple-600 hover:bg-purple-700">
                            批量申请延期 ({selectedProjects.size})
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* 全选复选框 */}
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Checkbox
                          id="select-all"
                          checked={selectedProjects.size === mockExpiringProjects.length && mockExpiringProjects.length > 0}
                          onCheckedChange={toggleAllSelections}
                        />
                        <label htmlFor="select-all" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          全选
                        </label>
                      </div>
                      {mockExpiringProjects.map((project) => (
                        <ExpiringProjectItem
                          key={project.id}
                          project={project}
                          selected={selectedProjects.has(project.id)}
                          onToggle={() => toggleProjectSelection(project.id)}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 待申请订单 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-blue-600" />
                      待申请订单
                    </CardTitle>
                    <CardDescription>本月预测将下订单的项目清单</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockPendingOrders.map((order) => (
                        <PendingOrderItem key={order.id} order={order} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                  {mockExpiringProjects.slice(0, 4).map((project) => (
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
                <div className="flex h-96 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 mb-2 opacity-50" />
                    <p className="text-sm">申请记录模块开发中</p>
                  </div>
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

// 即将到期项目项组件
function ExpiringProjectItem({
  project,
  selected,
  onToggle
}: {
  project: typeof mockExpiringProjects[0];
  selected: boolean;
  onToggle: () => void;
}) {
  const isExpired = project.daysRemaining <= 0;
  const isUrgent = project.daysRemaining > 0 && project.daysRemaining <= 7;

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${
        isExpired
          ? 'border-red-300 bg-red-50 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/50 dark:hover:bg-red-950'
          : isUrgent
          ? 'border-orange-300 bg-orange-50 hover:bg-orange-100 dark:border-orange-900 dark:bg-orange-950/50 dark:hover:bg-orange-950'
          : 'hover:bg-slate-50 dark:hover:bg-slate-800'
      }`}
    >
      <Checkbox checked={selected} onCheckedChange={onToggle} />
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-semibold text-slate-900 dark:text-white">{project.name}</h3>
          <Badge variant="outline" className="text-xs">
            {project.stage}
          </Badge>
          {isExpired && <Badge className="bg-red-600 text-white">已过期</Badge>}
          {isUrgent && (
            <Badge className="bg-orange-600 text-white">
              <Timer className="h-3 w-3 mr-1" />
              即将到期
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span>ID: {project.id}</span>
          <span>AOS经理: {project.aosManager}</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            到期: {project.expiryDate}
          </span>
          <span className="flex items-center gap-1 font-semibold">
            <Clock className="h-3 w-3" />
            {isExpired ? '已逾期' : `剩余${project.daysRemaining}天`}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            ¥{(project.value / 10000).toFixed(0)}万
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            成交率: <span className="font-semibold">{project.probability}%</span>
          </p>
        </div>
        <Button size="sm" variant="outline" className="gap-1">
          <ArrowUpRight className="h-3 w-3" />
          申请延期
        </Button>
      </div>
    </div>
  );
}

// 待申请订单项组件
function PendingOrderItem({ order }: { order: typeof mockPendingOrders[0] }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-semibold text-slate-900 dark:text-white">{order.name}</h3>
          <Badge variant="outline" className="text-xs">
            {order.stage}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span>ID: {order.id}</span>
          <span>AOS经理: {order.aosManager}</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            预测下单: {order.predictedOrderDate}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            ¥{(order.predictedValue / 10000).toFixed(0)}万
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            预测成交率: <span className="font-semibold">{order.probability}%</span>
          </p>
        </div>
        <Button size="sm" variant="outline" className="gap-1">
          <Package className="h-3 w-3 mr-1" />
          申请订单
        </Button>
      </div>
    </div>
  );
}

// 项目项组件
function ProjectItem({ project }: { project: typeof mockExpiringProjects[0] }) {
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
