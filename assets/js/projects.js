/* ── Project data ── */
const projects = [
  {
    id: 1,
    featured: true,
    number: "01",
    title: "Financial reconciliation tool",
    description:
      "A 5-step ETL pipeline that ingests two ledger sources (ERP + bank statement), validates schema, normalises formats, matches records on ref key, and surfaces discrepancies in a filterable report with CSV export.",
    skills: ["ETL", "SQL", "Python"],
    industry: "Finance · Ops · Banking",
    metrics: [
      { value: "5-step", label: "ETL pipeline" },
      { value: "19", label: "Automated tests" },
      { value: "2 formats", label: "Python + SQL" },
    ],
    demoUrl: "https://financial-reconciliation.streamlit.app/",
    codeUrl: "https://github.com/KOBBY-IM/financial-reconciliation",
    caseStudyUrl: "#",
  },
  {
    id: 2,
    featured: false,
    number: "02",
    title: "Customer churn ETL + prediction dashboard",
    description:
      "Raw event logs → cleaned cohort dataset → churn prediction model → interactive retention dashboard. Full end-to-end pipeline from messy data to boardroom-ready insight.",
    skills: ["ETL", "Python", "Statistics", "BI / Viz"],
    industry: "SaaS · Product · CRM",
    metrics: [
      { value: "22%", label: "Churn reduction" },
      { value: "40k", label: "Users analysed" },
      { value: "$1.2M", label: "ARR retained" },
    ],
    demoUrl: "https://customer-churn-etl-prediction-dashboard.streamlit.app/",
    codeUrl: "https://github.com/KOBBY-IM/Customer-Churn-ETL-Prediction-Dashboard.git",
    caseStudyUrl: "#",
  },
  {
    id: 3,
    featured: false,
    number: "03",
    title: "Sales performance pipeline & executive dashboard",
    description:
      "Multi-source sales data → dbt-style transforms → KPI dashboard with drill-down by region, rep, and product line. Built for a finance team that was spending 3 days a week on manual reporting.",
    skills: ["ETL", "SQL", "BI / Viz"],
    industry: "Retail · Commercial · RevOps",
    metrics: [
      { value: "6", label: "Sources merged" },
      { value: "3 days", label: "Saved per week" },
      { value: "38", label: "Stores covered" },
    ],
    demoUrl: "https://sales-performance-pipeline-executive-dashboard.streamlit.app/",
    codeUrl: "https://github.com/KOBBY-IM/Sales-performance-pipeline-executive-dashboard.git",
    caseStudyUrl: "#",
  },
  {
    id: 4,
    featured: false,
    number: "04",
    title: "A/B test analyser",
    description:
      "Upload experiment results, get statistical significance, confidence intervals, effect size, and a plain-English verdict. Designed for product teams who need rigorous analysis without a statistics background.",
    skills: ["Statistics", "Python", "Business Analysis"],
    industry: "Product · Growth · Marketing",
    metrics: [
      { value: "p<0.05", label: "Significance test" },
      { value: "95%", label: "Confidence interval" },
      { value: "Plain English", label: "Output format" },
    ],
    actions: [
      { label: "Streamlit demo →", href: "https://ab-test-analyser-e7wm6i5funawsvmcnvbcat.streamlit.app/", cls: "project-action--demo", external: true },
      { label: "Interactive tool →", href: "https://kobby-im.github.io/ab-test-analyser/", style: "color:#17B8C4;border-color:#17B8C4", external: true },
      { label: "GitHub →", href: "https://github.com/KOBBY-IM/ab-test-analyser", external: true },
    ],
  },
  {
    id: 5,
    featured: false,
    number: "05",
    title: "Business requirements & process mapping tool",
    description:
      "Input a business problem and get a structured BPMN process map, requirements list, and stakeholder matrix. Built to show the BA side of the hybrid analyst skillset.",
    skills: ["Business Analysis", "BI / Viz"],
    industry: "BA · PM · Consulting",
    metrics: [
      { value: "BPMN", label: "Standard notation" },
      { value: "3 outputs", label: "Map, reqs, RACI" },
      { value: "< 5 min", label: "From problem to plan" },
    ],
    demoUrl: "https://kobby-im.github.io/Business-Requirements-Process-Mapping-Tool/",
    codeUrl: "https://github.com/KOBBY-IM/Business-Requirements-Process-Mapping-Tool/tree/master/requirements-tool",
    caseStudyUrl: "#",
  },
  {
    id: 6,
    featured: false,
    number: "06",
    title: "Data quality profiler",
    description:
      "Upload any CSV and get an instant profile report: completeness, duplicate rate, outliers, type mismatches, and fix recommendations. The tool every analyst wishes existed before they start a new project.",
    skills: ["ETL", "SQL", "Python"],
    industry: "Data Engineering · Analytics",
    metrics: [
      { value: "6 checks", label: "Quality dimensions" },
      { value: "Any CSV", label: "File input" },
      { value: "Auto", label: "Fix recommendations" },
    ],
    demoUrl: "#",
    codeUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: 7,
    featured: false,
    number: "07",
    title: "Leaky Bucket Revenue Retention Model",
    description:
      "A monthly MRR waterfall built in Excel that decomposes revenue into 5 movements, introduces a Leak Score metric to quantify retention risk, and delivers a 6-month scenario model — applied to a 5,000-record SaaS dataset.",
    skills: ["Business Analysis", "Python", "BI / Viz"],
    industry: "SaaS · Finance",
    metrics: [
      { value: "672%", label: "YTD Revenue Growth" },
      { value: "8.7%", label: "Peak Leak Score" },
      { value: "600", label: "Churn events analysed" },
    ],
    demoUrl: "leaky-bucket.html",
    codeUrl: "https://github.com/KOBBY-IM/leaky-bucket-mrr-model",
    caseStudyUrl: "leaky-bucket.html",
  },
];

