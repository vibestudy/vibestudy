## Task: Create Onboarding Layout

- **Component**: `ProgressSteps` created as a reusable component.
- **Layout**: `(onboarding)/layout.tsx` implements the dark modal design.
- **Dependency**: Installed `convex` manually as it was missing from dependencies but required by types.
- **Build**: Verified `npm run build` passes.

## Task: Create Story Card

- **Component**: `StoryCard` component created in `src/components/dashboard/story-card.tsx`.
- **Styling**: Used Tailwind utility classes matching mockup (rounded-3xl, shadow, etc.).
- **Icons**: Used `lucide-react` icons (Star, FileText).
- **Verification**: Visually verified with Playwright (snapshot match).
