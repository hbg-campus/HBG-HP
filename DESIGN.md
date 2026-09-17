# Design System Specification: Editorial Excellence

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Navigator"**

This design system is built to bridge the gap between Hanseatic tradition—defined by its steadfast reliability and maritime heritage—and the future of high-end educational discourse. We are moving away from the "template" aesthetic of standard academic portals. Instead, we embrace a **High-End Editorial** approach.

The interface should feel like a premium broadsheet or a curated gallery. We achieve this through **Intentional Asymmetry**, where large `display-lg` headings are offset against generous white space, and **Tonal Depth**, where layers of navy and gold create a sense of architectural permanence. We do not use lines to define space; we use light, shadow, and sophisticated color shifts to guide the eye.

---

## 2. Colors: The Palette of Prestige

The color strategy is anchored in the deep `primary` navy (#041627) and the sophisticated `secondary` gold (#775a19).

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
Structure must be defined through background shifts. For example, a `surface-container-low` section should sit directly against a `surface` background. The transition between these two tones is the boundary. This creates a seamless, "limitless" feel that signifies high-end design.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **Base Layer:** `surface` (#f8f9fa) or `surface-bright`.
- **Primary Content Blocks:** `surface-container-low` (#f3f4f5).
- **Interactive Elements/Cards:** `surface-container-lowest` (#ffffff) to provide a "lifted" feel against the slightly darker page sections.
- **High-Emphasis Callouts:** Use `primary-container` (#1a2b3c) for dark-mode-in-light-mode moments, creating deep contrast.

### Signature Textures & Glass
- **The Navy Gradient:** For hero sections, use a subtle radial gradient transitioning from `primary` (#041627) to `primary_container` (#1a2b3c). This adds "soul" and prevents the flat, digital look.
- **Hanseatic Glass:** Floating navigation bars or modal overlays must use **Glassmorphism**. Apply `surface-container-lowest` at 80% opacity with a `backdrop-blur` of 20px. This allows the sophisticated gold accents and navy backgrounds to bleed through, softening the interface.

---

## 3. Typography: The Authoritative Voice

The typography scale is a dialogue between the traditional (`Newsreader` serif) and the functional (`Manrope` sans-serif).

- **Display & Headlines (Newsreader):** These are your "Editorial Anchors." Use `display-lg` for hero statements. The serif font represents the weight of history and the "Hanseatic" promise of quality. Use tight letter-spacing (-0.02em) for a more premium, printed look.
- **Body & Titles (Manrope):** These represent "Modern Professionalism." `body-lg` is the workhorse for educational content. It is clean, highly legible, and provides a neutral counterpoint to the expressive headlines.
- **Labels (Manrope):** All-caps labels with increased letter-spacing (+0.05em) using the `secondary` gold token should be used for category tags or small "eyebrow" text above headlines.

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional box-shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by stacking. Place a `surface-container-lowest` card on a `surface-container-low` background. The subtle 2% difference in brightness is enough to define the object without visual clutter.
- **Ambient Shadows:** If a floating element (like a dropdown) requires a shadow, it must be "Ambient." Use the `on-surface` color at 4% opacity with a blur of 40px and a Y-offset of 20px. It should feel like a soft glow of light, not a hard drop shadow.
- **The "Ghost Border" Fallback:** If a boundary is strictly required for accessibility (e.g., in forms), use the `outline-variant` token at **20% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
- **Primary:** Background `primary` (#041627), Text `on-primary`. Shape: `md` (0.375rem). Use a subtle gold (`secondary`) bottom-border (2px) on hover to signify "The Hanseatic Gold Standard."
- **Secondary:** Background `secondary_container` (#fed488), Text `on-secondary_container`. 
- **Tertiary:** No background. Text `primary` with a `secondary` gold underline that expands from center on hover.

### Cards & Lists
- **Rule:** Forbid the use of divider lines. 
- **Execution:** Separate list items using `spacing-4` (1.4rem) of vertical white space. For cards, use background color shifts (`surface-container-highest` for hover states) to indicate interactivity.

### Input Fields
- **Style:** Underline only. Use `outline-variant` for the resting state and `secondary` (gold) for the active state. This mimics high-end stationery.
- **Error States:** Use `error` (#ba1a1a) text but maintain the "Ghost Border" logic for the container.

### Signature Component: The "Heritage Masthead"
A large-scale header component using `display-lg` typography, featuring an asymmetrical layout where text sits on the left and a "Glass" container (`surface_container_lowest` with blur) sits on the right, partially overlapping the background.

---

## 6. Do's and Don'ts

### Do
- **Do** use `spacing-16` and `spacing-24` for section margins. Breathing room is a luxury.
- **Do** use `secondary` gold sparingly—as a "nib" or an accent, never as a primary background.
- **Do** align text-heavy sections to a 12-column grid, but allow images to break the grid for an editorial feel.

### Don't
- **Don't** use pure black (#000000). Always use `primary` (#041627) for deep tones.
- **Don't** use standard `rounded-full` pills for buttons; stay with `md` (0.375rem) or `sm` (0.125rem) to maintain an architectural, "built" feel.
- **Don't** use 1px dividers. If you need separation, use a `surface-variant` color block or simply more space.