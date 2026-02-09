/**
 * ABHA SDK Validation
 * Validation and formatting utilities for ABHA data
 */

import { VALIDATION_PATTERNS, VALIDATION_MESSAGES } from './constants'
import type { ABHAGender, ABHAEnvironment } from './types'

// =============================================================================
// ABHA NUMBER
// =============================================================================

/**
 * Validate ABHA Number format
 * Format: XX-XXXX-XXXX-XXXX (14 digits with hyphens in 2-4-4-4 pattern)
 *
 * @example
 * isValidABHANumber('12-3456-7890-1234') // true
 * isValidABHANumber('12345678901234')     // false (needs hyphens)
 */
export function isValidABHANumber(value: string): boolean {
  if (!value) return false
  return VALIDATION_PATTERNS.ABHA_NUMBER.test(value.trim())
}

/**
 * Validate raw ABHA Number (14 digits without hyphens)
 */
export function isValidABHANumberRaw(value: string): boolean {
  if (!value) return false
  return VALIDATION_PATTERNS.ABHA_NUMBER_RAW.test(value.trim())
}

/**
 * Format 14 raw digits into ABHA Number format
 *
 * @example
 * formatABHANumber('12345678901234') // '12-3456-7890-1234'
 */
export function formatABHANumber(digits: string): string {
  const cleaned = digits.replace(/\D/g, '')
  if (cleaned.length !== 14) {
    throw new Error('ABHA number must be exactly 14 digits')
  }
  return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 6)}-${cleaned.slice(6, 10)}-${cleaned.slice(10, 14)}`
}

/**
 * Parse formatted ABHA Number to raw digits
 *
 * @example
 * parseABHANumber('12-3456-7890-1234') // '12345678901234'
 */
export function parseABHANumber(formatted: string): string {
  return formatted.replace(/-/g, '')
}

/**
 * Mask ABHA number for display (show only last 4 digits)
 *
 * @example
 * maskABHANumber('12-3456-7890-1234') // 'XX-XXXX-XXXX-1234'
 */
export function maskABHANumber(abhaNumber: string): string {
  if (!isValidABHANumber(abhaNumber)) return abhaNumber
  return `XX-XXXX-XXXX-${abhaNumber.slice(-4)}`
}

// =============================================================================
// ABHA ADDRESS
// =============================================================================

/**
 * Validate ABHA Address format
 * Format: username@abdm (production) or username@sbx (sandbox)
 * Username: alphanumeric, dots, underscores, hyphens (3-32 chars)
 *
 * @example
 * isValidABHAAddress('john.doe@abdm')  // true
 * isValidABHAAddress('test_user@sbx')  // true
 * isValidABHAAddress('john@gmail.com') // false
 */
export function isValidABHAAddress(value: string): boolean {
  if (!value) return false
  return VALIDATION_PATTERNS.ABHA_ADDRESS.test(value.trim())
}

/**
 * Format ABHA Address to lowercase with correct domain
 *
 * @example
 * formatABHAAddress('JohnDoe', 'production') // 'johndoe@abdm'
 * formatABHAAddress('testUser', 'sandbox')   // 'testuser@sbx'
 */
export function formatABHAAddress(
  username: string,
  environment: ABHAEnvironment = 'production'
): string {
  const domain = environment === 'sandbox' ? 'sbx' : 'abdm'
  return `${username.toLowerCase().trim()}@${domain}`
}

/**
 * Extract username from ABHA Address
 *
 * @example
 * parseABHAAddress('john.doe@abdm') // { username: 'john.doe', domain: 'abdm' }
 */
export function parseABHAAddress(address: string): { username: string; domain: string } | null {
  if (!isValidABHAAddress(address)) return null
  const [username, domain] = address.toLowerCase().split('@')
  return { username, domain }
}

/**
 * Get environment from ABHA Address domain
 */
export function getEnvironmentFromAddress(address: string): ABHAEnvironment | null {
  const parsed = parseABHAAddress(address)
  if (!parsed) return null
  return parsed.domain === 'sbx' ? 'sandbox' : 'production'
}

// =============================================================================
// MOBILE NUMBER
// =============================================================================

/**
 * Validate Indian mobile number (10 digits starting with 6-9)
 */
export function isValidMobile(value: string): boolean {
  if (!value) return false
  const cleaned = value.replace(/\D/g, '')
  return VALIDATION_PATTERNS.MOBILE.test(cleaned)
}

/**
 * Format mobile number for display
 *
 * @example
 * formatMobile('9876543210') // '98765 43210'
 */
export function formatMobile(mobile: string): string {
  const cleaned = mobile.replace(/\D/g, '')
  if (cleaned.length !== 10) return mobile
  return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
}

/**
 * Mask mobile number for display
 *
 * @example
 * maskMobile('9876543210') // 'XXXXXX3210'
 */
export function maskMobile(mobile: string): string {
  const cleaned = mobile.replace(/\D/g, '')
  if (cleaned.length !== 10) return mobile
  return `XXXXXX${cleaned.slice(-4)}`
}

/**
 * Clean mobile number (remove non-digits and country code)
 */
export function cleanMobile(mobile: string): string {
  const cleaned = mobile.replace(/\D/g, '')
  // Remove +91 or 91 prefix if present
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return cleaned.slice(2)
  }
  return cleaned
}

// =============================================================================
// AADHAAR
// =============================================================================

/**
 * Validate 12-digit Aadhaar number
 */
export function isValidAadhaar(value: string): boolean {
  if (!value) return false
  const cleaned = value.replace(/\D/g, '')
  return VALIDATION_PATTERNS.AADHAAR.test(cleaned)
}

/**
 * Mask Aadhaar number for display
 *
 * @example
 * maskAadhaar('123456789012') // 'XXXXXXXX9012'
 */
export function maskAadhaar(aadhaar: string): string {
  const cleaned = aadhaar.replace(/\D/g, '')
  if (cleaned.length !== 12) return aadhaar
  return `XXXXXXXX${cleaned.slice(-4)}`
}

/**
 * Format Aadhaar number with spaces
 *
 * @example
 * formatAadhaar('123456789012') // '1234 5678 9012'
 */
export function formatAadhaar(aadhaar: string): string {
  const cleaned = aadhaar.replace(/\D/g, '')
  if (cleaned.length !== 12) return aadhaar
  return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)}`
}

