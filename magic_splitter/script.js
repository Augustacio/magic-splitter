let tipoEscolhido = null;

function escolherTipo(tipo) {
  tipoEscolhido = tipo;
  const tipoTexto = tipo === 'ruido' ? "Redução de Ruído" : "Separação de Voz/Música";
  alert("👉 Escolheste: " + tipoTexto + ". Agora envia o teu áudio!");
  document.getElementById("uploadArea").style.display = "block";
}

function enviarAudio() {
  if (!tipoEscolhido) {
    alert("⚠️ Escolhe primeiro o que queres fazer.");
    return;
  }

  const input = document.getElementById("audioInput");
  const file = input.files[0];

  if (!file) {
    alert("Seleciona um ficheiro de áudio primeiro.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("tipo", tipoEscolhido);

  const serverURL = "https://TEU-LINK-REPLIT/upload"; // Substituir depois

  fetch(serverURL, {
    method: "POST",
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    if (data.filename) {
      const audioURL = `https://TEU-LINK-REPLIT/audio/${data.filename}`;
      document.getElementById("audioPreview").src = audioURL;
      document.getElementById("btnDownload").href = audioURL;
      document.getElementById("btnDownload").download = data.filename;
      document.getElementById("resultado").style.display = "block";
      document.getElementById("audioPreview").style.display = "block";
      document.getElementById("btnDownload").style.display = "inline-block";
    } else {
      alert("Erro ao carregar: " + data.error);
    }
  })
  .catch(err => {
    console.error("Erro:", err);
    alert("Erro ao conectar com o servidor.");
  });
}

function toggleMenu() {
  const menu = document.getElementById("menuLinks");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}