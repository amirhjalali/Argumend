export const openBordersData = {
  id: "open-borders",
  title: "The Case for Open Borders",
  question:
    "Should rich countries open their borders, or at least let in far more people?",
  meta_claim:
    "Greatly relaxing or eliminating immigration restrictions in rich countries would produce large economic gains and is morally justified.",
  status: "highly_speculative" as const,
  category: "policy" as const,
  // As of 3 November 2026: Gallup's 2025 World Poll counts about 900 million
  // adults who would like to move abroad for good; US southwest border
  // encounters in fiscal 2025 were the lowest since 1970 (Pew); Brookings/AEI
  // estimate US net migration was negative in 2025.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "About 900 million adults, 15% of the world's, told Gallup in 2025 that they would like to move to another country for good; 134 million named the US. The same worker earns several times more there than at home. Yet the US went the other way: border crossings in fiscal 2025 were the lowest since 1970, and economists at Brookings and AEI estimate more people left than arrived. The fight is over how much of the prize would survive movement on that scale, and who has the right to decide.",
    confidence: 85,
    source:
      "Gallup, 'Desire to Move Permanently to U.S. at New Low' (23 April 2026); Pew Research Center (2 February 2026); Edelberg, Veuger & Watson, Brookings (13 January 2026)",
    sourceUrl: "https://news.gallup.com/poll/708614/desire-migrate-drops-new-low.aspx",
  },
  simple_case: [
    "The answer bears on how many people rich countries admit, on the incomes of the world's poorest workers, and on whether turning someone away is the default or a choice that has to be justified.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The prize
    // =========================================================================
    {
      id: "economic-arguments",
      title: "The Prize: The Same Worker Earns Far More Across the Border",
      short_summary:
        "A worker who moves from a poor country to the US earns several times what the same worker earns at home. Add that up across the world and models put the gain from free movement at 50% to 150% of world GDP. Those are extrapolations from small moves, as both sides grant. The costs, to low-paid native workers and to local budgets, are real but measured in much smaller numbers.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The headline gains are a thought experiment, not a forecast. They assume a Haitian worker in Miami stays as productive as other workers in Miami however many others arrive, and that housing, schools and clinics expand smoothly. Neither happens fast. Costs land on specific people: Borjas estimates that a 10% rise in the supply of competing workers cuts their wages by 3% to 4%, falling on those without a high school diploma. The National Academies found immigrants' fiscal effect negative in the short run and at the state and local level, where schools and emergency care are paid for. A plan that doubles world GDP on paper but breaks local budgets and low-wage labor markets in the places people move to will not survive the voters who live there.",
      proponent_rebuttal:
        "No other policy comes close. Clemens, Montenegro and Pritchett found a worker from the median poor country earns about 2.7 times as much in the US as an identical worker at home, and a Haitian over seven times as much. The gain comes from the place, not the person, so restricting movement leaves the largest price distortion in the world economy in place. Clemens's survey of the models puts the global gain at 50% to 150% of world GDP, one to two orders of magnitude more than freeing all remaining trade. Proponents grant those figures are extrapolations; even a tenth would dwarf any aid program. And restriction has costs too: when US net migration turned negative in 2025, Brookings and AEI economists estimate it took 0.2 to 0.3 points off GDP growth.",
      crux: {
        id: "gdp-gains-estimation",
        title: "Global GDP Gains from Labor Mobility",
        question:
          "How large would the real gains from freer migration be once fiscal, wage and transition costs are counted?",
        description:
          "The models agree on the mechanism: workers are worth more in high-productivity economies. They disagree by orders of magnitude on the size once costs are counted: lower pay for competing native workers, short-run strain on local budgets, housing and services, and the time it takes migrants' earnings to rise.",
        methodology:
          "Measure gains and costs where large barriers actually fell, such as EU enlargement in 2004 and 2007, and compare them with what global models predicted for a move of that size: migrants' earnings over time, wage effects on competing natives by skill, net fiscal effect at national and local level, and housing costs in receiving cities.",
        equation:
          "\\Delta\\text{GDP}_{\\text{world}} = \\sum_{i,j} (\\text{MPL}_j - \\text{MPL}_i) \\times \\Delta L_{i \\to j} - \\text{Transition Costs}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Compare the gains seen when large migration barriers actually fell, such as EU enlargement in 2004, with what global models predicted for a move of that size, counting fiscal costs, wage effects and how quickly migrants' earnings rose.",
        },
        cost_to_verify: "$5M (global economic modeling on existing data)",
        falsification: {
          supporter_flip:
            "If studies of large openings like EU enlargement found that fiscal, wage, housing and integration costs consumed most of the earnings gain migrants made, the economic case for opening at scale would shrink to a case for modest increases.",
          skeptic_flip:
            "If a large opening repeated what the place-premium data imply, migrants earning several times more with only small, temporary costs to native workers and local budgets, the claim that costs cancel the gains would lose its footing.",
          common_ground:
            "Both sides agree the same worker earns several times more in a rich country, that the 50% to 150% of world GDP figures are extrapolations, and that costs fall most on low-paid native workers and on local budgets in the short run.",
          live_disagreement:
            "How much of the place premium survives at large scale once costs are counted, and whether the costs to low-paid natives, which the immigration-and-wages map weighs in detail, are small or large.",
        },
      },
      evidence: [
        {
          id: "place-premium-2008",
          title: "Clemens, Montenegro & Pritchett: a worker from the median poor country earns 2.7 times more in the US; a Haitian over 7 times",
          description:
            "Using data on more than two million workers from 42 developing countries, the authors compared wages of observably identical workers inside and outside the US, adjusting for country of birth and of education and for willingness to migrate. 'A worker from the median country would earn about 2.7 times as much in the US as at home.' For a Peruvian worker the ratio is about 2.6; 'For Filipino it is around 3.5, and for a Haitian it is over 7.' The authors conclude that border barriers create one of the largest known forms of wage discrimination and one of the largest remaining price distortions in world markets.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Clemens, Montenegro & Pritchett, 'The Place Premium: Wage Differences for Identical Workers across the U.S. Border', Center for Global Development Working Paper 148 (2008)",
          sourceUrl:
            "https://www.cgdev.org/publication/place-premium-wage-differences-identical-workers-across-us-border-working-paper-148",
          reasoning:
            "Large data and careful corrections for who chooses to move make this the firmest number in the case. It measures the gain to a marginal migrant under today's restrictions; it cannot say whether the premium would hold if many millions moved at once, which is the next pillar's question.",
        },
        {
          id: "clemens-gdp-estimates",
          title: "Clemens 2011: models put the gain from free labor mobility at 50–150% of world GDP",
          description:
            "Michael Clemens's survey of the modeling literature found that fully removing barriers to labor mobility could raise world GDP by roughly 50% to 150%. He stresses these are 'large fractions of world GDP', one to two orders of magnitude larger than the gains from removing all remaining barriers to trade and capital: 'trillion-dollar bills on the sidewalk.' The gains come from moving workers from low- to high-productivity places.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source:
            "Clemens, 'Economics and Emigration: Trillion-Dollar Bills on the Sidewalk?', Journal of Economic Perspectives 25(3):83-106 (2011)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/jep.25.3.83",
          reasoning:
            "A widely cited survey in a top journal. The figures come from a handful of models that extrapolate from small moves to a world without borders, so they show the order of magnitude at stake, not a forecast; replicability and directness are 5.",
        },
        {
          id: "brookings-net-migration-2025",
          title: "Brookings/AEI 2026: US net migration was negative in 2025, trimming 0.2–0.3 points off GDP growth",
          description:
            "Wendy Edelberg (Brookings), Stan Veuger (AEI) and Tara Watson (Brookings) estimate 'that net migration was between –10,000 and –295,000 in 2025', and project between –925,000 and +185,000 for 2026. They estimate lower immigration cut GDP growth by roughly 0.2 to 0.3 percentage points in 2025 and 0.1 to 0.3 points in 2026, reduced consumer spending by $60 billion to $110 billion over the two years, and lowered the pace of job growth needed to hold unemployment steady to 20,000 to 50,000 a month in late 2025.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Edelberg, Veuger & Watson, 'Macroeconomic implications of immigration flows in 2025 and 2026: January 2026 update', Brookings Institution (13 January 2026)",
          sourceUrl:
            "https://www.brookings.edu/articles/macroeconomic-implications-of-immigration-flows-in-2025-and-2026/",
          reasoning:
            "A cross-ideological team (Brookings and AEI) estimating a real reversal, so independence is high. It shows that closing the door has a measurable growth cost; it does not show that opening it wide would produce gains of the size the models predict, and total GDP is not GDP per native, which is the figure critics care about.",
        },
        {
          id: "borjas-wage-impact",
          title: "Borjas: 10% more competing workers cuts their wages 3–4%, hitting those without a diploma",
          description:
            "Harvard economist George Borjas estimates that a 10% increase in the supply of workers with a given skill level, through immigration, reduces the wages of native workers with that skill by 3% to 4%. The effect concentrates on workers without a high school diploma, disproportionately Black and Hispanic. Open borders would mean far more than a 10% increase. Card, Peri and others find much smaller effects; the immigration-and-wages map sets out that dispute.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Borjas, 'Immigration Economics', Harvard University Press (2014)",
          sourceUrl: "https://www.hup.harvard.edu/books/9780674049772",
          reasoning:
            "A leading labor economist's estimate, contested by others who find small effects. Its relevance here is the extrapolation: if even a modest elasticity holds, open-borders inflows would cut the pay of the lowest-paid natives sharply. That extrapolation is beyond what any study measured.",
        },
        {
          id: "fiscal-impact-analyses",
          title: "National Academies 2016: immigrants are a fiscal gain over 75 years but a short-run cost to states and towns",
          description:
            "The National Academies of Sciences report found that immigration's long-run fiscal effect depends heavily on assumptions. Under one 75-year scenario a newly arrived immigrant has a net present value of about +$259,000 (about +$58,000 across all first-generation immigrants), but effects are negative in the short run and at the state and local level, where most education costs fall. Results swing with discount rates and with how the cost of public goods such as defense is assigned.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'The Economic and Fiscal Consequences of Immigration' (2016)",
          sourceUrl: "https://www.nationalacademies.org/publications/23550",
          reasoning:
            "The most authoritative US fiscal accounting, and it cuts both ways: positive over the long run, negative where and when the bills arrive. It measures today's mix of immigrants, selected by today's rules, not the mix an open border would bring.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: The golden goose — does the premium survive scale?
    // =========================================================================
    {
      id: "institutions-and-scale",
      title: "The Golden Goose: Would Mass Movement Erode What Makes Rich Countries Rich?",
      short_summary:
        "The place premium exists because rich countries have institutions that make workers productive. Critics ask whether those institutions survive if hundreds of millions arrive, carrying the norms of the places they left. Supporters answer that migrants assimilate and that the evidence supports far less restriction than now. The 2004 EU enlargement is the largest real test, and it went smoothly, but it moved millions, not hundreds of millions.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The scale is the problem. Gallup counts about 900 million adults who would like to move permanently, 134 million of them to the US alone. The place premium measures what happens when one worker moves into institutions built by others. Whether those institutions, the rule of law, trust, honest administration, keep working when the newcomers outnumber the hosts is the open question, and the models answer it by assumption. Borjas's 2015 review of Paul Collier's Exodus argues that once migrants' effect on destination productivity enters the model, the concerns 'can greatly attenuate the predicted gains.' The EU's eastern enlargement joined countries with similar institutions and moved a small share of their people. It is not a test of a world without borders.",
      proponent_rebuttal:
        "The worry has been modeled with data, and it does not support today's walls. Clemens and Pritchett calibrated how much origin-country productivity migrants carry, how quickly they converge to native levels and how congestion rises with numbers. Their result: efficient policy is not open borders, but it is far looser than current rules; the efficiency case for some restriction is 'a case against the stringency of current restrictions.' Real openings went well. After the 2004 and 2007 EU enlargements, an IZA review found 'no evidence that these primarily economic migrants would displace native workers or lower their wages' or relied more on welfare than natives. Gradual opening, with numbers that rise as institutions cope, captures most of the prize without the risk critics fear.",
      crux: {
        id: "institutions-transfer",
        title: "The Golden-Goose Test",
        question:
          "Do migrants bring the low productivity of the places they leave, and does that effect grow with their numbers?",
        description:
          "Every estimate of large gains assumes migrants become about as productive as natives where they settle. If migrants carry some of their origin country's institutions and norms, and the effect grows as their share of the population rises, the gains from very large flows shrink or reverse. If they converge to local norms within a generation regardless of numbers, the gains hold.",
        methodology:
          "Use data on migrants' earnings, firm productivity and local institutions (corruption, trust, contract enforcement) in places that received large inflows, by origin country and by the migrant share of the local population. Estimate how much origin-country productivity migrants carry, how fast it converges to native levels over one and two generations, and whether convergence slows as their share rises.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Estimates, from places that received large inflows, of how much origin-country productivity migrants carry, how fast their children converge to native levels, and whether convergence slows as the migrant share of the population rises.",
        },
        cost_to_verify:
          "$1-3M (multi-country analysis of existing census, earnings and institutional data)",
        falsification: {
          supporter_flip:
            "If data from places with large inflows showed migrants' productivity converging slowly, and local trust or institutional quality falling as the migrant share rose past some threshold, the case for opening far beyond today's levels would weaken even on economic terms.",
          skeptic_flip:
            "If migrants' children converged to native productivity within a generation even where migrants were a large share of the population, the golden-goose worry would shrink to a case for pacing, not for keeping today's restrictions.",
          common_ground:
            "Both sides agree the place premium comes from destination institutions, that hundreds of millions of people would like to move, and that Clemens and Pritchett's calibration supports neither fully open borders nor today's limits.",
          live_disagreement:
            "How much of their origin's productivity migrants carry and how fast it fades, and whether the effect grows with numbers, which decides whether the gains from very large flows hold up.",
        },
      },
      evidence: [
        {
          id: "gallup-900-million-2025",
          title: "Gallup 2025: about 900 million adults, 15% of the world's, would like to move abroad for good; 134 million name the US",
          description:
            "Gallup's 2025 World Poll, with more than 144,000 interviews in 140 countries, found global desire to migrate permanently 'falling one point to 15%, a level not seen since 2018', an estimated 900 million adults. About 134 million would prefer the US; the US share of would-be migrants, 15%, is the lowest in nearly two decades. Desire had held at a record 16% from 2021 to 2024.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "Gallup, 'Desire to Move Permanently to U.S. at New Low' (23 April 2026)",
          sourceUrl: "https://news.gallup.com/poll/708614/desire-migrate-drops-new-low.aspx",
          reasoning:
            "The best global measure of how many people might move if they could. Stated desire is not action: cost, family and language keep most would-be migrants at home even where moving is legal, as within the EU. It sets the scale the golden-goose question has to answer, which is why it matters here, but it does not show what that scale would do.",
        },
        {
          id: "borjas-jel-review-2015",
          title: "Borjas 2015: concerns about migrants' effect on host productivity 'can greatly attenuate the predicted gains'",
          description:
            "In a Journal of Economic Literature review of Paul Collier's Exodus and Martin Ruhs's The Price of Rights, George Borjas revisits the claim that 'removal of worldwide immigration restrictions would induce a very large increase in world GDP.' He argues the books 'raise a number of questions about the underlying economic model', chiefly whether destination productivity stays fixed as migrants arrive, and concludes these concerns 'can greatly attenuate the predicted gains.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 4,
            directness: 7,
          },
          source: "Borjas, 'Immigration and Globalization: A Review Essay', Journal of Economic Literature 53(4):961-74 (2015)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/jel.53.4.961",
          reasoning:
            "It goes to the heart of the crux: the trillion-dollar estimates depend on an assumption no one has measured at open-borders scale. It is a review essay that reasons through the model rather than new data, and Borjas is a long-standing critic of high immigration, so replicability and independence are moderate.",
        },
        {
          id: "clemens-pritchett-efficient-migration",
          title: "Clemens & Pritchett 2019: even counting productivity transfer, efficient policy is far looser than today's limits",
          description:
            "Clemens and Lant Pritchett built a dynamic model of efficient migration around three measurable parameters: how much origin-country productivity migrants carry, how fast they assimilate toward native levels, and how congestion rises with migrant numbers. Calibrated with macro and micro data, it implies efficient policy would not mean open borders, but would mean relaxing current restrictions. The new efficiency case for some restriction, they write, is 'a case against the stringency of current restrictions.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source:
            "Clemens & Pritchett, 'The New Economic Case for Migration Restrictions: An Assessment', Journal of Development Economics 138:153-164 (2019); IZA Discussion Paper 9730",
          sourceUrl: "https://www.iza.org/publications/dp/9730",
          reasoning:
            "The only peer-reviewed attempt to put numbers on the golden-goose worry, so directness is high. It cuts both ways: it supports far more migration than now, and it rejects fully open borders. The parameters are uncertain and the authors are prominent advocates of freer migration, so independence and replicability are moderate.",
        },
        {
          id: "eu-free-movement-data",
          title: "IZA 2009: after EU enlargement, no evidence migrants displaced natives, cut wages or leaned on welfare",
          description:
            "Reviewing migration after the EU's 2004 and 2007 enlargements, Kahanec, Zaiceva and Zimmermann found that migrant numbers from the new member states rose unevenly, mainly to Ireland and the UK, and to Italy and Spain from Romania and Bulgaria. 'To date, there is no evidence that these primarily economic migrants would displace native workers or lower their wages', nor 'that they would be more dependent on welfare than the natives.' They flag the drain of 'mainly young and skilled people' as a demographic challenge for the countries they left.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 5,
          },
          source:
            "Kahanec, Zaiceva & Zimmermann, 'Lessons from Migration after EU Enlargement', IZA Discussion Paper 4230 (2009)",
          sourceUrl: "https://www.iza.org/publications/dp/4230",
          reasoning:
            "The largest real-world removal of migration barriers between rich and poorer countries, and it did not produce the harm predicted. Its reach is limited: the countries shared institutions and EU membership, the income gap was far smaller than between the US and Haiti, and the review covers only the first few years.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Can voters and welfare states bear it?
    // =========================================================================
    {
      id: "politics-and-welfare-state",
      title: "Can Voters and Welfare States Bear It?",
      short_summary:
        "Even a policy that pays economically has to survive elections. Large, fast inflows have been followed by votes for parties that promise to cut immigration, and Milton Friedman argued that free immigration and a welfare state cannot coexist. But opinion moves fast in both directions: Americans' wish to cut immigration fell from 55% in 2024 to 29% in 2026 as crossings collapsed and deportations rose.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Open borders would destroy themselves at the ballot box. In Austria, Halla, Wagner and Zweimüller found that 'the inflow of immigrants into a community has a significant impact on the increase' in the far-right FPÖ's vote, explaining about a tenth of the regional variation in its gains. In the US, the share of adults who wanted immigration decreased reached 55% in 2024 after record crossings. Friedman's warning that 'you cannot simultaneously have free immigration and a welfare state' names the fiscal side: generous benefits open to all comers would draw those who gain most from them. A policy that hands power to its fiercest opponents ends with tighter borders than it began.",
      proponent_rebuttal:
        "Backlash depends on how migration is managed, not on how much of it there is. Opinion swings with the pace and visibility of arrivals: Gallup found 73% of Americans calling immigration a good thing in June 2026, and the share wanting less fell to 29%, near the share wanting more. Restriction draws its own backlash: in April 2026, 52% told Pew the administration was doing 'too much' on deportations. The Brexit vote, often read as a revolt against EU migration, is weak support: a district-level study found that 'exposure to the EU in terms of immigration and trade provides relatively little explanatory power.' Friedman's tension has a known fix: open borders to work, not to benefits, with access earned over years, as many open-borders advocates propose.",
      crux: {
        id: "inflow-backlash",
        title: "The Backlash Test",
        question:
          "Do large, fast inflows of immigrants push voters toward parties that promise to cut immigration?",
        description:
          "If large inflows reliably raise support for restrictionist parties, an opening that runs ahead of public consent undoes itself, and pace becomes the binding limit. If backlash tracks how arrivals are managed (orderly or chaotic, with or without benefits access) more than their number, an opening designed well can last.",
        methodology:
          "Use places where the number of arrivals was set from outside, such as refugee dispersal schemes and EU enlargement, to compare changes in restrictionist vote share across districts that received more or fewer migrants. Separate the effect of the number of arrivals from that of how they arrived (orderly or irregular) and from their access to benefits.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "District-level vote changes where arrivals were assigned from outside, as in refugee dispersal schemes, separating the effect of how many came from how they came and what benefits they could claim.",
        },
        cost_to_verify: "$200K-500K (election and placement data exist in several European countries)",
        falsification: {
          supporter_flip:
            "If districts assigned more migrants under orderly, work-only schemes still swung toward restrictionist parties as strongly as districts facing irregular arrivals, an opening at scale would look politically unsustainable however it was run.",
          skeptic_flip:
            "If restrictionist gains followed chaotic or irregular arrivals but not orderly, work-based ones of similar size, the backlash argument would become an argument about management rather than numbers.",
          common_ground:
            "Both sides agree public opinion on immigration swings with recent events, that rapid inflows have often preceded restrictionist gains, and that welfare access is a real design question for any opening.",
          live_disagreement:
            "Whether backlash is driven by the number of arrivals or by how they arrive and what they can claim, which decides whether a large opening can hold public consent.",
        },
      },
      evidence: [
        {
          id: "halla-austria-far-right",
          title: "Austria study 2017: immigrant inflows raised the far-right FPÖ's vote, explaining about a tenth of regional swings",
          description:
            "Martin Halla, Alexander Wagner and Josef Zweimüller studied Austrian communities. They found that 'the inflow of immigrants into a community has a significant impact on the increase' in votes for the far-right Freedom Party (FPÖ), 'explaining roughly a tenth of the regional variation in vote changes.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Halla, Wagner & Zweimüller, 'Immigration and Voting for the Far Right', Journal of the European Economic Association 15(6) (2017)",
          sourceUrl: "https://academic.oup.com/jeea/article/15/6/1341/3858004",
          reasoning:
            "A peer-reviewed causal design in a top journal. A tenth of the variation is real but leaves most of the swing to other causes, and Austria's flows were far smaller than an open border would bring.",
        },
        {
          id: "friedman-welfare-argument",
          title: "Friedman 1999: 'you cannot simultaneously have free immigration and a welfare state'",
          description:
            "Milton Friedman argued, in a 1999 conference Q&A and in earlier lectures, that 'you cannot simultaneously have free immigration and a welfare state.' The logic: generous benefits open to all would draw people who would take out more than they pay in. Most open-borders advocates accept the tension and propose fixes such as delayed access to benefits or earned citizenship.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          source: "Milton Friedman, ISIL conference Q&A (1999) and earlier lectures, as documented by Open Borders: The Case",
          sourceUrl: "https://openborders.info/friedman-immigration-welfare-state/",
          reasoning:
            "A Nobel economist naming the fiscal tension in one sentence. It is a spoken remark, not a study, and the linked page, which documents its provenance, is run by open-borders advocates. EU experience after enlargement only partly bears it out.",
        },
        {
          id: "gallup-us-opinion-2026",
          title: "Gallup June 2026: 73% call immigration good; the share wanting less fell from 55% in 2024 to 29%",
          description:
            "In Gallup's 1-15 June 2026 polling, '73% of U.S. adults say immigration is a good thing', down from 'a record high of 79%' in 2025. Asked whether immigration should be decreased, kept at its present level or increased, 29% said decreased, 35% kept and 31% increased, after a 'spike to 55% in 2024' wanting it decreased.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "Gallup, 'Americans' Support for Immigration Down, Still Strong' (9 July 2026)",
          sourceUrl: "https://news.gallup.com/poll/712289/americans-support-immigration-down-strong.aspx",
          reasoning:
            "Gold-standard trend data. A swing from 55% to 29% in two years shows backlash is not fixed and recedes when arrivals fall, which supports the management argument. It cuts the other way too: the 2024 spike followed record crossings, which is the skeptic's point about pace.",
        },
        {
          id: "pew-deportations-too-much-2026",
          title: "Pew April 2026: 52% say the administration is doing 'too much' on deportations",
          description:
            "In Pew's 6-12 April 2026 survey of 3,592 adults, 52% said the Trump administration is doing too much on deportations, 31% about the right amount and 15% too little, up from 44% saying too much in February and March 2025. Among Republicans, 19% said too much; among Democrats, 84%.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 4,
          },
          source:
            "Pew Research Center, 'About half of Americans continue to say Trump administration is doing too much on deportations' (4 May 2026)",
          sourceUrl:
            "https://www.pewresearch.org/short-reads/2026/05/04/about-half-of-americans-continue-to-say-trump-administration-is-doing-too-much-on-deportations/",
          reasoning:
            "Shows that hard restriction draws its own backlash, so the politics do not run only one way. It measures views on deportation, not on opening borders, and the partisan split is wide, so directness is 4.",
        },
        {
          id: "brexit-district-analysis",
          title: "Brexit study 2017: EU immigration exposure explains 'relatively little' of the Leave vote",
          description:
            "Sascha Becker, Thiemo Fetzer and Dennis Novy analysed the 2016 referendum result district by district across the UK. They found that 'exposure to the EU in terms of immigration and trade provides relatively little explanatory power for the referendum vote', compared with education, age and economic deprivation.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source:
            "Becker, Fetzer & Novy, 'Who voted for Brexit? A comprehensive district-level analysis', Economic Policy 32(92) (2017)",
          sourceUrl: "https://academic.oup.com/economicpolicy/article/32/92/601/4459491",
          reasoning:
            "Cuts against reading the biggest free-movement experiment's political defeat as a simple revolt against migrant numbers. District-level data cannot capture national mood about immigration, which many Leave voters cited, so directness is 4.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Who has the right to decide?
    // =========================================================================
    {
      id: "moral-security-considerations",
      title: "Who Has the Right to Decide: The Mover or the Country?",
      short_summary:
        "If where you are born is a moral accident, keeping people out needs a strong reason. If a people has a right to decide who joins it, letting them in is the choice that needs a reason. Evidence can show whether borders can be controlled and what restriction costs; it cannot say whose claim comes first.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "A political community has a right to decide who joins it, as a club or a marriage does. Philosopher Christopher Heath Wellman argues that 'a legitimate state's right to freedom of association entitles it to choose whether or not to admit any given immigrants.' Self-determination is what makes democracy mean something: citizens who cannot decide who becomes a citizen cannot shape their shared future. Borders can also be controlled when a government chooses to: US southwest border encounters fell from more than 2.2 million in fiscal 2022 to 237,538 in fiscal 2025, the lowest since 1970. Helping the global poor is a duty, but aid, trade and investment can meet it without handing every foreigner a right to enter.",
      proponent_rebuttal:
        "Birthplace is the largest unearned advantage there is. Joseph Carens argues that 'citizenship in Western liberal democracies is the modern equivalent to feudal privilege': a status fixed at birth that shapes a life's chances. Liberal states already accept freedom of movement inside their borders and would never let a city bar people from another state; the same principle reaches across borders. Migration also helps the poor more than aid does: migrants sent about $626 billion home to low- and middle-income countries in 2022, roughly three times all official aid. A club may refuse members, but a club does not use armed guards to keep a person from taking a job offered by a willing employer. Restrictions need a compelling reason, case by case.",
      crux: {
        id: "moral-framework-analysis",
        title: "Moral Framework for Freedom of Movement",
        question:
          "Is moving across borders a basic human right, or do states have a strong right to exclude?",
        description:
          "Whether freedom to move across borders is a basic right that only compelling state interests can limit, or whether states have a strong default right to decide who enters.",
        methodology:
          "Philosophical analysis comparing freedom of movement to other recognized freedoms, alongside evidence on whether controlled borders achieve their stated goals (security, fiscal balance, cohesion) and at what cost.",
        equation:
          "\\text{Moral Permissibility} = f(\\text{Rights Restricted}, \\text{Harm Prevented}, \\text{Alternatives Available})",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "Evidence can show whether controlled borders meet their stated goals of security, fiscal balance and cohesion. Whether movement is a basic right that outweighs a state's claim to exclude is a moral question those findings cannot answer.",
          kind: "value-difference" as const,
        },
        cost_to_verify: "N/A (normative philosophical question)",
        falsification: {
          supporter_flip:
            "If controlled borders proved measurably better than open alternatives at security, fiscal balance and cohesion, the case that restrictions are arbitrary discrimination would weaken even for those who hold movement to be a strong right.",
          skeptic_flip:
            "If aid, trade and investment kept doing far less for the world's poor than migration does, as remittances at three times official aid suggest, a strong right to exclude would carry a heavier moral price.",
          common_ground:
            "Both sides accept that states may restrict entry for compelling reasons such as security screening, and that birthplace shapes life chances more than almost anything else; the dispute is whether the right to exclude is the default or the exception.",
          live_disagreement:
            "Whether crossing borders is a basic right that only compelling state interests can limit, or whether a political community's right to decide who joins is itself strong.",
        },
      },
      evidence: [
        {
          id: "carens-philosophical-case",
          title: "Carens: citizenship in rich democracies is 'the modern equivalent to feudal privilege'",
          description:
            "Philosopher Joseph Carens argues that liberal principles of moral equality and freedom of movement, applied consistently, require borders to be open by default. As the Stanford Encyclopedia of Philosophy summarizes him, egalitarians see open borders as the response to global inequality; he writes that 'citizenship in Western liberal democracies is the modern equivalent to feudal privilege', a status assigned at birth that settles a person's chances. His fullest statement is The Ethics of Immigration (Oxford, 2013).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source:
            "Carens, 'Aliens and Citizens: The Case for Open Borders', Review of Politics (1987), and The Ethics of Immigration (Oxford, 2013), as summarized in the Stanford Encyclopedia of Philosophy, 'Immigration' (rev. 23 October 2024)",
          sourceUrl: "https://plato.stanford.edu/entries/immigration/",
          reasoning:
            "The most influential philosophical case for open borders. Philosophical arguments are not replicable in the empirical sense, and the leap from principle to policy is long, so directness is moderate.",
        },
        {
          id: "wellman-freedom-of-association",
          title: "Wellman: a legitimate state's freedom of association lets it refuse any would-be immigrant",
          description:
            "Christopher Heath Wellman argues that 'a legitimate state's right to freedom of association entitles it to choose whether or not to admit any given immigrants', as individuals may refuse to associate with others. The Stanford Encyclopedia of Philosophy, in an entry Wellman wrote, sets this beside arguments from Michael Walzer and others that screening applicants 'is merely a standard component of a state's more general right to self-determination.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source:
            "Wellman, 'Immigration and Freedom of Association', Ethics 119(1) (2008), as summarized in the Stanford Encyclopedia of Philosophy, 'Immigration' (rev. 23 October 2024)",
          sourceUrl: "https://plato.stanford.edu/entries/immigration/",
          reasoning:
            "The leading philosophical defense of a strong right to exclude, matched in care to Carens. The summary is in an entry by Wellman himself, though the entry sets out the rival views at length. Like Carens, it states a principle no data can test.",
        },
        {
          id: "remittance-vs-aid-data",
          title: "World Bank 2023: migrants sent about $626 billion home in 2022, roughly three times all official aid",
          description:
            "Remittances to low- and middle-income countries reached about $626 billion in 2022 (an initial estimate, later revised to about $647 billion), roughly three times total official development assistance (about $204 billion, per the OECD) and more than foreign direct investment. Remittances go straight to families, cost little to deliver and often rise when the home country is in crisis.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source:
            "World Bank, 'Remittances Remain Resilient but Likely to Slow' (June 2023); OECD ODA statistics (2022)",
          sourceUrl:
            "https://www.worldbank.org/en/news/press-release/2023/06/13/remittances-remain-resilient-likely-to-slow",
          reasoning:
            "Reliable data showing migration moves more money to poor families than aid does, which answers the claim that aid can meet the duty instead. It reflects migration under today's restrictions, and it says nothing about the effects on the countries migrants leave or join.",
        },
        {
          id: "pew-border-encounters-2025",
          title: "Pew 2026: US southwest border encounters fell to 237,538 in fiscal 2025, the lowest since 1970",
          description:
            "Pew counted '237,538 encounters with migrants at the U.S.-Mexico border in the 2025 fiscal year', 'the lowest in any fiscal year since 1970', down from more than 1.5 million in fiscal 2024, more than 2 million in 2023 and a record of more than 2.2 million in 2022. Since February 2025 monthly encounters have stayed under 10,000.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 4,
          },
          source:
            "Pew Research Center, John Gramlich, 'Migrant encounters at the U.S.-Mexico border are at their lowest level in more than 50 years' (2 February 2026)",
          sourceUrl:
            "https://www.pewresearch.org/short-reads/2026/02/02/migrant-encounters-at-the-us-mexico-border-are-at-their-lowest-level-in-more-than-50-years/",
          reasoning:
            "Answers the claim that borders cannot be controlled, so restriction is futile: a determined government cut crossings by more than four-fifths in a year. It shows feasibility, not legitimacy or cost, which is why directness to the moral question is 4.",
        },
      ],
    },
  ],
  aliases: [
    "Should immigration restrictions be greatly relaxed or eliminated?",
    "Should borders be open?",
    "Open borders",
    "Should anyone be free to move to another country?",
  ],
  references: [
    {
      title: "Desire to Move Permanently to U.S. at New Low — Gallup (23 April 2026)",
      url: "https://news.gallup.com/poll/708614/desire-migrate-drops-new-low.aspx",
    },
    {
      title: "Macroeconomic implications of immigration flows in 2025 and 2026: January 2026 update — Edelberg, Veuger & Watson, Brookings",
      url: "https://www.brookings.edu/articles/macroeconomic-implications-of-immigration-flows-in-2025-and-2026/",
    },
    {
      title: "Migrant encounters at the U.S.-Mexico border are at their lowest level in more than 50 years — Pew Research Center (2 February 2026)",
      url: "https://www.pewresearch.org/short-reads/2026/02/02/migrant-encounters-at-the-us-mexico-border-are-at-their-lowest-level-in-more-than-50-years/",
    },
    {
      title: "Americans' Support for Immigration Down, Still Strong — Gallup (9 July 2026)",
      url: "https://news.gallup.com/poll/712289/americans-support-immigration-down-strong.aspx",
    },
    {
      title: "The Place Premium: Wage Differences for Identical Workers across the U.S. Border — Clemens, Montenegro & Pritchett (2008)",
      url: "https://www.cgdev.org/publication/place-premium-wage-differences-identical-workers-across-us-border-working-paper-148",
    },
    {
      title: "Economics and Emigration: Trillion-Dollar Bills on the Sidewalk? — Clemens, Journal of Economic Perspectives (2011)",
      url: "https://www.aeaweb.org/articles?id=10.1257/jep.25.3.83",
    },
    {
      title: "The New Economic Case for Migration Restrictions: An Assessment — Clemens & Pritchett (2019)",
      url: "https://www.iza.org/publications/dp/9730",
    },
    {
      title: "Immigration and Globalization: A Review Essay — Borjas, Journal of Economic Literature (2015)",
      url: "https://www.aeaweb.org/articles?id=10.1257/jel.53.4.961",
    },
    {
      title: "Immigration — Stanford Encyclopedia of Philosophy (rev. 2024)",
      url: "https://plato.stanford.edu/entries/immigration/",
    },
    {
      title: "The Economic and Fiscal Consequences of Immigration — National Academies (2016)",
      url: "https://www.nationalacademies.org/publications/23550",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "How much richer would the world be with open borders?",
      content:
        "A worker from the median poor country earns about 2.7 times as much in the US as an identical worker at home, and a Haitian over seven times as much. Models that add this up put the gain from free movement at 50% to 150% of world GDP. Those are extrapolations from small moves; critics argue the gains shrink sharply if very large flows weaken the institutions that make rich countries productive.",
    },
    {
      id: "q2",
      title: "How many people would move if borders opened?",
      content:
        "Gallup's 2025 survey found about 900 million adults, 15% of the world's, would like to move abroad permanently, 134 million of them to the US. Stated desire is not action: within the EU, where movement is free, most people stay home. Nobody knows how many would actually move, which is why the economic estimates range so widely.",
    },
    {
      id: "q3",
      title: "Would open borders survive politically?",
      content:
        "Large, fast inflows have often been followed by gains for parties that promise to cut immigration; in Austria, inflows explained about a tenth of the far right's regional gains. But opinion moves fast: the share of Americans wanting immigration decreased fell from 55% in 2024 to 29% in 2026 as border crossings fell to their lowest since 1970. Whether backlash follows numbers or disorder decides whether a large opening could last.",
    },
    {
      id: "q4",
      title: "Do countries have the right to keep people out?",
      content:
        "Joseph Carens argues that citizenship in rich democracies is the modern equivalent of feudal privilege, so restrictions need a strong reason. Christopher Heath Wellman argues that a legitimate state's freedom of association lets it refuse anyone. Evidence can show what borders achieve and cost; it cannot settle whose claim comes first.",
    },
  ],
};
