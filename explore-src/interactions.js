import './vivid.css';
document.addEventListener('click',event=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('reduce-motion'))return;
 const control=event.target.closest('button,a,summary');
 if(!control||control.disabled||event.detail===0)return;
 const wave=document.createElement('span');wave.className='click-wave';wave.setAttribute('aria-hidden','true');wave.style.left=event.clientX+'px';wave.style.top=event.clientY+'px';document.body.append(wave);setTimeout(()=>wave.remove(),550);
});

/* First-visit orientation stays available on every expedition page. */
const sectionHelp={
 missions:['Start here: choose your own expedition','Pick a mission to discover its story. New here? Follow the three steps below; you can explore the other sections whenever you like.'],
 mission:['Read the mission story','Start with the mission overview, then scroll through its discoveries and timeline. Mark the chapter as read to record it in your field journal.'],
 museum:['Explore hardware and its engineering','Choose a mission, then a system in Inside the machine. Read its purpose beside the official model. Load 3D when you are ready; the guide also works without a model.'],
 machine:['Learn what each part does','Choose a system button to read its purpose. Mobility means movement; power keeps the spacecraft running; instruments collect scientific measurements.'],
 simulator:['Try driving a rover','Read the briefing before starting. Follow the on-screen controls and objectives, watch your energy and stop before taking measurements. This is a learning simulation, not a live Mars feed.'],
 lab:['Try a short science activity','Choose an activity, read its goal and instructions, then try it. Your result explains what happened. Replay to practise; your field journal keeps your best score.'],
 control:['Plan how to use your energy','Read the available energy budget, adjust the allocations and review the feedback. Keep essential systems supplied before spending energy on driving.'],
 map:['See where the missions landed','Choose a mission or map marker to explore its location. These are historical landing locations, not live spacecraft positions.'],
 progress:['Review what you have explored','Find your completed chapters, activity scores and badges here. Progress is saved in this browser on this device; export your journal to keep a copy.'],
 credits:['Check the sources','Browse the original references, image credits and model sources. The activities use simplified educational scenarios.']
};
function addOrientation(){
 const main=document.querySelector('#main');
 if(!main||main.querySelector('.explorer-guide'))return;
 const route=location.hash.slice(1).split('/')[0]||'opening';
 if(route==='opening'||route==='simulator'&&main.querySelector('.expedition'))return;
 const info=route==='lab'&&location.hash.split('/')[1]==='atlas'?['Use the historical mission atlas','Choose a world, then a mission. Read the landing coordinates, final hardware location and NASA-linked precision notes. This reference is separate from the rover’s driving map.']:sectionHelp[route];if(!info)return;
 const guide=document.createElement('details');guide.className='explorer-guide';guide.open=route==='missions';
 guide.innerHTML=`<summary><span>YOUR EXPLORER GUIDE</span><strong>${info[0]}</strong><span class="guide-toggle">Help &amp; first steps</span></summary><div class="guide-body"><p>${info[1]}</p><ol class="starter-path"><li><span>01 / DISCOVER</span><h3>Meet the missions</h3><p>Learn what each explorer did and what it discovered.</p><a href="#mission/opportunity">Start with Opportunity &rarr;</a></li><li><span>02 / LOOK CLOSER</span><h3>Explore the hardware</h3><p>Rotate a model and learn how its systems work.</p><a href="#museum/opportunity">Open the 3D museum &rarr;</a></li><li><span>03 / TRY IT</span><h3>Put science to work</h3><p>Choose a mini-game and follow its instructions.</p><a href="#lab">Choose a science activity &rarr;</a></li></ol><p class="guide-tip"><strong>Finding your way:</strong> Use the navigation menu to switch sections. The Active explorer selector changes the mission you are studying. Your field journal records progress on this device.</p><details class="guide-glossary"><summary>Space words, explained</summary><dl><dt>Sol</dt><dd>A day on Mars, a little longer than an Earth day.</dd><dt>Traverse</dt><dd>A journey across the surface, with stops to investigate.</dd><dt>Instrument</dt><dd>A tool that takes scientific measurements.</dd><dt>Telemetry</dt><dd>Measurements and status data sent by a spacecraft.</dd><dt>Mission dossier</dt><dd>The story and key facts about a mission.</dd></dl></details></div>`;
 main.prepend(guide);
}
const orientationRoot=document.querySelector('#app');
if(orientationRoot){new MutationObserver(addOrientation).observe(orientationRoot,{childList:true,subtree:true});addOrientation();}
