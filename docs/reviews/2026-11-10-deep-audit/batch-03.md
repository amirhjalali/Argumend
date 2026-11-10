# Deep citation audit, batch 03 (2026-11-10)

Maps: `proof-of-citizenship-voting`, `medicaid-work-requirements`, `data-centers-electricity-bills`.

Method: every `sourceUrl` was loaded in this session (curl, PDF text extracted with `pdftotext`) and each number, name, date and quotation in the card was compared with the page. Where the publisher refused the fetch (OUP, NEJM), the claim was checked against the Crossref abstract or a hosted copy of the article, named below. No URL was written that was not loaded.

Totals: 50 cards checked, 6 corrected, 0 replaced. The three top-level `keystone_fact` sources were checked too; one needed a number fixed.

## proof-of-citizenship-voting

23 cards checked. 19 checked out unchanged. Keystone fact checked out (House vote 218-213 on Feb 11, 2026; both court rulings; EO quote verbatim).

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| `citizens-without-documents` | Said "men and young adults were most likely to lack easy access". The national survey reports the gap by sex (11% of men, 8% of women) but no national age finding; the age gap appears only in the Georgia and Texas state surveys. The "lower bound" reason was also loosely stated. | Gives 11% of men against 8% of women, and states the researchers' reason for the lower bound: the survey did not ask whether the name on a document matches a current legal name. | https://www.brennancenter.org/our-work/analysis-opinion/213-million-american-citizens-voting-age-dont-have-ready-access and https://cdce.umd.edu/sites/cdce.umd.edu/files/Who%20Lacks%20Documentary%20Proof%20of%20Citizenship%20March%202025.pdf |
| `photo-id-turnout` | Title and reasoning called the laws "strict photo ID laws". Cantoni and Pons study strict ID laws; the abstract never limits them to photo ID. | Title is "Strict Voter ID Laws Did Not Lower Registration or Turnout"; reasoning says "identification at the polls". Same wording fixed in the pillar's `proponent_rebuttal`. | https://doi.org/10.1093/qje/qjab019 (OUP returns 403; abstract read from https://api.crossref.org/works/10.1093/qje/qjab019) |
| `id-laws-confidence` | Reasoning repeated "photo ID at the polls". | "identification at the polls". Both quotations are verbatim from the abstract. | same as above |
| `arizona-under-one-percent` | Said Arizona "gave federal-only ballots to 34,933" voters. Votebeat's figure is the number of active voters marked federal-only, not ballots issued or cast. | "had 34,933 of about 4.4 million active voters marked federal-only". | https://votebeat.org/arizona/2024/12/13/arizona-voter-citizenship-proof-law-shows-groups-struggling-to-provide-it and https://responsivegov.org/research/how-arizonas-proof-of-citizenship-law-works/ (1996 licence rule, 218,000 error) |

Secondary sources named in `source` but not linked were loaded and matched: AP via WOSU for the Ohio 2019 to 2024 referral counts (https://www.wosu.org/politics-government/2024-08-22/ohio-finds-597-noncitizens-who-voted-or-registered-recently-a-fraction-of-its-electorate), Votebeat for the Texas reinstatement (https://www.votebeat.org/texas/2026/07/30/save-potential-noncitizens-gave-proof-of-citizenship-to-dps/), and the Responsive Government explainer above.

Unresolved:

- Pillar 1 `proponent_rebuttal` (not a card) quotes Heritage Action: "laws dictating that all voters be U.S. citizens are essentially meaningless without a corresponding statute requiring states to prove citizenship." No source for it is cited in the file and an exact-phrase search found nothing. Left unchanged; it needs a source or the quote marks removed.
- `georgia-audit`: text is correct, but the URL is a WALB copy of the AP story. No apnews.com original could be located (the search tool cannot reach apnews.com). Left unchanged.

## medicaid-work-requirements

14 cards checked. 13 checked out unchanged.

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| `nebraska-renewals-kept` | Title said 91% of renewals kept coverage. KFF reports 93% renewed (57% exclusion, 34% qualifying activities, 2% short-term hardship exception) and 7% lost coverage; 91% left out the hardship group. | Title says 93%; description adds the 2% hardship exception. | https://www.kff.org/medicaid/early-medicaid-work-requirement-insights-from-nebraska/ |
| `keystone_fact` (top-level) | Same 91%. | 93%. | same |
| Pillar 2 `proponent_rebuttal` (text) | Same 91%. | 93%, with the 2% hardship exception named. | same |

Note on `arkansas-no-employment-change` and `arkansas-18000`: nejm.org returns 403 and PubMed carries no abstract for this Special Report. The figures (70.5% to 63.7%, 10.5% to 14.5%, no significant change in employment, more than 95% already meeting the rule or exempt) were read from a full-text copy at https://digitalgovernmenthub.org/wp-content/uploads/2024/12/NEJMsr1901772.pdf; the citation (381(11):1073-1082) was confirmed in PubMed (PMID 31216419). The DOI link in the card is unchanged.

Unresolved: none.

## data-centers-electricity-bills

13 cards checked. 12 checked out unchanged. Keystone fact checked out ($21.3 billion of $47.2 billion, 45%).

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| `pledge-voluntary` | Said "The AP reported that the voluntary agreement has no enforcement mechanisms". In the AP story that statement is attributed to Lena Moffitt of Evergreen Action, an environmental group; the AP's own reporting is that experts consider it likely not enforceable at the federal level. | Attributes the no-enforcement statement to the head of Evergreen Action and the federal-level point to experts cited by the AP; reasoning notes where the claim comes from. | https://broadbandbreakfast.com/tech-companies-vow-to-cover-electricity-costs-of-data-centers-in-white-house-deal/ |

Unresolved (URL quality only, text verified):

- `pledge-voluntary`: the URL is a Broadband Breakfast copy of the AP story. No apnews.com original could be located. Left unchanged.
- `pjm-2028-auction`: the URL is The Hill's `/amp/` page. The canonical page (same path without `/amp/`) returns 403 to a scripted fetch, so it was not swapped in.
- `jlarc-residential-projection`, `jlarc-full-cost`: the JLARC landing page confirms every figure but does not show the month; "December 2024" was left as written.
- `lbnl-load-growth`: cites the Berkeley Lab study through an APPA news report. The lab's own news page returns 403; the claim that the work was done with Brattle and updated through 2025 was confirmed in the lab's July 2026 deck (https://eta-publications.lbl.gov/sites/default/files/2026-07/retail_price_trends_2026_edition_julyupdate.pdf). Left unchanged.

## Repeats elsewhere

The corrected figures (Nebraska 91%, "Strict Photo ID Laws", "gave federal-only ballots") do not appear in `data/blog.ts`, `data/guides.ts`, any other file under `data/topics`, or any test. The only other copies are in the stale worktree `.claude/worktrees/agent-a757e60c04a4b32db/`.
