import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home(): JSX.Element {
    return (
        <Layout title='Welcome'>
            <header className={clsx('hero', styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">Homepage @tison</h1>
                </div>
            </header>
        </Layout>
    );
}
