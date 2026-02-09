/**
 * ABHA SDK Types - V3 API
 * Based on ABDM ABHA V3 APIs SOP V1.2 (October 2024)
 */

// =============================================================================
// BASIC TYPES
// =============================================================================

/** ABHA Gender codes as used by ABDM */
export type ABHAGender = 'M' | 'F' | 'O'

/** ABHA Number format: XX-XXXX-XXXX-XXXX (14 digits with hyphens) */
export type ABHANumber = string

/** ABHA Address format: username@abdm or username@sbx */
export type ABHAAddress = string

/** Environment for ABDM APIs */
export type ABHAEnvironment = 'sandbox' | 'production'

/** Verification/Auth methods */
export type AuthMethod = 'otp' | 'pi' | 'password'

/** KYC document types */
export type KYCDocumentType = 'AADHAAR' | 'DRIVING_LICENSE' | 'PAN' | 'PASSPORT'

/** ABHA account type */
export type ABHAType = 'STANDARD' | 'CHILD'

/** ABHA account status */
export type ABHAStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED' | 'DEACTIVATED'

// =============================================================================
// SCOPES (V3)
// =============================================================================

export type Scope =
  | 'abha-enrol'
  | 'abha-login'
  | 'abha-profile'
  | 'aadhaar-verify'
  | 'mobile-verify'
  | 'email-verify'
  | 'email-link-verify'
  | 'password-verify'
  | 'change-password'
  | 're-kyc'
  | 'dl-flow'
  | 'search-abha'

// =============================================================================
// LOGIN HINTS (V3)
// =============================================================================

export type LoginHint = 'abha-number' | 'mobile' | 'email' | 'aadhaar' | 'password'

// =============================================================================
// OTP SYSTEMS (V3)
// =============================================================================

export type OTPSystem = 'aadhaar' | 'abdm'

// =============================================================================
// CONFIGURATION
// =============================================================================

/** SDK configuration options */
export interface ABHAConfig {
  /** ABDM Client ID */
  clientId: string
  /** ABDM Client Secret */
  clientSecret: string
  /** Environment: 'sandbox' or 'production' */
  environment: ABHAEnvironment
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number
  /** Enable debug logging (default: false) */
  debug?: boolean
}

// =============================================================================
// AUTHENTICATION (V3)
// =============================================================================

/** Session token response from ABDM Gateway */
export interface ABHASession {
  accessToken: string
  expiresIn: number      // seconds (1200 = 20 min)
  refreshToken: string
  refreshExpiresIn: number  // seconds (1800 = 30 min)
  tokenType: 'bearer'
}

/** Tokens returned after verification */
export interface ABHATokens {
  token: string
  expiresIn: number
  refreshToken: string
  refreshExpiresIn: number
}

// =============================================================================
// REQUEST HEADERS (V3)
// =============================================================================

export interface ABHARequestHeaders {
  'REQUEST-ID': string      // UUID
  'TIMESTAMP': string       // ISO 8601
  'Authorization': string   // Bearer token
  'X-token'?: string        // User token (for profile APIs)
}

// =============================================================================
// OTP FLOW (V3)
// =============================================================================

/** Request to generate OTP */
export interface OTPGenerateRequest {
  scope: Scope[]
  loginHint: LoginHint
  loginId: string       // RSA encrypted
  otpSystem: OTPSystem
  txnId?: string        // For subsequent calls in same transaction
}

/** Response from OTP generation */
export interface OTPGenerateResponse {
  txnId: string
  message: string
}

/** Request to verify OTP (Login) */
export interface OTPVerifyRequest {
  scope: Scope[]
  authData: {
    authMethods: AuthMethod[]
    otp: {
      txnId: string
      otpValue: string  // RSA encrypted
      mobile?: string   // For enrollment with different mobile
      timeStamp?: string // ISO 8601 timestamp
    }
  }
}

/** Response from OTP verification - includes profile and tokens */
export interface OTPVerifyResponse {
  message: string
  txnId: string
  tokens: ABHATokens
  ABHAProfile: ABHAProfile
  isNew?: boolean  // True if newly created account
}

/** Account summary in mobile login response */
export interface ABHAAccountSummary {
  ABHANumber: string
  preferredAbhaAddress?: string
  name: string
  status: ABHAStatus
  profilePhoto?: string  // Base64 encoded
}

