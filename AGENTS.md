# Project architecture
- Keep each book's public page in its own TanStack route and presentation component so existing reader pages and signup flows stay independent.
- Keep each book's downloadable bonus collection separate, with its own local deployable assets, so readers receive the correct book-specific resources even when external asset URLs are unavailable.