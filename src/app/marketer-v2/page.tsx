'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Hammer,
  LogOut,
  Handshake,
  Map,
  UserCheck,
  Megaphone,
  ChartPie,
  TrendingUp as TrendingUp2
} from 'lucide-react';

// ==================== 菜单配置 ====================

type MenuKey = 'home' | 'cockpit' | 'customerManage' | 'projectFollow' | 'orderManage' | 'supportService';
type SubMenuKey = 'customerAdd' | 'customerList' | 'customerAnalysis' |
                   'projectReport' | 'projectTrack' |
                   'orderCreate' | 'orderList' | 'orderTrack' |
                   'materialApply' | 'materialRecord' | 'techSupport';

const menuSections = [
  {
    items: [
      { key: 'home' as MenuKey, icon: Home, label: '首页', description: '工作总览与待办' }
    ]
  },
  {
    title: '经营驾驶舱',
    items: [
      { key: 'cockpit' as MenuKey, icon: BarChart3, label: '经营驾驶舱', description: '发现问题与寻找方法' }
    ]
  },
  {
    title: '客户管理',
    items: [
      {
        key: 'customerManage' as MenuKey,
        icon: Users,
        label: '客户管理',
        description: '客户关系管理',
        hasSubmenu: true,
        subItems: [
          { key: 'customerAdd' as SubMenuKey, icon: Plus, label: '新增客户', description: '创建新客户' },
          { key: 'customerList' as SubMenuKey, icon: List, label: '客户列表', description: '查看所有客户' },
          { key: 'customerAnalysis' as SubMenuKey, icon: ChartPie, label: '客户分析', description: '客户数据分析' }
        ]
      }
    ]
  },
  {
    title: '项目跟进',
    items: [
      {
        key: 'projectFollow' as MenuKey,
        icon: FolderKanban,
        label: '项目跟进',
        description: '项目管理与跟踪',
        hasSubmenu: true,
        subItems: [
          { key: 'projectReport' as SubMenuKey, icon: Plus, label: '项目报备', description: '新建项目报备' },
          { key: 'projectTrack' as SubMenuKey, icon: Activity, label: '项目跟踪', description: '跟踪项目进度' }
        ]
      }
    ]
  },
  {
    title: '订单管理',
    items: [
      {
        key: 'orderManage' as MenuKey,
        icon: ShoppingCart,
        label: '订单管理',
        description: '订单处理与管理',
        hasSubmenu: true,
        subItems: [
          { key: 'orderCreate' as SubMenuKey, icon: Plus, label: '创建订单', description: '创建新订单' },
          { key: 'orderList' as SubMenuKey, icon: FileCheck, label: '订单列表', description: '查看所有订单' },
          { key: 'orderTrack' as SubMenuKey, icon: RefreshCw, label: '订单跟踪', description: '跟踪订单状态' }
        ]
      }
    ]
  },
  {
    title: '支持服务',
    items: [
      {
        key: 'supportService' as MenuKey,
        icon: Headphones,
        label: '支持服务',
        description: '技术支持与服务',
        hasSubmenu: true,
        subItems: [
          { key: 'materialApply' as SubMenuKey, icon: Image, label: '物料申请', description: '申请宣传物料' },
          { key: 'materialRecord' as SubMenuKey, icon: Package, label: '物料记录', description: '查看物料记录' },
          { key: 'techSupport' as SubMenuKey, icon: Wrench, label: '技术支持', description: '获取技术支持' }
        ]
      }
    ]
  }
];

// 展平菜单项，方便遍历
const menuItems = menuSections.flatMap(section => section.items);

// ==================== 用户信息 ====================

const userInfo = {
  name: '吴晓波',
  department: '市场营销部',
  employeeCode: 'MKR0018',
  avatar: 'W',
  role: '营销经理',
  rating: 'S'
};

// ==================== 关键指标数据 ====================

