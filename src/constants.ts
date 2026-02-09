/**
 * ABHA SDK Constants - V3 API
 * Based on ABDM ABHA V3 APIs SOP V1.2 (October 2024)
 */

import type { ABHAEnvironment } from './types'

// =============================================================================
// API BASE URLS (V3)
// =============================================================================

export const ABDM_BASE_URLS: Record<ABHAEnvironment, string> = {
  sandbox: 'https://abhasbx.abdm.gov.in/abha/api',
  production: 'https://abha.abdm.gov.in/api/abha',
}

// Session/Gateway URLs (for authentication)
export const ABDM_SESSION_URLS: Record<ABHAEnvironment, string> = {
  sandbox: 'https://dev.abdm.gov.in/api/hiecm/gateway/v3/sessions',
  production: 'https://live.abdm.gov.in/api/hiecm/gateway/v3/sessions',
}

// PHR/ABHA Address Verification URLs (DIFFERENT from main ABHA APIs!)
export const ABDM_PHR_URLS: Record<ABHAEnvironment, string> = {
  sandbox: 'https://abhasbx.abdm.gov.in/abha/api/v3/phr/web',
  production: 'https://phr.abdm.gov.in/api/phr/web/v3/api',
}

// =============================================================================
// V3 API ENDPOINTS
// =============================================================================

export const API_ENDPOINTS = {
  // Authentication (via gateway)
  SESSION: '/v3/sessions',

  // Public Key for Encryption
  PUBLIC_CERTIFICATE: '/v3/profile/public/certificate',

  // Enrollment - ABHA Creation
  ENROLLMENT_REQUEST_OTP: '/v3/enrollment/request/otp',
  ENROLLMENT_RESEND_OTP: '/v3/enrollment/request/otp',
  ENROLLMENT_ENROL_AADHAAR: '/v3/enrollment/enrol/byAadhar',
  ENROLLMENT_ENROL_DL: '/v3/enrollment/enrol/byDl',
  ENROLLMENT_AUTH_BY_ABDM: '/v3/enrollment/auth/byAbdm',
  ENROLLMENT_SUGGESTION: '/v3/enrollment/enrol/suggestion',

  // Login/Verification
  LOGIN_REQUEST_OTP: '/v3/profile/login/request/otp',
  LOGIN_VERIFY: '/v3/profile/login/verify',

  // Profile
  PROFILE_ACCOUNT: '/v3/profile/account',
  PROFILE_PHOTO: '/v3/profile/account/photo',

  // ABHA Card & QR Code
  ABHA_CARD: '/v3/profile/account/abha-card',
  ABHA_CARD_PNG: '/v3/profile/account/abha-card',
  ABHA_CARD_PDF: '/v3/profile/account/phr-card',
  QR_CODE: '/v3/profile/account/qrCode',

  // ABHA Address
  PHR_ADDRESS_SUGGESTIONS: '/v3/enrollment/abha-address/suggestions',
  PHR_ADDRESS_CREATE: '/v3/enrollment/abha-address/create',
  PHR_ADDRESS_CHECK: '/v3/profile/phrAddress/search',

  // Mobile Verification (during enrollment)
  MOBILE_SEND_OTP: '/v3/enrollment/request/otp',
  MOBILE_VERIFY_OTP: '/v3/enrollment/auth/byAbdm',

  // Email Verification
  EMAIL_SEND_LINK: '/v3/profile/account/request/emailVerificationLink',
  EMAIL_SEND_OTP: '/v3/profile/email/request/otp',
  EMAIL_VERIFY_OTP: '/v3/profile/email/verify',

  // Update Profile
  UPDATE_MOBILE: '/v3/profile/mobile/request/otp',
  UPDATE_EMAIL: '/v3/profile/email/request/otp',

  // QR Code Login
  QR_CODE_LOGIN: '/v3/profile/login/phr/qrCode',

  // PHR/ABHA Address Verification (uses different base URL!)
  PHR_LOGIN_SEARCH: '/login/abha/search',
} as const

// =============================================================================
// SCOPES (V3)
// =============================================================================

export const SCOPES = {
  // Enrollment
  ABHA_ENROL: 'abha-enrol',
  DL_FLOW: 'dl-flow',

  // Login/Profile
  ABHA_LOGIN: 'abha-login',
  ABHA_PROFILE: 'abha-profile',

  // Verification
  AADHAAR_VERIFY: 'aadhaar-verify',
  MOBILE_VERIFY: 'mobile-verify',
  EMAIL_VERIFY: 'email-verify',
  EMAIL_LINK_VERIFY: 'email-link-verify',
  PASSWORD_VERIFY: 'password-verify',

  // Other
  CHANGE_PASSWORD: 'change-password',
  RE_KYC: 're-kyc',
  SEARCH_ABHA: 'search-abha',
} as const

// =============================================================================
// LOGIN HINTS (V3)
// =============================================================================

export const LOGIN_HINTS = {
  ABHA_NUMBER: 'abha-number',
  MOBILE: 'mobile',
  EMAIL: 'email',
  AADHAAR: 'aadhaar',
  PASSWORD: 'password',
} as const

// =============================================================================
// OTP SYSTEMS (V3)
// =============================================================================

