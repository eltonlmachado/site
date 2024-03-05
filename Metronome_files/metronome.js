class Metronome
{constructor(tempo=120)
{this.audioContext=null;this.notesInQueue=[];this.currentQuarterNote=0;this.tempo=parseInt(document.getElementById('tempo').textContent);this.lookahead=25;this.scheduleAheadTime=0.1;this.nextNoteTime=0.0;this.isRunning=false;this.intervalID=null;this.notesPerMeasure=parseInt(document.getElementById('beats').textContent);this.stressFirst=document.getElementById("stressFirst");this.flashColors=document.getElementById("flashColors");}
nextNote()
{var secondsPerBeat=60.0/this.tempo;this.nextNoteTime+=secondsPerBeat;this.currentQuarterNote++;if(this.currentQuarterNote==this.notesPerMeasure){this.currentQuarterNote=0;}}
scheduleNote(beatNumber,time)
{this.notesInQueue.push({note:beatNumber,time:time});const osc=this.audioContext.createOscillator();const envelope=this.audioContext.createGain();if(document.getElementById("stressFirst").checked){osc.frequency.value=(beatNumber%this.notesPerMeasure==0)?1000:800;}else{osc.frequency.value=(beatNumber%this.notesPerMeasure==0)?800:800;}
envelope.gain.value=1;envelope.gain.exponentialRampToValueAtTime(1,time+0.001);envelope.gain.exponentialRampToValueAtTime(0.001,time+0.02);osc.connect(envelope);envelope.connect(this.audioContext.destination);osc.start(time);osc.stop(time+0.03);if(document.getElementById("flashColors").checked){document.getElementById('play-button').classList.toggle('beat-on');}}
scheduler()
{while(this.nextNoteTime<this.audioContext.currentTime+this.scheduleAheadTime){this.scheduleNote(this.currentQuarterNote,this.nextNoteTime);this.nextNote();}}
start()
{if(this.isRunning)return;if(this.audioContext==null)
{this.audioContext=new(window.AudioContext||window.webkitAudioContext)();}
this.isRunning=true;this.currentQuarterNote=0;this.nextNoteTime=this.audioContext.currentTime+0.05;this.intervalID=setInterval(()=>this.scheduler(),this.lookahead);}
stop()
{this.isRunning=false;clearInterval(this.intervalID);}
startStop()
{if(this.isRunning){this.stop();}
else{this.start();}}}