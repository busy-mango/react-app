
eslint:
	pnpm add eslint@8.57.0 -D
	pnpm add eslint-config-prettier eslint-plugin-prettier -D
	pnpm add eslint-plugin-unicorn eslint-plugin-unused-imports -D
	pnpm add @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
	pnpm add eslint-plugin-import eslint-plugin-simple-import-sort -D

install: 
	$(info $$install typescript)
	pnpm add typescript -D
	pnpm add @types/node -D
	pnpm add typescript-plugin-css-modules -D
	$(info $$install server runtime)
	pnpm add ts-node -D
	pnpm add @swc/core @swc/helpers -D
	$(info $$install react ecosystem with ts define)
	pnpm add react react-dom react-image react-router-dom react-use @tanstack/react-query
	pnpm add @types/react @types/react-dom -D
	pnpm add react-refresh -D
	$(info $$install helpers with ts define)
	pnpm add classnames dayjs js-cookie mime nanoid normalize.css
	pnpm add @busymango/fetch-driver @busymango/is-esm
	pnpm add @types/js-cookie -D
	$(info $$install compilation core)
	pnpm add less core-js -D
	$(info $$install webpack ecosystem)
	pnpm add webpack webpack-dev-server webpack-merge webpackbar -D
	$(info $$install webpack loader)
	pnpm add css-loader sass-loader style-loader swc-loader less-loader @svgr/webpack -D
	$(info $$install webpack plugin with ts define)
	pnpm add html-webpack-plugin dotenv-webpack tsconfig-paths-webpack-plugin fork-ts-checker-webpack-plugin @pmmmwh/react-refresh-webpack-plugin -D
	pnpm add @types/html-webpack-plugin @types/dotenv-webpack -D	
	$(info $$install browserslist helpers)
	pnpm add browserslist browserslist-useragent-regexp -D
