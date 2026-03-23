import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import posthog from 'posthog-js';
import { 
  Shield, Activity, Database, Zap, GitBranch, Users, Search, 
  BarChart3, Target, Brain, Lightbulb, Clock, Star, ExternalLink,
  ChevronRight, Sun, Moon, Menu, X, ArrowRight, Check, Play,
  TrendingDown, AlertTriangle, DollarSign, FileText, Upload,
  Layers, LineChart, Sparkles, Github, Mail, Send
} from 'lucide-react';

// Initialize PostHog
const POSTHOG_KEY = 'phx_yugE8Duov8gJYm3k3w19xuicNmG2xrdVL7op8XWP0QzsBHS';
const POSTHOG_HOST = 'https://us.i.posthog.com';

if (typeof window !== 'undefined' && !window.__POSTHOG_INITIALIZED__) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    loaded: (posthogInstance) => {
      // Expose posthog on window for debugging
      window.posthog = posthogInstance;
    }
  });
  window.__POSTHOG_INITIALIZED__ = true;
  window.posthog = posthog;
}

// Track custom event helper
const trackEvent = (eventName, properties = {}) => {
  if (posthog) {
    posthog.capture(eventName, properties);
  }
};

// Utility function for classnames
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Animated Logo Component - Shield with orbiting nodes
const AnimatedLogo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={cn('relative', sizes[size], className)}>
      {/* Shield base */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Shield className="w-full h-full text-primary" strokeWidth={1.5} />
      </motion.div>
      
      {/* Orbiting nodes */}
      <motion.div 
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full bg-accent" />
      </motion.div>
      <motion.div 
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-1 right-0 w-1.5 h-1.5 rounded-full bg-cyan-400" />
      </motion.div>
      <motion.div 
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1 w-1.5 h-1.5 rounded-full bg-emerald-300" />
      </motion.div>
    </div>
  );
};

