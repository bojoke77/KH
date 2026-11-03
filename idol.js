const questions=[['성격','친구들과 있을 때 나는?',['분위기 메이커','적당히 어울림','조용한 편']],['성격','새로운 친구를 만나면?',['먼저 말을 건다','상대가 오면 친해진다','천천히 관찰한다']],['성격','학교 행사 참여 스타일?',['앞장서서 참여','친구와 함께 참여','구경하는 편']],['취미','좋아하는 운동은?',['축구·야구','배드민턴·달리기','운동보다 휴식']],['취미','주말에 주로 하는 것은?',['친구 만나기','취미 활동','집에서 쉬기']],['취미','좋아하는 음악은?',['신나는 음악','감성적인 음악','잔잔한 음악']],['취향','좋아하는 동물은?',['강아지','둘 다','고양이']],['취향','좋아하는 계절은?',['여름','봄·가을','겨울']],['취향','좋아하는 음식은?',['매운 음식','달콤한 음식','건강한 음식']],['이상형','끌리는 스타일은?',['밝고 귀여운 스타일','청순하고 따뜻한 스타일','신비롭고 차분한 스타일']],['이상형','가장 중요한 가치는?',['재미와 유머','공감과 배려','성실함과 신뢰']],['데이트','데이트 장소는?',['놀이공원','카페·한강','집에서 게임']],['라이프스타일','아침형 / 밤형?',['아침형','둘 다 가능','밤형']],['라이프스타일','친구 고민 상담 스타일?',['해결책을 바로 제시','끝까지 공감','조용히 곁에 있기']],['라이프스타일','100만원이 생긴다면?',['여행·콘서트','선물·맛있는 것','저축·취미 도구']]];

const options=[[90,60,30],[90,60,30],[90,65,35],[90,65,35],[90,60,30],[90,65,35],[90,65,35],[90,65,35],[90,65,35],[90,65,35],[90,65,35],[90,65,35],[90,65,35],[90,65,35],[90,65,35]];

const idols = [

  {

    name: '장원영',

    file: 'wonyoung.png',

    type: '공주님형',

    p: [95,80,55,65,70,70,60,70,80,65,75,80,55,65,70]

  },



  {

    name: '안유진',

    file: 'yujin.png',

    type: '리더형',

    p: [90,90,90,65,90,65,65,80,90,80,95,75,45,70,90]

  },



  {

    name: '카리나',

    file: 'karina.png',

    type: '쿨뷰티형',

    p: [70,65,65,80,65,55,70,75,75,70,70,70,60,60,55]

  },



  {

    name: '윈터',

    file: 'winter.png',

    type: '감성형',

    p: [45,50,45,95,55,90,50,65,80,55,55,60,70,85,75]

  },



  {

    name: '민지',

    file: 'minji.png',

    type: '운동형',

    p: [85,85,95,60,85,65,55,60,70,70,80,75,45,60,85]

  },



  {

    name: '제나',

    file: 'jena.png',

    type: '분위기메이커형',

    p: [95,80,70,85,95,80,70,90,55,98,70,85,50,65,95]

  },



  {

    name: '하영',

    file: 'hayung.png',

    type: '신비주의형',

    p: [35,35,35,75,45,55,80,45,75,45,50,55,75,95,65]

  },



  {

    name: '원이',

    file: 'woni.png',

    type: '밝음형',

    p: [90,80,75,75,90,75,65,90,65,90,75,85,45,55,90]

  },



  {

    name: '설윤',

    file: 'seolyun.png',

    type: '활력형',

    p: [85,90,85,70,90,65,85,80,60,85,80,90,45,55,85]

  },



  {

    name: '아현',

    file: 'ahyun.png',

    type: '카리스마형',

    p: [65,60,50,90,65,95,75,70,75,75,60,70,65,80,80]

  },



  {

    name: '아이찡',

    file: 'izing.png',

    type: '러블리형',

    p: [80,70,65,95,70,80,45,85,65,85,75,80,70,50,80]

  },



  {

    name: '원희',

    file: 'wonhee.png',

    type: '센스형',

    p: [75,70,55,85,75,70,60,95,75,90,70,75,75,65,85]

  }

];

const firebaseConfig={apiKey:'AIzaSyC8Y8HrE2KD z6aBAG7chVDFj5esnu7EvM'.replace(/ /g,''),authDomain:'kh-ai-12300.firebaseapp.com',projectId:'kh-ai-12300',storageBucket:'kh-ai-12300.firebasestorage.app',messagingSenderId:'931616517001',appId:'1:931616517001:web:3566b7d54c1d79e278f58',measurementId:'G-8XEEBK4CG'};

firebase.initializeApp(firebaseConfig);const db=firebase.firestore(),rankingCollection=db.collection('ranking');

let answers=[],questionIndex=0,selectedBonus=null,lastResult=null,activeQuestionIndexes=[],studentInfo=null;

const $=id=>document.getElementById(id);



async function getRankings(){const snap=await rankingCollection.get();return snap.docs.map(doc=>({id:doc.id,...doc.data()}))}

function timeOf(x){return x?.createdAt?.toMillis?.()||Number(x?.createdAt)||0}



function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}



function show(id){document.querySelectorAll('.flow').forEach(x=>x.classList.remove('active'));$(id).classList.add('active');window.scrollTo({top:0,behavior:'smooth'})}



async function refreshHome(){const all=await getRankings(),best=all.reduce((m,x)=>Math.max(m,x.score||0),0);$('participantCount').textContent=all.length+'명';$('bestScore').textContent=best+'%';

const top=all.slice().sort((a,b)=>b.score-a.score||timeOf(a)-timeOf(b)).slice(0,12);$('topBoard').innerHTML=top.length?top.map((x,i)=>`<li><span class="medal">${i<3?['&#x1F947;','&#x1F948;','&#x1F949;'][i]:i+1}</span><span class="top-main"><span class="top-name">${esc(x.nickname)}</span><span class="top-meta">${esc(x.grade||'')} ${esc(x.class||'')}반 ${esc(x.number||'')}번</span></span><span class="top-idol">

  <img

    class="top-idol-img"

    src="img/${idols.find(idol => idol.name === x.idol)?.file || ''}"

    alt="${esc(x.idol)}"

    onerror="this.style.display='none'"

  >

  <span>${esc(x.idol)}</span>

</span><span class="top-score-wrap"><span class="top-score">${x.score}%</span><span class="top-grade">${grade(x.score||0)}</span></span></li>`).join(''):'<li class="note">아직 참가 기록이 없습니다.</li>';

const counts={};all.forEach(x=>counts[x.idol]=(counts[x.idol]||0)+1);

const dist=Object.entries(counts).sort((a,b)=>b[1]-a[1]);

const max=dist[0]?.[1]||1;$('idolChart').innerHTML=dist.length?dist.slice(0,8).map(([name,count])=>`<div class="bar-row"><span>${name}</span><div class="bar"><i style="width:${Math.max(8,count/max*100)}%"></i></div><b>${count}명</b></div>`).join(''):'<p class="note">첫 번째 결과를 만들어 보세요!</p>'}



