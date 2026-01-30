'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Award,
  TrendingUp,
  Target,
  Users,
  DollarSign,
  Star,
  Calendar,
  CheckCircle2
} from 'lucide-react';

// 五维评估模型定义
const dimensions = [
  {
    id: 'sales',
    name: '销售业绩',
    icon: DollarSign,
    color: 'blue',
    weight: 30,
    score: 85,
    target: 100,
    description: '销售目标完成情况',
    metrics: [
      { name: '月度销售额', value: 85, target: 100 },
      { name: '季度增长率', value: 90, target: 100 },
      { name: '年度目标达成', value: 80, target: 100 }
    ]
  },
  {
    id: 'customer',
    name: '客户开发',
    icon: Users,
    color: 'green',
    weight: 25,
    score: 78,
    target: 100,
    description: '新客户开发与维护',
    metrics: [
      { name: '新客户数量', value: 75, target: 100 },
      { name: '客户满意度', value: 80, target: 100 },
      { name: '客户留存率', value: 79, target: 100 }
    ]
  },
  {
    id: 'channel',
    name: '渠道拓展',
    icon: Target,
    color: 'purple',
    weight: 20,
    score: 88,
    target: 100,
    description: '渠道建设与管理',
    metrics: [
      { name: '渠道数量增长', value: 85, target: 100 },
      { name: '渠道活跃度', value: 90, target: 100 },
      { name: '渠道转化率', value: 89, target: 100 }
    ]
  },
  {
    id: 'team',
    name: '团队协作',
    icon: CheckCircle2,
    color: 'orange',
    weight: 15,
    score: 92,
    target: 100,
    description: '团队配合与沟通',
    metrics: [
      { name: '团队贡献度', value: 95, target: 100 },
      { name: '协作效率', value: 90, target: 100 },
      { name: '知识分享', value: 91, target: 100 }
    ]
  },
  {
    id: 'innovation',
    name: '创新能力',
    icon: Star,
    color: 'pink',
    weight: 10,
    score: 75,
    target: 100,
    description: '创新思维与突破',
    metrics: [
      { name: '创新方案数量', value: 70, target: 100 },
      { name: '方案实施效果', value: 80, target: 100 },
      { name: '行业影响力', value: 75, target: 100 }
    ]
  }
];

// 模拟评估历史数据
const mockEvaluationHistory = [
  {
    id: 'EVAL001',
    period: '2025年1月',
    overallScore: 83.6,
    dimensions: {
      sales: 85,
      customer: 78,
      channel: 88,
      team: 92,
      innovation: 75
    },
    rank: 5,
    totalPeople: 20,
    status: '已完成',
    evaluatedBy: '区域总监',
    evaluateDate: '2025-01-25'
  },
  {
    id: 'EVAL002',
    period: '2024年12月',
    overallScore: 81.2,
    dimensions: {
      sales: 80,
      customer: 75,
      channel: 85,
      team: 90,
      innovation: 75
    },
    rank: 6,
    totalPeople: 20,
    status: '已完成',
    evaluatedBy: '区域总监',
    evaluateDate: '2024-12-28'
  },
  {
    id: 'EVAL003',
    period: '2024年11月',
    overallScore: 79.8,
    dimensions: {
      sales: 78,
      customer: 73,
      channel: 82,
      team: 88,
      innovation: 77
    },
    rank: 7,
    totalPeople: 20,
    status: '已完成',
    evaluatedBy: '区域总监',
    evaluateDate: '2024-11-30'
  }
];

