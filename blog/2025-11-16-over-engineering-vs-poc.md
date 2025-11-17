---
slug: over-engineering-vs-poc
title: Not Everything is a PoC, and You Don't Need Netflix for a CRUD
authors: [valdepeace]
tags: [architecture, best-practices, software-engineering, technical-debt]
---

In recent years, I've seen two equally damaging extremes in many development teams: **over-engineering** and the **eternal PoC culture**. This post is about why both extremes are bad engineering practices and how to find a reasonable middle ground.

<!--truncate-->

## What I Call "Over-Engineering"

By over-engineering, I mean solutions that:

* Add **accidental complexity** without providing clear value.
* Break basic principles like **KISS** ("Keep It Simple, Stupid"), **YAGNI** ("You Aren't Gonna Need It"), and **DRY** ("Don't Repeat Yourself").

Some typical smells:

* Microservices for a product that doesn't even have a dedicated PM.
* Hexagonal architecture + DDD + CQRS + Event Sourcing… for an intranet with 50 users.
* Internal framework that only the person who created it understands.

The problem isn't using advanced patterns; the problem is doing it **without a business case** to support it. Complexity has to be "paid for" every day: onboarding, debugging, observability, deployments, refactors…

> If the cognitive cost of understanding the system is greater than the problem it solves, you're probably over-engineering.

## What I Call "PoC Culture" (and Why It's Equally Toxic)

On the other extreme is the culture of:

> "Do a quick PoC, we'll put it in production to test it, and we'll refactor it later".

Spoiler: **"later" never comes**.

A PoC (Proof of Concept) is designed to **validate an idea with minimal effort**, not to last for years: it usually doesn't have tests, security best practices, or decent observability. Taking that PoC as-is to production is a technical debt factory.

And here's the trap:

* The PoC **works**, the business gets used to it.
* More things get connected around it.
* It becomes "scary" to touch because "it breaks everything".
* Refactoring becomes increasingly expensive.

As Jason Lengstorf summarized: almost every company has code in production that was born as a PoC and was never rewritten.

## Technical Debt: Tool, Not Excuse

This is where the concept of **technical debt** comes in: taking a shortcut now knowing that you'll pay an extra maintenance cost in the future.

Martin Fowler proposes a very useful quadrant: **prudent vs reckless** and **deliberate vs inadvertent**.

* **Deliberate + prudent**:
  You know you're introducing debt, you accept it consciously, and you have a plan to pay it off. Example: doing something more "hardcoded" to reach a launch, with a task created to refactor later.

* **Deliberate + reckless**:
  "We don't have time for design, we'll see". No cleanup plan. This is gasoline for future fires.

* **Inadvertent + prudent**:
  You did the best you knew how, but later you learn a better way. Normal.

* **Inadvertent + reckless**:
  Sloppy code due to lack of knowledge and no intention to improve.

