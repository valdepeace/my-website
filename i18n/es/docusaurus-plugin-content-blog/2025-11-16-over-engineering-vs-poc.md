---
slug: over-engineering-vs-poc
title: Ni todo es una PoC, ni hay que hacer un Netflix para un CRUD
authors: [valdepeace]
tags: [arquitectura, buenas-practicas, ingenieria-software, deuda-tecnica]
---

En los últimos años he visto dos extremos igual de dañinos en muchos equipos de desarrollo: el de la **sobre-ingeniería** y el de la **PoC eterna**. Este post va de por qué ambos extremos son una mala práctica de ingeniería y de cómo encontrar un punto medio razonable.

<!--truncate-->

## Qué llamo "sobre-ingeniería"

Por sobre-ingeniería me refiero a soluciones que:

* Añaden **complejidad accidental** sin aportar valor claro.
* Rompen principios básicos como **KISS** ("Keep It Simple, Stupid"), **YAGNI** ("You Aren't Gonna Need It") y **DRY** ("Don't Repeat Yourself").

Algunos olores típicos:

* Microservicios para un producto que no tiene ni PM dedicado.
* Arquitectura hexagonal + DDD + CQRS + Event Sourcing… para una intranet de 50 usuarios.
* Framework interno propio que solo entiende la persona que lo creó.

El problema no es usar patrones avanzados; el problema es hacerlo **sin un caso de negocio** que lo respalde. La complejidad hay que "pagarla" todos los días: onboarding, debugging, observabilidad, despliegues, refactors…

> Si el coste cognitivo de entender el sistema es mayor que el problema que resuelve, probablemente estás sobre-ingenierizando.

## Qué llamo "cultura PoC" (y por qué es igual de tóxica)

En el otro extremo está la cultura de:

> "Haz una PoC rápida, la ponemos en producción para probar y ya luego la refactorizamos".

Spoiler: **"luego" nunca llega**.

Una PoC (Proof of Concept) está pensada para **validar una idea con el mínimo esfuerzo**, no para durar años: no suele tener test, ni buenas prácticas de seguridad, ni observabilidad decente. Pasar esa PoC tal cual a producción es una fábrica de deuda técnica.

Y aquí está la trampa:

* La PoC **funciona**, el negocio se acostumbra.
* Se conectan más cosas alrededor.
* Ya "da miedo" tocarla porque "lo rompe todo".
* Refactorizar se vuelve cada vez más caro.

Como resumió Jason Lengstorf: casi todas las empresas tienen código en producción que nació como PoC y nunca se reescribió.

## Deuda técnica: herramienta, no excusa

Aquí entra el concepto de **deuda técnica**: tomar un atajo ahora sabiendo que pagarás un coste extra de mantenimiento en el futuro.

Martin Fowler propone un cuadrante muy útil: **prudente vs temeraria** y **deliberada vs inadvertida**.

* **Deliberada + prudente**:
  Sabes que estás metiendo deuda, la aceptas conscientemente y tienes un plan para pagarla. Ejemplo: hacer algo más "hardcodeado" para llegar a un lanzamiento, con tarea creada para refactorizar después.

* **Deliberada + temeraria**:
  "No tenemos tiempo para diseño, ya se verá". Sin plan de limpieza. Esto es gasolina para incendios futuros.

* **Inadvertida + prudente**:
  Hiciste lo mejor que sabías, pero más tarde aprendes una forma mejor. Normal.

* **Inadvertida + temeraria**:
  Código chapucero por desconocimiento y sin intención de mejorar.

La moraleja: **la deuda técnica buena existe** (es una inversión estratégica); la mala es la que metes sin saberlo o sabiendo que no la vas a pagar.

## Cómo se alimentan mutuamente la sobre-ingeniería y la cultura PoC

Lo gracioso (o triste) es que estas dos patologías **se refuerzan entre sí**:

1. Un equipo sufre sobre-ingeniería:
   * Cambiar algo en el sistema es carísimo.
   * Todo lleva semanas.
   * El negocio se frustra.

2. El negocio responde con "modo PoC":
   * "Haced algo rápido al margen, aunque sea feo, pero que funcione ya".
   * Nace una PoC paralela, sin disciplina de ingeniería.

3. Esa PoC termina en producción.
   * Ahora tienes un monstruo: arquitectura excesiva en un lado, spaghetti experimental en otro.

Y vuelta a empezar.

## Marco práctico para devs/arquitectos: ¿PoC rápida o ingeniería "en serio"?

Como arquitecto o referente técnico, tu trabajo no es aplicar patrones de libro, sino **tomar decisiones conscientes de coste/beneficio**.

### 1. Check rápido para evitar la sobre-ingeniería

Antes de añadir otra capa, otro microservicio o un patrón nuevo, pregúntate:

1. **¿Qué problema concreto resuelve hoy esto?**
   Si la respuesta es "por si mañana…", suena a YAGNI.

2. **¿Tengo señales reales de que lo futuro va a llegar?**
   Métricas, roadmap, clientes, no solo "intuición arquitectónica".

