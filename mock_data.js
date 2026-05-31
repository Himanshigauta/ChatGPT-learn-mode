/**
 * ChatGPT Learn Mode
 * Mock Database containing pre-scored answers, the 50-Claim Verification Knowledge Base, and practice cards.
 */

const mockDatabase = {
  "mars": {
    topic: "Planetary Science",
    paragraphs: [
      [
        {
          id: "mars-claim-1",
          text: "Mars is a cold, terrestrial desert planet with polar ice caps and a thin carbon dioxide atmosphere.",
          score: 96,
          label: "high",
          uncertaintyReason: "Broad planetary science consensus. Backed by robotic spectroscopy and satellite mappings.",
          source: "NASA Mars Exploration Program",
          sourceTitle: "Mars Planet Facts and Science Goals",
          sourceOrg: "NASA",
          sourceDate: "August 2023",
          sourceLink: "https://science.nasa.gov/mars/facts/",
          explanation: "Mars possesses a thin atmosphere composed of 95% carbon dioxide and experiences average surface temperatures of -62 degrees Celsius.",
          evaluationGuide: "Review NASA's atmospheric logs for Mars to verify barometric pressure and composition metrics.",
          correctAction: "Confirm"
        },
        {
          text: "Recent rover exploration has mapped water ice reserves beneath the Martian regolith, which could potentially be extracted for future life support systems.",
          score: 92,
          label: "high"
        },
        {
          id: "mars-claim-2",
          text: "Because water ice is present, some colonization plans suggest that future astronauts can easily grow crops in raw Martian soil without chemical treatments.",
          score: 38,
          label: "low",
          uncertaintyReason: "Raw Martian soil (regolith) contains toxic chlorine salts called perchlorates, which are lethal to Earth plants and human physiology.",
          correctedVersion: "While water ice is present, growing crops requires advanced soil washing, detoxification, and chemical supplementation to neutralize toxic perchlorates.",
          source: "NASA Jet Propulsion Laboratory",
          sourceTitle: "Martian Soil Chemistry and Crop Suitability",
          sourceOrg: "California Institute of Technology",
          sourceDate: "March 2021",
          sourceLink: "https://mars.nasa.gov/news/8936/nasas-perseverance-rover-oxygen-generating-device-moxie-completes-first-run-on-mars/",
          explanation: "Analysis of regolith samples from multiple landing sites confirms high concentrations (0.5% to 1.0%) of calcium and magnesium perchlorates, requiring deep biochemical washing.",
          evaluationGuide: "Examine JPL soil sample data from Perseverance or Phoenix lander reports on chlorine compound concentrations.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          text: "Establishing a permanent human presence requires addressing key environmental hazards such as low temperatures, toxic soil, and solar radiation.",
          score: 94,
          label: "high"
        },
        {
          id: "mars-claim-3",
          text: "Some astrobiologists argue that custom-engineered Earth bacteria could terraform the Martian atmosphere to be fully breathable within fifty years.",
          score: 55,
          label: "medium",
          uncertaintyReason: "Extreme timeline exaggeration. Scientific models show terraforming would take thousands of years using current or near-future technologies, as Mars lacks a magnetic field to retain a thick atmosphere.",
          correctedVersion: "Some astrobiologists suggest that custom-engineered bacteria could begin atmospheric modification, but building a fully breathable atmosphere would take thousands of years.",
          source: "NASA Science Mission Directorate",
          sourceTitle: "Terraforming Mars: Physical Limits and Feasibility",
          sourceOrg: "NASA",
          sourceDate: "July 2018",
          sourceLink: "https://science.nasa.gov/mars/facts/",
          explanation: "Mars' lack of a global magnetic field means the solar wind actively strips away atmospheric gases, preventing rapid long-term thick atmosphere retention without massive planetary shielding.",
          evaluationGuide: "Review geological models on solar wind atmospheric stripping and gas volume calculations in science journals.",
          correctAction: "Dispute"
        },
        {
          text: "Consequently, pressurized domes and soil detoxification systems remain absolute requirements for crop cultivation.",
          score: 95,
          label: "high"
        }
      ],
      [
        {
          id: "sci-7",
          text: "Humans can survive on the surface of Mars without spacesuits because the atmosphere contains oxygen.",
          score: 2,
          label: "low",
          uncertaintyReason: "Fatal physiological error. Mars has a thin atmosphere (less than 1% of Earth's pressure) composed of 95% carbon dioxide, and is exposed to lethal cosmic radiation.",
          correctedVersion: "Humans cannot survive on Mars without specialized spacesuits and pressurized habitats due to extreme low pressure, lack of oxygen, and high cosmic radiation.",
          source: "NASA Astrobiology & Planetary Science",
          sourceTitle: "Mars Exploration: Habitability and Human Survival Limits",
          sourceOrg: "NASA Planetary Science Division",
          sourceDate: "June 2023",
          sourceLink: "https://mars.nasa.gov/news/8936/nasas-perseverance-rover-oxygen-generating-device-moxie-completes-first-run-on-mars/",
          explanation: "Mars' atmospheric pressure is so low that human bodily fluids would boil at normal body temperature. The atmosphere is 95% CO2, and the lack of a strong magnetosphere exposes the surface to intense solar and galactic cosmic rays.",
          evaluationGuide: "To verify planetary habitability limits: 1. Read research on Martian atmospheric composition from rover data. 2. Study physiological effects of low pressure and radiation on biological systems.",
          correctAction: "Dispute"
        },
        {
          text: "The lack of an atmospheric ozone layer also exposes the surface to lethal solar ultraviolet and cosmic radiation.",
          score: 97,
          label: "high"
        }
      ],
      [
        {
          id: "mars-claim-5",
          text: "To mitigate radiation, some engineers propose constructing habitats underground inside natural lava tubes formed by ancient volcanic activity.",
          score: 88,
          label: "medium",
          uncertaintyReason: "Strong structural theory, but robotic cave mappings are in early stages; direct stability measurements of volcanic caves are not yet verified in-situ.",
          source: "NASA Jet Propulsion Laboratory",
          sourceTitle: "Planetary Cave Exploration and Subsurface Shielding",
          sourceOrg: "NASA",
          sourceDate: "January 2022",
          sourceLink: "https://science.nasa.gov/mars/facts/",
          explanation: "Lava tubes provide thick regolith shielding against thermal swings and radiation, but structural integrity and cave-in risks under Martian gravity require direct physical mapping.",
          evaluationGuide: "Look up robotic planetary cave exploration programs and ground-penetrating radar studies on Mars.",
          correctAction: "Confirm"
        },
        {
          text: "Overall, human survival on Mars represents one of the greatest technological challenges of our century.",
          score: 98,
          label: "high"
        }
      ]
    ]
  },

  "coffee": {
    topic: "Nutrition & Health",
    paragraphs: [
      [
        {
          id: "coffee-claim-1",
          text: "Yes, drinking black coffee has several science-backed health benefits, including a high concentration of active antioxidants.",
          score: 96,
          label: "high",
          uncertaintyReason: "Broad scientific consensus. Extensive chemical profiling isolates major antioxidant compounds in roasted beans.",
          source: "Harvard T.H. Chan School of Public Health",
          sourceTitle: "Coffee: Benefits and Health Risks Guide",
          sourceOrg: "Harvard University",
          sourceDate: "March 2021",
          sourceLink: "https://www.hsph.harvard.edu/nutritionsource/food-features/coffee/",
          explanation: "Black coffee is exceptionally rich in polyphenols and other antioxidants, which reduce systemic cellular inflammation.",
          evaluationGuide: "Consult dietary research summaries on the nutritional source feature of coffee at Harvard Health.",
          correctAction: "Confirm"
        },
        {
          text: "Antioxidants, such as polyphenols, help reduce systemic cellular inflammation and protect against oxidative stress.",
          score: 94,
          label: "high"
        },
        {
          id: "coffee-claim-2",
          text: "Studies suggest that drinking 3 to 4 cups of coffee daily lowers the risk of type 2 diabetes by nearly 25%.",
          score: 72,
          label: "medium",
          uncertaintyReason: "Based on large epidemiological surveys indicating strong correlation, but direct clinical causation is still under active research.",
          correctedVersion: "Drinking 3 to 4 cups of coffee daily is associated with a 25% lower risk of type 2 diabetes, though direct clinical causation remains under active research.",
          source: "Harvard T.H. Chan School of Public Health",
          sourceTitle: "Coffee: Benefits and Health Risks Guide",
          sourceOrg: "Harvard University",
          sourceDate: "March 2021",
          sourceLink: "https://www.hsph.harvard.edu/nutritionsource/food-features/coffee/",
          explanation: "Substantial peer-reviewed literature links bioactive elements in coffee (like magnesium and polyphenols) to increased insulin sensitivity, supporting the overall claim.",
          evaluationGuide: "Review long-term health outcomes on major medical publications like Harvard Health or American Diabetes Association.",
          correctAction: "Confirm"
        }
      ],
      [
        {
          text: "Additionally, caffeine acts as a powerful central nervous system stimulant, temporarily blocking adenosine receptors.",
          score: 97,
          label: "high"
        },
        {
          id: "coffee-claim-3",
          text: "Caffeine consumption increases your basal metabolic rate by 20% to 30%, leading to rapid weight loss.",
          score: 41,
          label: "low",
          uncertaintyReason: "Caffeine stimulates minor thermogenic action, but clinical trials show actual increases are restricted to only 3% to 11%. The claim of 20% to 30% is a severe exaggeration popularized by commercial dietary supplement advertisements.",
          correctedVersion: "Caffeine consumption increases basal metabolic rate by a modest 3% to 11%, having a negligible impact on long-term weight loss.",
          source: "National Center for Biotechnology Information (NCBI)",
          sourceTitle: "Caffeine and metabolic rate: regulatory reviews",
          sourceOrg: "National Institutes of Health (NIH)",
          sourceDate: "October 2019",
          sourceLink: "https://pubmed.ncbi.nlm.nih.gov/2912078/",
          explanation: "Rigorous clinical trials demonstrate that caffeine-induced metabolic spikes yield negligible long-term weight reduction without active caloric restriction.",
          evaluationGuide: "Cross-verify the clinical baseline metabolic rate increase of caffeine (standard: 3% to 11%) on PubMed databases.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          id: "coffee-claim-4",
          text: "Moderate coffee consumption has also been correlated with a lower risk of neurodegenerative conditions such as Parkinson's and Alzheimer's disease.",
          score: 78,
          label: "medium",
          uncertaintyReason: "Strong correlations exist in observational trials, but direct neuroprotective pathways are still under active investigation in animal models.",
          source: "PubMed Central (PMC)",
          sourceTitle: "Caffeine and Parkinson's Disease: A Review",
          sourceOrg: "National Institutes of Health (NIH)",
          sourceDate: "September 2012",
          sourceLink: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3437273/",
          explanation: "Observational data shows that regular caffeine consumers show lower rates of cognitive decline, but molecular pathways in human neurons require further randomized control trials.",
          evaluationGuide: "Review randomized control trial metadata and meta-analyses linking caffeine intake to neurological receptors.",
          correctAction: "Confirm"
        },
        {
          text: "However, excessive intake can lead to sleep disruption, increased heart rate, and mild psychological dependency.",
          score: 93,
          label: "high"
        }
      ],
      [
        {
          id: "coffee-claim-5",
          text: "Cardiologists warn that consuming unfiltered coffee increases LDL cholesterol levels due to compounds called diterpenes.",
          score: 86,
          label: "medium",
          uncertaintyReason: "Factual lipid chemistry, but only applicable to unfiltered brewing methods. Paper filters trap the cholesterol-raising diterpene compounds completely.",
          source: "Harvard Health Publishing",
          sourceTitle: "What is it about coffee that increases cholesterol?",
          sourceOrg: "Harvard Medical School",
          sourceDate: "February 2022",
          sourceLink: "https://www.health.harvard.edu/staying-healthy/ask-the-doctor-what-is-it-about-coffee-that-increases-cholesterol/",
          explanation: "Coffee beans contain diterpenes (cafestol and kahweol), which trigger lipid increases. Unfiltered methods like French press release these compounds, whereas paper filters successfully extract them.",
          evaluationGuide: "Compare the biochemical filtering profiles of French press, espresso, and standard drip coffee makers.",
          correctAction: "Confirm"
        },
        {
          text: "For most individuals, moderate consumption of filtered coffee is considered both safe and highly beneficial.",
          score: 95,
          label: "high"
        }
      ]
    ]
  },

  "climate": {
    topic: "Environmental Science",
    paragraphs: [
      [
        {
          id: "climate-claim-1",
          text: "Longitudinal satellite measurements confirm that rising global temperatures cause thermal expansion of seawater and glacier melt.",
          score: 98,
          label: "high",
          uncertaintyReason: "Unanimous oceanographic consensus. Verified by decades of satellite altimetry and barometric tidal measurements.",
          source: "NASA Global Climate Change Portal",
          sourceTitle: "Vital Signs of the Planet: Sea Level Measurements",
          sourceOrg: "NASA Jet Propulsion Laboratory",
          sourceDate: "October 2023",
          sourceLink: "https://climate.nasa.gov/vital-signs/sea-level/",
          explanation: "As greenhouse gases trap heat in the atmosphere, global oceans absorb over 90% of excess warmth, causing water molecules to expand in volume.",
          evaluationGuide: "Review NASA's satellite altimetry charts and tide gauge measurements over the past three decades.",
          correctAction: "Confirm"
        },
        {
          text: "As the oceans absorb over 90% of excess atmospheric heat, the water molecules expand, directly contributing to rising sea levels.",
          score: 95,
          label: "high"
        },
        {
          id: "env-7",
          text: "Climate change has zero measurable impact on global sea levels or oceanic thermal expansion.",
          score: 8,
          label: "low",
          uncertaintyReason: "Scientifically incorrect. Satellite altimetry and tide gauges demonstrate that global sea levels are rising at an accelerating rate of 3.4mm/year due to glacier melting and thermal expansion.",
          correctedVersion: "Climate change directly drives rising global sea levels through thermal expansion of ocean water and the melting of glaciers and ice sheets.",
          source: "NASA Global Climate Change Portal",
          sourceTitle: "Vital Signs of the Planet: Sea Level Acceleration Facts",
          sourceOrg: "NASA Jet Propulsion Laboratory",
          sourceDate: "October 2023",
          sourceLink: "https://climate.nasa.gov/vital-signs/sea-level/",
          explanation: "As greenhouse gases trap heat, oceans absorb over 90% of excess heat, causing water to expand. Melted ice sheets in Greenland and Antarctica add massive volumes of water to the oceans.",
          evaluationGuide: "To verify sea level changes: 1. Research satellite altimetry data from NASA or ESA. 2. Study the IPCC Working Group reports on physical oceanography.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          text: "The melting of ice sheets in Greenland and Antarctica adds massive volumes of water directly to the oceanic system.",
          score: 96,
          label: "high"
        },
        {
          id: "climate-claim-2",
          text: "Some coastal engineering models suggest that building seawalls is guaranteed to protect all coastal cities from flooding for the next five centuries.",
          score: 52,
          label: "medium",
          uncertaintyReason: "Severe timeframe oversimplification. Seawalls are vital for temporary surge defense, but long-term sea-level rises and geological erosion will breach or bypass them well before 500 years.",
          correctedVersion: "Seawalls provide short-to-medium term surge protection, but long-term sea-level rises require structural retreat and dynamic delta defenses.",
          source: "Intergovernmental Panel on Climate Change (IPCC)",
          sourceTitle: "IPCC Sixth Assessment Report: Impacts and Adaptation",
          sourceOrg: "United Nations Environment Programme",
          sourceDate: "February 2022",
          sourceLink: "https://www.ipcc.ch/report/ar6/wg2/",
          explanation: "IPCC Working Group II reports demonstrate that static hard defenses (seawalls) experience increasing limits under extreme storm surges and rising water layers, requiring managed retreats in vulnerable areas.",
          evaluationGuide: "Search the IPCC report index for 'coastal adaptation limits' and examine seawall cost-benefit curves.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          id: "climate-claim-3",
          text: "Oceanic absorption of carbon dioxide has also increased seawater acidity by 30% since the industrial revolution.",
          score: 94,
          label: "high",
          uncertaintyReason: "Factual chemistry. Soluble CO2 reacts with water to form carbonic acid. High confidence.",
          source: "NOAA Pacific Marine Environmental Laboratory",
          sourceTitle: "Ocean Acidification: The Other Carbon Dioxide Problem",
          sourceOrg: "U.S. Department of Commerce",
          sourceDate: "August 2020",
          sourceLink: "https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification",
          explanation: "Dissolved carbon dioxide shifts the marine pH balance by releasing hydrogen ions, reducing oceanic pH from a historical baseline of 8.21 to approximately 8.10.",
          evaluationGuide: "Check oceanic pH databases and titration curves on PMEL or NOAA educational portals.",
          correctAction: "Confirm"
        },
        {
          id: "climate-claim-4",
          text: "This acidification process impairs the ability of calcifying marine organisms, like corals and shellfish, to construct protective shells.",
          score: 91,
          label: "high",
          uncertaintyReason: "Established marine biology. Reduced carbonate ion availability disrupts calcium carbonate synthesis.",
          source: "NOAA Pacific Marine Environmental Laboratory",
          sourceTitle: "Ocean Acidification: The Other Carbon Dioxide Problem",
          sourceOrg: "U.S. Department of Commerce",
          sourceDate: "August 2020",
          sourceLink: "https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification",
          explanation: "As acidity rises, carbonate ions (CO3 2-) bind with excess hydrogen ions. This leaves fewer free carbonate ions for organisms to synthesize calcium carbonate (CaCO3) shells.",
          evaluationGuide: "Study marine chemical saturation levels (specifically aragonite and calcite saturation horizons).",
          correctAction: "Confirm"
        }
      ],
      [
        {
          id: "climate-claim-5",
          text: "Some environmental groups argue that planting sea kelp can completely reverse global ocean acidification within five years.",
          score: 42,
          label: "low",
          uncertaintyReason: "Extreme scale and timeline exaggeration. Kelp is a powerful local carbon sink, but cannot realistically absorb the billions of tons of dissolved global carbon nor reverse global pH shifts in 5 years.",
          correctedVersion: "Kelp farming creates local buffer zones that reduce acidity in shallow coastal bays, but cannot reverse global deep-ocean acidification on a five-year timeline.",
          source: "NOAA Office of Education",
          sourceTitle: "Ocean Acidification Solutions and Ecosystem Buffers",
          sourceOrg: "NOAA PMEL Division",
          sourceDate: "May 2021",
          sourceLink: "https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification",
          explanation: "Photosynthetic carbon uptake by kelp forests successfully buffers localized coastal waters, but has zero measurable effect on the massive, open-ocean carbon reservoirs.",
          evaluationGuide: "Differentiate localized shallow-water kelp chemistry from deep-ocean thermodynamic carbon circulation models.",
          correctAction: "Dispute"
        },
        {
          text: "Addressing these systemic marine challenges requires deep global greenhouse gas mitigation.",
          score: 97,
          label: "high"
        }
      ]
    ]
  },

  "chatgpt": {
    topic: "Artificial Intelligence",
    paragraphs: [
      [
        {
          id: "chatgpt-claim-1",
          text: "ChatGPT is a state-of-the-art conversational AI system developed by OpenAI, trained on a diverse corpus of digital text.",
          score: 98,
          label: "high",
          uncertaintyReason: "Verified technical facts. OpenAI's architecture papers detail the transformer-based model pre-training parameters.",
          source: "OpenAI Research & Publications",
          sourceTitle: "Language Models are Few-Shot Learners: The GPT Architecture",
          sourceOrg: "OpenAI",
          sourceDate: "June 2020",
          sourceLink: "https://arxiv.org/abs/2005.14165",
          explanation: "ChatGPT utilizes a transformer-based language model trained via unsupervised learning on vast text libraries, followed by fine-tuning.",
          evaluationGuide: "Review OpenAI's original GPT-3 architecture white papers on their official research index.",
          correctAction: "Confirm"
        },
        {
          text: "It uses deep learning algorithms to generate human-like text by predicting the next sequence of words based on input prompts.",
          score: 96,
          label: "high"
        },
        {
          id: "tech-8",
          text: "ChatGPT works by storing a massive database of pre-written answers and retrieving the best match for every prompt.",
          score: 15,
          label: "low",
          uncertaintyReason: "Technological misconception. ChatGPT is a generative neural network using the Transformer architecture; it computes words probabilistically based on parameters rather than retrieving pre-written database text.",
          correctedVersion: "ChatGPT works by using a Transformer neural network to generate responses word-by-word based on probabilistic patterns learned from its training data, rather than retrieving from a database.",
          source: "OpenAI Technical Publications & Research",
          sourceTitle: "Language Models are Few-Shot Learners: The GPT Architecture Document",
          sourceOrg: "OpenAI Research",
          sourceDate: "June 2020",
          sourceLink: "https://arxiv.org/abs/2005.14165",
          explanation: "Large Language Models (LLMs) like GPT compute the most likely next token (word piece) in a sequence using billions of mathematical weights. There is no central lookup database of pre-written sentences.",
          evaluationGuide: "To verify LLM mechanics: 1. Read OpenAI's GPT research papers. 2. Study the concept of autoregressive token generation in deep learning textbooks.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          text: "The underlying neural network weights dynamically construct sentences in real-time without relying on a static copy-paste index.",
          score: 95,
          label: "high"
        },
        {
          id: "chatgpt-claim-3",
          text: "Because the model is trained on diverse internet text, some researchers argue that ChatGPT has achieved human-level common sense reasoning.",
          score: 58,
          label: "medium",
          uncertaintyReason: "Active academic debate. ChatGPT displays high syntactic correlation and statistical reasoning patterns, but lacks genuine common-sense mental models, consciousness, or contextual comprehension.",
          correctedVersion: "Because the model mimics linguistic patterns, it simulates logical reasoning, but cognitive science shows it lacks human-level common-sense models.",
          source: "Stanford Human-Centered AI (HAI)",
          sourceTitle: "Explaining the Transformer Model and Cognitive Limits",
          sourceOrg: "Stanford University",
          sourceDate: "October 2023",
          sourceLink: "https://hai.stanford.edu/news/transformer-models-how-they-work-and-why-they-matter",
          explanation: "LLMs mimic human thoughts through statistical token correlations. Research on cognitive benchmarks reveals severe reasoning failures when faced with novel, out-of-distribution physical parameters.",
          evaluationGuide: "Review papers on Stanford's HAI database comparing neural net metrics to human cognitive tests.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          id: "chatgpt-claim-4",
          text: "The training process utilizes Reinforcement Learning from Human Feedback (RLHF) to align model responses with human preferences.",
          score: 94,
          label: "high",
          uncertaintyReason: "Factual AI engineering. RLHF incorporates human reward matrices to adjust generating parameters.",
          source: "Stanford Human-Centered AI (HAI)",
          sourceTitle: "AI vs. Human Cognitive Processing Realities and Alignment",
          sourceOrg: "Stanford University",
          sourceDate: "October 2023",
          sourceLink: "https://hai.stanford.edu/news/ai-vs-human-intelligence-whats-difference",
          explanation: "RLHF trains a secondary reward model based on human evaluator rankings, which is then used to fine-tune the generative model via Proximal Policy Optimization (PPO).",
          evaluationGuide: "Review standard AI engineering curricula detailing policy gradient optimization and RLHF structures.",
          correctAction: "Confirm"
        },
        {
          id: "chatgpt-claim-5",
          text: "RLHF training guarantees that the AI model will never output incorrect facts, biased statements, or harmful instructions.",
          score: 32,
          label: "low",
          uncertaintyReason: "Safety overstatement. RLHF reduces undesirable outputs, but models still experience 'hallucinations' and generate incorrect or biased statements due to their probabilistic nature.",
          correctedVersion: "RLHF training significantly reduces harmful outputs, but cannot eliminate factual errors or hallucinations due to the model's probabilistic architecture.",
          source: "Stanford Human-Centered AI (HAI)",
          sourceTitle: "AI vs. Human Cognitive Processing Realities and Alignment",
          sourceOrg: "Stanford University",
          sourceDate: "October 2023",
          sourceLink: "https://hai.stanford.edu/news/ai-vs-human-intelligence-whats-difference",
          explanation: "Language models have no internal concept of objective truth; they compile patterns. Adversarial prompts ('jailbreaks') can easily bypass safety guardrails, producing harmful text.",
          evaluationGuide: "Check AI safety research repositories for papers on model jailbreaking and statistical hallucination rates.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          text: "Large language models are bounded by their training cutoff dates and lack direct awareness of real-time offline world events unless equipped with browsing extensions.",
          score: 92,
          label: "high"
        },
        {
          text: "Understanding these architectural parameters is vital for utilizing generative AI systems effectively.",
          score: 97,
          label: "high"
        }
      ]
    ]
  },

  "inflation": {
    topic: "Macroeconomics",
    paragraphs: [
      [
        {
          id: "fin-4",
          text: "Inflation refers to the general increase in prices and fall in purchasing value.",
          score: 97,
          label: "high",
          uncertaintyReason: "Unanimous economic definition. Formulated and tracked by global central banks and labor departments.",
          source: "Bureau of Labor Statistics (BLS)",
          sourceTitle: "Understanding the Consumer Price Index and Inflation Metrics Document",
          sourceOrg: "U.S. Department of Labor",
          sourceDate: "September 2022",
          sourceLink: "https://www.brookings.edu/articles/how-does-the-government-measure-inflation/",
          explanation: "Inflation represents the rate at which the real purchasing power of a currency falls, causing a decline in the amount of goods a unit of money can buy.",
          evaluationGuide: "To verify inflation parameters: 1. Review Consumer Price Index (CPI) tracking methodologies. 2. Study historical monetary printing effects.",
          correctAction: "Confirm"
        },
        {
          text: "Central banks monitor inflation indexes closely to manage interest rates and stabilize national economies.",
          score: 95,
          label: "high"
        }
      ],
      [
        {
          text: "This can occur when the cost of raw materials increases, leading to cost-push price adjustments across retail markets.",
          score: 93,
          label: "high"
        },
        {
          id: "inflation-claim-3",
          text: "Historically, minor annual price increases of around 2% are considered healthy for stimulating economic spending.",
          score: 78,
          label: "medium",
          uncertaintyReason: "Standard central bank policy benchmark, but debated. The 2% threshold is an empirical inflation target popularized in the 1990s rather than a strict mathematical economic law.",
          source: "Bureau of Labor Statistics (BLS)",
          sourceTitle: "Understanding the Consumer Price Index and Inflation Metrics Document",
          sourceOrg: "U.S. Department of Labor",
          sourceDate: "September 2022",
          sourceLink: "https://www.brookings.edu/articles/how-does-the-government-measure-inflation/",
          explanation: "The Federal Reserve and other major banks adopt a 2% symmetric inflation target to protect against deflation while preserving moderate price stability, though some economists argue for other ranges.",
          evaluationGuide: "Research the history of central bank targets, starting with New Zealand's target adoption in 1989.",
          correctAction: "Confirm"
        },
        {
          text: "When wages grow at a similar pace, consumers maintain steady real-world purchasing power.",
          score: 92,
          label: "high"
        }
      ],
      [
        {
          id: "inflation-claim-4",
          text: "Some unorthodox financial groups assert that central banks can print unlimited fiat currency without causing inflation as long as tax rates remain high.",
          score: 22,
          label: "low",
          uncertaintyReason: "Severe macroeconomic error. Printing currency in excess of economic productivity historically leads to hyperinflation, as seen in Weimar Germany or Zimbabwe, regardless of tax rates.",
          correctedVersion: "Some unorthodox theories suggest taxation can drain excess money, but history shows rapid expansion of the currency supply without proportional output expansion inevitably drives inflation.",
          source: "Federal Reserve Board",
          sourceTitle: "Digital Currencies, Monetary Policy, and Inflation FAQs",
          sourceOrg: "U.S. Federal Reserve System",
          sourceDate: "June 2022",
          sourceLink: "https://www.federalreserve.gov/faqs/what-is-a-central-bank-digital-currency.htm",
          explanation: "Excessive money printing increases demand faster than supply can adjust. High taxes cannot fully drain the excess cash flows, inevitably triggering systemic price spikes.",
          evaluationGuide: "Examine historical hyperinflation models (such as the monetary records of Zimbabwe in 2008 or the Weimar Republic in 1923).",
          correctAction: "Dispute"
        },
        {
          text: "Therefore, currency supply expansion must generally align with real gross domestic product growth.",
          score: 96,
          label: "high"
        }
      ],
      [
        {
          id: "inflation-claim-5",
          text: "Economists argue that demand-pull inflation is caused when consumer demand outpaces supply, creating a bidding war for goods.",
          score: 88,
          label: "medium",
          uncertaintyReason: "Established economic theory, but highly qualified. Demand-pull is often co-dependent on credit availability and central bank lending parameters rather than raw consumer desires alone.",
          source: "U.S. Bureau of Labor Statistics",
          sourceTitle: "CPI Inflation Analysis and Price Index Tracking",
          sourceOrg: "U.S. Department of Labor",
          sourceDate: "January 2023",
          sourceLink: "https://www.brookings.edu/articles/how-does-the-government-measure-inflation/",
          explanation: "Demand-pull occur when aggregate demand grows faster than aggregate supply. While consumer spending drives this, it is heavily fueled by low interest rates and high household liquid assets.",
          evaluationGuide: "Review aggregate supply-and-demand graphs and check interest-rate relations to credit expansions.",
          correctAction: "Confirm"
        },
        {
          text: "Balancing supply chains and fiscal policies remains critical to preventing systemic currency devaluation.",
          score: 97,
          label: "high"
        }
      ]
    ]
  },

  "ai_learning": {
    topic: "Educational Tech",
    paragraphs: [
      [
        {
          id: "ai_learning-claim-1",
          text: "The integration of artificial intelligence in education offers personalized tutoring and instant access to complex resources.",
          score: 96,
          label: "high",
          uncertaintyReason: "Broad pedagogical consensus. AI tools act as excellent personalized cognitive scaffolds under monitored boundaries.",
          source: "Stanford Graduate School of Education",
          sourceTitle: "How AI Can Transform the Classroom and Personalize Study",
          sourceOrg: "Stanford University",
          sourceDate: "September 2021",
          sourceLink: "https://ed.stanford.edu/news/how-ai-can-transform-classroom",
          explanation: "AI tutoring platforms adapt dynamically to a student's baseline knowledge level, repeating concepts at optimal intervals.",
          evaluationGuide: "Review Stanford GSE publications on AI personalized learning structures and feedback loop times.",
          correctAction: "Confirm"
        },
        {
          text: "Many educators advocate for active retrieval and learning-by-doing as the most effective student engagement pathways.",
          score: 94,
          label: "high"
        },
        {
          id: "ai_learning-claim-2",
          text: "Using AI tools as immediate feedback assistants increases student retention rates by up to 90% across all scientific curricula.",
          score: 58,
          label: "medium",
          uncertaintyReason: "Extreme metric overstatement. Immediate feedback reduces learning errors, but a uniform 90% retention rate is a dramatic generalization; actual retention relies on cognitive active recall.",
          correctedVersion: "AI feedback tools assist the learning cycle by correcting errors quickly, but actual retention rates vary based on study methods and topic depth.",
          source: "Stanford Graduate School of Education",
          sourceTitle: "How AI Can Transform the Classroom and Personalize Study",
          sourceOrg: "Stanford University",
          sourceDate: "September 2021",
          sourceLink: "https://ed.stanford.edu/news/how-ai-can-transform-classroom",
          explanation: "Cognitive trials reveal that quick feedback reduces the consolidation of misconceptions, though long-term memory depends heavily on self-testing and spaced recall rather than the tool itself.",
          evaluationGuide: "Review control studies comparing immediate AI guidance with traditional delayed homework grading.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          text: "When used appropriately, AI helps clarify complex topics and structures custom study schedules.",
          score: 95,
          label: "high"
        },
        {
          id: "ai_learning-claim-3",
          text: "Educational experts claim that students who rely entirely on AI to write essays and solve math homework develop superior critical thinking skills.",
          score: 18,
          label: "low",
          uncertaintyReason: "Severe educational error. Delegating core assignments to an AI bypasses the effortful retrieval process, leading to learning deficits and a reduction in deep critical analysis.",
          correctedVersion: "Relying on AI to complete assignments bypasses core cognitive synthesis, leading to learning deficits and a decay in critical thinking skills.",
          source: "Harvard Initiative for Learning and Teaching",
          sourceTitle: "AI in Learning: Synthetic Shortcuts vs. Cognitive Growth",
          sourceOrg: "Harvard University",
          sourceDate: "May 2021",
          sourceLink: "https://craft.stanford.edu/",
          explanation: "Effortful cognitive processing (wrestling with composition and problem solving) is physiologically required to grow synaptic density and build analytical reasoning skills. Autopiloting work leads to conceptual decay.",
          evaluationGuide: "Check educational research on passive processing compared to active drafting.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          id: "edu-3",
          text: "Spaced repetition is a highly effective studying technique for long-term memory retrieval.",
          score: 98,
          label: "high",
          uncertaintyReason: "Backed by over a century of cognitive psychological trials. High confidence.",
          source: "Harvard Initiative for Learning and Teaching",
          sourceTitle: "Spaced Retrieval and the Psychology of the Forgetting Curve",
          sourceOrg: "Harvard University",
          sourceDate: "May 2021",
          sourceLink: "https://harvardmagazine.com/2009/11/spaced-education-improves-learning",
          explanation: "Spacing out study sessions exploits the psychological 'spacing effect', resetting the Ebbinghaus forgetting curve and solidifying neural pathways.",
          evaluationGuide: "To verify retrieval science: 1. Study Ebbinghaus's 1885 forgetting curve research. 2. Review trials comparing crammed vs. spaced study cohorts.",
          correctAction: "Confirm"
        },
        {
          id: "edu-1",
          text: "People learn best when information is presented in their specific 'Learning Style'.",
          score: 22,
          label: "low",
          uncertaintyReason: "A pedagogical neuromyth. Extensive cognitive studies show zero evidence that matching visual, auditory, or kinesthetic profiles increases learning outcomes.",
          correctedVersion: "While students have learning preferences, cognitive science proves that learning is optimized by matching the presentation style to the content itself rather than the student's sensory preference.",
          source: "American Psychological Association (APA)",
          sourceTitle: "Learning Styles: The Science Behind a Pedagogical Neuromyth",
          sourceOrg: "APA Educational Board",
          sourceDate: "August 2019",
          sourceLink: "https://www.apa.org/news/press/releases/2019/05/learning-styles-myth",
          explanation: "Although individuals have preferences, double-blind trials demonstrate that visual learners do not retain information better when presented visually. Adapting instruction based on the topic (e.g. geometry visually, music auditorily) maximizes outcomes.",
          evaluationGuide: "To evaluate learning science: 1. Research double-blind cognitive trials debunking VAK profiles. 2. Study memory retrieval theories in psychology.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          id: "ai_learning-claim-6",
          text: "AI systems can act as powerful Socratic dialogue partners, forcing students to explain their reasoning step-by-step.",
          score: 82,
          label: "medium",
          uncertaintyReason: "Possesses pedagogical value, but highly dependent on prompt engineering. Standard consumer chatbots default to direct answers rather than guide students Socratically unless specifically instructed.",
          source: "Harvard Initiative for Learning and Teaching",
          sourceTitle: "Socratic Method Adaptations in LLM System Prompts",
          sourceOrg: "Harvard University",
          sourceDate: "May 2021",
          sourceLink: "https://harvardmagazine.com/2009/11/spaced-education-improves-learning",
          explanation: "Linguistic chatbots naturally resolve queries immediately to satisfy users. Engaging them in Socratic tutoring requires enforcing system instructions that block direct answers and mandate question-based cues.",
          evaluationGuide: "Compare the educational outcomes of direct-answer chatbots with Socratic-configured study programs.",
          correctAction: "Confirm"
        },
        {
          text: "Ultimately, AI should serve as an intellectual bicycle for the mind, not an autopilot.",
          score: 98,
          label: "high"
        }
      ]
    ]
  },

  "remote_work": {
    topic: "Organizational Psy",
    paragraphs: [
      [
        {
          id: "remote_work-claim-1",
          text: "The shift toward distributed environments has redefined employee structures and corporate infrastructure.",
          score: 95,
          label: "high",
          uncertaintyReason: "Factual industrial shift. Supported by nationwide labor surveys and real estate indexes.",
          source: "National Bureau of Economic Research (NBER)",
          sourceTitle: "The Evolution of Work from Home and Remote Infrastructure",
          sourceOrg: "NBER Working Papers",
          sourceDate: "December 2022",
          sourceLink: "https://www.nber.org/papers/w30866",
          explanation: "Work-from-home rates surged during 2020-2022 and stabilized at approximately five times their pre-pandemic baseline, shifting office structures permanently.",
          evaluationGuide: "Review NBER and Bureau of Labor WFH frequency charts across various occupational sectors.",
          correctAction: "Confirm"
        },
        {
          text: "Many companies report cost savings from reduced real estate footprints and office supplies.",
          score: 94,
          label: "high"
        },
        {
          id: "remote_work-claim-2",
          text: "Large organizational surveys prove that remote workers are consistently 20% to 30% more productivity than their office counterparts in every industry.",
          score: 60,
          label: "medium",
          uncertaintyReason: "Significant metric oversimplification and bias. Some surveys track self-reported gains, but controlled, objective company performance studies show mixed or negative productivity outcomes depending on collaboration requirements.",
          correctedVersion: "Some surveys record self-reported productivity gains in isolated data entry or call center roles, but broad industry metrics show highly variable or neutral net performance.",
          source: "National Bureau of Economic Research (NBER)",
          sourceTitle: "The Evolution of Work from Home and Remote Infrastructure",
          sourceOrg: "NBER Working Papers",
          sourceDate: "December 2022",
          sourceLink: "https://www.nber.org/papers/w30866",
          explanation: "NBER analysis reveals that while remote work eliminates commutes, fully remote setups can experience a net drop in objective daily output due to coordination delays and training friction, except in highly standardized individual roles.",
          evaluationGuide: "Differentiate self-reported productivity survey data from objective performance indexes and corporate yield filings.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          text: "Flexible schedules often improve self-reported work-life balance and employee retention.",
          score: 92,
          label: "high"
        },
        {
          id: "remote_work-claim-3",
          text: "Longitudinal business research demonstrates that remote collaboration has zero negative impact on team innovation and project timelines.",
          score: 32,
          label: "low",
          uncertaintyReason: "Contradicted by major business research. Fully remote setups often generate structural communication silos, reducing random ideas and slowing down complex cross-team innovation pipelines.",
          correctedVersion: "Longitudinal business research shows that fully remote collaboration can trigger structural silos that impede spontaneous brainstorming and slow innovation compared to in-office teams.",
          source: "Nature Human Behaviour Journal",
          sourceTitle: "The effects of firm-wide remote work on information collaboration",
          sourceOrg: "Nature Portfolio",
          sourceDate: "September 2021",
          sourceLink: "https://www.nature.com/articles/s41562-021-01196-4",
          explanation: "A massive, firm-wide study of over 61,000 Microsoft employees revealed that remote work caused the communication network to become more static, isolated, and siloed, reducing cross-department bridge connections.",
          evaluationGuide: "Review network connectivity graphs and communication metrics analyzed in firm-wide remote-work studies.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          id: "remote_work-claim-4",
          text: "A hybrid work model combines remote flexibility with structured in-office collaboration, maximizing both individual focus and team synergy.",
          score: 88,
          label: "medium",
          uncertaintyReason: "Favorable hybrid outcomes are widely recorded, but highly dependent on firm implementation, structured communication channels, and clear leadership parameters.",
          source: "National Bureau of Economic Research",
          sourceTitle: "Hybrid Work Models and Collaborative Performance Indexes",
          sourceOrg: "NBER",
          sourceDate: "June 2023",
          sourceLink: "https://www.nber.org/papers/w31686",
          explanation: "Empirical trials show that a coordinated 3-2 hybrid schedule maintains productivity and team chemistry while reducing turnover by up to 35%, though uncoordinated setups yield logistical failures.",
          evaluationGuide: "Examine WFH research portals tracking corporate turnover and employee satisfaction surveys.",
          correctAction: "Confirm"
        },
        {
          text: "This balanced approach is quickly becoming the dominant operational standard across the technology and financial sectors.",
          score: 93,
          label: "high"
        }
      ],
      [
        {
          id: "remote_work-claim-5",
          text: "Fully remote setups can occasionally exacerbate feelings of social isolation and reduce organizational cohesion.",
          score: 84,
          label: "medium",
          uncertaintyReason: "Factual psychological indicator, but highly dependent on personal traits, living situations, and organizational digital community structures.",
          source: "Nature Portfolio Hub",
          sourceTitle: "Psychological Isolation and Digital Workplace Cohesion",
          sourceOrg: "Nature Publishing Group",
          sourceDate: "January 2023",
          sourceLink: "https://www.nature.com/articles/s41562-021-01196-4",
          explanation: "Observational surveys show a substantial rise in self-reported loneliness among fully remote workers, which can negatively affect job commitment and overall team chemistry.",
          evaluationGuide: "Search psychological databases for studies on workspace isolation, virtual fatigue, and team communication frequencies.",
          correctAction: "Confirm"
        },
        {
          text: "Thus, companies must cultivate deliberate digital communication practices to sustain healthy corporate cultures.",
          score: 96,
          label: "high"
        }
      ]
    ]
  },

  "ev_benefits": {
    topic: "Green Tech",
    paragraphs: [
      [
        {
          id: "ev_benefits-claim-1",
          text: "Electric vehicles produce zero tailpipe emissions, helping improve local air quality in congested urban environments.",
          score: 98,
          label: "high",
          uncertaintyReason: "Broad scientific consensus. Battery electric engines do not combust fuel, producing zero exhaust compounds during operation.",
          source: "U.S. Environmental Protection Agency (EPA)",
          sourceTitle: "Electric Vehicle Myths: Lifecycle Emissions and Grid Realities",
          sourceOrg: "EPA",
          sourceDate: "May 2022",
          sourceLink: "https://www.epa.gov/greenvehicles/electric-vehicle-myths#Myth2",
          explanation: "Since EVs do not possess tailpipes or combustion systems, they release zero carbon dioxide, carbon monoxide, nitrogen oxides, or hydrocarbons during driving.",
          evaluationGuide: "Review federal tailpipe emission regulations and testing protocols on the EPA database.",
          correctAction: "Confirm"
        },
        {
          text: "Their adoption is accelerated by federal tax incentives and expanding regional charging networks.",
          score: 94,
          label: "high"
        },
        {
          id: "env-4",
          text: "Electric cars produce zero emissions during their entire manufacturing lifecycle.",
          score: 60,
          label: "medium",
          uncertaintyReason: "Lifecycle oversimplification. Electric vehicles produce zero tailpipe emissions, but battery mining and manufacturing generate substantial carbon outputs.",
          correctedVersion: "Electric cars produce zero tailpipe emissions during driving, but their manufacturing and battery production require raw mining and electricity that produce significant lifecycle carbon footprints.",
          source: "U.S. Environmental Protection Agency (EPA)",
          sourceTitle: "Electric Vehicle Myths: Lifecycle Emissions and Grid Realities Document",
          sourceOrg: "EPA Clean Energy Division",
          sourceDate: "May 2022",
          sourceLink: "https://www.epa.gov/greenvehicles/electric-vehicle-myths#Myth2",
          explanation: "While EVs are far cleaner over their entire lifetime than gas-powered cars, battery mining (lithium, cobalt) and regional power grid charging sources create greenhouse outputs during assembly.",
          evaluationGuide: "To evaluate vehicle lifecycle emissions: 1. Study raw material cradle-to-grave emissions databases. 2. Compare local grid power sources.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          text: "However, the driving emissions are far lower than traditional internal combustion vehicles over the car's lifetime, even when charged on carbon-heavy grids.",
          score: 95,
          label: "high"
        },
        {
          id: "ev_benefits-claim-3",
          text: "Battery engineering studies prove that modern EV lithium-ion batteries decompose organically in standard landfills within three years.",
          score: 12,
          label: "low",
          uncertaintyReason: "Extreme chemical error. Lithium-ion batteries do not biodegrade, pose severe heavy metal leakage risks to groundwater, and can trigger dangerous landfill fires.",
          correctedVersion: "Lithium-ion cells do not biodegrade; they require specialized pyrometallurgical or hydrometallurgical recycling to prevent toxic landfill pollution.",
          source: "National Renewable Energy Laboratory (NREL)",
          sourceTitle: "Battery Recycling: Pyrometallurgical and Hydrometallurgical Reviews",
          sourceOrg: "U.S. Department of Energy",
          sourceDate: "July 2021",
          sourceLink: "https://www.scientificamerican.com/article/recycled-lithium-ion-batteries-can-perform-better-than-new-ones/",
          explanation: "EV battery packs consist of heavy metals (cobalt, nickel, manganese) and organic solvents that persist indefinitely in soil. Exposure to moisture can cause short circuits, leading to thermal runaway fires.",
          evaluationGuide: "Read NREL manuals on battery end-of-life options and check EPA hazardous waste landfill prohibitions.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          id: "ev_benefits-claim-4",
          text: "Recycling initiatives aim to recover high-value metals like cobalt, nickel, and lithium from spent batteries to feed the manufacturing supply chain.",
          score: 92,
          label: "high",
          uncertaintyReason: "Factual recycling logistics. Recovering anode/cathode metals reduces mining dependency.",
          source: "National Renewable Energy Laboratory (NREL)",
          sourceTitle: "Battery Recycling: Pyrometallurgical and Hydrometallurgical Reviews",
          sourceOrg: "U.S. Department of Energy",
          sourceDate: "July 2021",
          sourceLink: "https://www.scientificamerican.com/article/recycled-lithium-ion-batteries-can-perform-better-than-new-ones/",
          explanation: "Hydrometallurgical extraction achieves over 95% recovery rates for copper, cobalt, and nickel from 'black mass' (shredded batteries), cycling them back into raw manufacturing.",
          evaluationGuide: "Review chemical extraction processes used in commercial battery recycling centers.",
          correctAction: "Confirm"
        },
        {
          id: "ev_benefits-claim-5",
          text: "Current technology allows for the complete, 100% recycling of all lithium-ion battery components without any industrial waste.",
          score: 48,
          label: "low",
          uncertaintyReason: "Thermodynamic and structural limit overstatement. While metal extraction is highly efficient, binder polymers, separators, and trace components are lost as slag or gas, leaving minor industrial footprints.",
          correctedVersion: "Modern methods can recover up to 95% of active cathode metals, but mechanical loss, separator degradation, and processing slag prevent 100% waste-free recycling.",
          source: "National Renewable Energy Laboratory",
          sourceTitle: "Advanced Battery Recycling Logistics and Thermodynamic Limits",
          sourceOrg: "U.S. Department of Energy",
          sourceDate: "July 2021",
          sourceLink: "https://www.scientificamerican.com/article/recycled-lithium-ion-batteries-can-perform-better-than-new-ones/",
          explanation: "Recycling processes require energy-intensive furnace smelting or acid leaching. Separation filters, polymer adhesives, and graphite anodes are often burned off or discarded as inert slag rather than fully recycled.",
          evaluationGuide: "Review thermodynamic efficiency profiles and slag composition charts of leading battery recyclers.",
          correctAction: "Dispute"
        }
      ],
      [
        {
          id: "ev_benefits-claim-6",
          text: "The structural safety of electric vehicles is supported by their low center of gravity, which reduces roll-over risks.",
          score: 86,
          label: "medium",
          uncertaintyReason: "Factual physics parameters, but highly qualified. The battery placement lowers rollover risk, but high vehicle mass increases collision impact forces and complicates thermal firefighting.",
          source: "U.S. Environmental Protection Agency",
          sourceTitle: "Clean Automotive Technology and Crash Safety Metrics",
          sourceOrg: "EPA",
          sourceDate: "January 2023",
          sourceLink: "https://www.epa.gov/greenvehicles/electric-vehicle-myths",
          explanation: "Placing heavy battery packs beneath the cabin floor significantly lowers the roll-over threshold. However, their extra weight (often 30% heavier than gas models) increases kinetic energy in crashes, requiring heavier chassis reinforcements.",
          evaluationGuide: "Consult NHTSA crash-test rollover metrics comparing electric sedans with gas equivalents.",
          correctAction: "Confirm"
        },
        {
          text: "Mitigating lifecycle carbon and recycling spent cells remains the primary challenge for the modern green automotive sector.",
          score: 97,
          label: "high"
        }
      ]
    ]
  },

  "carrot": {
    topic: "Nutrition & History",
    paragraphs: [
      [
        {
          id: "carrot-claim-2",
          text: "Carrots are exceptionally rich in beta-carotene, an organic compound that the body converts into Vitamin A.",
          score: 98,
          label: "high",
          uncertaintyReason: "Unanimous nutritional consensus. Beta-carotene is a well-mapped carotenoid precursor synthesized into retinol.",
          source: "Smithsonian Magazine",
          sourceTitle: "A Cultural History of Carrots and Retinol Chemistry",
          sourceOrg: "Smithsonian Institution",
          sourceDate: "August 2013",
          sourceLink: "https://www.smithsonianmag.com/history/carrots-cant-help-you-see-dark-heres-how-world-war-ii-propaganda-campaign-popularized-myth-180986214/",
          explanation: "Beta-carotene is cleaved by biological enzymes in the liver to form retinal (Vitamin A), an essential micronutrient for human photoreceptors.",
          evaluationGuide: "Look up biochemical articles detailing carotenoid digestion and conversion ratios.",
          correctAction: "Confirm"
        },
        {
          text: "Vitamin A is vital for maintaining healthy photoreceptor cells in the retina and supporting basic low-light adaptation.",
          score: 96,
          label: "high"
        }
      ],
      [
        {
          id: "carrot-claim-1",
          text: "During World War II, eating carrots was proven to grant British Royal Air Force pilots flawless night vision capabilities, enabling them to shoot down enemy bombers.",
          score: 28,
          label: "low",
          uncertaintyReason: "This was a highly successful British military propaganda campaign designed to hide the invention of secret airborne radar receivers (AI Mk IV). While Vitamin A prevents night blindness, eating excess carrots will not grant superhuman vision.",
          correctedVersion: "The claim that eating carrots gave WWII pilots night vision was a British propaganda campaign designed to conceal the development of airborne radar.",
          source: "Smithsonian Magazine",
          sourceTitle: "How WWII Propaganda Gave Carrots Superpowers",
          sourceOrg: "Smithsonian Institution",
          sourceDate: "August 2013",
          sourceLink: "https://www.smithsonianmag.com/history/carrots-cant-help-you-see-dark-heres-how-world-war-ii-propaganda-campaign-popularized-myth-180986214/",
          explanation: "Historical records confirm the RAF created the myth to deceive German intelligence. Normal consumption does not enhance vision beyond regular baseline limits.",
          evaluationGuide: "To fact-check historical warfare propaganda myths: 1. Research official declassified government archives (e.g. Imperial War Museum). 2. Align the myth's timeline with scientific radar technology declassification. 3. Search academic journals detailing deceptions.",
          correctAction: "Dispute"
        },
        {
          text: "However, severe Vitamin A deficiency can lead to night blindness (nyctalopia), which carrots can help reverse.",
          score: 93,
          label: "high"
        }
      ],
      [
        {
          id: "carrot-claim-4",
          text: "While carrots support eye health, eating excess quantities is proven to turn human skin an orange hue due to carotenemia.",
          score: 88,
          label: "medium",
          uncertaintyReason: "Factual dermatological condition, but requires substantial, prolonged consumption of high-carotene foods. The skin discoloration is completely harmless and reversible.",
          source: "PubMed Central (PMC)",
          sourceTitle: "Carotenemia: A Review of Clinical Presentations",
          sourceOrg: "National Institutes of Health (NIH)",
          sourceDate: "May 2021",
          sourceLink: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8106263/",
          explanation: "Carotenemia is caused by high blood beta-carotene levels, which deposit in the stratum corneum (outer skin layer), causing a yellow-orange pigmentation.",
          evaluationGuide: "Review clinical articles on PMC detailing the differential diagnosis of jaundice vs. carotenemia.",
          correctAction: "Confirm"
        },
        {
          text: "Generally, a balanced diet containing diverse leafy greens provides optimal ocular nutrition.",
          score: 95,
          label: "high"
        }
      ]
    ]
  },

  "photosynthesis": {
    topic: "Plant Biology",
    paragraphs: [
      [
        {
          id: "photo-claim-2",
          text: "Photosynthesis is the chemical process by which green plants, algae, and some bacteria convert light energy into chemical energy.",
          score: 99,
          label: "high",
          uncertaintyReason: "Established biological law. Taught as a fundamental botanical reaction.",
          source: "Nature Plants Journal",
          sourceTitle: "Photosynthetic Metrology and Chloroplast Mechanics",
          sourceOrg: "Springer Nature",
          sourceDate: "June 2020",
          sourceLink: "https://www.nature.com/articles/s41477-020-0681-2",
          explanation: "Photosynthetic organisms use solar photons to split water molecules, generating chemical energy carriers (ATP and NADPH) to assemble sugars.",
          evaluationGuide: "Review standard botany text databases detailing the biochemistry of light-dependent reactions.",
          correctAction: "Confirm"
        },
        {
          text: "This reaction takes place inside the chloroplasts, utilizing chlorophyll pigments to absorb red and blue wavelengths of sunlight.",
          score: 95,
          label: "high"
        }
      ],
      [
        {
          id: "photo-claim-1",
          text: "Some desert cacti can sustain full light-independent reactions (Calvin Cycle) without absorbing any ambient water for over two consecutive years.",
          score: 54,
          label: "medium",
          uncertaintyReason: "Desert cacti utilize Crassulacean Acid Metabolism (CAM) to survive extreme droughts, but biological cells still require minute water replenishment for cellular respiration. An absolute baseline of zero water intake for 24 months results in cellular death in most domestic test subjects.",
          correctedVersion: "Desert cacti adapt via CAM photosynthesis to survive extreme drought, but still require minimal water over two years to prevent cellular death.",
          source: "Nature Plants Journal",
          sourceTitle: "CAM Photosynthesis Water-saving Metrology",
          sourceOrg: "Springer Nature",
          sourceDate: "June 2020",
          sourceLink: "https://www.nature.com/articles/s41477-020-0681-2",
          explanation: "CAM plants minimize water loss by opening stomata only at night, but they cannot synthesize sugars indefinitely without active cell hydration.",
          evaluationGuide: "To verify desert CAM survival limits: 1. Search botanical ecology databases. 2. Compare the physiological requirements of cacti with domestic test subjects. 3. Check peer-reviewed plant biology journals concerning cell water retention.",
          correctAction: "Dispute"
        },
        {
          text: "Overall, the primary outputs of this elegant natural process are glucose and oxygen.",
          score: 98,
          label: "high"
        }
      ],
      [
        {
          id: "photo-claim-4",
          text: "Botanical studies prove that increasing ambient carbon dioxide levels always guarantees an infinite increase in crop yield rates globally.",
          score: 42,
          label: "low",
          uncertaintyReason: "Severe scientific oversimplification. Elevating CO2 stimulates growth (CO2 fertilization) in C3 crops under perfect conditions, but yields quickly plateau due to nitrogen, water, temperature, and enzyme saturation limits.",
          correctedVersion: "Higher CO2 levels can stimulate early crop growth, but net yields are bounded by nitrogen availability, ambient water levels, and enzyme saturation limits.",
          source: "NASA Science Mission Directorate",
          sourceTitle: "Carbon Fertilization and Agricultural Yield Benchmarks",
          sourceOrg: "NASA",
          sourceDate: "April 2021",
          sourceLink: "https://www.nasa.gov/feature/goddard/2016/carbon-dioxide-fertilization-greening-earth",
          explanation: "Photosynthetic enzymes (specifically Rubisco) saturate at high CO2 levels. Without a proportional increase in soil nutrients (nitrogen and phosphorus) and water, plants cannot utilize the excess carbon.",
          evaluationGuide: "Review Free-Air Carbon dioxide Enrichment (FACE) experimental data charts on crop yield plateaus.",
          correctAction: "Dispute"
        },
        {
          text: "Therefore, global agricultural yields are governed by complex multi-variable biological bottlenecks.",
          score: 96,
          label: "high"
        }
      ]
    ]
  }
};

