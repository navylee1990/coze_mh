'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  gap: 1200000,
  progress: 76
};

const mockYTDTarget = {
  target: 35000000,
  completed: 28000000,
  gap: 7000000,
  progress: 80
};

const mockChannelStats = {
  totalChannels: 45,
  activeChannels: 38,
  newChannels: 7,
  targetChannels: 50
};

const mockTopChannels = [
  { name: '南京雪濠洋环保科技有限公司', revenue: 850000, rank: 1 },
  { name: '上海智慧园区科技有限公司', revenue: 720000, rank: 2 },
  { name: '北京医疗器械有限公司', revenue: 580000, rank: 3 },
  { name: '杭州智能制造科技有限公司', revenue: 450000, rank: 4 },
  { name: '苏州环保工程有限公司', revenue: 380000, rank: 5 }
];

const mockSalesTrend = [
  { month: '1月', target: 500, actual: 480 },
  { month: '2月', target: 520, actual: 490 },
  { month: '3月', target: 550, actual: 520 },
  { month: '4月', target: 580, actual: 0 },
  { month: '5月', target: 600, actual: 0 },
  { month: '6月', target: 620, actual: 0 },
  { month: '7月', target: 580, actual: 0 },
  { month: '8月', target: 560, actual: 0 },
  { month: '9月', target: 600, actual: 0 },
  { month: '10月', target: 620, actual: 0 },
  { month: '11月', target: 650, actual: 0 },
  { month: '12月', target: 700, actual: 0 }
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
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">目标金额</span>
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            ¥{(mockMonthlyTarget.target / 10000).toFixed(0)}万
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">已完成</span>
                          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            ¥{(mockMonthlyTarget.completed / 10000).toFixed(0)}万
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">缺口</span>
                          <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            ¥{(mockMonthlyTarget.gap / 10000).toFixed(0)}万
                          </span>
                        </div>
                        <div className="pt-4 border-t border-purple-200 dark:border-purple-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-600 dark:text-slate-400">完成进度</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                              {mockMonthlyTarget.progress}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-600 to-purple-500 transition-all"
                              style={{ width: `${mockMonthlyTarget.progress}%` }}
                            />
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
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">目标金额</span>
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            ¥{(mockYTDTarget.target / 10000).toFixed(0)}万
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">已完成</span>
                          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            ¥{(mockYTDTarget.completed / 10000).toFixed(0)}万
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">缺口</span>
                          <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            ¥{(mockYTDTarget.gap / 10000).toFixed(0)}万
                          </span>
                        </div>
                        <div className="pt-4 border-t border-purple-200 dark:border-purple-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-600 dark:text-slate-400">完成进度</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                              {mockYTDTarget.progress}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-600 to-purple-500 transition-all"
                              style={{ width: `${mockYTDTarget.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 渠道统计 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    渠道开发情况
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">总渠道数</span>
                        <Users className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {mockChannelStats.totalChannels}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        目标: {mockChannelStats.targetChannels}
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">活跃渠道</span>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {mockChannelStats.activeChannels}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        活跃率: {((mockChannelStats.activeChannels / mockChannelStats.totalChannels) * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">新增渠道</span>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {mockChannelStats.newChannels}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        本月新增
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">目标完成</span>
                        <Target className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {((mockChannelStats.totalChannels / mockChannelStats.targetChannels) * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        进度
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
                  </div>
                </CardContent>
              </Card>

              {/* 优质渠道排行 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-purple-600" />
                    优质渠道排行榜
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockTopChannels.map((channel) => (
                      <div
                        key={channel.rank}
                        className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                      >
                        <div className={`
                          flex items-center justify-center w-8 h-8 rounded-full font-bold text-white
                          ${channel.rank <= 3 ? 'bg-purple-600' : 'bg-slate-400'}
                        `}>
                          {channel.rank}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {channel.name}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            ¥{(channel.revenue / 10000).toFixed(0)}万
                          </div>
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
