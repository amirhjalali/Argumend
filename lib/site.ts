/** Canonical public-site identity shared by metadata and machine surfaces. */
export const SITE_URL = "https://argumend.org";
export const SITE_NAME = "ARGUMEND";

export const SITE_DESCRIPTION =
  "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.";

/** Honest corpus-level dates for records without their own editorial dates. */
export const CONTENT_FIRST_PUBLISHED = "2025-01-01";
export const CONTENT_LAST_UPDATED = "2026-07-31";
/** Review date for the small ArgumentGraph flagship registry, not the legacy corpus. */
export const ARGUMENT_TOPICS_FIRST_PUBLISHED = "2026-08-11";
export const ARGUMENT_TOPICS_LAST_UPDATED = "2026-08-12";

/** Stable identifiers let separate JSON-LD blocks describe the same entities. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const WEB_APPLICATION_ID = `${SITE_URL}/#webapp`;
