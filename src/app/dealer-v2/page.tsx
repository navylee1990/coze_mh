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
  ArrowRight as ArrowRightIcon,
  X
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
  { key: 'monthly' as MenuKey, icon: Calendar, label: '预测事项任务单', description: '预测事项反馈' }
];

// ==================== 首页四大版块数据 ====================

// 市场规划 - 细分行业（赛道） - 行业分析对比
const mockIndustryTracks = [
  {
    id: 1,
    name: '制造业',
    own: 1200000,  // 自己的业绩
    yoyGrowth: 15,  // 同比增长
    peerAvg: 950000,  // 同规模经销商平均
    potential: 85,  // 潜力
    marketSize: 5000000,  // 市场规模
    cases: [
      { id: 101, title: '某大型制造企业智能化改造', customer: '南京智能制造科技', revenue: 850000, successRate: 95, type: '智能化' },
      { id: 102, title: '汽车制造厂水处理项目', customer: '上海汽车集团', revenue: 1200000, successRate: 90, type: '水处理' },
      { id: 103, title: '电子制造厂环境监测', customer: '苏州电子科技', revenue: 560000, successRate: 88, type: '环境监测' }
    ]
  },
  {
    id: 2,
    name: '医疗系统',
    own: 980000,
    yoyGrowth: 22,
    peerAvg: 780000,
    potential: 90,
    marketSize: 4200000,
    cases: [
      { id: 201, title: '医院直饮水系统升级', customer: '北京某三甲医院', revenue: 650000, successRate: 92, type: '直饮水' },
      { id: 202, title: '医疗机构水净化项目', customer: '广州医疗中心', revenue: 980000, successRate: 88, type: '水净化' },
      { id: 203, title: '诊所设备采购', customer: '杭州连锁诊所', revenue: 320000, successRate: 85, type: '设备采购' }
    ]
  },
  {
    id: 3,
    name: '智慧园区',
    own: 850000,
    yoyGrowth: 18,
    peerAvg: 720000,
    potential: 75,
    marketSize: 3800000,
    cases: [
      { id: 301, title: '智慧园区能源管理系统', customer: '上海智慧园区科技', revenue: 1200000, successRate: 90, type: '能源管理' },
      { id: 302, title: '园区安防监控项目', customer: '深圳科技园', revenue: 680000, successRate: 87, type: '安防监控' }
    ]
  },
  {
    id: 4,
    name: '教育机构',
    own: 620000,
    yoyGrowth: 8,
    peerAvg: 550000,
    potential: 65,
    marketSize: 2500000,
    cases: [
      { id: 401, title: '高校实验室设备采购', customer: '清华大学', revenue: 420000, successRate: 85, type: '实验室' },
      { id: 402, title: '中小学饮用水改造', customer: '上海教育局', revenue: 380000, successRate: 82, type: '饮用水' }
    ]
  },
  {
    id: 5,
    name: '金融中心',
    own: 750000,
    yoyGrowth: 20,
    peerAvg: 680000,
    potential: 70,
    marketSize: 3200000,
    cases: [
      { id: 501, title: '金融中心安防系统', customer: '深圳金融中心', revenue: 580000, successRate: 87, type: '安防系统' },
      { id: 502, title: '银行数据中心温控', customer: '北京某银行', revenue: 450000, successRate: 84, type: '温控系统' }
    ]
  },
  {
    id: 6,
    name: '园区运营',
    own: 580000,
    yoyGrowth: 12,
    peerAvg: 520000,
    potential: 60,
    marketSize: 2800000,
    cases: [
      { id: 601, title: '园区整体设备运维', customer: '杭州产业园区', revenue: 720000, successRate: 89, type: '设备运维' }
    ]
  }
];

