# Cloudinary Setup Checklist

## Pre-Setup
- [ ] Sign up at cloudinary.com
- [ ] Verify email
- [ ] Have access to Dashboard

## Cloudinary Configuration
- [ ] Copy **Cloud Name** from Dashboard
- [ ] Create **Upload Preset** in Settings → Upload
- [ ] Set preset to **Unsigned** mode
- [ ] Copy **Upload Preset name**

## Project Configuration
- [ ] Create `.env.local` file in root directory
- [ ] Add `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_value`
- [ ] Add `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_value`
- [ ] Add other required env variables (NEXTAUTH_URL, DATABASE_URL, etc.)
- [ ] Verify `.gitignore` includes `.env.local`

## Code Status
- [ ] Write page updated with new features
  - [ ] Upload status indicator
  - [ ] Image preview
  - [ ] Error handling
  - [ ] Loading state
- [ ] CSS styles added for new elements
- [ ] Single post page displays images correctly

## Testing
- [ ] Start dev server: `npm run dev`
- [ ] Go to /write and login
- [ ] Upload an image
- [ ] See image preview
- [ ] Write post and publish
- [ ] Image displays on post page
- [ ] Image displays on homepage/blog page

## Deployment Checklist (when ready)
- [ ] Cloudinary env variables added to hosting platform
- [ ] NextAuth env variables updated for production URL
- [ ] Database connection string updated for production
- [ ] Test image upload on live site
- [ ] Verify images display correctly in production

## Optional Enhancements
- [ ] Add image optimization/transformation
- [ ] Add multiple image support per post
- [ ] Add image cropping tool
- [ ] Add thumbnail generation
- [ ] Implement image gallery
- [ ] Add image alt text input