// =============================================================================
// OTHER VALIDATIONS
// =============================================================================

/**
 * Validate 6-digit PIN code
 */
export function isValidPinCode(value: string): boolean {
  if (!value) return false
  return VALIDATION_PATTERNS.PIN_CODE.test(value.trim())
}

/**
 * Validate 6-digit OTP
 */
export function isValidOTP(value: string): boolean {
  if (!value) return false
  return VALIDATION_PATTERNS.OTP.test(value.trim())
}

// =============================================================================
// GENDER MAPPING
// =============================================================================

/** Gender enum for internal use */
export type SexEnum = 'MALE' | 'FEMALE' | 'OTHER'

/**
 * Convert internal Sex enum to ABHA Gender
 *
 * @example
 * toABHAGender('MALE')   // 'M'
 * toABHAGender('FEMALE') // 'F'
 * toABHAGender('OTHER')  // 'O'
 */
export function toABHAGender(sex: SexEnum): ABHAGender {
  const mapping: Record<SexEnum, ABHAGender> = {
    MALE: 'M',
    FEMALE: 'F',
    OTHER: 'O',
  }
  return mapping[sex]
}

/**
 * Convert ABHA Gender to internal Sex enum
 *
 * @example
 * fromABHAGender('M') // 'MALE'
 * fromABHAGender('F') // 'FEMALE'
 * fromABHAGender('O') // 'OTHER'
 */
export function fromABHAGender(gender: ABHAGender): SexEnum {
  const mapping: Record<ABHAGender, SexEnum> = {
    M: 'MALE',
    F: 'FEMALE',
    O: 'OTHER',
  }
  return mapping[gender]
}

/**
 * Get gender display text
 */
export function getGenderDisplay(gender: ABHAGender): string {
  const display: Record<ABHAGender, string> = {
    M: 'Male',
    F: 'Female',
    O: 'Other',
  }
  return display[gender]
}

// =============================================================================
// NAME HELPERS
// =============================================================================

/**
 * Format ABHA profile name for display
 * Combines firstName, middleName, lastName
 */
export function formatABHAName(profile: {
  firstName: string
  middleName?: string
  lastName: string
}): string {
  const parts = [profile.firstName, profile.middleName, profile.lastName].filter(Boolean)
  return parts.join(' ')
}

// =============================================================================
// DATE HELPERS
// =============================================================================

/**
 * Parse ABHA date format (DD-MM-YYYY) to Date object
 */
export function parseABHADate(dateStr: string): Date | null {
  const match = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/)
  if (!match) return null
  const [, day, month, year] = match
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

/**
 * Format Date to ABHA date format (DD-MM-YYYY)
 */
export function toABHADate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

/**
 * Calculate age from ABHA date string
 */
export function calculateAge(dobStr: string): number | null {
  const dob = parseABHADate(dobStr)
  if (!dob) return null
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
}

// =============================================================================
// RE-EXPORT MESSAGES
// =============================================================================

export const abhaValidationMessages = VALIDATION_MESSAGES
