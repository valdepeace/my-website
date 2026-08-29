---
slug: agent-orchestrator
title: "Agent Orchestrator: hacer manejables los agentes de código en paralelo"
description: "Una mirada práctica a Agent Orchestrator, el entorno de escritorio que estoy usando para coordinar agentes de código aislados dentro de un proyecto."
authors: [valdepeace]
tags: [ai-agents, software-engineering, open-source]
---

He pasado suficiente tiempo alternando entre terminales, ramas y pull requests como para saber que ejecutar varios agentes de código no es simplemente una versión más grande de ejecutar uno. Es un problema de coordinación. **[Agent Orchestrator (AO)](https://github.com/Untrivial-ai/agent-orchestrator)** es una aplicación de escritorio creada para resolverlo, y la estoy usando para coordinar el trabajo en esta web.

<!--truncate-->

## Qué cambia AO

Un agente de código puede completar una tarea concreta. Varios agentes trabajando sobre el mismo repositorio introducen otro tipo de preguntas: qué tarea debe ir primero, qué contexto necesita cada agente, dónde está cada cambio y qué pull request necesita atención.

AO da a cada tarea su propio worker: un agente, un espacio de trabajo y—cuando el trabajo usa Git—su propia rama y worktree. Ese aislamiento es la base práctica. Un cambio de documentación y un arreglo de interfaz pueden avanzar en paralelo sin que los agentes compartan un directorio sucio ni pisen la misma rama.

Por encima de los workers está el orquestador a nivel de proyecto. Su trabajo no es implementar cada detalle: planifica el resultado global, delega trabajo acotado, sigue el progreso y envía el contexto adicional donde corresponde. Los workers se responsabilizan de la implementación, las pruebas, los commits y las pull requests.

## Una vista en vivo en lugar de pestañas dispersas

La parte que más útil me resulta es el tablero Kanban en vivo. Agrupa las sesiones de workers según el estado que importa: **Working**, **Needs You**, **In Review** y **Ready to Merge**. Cada tarjeta mantiene unidas la tarea, el agente, la rama, la actividad, la pull request y el estado.

Es un modelo operativo mucho mejor que reconstruir el proyecto a partir de pestañas de terminal y notificaciones de GitHub. AO también sigue el estado de CI y las revisiones junto al worker, incluidas las revisiones impulsadas por agentes, de modo que el feedback puede volver al agente responsable del cambio sin perder su contexto.

## Cómo lo estoy usando aquí

Este post es un ejemplo pequeño. Estoy trabajando dentro de un worker de AO para el repositorio `my-website`, con un orquestador coordinando la tarea más amplia. El worker tiene un worktree y una rama aislados, por lo que escribir este post bilingüe no interfiere con otro trabajo que esté ocurriendo en el proyecto.

El flujo es directo:

1. El orquestador convierte un objetivo de proyecto en tareas acotadas.
2. Cada worker implementa y verifica el cambio que tiene asignado de forma aislada.
3. El worker abre una pull request y lleva el feedback de CI y revisión hasta completarlo.
4. El Kanban muestra qué sigue en marcha y qué necesita una decisión humana.

No es magia: la calidad del resultado sigue dependiendo de tareas claras, límites sensatos y revisión. Pero elimina mucha de la coordinación mecánica que, de otro modo, hace que el trabajo paralelo con agentes sea más difícil de lo necesario.

## Dos interfaces, un flujo de trabajo

AO no obliga a usar una única forma de hablar con un agente. Puedes usar chat estructurado o la interfaz de terminal nativa del agente mientras AO mantiene el contexto de la tarea y el estado del espacio de trabajo ligados a la misma sesión.

Para trabajo de interfaz, cada worker también obtiene un perfil de navegador aislado. Eso importa cuando dos agentes prueban flujos locales distintos al mismo tiempo: las sesiones, cookies y el estado del navegador no se filtran entre ellos.

La aplicación soporta 26 agentes de código, incluidos Claude Code, Codex, Cursor, GitHub Copilot, Aider, Cline y Devin. La idea no es reemplazar esas herramientas; es darles un flujo de trabajo compartido de proyecto sin aplanar sus interfaces nativas.

## Un inicio sin fricción

AO se distribuye como aplicación de escritorio precompilada para macOS, Windows y Linux. Solo tienes que apuntarlo a un repositorio y la aplicación ejecuta su daemon, así que no necesitas configurar la CLI de AO para empezar a usarlo.

Para mí, es el nivel de abstracción adecuado. Sigo queriendo ramas Git, pull requests, CI y revisiones. Lo que no quiero es mantener manualmente alineados cada agente, espacio de trabajo y sesión de navegador. AO da un lugar a todas esas piezas móviles y, más importante, hace visible su estado actual.

## Enlaces

- [Agent Orchestrator en GitHub](https://github.com/Untrivial-ai/agent-orchestrator)
- [Documentación de AO](https://aoagents.dev/docs)
- [Descargar AO](https://github.com/Untrivial-ai/agent-orchestrator/releases)
