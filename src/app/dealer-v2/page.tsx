'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  ArrowLeft,
  Target,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Clock,
  Star,
  Flame,
  Activity,
  ChevronRight,
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
  ShieldAlert,
  Lightbulb,
  Calendar,
  ArrowRight
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

// ==================== 用户信息 ====================

const userInfo = {
  name: '季晓东',
  company: '南京雪濠洋环保科技有限公司',
  companyCode: 'ZLX0008',
  avatar: 'J',
  role: '总经理'
};

// ==================== 首页关键指标 ====================

const mockKeyMetrics = {
  totalRevenue: 5800000,
  yoyGrowth: 18,
  activeProjects: 50,
  conversionRate: 32,
  thisMonthRevenue: 980000,
  pendingTasks: 15,
  monthlyForecast: 6,
  unreadMessages: 3
};

// 消息提醒
const mockMessages = [
  {
    id: 1,
    type: 'warning',
    title: '项目即将到期提醒',
    content: '南京智能制造科技项目合同将于30天后到期，请及时跟进续约事宜',
    time: '2025-01-28 09:30',
    priority: 'high'
  },
  {
    id: 2,
    type: 'info',
    title: '新产品发布通知',
    content: 'AR75-MAX系列产品已正式发布，利润率高达35%，欢迎了解详情',
    time: '2025-01-28 08:15',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'success',
    title: '订单审批通过',
    content: '上海智慧园区科技采购订单已审批通过，金额120万元',
    time: '2025-01-27 16:45',
    priority: 'low'
  }
];

// 待办事项
const mockTodos = [
  {
    id: 1,
    title: '提交项目报备',
    description: '北京某医院水处理项目需要完成报备手续',
    deadline: '2025-01-30',
    priority: 'high'
  },
  {
    id: 2,
    title: '跟进客户谈判',
    description: '深圳金融中心安防项目进入最终谈判阶段',
    deadline: '2025-01-31',
    priority: 'high'
  },
  {
    id: 3,
    title: '准备技术方案',
    description: '杭州产业园区项目需要补充技术方案',
    deadline: '2025-02-02',
    priority: 'medium'
  },
  {
    id: 4,
    title: '完成月度预测反馈',
    description: '6个预测事项需要完成反馈',
    deadline: '2025-01-31',
    priority: 'medium'
  },
  {
    id: 5,
    title: '参加产品培训',
    description: '新产品AR75-MAX线上培训',
    deadline: '2025-02-05',
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

export default function DealerPortalV2() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('home');

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

          {/* 用户信息 */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {userInfo.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-slate-300 mb-1">欢迎您</div>
                <div className="font-semibold text-white text-sm">{userInfo.name}</div>
                <div className="text-xs text-slate-400 truncate mt-1">{userInfo.company}</div>
                <div className="text-xs text-slate-500 mt-0.5">（{userInfo.companyCode}）</div>
              </div>
            </div>
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
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        欢迎回来，{userInfo.name}！
                      </h2>
                      <p className="text-teal-100">
                        今天是 {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">¥{(mockKeyMetrics.totalRevenue / 10000).toFixed(0)}万</div>
                      <div className="text-sm text-teal-100">年度累计营收</div>
                    </div>
                  </div>
                </div>

                {/* 关键指标卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-600 dark:text-slate-400">活跃项目</div>
                        <Database className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{mockKeyMetrics.activeProjects}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        本月新增 8 个
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-600 dark:text-slate-400">转化率</div>
                        <TrendingUpIcon className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{mockKeyMetrics.conversionRate}%</div>
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                        同比提升 5%
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-600 dark:text-slate-400">本月营收</div>
                        <DollarSign className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        ¥{(mockKeyMetrics.thisMonthRevenue / 10000).toFixed(0)}万
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                        同比增长 {mockKeyMetrics.yoyGrowth}%
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-600 dark:text-slate-400">预测事项</div>
                        <Calendar className="h-4 w-4 text-orange-500" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{mockKeyMetrics.monthlyForecast}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        待反馈 2 个
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 主要功能区域 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* 左侧：消息提醒 + 待办事项 */}
                  <div className="lg:col-span-1 space-y-6">
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

                  {/* 右侧：业务指引 */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          业务指引 - 赋能经营增效
                        </CardTitle>
                        <CardDescription>
                          基于您的经营数据，为您提供个性化的业务建议和指导
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockGuidance.map((guide) => (
                            <div key={guide.id} className={`p-4 rounded-lg border ${
                              guide.type === 'opportunity' ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' :
                              guide.type === 'risk' ? 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20' :
                              guide.type === 'tip' ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' :
                              'border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                            }`}>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {guide.type === 'opportunity' && <Star className="h-5 w-5 text-green-600" />}
                                  {guide.type === 'risk' && <ShieldAlert className="h-5 w-5 text-red-600" />}
                                  {guide.type === 'tip' && <Lightbulb className="h-5 w-5 text-blue-600" />}
                                  {guide.type === 'training' && <BookOpen className="h-5 w-5 text-purple-600" />}
                                  <div className="font-semibold text-slate-900 dark:text-white">
                                    {guide.title}
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" className="text-xs">
                                  {guide.action}
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                              </div>
                              <div className="text-sm text-slate-700 dark:text-slate-300">
                                {guide.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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
