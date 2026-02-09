# ABDM ABHA SDK

> **Unofficial Version** - This SDK is not affiliated with or endorsed by ABDM/NHA.

ABDM (Ayushman Bharat Digital Mission) ABHA integration SDK for Node.js applications.

Based on **ABHA V3 APIs SOP V1.2** (October 2024) - [Official Documentation](https://abdm.gov.in/publications).

[![npm version](https://badge.fury.io/js/%40akhilesharora%2Fabdm-abha-sdk.svg)](https://www.npmjs.com/package/@akhilesharora/abdm-abha-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Complete V3 API Types** - Full TypeScript definitions for all ABHA V3 APIs
- **Validation Utilities** - Validate ABHA numbers, addresses, mobile numbers, Aadhaar
- **Format Helpers** - Format and parse ABHA identifiers
- **Constants** - All API endpoints, scopes, error codes
- **Zero Dependencies** - Lightweight, no external dependencies
- **Tree Shakeable** - Import only what you need

## Installation

```bash
npm install @akhilesharora/abdm-abha-sdk
```

```bash
yarn add @akhilesharora/abdm-abha-sdk
```

```bash
pnpm add @akhilesharora/abdm-abha-sdk
```

## Quick Start

### Validate ABHA Number

```typescript
import { isValidABHANumber, formatABHANumber, maskABHANumber } from '@akhilesharora/abdm-abha-sdk'

// Validate format
isValidABHANumber('91-1234-5678-9012')  // true
isValidABHANumber('1234567890123')      // false (wrong format)

// Format raw digits
formatABHANumber('91123456789012')      // '91-1234-5678-9012'

// Mask for display
maskABHANumber('91-1234-5678-9012')     // 'XX-XXXX-XXXX-9012'
```

### Validate ABHA Address

```typescript
import { isValidABHAAddress, formatABHAAddress, parseABHAAddress } from '@akhilesharora/abdm-abha-sdk'

// Validate
isValidABHAAddress('john.doe@abdm')     // true (production)
isValidABHAAddress('test_user@sbx')     // true (sandbox)
isValidABHAAddress('john@gmail.com')    // false

// Format
formatABHAAddress('JohnDoe', 'production')  // 'johndoe@abdm'
formatABHAAddress('TestUser', 'sandbox')    // 'testuser@sbx'

// Parse
parseABHAAddress('john.doe@abdm')       // { username: 'john.doe', domain: 'abdm' }
```

### Validate Mobile & Aadhaar

```typescript
import { isValidMobile, isValidAadhaar, maskMobile, maskAadhaar } from '@akhilesharora/abdm-abha-sdk'

// Mobile (Indian 10-digit)
isValidMobile('9876543210')     // true
maskMobile('9876543210')        // 'XXXXXX3210'

// Aadhaar (12-digit)
isValidAadhaar('123456789012')  // true
maskAadhaar('123456789012')     // 'XXXXXXXX9012'
```

## Complete Integration Example

Here's a full working example showing how to integrate ABHA login in your application:

```typescript
import crypto from 'crypto'
import {
  ABDM_BASE_URLS,
  ABDM_SESSION_URLS,
  API_ENDPOINTS,
  SCOPES,
  LOGIN_HINTS,
  OTP_SYSTEMS,
  HEADERS,
  isValidABHANumber,
  formatABHAName,
} from '@akhilesharora/abdm-abha-sdk'
import type {
  ABHAProfile,
  OTPGenerateRequest,
  OTPVerifyRequest,
  OTPGenerateResponse,
  OTPVerifyResponse,
} from '@akhilesharora/abdm-abha-sdk'

// ============================================================================
// CONFIGURATION - Replace with your sandbox/production credentials
// ============================================================================
const config = {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  environment: 'sandbox' as const,
}

const BASE_URL = ABDM_BASE_URLS[config.environment]
const SESSION_URL = ABDM_SESSION_URLS[config.environment]

// ============================================================================
// HELPER: Generate required headers
// ============================================================================
function getHeaders(accessToken: string, userToken?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    [HEADERS.REQUEST_ID]: crypto.randomUUID(),
    [HEADERS.TIMESTAMP]: new Date().toISOString(),
    [HEADERS.AUTHORIZATION]: `Bearer ${accessToken}`,
  }
  if (userToken) {
    headers[HEADERS.X_TOKEN] = `Bearer ${userToken}`
  }
  return headers
}

// ============================================================================
// STEP 1: Get Session Token (call once, cache for 30 min)
// ============================================================================
async function getSessionToken(): Promise<string> {
  const response = await fetch(SESSION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      grantType: 'client_credentials',
    }),
  })
  const data = await response.json()
  return data.accessToken  // Valid for 1800 seconds (30 min)
}

// ============================================================================
// STEP 2: Get RSA Public Key for encryption
// ============================================================================
async function getPublicKey(accessToken: string): Promise<string> {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.PUBLIC_KEY}`, {
    headers: getHeaders(accessToken),
  })
  const data = await response.json()
  return data.publicKey  // PEM format RSA public key
}

// ============================================================================
// STEP 3: RSA Encrypt sensitive data (ABHA number, OTP, etc.)
// ============================================================================
function rsaEncrypt(data: string, publicKeyPem: string): string {
  const buffer = Buffer.from(data, 'utf8')
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKeyPem,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha1',  // ABDM requires SHA-1 for OAEP
    },
    buffer
  )
  return encrypted.toString('base64')
}

