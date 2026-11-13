import './vivid.css';
document.addEventListener('click',event=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('reduce-motion'))return;
 const control=event.target.closest('button,a,summary');
 if(!control||control.disabled||event.detail===0)return;
 const wave=document.createElement('span');wave.className='click-wave';wave.setAttribute('aria-hidden','true');wave.style.left=event.clientX+'px';wave.style.top=event.clientY+'px';document.body.append(wave);setTimeout(()=>wave.remove(),550);
});