export const OTP_SYSTEMS = {
  /** OTP sent to Aadhaar-linked mobile */
  AADHAAR: 'aadhaar',
  /** OTP sent to ABHA-linked mobile */
  ABDM: 'abdm',
} as const

// =============================================================================
// AUTH METHODS (V3)
// =============================================================================

export const AUTH_METHODS = {
  OTP: 'otp',
  PI: 'pi',  // Personal Identity
  PASSWORD: 'password',
} as const

// =============================================================================
// CONSENT (V3)
// =============================================================================

export const CONSENT = {
  ABHA_ENROLLMENT: {
    code: 'abha-enrollment',
    version: '1.4',
  },
} as const

// =============================================================================
// VALIDATION PATTERNS
// =============================================================================

export const VALIDATION_PATTERNS = {
  /** ABHA Number: XX-XXXX-XXXX-XXXX (2-4-4-4 digits) */
  ABHA_NUMBER: /^\d{2}-\d{4}-\d{4}-\d{4}$/,

  /** ABHA Number raw (14 digits without hyphens) */
  ABHA_NUMBER_RAW: /^\d{14}$/,

  /** ABHA Address: alphanumeric/dot/underscore/hyphen @ abdm or sbx */
  ABHA_ADDRESS: /^[a-zA-Z0-9._-]{3,32}@(abdm|sbx)$/i,

  /** Indian mobile number (10 digits starting with 6-9) */
  MOBILE: /^[6-9]\d{9}$/,

  /** Aadhaar number (12 digits) */
  AADHAAR: /^\d{12}$/,

  /** PIN code (6 digits) */
  PIN_CODE: /^\d{6}$/,

  /** OTP (6 digits) */
  OTP: /^\d{6}$/,
} as const

// =============================================================================
// DEFAULTS
// =============================================================================

export const DEFAULTS = {
  /** Request timeout in milliseconds */
  TIMEOUT: 30000,

  /** Session token validity in seconds */
  TOKEN_EXPIRY: 1200,  // 20 minutes

  /** Refresh token validity in seconds */
  REFRESH_TOKEN_EXPIRY: 1800,  // 30 minutes

  /** Token refresh buffer (refresh before expiry) */
  TOKEN_REFRESH_BUFFER_SECONDS: 60,

  /** Maximum retries for transient failures */
  MAX_RETRIES: 3,

  /** Retry delay in milliseconds */
  RETRY_DELAY: 1000,
} as const

// =============================================================================
// ERROR CODES
// =============================================================================

export const ERROR_CODES = {
  // Authentication errors
  AUTH_FAILED: 'ABHA_AUTH_FAILED',
  SESSION_EXPIRED: 'ABHA_SESSION_EXPIRED',
  INVALID_CREDENTIALS: 'ABHA_INVALID_CREDENTIALS',

  // Validation errors
  INVALID_ABHA_NUMBER: 'ABHA_INVALID_NUMBER',
  INVALID_ABHA_ADDRESS: 'ABHA_INVALID_ADDRESS',
  INVALID_MOBILE: 'ABHA_INVALID_MOBILE',
  INVALID_AADHAAR: 'ABHA_INVALID_AADHAAR',
  INVALID_OTP: 'ABHA_INVALID_OTP',

  // OTP errors
  OTP_EXPIRED: 'ABHA_OTP_EXPIRED',
  OTP_ATTEMPTS_EXCEEDED: 'ABHA_OTP_ATTEMPTS_EXCEEDED',
  OTP_GENERATION_FAILED: 'ABHA_OTP_GENERATION_FAILED',

  // Profile errors
  PROFILE_NOT_FOUND: 'ABHA_PROFILE_NOT_FOUND',
  PROFILE_FETCH_FAILED: 'ABHA_PROFILE_FETCH_FAILED',
  ABHA_ALREADY_EXISTS: 'ABHA_ALREADY_EXISTS',

  // Network errors
  NETWORK_ERROR: 'ABHA_NETWORK_ERROR',
  TIMEOUT: 'ABHA_TIMEOUT',
  SERVICE_UNAVAILABLE: 'ABHA_SERVICE_UNAVAILABLE',

  // Encryption errors
  ENCRYPTION_FAILED: 'ABHA_ENCRYPTION_FAILED',
  PUBLIC_KEY_FETCH_FAILED: 'ABHA_PUBLIC_KEY_FETCH_FAILED',

  // Generic
  UNKNOWN_ERROR: 'ABHA_UNKNOWN_ERROR',
} as const

// =============================================================================
// VALIDATION MESSAGES
// =============================================================================

export const VALIDATION_MESSAGES = {
  ABHA_NUMBER: 'Please enter a valid ABHA number (XX-XXXX-XXXX-XXXX format)',
  ABHA_ADDRESS: 'Please enter a valid ABHA address (username@abdm format)',
  MOBILE: 'Please enter a valid 10-digit mobile number',
  AADHAAR: 'Please enter a valid 12-digit Aadhaar number',
  PIN_CODE: 'Please enter a valid 6-digit PIN code',
  OTP: 'Please enter a valid 6-digit OTP',
  REQUIRED: (field: string) => `${field} is required`,
} as const

// =============================================================================
// ENCRYPTION
// =============================================================================

export const ENCRYPTION = {
  ALGORITHM: 'RSA/ECB/OAEPWithSHA-1AndMGF1Padding',
  KEY_SIZE: 4096,
} as const
