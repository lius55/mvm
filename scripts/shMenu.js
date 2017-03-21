
var m_menuBtn;
var m_menuWidth;

function clsTree(name, fnc, key)
{
	this.name = name;
	this.ary = new Array();
	this.open = false;
	this.level = 0;
	this.idxstr = 0;
	this.fncCallBack = fnc;
	this.keystr = key;
}

clsTree.prototype =
{
    Push : function(item) 
	{
		this.ary.push(item);
	},
	GetArray : function()
	{
		return(this.ary);
	}
};

function initialize() {
	var fs;
	var xsize, ysizem;
	var area;

	fs = parseInt($('body').css('font-size'));
	xsize = parseInt($('body').css('width'));
	ysize = parseInt($('body').css('height'));
	m_menuWidth = xsize;
	m_nTreeFontSize = parseInt(fs);
	area = fnctreeCreateArea("area", 0, 0, xsize, ysize);
	document.body.appendChild(area);
	m_treeSelect = null;
	tree0 = new clsTree("", fncNameClick, "treetop");
	tree1 = new clsTree("資料請求管理", fncNameClick, "docu");
	tree11 = new clsTree("資料請求新規登録", fncNameClick, "docuRegister");
	tree12 = new clsTree("資料請求CSV,アップロード", fncNameClick, "docuUpload");
	tree13 = new clsTree("資料請求検索", fncNameClick, "docuSearch");
	tree14 = new clsTree("資料請求照会・更新", fncNameClick, "docuUpdate");
	tree15 = new clsTree("資料請求宛名印刷", fncNameClick, "docuPrint");
	tree2 = new clsTree("契約管理", fncNameClick, "cont");
	tree21 = new clsTree("契約者・利用者・契約,検索", fncNameClick, "contSearch");
	tree22 = new clsTree("新規申込書登録", fncNameClick, "contRegister");
	tree23 = new clsTree("契約照会・更新", fncNameClick, "contUpdate");
	tree24 = new clsTree("設定情報出力", fncNameClick, "contExport");
	tree3 = new clsTree("MNP管理", fncNameClick, "mnp");
	tree31 = new clsTree("MNP転入管理", fncNameClick, "mnpTransfer");
	tree32 = new clsTree("MNP強制黒化", fncNameClick, "mnpForced");
	tree4 = new clsTree("販売管理", fncNameClick, "sales");
	tree41 = new clsTree("販売新規登録", fncNameClick, "salesRegister");
	tree42 = new clsTree("販売履歴", fncNameClick, "salesHistory");
	tree43 = new clsTree("販売情報照会・更新", fncNameClick, "salesUpdate");
	tree44 = new clsTree("販売情報出力", fncNameClick, "salesExport");
	tree5 = new clsTree("通信通話明細管理", fncNameClick, "comm");
	tree51 = new clsTree("通話明細データ作成", fncNameClick, "commRegister");
	tree52 = new clsTree("通話明細生成,エラーログ照会", fncNameClick, "commError");
	tree53 = new clsTree("通話明細照会・更新", fncNameClick, "commUpdate");
	tree54 = new clsTree("通信月額データ作成", fncNameClick, "commMonthly");
	tree6 = new clsTree("請求管理", fncNameClick, "bill");
	tree61 = new clsTree("請求データ作成", fncNameClick, "billRegister");
	tree62 = new clsTree("請求データ作成エラーログ照会", fncNameClick, "billError");
	tree63 = new clsTree("請求明細照会・更新", fncNameClick, "billUpdate");
	tree64 = new clsTree("決済データダウンロード", fncNameClick, "billSettlement");
	tree65 = new clsTree("請求データダウンロード", fncNameClick, "billBilling");
	tree66 = new clsTree("振替結果登録", fncNameClick, "billUpload");
	tree67 = new clsTree("入金消込", fncNameClick, "billPayment");
	tree7 = new clsTree("コンシェルジュ履歴管理", fncNameClick, "conc");
	tree71 = new clsTree("応対履歴登録", fncNameClick, "concRegister");
	tree72 = new clsTree("応対履歴検索", fncNameClick, "concSearch");
	tree8 = new clsTree("代理店管理", fncNameClick, "agen");
	tree81 = new clsTree("代理店新規登録", fncNameClick, "agenRegister");
	tree82 = new clsTree("代理店照会・更新", fncNameClick, "agenUpdate");
	tree83 = new clsTree("代理店実績管理", fncNameClick, "agenExport");
	tree9 = new clsTree("商品定義管理", fncNameClick, "prod");
	tree91 = new clsTree("商品定義新規登録", fncNameClick, "prodRegister");
	tree92 = new clsTree("商品定義照会・更新", fncNameClick, "prodUpdate");
	treeA = new clsTree("オペレータ管理", fncNameClick, "oper");
	treeA1 = new clsTree("オペレータ新規登録", fncNameClick, "operRegister");
	treeA2 = new clsTree("オペレータ照会・更新", fncNameClick, "operUpdate");
	tree0.Push(tree1);
	tree1.Push(tree11);
	tree1.Push(tree12);
	tree1.Push(tree13);
	tree1.Push(tree14);
	tree0.Push(tree2);
	tree2.Push(tree21);
	tree2.Push(tree22);
	tree2.Push(tree23);
	tree2.Push(tree24);
	tree0.Push(tree3);
	tree3.Push(tree31);
	tree3.Push(tree32);
	tree0.Push(tree4);
	tree4.Push(tree41);
	tree4.Push(tree42);
	tree4.Push(tree43);
	tree4.Push(tree44);
	tree0.Push(tree5);
	tree5.Push(tree51);
	tree5.Push(tree52);
	tree5.Push(tree53);
	tree5.Push(tree54);
	tree0.Push(tree6);
	tree6.Push(tree61);
	tree6.Push(tree62);
	tree6.Push(tree63);
	tree6.Push(tree64);
	tree6.Push(tree65);
	tree6.Push(tree66);
	tree6.Push(tree67);
	tree0.Push(tree7);
	tree7.Push(tree71);
	tree7.Push(tree72);
	tree0.Push(tree8);
	tree8.Push(tree81);
	tree8.Push(tree82);
	tree8.Push(tree83);
	tree0.Push(tree9);
	tree9.Push(tree91);
	tree9.Push(tree92);
	tree0.Push(treeA);
	treeA.Push(treeA1);
	treeA.Push(treeA2);
	fnctreeInitElement(tree0);
	fnctreeView(area, tree0, 20, 20);
	fncMenuButton(m_menuWidth, fncHideMenu);
}

