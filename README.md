## Features

- Puzzle selection
- Keyboard 'tab' navigation
- Show cell valid state on input
- Warn when switching puzzle and puzzle is in progress
- Success dialog when puzzle is solved

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Supabase

Create project with and initialise database

```sql
CREATE TABLE "public"."sudoku_puzzles" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    "puzzle" text NOT NULL
);

CREATE UNIQUE INDEX sudoku_puzzles_pkey ON public.sudoku_puzzles USING btree (id);
CREATE UNIQUE INDEX sudoku_puzzles_puzzle_key ON public.sudoku_puzzles USING btree (puzzle);
ALTER TABLE "public"."sudoku_puzzles" ADD CONSTRAINT "sudoku_puzzles_pkey" PRIMARY KEY USING INDEX "sudoku_puzzles_pkey";
ALTER TABLE "public"."sudoku_puzzles" ADD CONSTRAINT "sudoku_puzzles_puzzle_key" UNIQUE USING INDEX "sudoku_puzzles_puzzle_key";

INSERT INTO "public"."sudoku_puzzles" (puzzle)
VALUES
  ('52...6.........7.13...........4..8..6......5...........418.........3..2...87.....'),
  ('837629145.4.318..2921574368.54186239163...8.7289.53416..28.56.1...241..3318967524'),
  ('634.28.15...456283528.13.6.45.397128213865.4.8..14.5.6.6.58..91381279654945631872'),
  ('.697.4123..26195.7471.5.8.693...8654.549.6..881.4.52..1.3...7.562..47.817985.1432'),
  ('293.16...71..32.69856.49213.32694......2.3...94.1.5326.2..6....481957..2....2...5')
;
```

Create .env.local file with Supabase credentials

```
NEXT_PUBLIC_SUPABASE_URL=https://tomefyvecrchotnuibed.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvbWVmeXZlY3JjaG90bnVpYmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5NTcwMjMsImV4cCI6MjAxMTUzMzAyM30.1trAlJcty76hitB_Z3uonwujmnQPzUfOd4p9sXodyZs
```
