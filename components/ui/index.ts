/**
 * Shared page primitives. Every page is built from these, inside AppShell:
 *
 *   <PageContainer width="reading">
 *     <PageHeader eyebrow="…" title="…" lede="…" />
 *     <Section title="…">…</Section>
 *     <Button href="…">One rust action</Button> <TextAction href="…">Quiet one</TextAction>
 *   </PageContainer>
 *
 * Tokens only: no raw palette hex and no `teal-*` classes in this folder
 * (lib/uiPrimitiveTokens.test.ts).
 */
export { Button, TextAction, buttonClasses, textActionClasses } from "./Button";
export type { ButtonProps, ButtonSize, ButtonVariant, TextActionProps } from "./Button";
export { Chip } from "./Chip";
export type { ChipSize } from "./Chip";
export { PageContainer, PAGE_GUTTER, PAGE_RHYTHM, PAGE_WIDTHS } from "./PageContainer";
export type { PageWidth } from "./PageContainer";
export { PageHeader, PAGE_TITLE_SIZES } from "./PageHeader";
export type { PageHeaderSize } from "./PageHeader";
export { Section } from "./Section";