3. **¿Puedo empezar con algo más simple y extraerlo luego?**
   Por ejemplo:
   * Empezar con un módulo en un monolito → extraer a microservicio cuando haya necesidad clara.
   * Empezar con una única base de datos → separar más tarde por bounded contexts cuando duela de verdad.

4. **¿Mi equipo está preparado para la complejidad que introduzco?**
   Una arquitectura es tan buena como la gente que la tiene que mantener.

Si no puedes justificar la complejidad en términos de **riesgo reducido o coste ahorrado**, probablemente estás diseñando para tu ego más que para el producto.

### 2. Check rápido para evitar la PoC eterna

Cuando alguien diga "es solo una prueba", piensa:

1. **¿Este código puede estar en producción dentro de 6–12 meses?**
   Si la respuesta honesta es "sí, es probable", entonces no es "solo una PoC":
   * exige mínimo de calidad,
   * al menos unos tests básicos,
   * logging decente y algo de observabilidad.

2. **¿Qué parte del sistema depende de esto?**
   * ¿Va a mover dinero?
   * ¿Afecta a datos críticos?
   * ¿A la experiencia principal del usuario?

3. **¿Está registrada la deuda que estoy metiendo?**
   No vale con "ya lo refactorizamos":
   * escribe tickets concretos,
   * asigna prioridades,
   * comenta el contexto en el código cuando tomes atajos.

4. **¿Hay una "fecha de caducidad" para esta PoC?**
   Por ejemplo:
   > "Este servicio PoC vivirá máximo 3 meses. Si a los 3 meses sigue aportando valor, se planifica su reescritura/industrialización".

Sin timebox, la PoC muta en sistema legacy.

## Patrón de trabajo recomendado: PoC → prototipo → producto

Una forma sana de trabajar (sobre todo en entornos cloud / SaaS) es pensar en tres niveles:

1. **PoC**
   * Objetivo: validar una idea (técnica o de negocio).
   * Criterios mínimos:
     * Puede romperse; es para entorno controlado.
     * Documentas conscientemente: *"no está pensado para producción"*.

2. **Prototipo "production-like"**
   * Objetivo: acercarse a lo que sería la versión real.
   * Aquí ya aplicas:
     * arquitectura que tenga sentido,
     * límites claros,
     * seguridad básica,
     * observabilidad mínima.

3. **Producto / servicio estable**
   * Objetivo: operar en producción durante años.
   * Exige:
     * SLOs/SLAs claros,
     * pipelines serios,
     * métricas de fiabilidad,
     * estrategia de evolución.

El salto PoC → producto **sin fase intermedia** es lo que tantas veces acaba en pesadilla de deuda técnica.

## Qué puedes hacer tú como dev/arquitecto (aunque no seas "CTO")

Algunas acciones muy concretas que puedes meter en tu práctica diaria:

* **Poner lenguaje a los atajos**
  Cuando alguien pida "hazlo rápido":
  * "Vale, pero eso implica deuda técnica de tipo X. La aceptamos si luego dedicamos Y horas a limpiarla".

* **Visibilizar la complejidad**
  * Diagrams sencillos (C4 nivel 1–2) para mostrar cuándo la arquitectura se está volviendo absurda para el tamaño del producto.

* **Medir el dolor**
  * "Cada cambio en este módulo nos lleva dos semanas y rompe tres cosas".
  * Eso abre puertas para proponer refactors, simplificación o re-arquitectura.

* **Negociar condiciones para una PoC**
  * Timebox claro.
  * Qué se puede sacrificar (performance, limpieza interna) y qué NO (seguridad básica, privacidad, integridad de datos).

## Conclusión: ingeniería ≠ dogma, es gestión de trade-offs

Ni todo proyecto merece una arquitectura de libro, ni todo vale con "total, es una prueba". Ambos extremos son, en el fondo, **falta de ingeniería**:

* La sobre-ingeniería ignora el coste real de la complejidad.
* La cultura de PoC eterna ignora el coste real de la deuda técnica.

La ingeniería de software de verdad va de esto:

> **Tomar decisiones explícitas sobre dónde aceptas complejidad y dónde aceptas deuda, con un plan para gestionar ambas en el tiempo.**

Si algo te llevas de este post, que sea esta idea:

* Cuando vayas a diseñar: pregúntate *"¿puedo hacerlo más simple sin perder lo esencial?"*.
* Cuando vayas a "hacer algo rápido": pregúntate *"¿estoy dispuesto a pagar el precio de dejarlo así?"*.

El equilibrio no lo vas a encontrar en ningún libro: lo vas a construir tú, proyecto a proyecto, decisión a decisión.

---

## Referencias

* [KISS vs. DRY vs. YAGNI: Understanding Key Software Development Principles](https://rrmartins.medium.com/kiss-vs-dry-vs-yagni-understanding-key-software-development-principles-e307b7419636)
* [Technical Debt Quadrant - Martin Fowler](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html)
* [When Proof of Concepts Become Production Code](https://blog.scaledcode.com/blog/poc-to-production/)
* [YAGNI - Martin Fowler](https://martinfowler.com/bliki/Yagni.html)
