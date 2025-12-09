---
title: "Cardboard Architecture: when code looks clean but nobody understands it"
description: "What 'cardboard architecture' is, why it appears, and how to improve it without rewriting everything."
authors: ["valdepeace"]
date: "2025-12-02"
tags: ["architecture","refactor","best-practices"]
---

## Cardboard Architecture: when code looks clean but nobody understands it

Some projects give a great first impression when you open them:

* Well-organized folders: `core`, `domain`, `infrastructure`, `services`, `helpers`…
* Classes with serious names: `UserService`, `OrderManager`, `PaymentHandler`…
* Extensive documentation, diagrams, detailed README…

And yet, when you try to follow **how the system actually works**, you find something very different:
methods calling other methods calling other methods, layers that only delegate, business logic scattered across the repository… and you thinking:

> “This looks architectural, but understanding it is painful.”

That’s what I like to call **cardboard architecture**: it looks solid on the outside but doesn’t really hold the weight of the business inside.

---

## What is “cardboard architecture”?

It’s not an official term, but it describes a very common situation well:

> **Cardboard architecture**: when you build a folder-and-layer structure that *simulates* clean architecture, but in practice doesn’t help you understand the flow or maintain the system.

Typical symptoms:

* You open the project and see a thousand layers, but **you don’t know where the business logic lives**.
* To follow a simple use case (e.g., create an order) you need to open **8–10 files**.
* Most classes are **pass-throughs**:

  * `Controller` → `Manager` → `Handler` → `Service` → `Processor` → `Repository`…
    and each one just delegates to the next.
* Business logic is **fragmented**:

  * a bit in the controller,
  * another in a helper,
  * another in the repository,
  * another in a generic `util`.

There may be excellent documentation…
but if the code structure doesn’t reflect the business, **the architecture fails its purpose**.

---

## Why does this happen?

Usually several things mix together:

1. **Designing by folder, not by domain**
   Copying a “textbook” structure (or another project) without thinking if it fits the real business.

2. **Confusing “more layers” with “better architecture”**

   * Adding layers like `Manager`, `Handler`, `Processor`, etc.
   * But often those layers don’t encapsulate anything new, they just complicate the path.

3. **Cargo-culting patterns**
   Applying labels like “Clean Architecture”, “DDD”, “Hexagonal”…
   but only superficially: folder and class names, not the principles.

4. **Fear of being wrong**
   Creating layers “in case we need them later”,
   and ending up with accumulated unnecessary indirection levels.

---


## What it feels like to work on such a project

If you’ve landed in one of these projects, this will sound familiar:

* To make a small change you have to touch code across **half the repo**.
* It’s unclear where a new business rule **should** live.
* Refactoring is scary because you don’t fully understand the whole flow.
* Documentation becomes mandatory because the code alone **doesn’t explain itself**.

A healthy architecture should be almost the opposite:

> Even without perfect docs,
> you should be able to guess where things live just by looking at the basic structure.

---

## What does an actually helpful architecture look like?

Good architecture isn’t about having many layers, it’s about:

### 1. The flow being easy to follow

Very simple example:

```text
HTTP Request → Controller → Use Case → Repositories/Adapters → Response
```

Meaning you can explain what happens in one sentence and a few files.

### 2. Business logic concentrated in predictable places

For example:

* `CreateOrderUseCase`
* `ReserveSeatService`
* `CalculatePriceDomainService`

Not hidden in generic helpers or random repository methods.

### 3. Layers existing for a clear reason

A typical (and often sufficient) layout could be:

* **Interface / API**: controllers, DTOs, input validation.
* **Application**: use cases, process orchestration.
* **Domain**: entities, pure business rules.
* **Infrastructure**: repositories, DB access, external APIs, queues, etc.

The key is that if someone asks:

> “Where is the logic to *reserve a course*?”

you can answer:

> “Look in `application/ReserveCourse.ts` and `domain/CourseReservation`.”

without doing a repo-wide search.

---

## Quick checklist: does it smell like cardboard architecture?

Some useful questions when reviewing a project:

1. **How many files do I need to open to follow a simple use case?**

   * If more than 5–6, be suspicious.
2. **How many classes only delegate without adding logic?**

   * If most are passthroughs, you have too many layers.
3. **Do I clearly know where the business lives?**

   * Is there a clear place for use cases?
4. **Is the structure feature-based or generic layers-based?**

   * `orders/`, `payments/`, `users/` is often more useful than
     `managers/`, `helpers/`, `processors/`.
5. **What happens if the “hero developer” is not available?**

   * Can the team maintain the system without them?

The more uncomfortable answers, the more likely you’re facing cardboard architecture.

---

## How to improve without rewriting everything

You rarely can throw away the project and start over (in fact, almost never).
But you can **improve incrementally**:

### 1. Pick a key use case and map it

Example: “create order”.

* Draw the current flow (even on paper) from endpoint to DB.
* Identify layers that contribute nothing.

### 2. Concentrate business logic

* Create a `CreateOrderUseCase` or similar.
* Move scattered rules (in controllers, helpers, etc.) into that use case.

### 3. Remove unnecessary pass-throughs

* If a `Manager` only calls a `Service` without adding value, merge them.
* Fewer layers, more clarity.

### 4. Name by domain, not by pattern

Better:

* `AssignSeatToPassenger`
* `CalculateInvoiceTotals`

than:

* `SeatManager`
* `InvoiceProcessor`

### 5. Document the flow, not only the architecture

A simple diagram like:

```mermaid
flowchart LR
  A[HTTP Request] --> B[OrderController]
  B --> C[CreateOrderUseCase]
  C --> D[OrderRepository]
```

is gold if it truly reflects what happens.

---

## Closing the loop

The takeaway is simple:

* **Architecture is not how many folders you have**,
  it’s how much it helps you think about and change the business.
* Documentation is great, but the best documentation is code and structure that “explain themselves”.
* A truly senior developer is not just fast,
  but the one who leaves a system any teammate can understand and extend.

If a project looks pretty but you **can’t** follow the flow without suffering, it’s probably not you: it’s cardboard.

And the good news: once you develop that sense, you start designing your own projects differently: less posture, more clarity, more business focus… and less pain for whoever comes next (even if that’s you in six months).

---

If you want, in another post we can do the “practical mode”: take a real use case of yours and show a before vs after refactor, with code.