// ============================================================================
// STEP 4: Request OTP
// ============================================================================
async function requestOTP(
  accessToken: string,
  publicKey: string,
  abhaNumber: string
): Promise<{ txnId: string; message: string }> {
  // Validate before sending
  if (!isValidABHANumber(abhaNumber)) {
    throw new Error('Invalid ABHA number format. Expected: XX-XXXX-XXXX-XXXX')
  }

  const request: OTPGenerateRequest = {
    scope: [SCOPES.ABHA_LOGIN, SCOPES.MOBILE_VERIFY],
    loginHint: LOGIN_HINTS.ABHA_NUMBER,
    loginId: rsaEncrypt(abhaNumber.replace(/-/g, ''), publicKey),  // Encrypt without dashes
    otpSystem: OTP_SYSTEMS.ABDM,
  }

  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.LOGIN_REQUEST_OTP}`, {
    method: 'POST',
    headers: getHeaders(accessToken),
    body: JSON.stringify(request),
  })

  const data: OTPGenerateResponse = await response.json()
  return { txnId: data.txnId, message: data.message }
}

// ============================================================================
// STEP 5: Verify OTP and get profile
// ============================================================================
async function verifyOTP(
  accessToken: string,
  publicKey: string,
  txnId: string,
  otp: string
): Promise<{ profile: ABHAProfile; tokens: { token: string; refreshToken: string } }> {
  const request: OTPVerifyRequest = {
    scope: [SCOPES.ABHA_LOGIN, SCOPES.MOBILE_VERIFY],
    authData: {
      authMethods: ['otp'],
      otp: {
        txnId,
        otpValue: rsaEncrypt(otp, publicKey),
      },
    },
  }

  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.LOGIN_VERIFY}`, {
    method: 'POST',
    headers: getHeaders(accessToken),
    body: JSON.stringify(request),
  })

  const data: OTPVerifyResponse = await response.json()
  return {
    profile: data.ABHAProfile,
    tokens: {
      token: data.tokens.token,           // User token for profile APIs
      refreshToken: data.tokens.refreshToken,
    },
  }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================
