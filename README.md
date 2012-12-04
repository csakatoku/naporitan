ナポリタンZ
================

backbone.jsの使い方を練習するための個人的なレポジトリです。

cloneした後に以下のコマンドを実行して、必要なnode moduleを取得してください。

    $ npm install -d

クライアントをビルドするには、

    $ ./node_modules/grunt/bin/grunt depconcat templates less
    $ ./node_modules/grunt/bin/grunt watch

サーバーをスタートするには、

    $ node server.js