function fncCreateButton(area, sx, sy, xsize, ysize, name, fnc)
{
	var img;
	var div;

	img = document.createElement("img");
	img.src = "./img/"+name+".png";
	img.style.width = xsize+"px";
	img.style.height = ysize+"px";
	img.onclick = fnc;
	div = document.createElement("div");
	div.style.position = "absolute";
	div.style.left = sx+"px";
	div.style.top = sy+"px";
	div.style.width = xsize+"px";
	div.style.height = ysize+"px";
	area.appendChild(div);
	div.appendChild(img);
	return(div);
}

function fncMenuButton(xsize, fnc)
{
	var area;
	var sx, sy;
	var size;
	var name;

	area = document.getElementById("area");
	size = m_nTreeFontSize * 2-4;
	sx = xsize - size - 2;
	sy = 2;
	if(xsize == m_menuWidth){
		name = "hidemenu";
	}else{
		name = "select";
	}
	m_divBtn = fncCreateButton(area, sx, sy, size, size, name, fnc);
}

function fncHideMenu()
{
	var xsize;

	xsize = m_nTreeFontSize * 2;
	var obj = window.top.document.getElementById("shBody");
	obj.cols=xsize+"px,*";
	fnctreeRemoveAll();
	fncMenuButton(xsize, fncShowMenu);
}

function fncShowMenu()
{
	var obj = window.top.document.getElementById("shBody");
	obj.cols=m_menuWidth+"px,*";
	fnctreeRedraw();
	fncMenuButton(m_menuWidth, fncHideMenu);
}

function fncOnClickCallBack(str1, str2, href)
{
	var obj = top.shTitle.document.getElementById('subtitle');
	var ary = str2.split(",");
	if(ary.length == 1){
		obj.innerHTML = str1+" ＞ "+str2;
	}else{ //２行
		obj.innerHTML = str1+" ＞ "+ary[0]+ary[1];
	}
	top.shMain.location.href = "./"+href+".html";
}

function fncNameClick(tree)
{
	var str;
	var fnc;
	var max;

	str = tree.name;
	max = tree.ary.length;
	if(max == 0){
		fnctreeRedraw();
		fncMenuButton(m_menuWidth, fncHideMenu);

	}else{
		fnc = fncGetElementLoop;
	}
}