function setStep(id){['step1','step2','step3','step4','result'].forEach(x=>$(x).classList.toggle('hidden',x!==id))}



function renderQuestion(){const questionId=activeQuestionIndexes[questionIndex],q=questions[questionId];$('progressText').textContent=`${questionIndex+1} / 10`;$('progressBar').style.width=((questionIndex+1)/10*100)+'%';$('questionCategory').textContent=q[0];$('questionText').textContent=q[1];$('optionList').innerHTML=q[2].map((x,i)=>`<button class="${answers[questionId]===i?'primary':''}" data-answer="${i}">${x}</button>`).join('');$('prevQuestion').disabled=questionIndex===0;$('nextQuestion').textContent=questionIndex===9?'답변 완료 →':'다음 →';document.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>{answers[questionId]=Number(b.dataset.answer);renderQuestion()}))}



function resetLuckyBox(){selectedBonus=null;document.querySelectorAll('.box-choice').forEach(b=>{b.disabled=false;b.classList.remove('open')});$('boxReward').innerHTML='상자를 선택하면 보너스가 공개됩니다.'}



function goHome(){answers=[];questionIndex=0;resetLuckyBox();setStep('step1');show('home');refreshHome()}



function begin(){answers=[];questionIndex=0;activeQuestionIndexes=[];studentInfo=null;resetLuckyBox();['studentName','studentGrade','studentClass','studentNumber'].forEach(id=>$(id).value='');$('nameError').classList.add('hidden');show('wizard');setStep('step1')}



function startQuestions(){const nickname=$('studentName').value.trim(),grade=$('studentGrade').value,className=$('studentClass').value.trim(),number=$('studentNumber').value.trim();if(!nickname||!grade||!className||!number){$('nameError').classList.remove('hidden');return}studentInfo={nickname,grade,class:className,number};activeQuestionIndexes=Array.from({length:questions.length},(_,i)=>i).sort(()=>Math.random()-.5).slice(0,10);$('nameError').classList.add('hidden');setStep('step2');renderQuestion()}



function nextQuestion(){const questionId=activeQuestionIndexes[questionIndex];if(answers[questionId]===undefined)return;if(questionIndex<9){questionIndex++;renderQuestion()}else{setStep('step3')}}



function prevQuestion(){if(questionIndex>0){questionIndex--;renderQuestion()}}



function openBox(btn){if(selectedBonus!==null)return;

const prizes=[{bonus:5,label:'+5%',text:'대박! 매칭 점수 +5% 보너스 &#x1F389;'},{bonus:3,label:'+3%',text:'행운이 왔어요! 매칭 점수 +3% 보너스 &#x2728;'},{bonus:0,label:'꽝 &#x1F605;',text:'아쉽지만 다음에는 더 큰 행운이!'}];

const p=prizes[Math.floor(Math.random()*prizes.length)];selectedBonus=p.bonus;document.querySelectorAll('.box-choice').forEach(x=>x.disabled=true);btn.classList.add('open');$('boxReward').innerHTML=`<strong>${p.label}</strong><small>${p.text}<br>최대 보너스 +5% 조건이 적용됩니다.</small>`;setTimeout(runAnalysis,900)}



function runAnalysis(){setStep('step4');setTimeout(calculate,3000)}



function grade(s){return s>=100?'SSS':s>=98?'SS':s>=95?'S':s>=85?'A':s>=70?'B':'C'}



function titleFor(s){return s>=100?'&#x1F308; 운명의 최애':s>=98?'&#x1F451; 최애의 신':s>=95?'&#x2728; 레전드 결과':'&#x1F3C6; 최애 마스터'}



async function saveRecord(nickname,score,idol){const current=await getRankings(),old=current.find(x=>x.nickname===nickname&&x.grade===studentInfo.grade&&x.class===studentInfo.class&&String(x.number)===String(studentInfo.number));if(old&&score<old.score)return current;const record={nickname,grade:studentInfo.grade,class:studentInfo.class,number:studentInfo.number,idol,score,createdAt:firebase.firestore.FieldValue.serverTimestamp()};if(old?.id)await rankingCollection.doc(old.id).set(record);else await rankingCollection.add(record);return getRankings()}



async function calculate(){const name=studentInfo.nickname,user=activeQuestionIndexes.map(questionId=>({index:questionId,value:options[questionId][answers[questionId]??1]})),history=await getRankings(),counts=history.reduce((map,x)=>(map[x.idol]=(map[x.idol]||0)+1,map),{}),dogSelected=answers[6]===0;

const candidates=dogSelected?idols.filter(idol=>!['카리나','원이'].includes(idol.name)):idols;

const scored=candidates.map(idol=>{let diff=0;user.forEach(({index,value})=>diff+=Math.abs(value-idol.p[index]));

const base=Math.max(40,Math.round(100-diff/(user.length*100)*60));const picked=counts[idol.name]||0;const diversityBonus=picked===0?4:picked===1?1:0;return {idol,match:Math.min(100,base+(selectedBonus||0)+diversityBonus),base,diversityBonus}}).sort((a,b)=>b.match-a.match);

const top=scored[0],all=await saveRecord(name,top.match,top.idol.name),rank=1+all.filter(x=>x.score>top.match).length;lastResult={name,studentInfo,top,all,rank,bonus:selectedBonus||0};renderResult()}



function qrText(){const {name,top,all,rank,bonus}=lastResult;return ['AI 최애 찾기','━━━━━━━━━━━━','이름: '+studentInfo.nickname,'학년: '+studentInfo.grade,'반: '+studentInfo.class,'번호: '+studentInfo.number,'당신의 최애: '+top.idol.name,'매칭률: '+top.match+'%','등급: '+grade(top.match),'럭키박스: +'+bonus+'%','내 순위: '+rank+'위 / '+all.length+'명','','Top12 랭킹',...all.slice(0,12).map((x,i)=>`${i+1}. ${x.nickname} ${x.score}% ${x.idol}`),'','LOVE RESULT'].join('\n')}



