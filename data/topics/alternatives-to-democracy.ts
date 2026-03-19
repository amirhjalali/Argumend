import type { Topic } from "@/lib/schemas/topic";

export const alternativesToDemocracyData = {
  id: "alternatives-to-democracy",
  title: "Are There Better Systems Than Democracy?",
  meta_claim:
    "Liberal democracy, while historically successful, may be structurally incapable of addressing long-term existential challenges like climate change, AI governance, and pandemics, and alternative governance models deserve serious consideration.",
  status: "contested" as const,
  category: "philosophy" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "The Myth of the Rational Voter — Bryan Caplan",
      url: "https://press.princeton.edu/books/paperback/9780691138732/the-myth-of-the-rational-voter",
    },
    {
      title: "Against Democracy — Jason Brennan",
      url: "https://press.princeton.edu/books/hardcover/9780691162607/against-democracy",
    },
    {
      title: "Open Democracy: Reinventing Popular Rule for the 21st Century — Helene Landemore",
      url: "https://press.princeton.edu/books/hardcover/9780691181998/open-democracy",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Does voter ignorance undermine democratic legitimacy?",
      content:
        "Most citizens cannot identify their representatives or articulate basic policy positions, yet their votes determine government. Bryan Caplan argues voters are not just ignorant but systematically biased. Does this undermine the moral authority of democratic outcomes, or is the wisdom of crowds sufficient despite individual ignorance?",
    },
    {
      id: "q2",
      title: "Could sortition produce better governance than elections?",
      content:
        "Ancient Athens used random citizen selection. Modern citizens' assemblies in Ireland and France have successfully resolved contentious issues (abortion, climate policy) that elected officials could not. Could randomly selected representative panels replace or supplement elected legislatures?",
    },
    {
      id: "q3",
      title: "Is technocracy compatible with human rights?",
      content:
        "Singapore and China demonstrate that expert-led governance can produce rapid economic development — but at the cost of civil liberties. Is prosperity without political freedom a viable and stable long-term social contract, or does the absence of accountability inevitably lead to corruption and abuse?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Democratic Dysfunction
    // =========================================================================
    {
      id: "democratic-dysfunction",
      title: "Democratic Dysfunction & Short-Termism",
      short_summary:
        "Democracies face structural incentives toward short-term thinking, polarization, and regulatory capture that may make them systematically incapable of addressing existential challenges requiring sustained, multi-generational commitment. The question is whether these are bugs that can be fixed or features inherent to democratic governance.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The dysfunction critique treats democracy's current problems as permanent features rather than solvable malfunctions. Every historical era has produced claims that democracy is failing — yet democratic systems have consistently outperformed alternatives over time. The US Constitution is 237 years old; no authoritarian system has lasted as long without violent succession crises. Current dysfunction — polarization, gridlock, misinformation — reflects specific institutional design choices (two-party systems, gerrymandering, unlimited campaign spending) rather than inherent democratic limitations. Reforming these institutions within a democratic framework is both possible and preferable to abandoning democratic principles. Countries like Denmark, New Zealand, and Uruguay demonstrate that well-designed democracies can be responsive, effective, and long-term oriented.",
      proponent_rebuttal:
        "The reform argument assumes unlimited time for institutional evolution. Climate change requires halving emissions by 2030 and reaching net-zero by 2050 — a 25-year timeline that no democracy has shown the capacity to address at the required speed. The median tenure of a democratic leader is 4-5 years; China's leadership can plan in decades. Democratic publics consistently vote for lower energy prices over climate action, creating a structural impossibility: the policies required to address existential threats are electorally unviable. This is not a solvable design flaw — it is the mathematical consequence of aggregating short-term individual preferences into collective decisions about long-term collective threats. The Pew Research Center reports declining satisfaction with democracy across all major democracies, suggesting the dysfunction is systemic, not localized.",
      crux: {
        id: "democratic-reform-capacity",
        title: "The Reform Capacity Test",
        description:
          "The crux is whether democratic systems can reform themselves quickly enough to address existential challenges within the required timeframes. If democratic institutions demonstrate the capacity for rapid, sustained policy change on multi-generational issues (as some argue they did for the ozone layer), the dysfunction case weakens. If the track record shows systematic failure on long-horizon problems, alternative governance models become more compelling.",
        methodology:
          "Systematically compare democratic and non-democratic governance outcomes on five long-term challenges: climate emissions reduction, pandemic preparedness, infrastructure investment, debt management, and educational attainment. Control for GDP, geography, and development level. Assess whether democracies systematically underperform on long-horizon metrics while outperforming on human rights, corruption control, and citizen welfare. The Montreal Protocol (ozone) and Marshall Plan should serve as test cases for democratic capacity for long-term action.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1.5M (Comparative governance analysis across 50+ countries over 30 years)",
      },
      evidence: [
        {
          id: "pew-declining-democratic-satisfaction",
          title: "Pew: Declining Satisfaction with Democracy Across All Major Democracies",
          description:
            "Pew Research Center surveys from 2019-2024 show that majorities in most democracies are dissatisfied with how their democracy is working. In the US, 72% say they are dissatisfied; in France, 69%; in the UK, 69%; in Japan, 62%. Satisfaction with democracy has declined in 17 of 24 countries surveyed since 2017. The global trend suggests structural rather than country-specific dysfunction.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Pew Research Center",
          sourceUrl: "https://www.pewresearch.org/global/2024/02/12/in-many-countries-people-are-dissatisfied-with-democracy/",
          reasoning:
            "Pew surveys are methodologically rigorous and globally representative. The cross-national pattern of dissatisfaction is compelling. However, dissatisfaction with democracy does not mean alternative systems would perform better — people may be dissatisfied with specific outcomes rather than the system itself, which limits directness.",
        },
        {
          id: "montreal-protocol-democratic-success",
          title: "Montreal Protocol Shows Democracies Can Act on Long-Term Threats",
          description:
            "The 1987 Montreal Protocol, negotiated primarily by democracies, successfully addressed the ozone layer crisis through international cooperation and sustained regulation. CFC production was virtually eliminated, and the ozone layer is on track for full recovery by 2065. This demonstrates that democratic systems can identify long-term existential threats, build scientific consensus, negotiate binding international agreements, and sustain compliance over decades.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "United Nations Environment Programme; NASA",
          sourceUrl: "https://www.unep.org/ozonaction/who-we-are/about-montreal-protocol",
          reasoning:
            "The Montreal Protocol is the strongest counter-example to the claim that democracies cannot address long-term threats. It directly demonstrates democratic capacity for sustained, effective environmental action. Replicability is lower because the ozone problem was simpler than climate change — fewer industries affected, cheaper substitutes available, and the threat was more immediate and visible.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Alternative Models
    // =========================================================================
    {
      id: "alternative-models",
      title: "Alternative Governance Models",
      short_summary:
        "Proposals including epistocracy (weighted voting by knowledge), sortition (random citizen selection), liquid democracy (delegable proxy voting), and futarchy (prediction market governance) offer theoretical improvements over electoral democracy. The question is whether any has been tested at sufficient scale to evaluate seriously.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Alternative governance models have actually been tested — and they work. Ireland's Citizens' Assembly, composed of randomly selected citizens, resolved the decades-long abortion deadlock in 2018 by recommending repeal of the constitutional ban, which voters then approved by a two-thirds majority. France's Citizens' Convention on Climate proposed 149 measures in 2020, of which 146 were accepted by the government. These sortition-based bodies produced better policy outcomes than elected legislatures on the same issues because randomly selected citizens, given time and expert testimony, are more deliberative and less partisan than elected officials accountable to interest groups and media cycles.",
      proponent_rebuttal:
        "Citizens' assemblies are advisory bodies that derive their legitimacy from the democratic system they operate within — they are supplements to democracy, not alternatives. Ireland's Citizens' Assembly was convened by elected officials, its recommendations required approval through a democratic referendum, and its members had no accountability if their advice proved disastrous. The French Citizens' Convention had most of its proposals diluted or abandoned by the Macron government, demonstrating that advisory bodies without electoral power cannot overcome entrenched interests. As for epistocracy and technocracy, who selects the experts? Every 'neutral' selection process embeds the values of its designers. Singapore's technocratic success coincides with authoritarian control of media, restrictions on assembly, and political detention — successes that cannot be separated from the coercion that enables them.",
      crux: {
        id: "sortition-scale-test",
        title: "The Sortition Scaling Experiment",
        description:
          "The crux is whether sortition (randomly selected citizen panels) can scale from advisory bodies to binding decision-making authority without losing the deliberative quality that makes them effective. If a large-scale sortition body with real legislative power produces better outcomes than an elected legislature on measurable metrics, it becomes a viable democratic reform rather than a theoretical alternative.",
        methodology:
          "Implement a randomized comparison where a sortition body and an elected legislature simultaneously address the same policy question in a controlled setting. Measure outcome quality (expert evaluation of policy coherence, cost-effectiveness, long-term sustainability), public satisfaction, inclusiveness (demographic representation), and resistance to lobbying pressure. Begin at the municipal level in 5-10 volunteer cities across multiple countries to enable cross-cultural comparison.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-15M (Multi-city experimental comparison of governance models)",
      },
      evidence: [
        {
          id: "ireland-citizens-assembly",
          title: "Ireland's Citizens' Assembly Resolved the Abortion Deadlock (2016-2018)",
          description:
            "Ireland's Citizens' Assembly, composed of 99 randomly selected citizens and a Supreme Court judge as chair, deliberated on the Eighth Amendment (abortion ban) over five months in 2016-2017. The assembly recommended allowing abortion with a two-thirds supermajority — a position elected officials had been unable to reach for decades. The subsequent referendum approved the recommendation by 66.4%, closely matching the assembly's vote. The process is widely cited as a model of deliberative democracy resolving a contentious issue that representative democracy could not.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "The Citizens' Assembly of Ireland; The Irish Times",
          sourceUrl: "https://www.citizensassembly.ie/en/",
          reasoning:
            "This is a well-documented, real-world application of sortition that produced a measurably better outcome than elected representatives achieved. Independence and reliability are high because the process was publicly transparent with documented proceedings. Replicability is somewhat lower because the specific conditions (small, relatively homogeneous country with high social trust) may not translate to larger, more diverse nations.",
        },
        {
          id: "singapore-technocracy-limitations",
          title: "Singapore's Technocratic Success Depends on Authoritarian Control",
          description:
            "Singapore is frequently cited as proof that technocratic governance works — consistently ranking among the world's least corrupt, most efficient, and most economically successful nations. However, Freedom House classifies Singapore as 'partly free,' noting restrictions on freedom of speech, press, and assembly. The ruling People's Action Party has held power continuously since 1959 through a system that combines genuine competence with gerrymandering, defamation lawsuits against opposition leaders, and media control. The causal question is whether Singapore's success requires its authoritarian elements or occurs despite them.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Freedom House; The Economist Intelligence Unit; World Bank Governance Indicators",
          sourceUrl: "https://freedomhouse.org/country/singapore/freedom-world/2024",
          reasoning:
            "Freedom House and EIU are independent and well-regarded governance assessment organizations. The evidence directly challenges the technocracy model by showing that the most successful example depends on authoritarian control. However, Singapore's supporters argue that its restrictions are mild and that democracy would produce worse outcomes for the city-state.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: The Churchill Defense
    // =========================================================================
    {
      id: "churchill-defense",
      title: "The Error-Correction Mechanism",
      short_summary:
        "Democracy's greatest strength may be its capacity for self-correction through peaceful transfer of power, free press accountability, and electoral feedback. The question is whether this error-correction capacity is unique to democracy or whether other systems can incorporate similar mechanisms without the inefficiencies of electoral politics.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Democracy's error-correction mechanism is irreplaceable precisely because it is imperfect. Authoritarian systems can make faster decisions but cannot easily reverse catastrophic ones — Mao's Great Leap Forward killed 45 million people, and there was no mechanism to stop him. Democratic error-correction works through multiple channels simultaneously: elections remove failed leaders, free press exposes corruption, independent courts constrain overreach, and civil society organizes opposition. No alternative system has replicated this redundancy. Technocracies concentrate error in expert failures (economists missed 2008, epidemiologists bungled early COVID messaging); epistocracies assume knowledge correlates with wisdom; and sortition removes accountability entirely since randomly selected officials face no electoral consequences for bad decisions.",
      proponent_rebuttal:
        "The error-correction defense proves less than it claims. Democratic error-correction is slow — it took two decades for democracies to begin seriously addressing climate change after scientific consensus was established, and the response remains inadequate. The feedback loop requires that voters correctly identify policy failures and attribute them to the responsible officials, but systematic research shows that voters are poor at both tasks: they reward or punish incumbents for economic conditions caused by global factors and routinely support policies that experts warn will fail. Furthermore, democracy's self-correction has not prevented the rise of authoritarian populists within democratic systems — Trump, Orban, Erdogan, and others have used democratic mechanisms to weaken democratic institutions. If democracy cannot protect itself from internal subversion, its error-correction capacity may be more theoretical than practical.",
      crux: {
        id: "error-correction-comparison",
        title: "The Comparative Error-Correction Assessment",
        description:
          "The crux is whether democracy's error-correction mechanisms — elections, free press, independent courts, civil society — produce measurably better policy outcomes over time compared to alternative governance systems with different feedback mechanisms. If democracies consistently outperform alternatives in recovering from policy errors and adapting to changing conditions, the Churchill defense is empirically validated.",
        methodology:
          "Compare recovery times from major policy failures across governance types. Analyze how quickly democracies vs. authoritarian states corrected course after financial crises, environmental disasters, public health emergencies, and military conflicts. Measure policy persistence (how long failed policies continue) and adaptation speed (how quickly governments respond to new information). Use natural experiments where similar challenges affected both democratic and non-democratic states simultaneously.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Historical comparative analysis of governance responses to crises)",
      },
      evidence: [
        {
          id: "amartya-sen-famine-democracy",
          title: "Amartya Sen: No Democracy Has Experienced a Major Famine",
          description:
            "Nobel laureate economist Amartya Sen demonstrated that no functioning democracy with a free press has ever experienced a major famine. His research shows that democratic accountability and press freedom create information flows and political incentives that prevent the worst governance failures. India experienced its last major famine in 1943 under British colonial rule; democratic India, despite being poorer than China, avoided famine while Mao's China experienced the deadliest famine in human history (1959-1961, estimated 15-55 million deaths).",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "Amartya Sen; Oxford University Press; Nobel Prize Committee",
          sourceUrl: "https://www.nobelprize.org/prizes/economic-sciences/1998/sen/lecture/",
          reasoning:
            "Sen's research is among the most cited in political economy and directly demonstrates democracy's error-correction advantage on the most extreme governance outcome (preventing mass starvation). The finding has held up across additional countries and time periods since its original publication.",
        },
        {
          id: "democratic-backsliding-trend",
          title: "V-Dem Institute Reports 15 Years of Continuous Democratic Backsliding",
          description:
            "The V-Dem Institute's annual democracy report documents 15 consecutive years of democratic backsliding globally as of 2024, with the number of countries becoming more autocratic exceeding those becoming more democratic each year. Elected leaders in Hungary, Turkey, India, and elsewhere have used democratic mandates to weaken independent courts, constrain press freedom, and entrench their own power. This trend suggests that democracy's self-correction mechanisms may be insufficient to prevent internal subversion.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "V-Dem Institute; University of Gothenburg",
          sourceUrl: "https://www.v-dem.net/publications/democracy-reports/",
          reasoning:
            "V-Dem is the most comprehensive democracy measurement project in political science, with high reliability and independence. The backsliding trend directly challenges the error-correction thesis by showing that democratic systems can be subverted from within. However, some scholars argue backsliding represents democracies under stress rather than democracies failing — the correction may simply take longer.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