// 内部使用変数
var constTreeMax=10;
var m_areaTree;
var m_treeTop;
var m_nTreeTopX;
var m_nTreeTopY;
var m_nTreeCrtCY;
var m_nTreeFontSize;
var m_aryTreeXPos;
var m_treeSelect;

function fnctreeCreateArea(id, sx, sy, wd, hi)
{
	var area = document.createElement("div");
	area.id = id;
	area.style.left = sx+"px";
	area.style.top = sy+"px";
	area.style.width = wd+"px";
	area.style.height = hi+"px";
	area.style.position = "absolute";
	return(area);
}

function fnctreeInitElement(tree)
{
	var fnc;

	tree.open = true;
	fnc = fnctreeInitEleLoop;
	fnc(tree, 0, "0");
}

function fnctreeInitEleLoop(tree, level, idxstr)
{
	var ary;
	var max, i;
	var stree;
	var setlevel;
	var setidxstr;
	var fnc;

	tree.level = level;
	tree.idxstr = idxstr;
	ary = tree.GetArray();
	max = ary.length;
	for(i = 0; i < max; i++){
		stree = ary[i];
		setlevel = level+1;
		setidxstr = idxstr+","+i;
		fnc = fnctreeInitEleLoop;
		fnc(stree, setlevel, setidxstr);
	}
}

function fnctreeView(area, tree, sx, sy)
{
	var fncLoop;
	var xpos;
	var ypos;

	m_areaTree = area;
	m_treeTop = tree;
	m_nSpace = m_nTreeFontSize*1.5;
	m_aryTreeXPos = new Array();

	m_nTreeTopX = sx;
	m_nTreeTopY = sy;

	m_nTreeCrtCY = m_nTreeTopY;
	xpos = m_nTreeTopX;
	m_aryTreeXPos.push(xpos);
	for(i = 1; i < constTreeMax; i++){
		xpos = m_nTreeTopX + (i-1) * m_nSpace;
		m_aryTreeXPos.push(xpos);
	}
	fncLoop = fnctreeViewLoop;
	fncLoop(m_treeTop);
}

function fnctreeRemoveAll()
{
	var max, i;

	max = m_areaTree.childNodes.length;
	for(i = max-1; i >= 0; i--){
		m_areaTree.removeChild(m_areaTree.childNodes[i]);
	}
}
function fnctreeRedraw()
{
	var fncLoop;

	// ノードの初期化
	fnctreeRemoveAll();
	// 位置の初期化
	m_nTreeCrtCY = m_nTreeTopY;

	fncLoop = fnctreeViewLoop;
	fncLoop(m_treeTop);
}

function fnctreeViewLoop(tree)
{
	var cx, cy;
	var div;
	var max, i;
	var sx, sy;
	var ex, ey;
	var stree;
	var nYSpaceFlag;
	var fncLoop;

	cx = fnctreeGetXPos(tree.level);
	cy = m_nTreeCrtCY;
	if(tree.level == 0){
		//div = fnctreeCreateText(m_areaTree, cx, cy, tree.name);
		//div.onclick = fnctreeOnClick;
		//div.name = tree.idxstr;
	}else{
		if(tree.open == true){
			div = fnctreeCreateImage(m_areaTree, cx, cy, "open");
			div.onclick = fnctreeClose;
			div.name = tree.idxstr;
		} else{
			div = fnctreeCreateImage(m_areaTree, cx, cy, "close");
			div.onclick = fnctreeOpen;
			div.name = tree.idxstr;
		}
		cx = cx + m_nTreeFontSize*1.5;
		div = fnctreeCreateText(m_areaTree, cx, cy, tree.name);
		div.onclick = fnctreeOnClick;
		div.name = tree.idxstr;
	}
	if(tree.open == false){
		return;
	}
	max = tree.ary.length;
	nYSpaceFlag = true;
	for(i = 0; i < max; i++){
		stree = tree.ary[i];
		cx = fnctreeGetXPos(stree.level);
		cy = m_nTreeCrtCY + m_nTreeFontSize*2;
		m_nTreeCrtCY = cy;
		if(stree.ary.length == 0){
			ey = cy;
			if(m_treeSelect == stree){
				div = fnctreeCreateImage(m_areaTree, cx, cy, "select");
			}else{
				div = fnctreeCreateImage(m_areaTree, cx, cy, "close");
			}
			div.name = stree.idxstr;
			cx = cx + m_nTreeFontSize*1.2;
			div = fnctreeCreateText(m_areaTree, cx, cy, stree.name);
			if(m_treeSelect == stree){
				div.style.color = "#A9D195";
			}
			div.onclick = fnctreeOnClick;
			div.name = stree.idxstr;
			nYSpaceFlag = false;
		}else{
			fncLoop = fnctreeViewLoop;
			fncLoop(stree);
			nYSpaceFlag = true;
		}
	}
}
function fnctreeOpen()
{
	var idxstr;
	var tree;

	idxstr = this.name;
	tree = fnctreeGetSelectTree(idxstr);
	tree.open = true;
	fnctreeRedraw();
	// 以下の１行はツリー処理とは無関係
	fncMenuButton(m_menuWidth, fncHideMenu);
}

