# Wildryde

Wildryde is a simple Node.js cab service API with a Vercel-compatible serverless API.

## Run locally

```bash
npm install
npm start
```

Then open:

- http://localhost:3000/
- http://localhost:3000/api/health
- http://localhost:3000/api/drivers
- http://localhost:3000/api/rides

## Vercel deployment

- `GET /api/health`
- `GET /api/drivers`
- `GET /api/rides`
- `POST /api/rides`

The `public/` folder is served automatically by Vercel.
