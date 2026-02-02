'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
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
  X,
  Bell,
  Search,
  Home,
  TrendingUp as TrendingUpIcon,
  Database,
  GitBranch,
  AlertTriangle,
  Navigation,
  BookOpen,
  Plus,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

// ==================== 菜单配置 ====================

type MenuKey = 'home' | 'market' | 'project' | 'node' | 'risk' | 'sales' | 'guide';

const menuSections = [
  {
    title: '核心功能',
    items: [
      { key: 'home' as MenuKey, icon: Home, label: '首页', description: '经营总览与决策支持' },
      { key: 'market' as MenuKey, icon: Target, label: '市场规划', description: '行业分析与产品推荐' },
      { key: 'project' as MenuKey, icon: Database, label: '项目开发', description: '项目储备与跟踪' },
      { key: 'node' as MenuKey, icon: GitBranch, label: '节点推进', description: '项目周期管理' },
      { key: 'risk' as MenuKey, icon: AlertTriangle, label: '风险分析', description: '风险预警与监控' }
    ]
  },
  {
    title: '辅助功能',
    items: [
      { key: 'sales' as MenuKey, icon: Navigation, label: '销售导航', description: '销售工具与资源' },
      { key: 'guide' as MenuKey, icon: BookOpen, label: '运营指南', description: '最佳实践与培训' }
    ]
  }
];

// 展平菜单项，方便遍历
const menuItems = menuSections.flatMap(section => section.items);

// ==================== 用户信息 ====================

const userInfo = {
  name: '季晓东',
  company: '南京雪濠洋环保科技有限公司',
  companyCode: 'ZLX0008',
  avatar: 'J',
  role: '总经理'
};

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

// ==================== 首页关键指标 ====================

const mockKeyMetrics = {
  // 当月完成率
  monthActual: 980000,
  monthTarget: 1200000,
  monthCompletion: 81.67,
  // 当月预测完成率
  monthForecast: 1150000,
  monthForecastCompletion: 95.83,
  // YTD实际完成率
  ytdActual: 5800000,
  ytdTarget: 7200000,
  ytdCompletion: 80.56,
  // 其他指标
  activeProjects: 50,
  conversionRate: 32,
  pendingTasks: 15,
  monthlyForecast: 6,
  unreadMessages: 5,
  satisfaction: 92,
  pendingFollowUps: 23
};

// 消息提醒
const mockMessages = [
  {
    id: 1,
    type: 'info',
    title: '新政策发布通知',
    content: '经销商返利政策已更新，新政策自2026年2月1日起生效，请及时了解详情',
    time: '2026-02-02 10:00',
    priority: 'high'
  },
  {
    id: 2,
    type: 'info',
    title: '新产品发布通知',
    content: 'AR75-MAX系列产品已正式发布，利润率高达35%，欢迎了解详情',
    time: '2026-02-02 08:15',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'success',
    title: '项目审批通过通知',
    content: '南京智能制造科技采购订单已审批通过，金额98万元',
    time: '2026-02-01 16:45',
    priority: 'medium'
  },
  {
    id: 4,
    type: 'warning',
    title: '项目即将到期通知',
    content: '南京智能制造科技项目合同将于30天后到期，请及时跟进续约事宜',
    time: '2026-01-28 09:30',
    priority: 'high'
  },
  {
    id: 5,
    type: 'info',
    title: '通知参加产品培训',
    content: '请于2月10日参加AR75-MAX产品线上培训会议',
    time: '2026-01-27 14:00',
    priority: 'low'
  }
];

