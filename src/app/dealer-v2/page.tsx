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
  Activity,
  Layers,
  ChevronRight,
  FolderKanban,
  Building,
  Headphones,
  Cpu,
  RefreshCw,
  ArrowRight as ArrowRightIcon
} from 'lucide-react';

// ==================== 左侧菜单配置 ====================

type MenuKey = 'home' | 'project' | 'service' | 'order' | 'materials' | 'support' | 'iot' | 'monthly';

const menuItems = [
  { key: 'home' as MenuKey, icon: Activity, label: '首页', description: '经营总览与决策支持' },
  { key: 'project' as MenuKey, icon: FolderKanban, label: '项目开发', description: '项目线索管理' },
  { key: 'service' as MenuKey, icon: Building, label: '办事大厅', description: '流程审批' },
  { key: 'order' as MenuKey, icon: ShoppingCart, label: '销售订单', description: '租赁/买断/续租' },
  { key: 'materials' as MenuKey, icon: FileText, label: '宣传物料', description: '物料管理' },
  { key: 'support' as MenuKey, icon: Headphones, label: '售后服务', description: '移机/退机' },
  { key: 'iot' as MenuKey, icon: Cpu, label: 'IOT管理', description: '用户管理' },
  { key: 'monthly' as MenuKey, icon: Calendar, label: '月度预测事项', description: '预测事项反馈' }
];

// ==================== 首页四大版块数据 ====================

// 市场规划 - 细分行业（赛道）
const mockIndustryTracks = [
  {
    id: 1,
    name: '制造业',
    growth: 28,
    potential: 85,
    difficulty: 30,
    revenue: 5000000,
    trend: 'up',
    cases: [
      { id: 101, title: '某大型制造企业智能化改造', customer: '南京智能制造科技', revenue: 850000, successRate: 95 },
      { id: 102, title: '汽车制造厂水处理项目', customer: '上海汽车集团', revenue: 1200000, successRate: 90 }
    ]
  },
  {
    id: 2,
    name: '医疗系统',
    growth: 35,
    potential: 90,
    difficulty: 55,
    revenue: 4200000,
    trend: 'up',
    cases: [
      { id: 201, title: '医院直饮水系统升级', customer: '北京某三甲医院', revenue: 650000, successRate: 92 },
      { id: 202, title: '医疗机构水净化项目', customer: '广州医疗中心', revenue: 980000, successRate: 88 }
    ]
  },
  {
    id: 3,
    name: '智慧园区',
    growth: 22,
    potential: 75,
    difficulty: 40,
    revenue: 3800000,
    trend: 'stable',
    cases: [
      { id: 301, title: '智慧园区能源管理系统', customer: '上海智慧园区科技', revenue: 1200000, successRate: 90 }
    ]
  },
  {
    id: 4,
    name: '教育机构',
    growth: 18,
    potential: 65,
    difficulty: 35,
    revenue: 2500000,
    trend: 'down',
    cases: [
      { id: 401, title: '高校实验室设备采购', customer: '清华大学', revenue: 420000, successRate: 85 }
    ]
  },
  {
    id: 5,
    name: '金融中心',
    growth: 25,
    potential: 70,
    difficulty: 45,
    revenue: 3200000,
    trend: 'up',
    cases: [
      { id: 501, title: '金融中心安防系统', customer: '深圳金融中心', revenue: 580000, successRate: 87 }
    ]
  },
  {
    id: 6,
    name: '园区运营',
    growth: 20,
    potential: 60,
    difficulty: 38,
    revenue: 2800000,
    trend: 'stable',
    cases: []
  }
];

// TOP产品清单
const mockTopProducts = [
  { rank: 1, name: 'AR75-E1', sales: 156, revenue: 3120000, profitMargin: 32, growth: 28 },
  { rank: 2, name: 'BZR100-A102', sales: 95, revenue: 2850000, profitMargin: 28, growth: 16 },
  { rank: 3, name: 'AR75-G1', sales: 134, revenue: 2680000, profitMargin: 26, growth: 24 },
  { rank: 4, name: 'BR75-EH5', sales: 118, revenue: 1770000, profitMargin: 25, growth: 19 },
  { rank: 5, name: 'AR80-Pro', sales: 87, revenue: 1566000, profitMargin: 30, growth: 22 }
];

