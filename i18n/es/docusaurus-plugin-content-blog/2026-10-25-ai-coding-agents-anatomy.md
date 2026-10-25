---
title: "Dentro de los agentes de programación con IA: prompts, harnesses y subagentes"
description: "Un mapa visual, basado en fuentes, de cómo los agentes combinan modelos, instrucciones, herramientas, contexto y delegación."
authors: [valdepeace]
date: "2026-10-25"
tags: [ai-agents, architecture, open-source]
---

Un agente de programación es un sistema construido alrededor de un modelo. El harness aporta contexto y herramientas, aplica permisos, ejecuta acciones y decide el siguiente paso.

<!--truncate-->

| **74** productos catalogados | **40** repositorios públicos revisados por lenguaje |
| --- | --- |
| **41** capturas de estrellas · 25 oct 2026 | **0** experimentos controlados propios |

*Las estrellas miden interés, no calidad.*

## El bucle del agente

```mermaid
flowchart TB
  T["TAREA<br/>objetivo + límites"] --> H["HARNESS<br/>contexto · herramientas · permisos"]
  H --> M["MODELO<br/>respuesta o tool call"]
  M --> D{"Siguiente acción"}
  D -->|"responder"| F["Respuesta a la persona"]
  D -->|"usar herramienta"| P{"Comprobar permisos"}
  P -->|"permitido"| X["Herramienta<br/>archivos · shell · Git"]
  X --> O["Resultado observado"]
  O --> H
  P -->|"denegar / preguntar"| H
  H -->|"delegar"| S["Subagente<br/>brief + contexto seleccionado"]
  S --> H
```

*Esquema conceptual: cada producto implementa y expone pasos distintos.*

## ¿Qué aporta cada capa?

| Capa | Aportación y evidencia que revisar |
| --- | --- |
| **Modelo** | Capacidad de programación y tool calling; revisar versión, formato de API y condiciones de tarea. |
| **System prompt** | Rol, prioridades y límites; localizar fuente oficial y añadidos del runtime. |
| **Harness** | Herramientas, permisos, reintentos, sesiones y delegación; inspeccionar bucle y políticas. |
| **Contexto + entorno** | Reglas, archivos, historial, tests y accesos; comprobar qué recibió el agente. |

Las capas interactúan; este estudio no les asigna porcentajes. Un fragmento público no siempre es el prompt efectivo completo: el runtime puede añadir modos, herramientas y reglas del proyecto. Si una muestra de prompt no tiene una fuente verificable, el catálogo no la reconstruye.

## Delegación: ¿quién envía qué a quién?

```mermaid
sequenceDiagram
  autonumber
  actor User as Persona
  participant Main as Coordinador
  participant Worker as Implementador
  participant Review as Revisor
  User->>Main: Objetivo + criterios de aceptación
  Main->>Worker: Tarea + límites + contexto seleccionado
  Worker-->>Main: Hallazgos + cambios + resultado de pruebas
  Main->>Review: Diff + criterios de revisión
  Review-->>Main: Problemas o aprobación
  opt Se piden cambios
    Main->>Worker: Correcciones concretas
    Worker-->>Main: Cambios revisados
    Main->>Review: Diff actualizado
  end
  Main->>Main: Verificar en el workspace compartido
  Main-->>User: Resultado + límites pendientes
```

*Es un modelo para comparar, no una transcripción atribuida a todos los productos. Algunos workers comparten workspace; otros devuelven mensajes o parches. El orquestador debe comprobar el resultado.*

Un buen encargo transmite **objetivo, límites, contexto relevante y criterios de aceptación**. Una buena respuesta devuelve **hallazgos, archivos modificados y pruebas de verificación**. Con poco contexto, el worker se desvía; con demasiado, la tarea queda enterrada.

## Tres protocolos, tres trabajos

| Protocolo | Límite |
| --- | --- |
| **A2A** | Descubrimiento e intercambio de tareas y mensajes; el producto puede no tener soporte nativo. |
| **ACP** | Editor ↔ agente de programación; esto no implica delegación entre agentes. |
| **MCP** | Host de agente ↔ herramientas/datos; no es comunicación agente a agente. |

La documentación de Gemini CLI revisada configura agentes remotos mediante Agent Cards de A2A. Eso verifica una ruta cliente A2A nativa; no demuestra que Gemini CLI ofrezca un endpoint A2A. Un puente comunitario o invocar el CLI de A2A como herramienta son integraciones alrededor del producto, no pruebas de soporte nativo.

## Qué permite afirmar esta instantánea

El endpoint Languages de GitHub informa de bytes por lenguaje detectado, no de todo el runtime ni de lo que se distribuye al usuario. Las estrellas cambian y no miden calidad. Los tamaños de artefactos solo se comparan si coinciden versión, plataforma, arquitectura y formato del paquete.

No se ejecutaron benchmarks controlados. La evidencia permite describir el sistema, no establecer un ranking de rendimiento ni repartir porcentajes entre modelo, prompt y harness. «No verificado» significa que en esta pasada no se confirmó una fuente; no significa «no soportado».

## Fuentes

- [Agentes remotos de Gemini CLI](https://github.com/google-gemini/gemini-cli/blob/main/docs/core/remote-agents.md)
- [Especificación A2A](https://github.com/a2aproject/A2A/blob/main/docs/specification.md) · [conceptos A2A](https://github.com/a2aproject/A2A/blob/main/docs/index.md)
- [API Languages de GitHub](https://docs.github.com/en/rest/repos/repos#list-repository-languages)
- [Introducción a ACP](https://agentclientprotocol.com/get-started/introduction) · [Introducción a MCP](https://modelcontextprotocol.io/introduction)
- [CLI oficial de A2A](https://github.com/a2aproject/a2a-cli)
