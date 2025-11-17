import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '💻 Development',
    Svg: require('@site/static/img/dev-illustration.svg').default,
    description: (
      <>
        <Translate id="homepage.features.development">
          Passionate about creating innovative and efficient technological solutions.
          Specialized in modern web development with the latest technologies.
        </Translate>
      </>
    ),
  },
  {
    title: '📝 Content',
    Svg: require('@site/static/img/content-illustration.svg').default,
    description: (
      <>
        <Translate id="homepage.features.content">
          Sharing knowledge and experiences through technical articles,
          tutorials and reflections on technology and development.
        </Translate>
      </>
    ),
  },
  {
    title: '🚀 Projects',
    Svg: require('@site/static/img/projects-illustration.svg').default,
    description: (
      <>
        <Translate id="homepage.features.projects">
          Building projects that impact and solve real problems.
          Explore my portfolio of works and collaborations.
        </Translate>
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
