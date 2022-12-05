const getKomentar = () => {
  fetch("http://localhost:3000/komentar")
    .then((res) => res.json())
    .then((data) => {
      updateComments(data);
    })
    .catch((err) => console.log(err));
};
const updateComments = (data) => {
  let strings = "";
  data.forEach(
    (komen) =>
      (strings += `<div class="comment">
          <div class="flex items-center justify-between">
            <p class="text-xl text-dark font-bold">${komen.nama}</p>
            ${
              komen.kehadiran == 1
                ? "<p class='badge-hadir'>Hadir"
                : "<p class='badge-tidakhadir'>Tidak Hadir"
            }</p>
          </div>
          <p class="ucapan">${komen.ucapan}</p>
        </div>`)
  );
  document.getElementById("komentar-list").innerHTML = strings;
};

const tambahKomentar = (data) => {
  if (data.ucapan !== "") {
    if (data.nama == "") {
      data.nama = "Anonim";
    }
    fetch("http://localhost:3000/komentar", {
      method: "POST", // or 'PUT'
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "success") {
          document.getElementById("alert").classList.remove("invisible");
          setTimeout(() => {
            document.getElementById("alert").classList.add("invisible");
          }, 3000);
          getKomentar();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};
window.addEventListener("load", () => {
  getKomentar();
});
const nama = document.getElementById("nama");
const ucapan = document.getElementById("ucapan");
const kehadiran = document.getElementById("kehadiran");
document.getElementById("form-komentar").addEventListener("submit", (e) => {
  e.preventDefault();
  tambahKomentar({
    nama: nama.value,
    ucapan: ucapan.value,
    kehadiran: kehadiran.value,
  });
  document.getElementById("form-komentar").reset();
});