async function loginWithABHA(abhaNumber: string, otp: string) {
  // 1. Get session token (cache this!)
  const accessToken = await getSessionToken()

  // 2. Get public key (cache for a few hours)
  const publicKey = await getPublicKey(accessToken)

  // 3. Request OTP
  const { txnId } = await requestOTP(accessToken, publicKey, abhaNumber)
  console.log('OTP sent! Transaction ID:', txnId)

  // 4. User enters OTP, then verify
  const { profile, tokens } = await verifyOTP(accessToken, publicKey, txnId, otp)

  // 5. Use the profile
  console.log('Welcome,', formatABHAName(profile))
  console.log('ABHA Number:', profile.ABHANumber)
  console.log('ABHA Address:', profile.preferredAbhaAddress)
  console.log('KYC Verified:', profile.kycVerified)

  // Store tokens.token for subsequent API calls
  return { profile, userToken: tokens.token }
}

// Example call (in your API route or service)
// await loginWithABHA('91-1234-5678-9012', '123456')
```

### Key Points

1. **Session Token**: Call once, cache for 30 minutes. Used in all API calls.
2. **Public Key**: Fetch once per session. Used to encrypt all sensitive data.
3. **Encryption**: ALL sensitive data (ABHA, mobile, Aadhaar, OTP) must be RSA encrypted.
4. **Headers**: Every request needs `REQUEST-ID` (UUID) and `TIMESTAMP` (ISO 8601).
5. **User Token**: After login, use `X-token` header for profile APIs.

### Express.js Route Example

```typescript
import express from 'express'
import { isValidABHANumber, isValidOTP } from '@akhilesharora/abdm-abha-sdk'

const router = express.Router()

// POST /api/abha/request-otp
router.post('/request-otp', async (req, res) => {
  const { abhaNumber } = req.body

  if (!isValidABHANumber(abhaNumber)) {
    return res.status(400).json({ error: 'Invalid ABHA number format' })
  }

  const { txnId } = await requestOTP(accessToken, publicKey, abhaNumber)
  res.json({ txnId, message: 'OTP sent to registered mobile' })
})

// POST /api/abha/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { txnId, otp } = req.body

  if (!isValidOTP(otp)) {
    return res.status(400).json({ error: 'OTP must be 6 digits' })
  }

  const { profile, tokens } = await verifyOTP(accessToken, publicKey, txnId, otp)
  res.json({ profile, token: tokens.token })
})
```

## API Reference

### Types

```typescript
import type {
  ABHAProfile,
  ABHATokens,
  ABHASession,
  OTPGenerateRequest,
  OTPVerifyResponse,
  MobileLoginResponse,
  ABHAAccountSummary,
} from '@akhilesharora/abdm-abha-sdk'
```

### Constants

```typescript
import {
  ABDM_BASE_URLS,
  ABDM_SESSION_URLS,
  API_ENDPOINTS,
  SCOPES,
  LOGIN_HINTS,
  OTP_SYSTEMS,
  ERROR_CODES,
} from '@akhilesharora/abdm-abha-sdk'

// Base URLs
ABDM_BASE_URLS.sandbox      // 'https://abhasbx.abdm.gov.in/abha/api'
ABDM_BASE_URLS.production   // 'https://abha.abdm.gov.in/api/abha'

// Scopes
SCOPES.ABHA_ENROL           // 'abha-enrol'
SCOPES.ABHA_LOGIN           // 'abha-login'
SCOPES.MOBILE_VERIFY        // 'mobile-verify'

// Login Hints
LOGIN_HINTS.ABHA_NUMBER     // 'abha-number'
LOGIN_HINTS.MOBILE          // 'mobile'
LOGIN_HINTS.AADHAAR         // 'aadhaar'