function fnctreeClose()
{
	var idxstr;
	var tree;

	idxstr = this.name;
	tree = fnctreeGetSelectTree(idxstr);
	tree.open = false;
	fnctreeRedraw();
	// 以下の１行はツリー処理とは無関係
	fncMenuButton(m_menuWidth, fncHideMenu);
}
function fnctreeOnClick()
{
	var idxstr;
	var tree, parent;
	var obj;

	idxstr = this.name;
	tree = fnctreeGetSelectTree(idxstr);
	parent = fnctreeGetParent(idxstr);
	// 以下１行　ツリー処理とは無関係
	fncOnClickCallBack(parent.name, tree.name, tree.keystr);
	m_treeSelect = tree;
	tree.fncCallBack(tree);
}
function fnctreeGetSelectTree(idxstr)
{
	var idxstr;
	var ary;
	var max, i, idx;
	var tree;

	ary = idxstr.split(",");
	max = ary.length;
	tree = m_treeTop;
	for(i = 1; i < max; i++){
		idx = parseInt(ary[i]);
		if(isNaN(idx) == true){
			break;
		}
		tree = tree.ary[idx];
	}
	return(tree);
}
function fnctreeGetParent(idxstr)
{
	var idxstr;
	var ary;
	var max, i, idx;
	var tree;
	var parent;

	ary = idxstr.split(",");
	max = ary.length;
	tree = m_treeTop;
	for(i = 1; i < max; i++){
		perent = tree;
		idx = parseInt(ary[i]);
		if(isNaN(idx) == true){
			break;
		}
		tree = perent.ary[idx];
	}
	return(perent);
}
function fnctreeGetXPos(level)
{
	var cx;

	cx = m_aryTreeXPos[level];
	return(cx);
}

function fnctreeCreateImage(area, cx, cy, name)
{
	var sx, sy;
	var xsize, ysize;

	sx = cx-m_nTreeFontSize/2;
	sy = cy-m_nTreeFontSize/2;
	xsize = m_nTreeFontSize;
	ysize = m_nTreeFontSize;
	img = document.createElement("img");
	img.src = "./img/"+name+".png";
	img.style.width = xsize+"px";
	img.style.height = ysize+"px";
	div = fnctreeCreateDiv(area, sx, sy, xsize, ysize);
	div.appendChild(img);
	return(div);
}
function fnctreeCreateText(area, cx, cy, str)
{
	var ary;
	var idx, max, len;
	var text;
	var sx, sy;
	var xsize, ysize;

	ary = str.split(",");
	max = ary.length;
	len = ary[0].length;
	for(idx = 1; idx < max; idx++){
		if(len < ary[idx].length){
			len = ary[idx].length;
		}
	}
	text = document.createElement("text");
	text.type = "text";
	sx = cx-m_nTreeFontSize/2;
	if(max == 1){
		sy = cy-m_nTreeFontSize/2;
		text.innerHTML = str;
	}else{ //２行
		sy = cy-m_nTreeFontSize*0.9;
		text.innerHTML = ary[0]+"<BR>"+ary[1];
	}

	xsize = m_nTreeFontSize * (len + 1);
	ysize = m_nTreeFontSize * (ary.length + 1);
	text.style.cursor = "pointer";
	div = fnctreeCreateDiv(area, sx, sy, xsize, ysize);
	div.appendChild(text);
	return(div);
}

function fnctreeCreateDiv(area, sx, sy, xsize, ysize)
{
	div = document.createElement("div");
	div.style.position = "absolute";
	div.style.left = sx+"px";
	div.style.top = sy+"px";
	div.style.width = xsize+"px";
	div.style.height = ysize+"px";
	area.appendChild(div);
	return(div);
}

