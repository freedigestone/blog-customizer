import React, { useState, useRef, useEffect } from 'react';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Button } from '../../ui/button';
import { ArrowButton } from '../../ui/arrow-button';
import { Separator } from '../../ui/separator';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	fontColors,
	defaultArticleState,
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const containerRef = useRef<HTMLDivElement>(null);

	// Закрытие меню при клике вне панели
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleApply = () => onApply?.(articleState);
	const handleReset = () => {
		setArticleState(defaultArticleState);
		onReset?.();
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				ref={containerRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
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

					{/* Цвет шрифта */}
					<Select
						title='Цвет шрифта'
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
