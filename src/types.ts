import React from 'react';

/**
 * Supported contact & social channels
 */
export type SocialPlatformId = 
  | 'whatsapp'
  | 'instagram'
  | 'twitter'
  | 'github'
  | 'linkedin'
  | 'leetcode'
  | 'email';

/**
 * Raw configuration schema for developer contact points
 */
export interface ContactConfig {
  EMAIL: string;
  GITHUB_URL: string;
  LINKEDIN_URL: string;
  LEETCODE_URL: string;
  RESUME_URL: string;
  INSTAGRAM_URL: string;
  WHATSAPP_URL: string;
  TWITTER_URL: string;
}

/**
 * Validated, secure representation of a social or contact action
 */
export interface SocialLinkItem {
  id: SocialPlatformId;
  label: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  ariaLabel: string;
  brandColorClass: string;
  hoverBorderClass: string;
  hoverTextClass: string;
  badgeBgClass: string;
  isExternal: boolean;
}

/**
 * Core developer identity & narrative
 */
export interface DeveloperInfo {
  name: string;
  headline: string;
  identity: string[];
  statusLine: string;
  heroText: string;
  about: {
    paragraphs: string[];
    focusAreas: { title: string; description: string }[];
  };
}

/**
 * Technical skill definition
 */
export interface SkillItem {
  name: string;
  tag?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

/**
 * Project definition
 */
export interface ProjectItem {
  id: string;
  title: string;
  fullName: string;
  description: string;
  problem: string;
  solution: string;
  technology: string;
  tags: string[];
  projectUrl: string;
  githubUrl: string;
  featured: boolean;
  isPlaceholder: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
}

/**
 * DSA & problem solving items
 */
export interface DSATopic {
  name: string;
  count: number;
  description: string;
  color: string;
}

export interface PracticedProblem {
  title: string;
  platform: 'LeetCode' | 'GeeksforGeeks' | 'Custom';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  description: string;
  url: string;
}

export interface CurrentlyExploringItem {
  title: string;
  description: string;
  badge: string;
}

/**
 * Validation result types
 */
export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  field: string;
  message: string;
  severity: ValidationSeverity;
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
}