// Footer Logo - More artistic/ambient animation
const FooterLogo = () => (
  <div className="relative w-32 h-32">
    {/* Outer glow rings */}
    <motion.div 
      className="absolute inset-0 rounded-full border border-primary/20"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute inset-4 rounded-full border border-accent/30"
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />
    
    {/* Central shield */}
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatedLogo size="lg" />
    </div>
    
    {/* Floating particles */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-accent/60"
        style={{
          top: `${20 + Math.random() * 60}%`,
          left: `${20 + Math.random() * 60}%`,
        }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

// Section wrapper with scroll animation
const Section = ({ children, className = '', id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn('relative', className)}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      className={cn(
        'group relative p-6 rounded-2xl glass hover:border-primary/30 transition-all duration-500',
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Timeline Step Component
const TimelineStep = ({ number, title, description, isLast = false, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Line and dot */}
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary font-bold text-sm"
          whileInView={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
        >
          {number}
        </motion.div>
        {!isLast && (
          <motion.div 
            className="w-0.5 h-full bg-gradient-to-b from-primary to-primary/20 mt-2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
          />
        )}
      </div>
      
      {/* Content */}
      <div className="pb-12">
        <h4 className="text-lg font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

// Dashboard Mock Component for Hero
const DashboardMock = () => (
  <motion.div 
    className="relative w-full max-w-xl"
    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
  >
    {/* Glow effect */}
    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
    
    {/* Main dashboard card */}
    <div className="relative glass rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-muted-foreground font-mono">ChurnGuard Dashboard</span>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-surface-highlight">
          <p className="text-xs text-muted-foreground mb-1">Customers at Risk</p>
          <p className="text-2xl font-bold text-red-400">74</p>
          <p className="text-xs text-red-400/80">15% of total</p>
        </div>
        <div className="p-3 rounded-xl bg-surface-highlight">
          <p className="text-xs text-muted-foreground mb-1">MRR at Risk</p>
          <p className="text-2xl font-bold text-amber-400">$29.7K</p>
          <p className="text-xs text-amber-400/80">Critical priority</p>
        </div>
        <div className="p-3 rounded-xl bg-surface-highlight">
          <p className="text-xs text-muted-foreground mb-1">Recoverable</p>
          <p className="text-2xl font-bold text-primary">$71.4K</p>
          <p className="text-xs text-primary/80">ARR @ 20% save</p>
        </div>
      </div>
      
      {/* Risk card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-foreground">cust_0137</p>
            <p className="text-xs text-muted-foreground">Enterprise Plan • $999/mo</p>
          </div>
          <div className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
            87.4% Risk
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span>31 days since last login</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingDown className="w-3 h-3 text-amber-400" />
            <span>Usage dropped 68% MoM</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <DollarSign className="w-3 h-3 text-red-400" />
            <span>3 failed payments (90 days)</span>
          </div>
        </div>
      </div>
      
      {/* Intervention preview */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">AI Intervention Plan</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          "Call account owner directly within 24h. Resolve payment issue first, then offer 20-min account health review..."
        </p>
      </div>
    </div>
  </motion.div>
);

// Intervention Card Component
const InterventionCard = () => (
  <div className="relative glass rounded-2xl p-6 max-w-md">
    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-50" />
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">30-Day Retention Playbook</h4>
          <p className="text-xs text-muted-foreground">Generated for cust_0137</p>
        </div>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="p-3 rounded-lg bg-surface-highlight">
          <p className="text-xs text-primary font-medium mb-1">Week 1: Immediate Action</p>
          <p className="text-muted-foreground text-xs">Call account owner, send payment update link</p>
        </div>
        <div className="p-3 rounded-lg bg-surface-highlight">
          <p className="text-xs text-accent font-medium mb-1">Week 2-3: Re-engagement</p>
          <p className="text-muted-foreground text-xs">Product updates summary, annual plan offer</p>
        </div>
        <div className="p-3 rounded-lg bg-surface-highlight">
          <p className="text-xs text-cyan-400 font-medium mb-1">Success Metrics</p>
          <p className="text-muted-foreground text-xs">Payment processed within 5 days, 2+ logins in 14 days</p>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
function App() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(''); // 'success', 'error', ''
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setEmailStatus('error');
      trackEvent('email_subscription_error', { reason: 'invalid_email' });
      return;
    }
    setIsSubmitting(true);
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setEmailStatus('success');
        trackEvent('email_subscription_success', { email });
        setEmail('');
      } else {
        setEmailStatus('error');
        trackEvent('email_subscription_error', { reason: 'api_error' });
      }
    } catch (error) {
      setEmailStatus('error');
      trackEvent('email_subscription_error', { reason: 'network_error' });
    }
    
    setIsSubmitting(false);
    // Reset status after 5 seconds
    setTimeout(() => setEmailStatus(''), 5000);
  };
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    document.documentElement.className = isDark ? '' : 'light';
  }, [isDark]);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Models', href: '#models' },
    { name: 'Open Source', href: '#open-source' },
  ];

  const features = [
    { icon: Database, title: 'Multi-Source Ingestion', description: 'Connect Stripe, PostHog, HubSpot, or any CSV. Your data, unified.' },
    { icon: Target, title: 'Customer Risk Scoring', description: 'Every customer scored by churn probability with Critical/High/Medium/Low tiers.' },
    { icon: DollarSign, title: 'Revenue-at-Risk Priority', description: 'Focus on accounts that matter most. MRR-weighted prioritization built in.' },
    { icon: Search, title: 'SHAP Explainability', description: 'Know exactly why each customer is flagged. No black boxes.' },
    { icon: Lightbulb, title: 'LLM Intervention Plans', description: 'AI-generated 30-day retention playbooks for every at-risk customer.' },
    { icon: Zap, title: 'Fast Model Training', description: 'LogisticRegression, XGBoost, LightGBM. Compare and pick in minutes.' },
    { icon: Layers, title: 'Export & Persistence', description: 'Save to SQLite, export CSVs, track week-over-week trends.' },
    { icon: GitBranch, title: 'HubSpot Sync', description: 'Push risk scores back to your CRM. Take action where you work.' },
  ];

  const timelineSteps = [
    { title: 'Ingest Data', description: 'Connect Stripe, PostHog, HubSpot, or drop in CSV files' },
    { title: 'Validate & Analyze', description: 'Automatic schema validation and exploratory analysis' },
    { title: 'Engineer Features', description: '7/30/90-day behavioral windows, payment health, usage trends' },
    { title: 'Train Models', description: 'LogisticRegression, XGBoost, LightGBM with SMOTEENN resampling' },
    { title: 'Score Customers', description: 'Churn probability + risk tier for every account' },
    { title: 'Explain with SHAP', description: 'Per-customer waterfall plots and plain-English reasoning' },
    { title: 'Generate Playbooks', description: 'LLM-powered 30-day retention plans (Groq → Gemini → fallback)' },
    { title: 'Export & Act', description: 'SQLite persistence, dated CSVs, HubSpot sync' },
  ];

  const models = [
    { name: 'Logistic Regression', desc: 'Baseline model. Interpretable coefficients.', color: 'text-blue-400' },
    { name: 'XGBoost', desc: 'Primary classifier. Target AUC 0.85-0.93.', color: 'text-primary' },
    { name: 'LightGBM', desc: 'Fast alternative for large datasets.', color: 'text-accent' },
  ];

  return (
    <div className={cn('min-h-screen bg-background text-foreground transition-colors duration-300')}>
      {/* Navbar */}
      <motion.nav 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'glass py-3' : 'py-5 bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <AnimatedLogo size="sm" />
              <span className="text-xl font-bold text-foreground">ChurnGuard AI</span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-surface-highlight transition-colors"
                aria-label="Toggle theme"
                data-testid="theme-toggle"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              {/* GitHub Star Button */}
              <a
                href="https://github.com/ShreyasDasari/churnguard-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-surface-highlight hover:bg-muted border border-border hover:border-primary/50 transition-all text-sm font-medium"
                data-testid="navbar-github-star"
              >
                <Star className="w-4 h-4 text-amber-400" />
                <span>Star on GitHub</span>
              </a>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-surface-highlight"
                data-testid="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 pb-4 border-t border-border pt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="https://github.com/ShreyasDasari/churnguard-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 text-amber-400"
                >
                  <Star className="w-4 h-4" />
                  <span>Star on GitHub</span>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Copy */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <motion.p 
                  className="text-sm uppercase tracking-widest text-primary font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Free & Open Source
                </motion.p>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Predict Churn{' '}
                  <span className="text-gradient">Before It Happens</span>
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Plug in your SaaS data and know who's leaving before they do. 
                  SHAP-powered explainability. LLM intervention plans. 15-minute setup.
                </motion.p>
              </div>
              
              {/* CTAs */}
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href="https://churn-guard--shreyasdasari.replit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
                  data-testid="hero-watch-demo"
                  onClick={() => trackEvent('cta_clicked', { button: 'watch_demo', location: 'hero' })}
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </a>
                <a
                  href="https://github.com/ShreyasDasari/churnguard-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 hover:bg-surface-highlight transition-all font-medium"
                  data-testid="hero-github-star"
                  onClick={() => trackEvent('cta_clicked', { button: 'github_star', location: 'hero' })}
                >
                  <Github className="w-5 h-5" />
                  <span>Star on GitHub</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
              
              {/* Trust badges */}
              <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  { icon: Shield, text: 'Free & Open Source' },
                  { icon: Database, text: 'SaaS-Native' },
                  { icon: Brain, text: 'Explainable AI' },
                  { icon: Lightbulb, text: 'Actionable Plans' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <badge.icon className="w-4 h-4 text-primary" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Right - Dashboard Mock */}
            <div className="hidden lg:block">
              <DashboardMock />
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <Section id="why-it-matters" className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Churn Signals Are <span className="text-gradient">Everywhere</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Your billing, product usage, CRM, and support data all contain early warning signs. 
              The problem? They're fragmented, and by the time you notice, it's too late.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold">The Old Way</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                  <span>Discover churn after the cancellation email</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                  <span>Revenue leaks gradually with no visibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                  <span>Black-box predictions you can't explain</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                  <span>Generic "reach out" advice with no playbook</span>
                </li>
              </ul>
            </div>
            
            <div className="glass rounded-2xl p-8 border-primary/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">With ChurnGuard AI</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>Early warning signals 30-90 days before churn</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>Revenue-weighted prioritization of at-risk accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>SHAP explanations for every prediction</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>Personalized 30-day retention playbooks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Grid */}
      <Section id="features" className="py-24 md:py-32 bg-surface/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="text-gradient">Predict & Prevent</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From data ingestion to actionable interventions — all in one notebook.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <FeatureCard 
                key={feature.title}
                {...feature}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works" className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                From Data to <span className="text-gradient">Action</span> in 8 Steps
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                A notebook-driven workflow designed for fast iteration and clear results.
              </p>
              
              <div className="space-y-2">
                {timelineSteps.map((step, i) => (
                  <TimelineStep
                    key={i}
                    number={i + 1}
                    title={step.title}
                    description={step.description}
                    isLast={i === timelineSteps.length - 1}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:sticky lg:top-32">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 font-mono">churnguard_ai.ipynb</span>
                </div>
                <pre className="text-sm font-mono text-muted-foreground overflow-x-auto">
                  <code>{`# Quick Start - 3 lines of code
from churnguard import ChurnGuard

cg = ChurnGuard(source="stripe")
risk_report = cg.analyze()

# Output: Risk scores, SHAP plots,
# and LLM-generated playbooks
# for every at-risk customer`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Models & Explainability */}
      <Section id="models" className="py-24 md:py-32 bg-surface/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Models You Can <span className="text-gradient">Trust & Explain</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We don't hide predictions in a black box. Every risk score comes with 
                SHAP-powered explanations you can share with your team.
              </p>
              
              <div className="space-y-4 mb-8">
                {models.map((model) => (
                  <div key={model.name} className="glass rounded-xl p-4 flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-current" style={{ color: model.color.replace('text-', '') }} />
                    <div>
                      <h4 className={cn('font-semibold', model.color)}>{model.name}</h4>
                      <p className="text-sm text-muted-foreground">{model.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Why explainability matters:</span>{' '}
                  When you tell a customer success rep "Account X is at 87% churn risk", 
                  they need to know <em>why</em> before they pick up the phone.
                </p>
              </div>
            </div>
            
            <div className="glass rounded-2xl p-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-4">SHAP Feature Importance</h4>
              <div className="space-y-3">
                {[
                  { name: 'days_since_last_active', value: 0.35, color: 'bg-red-500' },
                  { name: 'usage_trend_30d', value: 0.28, color: 'bg-amber-500' },
                  { name: 'payment_failures_90d', value: 0.18, color: 'bg-orange-500' },
                  { name: 'features_used_count', value: 0.12, color: 'bg-primary' },
                  { name: 'contract_type', value: 0.07, color: 'bg-accent' },
                ].map((feature) => (
                  <div key={feature.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-mono text-muted-foreground">{feature.name}</span>
                      <span className="text-foreground">{(feature.value * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-surface-highlight rounded-full overflow-hidden">
                      <motion.div 
                        className={cn('h-full rounded-full', feature.color)}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${feature.value * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-surface-highlight">
                <p className="text-xs text-muted-foreground font-mono">
                  {`> cust_0137 risk drivers:\n  "31 days inactive (critical)\n   68% usage decline (severe)\n   3 payment failures (involuntary risk)"`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Intervention Plans */}
      <Section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <InterventionCard />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Don't Just Predict. <span className="text-gradient">Take Action.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                ChurnGuard AI doesn't stop at scores. It generates personalized 30-day 
                retention playbooks so your team knows exactly what to do next.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Identify the Risk</h4>
                    <p className="text-sm text-muted-foreground">
                      Prioritized by revenue impact. Critical accounts surface first.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Understand the Cause</h4>
                    <p className="text-sm text-muted-foreground">
                      SHAP explanations translate model features into plain English.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Take Action Fast</h4>
                    <p className="text-sm text-muted-foreground">
                      LLM-generated playbooks with specific steps and success metrics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Comparison Table Section */}
      <Section id="comparison" className="py-24 md:py-32 bg-surface/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How ChurnGuard AI <span className="text-gradient">Compares</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how we stack up against traditional churn analytics tools and enterprise platforms.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Feature</th>
                    <th className="text-center py-4 px-4">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-bold text-primary">ChurnGuard AI</span>
                        <span className="text-xs text-muted-foreground">Open Source</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-semibold text-muted-foreground">Traditional Analytics</span>
                        <span className="text-xs text-muted-foreground">Mixpanel, Amplitude</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-semibold text-muted-foreground">Enterprise Platforms</span>
                        <span className="text-xs text-muted-foreground">ChurnZero, Gainsight</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { feature: 'Price', churnguard: 'Free forever', traditional: '$1,000+/mo', enterprise: '$10,000+/mo' },
                    { feature: 'Setup Time', churnguard: '15 minutes', traditional: '1-2 weeks', enterprise: '2-3 months' },
                    { feature: 'Churn Prediction ML', churnguard: true, traditional: false, enterprise: true },
                    { feature: 'SHAP Explainability', churnguard: true, traditional: false, enterprise: 'Limited' },
                    { feature: 'LLM Intervention Plans', churnguard: true, traditional: false, enterprise: false },
                    { feature: 'Revenue-at-Risk Scoring', churnguard: true, traditional: false, enterprise: true },
                    { feature: 'Open Source', churnguard: true, traditional: false, enterprise: false },
                    { feature: 'Self-Hosted Option', churnguard: true, traditional: false, enterprise: false },
                    { feature: 'Data Ownership', churnguard: '100% yours', traditional: 'Vendor-hosted', enterprise: 'Vendor-hosted' },
                    { feature: 'Stripe Integration', churnguard: true, traditional: 'Add-on', enterprise: true },
                    { feature: 'Custom Model Training', churnguard: true, traditional: false, enterprise: 'Enterprise only' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-surface-highlight/50 transition-colors">
                      <td className="py-4 px-4 font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {typeof row.churnguard === 'boolean' ? (
                          row.churnguard ? (
                            <Check className="w-5 h-5 text-primary mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                          )
                        ) : (
                          <span className="text-primary font-medium">{row.churnguard}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {typeof row.traditional === 'boolean' ? (
                          row.traditional ? (
                            <Check className="w-5 h-5 text-muted-foreground mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                          )
                        ) : (
                          <span className="text-muted-foreground">{row.traditional}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? (
                            <Check className="w-5 h-5 text-muted-foreground mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                          )
                        ) : (
                          <span className="text-muted-foreground">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Bottom line:</span> ChurnGuard AI gives you enterprise-grade churn prediction 
                with complete transparency, for free. No sales calls required.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Open Source Section */}
      <Section id="open-source" className="py-24 md:py-32 bg-surface/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Github className="w-4 h-4" />
              Open Source
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Built for <span className="text-gradient">Builders</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              ChurnGuard AI is free, MIT-licensed, and designed to be cloned, customized, 
              and extended. No vendor lock-in. No enterprise sales calls. Just run the notebook.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">15 min</div>
                <p className="text-sm text-muted-foreground">Setup time</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">$0</div>
                <p className="text-sm text-muted-foreground">Cost forever</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">MIT</div>
                <p className="text-sm text-muted-foreground">Licensed</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/ShreyasDasari/churnguard-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
                data-testid="opensource-github-star"
              >
                <Star className="w-5 h-5" />
                <span>Star on GitHub</span>
              </a>
              <a
                href="https://colab.research.google.com/github/ShreyasDasari/churnguard-ai/blob/main/churnguard_ai.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 hover:bg-surface-highlight transition-all font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Open in Colab</span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Email Signup Section */}
      <Section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <motion.div 
                    className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Mail className="w-7 h-7 text-primary" />
                  </motion.div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-3">
                  Get Notified on Updates
                </h3>
                <p className="text-muted-foreground text-center mb-8">
                  Be the first to know about new features, model improvements, and integration releases.
                  No spam, unsubscribe anytime.
                </p>
                
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-5 py-4 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                      data-testid="email-input"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-testid="email-submit"
                  >
                    {isSubmitting ? (
                      <motion.div 
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </motion.button>
                </form>
                
                {/* Status messages */}
                {emailStatus === 'success' && (
                  <motion.div 
                    className="mt-4 p-3 rounded-lg bg-primary/20 text-primary text-sm text-center flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Check className="w-4 h-4" />
                    <span>You're subscribed! We'll keep you posted.</span>
                  </motion.div>
                )}
                {emailStatus === 'error' && (
                  <motion.div 
                    className="mt-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Please enter a valid email address.
                  </motion.div>
                )}
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Join 500+ SaaS teams already following ChurnGuard AI development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Stop Guessing. <span className="text-gradient">Start Predicting.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Know who's leaving before they do. Prioritize revenue at risk. 
              Take smarter retention action — starting today.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/ShreyasDasari/churnguard-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
                data-testid="final-cta-github"
              >
                <Star className="w-5 h-5" />
                <span>Star on GitHub</span>
              </a>
              <a
                href="https://churn-guard--shreyasdasari.replit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-8 py-4 rounded-full border border-border hover:border-primary/50 hover:bg-surface-highlight transition-all font-semibold text-lg"
                data-testid="final-cta-demo"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Logo column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <AnimatedLogo size="md" />
                <span className="text-xl font-bold">ChurnGuard AI</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm mb-6">
                Free, open-source churn prediction for SaaS. Plug in your data and 
                know who's leaving before they do.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/ShreyasDasari/churnguard-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-surface-highlight transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#models" className="hover:text-foreground transition-colors">Models</a></li>
                <li>
                  <a 
                    href="https://churn-guard--shreyasdasari.replit.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Demo
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a 
                    href="https://github.com/ShreyasDasari/churnguard-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a 
                    href="https://colab.research.google.com/github/ShreyasDasari/churnguard-ai/blob/main/churnguard_ai.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Open in Colab
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/ShreyasDasari/churnguard-ai#readme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Footer bottom */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 ChurnGuard AI. MIT License.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <span className="text-red-500">♥</span>
              <span>for SaaS teams</span>
            </div>
          </div>
          
          {/* Ambient footer logo */}
          <div className="flex justify-center mt-12 opacity-30">
            <FooterLogo />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
