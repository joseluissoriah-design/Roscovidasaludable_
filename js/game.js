/* El Rosco de la Vida Saludable
   Para cambiar preguntas y pruebas comodín, edita ITEMS (versión normal) y TEA (versión con apoyos visuales).
   Ambas listas usan la misma letra como clave. */
(function(){
  /* Contenido del juego. answers[0] es la palabra que se muestra; el resto son variantes aceptadas. */
  var ITEMS=[
    {l:'A',type:'q',clue:'Es la mejor bebida para hidratarnos. Debemos beberla varias veces al día.',answers:['agua'],fact:'El cuerpo necesita agua para funcionar bien, sobre todo cuando hacemos ejercicio.'},
    {l:'B',type:'q',clue:'Vehículo de dos ruedas que se mueve con los pedales. Es una forma de movilidad activa.',answers:['bicicleta','bici','bicicletas','bicis'],fact:'Ir en bici no contamina y además es ejercicio. ¡Siempre con casco!'},
    {l:'C',type:'q',clue:'Órgano que bombea la sangre por todo el cuerpo. Cuando hacemos ejercicio, late más rápido.',answers:['corazón','corazon'],fact:'Moverte cada día fortalece el corazón.'},
    {l:'D',type:'c',name:'Dientes limpios',text:'Cepíllate los dientes en el aire: arriba, abajo, por delante y por detrás, durante 20 segundos. ¡Sin olvidar la lengua!',seconds:20,fact:'Hay que cepillarse los dientes después de las comidas y antes de dormir.'},
    {l:'E',type:'c',name:'Equilibrio flamenco',text:'Mantén el equilibrio sobre una sola pierna durante 15 segundos, como un flamenco. Si lo necesitas, apóyate en la pared o hazlo sentado o sentada con un pie en el aire.',seconds:15,fact:'El equilibrio se entrena y ayuda al cuerpo a moverse mejor.'},
    {l:'F',type:'c',name:'Frutas y verduras',text:'Nombra 5 frutas o verduras en 1 minuto.',seconds:60,fact:'Comer frutas y verduras todos los días nos aporta vitaminas y fibra.',tip:'Ideas: naranja, plátano, lechuga, zanahoria, tomate, pera, brócoli, calabacín.'},
    {l:'G',type:'q',clue:'Sentimiento de dar las gracias y valorar lo bueno que tenemos o lo que otras personas hacen por nosotros.',answers:['gratitud'],fact:'Dar las gracias es una forma de cuidar a los demás y de sentirnos bien.'},
    {l:'H',type:'q',clue:'Costumbres que repetimos cada día. Si cuidan nuestra salud, son ... saludables.',answers:['hábitos','habitos','hábito','habito'],fact:'Dormir bien, comer sano y moverse cada día son hábitos saludables.'},
    {l:'I',type:'c',name:'Ir en bici',text:'Pedalea en el aire con las piernas, como si fueras en bici, durante 20 segundos. Puedes hacerlo sentado o sentada. ¡Con casco imaginario!',seconds:20,fact:'Ir en bici es una forma de movilidad activa: nos movemos con nuestra propia fuerza.'},
    {l:'J',type:'q',clue:'Correr, saltar y ... al aire libre es una forma muy divertida de hacer ejercicio.',answers:['jugar','jugando'],fact:'Jugar en el patio o en el parque también es hacer ejercicio.'},
    {l:'L',type:'q',clue:'Antes de comer y después de ir al baño hay que ... las manos con agua y jabón.',answers:['lavar','lavarse','lavarnos','lavarlas'],fact:'Hay que frotarse las manos con agua y jabón durante al menos 20 segundos.'},
    {l:'M',type:'q',clue:'Es desplazarse de un sitio a otro. Si lo hacemos andando o en bici, la llamamos ... activa.',answers:['movilidad'],fact:'La movilidad activa usa la fuerza de nuestro cuerpo para movernos y no contamina.'},
    {l:'N',type:'q',clue:'Antes de un examen o de una actuación, a veces sentimos ... en la tripa. Respirar hondo ayuda a calmarlos.',answers:['nervios','nervio'],fact:'Respirar despacio ayuda a calmar los nervios.'},
    {l:'O',type:'q',clue:'Gas del aire que necesita nuestro cuerpo. Cuando hacemos ejercicio respiramos más porque necesitamos más ...',answers:['oxígeno','oxigeno'],fact:'Respiramos el oxígeno por la nariz y la boca, y los pulmones lo llevan a la sangre.'},
    {l:'P',type:'q',clue:'Persona que va andando por la calle. Debe cruzar por los pasos de cebra.',answers:['peatón','peaton','peatones'],fact:'Siempre hay que mirar a los dos lados antes de cruzar, aunque haya paso de cebra.'},
    {l:'R',type:'c',name:'Respira',text:'Haz 3 respiraciones lentas: huele una flor por la nariz y sopla una vela por la boca. Tienes 20 segundos.',seconds:20,fact:'Respirar despacio ayuda a calmar el cuerpo y la mente.'},
    {l:'S',type:'q',clue:'Si dormimos poco, por la mañana tenemos mucho ... y nos cuesta atender.',answers:['sueño','sueno'],fact:'A tu edad conviene dormir entre 9 y 12 horas cada noche.'},
    {l:'T',type:'q',clue:'Emoción que sentimos cuando pasa algo que nos hace daño o echamos de menos a alguien. Es normal sentirla.',answers:['tristeza','triste'],fact:'Todas las emociones son normales. Si estás triste, puedes contárselo a una persona de confianza.'},
    {l:'V',type:'q',clue:'Sustancias que hay en las frutas y las verduras y que ayudan al cuerpo a funcionar bien y a defenderse.',answers:['vitaminas','vitamina'],fact:'Comer variado cada día nos da las vitaminas que necesitamos.'},
    {l:'Y',type:'q',clue:'Actividad que combina posturas, estiramientos y respiración para relajar el cuerpo.',answers:['yoga'],fact:'El yoga trabaja la flexibilidad y ayuda a calmarse.'},
    {l:'Z',type:'q',clue:'Calzado cómodo y con suela flexible que usamos para hacer deporte y para caminar mucho.',answers:['zapatillas','zapatilla','zapatillas deportivas'],fact:'Unas zapatillas cómodas evitan rozaduras y protegen los pies.'}
  ];
  var N=ITEMS.length;
  var NQ=ITEMS.filter(function(i){return i.type==='q'}).length;
  var NC=N-NQ;
  var STATE_TXT={p:'pendiente',ok:'bien',bad:'mal',s:'pasada'};

  /* Apoyos visuales para la versión TEA. En las preguntas, opts[0] es la respuesta correcta y las otras dos son distractores claramente distintos. */
  var TEA={
    A:{pics:'💧🥛',short:'Es la mejor bebida. Sale del grifo.',opts:[['agua','💧'],['arena','🏖️'],['aceite','🛢️']],fact:'El cuerpo necesita agua para funcionar bien.'},
    B:{pics:'🚲',short:'Vehículo de dos ruedas con pedales.',opts:[['bicicleta','🚲'],['barco','⛵'],['bota','🥾']],fact:'Ir en bici es ejercicio. Usa siempre casco.'},
    C:{pics:'❤️🏃',short:'Órgano que bombea la sangre. Late más rápido si corres.',opts:[['corazón','❤️'],['codo','💪'],['cabeza','🙂']],fact:'Moverte fortalece tu corazón.'},
    D:{pics:'🪥🦷',name:'Dientes limpios',steps:[['🪥','Coge tu cepillo imaginario.'],['🦷','Cepilla arriba, abajo, delante y detrás.'],['👅','No olvides la lengua.']],tip:'',fact:'Cepilla tus dientes después de comer y antes de dormir.'},
    E:{pics:'🦩',name:'Equilibrio flamenco',steps:[['🦩','Ponte como un flamenco.'],['🦵','Levanta un pie del suelo.'],['⏱️','Aguanta 15 segundos.']],tip:'💺 Puedes hacerlo sentado o sentada.',fact:'El equilibrio se entrena jugando.'},
    F:{pics:'🍎🥕🥦',name:'Frutas y verduras',steps:[['🍎','Piensa en frutas y verduras.'],['🗣️','Di 5 en voz alta.'],['⏱️','Tienes 1 minuto.']],tip:'🍊 naranja · 🥕 zanahoria · 🍌 plátano · 🥬 lechuga',fact:'Comer frutas y verduras nos da vitaminas.'},
    G:{pics:'🙏😊',short:'Es dar las gracias por lo bueno.',opts:[['gratitud','🙏'],['gusano','🐛'],['guitarra','🎸']],fact:'Dar las gracias nos hace sentir bien.'},
    H:{pics:'😴🍎🏃',short:'Costumbres que repetimos cada día y cuidan nuestra salud.',opts:[['hábitos','🔁'],['hormigas','🐜'],['hielo','🧊']],fact:'Dormir bien y moverse son hábitos saludables.'},
    I:{pics:'🚲',name:'Ir en bici',steps:[['🪑','Siéntate o ponte de pie.'],['🚲','Pedalea en el aire con las piernas.'],['⛑️','Con tu casco imaginario.']],tip:'',fact:'Ir en bici es movilidad activa.'},
    J:{pics:'⚽🏃',short:'Correr, saltar y divertirte al aire libre.',opts:[['jugar','⚽'],['jamón','🍖'],['jardín','🌷']],fact:'Jugar también es hacer ejercicio.'},
    L:{pics:'🧼🙌',short:'Antes de comer hay que ... las manos con agua y jabón.',opts:[['lavar','🧼'],['leer','📖'],['lanzar','🥏']],fact:'Lávalas al menos 20 segundos.'},
    M:{pics:'🚶🚲🛴',short:'Ir andando o en bici de un sitio a otro.',opts:[['movilidad','🚶'],['música','🎵'],['mesa','🪑']],fact:'La movilidad activa no contamina.'},
    N:{pics:'🦋😰',short:'Sientes mariposas en la tripa antes de un examen.',opts:[['nervios','🦋'],['nubes','☁️'],['naves','🚀']],fact:'Respirar despacio calma los nervios.'},
    O:{pics:'🫁💨',short:'Gas del aire que respiramos.',opts:[['oxígeno','💨'],['oso','🐻'],['olla','🍲']],fact:'Los pulmones llevan el oxígeno a la sangre.'},
    P:{pics:'🚶🦓',short:'Persona que va andando por la calle.',opts:[['peatón','🚶'],['piloto','👨‍✈️'],['pirata','🏴‍☠️']],fact:'Mira siempre antes de cruzar la calle.'},
    R:{pics:'🌸🕯️',name:'Respira',steps:[['🌸','Huele una flor por la nariz.'],['🕯️','Sopla una vela por la boca.'],['🔁','Haz 3 respiraciones lentas.']],tip:'',fact:'Respirar despacio nos calma.'},
    S:{pics:'😴🌙',short:'Si duermes poco, por la mañana tienes mucho de esto.',opts:[['sueño','😴'],['sol','☀️'],['sopa','🍲']],fact:'Tu cuerpo necesita dormir entre 9 y 12 horas.'},
    T:{pics:'😢💧',short:'Emoción que sentimos cuando algo nos hace daño.',opts:[['tristeza','😢'],['tren','🚆'],['tiza','🖍️']],fact:'Si estás triste, cuéntaselo a alguien de confianza.'},
    V:{pics:'🍊🥦🥕',short:'Están en frutas y verduras y ayudan al cuerpo.',opts:[['vitaminas','🍊'],['velas','🕯️'],['vacas','🐄']],fact:'Comer variado nos da vitaminas.'},
    Y:{pics:'🧘',short:'Posturas, estiramientos y respiración para relajarse.',opts:[['yoga','🧘'],['yogur','🥛'],['yate','🛥️']],fact:'El yoga ayuda a calmarse.'},
    Z:{pics:'👟',short:'Calzado cómodo para hacer deporte.',opts:[['zapatillas','👟'],['zanahoria','🥕'],['zorro','🦊']],fact:'Unas zapatillas cómodas protegen los pies.'}
  };

  function $(id){return document.getElementById(id)}
  var panel=$('panel');

  function fresh(prev){
    var total=prev?prev.total:480, mode=prev?prev.mode:'type', tea=prev?prev.tea:false;
    return {status:'intro',total:total,mode:mode,tea:tea,left:total,idx:-1,res:ITEMS.map(function(){return 'p'}),ch:null,revealed:false,reason:'',elapsed:0,fin:{}};
  }
  var S=fresh();
  /* Enlace directo a la versión TEA: la dirección de la página terminada en #tea */
  try{if(location.hash==='#tea'){S.tea=true;S.total=0;S.left=0;}}catch(e){}
  function applyTea(){var w=document.querySelector('.wrap');if(w)w.classList.toggle('tea',S.tea);}

  /* Comparación de respuestas: sin mayúsculas, sin tildes, sin artículo y con un margen para faltas de escritura. */
  function norm(s){
    s=String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
    return s.replace(/^(el|la|los|las|un|una|unos|unas) /,'');
  }
  function lev(a,b){
    var m=a.length,n=b.length;
    if(!m)return n; if(!n)return m;
    var p=[],j,i;
    for(j=0;j<=n;j++)p[j]=j;
    for(i=1;i<=m;i++){
      var c=[i];
      for(j=1;j<=n;j++){
        c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a.charAt(i-1)===b.charAt(j-1)?0:1));
      }
      p=c;
    }
    return p[n];
  }
  function isCorrect(input,item){
    var n=norm(input);
    if(!n)return false;
    for(var k=0;k<item.answers.length;k++){
      var a=norm(item.answers[k]);
      if(n===a)return true;
      var tol=a.length>=9?2:(a.length>=6?1:0);
      if(tol&&lev(n,a)<=tol)return true;
    }
    return false;
  }

  function fmt(sec){
    sec=Math.max(0,Math.ceil(sec));
    var m=Math.floor(sec/60),s=sec%60;
    return m+':'+(s<10?'0':'')+s;
  }
  function counts(){
    var ok=0,bad=0,left=0;
    S.res.forEach(function(r){if(r==='ok')ok++;else if(r==='bad')bad++;else left++;});
    return {ok:ok,bad:bad,left:left};
  }

  /* Rosco */
  function buildRosco(){
    var ol=$('nodes');ol.innerHTML='';
    ITEMS.forEach(function(it,i){
      var a=(-90+i*360/N)*Math.PI/180,R=43;
      var li=document.createElement('li');
      li.className='node'+(it.type==='c'?' ch':'');
      li.style.left=(50+R*Math.cos(a)).toFixed(2)+'%';
      li.style.top=(50+R*Math.sin(a)).toFixed(2)+'%';
      li.textContent=it.l;
      ol.appendChild(li);
    });
  }
  function paintRosco(){
    var kids=$('nodes').children;
    for(var i=0;i<kids.length;i++){
      var li=kids[i],r=S.res[i];
      li.setAttribute('data-s',r);
      var cur=(i===S.idx)&&(S.status==='question'||S.status==='feedback'||S.status==='challenge');
      li.classList.toggle('cur',cur);
      li.setAttribute('aria-label','Letra '+ITEMS[i].l+', '+(ITEMS[i].type==='c'?'prueba comodín, ':'')+STATE_TXT[r]);
    }
  }
  function paintHub(){
    var c=counts();
    applyTea();
    $('tOk').textContent=c.ok;$('tBad').textContent=c.bad;$('tLeft').textContent=c.left;
    $('lblBad').textContent=S.tea?'repasar':'mal';
    var t=$('hubTime'),lab=$('hubLab');
    if(S.status==='end'){lab.textContent='Fin';t.textContent=c.ok+'/'+N;t.classList.remove('low');return;}
    if(S.tea){lab.textContent='Hechas';t.textContent=(N-c.left)+'/'+N;t.classList.remove('low');return;}
    if(S.total===0){lab.textContent='Sin límite';t.textContent='∞';t.classList.remove('low');return;}
    lab.textContent='Tiempo';
    t.textContent=fmt(S.left);
    t.classList.toggle('low',S.status!=='intro'&&S.left<=30);
  }

  /* Reloj */
  var tm=null,lastT=0;
  function startLoop(){stopLoop();lastT=performance.now();tm=setInterval(tick,200);}
  function stopLoop(){if(tm){clearInterval(tm);tm=null;}}
  function tick(){
    var now=performance.now(),dt=(now-lastT)/1000;lastT=now;
    if(S.status==='question'&&!S.revealed){
      S.elapsed+=dt;
      if(S.total>0){
        S.left=Math.max(0,S.left-dt);
        paintHub();
        if(S.left<=0){endGame('time');}
      }
    }else if(S.status==='challenge'&&S.ch&&S.ch.phase==='running'){
      S.ch.left=Math.max(0,S.ch.left-dt);
      var el=$('chTime');
      if(el)el.textContent=Math.ceil(S.ch.left);
      var bar=$('chBar');
      if(bar)bar.style.width=(S.ch.left/ITEMS[S.idx].seconds*100)+'%';
      if(S.ch.left<=0){S.ch.phase='done';renderChallenge();}
    }
  }

  /* Flujo */
  function nextIndex(from){
    for(var k=1;k<=N;k++){
      var j=(((from+k)%N)+N)%N;
      if((S.res[j]==='p'||S.res[j]==='s')&&!S.fin[j])return j;
    }
    return -1;
  }
  function startGame(){
    S.res=ITEMS.map(function(){return 'p'});
    S.fin={};
    S.idx=-1;S.left=S.total;S.elapsed=0;S.reason='';
    startLoop();
    goNext(-1);
  }
  function goNext(from){
    var j=nextIndex(from);
    if(j<0){endGame('done');return;}
    S.idx=j;S.revealed=false;
    if(ITEMS[j].type==='c'){
      S.status='challenge';S.ch={phase:'ready',left:ITEMS[j].seconds};
      renderChallenge();
    }else{
      S.status='question';renderQuestion();
    }
    paintRosco();paintHub();
  }
  function resolve(result){
    S.res[S.idx]=result;
    S.status='feedback';
    S.ch=null;
    renderFeedback(result);
    paintRosco();paintHub();
  }
  function pass(){
    /* En la versión TEA, una letra pasada vuelve una sola vez; si se vuelve a pasar, se aparca. */
    if(S.tea&&S.res[S.idx]==='s')S.fin[S.idx]=true;
    S.res[S.idx]='s';
    S.ch=null;
    goNext(S.idx);
  }
  function endGame(reason){
    stopLoop();
    S.status='end';S.reason=reason;S.ch=null;
    renderEnd();paintRosco();paintHub();
  }

  function focusFirst(){
    var el=panel.querySelector('[data-autofocus]');
    if(el){try{el.focus({preventScroll:true});}catch(e){el.focus();}}
  }
  function bindQuit(){
    var b=$('quit');if(!b)return;
    var armed=false,t=null;
    b.addEventListener('click',function(){
      if(!armed){
        armed=true;b.textContent='¿Seguro? Pulsa otra vez para terminar';
        t=setTimeout(function(){armed=false;b.textContent='Terminar ahora';},3500);
      }else{clearTimeout(t);endGame('quit');}
    });
  }

  /* Vistas */
  function renderIntro(){
    if(S.tea){renderIntroTea();return;}
    panel.innerHTML=
      '<h2>¿Cuánto sabes de vida saludable?</h2>'+
      '<p class="lead">'+N+' letras: '+NQ+' preguntas y '+NC+' pruebas comodín. Acierta la palabra que empieza por la letra, o supera la prueba, para pintarla de verde.</p>'+
      '<ul class="rules">'+
        '<li>Si no lo sabes, pulsa <strong>Pasapalabra</strong>. La letra vuelve en la segunda vuelta.</li>'+
        '<li>Las pruebas comodín se hacen de pie y delante de todos. ¡Con ganas!</li>'+
        '<li>Después de cada letra descubrirás un dato para cuidarte mejor.</li>'+
      '</ul>'+
      '<div class="legend" aria-hidden="true"><span><i class="sw"></i>Pregunta</span><span><i class="sw ch"></i>Prueba comodín</span><span><i class="sw ok"></i>Bien</span><span><i class="sw bad"></i>Mal</span><span><i class="sw s"></i>Pasada</span></div>'+
      '<fieldset><legend>Tiempo</legend><div class="seg">'+
        '<label><input type="radio" name="time" value="300"><span>5 minutos</span></label>'+
        '<label><input type="radio" name="time" value="480"><span>8 minutos</span></label>'+
        '<label><input type="radio" name="time" value="0"><span>Sin límite</span></label>'+
      '</div></fieldset>'+
      '<fieldset><legend>Cómo se responde</legend><div class="seg">'+
        '<label><input type="radio" name="mode" value="type"><span>Escribiendo</span></label>'+
        '<label><input type="radio" name="mode" value="voice"><span>En voz alta (la persona docente comprueba)</span></label>'+
      '</div></fieldset>'+
      versionHTML()+
      '<div class="row"><button class="btn" id="start" type="button" data-autofocus>Empezar el rosco</button></div>';
    bindVersion();
    var rt=panel.querySelectorAll('input[name="time"]'),rm=panel.querySelectorAll('input[name="mode"]');
    Array.prototype.forEach.call(rt,function(r){
      r.checked=(Number(r.value)===S.total);
      r.addEventListener('change',function(){S.total=Number(r.value);S.left=S.total;paintHub();});
    });
    Array.prototype.forEach.call(rm,function(r){
      r.checked=(r.value===S.mode);
      r.addEventListener('change',function(){S.mode=r.value;});
    });
    $('start').addEventListener('click',startGame);
  }

  /* Versión TEA */
  function versionHTML(){
    return '<fieldset><legend>Versión</legend><div class="seg">'+
      '<label><input type="radio" name="ver" value="std"><span>Normal</span></label>'+
      '<label><input type="radio" name="ver" value="tea"><span>Con apoyos visuales</span></label>'+
    '</div></fieldset>';
  }
  function bindVersion(){
    Array.prototype.forEach.call(panel.querySelectorAll('input[name="ver"]'),function(r){
      r.checked=((r.value==='tea')===S.tea);
      r.addEventListener('change',function(){
        S.tea=(r.value==='tea');
        S.total=S.tea?0:480;S.left=S.total;
        renderIntro();paintHub();
      });
    });
  }
  function renderIntroTea(){
    panel.innerHTML=
      '<h2>El Rosco de la Vida Saludable</h2>'+
      '<div class="steps3">'+
        '<div class="s3"><span class="pic" aria-hidden="true">👀</span><b>1. Mira</b></div>'+
        '<div class="s3"><span class="pic" aria-hidden="true">👆</span><b>2. Elige</b></div>'+
        '<div class="s3"><span class="pic" aria-hidden="true">⭐</span><b>3. Descubre</b></div>'+
      '</div>'+
      '<ul class="rules">'+
        '<li>Hay '+N+' letras.</li>'+
        '<li>No hay prisa y no hay reloj.</li>'+
        '<li>Si no quieres una letra, pulsa «Ahora no».</li>'+
        '<li>Al terminar una letra, pulsa «Siguiente».</li>'+
      '</ul>'+
      '<div class="legend"><span><i class="sw ok"></i>Bien</span><span><i class="sw bad"></i>Para repasar</span><span><i class="sw s"></i>Ahora no</span><span><i class="sw ch"></i>Prueba</span></div>'+
      versionHTML()+
      '<div class="row"><button class="btn" id="start" type="button" data-autofocus>Empezar</button></div>';
    bindVersion();
    $('start').addEventListener('click',startGame);
  }
  function renderQuestionTea(){
    var it=ITEMS[S.idx],t=TEA[it.l];
    var cor=t.opts[0],order=t.opts.slice(1);
    order.splice(S.idx%3,0,cor);
    var canSay=('speechSynthesis' in window)&&('SpeechSynthesisUtterance' in window);
    panel.innerHTML=
      '<div class="qhead"><span class="badge">'+it.l+'</span><p class="kicker">Letra '+it.l+'</p></div>'+
      '<div class="bigpic pic" aria-hidden="true">'+t.pics+'</div>'+
      '<p class="clue">'+t.short+'</p>'+
      (canSay?'<div class="row"><button class="btn quiet" id="say" type="button"><span class="pic" aria-hidden="true">🔊</span> Escuchar</button></div>':'')+
      '<div class="opts">'+order.map(function(o,i){
        return '<button type="button" class="opt" data-i="'+i+'"><span class="pic" aria-hidden="true">'+o[1]+'</span><span>'+o[0]+'</span></button>';
      }).join('')+'</div>'+
      '<div class="row"><button class="btn quiet" id="pass" type="button">Ahora no</button></div>'+
      '<button class="link" id="quit" type="button">Terminar ahora</button>';
    Array.prototype.forEach.call(panel.querySelectorAll('.opt'),function(b){
      b.addEventListener('click',function(){resolve(order[Number(b.getAttribute('data-i'))]===cor?'ok':'bad');});
    });
    $('pass').addEventListener('click',pass);
    var say=$('say');
    if(say)say.addEventListener('click',function(){
      try{var u=new SpeechSynthesisUtterance(t.short);u.lang='es-ES';u.rate=.9;window.speechSynthesis.cancel();window.speechSynthesis.speak(u);}catch(e){}
    });
    bindQuit();
  }
  function renderChallengeTea(){
    var it=ITEMS[S.idx],ch=S.ch,t=TEA[it.l];
    var html=
      '<div class="qhead"><span class="badge ch">'+it.l+'</span><div><p class="kicker">Prueba comodín</p><h2>'+it.name+'</h2></div></div>'+
      '<ol class="vsteps">'+t.steps.map(function(s){return '<li><span class="pic" aria-hidden="true">'+s[0]+'</span><span>'+s[1]+'</span></li>';}).join('')+'</ol>';
    if(t.tip)html+='<p class="note"><span class="pic" aria-hidden="true">💡</span> '+t.tip+'</p>';
    if(ch.phase==='ready'){
      html+=
        '<p class="note"><span class="pic" aria-hidden="true">⏱️</span> '+it.seconds+' segundos</p>'+
        '<div class="row"><button class="btn" type="button" id="go" data-autofocus>Empezar</button><button class="btn quiet" type="button" id="pass">Ahora no</button></div>';
    }else{
      html+=
        (ch.phase==='running'
          ?'<div class="count" id="chTime" role="timer">'+Math.ceil(ch.left)+'</div>'
          :'<div class="count done" id="chTime">¡Tiempo!</div>')+
        '<div class="bar" aria-hidden="true"><i id="chBar" style="width:'+(ch.left/it.seconds*100)+'%"></i></div>'+
        '<div class="row"><button class="btn" type="button" id="yes" data-autofocus>Sí, hecho</button><button class="btn quiet" type="button" id="no">Lo intento otro día</button></div>';
    }
    html+='<button class="link" id="quit" type="button">Terminar ahora</button>';
    panel.innerHTML=html;
    if(ch.phase==='ready'){
      $('go').addEventListener('click',function(){S.ch.phase='running';lastT=performance.now();renderChallenge();});
      $('pass').addEventListener('click',pass);
    }else{
      $('yes').addEventListener('click',function(){resolve('ok');});
      $('no').addEventListener('click',function(){resolve('bad');});
    }
    bindQuit();focusFirst();
  }
  function renderFeedbackTea(result){
    var it=ITEMS[S.idx],t=TEA[it.l],ok=result==='ok',isC=it.type==='c';
    var html='<div class="fb '+(ok?'good':'bad')+'" role="status">'+(ok?'<span class="pic" aria-hidden="true">⭐</span> ¡Muy bien!':'Para repasar')+'</div>';
    html+='<div class="bigpic pic" aria-hidden="true">'+t.pics+'</div>';
    if(!isC)html+='<p class="answer-line">Es <strong>'+t.opts[0][0]+'</strong></p>';
    html+='<div class="fact"><p class="kicker">¿Sabías que…?</p><p>'+t.fact+'</p></div>';
    var more=nextIndex(S.idx)>=0;
    html+='<div class="row"><button class="btn" type="button" id="next" data-autofocus>'+(more?'Siguiente':'Ver el final')+'</button></div>';
    html+='<button class="link" id="quit" type="button">Terminar ahora</button>';
    panel.innerHTML=html;
    $('next').addEventListener('click',function(){goNext(S.idx);});
    bindQuit();focusFirst();
  }

  function renderQuestion(){
    if(S.tea){renderQuestionTea();return;}
    var it=ITEMS[S.idx];
    var html=
      '<div class="qhead"><span class="badge">'+it.l+'</span><div><p class="kicker">Empieza por la letra '+it.l+'</p></div></div>'+
      '<p class="clue">'+it.clue+'</p>';
    if(S.mode==='type'){
      html+=
        '<form id="form" autocomplete="off" novalidate>'+
          '<label class="sr" for="answer">Tu respuesta</label>'+
          '<input id="answer" type="text" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Escribe la palabra" data-autofocus>'+
          '<p class="hint" id="hint" role="status"></p>'+
          '<div class="row"><button class="btn" type="button" id="send">Responder</button><button class="btn skip" type="button" id="pass">Pasapalabra</button></div>'+
        '</form>';
    }else{
      html+=
        '<div id="voice">'+
          '<div class="row"><button class="btn" type="button" id="reveal" data-autofocus>Ver la respuesta</button><button class="btn skip" type="button" id="pass">Pasapalabra</button></div>'+
        '</div>';
    }
    html+='<button class="link" id="quit" type="button">Terminar ahora</button>';
    panel.innerHTML=html;
    $('pass').addEventListener('click',pass);
    if(S.mode==='type'){
      /* No depende del envío de formulario: el visor puede bloquearlo. Funciona con el botón y con Intro. */
      var sent=false;
      function sendAnswer(){
        if(sent)return;
        var v=$('answer').value;
        if(!norm(v)){$('hint').textContent='Escribe una respuesta o pulsa Pasapalabra.';return;}
        sent=true;
        resolve(isCorrect(v,it)?'ok':'bad');
      }
      $('form').addEventListener('submit',function(e){e.preventDefault();});
      $('send').addEventListener('click',sendAnswer);
      $('answer').addEventListener('keydown',function(e){
        if(e.key==='Enter'){e.preventDefault();sendAnswer();}
      });
    }else{
      $('reveal').addEventListener('click',function(){
        S.revealed=true;
        $('voice').innerHTML=
          '<p class="answer-line">La respuesta es <strong>'+it.answers[0]+'</strong></p>'+
          '<div class="row" style="margin-top:.8rem"><button class="btn" type="button" id="yes" data-autofocus>Ha acertado</button><button class="btn bad" type="button" id="no">Ha fallado</button></div>';
        $('yes').addEventListener('click',function(){resolve('ok');});
        $('no').addEventListener('click',function(){resolve('bad');});
        focusFirst();
      });
    }
    bindQuit();focusFirst();
  }

  function renderChallenge(){
    if(S.tea){renderChallengeTea();return;}
    var it=ITEMS[S.idx],ch=S.ch;
    var html=
      '<div class="qhead"><span class="badge ch">'+it.l+'</span><div><p class="kicker">Prueba comodín</p><h2>'+it.name+'</h2></div></div>'+
      '<p class="clue">'+it.text+'</p>';
    if(ch.phase==='ready'){
      html+=
        '<p class="note">Tiempo de la prueba: '+it.seconds+' segundos. El reloj del rosco se detiene mientras tanto.</p>'+
        '<div class="row"><button class="btn" type="button" id="go" data-autofocus>¡Empezar la prueba!</button><button class="btn skip" type="button" id="pass">Pasapalabra</button></div>';
    }else{
      html+=
        (ch.phase==='running'
          ?'<div class="count" id="chTime" role="timer">'+Math.ceil(ch.left)+'</div>'
          :'<div class="count done" id="chTime">¡Tiempo!</div>')+
        '<p class="note">¿Lo habéis conseguido?</p>'+
        '<div class="row"><button class="btn" type="button" id="yes" data-autofocus>¡Superada!</button><button class="btn bad" type="button" id="no">No ha salido</button></div>';
    }
    html+='<button class="link" id="quit" type="button">Terminar ahora</button>';
    panel.innerHTML=html;
    if(ch.phase==='ready'){
      $('go').addEventListener('click',function(){S.ch.phase='running';lastT=performance.now();renderChallenge();});
      $('pass').addEventListener('click',pass);
    }else{
      $('yes').addEventListener('click',function(){resolve('ok');});
      $('no').addEventListener('click',function(){resolve('bad');});
    }
    bindQuit();focusFirst();
  }

  function renderFeedback(result){
    if(S.tea){renderFeedbackTea(result);return;}
    var it=ITEMS[S.idx],ok=result==='ok',isC=it.type==='c';
    var title=isC?(ok?'¡Prueba superada!':'No ha salido. ¡Otra vez será!'):(ok?'¡Correcto!':'No era esa');
    var html='<div class="fb '+(ok?'good':'bad')+'" role="status">'+title+'</div>';
    html+='<div class="bigpic sm pic" aria-hidden="true">'+TEA[it.l].pics+'</div>';
    if(!isC)html+='<p class="answer-line">La respuesta es <strong>'+it.answers[0]+'</strong></p>';
    if(isC&&it.tip)html+='<p class="note">'+it.tip+'</p>';
    html+='<div class="fact"><p class="kicker">¿Sabías que…?</p><p>'+it.fact+'</p></div>';
    var more=nextIndex(S.idx)>=0;
    html+='<div class="row"><button class="btn" type="button" id="next" data-autofocus>'+(more?'Siguiente letra':'Ver resultados')+'</button></div>';
    html+='<button class="link" id="quit" type="button">Terminar ahora</button>';
    panel.innerHTML=html;
    $('next').addEventListener('click',function(){goNext(S.idx);});
    bindQuit();focusFirst();
  }

  function renderEnd(){
    var c=counts();
    var title;
    if(S.reason==='time')title='¡Se acabó el tiempo!';
    else if(S.reason==='quit')title='Rosco terminado';
    else title='¡Rosco completado!';
    if(S.tea)title='¡Has terminado el rosco!';
    var msg;
    if(c.ok===N)msg='Todas las letras en verde. Eres una persona experta en vida saludable.';
    else if(c.ok>=Math.ceil(N*0.75))msg='¡Gran trabajo! Casi no se te escapa nada.';
    else if(c.ok>=Math.ceil(N*0.5))msg='Muy buen trabajo. Repasa lo que has fallado y el próximo rosco será perfecto.';
    else if(c.ok>=Math.ceil(N*0.25))msg='Vas por buen camino. Repasa las respuestas y vuelve a probar.';
    else msg='Toca seguir entrenando. Repasa las respuestas y juega otra vez.';
    if(S.tea)msg='Gracias por jugar. Las letras para repasar están marcadas en naranja.';
    var chips=ITEMS.map(function(it,i){
      var r=S.res[i],mark=r==='ok'?'Bien':(r==='bad'?'Mal':'Sin resolver');
      var word=it.type==='c'?it.name:it.answers[0];
      return '<li class="chip'+(it.type==='c'?' c':'')+'" data-s="'+r+'" aria-label="'+it.l+', '+word+', '+mark+'"><b>'+it.l+'</b><em>'+word+'</em></li>';
    }).join('');
    panel.innerHTML=
      '<h2>'+title+'</h2>'+
      '<p class="lead">'+msg+'</p>'+
      '<div class="stats">'+
        '<div class="stat"><b>'+c.ok+'</b><span>Bien</span></div>'+
        '<div class="stat"><b>'+c.bad+'</b><span>'+(S.tea?'Para repasar':'Mal')+'</span></div>'+
        '<div class="stat"><b>'+c.left+'</b><span>Sin resolver</span></div>'+
        '<div class="stat"><b>'+fmt(S.elapsed)+'</b><span>Tiempo de juego</span></div>'+
      '</div>'+
      '<div><p class="kicker" style="margin-bottom:.5rem">Repaso del rosco</p><ul class="review">'+chips+'</ul></div>'+
      '<div class="row"><button class="btn" type="button" id="again" data-autofocus>Jugar otra vez</button></div>';
    $('again').addEventListener('click',function(){
      S=fresh(S);renderIntro();paintRosco();paintHub();
    });
    focusFirst();
  }

  buildRosco();
  renderIntro();
  paintRosco();
  paintHub();
})();
