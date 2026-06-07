---
slug: mastra-azure-ai-search
title: Why I built mastra-azure-ai-search
description: "A short note on publishing an Azure AI Search vector store for Mastra while the upstream PR is still pending."
authors: [valdepeace]
tags: [mastra, azure-ai-search, ai-agents, open-source]
---

I have been working on **mastra-azure-ai-search**, an Azure AI Search vector store provider for Mastra.

The reason is simple: I opened the integration work upstream in Mastra, but the PR has not been approved yet. Rather than keep the adapter blocked inside a pending pull request, I decided to publish it as a standalone package so it can be used, tested and improved now.

<!--truncate-->

## The context

Mastra already has a clean model for vector stores and memory. Azure AI Search, on the other hand, is a strong option when you are building in Azure and need vector search, hybrid search, semantic ranking and enterprise-friendly infrastructure.

The missing piece was a direct bridge between both worlds:

- Mastra agents and memory on one side.
- Azure AI Search indexes, vectors and filters on the other.

That is what `mastra-azure-ai-search` tries to provide.

## Why a separate package?

The original goal was to contribute this directly to the Mastra monorepo. That work is tracked in [mastra-ai/mastra#10146](https://github.com/mastra-ai/mastra/pull/10146).

But open-source contribution flow takes time: review cycles, package naming, API fit, maintenance expectations, and release timing all matter. While that gets resolved, I still need something practical that works today.

There is also a human side to this. Open-source contributions are usually unpaid work, done in spare time and with the goal of helping the project. I do not expect instant approval, but some feedback, even if the answer is "not now" or "we want this shaped differently", would make the process much easier to keep moving.

So I extracted the work into an independent package:

```bash
npm install mastra-azure-ai-search
```

This keeps the implementation usable without waiting for the upstream decision.

## What the adapter does

The package provides an `AzureAISearchVector` implementation for Mastra. In practice, that means:

- creating and deleting Azure AI Search vector indexes;
- upserting, querying, updating and deleting vectors;
- using API keys or Azure credentials;
- mapping Mastra metadata filters to Azure AI Search filters;
- supporting semantic, hybrid and multi-vector query patterns;
- integrating with Mastra Memory for semantic recall.

The part that took the most care was not just "send vectors to Azure". The tricky bit was translating Mastra's vector-store expectations into Azure AI Search concepts without making the caller think too much about Azure's underlying schema.

## Metadata filters were the important detail

For memory and RAG, vector similarity is only half of the story. You usually also need filters like:

```ts
{
  thread_id: "thread-123",
  resource_id: "customer-456"
}
```

Mastra Memory can pass metadata indexes for semantic recall. The adapter maps those fields into filterable Azure AI Search fields while still storing the full metadata object as JSON.

That makes it possible to use Azure AI Search as a practical backing store for agent memory, not just as a raw vector database.

## What I learned

This was a good reminder that integrations are rarely about the happy path. The basic vector operations are straightforward. The real work is in the edges:

- how package exports behave in ESM and CJS;
- how filters map from one abstraction to another;
- how to keep the API familiar for Mastra users;
- how to test without requiring Azure credentials for every unit test;
- how to keep enough flexibility for advanced Azure AI Search features.

## Closing note

I still hope the upstream PR can land in some form. Until then, `mastra-azure-ai-search` is my way of unblocking the use case without forcing anyone to wait.

Sometimes the pragmatic path is to ship a small independent package first, let people try it, and use that feedback to improve the upstream contribution later.

## Links

- Package repository: [valdepeace/mastra-azure-ai-search](https://github.com/valdepeace/mastra-azure-ai-search)
- Upstream PR: [mastra-ai/mastra#10146](https://github.com/mastra-ai/mastra/pull/10146)
- Demo repository: [valdepeace/mastra-azure-aisearch-demo](https://github.com/valdepeace/mastra-azure-aisearch-demo)
