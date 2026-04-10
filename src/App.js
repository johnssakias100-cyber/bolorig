import { useState, useCallback } from "react";

const T = {
  el: {
    appSub:"Το Εργαλείο του Bolognese",tabCalc:"⚖️ Υπολ.",tabSpacing:"📏 Αποστ.",tabShots:"🔩 Βαρίδια",tabTorpedoes:"🔵 Τορπίλες",
    labelCount:"Τεμάχια βαριδιών",labelTarget:"Στόχος (γρ)",labelGroup:"Τρόπος κατανομής",labelFixed:"Α) Σταθερό νούμερο",labelVar:"Β) Μεταβλητό νούμερο",
    labelVarPer:"Αλλαγή νούμερου ανά:",fixedDesc:"Ίδιο νούμερο (±1 αν χρειαστεί)",varDesc:"Διαδοχικά νούμερα",labelDir:"Κατεύθυνση αύξησης",
    dirAsc:"▼ Μικρότερα → θηλιά",dirDesc:"▲ Μεγαλύτερα → θηλιά",
    btnReset2:"↺ Νέος Υπολογισμός",btnCalc:"⚖️ ΥΠΟΛΟΓΙΣΜΟΣ",resultLabel:"Αποτέλεσμα",targetLabel:"Στόχος",
    inRange:"✓ Εντός ορίων",outRange:"✗ Εκτός ορίων",composition:"Σύνθεση — Πλωτήρας → Θηλιά 🔗",perPiece:"γρ / τεμ.",
    diagTitle:"📏 Διάταξη — θηλιά = 0 ·",diagTotal:"cm σύνολο",floatTop:"Πλωτήρας / Φελλός",fromLoop:"cm από θηλιά",
    loopLabel:"🔗 Θηλιά = 0 cm",loopRef:"σημείο αναφοράς",
    spacingTitle:"Αποστάσεις από θηλιά 🔗 = 0 cm προς πλωτήρα.",spacingRepeat:"Η τελευταία γραμμή επαναλαμβάνεται.",
    colPcs:"Τεμάχια",colGap:"Κενό (cm)",rowTypeShot:"Βαρίδια",rowTypeBulk:"Bulk",rowTypeTorp:"Τορπίλη",
    selectTorp:"Επιλογή τορπίλης",torpAuto:"Αυτόματο (%)",torpList:"Από λίστα",torpPct:"Ποσοστό στόχου (%)",
    previewTitle:"Προεπισκόπηση (φελλός → θηλιά)",loopBottom:"🔗 Θηλιά = 0 cm",pcsUnit:"τεμ.",perEvery:"ανά",repeats:"(επαναλαμβάνεται)",
    shotsTitle:"Βαρίδια",torpedoTitle:"Τορπίλες",btnReset:"↺ Επαναφορά",btnAdd:"+ Προσθήκη",labelCode:"Κωδικός",labelGrams:"Γραμμάρια",btnSave:"✓ Αποθήκευση",
    saveTitle:"Αποθήκευση:",savePlaceholder:"π.χ. Χίος 2γρ",btnSaveOk:"💾 Αποθήκευση",loadTitle:"Αποθηκευμένες ρυθμίσεις",btnLoad:"↩ Φόρτωση",
    noPresets:"Δεν υπάρχουν αποθηκευμένες ρυθμίσεις.",toastSaved:"✓ Αποθηκεύτηκε",toastLoaded:"↩ Φορτώθηκε",pcsOf:"τεμ.",grUnit:"γρ",footer:"BOLO RIG PRO",
    nearFloat:"↑ Κοντά στον πλωτήρα",nearLoop:"↓ Κοντά στη θηλιά",
  },
  en: {
    appSub:"The Ultimate Bolognese Rig Tool",tabCalc:"⚖️ Calc",tabSpacing:"📏 Spacing",tabShots:"🔩 Shots",tabTorpedoes:"🔵 Torpedoes",
    labelCount:"Number of shots",labelTarget:"Target (g)",labelGroup:"Distribution mode",labelFixed:"A) Fixed size",labelVar:"B) Variable size",
    labelVarPer:"Change size every:",fixedDesc:"Same size (±1 if needed)",varDesc:"Sequential sizes",labelDir:"Direction",
    dirAsc:"▼ Smaller → loop",dirDesc:"▲ Larger → loop",
    btnReset2:"↺ New Calculation",btnCalc:"⚖️ CALCULATE",resultLabel:"Result",targetLabel:"Target",
    inRange:"✓ Within range",outRange:"✗ Out of range",composition:"Composition — Float → Loop 🔗",perPiece:"g / pc.",
    diagTitle:"📏 Layout — loop = 0 ·",diagTotal:"cm total",floatTop:"Float / Bobber",fromLoop:"cm from loop",
    loopLabel:"🔗 Loop = 0 cm",loopRef:"reference point",
    spacingTitle:"Distances from loop 🔗 = 0 cm toward float.",spacingRepeat:"Last rule repeats.",
    colPcs:"Pieces",colGap:"Gap (cm)",rowTypeShot:"Shots",rowTypeBulk:"Bulk",rowTypeTorp:"Torpedo",
    selectTorp:"Select torpedo",torpAuto:"Auto (%)",torpList:"From list",torpPct:"% of target",
    previewTitle:"Preview (float → loop)",loopBottom:"🔗 Loop = 0 cm",pcsUnit:"pcs",perEvery:"every",repeats:"(repeats)",
    shotsTitle:"Shots",torpedoTitle:"Torpedoes",btnReset:"↺ Reset",btnAdd:"+ Add",labelCode:"Code",labelGrams:"Grams",btnSave:"✓ Save",
    saveTitle:"Save:",savePlaceholder:"e.g. Lake 2g",btnSaveOk:"💾 Save",loadTitle:"Saved setups",btnLoad:"↩ Load",
    noPresets:"No saved setups.",toastSaved:"✓ Saved",toastLoaded:"↩ Loaded",pcsOf:"pcs.",grUnit:"g",footer:"BOLO RIG PRO",
    nearFloat:"↑ Near float",nearLoop:"↓ Near loop",
  },
};

const DEFAULT_SHOTS = [
  {id:1,code:"No 6/0",grams:1.057},{id:2,code:"No 5/0",grams:0.705},{id:3,code:"No 4/0",grams:0.532},
  {id:4,code:"No 3/0",grams:0.475},{id:5,code:"No 2/0",grams:0.394},{id:6,code:"No 1/0",grams:0.370},
  {id:7,code:"No 0",grams:0.347},{id:8,code:"No 1",grams:0.288},{id:9,code:"No 2",grams:0.242},
  {id:10,code:"No 3",grams:0.194},{id:11,code:"No 4",grams:0.162},{id:12,code:"No 6",grams:0.102},
  {id:13,code:"No 8",grams:0.070},{id:14,code:"No 10",grams:0.040},
];

const DEFAULT_TORPEDOES = [
  {id:"t1",code:"TOJ0020",grams:0.20},{id:"t2",code:"TOJ0030",grams:0.30},{id:"t3",code:"TOJ0040",grams:0.40},
  {id:"t4",code:"TOJ0050",grams:0.50},{id:"t5",code:"TOJ0060",grams:0.60},{id:"t6",code:"TOJ0080",grams:0.80},
  {id:"t7",code:"TOJ0100",grams:1.00},{id:"t8",code:"TOJ0125",grams:1.25},{id:"t9",code:"TOJ0150",grams:1.50},
  {id:"t10",code:"TOJ0175",grams:1.75},{id:"t11",code:"TOJ0200",grams:2.00},{id:"t12",code:"TOJ0225",grams:2.25},
  {id:"t13",code:"TOJ0250",grams:2.50},{id:"t14",code:"TOJ0300",grams:3.00},{id:"t15",code:"TOJ0350",grams:3.50},
  {id:"t16",code:"TOJ0400",grams:4.00},{id:"t17",code:"TOJ0450",grams:4.50},{id:"t18",code:"TOJ0500",grams:5.00},
  {id:"t19",code:"TOJ0600",grams:6.00},
];

