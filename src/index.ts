/**
 * ABHA SDK - V3 API
 *
 * ABDM (Ayushman Bharat Digital Mission) ABHA integration for Node.js
 * Based on ABHA V3 APIs SOP V1.2 (October 2024)
 *
 * @packageDocumentation
 */

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Basic types
  ABHAGender,
  ABHANumber,
  ABHAAddress,
  ABHAEnvironment,
  AuthMethod,
  KYCDocumentType,
  ABHAType,
  ABHAStatus,
  Scope,
  LoginHint,
  OTPSystem,

  // Configuration
  ABHAConfig,

  // Authentication
  ABHASession,
  ABHATokens,
  ABHARequestHeaders,

  // OTP Flow
  OTPGenerateRequest,
  OTPGenerateResponse,
  OTPVerifyRequest,
  OTPVerifyResponse,
  MobileLoginResponse,
  ABHAAccountSummary,
  AuthResultResponse,

  // Enrollment
  EnrollmentRequest,

  // Profile
  ABHAProfile,
  ABHAProfileSummary,

  // Search
  ABHASearchResult,
  ABHAAddressSearchResult,
  ABHAAddressCreateResponse,

  // Encryption
  PublicKeyResponse,

  // API Responses
  ABHAApiResponse,
  ABHAApiError,

  // Card
  ABHACardResponse,
} from './types'

// =============================================================================
// CONSTANTS
// =============================================================================

export {
  // URLs
  ABDM_BASE_URLS,
  ABDM_SESSION_URLS,
  ABDM_PHR_URLS,

  // Endpoints
  API_ENDPOINTS,

  // Scopes, Hints, Systems
  SCOPES,
  LOGIN_HINTS,
  OTP_SYSTEMS,
  AUTH_METHODS,

  // Consent
  CONSENT,

  // Validation
  VALIDATION_PATTERNS,
  VALIDATION_MESSAGES,

  // Defaults
  DEFAULTS,

  // Errors
  ERROR_CODES,

  // Encryption
  ENCRYPTION,
} from './constants'

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

export {
  // ABHA Number
  isValidABHANumber,
  isValidABHANumberRaw,
  formatABHANumber,
  parseABHANumber,
  maskABHANumber,

  // ABHA Address
  isValidABHAAddress,
  formatABHAAddress,
  parseABHAAddress,
  getEnvironmentFromAddress,

  // Mobile
  isValidMobile,
  formatMobile,
  maskMobile,
  cleanMobile,

  // Aadhaar
  isValidAadhaar,
  maskAadhaar,
  formatAadhaar,

  // Other
  isValidPinCode,
  isValidOTP,

  // Gender
  toABHAGender,
  fromABHAGender,
  getGenderDisplay,

  // Name
  formatABHAName,

  // Date
  parseABHADate,
  toABHADate,
  calculateAge,

  // Messages
  abhaValidationMessages,
} from './validation'

export type { SexEnum } from './validation'
