import type { Topic } from "@/lib/schemas/topic";

export const socialMediaMentalHealthData = {
  id: "social-media-mental-health",
  title: "Social Media and Teen Mental Health",
  meta_claim:
    "Social media use is a primary cause of the teen mental health crisis that began around 2012.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "temporal-correlation",
      title: "The Temporal Correlation",
      short_summary:
        "Teen depression and anxiety rates spiked precisely when smartphone adoption became universal.",
      image_url:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Correlation is not causation. Many other factors changed around 2012: economic recovery from recession, increased academic pressure, climate anxiety, political polarization. Self-reported mental health may reflect changing attitudes toward disclosure.",
      proponent_rebuttal:
        "The timing is remarkably precise across multiple countries that adopted smartphones at different rates. The effect is concentrated in girls and heavy users. Internal Facebook research (leaked) showed Instagram specifically made body image issues worse for teenage girls.",
      crux: {
        id: "dose-response",
        title: "Dose-Response Relationship",
        description:
          "If social media causes harm, we should see linear or threshold effects correlating usage hours with mental health outcomes.",
        methodology:
          "Longitudinal study tracking social media usage (passive measurement, not self-report) against validated mental health assessments. Control for confounders.",
        equation:
          "MH_{score} = \\beta_0 + \\beta_1 \\cdot \\text{hours} + \\beta_2 \\cdot \\text{hours}^2 + \\epsilon",
        verification_status: "verified" as const,
        cost_to_verify: "$5M (Longitudinal study with passive measurement)",
      },
    },
    {
      id: "mechanism-identification",
      title: "Causal Mechanisms",
      short_summary:
        "Specific features of social media platforms are designed to exploit psychological vulnerabilities.",
      image_url:
        "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Blaming technology is a moral panic repeated throughout history (TV, video games, rock music). Teens have always faced social pressures. Social media also provides benefits: community, information, creative expression.",
      proponent_rebuttal:
        "Unlike previous technologies, social media uses AI-optimized engagement algorithms, infinite scroll, variable reward schedules (like slot machines), and social comparison metrics (likes, followers). Internal documents show platforms knew about harms and optimized for engagement anyway.",
      crux: {
        id: "algorithm-experiment",
        title: "The Algorithm Experiment",
        description:
          "Randomized trial comparing engagement-optimized feeds vs. chronological/curated feeds on mental health outcomes.",
        methodology:
          "Partner with platforms or use browser extensions to randomly assign teens to different feed algorithms. Measure anxiety, depression, sleep, and self-esteem over 6 months.",
        equation:
          "\\Delta MH = f(\\text{algorithm type}, \\text{baseline MH}, \\text{usage hours})",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$10M (Requires platform cooperation or technical workaround)",
      },
    },
  ],
};
