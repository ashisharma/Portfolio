import { 
  CONTACT_CONFIG, 
  DEVELOPER_INFO, 
  PROJECTS, 
  SKILL_CATEGORIES, 
  PRACTICED_PROBLEMS 
} from '../data/portfolioData';
import { ValidationIssue, ValidationResult } from '../types';
import { isValidEmail, isSafeUrl, isNonEmptyString } from './security';

/**
 * Validates the developer contact configurations.
 */
export function validateContactConfig(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // 1. Email validation
  if (!isNonEmptyString(CONTACT_CONFIG.EMAIL)) {
    issues.push({
      field: 'EMAIL',
      message: 'Email address is empty. The contact form and email links will be hidden.',
      severity: 'warning',
    });
  } else if (!isValidEmail(CONTACT_CONFIG.EMAIL)) {
    issues.push({
      field: 'EMAIL',
      message: `Email "${CONTACT_CONFIG.EMAIL}" is not a valid RFC-compliant email address.`,
      severity: 'error',
    });
  }

  // 2. URL fields validation
  const urlFields: Array<{ key: keyof typeof CONTACT_CONFIG; label: string }> = [
    { key: 'GITHUB_URL', label: 'GitHub URL' },
    { key: 'LINKEDIN_URL', label: 'LinkedIn URL' },
    { key: 'LEETCODE_URL', label: 'LeetCode URL' },
    { key: 'RESUME_URL', label: 'Resume URL' },
    { key: 'INSTAGRAM_URL', label: 'Instagram URL' },
    { key: 'WHATSAPP_URL', label: 'WhatsApp URL' },
    { key: 'TWITTER_URL', label: 'Twitter URL' },
  ];

  for (const { key, label } of urlFields) {
    const value = CONTACT_CONFIG[key];
    if (isNonEmptyString(value) && !isSafeUrl(value)) {
      issues.push({
        field: key,
        message: `${label} contains an insecure, unsupported, or malformed URL: "${value}"`,
        severity: 'error',
      });
    }
  }

  return issues;
}

/**
 * Validates projects list to ensure correct schema and uniqueness.
 */
export function validateProjects(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seenIds = new Set<string>();

  for (const project of PROJECTS) {
    // Unique ID check
    if (!project.id || !project.id.trim()) {
      issues.push({
        field: 'project.id',
        message: 'A project item has a missing or empty ID.',
        severity: 'error',
      });
    } else if (seenIds.has(project.id.toLowerCase())) {
      issues.push({
        field: `project.${project.id}`,
        message: `Duplicate project ID found: "${project.id}". Each project must have a unique ID.`,
        severity: 'error',
      });
    } else {
      seenIds.add(project.id.toLowerCase());
    }

    // Required title & description
    if (!isNonEmptyString(project.title)) {
      issues.push({
        field: `project.${project.id}.title`,
        message: `Project ${project.id} is missing a title.`,
        severity: 'error',
      });
    }

    if (!isNonEmptyString(project.description)) {
      issues.push({
        field: `project.${project.id}.description`,
        message: `Project ${project.id} is missing a description.`,
        severity: 'warning',
      });
    }

    // URL validation if present
    if (isNonEmptyString(project.githubUrl) && !isSafeUrl(project.githubUrl)) {
      issues.push({
        field: `project.${project.id}.githubUrl`,
        message: `Project ${project.id} has an unsafe GitHub URL: "${project.githubUrl}"`,
        severity: 'error',
      });
    }

    if (isNonEmptyString(project.projectUrl) && !isSafeUrl(project.projectUrl)) {
      issues.push({
        field: `project.${project.id}.projectUrl`,
        message: `Project ${project.id} has an unsafe Project URL: "${project.projectUrl}"`,
        severity: 'error',
      });
    }
  }

  return issues;
}

/**
 * Validates entire portfolio dataset and generates a comprehensive report.
 */
export function validatePortfolioData(): ValidationResult {
  const issues: ValidationIssue[] = [
    ...validateContactConfig(),
    ...validateProjects(),
  ];

  const hasErrors = issues.some((i) => i.severity === 'error');

  return {
    isValid: !hasErrors,
    issues,
  };
}
