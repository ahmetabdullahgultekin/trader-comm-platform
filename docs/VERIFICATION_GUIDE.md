# Verification Checklist - Run These Commands

## 1. Check if all new files exist

```bash
# Check public files
ls public/robots.txt
ls public/sitemap.xml
ls public/ads.txt

# Check new pages
ls src/pages/PrivacyPolicyPage.tsx
ls src/pages/TermsOfServicePage.tsx

# Check documentation
ls docs/ADSENSE_CHECKLIST.md
ls docs/COZUM_KILAVUZU.md
ls QUICK_START.md
```

## 2. Verify file contents

```bash
# Check robots.txt has content
cat public/robots.txt

# Check sitemap.xml has content
cat public/sitemap.xml

# Check ads.txt has your publisher ID
cat public/ads.txt
```

## 3. Test local development server

```bash
# Start dev server
npm run dev

# Then open in browser and check:
# - http://localhost:5173/gizlilik-politikasi
# - http://localhost:5173/kullanim-kosullari
# - Footer links to these pages
```

## 4. Check for TypeScript/ESLint errors

```bash
# Run TypeScript type checking
npx tsc --noEmit

# Run linter (if you have one)
npm run lint
```

## 5. Test build

```bash
# Build the project
npm run build

# Check if dist folder was created
ls dist/

# Check if dist has index.html
ls dist/index.html

# Preview the build
npm run preview
```

## 6. Manual Browser Checks (After npm run dev)

Open your browser and verify:

### Homepage (/)

- [ ] Page loads without errors
- [ ] View page source: Check for Schema.org structured data
- [ ] View page source: Check for Open Graph tags (og:title, og:description, etc.)
- [ ] View page source: Check for noscript content

### About Page (/hakkimda)

- [ ] Page loads
- [ ] Content shows 8 paragraphs
- [ ] Text is readable and formatted well

### Privacy Policy (/gizlilik-politikasi)

- [ ] Page loads
- [ ] All 11 sections are visible
- [ ] Proper formatting with headers
- [ ] Link in footer works

### Terms of Service (/kullanim-kosullari)

- [ ] Page loads
- [ ] All 14 sections are visible
- [ ] Proper formatting with headers
- [ ] Link in footer works

### Footer

- [ ] "Gizlilik Politikası" link exists
- [ ] "Kullanım Koşulları" link exists
- [ ] Clicking these links navigates correctly

## 7. Browser DevTools Checks

### Console

- [ ] No JavaScript errors
- [ ] No 404 errors for files

### Network Tab

- [ ] All files load successfully
- [ ] No failed requests (404s, 500s)

### Mobile View

- [ ] Switch to mobile view (F12 → Toggle device toolbar)
- [ ] All pages responsive
- [ ] Text is readable
- [ ] Buttons are clickable

## 8. SEO Meta Tags Check

Right-click → View Page Source on homepage, then search for:

- [ ] `<meta name="google-adsense-account"`
- [ ] `<meta property="og:title"`
- [ ] `<meta property="og:description"`
- [ ] `<script type="application/ld+json">` (Schema.org)
- [ ] `<link rel="canonical"`
- [ ] `<meta name="robots"`

## 9. Files Size Check

```bash
# Check that built files aren't too large
npm run build
du -sh dist/
```

Large files might slow down your site. Total should be under 10MB.

## 10. Before Deploy - Final Checklist

- [ ] `npm run build` completes without errors
- [ ] `dist` folder created successfully
- [ ] All pages accessible in preview mode
- [ ] No console errors
- [ ] Mobile responsive
- [ ] All links work

## Quick Verification Script

Create and run this file:

```bash
# verify.sh (Linux/Mac) or verify.ps1 (Windows)

echo "Checking files..."
test -f public/robots.txt && echo "✅ robots.txt exists" || echo "❌ robots.txt missing"
test -f public/sitemap.xml && echo "✅ sitemap.xml exists" || echo "❌ sitemap.xml missing"
test -f public/ads.txt && echo "✅ ads.txt exists" || echo "❌ ads.txt missing"
test -f src/pages/PrivacyPolicyPage.tsx && echo "✅ PrivacyPolicyPage.tsx exists" || echo "❌ PrivacyPolicyPage.tsx missing"
test -f src/pages/TermsOfServicePage.tsx && echo "✅ TermsOfServicePage.tsx exists" || echo "❌ TermsOfServicePage.tsx missing"

echo ""
echo "Building project..."
npm run build

echo ""
echo "Build complete! Check for errors above."
```

## What to Look For

### ✅ Good Signs

- No TypeScript errors
- Build completes successfully
- All pages load without errors
- Footer shows new links
- Console has no errors

### ❌ Warning Signs

- Build fails
- 404 errors in console
- Pages don't load
- White screen (React error)
- Missing links in footer

## If You Find Issues

1. **Build Errors**: Check the error message, might need to fix imports
2. **404 on Pages**: Check router configuration
3. **Missing Links**: Check Footer.tsx was updated correctly
4. **Content Not Showing**: Check if pages imported correctly

## Need Help?

If you encounter any issues, share:

1. The error message
2. Which command you ran
3. What you were trying to check

I'll help you fix it! 🚀