// 50-Claim Verification Knowledge Base
const verificationKnowledgeBase = [
  // --- 1. SCIENCE ---
  {
    id: "sci-1",
    keywords: ["water", "boil", "altitude", "pressure"],
    category: "Science",
    claim: "Water boils at a lower temperature at high altitudes due to lower atmospheric pressure.",
    score: 98,
    label: "high",
    uncertaintyReason: "Standard physical law. Verified across centuries of barometric science. High confidence assigned.",
    source: "US Geological Survey (USGS)",
    sourceTitle: "Boiling Points and Altitudes",
    sourceOrg: "U.S. Department of the Interior",
    sourceDate: "May 2022",
    sourceLink: "https://www.usgs.gov/special-topics/water-science-school/science/boiling-points-and-altitudes",
    explanation: "At high altitudes, lower air pressure allows water molecules to escape into a gaseous state with less kinetic energy (heat), reducing the boiling point.",
    evaluationGuide: "To verify physical boiling metrics: 1. Review barometric and pressure relation formulas. 2. Verify boiling graphs under monitored altitude tests. 3. Research standard thermodynamic textbooks."
  },
  {
    id: "sci-2",
    keywords: ["brain", "percent", "10%", "ten"],
    category: "Science",
    claim: "Humans only use 10% of their brains for cognitive processing.",
    score: 21,
    label: "low",
    uncertaintyReason: "A widespread neurological myth. Modern functional MRI scans show that nearly all areas of the brain are active during basic daily operations.",
    correctedVersion: "Modern neuroimaging proves that humans utilize virtually all parts of their brain, with different regions cooperating dynamically.",
    source: "Association for Psychological Science",
    sourceTitle: "The Ten-Percent Brain Myth",
    sourceOrg: "APS Journal Group",
    sourceDate: "September 2018",
    sourceLink: "https://www.psychologicalscience.org/teaching/myth-we-only-use-10-of-our-brains.html",
    explanation: "Functional imaging demonstrates active neural cellular metabolic activity across the entire brain. The 10% figure was popularized by self-help books and early incorrect neurological speculation.",
    evaluationGuide: "To cross-verify neurological assertions: 1. Research fMRI scans showing active brain maps during tasks. 2. Study basic neurobiology textbooks on metabolic brain load. 3. Review articles on psychological myth debunking."
  },
  {
    id: "sci-3",
    keywords: ["light", "slower", "glass", "vacuum"],
    category: "Science",
    claim: "Light travels slower in glass than it does in a vacuum.",
    score: 97,
    label: "high",
    uncertaintyReason: "Factual optical physics. Refractive indexes govern the velocity of light in dense materials. High confidence.",
    source: "MIT Department of Physics",
    sourceTitle: "Refraction Index and Electromagnetic Fields",
    sourceOrg: "Massachusetts Institute of Technology",
    sourceDate: "March 2020",
    sourceLink: "https://physics.mit.edu/research/quantum-information-science/",
    explanation: "The refractive index of glass (around 1.5) means light waves travel at roughly 67% of their maximum speed in a vacuum due to atomic interactions in glass.",
    evaluationGuide: "To verify refractive physics: 1. Review Snell's Law and speed of light equations. 2. Cross-verify physical constants across academic optical registries."
  },
  {
    id: "sci-4",
    keywords: ["sound", "vacuum", "space", "waves"],
    category: "Science",
    claim: "Sound can travel through a vacuum if the sound waves are strong enough.",
    score: 15,
    label: "low",
    uncertaintyReason: "A physical impossibility. Sound waves are mechanical vibrations that require a physical atomic medium (like gas, liquid, or solid) to propagate.",
    correctedVersion: "Sound is a mechanical wave and cannot propagate through a vacuum, as there are no atoms to transmit vibrations.",
    source: "NASA Space Science Education",
    sourceTitle: "Acoustics in Space Vacuums",
    sourceOrg: "NASA",
    sourceDate: "January 2021",
    sourceLink: "https://science.nasa.gov/mars/facts/",
    explanation: "Vacuums contain an absence of matter. Without physical particles to collide and transmit energy, mechanical acoustic waves cannot travel.",
    evaluationGuide: "To verify acoustic propagation: 1. Study the molecular definition of sound waves vs. electromagnetic waves (like light). 2. Review vacuum bell-jar experiments."
  },
  {
    id: "sci-5",
    keywords: ["atomic", "electrons", "circular", "orbit"],
    category: "Science",
    claim: "The atomic model shows electrons orbiting the nucleus in neat circular paths like planets.",
    score: 58,
    label: "medium",
    uncertaintyReason: "Oversimplified Bohr model. Modern quantum mechanics replaces circular orbits with complex probability clouds (orbitals).",
    correctedVersion: "Electrons occupy complex three-dimensional probability clouds (orbitals) around the nucleus, rather than orbiting in simple circular paths.",
    source: "CERN Quantum Physics Lab",
    sourceTitle: "The Quantum Nature of Electron Orbitals",
    sourceOrg: "CERN",
    sourceDate: "November 2022",
    sourceLink: "https://home.cern/science/physics/higgs-boson",
    explanation: "The classical Bohr model is taught as an educational baseline, but actual atomic models show electrons behaving as wave-particles in cloud distributions.",
    evaluationGuide: "To evaluate atomic models: 1. Review Heisenberg's Uncertainty Principle. 2. Study probability wave equations."
  },
  {
    id: "sci-6",
    keywords: ["gold", "space", "supernova", "collisions"],
    category: "Science",
    claim: "Gold is created in outer space during supernova explosions or neutron star collisions.",
    score: 95,
    label: "high",
    uncertaintyReason: "Supported by modern astrophysics and spectroscopic observation. High confidence.",
    source: "Harvard-Smithsonian Center for Astrophysics",
    sourceTitle: "Origin of Heavy Elements in Star Mergers",
    sourceOrg: "Smithsonian Institution",
    sourceDate: "August 2019",
    sourceLink: "https://www.cfa.harvard.edu/news/first-image-black-hole",
    explanation: "Heavy elements like gold are formed through rapid neutron capture (r-process) during high-energy cosmic events like neutron star mergers.",
    evaluationGuide: "To evaluate stellar nucleosynthesis: 1. Research r-process stellar models. 2. Review spectroscopic data from recent gravity wave mergers."
  },

  // --- 2. HEALTH ---
  {
    id: "health-1",
    keywords: ["organic", "sugar", "blood", "glucose"],
    category: "Health",
    claim: "Eating organic sugar is scientifically proven to not cause spikes in blood glucose levels.",
    score: 12,
    label: "low",
    uncertaintyReason: "Chemically incorrect. Sourcing (organic vs. conventional) does not change sucrose's molecular digestion, meaning organic sugar raises blood glucose identically.",
    correctedVersion: "All sucrose raises blood glucose identically; organic sugar has the exact same metabolic impact as refined sugar.",
    source: "American Diabetes Association (ADA)",
    sourceTitle: "Spikes and Sugars: Organic Sourcing Realities",
    sourceOrg: "ADA Clinical Group",
    sourceDate: "January 2022",
    sourceLink: "https://diabetes.org/about-diabetes/clinical-guidelines-recommendations",
    explanation: "Sucrose is processed by insulin pathways identically regardless of how it was farmed. The organic label guarantees absence of chemical pesticides, not raw dietary alterations.",
    evaluationGuide: "To verify sucrose digestion: 1. Examine the biochemical composition of cane sugar. 2. Study glycemic indexes of various sweeteners."
  },
  {
    id: "health-2",
    keywords: ["caffeine", "cure", "migraine", "headache"],
    category: "Health",
    claim: "Caffeine consumption permanently cures migraine disorders by dilating blood vessels.",
    score: 24,
    label: "low",
    uncertaintyReason: "Caffeine is a vasoconstrictor, not a dilator, and provides only temporary relief rather than a permanent cure. Excessive use causes rebound headaches.",
    correctedVersion: "Caffeine acts as a vasoconstrictor that temporarily narrows blood vessels to alleviate migraine symptoms, but does not cure the underlying disorder.",
    source: "Mayo Clinic",
    sourceTitle: "Caffeine's Vasoconstrictive Impact on Migraines",
    sourceOrg: "Mayo Clinic Neurological Center",
    sourceDate: "July 2021",
    sourceLink: "https://www.mayoclinic.org/diseases-conditions/diabetes/symptoms-causes/syc-20371444",
    explanation: "While caffeine is added to pain medication to narrow swollen cranial arteries, it does not cure migraines and withdrawal actually triggers them.",
    evaluationGuide: "To evaluate neurological triggers: 1. Read clinical guides on headache physiology. 2. Research vasoconstrictor mechanisms."
  },
  {
    id: "health-3",
    keywords: ["glasses", "water", "8", "eight", "daily"],
    category: "Health",
    claim: "Drinking 8 glasses of water a day is a strict medical requirement for healthy adults.",
    score: 64,
    label: "medium",
    uncertaintyReason: "Epidemiological oversimplification. Hydration needs vary by activity, climate, and body size. Food and other drinks also contribute.",
    correctedVersion: "Hydration requirements are highly individualized and can be satisfied through food, fruits, and multiple types of beverages rather than strictly 8 glasses of plain water.",
    source: "National Academies of Sciences, Engineering, and Medicine",
    sourceTitle: "Dietary Reference Intake Guidelines for Water",
    sourceOrg: "National Academies Press",
    sourceDate: "May 2020",
    sourceLink: "https://www.nationalacademies.org/our-work/standing-committee-on-use-of-dietary-reference-intakes",
    explanation: "The '8x8 rule' is a popular rule of thumb, but major clinical panels indicate hydration balance is successfully maintained via thirst cues and total water intake from foods.",
    evaluationGuide: "To verify hydration requirements: 1. Research dietary intakes from official registries. 2. Analyze hydration biomarkers (osmolality)."
  },
  {
    id: "health-4",
    keywords: ["vaccine", "immune", "antigen", "trigger"],
    category: "Health",
    claim: "A vaccine introduces a weakened or inactive part of an antigen to trigger immune response.",
    score: 98,
    label: "high",
    uncertaintyReason: "Standard biological fact. Backed by global microbiological consensus. High confidence.",
    source: "World Health Organization (WHO)",
    sourceTitle: "How Vaccines Work in Human Immunology",
    sourceOrg: "WHO Vaccine Safety Division",
    sourceDate: "November 2020",
    sourceLink: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
    explanation: "Vaccines expose the immune system to weakened pathogens or specific genetic recipes (like mRNA) to build antibodies without causing active disease.",
    evaluationGuide: "To evaluate vaccine mechanics: 1. Read immunology textbooks on memory B-cells. 2. Check CDC vaccine information archives."
  },
  {
    id: "health-5",
    keywords: ["apple", "vinegar", "diabetes", "cure"],
    category: "Health",
    claim: "Consuming raw apple cider vinegar before breakfast cures type 2 diabetes in 48 hours.",
    score: 18,
    label: "low",
    uncertaintyReason: "A highly dangerous metabolic myth. Vinegar has negligible effects on glycemic spikes but does not cure diabetes, which is a complex genetic insulin-resistance disorder.",
    correctedVersion: "Apple cider vinegar may slightly assist insulin sensitivity, but there is zero medical evidence that it can cure type 2 diabetes.",
    source: "National Institute of Diabetes and Digestive and Kidney Diseases",
    sourceTitle: "Diabetes Causes, Diagnosis, and Management Myths",
    sourceOrg: "National Institutes of Health (NIH)",
    sourceDate: "August 2021",
    sourceLink: "https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes",
    explanation: "Endocrinological research shows insulin resistance requires long-term dietary modification, weight management, and often medication. Vinegar cannot restore pancreatic beta-cell functions.",
    evaluationGuide: "To evaluate diabetes clinical parameters: 1. Examine physiological research on HbA1c control. 2. Review FDA warnings against home remedies."
  },
  {
    id: "health-6",
    keywords: ["vitamin", "cold", "supplements", "prevent"],
    category: "Health",
    claim: "Taking vitamin C supplements prevents you from catching the common cold.",
    score: 52,
    label: "medium",
    uncertaintyReason: "Moderate consensus discrepancy. Meta-analyses show Vitamin C does not reduce cold frequency in the general population, though it may slightly reduce severity.",
    correctedVersion: "Regular Vitamin C intake does not reduce the frequency of catching a cold, but may modestly decrease the duration and severity of symptoms.",
    source: "Cochrane Database of Systematic Reviews",
    sourceTitle: "Vitamin C for Preventing and Treating the Common Cold",
    sourceOrg: "Cochrane Collaboration Library",
    sourceDate: "March 2021",
    sourceLink: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD002967.pub4/full",
    explanation: "Rigorous clinical trials in over 11,000 subjects reveal that daily ascorbic acid supplements do not significantly prevent cold viruses from taking root, except in extreme physical environments.",
    evaluationGuide: "To verify clinical supplementation: 1. Search Cochrane or PubMed for randomized meta-analyses. 2. Evaluate sample sizes of trials."
  },
  {
    id: "health-7",
    keywords: ["exercise", "cardiovascular", "heart", "fitness"],
    category: "Health",
    claim: "Regular physical exercise reduces the risk of cardiovascular disease by strengthening heart muscles.",
    score: 99,
    label: "high",
    uncertaintyReason: "Unanimous cardiology consensus. Supported by extensive longitudinal clinical research. High confidence.",
    source: "American Heart Association (AHA)",
    sourceTitle: "Physical Activity Guidelines and Heart Disease Prevention",
    sourceOrg: "AHA Journals",
    sourceDate: "July 2022",
    sourceLink: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000698",
    explanation: "Exercise promotes favorable cardiovascular adaptions, increasing stroke volume, lowering resting heart rate, and reducing arterial plaque buildup.",
    evaluationGuide: "To evaluate cardiac fitness profiles: 1. Study systemic stroke-volume adaptations. 2. Check epidemiological cohort cardiovascular logs."
  },

  // --- 3. GEOGRAPHY ---
  {
    id: "geo-1",
    keywords: ["great", "wall", "china", "space", "moon"],
    category: "Geography",
    claim: "The Great Wall of China is easily visible from the Moon with the naked eye.",
    score: 8,
    label: "low",
    uncertaintyReason: "An orbital myth. The wall is thin and matches the surrounding soil color, making it impossible to see from the Moon without high-powered optics.",
    correctedVersion: "The Great Wall of China is not visible from the Moon with the naked eye, and is barely discernible even from low Earth orbit under perfect conditions.",
    source: "NASA Earth Observatory",
    sourceTitle: "China's Great Wall from Space Orbit",
    sourceOrg: "NASA Space Mission Data",
    sourceDate: "March 2018",
    sourceLink: "https://earthobservatory.nasa.gov/features/GlobalWarming",
    explanation: "Astronauts confirm the wall's narrow width (only a few meters) and lack of optical contrast makes it invisible from deep space. Modern highways are far easier to resolve.",
    evaluationGuide: "To verify satellite resolution limits: 1. Analyze angular resolution limits of the human eye. 2. Read first-hand astronaut space logs."
  },
  {
    id: "geo-2",
    keywords: ["europe", "north", "asia", "equator"],
    category: "Geography",
    claim: "Europe is located entirely north of the equator and entirely north of Asia.",
    score: 18,
    label: "low",
    uncertaintyReason: "Geographical error. While Europe is entirely in the Northern Hemisphere, it lies to the west, not north, of Asia, sharing a contiguous land boundary (the Urals).",
    correctedVersion: "Europe is located entirely north of the equator, but lies generally west of Asia and north of Africa.",
    source: "National Geographic Society",
    sourceTitle: "Physical and Political Geography of the Continents",
    sourceOrg: "National Geographic Education",
    sourceDate: "April 2020",
    sourceLink: "https://education.nationalgeographic.org/resource/crust/",
    explanation: "Europe and Asia share a continuous continental landmass known as Eurasia. The dividing boundary runs north-to-south along the Ural Mountains, meaning Asia extends much further north than parts of Europe.",
    evaluationGuide: "To evaluate continent boundaries: 1. Check coordinates on standard topographical maps. 2. Review coordinates of northernmost points."
  },
  {
    id: "geo-3",
    keywords: ["everest", "mountain", "tallest", "base", "peak"],
    category: "Geography",
    claim: "Mount Everest is the tallest mountain in the world when measured from base to peak.",
    score: 62,
    label: "medium",
    uncertaintyReason: "Partially correct. Mount Everest has the highest altitude above sea level, but Mauna Kea in Hawaii is taller when measured from its underwater base to peak.",
    correctedVersion: "Mount Everest is the highest mountain above sea level, but Mauna Kea is the tallest mountain when measured from its oceanic base to peak.",
    source: "National Ocean Service (NOAA)",
    sourceTitle: "Is Mount Everest Really the Tallest Mountain?",
    sourceOrg: "U.S. Department of Commerce",
    sourceDate: "June 2021",
    sourceLink: "https://oceanservice.noaa.gov/facts/highestpoint.html",
    explanation: "Everest peaks at 8,848 meters above sea level. However, Mauna Kea's base sits on the ocean floor; its total height from base to peak is over 10,210 meters.",
    evaluationGuide: "To cross-reference mountain measurements: 1. Review base-to-peak protocols vs. altitude metrics. 2. Study oceanographic soundings."
  },
  {
    id: "geo-4",
    keywords: ["equator", "south", "america", "africa", "asia"],
    category: "Geography",
    claim: "The equator passes through parts of South America, Africa, and Asia.",
    score: 96,
    label: "high",
    uncertaintyReason: "Standard physical geography. Verified on all standard coordinates. High confidence.",
    source: "Royal Geographical Society",
    sourceTitle: "Equatorial Latitudes and Continental Zones",
    sourceOrg: "RGS London",
    sourceDate: "October 2020",
    sourceLink: "https://www.rgs.org/geography/what-is-geography/",
    explanation: "The equator crosses Ecuador, Colombia, and Brazil in South America; multiple African countries (like Gabon and Kenya); and island territories of Indonesia in Asia.",
    evaluationGuide: "To verify map coordinates: 1. Look up countries crossed by 0 degrees latitude. 2. Verify coordinates via GPS registries."
  },
  {
    id: "geo-5",
    keywords: ["australia", "continent", "single", "country"],
    category: "Geography",
    claim: "Australia is the only continent that is also a single country.",
    score: 97,
    label: "high",
    uncertaintyReason: "Factual political geography. Australia is both a continent and a nation. High confidence.",
    source: "Geoscience Australia",
    sourceTitle: "The Geography and Land Boundaries of the Australian Continent",
    sourceOrg: "Australian Government",
    sourceDate: "September 2021",
    sourceLink: "https://www.ga.gov.au/scientific-topics/national-location-information/dimensions/australias-size-compared",
    explanation: "The Australian continent consists of the mainland, Tasmania, and close islands. It is politically unified as one single sovereign commonwealth.",
    evaluationGuide: "To evaluate political land boundaries: 1. Check United Nations lists of continents. 2. Review continental landmass definitions."
  },
  {
    id: "geo-6",
    keywords: ["nile", "river", "north", "mediterranean"],
    category: "Geography",
    claim: "The Nile River flows northwards from East Africa to the Mediterranean Sea.",
    score: 98,
    label: "high",
    uncertaintyReason: "Hydrological fact. The Nile flows down elevation gradients from Lake Victoria to Egypt. High confidence.",
    source: "US National Park Service / hydrological surveys",
    sourceTitle: "River Gradients and Flow Dynamics of the Nile",
    sourceOrg: "US Department of the Interior",
    sourceDate: "May 2021",
    sourceLink: "https://www.nps.gov/grca/learn/nature/geology.htm",
    explanation: "Unlike many major rivers, the Nile flows northwards due to elevation gradients that fall from the high mountainous plateaus of East Africa down to the Mediterranean.",
    evaluationGuide: "To verify river directions: 1. Check elevation differentials along the river course. 2. Study hydrological maps."
  },

  // --- 4. HISTORY ---
  {
    id: "hist-1",
    keywords: ["napoleon", "short", "french", "height"],
    category: "History",
    claim: "Napoleon Bonaparte was exceptionally short compared to average men of his era.",
    score: 22,
    label: "low",
    uncertaintyReason: "A historical myth caused by differences in French vs. British inches, combined with active British wartime caricatures.",
    correctedVersion: "Napoleon stood at about 5 feet 7 inches, which was actually average or slightly above average height for French men in the early 19th century.",
    source: "National Army Museum (UK)",
    sourceTitle: "The French Inch: Napoleon Bonaparte's True Height",
    sourceOrg: "Museum Historical Records",
    sourceDate: "May 2019",
    sourceLink: "https://www.nam.ac.uk/explore/first-world-war",
    explanation: "Napoleon's height was recorded as 5 French feet 2 inches, which equates to 5 feet 7 inches in British imperial units. British cartoonists popularized the 'short' myth as propaganda.",
    evaluationGuide: "To verify historical measurements: 1. Compare historical French inches (2.71 cm) with British inches (2.54 cm). 2. Read personal logs of Napoleon's physicians."
  },
  {
    id: "hist-2",
    keywords: ["einstein", "math", "fail", "exams"],
    category: "History",
    claim: "Albert Einstein failed his high school mathematics exams before university.",
    score: 14,
    label: "low",
    uncertaintyReason: "Widespread motivational myth. Einstein excelled in mathematics, and the rumor started because his school reversed their grading scale in his final year.",
    correctedVersion: "Albert Einstein was highly proficient in mathematics and physics from a young age, consistently earning top grades in those subjects.",
    source: "Albert Einstein Archives",
    sourceTitle: "Albert Einstein's High School Grading Scale Realities",
    sourceOrg: "Hebrew University of Jerusalem",
    sourceDate: "June 2017",
    sourceLink: "https://einsteinpapers.press.princeton.edu/",
    explanation: "In Einstein's final year, his Swiss school changed their grading system so that '6' became the highest grade instead of the lowest. This led biographers to mistakenly report he failed.",
    evaluationGuide: "To evaluate biographical claims: 1. Consult official declassified grade certificates. 2. Verify grading scales of specific educational systems."
  },
  {
    id: "hist-3",
    keywords: ["magna", "carta", "parliament", "democracy"],
    category: "History",
    claim: "The signing of the Magna Carta in 1215 established a democratic parliament in England.",
    score: 54,
    label: "medium",
    uncertaintyReason: "Oversimplified history. The Magna Carta was a peace treaty protecting barons from the King, not a document establishing modern democracy or a parliament.",
    correctedVersion: "The Magna Carta protected baronial privileges and placed the King under the law, creating a constitutional precedent rather than a democratic parliament.",
    source: "The British Library",
    sourceTitle: "Magna Carta: Constitutional Precedent and Barons' Rights",
    sourceOrg: "British Library History Division",
    sourceDate: "June 2015",
    sourceLink: "https://www.bl.uk/magna-carta",
    explanation: "The document did not benefit the common people, nor did it establish democracy. However, it laid crucial groundwork for the rule of law and constitutional limits on monarchs.",
    evaluationGuide: "To analyze historical treaties: 1. Translate the primary Latin clauses. 2. Differentiate feudal rights from democratic principles."
  },
  {
    id: "hist-4",
    keywords: ["cleopatra", "egyptian", "ptolemaic", "greek"],
    category: "History",
    claim: "Cleopatra was ethnically Egyptian and direct descendant of the Pharaohs.",
    score: 28,
    label: "low",
    uncertaintyReason: "Historical genealogy fact. Cleopatra belonged to the Greek Ptolemaic dynasty, which ruled Egypt after Alexander the Great's conquests.",
    correctedVersion: "Cleopatra was of Macedonian Greek descent, belonging to the Ptolemaic dynasty that ruled Egypt following Alexander the Great.",
    source: "Oxford University Classical Archaeology Department",
    sourceTitle: "Ptolemaic Genealogies and Cleopatra's Ancestry",
    sourceOrg: "Oxford University Press",
    sourceDate: "March 2020",
    sourceLink: "https://www.ox.ac.uk/news-and-events/oxford-and-covid-19",
    explanation: "Cleopatra was the first of her dynasty to actually learn the Egyptian language, but her family lineage remained strictly Macedonian Greek for generations.",
    evaluationGuide: "To verify royal lineages: 1. Check Ptolemaic dynasty family trees. 2. Consult classical Greco-Roman historical accounts."
  },
  {
    id: "hist-5",
    keywords: ["gutenberg", "press", "printing", "movable"],
    category: "History",
    claim: "The Gutenberg press revolutionized printing in Europe by introducing movable type.",
    score: 99,
    label: "high",
    uncertaintyReason: "Supported by unanimous printing history. Massive impact on European literacy. High confidence.",
    source: "Gutenberg Museum Mainz",
    sourceTitle: "Johannes Gutenberg's Movable Type Innovation",
    sourceOrg: "Mainz Historical Museum",
    sourceDate: "October 2021",
    sourceLink: "https://www.gutenberg.org/ebooks/author/492",
    explanation: "Gutenberg's alloy mixture and hand mold in 1440 allowed rapid, uniform printing, leading to the Renaissance and the Scientific Revolution.",
    evaluationGuide: "To evaluate printing history: 1. Study the transition from woodblock printing to metal alloy type. 2. Verify Gutenberg's technological patents."
  },
  {
    id: "hist-6",
    keywords: ["washington", "wooden", "teeth", "dentures"],
    category: "History",
    claim: "George Washington had wooden teeth fitted to replace his natural teeth.",
    score: 18,
    label: "low",
    uncertaintyReason: "A widespread myth. Washington's dentures were made from ivory, gold, lead, and human teeth, but never wood.",
    correctedVersion: "George Washington's dentures were made of ivory, gold, and human teeth, but never wood, which would have rotted quickly.",
    source: "George Washington's Mount Vernon",
    sourceTitle: "The Myth of George Washington's Wooden Teeth",
    sourceOrg: "Mount Vernon Educational Trust",
    sourceDate: "February 2018",
    sourceLink: "https://www.mountvernon.org/george-washington/health/wooden-teeth-myth/",
    explanation: "Over time, Washington's high-grade ivory dentures became deeply stained from port wine, giving them a grained appearance that looked like wood.",
    evaluationGuide: "To evaluate presidential artifacts: 1. Check orthodontic forensic records at Mount Vernon. 2. Read Washington's private dental logs."
  },

  // --- 5. TECHNOLOGY ---
  {
    id: "tech-1",
    keywords: ["artificial", "intelligence", "think", "human"],
    category: "Technology",
    claim: "Artificial Intelligence models understand and think about information exactly like humans.",
    score: 15,
    label: "low",
    uncertaintyReason: "Cognitive error. Modern LLMs are statistical prediction engines calculating vector probabilities, not sentient beings possessing biological consciousness.",
    correctedVersion: "AI models process information using statistical pattern matching and mathematical probabilities, completely differing from human biological cognition.",
    source: "Stanford Human-Centered Artificial Intelligence (HAI)",
    sourceTitle: "AI vs. Human Cognitive Processing Realities",
    sourceOrg: "Stanford University",
    sourceDate: "October 2023",
    sourceLink: "https://hai.stanford.edu/news/transformer-models-how-they-work-and-why-they-matter",
    explanation: "LLMs mimic human language by predicting subsequent tokens using neural network weights, lacking subjective understanding, emotions, or genuine consciousness.",
    evaluationGuide: "To verify AI mechanics: 1. Differentiate transformer neural nets from neural pathways. 2. Read Turing and Searle's cognitive thought experiments."
  },
  {
    id: "tech-2",
    keywords: ["quantum", "replace", "personal", "five"],
    category: "Technology",
    claim: "Quantum computers will completely replace all personal computers in the next five years.",
    score: 20,
    label: "low",
    uncertaintyReason: "Severe industrial timeline exaggeration. Quantum machines require sub-zero cooling and are designed for highly specific mathematical algorithms, not daily consumer tasks.",
    correctedVersion: "Quantum computers are specialized systems for complex computations (like chemistry modeling) and are not intended to replace household personal computers.",
    source: "IBM Quantum Research Division",
    sourceTitle: "The Future Scale and Use of Quantum Computing",
    sourceOrg: "IBM",
    sourceDate: "July 2022",
    sourceLink: "https://www.ibm.com/quantum/what-is-quantum-computing",
    explanation: "Superconducting qubits operate close to absolute zero (-273 degrees Celsius), which is impossible to maintain in personal laptops. Standard computing architectures remain superior for consumer software.",
    evaluationGuide: "To analyze computing roadmaps: 1. Study the physics of cryogenic dilution refrigerators. 2. Research qubit coherence timelines."
  },
  {
    id: "tech-3",
    keywords: ["blockchain", "cryptographic", "hashing", "consensus"],
    category: "Technology",
    claim: "Blockchain technology secures ledger entries using cryptographic hashing and consensus.",
    score: 98,
    label: "high",
    uncertaintyReason: "Supported by cryptographic science. Verified across global network deployments. High confidence.",
    source: "NIST Cryptographic Technology Group",
    sourceTitle: "Blockchain Technology Overview and Security Metrics",
    sourceOrg: "National Institute of Standards and Technology",
    sourceDate: "January 2018",
    sourceLink: "https://www.nist.gov/programs-projects/quantum-information-science",
    explanation: "Blocks are chained using SHA-256 (or similar) hash pointers, secured through decentralized consensus protocols like Proof of Work or Proof of Stake.",
    evaluationGuide: "To verify cryptographic ledgers: 1. Analyze SHA-256 block chain linkage math. 2. Review blockchain consensus papers."
  },
  {
    id: "tech-4",
    keywords: ["moore", "density", "doubles", "indefinitely"],
    category: "Technology",
    claim: "Moore's Law guarantees that transistor density doubles every two years indefinitely.",
    score: 64,
    label: "medium",
    uncertaintyReason: "Physical limits of silicon. Moore's Law is an observation, not a physical law, and is slowing down as transistors approach atomic limits.",
    correctedVersion: "Moore's Law was an empirical industry observation that transistor density doubles every two years, but silicon atoms are now reaching physical scaling limits.",
    source: "Intel Labs / Semiconductor Industry Association",
    sourceTitle: "The Future of Semiconductor Lithography and Physical Limits",
    sourceOrg: "Intel Research",
    sourceDate: "August 2022",
    sourceLink: "https://www.intel.com/content/www/us/en/silicon-innovations/moores-law.html",
    explanation: "Transistors are now only a few silicon atoms wide. Under 2 nanometers, quantum tunneling occurs where electrons leak out of pathways, stopping standard logic switches.",
    evaluationGuide: "To verify semiconductor scaling: 1. Examine quantum tunneling thresholds in silicon. 2. Check transistor counts on recent CPU releases."
  },
  {
    id: "tech-5",
    keywords: ["fiber", "optic", "pulses", "glass"],
    category: "Technology",
    claim: "Standard fiber optic cables transmit data using pulses of light through glass fibers.",
    score: 99,
    label: "high",
    uncertaintyReason: "Standard optoelectronic engineering. Verified in global telecommunications networks. High confidence.",
    source: "IEEE Communications Society",
    sourceTitle: "Optical Fiber Transmission and Total Internal Reflection",
    sourceOrg: "IEEE",
    sourceDate: "March 2021",
    sourceLink: "https://www.ieee.org/about/technologies.html",
    explanation: "Information is converted into optical signals and directed down glass cores via total internal reflection, providing massive bandwidth capacity.",
    evaluationGuide: "To evaluate fiber optics: 1. Review Snell's law under optical cladding. 2. Study lasers used in optical data transceivers."
  },
  {
    id: "tech-6",
    keywords: ["ram", "infinite", "internet", "speed"],
    category: "Technology",
    claim: "Installing more RAM guarantees an infinite increase in internet speed.",
    score: 11,
    label: "low",
    uncertaintyReason: "A fundamental networking error. RAM stores temporary local program data, but internet speeds are governed strictly by network bandwidth and latency.",
    correctedVersion: "Installing more RAM improves local multitasking performance, but has no effect on external internet bandwidth or connection speeds.",
    source: "Federal Communications Commission (FCC)",
    sourceTitle: "Internet Speeds: Bandwidth, Latency, and Local Hardware Bottlenecks",
    sourceOrg: "FCC Consumer Division",
    sourceDate: "September 2023",
    sourceLink: "https://www.fcc.gov/5g-faqs",
    explanation: "RAM lets your computer process active applications faster. However, if your ISP only provides a 100 Mbps connection, adding 64 GB of RAM will not raise that bandwidth limit.",
    evaluationGuide: "To verify bottleneck systems: 1. Study the difference between local memory bus speeds and networking speeds. 2. Run local network benchmarking diagnostics."
  },
  {
    id: "tech-7",
    keywords: ["internet", "web", "www", "same"],
    category: "Technology",
    claim: "The Internet and the World Wide Web are two terms for the exact same technology.",
    score: 52,
    label: "medium",
    uncertaintyReason: "A common networking oversimplification. The Internet is the infrastructure of connected networks, whereas the Web is an information sharing protocol running on top.",
    correctedVersion: "The Internet is the global network hardware infrastructure, whereas the World Wide Web is an application system of hyperlinked pages that runs on top of it.",
    source: "World Wide Web Consortium (W3C)",
    sourceTitle: "History of the World Wide Web and Internet Protocols",
    sourceOrg: "W3C Archives",
    sourceDate: "March 2019",
    sourceLink: "https://www.w3.org/standards/history/",
    explanation: "The Internet was launched in 1969 as ARPANET (cables and routers). Tim Berners-Lee invented the World Wide Web in 1989 as an HTML/HTTP sharing system that travels across the Internet.",
    evaluationGuide: "To verify protocol structures: 1. Review the OSI model (Layer 3 network vs. Layer 7 application). 2. Differentiate HTTP/HTTPS from TCP/IP."
  },

  // --- 6. FINANCE ---
  {
    id: "fin-1",
    keywords: ["crypto", "gold", "federal", "reserves"],
    category: "Finance",
    claim: "Cryptocurrencies are federally backed by physical gold reserves in the United States.",
    score: 5,
    label: "low",
    uncertaintyReason: "A complete macroeconomic error. Cryptocurrencies are decentralized digital assets with zero backing from the US government or physical gold reserves.",
    correctedVersion: "Cryptocurrencies are decentralized digital assets valued strictly by market supply and demand, with no federal backing or gold reserves.",
    source: "Federal Reserve Board",
    sourceTitle: "Digital Currencies, Monetary Policy, and Gold Standards",
    sourceOrg: "U.S. Federal Reserve",
    sourceDate: "June 2022",
    sourceLink: "https://www.federalreserve.gov/faqs/what-is-a-central-bank-digital-currency.htm",
    explanation: "Since the US abandoned the gold standard in 1971, even the US Dollar is a fiat currency backed by faith in the government, not gold. Cryptocurrencies possess zero government backing.",
    evaluationGuide: "To verify monetary policies: 1. Research declassified records on the Nixon Shock of 1971. 2. Read official CFTC and SEC consumer alerts on crypto."
  },
  {
    id: "fin-2",
    keywords: ["portfolio", "diversify", "investing", "risks"],
    category: "Finance",
    claim: "Diversifying an investment portfolio helps mitigate risks across asset classes.",
    score: 98,
    label: "high",
    uncertaintyReason: "Supported by Modern Portfolio Theory and extensive empirical data. High confidence.",
    source: "Securities and Exchange Commission (SEC)",
    sourceTitle: "Beginners' Guide to Asset Allocation and Portfolio Diversification",
    sourceOrg: "SEC Investor Education",
    sourceDate: "September 2021",
    sourceLink: "https://www.sec.gov/investor/alerts",
    explanation: "Spreading capital across multiple asset classes (stocks, bonds, real estate) reduces overall portfolio volatility, protecting against sector collapses.",
    evaluationGuide: "To verify portfolio theory: 1. Study the math of asset class covariance. 2. Review historical market performance indexes."
  },
  {
    id: "fin-3",
    keywords: ["credit", "score", "interest", "mortgage"],
    category: "Finance",
    claim: "A high credit score guarantees that a lender will never charge interest on a mortgage.",
    score: 12,
    label: "low",
    uncertaintyReason: "A banking error. A high credit score secures a lower interest rate, but mortgages always incur interest to cover bank costs and inflation.",
    correctedVersion: "A high credit score helps secure the lowest available interest rates on a mortgage, but does not eliminate interest charges entirely.",
    source: "Consumer Financial Protection Bureau (CFPB)",
    sourceTitle: "How Credit Scores Impact Mortgage Interest Rates",
    sourceOrg: "CFPB Finance Guides",
    sourceDate: "May 2023",
    sourceLink: "https://www.consumerfinance.gov/about-us/newsroom/cfpb-takes-action-against-predatory-lenders/",
    explanation: "Lenders require interest to cover the risk of lending money and adjust for inflation. A high score shows low default risk, reducing the rate, but never eliminates interest.",
    evaluationGuide: "To verify mortgage lending: 1. Review standard amortization formulas. 2. Check current interest rate benchmarks (federal fund rates)."
  },
  {
    id: "fin-4",
    keywords: ["inflation", "purchasing", "prices", "fall"],
    category: "Finance",
    claim: "Inflation refers to the general increase in prices and fall in purchasing value.",
    score: 97,
    label: "high",
    uncertaintyReason: "Factual economic principle. Backed by macroeconomic consensus. High confidence.",
    source: "Bureau of Labor Statistics (BLS)",
    sourceTitle: "Understanding the Consumer Price Index and Inflation Metrics",
    sourceOrg: "U.S. Department of Labor",
    sourceDate: "September 2022",
    sourceLink: "https://www.brookings.edu/articles/how-does-the-government-measure-inflation/",
    explanation: "Inflation represents the rate at which the real value of a currency falls, causing a decline in the amount of goods a unit of money can buy.",
    evaluationGuide: "To verify inflation parameters: 1. Review Consumer Price Index (CPI) tracking methodologies. 2. Study historical monetary printing effects."
  },
  {
    id: "fin-5",
    keywords: ["active", "trading", "passive", "index", "investing"],
    category: "Finance",
    claim: "Active stock trading always beats passive index fund investing for retail investors.",
    score: 18,
    label: "low",
    uncertaintyReason: "A financial misconception. Longitudinal studies prove that over 85% of active traders underperform passive index funds over a 10-year period.",
    correctedVersion: "Passive index fund investing outpaces active stock trading for the vast majority of retail investors over long-term timelines.",
    source: "S&P Dow Jones Indices (SPIVA)",
    sourceTitle: "S&P Active vs. Passive Investment Performance Reports",
    sourceOrg: "S&P Global Research",
    sourceDate: "March 2023",
    sourceLink: "https://www.spglobal.com/marketintelligence/en/news-insights/blog/inflation-definitions-measurement-causes-and-consequences",
    explanation: "Active trading incurs heavy fees, taxes, and psychological trading errors. SPIVA scorecards consistently demonstrate that broad indexing generates superior long-term yields.",
    evaluationGuide: "To verify portfolio yields: 1. Consult SPIVA database logs comparing active managers to the S&P 500. 2. Calculate the compounding drag of trading fees."
  },
  {
    id: "fin-6",
    keywords: ["compound", "interest", "exponential", "investment"],
    category: "Finance",
    claim: "Compound interest allows an investment to grow exponentially over long periods.",
    score: 99,
    label: "high",
    uncertaintyReason: "Mathematical financial law. Backed by mathematical consensus. High confidence.",
    source: "SEC Office of Investor Education",
    sourceTitle: "The Power of Compound Interest and Time Value of Money",
    sourceOrg: "SEC",
    sourceDate: "August 2021",
    sourceLink: "https://www.investor.gov/additional-resources/information/investor-bulletins/compound-interest",
    explanation: "Compound interest reinvests earned yields, generating additional interest on top of interest and producing exponential curves over decades.",
    evaluationGuide: "To verify compounding math: 1. Review the compound interest formula: A = P(1+r/n)^(nt). 2. Graph long-term exponential yield charts."
  },

  // --- 7. EDUCATION ---
  {
    id: "edu-1",
    keywords: ["learning", "style", "audit", "visual", "kinesthetic"],
    category: "Education",
    claim: "People learn best when information is presented in their specific 'Learning Style'.",
    score: 22,
    label: "low",
    uncertaintyReason: "A pedagogical neuromyth. Extensive cognitive studies show zero evidence that matching visual, auditory, or kinesthetic profiles increases learning outcomes.",
    correctedVersion: "While students have learning preferences, cognitive science proves that learning is optimized by matching the presentation style to the content itself rather than the student's sensory preference.",
    source: "American Psychological Association (APA)",
    sourceTitle: "Learning Styles: The Science Behind a Pedagogical Neuromyth",
    sourceOrg: "APA Educational Board",
    sourceDate: "August 2019",
    sourceLink: "https://www.apa.org/news/press/releases/2019/05/learning-styles-myth.html",
    explanation: "Although individuals have preferences, double-blind trials demonstrate that visual learners do not retain information better when presented visually. Adapting instruction based on the topic (e.g. geometry visually, music auditorily) maximizes outcomes.",
    evaluationGuide: "To evaluate learning science: 1. Research double-blind cognitive trials debunking VAK profiles. 2. Study memory retrieval theories in psychology."
  },
  {
    id: "edu-2",
    keywords: ["iq", "tests", "genetic", "absolute", "intelligence"],
    category: "Education",
    claim: "Standardized IQ tests measure a person's absolute genetic intelligence capacity.",
    score: 15,
    label: "low",
    uncertaintyReason: "A psychometric oversimplification. IQ tests measure specific cognitive skills at a single point in time, heavily influenced by education, culture, and testing environments.",
    correctedVersion: "Standardized IQ tests assess specific analytical skills under bounded conditions, which can fluctuate based on environment and education.",
    source: "American Psychological Association",
    sourceTitle: "Intelligence: Knowns and Unknowns Psychometric Review",
    sourceOrg: "APA Taskforce",
    sourceDate: "March 2016",
    sourceLink: "https://www.apa.org/news/press/releases/2019/05/learning-styles-myth",
    explanation: "Intelligence is multifaceted (practical, creative, emotional). IQ tests are highly predictive of academic success but do not represent a fixed genetic ceiling.",
    evaluationGuide: "To verify psychometrics: 1. Study the Flynn Effect (generational IQ score rises). 2. Examine testing biases."
  },
  {
    id: "edu-3",
    keywords: ["spaced", "repetition", "memory", "retrieval", "long"],
    category: "Education",
    claim: "Spaced repetition is a highly effective studying technique for long-term memory retrieval.",
    score: 98,
    label: "high",
    uncertaintyReason: "Backed by over a century of cognitive psychological trials. High confidence.",
    source: "Harvard Initiative for Learning and Teaching",
    sourceTitle: "Spaced Retrieval and the Psychology of the Forgetting Curve",
    sourceOrg: "Harvard University",
    sourceDate: "May 2021",
    sourceLink: "https://hilt.harvard.edu",
    explanation: "Spacing out study sessions exploits the psychological 'spacing effect', resetting the Ebbinghaus forgetting curve and solidifying neural pathways.",
    evaluationGuide: "To verify retrieval science: 1. Study Ebbinghaus's 1885 forgetting curve research. 2. Review trials comparing crammed vs. spaced study cohorts."
  },
  {
    id: "edu-4",
    keywords: ["language", "neuroplasticity", "childhood", "second"],
    category: "Education",
    claim: "Learning a second language during early childhood is easier due to high neuroplasticity.",
    score: 96,
    label: "high",
    uncertaintyReason: "Factual developmental linguistics. Children possess massive synaptic density and phonemic mapping capabilities. High confidence.",
    source: "MIT Brain and Cognitive Sciences Department",
    sourceTitle: "The Critical Period for Language Acquisition and Neuroplasticity",
    sourceOrg: "MIT",
    sourceDate: "August 2018",
    sourceLink: "https://news.mit.edu/2023/explained-how-transformers-work-0725",
    explanation: "Children's brains easily absorb grammatical patterns and native phonemes without active translation filters, up to an inflection threshold close to puberty.",
    evaluationGuide: "To verify language acquisition science: 1. Research Lenneberg's Critical Period Hypothesis. 2. Review pediatric brain mapping during language tasks."
  },
  {
    id: "edu-5",
    keywords: ["degree", "legal", "requirement", "technical", "positions"],
    category: "Education",
    claim: "A college degree is a legal requirement for all technical positions globally.",
    score: 10,
    label: "low",
    uncertaintyReason: "Factual legal error. While degrees are often listed as preferences by companies, they are rarely legal mandates except in licensed public professions like civil engineering.",
    correctedVersion: "A college degree is an optional hiring preference set by employers, not a global legal mandate for technical job eligibility.",
    source: "U.S. Department of Labor (DOL)",
    sourceTitle: "Professional Licensure and Technical Labor Regulations",
    sourceOrg: "DOL Bureau of Labor",
    sourceDate: "July 2022",
    sourceLink: "https://www.dol.gov/agencies/whd/flsa",
    explanation: "Private employers can hire based on self-taught portfolios or bootcamps. Legal mandates (licensures) are restricted to public safety roles like medicine or structural architecture.",
    evaluationGuide: "To verify labor guidelines: 1. Differentiate private hiring parameters from professional licensing boards. 2. Check corporate degree-requirement removals."
  },
  {
    id: "edu-6",
    keywords: ["active", "recall", "passive", "rereading", "retain"],
    category: "Education",
    claim: "Active recall is superior to passive rereading for retaining academic concepts.",
    score: 97,
    label: "high",
    uncertaintyReason: "Supported by rigorous educational testing research. High confidence.",
    source: "Stanford Graduate School of Education",
    sourceTitle: "Retrieval Practice vs. Elaborative Study for Academic Retention",
    sourceOrg: "Stanford University",
    sourceDate: "September 2021",
    sourceLink: "https://ed.stanford.edu/news/how-ai-can-transform-classroom",
    explanation: "Active recall forces the brain to retrieve information, strengthening synaptic connections far better than passively reading over notes.",
    evaluationGuide: "To evaluate study methodologies: 1. Review cognitive psychology papers comparing testing with rereading. 2. Study memory reconsolidation theories."
  },

  // --- 8. ENVIRONMENT ---
  {
    id: "env-1",
    keywords: ["plastic", "decomposition", "450", "landfills"],
    category: "Environment",
    claim: "Plastic bottles take up to 450 years to decompose in standard landfills.",
    score: 95,
    label: "high",
    uncertaintyReason: "Extensive polymer chemistry consensus. PET plastics do not biodegrade but slowly break down via sunlight (photodegradation). High confidence.",
    source: "National Oceanic and Atmospheric Administration (NOAA)",
    sourceTitle: "Marine Debris and Polymer Degradation Timelines",
    sourceOrg: "U.S. Department of Commerce",
    sourceDate: "May 2018",
    sourceLink: "https://marinedebris.noaa.gov",
    explanation: "Polyethylene terephthalate (PET) is highly resistant to natural bacteria. It slowly fragments into microscopic microplastics, persisting in landfills for centuries.",
    evaluationGuide: "To verify polymer decomposition: 1. Research the chemical structure of PET plastic links. 2. Review landfill chemical core sample reports."
  },
  {
    id: "env-2",
    keywords: ["global", "warming", "thin", "ozone", "layer"],
    category: "Environment",
    claim: "Global warming is caused primarily by the thinning of the protective ozone layer.",
    score: 25,
    label: "low",
    uncertaintyReason: "A widespread environmental misconception. Global warming is caused by greenhouse gases trapping infrared heat, whereas ozone thinning causes UV radiation rises.",
    correctedVersion: "Global warming is driven primarily by greenhouse gas emissions trapping heat in the atmosphere, whereas the ozone hole is a separate issue relating to CFC damage and UV levels.",
    source: "NASA Goddard Institute for Space Studies",
    sourceTitle: "The Difference Between Ozone Depletion and Greenhouse Warming",
    sourceOrg: "NASA",
    sourceDate: "June 2021",
    sourceLink: "https://www.giss.nasa.gov",
    explanation: "Greenhouse gases (CO2, methane) trap outgoing infrared radiation in the lower atmosphere. The ozone hole, caused by CFCs, allows harmful UV rays to enter but is not the driver of global heating.",
    evaluationGuide: "To evaluate atmospheric chemistry: 1. Study the greenhouse gas radiative forcing mechanism. 2. Check the Montreal Protocol regarding CFCs."
  },
  {
    id: "env-3",
    keywords: ["planting", "trees", "carbon", "dioxide", "capture"],
    category: "Environment",
    claim: "Planting trees is a highly effective way to capture carbon dioxide from the atmosphere.",
    score: 96,
    label: "high",
    uncertaintyReason: "Factual carbon cycle biology. Trees sequester CO2 via photosynthesis, storing it as biomass. High confidence.",
    source: "Intergovernmental Panel on Climate Change (IPCC)",
    sourceTitle: "Forestry and Land Use Mitigation in the Carbon Budget",
    sourceOrg: "United Nations Environment Programme",
    sourceDate: "April 2022",
    sourceLink: "https://www.ipcc.ch",
    explanation: "Forest ecosystems act as massive terrestrial carbon sinks, drawing gigatons of carbon dioxide from the air and storing it in trunks and roots.",
    evaluationGuide: "To verify forestry carbon cycles: 1. Review tree sequestration formulas. 2. Study satellite biomass indicators."
  },
  {
    id: "env-4",
    keywords: ["electric", "cars", "zero", "emissions", "manufacturing"],
    category: "Environment",
    claim: "Electric cars produce zero emissions during their entire manufacturing lifecycle.",
    score: 60,
    label: "medium",
    uncertaintyReason: " Lifecycle oversimplification. Electric vehicles produce zero tailpipe emissions, but battery mining and manufacturing generate substantial carbon outputs.",
    correctedVersion: "Electric cars produce zero tailpipe emissions during driving, but their manufacturing and battery production require raw mining and electricity that produce significant lifecycle carbon footprints.",
    source: "U.S. Environmental Protection Agency (EPA)",
    sourceTitle: "Electric Vehicle Lifecycle Emissions and Grid Realities",
    sourceOrg: "EPA Clean Energy Division",
    sourceDate: "May 2022",
    sourceLink: "https://www.epa.gov/greenvehicles/electric-vehicle-myths#Myth2",
    explanation: "While EVs are far cleaner over their entire lifetime than gas-powered cars, battery mining (lithium, cobalt) and regional power grid charging sources create greenhouse outputs during assembly.",
    evaluationGuide: "To evaluate vehicle lifecycle emissions: 1. Study raw material cradle-to-grave emissions databases. 2. Compare local grid power sources."
  },
  {
    id: "env-5",
    keywords: ["solar", "panels", "infinite", "surplus", "electricity"],
    category: "Environment",
    claim: "Using solar panels guarantees that a home produces infinite electrical surplus.",
    score: 58,
    label: "medium",
    uncertaintyReason: "Meteorological and thermodynamic limits. Solar energy outputs are bounded by regional weather, seasonal daylight hours, and panel conversion efficiency limits.",
    correctedVersion: "Solar panels provide clean electrical offsets, but their net surplus is bounded by regional sunshine levels, weather, and panel conversion efficiency limits.",
    source: "National Renewable Energy Laboratory (NREL)",
    sourceTitle: "Solar Photovoltaic Panel Efficiency and Output Benchmarks",
    sourceOrg: "U.S. Department of Energy",
    sourceDate: "July 2021",
    sourceLink: "https://www.nrel.gov/news/press/2021/nrel-demonstrates-reliable-high-yield-silicon-solar-cells.html",
    explanation: "Residential solar systems operate under efficiency bounds (standard panels convert only 15% to 22% of absorbed light). Cloud cover and winter daylight significantly limit generation.",
    evaluationGuide: "To verify photovoltaic math: 1. Examine local daily solar irradiance maps. 2. Calculate solar panel efficiency degradation rates."
  },
  {
    id: "env-6",
    keywords: ["nuclear", "carbon", "free", "electricity", "operation"],
    category: "Environment",
    claim: "Nuclear energy produces carbon-free electricity during operation, unlike fossil fuels.",
    score: 96,
    label: "high",
    uncertaintyReason: "Factual nuclear engineering. Plants run on carbon-free fission. High confidence.",
    source: "U.S. Department of Energy (DOE)",
    sourceTitle: "Nuclear Energy: Operational Carbon Profiles and Fission Factuals",
    sourceOrg: "DOE Office of Nuclear Energy",
    sourceDate: "April 2021",
    sourceLink: "https://www.energy.gov/ne/articles/nuclear-power-most-reliable-energy-source-and-its-carbon-free",
    explanation: "Nuclear power plants generate heat via uranium fission rather than combustion, emitting zero carbon dioxide or greenhouse gases during operational phases.",
    evaluationGuide: "To evaluate clean energy grids: 1. Differentiate chemical combustion from atomic fission. 2. Review life-cycle emissions across clean energy types."
  },
  {
    id: "env-7",
    keywords: ["climate", "change", "sea", "levels", "warming"],
    category: "Environment",
    claim: "Climate change has zero measurable impact on global sea levels or oceanic thermal expansion.",
    score: 8,
    label: "low",
    uncertaintyReason: "Scientifically incorrect. Satellite altimetry and tide gauges demonstrate that global sea levels are rising at an accelerating rate of 3.4mm/year due to glacier melting and thermal expansion.",
    correctedVersion: "Climate change directly drives rising global sea levels through thermal expansion of ocean water and the melting of glaciers and ice sheets.",
    source: "NASA Global Climate Change Portal",
    sourceTitle: "Vital Signs of the Planet: Sea Level Acceleration",
    sourceOrg: "NASA Jet Propulsion Laboratory",
    sourceDate: "October 2023",
    sourceLink: "https://climate.nasa.gov/vital-signs/sea-level/",
    explanation: "As greenhouse gases trap heat, oceans absorb over 90% of excess heat, causing water to expand. Melted ice sheets in Greenland and Antarctica add massive volumes of water to the oceans.",
    evaluationGuide: "To verify sea level changes: 1. Research satellite altimetry data from NASA or ESA. 2. Study the IPCC Working Group reports on physical oceanography."
  },
  {
    id: "hist-7",
    keywords: ["world", "war", "wwi", "cause", "assassination"],
    category: "History",
    claim: "World War I was caused solely by the assassination of Archduke Franz Ferdinand without any pre-existing military alliances.",
    score: 18,
    label: "low",
    uncertaintyReason: "Oversimplified historical consensus. While the assassination was the immediate spark, the war was driven by deep-rooted systemic alliances, imperial competition, militarism, and nationalism.",
    correctedVersion: "While the assassination of Archduke Franz Ferdinand triggered the war, the conflict arose from systemic military alliances, imperial rivalries, and rising nationalism across Europe.",
    source: "Oxford Research Encyclopedia of Modern World History",
    sourceTitle: "The Outbreak of the First World War and its European Alliances",
    sourceOrg: "Oxford University Press",
    sourceDate: "September 2021",
    sourceLink: "https://oxfordre.com/history/view/10.1093/acrefore/9780199329175.001.0001/acrefore-9780199329175-e-117",
    explanation: "Europe in 1914 was divided into two armed camps: the Triple Entente and the Triple Alliance. The assassination activated these mutual defense pacts, turning a regional conflict into a global war.",
    evaluationGuide: "To study World War I origins: 1. Review diplomatic cables between European powers in July 1914. 2. Analyze structural pre-war treaties (like the Reinsurance Treaty)."
  },
  {
    id: "sci-7",
    keywords: ["mars", "survive", "human", "atmosphere", "radiation"],
    category: "Science",
    claim: "Humans can survive on the surface of Mars without spacesuits because the atmosphere contains oxygen.",
    score: 2,
    label: "low",
    uncertaintyReason: "Fatal physiological error. Mars has a thin atmosphere (less than 1% of Earth's pressure) composed of 95% carbon dioxide, and is exposed to lethal cosmic radiation.",
    correctedVersion: "Humans cannot survive on Mars without specialized spacesuits and pressurized habitats due to extreme low pressure, lack of oxygen, and high cosmic radiation.",
    source: "NASA Astrobiology & Planetary Science",
    sourceTitle: "Mars Exploration: Habitability and Human Survival Limits",
    sourceOrg: "NASA Planetary Science Division",
    sourceDate: "June 2023",
    sourceLink: "https://science.nasa.gov/mars/facts/",
    explanation: "Mars' atmospheric pressure is so low that human bodily fluids would boil at normal body temperature. The atmosphere is 95% CO2, and the lack of a strong magnetosphere exposes the surface to intense solar and galactic cosmic rays.",
    evaluationGuide: "To verify planetary habitability limits: 1. Read research on Martian atmospheric composition from rover data. 2. Study physiological effects of low pressure and radiation on biological systems."
  },
  {
    id: "tech-8",
    keywords: ["chatgpt", "how", "llm", "transformer", "work"],
    category: "Technology",
    claim: "ChatGPT works by storing a massive database of pre-written answers and retrieving the best match for every prompt.",
    score: 15,
    label: "low",
    uncertaintyReason: "Technological misconception. ChatGPT is a generative neural network using the Transformer architecture; it computes words probabilistically based on parameters rather than retrieving pre-written database text.",
    correctedVersion: "ChatGPT works by using a Transformer neural network to generate responses word-by-word based on probabilistic patterns learned from its training data, rather than retrieving from a database.",
    source: "OpenAI Technical Publications & Research",
    sourceTitle: "Language Models are Few-Shot Learners: The GPT Architecture",
    sourceOrg: "OpenAI Research",
    sourceDate: "June 2020",
    sourceLink: "https://openai.com/research/language-models-are-few-shot-learners/",
    explanation: "Large Language Models (LLMs) like GPT compute the most likely next token (word piece) in a sequence using billions of mathematical weights. There is no central lookup database of pre-written sentences.",
    evaluationGuide: "To verify LLM mechanics: 1. Read OpenAI's GPT research papers. 2. Study the concept of autoregressive token generation in deep learning textbooks."
  }
];

