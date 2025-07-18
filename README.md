# Document Management System - React Native App

This is a **React Native** mobile application built with [Expo](https://expo.dev), allowing users to securely manage and upload documents. It includes OTP-based login, media upload, tag-based filtering, file previews, and a searchable document repository.

## Features

- OTP-based Login (Phone verification)
- Secure file upload (PDFs and images only)
- Preview support for images and PDFs
- Advanced search with:
  - Major/Minor head filters
  - Date range
  - Tags
- Tag management: Add custom tags or reuse existing ones
- Download support for individual files
- User Profile & Logout

## Project Structure

```bash
/app
   |_ login.tsx
   |_ otp.tsx
   |_ upload.tsx
   |_ profile.tsx
   |_ preview.tsx
   |_ index.tsx (HomePage)
   |_ _layout.tsx

/components
   |_ OTPInput.tsx
   |_ UploadBox.tsx
   |_ Dropdown.tsx
   |_ TagInput.tsx
   |_ BackButton.tsx
   |_ HomeSearchBar.tsx

/hooks
   |_ useLogin.ts
   |_ useAuthGuard.ts
   |_ useFileUpload.ts

/services
   |_ api.ts

/utils
   |_ auth.ts

/store
   |_ index.ts
   |_ userSlice.ts
```

## Setup Instructions

1. **Install dependencies**

   ```
   npm install
   ```

2. **Start the development server**

   ```bash
   npx expo start
   ```

3. **Run on device/simulator**

   ```bash
   Android: Press a
   iOS: Press i
   Expo Go: Scan QR Code from terminal
   ```

## Tech Stack

React Native + Expo

TypeScript

Redux Toolkit

React Navigation (via expo-router)

AsyncStorage for session management

Expo FileSystem / ImagePicker / DocumentPicker

REST API Integration using axios

## API Notes

All requests include a token header for authentication.

User data and token are managed using Redux + AsyncStorage.

Upload API uses multipart/form-data with file and metadata.

## Final Submission Checklist

All commits are incremental and meaningful

App covers all required screens:

1.  Login
2.  OTP Verification
3.  Home (Search + List)
4.  Upload
5.  File Preview
6.  Profile

API integration and error handling are implemented

File preview and download supported for images/PDFs

## Questions?

Feel free to reach out if you need clarification or enhancements. Thanks!
