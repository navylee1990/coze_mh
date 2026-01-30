'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Newspaper,
  Phone,
  TrendingUp,
  ShieldAlert,
  FileText,
  BookOpen,
  Trophy,
  Lightbulb,
  Package,
  Bell,
  Headphones,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

// ==================== 公司资讯模块 ====================

// 模拟公司新闻数据
const mockNews = [
  {
    id: 'NWS001',
    title: 'AOS荣获2024年度环保行业创新企业奖',
    summary: '凭借在商用净水领域的持续创新和技术突破，AOS荣获2024年度环保行业创新企业奖',
    publishDate: '2025-01-20',
    category: '公司动态',
    views: 1250
  },
  {
    id: 'NWS002',
    title: 'AOS与大型制造企业签署战略合作协议',
    summary: 'AOS与多家大型制造企业签署战略合作协议，深化商用净水解决方案合作',
    publishDate: '2025-01-18',
    category: '战略合作',
    views: 980
  },
  {
    id: 'NWS003',
    title: 'AOS发布新一代智能商用净水系统',
    summary: 'AOS发布全新一代智能商用净水系统，搭载AI智能水质监测和远程控制功能',
    publishDate: '2025-01-15',
    category: '产品发布',
    views: 2340
  }
];

// 模拟公众号资料数据
const mockWechatMaterials = [
  {
    id: 'WC001',
    title: '商用净水设备选购指南',
    publishDate: '2025-01-22',
    readCount: 3560,
    category: '产品科普'
  },
  {
    id: 'WC002',
    title: '如何评估商用净水需求？',
    publishDate: '2025-01-20',
    readCount: 2890,
    category: '需求分析'
  },
  {
    id: 'WC003',
    title: 'AOS智能净水系统的五大优势',
    publishDate: '2025-01-18',
    readCount: 3100,
    category: '产品介绍'
  }
];

// 模拟优秀案例数据
const mockCases = [
  {
    id: 'CASE001',
    title: '某大型制造企业智能化水处理项目',
    customer: '某大型制造企业',
    industry: '制造业',
    projectScale: '5000台设备',
    completionDate: '2024-12-30',
    highlights: '实现100%智能化管理，降低运营成本30%',
    thumbnail: ''
  },
  {
    id: 'CASE002',
    title: '智慧园区能源管理系统',
    customer: '上海智慧园区',
    industry: '园区运营',
    projectScale: '3000台设备',
    completionDate: '2024-12-15',
    highlights: '打造绿色智慧园区标杆',
    thumbnail: ''
  },
  {
    id: 'CASE003',
    title: '医院直饮水系统升级项目',
    customer: '北京某三甲医院',
    industry: '医疗',
    projectScale: '2000台设备',
    completionDate: '2024-11-20',
    highlights: '通过医疗级水质认证',
    thumbnail: ''
  }
];

// 模拟思想会资料数据
const mockThinkingMeeting = [
  {
    id: 'TM001',
    title: '2025年商用净水市场发展趋势研讨会',
    speaker: '市场部总监',
    date: '2025-01-25',
    location: '总部会议室',
    participants: 45,
    summary: '深入分析2025年商用净水市场发展趋势和机遇'
  },
  {
    id: 'TM002',
    title: '技术创新与产品升级分享会',
    speaker: '技术总监',
    date: '2025-01-18',
    location: '研发中心',
    participants: 60,
    summary: '分享最新技术突破和产品升级规划'
  }
];

type CompanyInfoSubKey = 'news' | 'wechat' | 'cases' | 'thinking';

