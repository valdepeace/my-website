---
slug: mastra-vs-microsoft-agent-framework
title: Mastra vs Microsoft Agent Framework + Azure AI Foundry — Comparativa práctica
authors: [valdepeace]
tags: [mastra, microsoft-agent-framework, comparativa, agentes-ai]
---

Resumen: Comparativa concisa entre Mastra (framework TypeScript) y Microsoft Agent Framework + Azure AI Foundry (plataforma gestionada de Microsoft para agentes).

## 1. Resumen en una frase

<!--truncate-->
**Mastra** → Framework TypeScript/Node para construir agentes, workflows, RAG, MCP, evals y trazas, pensado para desarrolladores JS/TS y apps web/backend modernas.

---

## 2. Comparativa rápida

| Aspecto | Mastra | Microsoft Agent Framework + Azure AI Foundry |
|---|---|---|
| Lenguaje / runtime | TypeScript / Node — ideal si tu stack es JS | .NET y Python — soporte nativo en Azure |
| Modelo mental | Framework TS para agentes, pipelines, RAG, trazas, MCP | SDK + runtime para grafos multi-agente, sucesor de Semantic Kernel / AutoGen |
| Despliegue | Se ejecuta donde quieras; Mastra Cloud para trazas/evals | Standalone o conectado al servicio gestionado Foundry en Azure |
| Proveedores de modelos | Multi-proveedor (OpenAI, Azure OpenAI, Claude, Gemini, Llama...) | Multi-proveedor con integración nativa en Azure |
| Workflows / orquestación | Pipelines / graphs en TS: suspend/resume, streaming | Orquestación basada en grafos, routing condicional, long-running, HITL |
| RAG / Conectores | Vector stores (Postgres, Pinecone), plantillas RAG | Integración nativa con Azure AI Search, Fabric, OneLake, SharePoint |
| MCP y herramientas | Fuerte soporte MCP, agent networks y herramientas | MCP como tipo de tool; Foundry aporta catálogo de recursos gestionados |
| Observabilidad | Mastra Cloud: traces, evals, scoring, UI | OpenTelemetry + Azure Monitor; paneles y gobernanza a nivel plataforma |
| Integración con Azure | Se puede desplegar en Azure pero es agnóstico | Integración profunda y oficial con Foundry, Fabric, Entra, Defender |
| Licencia / comunidad | Open source (Apache 2.0) con comunidad JS | Open source (MIT) mantenido por Microsoft y ecosistema |

---

## 3. ¿Cuál elegir según el contexto?

- Si tu stack es Node/TypeScript y quieres iterar rápido: **Mastra**.
- Si necesitas gobernanza corporativa en Azure y servicios gestionados: **MAF + Foundry**.

**Enfoque híbrido (recomendado):**

1. Núcleo ágil en JS (Mastra) para desarrollo rápido.
2. Para clientes Azure-first, desplegar agentes en Foundry y exponer APIs gestionadas.
3. Orquestar desde tus servicios Node/Mastra las llamadas a los agentes gestionados cuando haga falta.

---

## 4. Recomendación práctica

- PoCs, automatizaciones internas, scrapers y MCP-first: **Mastra**.
- Proyectos corporativos regulados dentro de Azure: **MAF + Foundry**.