function drawQr(text){const c=$('qrCanvas'),q=new QRCodeLocal(-1,QRErrorCorrectLevelLocal.L);q.addData(unescape(encodeURIComponent(text)));q.make();

const x=c.getContext('2d'),s=c.width,n=q.getModuleCount(),cell=s/n;x.fillStyle='#fff';x.fillRect(0,0,s,s);x.fillStyle='#000';for(let r=0;r<n;r++)for(let k=0;k<n;k++)if(q.isDark(r,k))x.fillRect(Math.round(k*cell),Math.round(r*cell),Math.ceil(cell),Math.ceil(cell))}



function renderResult(){const {name,top,all,rank,bonus}=lastResult;

const score=top.match,g=grade(score),comment=score>=98?'&#x1F451; '+top.idol.name+'와 함께라면 최고의 케미가 펼쳐집니다!':score>=95?'&#x2728; '+top.idol.name+'와 만나면 대화가 끊길 확률 0%!':'&#x1F496; 서로의 매력을 발견하는 즐거운 조합입니다.';

const report=[['외향성',Math.round(answers[0]===0?90:answers[0]===1?65:40)],['유머감각',Math.round(answers[5]===0?95:answers[5]===1?75:55)],['활동성',Math.round(answers[3]===0?90:answers[3]===1?70:45)],['감성지수',Math.round(answers[9]===2?95:answers[9]===1?78:60)],['친화력',Math.round(answers[1]===0?98:answers[1]===1?75:50)]];

const top3=all.slice(0,3);$('result').innerHTML=`<div class="result-head"><div class="step-title"><small>STEP 5</small><h2>&#x1F31F; 당신의 최애는</h2></div><img class="idol-photo" src="img/${top.idol.file}" alt="${top.idol.name} 사진"><h1>${top.idol.name}</h1><p class="title-badge">${titleFor(score)}</p><div class="match">${score}%</div><div class="grade">&#x1F3C6; ${g}</div><p class="note">럭키박스 보너스 +${bonus}% 적용</p><div class="comment">${comment}</div></div>

<div class="stat"><span>&#x1F3C5; 현재 순위</span><b>${rank}위 / ${all.length}명</b></div><div class="stat"><span>&#x1F381; 럭키박스</span><b>+${bonus}%</b></div></div><h2>&#x1F3C6; Top3</h2><div class="rank-cards">${top3.map((x,i)=>`<div class="rank-card"><b>${['&#x1F947;','&#x1F948;','&#x1F949;'][i]} ${esc(x.nickname)}</b><small>${x.score}% · ${x.idol}</small></div>`).join('')}</div><div class="qr"><h2>&#x1F4F1; 결과 QR</h2><canvas id="qrCanvas" width="520" height="520"></canvas></div><div class="actions"><button id="savePng" class="secondary">&#x1F4F8; PNG 저장</button><button id="retry" class="primary">&#x1F504; 다시 도전</button><button id="homeFromResult" class="secondary">&#x1F3E0; 첫 화면</button></div>`;

const img=document.querySelector('.idol-photo');img.onerror=()=>{img.src='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><rect width="100%" height="100%" fill="#ff7aa8"/><text x="50%" y="55%" text-anchor="middle" font-size="180" fill="white">${top.idol.name.slice(0,1)}</text></svg>`)};

const text=qrText();if($('qrPreview'))$('qrPreview').textContent=text;drawQr(text);$('retry').addEventListener('click',begin);$('homeFromResult').addEventListener('click',goHome);$('savePng').addEventListener('click',saveResultPng);setStep('result');show('wizard')}



function saveResultPng(){const {name,top,rank,bonus}=lastResult,c=document.createElement('canvas');c.width=1000;c.height=1250;

const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.textAlign='center';x.fillStyle='#ff2d75';x.font='bold 42px sans-serif';x.fillText('\u{1F31F} AI 최애 찾기',500,75);x.fillStyle='#252735';x.font='bold 42px sans-serif';x.fillText(`${name}님의 최애`,500,140);x.font='bold 70px sans-serif';x.fillText(top.idol.name,500,240);x.fillStyle='#ff2d75';x.font='bold 110px sans-serif';x.fillText(`${top.match}%`,500,380);x.fillStyle='#e1a600';x.font='bold 52px sans-serif';x.fillText(`\u{1F3C6} ${grade(top.match)}`,500,470);x.fillStyle='#252735';x.font='28px sans-serif';x.fillText(`럭키박스 +${bonus}% · 현재 ${rank}위`,500,540);

const q=$('qrCanvas');if(q)x.drawImage(q,300,650,400,400);

const a=document.createElement('a');a.download='ai-favorite-result.png';a.href=c.toDataURL('image/png');a.click()}



function adminInput(value,field,type='text'){return `<input type="${type}" data-field="${field}" value="${esc(value??'')}">`}

async function renderAdminEditor(){const all=await getRankings();$('adminRecordCount').textContent=`${all.length}건`;if(!all.length){$('adminRecords').innerHTML='<p class="note">수정할 참가 기록이 없습니다.</p>';return}

 $('adminRecords').innerHTML=`<table class="admin-table"><thead><tr><th>#</th><th>닉네임</th><th>학년</th><th>반</th><th>번호</th><th>매칭률</th><th>등급</th><th>최애</th></tr></thead><tbody>${all.map((x,i)=>`<tr data-record-index="${i}"><td class="record-index">${i+1}</td><td>${adminInput(x.nickname,'nickname')}</td><td>${adminInput(x.grade,'grade')}</td><td>${adminInput(x.class,'class','text')}</td><td>${adminInput(x.number,'number','text')}</td><td>${adminInput(x.score,'score','number')}</td><td><span class="top-grade">${grade(x.score||0)}</span></td><td><select data-field="idol">${idols.map(idol=>`<option value="${esc(idol.name)}" ${idol.name===x.idol?'selected':''}>${esc(idol.name)}</option>`).join('')}</select></td></tr>`).join('')}</tbody></table>`}

async function saveAdminRecords(){const rows=[...document.querySelectorAll('#adminRecords tr[data-record-index]')],all=await getRankings();for(const row of rows){const i=Number(row.dataset.recordIndex),get=field=>row.querySelector(`[data-field="${field}"]`)?.value.trim(),score=Math.max(0,Math.min(100,Number(get('score'))||0));if(all[i]?.id)await rankingCollection.doc(all[i].id).update({nickname:get('nickname')||all[i].nickname,grade:get('grade')||all[i].grade||'',class:get('class')||all[i].class||'',number:get('number')||all[i].number||'',score,idol:get('idol')||all[i].idol})}await renderAdminEditor();await refreshHome();alert('참가 기록을 저장했습니다.')}

function openAdmin(){ $('adminModal').classList.add('show');$('adminPassword').value='';$('adminError').classList.add('hidden');$('adminAuth').classList.remove('hidden');$('adminEditor').classList.add('hidden');$('adminPassword').focus()}

function closeAdmin(){$('adminModal').classList.remove('show')}

function unlockAdmin(){if($('adminPassword').value==='2027'){$('adminAuth').classList.add('hidden');$('adminEditor').classList.remove('hidden');renderAdminEditor()}else $('adminError').classList.remove('hidden')}

 $('startBtn').addEventListener('click',begin);$('homeBtn').addEventListener('click',goHome);$('nameNext').addEventListener('click',startQuestions);$('studentName').addEventListener('keydown',e=>{if(e.key==='Enter')startQuestions()});$('nextQuestion').addEventListener('click',nextQuestion);$('prevQuestion').addEventListener('click',prevQuestion);document.querySelectorAll('.box-choice').forEach(b=>b.addEventListener('click',()=>openBox(b)));$('adminBtn').addEventListener('click',openAdmin);$('closeAdmin').addEventListener('click',closeAdmin);$('cancelAdmin').addEventListener('click',closeAdmin);$('adminModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeAdmin()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('adminModal').classList.contains('show'))closeAdmin()});$('confirmAdmin').addEventListener('click',unlockAdmin);$('saveAdmin').addEventListener('click',saveAdminRecords);$('resetAdmin').addEventListener('click',async()=>{if(confirm('모든 참가 기록을 초기화할까요?')){const snap=await rankingCollection.get();const batch=db.batch();snap.docs.forEach(doc=>batch.delete(doc.ref));await batch.commit();await renderAdminEditor();await refreshHome();alert('명예의 전당을 초기화했습니다.')}});$('adminPassword').addEventListener('keydown',e=>{if(e.key==='Enter')unlockAdmin()});refreshHome();



/* QR code generator kept local for offline use. */

(function(){

'use strict';

var modules = {};



modules['./QRMode'] = function(module, exports, require) {

module.exports = {

    MODE_NUMBER :       1 << 0,

    MODE_ALPHA_NUM :    1 << 1,

    MODE_8BIT_BYTE :    1 << 2,

    MODE_KANJI :        1 << 3

};



};



modules['./QRErrorCorrectLevel'] = function(module, exports, require) {

module.exports = {

L : 1,

M : 0,

Q : 3,

H : 2

};



};



modules['./QRMath'] = function(module, exports, require) {

var QRMath = {



glog : function(n) {

if (n < 1) {

throw new Error("glog(" + n + ")");

}

return QRMath.LOG_TABLE[n];

},

gexp : function(n) {

while (n < 0) {

n += 255;

}

while (n >= 256) {

n -= 255;

}

return QRMath.EXP_TABLE[n];

},

EXP_TABLE : new Array(256),

LOG_TABLE : new Array(256)



};

for (var i = 0; i < 8; i++) {

QRMath.EXP_TABLE[i] = 1 << i;

}

for (var i = 8; i < 256; i++) {

QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]

^ QRMath.EXP_TABLE[i - 5]

^ QRMath.EXP_TABLE[i - 6]

^ QRMath.EXP_TABLE[i - 8];

}

for (var i = 0; i < 255; i++) {

QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;

}



module.exports = QRMath;



};



modules['./QRPolynomial'] = function(module, exports, require) {

var QRMath = require('./QRMath');



function QRPolynomial(num, shift) {

if (num.length === undefined) {

throw new Error(num.length + "/" + shift);

}



var offset = 0;



while (offset < num.length && num[offset] === 0) {

offset++;

}



this.num = new Array(num.length - offset + shift);

for (var i = 0; i < num.length - offset; i++) {

this.num[i] = num[i + offset];

}

}



QRPolynomial.prototype = {



get : function(index) {

return this.num[index];

},

getLength : function() {

return this.num.length;

},

multiply : function(e) {

var num = new Array(this.getLength() + e.getLength() - 1);

for (var i = 0; i < this.getLength(); i++) {

for (var j = 0; j < e.getLength(); j++) {

num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i) ) + QRMath.glog(e.get(j) ) );

}

}

return new QRPolynomial(num, 0);

},

mod : function(e) {

if (this.getLength() - e.getLength() < 0) {

return this;

}

var ratio = QRMath.glog(this.get(0) ) - QRMath.glog(e.get(0) );

var num = new Array(this.getLength() );

for (var i = 0; i < this.getLength(); i++) {

num[i] = this.get(i);

}

for (var x = 0; x < e.getLength(); x++) {

num[x] ^= QRMath.gexp(QRMath.glog(e.get(x) ) + ratio);

}

// recursive call

return new QRPolynomial(num, 0).mod(e);

}

};



module.exports = QRPolynomial;



};



