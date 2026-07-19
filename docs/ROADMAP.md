# Future Roadmap

- **Real-time sensor integration**: replace the simulated `/ws/live`
  feed with actual camera/Wi-Fi-probe-based crowd counting (Vision AI)
  feeding Firestore directly.
- **Fine-tuned prediction models**: replace the linear-trend placeholder
  behind "AI Insights" with a trained time-series model per gate/stall.
- **Native mobile app**: wrap the Fan Experience + Accessibility agents
  in a lightweight mobile client for in-seat use.
- **Multi-stadium rollout**: parameterize `seed_data.py` per venue and
  add a venue selector across the dashboard.
- **Offline-first volunteer app**: cache SOPs and procedures locally so
  the Volunteer Copilot keeps working through connectivity dead zones.
- **Post-match analytics**: BigQuery ML models over the season's KPI
  history to benchmark stadiums against each other.
