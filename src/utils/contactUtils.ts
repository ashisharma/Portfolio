import React from 'react';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Terminal, 
  Mail, 
  Phone
} from 'lucide-react';
import { CONTACT_CONFIG } from '../data/portfolioData';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { SocialLinkItem, SocialPlatformId } from '../types';
import { isSafeUrl, sanitizeUrl, isValidEmail, getSecureLinkProps } from './security';

/**
 * Metadata definition for supported social & contact platforms
 */
interface PlatformMeta {
  id: SocialPlatformId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  ariaLabel: string;
  hoverBorderClass: string;
  hoverTextClass: string;
  brandColorClass: string;
  badgeBgClass: string;
}

const PLATFORM_DEFINITIONS: Record<SocialPlatformId, PlatformMeta> = {
  whatsapp: {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: WhatsAppIcon,
    ariaLabel: 'Chat on WhatsApp',
    hoverBorderClass: 'hover:border-emerald-400',
    hoverTextClass: 'hover:text-emerald-300',
    brandColorClass: 'text-emerald-400',
    badgeBgClass: 'bg-emerald-950/20 border-emerald-500/30',
  },
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    icon: Instagram,
    ariaLabel: 'Instagram Profile',
    hoverBorderClass: 'hover:border-pink-400',
    hoverTextClass: 'hover:text-pink-300',
    brandColorClass: 'text-pink-400',
    badgeBgClass: 'bg-pink-950/20 border-pink-500/30',
  },
  twitter: {
    id: 'twitter',
    label: 'Twitter / X',
    icon: Twitter,
    ariaLabel: 'Twitter / X Profile',
    hoverBorderClass: 'hover:border-sky-400',
    hoverTextClass: 'hover:text-sky-300',
    brandColorClass: 'text-sky-400',
    badgeBgClass: 'bg-sky-950/20 border-sky-500/30',
  },
  github: {
    id: 'github',
    label: 'GitHub',
    icon: Github,
    ariaLabel: 'GitHub Profile',
    hoverBorderClass: 'hover:border-slate-500',
    hoverTextClass: 'hover:text-white',
    brandColorClass: 'text-slate-300',
    badgeBgClass: 'bg-slate-900/80 border-slate-700/80',
  },
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
    ariaLabel: 'LinkedIn Profile',
    hoverBorderClass: 'hover:border-blue-400',
    hoverTextClass: 'hover:text-blue-300',
    brandColorClass: 'text-blue-400',
    badgeBgClass: 'bg-blue-950/20 border-blue-500/30',
  },
  leetcode: {
    id: 'leetcode',
    label: 'LeetCode',
    icon: Terminal,
    ariaLabel: 'LeetCode Profile',
    hoverBorderClass: 'hover:border-amber-400',
    hoverTextClass: 'hover:text-amber-300',
    brandColorClass: 'text-amber-400',
    badgeBgClass: 'bg-amber-950/20 border-amber-500/30',
  },
  email: {
    id: 'email',
    label: 'Email',
    icon: Mail,
    ariaLabel: 'Send Direct Email',
    hoverBorderClass: 'hover:border-emerald-400',
    hoverTextClass: 'hover:text-emerald-300',
    brandColorClass: 'text-emerald-400',
    badgeBgClass: 'bg-emerald-950/20 border-emerald-500/30',
  },
};

/**
 * Returns a verified, safe email or null if invalid/unset.
 */
export function getSafeEmail(): string | null {
  const email = CONTACT_CONFIG.EMAIL;
  if (isValidEmail(email)) {
    return email.trim();
  }
  return null;
}

/**
 * Retrieves all active, validated social channels based on current config.
 * Empty or unsafe URLs are automatically omitted to prevent broken UI links and vulnerabilities.
 */
export function getActiveSocialChannels(): SocialLinkItem[] {
  const channels: { id: SocialPlatformId; rawUrl: string }[] = [
    { id: 'whatsapp', rawUrl: CONTACT_CONFIG.WHATSAPP_URL },
    { id: 'instagram', rawUrl: CONTACT_CONFIG.INSTAGRAM_URL },
    { id: 'twitter', rawUrl: CONTACT_CONFIG.TWITTER_URL },
    { id: 'github', rawUrl: CONTACT_CONFIG.GITHUB_URL },
    { id: 'linkedin', rawUrl: CONTACT_CONFIG.LINKEDIN_URL },
    { id: 'leetcode', rawUrl: CONTACT_CONFIG.LEETCODE_URL },
  ];

  const result: SocialLinkItem[] = [];

  for (const { id, rawUrl } of channels) {
    if (isSafeUrl(rawUrl)) {
      const meta = PLATFORM_DEFINITIONS[id];
      result.push({
        ...meta,
        url: sanitizeUrl(rawUrl),
        isExternal: true,
      });
    }
  }

  return result;
}

/**
 * Checks if a specific channel is active and safe.
 */
export function isChannelActive(id: SocialPlatformId): boolean {
  switch (id) {
    case 'whatsapp':
      return isSafeUrl(CONTACT_CONFIG.WHATSAPP_URL);
    case 'instagram':
      return isSafeUrl(CONTACT_CONFIG.INSTAGRAM_URL);
    case 'twitter':
      return isSafeUrl(CONTACT_CONFIG.TWITTER_URL);
    case 'github':
      return isSafeUrl(CONTACT_CONFIG.GITHUB_URL);
    case 'linkedin':
      return isSafeUrl(CONTACT_CONFIG.LINKEDIN_URL);
    case 'leetcode':
      return isSafeUrl(CONTACT_CONFIG.LEETCODE_URL);
    case 'email':
      return isValidEmail(CONTACT_CONFIG.EMAIL);
    default:
      return false;
  }
}

/**
 * Safe helper for Resume URL
 */
export function getSafeResumeUrl(): string | null {
  if (isSafeUrl(CONTACT_CONFIG.RESUME_URL)) {
    return sanitizeUrl(CONTACT_CONFIG.RESUME_URL);
  }
  return null;
}
