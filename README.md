# ABDM ABHA SDK

> **Unofficial Version** - This SDK is not affiliated with or endorsed by ABDM/NHA.

ABDM (Ayushman Bharat Digital Mission) ABHA integration SDK for Node.js applications.

Based on **ABHA V3 APIs SOP V1.2** (October 2024) - [Official Documentation](https://abdm.gov.in/publications).

[![npm version](https://badge.fury.io/js/@akhilesharora/abdm-abha-sdk.svg)](https://www.npmjs.com/package/@akhilesharora/abdm-abha-sdk)
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
