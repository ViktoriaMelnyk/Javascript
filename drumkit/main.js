document.body.addEventListener('keypress', onKeyPress);
document
    .querySelector('#recordBtn')
    .addEventListener('click', onRecordBtnClick);

//document.querySelector("#playBtn").addEventListener("click", onPlayBtnClick);
const recordBtn = document.querySelector('#recordBtn');
// const tracks = document.querySelector('.tracks');
let recordStartTime;
const recordedSounds = [];
let testArray = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function onKeyPress(ev) {
    let soundName;
    switch (ev.code) {
    case 'KeyA':
        soundName = 'boom';
        break;
    case 'KeyS':
        soundName = 'clap';
        break;
    case 'KeyD':
        soundName = 'hihat';
        break;
    case 'KeyF':
        soundName = 'kick';
        break;
    case 'KeyG':
        soundName = 'openhat';
        break;
    case 'KeyH':
        soundName = 'ride';
        break;
    case 'KeyJ':
        soundName = 'snare';
        break;
    case 'KeyK':
        soundName = 'tink';
        break;
    case 'KeyL':
        soundName = 'tom';
        break;
    }
    if (soundName) {
        const soundTime = Date.now() - recordStartTime;
        const soundObj = {
            id: soundName,
            time: soundTime,
        };
        if (recordBtn.classList.contains('notRec')) {
            document.querySelector('#' + soundName).parentElement.style.background =
        'rgba(' +
        getRandomInt(255) +
        ',' +
        getRandomInt(255) +
        ',' +
        getRandomInt(255) +
        ', .3)';
            playSound(soundName);
            setTimeout(function () {
                document.querySelector('#' + soundName).parentElement.style.background =
          'rgba(255,255,255,.2)';
            }, 200);
        } else {
            testArray.push(soundObj);
            document.querySelector('#' + soundName).parentElement.style.background =
        'rgba(' +
        getRandomInt(255) +
        ',' +
        getRandomInt(255) +
        ',' +
        getRandomInt(255) +
        ', .3)';
            playSound(soundName);
            setTimeout(function () {
                document.querySelector('#' + soundName).parentElement.style.background =
          'rgba(255,255,255,.2)';
            }, 200);
        }
    }
}

function onRecordBtnClick() {
    recordStartTime = Date.now();
    if (recordBtn.classList.contains('notRec')) {
        recordBtn.classList.remove('notRec');
        recordBtn.classList.add('rec');
    } else {
        recordBtn.classList.remove('rec');
        recordBtn.classList.add('notRec');
        recordedSounds.push(testArray);
        testArray = [];
        console.log(recordedSounds);
        document.getElementById('myTrack').innerHTML = '';
        for (var key in recordedSounds) {
            let text = document.createElement('div');
            text.innerHTML =
        '<button data-id=\'' +
        key +
        '\' class=\'my_track_edit\'><span></span></button> <button class=\'my_track_play\'><span></span></button>';
            document.getElementById('myTrack').appendChild(text);
        }
    }
}

// function onPlayBtnClick() {
//     for (let index = 0; index < recordedSounds.length; index++) {
//         const soundObj = recordedSounds[index];
//         setTimeout(() => {
//             playSound(soundObj.id);
//         }, soundObj.time);
//     }
// }

function playSound(id) {
    const sound = document.querySelector('#' + id);
    sound.currentTime = 0;
    sound.play();
}
