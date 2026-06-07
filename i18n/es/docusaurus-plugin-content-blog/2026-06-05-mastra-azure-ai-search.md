---
slug: mastra-azure-ai-search
title: Por qué he creado mastra-azure-ai-search
description: "Una nota corta sobre publicar un vector store de Azure AI Search para Mastra mientras la PR upstream sigue pendiente."
authors: [valdepeace]
tags: [mastra, azure-ai-search, agentes-ai, open-source]
---

He estado trabajando en **mastra-azure-ai-search**, un proveedor de vector store de Azure AI Search para Mastra.

El motivo es sencillo: abrí el trabajo de integración en Mastra, pero la PR todavía no ha sido aprobada. En vez de dejar el adaptador bloqueado dentro de una pull request pendiente, he decidido publicarlo como paquete independiente para poder usarlo, probarlo y mejorarlo ya.

<!--truncate-->

## El contexto

Mastra ya tiene un modelo limpio para vector stores y memoria. Azure AI Search, por su parte, es una opción muy interesante cuando estás construyendo sobre Azure y necesitas búsqueda vectorial, búsqueda híbrida, ranking semántico e infraestructura preparada para entornos enterprise.

La pieza que faltaba era un puente directo entre ambos mundos:

- agentes y memoria de Mastra por un lado;
- índices, vectores y filtros de Azure AI Search por otro.

Eso es lo que intenta aportar `mastra-azure-ai-search`.

## ¿Por qué un paquete separado?

La idea inicial era contribuirlo directamente al monorepo de Mastra. Ese trabajo está reflejado en [mastra-ai/mastra#10146](https://github.com/mastra-ai/mastra/pull/10146).

Pero el flujo de contribución open source lleva tiempo: revisiones, nombres de paquetes, encaje con la API, expectativas de mantenimiento y calendario de releases. Mientras eso se resuelve, necesitaba algo práctico que funcionara hoy.

También hay una parte humana en esto. Las contribuciones open source normalmente son trabajo no pagado, hecho en ratos libres y con la intención de ayudar al proyecto. No espero una aprobación inmediata, pero algo de feedback, aunque sea un "ahora no" o un "queremos que esto tenga otra forma", haría mucho más fácil seguir avanzando.

Así que extraje el trabajo en un paquete independiente:

```bash
npm install mastra-azure-ai-search
```

Esto permite usar la implementación sin esperar a la decisión upstream.

## Qué hace el adaptador

El paquete proporciona una implementación `AzureAISearchVector` para Mastra. En la práctica, eso significa:

- crear y eliminar índices vectoriales en Azure AI Search;
- insertar, consultar, actualizar y borrar vectores;
- usar API keys o credenciales de Azure;
- mapear filtros de metadata de Mastra a filtros de Azure AI Search;
- soportar patrones de búsqueda semántica, híbrida y multi-vector;
- integrarse con Mastra Memory para semantic recall.

La parte delicada no era simplemente "mandar vectores a Azure". Lo complicado era traducir las expectativas del vector store de Mastra a los conceptos de Azure AI Search sin obligar al usuario a pensar demasiado en el esquema interno de Azure.

## Los filtros de metadata eran el detalle importante

Para memoria y RAG, la similitud vectorial solo es la mitad de la historia. Normalmente también necesitas filtros como:

```ts
{
  thread_id: "thread-123",
  resource_id: "customer-456"
}
```

Mastra Memory puede pasar metadata indexes para semantic recall. El adaptador mapea esos campos a campos filtrables de Azure AI Search y, al mismo tiempo, guarda el objeto completo de metadata como JSON.

Eso hace posible usar Azure AI Search como backend práctico para memoria de agentes, no solo como una base de datos vectorial sin contexto.

## Qué he aprendido

Ha sido un buen recordatorio de que las integraciones rara vez van solo del happy path. Las operaciones vectoriales básicas son razonablemente directas. El trabajo real está en los bordes:

- cómo se comportan los exports del paquete en ESM y CJS;
- cómo mapear filtros de una abstracción a otra;
- cómo mantener una API familiar para usuarios de Mastra;
- cómo testear sin necesitar credenciales de Azure en cada test unitario;
- cómo conservar flexibilidad para características avanzadas de Azure AI Search.

## Cierre

Sigo esperando que la PR upstream pueda entrar de alguna forma. Mientras tanto, `mastra-azure-ai-search` es mi forma de desbloquear el caso de uso sin obligar a nadie a esperar.

A veces el camino pragmático es publicar primero un paquete pequeño e independiente, dejar que la gente lo pruebe, y usar ese feedback para mejorar después la contribución upstream.

## Enlaces

- Repositorio del paquete: [valdepeace/mastra-azure-ai-search](https://github.com/valdepeace/mastra-azure-ai-search)
- PR upstream: [mastra-ai/mastra#10146](https://github.com/mastra-ai/mastra/pull/10146)
- Repositorio demo: [valdepeace/mastra-azure-aisearch-demo](https://github.com/valdepeace/mastra-azure-aisearch-demo)
