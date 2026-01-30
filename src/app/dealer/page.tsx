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
  Trophy,
  User,
  LineChart
} from 'lucide-react';

// 模拟数据
const mockMonthlyTarget = {
  target: 2000000,
  completed: 1250000,
  gap: 750000
};

const mockYTDTarget = {
  target: 15000000,
  completed: 8750000,
  gap: 6250000
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
  { rank: 1, name: 'AR75-E1', sales: 156, revenue: 3120000, growth: '+28%' },
  { rank: 2, name: 'AR75-G1', sales: 134, revenue: 2680000, growth: '+24%' },
  { rank: 3, name: 'BR75-EH5', sales: 118, revenue: 1770000, growth: '+19%' },
  { rank: 4, name: 'BZR100-A102', sales: 95, revenue: 2850000, growth: '+16%' },
  { rank: 5, name: 'BZR100-A3301', sales: 82, revenue: 2460000, growth: '+22%' }
];

const mockSalesTrend = [
  { month: '1月', predicted: 180, actual: 165, percentage: 92 },
  { month: '2月', predicted: 200, actual: 185, percentage: 93 },
  { month: '3月', predicted: 220, actual: 0, percentage: 0 },
  { month: '4月', predicted: 240, actual: 0, percentage: 0 },
  { month: '5月', predicted: 250, actual: 0, percentage: 0 },
  { month: '6月', predicted: 280, actual: 0, percentage: 0 }
];