// OTP Systems
OTP_SYSTEMS.AADHAAR         // 'aadhaar' (OTP to Aadhaar-linked mobile)
OTP_SYSTEMS.ABDM            // 'abdm' (OTP to ABHA-linked mobile)
```

### Validation Functions

| Function | Description |
|----------|-------------|
| `isValidABHANumber(value)` | Validate XX-XXXX-XXXX-XXXX format |
| `isValidABHAAddress(value)` | Validate username@abdm format |
| `isValidMobile(value)` | Validate 10-digit Indian mobile |
| `isValidAadhaar(value)` | Validate 12-digit Aadhaar |
| `isValidOTP(value)` | Validate 6-digit OTP |
| `isValidPinCode(value)` | Validate 6-digit PIN code |

### Format Functions

| Function | Description |
|----------|-------------|
| `formatABHANumber(digits)` | Format 14 digits to XX-XXXX-XXXX-XXXX |
| `formatABHAAddress(username, env)` | Create username@abdm or @sbx |
| `formatMobile(mobile)` | Format as 98765 43210 |
| `formatAadhaar(aadhaar)` | Format as 1234 5678 9012 |
| `formatABHAName(profile)` | Combine first/middle/last name |

### Mask Functions

| Function | Description |
|----------|-------------|
| `maskABHANumber(value)` | XX-XXXX-XXXX-1234 |
| `maskMobile(value)` | XXXXXX3210 |
| `maskAadhaar(value)` | XXXXXXXX9012 |

### Gender Helpers

```typescript
import { toABHAGender, fromABHAGender, getGenderDisplay } from '@akhilesharora/abdm-abha-sdk'

toABHAGender('MALE')        // 'M'
fromABHAGender('M')         // 'MALE'
getGenderDisplay('M')       // 'Male'
```

### Date Helpers

```typescript
import { parseABHADate, toABHADate, calculateAge } from '@akhilesharora/abdm-abha-sdk'

parseABHADate('26-11-1989')  // Date object
toABHADate(new Date())       // '10-02-2026'
calculateAge('26-11-1989')   // 36
```

## API Endpoints

### Base URLs

| Environment | URL |
|-------------|-----|
| Sandbox | `https://abhasbx.abdm.gov.in/abha/api` |
| Production | `https://abha.abdm.gov.in/api/abha` |
| Session (Sandbox) | `https://dev.abdm.gov.in/api/hiecm/gateway/v3/sessions` |
| PHR (Sandbox) | `https://abhasbx.abdm.gov.in/abha/api/v3/phr/web` |

### Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v3/profile/public/certificate` | GET | Get RSA public key |
| `/v3/enrollment/request/otp` | POST | Generate OTP for enrollment |
| `/v3/enrollment/enrol/byAadhar` | POST | Create ABHA via Aadhaar |
| `/v3/profile/login/request/otp` | POST | Generate OTP for login |
| `/v3/profile/login/verify` | POST | Verify OTP and get profile |
| `/v3/profile/account` | GET | Get ABHA profile |
| `/v3/profile/account/qrCode` | GET | Generate QR code |
| `/v3/profile/account/abha-card` | GET | Get ABHA card |

## Typical Flows

### Login via ABHA OTP (Recommended for HIP)

```typescript
import { API_ENDPOINTS, SCOPES, LOGIN_HINTS, OTP_SYSTEMS } from '@akhilesharora/abdm-abha-sdk'
import type { OTPGenerateRequest, OTPVerifyRequest, OTPVerifyResponse } from '@akhilesharora/abdm-abha-sdk'

// Step 1: Generate OTP
const otpRequest: OTPGenerateRequest = {
  scope: [SCOPES.ABHA_LOGIN, SCOPES.MOBILE_VERIFY],
  loginHint: LOGIN_HINTS.ABHA_NUMBER,
  loginId: encryptedABHANumber,  // RSA encrypted
  otpSystem: OTP_SYSTEMS.ABDM,
}

// POST to API_ENDPOINTS.LOGIN_REQUEST_OTP

// Step 2: Verify OTP
const verifyRequest: OTPVerifyRequest = {
  scope: [SCOPES.ABHA_LOGIN, SCOPES.MOBILE_VERIFY],
  authData: {
    authMethods: ['otp'],
    otp: {
      txnId: txnIdFromStep1,
      otpValue: encryptedOTP,  // RSA encrypted
    },
  },
}

// POST to API_ENDPOINTS.LOGIN_VERIFY
// Response includes tokens + ABHAProfile
```

