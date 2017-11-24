const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        }).catch(err => {
        console.error(`You need to allow access to camera to use this app ${err}`);
    })
}

function paintImageToCanvas() {
    const height = video.videoHeight;
    const width = video.videoWidth;

    canvas.height = height;
    canvas.width = width;

    console.log(width, height);

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let pixels = ctx.getImageData(0, 0, height, width);
      //  pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        ctx.globalAlpha=0.5;
        ctx.putImageData(pixels, 0, 0);
    }, 16);

}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100;  //red
        pixels.data[i + 1] = pixels.data[i + 1] - 50;//green
        pixels.data[i + 2] = pixels.data[i + 2] * 1.5;//blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 350] = pixels.data[i + 0];  //red
        pixels.data[i + 250] = pixels.data[i + 1];//green
        pixels.data[i - 550] = pixels.data[i + 2];//blue
    }
    return pixels;
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();
    const data = canvas.toDataURL('image/jpeg');
    console.log(data);
    const link = document.createElement('a');
    link.setAttribute('download', 'handsome');
    link.href = data;

    link.innerHTML = `<img src="${data}"/>`;

    strip.insertBefore(link, strip.firstChild);
}




getVideo();

video.addEventListener('canplay', paintImageToCanvas);