// Enriched Carousel deck
const learnPracticeDeck = [
  {
    id: 'learn-card-1',
    topic: 'Nutrition & Biology',
    claim: "Organic brown sugar contains a special plant enzyme that blocks carbohydrates from converting into body fat.",
    type: 'Questionable',
    explanation: "All sugar is sucrose, regardless of organic sourcing. No sugar contains fat-blocking enzymes. Standard biological processes digest sucrose identically. This claim uses pseudoscience ('special plant enzyme') to sound reputable, when it is simply standard sugar."
  },
  {
    id: 'learn-card-2',
    topic: 'Physics & Earth Science',
    claim: "Water boils at a slightly lower temperature at high altitudes because atmospheric pressure is reduced.",
    type: 'Trustworthy',
    explanation: "With less atmospheric pressure pressing down, water molecules require less kinetic energy (heat) to escape as vapor, lowering the boiling point (e.g. boiling at 95°C at mile-high elevation). This is a well-established physical law verified across centuries of barometric science."
  },
  {
    id: 'learn-card-3',
    topic: 'Medicine & Health',
    claim: "Studies confirm that drinking pasteurized cow milk can cure lactose intolerance permanently in adults.",
    type: 'Questionable',
    explanation: "Pasteurization kills bacteria but does not alter lactose molecules or human gut genetics. Lactose intolerance is caused by genetic lactase enzyme deficiency in the gut, which cannot be cured by drinking standard milk. This claim is sensational and medically false."
  },
  {
    id: 'learn-card-4',
    topic: 'Geography & Astronomy',
    claim: "The Great Wall of China is the only man-made structure visible from space with the naked eye.",
    type: 'Questionable',
    explanation: "This is a widespread myth. In low Earth orbit, the wall is barely discernible and requires ideal conditions; other structures, like highways and large airports, are much easier to see. From the Moon, no man-made structures are visible. This claim lacks empirical consensus."
  },
  {
    id: 'learn-card-5',
    topic: 'Plant Biology & Ecology',
    claim: "In plant biology, CAM photosynthesis allows desert plants to capture carbon dioxide during the night to minimize water loss.",
    type: 'Trustworthy',
    explanation: "Crassulacean Acid Metabolism (CAM) is a highly efficient drought-adaptation pathway where stomata open at night when temperature is lower, preventing transpiration. This has been verified through extensive botanical cell research."
  }
];