// 项目开发 - 储备情况
const mockProjectReserve = {
  total: 50,
  target: 60,
  progress: 83,
  within3Months: 12,
  months2To6: 15,
  months6To12: 18,
  months12To24: 8,
  over24Months: 5
};

// 节点推进 - 项目周期分布
const mockProjectCycle = [
  { stage: '报备', count: 45, avgDays: 3 },
  { stage: '跟进中', count: 32, avgDays: 7 },
  { stage: '方案设计', count: 22, avgDays: 10 },
  { stage: '报价中', count: 18, avgDays: 5 },
  { stage: '谈判中', count: 15, avgDays: 14 },
  { stage: '签约', count: 8, avgDays: 2 }
];

// 节点推进 - 销售漏斗
const mockSalesFunnel = [
  { stage: '报备', count: 45, conversion: 100 },
  { stage: '跟进中', count: 32, conversion: 71 },
  { stage: '方案设计', count: 22, conversion: 49 },
  { stage: '报价中', count: 18, conversion: 40 },
  { stage: '谈判中', count: 15, conversion: 33 },
  { stage: '签约', count: 8, conversion: 18 }
];

// 风险分析 - 经营看板风险统计
const mockRiskAnalysis = {
  totalProjects: 45,
  expiringSoon: 8,
  lowProbability: 12,
  stalled: 5,
  pendingApproval: 6,
  overdue: 3,
  riskLevel: 'medium'
};

// ==================== 月度预测事项数据 ====================

const mockMonthlyTasks = [
  {
    id: 'M202501001',
    index: 1,
    name: '智能制造项目预测',
    content: '某大型制造企业智能化改造项目，预计下月签约，预测金额85万',
    pushTime: '2025-01-25 09:30',
    feedbackPerson: '张经理',
    feedbackContent: '已确认客户意向，预计2月15日签约',
    status: '已反馈',
    approver: '李总监',
    approveTime: '2025-01-26 14:20'
  },
  {
    id: 'M202501002',
    index: 2,
    name: '智慧园区项目预测',
    content: '智慧园区能源管理系统，客户正在内部审批，预计下月决策',
    pushTime: '2025-01-25 10:15',
    feedbackPerson: '王经理',
    feedbackContent: '客户审批已通过，等待最终签约',
    status: '已反馈',
    approver: '李总监',
    approveTime: '2025-01-26 15:00'
  },
  {
    id: 'M202501003',
    index: 3,
    name: '医院项目预测',
    content: '医院信息化升级项目，需等待财政预算审批',
    pushTime: '2025-01-25 11:00',
    feedbackPerson: '赵经理',
    feedbackContent: '财政预算审批中，预计下周有结果',
    status: '已反馈',
    approver: null,
    approveTime: null
  },
  {
    id: 'M202501004',
    index: 4,
    name: '高校实验室项目',
    content: '高校实验室设备采购，进入最终谈判阶段',
    pushTime: '2025-01-26 08:30',
    feedbackPerson: null,
    feedbackContent: null,
    status: '新建',
    approver: null,
    approveTime: null
  },
  {
    id: 'M202501005',
    index: 5,
    name: '金融中心安防项目',
    content: '金融中心安防系统项目，需补充技术方案',
    pushTime: '2025-01-26 09:00',
    feedbackPerson: null,
    feedbackContent: null,
    status: '新建',
    approver: null,
    approveTime: null
  },
  {
    id: 'M202501006',
    index: 6,
    name: '园区运营项目',
    content: '某园区运营企业批量采购，预计签约50台设备',
    pushTime: '2025-01-26 10:30',
    feedbackPerson: '刘经理',
    feedbackContent: '已提交报价，等待客户反馈',
    status: '已反馈',
    approver: null,
    approveTime: null
  }
];