const GC = ["#e53935","#fb8c00","#fdd835","#43a047","#1e88e5","#8e24aa","#00acc1","#6d4c41"];
const inp = (x={}) => ({width:"100%",padding:"9px 10px",background:"#071830",border:"1.5px solid #1e4d8a",borderRadius:7,color:"#e3f2fd",fontSize:15,fontWeight:600,outline:"none",boxSizing:"border-box",...x});
const clrBtn = {position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"#1e4d8a",color:"#90caf9",border:"none",borderRadius:4,width:20,height:20,fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,padding:0};

// ── Algorithm ──
function calcTotal(items){return items.reduce((s,x)=>s+x.grams,0);}

function findBest(shots,targetGrams,count,groupSize,direction){
  if(count<=0)return{success:false,items:[],total:0};
  const sorted=[...shots].sort((a,b)=>b.grams-a.grams);
  const eMax=targetGrams-0.001,eMin=targetGrams-0.060;
  const ok=t=>t<=eMax&&t>=eMin;
  if(groupSize==="fixed"){
    for(const s of sorted){const t=s.grams*count;if(ok(t))return{success:true,items:Array(count).fill(s),total:t};}
    for(let i=0;i<sorted.length-1;i++){const A=sorted[i],B=sorted[i+1];for(let k=1;k<count;k++){const t=A.grams*k+B.grams*(count-k);if(ok(t))return{success:true,items:[...Array(k).fill(A),...Array(count-k).fill(B)],total:t};}}
    return{success:false,items:Array(count).fill(sorted[0]),total:sorted[0].grams*count};
  }
  const gs=groupSize,maxG=Math.ceil(count/gs);
  for(let ng=maxG;ng>=1;ng--){const bs2=Math.floor(count/ng),ex=count%ng;
    for(let si=0;si<=sorted.length-ng;si++){const pat=[],gsz=[];
      for(let g=0;g<ng;g++){pat.push(sorted[direction==="asc"?si+g:si+(ng-1-g)]);gsz.push(g<ex?bs2+1:bs2);}
      const its=[];for(let g=0;g<pat.length;g++)for(let x=0;x<gsz[g];x++)its.push(pat[g]);
      const t=calcTotal(its);if(ok(t))return{success:true,items:its,total:t};
    }
  }
  const items=[];let rem=eMax;
  for(let i=0;i<count;i++){const per=rem/(count-i);const best=sorted.find(s=>s.grams<=per)||sorted[sorted.length-1];items.push(best);rem-=best.grams;}
  const total=calcTotal(items);
  return{success:ok(total),items,total};
}

function getGroups(items){const g=[];let i=0;while(i<items.length){const c=items[i];let j=i;while(j<items.length&&items[j].code===c.code)j++;g.push({shot:c,cnt:j-i});i=j;}return g;}

function buildPositions(items,spacingRows,torpedoes){
  const pos=[];let cursor=0,si=0;
  let skipNextSpacing=false;
  for(let ri=0;ri<spacingRows.length;ri++){
    const row=spacingRows[ri],isLast=ri===spacingRows.length-1,cm=parseFloat(row.spacing)||0;
    if(row.type==="torpedo"){
      const tp=row.torpedoMode==="list"
        ? torpedoes&&torpedoes.find(t=>t.id===row.torpedoId)
        : null;
      const grams=row.torpedoMode==="list"
        ? (tp?tp.grams:0)
        : ((parseFloat(row.torpedoPct)||60)/100*(parseFloat(row.torpedoTarget)||2));
      const code=row.torpedoMode==="list"?(tp?tp.code:"?"):`Auto ${(parseFloat(row.torpedoPct)||60)}%`;
      if(pos.length>0||cursor>0)cursor+=cm;
      skipNextSpacing=false;
      pos.push({shot:{grams,code,isTorpedo:true,id:row.id},distFromHook:cursor,spacingCm:cm,rowType:"torpedo"});
      continue;
    }
    const rc=parseInt(row.count)||1,isBulk=row.type==="bulk";
    const bulkBefore=isBulk?(parseFloat(row.spacingBefore)||0):0;
    const bulkGap=isBulk?(parseFloat(row.spacing)||0):0;
    if(isBulk&&bulkBefore>0)cursor+=bulkBefore;
    for(let x=0;x<rc;x++){
      if(si>=items.length&&!isLast&&!isBulk)break;
      const idx=Math.min(si,items.length-1);
      if(!isBulk){
        if(pos.length>0||cursor>0){
          if(!skipNextSpacing)cursor+=cm;
          skipNextSpacing=false;
        }
      }
      const isFirstOfBulk=isBulk&&x===0;
      const isLastOfBulk=isBulk&&x===rc-1;
      pos.push({shot:items[idx],distFromHook:cursor,spacingCm:0,rowType:row.type||"shot",
        bulkBefore:isFirstOfBulk?bulkBefore:0,
        bulkAfter:isLastOfBulk?bulkGap:0});si++;
    }
    if(isBulk&&bulkGap>0&&pos.length>0){cursor+=bulkGap;skipNextSpacing=true;}
    if(isLast&&si<items.length){while(si<items.length){if(!isBulk){if(!skipNextSpacing)cursor+=cm;skipNextSpacing=false;}pos.push({shot:items[si],distFromHook:cursor,spacingCm:isBulk?0:cm,rowType:row.type||"shot",bulkBefore:0,bulkAfter:0});si++;}}
  }
  return pos;
}

// ── Torpedo shape: vertical olive ──
function TorpedoShape({grams}){
  const w=Math.round(10+Math.min(8,grams*5));
  const h=Math.round(22+Math.min(18,grams*8));
  return(
    <div style={{
      width:w,height:h,
      background:"linear-gradient(160deg,#90caf9 0%,#1976d2 40%,#0d47a1 80%,#082878 100%)",
      borderRadius:"50% 50% 50% 50% / 38% 38% 62% 62%",
      border:"2px solid #42a5f5",
      boxShadow:"0 0 10px #2196f360, inset 0 2px 4px #ffffff30",
      flexShrink:0,
    }}/>
  );
}

