// src/components/article-params-form/ArticleParamsForm.tsx
import React, { useState } from 'react';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Button } from '../../ui/button';
import { ArrowButton } from '../../ui/arrow-button';
import { Separator } from '../../ui/separator';
import styles from './ArticleParamsForm.module.scss';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	ArticleStateType,
} from '../../constants/articleProps';
type ArticleParamsFormProps = {
	onApply?: (params: ArticleStateType) => void;
	onReset?: () => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	onApply,
	onReset,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = () => {
		onApply?.(articleState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		onReset?.();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<h2 className={styles.title}>Задайте параметры</h2>

					{/* Шрифт */}
					<Select
						title='Шрифт'
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) =>
							setArticleState((prev) => ({
								...prev,
								fontFamilyOption: selected,
							}))
						}
					/>

					{/* Размер шрифта */}
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={(selected: OptionType) =>
							setArticleState((prev) => ({ ...prev, fontSizeOption: selected }))
						}
					/>

					{/* Цвет Шрифта */}
					<Select
						title='Цвет Шрифта'
						selected={articleState.fontColor}
						options={fontColors}
						onChange={(selected: OptionType) =>
							setArticleState((prev) => ({ ...prev, fontColor: selected }))
						}
					/>
					<Separator />
					{/* Цвет фона */}
					<Select
						title='Цвет фона'
						selected={articleState.backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) =>
							setArticleState((prev) => ({
								...prev,
								backgroundColor: selected,
							}))
						}
					/>

					{/* Ширина контента */}
					<Select
						title='Ширина контента'
						selected={articleState.contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) =>
							setArticleState((prev) => ({ ...prev, contentWidth: selected }))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='clear'
							htmlType='reset'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							type='apply'
							htmlType='submit'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