export default function DealerPortalV2() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('home');
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null);

  const activeMenuItem = menuItems.find(item => item.key === activeMenu);
  const Icon = activeMenuItem?.icon || Activity;

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
                  经销商门户 <Badge className="ml-2">V2.0</Badge>
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
              <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-medium">
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
            <div className="space-y-1">
              {menuItems.map((item) => {
                const MenuIcon = item.icon;
                const isActive = activeMenu === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveMenu(item.key)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MenuIcon className={`h-5 w-5 mt-0.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{item.label}</div>
                        <div className="text-xs opacity-90 truncate">{item.description}</div>
                      </div>
                      {isActive && <ChevronRight className="h-4 w-4 flex-shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* 主内容区域 */}
        <main className="flex-1 p-6 overflow-auto">
          {/* 首页 */}
          {activeMenu === 'home' && (
            <div className="space-y-6">
              {/* 版块1: 市场规划 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">市场规划</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">找到适合的赛道，看哪些产品更赚钱</p>
                  </div>
                </div>
                
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* 细分行业（赛道） */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          细分行业（赛道）
                        </CardTitle>
                        <Badge variant="outline">点击查看案例</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {mockIndustryTracks.map((industry) => (
                          <button
                            key={industry.id}
                            onClick={() => setSelectedIndustry(selectedIndustry === industry.id ? null : industry.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${
                              selectedIndustry === industry.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">{industry.name}</span>
                                {industry.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-green-500" />}
                                {industry.trend === 'down' && <ArrowUpRight className="h-4 w-4 text-red-500 transform rotate-180" />}
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-400">
                                {industry.cases.length}个案例
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-xs">
                                <span className="text-slate-500">增长:</span>
                                <span className="font-semibold text-green-600">{industry.growth}%</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs">
                                <span className="text-slate-500">潜力:</span>
                                <span className="font-semibold">{industry.potential}%</span>
                              </div>
                              <Progress value={industry.potential} className="h-1.5 flex-1" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 成功案例（根据选中的行业动态显示） */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        成功案例
                      </CardTitle>
                      <CardDescription>
                        {selectedIndustry
                          ? `查看 ${mockIndustryTracks.find(i => i.id === selectedIndustry)?.name} 的成功案例`
                          : '点击上方行业查看对应案例'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {selectedIndustry ? (
                        <div className="space-y-3">
                          {mockIndustryTracks.find(i => i.id === selectedIndustry)?.cases.map((caseItem) => (
                            <div key={caseItem.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                              <div className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                                {caseItem.title}
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                {caseItem.customer}
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-green-600">
                                  ¥{(caseItem.revenue / 10000).toFixed(0)}万
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  成功率 {caseItem.successRate}%
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Award className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            请点击左侧行业查看成功案例
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* TOP产品清单 */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      TOP产品清单
                    </CardTitle>
                    <CardDescription>看哪些产品更赚钱</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockTopProducts.map((product) => (
                        <div key={product.rank} className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                          <div className={`
                            flex items-center justify-center w-8 h-8 rounded-full font-bold text-white text-xs
                            ${product.rank <= 3 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-slate-400'}
                          `}>
                            {product.rank}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-slate-900 dark:text-white">
                              {product.name}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              销售量: {product.sales}台
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-green-600 dark:text-green-400">
                              ¥{(product.revenue / 10000).toFixed(0)}万
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              利润率: {product.profitMargin}%
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Badge className={product.growth >= 25 ? 'bg-red-600' : 'bg-blue-600'}>
                              +{product.growth}%
                            </Badge>
                            {product.growth >= 25 && <Flame className="h-3 w-3 text-orange-500" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 版块2: 项目开发 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <FolderKanban className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">项目开发</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">储备情况与项目进度</p>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">储备情况</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* 储备进度 */}
                      <div className="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                        <div className="text-center mb-4">
                          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                            {mockProjectReserve.total}/{mockProjectReserve.target}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            储备进度
                          </div>
                        </div>
                        <Progress value={mockProjectReserve.progress} className="h-3" />
                        <div className="text-center text-sm font-semibold text-purple-600 dark:text-purple-400 mt-2">
                          {mockProjectReserve.progress}%
                        </div>
                      </div>

                      {/* 分布情况 */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">项目分布</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">3个月内</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{mockProjectReserve.within3Months}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">2-6个月</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{mockProjectReserve.months2To6}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">6-12个月</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{mockProjectReserve.months6To12}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">12-24个月</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{mockProjectReserve.months12To24}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">24个月以上</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{mockProjectReserve.over24Months}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 版块3: 节点推进 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                    <Layers className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">节点推进</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">项目周期与销售漏斗</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* 项目周期分布 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        项目周期分布
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockProjectCycle.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                              {item.stage}
                            </span>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline">{item.count}</Badge>
                              <span className="text-xs text-slate-600 dark:text-slate-400">
                                平均 {item.avgDays} 天
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 销售漏斗 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <LineChartIcon className="h-4 w-4" />
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
                            <Progress value={item.conversion} className="h-3" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* 版块4: 风险分析 */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <ShieldAlert className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">风险分析</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">经营看板风险统计</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                  <Card className="border-2 border-orange-200 dark:border-orange-800">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        <Badge className="bg-orange-600">预警</Badge>
                      </div>
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        {mockRiskAnalysis.expiringSoon}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        即将到期项目
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-red-200 dark:border-red-800">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <ShieldAlert className="h-5 w-5 text-red-600" />
                        <Badge className="bg-red-600">高风险</Badge>
                      </div>
                      <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                        {mockRiskAnalysis.lowProbability}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        低概率项目
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-yellow-200 dark:border-yellow-800">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <Badge className="bg-yellow-600">停滞</Badge>
                      </div>
                      <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                        {mockRiskAnalysis.stalled}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        停滞项目
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <Badge className="bg-blue-600">待批</Badge>
                      </div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {mockRiskAnalysis.pendingApproval}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        待审批订单
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-purple-200 dark:border-purple-800">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <Activity className="h-5 w-5 text-purple-600" />
                        <Badge className="bg-purple-600">总计</Badge>
                      </div>
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {mockRiskAnalysis.totalProjects}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        总项目数
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-red-200 dark:border-red-800">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <Zap className="h-5 w-5 text-red-600" />
                        <Badge className="bg-red-600">逾期</Badge>
                      </div>
                      <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                        {mockRiskAnalysis.overdue}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        逾期项目
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          )}

          {/* 月度预测事项 */}
          {activeMenu === 'monthly' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                  <Calendar className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">月度预测事项</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    查看和管理预测事项的反馈与审批
                  </p>
                </div>
              </div>

              {/* 事项清单 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>事项清单</CardTitle>
                    <div className="flex gap-2">
                      <Badge className="bg-slate-600">新建: 2</Badge>
                      <Badge className="bg-blue-600">已反馈: 4</Badge>
                      <Badge className="bg-green-600">已完结: 2</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold text-sm">序号</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">事项名称</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">事项内容</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">推送时间</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">反馈人</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">反馈内容</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">单据状态</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">审批人</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">审批时间</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockMonthlyTasks.map((task) => (
                          <tr key={task.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                            <td className="py-3 px-4 text-sm">{task.index}</td>
                            <td className="py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">
                              {task.name}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">
                              {task.content}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                              {task.pushTime}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                              {task.feedbackPerson || '-'}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">
                              {task.feedbackContent || '-'}
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={
                                task.status === '新建' ? 'bg-slate-600' :
                                task.status === '已反馈' ? 'bg-blue-600' : 'bg-green-600'
                              }>
                                {task.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                              {task.approver || '-'}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                              {task.approveTime || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 其他菜单项（占位符） */}
          {activeMenu !== 'home' && activeMenu !== 'monthly' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FolderKanban className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {activeMenuItem?.label}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                该功能模块正在开发中，请稍后再试
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