modules['./QRRSBlock'] = function(module, exports, require) {

var QRErrorCorrectLevel = require('./QRErrorCorrectLevel');



function QRRSBlock(totalCount, dataCount) {

this.totalCount = totalCount;

this.dataCount  = dataCount;

}



QRRSBlock.RS_BLOCK_TABLE = [



// L

// M

// Q

// H



// 1

[1, 26, 19],

[1, 26, 16],

[1, 26, 13],

[1, 26, 9],

// 2

[1, 44, 34],

[1, 44, 28],

[1, 44, 22],

[1, 44, 16],



// 3

[1, 70, 55],

[1, 70, 44],

[2, 35, 17],

[2, 35, 13],



// 4

[1, 100, 80],

[2, 50, 32],

[2, 50, 24],

[4, 25, 9],

// 5

[1, 134, 108],

[2, 67, 43],

[2, 33, 15, 2, 34, 16],

[2, 33, 11, 2, 34, 12],

// 6

[2, 86, 68],

[4, 43, 27],

[4, 43, 19],

[4, 43, 15],

// 7

[2, 98, 78],

[4, 49, 31],

[2, 32, 14, 4, 33, 15],

[4, 39, 13, 1, 40, 14],

// 8

[2, 121, 97],

[2, 60, 38, 2, 61, 39],

[4, 40, 18, 2, 41, 19],

[4, 40, 14, 2, 41, 15],

// 9

[2, 146, 116],

[3, 58, 36, 2, 59, 37],

[4, 36, 16, 4, 37, 17],

[4, 36, 12, 4, 37, 13],

// 10

[2, 86, 68, 2, 87, 69],

[4, 69, 43, 1, 70, 44],

[6, 43, 19, 2, 44, 20],

[6, 43, 15, 2, 44, 16],



// 11

[4, 101, 81],

[1, 80, 50, 4, 81, 51],

[4, 50, 22, 4, 51, 23],

[3, 36, 12, 8, 37, 13],



// 12

[2, 116, 92, 2, 117, 93],

[6, 58, 36, 2, 59, 37],

[4, 46, 20, 6, 47, 21],

[7, 42, 14, 4, 43, 15],



// 13

[4, 133, 107],

[8, 59, 37, 1, 60, 38],

[8, 44, 20, 4, 45, 21],

[12, 33, 11, 4, 34, 12],



// 14

[3, 145, 115, 1, 146, 116],

[4, 64, 40, 5, 65, 41],

[11, 36, 16, 5, 37, 17],

[11, 36, 12, 5, 37, 13],



// 15

[5, 109, 87, 1, 110, 88],

[5, 65, 41, 5, 66, 42],

[5, 54, 24, 7, 55, 25],

[11, 36, 12],



// 16

[5, 122, 98, 1, 123, 99],

[7, 73, 45, 3, 74, 46],

[15, 43, 19, 2, 44, 20],

[3, 45, 15, 13, 46, 16],



// 17

[1, 135, 107, 5, 136, 108],

[10, 74, 46, 1, 75, 47],

[1, 50, 22, 15, 51, 23],

[2, 42, 14, 17, 43, 15],



// 18

[5, 150, 120, 1, 151, 121],

[9, 69, 43, 4, 70, 44],

[17, 50, 22, 1, 51, 23],

[2, 42, 14, 19, 43, 15],



// 19

[3, 141, 113, 4, 142, 114],

[3, 70, 44, 11, 71, 45],

[17, 47, 21, 4, 48, 22],

[9, 39, 13, 16, 40, 14],



// 20

[3, 135, 107, 5, 136, 108],

[3, 67, 41, 13, 68, 42],

[15, 54, 24, 5, 55, 25],

[15, 43, 15, 10, 44, 16],



// 21

[4, 144, 116, 4, 145, 117],

[17, 68, 42],

[17, 50, 22, 6, 51, 23],

[19, 46, 16, 6, 47, 17],



// 22

[2, 139, 111, 7, 140, 112],

[17, 74, 46],

[7, 54, 24, 16, 55, 25],

[34, 37, 13],



// 23

[4, 151, 121, 5, 152, 122],

[4, 75, 47, 14, 76, 48],

[11, 54, 24, 14, 55, 25],

[16, 45, 15, 14, 46, 16],



// 24

[6, 147, 117, 4, 148, 118],

[6, 73, 45, 14, 74, 46],

[11, 54, 24, 16, 55, 25],

[30, 46, 16, 2, 47, 17],



// 25

[8, 132, 106, 4, 133, 107],

[8, 75, 47, 13, 76, 48],

[7, 54, 24, 22, 55, 25],

[22, 45, 15, 13, 46, 16],



// 26

[10, 142, 114, 2, 143, 115],

[19, 74, 46, 4, 75, 47],

[28, 50, 22, 6, 51, 23],

[33, 46, 16, 4, 47, 17],



// 27

[8, 152, 122, 4, 153, 123],

[22, 73, 45, 3, 74, 46],

[8, 53, 23, 26, 54, 24],

[12, 45, 15, 28, 46, 16],



// 28

[3, 147, 117, 10, 148, 118],

[3, 73, 45, 23, 74, 46],

[4, 54, 24, 31, 55, 25],

[11, 45, 15, 31, 46, 16],



// 29

[7, 146, 116, 7, 147, 117],

[21, 73, 45, 7, 74, 46],

[1, 53, 23, 37, 54, 24],

[19, 45, 15, 26, 46, 16],



// 30

[5, 145, 115, 10, 146, 116],

[19, 75, 47, 10, 76, 48],

[15, 54, 24, 25, 55, 25],

[23, 45, 15, 25, 46, 16],



// 31

[13, 145, 115, 3, 146, 116],

[2, 74, 46, 29, 75, 47],

[42, 54, 24, 1, 55, 25],

[23, 45, 15, 28, 46, 16],



// 32

[17, 145, 115],

[10, 74, 46, 23, 75, 47],

[10, 54, 24, 35, 55, 25],

[19, 45, 15, 35, 46, 16],



// 33

[17, 145, 115, 1, 146, 116],

[14, 74, 46, 21, 75, 47],

[29, 54, 24, 19, 55, 25],

[11, 45, 15, 46, 46, 16],



// 34

[13, 145, 115, 6, 146, 116],

[14, 74, 46, 23, 75, 47],

[44, 54, 24, 7, 55, 25],

[59, 46, 16, 1, 47, 17],



// 35

[12, 151, 121, 7, 152, 122],

[12, 75, 47, 26, 76, 48],

[39, 54, 24, 14, 55, 25],

[22, 45, 15, 41, 46, 16],



// 36

[6, 151, 121, 14, 152, 122],

[6, 75, 47, 34, 76, 48],

[46, 54, 24, 10, 55, 25],

[2, 45, 15, 64, 46, 16],



// 37

[17, 152, 122, 4, 153, 123],

[29, 74, 46, 14, 75, 47],

[49, 54, 24, 10, 55, 25],

[24, 45, 15, 46, 46, 16],



// 38

[4, 152, 122, 18, 153, 123],

[13, 74, 46, 32, 75, 47],

[48, 54, 24, 14, 55, 25],

[42, 45, 15, 32, 46, 16],



// 39

[20, 147, 117, 4, 148, 118],

[40, 75, 47, 7, 76, 48],

[43, 54, 24, 22, 55, 25],

[10, 45, 15, 67, 46, 16],



// 40

[19, 148, 118, 6, 149, 119],

[18, 75, 47, 31, 76, 48],

[34, 54, 24, 34, 55, 25],

[20, 45, 15, 61, 46, 16]

];



QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {

var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

if (rsBlock === undefined) {

throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);

}



var length = rsBlock.length / 3;

var list = [];

for (var i = 0; i < length; i++) {



var count = rsBlock[i * 3 + 0];

var totalCount = rsBlock[i * 3 + 1];

var dataCount  = rsBlock[i * 3 + 2];



for (var j = 0; j < count; j++) {

list.push(new QRRSBlock(totalCount, dataCount) );

}

}

return list;

};



QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {



switch(errorCorrectLevel) {

case QRErrorCorrectLevel.L :

return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];

case QRErrorCorrectLevel.M :

return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];

case QRErrorCorrectLevel.Q :

return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];

case QRErrorCorrectLevel.H :

return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];

default :

return undefined;

}

};



module.exports = QRRSBlock;



};



modules['./QRMaskPattern'] = function(module, exports, require) {

module.exports = {

PATTERN000 : 0,

PATTERN001 : 1,

PATTERN010 : 2,

PATTERN011 : 3,

PATTERN100 : 4,

PATTERN101 : 5,

PATTERN110 : 6,

PATTERN111 : 7

};



};



modules['./QRUtil'] = function(module, exports, require) {

var QRMode = require('./QRMode');

var QRPolynomial = require('./QRPolynomial');

var QRMath = require('./QRMath');

var QRMaskPattern = require('./QRMaskPattern');



var QRUtil = {



    PATTERN_POSITION_TABLE : [

        [],

        [6, 18],

        [6, 22],

        [6, 26],

        [6, 30],

        [6, 34],

        [6, 22, 38],

        [6, 24, 42],

        [6, 26, 46],

        [6, 28, 50],

        [6, 30, 54],        

        [6, 32, 58],

        [6, 34, 62],

        [6, 26, 46, 66],

        [6, 26, 48, 70],

        [6, 26, 50, 74],

        [6, 30, 54, 78],

        [6, 30, 56, 82],

        [6, 30, 58, 86],

        [6, 34, 62, 90],

        [6, 28, 50, 72, 94],

        [6, 26, 50, 74, 98],

        [6, 30, 54, 78, 102],

        [6, 28, 54, 80, 106],

        [6, 32, 58, 84, 110],

        [6, 30, 58, 86, 114],

        [6, 34, 62, 90, 118],

        [6, 26, 50, 74, 98, 122],

        [6, 30, 54, 78, 102, 126],

        [6, 26, 52, 78, 104, 130],

        [6, 30, 56, 82, 108, 134],

        [6, 34, 60, 86, 112, 138],

        [6, 30, 58, 86, 114, 142],

        [6, 34, 62, 90, 118, 146],

        [6, 30, 54, 78, 102, 126, 150],

        [6, 24, 50, 76, 102, 128, 154],

        [6, 28, 54, 80, 106, 132, 158],

        [6, 32, 58, 84, 110, 136, 162],

        [6, 26, 54, 82, 110, 138, 166],

        [6, 30, 58, 86, 114, 142, 170]

    ],



    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),

    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),

    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)    | (1 << 4) | (1 << 1),



    getBCHTypeInfo : function(data) {

        var d = data << 10;

        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {

            d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) );    

        }

        return ( (data << 10) | d) ^ QRUtil.G15_MASK;

    },



    getBCHTypeNumber : function(data) {

        var d = data << 12;

        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {

            d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) );    

        }

        return (data << 12) | d;

    },



    getBCHDigit : function(data) {



        var digit = 0;



        while (data !== 0) {

            digit++;

            data >>>= 1;

        }



        return digit;

    },



    getPatternPosition : function(typeNumber) {

        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];

    },



    getMask : function(maskPattern, i, j) {        

        switch (maskPattern) {            

        case QRMaskPattern.PATTERN000 : return (i + j) % 2 === 0;

        case QRMaskPattern.PATTERN001 : return i % 2 === 0;

        case QRMaskPattern.PATTERN010 : return j % 3 === 0;

        case QRMaskPattern.PATTERN011 : return (i + j) % 3 === 0;

        case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 === 0;

        case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 === 0;

        case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 === 0;

        case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 === 0;



        default :

            throw new Error("bad maskPattern:" + maskPattern);

        }

    },



    getErrorCorrectPolynomial : function(errorCorrectLength) {



        var a = new QRPolynomial([1], 0);



        for (var i = 0; i < errorCorrectLength; i++) {

            a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );

        }



        return a;

    },



    getLengthInBits : function(mode, type) {



        if (1 <= type && type < 10) {



            // 1 - 9



            switch(mode) {

            case QRMode.MODE_NUMBER     : return 10;

            case QRMode.MODE_ALPHA_NUM  : return 9;

            case QRMode.MODE_8BIT_BYTE  : return 8;

            case QRMode.MODE_KANJI      : return 8;

            default :

                throw new Error("mode:" + mode);

            }



        } else if (type < 27) {



            // 10 - 26



            switch(mode) {

            case QRMode.MODE_NUMBER     : return 12;

            case QRMode.MODE_ALPHA_NUM  : return 11;

            case QRMode.MODE_8BIT_BYTE  : return 16;

            case QRMode.MODE_KANJI      : return 10;

            default :

                throw new Error("mode:" + mode);

            }



        } else if (type < 41) {



            // 27 - 40



            switch(mode) {

            case QRMode.MODE_NUMBER     : return 14;

            case QRMode.MODE_ALPHA_NUM  : return 13;

            case QRMode.MODE_8BIT_BYTE  : return 16;

            case QRMode.MODE_KANJI      : return 12;

            default :

                throw new Error("mode:" + mode);

            }



        } else {

            throw new Error("type:" + type);

        }

    },



    getLostPoint : function(qrCode) {        

        var moduleCount = qrCode.getModuleCount();

        var lostPoint = 0;

        var row = 0; 

        var col = 0;


        

        // LEVEL1        

        for (row = 0; row < moduleCount; row++) {



            for (col = 0; col < moduleCount; col++) {



                var sameCount = 0;

                var dark = qrCode.isDark(row, col);



                for (var r = -1; r <= 1; r++) {



                    if (row + r < 0 || moduleCount <= row + r) {

                        continue;

                    }



                    for (var c = -1; c <= 1; c++) {



                        if (col + c < 0 || moduleCount <= col + c) {

                            continue;

                        }



                        if (r === 0 && c === 0) {

                            continue;

                        }



                        if (dark === qrCode.isDark(row + r, col + c) ) {

                            sameCount++;

                        }

                    }

                }



                if (sameCount > 5) {

                    lostPoint += (3 + sameCount - 5);

                }

            }

        }



        // LEVEL2



        for (row = 0; row < moduleCount - 1; row++) {

            for (col = 0; col < moduleCount - 1; col++) {

                var count = 0;

                if (qrCode.isDark(row,     col    ) ) count++;

                if (qrCode.isDark(row + 1, col    ) ) count++;

                if (qrCode.isDark(row,     col + 1) ) count++;

                if (qrCode.isDark(row + 1, col + 1) ) count++;

                if (count === 0 || count === 4) {

                    lostPoint += 3;

                }

            }

        }



        // LEVEL3



        for (row = 0; row < moduleCount; row++) {

            for (col = 0; col < moduleCount - 6; col++) {

                if (qrCode.isDark(row, col) && 

                        !qrCode.isDark(row, col + 1) && 

                         qrCode.isDark(row, col + 2) && 

                         qrCode.isDark(row, col + 3) && 

                         qrCode.isDark(row, col + 4) && 

                        !qrCode.isDark(row, col + 5) && 

                         qrCode.isDark(row, col + 6) ) {

                    lostPoint += 40;

                }

            }

        }



        for (col = 0; col < moduleCount; col++) {

            for (row = 0; row < moduleCount - 6; row++) {

                if (qrCode.isDark(row, col) &&

                        !qrCode.isDark(row + 1, col) &&

                         qrCode.isDark(row + 2, col) &&

                         qrCode.isDark(row + 3, col) &&

                         qrCode.isDark(row + 4, col) &&

                        !qrCode.isDark(row + 5, col) &&

                         qrCode.isDark(row + 6, col) ) {

                    lostPoint += 40;

                }

            }

        }



        // LEVEL4        

        var darkCount = 0;



        for (col = 0; col < moduleCount; col++) {

            for (row = 0; row < moduleCount; row++) {

                if (qrCode.isDark(row, col) ) {

                    darkCount++;

                }

            }

        }        

        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;

        lostPoint += ratio * 10;



        return lostPoint;       

    }



};



