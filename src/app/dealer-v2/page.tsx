'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Building2,
  ArrowLeft,
  Target,
  TrendingUp,
  PieChart,
  FileText,
  ShoppingCart,
  ShieldAlert,
  Newspaper,
  Lightbulb,
  Award,
  Calendar,
  DollarSign,
  Package,
  CheckCircle2,
  AlertCircle,
  Clock,
  BarChart3,
  LineChart as LineChartIcon,
  Users,
  Star,
  Flame,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

// 菜单配置
const menuItems = [
  {
    id: 'market',
    title: '市场规划',
    subtitle: '看未来',
    icon: Target,
    description: '找到适合的赛道，看哪些产品更赚钱'
  },
  {
    id: 'current',
    title: '当前情况',
    subtitle: '看现在',
    icon: Activity,
    description: '履约、项目、健康度、储备等全方位管理'
  },
  {
    id: 'risk',
    title: '风险分析',
    subtitle: '控风险',
    icon: ShieldAlert,
    description: '任务清单、接单处理、反馈闭环'
  },
  {
    id: 'news',
    title: '最新资讯',
    subtitle: '知动态',
    icon: Newspaper,
    description: '政策、新品、行业资讯一手掌握'
  }
];

// 模拟数据 - 市场规划
const mockMarketTracks = [
  {
    id: 1,
    name: '智慧园区',
    growth: 35,
    potential: 85,
    difficulty: 40,
    revenue: 5000000,
    trend: 'up',
    recommendation: 'high'
  },
  {
    id: 2,
    name: '医疗系统',
    growth: 28,
    potential: 75,
    difficulty: 55,
    revenue: 4200000,
    trend: 'up',
    recommendation: 'medium'
  },
  {
    id: 3,
    name: '制造业',
    growth: 22,
    potential: 70,
    difficulty: 30,
    revenue: 3800000,
    trend: 'stable',
    recommendation: 'high'
  },
  {
    id: 4,
    name: '教育机构',
    growth: 18,
    potential: 60,
    difficulty: 45,
    revenue: 2500000,
    trend: 'down',
    recommendation: 'low'
  }
];

const mockProductProfit = [
  { rank: 1, name: 'AR75-E1', profit: 320000, profitMargin: 32, sales: 156, growth: 28 },
  { rank: 2, name: 'BZR100-A102', profit: 285000, profitMargin: 28, sales: 95, growth: 16 },
  { rank: 3, name: 'AR75-G1', profit: 268000, profitMargin: 26, sales: 134, growth: 24 },
  { rank: 4, name: 'BR75-EH5', profit: 177000, profitMargin: 25, sales: 118, growth: 19 }
];

const mockSuccessCases = [
  {
    id: 1,
    title: '某大型制造企业智能化改造项目',
    company: '南京智能制造科技有限公司',
    revenue: 850000,
    industry: '制造业',
    tags: ['智能化改造', '数字化转型'],
    image: '🏭',
    successRate: 95,
    duration: '3个月'
  },
  {
    id: 2,
    title: '智慧园区能源管理系统',
    company: '上海智慧园区科技有限公司',
    revenue: 1200000,
    industry: '智慧园区',
    tags: ['能源管理', '智能化'],
    image: '🏢',
    successRate: 90,
    duration: '4个月'
  },
  {
    id: 3,
    title: '医院直饮水系统升级',
    company: '北京医疗器械有限公司',
    revenue: 650000,
    industry: '医疗系统',
    tags: ['直饮水', '健康'],
    image: '🏥',
    successRate: 92,
    duration: '2个月'
  }
];

// 模拟数据 - 当前情况
const mockCurrentStatus = {
  fulfillment: {
    rate: 92,
    onTimeRate: 88,
    satisfaction: 95
  },
  projectDevelopment: {
    total: 45,
    active: 32,
    won: 8,
    inProgress: 22
  },
  health: {
    overall: 85,
    financial: 88,
    operational: 82,
    market: 86
  },
  reserve: {
    target: 50,
    completed: 42,
    progress: 84,
    expiring: 5
  },
  traffic: {
    visitors: 1250,
    inquiries: 89,
    conversion: 7.1,
    growth: 15
  }
};

