# Run Artifacts

Each runner writes to a unique directory:

```text
runs/<model>/<condition>/
  task-01.md
  task-02.md
  task-03.md
  receipt.json
```

Run files contain observable artifacts and final outputs only. They must not contain hidden chain-of-thought. Evaluation outputs belong under `results/evaluations/` and aggregate findings under `results/summary.md`.

