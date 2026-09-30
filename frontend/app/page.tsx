"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Box, Shield, Workflow } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-32">
      {/* Hero Section - Left aligned, stark typography */}
      <section className="pt-24 pb-20 animate-slide-up">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 max-w-4xl leading-[1.1] text-white">
          Contextual interview prep, <br className="hidden md:block" />
          generated in seconds.
        </h1>
        
        <p className="text-lg text-textMuted mb-10 max-w-2xl leading-relaxed">
          Provide a job description and company URL. The engine crawls the company&apos;s 
          engineering blog, extracts role requirements, and outputs a deterministic 
          study schedule and question bank.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {user ? (
            <Link href="/dashboard" className="btn-primary flex items-center justify-center gap-2 w-max">
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link href="/register" className="btn-primary flex items-center justify-center gap-2 w-max">
                Start Preparing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login" className="btn-secondary flex items-center justify-center w-max">
                View Existing Kits
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Grid - Asymmetrical Layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-px bg-borderSubtle mt-10 border border-borderSubtle">
        
        <div className="glass-card p-10 md:col-span-8 bg-surface animate-slide-up rounded-none border-0" style={{ animationDelay: '0.1s' }}>
          <Box className="w-5 h-5 text-white mb-8" strokeWidth={1.5} />
          <h3 className="text-lg font-medium mb-2 text-white">Role-Specific Extraction</h3>
          <p className="text-sm text-textMuted leading-relaxed max-w-lg">
            We extract exact requirements from the JD and map them to targeted questions 
            and flashcards. Avoid generic advice and focus strictly on what the role demands.
          </p>
        </div>
        
        <div className="glass-card p-10 md:col-span-4 bg-surface animate-slide-up rounded-none border-0" style={{ animationDelay: '0.15s' }}>
          <Shield className="w-5 h-5 text-white mb-8" strokeWidth={1.5} />
          <h3 className="text-lg font-medium mb-2 text-white">Deep Research</h3>
          <p className="text-sm text-textMuted leading-relaxed">
            Crawls the company&apos;s hiring pages and career portals to understand their 
            engineering values and stack.
          </p>
        </div>
        
        <div className="glass-card p-10 md:col-span-12 bg-surface animate-slide-up flex flex-col md:flex-row gap-12 items-start md:items-center justify-between rounded-none border-0" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-xl">
            <Workflow className="w-5 h-5 text-white mb-8" strokeWidth={1.5} />
            <h3 className="text-lg font-medium mb-2 text-white">Deterministic Scheduling</h3>
            <p className="text-sm text-textMuted leading-relaxed">
              The engine builds a strict day-by-day study schedule optimizing your time 
              based on topic priority and question difficulty.
            </p>
          </div>
          <div className="w-full md:w-1/3 bg-background border border-borderSubtle p-6">
             <div className="flex justify-between items-center border-b border-borderSubtle pb-3 mb-3">
               <span className="text-xs tracking-wide text-textMuted uppercase">Day 1</span>
               <span className="text-sm font-medium text-white">System Design</span>
             </div>
             <div className="flex justify-between items-center border-b border-borderSubtle pb-3 mb-3">
               <span className="text-xs tracking-wide text-textMuted uppercase">Day 2</span>
               <span className="text-sm font-medium text-white">Core Language</span>
             </div>
             <div className="flex justify-between items-center pb-1">
               <span className="text-xs tracking-wide text-textMuted uppercase">Day 3</span>
               <span className="text-sm font-medium text-white">Behavioral</span>
             </div>
          </div>
        </div>
        
      </section>
    </div>
  );
}