const mockProjectCycle = [
  { stage: '报备', count: 45, avgDays: 3 },
  { stage: '跟进中', count: 32, avgDays: 7 },
  { stage: '方案设计', count: 22, avgDays: 10 },
  { stage: '报价中', count: 18, avgDays: 5 },
  { stage: '谈判中', count: 15, avgDays: 14 },
  { stage: '签约', count: 8, avgDays: 2 }
];

const mockSalesFunnel = [
  { stage: '报备', count: 45, conversion: 100 },
  { stage: '跟进中', count: 32, conversion: 71 },
  { stage: '方案设计', count: 22, conversion: 49 },
  { stage: '报价中', count: 18, conversion: 40 },
  { stage: '谈判中', count: 15, conversion: 33 },
  { stage: '签约', count: 8, conversion: 18 }
];

const mockProposals = [
  {
    id: 1,
    name: '某大型制造企业智能化改造项目',
    stage: '设计中',
    progress: 75,
    deadline: '2025-02-20',
    priority: 'high',
    team: ['设计师', '工程师']
  },
  {
    id: 2,
    name: '智慧园区能源管理系统',
    stage: '评审中',
    progress: 90,
    deadline: '2025-02-15',
    priority: 'high',
    team: ['设计师', '工程师', '项目经理']
  },
  {
    id: 3,
    name: '医院直饮水系统升级',
    stage: '已完成',
    progress: 100,
    deadline: '2025-02-10',
    priority: 'medium',
    team: ['设计师']
  }
];

// 模拟数据 - 风险分析
const mockRiskTasks = [
  {
    id: 1,
    title: '处理即将到期的项目报价',
    type: '风险预警',
    priority: 'high',
    status: 'pending',
    deadline: '2025-02-10',
    description: '某大型制造企业项目报价即将到期，需要确认或延期',
    source: '经营看板'
  },
  {
    id: 2,
    title: '跟进高概率客户反馈',
    type: '机会提醒',
    priority: 'high',
    status: 'pending',
    deadline: '2025-02-12',
    description: '3个高概率项目待客户反馈，需要主动跟进',
    source: '销售漏斗'
  },
  {
    id: 3,
    title: '补充项目储备',
    type: '健康度预警',
    priority: 'medium',
    status: 'processing',
    deadline: '2025-02-15',
    description: '本月项目储备未达标，需要补充5个新项目',
    source: '储备分析'
  },
  {
    id: 4,
    title: '审核待确认订单',
    type: '流程提醒',
    priority: 'high',
    status: 'pending',
    deadline: '2025-02-08',
    description: '5个待审核订单需要尽快处理',
    source: '订单管理'
  },
  {
    id: 5,
    title: '更新客户开发计划',
    type: '发展建议',
    priority: 'medium',
    status: 'completed',
    deadline: '2025-02-05',
    description: '根据区域平均数据，建议增加医疗行业客户开发',
    source: '客户分析'
  },
  {
    id: 6,
    title: '优化销售预测模型',
    type: '数据优化',
    priority: 'low',
    status: 'pending',
    deadline: '2025-02-20',
    description: '基于历史数据优化预测算法，提高准确性',
    source: '预测分析'
  }
];

// 模拟数据 - 最新资讯
const mockNews = {
  policies: [
    {
      id: 1,
      title: '2025年智能化改造补贴政策更新',
      date: '2025-02-08',
      category: '政策解读',
      impact: 'high',
      summary: '新增对制造业智能化改造项目的补贴，最高可达项目金额的30%',
      tags: ['补贴', '制造业', '智能化']
    },
    {
      id: 2,
      title: '绿色建筑认证标准升级',
      date: '2025-02-05',
      category: '标准更新',
      impact: 'medium',
      summary: '新的绿色建筑认证标准将于2025年6月实施，影响相关项目申报',
      tags: ['绿色建筑', '标准']
    }
  ],
  products: [
    {
      id: 1,
      name: 'AR80-Pro 智能水处理系统',
      category: '新品上市',
      launchDate: '2025-02-10',
      features: ['AI智能控制', '节能30%', '远程监控'],
      price: '¥128,000',
      image: '💧',
      trending: true
    },
    {
      id: 2,
      name: 'BR80-EH5 高效商用净水器',
      category: '产品升级',
      launchDate: '2025-02-15',
      features: ['流量提升50%', '滤芯寿命延长', '智能提醒'],
      price: '¥85,000',
      image: '🚿',
      trending: false
    }
  ],
  industry: [
    {
      id: 1,
      title: '2025年水处理行业发展趋势报告',
      date: '2025-02-07',
      source: '行业研究院',
      summary: '智能化、绿色化成为行业主流，市场规模预计增长25%',
      readTime: '8分钟',
      views: 2340,
      likes: 156
    },
    {
      id: 2,
      title: '智慧园区建设指南发布',
      date: '2025-02-04',
      source: '行业协会',
      summary: '提供智慧园区建设的标准化流程和最佳实践',
      readTime: '12分钟',
      views: 1890,
      likes: 98
    },
    {
      id: 3,
      title: '医疗系统直饮水需求激增',
      date: '2025-02-03',
      source: '市场分析',
      summary: '疫情后医疗健康意识提升，直饮水系统需求同比增长40%',
      readTime: '6分钟',
      views: 3120,
      likes: 234
    }
  ]
};

