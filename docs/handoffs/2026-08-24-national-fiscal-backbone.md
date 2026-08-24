# Historical handoff — national fiscal backbone

Date: 2026-08-24

Implemented one 2025–26 official national snapshot using ONS accrued current receipts and HM Treasury PESA 2026 functional spending outturn. The £1,360.122bn pool reconciles on both sides; borrowing is the £129.823bn derived balance, not revenue. National nodes and source composition are evidence-backed. Health detail, outcomes, attention markers and leaks remain illustrative.

Architecture: source registry → raw official values → normalised fiscal flows → Wall presentation adapter. Default mode is real; `VITE_DATA_MODE=demo` retains the prior fixture. Local government is excluded as a standalone destination to prevent double counting. No visual information architecture changed.

Automated verification and the browser-QA limitation are recorded in `docs/CODEX_HANDOFF.md`. Implementation commit: `9734ce6`.
