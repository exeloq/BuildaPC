# Package.json additions for Vercel deployment

Add this script to your package.json:

```json
"scripts": {
  "deploy": "vercel --prod",
  "deploy:preview": "vercel"
}
```

Then you can deploy with:
```bash
npm run deploy:preview  # Preview deployment
npm run deploy          # Production deployment
```
