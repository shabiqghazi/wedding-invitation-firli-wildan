let url = "https://wedding-invitation-firli-wildan.vercel.app/";
document.getElementById("url").value = url;

const copy = () => {
  navigator.clipboard.writeText(url);
};

document.getElementById("tujuan").addEventListener("keyup", () => {
  url = "https://wedding-invitation-firli-wildan.vercel.app/?u=";
  url += encodeURI(document.getElementById("tujuan").value);
  document.getElementById("url").value = url;
});

document.getElementById("copy-url").addEventListener("click", (e) => {
  copy();
  e.target.innerText = "Copied!";
});
