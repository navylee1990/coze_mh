'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, ArrowRight, BarChart3, FileText, MessageSquare, Target, CheckCircle, AlertCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* 顶部导航 */}
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">协同销售平台</span>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              经销商与AOS营销协同 · 项目型销售管理
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区 */}
      <main className="container mx-auto px-6 py-16">
        {/* 标题区 */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            选择您的角色入口
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            基于项目型销售全流程的协同管理平台，实现线索流转、资源申请、报价审批的一站式协作
          </p>
        </div>

        {/* 两个角色入口卡片 */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* 经销商入口 */}
          <Card className="group overflow-hidden border-2 border-slate-200 transition-all hover:border-blue-500 hover:shadow-xl dark:border-slate-700 dark:hover:border-blue-400">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-6 dark:from-slate-800 dark:to-slate-800">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg transition-transform group-hover:scale-110">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate-900 dark:text-white">经销商门户</CardTitle>
              <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                项目线索提交、资源申请、订单管理
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {/* 核心功能列表 */}
              <div className="mb-6 space-y-3">
                <FeatureItem icon={<Target className="h-4 w-4" />} text="项目线索管理与提交" />
                <FeatureItem icon={<FileText className="h-4 w-4" />} text="报价申请与跟踪" />
                <FeatureItem icon={<BarChart3 className="h-4 w-4" />} text="销售数据看板与分析" />
                <FeatureItem icon={<MessageSquare className="h-4 w-4" />} text="资源支持与政策查询" />
                <FeatureItem icon={<CheckCircle className="h-4 w-4" />} text="订单全流程跟踪" />
              </div>

              {/* 协作说明 */}
              <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-slate-800">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    <p className="font-semibold">与AOS营销人员协作：</p>
                    <p className="mt-1">提交项目线索后，AOS营销人员将进行跟进指导、资源审批及报价支持</p>
                  </div>
                </div>
              </div>

              {/* 进入按钮 */}
              <Button
                onClick={() => router.push('/dealer')}
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                进入经销商门户
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>

          {/* AOS营销人员入口 */}
          <Card className="group overflow-hidden border-2 border-slate-200 transition-all hover:border-purple-500 hover:shadow-xl dark:border-slate-700 dark:hover:border-purple-400">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-6 dark:from-slate-800 dark:to-slate-800">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 shadow-lg transition-transform group-hover:scale-110">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate-900 dark:text-white">AOS营销人员门户</CardTitle>
              <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                线索分配管理、审批流程、经销商支持
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {/* 核心功能列表 */}
              <div className="mb-6 space-y-3">
                <FeatureItem icon={<Target className="h-4 w-4" />} text="线索接收、分配与跟进" />
                <FeatureItem icon={<CheckCircle className="h-4 w-4" />} text="报价审批与定价管理" />
                <FeatureItem icon={<FileText className="h-4 w-4" />} text="资源申请审批" />
                <FeatureItem icon={<Building2 className="h-4 w-4" />} text="经销商关系管理" />
                <FeatureItem icon={<BarChart3 className="h-4 w-4" />} text="销售业绩与数据分析" />
              </div>

              {/* 协作说明 */}
              <div className="mb-6 rounded-lg bg-purple-50 p-4 dark:bg-slate-800">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    <p className="font-semibold">与经销商协作：</p>
                    <p className="mt-1">接收经销商提交的项目线索，提供专业指导、审批资源申请、支持报价策略</p>
                  </div>
                </div>
              </div>

              {/* 进入按钮 */}
              <Button
                onClick={() => router.push('/aos-sales')}
                className="w-full gap-2 bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                进入AOS营销门户
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 协作流程说明 */}
        <div className="mt-16 rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white">
            协同工作流程
          </h2>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-5">
            <WorkflowStep
              step="1"
              title="经销商提交线索"
              description="提交新项目线索"
              className="border-blue-500"
            />
            <WorkflowStep
              step="2"
              title="AOS接收分配"
              description="指派跟进人员"
              className="border-purple-500"
            />
            <WorkflowStep
              step="3"
              title="协同跟进"
              description="双向沟通支持"
              className="border-blue-500"
            />
            <WorkflowStep
              step="4"
              title="报价审批"
              description="AOS审核报价"
              className="border-purple-500"
            />
            <WorkflowStep
              step="5"
              title="订单成交"
              description="完成销售闭环"
              className="border-green-500"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// 功能项组件
function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
        <span className="text-slate-600 dark:text-slate-400">{icon}</span>
      </div>
      <span className="text-sm text-slate-700 dark:text-slate-300">{text}</span>
    </div>
  );
}

// 流程步骤组件
function WorkflowStep({ step, title, description, className }: { step: string; title: string; description: string; className?: string }) {
  return (
    <div className={`relative flex flex-col items-center border-t-4 ${className} pt-4`}>
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white dark:bg-slate-100 dark:text-slate-900">
        {step}
      </div>
      <h3 className="mb-1 text-center text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-center text-xs text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
