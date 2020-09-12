# React Tutorial

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

このプロジェクトは [Create React App](https://github.com/facebook/create-react-app) でブートストラップされています。

## Available Scripts / 利用可能なスクリプト

In the project directory, you can run:

プロジェクトディレクトリ上で、以下のコマンドを実行できます:

### `yarn` / `yarn install`

package.json から依存パッケージをインストールします。<br>
yarn.lock と node_modules ディレクトリの内容を元にインストールするパッケージとバージョンが決まります。<br>
npm における `npm install` に対応するコマンドです。

**※ Do not run `npm install`!** not to generate package-lock.json.

**※ `npm install` は実行しないでください！** (package-lock.json を生成しないため。)

### `yarn upgrade`

package.json に従いパッケージの更新を行います。<br>
実行によって yarn.lock が更新されます。<br>
npm における `npm upgrade` に対応するコマンドです。

### `yarn start` / `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

development モードでアプリケーションを起動します。<br>
ブラウザで [http://localhost:3000](http://localhost:3000) を開いて表示します。

ソースコードに編集を加えた場合は表示中のページがリロードされます。<br>
lint エラーがある場合はコンソール上で見ることができます。

### `yarn test` / `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

インタラクティブウォッチモードでテスト runner を起動します。<br>
詳しくは [running tests](https://facebook.github.io/create-react-app/docs/running-tests) についての章をご覧ください。

### `yarn build` / `yarn run build` / `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

production 向けのアプリケーションをビルドして `build` フォルダに出力します。<br>
production モードで正確に React をバンドルし、最高のパフォーマンスを出せるようにビルドを最適化します。

ビルドは縮小され、ファイル名にはハッシュが含まれます。<br>
これによってアプリをデプロイする準備ができます！

詳しくは [deployment](https://facebook.github.io/create-react-app/docs/deployment) についての章をご覧ください。

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

**注意: このコマンドは不可逆な処理です。 一度 `eject` すると、後戻りできません！**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More / もっと詳しく

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

もっと詳しく知りたい場合は [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). をご覧ください。

React を学びたい場合は [React documentation](https://reactjs.org/) をチェックしてください。
