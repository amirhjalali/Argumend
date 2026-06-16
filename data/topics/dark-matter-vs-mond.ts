import type { Topic } from "@/lib/schemas/topic";

export const darkMatterVsMondData = {
  id: "dark-matter-vs-mond",
  title: "Dark Matter vs. MOND",
  meta_claim:
    "Dark matter, rather than modified gravity (MOND), is the correct explanation for galactic dynamics.",
  status: "contested" as const,
  category: "science" as const,
  last_updated: "2026-06-16",
  tags: [
    "cosmology",
    "astrophysics",
    "dark matter",
    "MOND",
    "modified gravity",
    "galaxy rotation curves",
  ],
  pillars: [
    {
      id: "galaxy-scale",
      title: "Galaxy-Scale Dynamics",
      short_summary:
        "Individual galaxies show a tight, single-parameter link between the gravity we observe and the gravity their visible matter alone would produce — the signature MOND predicts, and which dark matter must reproduce as a 'conspiracy'.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "On galaxy scales the data look astonishingly MOND-like. Across 153 rotating galaxies of wildly different masses, sizes, and gas fractions, the observed acceleration at every radius is fixed by the baryons alone to within ~0.06 dex (~13%) scatter — most of it observational. There is a single acceleration scale, a0 ~ 1.2 x 10^-10 m/s^2, below which the discrepancy appears, and it equals roughly cH0/6, hinting at a deep link between local dynamics and cosmology. Milgrom predicted these rotation-curve shapes and the baryonic Tully-Fisher relation a priori, before the measurements existed. For dark matter to mimic this, the invisible halo must finely track the visible disk in every galaxy — a coincidence the standard model does not naturally explain.",
      proponent_rebuttal:
        "The radial acceleration relation is real, but it is an emergent regularity of galaxy formation, not proof that gravity is modified. Cold-dark-matter simulations with realistic feedback reproduce a tight relation with a characteristic acceleration scale, because halo and disk assemble together. A galaxy-scale fitting formula does not extend to clusters, cosmology, or the cosmic web, where MOND requires extra unseen mass anyway — so even MOND needs a dark component. Dark matter is one hypothesis that works across all scales; MOND works beautifully on one.",
      crux: {
        id: "rar-universality",
        title: "Is the Radial Acceleration Relation Truly Universal?",
        description:
          "Whether the link between observed and baryonic acceleration is an exact law with zero intrinsic scatter (favoring a modified force) or a tight-but-imperfect correlation with residual halo-to-halo variation (favoring dark matter).",
        methodology:
          "Measure rotation curves and baryonic mass models for large, homogeneous galaxy samples (HI/Halpha kinematics + Spitzer 3.6um photometry). Decompose the residual scatter into observational error vs. intrinsic scatter; test whether residuals correlate with any galaxy property (a dark-matter signature) or vanish (a modified-gravity signature).",
        equation:
          "g_{obs} = \\frac{g_{bar}}{1 - e^{-\\sqrt{g_{bar}/g_\\dagger}}}, \\quad g_\\dagger \\approx 1.2\\times10^{-10}\\,\\mathrm{m\\,s^{-2}}",
        verification_status: "verified" as const,
        cost_to_verify: "$2M (Deep multi-wavelength galaxy survey + reanalysis)",
      },
      evidence: [
        {
          id: "radial-acceleration-relation",
          title: "Tight Radial Acceleration Relation (~0.13 dex Scatter)",
          description:
            "Across 2693 data points in 153 SPARC galaxies, the observed centripetal acceleration is set by the baryonic distribution alone, with an observed rms scatter of only ~0.13 dex, most of it attributable to observational uncertainty (the intrinsic scatter is consistent with zero). The relation has a single acceleration scale and matches the MOND functional form.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "McGaugh, Lelli & Schombert, 'Radial Acceleration Relation in Rotationally Supported Galaxies,' Phys. Rev. Lett. 117, 201101 (2016)",
          sourceUrl: "https://arxiv.org/abs/1609.05917",
          reasoning:
            "Strong, replicable, directly relevant result on galaxy scales: the data behave exactly as MOND predicts. Coded 'against' the dark-matter meta-claim because the tightness is the central galaxy-scale challenge to dark matter. Weighted high but not maximal because dark-matter advocates argue galaxy-formation physics can reproduce the relation, so it does not by itself falsify dark matter.",
        },
        {
          id: "rar-individual-fits",
          title: "RAR Holds Galaxy-by-Galaxy With No Detectable a0 Variation",
          description:
            "Fitting the radial acceleration relation to individual SPARC galaxies (rather than the stacked sample) finds an rms scatter of ~0.057 dex and no credible indication that the critical acceleration scale varies from galaxy to galaxy, consistent with a single universal constant as MOND predicts.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source:
            "Li, Lelli, McGaugh & Schombert, 'Fitting the Radial Acceleration Relation to Individual SPARC Galaxies,' A&A 615, A3 (2018)",
          sourceUrl: "https://arxiv.org/abs/1803.00022",
          reasoning:
            "Reinforces the universality of the acceleration scale. Slightly lower independence/reliability weights than the headline RAR paper because it shares the SPARC data and author group, so it is corroborating rather than fully independent.",
        },
        {
          id: "baryonic-tully-fisher",
          title: "MOND Predicted Rotation-Curve Shapes and the Tully-Fisher Slope A Priori",
          description:
            "MOND predicts that rotation-curve shape follows from the baryonic mass distribution and that the baryonic Tully-Fisher relation has slope 4 (mass proportional to velocity^4). Milgrom made these predictions before low-mass and low-surface-brightness galaxy data existed, and the predicted morphologies are observed.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "McGaugh, 'Predictions and Outcomes for the Dynamics of Rotating Galaxies,' Galaxies 8, 35 (2020) (review)",
          sourceUrl: "https://arxiv.org/abs/2004.14402",
          reasoning:
            "A priori predictive success is epistemically valuable. Weighted moderately: the source is a review by a leading MOND advocate (lower independence), the Tully-Fisher relation was known beforehand with an uncertain slope, and predictive success of a formula does not establish the underlying mechanism.",
        },
      ],
    },
    {
      id: "cluster-cosmic-scale",
      title: "Clusters and Cosmic Scale",
      short_summary:
        "On the largest scales — colliding clusters and the cosmic microwave background — the evidence points hard at a non-baryonic mass component, and MOND alone falls short by roughly a factor of two.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Even granting MOND's galaxy-scale wins, the standard cold-dark-matter (Lambda-CDM) model is extraordinarily successful where MOND struggles. The CMB acoustic peaks — especially the height of the third peak relative to the second — require a non-baryonic matter component, and the six-parameter Lambda-CDM fit to Planck data is excellent. In the Bullet Cluster, two clusters collided and the gravitational-lensing mass cleanly separated from the X-ray gas at high significance, exactly as collisionless dark matter predicts and hard for modified gravity to mimic. And MOND itself fails inside galaxy clusters, where it still needs roughly twice the observed baryonic mass — i.e., extra unseen matter.",
      proponent_rebuttal:
        "These are genuine successes for dark matter, but relativistic extensions of MOND (e.g. TeVeS-type and more recent covariant theories) can fit CMB and lensing data, and the cluster residual mass could be ordinary baryons we have not yet detected or light neutrinos rather than cold dark matter. The Bullet Cluster offset shows that *some* collisionless mass is present, which constrains pure-baryon modified gravity, but does not by itself pin down the particle nature of that mass. The decisive point for MOND advocates is that no dark-matter particle has ever been detected directly despite decades of increasingly sensitive experiments.",
      crux: {
        id: "cmb-third-peak",
        title: "The CMB Third Acoustic Peak",
        description:
          "The relative heights of the acoustic peaks in the cosmic microwave background encode the ratio of dark matter to baryons. A third peak nearly as high as the second indicates a substantial non-baryonic matter component that drove gravitational collapse without participating in photon-baryon oscillations.",
        methodology:
          "Measure the CMB temperature (and polarization) angular power spectrum to high precision; fit the peak positions and heights with cosmological models. Compare a baryon-only universe (where peaks decay sequentially) against models with non-baryonic cold dark matter (which boosts odd/higher peaks), and test whether modified-gravity alternatives can match the same spectrum.",
        equation:
          "\\Omega_c h^2 \\approx 0.120, \\quad \\Omega_b h^2 \\approx 0.0224 \\;\\;(\\text{Planck 2018})",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (Reanalysis of existing Planck/ACT/SPT data)",
      },
      evidence: [
        {
          id: "bullet-cluster",
          title: "Bullet Cluster: Mass Separated From Gas at 8-Sigma",
          description:
            "In the colliding cluster 1E0657-558, weak gravitational lensing locates the center of total mass offset from the X-ray gas (the dominant baryonic component) at 8-sigma significance. The collisionless mass passed through the collision while the gas was slowed — the behavior expected of dark matter, and difficult for modified gravity without a dark component.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "Clowe et al., 'A Direct Empirical Proof of the Existence of Dark Matter,' ApJ 648, L109 (2006)",
          sourceUrl: "https://arxiv.org/abs/astro-ph/0608407",
          reasoning:
            "Direct, high-significance, widely-replicated observation that the gravitating mass is offset from the baryons. Among the strongest evidence that gravity alone cannot explain the dynamics without extra (collisionless) mass. Directness 9 rather than 10 because it demonstrates a collisionless mass component, not the specific particle identity of dark matter.",
        },
        {
          id: "cmb-acoustic-peaks",
          title: "CMB Acoustic Peaks Require Non-Baryonic Matter",
          description:
            "The Planck CMB power spectrum is fit by the six-parameter Lambda-CDM model with cold dark matter density Omega_c h^2 ~ 0.120 and baryon density Omega_b h^2 ~ 0.0224 — about five times more non-baryonic matter than baryons. The height of the third acoustic peak relative to the second is a direct signature of this non-baryonic component.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source:
            "Planck Collaboration, 'Planck 2018 Results. VI. Cosmological Parameters,' A&A 641, A6 (2020)",
          sourceUrl: "https://arxiv.org/abs/1807.06209",
          reasoning:
            "Exceptionally reliable, precise, independently reproduced (ACT, SPT) measurement; Lambda-CDM fits it with high precision. Directness 8 rather than 9-10 because relativistic MOND extensions claim to reproduce a CMB spectrum, so it strongly favors but does not uniquely prove particle dark matter over all modified-gravity theories.",
        },
        {
          id: "mond-cluster-failure",
          title: "MOND Still Needs ~2x Extra Mass in Galaxy Clusters",
          description:
            "Inside galaxy clusters, accelerations are relatively high, so MOND's modification is small — yet the gas dynamics imply gravity exceeding the MOND prediction. Standard MOND under-predicts the required mass by roughly a factor of two, so even within the MOND framework clusters require additional unseen matter (e.g. undetected baryons or massive neutrinos).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Hodson & Zhao, 'Generalizing MOND to Explain the Missing Mass in Galaxy Clusters,' A&A 598, A127 (2017)",
          sourceUrl: "https://arxiv.org/abs/1701.03369",
          reasoning:
            "A genuine, well-documented shortfall of plain MOND on cluster scales, acknowledged even by works seeking to rescue MOND. Coded 'for' the dark-matter claim because it shows modified gravity alone is insufficient. Weighted moderately because the residual could in principle be ordinary baryons or neutrinos rather than cold dark matter, and the source's aim is to repair MOND.",
        },
        {
          id: "no-direct-detection",
          title: "No Dark-Matter Particle Detected Despite Decades of Searches",
          description:
            "Direct-detection experiments (e.g. multi-tonne xenon detectors) and collider searches have steadily tightened limits on weakly-interacting dark-matter particles without a confirmed signal, leaving the particle nature of dark matter unestablished and keeping modified-gravity explanations on the table.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "Bertone & Hooper, 'A History of Dark Matter,' Rev. Mod. Phys. 90, 045002 (2018) (review of detection efforts)",
          sourceUrl: "https://arxiv.org/abs/1605.04909",
          reasoning:
            "Absence of direct detection is real and weakens the strongest version of the particle-dark-matter claim. Directness only 5 because non-detection is consistent with dark matter that interacts more weakly than current sensitivity, so it constrains rather than refutes; weighted as a moderate point favoring continued openness to MOND.",
        },
      ],
    },
  ],
};
