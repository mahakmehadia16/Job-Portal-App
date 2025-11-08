
# Job Portal App (v3 — interactive & beautiful)

## New highlights
- Modern UI: hero, job cards, footer, better layout & animations
- Tags, company logo upload (employer), min/max salary
- Search by keyword/location/tag + pagination
- Resume upload on apply (served from `/uploads`)
- Toast notifications, dark mode (persistent), skeleton loaders
- Saved jobs (bookmarks in localStorage)
- Applicants modal for employers
- 404 page & empty states

## Run
### Backend
```
cd backend
copy .env.example .env   # (on mac/linux: cp .env.example .env)
# set MONGO_URI and JWT_SECRET in .env
npm install
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

> If you are upgrading from v1/v2, re-run **npm install** in backend (uses multer) and in frontend (fresh build).
