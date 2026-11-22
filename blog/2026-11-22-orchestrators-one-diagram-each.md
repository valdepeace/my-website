---
title: "Nine orchestrators, one diagram each"
description: "How a task travels from input to accepted result in nine code-agent orchestrators: who decides, how the worker is isolated, how a stuck worker is detected, who accepts the result."
authors: [valdepeace]
date: "2026-11-22"
tags: [ai-agents, architecture, comparison, open-source]
---

Same question for nine open-source orchestrators: when a task goes in, **who decides each step, the model or the code?**

One diagram each. Read left to right.

<!--truncate-->

## Colour key

| Colour | Meaning |
|---|---|
| 🟩 green | decided or done by **code** |
| 🟪 purple | decided by the **LLM** |
| 🟦 blue | mixed: LLM plus code |
| ⬜ grey | none found / shared |
| 🟧 orange | **self-report**: the worker grades itself |

## The flow every diagram follows

```mermaid
flowchart LR
  T(["Task"]) --> D["Who decides<br/>the next step"] --> I["Worker isolation"] --> S["Stuck worker<br/>detection"] --> A["Result<br/>acceptance"]
```

## The nine

### cc-super-agent

Everything in the prompt. Code only does logistics.

```mermaid
flowchart LR
  T(["Task"]) --> D["LLM decides<br/>everything"]:::llm
  D --> I["project dir only"]:::none
  I --> S["LLM on cron<br/>only warns"]:::llm
  S --> A["worker self-report"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### cli-agent-orchestrator

An LLM supervisor, no router in code.

```mermaid
flowchart LR
  T(["Task"]) --> D["LLM supervisor<br/>no code router"]:::llm
  D --> I["shared<br/>tmux window"]:::none
  I --> S["code resends prompt<br/>timeout only warns"]:::code
  S --> A["last TUI text<br/>self-report"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### gastown

Four LLM roles; code dispatches and warns.

```mermaid
flowchart LR
  T(["Task"]) --> D["LLM roles:<br/>Mayor, Polecat,<br/>Witness, Refinery"]:::llm
  D --> I["git worktree<br/>+ tmux"]:::mix
  I --> S["code only<br/>warns the Witness"]:::code
  S --> A["Refinery LLM<br/>on self-report"]:::llm
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### agent-orchestrator

LLM at the edges, deterministic Go in between.

```mermaid
flowchart LR
  T(["Task"]) --> D["LLM at the ends<br/>Go in the middle"]:::mix
  D --> I["git worktree"]:::mix
  I --> S["process alive?<br/>only warns"]:::code
  S --> A["PR and CI facts<br/>human merges"]:::code
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### agent-swarm

Code filters, admits and claims; the sweep acts on stuck workers (cases A and B).

```mermaid
flowchart LR
  T(["Task"]) --> D["LLM splits<br/>code admits"]:::mix
  D --> I["Docker<br/>hardening opt-in"]:::mix
  I --> S["90 s sweep<br/>acts on A and B"]:::code
  S --> A["self-report<br/>schema shape only"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### super-super-harness

Code runs the queue, the worktree and the retries.

```mermaid
flowchart LR
  T(["Task"]) --> D["LLM reads task<br/>code runs the rest"]:::code
  D --> I["git worktree<br/>no sandbox"]:::mix
  I --> S["30 min silence<br/>only warns"]:::code
  S --> A["self-report"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### dsh-superagent-prototype

Small and clean. No stuck-worker detection found.

```mermaid
flowchart LR
  T(["Task"]) --> D["LLM proposes<br/>code validates"]:::code
  D --> I["dir per ticket<br/>no sandbox"]:::none
  I --> S["none found"]:::none
  S --> A["worker says ready"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### dsh-super-agent (LofiSu)

Per-worker bash sandbox at OS level (bwrap / sandbox-exec); the watchdog escalates.

```mermaid
flowchart LR
  T(["Task"]) --> D["code Gate decides<br/>LLM judges the rest"]:::code
  D --> I["dir + bash sandbox<br/>bwrap / sandbox-exec"]:::code
  I --> S["1st tick warns<br/>2nd tick acts"]:::code
  S --> A["self-report<br/>plus a regex"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### deer-flow

**Code checks** the result against tool evidence, if the lead passed criteria.

```mermaid
flowchart LR
  T(["Task"]) --> D["LLM delegates<br/>code caps and admits"]:::code
  D --> I["shared with parent"]:::none
  I --> S["loops: warns at 3, cuts at 5<br/>hard timeout acts"]:::code
  S --> A["verified by code<br/>on tool evidence"]:::code
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

## What repeats

- 🟧 **Seven of nine accept the worker's own report** (gastown adds an LLM reviewer on top). Only deer-flow checks tool evidence in code, and only if the lead passed criteria; agent-orchestrator derives it from PR and CI facts.
- **Detection mostly warns.** Few detectors act (agent-swarm cases A and B, LofiSu 2nd tick, deer-flow timeout).
- **Isolation is weak by default.** A git worktree or a directory is the usual ceiling; only LofiSu (OS sandbox) and agent-swarm (Docker, hardening opt-in) go further.

## Explore them

Each diagram is interactive (zoom, focus, node index, every node with its `file:line` source): **[open the nine diagrams](https://valdepeace.github.io/agentscope/orquestacion.html)**.

## Limits

- Reading coverage is low (0.2 % to 32 % of each repo). Diagrams show what was read; «not found» means «not found in what I read».
- Nothing was run. No benchmarks, no timings, no cost.
- Diagram checks are automatic (schema, citations against the pinned commit, browser). None was reviewed by eye.

Scores, architecture-versus-claim and the rubric are in [the first post](/blog/2026/11/22/nine-code-agent-orchestrators) and in [the full study](https://github.com/valdepeace/agentscope/tree/main/orchestrators).