// 待办事项
const mockTodos = [
  {
    id: 1,
    title: '确认本月预测待下订单项目',
    description: '南京智能制造科技（预测50万）、上海智慧园区（预测40万）需确认下单时间',
    deadline: '2026-02-05',
    priority: 'high'
  },
  {
    id: 2,
    title: '跟进关键项目进展反馈',
    description: '深圳金融中心安防项目需向销售工程师反馈：客户已确认技术方案，等待预算审批',
    deadline: '2026-02-03',
    priority: 'high'
  },
  {
    id: 3,
    title: '项目技术支持设计确认',
    description: '杭州产业园区水处理项目技术方案已完成设计，需与销售工程师确认方案细节',
    deadline: '2026-02-04',
    priority: 'medium'
  },
  {
    id: 4,
    title: '新项目技术评估支持',
    description: '北京某医院水处理项目需协助进行技术评估，已提供初步建议',
    deadline: '2026-02-06',
    priority: 'medium'
  },
  {
    id: 5,
    title: '月度预测事项整理',
    description: '整理2月份预测项目清单，包括预测金额、预计签约时间等信息',
    deadline: '2026-02-10',
    priority: 'medium'
  },
  {
    id: 6,
    title: '老客户回访记录提交',
    description: '完成南京环保科技等3家老客户季度回访，提交回访记录和需求挖掘情况',
    deadline: '2026-02-08',
    priority: 'low'
  }
];