module.exports = QRUtil;



};



modules['./QR8bitByte'] = function(module, exports, require) {

var QRMode = require('./QRMode');



function QR8bitByte(data) {

this.mode = QRMode.MODE_8BIT_BYTE;

this.data = data;

}



QR8bitByte.prototype = {



getLength : function() {

return this.data.length;

},

write : function(buffer) {

for (var i = 0; i < this.data.length; i++) {

// not JIS ...

buffer.put(this.data.charCodeAt(i), 8);

}

}

};



module.exports = QR8bitByte;



};



modules['./QRBitBuffer'] = function(module, exports, require) {



function QRBitBuffer() {

this.buffer = [];

this.length = 0;

}



QRBitBuffer.prototype = {



get : function(index) {

var bufIndex = Math.floor(index / 8);

return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;

},

put : function(num, length) {

for (var i = 0; i < length; i++) {

this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);

}

},

getLengthInBits : function() {

return this.length;

},

putBit : function(bit) {

var bufIndex = Math.floor(this.length / 8);

if (this.buffer.length <= bufIndex) {

this.buffer.push(0);

}

if (bit) {

this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );

}

this.length++;

}

};



module.exports = QRBitBuffer;



};



modules['./index'] = function(module, exports, require) {

//---------------------------------------------------------------------

// QRCode for JavaScript

//

// Copyright (c) 2009 Kazuhiko Arase

//

// URL: http://www.d-project.com/

//

// Licensed under the MIT license:

//   http://www.opensource.org/licenses/mit-license.php

//

// The word "QR Code" is registered trademark of 

// DENSO WAVE INCORPORATED

//   http://www.denso-wave.com/qrcode/faqpatent-e.html

//

//---------------------------------------------------------------------

// Modified to work in node for this project (and some refactoring)

//---------------------------------------------------------------------



var QR8bitByte = require('./QR8bitByte');

var QRUtil = require('./QRUtil');

var QRPolynomial = require('./QRPolynomial');

var QRRSBlock = require('./QRRSBlock');

var QRBitBuffer = require('./QRBitBuffer');



function QRCode(typeNumber, errorCorrectLevel) {

this.typeNumber = typeNumber;

this.errorCorrectLevel = errorCorrectLevel;

this.modules = null;

this.moduleCount = 0;

this.dataCache = null;

this.dataList = [];

}



QRCode.prototype = {

addData : function(data) {

var newData = new QR8bitByte(data);

this.dataList.push(newData);

this.dataCache = null;

},

isDark : function(row, col) {

if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {

throw new Error(row + "," + col);

}

return this.modules[row][col];

},



getModuleCount : function() {

return this.moduleCount;

},

make : function() {

// Calculate automatically typeNumber if provided is < 1

if (this.typeNumber < 1 ){

var typeNumber = 1;

for (typeNumber = 1; typeNumber < 40; typeNumber++) {

var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);



var buffer = new QRBitBuffer();

var totalDataCount = 0;

for (var i = 0; i < rsBlocks.length; i++) {

totalDataCount += rsBlocks[i].dataCount;

}



for (var x = 0; x < this.dataList.length; x++) {

var data = this.dataList[x];

buffer.put(data.mode, 4);

buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );

data.write(buffer);

}

if (buffer.getLengthInBits() <= totalDataCount * 8)

break;

}

this.typeNumber = typeNumber;

}

this.makeImpl(false, this.getBestMaskPattern() );

},