export default function DealerPortalV2() {
  const [activeMenu, setActiveMenu] = useState('market');
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const activeMenuItem = menuItems.find(item => item.id === activeMenu);
  const Icon = activeMenuItem?.icon || Target;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  返回首页
                </Button>
              </Link>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  经销商门户 <Badge variant="secondary" className="ml-2">V2.0</Badge>
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  帮助您找到成功之路
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Building2 className="mr-2 h-4 w-4" />
                公司信息
              </Button>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                经
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 左侧菜单 */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const MenuIcon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MenuIcon className={`h-5 w-5 mt-0.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">{item.title}</span>
                          {isActive && <ChevronRight className="h-4 w-4" />}
                        </div>
                        <div className="text-xs mt-1 opacity-90">{item.subtitle}</div>
                        <div className="text-xs mt-1 opacity-75 line-clamp-2">{item.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* 主内容区域 */}
        <main className="flex-1 p-6">
          {/* 面包屑和标题 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
              <Link href="/" className="hover:text-blue-600">首页</Link>
              <ChevronRight className="h-4 w-4" />
              <span>经销商门户</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-blue-600 dark:text-blue-400">{activeMenuItem?.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {activeMenuItem?.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {activeMenuItem?.description}
                </p>
              </div>
            </div>
          </div>

          {/* 市场规划 */}
          {activeMenu === 'market' && (
            <div className="space-y-6">
              {/* 赛道分析 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                      <CardTitle>赛道分析</CardTitle>
                      <CardDescription>找到适合您的赛道</CardDescription>
                    </div>
                    <Badge className="bg-blue-600">
                      <Star className="h-3 w-3 mr-1" />
                      推荐关注
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {mockMarketTracks.map((track) => (
                      <Card key={track.id} className={`
                        border-2 transition-all hover:shadow-lg
                        ${track.recommendation === 'high' ? 'border-blue-300 dark:border-blue-700' : ''}
                      `}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <CardTitle className="text-base">{track.name}</CardTitle>
                            {track.recommendation === 'high' && (
                              <Badge className="bg-blue-600 text-xs">
                                <Flame className="h-3 w-3 mr-1" />
                                热门
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-xs">
                            潜力: {track.potential}% | 难度: {track.difficulty}%
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-600 dark:text-slate-400">增长率</span>
                              <span className={`
                                text-sm font-bold flex items-center gap-1
                                ${track.trend === 'up' ? 'text-green-600' : 
                                  track.trend === 'down' ? 'text-red-600' : 'text-slate-600'}
                              `}>
                                {track.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : 
                                 track.trend === 'down' ? <ArrowDownRight className="h-4 w-4" /> : null}
                                {track.growth}%
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-slate-600 dark:text-slate-400">市场规模</span>
                                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                                  ¥{(track.revenue / 10000).toFixed(0)}万
                                </span>
                              </div>
                              <Progress value={track.potential} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 产品盈利分析 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <CardTitle>产品盈利分析</CardTitle>
                    <CardDescription>看哪些产品更赚钱</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockProductProfit.map((product) => (
                      <div key={product.rank} className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                        <div className={`
                          flex items-center justify-center w-10 h-10 rounded-full font-bold text-white text-sm
                          ${product.rank <= 3 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-slate-400'}
                        `}>
                          {product.rank}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {product.name}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            销售量: {product.sales}台
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            ¥{(product.profit / 10000).toFixed(0)}万
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            利润率: {product.profitMargin}%
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge className={
                            product.growth >= 20 ? 'bg-green-600' :
                            product.growth >= 10 ? 'bg-blue-600' : 'bg-slate-600'
                          }>
                            +{product.growth}%
                          </Badge>
                          {product.growth >= 20 && <Flame className="h-4 w-4 text-orange-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 成功案例 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <CardTitle>成功案例</CardTitle>
                    <CardDescription>学习成功经验，做更多生意</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {mockSuccessCases.map((caseItem) => (
                      <Card key={caseItem.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <div className="text-4xl mb-3">{caseItem.image}</div>
                          <CardTitle className="text-base line-clamp-2">{caseItem.title}</CardTitle>
                          <CardDescription>{caseItem.company}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400">行业</span>
                              <Badge variant="outline">{caseItem.industry}</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400">成交额</span>
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                ¥{(caseItem.revenue / 10000).toFixed(0)}万
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400">成功率</span>
                              <span className="font-semibold text-purple-600 dark:text-purple-400">
                                {caseItem.successRate}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400">项目周期</span>
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {caseItem.duration}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {caseItem.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button className="w-full mt-4" variant="outline" size="sm">
                              <ArrowUpRight className="h-4 w-4 mr-2" />
                              查看详情
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 当前情况 */}
          {activeMenu === 'current' && (
            <div className="space-y-6">
              {/* 健康度仪表盘 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-600" />
                    <CardTitle>健康度总览</CardTitle>
                    <CardDescription>全面掌握当前经营状况</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-4">
                    {[
                      { name: '整体健康度', value: mockCurrentStatus.health.overall, icon: Activity, color: 'purple' },
                      { name: '财务健康', value: mockCurrentStatus.health.financial, icon: DollarSign, color: 'green' },
                      { name: '运营健康', value: mockCurrentStatus.health.operational, icon: PieChart, color: 'blue' },
                      { name: '市场健康', value: mockCurrentStatus.health.market, icon: TrendingUp, color: 'orange' }
                    ].map((item) => (
                      <Card key={item.name} className="text-center">
                        <CardContent className="pt-6">
                          <div className="relative w-24 h-24 mx-auto mb-3">
                            <svg className="w-full h-full" viewBox="0 0 96 96">
                              <circle
                                cx="48"
                                cy="48"
                                r="40"
                                fill="none"
                                className="stroke-slate-200 dark:stroke-slate-700"
                                strokeWidth="8"
                              />
                              <circle
                                cx="48"
                                cy="48"
                                r="40"
                                fill="none"
                                className={`stroke-${item.color}-600`}
                                strokeWidth="8"
                                strokeLinecap="round"
                                transform="rotate(-90 48 48)"
                                strokeDasharray={`${(item.value / 100) * 251} 251`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                {item.value}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            {item.value >= 80 ? '优秀' : item.value >= 60 ? '良好' : '需改进'}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 履约、项目、储备、流量 */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* 履约情况 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <CardTitle className="text-base">履约情况</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-600 dark:text-slate-400">履约率</span>
                          <span className="text-sm font-bold text-green-600">
                            {mockCurrentStatus.fulfillment.rate}%
                          </span>
                        </div>
                        <Progress value={mockCurrentStatus.fulfillment.rate} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-600 dark:text-slate-400">准时率</span>
                          <span className="text-sm font-bold text-blue-600">
                            {mockCurrentStatus.fulfillment.onTimeRate}%
                          </span>
                        </div>
                        <Progress value={mockCurrentStatus.fulfillment.onTimeRate} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-600 dark:text-slate-400">满意度</span>
                          <span className="text-sm font-bold text-purple-600">
                            {mockCurrentStatus.fulfillment.satisfaction}%
                          </span>
                        </div>
                        <Progress value={mockCurrentStatus.fulfillment.satisfaction} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 项目开发 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <CardTitle className="text-base">项目开发</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600 dark:text-slate-400">总项目数</span>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                          {mockCurrentStatus.projectDevelopment.total}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {mockCurrentStatus.projectDevelopment.active}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">进行中</div>
                        </div>
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            {mockCurrentStatus.projectDevelopment.won}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">已赢单</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 储备情况 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-purple-600" />
                      <CardTitle className="text-base">储备情况</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                          {mockCurrentStatus.reserve.completed}/{mockCurrentStatus.reserve.target}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">储备进度</div>
                      </div>
                      <Progress value={mockCurrentStatus.reserve.progress} className="h-2" />
                      {mockCurrentStatus.reserve.expiring > 0 && (
                        <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-xs text-orange-600 dark:text-orange-400">
                            {mockCurrentStatus.reserve.expiring}个项目即将到期
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* 流量分析 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-teal-600" />
                      <CardTitle className="text-base">流量分析</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600 dark:text-slate-400">访客数</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {mockCurrentStatus.traffic.visitors}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600 dark:text-slate-400">咨询数</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {mockCurrentStatus.traffic.inquiries}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600 dark:text-slate-400">转化率</span>
                        <span className="text-sm font-bold text-green-600">
                          {mockCurrentStatus.traffic.conversion}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">环比增长</span>
                        <span className="text-green-600 font-bold">+{mockCurrentStatus.traffic.growth}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 节点推进 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-indigo-600" />
                    <CardTitle>节点推进</CardTitle>
                    <CardDescription>项目周期、销售漏斗、方案设计</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 lg:grid-cols-3">
                    {/* 项目周期 */}
                    <Card className="border-2 border-indigo-200 dark:border-indigo-800">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Clock className="h-4 w-4 text-indigo-600" />
                          项目周期
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {mockProjectCycle.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
                              <span className="text-sm font-medium text-slate-900 dark:text-white">
                                {item.stage}
                              </span>
                              <div className="flex items-center gap-3">
                                <Badge variant="outline">{item.count}</Badge>
                                <span className="text-xs text-slate-600 dark:text-slate-400">
                                  {item.avgDays}天
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* 销售漏斗 */}
                    <Card className="border-2 border-purple-200 dark:border-purple-800">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <LineChartIcon className="h-4 w-4 text-purple-600" />
                          销售漏斗
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {mockSalesFunnel.map((item, idx) => (
                            <div key={idx}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                  {item.stage}
                                </span>
                                <span className="text-xs text-slate-600 dark:text-slate-400">
                                  {item.conversion}%
                                </span>
                              </div>
                              <Progress 
                                value={item.conversion} 
                                className={`h-3`}
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* 方案设计 */}
                    <Card className="border-2 border-pink-200 dark:border-pink-800">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <FileText className="h-4 w-4 text-pink-600" />
                          方案设计
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {mockProposals.map((proposal) => (
                            <div key={proposal.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">
                                    {proposal.name}
                                  </div>
                                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                    截止: {proposal.deadline}
                                  </div>
                                </div>
                                <Badge className={
                                  proposal.priority === 'high' ? 'bg-red-600' :
                                  proposal.priority === 'medium' ? 'bg-yellow-600' : 'bg-slate-600'
                                }>
                                  {proposal.priority === 'high' ? '高' :
                                   proposal.priority === 'medium' ? '中' : '低'}
                                </Badge>
                              </div>
                              <Progress value={proposal.progress} className="h-2 mb-2" />
                              <div className="flex items-center justify-between">
                                <Badge variant="outline">{proposal.stage}</Badge>
                                <span className="text-xs text-slate-600 dark:text-slate-400">
                                  {proposal.progress}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 风险分析 */}
          {activeMenu === 'risk' && (
            <div className="space-y-6">
              {/* 任务闭环概览 */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-2 border-red-200 dark:border-red-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <Badge className="bg-red-600">紧急</Badge>
                    </div>
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {mockRiskTasks.filter(t => t.priority === 'high' && t.status === 'pending').length}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      待处理紧急任务
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-orange-200 dark:border-orange-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <Badge className="bg-orange-600">进行中</Badge>
                    </div>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {mockRiskTasks.filter(t => t.status === 'processing').length}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      正在处理的任务
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      <Badge className="bg-blue-600">已完成</Badge>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {mockRiskTasks.filter(t => t.status === 'completed').length}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      已完成任务
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <ShieldAlert className="h-5 w-5 text-purple-600" />
                      <Badge className="bg-purple-600">总计</Badge>
                    </div>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {mockRiskTasks.length}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      任务总数
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 任务清单 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5 text-purple-600" />
                      <CardTitle>任务清单</CardTitle>
                      <CardDescription>接单、处理、反馈闭环</CardDescription>
                    </div>
                    <Button size="sm">
                      <Zap className="h-4 w-4 mr-2" />
                      刷新任务
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRiskTasks.map((task) => (
                      <Card key={task.id} className={`
                        cursor-pointer transition-all hover:shadow-md
                        ${selectedTask === task.id ? 'ring-2 ring-blue-500' : ''}
                      `} onClick={() => setSelectedTask(task.id)}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center text-white
                                ${task.priority === 'high' ? 'bg-red-600' :
                                  task.priority === 'medium' ? 'bg-orange-600' : 'bg-slate-600'}
                              `}>
                                {task.status === 'completed' ? (
                                  <CheckCircle2 className="h-5 w-5" />
                                ) : task.status === 'processing' ? (
                                  <Clock className="h-5 w-5" />
                                ) : (
                                  <AlertCircle className="h-5 w-5" />
                                )}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-white">
                                    {task.title}
                                  </div>
                                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                    {task.description}
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                  <Badge className={
                                    task.priority === 'high' ? 'bg-red-600' :
                                    task.priority === 'medium' ? 'bg-orange-600' : 'bg-slate-600'
                                  }>
                                    {task.priority === 'high' ? '高优先级' :
                                     task.priority === 'medium' ? '中优先级' : '低优先级'}
                                  </Badge>
                                  <Badge variant="outline">{task.source}</Badge>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Badge variant="secondary">{task.type}</Badge>
                                  <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                                    <Calendar className="h-3 w-3" />
                                    截止: {task.deadline}
                                  </div>
                                </div>
                                <Button size="sm" variant="outline">
                                  {task.status === 'completed' ? '查看反馈' :
                                   task.status === 'processing' ? '继续处理' : '开始处理'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 最新资讯 */}
          {activeMenu === 'news' && (
            <div className="space-y-6">
              {/* 最新政策 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <CardTitle>最新政策</CardTitle>
                    <CardDescription>政策解读与标准更新</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockNews.policies.map((policy) => (
                      <div key={policy.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={policy.impact === 'high' ? 'bg-red-600' : 'bg-blue-600'}>
                                {policy.impact === 'high' ? '高影响' : '中影响'}
                              </Badge>
                              <Badge variant="outline">{policy.category}</Badge>
                            </div>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                              {policy.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                              {policy.summary}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              {policy.date}
                            </div>
                            <Button size="sm" variant="outline">
                              查看详情
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {policy.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 新品上市 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <CardTitle>新品上市</CardTitle>
                    <CardDescription>最新产品信息与升级</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {mockNews.products.map((product) => (
                      <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="text-5xl">{product.image}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                                      {product.name}
                                    </h3>
                                    {product.trending && (
                                      <Badge className="bg-red-600">
                                        <Flame className="h-3 w-3 mr-1" />
                                        热门
                                      </Badge>
                                    )}
                                  </div>
                                  <Badge variant="outline" className="text-xs mt-1">
                                    {product.category}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">
                                {product.price}
                              </p>
                              <div className="space-y-1">
                                {product.features.map((feature, idx) => (
                                  <div key={idx} className="text-xs text-slate-600 dark:text-slate-400">
                                    • {feature}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-slate-600 dark:text-slate-400">上市日期</span>
                                  <span className="font-semibold text-slate-900 dark:text-white">
                                    {product.launchDate}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 行业资讯 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-teal-600" />
                    <CardTitle>行业资讯</CardTitle>
                    <CardDescription>市场动态与行业趋势</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockNews.industry.map((news) => (
                      <div key={news.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{news.source}</Badge>
                              <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                                <Calendar className="h-3 w-3" />
                                {news.date}
                              </div>
                            </div>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                              {news.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                              {news.summary}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {news.readTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {news.views} 阅读
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {news.likes} 点赞
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="flex-shrink-0">
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            阅读
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