const mockKeyMetrics = {
  unreadMessages: 5,
  totalCustomers: 128,
  activeProjects: 45,
  pendingOrders: 12,
  monthSales: 850000,
  monthTarget: 1000000,
  quarterSales: 2800000,
  quarterTarget: 3000000,
  yearSales: 15000000,
  yearTarget: 12000000
};

// ==================== 消息提醒数据 ====================

const mockMessages = [
  {
    id: 1,
    title: '新客户待跟进',
    content: '收到3个新客户咨询，请及时跟进',
    time: '10分钟前',
    priority: 'high'
  },
  {
    id: 2,
    title: '订单审核提醒',
    content: '您有2个订单等待审核',
    time: '1小时前',
    priority: 'medium'
  },
  {
    id: 3,
    title: '产品培训通知',
    content: '新产品培训将于明天下午2点开始',
    time: '3小时前',
    priority: 'normal'
  }
];

// ==================== 关键待办数据 ====================

const mockKeyTodos = [
  {
    title: '待跟进客户',
    count: 8,
    icon: Users,
    color: 'blue'
  },
  {
    title: '待审批订单',
    count: 5,
    icon: ShoppingCart,
    color: 'green'
  },
  {
    title: '待回复消息',
    count: 12,
    icon: MessageSquare,
    color: 'orange'
  },
  {
    title: '待安排拜访',
    count: 3,
    icon: MapPin,
    color: 'purple'
  }
];

// ==================== 销售趋势数据 ====================

const mockSalesTrend = [
  { month: '1月', sales: 1200000, target: 1000000 },
  { month: '2月', sales: 980000, target: 1000000 },
  { month: '3月', sales: 1150000, target: 1000000 },
  { month: '4月', sales: 1320000, target: 1000000 },
  { month: '5月', sales: 1450000, target: 1000000 },
  { month: '6月', sales: 1680000, target: 1000000 }
];

// ==================== 主组件 ====================