export function CompanyInfoTab() {
  const [activeSub, setActiveSub] = useState<CompanyInfoSubKey>('news');

  const subMenuItems = [
    { key: 'news' as CompanyInfoSubKey, icon: Newspaper, label: '公司新闻清单' },
    { key: 'wechat' as CompanyInfoSubKey, icon: Phone, label: '公众号宣传资料' },
    { key: 'cases' as CompanyInfoSubKey, icon: Trophy, label: '优秀案例' },
    { key: 'thinking' as CompanyInfoSubKey, icon: Lightbulb, label: '思想会资料' }
  ];

  return (
    <div className="space-y-6">
      {/* 子菜单 */}
      <div className="flex flex-wrap gap-2">
        {subMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSub === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveSub(item.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 内容区域 */}
      {activeSub === 'news' && <CompanyNewsList />}
      {activeSub === 'wechat' && <WechatMaterials />}
      {activeSub === 'cases' && <ExcellentCases />}
      {activeSub === 'thinking' && <ThinkingMeeting />}
    </div>
  );
}

// 公司新闻清单
function CompanyNewsList() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">公司新闻清单</h3>
        <p className="text-slate-600 dark:text-slate-400">公司最新动态和资讯</p>
      </div>
      {mockNews.map((news) => (
        <Card key={news.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{news.category}</Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{news.publishDate}</span>
                </div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {news.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{news.summary}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    阅读 {news.views}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// 公众号宣传资料
function WechatMaterials() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">公众号宣传资料</h3>
        <p className="text-slate-600 dark:text-slate-400">微信公众号宣传内容汇总</p>
      </div>
      {mockWechatMaterials.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{item.category}</Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.publishDate}</span>
                </div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    阅读 {item.readCount}
                  </span>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                查看详情
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// 优秀案例
function ExcellentCases() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">优秀案例</h3>
        <p className="text-slate-600 dark:text-slate-400">成功案例展示与分享</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockCases.map((caseItem) => (
          <Card key={caseItem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary">{caseItem.industry}</Badge>
                <span className="text-xs text-slate-500 dark:text-slate-400">{caseItem.completionDate}</span>
              </div>
              <CardTitle className="text-base">{caseItem.title}</CardTitle>
              <CardDescription className="text-sm">{caseItem.customer}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">项目规模:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{caseItem.projectScale}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-slate-600 dark:text-slate-400 mb-1">项目亮点:</p>
                  <p className="font-medium text-blue-600 dark:text-blue-400">{caseItem.highlights}</p>
                </div>
              </div>
              <Button className="w-full mt-4" size="sm" variant="outline">
                查看详情
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// 思想会资料
function ThinkingMeeting() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">思想会资料</h3>
        <p className="text-slate-600 dark:text-slate-400">内部思想分享会议资料</p>
      </div>
      {mockThinkingMeeting.map((meeting) => (
        <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 flex-shrink-0">
                <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {meeting.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{meeting.summary}</p>
                <div className="grid gap-2 md:grid-cols-4 text-xs text-slate-500 dark:text-slate-400">
                  <div>
                    <span className="block mb-1">主讲人:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{meeting.speaker}</span>
                  </div>
                  <div>
                    <span className="block mb-1">日期:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{meeting.date}</span>
                  </div>
                  <div>
                    <span className="block mb-1">地点:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{meeting.location}</span>
                  </div>
                  <div>
                    <span className="block mb-1">参与人数:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{meeting.participants}人</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ==================== 运营指南模块 ====================

// 模拟政策指南数据
const mockPolicyGuide = [
  {
    id: 'POL001',
    title: '经销商管理政策（2025版）',
    publishDate: '2025-01-15',
    category: '管理制度',
    downloadCount: 890
  },
  {
    id: 'POL002',
    title: '销售奖励政策说明',
    publishDate: '2025-01-10',
    category: '激励政策',
    downloadCount: 1250
  }
];

// 模拟营销通知数据
const mockMarketingNotice = [
  {
    id: 'MKT001',
    title: '2025年第一季度营销活动通知',
    publishDate: '2025-01-20',
    type: '营销活动',
    priority: '重要',
    status: '进行中'
  },
  {
    id: 'MKT002',
    title: '产品推广资源支持政策',
    publishDate: '2025-01-18',
    type: '资源支持',
    priority: '普通',
    status: '已发布'
  }
];

// 模拟产品介绍数据
const mockProductIntro = [
  {
    id: 'PRD001',
    title: 'AR75-E1智能商用净水器产品手册',
    publishDate: '2025-01-15',
    version: 'V2.0',
    category: '产品手册'
  },
  {
    id: 'PRD002',
    title: 'BR75-EH5商用直饮水系统技术参数',
    publishDate: '2025-01-12',
    version: 'V1.5',
    category: '技术参数'
  }
];

// 模拟售后服务数据
const mockAfterSales = [
  {
    id: 'SVC001',
    title: '售后服务流程规范',
    publishDate: '2025-01-18',
    category: '服务流程',
    downloadCount: 670
  },
  {
    id: 'SVC002',
    title: '设备维护保养指南',
    publishDate: '2025-01-15',
    category: '维护指南',
    downloadCount: 920
  }
];

type OperationGuideSubKey = 'policy' | 'marketing' | 'product' | 'service';

export function OperationGuideTab() {
  const [activeSub, setActiveSub] = useState<OperationGuideSubKey>('policy');

  const subMenuItems = [
    { key: 'policy' as OperationGuideSubKey, icon: BookOpen, label: '政策指南' },
    { key: 'marketing' as OperationGuideSubKey, icon: Bell, label: '营销通知' },
    { key: 'product' as OperationGuideSubKey, icon: Package, label: '产品介绍' },
    { key: 'service' as OperationGuideSubKey, icon: Headphones, label: '售后服务' }
  ];

  return (
    <div className="space-y-6">
      {/* 子菜单 */}
      <div className="flex flex-wrap gap-2">
        {subMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSub === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveSub(item.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 内容区域 */}
      {activeSub === 'policy' && <PolicyGuide />}
      {activeSub === 'marketing' && <MarketingNotice />}
      {activeSub === 'product' && <ProductIntro />}
      {activeSub === 'service' && <AfterSalesGuide />}
    </div>
  );
}

// 政策指南
function PolicyGuide() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">政策指南</h3>
        <p className="text-slate-600 dark:text-slate-400">经销商相关政策文件和指南</p>
      </div>
      {mockPolicyGuide.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.publishDate}</span>
                </div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    下载 {item.downloadCount}
                  </span>
                </div>
              </div>
              <Button size="sm" variant="outline">
                下载
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// 营销通知
function MarketingNotice() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">营销通知</h3>
        <p className="text-slate-600 dark:text-slate-400">营销活动通知和指导</p>
      </div>
      {mockMarketingNotice.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{item.type}</Badge>
                  <Badge
                    variant={item.priority === '重要' ? 'destructive' : 'secondary'}
                  >
                    {item.priority}
                  </Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.publishDate}</span>
                </div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={item.status === '进行中' ? 'default' : 'secondary'}
                    className={
                      item.status === '进行中'
                        ? 'bg-green-600'
                        : ''
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// 产品介绍
function ProductIntro() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">产品介绍</h3>
        <p className="text-slate-600 dark:text-slate-400">产品相关介绍文档和资料</p>
      </div>
      {mockProductIntro.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.version}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.publishDate}</span>
                </div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h4>
              </div>
              <Button size="sm" variant="outline">
                下载
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// 售后服务指南
function AfterSalesGuide() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">售后服务</h3>
        <p className="text-slate-600 dark:text-slate-400">售后服务流程和指南</p>
      </div>
      {mockAfterSales.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.publishDate}</span>
                </div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    下载 {item.downloadCount}
                  </span>
                </div>
              </div>
              <Button size="sm" variant="outline">
                下载
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ==================== 市场洞察模块 ====================

// 模拟行业趋势数据
const mockIndustryTrends = [
  {
    id: 'TR001',
    title: '2025年商用净水市场趋势分析',
    trend: '上升',
    growthRate: '+15.2%',
    description: '受环保政策推动和健康意识提升，商用净水市场持续增长',
    keyPoints: ['政府环保政策支持', '健康饮水需求增加', '智能化产品需求旺盛'],
    publishDate: '2025-01-25'
  },
  {
    id: 'TR002',
    title: '租赁模式市场渗透率分析',
    trend: '上升',
    growthRate: '+22.5%',
    description: '租赁模式因其灵活性和成本优势，市场渗透率持续提升',
    keyPoints: ['客户成本优化需求', '设备维护便捷性', '技术迭代快速'],
    publishDate: '2025-01-22'
  }
];

// 模拟竞品分析数据
const mockCompetitorAnalysis = [
  {
    id: 'CMP001',
    companyName: '竞品A',
    marketShare: '18%',
    strength: '渠道覆盖广',
    weakness: '智能化程度低',
    priceLevel: '中',
    productLine: '较全面',
    riskLevel: '中等'
  },
  {
    id: 'CMP002',
    companyName: '竞品B',
    marketShare: '15%',
    strength: '技术创新强',
    weakness: '服务网络不足',
    priceLevel: '高',
    productLine: '高端',
    riskLevel: '较高'
  },
  {
    id: 'CMP003',
    companyName: '竞品C',
    marketShare: '12%',
    strength: '价格优势',
    weakness: '产品稳定性一般',
    priceLevel: '低',
    productLine: '基础型',
    riskLevel: '低'
  }
];

// 模拟市场机会数据
const mockMarketOpportunities = [
  {
    id: 'OPP001',
    opportunity: '高校市场',
    potential: '高',
    description: '高校直饮水需求旺盛，市场规模约50亿',
    entryDifficulty: '中等',
    timeToMarket: '6-12个月',
    estimatedRevenue: '5000万/年',
    priority: '重点'
  },
  {
    id: 'OPP002',
    opportunity: '政府机关',
    potential: '中',
    description: '政府采购规范化，需求稳定增长',
    entryDifficulty: '较高',
    timeToMarket: '12-18个月',
    estimatedRevenue: '3000万/年',
    priority: '规划'
  },
  {
    id: 'OPP003',
    opportunity: '医疗机构',
    potential: '高',
    description: '医疗级水质要求严格，市场空间大',
    entryDifficulty: '高',
    timeToMarket: '18-24个月',
    estimatedRevenue: '8000万/年',
    priority: '重点'
  }
];

export function MarketInsightsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">市场洞察</h3>
        <p className="text-slate-600 dark:text-slate-400">行业趋势、竞品分析和市场机会</p>
      </div>

      {/* 行业趋势 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            行业趋势分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockIndustryTrends.map((trend) => (
              <div key={trend.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-slate-900 dark:text-white">{trend.title}</h4>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUp className="h-4 w-4" />
                    <span className="font-semibold">{trend.growthRate}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{trend.description}</p>
                <div className="flex flex-wrap gap-2">
                  {trend.keyPoints.map((point, index) => (
                    <Badge key={index} variant="outline">
                      {point}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  发布时间：{trend.publishDate}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 竞品分析 */}
      <Card>
        <CardHeader>
          <CardTitle>竞品分析</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">公司名称</th>
                  <th className="text-left py-3 px-4 font-semibold">市场份额</th>
                  <th className="text-left py-3 px-4 font-semibold">优势</th>
                  <th className="text-left py-3 px-4 font-semibold">劣势</th>
                  <th className="text-left py-3 px-4 font-semibold">价格定位</th>
                  <th className="text-left py-3 px-4 font-semibold">产品线</th>
                  <th className="text-left py-3 px-4 font-semibold">风险等级</th>
                </tr>
              </thead>
              <tbody>
                {mockCompetitorAnalysis.map((competitor) => (
                  <tr key={competitor.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {competitor.companyName}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {competitor.marketShare}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {competitor.strength}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {competitor.weakness}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{competitor.priceLevel}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {competitor.productLine}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          competitor.riskLevel === '较高'
                            ? 'destructive'
                            : competitor.riskLevel === '中等'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {competitor.riskLevel}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 市场机会 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            市场机会挖掘
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {mockMarketOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-base">{opportunity.opportunity}</CardTitle>
                    <Badge
                      variant={opportunity.priority === '重点' ? 'default' : 'secondary'}
                      className={opportunity.priority === '重点' ? 'bg-blue-600' : ''}
                    >
                      {opportunity.priority}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">潜在收益:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {opportunity.estimatedRevenue}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">进入难度:</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {opportunity.entryDifficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">上市周期:</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {opportunity.timeToMarket}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== 风险分析模块 ====================

// 模拟项目风险数据
const mockProjectRisks = [
  {
    id: 'RISK001',
    projectName: '某大型制造企业项目',
    riskType: '合同风险',
    riskLevel: '高',
    description: '合同条款中存在价格调整机制不明确的问题',
    probability: '70%',
    impact: '严重',
    status: '待处理',
    responsible: '张经理',
    dueDate: '2025-02-01',
    mitigation: '需与法务部门协商修订合同条款'
  },
  {
    id: 'RISK002',
    projectName: '智慧园区项目',
    riskType: '交付风险',
    riskLevel: '中',
    description: '设备交付时间可能受到供应链影响',
    probability: '50%',
    impact: '中等',
    status: '处理中',
    responsible: '李经理',
    dueDate: '2025-01-30',
    mitigation: '已联系供应商确认生产进度'
  },
  {
    id: 'RISK003',
    projectName: '医院信息化项目',
    riskType: '回款风险',
    riskLevel: '高',
    description: '客户资金审批流程较长，可能影响回款时间',
    probability: '60%',
    impact: '严重',
    status: '待处理',
    responsible: '王经理',
    dueDate: '2025-02-05',
    mitigation: '需提前与客户财务部门沟通确认'
  }
];

// 模拟财务风险数据
const mockFinancialRisks = [
  {
    id: 'FR001',
    riskType: '应收账款风险',
    description: '部分客户应收账款账期超过合同约定时间',
    totalAmount: 2500000,
    overdueAmount: 850000,
    customerCount: 5,
    status: '需跟进',
    trend: '上升'
  },
  {
    id: 'FR002',
    riskType: '现金流风险',
    description: '近期大额采购可能导致短期现金流压力',
    totalAmount: 3000000,
    impactPeriod: 'Q1',
    status: '可控',
    trend: '稳定'
  }
];

// 模拟市场风险数据
const mockMarketRisks = [
  {
    id: 'MR001',
    riskType: '价格竞争风险',
    description: '部分竞争对手通过降价策略抢占市场份额',
    impact: '中等',
    probability: '60%',
    affectedRegions: ['华东', '华南'],
    countermeasures: ['强调产品差异化优势', '提供增值服务', '优化成本结构'],
    status: '持续关注'
  },
  {
    id: 'MR002',
    riskType: '政策变化风险',
    description: '环保政策调整可能对产品认证要求产生影响',
    impact: '高',
    probability: '40%',
    affectedProducts: ['AR75系列', 'BR75系列'],
    countermeasures: ['提前布局新产品认证', '与监管部门保持沟通', '建立合规检查机制'],
    status: '持续关注'
  }
];

export function RiskAnalysisTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">风险分析</h3>
        <p className="text-slate-600 dark:text-slate-400">项目风险、财务风险和市场风险监控</p>
      </div>

      {/* 风险统计概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">高风险项目</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">中风险项目</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">1</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">待处理风险</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">2</p>
              </div>
              <ShieldAlert className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">已处理风险</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">1</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 项目风险 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            项目风险
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProjectRisks.map((risk) => (
              <div key={risk.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          risk.riskLevel === '高'
                            ? 'destructive'
                            : risk.riskLevel === '中'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {risk.riskLevel}风险
                      </Badge>
                      <Badge variant="outline">{risk.riskType}</Badge>
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {risk.projectName}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{risk.description}</p>
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <div>
                    <span className="block mb-1">发生概率:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{risk.probability}</span>
                  </div>
                  <div>
                    <span className="block mb-1">影响程度:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{risk.impact}</span>
                  </div>
                  <div>
                    <span className="block mb-1">截止日期:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{risk.dueDate}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">负责人:</span>
                    <span className="text-xs font-medium text-slate-900 dark:text-white">{risk.responsible}</span>
                  </div>
                  <Badge
                    variant={risk.status === '待处理' ? 'secondary' : 'default'}
                    className={risk.status === '处理中' ? 'bg-blue-600' : ''}
                  >
                    {risk.status}
                  </Badge>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">应对措施:</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400">{risk.mitigation}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 财务风险 */}
      <Card>
        <CardHeader>
          <CardTitle>财务风险</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFinancialRisks.map((risk) => (
              <div key={risk.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={risk.trend === '上升' ? 'destructive' : 'outline'}>
                        {risk.riskType}
                      </Badge>
                      {risk.trend === '上升' && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <ArrowUp className="h-3 w-3" />
                          上升
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{risk.description}</p>
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-3 text-xs text-slate-500 dark:text-slate-400">
                  <div>
                    <span className="block mb-1">涉及金额:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      ¥{(risk.totalAmount / 10000).toFixed(0)}万
                    </span>
                  </div>
                  {risk.overdueAmount && (
                    <div>
                      <span className="block mb-1">逾期金额:</span>
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        ¥{(risk.overdueAmount / 10000).toFixed(0)}万
                      </span>
                    </div>
                  )}
                  {risk.customerCount && (
                    <div>
                      <span className="block mb-1">涉及客户:</span>
                      <span className="font-medium text-slate-900 dark:text-white">{risk.customerCount}家</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 市场风险 */}
      <Card>
        <CardHeader>
          <CardTitle>市场风险</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMarketRisks.map((risk) => (
              <div key={risk.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{risk.riskType}</Badge>
                      <Badge
                        variant={
                          risk.impact === '高'
                            ? 'destructive'
                            : risk.impact === '中等'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        影响：{risk.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{risk.description}</p>
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <div>
                    <span className="block mb-1">发生概率:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{risk.probability}</span>
                  </div>
                  <div>
                    <span className="block mb-1">状态:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{risk.status}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">应对措施:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {risk.countermeasures.map((measure, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {measure}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
