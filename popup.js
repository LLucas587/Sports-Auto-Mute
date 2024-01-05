document.addEventListener('DOMContentLoaded', function () {
document.getElementById('getColorButton').addEventListener('click', function () {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, img.width, img.height);
        var pixelData = context.getImageData(10, 10, 1, 1).data;
        var color = `rgb  (${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
        document.getElementById('colorResult').innerText = 'Pixel Color: ' + color;
        white = new Uint8ClampedArray(4);
        white[0]=255;
        white[1]=255;
        white[2]=255;
        white[3]=255;
        console.log(pixelData == white);
        console.log(white);
        console.log(pixelData);
        if (pixelData == [255,255,255]){
          muteTab();
        }
      };
    });
  });
});


function muteTab() {
  chrome.tabs.query({url: []}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      var mutedInfo = tabs[i].mutedInfo;
      if (mutedInfo) chrome.tabs.update(tabs[i].id, {"muted": true});
    }
});
}