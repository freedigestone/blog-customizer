import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onApply={(params) => {
					const rootEl = document.querySelector('main') as HTMLElement;
					rootEl.style.setProperty(
						'--font-family',
						params.fontFamilyOption.value
					);
					rootEl.style.setProperty('--font-size', params.fontSizeOption.value);
					rootEl.style.setProperty('--font-color', params.fontColor.value);
					rootEl.style.setProperty(
						'--container-width',
						params.contentWidth.value
					);
					rootEl.style.setProperty('--bg-color', params.backgroundColor.value);
				}}
				onReset={() => {
					const rootEl = document.querySelector('main') as HTMLElement;
					rootEl.style.setProperty(
						'--font-family',
						defaultArticleState.fontFamilyOption.value
					);
					rootEl.style.setProperty(
						'--font-size',
						defaultArticleState.fontSizeOption.value
					);
					rootEl.style.setProperty(
						'--font-color',
						defaultArticleState.fontColor.value
					);
					rootEl.style.setProperty(
						'--container-width',
						defaultArticleState.contentWidth.value
					);
					rootEl.style.setProperty(
						'--bg-color',
						defaultArticleState.backgroundColor.value
					);
				}}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
