const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const HISTORY_KEY='matnhay-history-v1', GENDER_KEY='matnhay-gender-v1';
let selectedEye='left', fortunes=[];
const getHistory=()=>{try{return JSON.parse(localStorage.getItem(HISTORY_KEY)||'[]')}catch{return []}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function setNow(){const d=new Date();$('#time').value=`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`}
function lookup(time,eye,gender){const minute=Number(time.slice(0,2))*60+Number(time.slice(3,5));return fortunes.find(f=>{const a=toMinutes(f.startTime),b=toMinutes(f.endTime);const inRange=a<b?minute>=a&&minute<b:minute>=a||minute<b;return f.eye===eye&&f.gender===gender&&inRange})}
function toMinutes(t){return Number(t.slice(0,2))*60+Number(t.slice(3,5))}
function renderHistory(){const entries=getHistory();$('#history-list').innerHTML=entries.length?entries.map(e=>`<div class="entry"><strong>${esc(e.eye==='left'?'Mắt trái':'Mắt phải')} · ${esc(e.time)}</strong><small>${esc(e.date)} · ${esc(e.gender==='female'?'Nữ':'Nam')}</small><p>${esc(e.fortune)}</p></div>`).join(''):'<p class="empty">Chưa có lần xem nào. ♡</p>'}
function setTab(tab){$$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));$$('.page').forEach(p=>p.classList.toggle('active',p.id===tab));if(tab==='history')renderHistory()}
$$('.tab').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));
$$('.eye').forEach(b=>b.addEventListener('click',()=>{selectedEye=b.dataset.eye;$$('.eye').forEach(x=>x.classList.toggle('selected',x===b))}));
$('#now').addEventListener('click',setNow);
$('#default-gender').addEventListener('change',e=>{localStorage.setItem(GENDER_KEY,e.target.value);$('#gender').value=e.target.value});
$('#gender').addEventListener('change',e=>{$('#default-gender').value=e.target.value;localStorage.setItem(GENDER_KEY,e.target.value)});
$('#reveal').addEventListener('click',()=>{const time=$('#time').value,gender=$('#gender').value;if(!time){alert('Vui lòng chọn thời gian.');return}const found=lookup(time,selectedEye,gender);const fortune=found?.fortune||'Chưa có dữ liệu điềm báo cho thời gian này. Hãy thêm nội dung vào fortunes.json nhé!';const result=$('#result');result.hidden=false;result.innerHTML=`<div style="font-size:32px">🌸</div><h2>Điềm báo của em</h2><p class="period">${esc(found?.period||'')}</p><p><strong>${selectedEye==='left'?'Mắt trái':'Mắt phải'} · ${esc(time)} · ${gender==='female'?'Nữ':'Nam'}</strong></p><p>${esc(fortune)}</p><p class="hint">Theo quan niệm dân gian, chỉ mang tính tham khảo và giải trí, không có cơ sở khoa học.</p>`;if(found){const entries=getHistory();entries.unshift({id:Date.now(),date:new Date().toLocaleString('vi-VN'),time,eye:selectedEye,gender,fortune});localStorage.setItem(HISTORY_KEY,JSON.stringify(entries.slice(0,200)))}});
$('#clear').addEventListener('click',()=>{if(confirm('Em muốn xóa toàn bộ lịch sử?')){localStorage.removeItem(HISTORY_KEY);renderHistory()}});
(async()=>{setNow();const gender=localStorage.getItem(GENDER_KEY)||'female';$('#gender').value=gender;$('#default-gender').value=gender;try{const res=await fetch('fortunes.json');if(!res.ok)throw Error('Không tải được dữ liệu');const data=await res.json();fortunes=data.fortunes||[]}catch(e){console.error(e)}if('serviceWorker'in navigator)navigator.serviceWorker.register('./service-worker.js').catch(console.error)})();