makeImpl : function(test, maskPattern) {

this.moduleCount = this.typeNumber * 4 + 17;

this.modules = new Array(this.moduleCount);

for (var row = 0; row < this.moduleCount; row++) {

this.modules[row] = new Array(this.moduleCount);

for (var col = 0; col < this.moduleCount; col++) {

this.modules[row][col] = null;//(col + row) % 3;

}

}

this.setupPositionProbePattern(0, 0);

this.setupPositionProbePattern(this.moduleCount - 7, 0);

this.setupPositionProbePattern(0, this.moduleCount - 7);

this.setupPositionAdjustPattern();

this.setupTimingPattern();

this.setupTypeInfo(test, maskPattern);

if (this.typeNumber >= 7) {

this.setupTypeNumber(test);

}

if (this.dataCache === null) {

this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);

}

this.mapData(this.dataCache, maskPattern);

},



setupPositionProbePattern : function(row, col)  {

for (var r = -1; r <= 7; r++) {

if (row + r <= -1 || this.moduleCount <= row + r) continue;

for (var c = -1; c <= 7; c++) {

if (col + c <= -1 || this.moduleCount <= col + c) continue;

if ( (0 <= r && r <= 6 && (c === 0 || c === 6) ) || 

                     (0 <= c && c <= 6 && (r === 0 || r === 6) ) || 

                     (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {

this.modules[row + r][col + c] = true;

} else {

this.modules[row + r][col + c] = false;

}

}

}

},

getBestMaskPattern : function() {

var minLostPoint = 0;

var pattern = 0;

for (var i = 0; i < 8; i++) {

this.makeImpl(true, i);

var lostPoint = QRUtil.getLostPoint(this);

if (i === 0 || minLostPoint >  lostPoint) {

minLostPoint = lostPoint;

pattern = i;

}

}

return pattern;

},

createMovieClip : function(target_mc, instance_name, depth) {

var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);

var cs = 1;

this.make();



for (var row = 0; row < this.modules.length; row++) {

var y = row * cs;

for (var col = 0; col < this.modules[row].length; col++) {

var x = col * cs;

var dark = this.modules[row][col];

if (dark) {

qr_mc.beginFill(0, 100);

qr_mc.moveTo(x, y);

qr_mc.lineTo(x + cs, y);

qr_mc.lineTo(x + cs, y + cs);

qr_mc.lineTo(x, y + cs);

qr_mc.endFill();

}

}

}

return qr_mc;

},



setupTimingPattern : function() {

for (var r = 8; r < this.moduleCount - 8; r++) {

if (this.modules[r][6] !== null) {

continue;

}

this.modules[r][6] = (r % 2 === 0);

}

for (var c = 8; c < this.moduleCount - 8; c++) {

if (this.modules[6][c] !== null) {

continue;

}

this.modules[6][c] = (c % 2 === 0);

}

},

setupPositionAdjustPattern : function() {

var pos = QRUtil.getPatternPosition(this.typeNumber);

for (var i = 0; i < pos.length; i++) {

for (var j = 0; j < pos.length; j++) {

var row = pos[i];

var col = pos[j];

if (this.modules[row][col] !== null) {

continue;

}

for (var r = -2; r <= 2; r++) {

for (var c = -2; c <= 2; c++) {

if (Math.abs(r) === 2 || 

                            Math.abs(c) === 2 ||

                            (r === 0 && c === 0) ) {

this.modules[row + r][col + c] = true;

} else {

this.modules[row + r][col + c] = false;

}

}

}

}

}

},

setupTypeNumber : function(test) {

var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

        var mod;

for (var i = 0; i < 18; i++) {

mod = (!test && ( (bits >> i) & 1) === 1);

this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;

}

for (var x = 0; x < 18; x++) {

mod = (!test && ( (bits >> x) & 1) === 1);

this.modules[x % 3 + this.moduleCount - 8 - 3][Math.floor(x / 3)] = mod;

}

},

setupTypeInfo : function(test, maskPattern) {

var data = (this.errorCorrectLevel << 3) | maskPattern;

var bits = QRUtil.getBCHTypeInfo(data);

        var mod;

// vertical

for (var v = 0; v < 15; v++) {

mod = (!test && ( (bits >> v) & 1) === 1);

if (v < 6) {

this.modules[v][8] = mod;

} else if (v < 8) {

this.modules[v + 1][8] = mod;

} else {

this.modules[this.moduleCount - 15 + v][8] = mod;

}

}

// horizontal

for (var h = 0; h < 15; h++) {

mod = (!test && ( (bits >> h) & 1) === 1);

if (h < 8) {

this.modules[8][this.moduleCount - h - 1] = mod;

} else if (h < 9) {

this.modules[8][15 - h - 1 + 1] = mod;

} else {

this.modules[8][15 - h - 1] = mod;

}

}

// fixed module

this.modules[this.moduleCount - 8][8] = (!test);

},

mapData : function(data, maskPattern) {

var inc = -1;

var row = this.moduleCount - 1;

var bitIndex = 7;

var byteIndex = 0;

for (var col = this.moduleCount - 1; col > 0; col -= 2) {

if (col === 6) col--;

while (true) {

for (var c = 0; c < 2; c++) {

if (this.modules[row][col - c] === null) {

var dark = false;

if (byteIndex < data.length) {

dark = ( ( (data[byteIndex] >>> bitIndex) & 1) === 1);

}

var mask = QRUtil.getMask(maskPattern, row, col - c);

if (mask) {

dark = !dark;

}

this.modules[row][col - c] = dark;

bitIndex--;

if (bitIndex === -1) {

byteIndex++;

bitIndex = 7;

}

}

}

row += inc;

if (row < 0 || this.moduleCount <= row) {

row -= inc;

inc = -inc;

break;

}

}

}

}



};



