'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import CRMSystem from '@/components/crm/CRMSystem';
import { ChannelOperation } from '@/components/aos/ChannelOperation';
import { PerformanceEvaluation } from '@/components/aos/PerformanceEvaluation';
import {
  Building2,
  ArrowLeft,
  BarChart3,
  FileText,
  Target,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  ShoppingCart,
  Calendar,
  Zap,
  Trophy,
  PieChart,
  LineChart as LineChartIcon
} from 'lucide-react';

// 模拟数据 - AOS营销人员的经营驾驶舱数据
const mockMonthlyTarget = {
  target: 5000000,
  completed: 3800000,
  predicted: 4500000,
  gap: 1200000,
  predictedGap: 500000,
  progress: 76
};

const mockYTDTarget = {
  target: 35000000,
  completed: 28000000,
  predicted: 32000000,
  gap: 7000000,
  predictedGap: 3000000,
  progress: 80
};

const mockCustomerStats = {
  totalCustomers: 120,
  activeCustomers: 95,
  newCustomers: 18,
  targetCustomers: 150
};

// 区域平均客户数据
const mockRegionalCustomerAvg = {
  totalCustomers: 135,
  activeCustomers: 108,
  newCustomers: 22,
  targetCustomers: 150
};

const mockTopCustomers = [
  { name: '南京雪濠洋环保科技有限公司', industry: '环保工程', amount: 850000, growth: 15 },
  { name: '上海智慧园区科技有限公司', industry: '智慧园区', amount: 720000, growth: 22 },
  { name: '北京医疗器械有限公司', industry: '医疗系统', amount: 580000, growth: 18 },
  { name: '杭州智能制造科技有限公司', industry: '制造业', amount: 450000, growth: 12 },
  { name: '苏州环保工程有限公司', industry: '环保工程', amount: 380000, growth: 8 }
];

const mockSalesTrend = [
  { month: '1月', target: 500, actual: 480, predicted: 490 },
  { month: '2月', target: 520, actual: 490, predicted: 510 },
  { month: '3月', target: 550, actual: 520, predicted: 540 },
  { month: '4月', target: 580, actual: 0, predicted: 560 },
  { month: '5月', target: 600, actual: 0, predicted: 580 },
  { month: '6月', target: 620, actual: 0, predicted: 600 },
  { month: '7月', target: 580, actual: 0, predicted: 560 },
  { month: '8月', target: 560, actual: 0, predicted: 540 },
  { month: '9月', target: 600, actual: 0, predicted: 580 },
  { month: '10月', target: 620, actual: 0, predicted: 600 },
  { month: '11月', target: 650, actual: 0, predicted: 630 },
  { month: '12月', target: 700, actual: 0, predicted: 680 }
];

// 行业分布对比数据
const mockIndustryAnalysis = [
  {
    industry: '制造业',
    myValue: 29,
    avgValue: 25,
    diff: 4
  },
  {
    industry: '医疗系统',
    myValue: 21,
    avgValue: 18,
    diff: 3
  },
  {
    industry: '教育机构',
    myValue: 17,
    avgValue: 15,
    diff: 2
  },
  {
    industry: '政府机关',
    myValue: 12,
    avgValue: 12,
    diff: 0
  },
  {
    industry: '园区运营',
    myValue: 12,
    avgValue: 14,
    diff: -2
  },
  {
    industry: '其他',
    myValue: 8,
    avgValue: 16,
    diff: -8
  }
];

// 项目预测分析数据
const mockProjectForecast = [
  {
    period: '本月预测',
    forecastAmount: 1500000,
    confirmedAmount: 1200000,
    pendingAmount: 300000,
    projectCount: 5,
    status: '进行中'
  },
  {
    period: '下月预测',
    forecastAmount: 2200000,
    confirmedAmount: 1800000,
    pendingAmount: 400000,
    projectCount: 7,
    status: '预测中'
  },
  {
    period: '第三月预测',
    forecastAmount: 2800000,
    confirmedAmount: 2000000,
    pendingAmount: 800000,
    projectCount: 9,
    status: '预测中'
  }
];

// 预测可靠性指标
const mockForecastReliability = {
  personal: 87.5, // 个人预测可靠性
  regionalAverage: 82.3 // 区域平均预测可靠性
};

