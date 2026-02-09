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
  production: 'https://phr.abdm.gov.in/api/phr/web/v3',
}

// =============================================================================
// V3 API ENDPOINTS
// =============================================================================

export const API_ENDPOINTS = {
  // =========================================================================
  // Authentication (via gateway)
  // =========================================================================
  SESSION: '/v3/sessions',

  // Public Key for Encryption
  PUBLIC_CERTIFICATE: '/v3/profile/public/certificate',

  // =========================================================================
  // Enrollment - ABHA Creation
  // =========================================================================
  ENROLLMENT_REQUEST_OTP: '/v3/enrollment/request/otp',
  ENROLLMENT_RESEND_OTP: '/v3/enrollment/request/otp',
  ENROLLMENT_ENROL_AADHAAR: '/v3/enrollment/enrol/byAadhaar',
  ENROLLMENT_ENROL_DL: '/v3/enrollment/enrol/byDl',
  ENROLLMENT_AUTH_BY_ABDM: '/v3/enrollment/auth/byAbdm',
  ENROLLMENT_SUGGESTION: '/v3/enrollment/enrol/suggestion',

  // =========================================================================
  // Login/Verification
  // =========================================================================
  LOGIN_REQUEST_OTP: '/v3/profile/login/request/otp',
  LOGIN_VERIFY: '/v3/profile/login/verify',

  // =========================================================================
  // Profile
  // =========================================================================
  PROFILE_ACCOUNT: '/v3/profile/account',
  PROFILE_PHOTO: '/v3/profile/account/photo',

  // =========================================================================
  // ABHA Card & QR Code
  // =========================================================================
  ABHA_CARD: '/v3/profile/account/abha-card',
  ABHA_CARD_PNG: '/v3/profile/account/abha-card',
  ABHA_CARD_PDF: '/v3/profile/account/phr-card',
  QR_CODE: '/v3/profile/account/qrCode',

  // =========================================================================
  // ABHA Address
  // =========================================================================
  PHR_ADDRESS_SUGGESTIONS: '/v3/enrollment/abha-address/suggestions',
  PHR_ADDRESS_CREATE: '/v3/enrollment/abha-address/create',
  PHR_ADDRESS_CHECK: '/v3/profile/phrAddress/search',

  // =========================================================================
  // Mobile Verification (during enrollment)
  // =========================================================================
  MOBILE_SEND_OTP: '/v3/enrollment/request/otp',
  MOBILE_VERIFY_OTP: '/v3/enrollment/auth/byAbdm',

  // =========================================================================
  // Email Verification
  // =========================================================================
  EMAIL_SEND_LINK: '/v3/profile/account/request/emailVerificationLink',
  EMAIL_SEND_OTP: '/v3/profile/email/request/otp',
  EMAIL_VERIFY_OTP: '/v3/profile/email/verify',

  // =========================================================================
  // Update Profile (Mobile/Email)
  // =========================================================================
  PROFILE_REQUEST_OTP: '/v3/profile/account/request/otp',
  PROFILE_VERIFY: '/v3/profile/account/verify',

  // =========================================================================
  // Delete/Deactivate/Reactivate ABHA
  // =========================================================================
  /** Request OTP for delete/deactivate/reactivate */
  ACCOUNT_REQUEST_OTP: '/v3/profile/account/request/otp',
  /** Verify OTP for delete/deactivate/reactivate */
  ACCOUNT_VERIFY: '/v3/profile/account/verify',

  // =========================================================================
  // Re-KYC
  // =========================================================================
  RE_KYC_REQUEST_OTP: '/v3/profile/account/request/otp',
  RE_KYC_VERIFY: '/v3/profile/account/verify',

  // =========================================================================
  // Benefit APIs (Government Integrators)
  // =========================================================================
  /** Link/Delink ABHA with benefit name */
  BENEFIT_LINK_DELINK: '/v3/profile/benefit/linkAndDelink',
  /** Search benefit details */
  BENEFIT_SEARCH: '/v3/profile/benefit/search',
  /** Get benefit details by ABHA number */
  BENEFIT_BY_ABHA: '/v3/profile/benefit/abha', // Append /{healthIdNumber}

  // =========================================================================
  // Find ABHA APIs
  // =========================================================================
  /** Search ABHA using mobile */
  ABHA_SEARCH: '/v3/profile/account/abha/search',

  // =========================================================================
  // Child ABHA APIs
  // =========================================================================
  /** Create child ABHA - uses same as enrollment */
  CHILD_ABHA_CREATE: '/v3/enrollment/enrol/byAadhaar',
  /** Get children under parent account */
  CHILD_ABHA_LIST: '/v3/enrollment/profile/children',
  /** Update child ABHA */
  CHILD_ABHA_UPDATE: '/api/abha/v3/profile/account',

  // =========================================================================
  // PHR/ABHA Address Verification (uses ABDM_PHR_URLS base!)
  // =========================================================================
  /** Search auth methods for ABHA address */
  PHR_LOGIN_SEARCH: '/login/abha/search',
  /** Request OTP for ABHA address login */
  PHR_LOGIN_REQUEST_OTP: '/login/abha/request/otp',
  /** Verify OTP for ABHA address login */
  PHR_LOGIN_VERIFY: '/login/abha/verify',
  /** Get ABHA address profile */
  PHR_PROFILE: '/login/profile/abha-profile',
  /** Get ABHA address card (Sandbox: /abha/phr-card, Prod: /login/profile/abha/phr-card) */
  PHR_CARD: '/abha/phr-card',
  /** Get QR code for PHR (Sandbox: /login/profile/abha/qrcode, Prod: /login/profile/abha/qr-code) */
  PHR_QR_CODE: '/login/profile/abha/qrcode',

  // =========================================================================
  // QR Code Login
  // =========================================================================
  QR_CODE_LOGIN: '/v3/profile/login/phr/qrCode',
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
  ABHA_ADDRESS_LOGIN: 'abha-address-login',

  // Verification
  AADHAAR_VERIFY: 'aadhaar-verify',
  MOBILE_VERIFY: 'mobile-verify',
  EMAIL_VERIFY: 'email-verify',
  EMAIL_LINK_VERIFY: 'email-link-verify',
  PASSWORD_VERIFY: 'password-verify',

  // Password
  CHANGE_PASSWORD: 'change-password',

  // Re-KYC
  RE_KYC: 're-kyc',

  // Delete/Deactivate/Reactivate
  DELETE: 'delete',
  DEACTIVATE: 'de-activate',
  REACTIVATE: 're-activate',

  // Benefit APIs
  LINK: 'link',
  DELINK: 'de-link',
  SEARCH: 'search',

  // Find ABHA
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
  /** Used in Find ABHA flow after mobile search */
  INDEX: 'index',
  /** Used in Benefit APIs for XML UID based operations */
  XML_UID: 'xmlUid',
  /** Used in PHR/ABHA Address verification */
  ABHA_ADDRESS: 'abha-address',
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
  /** Biometric authentication (fingerprint) */
  BIO: 'bio',
  /** Child ABHA creation */
  CHILD: 'child',
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

// =============================================================================
// REQUEST HEADERS (V3)
// =============================================================================

export const HEADERS = {
  /** Unique UUID for end-to-end request tracking */
  REQUEST_ID: 'REQUEST-ID',
  /** ISO 8601 timestamp when request was initiated */
  TIMESTAMP: 'TIMESTAMP',
  /** Bearer token from session API */
  AUTHORIZATION: 'Authorization',
  /** User X-token after login (Bearer format) */
  X_TOKEN: 'X-token',
  /** T-token for mobile login step 3 (valid 5 minutes) */
  T_TOKEN: 'T-token',
  /** Benefit name header for government integrators */
  BENEFIT_NAME: 'BENEFIT-NAME',
  /** Transaction ID header */
  TRANSACTION_ID: 'Transaction_Id',
} as const

// =============================================================================
// AUTH METHODS (Profile Response Values)
// =============================================================================

/** Auth methods returned in profile responses */
export const AUTH_METHODS_RESPONSE = {
  AADHAAR_BIO: 'AADHAAR_BIO',
  AADHAAR_OTP: 'AADHAAR_OTP',
  MOBILE_OTP: 'MOBILE_OTP',
  EMAIL_OTP: 'EMAIL_OTP',
  PASSWORD: 'PASSWORD',
  DEMOGRAPHICS: 'DEMOGRAPHICS',
} as const

// =============================================================================
// ACCOUNT STATUS
// =============================================================================

export const ACCOUNT_STATUS = {
  ACTIVE: 'ACTIVE',
  DEACTIVATED: 'DEACTIVATED',
  DELETED: 'DELETED',
  INACTIVE: 'INACTIVE',
} as const

// =============================================================================
// VERIFICATION STATUS
// =============================================================================

export const VERIFICATION_STATUS = {
  VERIFIED: 'VERIFIED',
  PROVISIONAL: 'PROVISIONAL',
  PENDING: 'PENDING',
} as const

// =============================================================================
// VERIFICATION TYPE
// =============================================================================

export const VERIFICATION_TYPE = {
  AADHAAR: 'AADHAAR',
  DRIVING_LICENCE: 'DRIVING_LICENCE',
  CHILD_ABHA: 'CHILD_ABHA',
} as const

// =============================================================================
// ABHA TYPE
// =============================================================================

export const ABHA_TYPE = {
  STANDARD: 'STANDARD',
  CHILD: 'CHILD',
} as const

// =============================================================================
// GENDER
// =============================================================================

export const GENDER = {
  MALE: 'M',
  FEMALE: 'F',
  OTHER: 'O',
} as const

// =============================================================================
// AUTH RESULT
// =============================================================================

export const AUTH_RESULT = {
  SUCCESS: 'success',
  FAILURE: 'failure',
} as const

// =============================================================================
// DOCUMENT TYPES (for DL flow)
// =============================================================================

export const DOCUMENT_TYPES = {
  DRIVING_LICENCE: 'DRIVING_LICENCE',
} as const

// =============================================================================
// SCOPE COMBINATIONS (Common usage patterns)
// =============================================================================

export const SCOPE_COMBINATIONS = {
  /** Login via Aadhaar OTP */
  LOGIN_AADHAAR: ['abha-login', 'aadhaar-verify'] as const,
  /** Login via Mobile OTP */
  LOGIN_MOBILE: ['abha-login', 'mobile-verify'] as const,
  /** Login via ABHA Address */
  LOGIN_ABHA_ADDRESS: ['abha-address-login', 'mobile-verify'] as const,
  /** Update mobile number */
  UPDATE_MOBILE: ['abha-profile', 'mobile-verify'] as const,
  /** Update email via link */
  UPDATE_EMAIL_LINK: ['abha-profile', 'email-link-verify'] as const,
  /** Delete ABHA */
  DELETE: ['abha-profile', 'delete'] as const,
  /** Deactivate ABHA */
  DEACTIVATE: ['abha-profile', 'de-activate'] as const,
  /** Reactivate ABHA */
  REACTIVATE: ['abha-login', 'mobile-verify', 're-activate'] as const,
  /** Re-KYC */
  RE_KYC: ['abha-profile', 're-kyc'] as const,
  /** Find ABHA via mobile */
  FIND_ABHA: ['abha-login', 'search-abha', 'mobile-verify'] as const,
} as const

// =============================================================================
// TOKEN EXPIRY VALUES (from API responses)
// =============================================================================

export const TOKEN_EXPIRY = {
  /** Access token validity in seconds (30 minutes) */
  ACCESS_TOKEN: 1800,
  /** Refresh token validity in seconds (15 days) */
  REFRESH_TOKEN: 1296000,
  /** Transfer token validity in seconds (5 minutes) - mobile login step 2 */
  TRANSFER_TOKEN: 300,
} as const
