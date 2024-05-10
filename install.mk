runtime:
	$(info $$install server runtime)
	pnpm add ts-node -D
	pnpm add @swc/core @swc/helpers -D
	pnpm add browserslist browserslist-useragent-regexp -D

webpack:
	pnpm add webpack webpack-dev-server webpack-merge webpackbar -D
	pnpm add core-js swc-loader @svgr/webpack -D
	pnpm add css-loader sass-loader style-loader less less-loader -D
	pnpm add tsconfig-paths-webpack-plugin fork-ts-checker-webpack-plugin -D
	pnpm add html-webpack-plugin @types/html-webpack-plugin -D
	pnpm add dotenv-webpack @types/dotenv-webpack -D	

typescript:
	$(info $$install typescript)
	pnpm add typescript -D
	pnpm add @types/node -D
	pnpm add typescript-plugin-css-modules -D

eslint:
	$(info $$install eslint)
	pnpm add eslint@8.57.0 -D
	pnpm add eslint-config-prettier eslint-plugin-prettier -D
	pnpm add eslint-plugin-unicorn eslint-plugin-unused-imports -D
	pnpm add eslint-plugin-import eslint-plugin-simple-import-sort -D
	pnpm add @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

helpers: 
	$(info $$install helpers)
	pnpm add classnames dayjs mime nanoid normalize.css
	pnpm add @busymango/fetch-driver @busymango/utils @busymango/is-esm
	pnpm add js-cookie @types/js-cookie -D

react: 
	$(info $$install react ecosystem)
	pnpm add @types/react @types/react-dom -D
	pnpm add react-refresh @pmmmwh/react-refresh-webpack-plugin -D
	pnpm add react react-dom react-image react-router-dom react-use @tanstack/react-query