export function PerformanceEvaluation() {
  const [selectedPeriod, setSelectedPeriod] = useState('EVAL001');

  const currentEvaluation = mockEvaluationHistory.find(e => e.id === selectedPeriod) || mockEvaluationHistory[0];

  // 计算总分
  const totalScore = dimensions.reduce((sum, dim) => sum + (dim.score * dim.weight) / 100, 0).toFixed(1);

  // 获取评级
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'S', color: 'bg-purple-600', label: '卓越' };
    if (score >= 80) return { grade: 'A', color: 'bg-blue-600', label: '优秀' };
    if (score >= 70) return { grade: 'B', color: 'bg-green-600', label: '良好' };
    if (score >= 60) return { grade: 'C', color: 'bg-yellow-600', label: '合格' };
    return { grade: 'D', color: 'bg-red-600', label: '需改进' };
  };

  const gradeInfo = getGrade(parseFloat(totalScore));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">绩效评估</h2>
        <p className="text-slate-600 dark:text-slate-400">五维绩效评估模型</p>
      </div>

      {/* 评估概览 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 总分卡片 */}
        <Card className="border-2 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              综合评分
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`
                inline-flex items-center justify-center w-24 h-24 rounded-full ${gradeInfo.color} text-white mb-4
              `}>
                <div>
                  <div className="text-3xl font-bold">{totalScore}</div>
                  <div className="text-xs opacity-80">分</div>
                </div>
              </div>
              <div className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                评级：{gradeInfo.grade} - {gradeInfo.label}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                排名：第 {currentEvaluation.rank} 名 / 共 {currentEvaluation.totalPeople} 人
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 五维雷达图说明 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              五维评估说明
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              {dimensions.map((dim) => {
                const Icon = dim.icon;
                return (
                  <div key={dim.id} className="text-center">
                    <div className={`
                      inline-flex items-center justify-center w-12 h-12 rounded-lg mb-2
                      ${dim.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' : ''}
                      ${dim.color === 'green' ? 'bg-green-100 dark:bg-green-900' : ''}
                      ${dim.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' : ''}
                      ${dim.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900' : ''}
                      ${dim.color === 'pink' ? 'bg-pink-100 dark:bg-pink-900' : ''}
                    `}>
                      <Icon className={`h-6 w-6 text-${dim.color}-600 dark:text-${dim.color}-400`} />
                    </div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                      {dim.name}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      权重 {dim.weight}%
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 五维详细评分 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dimensions.map((dimension) => {
          const Icon = dimension.icon;
          return (
            <Card
              key={dimension.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-lg
                      ${dimension.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' : ''}
                      ${dimension.color === 'green' ? 'bg-green-100 dark:bg-green-900' : ''}
                      ${dimension.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' : ''}
                      ${dimension.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900' : ''}
                      ${dimension.color === 'pink' ? 'bg-pink-100 dark:bg-pink-900' : ''}
                    `}>
                      <Icon className={`h-4 w-4 text-${dimension.color}-600 dark:text-${dimension.color}-400`} />
                    </div>
                    {dimension.name}
                  </CardTitle>
                  <Badge variant="outline">
                    权重 {dimension.weight}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 总体得分 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        总体得分
                      </span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        {dimension.score}/100
                      </span>
                    </div>
                    <Progress value={dimension.score} className="h-2" />
                  </div>

                  {/* 详细指标 */}
                  <div className="space-y-3">
                    {dimension.metrics.map((metric, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {metric.name}
                          </span>
                          <span className="text-xs font-medium text-slate-900 dark:text-white">
                            {metric.value}/100
                          </span>
                        </div>
                        <Progress value={metric.value} className="h-1.5" />
                      </div>
                    ))}
                  </div>

                  {/* 加权得分 */}
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        加权得分
                      </span>
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        {((dimension.score * dimension.weight) / 100).toFixed(1)}分
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 评估历史 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            评估历史记录
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    评估周期
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    综合得分
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    排名
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    状态
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    评估人
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    评估日期
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockEvaluationHistory.map((evaluation) => {
                  const evalGradeInfo = getGrade(evaluation.overallScore);
                  return (
                    <tr
                      key={evaluation.id}
                      className={`border-b hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer ${
                        evaluation.id === selectedPeriod
                          ? 'bg-purple-50 dark:bg-purple-900/20'
                          : ''
                      }`}
                      onClick={() => setSelectedPeriod(evaluation.id)}
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900 dark:text-white">
                          {evaluation.period}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-slate-900 dark:text-white">
                            {evaluation.overallScore.toFixed(1)}
                          </span>
                          <Badge className={evalGradeInfo.color}>
                            {evalGradeInfo.grade}级
                          </Badge>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-slate-900 dark:text-white font-medium">
                          第 {evaluation.rank} 名
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">
                          / {evaluation.totalPeople}人
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{evaluation.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        {evaluation.evaluatedBy}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        {evaluation.evaluateDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
