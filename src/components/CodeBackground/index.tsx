import React from 'react';
import type {ReactElement} from 'react';
import styles from './styles.module.css';

export default function CodeBackground(): ReactElement {
  return (
    <div className={styles.codeBackground}>
      <div className={styles.codeBlock} style={{ top: '5%', left: '2%', fontSize: '12px' }}>
        <span className={styles.keyword}>const</span> <span className={styles.variable}>server</span> = <span className={styles.function}>express</span>();
      </div>
      <div className={styles.codeBlock} style={{ top: '12%', right: '5%', fontSize: '14px' }}>
        <span className={styles.keyword}>interface</span> <span className={styles.type}>Props</span> {'{'}<br/>
        &nbsp;&nbsp;<span className={styles.property}>name</span>: <span className={styles.type}>string</span>;<br/>
        {'}'}
      </div>
      <div className={styles.codeBlock} style={{ top: '25%', left: '8%', fontSize: '13px' }}>
        <span className={styles.keyword}>async</span> <span className={styles.keyword}>function</span> <span className={styles.function}>getData</span>()
      </div>
      <div className={styles.codeBlock} style={{ top: '35%', right: '10%', fontSize: '15px' }}>
        <span className={styles.keyword}>import</span> React <span className={styles.keyword}>from</span> <span className={styles.string}>"react"</span>;
      </div>
      <div className={styles.codeBlock} style={{ top: '45%', left: '15%', fontSize: '11px' }}>
        <span className={styles.keyword}>return</span> (<br/>
        &nbsp;&nbsp;&lt;<span className={styles.tag}>div</span> <span className={styles.attribute}>className</span>=<span className={styles.string}>"hero"</span>&gt;
      </div>
      <div className={styles.codeBlock} style={{ top: '55%', right: '8%', fontSize: '16px' }}>
        <span className={styles.variable}>app</span>.<span className={styles.function}>listen</span>(<span className={styles.number}>3000</span>);
      </div>
      <div className={styles.codeBlock} style={{ top: '65%', left: '5%', fontSize: '14px' }}>
        <span className={styles.keyword}>export</span> <span className={styles.keyword}>default</span> <span className={styles.variable}>App</span>;
      </div>
      <div className={styles.codeBlock} style={{ top: '75%', right: '12%', fontSize: '12px' }}>
        <span className={styles.variable}>console</span>.<span className={styles.function}>log</span>(<span className={styles.string}>"Success!"</span>);
      </div>
      <div className={styles.codeBlock} style={{ top: '18%', left: '40%', fontSize: '13px' }}>
        <span className={styles.keyword}>const</span> [<span className={styles.variable}>count</span>, <span className={styles.variable}>setCount</span>] = <span className={styles.function}>useState</span>(<span className={styles.number}>0</span>);
      </div>
      <div className={styles.codeBlock} style={{ top: '32%', left: '35%', fontSize: '15px' }}>
        {'{ '}...<span className={styles.variable}>spread</span> {'}'}
      </div>
      <div className={styles.codeBlock} style={{ top: '48%', right: '25%', fontSize: '11px' }}>
        <span className={styles.keyword}>if</span> (<span className={styles.variable}>data</span>.<span className={styles.property}>ok</span>)
      </div>
      <div className={styles.codeBlock} style={{ top: '62%', left: '25%', fontSize: '14px' }}>
        <span className={styles.variable}>arr</span>.<span className={styles.function}>map</span>((<span className={styles.parameter}>x</span>) =&gt; <span className={styles.parameter}>x</span> * <span className={styles.number}>2</span>)
      </div>
      <div className={styles.codeBlock} style={{ top: '78%', right: '20%', fontSize: '13px' }}>
        <span className={styles.keyword}>await</span> <span className={styles.function}>fetch</span>(<span className={styles.variable}>API_URL</span>)
      </div>
      <div className={styles.codeBlock} style={{ top: '8%', left: '60%', fontSize: '12px' }}>
        &lt;/<span className={styles.tag}>Component</span>&gt;
      </div>
      <div className={styles.codeBlock} style={{ top: '28%', right: '35%', fontSize: '16px' }}>
        <span className={styles.comment}>// Initialize app</span>
      </div>
      <div className={styles.codeBlock} style={{ top: '42%', left: '55%', fontSize: '11px' }}>
        <span className={styles.keyword}>try</span> {'{'} ... {'}'} <span className={styles.keyword}>catch</span>
      </div>
      <div className={styles.codeBlock} style={{ top: '58%', right: '40%', fontSize: '14px' }}>
        <span className={styles.type}>Promise</span>&lt;<span className={styles.type}>void</span>&gt;
      </div>
      <div className={styles.codeBlock} style={{ top: '72%', left: '45%', fontSize: '13px' }}>
        <span className={styles.property}>className</span>=<span className={styles.string}>"container"</span>
      </div>
    </div>
  );
}
