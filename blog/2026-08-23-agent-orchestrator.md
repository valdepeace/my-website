---
slug: agent-orchestrator
title: "Agent Orchestrator: making parallel coding agents manageable"
description: "A practical look at Agent Orchestrator, the desktop workspace I am using to coordinate isolated coding agents across a project."
authors: [valdepeace]
tags: [ai-agents, software-engineering, open-source]
---

I have spent enough time juggling terminals, branches and pull requests to know that running several coding agents is not just a bigger version of running one. It is a coordination problem. **[Agent Orchestrator (AO)](https://github.com/Untrivial-ai/agent-orchestrator)** is a desktop app built to solve that problem, and I am using it to coordinate the work on this site.

<!--truncate-->

## What AO changes

One coding agent can complete a focused task. Several agents working on the same repository introduce a different set of questions: which task should happen first, what context does each agent need, where is each change, and which pull request needs attention?

AO gives every task its own worker: one agent, one workspace, and—when the work is Git-backed—its own branch and worktree. That isolation is the practical foundation. A documentation change and a UI fix can move forward in parallel without agents sharing a dirty directory or stepping on the same branch.

Above the workers sits a project-level orchestrator. Its job is not to implement every detail; it plans the larger outcome, delegates focused work, follows progress, and sends follow-up context where it belongs. Workers own implementation, tests, commits and pull requests.

## A live view instead of scattered tabs

The part I find most useful is the live Kanban board. It groups worker sessions by the state that matters: **Working**, **Needs You**, **In Review**, and **Ready to Merge**. A card keeps the task, agent, branch, activity, pull request and status together.

That is a much better operating model than reconstructing the project from terminal tabs and GitHub notifications. AO also follows CI and review state beside the worker, including agent-driven reviews, so feedback can go back to the agent that owns the change instead of becoming detached from its context.

## How I am using it here

This post is itself a small example. I am working inside an AO worker for the `my-website` repository, with an orchestrator coordinating the wider task. The worker has an isolated worktree and branch, so writing this bilingual post does not interfere with other work happening in the project.

The flow is straightforward:

1. The orchestrator turns a project outcome into focused tasks.
2. Each worker implements and verifies its assigned change in isolation.
3. The worker opens a pull request and carries CI and review feedback through to completion.
4. The Kanban shows what is still moving and what needs a human decision.

It is not magic: the quality of the result still depends on clear tasks, sensible boundaries and review. But it removes a lot of the mechanical coordination that otherwise makes parallel agent work harder than it needs to be.

## Two interfaces, one workflow

AO does not force a single way of talking to an agent. You can use structured chat or the coding agent's native terminal UI while AO keeps the task context and workspace state attached to the same session.

For UI work, each worker also gets an isolated browser profile. That matters when two agents are testing different local flows at the same time: sessions, cookies and browser state do not leak between them.

The app supports 26 coding agents, including Claude Code, Codex, Cursor, GitHub Copilot, Aider, Cline and Devin. The point is not to replace those tools; it is to give them a shared project workflow without flattening their native interfaces.

## A low-friction starting point

AO ships as prebuilt desktop apps for macOS, Windows and Linux. You point it at a repository and the desktop app runs its daemon for you, so there is no AO CLI setup required just to start using it.

For me, that is the right level of abstraction. I still want Git branches, pull requests, CI and reviews. I just do not want to manually keep every agent, workspace and browser session aligned. AO gives those moving parts a place to live—and, more importantly, makes their current state visible.

## Links

- [Agent Orchestrator on GitHub](https://github.com/Untrivial-ai/agent-orchestrator)
- [AO documentation](https://aoagents.dev/docs)
- [Download AO](https://github.com/Untrivial-ai/agent-orchestrator/releases)
