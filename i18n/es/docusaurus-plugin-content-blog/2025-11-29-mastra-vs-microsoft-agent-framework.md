---
slug: mastra-vs-microsoft-agent-framework
title: Mastra vs Microsoft Agent Framework + Azure AI Foundry — Comparativa práctica
authors: [valdepeace]
tags: [mastra, microsoft-agent-framework, comparativa, agentes-ai]
---

Resumen: Comparativa entre Mastra (framework TypeScript) y Microsoft Agent Framework + Azure AI Foundry.

<!--truncate-->

## 1. Introducción

Dos formas de construir agentes de IA en producción:

- **Mastra**: framework de agentes en TypeScript que pone el runtime y la orquestación en tu backend.
- **Agent Framework + Azure AI Foundry**: librería de orquestación (.NET/Python) más un servicio gestionado en Azure donde viven agentes, threads y runs.

## 2. Modelo mental común: agents, threads y runs

Conceptos compartidos:

- **Agent**: persona virtual con instrucciones, modelo, tools y memoria.
- **Thread / Session**: hilo de conversación que mantiene el contexto.
- **Messages**: intercambio entre `user` y `assistant`.
- **Run**: ejecución concreta del agente.

La diferencia principal es dónde vive la máquina de estados: en tu backend (Mastra) o en un servicio gestionado (Azure AI Agents).

---

## 3. ¿Qué ofrece cada enfoque?

### Mastra

- Framework TS + runtime en tu app.
- Tools, workflows, RAG, trazas y evaluaciones (Mastra Cloud).
- Buena DX para equipos JS/TS.

### Agent Framework + Azure AI Foundry

- Agent Framework para orquestación (.NET/Python).
- Azure AI Foundry como servicio gestionado (agentes, threads, runs).
- Integración nativa con AI Search, Fabric, OneLake y servicios Azure.

---

## 4. Tabla comparativa (resumen)

| Aspecto | Mastra | Agent Framework + Azure Foundry |
|---|---|---|
| Tipo | Framework TS + observabilidad | Librería (.NET/Python) + servicio gestionado |
| Lenguaje | TypeScript / Node | .NET / Python |
| Runtime | En tu backend | En Azure (servicio gestionado) |
| Integración Azure | Vía SDKs | Nativa |
| Lock-in | Bajo | Medio/alto |

---

## 5. Pros y contras

### Pros y contras — Mastra

#### Pros — Mastra

- 100% TypeScript; alta velocidad de desarrollo en JS stacks.
- Control total del runtime y orquestación.

#### Contras — Mastra

- Debes gestionar infraestructura y gobernanza por tu cuenta.

### Pros y contras — Agent Framework + Foundry

#### Pros — Agent Framework + Foundry

- Servicio gestionado para threads/runs y escalado.
- Integración y gobierno enterprise en Azure.

#### Contras — Agent Framework + Foundry

- Mayor acoplamiento a la plataforma Azure.

---

## 6. Enfoque híbrido (recomendado en muchos casos)

- Mantén un núcleo de agentes/producto en Mastra para iteración rápida.
- Usa Foundry como herramienta especializada para datos y gobernanza, expuesta como APIs.

## 7. Ejemplo rápido (esquema)

```ts
// hybridAgent.ts (esquema)
import { createAgent } from "mastra";

export const hybridAgent = createAgent({
  name: "hybrid-agent",
  instructions: "Decide cuándo delegar a Azure",
  model: { provider: "openai", name: "gpt-4o-mini" },
  tools: {
    askAzure: {
      description: "Consulta al agente de Azure",
      execute: async ({ query }: { query: string }) => ({ answer: "(respuesta simulada)" }),
    },
  },
});
```

---

## 8. Conclusión

- Si tu equipo vive en TypeScript, Mastra facilita iterar rápido.
- Si necesitas gobernanza y servicios Azure, Agent Framework + Foundry encaja mejor.
- La combinación híbrida suele ofrecer lo mejor de ambos mundos.

---

## Referencias

- Documentación de Mastra — [https://mastra.ai/docs](https://mastra.ai/docs)
- Repositorio Mastra en GitHub — [https://github.com/mastra-ai/mastra](https://github.com/mastra-ai/mastra)
- Libro/guía de Mastra — [https://mastra.ai/book](https://mastra.ai/book)
- Plantillas Mastra — [https://mastra.ai/templates](https://mastra.ai/templates)
- Azure AI Foundry (Microsoft Learn) — [https://learn.microsoft.com/es-es/azure/ai-foundry/](https://learn.microsoft.com/es-es/azure/ai-foundry/)
- SDK Azure AI Agents (`@azure/ai-agents`) — [https://www.npmjs.com/package/@azure/ai-agents](https://www.npmjs.com/package/@azure/ai-agents)
- Azure Identity (`@azure/identity`) — [https://www.npmjs.com/package/@azure/identity](https://www.npmjs.com/package/@azure/identity)
- Documentación general de Azure — [https://learn.microsoft.com/azure](https://learn.microsoft.com/azure)


