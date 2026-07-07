import React from 'react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileStats } from './ProfileStats';
import { AIProfileInsights } from './AIProfileInsights';
import { SkillMatrix } from './SkillMatrix';
import { AchievementsTimeline } from './AchievementsTimeline';
import { SecurityPanel } from '../Settings/SecurityPanel';

export function ProfilePage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 relative z-10 pb-10">
      
      {/* 1. Identity Header */}
      <section>
        <ProfileHeader />
      </section>

      {/* 2. Master KPIs */}
      <section>
        <ProfileStats />
      </section>

      {/* 3. AI Insights & Matrices */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AIProfileInsights />
        </div>
        <div className="h-full">
          <SkillMatrix />
        </div>
      </section>

      {/* 4. Career History & Security */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AchievementsTimeline />
        <div className="h-full">
          <SecurityPanel />
        </div>
      </section>

    </div>
  );
}
