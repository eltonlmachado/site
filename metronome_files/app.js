var metronome = new Metronome();
var tempoDisplay = document.getElementById('tempo');

// Set initial tempo display
tempoDisplay.textContent = metronome.tempo;

// Event listener for tempo display input
tempoDisplay.addEventListener('input', function () {
    // Parse the entered value as an integer
    var enteredValue = parseInt(tempoDisplay.textContent);
    
    // Check if the entered value is greater than 1
    if (enteredValue <= 1 || isNaN(enteredValue)) {
        // If not, prevent the default behavior and revert to the previous valid value
        tempoDisplay.textContent = metronome.tempo;
    } else {
        // If valid, update the tempo in the Metronome object
        metronome.setTempo(enteredValue);
    }
});

// Event listener for play/pause button
var playPauseIcon = document.getElementById('play-pause-icon');
var playButton = document.getElementById('play-button');
playButton.addEventListener('click', function () {
    metronome.startStop();
    document.getElementById('play-button').classList.remove('beat-on');
    if (metronome.isRunning) {
        playPauseIcon.className = 'pause';
    } else {
        playPauseIcon.className = 'play';
    }
});

// Event listeners for tempo change buttons
var tempoChangeButtons = document.getElementsByClassName('tempo-change');
for (var i = 0; i < tempoChangeButtons.length; i++) {
    tempoChangeButtons[i].addEventListener('click', function () {
        var newTempo = metronome.tempo + parseInt(this.dataset.change);
        // Ensure the new tempo is not negative
        newTempo = Math.max(1, newTempo);
        metronome.setTempo(newTempo);
        tempoDisplay.textContent = newTempo;
    });
}

// Event listeners for beats change buttons
var beatsChangeButtons = document.getElementsByClassName('beat-change');
var notesPerMeasureDisplay = document.getElementById('beats');
for (var i = 0; i < beatsChangeButtons.length; i++) {
    beatsChangeButtons[i].addEventListener('click', function () {
        metronome.notesPerMeasure += parseInt(this.dataset.change);
        notesPerMeasureDisplay.textContent = metronome.notesPerMeasure;
    });
}

// Event listener for spacebar and enter key to start/stop metronome
document.addEventListener("keydown", function (e) {
    if (e.keyCode == '0' || e.keyCode == '32' || e.keyCode == '13') {
        metronome.startStop();
        if (metronome.isRunning) {
            playPauseIcon.className = 'pause';
        } else {
            playPauseIcon.className = 'play';
        }
        e.preventDefault();
    }
});

// Local storage handling for stressFirst and flashColors preferences
jQuery(function () {
    var stressFirst = localStorage.stressFirst === 'true' ? true : false;
    jQuery('#stressFirst').prop('checked', stressFirst || false);
    var flashColors = localStorage.flashColors === 'true' ? true : false;
    jQuery('#flashColors').prop('checked', flashColors || false);
});

// Event listener for flashColors checkbox
jQuery('#flashColors').on('change', function () {
    localStorage.flashColors = jQuery(this).is(':checked');
    console.log(jQuery(this).is(':checked'));
});

// Event listener for stressFirst checkbox
jQuery('#stressFirst').on('change', function () {
    localStorage.stressFirst = jQuery(this).is(':checked');
    console.log(jQuery(this).is(':checked'));
});
