var metronome=new Metronome();var tempo=document.getElementById('tempo');tempo.textContent=metronome.tempo;var notesPerMeasure=document.getElementById('beats');notesPerMeasure.textContent=metronome.notesPerMeasure;var playPauseIcon=document.getElementById('play-pause-icon');var playButton=document.getElementById('play-button');playButton.addEventListener('click',function(){metronome.startStop();document.getElementById('play-button').classList.remove('beat-on');if(metronome.isRunning){playPauseIcon.className='pause';}
else{playPauseIcon.className='play';}});var tempoChangeButtons=document.getElementsByClassName('tempo-change');for(var i=0;i<tempoChangeButtons.length;i++){tempoChangeButtons[i].addEventListener('click',function(){metronome.tempo+=parseInt(this.dataset.change);tempo.textContent=metronome.tempo;});}
var beatsChangeButtons=document.getElementsByClassName('beat-change');for(var i=0;i<beatsChangeButtons.length;i++){beatsChangeButtons[i].addEventListener('click',function(){metronome.notesPerMeasure+=parseInt(this.dataset.change);notesPerMeasure.textContent=metronome.notesPerMeasure;});}
document.addEventListener("keydown",function(e){if(e.keyCode=='0'||e.keyCode=='32'||e.keyCode=='13'){metronome.startStop();if(metronome.isRunning){playPauseIcon.className='pause';}
else{playPauseIcon.className='play';}
e.preventDefault();}});jQuery(function(){var stressFirst=localStorage.stressFirst==='true'?true:false;jQuery('#stressFirst').prop('checked',stressFirst||false);var flashColors=localStorage.flashColors==='true'?true:false;jQuery('#flashColors').prop('checked',flashColors||false);});jQuery('#flashColors').on('change',function(){localStorage.flashColors=jQuery(this).is(':checked');console.log(jQuery(this).is(':checked'));});jQuery('#stressFirst').on('change',function(){localStorage.stressFirst=jQuery(this).is(':checked');console.log(jQuery(this).is(':checked'));});