// 畅销产品排行榜
const mockTopProducts = [
  { rank: 1, name: 'AR75-E1', sales: 156, revenue: 3120000, profitMargin: 32, growth: 28, recommended: true, reason: '高利润产品，市场表现优异' },
  { rank: 2, name: 'BZR100-A102', sales: 95, revenue: 2850000, profitMargin: 28, growth: 16, recommended: true, reason: '公司推荐，竞争力强' },
  { rank: 3, name: 'AR75-G1', sales: 134, revenue: 2680000, profitMargin: 26, growth: 24, recommended: false, reason: '' },
  { rank: 4, name: 'BR75-EH5', sales: 118, revenue: 1770000, profitMargin: 25, growth: 19, recommended: true, reason: '高利润新品，市场潜力大' },
  { rank: 5, name: 'AR80-Pro', sales: 87, revenue: 1566000, profitMargin: 30, growth: 22, recommended: false, reason: '' },
  { rank: 6, name: 'AR75-MAX', sales: 65, revenue: 1430000, profitMargin: 35, growth: 32, recommended: true, reason: '超高利润率，快速成长' },
  { rank: 7, name: 'BZ200-Pro', sales: 52, revenue: 1300000, profitMargin: 38, growth: 28, recommended: true, reason: '旗舰产品，利润率最高' }
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

// 节点推进 - 项目周期分布（10个阶段）
const mockProjectCycle = [
  { stage: '初报备', count: 50, avgDays: 2, progress: 0 },
  { stage: '复核', count: 45, avgDays: 3, progress: 10 },
  { stage: '现场勘察', count: 38, avgDays: 5, progress: 20 },
  { stage: '需求确认中', count: 32, avgDays: 7, progress: 30 },
  { stage: '方案提交', count: 25, avgDays: 10, progress: 40 },
  { stage: '方案确认', count: 20, avgDays: 8, progress: 50 },
  { stage: '计划采购中', count: 15, avgDays: 14, progress: 60 },
  { stage: '采购流程启动', count: 12, avgDays: 10, progress: 70 },
  { stage: '合同流程', count: 10, avgDays: 7, progress: 90 },
  { stage: '已签约', count: 8, avgDays: 3, progress: 100 },
  { stage: '已下订单', count: 5, avgDays: 2, progress: 100 }
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
  expiringSoon: 8,  // 近1个月即将到期项目
  unconvertedReported: 12,  // 已报备未转化项目
  stalled: 5,  // 停滞项目
  pendingApproval: 6,  // 待审批订单
  total: 31
};

// ==================== 预测事项任务单数据 ====================

const mockMonthlyTasks = [
  {
    id: 'M202501001',
    index: 1,
    name: '智能制造项目预测',
    content: '某大型制造企业智能化改造项目，预计下月签约，预测金额85万',
    pushTime: '2025-01-25 09:30',
    pushPerson: '系统',
    feedbackPerson: '张经理',
    feedbackContent: '已确认客户意向，预计2月15日签约',
    status: '已反馈',
    approver: '李总监',
    approveTime: '2025-01-26 14:20',
    description: '该项目进度良好，已完成技术方案评审，等待最终签约。建议继续跟进，确保按时成交。',
    history: [
      { time: '2025-01-25 09:30', action: '系统推送', detail: '系统自动推送预测事项' },
      { time: '2025-01-26 10:00', action: '反馈', detail: '张经理反馈：已确认客户意向，预计2月15日签约' },
      { time: '2025-01-26 14:20', action: '审批', detail: '李总监审批通过，状态变更为已反馈' }
    ]
  },
  {
    id: 'M202501002',
    index: 2,
    name: '智慧园区项目预测',
    content: '智慧园区能源管理系统，客户正在内部审批，预计下月决策',
    pushTime: '2025-01-25 10:15',
    pushPerson: '系统',
    feedbackPerson: '王经理',
    feedbackContent: '客户审批已通过，等待最终签约',
    status: '已反馈',
    approver: '李总监',
    approveTime: '2025-01-26 15:00',
    description: '客户内部审批已完成，建议尽快启动合同流程，避免竞争对手介入。',
    history: [
      { time: '2025-01-25 10:15', action: '系统推送', detail: '系统自动推送预测事项' },
      { time: '2025-01-26 11:30', action: '反馈', detail: '王经理反馈：客户审批已通过，等待最终签约' },
      { time: '2025-01-26 15:00', action: '审批', detail: '李总监审批通过，状态变更为已反馈' }
    ]
  },
  {
    id: 'M202501003',
    index: 3,
    name: '医院项目预测',
    content: '医院信息化升级项目，需等待财政预算审批',
    pushTime: '2025-01-25 11:00',
    pushPerson: '系统',
    feedbackPerson: '赵经理',
    feedbackContent: '财政预算审批中，预计下周有结果',
    status: '已反馈',
    approver: null,
    approveTime: null,
    description: '预算审批周期较长，需要持续关注。建议每周跟进一次审批进度。',
    history: [
      { time: '2025-01-25 11:00', action: '系统推送', detail: '系统自动推送预测事项' },
      { time: '2025-01-26 09:00', action: '反馈', detail: '赵经理反馈：财政预算审批中，预计下周有结果' }
    ]
  },
  {
    id: 'M202501004',
    index: 4,
    name: '高校实验室项目',
    content: '高校实验室设备采购，进入最终谈判阶段',
    pushTime: '2025-01-26 08:30',
    pushPerson: '李总监',
    feedbackPerson: null,
    feedbackContent: null,
    status: '新建',
    approver: null,
    approveTime: null,
    description: '项目进入谈判阶段，需要提供详细的技术方案和报价。建议安排技术团队支持。',
    history: [
      { time: '2025-01-26 08:30', action: '人工推送', detail: '李总监手动推送预测事项' }
    ]
  },
  {
    id: 'M202501005',
    index: 5,
    name: '金融中心安防项目',
    content: '金融中心安防系统项目，需补充技术方案',
    pushTime: '2025-01-26 09:00',
    pushPerson: '系统',
    feedbackPerson: null,
    feedbackContent: null,
    status: '新建',
    approver: null,
    approveTime: null,
    description: '客户对现有技术方案有疑问，需要补充方案。建议尽快安排技术交流。',
    history: [
      { time: '2025-01-26 09:00', action: '系统推送', detail: '系统自动推送预测事项' }
    ]
  },
  {
    id: 'M202501006',
    index: 6,
    name: '园区运营项目',
    content: '某园区运营企业批量采购，预计签约50台设备',
    pushTime: '2025-01-26 10:30',
    pushPerson: '系统',
    feedbackPerson: '刘经理',
    feedbackContent: '已提交报价，等待客户反馈',
    status: '已反馈',
    approver: null,
    approveTime: null,
    description: '已提交报价，预计2-3天内会有反馈。建议提前准备合同模板。',
    history: [
      { time: '2025-01-26 10:30', action: '系统推送', detail: '系统自动推送预测事项' },
      { time: '2025-01-26 14:00', action: '反馈', detail: '刘经理反馈：已提交报价，等待客户反馈' }
    ]
  }
];

export default function DealerPortalV2() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('home');
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<typeof mockMonthlyTasks[0] | null>(null);
  const [filterFeedbackPerson, setFilterFeedbackPerson] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('全部');
  const [filterPushTime, setFilterPushTime] = useState<string>('');

  const activeMenuItem = menuItems.find(item => item.key === activeMenu);
  const Icon = activeMenuItem?.icon || Activity;

  // 过滤预测事项任务单
  const filteredTasks = mockMonthlyTasks.filter(task => {
    const matchFeedbackPerson = !filterFeedbackPerson || task.feedbackPerson?.includes(filterFeedbackPerson);
    const matchStatus = filterStatus === '全部' || task.status === filterStatus;
    const matchPushTime = !filterPushTime || task.pushTime.includes(filterPushTime);
    return matchFeedbackPerson && matchStatus && matchPushTime;
  });

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
                  {/* 细分行业（赛道） - 行业分析对比 */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          行业分析对比
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
                            className={`w-full text-left p-4 rounded-lg border transition-all ${
                              selectedIndustry === industry.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-semibold text-base">{industry.name}</span>
                              <div className="flex items-center gap-2">
                                {industry.yoyGrowth > 15 && <Flame className="h-4 w-4 text-orange-500" />}
                                {industry.yoyGrowth >= 0 ? <ArrowUpRight className="h-4 w-4 text-green-500" /> : <ArrowUpRight className="h-4 w-4 text-red-500 transform rotate-180" />}
                                <span className={`text-xs font-semibold ${industry.yoyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  同比 {industry.yoyGrowth >= 0 ? '+' : ''}{industry.yoyGrowth}%
                                </span>
                              </div>
                            </div>

                            {/* 对比数据 */}
                            <div className="grid grid-cols-3 gap-3 mb-2">
                              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                                <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">自己的</div>
                                <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                  ¥{(industry.own / 10000).toFixed(0)}万
                                </div>
                              </div>
                              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">同规模平均</div>
                                <div className="text-sm font-bold text-green-600 dark:text-green-400">
                                  ¥{(industry.peerAvg / 10000).toFixed(0)}万
                                </div>
                              </div>
                              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                                <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">潜力</div>
                                <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                  {industry.potential}%
                                </div>
                              </div>
                            </div>

                            <Progress value={industry.potential} className="h-2" />

                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                              市场规模: ¥{(industry.marketSize / 10000).toFixed(0)}万 | {industry.cases.length}个成功案例
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
                            <div key={caseItem.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                                    {caseItem.title}
                                  </div>
                                  <div className="text-xs text-slate-600 dark:text-slate-400">
                                    {caseItem.customer}
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-xs ml-2">
                                  {caseItem.type}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-green-600">
                                  ¥{(caseItem.revenue / 10000).toFixed(0)}万
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-600 dark:text-slate-400">成功率</span>
                                  <Badge className="bg-green-600 text-white text-xs">
                                    {caseItem.successRate}%
                                  </Badge>
                                </div>
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

                {/* 畅销产品排行榜 */}
                <Card className="mt-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          畅销产品排行榜
                        </CardTitle>
                        <Badge className="bg-orange-600">V1.0畅销榜</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-slate-600 dark:text-slate-400">公司推荐高利润产品</span>
                      </div>
                    </div>
                    <CardDescription>看哪些产品更赚钱，公司推荐更值得推荐的产品</CardDescription>
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
                            <div className="flex items-center gap-2">
                              <div className="font-semibold text-sm text-slate-900 dark:text-white">
                                {product.name}
                              </div>
                              {product.recommended && (
                                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                                  推荐
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              销售量: {product.sales}台 | {product.reason}
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

                      {/* 分布情况 - 添加颜色和指导意义 */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">项目分布</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-600"></div>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">3个月内</span>
                            </div>
                            <span className="text-sm font-bold text-red-600 dark:text-red-400">{mockProjectReserve.within3Months}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">2-6个月</span>
                            </div>
                            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{mockProjectReserve.months2To6}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-600"></div>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">6-12个月</span>
                            </div>
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">{mockProjectReserve.months6To12}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">12-24个月</span>
                            </div>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{mockProjectReserve.months12To24}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">24个月以上</span>
                            </div>
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{mockProjectReserve.over24Months}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 指导意义 */}
                    <div className="mt-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm text-amber-900 dark:text-amber-400 mb-2">指导意义</div>
                          <div className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
                            <p>• <span className="font-semibold">3个月内（{mockProjectReserve.within3Months}项）</span>：重点跟进，优先资源投入，确保按时签约</p>
                            <p>• <span className="font-semibold">2-6个月（{mockProjectReserve.months2To6}项）</span>：建立客户关系，深入挖掘需求，提升转化率</p>
                            <p>• <span className="font-semibold">6-12个月（{mockProjectReserve.months6To12}项）</span>：持续跟进，定期更新信息，提前布局</p>
                            <p>• <span className="font-semibold">12个月以上（{mockProjectReserve.months12To24 + mockProjectReserve.over24Months}项）</span>：保持关注，寻找机会提前激活</p>
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
                  {/* 项目周期分布 - 10个阶段 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        项目周期分布
                      </CardTitle>
                      <CardDescription>10个阶段全流程跟踪</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockProjectCycle.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-xs text-slate-500 dark:text-slate-400 w-8">{idx}.</span>
                              <span className="text-sm font-medium text-slate-900 dark:text-white flex-1">
                                {item.stage}
                              </span>
                              <Badge variant="outline" className="text-xs">{item.progress}%</Badge>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">{item.count}</span>
                              <span className="text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                {item.avgDays}天
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 指导意见 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        节点推进指导意见
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                          <div className="font-semibold text-sm text-blue-900 dark:text-blue-400 mb-1">前期（0-30%）</div>
                          <div className="text-xs text-blue-800 dark:text-blue-300">
                            初报备 → 复核 → 现场勘察：快速响应，及时确认客户意向，建立初步信任
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                          <div className="font-semibold text-sm text-green-900 dark:text-green-400 mb-1">中期（30-70%）</div>
                          <div className="text-xs text-green-800 dark:text-green-300">
                            需求确认 → 方案提交 → 方案确认 → 计划采购：深入了解需求，提供定制方案，锁定客户预算
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                          <div className="font-semibold text-sm text-purple-900 dark:text-purple-400 mb-1">后期（70-100%）</div>
                          <div className="text-xs text-purple-800 dark:text-purple-300">
                            采购流程启动 → 合同流程 → 已签约 → 已下订单：快速推进流程，确保按时成交，避免变数
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                          <div className="flex items-start gap-2">
                            <Zap className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-sm text-amber-900 dark:text-amber-400 mb-1">关键建议</div>
                              <div className="text-xs text-amber-800 dark:text-amber-300">
                                • 重点关注"复核"和"需求确认"阶段，转化效率直接影响成功率<br />
                                • 平均处理时间最长的是"计划采购中"（14天），需提前准备<br />
                                • 已签约到已下订单仅差3天，建议快速推进，避免客户反悔
                              </div>
                            </div>
                          </div>
                        </div>
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
                        近1个月即将到期
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-red-200 dark:border-red-800">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <ShieldAlert className="h-5 w-5 text-red-600" />
                        <Badge className="bg-red-600">未转化</Badge>
                      </div>
                      <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                        {mockRiskAnalysis.unconvertedReported}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        已报备未转化
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
                </div>

                {/* 风险统计总览 */}
                <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      风险项目总计
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {mockRiskAnalysis.total}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* 预测事项任务单 */}
          {activeMenu === 'monthly' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                  <Calendar className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">预测事项任务单</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    查看和管理预测事项的反馈与审批
                  </p>
                </div>
              </div>

              {/* 事项清单 */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <CardTitle>事项清单</CardTitle>
                      <div className="flex gap-2">
                        <Badge className="bg-slate-600">新建: 2</Badge>
                        <Badge className="bg-blue-600">已反馈: 4</Badge>
                        <Badge className="bg-green-600">已完结: 0</Badge>
                      </div>
                    </div>

                    {/* 查询条件 */}
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600 dark:text-slate-400">反馈人:</label>
                        <input
                          type="text"
                          value={filterFeedbackPerson}
                          onChange={(e) => setFilterFeedbackPerson(e.target.value)}
                          placeholder="输入反馈人名称"
                          className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600 dark:text-slate-400">单据状态:</label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="全部">全部</option>
                          <option value="新建">新建</option>
                          <option value="已反馈">已反馈</option>
                          <option value="已完结">已完结</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600 dark:text-slate-400">推送时间:</label>
                        <input
                          type="text"
                          value={filterPushTime}
                          onChange={(e) => setFilterPushTime(e.target.value)}
                          placeholder="YYYY-MM-DD"
                          className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setFilterFeedbackPerson('');
                          setFilterStatus('全部');
                          setFilterPushTime('');
                        }}
                      >
                        重置
                      </Button>
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
                          <th className="text-left py-3 px-4 font-semibold text-sm">推送人</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">反馈人</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">反馈内容</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">单据状态</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">审批人</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">审批时间</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTasks.map((task) => (
                          <tr
                            key={task.id}
                            onDoubleClick={() => setSelectedTask(task)}
                            className="border-b hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                          >
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
                              {task.pushPerson || '-'}
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

              {/* 明细弹窗 */}
              {selectedTask && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>事项明细</CardTitle>
                          <CardDescription>序号: {selectedTask.index}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTask(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">事项名称</div>
                          <div className="font-semibold text-slate-900 dark:text-white">{selectedTask.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">单据状态</div>
                          <Badge className={
                            selectedTask.status === '新建' ? 'bg-slate-600' :
                            selectedTask.status === '已反馈' ? 'bg-blue-600' : 'bg-green-600'
                          }>
                            {selectedTask.status}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">事项内容</div>
                        <div className="text-slate-900 dark:text-white">{selectedTask.content}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">推送时间</div>
                          <div className="text-slate-900 dark:text-white">{selectedTask.pushTime}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">推送人</div>
                          <div className="text-slate-900 dark:text-white">{selectedTask.pushPerson}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">反馈人</div>
                          <div className="text-slate-900 dark:text-white">{selectedTask.feedbackPerson || '-'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">审批人</div>
                          <div className="text-slate-900 dark:text-white">{selectedTask.approver || '-'}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">反馈内容</div>
                        <div className="text-slate-900 dark:text-white">{selectedTask.feedbackContent || '-'}</div>
                      </div>

                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">描述</div>
                        <div className="text-slate-900 dark:text-white">{selectedTask.description}</div>
                      </div>

                      {selectedTask.history && selectedTask.history.length > 0 && (
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">历史记录</div>
                          <div className="space-y-2">
                            {selectedTask.history.map((item, idx) => (
                              <div key={idx} className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-slate-600 dark:text-slate-400">{item.time}</span>
                                  <Badge variant="outline" className="text-xs">{item.action}</Badge>
                                </div>
                                <div className="text-sm text-slate-900 dark:text-white">{item.detail}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" onClick={() => setSelectedTask(null)}>
                          关闭
                        </Button>
                        {selectedTask.status === '新建' && (
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            登记反馈
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
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