// 当月预测项目清单
const mockForecastProjects = [
  {
    id: 'PRJ202501001',
    name: '某大型制造企业智能化改造项目',
    customerName: '南京智能制造科技有限公司',
    contactPerson: '张总',
    phone: '138****1234',
    forecastAmount: 500000,
    probability: 85,
    estimatedOrderDate: '2025-02-15',
    status: '高概率'
  },
  {
    id: 'PRJ202501002',
    name: '医院信息化升级项目',
    customerName: '北京医疗器械有限公司',
    contactPerson: '李经理',
    phone: '139****5678',
    forecastAmount: 400000,
    probability: 70,
    estimatedOrderDate: '2025-02-20',
    status: '中概率'
  },
  {
    id: 'PRJ202501003',
    name: '智慧园区能源管理系统',
    customerName: '上海智慧园区科技有限公司',
    contactPerson: '王总',
    phone: '137****9012',
    forecastAmount: 300000,
    probability: 60,
    estimatedOrderDate: '2025-02-25',
    status: '中概率'
  },
  {
    id: 'PRJ202501004',
    name: '高校实验室设备采购',
    customerName: '杭州师范大学',
    contactPerson: '赵主任',
    phone: '136****3456',
    forecastAmount: 200000,
    probability: 50,
    estimatedOrderDate: '2025-02-28',
    status: '低概率'
  },
  {
    id: 'PRJ202501005',
    name: '政府机关直饮水系统',
    customerName: '南京市机关事务管理局',
    contactPerson: '孙科长',
    phone: '135****7890',
    forecastAmount: 100000,
    probability: 40,
    estimatedOrderDate: '2025-03-05',
    status: '低概率'
  }
];

