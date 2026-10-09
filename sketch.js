let imageModelURL = 'https://teachablemachine.withgoogle.com/models/PASTE_YOUR_MODEL_ID_HERE/';

let classifier, video, label = "Standby", confidence = 0.0;
let currentSlide = 1;
let totalSlides = 5;
let canChange = true;

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  classifier = ml5.imageClassifier(imageModelURL + 'model.json', video, () => classifyVideo());
}

function classifyVideo() {
  classifier.classify(gotResult);
}

function gotResult(err, res) {
  if (!err && res.length > 0) {
    label = res[0].label;
    confidence = res[0].confidence;
    handleNavigation();
  }
  classifyVideo();
}