### Mobile Login (Multiple Accounts)

When logging in via mobile number, the response includes an `accounts` array since multiple ABHAs can be linked to one mobile:

```typescript
import type { MobileLoginResponse, ABHAAccountSummary } from '@akhilesharora/abdm-abha-sdk'

// Response structure
const response: MobileLoginResponse = {
  tokens: { ... },
  accounts: [
    {
      ABHANumber: '91-4819-7073-XXXX',
      preferredAbhaAddress: 'user@sbx',
      name: 'John Doe',
      status: 'ACTIVE',
      profilePhoto: '...',  // Base64
    },
    // ... more accounts
  ],
}
```

## Required Headers

All V3 APIs require these headers:

| Header | Description |
|--------|-------------|
| `REQUEST-ID` | UUID for tracking |
| `TIMESTAMP` | ISO 8601 timestamp |
| `Authorization` | `Bearer {accessToken}` from session API |
| `X-token` | `Bearer {userToken}` (for profile APIs after login) |

## Encryption

All sensitive data (Aadhaar, Mobile, OTP, Password) must be RSA encrypted using the public key from `/v3/profile/public/certificate`.

```typescript
import { ENCRYPTION } from '@akhilesharora/abdm-abha-sdk'

// Algorithm: RSA/ECB/OAEPWithSHA-1AndMGF1Padding
console.log(ENCRYPTION.ALGORITHM)
```

## Error Handling

```typescript
import { ERROR_CODES } from '@akhilesharora/abdm-abha-sdk'

// Common error codes
ERROR_CODES.INVALID_ABHA_NUMBER    // 'ABHA_INVALID_NUMBER'
ERROR_CODES.OTP_EXPIRED            // 'ABHA_OTP_EXPIRED'
ERROR_CODES.PROFILE_NOT_FOUND      // 'ABHA_PROFILE_NOT_FOUND'
ERROR_CODES.SESSION_EXPIRED        // 'ABHA_SESSION_EXPIRED'
```

## ABHAProfile Structure

```typescript
interface ABHAProfile {
  // Identity
  ABHANumber: string        // '91-1601-4548-XXXX'
  phrAddress?: string[]     // ['user@sbx']
  preferredAbhaAddress?: string

  // Name (from Aadhaar KYC)
  firstName: string
  middleName?: string
  lastName: string

  // Demographics
  dob: string               // 'DD-MM-YYYY'
  gender: 'M' | 'F' | 'O'
  mobile: string            // Masked: '******1670'
  email?: string

  // Address (from Aadhaar)
  address?: string
  stateName?: string
  districtName?: string
  pinCode?: string

  // Status
  abhaType: 'STANDARD' | 'CHILD'
  abhaStatus: 'ACTIVE' | 'INACTIVE' | 'DELETED' | 'DEACTIVATED'

  // Verification
  kycVerified?: boolean
  verificationStatus?: string
  verificationType?: string
  authMethods?: string[]

  // Photo
  photo?: string            // Base64 JPEG
}
```

## Requirements

- Node.js >= 16.0.0
- TypeScript >= 5.0 (for TypeScript users)

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## Resources

- [ABHA V3 APIs SOP V1.2 (PDF)](https://sandboxcms.abdm.gov.in/uploads/ABDM_ABHA_V3_AP_Is_SOP_V1_1_4_faef8099bd.pdf) - Official API documentation
- [ABDM Sandbox](https://sandbox.abdm.gov.in/)
- [ABDM Developer Portal](https://developers.abdm.gov.in/)
- [ABHA V3 APIs SOP](https://abdm.gov.in/publications)

## Author

**Akhilesh Arora**
- Email: akhildawra@gmail.com
- GitHub: [@akhilesharora](https://github.com/akhilesharora)