QRCode.PAD0 = 0xEC;

QRCode.PAD1 = 0x11;



QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {

var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

var buffer = new QRBitBuffer();

for (var i = 0; i < dataList.length; i++) {

var data = dataList[i];

buffer.put(data.mode, 4);

buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );

data.write(buffer);

}



// calc num max data.

var totalDataCount = 0;

for (var x = 0; x < rsBlocks.length; x++) {

totalDataCount += rsBlocks[x].dataCount;

}



if (buffer.getLengthInBits() > totalDataCount * 8) {

throw new Error("code length overflow. (" + 

            buffer.getLengthInBits() + 

            ">" +  

            totalDataCount * 8 + 

            ")");

}



// end code

if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {

buffer.put(0, 4);

}



// padding

while (buffer.getLengthInBits() % 8 !== 0) {

buffer.putBit(false);

}



// padding

while (true) {

if (buffer.getLengthInBits() >= totalDataCount * 8) {

break;

}

buffer.put(QRCode.PAD0, 8);

if (buffer.getLengthInBits() >= totalDataCount * 8) {

break;

}

buffer.put(QRCode.PAD1, 8);

}



return QRCode.createBytes(buffer, rsBlocks);

};



QRCode.createBytes = function(buffer, rsBlocks) {



var offset = 0;

var maxDcCount = 0;

var maxEcCount = 0;

var dcdata = new Array(rsBlocks.length);

var ecdata = new Array(rsBlocks.length);

for (var r = 0; r < rsBlocks.length; r++) {



var dcCount = rsBlocks[r].dataCount;

var ecCount = rsBlocks[r].totalCount - dcCount;



maxDcCount = Math.max(maxDcCount, dcCount);

maxEcCount = Math.max(maxEcCount, ecCount);

dcdata[r] = new Array(dcCount);

for (var i = 0; i < dcdata[r].length; i++) {

dcdata[r][i] = 0xff & buffer.buffer[i + offset];

}

offset += dcCount;

var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);

var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);



var modPoly = rawPoly.mod(rsPoly);

ecdata[r] = new Array(rsPoly.getLength() - 1);

for (var x = 0; x < ecdata[r].length; x++) {

            var modIndex = x + modPoly.getLength() - ecdata[r].length;

ecdata[r][x] = (modIndex >= 0)? modPoly.get(modIndex) : 0;

}



}

var totalCodeCount = 0;

for (var y = 0; y < rsBlocks.length; y++) {

totalCodeCount += rsBlocks[y].totalCount;

}



var data = new Array(totalCodeCount);

var index = 0;



for (var z = 0; z < maxDcCount; z++) {

for (var s = 0; s < rsBlocks.length; s++) {

if (z < dcdata[s].length) {

data[index++] = dcdata[s][z];

}

}

}



for (var xx = 0; xx < maxEcCount; xx++) {

for (var t = 0; t < rsBlocks.length; t++) {

if (xx < ecdata[t].length) {

data[index++] = ecdata[t][xx];

}

}

}



return data;



};



module.exports = QRCode;



};



function resolve(base, request) {

  if (request === './index' || request === './../vendor/QRCode') return './index';

  var name = request.replace('./', '');

  if (name.indexOf('../') === 0) name = name.slice(3);

  return './' + name;

}



function load(name) {

  var module = { exports: {} };

  var localRequire = function(request) { return load(resolve(name, request)); };

  modules[name](module, module.exports, localRequire);

  return module.exports;

}

window.QRCodeLocal = load('./index');

window.QRErrorCorrectLevelLocal = load('./QRErrorCorrectLevel');

})();

