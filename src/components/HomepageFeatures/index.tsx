import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '💻 Desarrollo',
    Svg: require('@site/static/img/dev-illustration.svg').default,
    description: (
      <>
        Apasionado por crear soluciones tecnológicas innovadoras y eficientes.
        Especializado en desarrollo web moderno con las últimas tecnologías.
      </>
    ),
  },
  {
    title: '📝 Contenido',
    Svg: require('@site/static/img/content-illustration.svg').default,
    description: (
      <>
        Comparto conocimientos y experiencias a través de artículos técnicos,
        tutoriales y reflexiones sobre tecnología y desarrollo.
      </>
    ),
  },
  {
    title: '🚀 Proyectos',
    Svg: require('@site/static/img/projects-illustration.svg').default,
    description: (
      <>
        Construyendo proyectos que impactan y resuelven problemas reales.
        Explora mi portafolio de trabajos y colaboraciones.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
