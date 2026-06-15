import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const HelpPage = async () => {
  const user = await currentUser();

  return (
    <div className="p-6 max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-2">使い方ガイド</h1>
        <p className="text-muted-foreground text-sm">
          サイトの基本的な使い方と、OBS Studioを使った配信のはじめ方を紹介します。
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">サイトの使い方</h2>
        <div className="space-y-3">
          <div className="rounded-xl bg-muted p-4">
            <h3 className="font-semibold mb-1">配信を視聴する</h3>
            <p className="text-sm text-muted-foreground">
              ホーム画面に表示されている「配信中」のチャンネルをクリックすると視聴できます。
            </p>
          </div>
          <div className="rounded-xl bg-muted p-4">
            <h3 className="font-semibold mb-1">フォロー</h3>
            <p className="text-sm text-muted-foreground">
              配信ページの「フォロー」ボタンを押すと、お気に入りの配信者をフォローできます。フォローした配信者はサイドバーの「フォロー中」に表示されます。
            </p>
          </div>
          <div className="rounded-xl bg-muted p-4">
            <h3 className="font-semibold mb-1">チャット</h3>
            <p className="text-sm text-muted-foreground">
              配信画面の右側にあるチャットから、他の視聴者や配信者とリアルタイムにやり取りできます。配信者はチャット設定からチャットの有効/無効や、フォロワー限定モードなどを変更できます。
            </p>
          </div>
          <div className="rounded-xl bg-muted p-4">
            <h3 className="font-semibold mb-1">投げ銭</h3>
            <p className="text-sm text-muted-foreground">
              配信ページの「投げ銭」ボタンから、配信者にメッセージ付きで投げ銭（応援）ができます。受け取った投げ銭はダッシュボードの「投げ銭」ページで確認できます。
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">配信者として配信をはじめる</h2>
        <div className="space-y-3">
          <div className="rounded-xl bg-muted p-4">
            <h3 className="font-semibold mb-1">
              1. サーバーURLとストリームキーを確認する
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              ログイン後、ダッシュボードの「キー」ページでサーバーURLとストリームキーを確認できます。
            </p>
            {user?.username ? (
              <Button size="sm" variant="link" className="px-0" asChild>
                <Link href={`/u/${user.username}/keys`}>
                  キー&URLページを開く
                </Link>
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                ※ キー情報の確認にはログインが必要です。
              </p>
            )}
          </div>
          <div className="rounded-xl bg-muted p-4">
            <h3 className="font-semibold mb-1">2. OBS Studioで配信設定をする</h3>
            <p className="text-sm text-muted-foreground">
              OBS Studioを開き、「設定」→「配信」を選択します。
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>サービス: 「カスタム...」を選択</li>
              <li>サーバー: 「キー&URL」ページの「サーバーURL」を貼り付け</li>
              <li>
                ストリームキー: 「キー&URL」ページの「ストリームキー」を貼り付け
              </li>
            </ul>
          </div>
          <div className="rounded-xl bg-muted p-4">
            <h3 className="font-semibold mb-1">3. 配信を開始する</h3>
            <p className="text-sm text-muted-foreground">
              OBS Studioで「配信開始」をクリックすると、自動的にサイト上でも配信が「LIVE」状態になります。配信を終了する場合はOBS Studioで「配信終了」をクリックしてください。
            </p>
          </div>
          <div className="rounded-xl bg-muted p-4">
            <h3 className="font-semibold mb-1">4. 配信タイトル・サムネイルを設定する</h3>
            <p className="text-sm text-muted-foreground">
              配信ページ右上の「修正」ボタンから、配信タイトルやサムネイル画像を変更できます。
            </p>
          </div>
          <div className="rounded-xl bg-muted p-4">
            <h3 className="font-semibold mb-1">うまく接続できない場合</h3>
            <p className="text-sm text-muted-foreground">
              ストリームキーが正しく入力されているか確認してください。改善しない場合は、「キー&URL」ページの「コネクションの生成」から接続情報を再生成すると解決することがあります。再生成すると、現在の接続を使用しているアクティブな配信はリセットされます。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