The moral: **good technical debt exists** (it's a strategic investment); the bad kind is what you introduce unknowingly or knowing you won't pay it off.

## How Over-Engineering and PoC Culture Feed Each Other

The funny (or sad) thing is that these two pathologies **reinforce each other**:

1. A team suffers from over-engineering:
   * Changing anything in the system is extremely expensive.
   * Everything takes weeks.
   * The business gets frustrated.

2. The business responds with "PoC mode":
   * "Do something quick on the side, even if it's ugly, but make it work now".
   * A parallel PoC is born, without engineering discipline.

3. That PoC ends up in production.
   * Now you have a monster: excessive architecture on one side, experimental spaghetti on the other.

And around we go again.

## Practical Framework for Devs/Architects: Quick PoC or "Real" Engineering?

As an architect or technical lead, your job isn't to apply textbook patterns, but to **make conscious cost/benefit decisions**.

### 1. Quick Check to Avoid Over-Engineering

Before adding another layer, another microservice, or a new pattern, ask yourself:

1. **What specific problem does this solve today?**
   If the answer is "in case tomorrow…", it sounds like YAGNI.

2. **Do I have real signals that the future is coming?**
   Metrics, roadmap, customers, not just "architectural intuition".

3. **Can I start with something simpler and extract it later?**
   For example:
   * Start with a module in a monolith → extract to microservice when there's clear need.
   * Start with a single database → separate later by bounded contexts when it really hurts.

4. **Is my team prepared for the complexity I'm introducing?**
   An architecture is only as good as the people who have to maintain it.

If you can't justify the complexity in terms of **reduced risk or saved cost**, you're probably designing for your ego rather than the product.

### 2. Quick Check to Avoid the Eternal PoC

When someone says "it's just a test", think:

1. **Could this code be in production in 6–12 months?**
   If the honest answer is "yes, likely", then it's not "just a PoC":
   * require minimum quality,
   * at least some basic tests,
   * decent logging and some observability.

2. **What part of the system depends on this?**
   * Will it move money?
   * Does it affect critical data?
   * The main user experience?

3. **Is the debt I'm introducing recorded?**
   "We'll refactor it later" doesn't cut it:
   * write concrete tickets,
   * assign priorities,
   * comment the context in the code when taking shortcuts.

4. **Is there an "expiration date" for this PoC?**
   For example:
   > "This PoC service will live for a maximum of 3 months. If after 3 months it's still providing value, we plan its rewrite/industrialization".

Without a timebox, the PoC mutates into legacy system.

## Recommended Work Pattern: PoC → Prototype → Product

A healthy way to work (especially in cloud/SaaS environments) is to think in three levels:

1. **PoC**
   * Objective: validate an idea (technical or business).
   * Minimum criteria:
     * It can break; it's for controlled environment.
     * You document consciously: *"not intended for production"*.

2. **"Production-like" Prototype**
   * Objective: approach what the real version would be.
   * Here you already apply:
     * architecture that makes sense,
     * clear boundaries,
     * basic security,
     * minimum observability.

3. **Stable Product/Service**
   * Objective: operate in production for years.
   * Requires:
     * clear SLOs/SLAs,
     * serious pipelines,
     * reliability metrics,
     * evolution strategy.

The PoC → product jump **without an intermediate phase** is what so often ends in technical debt nightmare.

## What You Can Do as a Dev/Architect (Even If You're Not "CTO")

Some very concrete actions you can incorporate into your daily practice:

* **Put language to shortcuts**
  When someone asks "do it quickly":
  * "Okay, but that implies technical debt of type X. We accept it if we then dedicate Y hours to cleaning it up".

* **Visualize complexity**
  * Simple diagrams (C4 level 1–2) to show when the architecture is becoming absurd for the product size.

* **Measure the pain**
  * "Every change in this module takes us two weeks and breaks three things".
  * That opens doors to propose refactors, simplification, or re-architecture.

* **Negotiate conditions for a PoC**
  * Clear timebox.
  * What can be sacrificed (performance, internal cleanliness) and what CANNOT (basic security, privacy, data integrity).

## Conclusion: Engineering ≠ Dogma, It's Managing Trade-offs

Not every project deserves a textbook architecture, nor is anything acceptable with "it's just a test". Both extremes are, fundamentally, **lack of engineering**:

* Over-engineering ignores the real cost of complexity.
* Eternal PoC culture ignores the real cost of technical debt.

Real software engineering is about this:

> **Making explicit decisions about where you accept complexity and where you accept debt, with a plan to manage both over time.**

If you take one thing from this post, let it be this idea:

* When you're going to design: ask yourself *"can I make it simpler without losing the essential?"*.
* When you're going to "do something quick": ask yourself *"am I willing to pay the price of leaving it like this?"*.

You won't find the balance in any book: you'll build it yourself, project by project, decision by decision.

---

## References

* [KISS vs. DRY vs. YAGNI: Understanding Key Software Development Principles](https://rrmartins.medium.com/kiss-vs-dry-vs-yagni-understanding-key-software-development-principles-e307b7419636)
* [Technical Debt Quadrant - Martin Fowler](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html)
* [When Proof of Concepts Become Production Code](https://blog.scaledcode.com/blog/poc-to-production/)
* [YAGNI - Martin Fowler](https://martinfowler.com/bliki/Yagni.html)
