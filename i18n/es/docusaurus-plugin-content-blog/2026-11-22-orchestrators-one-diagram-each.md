---
title: "Nueve orquestadores, un diagrama cada uno"
description: "Cómo viaja una tarea desde la entrada hasta el resultado aceptado en nueve orquestadores de agentes de código: quién decide, cómo se aísla el worker, cómo se detecta uno colgado y quién acepta el resultado."
authors: [valdepeace]
date: "2026-11-22"
tags: [ai-agents, architecture, comparison, open-source]
---

La misma pregunta a nueve orquestadores de código abierto: cuando entra una tarea, **¿quién decide cada paso, el modelo o el código?**

Un diagrama por cada uno. Se lee de izquierda a derecha.

<!--truncate-->

## Leyenda de colores

| Color | Significa |
|---|---|
| 🟩 verde | lo decide o lo hace el **código** |
| 🟪 morado | lo decide el **LLM** |
| 🟦 azul | mixto: LLM y código |
| ⬜ gris | no localizado / compartido |
| 🟧 naranja | **autoinforme**: el worker se corrige a sí mismo |

## El flujo que sigue cada diagrama

```mermaid
flowchart LR
  T(["Tarea"]) --> D["Quién decide<br/>el siguiente paso"] --> I["Aislamiento<br/>del worker"] --> S["Detección de<br/>worker colgado"] --> A["Aceptación<br/>del resultado"]
```

## Los nueve

### cc-super-agent

Todo en el prompt. El código solo hace logística.

```mermaid
flowchart LR
  T(["Tarea"]) --> D["El LLM decide<br/>todo"]:::llm
  D --> I["solo el directorio"]:::none
  I --> S["LLM por cron<br/>solo avisa"]:::llm
  S --> A["autoinforme<br/>del worker"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### cli-agent-orchestrator

Un supervisor LLM, sin router en código.

```mermaid
flowchart LR
  T(["Tarea"]) --> D["Supervisor LLM<br/>sin router en código"]:::llm
  D --> I["compartido<br/>ventana tmux"]:::none
  I --> S["código reenvía prompt<br/>timeout solo avisa"]:::code
  S --> A["último texto del TUI<br/>autoinforme"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### gastown

Cuatro roles LLM; el código despacha y avisa.

```mermaid
flowchart LR
  T(["Tarea"]) --> D["Roles LLM:<br/>Mayor, Polecat,<br/>Witness, Refinery"]:::llm
  D --> I["git worktree<br/>+ tmux"]:::mix
  I --> S["código solo<br/>avisa al Witness"]:::code
  S --> A["Refinery (LLM)<br/>sobre autoinforme"]:::llm
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### agent-orchestrator

LLM en los extremos, Go determinista en medio.

```mermaid
flowchart LR
  T(["Tarea"]) --> D["LLM en los extremos<br/>Go en medio"]:::mix
  D --> I["git worktree"]:::mix
  I --> S["¿proceso vivo?<br/>solo avisa"]:::code
  S --> A["hechos de PR y CI<br/>merge humano"]:::code
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### agent-swarm

El código filtra, admite y reclama; el barrido actúa sobre workers colgados (casos A y B).

```mermaid
flowchart LR
  T(["Tarea"]) --> D["LLM reparte<br/>código admite"]:::mix
  D --> I["Docker<br/>endurecido opt-in"]:::mix
  I --> S["barrido de 90 s<br/>actúa en A y B"]:::code
  S --> A["autoinforme<br/>solo valida la forma"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### super-super-harness

El código lleva la cola, el worktree y los reintentos.

```mermaid
flowchart LR
  T(["Tarea"]) --> D["LLM lee la tarea<br/>código lleva el resto"]:::code
  D --> I["git worktree<br/>sin sandbox"]:::mix
  I --> S["30 min sin eventos<br/>solo avisa"]:::code
  S --> A["autoinforme"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### dsh-superagent-prototype

Pequeño y limpio. No se localizó detección de worker colgado.

```mermaid
flowchart LR
  T(["Tarea"]) --> D["LLM propone<br/>código valida"]:::code
  D --> I["directorio por ticket<br/>sin sandbox"]:::none
  I --> S["ninguna localizada"]:::none
  S --> A["el worker dice ready"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### dsh-super-agent (LofiSu)

Sandbox de bash por worker a nivel de sistema (bwrap / sandbox-exec); el watchdog escala.

```mermaid
flowchart LR
  T(["Tarea"]) --> D["Gate en código<br/>LLM juzga el resto"]:::code
  D --> I["directorio + sandbox de bash<br/>bwrap / sandbox-exec"]:::code
  I --> S["1.er tick avisa<br/>2.º tick actúa"]:::code
  S --> A["autoinforme<br/>más una regex"]:::warn
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

### deer-flow

**El código comprueba** el resultado contra evidencia de herramientas, si el lead pasó criterios.

```mermaid
flowchart LR
  T(["Tarea"]) --> D["LLM delega<br/>código admite y limita"]:::code
  D --> I["compartido con el padre"]:::none
  I --> S["bucles: avisa a 3, corta a 5<br/>timeout duro actúa"]:::code
  S --> A["verificada por código<br/>sobre evidencia"]:::code
  classDef code fill:#caff49,stroke:#131a16,color:#131a16
  classDef llm fill:#c3b5ff,stroke:#131a16,color:#131a16
  classDef mix fill:#b4d8ff,stroke:#131a16,color:#131a16
  classDef none fill:#e7e9e1,stroke:#131a16,color:#131a16
  classDef warn fill:#ffad76,stroke:#131a16,color:#131a16
```

## Lo que se repite

- 🟧 **Siete de nueve aceptan el autoinforme del worker** (gastown añade un revisor LLM encima). Solo deer-flow comprueba evidencia de herramientas en código, y solo si el lead pasó criterios; agent-orchestrator la deriva de hechos de PR y CI.
- **La detección casi siempre solo avisa.** Pocos detectores actúan (agent-swarm casos A y B, el 2.º tick de LofiSu, el timeout de deer-flow).
- **El aislamiento es flojo por defecto.** Un git worktree o un directorio es el techo habitual; solo LofiSu (sandbox del sistema) y agent-swarm (Docker, endurecimiento opt-in) llegan más lejos.

## Explóralos

Cada diagrama es interactivo (zoom, foco, índice de nodos y cada nodo con su fuente `fichero:línea`): **[abrir los nueve diagramas](https://valdepeace.github.io/agentscope/orquestacion.html)**.

## Límites

- La cobertura de lectura es baja (del 0,2 % al 32 % de cada repo). Los diagramas muestran lo leído; «no localizado» significa «no encontrado en lo que leí».
- No se ejecutó nada. Sin benchmarks, sin tiempos, sin costes.
- Las comprobaciones de los diagramas son automáticas (esquema, citas contra el commit fijado, navegador). Ninguno se ha revisado a ojo.

Las puntuaciones, arquitectura frente a lo declarado y la rúbrica están en [el primer post](/es/blog/2026/11/22/nine-code-agent-orchestrators) y en [el estudio completo](https://github.com/valdepeace/agentscope/tree/main/orchestrators).