// 业务指引/运营建议
const mockGuidance = [
  {
    id: 1,
    type: 'opportunity',
    title: '本周推荐：制造业行业',
    description: '本月制造业需求增长28%，高于同规模经销商平均15个百分点。建议优先跟进制造业客户，推荐AR75-E1和BZR100-A102产品。',
    action: '查看行业分析'
  },
  {
    id: 2,
    type: 'risk',
    title: '风险提示：停滞项目处理',
    description: '您有5个项目处于停滞状态超过30天。建议本周内逐一联系客户，了解项目最新进展，激活潜在需求。',
    action: '查看停滞项目'
  },
  {
    id: 3,
    type: 'tip',
    title: '经营建议：高利润产品推广',
    description: 'BZ200-Pro产品利润率高达38%，市场反馈良好。建议在现有客户中推广升级，提升整体利润率。',
    action: '查看产品详情'
  },
  {
    id: 4,
    type: 'training',
    title: '学习资源：项目跟进技巧',
    description: '如何提高项目转化率？新学员反馈，掌握"需求确认"阶段沟通技巧后，转化率提升了15%。',
    action: '开始学习'
  }
];

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
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="flex h-screen overflow-hidden">
        {/* 左侧导航栏 */}
        <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 flex flex-col">
          {/* 门户名称 */}
          <div className="p-6 border-b border-slate-700/50">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="h-7 w-7 text-teal-400" />
              商擎 <span className="text-teal-400">V1.0</span>
            </h1>
          </div>

          {/* 快捷功能按钮 */}
          <div className="p-4 border-b border-slate-700/50">
            <div className="grid grid-cols-2 gap-2">
              <Button className="h-auto flex-col gap-1.5 bg-teal-600 hover:bg-teal-700 text-white">
                <Plus className="h-5 w-5" />
                <span className="text-xs font-medium">项目报备</span>
              </Button>
              <Button className="h-auto flex-col gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white">
                <Activity className="h-5 w-5" />
                <span className="text-xs font-medium">项目跟踪</span>
              </Button>
              <Button className="h-auto flex-col gap-1.5 bg-purple-600 hover:bg-purple-700 text-white">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs font-medium">订单申请</span>
              </Button>
              <Button className="h-auto flex-col gap-1.5 bg-orange-600 hover:bg-orange-700 text-white">
                <Headphones className="h-5 w-5" />
                <span className="text-xs font-medium">服务申请</span>
              </Button>
            </div>
          </div>

          {/* 菜单 */}
          <nav className="flex-1 overflow-y-auto p-4">
            {menuSections.map((section) => (
              <div key={section.title} className="mb-6">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {section.title}
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const MenuIcon = item.icon;
                    const isActive = activeMenu === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setActiveMenu(item.key)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400 border border-teal-500/30'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <MenuIcon className={`h-4 w-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{item.label}</div>
                            <div className="text-xs text-slate-500 truncate">{item.description}</div>
                          </div>
                          {isActive && <ChevronRight className="h-4 w-4 text-teal-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* 底部信息 */}
          <div className="p-4 border-t border-slate-700/50">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-400 flex items-center gap-2">
              <ArrowLeft className="h-3 w-3" />
              返回首页
            </Link>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* 顶部工具栏 */}
          <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="搜索项目、客户、产品..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {mockKeyMetrics.unreadMessages > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500">
                      {mockKeyMetrics.unreadMessages}
                    </Badge>
                  )}
                </Button>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                    {userInfo.avatar}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900 dark:text-white">{userInfo.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{userInfo.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* 内容滚动区 */}
          <div className="flex-1 overflow-auto p-6">
            {/* 首页内容 */}
            {activeMenu === 'home' && (
              <div className="space-y-6">
                {/* 欢迎横幅 */}
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-3 text-white">
                  <div className="text-sm text-teal-100">
                    欢迎回来，{userInfo.name}！今天是 {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                  </div>
                </div>

                {/* 关键指标仪表盘 */}
                <Card className="border-2 border-teal-200 dark:border-teal-800">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5 text-teal-600" />
                        关键指标
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        更多
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* 当月完成率 */}
                      <div className="p-5 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border-2 border-blue-300 dark:border-blue-700">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-base font-bold text-blue-900 dark:text-blue-400">当月完成率</div>
                          <Badge className="bg-blue-600 text-sm px-3 py-1">82%</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-base">
                            <span className="text-slate-700 dark:text-slate-400 font-medium">当月实际</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.monthActual / 10000}万</span>
                          </div>
                          <div className="flex items-center justify-between text-base">
                            <span className="text-slate-700 dark:text-slate-400 font-medium">当月目标</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.monthTarget / 10000}万</span>
                          </div>
                          <div className="flex items-center justify-between text-base font-semibold">
                            <span className="text-red-600 dark:text-red-400">缺口</span>
                            <span className="text-2xl font-bold text-red-600 dark:text-red-400">¥{(mockKeyMetrics.monthTarget - mockKeyMetrics.monthActual) / 10000}万</span>
                          </div>
                          <div className="mt-4">
                            <Progress value={mockKeyMetrics.monthCompletion} className="h-3" />
                          </div>
                        </div>
                      </div>

                      {/* 当月预测完成率 */}
                      <div className="p-5 rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-300 dark:border-green-700">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-base font-bold text-green-900 dark:text-green-400">当月预测完成率</div>
                          <Badge className="bg-green-600 text-sm px-3 py-1">96%</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-base">
                            <span className="text-slate-700 dark:text-slate-400 font-medium">预测额</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.monthForecast / 10000}万</span>
                          </div>
                          <div className="flex items-center justify-between text-base">
                            <span className="text-slate-700 dark:text-slate-400 font-medium">当月目标</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.monthTarget / 10000}万</span>
                          </div>
                          <div className="flex items-center justify-between text-base font-semibold">
                            <span className="text-red-600 dark:text-red-400">缺口</span>
                            <span className="text-2xl font-bold text-red-600 dark:text-red-400">¥{(mockKeyMetrics.monthTarget - mockKeyMetrics.monthForecast) / 10000}万</span>
                          </div>
                          <div className="mt-4">
                            <Progress value={mockKeyMetrics.monthForecastCompletion} className="h-3" />
                          </div>
                        </div>
                      </div>

                      {/* YTD实际完成率 */}
                      <div className="p-5 rounded-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-300 dark:border-purple-700">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-base font-bold text-purple-900 dark:text-purple-400">YTD实际完成率</div>
                          <Badge className="bg-purple-600 text-sm px-3 py-1">81%</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-base">
                            <span className="text-slate-700 dark:text-slate-400 font-medium">YTD实际</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.ytdActual / 10000}万</span>
                          </div>
                          <div className="flex items-center justify-between text-base">
                            <span className="text-slate-700 dark:text-slate-400 font-medium">YTD目标</span>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.ytdTarget / 10000}万</span>
                          </div>
                          <div className="flex items-center justify-between text-base font-semibold">
                            <span className="text-red-600 dark:text-red-400">缺口</span>
                            <span className="text-2xl font-bold text-red-600 dark:text-red-400">¥{(mockKeyMetrics.ytdTarget - mockKeyMetrics.ytdActual) / 10000}万</span>
                          </div>
                          <div className="mt-4">
                            <Progress value={mockKeyMetrics.ytdCompletion} className="h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 业务指引 - 居中占位较大 */}
                <Card className="border-2 border-amber-200 dark:border-amber-800">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                      业务指引 - 赋能经营增效
                    </CardTitle>
                    <CardDescription className="text-sm">
                      基于您的经营数据，为您提供个性化的业务建议和指导
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {mockGuidance.map((guide) => (
                        <div key={guide.id} className={`p-4 rounded-lg border-2 ${
                          guide.type === 'opportunity' ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' :
                          guide.type === 'risk' ? 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20' :
                          guide.type === 'tip' ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' :
                          'border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                        }`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {guide.type === 'opportunity' && <Star className="h-5 w-5 text-green-600" />}
                              {guide.type === 'risk' && <ShieldAlert className="h-5 w-5 text-red-600" />}
                              {guide.type === 'tip' && <Lightbulb className="h-5 w-5 text-blue-600" />}
                              {guide.type === 'training' && <BookOpen className="h-5 w-5 text-purple-600" />}
                              <div className="font-semibold text-base text-slate-900 dark:text-white">
                                {guide.title}
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              {guide.action}
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {guide.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 消息提醒 + 待办事项 - 下面并排 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 消息提醒 */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          消息提醒
                        </CardTitle>
                        <Badge variant="outline">{mockMessages.length}条</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockMessages.map((message) => (
                          <div key={message.id} className={`p-3 rounded-lg border ${
                            message.type === 'warning' ? 'border-red-200 bg-red-50 dark:bg-red-900/20' :
                            message.type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-900/20' :
                            'border-blue-200 bg-blue-50 dark:bg-blue-900/20'
                          }`}>
                            <div className="flex items-start gap-2">
                              <div className={`mt-0.5 ${
                                message.type === 'warning' ? 'text-red-600' :
                                message.type === 'success' ? 'text-green-600' :
                                'text-blue-600'
                              }`}>
                                {message.type === 'warning' && <AlertCircle className="h-4 w-4" />}
                                {message.type === 'success' && <CheckCircle2 className="h-4 w-4" />}
                                {message.type === 'info' && <MessageSquare className="h-4 w-4" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                                  {message.title}
                                </div>
                                <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                  {message.content}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-500">
                                  {message.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 待办事项 */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          待办事项
                        </CardTitle>
                        <Badge variant="outline">{mockTodos.length}项</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockTodos.map((todo) => (
                          <div key={todo.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-1">
                              <div className="text-sm font-semibold text-slate-900 dark:text-white flex-1">
                                {todo.title}
                              </div>
                              <Badge className={`ml-2 ${
                                todo.priority === 'high' ? 'bg-red-600' :
                                todo.priority === 'medium' ? 'bg-orange-600' :
                                'bg-slate-600'
                              }`}>
                                {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
                              </Badge>
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                              {todo.description}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
                              <Clock className="h-3 w-3" />
                              <span>截止: {todo.deadline}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* 其他菜单占位符 */}
            {activeMenu !== 'home' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 shadow-lg">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                    {(() => {
                      const activeSection = menuSections.find(s => s.items.some(i => i.key === activeMenu));
                      const activeItem = activeSection?.items.find(i => i.key === activeMenu);
                      if (activeItem) {
                        const Icon = activeItem.icon;
                        return <Icon className="h-10 w-10 text-white" />;
                      }
                      return <Activity className="h-10 w-10 text-white" />;
                    })()}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {(() => {
                      const activeSection = menuSections.find(s => s.items.some(i => i.key === activeMenu));
                      const activeItem = activeSection?.items.find(i => i.key === activeMenu);
                      return activeItem?.label || '功能模块';
                    })()}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    该功能模块正在开发中，敬请期待...
                  </p>
                  <Button
                    onClick={() => setActiveMenu('home')}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                  >
                    返回首页
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
