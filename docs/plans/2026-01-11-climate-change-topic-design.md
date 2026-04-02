# Climate Change Topic Design

## Overview

**Topic:** Climate Change
**ID:** `climate-change`
**Meta Claim:** "Climate change is primarily caused by human activity"
**Confidence Score:** 95
**Status:** settled

The debate structure acknowledges the overwhelming scientific consensus (~97% of climate scientists) while still engaging seriously with skeptic arguments. Each pillar presents the strongest version of skeptic objections before showing why the evidence favors anthropogenic attribution.

## Pillar Structure

The three pillars create a layered proof:
1. **Pillar 1** proves the CO₂ is from us (isotopic evidence)
2. **Pillar 2** proves the warming matches our emissions (attribution modeling)
3. **Pillar 3** eliminates alternative explanations (natural factors)

---

## Pillar 1: The Isotopic Fingerprint

| Field | Value |
|-------|-------|
| ID | `isotopic-fingerprint` |
| Title | The Isotopic Fingerprint |
| Icon | `Atom` |
| Short Summary | Carbon isotope ratios in atmospheric CO₂ prove fossil fuel origin |

### Skeptic Premise
CO₂ levels have fluctuated naturally throughout Earth's history. The current rise could be from ocean outgassing, volcanic activity, or other natural carbon cycle variations. Correlation with industrialization doesn't prove causation.

### Proponent Rebuttal
Fossil fuels have a distinct isotopic signature - they're depleted in ¹³C because plants preferentially absorb lighter ¹²C. Since 1850, atmospheric δ¹³C has dropped precisely as predicted if fossil carbon is the source. This isn't correlation - it's a chemical fingerprint. Additionally, oxygen levels are dropping at the exact ratio expected from combustion (O₂ consumed per CO₂ produced), and ocean pH is declining as CO₂ dissolves. Three independent chemical signatures all point to burning fossil fuels.

### Crux: The Suess Effect Measurement

| Field | Value |
|-------|-------|
| ID | `suess-effect` |
| Title | The Suess Effect Measurement |
| Description | Measure the decline in atmospheric δ¹³C ratio over time |
| Verification Status | `verified` |
| Cost to Verify | $50K (ice core analysis + mass spectrometry) |

**Methodology:**
1. Extract CO₂ from ice cores (pre-industrial baseline)
2. Compare to modern atmospheric samples
3. Calculate δ¹³C shift and match to fossil fuel burning rate

**Equation:**
```
δ¹³C = ((¹³C/¹²C)_sample / (¹³C/¹²C)_standard - 1) × 1000‰
```

---

## Pillar 2: The Temperature Attribution

| Field | Value |
|-------|-------|
| ID | `temperature-attribution` |
| Title | The Temperature Attribution |
| Icon | `Telescope` |
| Short Summary | Observed warming patterns match greenhouse gas predictions, not natural cycles |

### Skeptic Premise
Climate models are unreliable - they failed to predict the 'hiatus' of 1998-2014 and consistently run hotter than observations. The warming could be natural variability we don't fully understand. Medieval Warm Period and Roman Climate Optimum show temperatures can shift without human influence.

### Proponent Rebuttal
Climate models successfully hindcast the entire 20th century temperature record, including the mid-century cooling from aerosols. The 'hiatus' was within model uncertainty bounds and is now understood as Pacific Decadal Oscillation masking. Crucially, models predict specific 'fingerprints': stratospheric cooling while troposphere warms (greenhouse signature), nights warming faster than days, and polar amplification. All three fingerprints are observed. Natural forcing alone produces a flat or cooling trend for 1950-present - only adding anthropogenic forcing matches reality.

### Crux: The Fingerprint Detection Test

| Field | Value |
|-------|-------|
| ID | `fingerprint-detection` |
| Title | The Fingerprint Detection Test |
| Description | Detect greenhouse-specific warming patterns vs solar/volcanic patterns |
| Verification Status | `verified` |
| Cost to Verify | $500K (supercomputer time + multi-model ensemble) |

**Methodology:**
1. Run climate models with natural forcing only (solar + volcanic)
2. Run models with anthropogenic forcing only (GHG + aerosols)
3. Run combined forcing
4. Statistical detection of which pattern matches observed record

**Equation:**
```
y(t) = β₁X_natural(t) + β₂X_anthropogenic(t) + ε(t)
```

---

## Pillar 3: The Natural Factors Elimination

| Field | Value |
|-------|-------|
| ID | `natural-factors-elimination` |
| Title | The Natural Factors Elimination |
| Icon | `Shield` |
| Short Summary | Solar activity, volcanic cycles, and orbital variations cannot explain the observed warming trend |

### Skeptic Premise
The Sun drives Earth's climate - small changes in solar output could have outsized effects through cosmic ray modulation or UV-ozone interactions. We've only been measuring solar irradiance directly since 1978. Historical correlations between solar cycles and climate are well-documented. Perhaps we're underestimating natural variability.

### Proponent Rebuttal
Solar irradiance has been flat or slightly declining since 1980 while temperatures accelerated upward - the correlation broke. Cosmic ray flux shows no trend matching temperature. Volcanic eruptions cause temporary cooling (Pinatubo 1991 clearly visible), confirming models work, but there's no volcanic trend to explain warming. Orbital (Milankovitch) cycles operate on 10,000+ year timescales and currently favor slight cooling. When you sum all natural factors, you get near-zero forcing since 1950. The energy imbalance (0.5-1 W/m²) measured by satellites requires an additional forcing - greenhouse gases are the only candidate that fits.

### Crux: The Energy Budget Closure Test

| Field | Value |
|-------|-------|
| ID | `energy-budget-closure` |
| Title | The Energy Budget Closure Test |
| Description | Account for all energy inputs and outputs to identify the forcing source |
| Verification Status | `verified` |
| Cost to Verify | $2M (satellite data + Argo network analysis) |

**Methodology:**
1. Measure incoming solar radiation (satellites)
2. Measure outgoing longwave radiation (satellites)
3. Calculate ocean heat uptake (Argo floats)
4. Sum all known natural forcings
5. Identify residual requiring anthropogenic explanation

**Equation:**
```
ΔQ = F - λΔT (where F = forcing, λ = feedback parameter)
```

---

## Implementation Notes

- Add topic to `data/topics.ts`
- Use existing pillar/crux patterns from Free Will topic
- Icons: Atom, Telescope, Shield (all available in Lucide)
- Images: Consider scientific visualizations (ice cores, temperature graphs, energy budget diagrams)