export default function AOSPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // TAB配置
  const tabs = [
    {
      value: 'dashboard',
      number: 1,
      title: '经营驾驶舱',
      icon: BarChart3,
      description: '区域业绩看板'
    },
    {
      value: 'crm',
      number: 2,
      title: '商净CRM',
      icon: FileText,
      description: '客户关系管理'
    },
    {
      value: 'channel',
      number: 3,
      title: '渠道运营',
      icon: Users,
      description: '渠道开发与管理'
    },
    {
      value: 'performance',
      number: 4,
      title: '绩效评估',
      icon: Award,
      description: '五维绩效评估'
    }
  ];

  const currentTabIndex = tabs.findIndex(tab => tab.value === activeTab);

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
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    欢迎您，陈致 · 一区-南京市
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
                陈
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-8">
        {/* 页面标题和导航 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {tabs[currentTabIndex]?.title}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {tabs[currentTabIndex]?.description}
              </p>
            </div>
            {/* 页面进度指示器 */}
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                第 {currentTabIndex + 1} 页，共 {tabs.length} 页
              </div>
              <div className="flex gap-1">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTabIndex
                        ? 'bg-purple-600 w-6'
                        : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 门户风格TAB导航 */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2">
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`
                      relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                      ${isActive
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    {/* 数字标记 */}
                    <span className={`
                      flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                      ${isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                      }
                    `}>
                      {tab.number}
                    </span>
                    {/* 图标和标题 */}
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{tab.title}</span>
                    {/* 激活状态指示器 */}
                    {isActive && (
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 标签页内容 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* 经营驾驶舱 */}
          <TabsContent value="dashboard">
            <div className="space-y-6">
              {/* 业绩目标完成情况 */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* 当月业绩 */}
                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      当月业绩完成情况
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 dark:from-purple-950 dark:to-purple-900">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                          {new Date().getFullYear()}年{new Date().getMonth() + 1}月
                        </h3>
                      </div>
                      
                      {/* 仪表盘区域 */}
                      <div className="flex justify-center mb-6">
                        <div className="relative" style={{ width: '180px', height: '180px' }}>
                          <svg className="w-full h-full" viewBox="0 0 180 180">
                            {/* 背景圆环 */}
                            <circle
                              cx="90"
                              cy="90"
                              r="80"
                              fill="none"
                              className="stroke-slate-200 dark:stroke-slate-700"
                              strokeWidth="12"
                            />
                            {/* 完成进度圆环 - 黑色 */}
                            <circle
                              cx="90"
                              cy="90"
                              r="80"
                              fill="none"
                              className="stroke-slate-900 dark:stroke-slate-300"
                              strokeWidth="12"
                              strokeLinecap="round"
                              transform="rotate(-90 90 90)"
                              strokeDasharray={`${(mockMonthlyTarget.progress / 100) * 502} 502`}
                            />
                            {/* 预测进度圆环（内圈）- 红色如果有缺口 */}
                            <circle
                              cx="90"
                              cy="90"
                              r="65"
                              fill="none"
                              className={mockMonthlyTarget.predictedGap > 0 ? "stroke-red-600 dark:stroke-red-400" : "stroke-slate-900 dark:stroke-slate-300"}
                              strokeWidth="8"
                              strokeLinecap="round"
                              transform="rotate(-90 90 90)"
                              strokeDasharray={`${((mockMonthlyTarget.predicted / mockMonthlyTarget.target) * 100) / 100 * 408} 408`}
                              strokeDashoffset="0"
                              style={{ opacity: 0.7 }}
                            />
                          </svg>
                          {/* 中心文字 */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-3xl font-bold text-slate-900 dark:text-white">
                              {mockMonthlyTarget.progress}%
                            </div>
                            <div className="text-xs text-slate-900 dark:text-slate-300 mt-1">
                              完成进度
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 指标数据 */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-white/10">
                          <div className="text-xs text-slate-900 dark:text-slate-300 mb-1">目标</div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            ¥{(mockMonthlyTarget.target / 10000).toFixed(0)}万
                          </div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-white/10">
                          <div className="text-xs text-slate-900 dark:text-slate-300 mb-1">已完成</div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            ¥{(mockMonthlyTarget.completed / 10000).toFixed(0)}万
                          </div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-white/10">
                          <div className="text-xs text-slate-900 dark:text-slate-300 mb-1">预测</div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            ¥{(mockMonthlyTarget.predicted / 10000).toFixed(0)}万
                          </div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-white/10">
                          <div className="text-xs text-slate-900 dark:text-slate-300 mb-1">预测缺口</div>
                          <div className="text-lg font-bold text-red-600 dark:text-red-400">
                            ¥{(mockMonthlyTarget.predictedGap / 10000).toFixed(0)}万
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* YTD业绩 */}
                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-purple-600" />
                      YTD业绩完成情况
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 dark:from-purple-950 dark:to-purple-900">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                          {new Date().getFullYear()}年累计
                        </h3>
                      </div>
                      
                      {/* 仪表盘区域 */}
                      <div className="flex justify-center mb-6">
                        <div className="relative" style={{ width: '180px', height: '180px' }}>
                          <svg className="w-full h-full" viewBox="0 0 180 180">
                            {/* 背景圆环 */}
                            <circle
                              cx="90"
                              cy="90"
                              r="80"
                              fill="none"
                              className="stroke-slate-200 dark:stroke-slate-700"
                              strokeWidth="12"
                            />
                            {/* 完成进度圆环 - 黑色 */}
                            <circle
                              cx="90"
                              cy="90"
                              r="80"
                              fill="none"
                              className="stroke-slate-900 dark:stroke-slate-300"
                              strokeWidth="12"
                              strokeLinecap="round"
                              transform="rotate(-90 90 90)"
                              strokeDasharray={`${(mockYTDTarget.progress / 100) * 502} 502`}
                            />
                            {/* 预测进度圆环（内圈）- 红色如果有缺口 */}
                            <circle
                              cx="90"
                              cy="90"
                              r="65"
                              fill="none"
                              className={mockYTDTarget.predictedGap > 0 ? "stroke-red-600 dark:stroke-red-400" : "stroke-slate-900 dark:stroke-slate-300"}
                              strokeWidth="8"
                              strokeLinecap="round"
                              transform="rotate(-90 90 90)"
                              strokeDasharray={`${((mockYTDTarget.predicted / mockYTDTarget.target) * 100) / 100 * 408} 408`}
                              strokeDashoffset="0"
                              style={{ opacity: 0.7 }}
                            />
                          </svg>
                          {/* 中心文字 */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-3xl font-bold text-slate-900 dark:text-white">
                              {mockYTDTarget.progress}%
                            </div>
                            <div className="text-xs text-slate-900 dark:text-slate-300 mt-1">
                              完成进度
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 指标数据 */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-white/10">
                          <div className="text-xs text-slate-900 dark:text-slate-300 mb-1">目标</div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            ¥{(mockYTDTarget.target / 10000).toFixed(0)}万
                          </div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-white/10">
                          <div className="text-xs text-slate-900 dark:text-slate-300 mb-1">已完成</div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            ¥{(mockYTDTarget.completed / 10000).toFixed(0)}万
                          </div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-white/10">
                          <div className="text-xs text-slate-900 dark:text-slate-300 mb-1">预测</div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            ¥{(mockYTDTarget.predicted / 10000).toFixed(0)}万
                          </div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-white/10">
                          <div className="text-xs text-slate-900 dark:text-slate-300 mb-1">预测缺口</div>
                          <div className="text-lg font-bold text-red-600 dark:text-red-400">
                            ¥{(mockYTDTarget.predictedGap / 10000).toFixed(0)}万
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 客户开发情况 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    客户开发情况
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">总客户数</span>
                        <Users className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {mockCustomerStats.totalCustomers}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        目标: {mockCustomerStats.targetCustomers}
                        <span className="ml-2 text-xs text-slate-400">
                          (区域平均: {mockRegionalCustomerAvg.totalCustomers})
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">活跃客户</span>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {mockCustomerStats.activeCustomers}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        活跃率: {((mockCustomerStats.activeCustomers / mockCustomerStats.totalCustomers) * 100).toFixed(0)}%
                        <span className="ml-2 text-xs text-slate-400">
                          (区域平均: {((mockRegionalCustomerAvg.activeCustomers / mockRegionalCustomerAvg.totalCustomers) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">新增客户</span>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {mockCustomerStats.newCustomers}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        本月新增
                        <span className="ml-2 text-xs text-slate-400">
                          (区域平均: {mockRegionalCustomerAvg.newCustomers})
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">目标完成</span>
                        <Target className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {((mockCustomerStats.totalCustomers / mockCustomerStats.targetCustomers) * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        进度
                        <span className="ml-2 text-xs text-slate-400">
                          (区域平均: {((mockRegionalCustomerAvg.totalCustomers / mockRegionalCustomerAvg.targetCustomers) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 销售趋势图 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5 text-purple-600" />
                    销售趋势分析
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 relative">
                    <svg className="w-full h-full" viewBox="0 0 800 200">
                      {/* 背景网格 */}
                      {[0, 40, 80, 120, 160].map((y) => (
                        <line
                          key={y}
                          x1="0"
                          y1={y}
                          x2="800"
                          y2={y}
                          className="stroke-slate-200 dark:stroke-slate-700"
                          strokeWidth="1"
                        />
                      ))}
                      {/* X轴标签 */}
                      {mockSalesTrend.map((item, index) => (
                        <text
                          key={index}
                          x={index * 66 + 33}
                          y="195"
                          className="text-xs fill-slate-500"
                          textAnchor="middle"
                        >
                          {item.month}
                        </text>
                      ))}
                      {/* 目标线 */}
                      <polyline
                        fill="none"
                        className="stroke-slate-300 dark:stroke-slate-600"
                        strokeWidth="2"
                        strokeDasharray="4"
                        points={mockSalesTrend.map((item, index) => {
                          const y = 200 - (item.target / 700) * 160;
                          return `${index * 66 + 33},${y}`;
                        }).join(' ')}
                      />
                      {/* 实际线 */}
                      <polyline
                        fill="none"
                        className="stroke-purple-600"
                        strokeWidth="3"
                        points={mockSalesTrend.map((item, index) => {
                          const y = 200 - (item.actual / 700) * 160;
                          return `${index * 66 + 33},${y}`;
                        }).join(' ')}
                      />
                      {/* 预测线 */}
                      <polyline
                        fill="none"
                        className="stroke-blue-500"
                        strokeWidth="2"
                        strokeDasharray="8,4"
                        points={mockSalesTrend.map((item, index) => {
                          const y = 200 - (item.predicted / 700) * 160;
                          return `${index * 66 + 33},${y}`;
                        }).join(' ')}
                      />
                      {/* 数据点 */}
                      {mockSalesTrend.map((item, index) => {
                        if (item.actual > 0) {
                          const y = 200 - (item.actual / 700) * 160;
                          return (
                            <circle
                              key={index}
                              cx={index * 66 + 33}
                              cy={y}
                              r="5"
                              className="fill-purple-600"
                            />
                          );
                        }
                        return null;
                      })}
                      {/* 预测数据点 */}
                      {mockSalesTrend.map((item, index) => {
                        if (item.predicted > 0) {
                          const y = 200 - (item.predicted / 700) * 160;
                          return (
                            <circle
                              key={`pred-${index}`}
                              cx={index * 66 + 33}
                              cy={y}
                              r="4"
                              className="fill-blue-500"
                            />
                          );
                        }
                        return null;
                      })}
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-slate-300 dark:bg-slate-600" />
                      <span className="text-slate-600 dark:text-slate-400">目标</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-purple-600" />
                      <span className="text-slate-600 dark:text-slate-400">实际</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-blue-500" />
                      <span className="text-slate-600 dark:text-slate-400">预测</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 优质客户排行榜 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-purple-600" />
                    优质客户排行榜
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockTopCustomers.map((customer, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                      >
                        <div className={`
                          flex items-center justify-center w-8 h-8 rounded-full font-bold text-white
                          ${index < 3 ? 'bg-purple-600' : 'bg-slate-400'}
                        `}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {customer.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {customer.industry}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            ¥{(customer.amount / 10000).toFixed(0)}万
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-400">
                            +{customer.growth}%
                          </div>
                        </div>
                        <button
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors flex items-center gap-1.5"
                          onClick={() => {
                            // 1on1 功能
                            console.log(`启动与 ${customer.name} 的 1on1 会议`);
                          }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          1on1
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 新增模块区域 */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* 行业分布对比 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    行业分布对比
                  </CardTitle>
                  <CardDescription className="text-sm">
                    与同区域平均值对比
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockIndustryAnalysis.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {item.industry}
                          </span>
                          <span className={`text-sm font-semibold ${
                            item.diff >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {item.diff >= 0 ? '+' : ''}{item.diff.toFixed(1)}%
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-600 dark:text-slate-400 w-12">我的</span>
                            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-purple-600 rounded-full"
                                style={{ width: `${item.myValue}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-600 dark:text-slate-400 w-10 text-right">
                              {item.myValue}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-600 dark:text-slate-400 w-12">平均</span>
                            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-slate-400 rounded-full"
                                style={{ width: `${item.avgValue}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-600 dark:text-slate-400 w-10 text-right">
                              {item.avgValue}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 项目预测分析 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    项目预测分析
                  </CardTitle>
                  <CardDescription className="text-sm">
                    当月及未来三个月预测
                  </CardDescription>
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600 dark:text-slate-400">个人预测可靠性</span>
                        <Badge className="bg-purple-600 text-white">
                          {mockForecastReliability.personal}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600 dark:text-slate-400">区域平均</span>
                        <Badge variant="outline" className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                          {mockForecastReliability.regionalAverage}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProjectForecast.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {item.period}
                          </h4>
                          <span className={`text-sm font-bold ${
                            item.period === '本月' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-400'
                          }`}>
                            ¥{(item.forecastAmount / 10000).toFixed(0)}万
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">已确认</span>
                            <span className="font-semibold text-green-600 dark:text-green-400">
                              ¥{(item.confirmedAmount / 10000).toFixed(0)}万
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">待确认</span>
                            <span className="font-semibold text-orange-600 dark:text-orange-400">
                              ¥{(item.pendingAmount / 10000).toFixed(0)}万
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">项目数</span>
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {item.projectCount}个
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 当月预测项目清单 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    当月预测项目清单
                  </CardTitle>
                  <CardDescription className="text-sm">
                    高概率项目预计下单
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockForecastProjects.map((project) => (
                      <div
                        key={project.id}
                        className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                              {project.name}
                            </h4>
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              {project.customerName}
                            </div>
                          </div>
                          <div className="text-right ml-2">
                            <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
                              ¥{(project.forecastAmount / 10000).toFixed(0)}万
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {project.estimatedOrderDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-slate-600 dark:text-slate-400">
                              <span className="font-medium">{project.contactPerson}</span>
                              <span className="mx-1">|</span>
                              {project.phone}
                            </span>
                            <span className={`font-semibold ${
                              project.probability >= 70 ? 'text-green-600 dark:text-green-400' :
                              project.probability >= 50 ? 'text-orange-600 dark:text-orange-400' :
                              'text-red-600 dark:text-red-400'
                            }`}>
                              {project.probability}%概率
                            </span>
                          </div>
                          <button
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-md transition-colors"
                            onClick={() => {
                              // 一键联系功能
                              window.open(`tel:${project.phone.replace(/\*/g, '')}`);
                            }}
                          >
                            一键联系
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 商净CRM */}
          <TabsContent value="crm">
            <CRMSystem showHeader={false} />
          </TabsContent>

          {/* 渠道运营 */}
          <TabsContent value="channel">
            <ChannelOperation />
          </TabsContent>

          {/* 绩效评估 */}
          <TabsContent value="performance">
            <PerformanceEvaluation />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
