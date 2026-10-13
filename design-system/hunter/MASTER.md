# Hunter Design Direction

The visual language follows the supplied Edgewater landing-page CSS while retaining Hunter's product content. Its near-black background and cream text keep the page quiet; champagne gold carries the source's editorial character and marks premium moments. Playfair Display gives display copy a confident, founder-led voice; DM Sans keeps controls and dense feature copy readable.

## Core tokens

| Role | Value |
|---|---|
| Background | `#0A0A0A` |
| Surface | `#111111` |
| Primary text | `#F0ECE3` |
| Secondary text | `#B7B1A7` |
| Muted text | `#A29A8D` |
| Gold accent | `#C8AA64` |
| Gold separator | `rgba(200, 170, 100, 0.3)` |

## Type and composition

- Display: Playfair Display, 700/900. Its high-contrast serif gives the trading product an editorial, founder-led feel, matching the reference.
- Body and controls: DM Sans. Its open shapes remain readable in compact form controls and feature descriptions.
- Section dividers and card borders use restrained gold hairlines to carry through the reference's visual signature.
- Use a 1120px maximum content width and collapse all multi-column layouts to one column on small screens.
- Original wolf, shield, scan, and signal SVGs are used only where they communicate Hunter-specific identity or meaning.

## Interaction and accessibility

- Keep visible keyboard focus, label form controls, and use native links and buttons.
- Respect `prefers-reduced-motion`; hover transitions do not move surrounding layout.
- The waitlist form does not report success without a configured endpoint and successful response.
