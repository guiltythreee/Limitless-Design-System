# Visual parity gap audit

**Baseline:** production screenshots captured from `https://limitless.beyondthelimits.workers.dev` at 1440×1000 and 390×844, unauthenticated. Source revisions are pinned in [live-visual-source-map.md](./live-visual-source-map.md).

This is an implementation audit, not a claim of parity. The current preview contains source-informed component samples, but its page compositions are not yet faithful reproductions of the live routes.

## Route-level differences found

| Route | Live structure | Current fixture gap | Required correction |
|---|---|---|---|
| Home | Shared artwork background; 62px topbar with brand/search/profile; 245px left navigation; full-width welcome hero; four shortcuts in one row; three learning cards; learning pulse and two lower workspace banners | Topbar/sidebar, Learning pulse and both lower workspace banners are now represented in the isolated fixture; live cathedral/sky-city artwork is now referenced; exact overlay opacity, mobile crop and source-state styling still need screenshot comparison | Match the full-width hero, four-up shortcuts, three-up cards and lower panel spacing; reproduce the shared background artwork only through the existing live theme engine |
| Probability | Dedicated archive header; breadcrumb; wide blue hero with large serif title and emblem; separate study-progress panel with completion bar and five statistics; two-column archive content | Archive header, breadcrumb, large Probability hero, separate five-stat study-progress panel and lower two-column layout are now represented; the active lesson artwork now uses the live sample-space fallback; the exact active lesson state and lower-page content still need comparison | Rebuild the hero and progress panel from the live page structure; preserve the Probability serif typography and blue visual language |
| Metallurgy | 64px topbar; 310px sticky semester sidebar; wide programme hero; four horizontal summary tiles; three-column course cards | Topbar, six-semester rail, programme note, four summary metrics and four course cards are now represented; exact source-state spacing and the full course-card styling still require comparison | Use the actual left-sidebar/main-content grid, horizontal hero and summary row, then three course columns at desktop |
| Competition | Shared topbar; fixed 245px workspace sidebar; large campaign heading; three horizontal metric cards; full-width weekly checklist; subject mastery below | Workspace topbar/sidebar, campaign panel, three metrics, four-item checklist and five-subject mastery row are now represented; exact content width, card sizing, theme surface and lower-page state still require comparison | Recreate the fixed workspace shell, full-width campaign panel, three-column metrics and weekly checklist hierarchy |
| Codeforces | Shared topbar; back link; linked-account panel; two-column rating/milestone area; large training and virtual-contest launch cards | Topbar, back link, linked-account strip, two-column rating/milestones layout and launch cards are now represented; shared dark/light desktop/mobile artwork is now referenced; exact overlay and live data states still require comparison | Match the topbar/back-link structure, linked-account strip, two-column rating/milestones layout and launch-card proportions |

## Theme coverage

- The previous workflow captured the live site only in its default dark theme. The capture workflow now explicitly loads the site's shared `limitless.site.theme` preference and captures dark and light variants for every route and viewport.
- The previous desktop preview screenshots placed dark and light fixtures side by side, reducing each to half width. The preview now supports a single targeted theme at full width, and CI captures each theme separately.
- Route-level live screenshots are unauthenticated and read-only. Dynamic account data may remain in loading/empty states; this must not be mistaken for a component-style defect.
- Exact page-background artwork must remain sourced from the live theme engine. A flat substitute canvas is not equivalent.

## Completion criteria

A route is not marked visually matched until all of the following pass:

1. Same viewport, theme, route, content state and scroll position on both sides.
2. Same major page shell, navigation geometry, content width, column count and responsive breakpoints.
3. Source-backed matching of typography, line-height, spacing, border, radius, surface opacity, shadow and artwork.
4. Matched representative component states (default, hover/focus, active/selected, disabled, loading/empty and completion/error where applicable).
5. Automated screenshot comparison of the matched component regions, with documented tolerances for dynamic text, artwork animation and live data.
6. Desktop and mobile checks in both dark and light themes.
7. No production app imports or CSS changes as part of this isolated design-system phase.

## Current disposition

**Not complete.** The design-system repository remains isolated and no production application files have been modified. Reusable shell slots and route-specific shell fixtures have been added; full-width isolated theme captures and both-theme live-route capture are now part of CI. The route fixtures also reference the live theme artwork and root-relative background assets. The remaining implementation work is the route-shell and component-level correction listed above, followed by state-matched screenshot diffs.