// ── Vertical Rig Diagram (proportional scale) ──
function RigDiagram({positions,totalCm,t,lang}){
  if(!positions||positions.length===0)return null;

  const PPC=Math.min(8,Math.max(3,Math.round(380/Math.max(totalCm,10))));
  const FLOAT_H=110;
  const HOOK_H=50;
  const totalH=FLOAT_H+totalCm*PPC+HOOK_H;
  const hasTorp=positions.some(p=>p.shot.isTorpedo);

  const BULK_COL="#e53935";
  const TORP_COL="#42a5f5";
  const SHOT_COL="#ffa000";

  // Ruler ticks every 5 or 10cm
  const tickStep=totalCm<=50?5:10;
  const ticks=[];
  for(let c=0;c<=totalCm;c+=tickStep)ticks.push(c);

  return(
    <div style={{background:"linear-gradient(180deg,#071d4a,#091830)",borderRadius:14,border:"1.5px solid #1e4d8a",padding:"14px 8px",marginTop:8}}>
      <div style={{fontSize:10,color:"#90caf9",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{t.diagTitle} {totalCm} {t.diagTotal}</div>
      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:9,height:9,borderRadius:"50%",background:BULK_COL}}/><span style={{fontSize:10,color:BULK_COL}}>BULK</span></div>
        <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:9,height:9,borderRadius:"50%",background:SHOT_COL}}/><span style={{fontSize:10,color:SHOT_COL}}>{lang==="el"?"Βαρίδι":"Shot"}</span></div>
        {hasTorp&&<div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:7,height:12,borderRadius:"50%",background:TORP_COL}}/><span style={{fontSize:10,color:TORP_COL}}>{lang==="el"?"Τορπίλη":"Torpedo"}</span></div>}
      </div>

      <div style={{display:"flex",gap:0}}>

        {/* RULER col: left half = gap labels, right half = tick numbers */}
        <div style={{width:56,flexShrink:0,position:"relative",height:totalH}}>

          {/* Tick numbers — right side */}
          {ticks.map(c=>{
            const y=FLOAT_H+(totalCm-c)*PPC;
            const isZero=c===0;
            return(
              <div key={c} style={{position:"absolute",top:y,right:0,display:"flex",alignItems:"center",gap:2,transform:"translateY(-50%)"}}>
                <span style={{fontSize:8,color:isZero?"#ffd740":"#546e7a",fontWeight:700,lineHeight:1,whiteSpace:"nowrap"}}>{c}</span>
                <div style={{width:isZero?6:4,height:1,background:isZero?"#ffd740":"#37474f"}}/>
              </div>
            );
          })}

          {/* Gap labels — left side, don't overlap ticks */}
          {positions.map((pos,i)=>{
            if(i===0)return null;
            const prev=positions[i-1];
            if(pos.rowType==="bulk"||prev.rowType==="bulk"||pos.rowType==="torpedo"||prev.rowType==="torpedo")return null;
            const gap=parseFloat((pos.distFromHook-prev.distFromHook).toFixed(1));
            if(gap<=0)return null;
            const midCm=(pos.distFromHook+prev.distFromHook)/2;
            const midPx=FLOAT_H+(totalCm-midCm)*PPC;
            return(
              <div key={`sp${i}`} style={{position:"absolute",top:midPx,left:0,transform:"translateY(-50%)"}}>
                <span style={{fontSize:9,color:"#ffd740",fontWeight:800,lineHeight:1,whiteSpace:"nowrap"}}>{gap}</span>
              </div>
            );
          })}

          {/* Bulk BEFORE gap label — left side */}
          {positions.map((pos,i)=>{
            if(pos.rowType!=="bulk"||!pos.bulkBefore||pos.bulkBefore<=0)return null;
            if(i>0&&positions[i-1].rowType==="bulk")return null;
            const prev=positions[i-1];
            if(!prev)return null;
            const midCm=(pos.distFromHook+prev.distFromHook)/2;
            const midPx=FLOAT_H+(totalCm-midCm)*PPC;
            return(
              <div key={`bb${i}`} style={{position:"absolute",top:midPx,left:0,transform:"translateY(-50%)"}}>
                <span style={{fontSize:9,color:"#ffd740",fontWeight:800,lineHeight:1,whiteSpace:"nowrap"}}>{pos.bulkBefore}</span>
              </div>
            );
          })}

          {/* Hook 0 label — bottom of ruler */}
          <div style={{position:"absolute",top:FLOAT_H+totalCm*PPC+6,left:0}}>
            <span style={{fontSize:9,fontWeight:800,color:"#ffd740"}}>🔗0</span>
          </div>

          {/* Bulk AFTER gap label — left side */}
          {positions.map((pos,i)=>{
            if(pos.rowType!=="bulk"||!pos.bulkAfter||pos.bulkAfter<=0)return null;
            if(i<positions.length-1&&positions[i+1].rowType==="bulk")return null;
            const next=positions[i+1];
            if(!next)return null;
            const midCm=(pos.distFromHook+next.distFromHook)/2;
            const midPx=FLOAT_H+(totalCm-midCm)*PPC;
            return(
              <div key={`ba${i}`} style={{position:"absolute",top:midPx,left:0,transform:"translateY(-50%)"}}>
                <span style={{fontSize:9,color:"#ffd740",fontWeight:800,lineHeight:1,whiteSpace:"nowrap"}}>{pos.bulkAfter}</span>
              </div>
            );
          })}
        </div>

        {/* LINE + DOTS col */}
        <div style={{width:34,flexShrink:0,position:"relative",height:totalH,display:"flex",flexDirection:"column",alignItems:"center"}}>

          {/* Float at top */}
          <div style={{height:FLOAT_H,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end"}}>
            <div style={{width:3,height:8,background:"#78909c",borderRadius:2}}/>
            <div style={{width:8,height:4,background:"#ffd740",borderRadius:2}}/>
            <div style={{width:3,height:6,background:"#78909c",borderRadius:2}}/>
            <div style={{width:4,height:12,background:"linear-gradient(180deg,#ef5350 50%,#fdd835 50%)",borderRadius:"3px 3px 0 0"}}/>
            <div style={{width:22,height:34,background:"linear-gradient(160deg,#b0c4de,#4a7fa0,#2c5f80)",borderRadius:"50% 50% 44% 44%/58% 58% 42% 42%",border:"2px solid #90caf9",position:"relative",overflow:"hidden",flexShrink:0}}>
              <div style={{position:"absolute",top:9,left:2,right:2,height:5,background:"#e53935",borderRadius:1}}/>
              <div style={{position:"absolute",top:14,left:2,right:2,height:3,background:"#fdd835",borderRadius:1}}/>
            </div>
            <div style={{width:3,height:5,background:"#90caf9",borderRadius:"0 0 2px 2px"}}/>
          </div>

          {/* Vertical fishing line with positioned shot markers */}
          <div style={{position:"relative",height:totalCm*PPC,width:"100%",display:"flex",justifyContent:"center"}}>
            {/* The line */}
            <div style={{position:"absolute",top:0,bottom:0,width:2.5,background:"linear-gradient(180deg,#546e7a,#78909c)",borderRadius:2}}/>

            {/* Shot dots - bulk shown as multiple stacked circles */}
            {positions.map((pos,i)=>{
              const isBulk=pos.rowType==="bulk",isTorp=pos.shot.isTorpedo===true;
              const topPx=(totalCm-pos.distFromHook)*PPC;
              const bs=Math.round(9+Math.min(7,pos.shot.grams*7));

              if(isTorp){
                const tw=Math.round(7+Math.min(5,pos.shot.grams*3));
                const th=Math.round(14+Math.min(12,pos.shot.grams*6));
                return(
                  <div key={i} style={{position:"absolute",top:topPx,left:"50%",transform:"translate(-50%,-50%)",zIndex:2,
                    width:tw,height:th,
                    background:`linear-gradient(160deg,${TORP_COL} 0%,#1976d2 60%,#0d47a1 100%)`,
                    borderRadius:"50% 50% 50% 50% / 38% 38% 62% 62%",
                    border:`1.5px solid ${TORP_COL}`,boxShadow:`0 0 6px ${TORP_COL}55`}}/>
                );
              }

              if(isBulk){
                let groupStart=i;
                while(groupStart>0&&positions[groupStart-1].rowType==="bulk")groupStart--;
                if(i!==groupStart)return null;
                let groupEnd=i;
                while(groupEnd<positions.length-1&&positions[groupEnd+1].rowType==="bulk")groupEnd++;
                const count=groupEnd-groupStart+1;
                // Fixed 5cm visual height on ruler
                const fixedH=5*PPC;
                const dotSize=Math.min(bs,Math.round(fixedH/count)+2);
                return(
                  <div key={i} style={{position:"absolute",top:topPx,left:"50%",
                    transform:`translate(-50%,-${fixedH/2}px)`,
                    zIndex:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",
                    height:fixedH}}>
                    {Array.from({length:count}).map((_,k)=>(
                      <div key={k} style={{width:dotSize,height:dotSize,borderRadius:"50%",flexShrink:0,
                        background:`radial-gradient(circle at 35% 35%,${BULK_COL}bb,#0d1f35)`,
                        border:`2px solid ${BULK_COL}`,boxShadow:`0 0 4px ${BULK_COL}55`}}/>
                    ))}
                  </div>
                );
              }

              return(
                <div key={i} style={{position:"absolute",top:topPx,left:"50%",transform:"translate(-50%,-50%)",zIndex:2,
                  width:bs,height:bs,borderRadius:"50%",
                  background:`radial-gradient(circle at 35% 35%,${SHOT_COL}bb,#0d1f35)`,
                  border:`2px solid ${SHOT_COL}`,boxShadow:`0 0 5px ${SHOT_COL}55`}}/>
              );
            })}
          </div>

          {/* Hook at bottom */}
          <div style={{height:HOOK_H,display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{width:18,height:11,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#a0aab4,#546e7a)",border:"2px solid #78909c",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8}}>🔗</div>
            <div style={{width:2,height:8,background:"#546e7a"}}/>
            <div style={{fontSize:18,lineHeight:1}}>🪝</div>
          </div>
        </div>

        {/* LABELS col */}
        <div style={{flex:1,position:"relative",height:totalH,minWidth:0,paddingLeft:8}}>

          {/* Float label - fixed at very top */}
          <div style={{position:"absolute",top:6,left:8}}>
            <div style={{fontSize:10,color:"#90caf9",fontWeight:700}}>{t.floatTop}</div>
            <div style={{fontSize:9,color:"#546e7a"}}>{totalCm}cm</div>
          </div>

          {/* Shot labels - bulk grouped, show only first */}
          {positions.map((pos,i)=>{
            const isBulk=pos.rowType==="bulk",isTorp=pos.shot.isTorpedo===true;
            const col=isTorp?TORP_COL:isBulk?BULK_COL:SHOT_COL;
            // For bulk: label at center of 5cm visual span
            const topPx=isBulk
              ? FLOAT_H+(totalCm-(pos.distFromHook-2.5))*PPC
              : FLOAT_H+(totalCm-pos.distFromHook)*PPC;

            if(isBulk&&i>0&&positions[i-1].rowType==="bulk")return null;
            let bulkCount=0;
            if(isBulk){for(let j=i;j<positions.length&&positions[j].rowType==="bulk";j++)bulkCount++;}

            return(
              <div key={`lbl${i}`} style={{position:"absolute",top:topPx,left:8,transform:"translateY(-50%)",lineHeight:1.3}}>
                <span style={{fontSize:10,fontWeight:800,color:col,whiteSpace:"nowrap"}}>
                  {isTorp?"🔵 ":""}{isBulk?`${bulkCount}× ${pos.shot.code}`:pos.shot.code}
                  {isBulk&&<span style={{fontSize:8,marginLeft:3,color:BULK_COL,background:"#e5393520",borderRadius:2,padding:"1px 3px"}}>BULK</span>}
                  <span style={{fontSize:9,color:isBulk?BULK_COL:"#78909c",marginLeft:4}}>
                    {isBulk?`${pos.shot.grams.toFixed(3)}g/τεμ`:pos.shot.grams.toFixed(isTorp?2:3)+"g"}
                  </span>
                </span>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}



function Panel({children}){return<div style={{background:"linear-gradient(135deg,#0d2245,#091830)",borderRadius:"0 12px 12px 12px",border:"1px solid #1a3d6e",padding:"18px 14px",marginBottom:14,boxShadow:"0 4px 28px #00000050"}}>{children}</div>;}
function Field({label,children,mb=16}){return<div style={{marginBottom:mb}}><label style={{display:"block",fontSize:10,color:"#90caf9",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{label}</label>{children}</div>;}

export default function App(){
  const [lang,setLang]=useState("el");
  const t=T[lang];
  const [shots,setShots]=useState(DEFAULT_SHOTS);
  const [countStr,setCountStr]=useState("8");
  const [targetStr,setTargetStr]=useState("2.00");
  const [groupSize,setGroupSize]=useState("fixed");
  const [direction,setDirection]=useState("asc");
  const [result,setResult]=useState(null);
  const [activeTab,setActiveTab]=useState("calc");
  const [spacingRows,setSpacingRows]=useState([]);
  const [showAddShot,setShowAddShot]=useState(false);
  const [newCode,setNewCode]=useState("");
  const [newGrams,setNewGrams]=useState("");
  const [torpedoes,setTorpedoes]=useState(DEFAULT_TORPEDOES);
  const [showAddTorp,setShowAddTorp]=useState(false);
  const [newTorpCode,setNewTorpCode]=useState("");
  const [newTorpGrams,setNewTorpGrams]=useState("");
  const [presets,setPresets]=useState([]);
  const [presetName,setPresetName]=useState("");
  const [showSave,setShowSave]=useState(false);
  const [showLoad,setShowLoad]=useState(false);
  const [toast,setToast]=useState(null);

  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),2500);};
  const count=parseInt(countStr)||0;
  const targetGrams=parseFloat(targetStr)||0;

  const calculate=useCallback(()=>{
    if(!count||!targetGrams)return;
    // Count how many torpedo rows exist in spacingRows and their weights
    const torpRows=spacingRows.filter(r=>r.type==="torpedo");
    let torpTotal=0;
    const torpItems=[];
    torpRows.forEach(row=>{
      let grams=0,code="?";
      if(row.torpedoMode==="list"){
        const tp=torpedoes.find(t2=>t2.id===row.torpedoId);
        if(tp){grams=tp.grams;code=tp.code;}
      } else {
        const pct=(parseFloat(row.torpedoPct)||60)/100;
        grams=targetGrams*pct;
        // Find closest torpedo
        const closest=torpedoes.reduce((b,t2)=>Math.abs(t2.grams-grams)<Math.abs(b.grams-grams)?t2:b);
        grams=closest.grams;code=closest.code;
      }
      torpTotal+=grams;
      torpItems.push({grams,code,isTorpedo:true,id:row.id});
    });
    const remainTarget=targetGrams-torpTotal;
    const MX=targetGrams-0.001,MN=targetGrams-0.060;
    if(count-torpRows.length<=0){
      // Only torpedoes
      setResult({success:torpTotal<=MX&&torpTotal>=MN,items:torpItems,total:torpTotal,isTorpedo:torpItems.length>0,torpedoShot:torpItems[0]});
      return;
    }
    const res=findBest(shots,remainTarget+0.001,count-torpRows.length,groupSize,direction);
    const allItems=[...(res.items||[]),...torpItems];
    const total=(res.total||0)+torpTotal;
    setResult({...res,items:allItems,total,success:total<=MX&&total>=MN,isTorpedo:torpItems.length>0,torpedoShot:torpItems[0]});
  },[shots,targetGrams,count,groupSize,direction,spacingRows,torpedoes]);

  const addShot=()=>{if(!newCode||!newGrams)return;const g=parseFloat(newGrams);if(isNaN(g)||g<=0)return;setShots(p=>[...p,{id:Date.now(),code:newCode,grams:g}]);setNewCode("");setNewGrams("");setShowAddShot(false);};
  const removeShot=id=>setShots(p=>p.filter(s=>s.id!==id));
  const addTorpedo=()=>{if(!newTorpCode||!newTorpGrams)return;const g=parseFloat(newTorpGrams);if(isNaN(g)||g<=0)return;setTorpedoes(p=>[...p,{id:"tc"+Date.now(),code:newTorpCode,grams:g}]);setNewTorpCode("");setNewTorpGrams("");setShowAddTorp(false);};
  const removeTorpedo=id=>setTorpedoes(p=>p.filter(t2=>t2.id!==id));

  // Β FIX: "κοντά στον πλωτήρα" = end of array (high index = far from hook = near float)
  // "κοντά στη θηλιά" = start of array (index 0 = near hook)
  const addSpacingRow=(pos="end",rt="shot")=>{
    const r={id:Date.now(),count:"1",spacing:"10",type:rt,torpedoMode:"auto",torpedoPct:"60",torpedoId:"",torpedoTarget:targetStr};
    if(pos==="end")setSpacingRows(p=>[...p,r]);   // near loop = append (shown at bottom)
    else setSpacingRows(p=>[r,...p]);             // near float = prepend (shown at top)
  };
  const removeSpacingRow=id=>setSpacingRows(p=>p.filter(r=>r.id!==id));
  const updateSpacingRow=(id,field,val)=>setSpacingRows(p=>p.map(r=>r.id===id?{...r,[field]:val}:r));
  const savePreset=()=>{if(!presetName.trim())return;const pr={id:Date.now(),name:presetName.trim(),grams:targetStr,count:countStr,groupSize,direction,spacingRows:spacingRows.map(r=>({...r})),createdAt:new Date().toLocaleDateString()};setPresets(p=>[pr,...p.filter(x=>x.name!==pr.name)]);setPresetName("");setShowSave(false);showToast(`${t.toastSaved}: "${pr.name}"`);};
  const loadPreset=p=>{setCountStr(p.count);setTargetStr(p.grams);setGroupSize(p.groupSize);setDirection(p.direction);setSpacingRows(p.spacingRows.map(r=>({...r,id:Date.now()+Math.random()})));setResult(null);setShowLoad(false);showToast(`${t.toastLoaded}: "${p.name}"`);};
  const deletePreset=id=>setPresets(p=>p.filter(x=>x.id!==id));

  const orderedGroups=result?getGroups(result.items.filter(x=>!x.isTorpedo)):[];
  const positions=result?buildPositions([...result.items.filter(x=>!x.isTorpedo)].reverse(),spacingRows,torpedoes):[];
  const totalLineCm=positions.length>0?positions[positions.length-1].distFromHook:0;

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060f1e,#0b1e3d,#0d2550)",fontFamily:"'Trebuchet MS',sans-serif",color:"#e8f4ff",paddingBottom:48}}>
      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:toast.ok?"#1b5e20":"#b71c1c",color:"#fff",padding:"10px 22px",borderRadius:10,fontWeight:700,fontSize:14,zIndex:9999}}>{toast.msg}</div>}

      {/* Header */}
      <div style={{background:"linear-gradient(90deg,#071d4a,#1254a8,#071d4a)",borderBottom:"3px solid #2196f3",padding:"14px 16px 12px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 4px 24px #00000070"}}>
        <div style={{width:44,height:44,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#ffd740,#e65100)",border:"3px solid #fff3",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:20}}>🎣</span></div>
        <div style={{flex:1}}><div style={{fontSize:17,fontWeight:900,color:"#fff"}}>Bolo Rig Pro</div><div style={{fontSize:10,color:"#90caf9",letterSpacing:2,textTransform:"uppercase"}}>{t.appSub}</div></div>
        <button onClick={()=>setLang(l=>l==="el"?"en":"el")} style={{background:"linear-gradient(135deg,#1565c0,#0d47a1)",color:"#fff",border:"2px solid #42a5f5",borderRadius:8,padding:"6px 10px",fontWeight:900,fontSize:13,cursor:"pointer"}}>{lang==="el"?"🇬🇧 EN":"🇬🇷 GR"}</button>
        <button onClick={()=>{setShowLoad(v=>!v);setShowSave(false);}} style={{background:"#1565c0",color:"#fff",border:"none",borderRadius:7,padding:"6px 9px",fontWeight:700,fontSize:11,cursor:"pointer"}}>📂</button>
        <button onClick={()=>{setShowSave(v=>!v);setShowLoad(false);}} style={{background:"#2e7d32",color:"#fff",border:"none",borderRadius:7,padding:"6px 9px",fontWeight:700,fontSize:11,cursor:"pointer"}}>💾</button>
      </div>

      {showSave&&<div style={{background:"#0a2a14",border:"1px solid #2e7d32",borderTop:"none",padding:"12px 16px",display:"flex",gap:8,alignItems:"center"}}>
        <div style={{flex:1}}><div style={{fontSize:10,color:"#69f0ae",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{t.saveTitle}</div><input value={presetName} onChange={e=>setPresetName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&savePreset()} placeholder={t.savePlaceholder} style={inp({borderColor:"#2e7d32",background:"#071e0f",fontSize:13})}/></div>
        <button onClick={savePreset} style={{marginTop:20,background:"#2e7d32",color:"#fff",border:"none",borderRadius:8,padding:"10px 14px",fontWeight:700,fontSize:13,cursor:"pointer"}}>{t.btnSaveOk}</button>
      </div>}

      {showLoad&&<div style={{background:"#071830",border:"1px solid #1565c0",borderTop:"none",padding:"12px 16px",maxHeight:260,overflowY:"auto"}}>
        <div style={{fontSize:10,color:"#90caf9",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{t.loadTitle} ({presets.length})</div>
        {presets.length===0&&<div style={{fontSize:13,color:"#546e7a"}}>{t.noPresets}</div>}
        {presets.map(p=><div key={p.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#0d2040",border:"1px solid #1e4d8a",borderRadius:8,padding:"10px 12px",marginBottom:6}}>
          <div onClick={()=>loadPreset(p)} style={{flex:1,cursor:"pointer"}}><div style={{fontWeight:700,fontSize:14,color:"#e3f2fd"}}>{p.name}</div><div style={{fontSize:11,color:"#546e7a"}}>{p.count} {t.pcsOf} · {p.grams} {t.grUnit}</div></div>
          <div style={{display:"flex",gap:6,marginLeft:8}}><button onClick={()=>loadPreset(p)} style={{background:"#1565c0",color:"#fff",border:"none",borderRadius:6,padding:"5px 9px",fontWeight:700,fontSize:12,cursor:"pointer"}}>{t.btnLoad}</button><button onClick={()=>deletePreset(p.id)} style={{background:"#c6282818",color:"#ef5350",border:"1px solid #c6282840",borderRadius:6,padding:"5px 7px",fontWeight:700,fontSize:12,cursor:"pointer"}}>✕</button></div>
        </div>)}
      </div>}

      {/* Tabs */}
      <div style={{display:"flex",padding:"14px 8px 0",gap:2}}>
        {[{id:"calc",label:t.tabCalc},{id:"spacing",label:t.tabSpacing},{id:"shots",label:t.tabShots},{id:"torpedoes",label:t.tabTorpedoes}].map(tab=>(
          <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{flex:1,padding:"8px 4px",background:activeTab===tab.id?"linear-gradient(180deg,#1565c0,#0d47a1)":"#ffffff0a",color:activeTab===tab.id?"#fff":"#78909c",border:"none",borderRadius:"8px 8px 0 0",fontWeight:700,fontSize:10,cursor:"pointer",borderBottom:activeTab===tab.id?"3px solid #2196f3":"3px solid transparent",textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{tab.label}</button>
        ))}
      </div>

      <div style={{padding:"0 16px"}}>

        {/* CALC TAB */}
        {activeTab==="calc"&&<div>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:6}}>
            <button onClick={()=>{setCountStr("8");setTargetStr("2.00");setGroupSize("fixed");setDirection("asc");setResult(null);}} style={{background:"#37474f",color:"#90caf9",border:"1px solid #546e7a",borderRadius:8,padding:"7px 14px",fontWeight:700,fontSize:12,cursor:"pointer"}}>↺ Reset</button>
          </div>
          <Panel>
            <Field label={t.labelCount} mb={12}>
              <div style={{position:"relative"}}><input type="number" min={1} max={40} value={countStr} onChange={e=>setCountStr(e.target.value)} onFocus={e=>e.target.select()} placeholder="8" style={inp()}/>{countStr!==""&&<button onClick={()=>setCountStr("")} style={clrBtn}>✕</button>}</div>
            </Field>
            <Field label={t.labelTarget} mb={14}>
              <div style={{position:"relative"}}><input type="number" step="0.01" value={targetStr} onChange={e=>setTargetStr(e.target.value)} onFocus={e=>e.target.select()} placeholder="2.00" style={inp()}/>{targetStr!==""&&<button onClick={()=>setTargetStr("")} style={clrBtn}>✕</button>}</div>
            </Field>

            <Field label={t.labelGroup} mb={12}>
              <div style={{display:"flex",gap:8,marginBottom:10}}>
                <button onClick={()=>setGroupSize("fixed")} style={{flex:1,padding:"10px 8px",background:groupSize==="fixed"?"linear-gradient(135deg,#1565c0,#0d47a1)":"#ffffff0a",color:groupSize==="fixed"?"#fff":"#90caf9",border:groupSize==="fixed"?"1.5px solid #42a5f5":"1.5px solid #ffffff15",borderRadius:9,fontWeight:800,fontSize:13,cursor:"pointer",textAlign:"left"}}>
                  <div>{t.labelFixed}</div><div style={{fontSize:10,fontWeight:400,opacity:0.7,marginTop:2}}>{t.fixedDesc}</div>
                </button>
                <button onClick={()=>{if(groupSize==="fixed")setGroupSize(1);}} style={{flex:1,padding:"10px 8px",background:groupSize!=="fixed"?"linear-gradient(135deg,#1b5e20,#2e7d32)":"#ffffff0a",color:groupSize!=="fixed"?"#fff":"#90caf9",border:groupSize!=="fixed"?"1.5px solid #69f0ae":"1.5px solid #ffffff15",borderRadius:9,fontWeight:800,fontSize:13,cursor:"pointer",textAlign:"left"}}>
                  <div>{t.labelVar}</div><div style={{fontSize:10,fontWeight:400,opacity:0.7,marginTop:2}}>{t.varDesc}</div>
                </button>
              </div>
              {groupSize!=="fixed"&&<div><div style={{fontSize:10,color:"#69f0ae",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{t.labelVarPer}</div><div style={{display:"flex",gap:6}}>{[1,2,3,4].map(n=><button key={n} onClick={()=>setGroupSize(n)} style={{flex:1,padding:"9px 0",background:groupSize===n?"#2e7d32":"#ffffff0f",color:groupSize===n?"#fff":"#90caf9",border:groupSize===n?"1.5px solid #69f0ae":"1.5px solid #ffffff10",borderRadius:7,fontWeight:800,fontSize:16,cursor:"pointer"}}>{n}</button>)}</div></div>}
            </Field>
            {groupSize!=="fixed"&&<Field label={t.labelDir} mb={14}><div style={{display:"flex",flexDirection:"column",gap:5}}>{[["asc",t.dirAsc],["desc",t.dirDesc]].map(([v,l])=><button key={v} onClick={()=>setDirection(v)} style={{padding:"7px 8px",background:direction===v?"#1565c0":"#ffffff0f",color:direction===v?"#fff":"#90caf9",border:direction===v?"1.5px solid #42a5f5":"1.5px solid #ffffff10",borderRadius:7,fontWeight:600,fontSize:11,cursor:"pointer",textAlign:"left"}}>{l}</button>)}</div></Field>}

            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{setCountStr("");setTargetStr("");setResult(null);}} style={{padding:"13px 14px",background:"#263238",color:"#90caf9",border:"1px solid #37474f",borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer"}}>↺</button>
              <button onClick={calculate} disabled={!countStr||!targetStr} style={{flex:1,padding:"13px",background:(!countStr||!targetStr)?"#1a2a3a":"linear-gradient(135deg,#1976d2,#0d47a1)",color:(!countStr||!targetStr)?"#546e7a":"#fff",border:"none",borderRadius:10,fontWeight:900,fontSize:15,cursor:(!countStr||!targetStr)?"default":"pointer"}}>{t.btnCalc}</button>
            </div>
          </Panel>

          {result&&<div style={{background:result.success?"linear-gradient(135deg,#0a2e18,#0b2340)":"linear-gradient(135deg,#2e0a0a,#1a0a0a)",border:result.success?"1.5px solid #2e7d32":"1.5px solid #c62828",borderRadius:12,padding:"18px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div><div style={{fontSize:10,color:"#90caf9",textTransform:"uppercase",letterSpacing:1}}>{t.resultLabel}</div><div style={{fontSize:28,fontWeight:900,lineHeight:1,color:result.success?"#69f0ae":"#ff5252"}}>{result.total.toFixed(3)} {t.grUnit}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:10,color:"#90caf9",textTransform:"uppercase",letterSpacing:1}}>{t.targetLabel}</div><div style={{fontSize:20,fontWeight:700,color:"#42a5f5"}}>{targetGrams.toFixed(3)} {t.grUnit}</div><div style={{fontSize:11,fontWeight:700,color:result.success?"#69f0ae":"#ff5252"}}>{result.success?t.inRange:t.outRange}</div></div>
            </div>
            <div style={{height:6,background:"#ffffff12",borderRadius:4,marginBottom:14,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(100,(result.total/targetGrams)*100)}%`,background:result.success?"linear-gradient(90deg,#2e7d32,#69f0ae)":"linear-gradient(90deg,#c62828,#ff5252)",borderRadius:4,transition:"width 0.5s"}}/></div>
            <div style={{fontSize:10,color:"#90caf9",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{t.composition}</div>
            <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:12}}>
              {result.items&&result.items.filter(x=>x.isTorpedo).map((ts,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#0d1e38",border:"1.5px solid #2196f3",borderRadius:8,padding:"10px 14px"}}>
                  <div><div style={{fontWeight:800,fontSize:14,color:"#42a5f5"}}>🔵 {ts.code}</div><div style={{fontSize:11,color:"#546e7a",marginTop:2}}>{lang==="el"?"Τορπίλη":"Torpedo"} · {ts.grams.toFixed(2)} {t.grUnit}</div></div>
                  <div style={{fontSize:16,fontWeight:900,color:"#42a5f5"}}>{ts.grams.toFixed(2)} {t.grUnit}</div>
                </div>
              ))}
              {orderedGroups.map(({shot,cnt},gi)=>(
                <div key={gi} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#0d1e38",border:"1px solid #1e4d8a",borderRadius:8,padding:"10px 14px"}}>
                  <div><div style={{fontWeight:800,fontSize:14,color:"#e3f2fd"}}>{cnt} × {shot.code}</div><div style={{fontSize:11,color:"#546e7a",marginTop:2}}>{shot.grams.toFixed(3)} {t.perPiece}</div></div>
                  <div style={{fontSize:16,fontWeight:900,color:"#42a5f5"}}>{(shot.grams*cnt).toFixed(3)} {t.grUnit}</div>
                </div>
              ))}
            </div>
            <RigDiagram positions={positions} totalCm={totalLineCm} t={t} lang={lang}/>
          </div>}
          {result&&<button onClick={()=>setResult(null)} style={{width:"100%",marginTop:8,padding:"11px",background:"#1a2a3a",color:"#90caf9",border:"1px solid #1e4d8a",borderRadius:10,fontWeight:700,fontSize:14,cursor:"pointer"}}>{t.btnReset2}</button>}
        </div>}

        {/* SPACING TAB */}
        {activeTab==="spacing"&&<Panel>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:12,color:"#90caf9",lineHeight:1.6}}>{t.spacingTitle} {t.spacingRepeat}</div>
            <button onClick={()=>setSpacingRows([])} style={{background:"#37474f",color:"#90caf9",border:"1px solid #546e7a",borderRadius:8,padding:"6px 12px",fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0,marginLeft:8}}>↺ Reset</button>
          </div>
          <div style={{marginBottom:12}}>
            {/* Β FIX: nearFloat = end of array, nearLoop = start of array */}
            <div style={{fontSize:9,color:"#546e7a",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{t.nearFloat}</div>
            <div style={{display:"flex",gap:5,marginBottom:10}}>
              {[["shot","⚫ "+t.rowTypeShot,"#0d2040","#e3f2fd","#1e4d8a"],["bulk","🔴 "+t.rowTypeBulk,"#1a0808","#ef9a9a","#e5393550"],["torpedo","🔵 "+t.rowTypeTorp,"#071830","#90caf9","#1565c060"]].map(([rt,lbl,bg,col,bc])=>(
                <button key={rt} onClick={()=>addSpacingRow("start",rt)} style={{flex:1,padding:"7px 4px",background:bg,color:col,border:`1px solid ${bc}`,borderRadius:7,fontWeight:700,fontSize:11,cursor:"pointer"}}>{lbl}</button>
              ))}
            </div>
            <div style={{fontSize:9,color:"#546e7a",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{t.nearLoop}</div>
            <div style={{display:"flex",gap:5}}>
              {[["shot","⚫ "+t.rowTypeShot,"#0d2040","#e3f2fd","#1e4d8a"],["bulk","🔴 "+t.rowTypeBulk,"#1a0808","#ef9a9a","#e5393550"],["torpedo","🔵 "+t.rowTypeTorp,"#071830","#90caf9","#1565c060"]].map(([rt,lbl,bg,col,bc])=>(
                <button key={rt} onClick={()=>addSpacingRow("end",rt)} style={{flex:1,padding:"7px 4px",background:bg,color:col,border:`1px solid ${bc}`,borderRadius:7,fontWeight:700,fontSize:11,cursor:"pointer"}}>{lbl}</button>
              ))}
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
            {spacingRows.map((row,idx)=>{
              const rt=row.type||"shot",isB=rt==="bulk",isT=rt==="torpedo";
              const bg=isB?"#1a0808":isT?"#071830":"#0d1e38",bc=isB?"#e5393550":isT?"#1565c060":"#1e4d8a",ac=isB?"#ef5350":isT?"#42a5f5":"#90caf9";
              const tl=isB?"🔴 BULK":isT?"🔵 TORPEDO":"⚫";
              return(<div key={row.id} style={{background:bg,border:`1.5px solid ${bc}`,borderRadius:10,padding:"8px 10px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:isT?10:0}}>
                  <div style={{width:24,height:24,borderRadius:"50%",flexShrink:0,background:GC[idx%GC.length],display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff"}}>{idx+1}</div>
                  <div style={{fontSize:10,color:ac,fontWeight:700,minWidth:50}}>{tl}</div>
                  {!isT&&<div style={{flex:1}}><div style={{fontSize:9,color:"#546e7a",textTransform:"uppercase",marginBottom:3}}>{t.colPcs}</div><input type="number" min={1} max={30} value={row.count} onChange={e=>updateSpacingRow(row.id,"count",e.target.value)} onFocus={e=>e.target.select()} style={{width:"100%",boxSizing:"border-box",padding:"6px 8px",background:"#071830",border:`1.5px solid ${bc}`,borderRadius:7,color:"#e3f2fd",fontSize:14,fontWeight:700,outline:"none"}}/></div>}
                  {isB&&<div style={{flex:1}}><div style={{fontSize:9,color:"#ef9a9a",textTransform:"uppercase",marginBottom:3}}>ΚΕΝΟ ΠΡΙΝ (cm)</div><input type="number" min={0} step={0.5} value={row.spacingBefore||"0"} onChange={e=>updateSpacingRow(row.id,"spacingBefore",e.target.value)} onFocus={e=>e.target.select()} style={{width:"100%",boxSizing:"border-box",padding:"6px 8px",background:"#1a0808",border:"1.5px solid #e5393550",borderRadius:7,color:"#ef9a9a",fontSize:14,fontWeight:700,outline:"none"}}/></div>}
                  <div style={{flex:1}}><div style={{fontSize:9,color:isB?"#69f0ae":"#546e7a",textTransform:"uppercase",marginBottom:3}}>{isB?"ΚΕΝΟ ΜΕΤΑ (cm)":t.colGap}</div><input type="number" min={0} step={0.5} value={row.spacing} onChange={e=>updateSpacingRow(row.id,"spacing",e.target.value)} onFocus={e=>e.target.select()} style={{width:"100%",boxSizing:"border-box",padding:"6px 8px",background:isB?"#0a1a0a":"#071830",border:`1.5px solid ${bc}`,borderRadius:7,color:isB?"#69f0ae":"#e3f2fd",fontSize:14,fontWeight:700,outline:"none"}}/></div>
                  <button onClick={()=>removeSpacingRow(row.id)} style={{flexShrink:0,width:26,height:26,borderRadius:7,background:"#c6282818",color:"#ef5350",border:"1px solid #c6282830",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                </div>

                {/* Γ FIX: Torpedo row expanded options */}
                {isT&&<div style={{paddingLeft:34,display:"flex",flexDirection:"column",gap:8}}>
                  {/* Mode selector */}
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>updateSpacingRow(row.id,"torpedoMode","auto")} style={{flex:1,padding:"6px",background:(row.torpedoMode||"auto")==="auto"?"#1565c080":"#ffffff0a",color:"#fff",border:(row.torpedoMode||"auto")==="auto"?"1.5px solid #42a5f5":"1.5px solid #ffffff15",borderRadius:7,fontWeight:700,fontSize:11,cursor:"pointer"}}>⚡ {t.torpAuto}</button>
                    <button onClick={()=>updateSpacingRow(row.id,"torpedoMode","list")} style={{flex:1,padding:"6px",background:row.torpedoMode==="list"?"#1565c080":"#ffffff0a",color:"#fff",border:row.torpedoMode==="list"?"1.5px solid #42a5f5":"1.5px solid #ffffff15",borderRadius:7,fontWeight:700,fontSize:11,cursor:"pointer"}}>📋 {t.torpList}</button>
                  </div>
                  {/* Auto mode: percentage input */}
                  {(row.torpedoMode||"auto")==="auto"&&<div>
                    <div style={{fontSize:9,color:"#42a5f5",textTransform:"uppercase",marginBottom:3}}>{t.torpPct}</div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <input type="number" min={10} max={90} step={5} value={row.torpedoPct||"60"} onChange={e=>updateSpacingRow(row.id,"torpedoPct",e.target.value)} onFocus={e=>e.target.select()} style={{flex:1,boxSizing:"border-box",padding:"6px 8px",background:"#071830",border:"1.5px solid #1565c060",borderRadius:7,color:"#90caf9",fontSize:14,fontWeight:700,outline:"none"}}/>
                      <span style={{fontSize:12,color:"#546e7a"}}>%</span>
                      <span style={{fontSize:11,color:"#42a5f5",fontWeight:700}}>≈ {((parseFloat(row.torpedoPct||60)/100)*targetGrams).toFixed(2)} {t.grUnit}</span>
                    </div>
                  </div>}
                  {/* List mode: dropdown */}
                  {row.torpedoMode==="list"&&<div>
                    <div style={{fontSize:9,color:"#42a5f5",textTransform:"uppercase",marginBottom:3}}>{t.selectTorp}</div>
                    <select value={row.torpedoId||""} onChange={e=>updateSpacingRow(row.id,"torpedoId",e.target.value)} style={{width:"100%",boxSizing:"border-box",padding:"6px 8px",background:"#071830",border:"1.5px solid #1565c060",borderRadius:7,color:"#90caf9",fontSize:13,fontWeight:700,outline:"none"}}>
                      <option value="">-- {t.selectTorp} --</option>
                      {[...torpedoes].sort((a,b)=>a.grams-b.grams).map(tp=><option key={tp.id} value={tp.id}>{tp.code} ({tp.grams.toFixed(2)} {t.grUnit})</option>)}
                    </select>
                  </div>}
                </div>}
              </div>);
            })}
          </div>

          {/* Preview */}
          {spacingRows.length>0&&<div style={{background:"#060f1e",borderRadius:9,padding:12,border:"1px solid #1e4d8a"}}>
            <div style={{fontSize:10,color:"#90caf9",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{t.previewTitle}</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <div style={{width:26,display:"flex",justifyContent:"center",flexShrink:0}}><div style={{width:10,height:22,background:"#ef9a9a",borderRadius:"3px 3px 0 0"}}/></div>
              <div style={{width:20,height:26,background:"linear-gradient(180deg,#42a5f5,#1565c0)",borderRadius:"50% 50% 40% 40%/60% 60% 40% 40%",border:"2px solid #90caf9",flexShrink:0}}/>
              <span style={{fontSize:12,color:"#90caf9",fontWeight:700}}>{t.floatTop}</span>
            </div>
            {[...spacingRows].reverse().map((row,ridx)=>{
              const idx=spacingRows.length-1-ridx,rt=row.type||"shot",isB=rt==="bulk",isT=rt==="torpedo";
              const col=isT?"#42a5f5":isB?"#e53935":GC[idx%GC.length];
              const torpName=isT&&row.torpedoMode==="list"?torpedoes.find(x=>x.id===row.torpedoId)?.code:`Auto ${row.torpedoPct||60}%`;
              return(<div key={row.id} style={{display:"flex",alignItems:"stretch",gap:8}}>
                <div style={{width:26,display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}><div style={{width:3,flex:1,minHeight:24,background:isB?"#37474f":"#546e7a",borderRadius:2}}/></div>
                <div style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0"}}>
                  {isT
                    ?<div style={{width:8,height:14,borderRadius:"50%",background:"linear-gradient(180deg,#90caf9,#1565c0)",border:"1px solid #42a5f5",flexShrink:0}}/>
                    :<div style={{width:13,height:13,borderRadius:"50%",background:col,flexShrink:0}}/>
                  }
                  <div style={{fontSize:12,color:"#e3f2fd"}}>
                    {isT?<><span style={{color:"#42a5f5",fontWeight:700}}>🔵 TORPEDO</span><span style={{color:"#90caf9"}}> {torpName}</span>{row.spacing>0&&<span style={{color:"#ffd740"}}> · {row.spacing}cm</span>}</>
                      :<><strong style={{color:col}}>{row.count} {t.pcsUnit}</strong>{isB?<span style={{color:"#69f0ae",fontWeight:700}}> BULK</span>:<span style={{color:"#90caf9"}}> {t.perEvery} <strong style={{color:"#ffd740"}}>{row.spacing}cm</strong></span>}</>
                    }
                  </div>
                </div>
              </div>);
            })}
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:26,display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}><div style={{width:3,height:14,background:"#546e7a"}}/></div><span style={{fontSize:14}}>🔗</span><span style={{fontSize:12,color:"#ffd740",fontWeight:800}}>{t.loopBottom}</span></div>
          </div>}
        </Panel>}

        {/* TORPEDOES TAB */}
        {activeTab==="torpedoes"&&<Panel>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontWeight:700,color:"#90caf9",fontSize:12,textTransform:"uppercase"}}>{t.torpedoTitle} ({torpedoes.length})</div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>setTorpedoes(DEFAULT_TORPEDOES)} style={{background:"#37474f",color:"#90caf9",border:"none",borderRadius:8,padding:"7px 10px",fontWeight:700,fontSize:11,cursor:"pointer"}}>{t.btnReset}</button>
              <button onClick={()=>setShowAddTorp(v=>!v)} style={{background:"linear-gradient(135deg,#1565c0,#0d47a1)",color:"#fff",border:"none",borderRadius:8,padding:"7px 12px",fontWeight:700,fontSize:12,cursor:"pointer"}}>{t.btnAdd}</button>
            </div>
          </div>
          {showAddTorp&&<div style={{background:"#071830",border:"1px solid #42a5f5",borderRadius:9,padding:14,marginBottom:12}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div><label style={{fontSize:10,color:"#90caf9",display:"block",marginBottom:4}}>{t.labelCode}</label><input value={newTorpCode} onChange={e=>setNewTorpCode(e.target.value)} placeholder="TOJ0xxx" style={inp()}/></div>
              <div><label style={{fontSize:10,color:"#90caf9",display:"block",marginBottom:4}}>{t.labelGrams}</label><input value={newTorpGrams} onChange={e=>setNewTorpGrams(e.target.value)} placeholder="0.00" type="number" step="0.01" style={inp()}/></div>
            </div>
            <button onClick={addTorpedo} style={{background:"#2e7d32",color:"#fff",border:"none",borderRadius:7,padding:"8px 16px",fontWeight:700,cursor:"pointer"}}>{t.btnSave}</button>
          </div>}
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {[...torpedoes].sort((a,b)=>a.grams-b.grams).map(tp=>(
              <div key={tp.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 12px",background:"#ffffff07",border:"1px solid #1565c030",borderRadius:8}}>
                <div style={{display:"flex",alignItems:"center",gap:9}}>
                  {/* Δ: olive shape */}
                  <div style={{width:10,height:18,borderRadius:"50%",background:"linear-gradient(180deg,#90caf9,#1565c0,#0d47a1)",border:"1.5px solid #42a5f5",flexShrink:0}}/>
                  <span style={{fontWeight:700,color:"#e3f2fd",fontSize:14}}>{tp.code}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:9}}>
                  <span style={{background:"#1565c015",border:"1px solid #1e4d8a",borderRadius:5,padding:"2px 9px",color:"#42a5f5",fontWeight:700,fontSize:13}}>{tp.grams.toFixed(2)} {t.grUnit}</span>
                  <button onClick={()=>removeTorpedo(tp.id)} style={{background:"#c6282815",color:"#ef5350",border:"1px solid #c6282830",borderRadius:5,padding:"2px 7px",cursor:"pointer",fontSize:12,fontWeight:700}}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </Panel>}

        {/* SHOTS TAB */}
        {activeTab==="shots"&&<Panel>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontWeight:700,color:"#90caf9",fontSize:12,textTransform:"uppercase"}}>{t.shotsTitle} ({shots.length})</div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>setShots(DEFAULT_SHOTS)} style={{background:"#37474f",color:"#90caf9",border:"none",borderRadius:8,padding:"7px 10px",fontWeight:700,fontSize:11,cursor:"pointer"}}>{t.btnReset}</button>
              <button onClick={()=>setShowAddShot(v=>!v)} style={{background:"linear-gradient(135deg,#1976d2,#0d47a1)",color:"#fff",border:"none",borderRadius:8,padding:"7px 12px",fontWeight:700,fontSize:12,cursor:"pointer"}}>{t.btnAdd}</button>
            </div>
          </div>
          {showAddShot&&<div style={{background:"#071830",border:"1px solid #42a5f5",borderRadius:9,padding:14,marginBottom:12}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div><label style={{fontSize:10,color:"#90caf9",display:"block",marginBottom:4}}>{t.labelCode}</label><input value={newCode} onChange={e=>setNewCode(e.target.value)} placeholder="No 5" style={inp()}/></div>
              <div><label style={{fontSize:10,color:"#90caf9",display:"block",marginBottom:4}}>{t.labelGrams}</label><input value={newGrams} onChange={e=>setNewGrams(e.target.value)} placeholder="0.000" type="number" step="0.001" style={inp()}/></div>
            </div>
            <button onClick={addShot} style={{background:"#2e7d32",color:"#fff",border:"none",borderRadius:7,padding:"8px 16px",fontWeight:700,cursor:"pointer"}}>{t.btnSave}</button>
          </div>}
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {[...shots].sort((a,b)=>b.grams-a.grams).map(s=>(
              <div key={s.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 12px",background:"#ffffff07",border:"1px solid #ffffff0e",borderRadius:8}}>
                <div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:16,height:16,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#607d8b,#263238)",border:"1.5px solid #546e7a",flexShrink:0}}/><span style={{fontWeight:700,color:"#e3f2fd",fontSize:14}}>{s.code}</span></div>
                <div style={{display:"flex",alignItems:"center",gap:9}}><span style={{background:"#1565c015",border:"1px solid #1e4d8a",borderRadius:5,padding:"2px 9px",color:"#42a5f5",fontWeight:700,fontSize:13}}>{s.grams.toFixed(3)} {t.grUnit}</span><button onClick={()=>removeShot(s.id)} style={{background:"#c6282815",color:"#ef5350",border:"1px solid #c6282830",borderRadius:5,padding:"2px 7px",cursor:"pointer",fontSize:12,fontWeight:700}}>✕</button></div>
              </div>
            ))}
          </div>
        </Panel>}
      </div>

      <div style={{textAlign:"center",marginTop:28,color:"#263238",fontSize:10,letterSpacing:2}}>{t.footer}</div>
    </div>
  );
}
