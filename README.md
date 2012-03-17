ナポリタンZ
================

backbone.jsの使い方を練習するための個人的なレポジトリです。

cloneした後に以下のコマンドを実行して、必要なnode moduleを取得してください。

    $ npm install -d

クライアントをビルドするには、

    $ rake

サーバーをビルドするには、

    $ rake server_build

サーバーをスタートするには、Djangoをインストールした上で、

    $ cd server/naporitan
    $ python manage.py runserver
