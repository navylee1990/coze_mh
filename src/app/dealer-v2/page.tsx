'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
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
  ArrowDown,
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
  MapPin,
  School,
  GraduationCap,
  Stethoscope,
  Briefcase,
  Key,
  Image,
  CreditCard,
  RefreshCw as RefreshIcon,
  ArrowRightLeft,
  FileCheck,
  Wrench,
  Truck,
  Package as PackageIcon,
  Move,
  XCircle,
  FileText as FileTextIcon,
  Hammer
} from 'lucide-react';

// ==================== 菜单配置 ====================

type MenuKey = 'home' | 'lease' | 'sales' | 'afterSales' | 'market' | 'salesNav' | 'guide';
type SubMenuKey = 'leaseApply' | 'cardApplyRecord' | 'renewLease' | 'leaseToSale' | 'delayRecord' |
                   'buyApply' | 'buyRecord' | 'maintenance' | 'installApply' | 'materials' |
                   'moveApply' | 'returnApply' | 'returnRecord' | 'disassembleRecord';

const menuSections = [
  {
    title: '销售导航',
    items: [
      { key: 'home' as MenuKey, icon: Home, label: '首页', description: '经营总览与决策支持' },
      {
        key: 'lease' as MenuKey,
        icon: Key,
        label: '租赁业务',
        description: '租赁业务管理',
        hasSubmenu: true,
        subItems: [
          { key: 'leaseApply' as SubMenuKey, icon: Plus, label: '租赁机申请', description: '新设备租赁申请' },
          { key: 'cardApplyRecord' as SubMenuKey, icon: CreditCard, label: '卡申请记录', description: 'SIM卡申请历史' },
          { key: 'renewLease' as SubMenuKey, icon: RefreshIcon, label: '续租申请', description: '设备续租申请' },
          { key: 'leaseToSale' as SubMenuKey, icon: ArrowRightLeft, label: '租转售申请', description: '租赁转销售' },
          { key: 'delayRecord' as SubMenuKey, icon: Clock, label: '延期记录', description: '延期申请记录' }
        ]
      },
      {
        key: 'sales' as MenuKey,
        icon: DollarSign,
        label: '销售业务',
        description: '销售业务管理',
        hasSubmenu: true,
        subItems: [
          { key: 'buyApply' as SubMenuKey, icon: Plus, label: '购机申请', description: '设备购买申请' },
          { key: 'buyRecord' as SubMenuKey, icon: FileCheck, label: '购机记录', description: '设备购买历史' },
          { key: 'maintenance' as SubMenuKey, icon: Wrench, label: '维保档案', description: '设备维保记录' },
          { key: 'installApply' as SubMenuKey, icon: Truck, label: '安装申请', description: '设备安装申请' },
          { key: 'materials' as SubMenuKey, icon: Image, label: '宣传物料', description: '宣传物料管理' }
        ]
      },
      {
        key: 'afterSales' as MenuKey,
        icon: Headphones,
        label: '售后管理',
        description: '售后服务管理',
        hasSubmenu: true,
        subItems: [
          { key: 'moveApply' as SubMenuKey, icon: Move, label: '移机申请', description: '设备移机申请' },
          { key: 'returnApply' as SubMenuKey, icon: XCircle, label: '退机申请', description: '设备退机申请' },
          { key: 'returnRecord' as SubMenuKey, icon: FileTextIcon, label: '退货记录', description: '设备退货历史' },
          { key: 'disassembleRecord' as SubMenuKey, icon: Hammer, label: '拆机记录', description: '设备拆机记录' }
        ]
      }
    ]
  },
  {
    title: '销售赋能',
    items: [
      { key: 'market' as MenuKey, icon: Target, label: '市场规划', description: '行业分析与产品推荐' },
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
  role: '总经理',
  rating: 'A+'
};

// ==================== 首页四大版块数据 ====================

// 市场规划 - 细分行业（赛道） - 行业分析对比
const mockIndustryTracks = [
  {
    id: 1,
    name: 'K12(小中高)',
    own: 850000,  // 自己的业绩
    yoyGrowth: 12,  // 同比增长
    peerAvg: 950000,  // 同规模经销商平均（自己低于平均）
    potential: 90,  // 潜力
    marketSize: 5000000,  // 市场规模
    cases: [
      { id: 101, title: '某中学直饮水系统改造', customer: '南京某中学', revenue: 650000, successRate: 95, type: '直饮水' },
      { id: 102, title: '小学实验室设备采购', customer: '上海某小学', revenue: 380000, successRate: 90, type: '实验室' },
      { id: 103, title: '高中智能化改造项目', customer: '苏州某高中', revenue: 560000, successRate: 88, type: '智能化' }
    ]
  },
  {
    id: 2,
    name: '楼宇BOT',
    own: 1200000,
    yoyGrowth: 28,
    peerAvg: 900000,  // 自己高于平均
    potential: 85,
    marketSize: 4500000,
    cases: [
      { id: 201, title: '商业楼宇直饮水BOT项目', customer: '北京某商业中心', revenue: 1200000, successRate: 92, type: 'BOT' },
      { id: 202, title: '办公楼宇水处理BOT', customer: '广州某写字楼', revenue: 980000, successRate: 88, type: 'BOT' },
      { id: 203, title: '综合体楼宇设备BOT', customer: '杭州某综合体', revenue: 850000, successRate: 85, type: 'BOT' }
    ]
  },
  {
    id: 3,
    name: '校园BOT',
    own: 720000,
    yoyGrowth: 10,
    peerAvg: 850000,  // 自己低于平均
    potential: 88,
    marketSize: 3800000,
    cases: [
      { id: 301, title: '大学校园BOT项目', customer: '上海某大学', revenue: 950000, successRate: 90, type: 'BOT' },
      { id: 302, title: '职业技术学校BOT', customer: '深圳某职校', revenue: 680000, successRate: 87, type: 'BOT' }
    ]
  },
  {
    id: 4,
    name: '医疗系统',
    own: 1050000,
    yoyGrowth: 22,
    peerAvg: 820000,  // 自己高于平均
    potential: 90,
    marketSize: 4200000,
    cases: [
      { id: 401, title: '医院直饮水系统升级', customer: '北京某三甲医院', revenue: 850000, successRate: 92, type: '直饮水' },
      { id: 402, title: '医疗机构水净化项目', customer: '广州医疗中心', revenue: 1200000, successRate: 88, type: '水净化' },
      { id: 403, title: '诊所设备采购', customer: '杭州连锁诊所', revenue: 420000, successRate: 85, type: '设备采购' }
    ]
  },
  {
    id: 5,
    name: '政府机关/事业单位',
    own: 580000,
    yoyGrowth: 8,
    peerAvg: 750000,  // 自己低于平均
    potential: 80,
    marketSize: 3200000,
    cases: [
      { id: 501, title: '政府机关办公楼改造', customer: '南京某机关', revenue: 650000, successRate: 87, type: '改造' },
      { id: 502, title: '事业单位设备采购', customer: '上海某事业单位', revenue: 450000, successRate: 84, type: '设备' }
    ]
  },
  {
    id: 6,
    name: '国央企业',
    own: 480000,
    yoyGrowth: 5,
    peerAvg: 680000,  // 自己低于平均
    potential: 75,
    marketSize: 2800000,
    cases: [
      { id: 601, title: '国企园区整体设备运维', customer: '杭州某国企', revenue: 720000, successRate: 89, type: '设备运维' }
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

// 销售工程师评估分析 - 协同交互
const mockEngineerAnalysis = [
  {
    id: 1,
    industryId: 1,
    industryName: 'K12(小中高)',
    engineerName: '张三',
    engineerRating: 'A级',
    analysisDate: '2026-02-01',
    status: '已提交',
    assessment: {
      marketOpportunity: 'K12市场需求旺盛，政策支持力度大，尤其是直饮水系统改造项目',
      strength: '我们在南京地区有丰富的学校资源，与多所中学建立了良好关系',
      weakness: '销售团队对K12行业的专业产品知识有待提升，需要加强培训',
      opportunities: '教育部要求2026年底前完成所有中小学直饮水系统改造，市场规模约5000万',
      risks: '竞争激烈，价格压力大，需要提升产品附加值和服务质量'
    },
    actionPlan: {
      shortTerm: '在2-3月份重点跟进5-8所中小学，预计签约2-3个项目，金额50-80万',
      mediumTerm: '加强销售团队培训，提升专业能力，开发3-5个新客户',
      longTerm: '建立K12行业标杆案例，扩大市场影响力'
    },
    feedback: '希望市场部提供K12行业政策解读和产品培训支持',
    dealerResponse: '已安排张经理进行专业培训，提供政策解读资料'
  },
  {
    id: 2,
    industryId: 3,
    industryName: '校园BOT',
    engineerName: '李四',
    engineerRating: 'B+级',
    analysisDate: '2026-01-28',
    status: '待反馈',
    assessment: {
      marketOpportunity: '高校BOT项目投资回报周期长，但收益稳定，适合长期发展',
      strength: '我们有3个成功的高校BOT案例，经验丰富',
      weakness: 'BOT项目前期投入大，资金压力大',
      opportunities: '多所高校有基础设施改造需求，BOT模式受欢迎',
      risks: '高校决策周期长，政策变化风险'
    },
    actionPlan: {
      shortTerm: '对接3-5所高校，争取1-2个项目立项',
      mediumTerm: '优化BOT投资模式，降低前期投入',
      longTerm: '建立校园BOT成功案例库，推广复制'
    },
    feedback: '希望财务部支持BOT项目融资方案',
    dealerResponse: null
  },
  {
    id: 3,
    industryId: 5,
    industryName: '政府机关/事业单位',
    engineerName: '王五',
    engineerRating: 'A级',
    analysisDate: '2026-01-25',
    status: '已确认',
    assessment: {
      marketOpportunity: '政府采购项目数量多，预算充足，但竞争激烈',
      strength: '我们在政府系统有良好的人脉资源',
      weakness: '招投标经验不足，需要提升',
      opportunities: '政府机关办公楼改造项目增多，市场机会好',
      risks: '招投标过程复杂，合规要求高'
    },
    actionPlan: {
      shortTerm: '关注政府采购公告，参与3-5个项目投标',
      mediumTerm: '加强招投标培训，提升中标率',
      longTerm: '建立政府采购成功案例，扩大政府客户群'
    },
    feedback: '希望法务部提供招投标合规指导',
    dealerResponse: '已安排法务专员提供指导，制定标准投标模板'
  }
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
  pendingFollowUps: 23,
  // 提醒数据
  expiringProjects: 3,
  untrackedProjects: 5,
  pendingOrders: 2,
  pendingProcesses: 4
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

// 业务指引/运营建议 - 基于行业分析的推荐（针对低于平均的行业，并结合销售工程师标签定向指引）
const mockGuidance = [
  {
    id: 1,
    type: 'risk',
    title: '⚠️ 看到问题：K12(小中高)行业低于平均',
    description: '您的K12行业业绩85万，同比+12%，低于同规模平均10个百分点。该行业还有较大提升空间，建议重点跟进。',
    action: '查看K12详情',
    nextAction: '联系5-8所中小学客户',
    expectedResult: '预计可提升至95万+',
    priority: 'high',
    engineerTags: ['K12', '教育', '学校'],
    executeAction: '系统自动推送K12行业潜在客户名单，生成跟进任务清单',
    detailAction: '跳转到K12行业分析页面，显示详细数据对比和成功案例'
  },
  {
    id: 2,
    type: 'risk',
    title: '⚠️ 看到问题：校园BOT行业低于平均',
    description: '您的校园BOT业绩72万，同比+10%，低于同规模平均15个百分点。校园BOT是高潜力领域，建议加强开发。',
    action: '查看校园BOT详情',
    nextAction: '对接3-5所高校的BOT项目',
    expectedResult: '预计可提升至85万+',
    priority: 'high',
    engineerTags: ['校园BOT', '高校', 'BOT'],
    executeAction: '生成校园BOT项目合作方案模板，自动匹配高校资源',
    detailAction: '查看校园BOT行业政策、成功案例和合作模式'
  },
  {
    id: 3,
    type: 'risk',
    title: '⚠️ 看到问题：政府机关/事业单位低于平均',
    description: '您的政府机关/事业单位业绩58万，同比+8%，低于同规模平均17个百分点。该行业有政府采购机会，建议重点跟进。',
    action: '查看政府机关详情',
    nextAction: '关注3-5个政府采购项目',
    expectedResult: '预计可提升至75万+',
    priority: 'high',
    engineerTags: ['政府', '事业单位', '采购'],
    executeAction: '订阅政府采购信息推送，获取相关项目招标信息',
    detailAction: '查看政府机关/事业单位的行业政策、采购流程和成功案例'
  },
  {
    id: 4,
    type: 'risk',
    title: '⚠️ 看到问题：国央企业行业低于平均',
    description: '您的国央企业业绩48万，同比+5%，低于同规模平均20个百分点。国央企业是大客户集中地，建议重点突破。',
    action: '查看国央企业详情',
    nextAction: '对接2-3家国央企业决策层',
    expectedResult: '预计可提升至68万+',
    priority: 'high',
    engineerTags: ['国央企业', '国企', '央企'],
    executeAction: '生成国央企业客户画像和接触策略，安排销售工程师对接',
    detailAction: '查看国央企业行业特点、决策流程和成功案例'
  },
  {
    id: 5,
    type: 'tip',
    title: '💡 经验建议：楼宇BOT保持优势',
    description: '您的楼宇BOT业绩120万，同比+28%，高于同规模平均33个百分点。建议继续巩固优势，推广成功案例。',
    action: '查看楼宇BOT详情',
    nextAction: '整理楼宇BOT成功案例并在同行中推广',
    expectedResult: '保持领先优势，新增20万+',
    priority: 'medium',
    engineerTags: ['楼宇BOT', '商业'],
    executeAction: '生成楼宇BOT成功案例集，用于市场推广和客户演示',
    detailAction: '查看楼宇BOT的详细数据、客户反馈和成功案例'
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
  const [expandedMenus, setExpandedMenus] = useState<MenuKey[]>([]);
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuKey | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<typeof mockMonthlyTasks[0] | null>(null);
  const [filterFeedbackPerson, setFilterFeedbackPerson] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('全部');
  const [filterPushTime, setFilterPushTime] = useState<string>('');
  const [executeDialogOpen, setExecuteDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedGuidance, setSelectedGuidance] = useState<typeof mockGuidance[0] | null>(null);

  // 行业分析标记状态
  const [advantageIndustries, setAdvantageIndustries] = useState<Set<number>>(new Set());
  const [potentialIndustries, setPotentialIndustries] = useState<Set<number>>(new Set());
  const [developmentDialogOpen, setDevelopmentDialogOpen] = useState(false);
  const [developmentIndustry, setDevelopmentIndustry] = useState<number | null>(null);
  const [developmentPlan, setDevelopmentPlan] = useState('');

  // 切换子菜单展开/收起
  const toggleMenuExpansion = (menuKey: MenuKey) => {
    setExpandedMenus(prev =>
      prev.includes(menuKey)
        ? prev.filter(k => k !== menuKey)
        : [...prev, menuKey]
    );
  };

  // 处理子菜单点击
  const handleSubMenuClick = (subMenuKey: SubMenuKey, parentMenuKey: MenuKey) => {
    setActiveSubMenu(subMenuKey);
    // 如果父菜单未展开，则展开它
    if (!expandedMenus.includes(parentMenuKey)) {
      setExpandedMenus([...expandedMenus, parentMenuKey]);
    }
  };

  // 处理立即执行按钮点击
  const handleExecuteClick = (guide: typeof mockGuidance[0]) => {
    setSelectedGuidance(guide);
    setExecuteDialogOpen(true);
  };

  // 处理查看详情按钮点击
  const handleDetailClick = (guide: typeof mockGuidance[0]) => {
    setSelectedGuidance(guide);
    setDetailDialogOpen(true);
  };

  // 切换优势行业标记
  const toggleAdvantageIndustry = (industryId: number) => {
    setAdvantageIndustries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(industryId)) {
        newSet.delete(industryId);
      } else {
        newSet.add(industryId);
      }
      return newSet;
    });
  };

  // 切换潜力行业标记
  const togglePotentialIndustry = (industryId: number) => {
    setPotentialIndustries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(industryId)) {
        newSet.delete(industryId);
      } else {
        newSet.add(industryId);
      }
      return newSet;
    });
  };

  // 打开发展思路对话框
  const openDevelopmentDialog = (industryId: number) => {
    setDevelopmentIndustry(industryId);
    setDevelopmentDialogOpen(true);
  };

  // 保存发展思路
  const saveDevelopmentPlan = () => {
    setDevelopmentDialogOpen(false);
    setDevelopmentIndustry(null);
    setDevelopmentPlan('');
  };

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

          {/* 快捷工具 */}
          <div className="p-4 border-b border-slate-700/50">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              快捷工具
            </div>
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
                    const hasSubmenu = 'hasSubmenu' in item && item.hasSubmenu;
                    const isExpanded = expandedMenus.includes(item.key);
                    const subItems = hasSubmenu ? (item as any).subItems : [];

                    return (
                      <div key={item.key}>
                        <button
                          onClick={() => {
                            if (hasSubmenu) {
                              toggleMenuExpansion(item.key);
                            }
                            setActiveMenu(item.key);
                          }}
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
                            {hasSubmenu ? (
                              <ChevronRight
                                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90 text-teal-400' : 'text-slate-400'}`}
                              />
                            ) : isActive ? (
                              <ChevronRight className="h-4 w-4 text-teal-400" />
                            ) : null}
                          </div>
                        </button>

                        {/* 子菜单 */}
                        {hasSubmenu && isExpanded && (
                          <div className="ml-4 mt-1 space-y-1">
                            {subItems.map((subItem: any) => {
                              const SubIcon = subItem.icon;
                              const isSubActive = activeSubMenu === subItem.key;
                              return (
                                <button
                                  key={subItem.key}
                                  onClick={() => handleSubMenuClick(subItem.key, item.key)}
                                  className={`w-full text-left px-3 py-2 rounded-lg transition-all text-xs ${
                                    isSubActive
                                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <SubIcon className={`h-3 w-3 ${isSubActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                                    <span className="font-medium">{subItem.label}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
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
          {/* 顶部工具栏 - 整合欢迎信息、消息提醒、用户信息 */}
          <header className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 flex-1">
                {/* 搜索框 */}
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="搜索项目、客户、产品..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-700 bg-slate-800 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* 欢迎信息 - 整合用户信息 */}
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Calendar className="h-4 w-4 text-teal-400" />
                  <span>今天是 {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400">{userInfo.company}（{userInfo.companyCode}）</span>
                  <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 font-bold text-xs px-2 py-0.5">
                    {userInfo.rating}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* 消息提醒铃铛 - 显示未读数量 */}
                <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white">
                  <Bell className="h-5 w-5" />
                  {mockKeyMetrics.unreadMessages > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-xs font-bold">
                      {mockKeyMetrics.unreadMessages}
                    </Badge>
                  )}
                </Button>

                <div className="h-8 w-px bg-slate-700"></div>

                {/* 用户信息 - 精简显示 */}
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {userInfo.avatar}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-white">{userInfo.name}</div>
                    <div className="text-xs text-slate-400">{userInfo.role}</div>
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
                {/* 关键指标仪表盘 + 关键提醒 */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* 关键指标仪表盘 - 缩小 */}
                      <div className="lg:col-span-3">
                        <Card className="border-2 border-teal-200 dark:border-teal-800 h-full">
                          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 py-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Activity className="h-4 w-4 text-teal-600" />
                                关键指标
                              </CardTitle>
                              <Button variant="outline" size="sm" className="text-xs">
                                查看经营驾驶舱
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              {/* 当月完成率 */}
                              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-300 dark:border-blue-700">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-xs font-bold text-blue-900 dark:text-blue-400">当月完成率</div>
                                  <Badge className="bg-blue-600 text-xs px-2 py-0.5">82%</Badge>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-700 dark:text-slate-400 font-medium">当月实际</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.monthActual / 10000}万</span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-700 dark:text-slate-400 font-medium">当月目标</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.monthTarget / 10000}万</span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs font-semibold">
                                    <span className="text-red-600 dark:text-red-400">缺口</span>
                                    <span className="text-xs font-bold text-red-600 dark:text-red-400">¥{(mockKeyMetrics.monthTarget - mockKeyMetrics.monthActual) / 10000}万</span>
                                  </div>
                                  <div className="mt-2">
                                    <Progress value={mockKeyMetrics.monthCompletion} className="h-1.5" />
                                  </div>
                                </div>
                              </div>

                              {/* 当月预测完成率 */}
                              <div className="p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-300 dark:border-green-700">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-xs font-bold text-green-900 dark:text-green-400">当月预测完成率</div>
                                  <Badge className="bg-green-600 text-xs px-2 py-0.5">96%</Badge>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-700 dark:text-slate-400 font-medium">预测额</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.monthForecast / 10000}万</span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-700 dark:text-slate-400 font-medium">当月目标</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.monthTarget / 10000}万</span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs font-semibold">
                                    <span className="text-red-600 dark:text-red-400">缺口</span>
                                    <span className="text-xs font-bold text-red-600 dark:text-red-400">¥{(mockKeyMetrics.monthTarget - mockKeyMetrics.monthForecast) / 10000}万</span>
                                  </div>
                                  <div className="mt-2">
                                    <Progress value={mockKeyMetrics.monthForecastCompletion} className="h-1.5" />
                                  </div>
                                </div>
                              </div>

                              {/* YTD实际完成率 */}
                              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-300 dark:border-purple-700">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-xs font-bold text-purple-900 dark:text-purple-400">YTD实际完成率</div>
                                  <Badge className="bg-purple-600 text-xs px-2 py-0.5">81%</Badge>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-700 dark:text-slate-400 font-medium">YTD实际</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.ytdActual / 10000}万</span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-700 dark:text-slate-400 font-medium">YTD目标</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">¥{mockKeyMetrics.ytdTarget / 10000}万</span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs font-semibold">
                                    <span className="text-red-600 dark:text-red-400">缺口</span>
                                    <span className="text-xs font-bold text-red-600 dark:text-red-400">¥{(mockKeyMetrics.ytdTarget - mockKeyMetrics.ytdActual) / 10000}万</span>
                                  </div>
                                  <div className="mt-2">
                                    <Progress value={mockKeyMetrics.ytdCompletion} className="h-1.5" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 1-12月度趋势图 */}
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">1-12月度趋势（实际完成/预测完成/目标对比）</div>
                                <div className="flex items-center gap-3 text-xs">
                                  <div className="flex items-center gap-1">
                                    <div className="w-8 h-0.5 bg-blue-500 rounded"></div>
                                    <span className="text-slate-600 dark:text-slate-400">实际完成</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <div className="w-8 h-0.5 bg-green-500 rounded"></div>
                                    <span className="text-slate-600 dark:text-slate-400">预测完成</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <div className="w-8 h-0.5 bg-purple-500 rounded border-dashed border-purple-500"></div>
                                    <span className="text-slate-600 dark:text-slate-400">目标</span>
                                  </div>
                                </div>
                              </div>
                              <div className="h-24 relative">
                                <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
                                  {/* 网格线 */}
                                  {[0, 25, 50, 75, 100].map((value, idx) => (
                                    <line
                                      key={idx}
                                      x1="0"
                                      y1={120 - (value / 100 * 120)}
                                      x2="600"
                                      y2={120 - (value / 100 * 120)}
                                      stroke="#e2e8f0"
                                      strokeWidth="1"
                                      strokeDasharray="4 4"
                                    />
                                  ))}
                                  
                                  {/* Y轴标签 */}
                                  {[0, 50, 100].map((value, idx) => (
                                    <text
                                      key={idx}
                                      x="5"
                                      y={120 - (value / 100 * 120) - 3}
                                      className="text-[10px] fill-slate-500 dark:fill-slate-400"
                                    >
                                      {value}
                                    </text>
                                  ))}

                                  {/* 目标线（虚线） - 略低于绿色预测线 */}
                                  <polyline
                                    points={`${50},${120 - 93} ${100},${120 - 96} ${150},${120 - 100} ${200},${120 - 103} ${250},${120 - 98} ${300},${120 - 93} ${350},${120 - 96} ${400},${120 - 100} ${450},${120 - 103} ${500},${120 - 98} ${550},${120 - 96} ${600},${120 - 93}`}
                                    fill="none"
                                    stroke="#a855f7"
                                    strokeWidth="2"
                                    strokeDasharray="6 4"
                                  />

                                  {/* 实际完成线（1月90，2月55，3-12月0） */}
                                  <polyline
                                    points={`${50},${120 - 90} ${100},${120 - 55} ${150},${120 - 0} ${200},${120 - 0} ${250},${120 - 0} ${300},${120 - 0} ${350},${120 - 0} ${400},${120 - 0} ${450},${120 - 0} ${500},${120 - 0} ${550},${120 - 0} ${600},${120 - 0}`}
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  {/* 预测完成线 */}
                                  <polyline
                                    points={`${50},${120 - 95} ${100},${120 - 98} ${150},${120 - 102} ${200},${120 - 105} ${250},${120 - 100} ${300},${120 - 95} ${350},${120 - 98} ${400},${120 - 102} ${450},${120 - 105} ${500},${120 - 100} ${550},${120 - 98} ${600},${120 - 95}`}
                                    fill="none"
                                    stroke="#22c55e"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  {/* 数据点 */}
                                  {/* 目标点 */}
                                  {[93, 96, 100, 103, 98, 93, 96, 100, 103, 98, 96, 93].map((y, idx) => (
                                    <g key={`target-${idx}`}>
                                      <circle
                                        cx={50 + idx * 50}
                                        cy={120 - y}
                                        r="3"
                                        fill="#a855f7"
                                        className="hover:r-4 transition-all cursor-pointer"
                                      />
                                      <title>{`${idx + 1}月目标: ¥${y}万`}</title>
                                    </g>
                                  ))}

                                  {/* 实际完成点 */}
                                  {[90, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((y, idx) => (
                                    <g key={`actual-${idx}`}>
                                      <circle
                                        cx={50 + idx * 50}
                                        cy={120 - y}
                                        r="3"
                                        fill="#3b82f6"
                                        className="hover:r-4 transition-all cursor-pointer"
                                      />
                                      <title>{`${idx + 1}月实际完成: ¥${y}万`}</title>
                                    </g>
                                  ))}

                                  {/* 预测完成点 */}
                                  {[95, 98, 102, 105, 100, 95, 98, 102, 105, 100, 98, 95].map((y, idx) => (
                                    <g key={`forecast-${idx}`}>
                                      <circle
                                        cx={50 + idx * 50}
                                        cy={120 - y}
                                        r="3"
                                        fill="#22c55e"
                                        className="hover:r-4 transition-all cursor-pointer"
                                      />
                                      <title>{`${idx + 1}月预测完成: ¥${y}万`}</title>
                                    </g>
                                  ))}
                                </svg>

                                {/* X轴标签 */}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                                    <span key={month} className="text-[10px] text-slate-500 dark:text-slate-400">
                                      {month}月
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* 关键提醒栏 */}
                      <div className="lg:col-span-1">
                        <Card className="border-2 border-orange-200 dark:border-orange-800 h-full">
                          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 py-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Bell className="h-4 w-4 text-orange-600" />
                              关键提醒
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="grid grid-cols-1 gap-3">
                              {/* 第一行：1个月内将到期项目 + 1个月内未跟进项目 */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">1个月内将到期项目</div>
                                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                                  </div>
                                  <div className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-2">{mockKeyMetrics.expiringProjects}个</div>
                                  <Button size="sm" className="w-full h-7 text-xs bg-orange-600 hover:bg-orange-700">
                                    申请延期
                                  </Button>
                                </div>
                                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">1个月内未跟进项目</div>
                                    <Clock className="h-4 w-4 text-orange-600" />
                                  </div>
                                  <div className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-2">{mockKeyMetrics.untrackedProjects}个</div>
                                  <Button size="sm" className="w-full h-7 text-xs bg-orange-600 hover:bg-orange-700">
                                    反馈跟进
                                  </Button>
                                </div>
                              </div>

                              {/* 第二行：待审订单 + 待审流程 */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">待审订单</div>
                                    <FileText className="h-4 w-4 text-orange-600" />
                                  </div>
                                  <div className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-2">{mockKeyMetrics.pendingOrders}个</div>
                                  <Button size="sm" className="w-full h-7 text-xs bg-orange-600 hover:bg-orange-700">
                                    查看审批
                                  </Button>
                                </div>
                                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">待审流程</div>
                                    <RefreshCw className="h-4 w-4 text-orange-600" />
                                  </div>
                                  <div className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-2">{mockKeyMetrics.pendingProcesses}个</div>
                                  <Button size="sm" className="w-full h-7 text-xs bg-orange-600 hover:bg-orange-700">
                                    查看流程
                                  </Button>
                                </div>
                              </div>

                              {/* 第三行：本月预测项目数/已下订单数 */}
                              <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">本月预测项目数/已下订单数</div>
                                  <Target className="h-4 w-4 text-orange-600" />
                                </div>
                                <div className="flex items-center gap-4 mb-2">
                                  <div className="flex-1">
                                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">预测项目数</div>
                                    <div className="text-lg font-bold text-orange-600 dark:text-orange-400">6个</div>
                                  </div>
                                  <div className="w-px h-8 bg-slate-300 dark:bg-slate-600"></div>
                                  <div className="flex-1">
                                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">已下订单数</div>
                                    <div className="text-lg font-bold text-orange-600 dark:text-orange-400">3个</div>
                                  </div>
                                </div>
                                <Button size="sm" className="w-full h-7 text-xs bg-orange-600 hover:bg-orange-700">
                                  查看预测项目
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* 行业分析 - 自己vs同规模经销商平均 */}
                    <Card className="border-2 border-purple-200 dark:border-purple-800">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 py-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base flex items-center gap-2">
                            <PieChart className="h-4 w-4 text-purple-600" />
                            行业分析 - 我的潜力与发展
                          </CardTitle>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-purple-500 rounded"></div>
                              <span className="text-slate-600 dark:text-slate-400">自己</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-blue-500 rounded"></div>
                              <span className="text-slate-600 dark:text-slate-400">同规模平均</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {mockIndustryTracks.map((industry) => {
                            const isAboveAverage = industry.own > industry.peerAvg;
                            const progressOwn = (industry.own / 2000000) * 100;
                            const progressPeer = (industry.peerAvg / 2000000) * 100;
                            const diffPercent = ((industry.own - industry.peerAvg) / industry.peerAvg * 100).toFixed(0);
                            const isPositive = parseFloat(diffPercent) > 0;
                            const isAdvantage = advantageIndustries.has(industry.id);
                            const isPotential = potentialIndustries.has(industry.id);
                            
                            return (
                              <div key={industry.id} className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-sm font-bold text-slate-900 dark:text-white">{industry.name}</div>
                                  <Badge className={`${isAboveAverage ? 'bg-purple-600' : 'bg-slate-600'} text-xs`}>
                                    {industry.yoyGrowth > 0 ? '+' : ''}{industry.yoyGrowth}%
                                  </Badge>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <div className="flex items-center justify-between text-xs mb-1">
                                      <span className="text-slate-600 dark:text-slate-400">自己</span>
                                      <span className="font-semibold text-purple-600">¥{(industry.own / 10000).toFixed(0)}万</span>
                                    </div>
                                    <Progress value={progressOwn} className="h-1.5" />
                                  </div>
                                  <div>
                                    <div className="flex items-center justify-between text-xs mb-1">
                                      <span className="text-slate-600 dark:text-slate-400">同规模平均</span>
                                      <span className="font-semibold text-blue-600">¥{(industry.peerAvg / 10000).toFixed(0)}万</span>
                                    </div>
                                    <Progress value={progressPeer} className="h-1.5" />
                                  </div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    同比增长 {industry.yoyGrowth > 0 ? '+' : ''}{industry.yoyGrowth}%，{isPositive ? '高于' : '低于'}平均 {Math.abs(parseFloat(diffPercent))}个百分点
                                  </div>
                                </div>
                                {/* 标记按钮 */}
                                <div className="flex gap-2 mt-3">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className={`flex-1 h-7 text-xs border-amber-300 hover:bg-amber-50 dark:border-amber-700 dark:hover:bg-amber-900/30 ${isAdvantage ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'text-amber-700 dark:text-amber-300'}`}
                                    onClick={() => toggleAdvantageIndustry(industry.id)}
                                  >
                                    <Star className={`mr-1 h-3 w-3 ${isAdvantage ? 'fill-current' : ''}`} />
                                    优势
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className={`flex-1 h-7 text-xs border-green-300 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/30 ${isPotential ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'text-green-700 dark:text-green-300'}`}
                                    onClick={() => togglePotentialIndustry(industry.id)}
                                  >
                                    <Target className={`mr-1 h-3 w-3 ${isPotential ? 'fill-current' : ''}`} />
                                    潜力
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 h-7 text-xs border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/30"
                                    onClick={() => openDevelopmentDialog(industry.id)}
                                  >
                                    <Lightbulb className="mr-1 h-3 w-3" />
                                    发展
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                  {/* 业务指引 - 基于行业分析的推荐 */}
                  <Card className="border-2 border-amber-200 dark:border-amber-800">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 py-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-600" />
                      业务指引 - 赋能经营增效
                    </CardTitle>
                    <CardDescription className="text-xs">
                      基于行业分析对比，为您提供个性化的业务建议和指导
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {mockGuidance.map((guide) => (
                        <div key={guide.id} className={`p-3 rounded-lg border-2 ${
                          guide.type === 'opportunity' ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' :
                          guide.type === 'risk' ? 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20' :
                          guide.type === 'tip' ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' :
                          'border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                        }`}>
                          {/* 1. 看到问题：标题和描述 */}
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 flex-1">
                              {guide.type === 'opportunity' && <Star className="h-4 w-4 text-green-600" />}
                              {guide.type === 'risk' && <ShieldAlert className="h-4 w-4 text-red-600" />}
                              {guide.type === 'tip' && <Lightbulb className="h-4 w-4 text-blue-600" />}
                              {guide.type === 'training' && <BookOpen className="h-4 w-4 text-purple-600" />}
                              <div className="font-semibold text-sm text-slate-900 dark:text-white flex-1">
                                {guide.title}
                              </div>
                            </div>
                            <Badge className={`ml-2 text-xs ${
                              guide.priority === 'high' ? 'bg-red-600' :
                              guide.priority === 'medium' ? 'bg-orange-600' :
                              'bg-slate-600'
                            }`}>
                              {guide.priority === 'high' ? '重要' : guide.priority === 'medium' ? '建议' : '可选'}
                            </Badge>
                          </div>
                          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                            {guide.description}
                          </div>

                          {/* 2. 明白要做什么：下一步行动 */}
                          <div className="bg-white/50 dark:bg-slate-800/50 rounded-md p-2 mb-2">
                            <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 mb-1">
                              <ArrowRight className="h-3 w-3" />
                              <span className="font-semibold">下一步：</span>
                            </div>
                            <div className="text-xs font-medium text-slate-900 dark:text-white">
                              {guide.nextAction}
                            </div>
                          </div>

                          {/* 3. 有结果反馈：预期效果 */}
                          <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mb-2">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>{guide.expectedResult}</span>
                          </div>

                          {/* 4. 一键执行：操作按钮 */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 h-8 text-xs bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                              onClick={() => handleExecuteClick(guide)}
                            >
                              立即执行
                              <ArrowRightIcon className="ml-1 h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => handleDetailClick(guide)}
                            >
                              查看详情
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

              </div>
            )}

            {/* 其他菜单占位符 */}
            {activeMenu !== 'home' && (
              <div className="flex-1 overflow-auto">
                {/* 项目开发 - 项目储备 */}
                {false && (
                  <div className="space-y-6">
                    {/* 页面标题 */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-4 text-white">
                      <h2 className="text-xl font-bold mb-1">项目开发</h2>
                      <p className="text-sm text-blue-100">项目储备与跟踪管理</p>
                    </div>

                    {/* 项目储备总览 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">项目储备总览</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-300 dark:border-blue-700">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-bold text-blue-900 dark:text-blue-400">储备项目总数</div>
                              <Database className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{mockProjectReserve.total}个</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              目标：{mockProjectReserve.target}个
                            </div>
                            <Progress value={mockProjectReserve.progress} className="h-2 mt-2" />
                          </div>

                          <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-300 dark:border-green-700">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-bold text-green-900 dark:text-green-400">3个月内即将签约</div>
                              <Target className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{mockProjectReserve.within3Months}个</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              预计金额：¥450万
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-300 dark:border-purple-700">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-bold text-purple-900 dark:text-purple-400">2-6个月内转化</div>
                              <TrendingUp className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{mockProjectReserve.months2To6}个</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              预计金额：¥680万
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-300 dark:border-orange-700">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-bold text-orange-900 dark:text-orange-400">6-12个月内转化</div>
                              <Calendar className="h-5 w-5 text-orange-600" />
                            </div>
                            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{mockProjectReserve.months6To12}个</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              预计金额：¥720万
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 行业赛道分布 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">项目储备 - 行业赛道分布</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockIndustryTracks.map((industry) => (
                            <div key={industry.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="text-sm font-bold text-slate-900 dark:text-white">{industry.name}</div>
                                  <Badge className="bg-purple-600 text-xs">{industry.potential}分</Badge>
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                  {industry.cases.length}个项目储备
                                </div>
                              </div>
                              <div className="space-y-2">
                                {industry.cases.map((project) => (
                                  <div key={project.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex-1">
                                        <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                                          {project.title}
                                        </div>
                                        <div className="text-xs text-slate-600 dark:text-slate-400">
                                          客户：{project.customer}
                                        </div>
                                      </div>
                                      <div className="text-right ml-4">
                                        <div className="text-sm font-bold text-green-600 dark:text-green-400">
                                          ¥{(project.revenue / 10000).toFixed(0)}万
                                        </div>
                                        <div className="text-xs text-slate-600 dark:text-slate-400">
                                          成功率：{project.successRate}%
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <Badge className="bg-blue-600 text-xs">{project.type}</Badge>
                                      <Button size="sm" className="h-6 text-xs">
                                        查看详情
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* 销售导航 */}
                {activeMenu === 'sales' && (
                  <div className="space-y-6">
                    {/* 页面标题 */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
                      <h2 className="text-xl font-bold mb-1">销售导航</h2>
                      <p className="text-sm text-purple-100">销售工具与资源</p>
                    </div>

                    {/* 快捷工具 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">快捷工具</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 transition-colors cursor-pointer">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center mb-3">
                              <Plus className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">项目报备</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">快速报备新项目</div>
                          </div>

                          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 transition-colors cursor-pointer">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mb-3">
                              <Activity className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">项目跟踪</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">跟踪项目进展</div>
                          </div>

                          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 transition-colors cursor-pointer">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-3">
                              <ShoppingCart className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">订单申请</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">提交订单申请</div>
                          </div>

                          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 transition-colors cursor-pointer">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mb-3">
                              <Headphones className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">服务申请</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">提交售后服务</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 行业资源库 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Building className="h-5 w-5 text-purple-600" />
                          行业资源库
                        </CardTitle>
                        <CardDescription className="text-xs">
                          针对不同行业的销售资源、案例和工具
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* K12行业 */}
                          <div className="p-4 rounded-lg border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                  <School className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-white">K12(小中高)</div>
                                  <div className="text-xs text-slate-600 dark:text-slate-400">15个案例 · 8套工具 · 5门课程</div>
                                </div>
                              </div>
                              <Badge className="bg-purple-600 text-xs">资源丰富</Badge>
                            </div>
                            <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                              查看K12资源
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>

                          {/* 楼宇BOT行业 */}
                          <div className="p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                  <Building2 className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-white">楼宇BOT</div>
                                  <div className="text-xs text-slate-600 dark:text-slate-400">12个案例 · 6套工具 · 3门课程</div>
                                </div>
                              </div>
                              <Badge className="bg-blue-600 text-xs">热门</Badge>
                            </div>
                            <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                              查看楼宇BOT资源
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>

                          {/* 校园BOT行业 */}
                          <div className="p-4 rounded-lg border-2 border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                  <GraduationCap className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-white">校园BOT</div>
                                  <div className="text-xs text-slate-600 dark:text-slate-400">8个案例 · 5套工具 · 4门课程</div>
                                </div>
                              </div>
                              <Badge className="bg-green-600 text-xs">高潜力</Badge>
                            </div>
                            <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                              查看校园BOT资源
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>

                          {/* 医疗系统行业 */}
                          <div className="p-4 rounded-lg border-2 border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                  <Stethoscope className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-white">医疗系统</div>
                                  <div className="text-xs text-slate-600 dark:text-slate-400">10个案例 · 7套工具 · 4门课程</div>
                                </div>
                              </div>
                              <Badge className="bg-red-600 text-xs">稳定增长</Badge>
                            </div>
                            <Button size="sm" className="w-full mt-3 bg-red-600 hover:bg-red-700">
                              查看医疗系统资源
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>

                          {/* 政府机关/事业单位 */}
                          <div className="p-4 rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                                  <Building className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-white">政府机关/事业单位</div>
                                  <div className="text-xs text-slate-600 dark:text-slate-400">6个案例 · 4套工具 · 3门课程</div>
                                </div>
                              </div>
                              <Badge className="bg-amber-600 text-xs">机会多</Badge>
                            </div>
                            <Button size="sm" className="w-full mt-3 bg-amber-600 hover:bg-amber-700">
                              查看政府机关资源
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>

                          {/* 国央企业 */}
                          <div className="p-4 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center">
                                  <Briefcase className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-white">国央企业</div>
                                  <div className="text-xs text-slate-600 dark:text-slate-400">5个案例 · 3套工具 · 2门课程</div>
                                </div>
                              </div>
                              <Badge className="bg-slate-600 text-xs">大客户</Badge>
                            </div>
                            <Button size="sm" className="w-full mt-3 bg-slate-600 hover:bg-slate-700">
                              查看国央企业资源
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* 运营指南 */}
                {activeMenu === 'guide' && (
                  <div className="space-y-6">
                    {/* 页面标题 */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-4 text-white">
                      <h2 className="text-xl font-bold mb-1">运营指南</h2>
                      <p className="text-sm text-indigo-100">政策、案例与培训</p>
                    </div>

                    {/* 最佳实践 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Star className="h-5 w-5 text-amber-500" />
                          最佳实践
                        </CardTitle>
                        <CardDescription className="text-xs">
                          行业领先者的成功经验和最佳实践
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white">K12行业销售策略</div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">教育机构客户开发指南</div>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                              如何快速切入K12市场，掌握学校采购流程，提高签约成功率
                            </p>
                            <Button size="sm" variant="outline" className="w-full text-xs">
                              查看详情
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>

                          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white">楼宇BOT运营模式</div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">BOT项目全流程管理</div>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                              BOT项目的投资、建设、运营全流程管理，降低风险提高收益
                            </p>
                            <Button size="sm" variant="outline" className="w-full text-xs">
                              查看详情
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>

                          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                                <GraduationCap className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white">校园BOT项目开发</div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">高校BOT项目实战经验</div>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                              高校BOT项目的特点、难点和解决方案，成功案例分享
                            </p>
                            <Button size="sm" variant="outline" className="w-full text-xs">
                              查看详情
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>

                          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <Stethoscope className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white">医疗系统准入策略</div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">医疗机构市场开发</div>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                              医疗系统的准入要求、合规流程和客户关系维护
                            </p>
                            <Button size="sm" variant="outline" className="w-full text-xs">
                              查看详情
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>

                          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
                                <Building className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white">政府采购项目投标</div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">政府采购流程详解</div>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                              政府采购项目的投标技巧、标书制作和注意事项
                            </p>
                            <Button size="sm" variant="outline" className="w-full text-xs">
                              查看详情
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>

                          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-gray-500 rounded-lg flex items-center justify-center">
                                <Briefcase className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white">国央企业大客户开发</div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">国央企业销售策略</div>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                              国央企业的组织架构、决策流程和客户关系管理
                            </p>
                            <Button size="sm" variant="outline" className="w-full text-xs">
                              查看详情
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 培训课程 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-indigo-600" />
                          培训课程
                        </CardTitle>
                        <CardDescription className="text-xs">
                          系统化的培训课程，提升销售技能和行业知识
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 transition-colors">
                            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center">
                              <School className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900 dark:text-white mb-1">K12行业销售实战</div>
                              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">掌握K12行业的客户特点和销售技巧</div>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-teal-600 text-xs">8节课</Badge>
                                <Badge variant="outline" className="text-xs">初级</Badge>
                              </div>
                            </div>
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                              开始学习
                            </Button>
                          </div>

                          <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                              <Building2 className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900 dark:text-white mb-1">BOT项目运营管理</div>
                              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">BOT项目的全生命周期管理</div>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-blue-600 text-xs">12节课</Badge>
                                <Badge variant="outline" className="text-xs">中级</Badge>
                              </div>
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              开始学习
                            </Button>
                          </div>

                          <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                              <Award className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900 dark:text-white mb-1">大客户关系管理</div>
                              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">国央企业和政府客户关系维护</div>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-purple-600 text-xs">10节课</Badge>
                                <Badge variant="outline" className="text-xs">高级</Badge>
                              </div>
                            </div>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              开始学习
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* 节点推进 - 销售漏斗和项目周期管理 */}
                {false && (
                  <div className="space-y-6">
                    {/* 页面标题 */}
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-4 text-white">
                      <h2 className="text-xl font-bold mb-1">节点推进</h2>
                      <p className="text-sm text-teal-100">销售漏斗与项目周期管理</p>
                    </div>

                    {/* 销售漏斗 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <GitBranch className="h-5 w-5 text-teal-600" />
                          销售漏斗
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockSalesFunnel.map((stage, idx) => (
                            <div key={stage.stage} className="relative">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                                  {stage.stage}
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="text-slate-600 dark:text-slate-400">{stage.count}个</span>
                                  <span className="text-teal-600 dark:text-teal-400 font-semibold">
                                    转化率 {stage.conversion}%
                                  </span>
                                </div>
                              </div>
                              <Progress value={stage.conversion} className="h-3" />
                              {idx < mockSalesFunnel.length - 1 && (
                                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                  <ArrowDown className="h-4 w-4 text-slate-400" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* 项目周期管理 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Activity className="h-5 w-5 text-cyan-600" />
                          项目周期管理（10个阶段）
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mockProjectCycle.map((stage, idx) => (
                            <div key={stage.stage} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge className={`${stage.progress === 100 ? 'bg-green-600' : 'bg-blue-600'} text-xs`}>
                                    阶段{idx + 1}
                                  </Badge>
                                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {stage.stage}
                                  </div>
                                </div>
                                <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                                  {stage.count}个
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-slate-600 dark:text-slate-400">平均周期</span>
                                  <span className="text-slate-900 dark:text-white font-medium">{stage.avgDays}天</span>
                                </div>
                                <Progress value={stage.progress} className="h-2" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* 租赁业务子菜单 */}
                {activeMenu === 'lease' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white">
                      <h2 className="text-xl font-bold mb-1">租赁业务</h2>
                      <p className="text-sm text-amber-100">设备租赁业务管理</p>
                    </div>

                    {activeSubMenu === 'leaseApply' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Plus className="h-5 w-5 text-amber-600" />
                            租赁机申请
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <Plus className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>租赁机申请功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeSubMenu === 'cardApplyRecord' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-amber-600" />
                            卡申请记录
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <CreditCard className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>卡申请记录功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeSubMenu === 'renewLease' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <RefreshIcon className="h-5 w-5 text-amber-600" />
                            续租申请
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <RefreshIcon className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>续租申请功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeSubMenu === 'leaseToSale' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <ArrowRightLeft className="h-5 w-5 text-amber-600" />
                            租转售申请
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <ArrowRightLeft className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>租转售申请功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeSubMenu === 'delayRecord' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Clock className="h-5 w-5 text-amber-600" />
                            延期记录
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <Clock className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>延期记录功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {!activeSubMenu && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">请选择功能</CardTitle>
                          <CardDescription>选择左侧菜单中的子功能进行操作</CardDescription>
                        </CardHeader>
                      </Card>
                    )}
                  </div>
                )}

                {/* 销售业务子菜单 */}
                {activeMenu === 'sales' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
                      <h2 className="text-xl font-bold mb-1">销售业务</h2>
                      <p className="text-sm text-green-100">设备销售业务管理</p>
                    </div>

                    {activeSubMenu === 'buyApply' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Plus className="h-5 w-5 text-green-600" />
                            购机申请
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <Plus className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>购机申请功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeSubMenu === 'buyRecord' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <FileCheck className="h-5 w-5 text-green-600" />
                            购机记录
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <FileCheck className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>购机记录功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeSubMenu === 'maintenance' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Wrench className="h-5 w-5 text-green-600" />
                            维保档案
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <Wrench className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>维保档案功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeSubMenu === 'installApply' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Truck className="h-5 w-5 text-green-600" />
                            安装申请
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <Truck className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>安装申请功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeSubMenu === 'materials' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Image className="h-5 w-5 text-green-600" />
                            宣传物料
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <Image className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>宣传物料功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {!activeSubMenu && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">请选择功能</CardTitle>
                          <CardDescription>选择左侧菜单中的子功能进行操作</CardDescription>
                        </CardHeader>
                      </Card>
                    )}
                  </div>
                )}

                {/* 售后管理子菜单 */}
                {activeMenu === 'afterSales' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-4 text-white">
                      <h2 className="text-xl font-bold mb-1">售后管理</h2>
                      <p className="text-sm text-blue-100">售后服务管理</p>
                    </div>

                    {activeSubMenu === 'moveApply' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Move className="h-5 w-5 text-blue-600" />
                            移机申请
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <Move className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>移机申请功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeSubMenu === 'returnApply' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <XCircle className="h-5 w-5 text-blue-600" />
                            退机申请
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <XCircle className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>退机申请功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeSubMenu === 'returnRecord' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <FileTextIcon className="h-5 w-5 text-blue-600" />
                            退货记录
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <FileTextIcon className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>退货记录功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeSubMenu === 'disassembleRecord' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Hammer className="h-5 w-5 text-blue-600" />
                            拆机记录
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-slate-500">
                            <Hammer className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                            <p>拆机记录功能开发中...</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {!activeSubMenu && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">请选择功能</CardTitle>
                          <CardDescription>选择左侧菜单中的子功能进行操作</CardDescription>
                        </CardHeader>
                      </Card>
                    )}
                  </div>
                )}

                {/* 其他菜单 - 默认占位符 */}
                {(activeMenu as string) !== 'home' && activeMenu !== 'lease' && activeMenu !== 'sales' && activeMenu !== 'afterSales' && (
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
            )}

            {/* 立即执行对话框 */}
            {executeDialogOpen && selectedGuidance && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                  {/* 对话框头部 */}
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap className="h-6 w-6 text-white" />
                        <h3 className="text-lg font-bold text-white">立即执行</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExecuteDialogOpen(false)}
                        className="text-white hover:bg-white/20"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* 对话框内容 */}
                  <div className="p-6 space-y-6">
                    {/* 问题说明 */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">看到问题</h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{selectedGuidance.title}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{selectedGuidance.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* 下一步行动 */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">明白要做什么</h4>
                          <p className="text-sm text-slate-900 dark:text-white font-medium">{selectedGuidance.nextAction}</p>
                        </div>
                      </div>
                    </div>

                    {/* 后台逻辑说明 */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Cpu className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">后台自动执行</h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{selectedGuidance.executeAction}</p>
                          <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                              <span className="font-semibold">行业经验：</span>基于CRM数据和AI算法，自动匹配最适合的客户和策略，提高效率
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              <span className="font-semibold">销售工程师标签：</span>{selectedGuidance.engineerTags.join('、')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 预期效果 */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">有结果反馈</h4>
                          <p className="text-sm text-green-700 dark:text-green-400 font-medium">{selectedGuidance.expectedResult}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 对话框底部 */}
                  <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-b-2xl">
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                        onClick={() => {
                          // 模拟执行操作
                          alert('系统已自动执行：' + selectedGuidance.executeAction);
                          setExecuteDialogOpen(false);
                        }}
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        确认执行
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setExecuteDialogOpen(false)}
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 查看详情对话框 */}
            {detailDialogOpen && selectedGuidance && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                  {/* 对话框头部 */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-white" />
                        <h3 className="text-lg font-bold text-white">行业详情</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDetailDialogOpen(false)}
                        className="text-white hover:bg-white/20"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* 对话框内容 */}
                  <div className="p-6 space-y-6">
                    {/* 问题说明 */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">看到问题</h4>
                          <p className="text-sm text-slate-900 dark:text-white font-bold">{selectedGuidance.title.replace('⚠️ 看到问题：', '').replace('💡 经验建议：', '')}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{selectedGuidance.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* 行业数据对比 */}
                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        行业数据对比
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
                          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">自己的业绩</div>
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">¥85万</div>
                          <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">同比增长 +12%</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4">
                          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">同规模平均</div>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">¥95万</div>
                          <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">低于平均 10个百分点</div>
                        </div>
                      </div>
                    </div>

                    {/* 成功案例 */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-green-600" />
                        成功案例
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-slate-900 dark:text-white">某中学直饮水系统改造</div>
                              <div className="text-xs text-slate-600 dark:text-slate-400">客户：南京某中学</div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-sm font-bold text-green-600 dark:text-green-400">¥65万</div>
                              <div className="text-xs text-slate-600 dark:text-slate-400">成功率 95%</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-slate-900 dark:text-white">小学实验室设备采购</div>
                              <div className="text-xs text-slate-600 dark:text-slate-400">客户：上海某小学</div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-sm font-bold text-green-600 dark:text-green-400">¥38万</div>
                              <div className="text-xs text-slate-600 dark:text-slate-400">成功率 90%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 行业政策 */}
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Newspaper className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">行业政策</h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                            教育部《关于推进中小学直饮水系统改造的通知》要求，2026年底前完成所有中小学直饮水系统改造工作，市场规模约5000万元。
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">政策支持：</span>政府补贴、专项基金、税收优惠
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 行业特点 */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">行业特点</h4>
                          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>决策周期长，通常需要3-6个月</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>价格敏感度中等，更关注质量和安全性</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>学校寒暑假是最佳推进时间</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>教育局和政府采购是主要渠道</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* 客户画像 */}
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-2 border-cyan-200 dark:border-cyan-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-cyan-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">客户画像</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">关键决策人</div>
                              <div className="text-slate-900 dark:text-white font-medium">校长、后勤主任、财务主任</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">采购流程</div>
                              <div className="text-slate-900 dark:text-white font-medium">教育局审批 → 招投标 → 签约</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">预算规模</div>
                              <div className="text-slate-900 dark:text-white font-medium">20万-100万</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">付款方式</div>
                              <div className="text-slate-900 dark:text-white font-medium">分期付款，验收后付尾款</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 对话框底部 */}
                  <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-b-2xl">
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                        onClick={() => {
                          // 跳转到详情页面
                          alert('跳转到' + selectedGuidance.title + '详情页面');
                          setDetailDialogOpen(false);
                        }}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        查看完整报告
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setDetailDialogOpen(false)}
                      >
                        关闭
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 发展思路对话框 */}
            {developmentDialogOpen && developmentIndustry !== null && (
              <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-[500px] max-w-[90vw] max-h-[90vh] overflow-auto">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-t-xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">填写发展思路</h3>
                      <button
                        onClick={() => setDevelopmentDialogOpen(false)}
                        className="text-white hover:text-slate-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                        行业
                      </label>
                      <div className="text-sm text-slate-700 dark:text-slate-300">
                        {mockIndustryTracks.find(i => i.id === developmentIndustry)?.name}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                        发展思路
                      </label>
                      <Textarea
                        placeholder="请填写您对该行业的发展思路和计划..."
                        value={developmentPlan}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDevelopmentPlan(e.target.value)}
                        rows={6}
                        className="w-full"
                      />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setDevelopmentDialogOpen(false)}
                      >
                        取消
                      </Button>
                      <Button
                        onClick={saveDevelopmentPlan}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        保存
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
