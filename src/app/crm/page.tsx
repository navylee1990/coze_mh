'use client';

import { Button } from '@/components/ui/button';
import CRMSystem from '@/components/crm/CRMSystem';
import { ArrowLeft } from 'lucide-react';

export default function CRMPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 顶部导航栏 */}
      <header className="border-b bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/dealer">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  返回
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主体内容 */}
      <main className="container mx-auto px-6 py-8">
        <CRMSystem showHeader={true} />
      </main>
    </div>
  );
}
