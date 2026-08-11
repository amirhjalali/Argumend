# Adversarial Review: docs/ARGUMENT_MODEL.md v1 (Opus, 2026-08-11)

Verbatim findings from the Opus adversarial spec review. All twelve amendments (A1-A12)
were accepted and incorporated into ARGUMENT_MODEL.md v1.1 the same day. Preserved here
as the rationale record for the v1 -> v1.1 changes.

Key findings incorporated:
- A1: §5.2 connectivity rule was unsatisfiable (QUESTION has degree zero by construction)
- A2: nothing could point at EVIDENCE — "limits_scope" edge added (Klarna workload-vs-headcount,
  OWID boundary critique, UBI scope limitation all required it)
- A3: EVIDENCE may now undercut INFERENCE directly (METR-vs-RCTs pattern)
- A4: "procedural" epistemicType + "authority-allocation" resolution kind (both corpora used
  PROCEDURAL as a top-level category)
- A5: EVIDENCE-vs-CLAIM decision rule — claims may not contain source attributions
- A6: attack-driven INFERENCE minting + warrantKind enum + warrant adequacy test
- A7: position-discrimination validator rule; §6 example repaired (p2 was an orphan)
- A8: depends_on decision rule ("state the source's strongest defense without the target");
  supports/depends_on coexisting pair forbidden (double-counts in crux scoring)
- A9: §9 migration rewritten honestly (crux→CLAIM requires generation; side→polarity inversion;
  the flagship verdict-badge break; mapped-or-dropped table)
- A10: ambiguous polarity → atomicity operation (split the claim)
- A11: node provenance + attributedTo + steelmanBasis
- A12: matrix reconciliation, →EVIDENCE column, superseded on EVIDENCE, contradicts ordering,
  overrideBasis, crux-engine input contract, Layer-1 render ordering

(The full ~6,000-word review text is preserved in the session record; this file is the
decision summary. Verdict: core commitments — five types, roles-by-edges, reified inference,
computed cruxes — survived attack and were retained.)