export default function MarketerPortalPage() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('home');
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuKey | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<Set<MenuKey>>(new Set());
  const [timePeriod, setTimePeriod] = useState<'month' | 'quarter' | 'year'>('month');

  // 切换菜单展开状态
  const toggleMenu = (key: MenuKey) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 左侧导航栏 */}
      <aside className="w-64 bg-gradient-to-b from-blue-50 to-cyan-50 flex flex-col border-r border-slate-200">
        {/* Logo/标题 */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">商擎平台</h1>
              <p className="text-xs text-slate-500">营销人员门户</p>
            </div>
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 px-4 py-4 space-y-6 overflow-auto">
          {menuSections.map((section) => (
            <div key={section.title}>
              {section.title && (
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
                  {section.title}
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isSubActive = activeSubMenu !== null;
                  const Icon = item.icon;
                  return (
                    <div key={item.key}>
                      <button
                        onClick={() => {
                          if (item.hasSubmenu) {
                            toggleMenu(item.key);
                          } else {
                            setActiveMenu(item.key);
                            setActiveSubMenu(null);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                          activeMenu === item.key && !item.hasSubmenu
                            ? 'bg-white text-blue-700 shadow-md'
                            : 'text-slate-700 hover:bg-white hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-5 w-5 ${isSubActive ? 'text-blue-600' : 'text-slate-500'}`} />
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{item.label}</span>
                            <span className="text-[10px] text-slate-500">{item.description}</span>
                          </div>
                        </div>
                        {item.hasSubmenu && (
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${
                              expandedMenus.has(item.key) ? 'rotate-90' : ''
                            }`}
                          />
                        )}
                      </button>

                      {/* 子菜单 */}
                      {item.hasSubmenu && expandedMenus.has(item.key) && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.subItems?.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <button
                                key={subItem.key}
                                onClick={() => {
                                  setActiveSubMenu(subItem.key);
                                  setActiveMenu(item.key);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                                  activeSubMenu === subItem.key
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                <SubIcon className={`h-3.5 w-3.5 ${isSubActive ? 'text-blue-600' : 'text-slate-500'}`} />
                                <span className="text-xs font-medium">{subItem.label}</span>
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
        {/* 顶部工具栏 */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              {/* 欢迎信息 */}
              <div className="flex items-center gap-3 text-slate-700 text-base">
                <span className="font-semibold text-base">你好，{userInfo.name}，今天是您来AO公司的<span className="text-blue-700 font-bold text-lg">1880</span>天！</span>
                <Badge className="bg-blue-100 text-blue-800 font-bold text-sm px-3 py-1">
                  评级 {userInfo.rating}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* 消息提醒铃铛 */}
              <Button variant="ghost" size="sm" className="relative text-slate-700 hover:text-blue-900">
                <Bell className="h-5 w-5" />
                {mockKeyMetrics.unreadMessages > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-xs font-bold">
                    {mockKeyMetrics.unreadMessages}
                  </Badge>
                )}
              </Button>
              {/* 退出登录按钮 */}
              <Button variant="ghost" size="sm" className="text-slate-700 hover:text-blue-900">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* 内容滚动区 */}
        <div className="flex-1 overflow-auto p-5">
          {/* 首页内容 */}
          {activeMenu === 'home' && (
            <div className="space-y-4">
              {/* 关键指标仪表盘 */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                <Card className="border border-slate-200">
                  <CardHeader className="bg-white py-1.5 px-3 flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Activity className="h-4 w-4 text-slate-600" />
                      关键指标
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2 pb-2.5">
                    {/* 渐变定义 */}
                    <svg className="hidden">
                      <defs>
                        <linearGradient id="actualGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                        <linearGradient id="predictGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#4ade80" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="grid grid-cols-2 gap-3">
                      {/* 实际完成仪表盘 */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-28 h-16">
                          <svg viewBox="0 0 112 56" className="w-full h-full">
                            <path
                              d="M 10 56 A 46 46 0 0 1 102 56"
                              fill="none"
                              stroke="#e2e8f0"
                              strokeWidth="12"
                              strokeLinecap="round"
                            />
                            <path
                              d="M 10 56 A 46 46 0 0 1 98 18"
                              fill="none"
                              stroke="url(#actualGradient)"
                              strokeWidth="12"
                              strokeLinecap="round"
                            />
                            <line
                              x1="56"
                              y1="56"
                              x2="94"
                              y2="44"
                              stroke="#1e293b"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <circle
                              cx="56"
                              cy="56"
                              r="4"
                              fill="#1e293b"
                            />
                          </svg>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                            <div className="text-2xl font-bold text-blue-600">85%</div>
                          </div>
                        </div>
                        <div className="mt-2 text-center">
                          <div className="text-xs font-semibold text-slate-700 mb-1">实际完成</div>
                          <div className="text-[10px] text-slate-600 mb-0.5">销售金额</div>
                          <div className="text-sm font-bold text-slate-900">85万</div>
                          <div className="text-[10px] text-slate-600 mb-0.5 mt-1">目标金额</div>
                          <div className="text-sm font-bold text-slate-900">100万</div>
                        </div>
                      </div>

                      {/* 预测完成仪表盘 */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-28 h-16">
                          <svg viewBox="0 0 112 56" className="w-full h-full">
                            <path
                              d="M 10 56 A 46 46 0 0 1 102 56"
                              fill="none"
                              stroke="#e2e8f0"
                              strokeWidth="12"
                              strokeLinecap="round"
                            />
                            <path
                              d="M 10 56 A 46 46 0 0 1 102 10"
                              fill="none"
                              stroke="url(#predictGradient)"
                              strokeWidth="12"
                              strokeLinecap="round"
                            />
                            <line
                              x1="56"
                              y1="56"
                              x2="96"
                              y2="61"
                              stroke="#1e293b"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <circle
                              cx="56"
                              cy="56"
                              r="4"
                              fill="#1e293b"
                            />
                          </svg>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                            <div className="text-2xl font-bold text-green-600">95%</div>
                          </div>
                        </div>
                        <div className="mt-2 text-center">
                          <div className="text-xs font-semibold text-slate-700 mb-1">预测完成</div>
                          <div className="text-[10px] text-slate-600 mb-0.5">预测金额</div>
                          <div className="text-sm font-bold text-slate-900">95万</div>
                          <div className="text-[10px] text-slate-600 mb-0.5 mt-1">目标金额</div>
                          <div className="text-sm font-bold text-slate-900">100万</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 消息提醒 + 关键待办 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 消息提醒栏 */}
                <div>
                  <Card className="border border-slate-200 h-full">
                    <CardHeader className="bg-white py-2 px-4">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-slate-600" />
                        消息提醒
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-3 pb-3">
                      <div className="space-y-2.5">
                        {mockMessages.map((message) => (
                          <div key={message.id} className={`p-2.5 rounded-lg border ${
                            message.priority === 'high'
                              ? 'border-red-200 bg-white'
                              : message.priority === 'medium'
                              ? 'border-amber-200 bg-white'
                              : 'border-slate-200 bg-white'
                          }`}>
                            <div className="flex items-start justify-between mb-1.5">
                              <span className="text-xs font-semibold text-slate-900">{message.title}</span>
                              <Badge className={`text-[10px] px-1.5 py-0.5 ${
                                message.priority === 'high'
                                  ? 'bg-red-100 text-red-700'
                                  : message.priority === 'medium'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {message.priority === 'high' ? '紧急' : message.priority === 'medium' ? '重要' : '普通'}
                              </Badge>
                            </div>
                            <p className="text-[11px] text-slate-700 mb-1.5">{message.content}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-500">{message.time}</span>
                              <Button size="sm" variant="ghost" className="h-6 text-[10px]">
                                查看
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 关键待办栏 */}
                <div>
                  <Card className="border border-slate-200 h-full">
                    <CardHeader className="bg-white py-2 px-4">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Bell className="h-4 w-4 text-slate-600" />
                        关键待办
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-3 pb-3">
                      <div className="grid grid-cols-2 gap-2.5">
                        {mockKeyTodos.map((todo) => {
                          const Icon = todo.icon;
                          return (
                            <div key={todo.title} className="p-2.5 rounded-lg bg-white border border-slate-200">
                              <div className="flex items-center justify-between mb-1">
                                <div className="text-[10px] font-semibold text-slate-700">{todo.title}</div>
                                <Icon className={`h-3.5 w-3.5 text-${todo.color}-600`} />
                              </div>
                              <div className="text-lg font-bold text-slate-900 mb-1.5">{todo.count}个</div>
                              <Button size="sm" className="w-full h-6 text-[10px] bg-slate-100 text-slate-700 hover:bg-slate-200">
                                查看详情
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 销售趋势概览 */}
              <Card className="border border-slate-200">
                <CardHeader className="bg-white py-2 px-4">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp2 className="h-4 w-4 text-slate-600" />
                    销售趋势概览
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3 pb-3">
                  <div className="space-y-2">
                    {mockSalesTrend.map((data) => (
                      <div key={data.month} className="flex items-center gap-4">
                        <div className="w-12 text-xs text-slate-600">{data.month}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-slate-500">
                              实际: {(data.sales / 10000).toFixed(0)}万 / 目标: {(data.target / 10000).toFixed(0)}万
                            </span>
                            <span className={`text-xs font-bold ${
                              data.sales >= data.target ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {((data.sales / data.target) * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                data.sales >= data.target ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min((data.sales / data.target) * 100, 100)}%` }}
                            />
                          </div>
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
            <div className="flex-1 flex items-center justify-center">
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                    <Construction className="h-8 w-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">功能开发中</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {activeSubMenu ? `正在开发：${menuItems.find(m => m.key === activeMenu)?.label} - ${menuItems.find(m => m.key === activeMenu)?.subItems?.find(s => s.key === activeSubMenu)?.label}` : `正在开发：${menuItems.find(m => m.key === activeMenu)?.label}`}
                    </p>
                    <Button onClick={() => setActiveMenu('home')} variant="outline">
                      返回首页
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// 添加缺失的图标导入
import { List, Construction } from 'lucide-react';
