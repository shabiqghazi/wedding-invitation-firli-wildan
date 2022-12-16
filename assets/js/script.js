let tanggalPernikahan = new Date("Dec 28, 2022 08:00:00").getTime();

var myfunc = setInterval(function () {
  var now = new Date().getTime();
  var timeleft = tanggalPernikahan - now;

  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  document.getElementById("jml-hari").innerHTML = days;
  document.getElementById("jml-jam").innerHTML = hours;
  document.getElementById("jml-menit").innerHTML = minutes;
  document.getElementById("jml-detik").innerHTML = seconds;

  if (timeleft < 0) {
    clearInterval(myfunc);
    let countDownContainer = document.getElementById("count-down");
    countDownContainer.classList.add("hidden");
    document.getElementById("menuju").classList.add("hidden");
    document.getElementById("status").classList.remove("hidden");
    if (
      timeleft * -1 + tanggalPernikahan <
      tanggalPernikahan + 1000 * 60 * 60 * 24
    ) {
      console.log(
        timeleft * -1 + tanggalPernikahan,
        tanggalPernikahan + 60 * 60 * 24
      );
    } else {
      document.getElementById("status").innerText = "Acara sudah selesai";
    }
  }
}, 1000);

let cover = document.getElementById("cover");
let coverOpen = document.getElementById("open");
let backsoundToggle = document.getElementById("backsound-toggle");
let backsound = document.getElementById("backsound");
let isPlaying = false;
coverOpen.addEventListener("click", () => {
  window.scrollTo(0, 0);
  cover.style.top = "-100vh";
  backsound.volume = 0.3;
  backsound.play();
  isPlaying = true;
  document.getElementById("body").classList.remove("overflow-hidden");
  AOS.init();
});
backsoundToggle.addEventListener("click", () => {
  console.log(isPlaying);
  if (isPlaying) {
    backsound.pause();
    isPlaying = false;
    document.getElementById("play").classList.remove("hidden");
    document.getElementById("pause").classList.add("hidden");
  } else {
    backsound.play();
    isPlaying = true;
    document.getElementById("pause").classList.remove("hidden");
    document.getElementById("play").classList.add("hidden");
  }
});

let paramString = document.location.search.split("?")[1];
let params_arr = paramString.split("&");

for (let i = 0; i < params_arr.length; i++) {
  let pair = params_arr[i].split("=");
  if (pair[1]) {
    document.getElementById("tujuan").classList.remove("hidden");
    let recipient = decodeURIComponent(pair[1]);
    document.getElementById("penerima").innerText = recipient;
  }
}