/** Response from Mobile OTP login - returns multiple accounts */
export interface MobileLoginResponse {
  message: string
  txnId: string
  tokens: ABHATokens
  accounts: ABHAAccountSummary[]  // Multiple ABHAs can be linked to one mobile
}

/** Auth result response (for various verification APIs) */
export interface AuthResultResponse {
  txnId: string
  authResult: 'success' | 'failure'
  message: string
}

// =============================================================================
// ENROLLMENT (V3)
// =============================================================================

/** Request for ABHA enrollment via Aadhaar */
export interface EnrollmentRequest {
  authData: {
    authMethods: AuthMethod[]
    otp: {
      txnId: string
      otpValue: string  // RSA encrypted
      mobile?: string   // Primary mobile if different from Aadhaar
    }
  }
  consent: {
    code: 'abha-enrollment'
    version: '1.4'
  }
}

// =============================================================================
// ABHA PROFILE (V3)
// =============================================================================

/** Full ABHA Profile as returned by V3 API */
export interface ABHAProfile {
  // Name (from Aadhaar KYC)
  firstName: string
  middleName?: string
  lastName: string
  name?: string  // Full name

  // Demographics
  dob: string           // DD-MM-YYYY
  gender: ABHAGender
  mobile: string        // Masked: "******1670"
  email?: string

  // ABHA Identifiers
  ABHANumber: string    // "91-1601-4548-XXXX"
  phrAddress?: string[] // ["91160145481380@sbx"]
  preferredAbhaAddress?: string
  abhaStatus: ABHAStatus
  abhaType: ABHAType

  // Address (from Aadhaar)
  address?: string
  stateCode?: string
  stateName?: string
  districtCode?: string
  districtName?: string
  pinCode?: string
  townName?: string
  villageName?: string
  subDistrictName?: string

  // Photo (Base64 JPEG)
  photo?: string
  profilePhoto?: string

  // Verification
  kycVerified?: boolean
  kycDocumentType?: KYCDocumentType
  verificationStatus?: string
  verificationType?: string
  emailVerified?: boolean

  // Metadata
  authMethods?: string[]
  tags?: Record<string, string>
  createdDate?: string
  lastModifiedDate?: string
}

/** Minimal profile for display/linking */
export interface ABHAProfileSummary {
  ABHANumber: string
  phrAddress?: string[]
  firstName: string
  lastName: string
  gender: ABHAGender
  dob: string
  mobile: string
  abhaStatus: ABHAStatus
  kycVerified?: boolean
}

// =============================================================================
// PUBLIC KEY / ENCRYPTION (V3)
// =============================================================================

/** Public key response for encryption */
export interface PublicKeyResponse {
  publicKey: string  // Base64 encoded RSA public key
  encryptionAlgorithm: 'RSA/ECB/OAEPWithSHA-1AndMGF1Padding'
}

// =============================================================================
// API RESPONSES
// =============================================================================

/** Standard API response wrapper */
export interface ABHAApiResponse<T> {
  success: boolean
  data?: T
  error?: ABHAApiError
}

/** API error structure */
export interface ABHAApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

// =============================================================================
// SEARCH
// =============================================================================

/** Search result for ABHA lookup */
export interface ABHASearchResult {
  ABHANumber: string
  phrAddress?: string[]
  name: string
  gender: ABHAGender
  mobile: string  // Masked
  abhaStatus: ABHAStatus
}

/** Response from ABHA Address search (PHR verification) */
export interface ABHAAddressSearchResult {
  healthIdNumber: string  // ABHA Number
  abhaAddress: string     // e.g., 'singh128@sbx'
  authMethods: string[]   // e.g., ['MOBILE_OTP', 'AADHAAR_OTP']
  blockedAuthMethods: string[]
  status: ABHAStatus
  fullName: string
  mobile: string  // Masked
  message?: string
}

/** ABHA Address creation response */
export interface ABHAAddressCreateResponse {
  txnId: string
  healthIdNumber: string  // ABHA Number
  preferredAbhaAddress: string  // Created address with domain
}

// =============================================================================
// ABHA CARD
// =============================================================================

/** ABHA Card response */
export interface ABHACardResponse {
  /** PNG image as Base64 */
  image?: string
  /** PDF as Base64 */
  pdf?: string
}