const mockIndustryAnalysis = [
  { name: 'K12(小中高)', dealerCount: 28, dealerPercentage: 33, avgPercentage: 28, gap: 5, color: 'bg-blue-500' },
  { name: '楼宇BOT', dealerCount: 2, dealerPercentage: 2, avgPercentage: 4, gap: -2, color: 'bg-violet-500' },
  { name: '校园BOT', dealerCount: 4, dealerPercentage: 5, avgPercentage: 7, gap: -2, color: 'bg-rose-500' },
  { name: '医疗系统', dealerCount: 8, dealerPercentage: 9, avgPercentage: 12, gap: -3, color: 'bg-green-500' },
  { name: '政府机关/事业单位', dealerCount: 6, dealerPercentage: 7, avgPercentage: 9, gap: -2, color: 'bg-purple-500' },
  { name: '国央企业', dealerCount: 4, dealerPercentage: 5, avgPercentage: 6, gap: -1, color: 'bg-red-500' }
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
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    欢迎您 季晓东 · 南京雪濠洋环保科技有限公司（ZLX0008）
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1">
                <MessageSquare className="h-3 w-3" />
                3条新消息
              </Badge>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                季
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-8">
        {/* 标签页切换 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 h-12">
            <TabsTrigger value="dashboard" className="text-base px-6">
              经营驾驶舱
            </TabsTrigger>
            <TabsTrigger value="crm" className="text-base px-6">
              商净CRM
            </TabsTrigger>
          </TabsList>

          {/* 经营驾驶舱 */}
          <TabsContent value="dashboard">
            <div className="grid gap-6">
              {/* 任务完成情况 - 左右仪表盘布局 */}
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    任务完成情况
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* 左侧：当月任务完成情况 */}
                    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 dark:from-blue-950 dark:to-blue-900">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                          当月任务完成情况
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {new Date().getFullYear()}年{new Date().getMonth() + 1}月
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">当月目标</p>
                          <p className="text-xl font-bold text-slate-900 dark:text-white">
                            ¥{(mockMonthlyTarget.target / 10000).toFixed(0)}万
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">已完成</p>
                          <p className="text-xl font-bold text-green-600 dark:text-green-400">
                            ¥{(mockMonthlyTarget.completed / 10000).toFixed(0)}万
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">缺口</p>
                          <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                            ¥{(mockMonthlyTarget.gap / 10000).toFixed(0)}万
                          </p>
                        </div>
                      </div>
                      <div>
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
                    </div>

                    {/* 右侧：YTD目标完成情况 */}
                    <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 dark:from-indigo-950 dark:to-indigo-900">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                          YTD目标完成情况
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {new Date().getFullYear()}年度
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">YTD目标</p>
                          <p className="text-xl font-bold text-slate-900 dark:text-white">
                            ¥{(mockYTDTarget.target / 10000).toFixed(0)}万
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">已完成</p>
                          <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
                            ¥{(mockYTDTarget.completed / 10000).toFixed(0)}万
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">缺口</p>
                          <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                            ¥{(mockYTDTarget.gap / 10000).toFixed(0)}万
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">完成进度</span>
                          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                            {Math.round((mockYTDTarget.completed / mockYTDTarget.target) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(mockYTDTarget.completed / mockYTDTarget.target) * 100}
                          className="h-3"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 畅销产品排行TOP5 和 销售趋势分析 */}
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
                    <div className="space-y-3">
                      {mockTopProducts.map((product) => (
                        <div
                          key={product.rank}
                          className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800"
                        >
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white text-sm ${
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
                            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{product.name}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                              <span>销量: {product.sales}</span>
                              <span>营收: ¥{(product.revenue / 10000).toFixed(0)}万</span>
                            </div>
                          </div>
                          <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            {product.growth}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 销售趋势分析 */}
                <Card className="border-2 border-cyan-200 dark:border-cyan-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-cyan-600" />
                      销售趋势分析
                    </CardTitle>
                    <CardDescription>预测达成趋势显示</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockSalesTrend.map((trend) => (
                        <div key={trend.month} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{trend.month}</span>
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-slate-600 dark:text-slate-400">
                                预测: ¥{trend.predicted}万
                              </span>
                              {trend.actual > 0 && (
                                <span className="text-slate-900 dark:text-white font-semibold">
                                  实际: ¥{trend.actual}万
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="h-6 rounded-full bg-slate-200 dark:bg-slate-700 relative">
                            <div
                              className={`h-6 rounded-full transition-all ${
                                trend.actual > 0
                                  ? trend.percentage >= 100
                                    ? 'bg-green-500'
                                    : 'bg-orange-500'
                                  : 'bg-slate-400'
                              }`}
                              style={{ width: `${trend.actual > 0 ? Math.min(trend.percentage, 100) : 30}%` }}
                            >
                              <div className="h-full flex items-center justify-end px-2">
                                {trend.actual > 0 && (
                                  <span className="text-xs font-bold text-white">
                                    {trend.percentage}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {trend.actual === 0 && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              尚未达成
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 行业分析对比 - 单独一行，精简版 */}
              <Card className="border-2 border-indigo-200 dark:border-indigo-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-indigo-600" />
                    行业分析对比
                  </CardTitle>
                  <CardDescription>重点行业：经销商数据 vs 同规模经销商平均值</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {mockIndustryAnalysis.map((industry) => {
                      const isAboveAvg = industry.gap >= 0;
                      return (
                        <div
                          key={industry.name}
                          className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`h-3 w-3 rounded-full ${industry.color}`} />
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {industry.name}
                              </span>
                            </div>
                            <Badge
                              variant={isAboveAvg ? 'default' : 'secondary'}
                              className={
                                isAboveAvg
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                              }
                            >
                              {isAboveAvg ? '+' : ''}{industry.gap}%
                            </Badge>
                          </div>
                          {/* 经销商数据条 */}
                          <div className="mb-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-slate-600 dark:text-slate-400">您的占比</span>
                              <span className="text-xs font-bold text-slate-900 dark:text-white">{industry.dealerPercentage}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                              <div
                                className={`h-2 rounded-full ${industry.color}`}
                                style={{ width: `${industry.dealerPercentage}%` }}
                              />
                            </div>
                          </div>
                          {/* 行业平均值条 */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-slate-600 dark:text-slate-400">平均值</span>
                              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{industry.avgPercentage}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                              <div
                                className="h-2 rounded-full bg-slate-400 dark:bg-slate-600"
                                style={{ width: `${industry.avgPercentage}%` }}
                              />
                            </div>
                          </div>
                          {/* 努力空间提示 */}
                          {!isAboveAvg && (
                            <div className="mt-2 text-xs text-orange-600 dark:text-orange-400">
                              💡 还有提升空间
                            </div>
                          )}
                        </div>
                      );
                    })}
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
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        汇总信息
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                          <span className="text-sm text-slate-600 dark:text-slate-400">储备目标数</span>
                          <span className="text-lg font-bold text-slate-900 dark:text-white">{mockReserveHealth.reserveTarget}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                          <span className="text-sm text-slate-600 dark:text-slate-400">已储备数</span>
                          <span className="text-lg font-bold text-slate-900 dark:text-white">{mockReserveHealth.reserveCompleted}</span>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">储备完成进度</span>
                            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{mockReserveHealth.reserveProgress}%</span>
                          </div>
                          <Progress value={mockReserveHealth.reserveProgress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                          <span className="text-sm text-slate-600 dark:text-slate-400">健康度</span>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            {mockReserveHealth.health}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                          <span className="text-sm text-slate-600 dark:text-slate-400">本周已关闭项目数</span>
                          <span className="text-lg font-bold text-red-600 dark:text-red-400">{mockReserveHealth.closedThisWeek}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                          <span className="text-sm text-slate-600 dark:text-slate-400">即将到期（7日内）</span>
                          <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{mockReserveHealth.expiringSoonCount}</span>
                        </div>
                      </div>
                    </div>

                    {/* 项目周期分布 */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
                        <Clock className="h-4 w-4" />
                        项目周期分布
                      </h4>
                      <div className="space-y-2">
                        {[
                          { label: '3个月内', value: mockProjectDistribution.within3Months, color: 'bg-blue-500' },
                          { label: '2-6个月', value: mockProjectDistribution.months2To6, color: 'bg-indigo-500' },
                          { label: '6-12个月', value: mockProjectDistribution.months6To12, color: 'bg-purple-500' },
                          { label: '12个月以上', value: mockProjectDistribution.months12To24, color: 'bg-pink-500' },
                          { label: '24个月以上', value: mockProjectDistribution.over24Months, color: 'bg-slate-500' }
                        ].map((item) => (
                          <div key={item.label} className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-xs text-slate-600 dark:text-slate-400">{item.label}</span>
                              <span className="text-xs font-bold text-slate-900 dark:text-white">{item.value}</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                              <div
                                className={`h-2 rounded-full ${item.color}`}
                                style={{ width: `${(item.value / mockReserveHealth.reserveCompleted) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 销售漏斗 */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
                        <TrendingUp className="h-4 w-4" />
                        销售漏斗
                      </h4>
                      <div className="space-y-2">
                        {mockSalesFunnel.map((item) => (
                          <div key={item.stage} className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                            <div className="mb-1 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${item.color}`} />
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{item.stage}</span>
                              </div>
                              <span className="text-xs font-bold text-slate-900 dark:text-white">{item.count} ({item.percentage}%)</span>
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

              {/* 近一月即将到期项目清单和待申请订单项目 */}
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

                {/* 待申请订单项目 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-blue-600" />
                      待申请订单项目
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

          {/* 商净CRM */}
          <TabsContent value="crm">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>项目管理</CardTitle>
                    <CardDescription>管理所有项目线索和跟进进度</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    项目报备
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

// 待申请订单项目项组件
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
          去下单
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
