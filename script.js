function updateIDCard() {
  document.getElementById("id-name").textContent = document.getElementById("name").value;
  document.getElementById("id-email").textContent = document.getElementById("email").value;
  document.getElementById("id-department").textContent = document.getElementById("department").value;
  document.getElementById("id-matric").textContent = document.getElementById("matric").value;
  document.getElementById("id-skills").textContent = document.getElementById("skills").value;

  const photoInput = document.getElementById("photo");
  const photoPreview = document.getElementById("id-photo");

  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      photoPreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Photo">`;
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    photoPreview.innerHTML = `<span>Photo</span>`;
  }
}

function downloadIDCard() {
  const card = document.getElementById('id-card');
  html2canvas(card).then(canvas => {
    const link = document.createElement('a');
    link.download = 'id-card.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

function printIDCard() {
  const card = document.getElementById('id-card').outerHTML;
  const newWin = window.open('', '', 'width=400,height=600');
  newWin.document.write(`
    <html>
      <head>
        <title>Print ID Card</title>
        <style>
          body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;}
          .id-card { box-shadow: 0 8px 20px rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; text-align: center; width: 300px; }
          .photo-placeholder { width: 100px; height: 100px; border-radius: 50%; overflow: hidden; margin: 10px auto; }
          .photo-placeholder img { width: 100%; height: 100%; object-fit: cover; }
          .id-info p { font-size: 14px; margin: 6px 0; }
        </style>
      </head>
      <body>${card}</body>
    </html>
  `);
  newWin.document.close();
  newWin.focus();
  newWin.print();
  newWin.close();
}
