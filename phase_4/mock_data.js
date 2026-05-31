/**
 * ChatGPT Learn Mode Feature Prototype - Phase 4
 * Mock Database containing pre-scored responses for natural flow simulation.
 */

const mockDatabase = {
  // 1. Prompt: "Is coffee healthy?"
  "coffee": {
    topic: "Nutrition",
    paragraphs: [
      [
        {
          text: "Yes, drinking black coffee has several science-backed health benefits.",
          score: 96,
          label: "high"
        },
        {
          text: "Black coffee is exceptionally rich in antioxidants, which reduce systemic inflammation.",
          score: 94,
          label: "high"
        }
      ],
      [
        {
          id: "coffee-claim-1",
          text: "Studies suggest that drinking 3 to 4 cups of coffee daily lowers the risk of type 2 diabetes by nearly 25%.",
          score: 72,
          label: "medium",
          uncertaintyReason: "Some large epidemiological trials indicate a correlation, but exact causation mechanisms are still debated. Additionally, study self-reporting makes precise figures highly variable.",
          source: "Harvard Health Publishing",
          sourceLink: "https://www.health.harvard.edu",
          correctAction: "Confirm",
          explanation: "Antioxidants and minerals in coffee, such as magnesium, may improve insulin sensitivity, supporting the claim that moderate consumption lowers risk."
        },
        {
          text: "Additionally, caffeine acts as a powerful central nervous system stimulant.",
          score: 97,
          label: "high"
        }
      ],
      [
        {
          id: "coffee-claim-2",
          text: "Caffeine consumption increases your basal metabolic rate by 20% to 30%, leading to rapid weight loss.",
          score: 41,
          label: "low",
          uncertaintyReason: "Caffeine does stimulate thermogenesis, but active increases are minor (typically 3% to 11%). The claim of 20% to 30% is a gross exaggeration from commercial fat-burner ads and unsupported by clinical trials.",
          source: "National Institutes of Health (NIH)",
          sourceLink: "https://pubmed.ncbi.nlm.nih.gov",
          correctAction: "Dispute",
          explanation: "Clinical literature shows that metabolic rate shifts from caffeine are short-lived and yield negligible long-term weight reduction on their own."
        },
        {
          text: "For most individuals, moderate consumption is safe and beneficial.",
          score: 95,
          label: "high"
        }
      ]
    ]
  },

  // 2. Prompt: "Do carrots improve night vision?"
  "carrot": {
    topic: "Nutrition & History",
    paragraphs: [
      [
        {
          text: "Carrots are exceptionally rich in beta-carotene, a organic compound that the body converts into Vitamin A.",
          score: 98,
          label: "high"
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
          uncertaintyReason: "This was a highly successful British propaganda campaign designed to hide the invention of secret airborne radar receivers (AI Mk IV). While Vitamin A prevents night blindness, eating excess carrots will not grant superhuman vision.",
          source: "Smithsonian Magazine / Imperial War Museum",
          sourceLink: "https://www.smithsonianmag.com",
          correctAction: "Dispute",
          explanation: "Historical records confirm the RAF created the myth to deceive German intelligence. Normal consumption does not enhance vision beyond regular baseline limits."
        },
        {
          text: "However, severe Vitamin A deficiency can lead to night blindness (nyctalopia), which carrots can help reverse.",
          score: 93,
          label: "high"
        }
      ]
    ]
  },

  // 3. Prompt: "How does photosynthesis work?"
  "photosynthesis": {
    topic: "Plant Biology",
    paragraphs: [
      [
        {
          text: "Photosynthesis is the chemical process by which green plants, algae, and some bacteria convert light energy into chemical energy.",
          score: 99,
          label: "high"
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
          uncertaintyReason: "Desert cacti utilize Crassulacean Acid Metabolism (CAM) to survive extreme droughts, but biological cells still require minute water replenishment for cellular respiration. A absolute baseline of zero water intake for 24 months results in cellular death in most domestic test subjects.",
          source: "Nature Plant Biology Journal",
          sourceLink: "https://www.nature.com",
          correctAction: "Dispute",
          explanation: "CAM plants minimize water loss by opening stomata only at night, but they cannot synthesize sugars indefinitely without active cell hydration."
        },
        {
          text: "Overall, the primary outputs of this elegant natural process are glucose and oxygen.",
          score: 98,
          label: "high"
        }
      ]
    ]
  }
};