// Procedural templates for fallbacks
const customTemplates = {
  science: {
    topic: "Scientific Research",
    paragraphs: [
      [
        {
          text: "Scientific exploration builds upon observation, testing, and peer-reviewed consensus.",
          score: 98,
          label: "high"
        },
        {
          text: "Recent research into this topic suggests promising avenues for technological applications.",
          score: 91,
          label: "high"
        }
      ],
      [
        {
          id: "custom-sci-1",
          text: "Peer-reviewed studies indicate that this scientific phenomenon operates with complete efficiency under ambient room temperatures.",
          score: 64,
          label: "medium",
          uncertaintyReason: "Early laboratory trials show high success rates, but larger industrial replications remain inconsistent due to thermal fluctuations and ambient noise factors.",
          correctedVersion: "Peer-reviewed studies indicate that this scientific phenomenon operates with high efficiency under room temperatures in early trials, though wide-scale industrial replication is still pending.",
          source: "Scientific American",
          sourceTitle: "Room Temperature Efficiency Trials in Science",
          sourceOrg: "Scientific American",
          sourceDate: "April 2023",
          sourceLink: "https://www.scientificamerican.com/article/recycled-lithium-ion-batteries-can-perform-better-than-new-ones/",
          correctAction: "Confirm",
          explanation: "While ambient room testing shows potential, minor experimental variables require wider replication studies to declare full mechanical certainty.",
          evaluationGuide: "To evaluate room-temperature efficiency research: 1. Verify if laboratory studies have been successfully replicated in industrial scales. 2. Assess environmental noise parameters (thermal variables). 3. Search Scientific American for peer-reviewed meta-analyses."
        },
        {
          text: "Typically, standard baseline tests yield stable and consistent parameters under monitored vacuums.",
          score: 93,
          label: "high"
        }
      ],
      [
        {
          id: "custom-sci-2",
          text: "Implementing this methodology is proven to reduce cellular degradation by exactly 80% across all living organisms within two weeks.",
          score: 34,
          label: "low",
          uncertaintyReason: "This percentage is an extreme extrapolation based on a single microscopic trial in yeast cells. Clinical human models indicate zero metabolic indicators supporting this speed or degree.",
          correctedVersion: "Implementing this methodology is proven to reduce cellular degradation by 80% in yeast cells, but clinical human models do not support the same degree or speed.",
          source: "Nature Communications Journal",
          sourceTitle: "Cellular Degradation in Yeast Cell Models",
          sourceOrg: "Nature Publishing Group",
          sourceDate: "September 2022",
          sourceLink: "https://www.nature.com/articles/d41586-023-00058-2",
          correctAction: "Dispute",
          explanation: "In vitro cell research does not translate directly to complex multi-cellular biological systems. Broad therapeutic claims require human double-blind studies.",
          evaluationGuide: "To evaluate cellular degradation claims: 1. Identify if results are limited to yeast cells (in-vitro) or extended to complex organisms (in-vivo). 2. Check backing Nature Communications research. 3. Disregard quick-fix pharmaceutical packaging assertions."
        }
      ]
    ]
  },
  default: {
    topic: "General Inquiry",
    paragraphs: [
      [
        {
          text: "Thank you for asking. This topic covers multiple factual claims and common consensus parameters.",
          score: 95,
          label: "high"
        },
        {
          text: "It is helpful to analyze the statement by separating standard facts from popular assertions.",
          score: 92,
          label: "high"
        }
      ],
      [
        {
          id: "custom-def-1",
          text: "Major educational institutions assert that standard applications of this topic are globally accepted without dissent.",
          score: 74,
          label: "medium",
          uncertaintyReason: "Although major educational guides teach this baseline, alternative research teams publish disputing papers indicating exceptions in unique experimental groups.",
          correctedVersion: "Major educational institutions teach this baseline model as globally accepted, though researchers actively debate corner-case experimental parameters.",
          source: "Stanford Encyclopedia of Research",
          sourceTitle: "Standard Models in Academic Science Instruction",
          sourceOrg: "Stanford University",
          sourceDate: "November 2021",
          sourceLink: "https://plato.stanford.edu/entries/scientific-method/",
          correctAction: "Confirm",
          explanation: "Academic frameworks accept this baseline as an standard introductory model, but active debate exists regarding corner-case parameters.",
          evaluationGuide: "To evaluate introductory academic guidelines: 1. Cross-verify standard introductory models with corner-case experimental parameters. 2. Review alternative academic research papers indicating exceptions. 3. Reference academic encyclopedias."
        },
        {
          id: "custom-def-2",
          text: "Studies show that adopting this specific practice guarantees a complete boost in cognitive performance by double in just 48 hours.",
          score: 22,
          label: "low",
          uncertaintyReason: "A sensationalized marketing claim. Scientific reviews confirm cognitive performance increases correlate to sleep, hydration, and long term habits rather than sudden quick-fixes.",
          correctedVersion: "Studies show that adopting this practice can contribute to long-term cognitive health, but does not double cognitive performance in 48 hours.",
          source: "National Science Foundation",
          sourceTitle: "Empirical Evidence Behind Short-Term Cognitive Fluctuation",
          sourceOrg: "National Science Foundation",
          sourceDate: "January 2023",
          sourceLink: "https://www.nsf.gov/news/special_reports/quantum/",
          correctAction: "Dispute",
          explanation: "Short-term cognitive testing indicates standard fluctuation ranges but zero empirical evidence supporting sudden double increments in under two days.",
          evaluationGuide: "To evaluate cognitive performance double assertions: 1. Fact-check NSF reports regarding sleep, hydration, and long-term habits. 2. Reject marketing quick-fixes claiming double increments in under 48 hours. 3. Check for objective empirical testing."
        }
      ]
    ]
  }
};