/* ── DOM references ── */
const projectsGrid = document.getElementById("projects-grid");
const filterContainer = document.getElementById("project-filters");
const FILTER_TRANSITION_MS = 250;

/* ── Card markup helpers ── */
const createBadgeMarkup = (skills) =>
  skills
    .map(
      (skill) => `<span class="skill-badge" data-skill="${skill}">${skill}</span>`
    )
    .join("");

const createMetricsMarkup = (metrics) =>
  metrics
    .map(
      (metric) => `
        <div class="metric-item">
          <span class="metric-value">${metric.value}</span>
          <span class="metric-label">${metric.label}</span>
        </div>
      `
    )
    .join("");

const createActionsMarkup = (project) => {
  if (project.actions) {
    return project.actions
      .map((a) => {
        const extAttrs = a.external !== false ? ' target="_blank" rel="noopener noreferrer"' : "";
        const styleAttr = a.style ? ` style="${a.style}"` : "";
        return `<a class="project-action ${a.cls || ""}"${styleAttr} href="${a.href}"${extAttrs}>${a.label}</a>`;
      })
      .join("");
  }
  const demoLink = project.demoUrl && project.demoUrl !== "#"
    ? `<a class="project-action project-action--demo" href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">Live demo →</a>`
    : "";
  return `
    ${demoLink}
    <a class="project-action" href="${project.codeUrl}" target="_blank" rel="noopener noreferrer">View code</a>
    <a class="project-action" href="${project.caseStudyUrl}" target="_blank" rel="noopener noreferrer">Case study</a>
  `;
};

const createProjectCard = (project) => {
  const article = document.createElement("article");
  article.className = `project-card${project.featured ? " featured" : ""}`;
  article.dataset.skills = project.skills.join("|");

  article.innerHTML = `
    <div class="project-top-row">
      <div class="skill-badges">${createBadgeMarkup(project.skills)}</div>
      <p class="project-number">${project.number}</p>
    </div>
    <h3 class="project-title">${project.title}</h3>
    <p class="project-description">${project.description}</p>
    <div class="project-actions">
      ${createActionsMarkup(project)}
    </div>
    <div class="project-metrics">${createMetricsMarkup(project.metrics)}</div>
  `;

  return article;
};

/* ── Filter logic ── */
const applyFilter = (selectedFilter) => {
  const cards = projectsGrid?.querySelectorAll(".project-card");
  if (!cards) return;

  cards.forEach((card) => {
    const cardSkills = (card.dataset.skills || "").split("|");
    const shouldShow =
      selectedFilter === "All" || cardSkills.includes(selectedFilter);

    if (shouldShow) {
      card.style.display = "block";
      requestAnimationFrame(() => {
        card.classList.remove("is-hiding");
        card.classList.add("is-showing");
      });
      window.setTimeout(() => {
        card.classList.remove("is-showing");
      }, FILTER_TRANSITION_MS);
      return;
    }

    card.classList.remove("is-showing");
    card.classList.add("is-hiding");
    window.setTimeout(() => {
      if (card.classList.contains("is-hiding")) {
        card.style.display = "none";
      }
    }, FILTER_TRANSITION_MS);
  });
};

/* ── Init: render cards and wire filter pills ── */
if (projectsGrid && filterContainer) {
  projects.forEach((project) => {
    projectsGrid.appendChild(createProjectCard(project));
  });

  filterContainer.querySelectorAll(".filter-pill").forEach((button) => {
    button.addEventListener("click", () => {
      filterContainer.querySelectorAll(".filter-pill").forEach((pill) => {
        pill.classList.remove("is-active");
      });
      button.classList.add("is-active");
      applyFilter(button.dataset.filter || "All");
    });
  });
}

