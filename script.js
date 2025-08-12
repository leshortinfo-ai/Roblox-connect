async function searchPlayer() {
  const username = document.getElementById('username').value.trim();
  const result = document.getElementById('result');
  result.innerHTML = '';
  if (!username) {
    return result.innerHTML = '<p class="small">Veuillez entrer un pseudo.</p>';
  }
  result.innerHTML = '<p class="small">Recherche en cours…</p>';
  try {
    // CHANGE this URL after deployment to your backend public URL
    const backend = 'http://localhost:8000';
    const res = await fetch(`${backend}/api/player/${encodeURIComponent(username)}`);
    if (!res.ok) {
      if (res.status === 404) {
        result.innerHTML = '<p class="small">❌ Joueur introuvable.</p>';
      } else {
        result.innerHTML = '<p class="small">❌ Erreur serveur.</p>';
      }
      return;
    }
    const data = await res.json();
    result.innerHTML = `
      <h2>${data.username}</h2>
      <img src="${data.avatar}" alt="avatar" />
      <p class="small">UserId: ${data.userId}</p>
      <p class="small">Status: ${data.server.status}</p>
    `;
  } catch (err) {
    result.innerHTML = '<p class="small">Erreur réseau (backend offline?)</p>';
    console.error(err);
  }
}

document.getElementById('btnSearch').addEventListener('click', searchPlayer);
document.getElementById('username').addEventListener('keypress', function(e){
  if(e.key === 'Enter') searchPlayer();
});