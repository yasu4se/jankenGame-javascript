"use strict";

{
	class User{ //親クラス
		constructor(tag,type){
			this.tag=tag;
			this.type=type;
			this._img=document.createElement("img");

			this._img.addEventListener("click",()=>{
				this.click();
			});
		}

		addImage(){ //画像ソースの追加
			this._img.src="img/"+this.type+".png";
		}

		addHTML(){ //HTMLに生成したタグの追加
			this.tag.appendChild(this._img);
		}

		click(){ //クリックされた時の処理
			if(!RESET_BUTTON.classList.contains("hidden")){ //何度もクリックできないようにする
				return;
			}

			clearTimeout(dealer._timeoutId);
			RESET_BUTTON.classList.remove("hidden");
			this.result();
		}

		result(){ //じゃんけんの結果判定
			let _dealerType=dealer.type[dealer._rdNum];

			switch(this.type){
				case JANKEN_TYPE[0]: //グーをクリックした場合
					if(_dealerType === JANKEN_TYPE[0]){
						RESULT_TAG.textContent=JUDGE_TYPE[2];
					}else if(_dealerType === JANKEN_TYPE[1]){
						RESULT_TAG.textContent=JUDGE_TYPE[0];
					}else{
						RESULT_TAG.textContent=JUDGE_TYPE[1];
					}
					break;

				case JANKEN_TYPE[1]: //チョキをクリックした場合
					if(_dealerType === JANKEN_TYPE[0]){
						RESULT_TAG.textContent=JUDGE_TYPE[1];
					}else if(_dealerType === JANKEN_TYPE[1]){
						RESULT_TAG.textContent=JUDGE_TYPE[2];
					}else{
						RESULT_TAG.textContent=JUDGE_TYPE[0];
					}
					break;

				case JANKEN_TYPE[2]: //パーをクリックした場合
					if(_dealerType === JANKEN_TYPE[0]){
						RESULT_TAG.textContent=JUDGE_TYPE[0];
					}else if(_dealerType === JANKEN_TYPE[1]){
						RESULT_TAG.textContent=JUDGE_TYPE[1];
					}else{
						RESULT_TAG.textContent=JUDGE_TYPE[2];
					}
					break;

				default:
					console.log("タイプなし");
					break;
			}
		}
	}

	class Dealer extends User{ //子クラス:ディーラー
		constructor(tag,type){
			super(tag, type);

			this._rdNum=Math.floor(Math.random()*type.length);

			this._timeoutId;

			this.addImage();
			this.addHTML();
		}

		//オーバーライド
		addImage(){ //画像ソースの追加
			this._img.src="img/"+this.type[this._rdNum]+".png";
		}

		shuffleImage(shuffleSpeed){ //ランダムにじゃんけん画像ソースの入れかえ
			this._rdNum=Math.floor(Math.random()*this.type.length);
			this.addImage();

			this._timeoutId = setTimeout(()=>{
				// 再帰的に自分自身をコールする
				this.shuffleImage(shuffleSpeed);
			},shuffleSpeed);

		}

		//オーバーライド
		click(){return;} //クリックしても何も起こらない
	}

	class Player extends User{ //子クラス:プレイヤー
		constructor(tag,type){
			super(tag,type);

			this.addImage();
			this.addHTML();
		}
	}

	const DEALER_TAG=document.querySelector(".dealer"); //クラスdealerタグの取得(HTML上に画像挿入する場所を取得する)
	const PLAYER_TAG=document.querySelector(".player"); //クラスplayerタグの取得
	const RESET_BUTTON=document.getElementById("resetButton"); //タグの取得
	const RESULT_TAG=document.querySelector(".result"); //タグの取得

	const JANKEN_TYPE=["rock","scissors","paper"]; //じゃんけんタイプの配列
	const JUDGE_TYPE =["あなたの勝ち","あなたの負け","引き分け"];	//判定の表示文字
	const shuffleSpeed = 50;	// シャッフルするスピード調整

	init();

	const dealer=new Dealer(DEALER_TAG,JANKEN_TYPE) //ディーラーのインスタンスの生成

	let player=new Array(JANKEN_TYPE.length);
	for(let i=0;i<player.length;i++){
		player[i]=(new Player(PLAYER_TAG,JANKEN_TYPE[i])); //プレイヤーのインスタンスの生成
	}

	dealer.shuffleImage(shuffleSpeed);

	RESET_BUTTON.addEventListener("click",()=>{ //リセットボタンが押された時の処理
		dealer.shuffleImage();
		init();
	});

	function init(){ //初期化
		RESULT_TAG.textContent="";
		RESET_BUTTON.classList.add("hidden");
	}
}