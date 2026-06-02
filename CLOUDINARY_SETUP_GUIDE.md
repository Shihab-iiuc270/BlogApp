# Cloudinary Image Upload Implementation Guide

## Complete Setup & Workflow

### 1. Cloudinary Account Setup

#### Step 1: Create Account
- Go to [cloudinary.com](https://cloudinary.com) and sign up for free
- Verify your email

#### Step 2: Get Your Cloud Name
- Dashboard → Copy your **Cloud Name** (under your profile)
- Example: `dxyzabc`

#### Step 3: Create Upload Preset
1. Settings → Upload → Add upload preset
2. Set **Upload preset name** (e.g., `blog-uploads`)
3. Set **Mode** to `Unsigned`
4. Click **Save**
5. Copy the preset name

---

### 2. Environment Variables Setup

Create `.env.local` in your project root:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset_name_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here

# Database
DATABASE_URL=your_mongodb_connection_string
```

**Important:** 
- `NEXT_PUBLIC_` prefix makes these accessible on the frontend
- Never commit `.env.local` to git
- Add to `.gitignore` if not already there

---

### 3. Project Architecture

#### Data Flow: Image Upload → Storage → Display

```
User uploads image
        ↓
[Write Page] → uploadToCloudinary() → Cloudinary API
        ↓
Gets back secure_url
        ↓
Stores img: secure_url in database (Post model)
        ↓
[Single Post Page] → Fetches post data
        ↓
Displays image from Cloudinary URL
```

---

### 4. File Structure

#### Write Page (`src/app/write/page.jsx`)
- ✅ Image upload input
- ✅ Cloudinary upload function
- ✅ Auto-upload on file select
- ✅ Image preview before publishing
- ✅ Loading state & error handling
- ✅ Post creation with image URL

#### Post Model (`prisma/schema.prisma`)
```prisma
model Post {
  id        String    @id @default(cuid()) @map("_id")
  createdAt DateTime  @default(now())
  slug      String    @unique
  title     String
  desc      String
  img       String?        // ← Stores Cloudinary URL
  views     Int       @default(0)
  catSlug   String
  cat       Category  @relation(fields: [catSlug], references: [slug])
  userEmail String
  user      User      @relation(fields: [userEmail], references: [email])
  comments  Comment[]
}
```

#### Single Post Page (`src/app/posts/[slug]/page.jsx`)
- ✅ Fetches post with image URL
- ✅ Displays image using Next.js Image component
- ✅ Responsive image sizing

---

### 5. How It Works (Step by Step)

#### Creating a Post with Image:

1. **User opens Write Page** → `/write`
   - Sees form for Title, Category, Content, and Image upload button

2. **User selects image** 
   - Clicks the image button in editor
   - Selects file from computer
   - Image automatically uploads to Cloudinary
   - Preview appears on the page
   - Button shows "Uploading..." while in progress

3. **Cloudinary upload function handles:**
   ```javascript
   - Creates FormData with file + upload preset
   - Sends to Cloudinary API
   - Returns secure_url (HTTPS link)
   - Displays preview to user
   - Shows error if upload fails
   ```

4. **User writes content and clicks Publish**
   - Sends to `/api/posts` with:
     ```json
     {
       "title": "My Blog Post",
       "desc": "<html>content here</html>",
       "img": "https://res.cloudinary.com/...",
       "slug": "my-blog-post",
       "catSlug": "coding"
     }
     ```

5. **Post saved to MongoDB**
   - Image URL stored in `img` field
   - Redirects to `/posts/my-blog-post`

6. **Single Post Page displays:**
   - Title
   - Author info
   - Image from Cloudinary URL
   - Post content
   - Comments section

---

### 6. Features Implemented

#### Write Page Improvements:
- ✅ **Image Preview** - See selected image before publishing
- ✅ **Upload Status** - "Uploading image..." feedback
- ✅ **Error Handling** - Shows error if upload fails
- ✅ **Remove Image** - Button to clear selection
- ✅ **Input Validation** - Requires title and content
- ✅ **Disabled State** - Buttons disabled while uploading
- ✅ **File Type Filter** - Only accepts image files

#### Database & API:
- ✅ Post model stores image URL
- ✅ API creates post with image
- ✅ Single post page displays image

---

### 7. Testing the Implementation

#### Test Flow:

1. **Start dev server**
   ```bash
   npm run dev
   ```

2. **Go to Write Page**
   - Open `http://localhost:3000/write`
   - Make sure you're logged in

3. **Upload Image**
   - Click plus icon → Image button
   - Select an image from your computer
   - Wait for "Uploading..." message to complete
   - Image preview should appear

4. **Fill in content**
   - Enter title
   - Write content in editor
   - Select a category

5. **Publish**
   - Click "Publish" button
   - Should redirect to new post page
   - Image should display on post page

6. **View on homepage/blog page**
   - Go to homepage or blog page
   - Should see post card with image if available

---

### 8. Troubleshooting

#### Image not uploading?
- ✅ Check `.env.local` has correct cloud name & preset
- ✅ Verify upload preset is set to "Unsigned" mode
- ✅ Check browser console for error messages
- ✅ Verify file is an image format

#### Image showing but broken?
- ✅ Check Cloudinary URL in database is correct
- ✅ Verify Cloudinary image settings allow public access
- ✅ Check browser Network tab for 403/404 errors

#### Post not saving?
- ✅ Check MongoDB connection string in `.env.local`
- ✅ Verify you're logged in
- ✅ Check title and content aren't empty
- ✅ Check API response in browser Network tab

---

### 9. Image Optimization (Optional)

For better performance, Cloudinary can transform images:

```javascript
// Example transformations
const url = media;
// Add transformations to URL:
const optimized = url
  .replace('/upload/', '/upload/w_1200,h_630,c_fill,q_auto/')
```

---

### 10. API Endpoints Used

#### GET `/api/posts`
- Fetches list of posts (paginated)
- Optional category filter

#### POST `/api/posts`
- Creates new post
- Requires authentication
- Saves image URL from Cloudinary

#### GET `/api/posts/[slug]`
- Fetches single post by slug
- Returns post with image URL

---

### Summary

Your BlogApp now has:
1. ✅ Cloudinary integration for image hosting
2. ✅ Auto-upload when file selected
3. ✅ Image preview before publishing
4. ✅ Persistent storage in MongoDB
5. ✅ Display on single post pages
6. ✅ Error handling & user feedback

**Next steps:**
- Add image to homepage/blog cards
- Implement image optimization
- Add gallery for multiple images per post
