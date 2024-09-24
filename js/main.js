// Desplazamiento horizontal
document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
        scrollContainer.addEventListener('wheel', (event) => {
            event.preventDefault();
            const scrollSpeed = 8;
            scrollContainer.scrollLeft += event.deltaY * scrollSpeed;
        }, { passive: false });
    }
});

// Formulario de comentarios
document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    

    if (commentForm) {
        commentForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim(); // Agrega la captura del email
            const comment = document.getElementById('comment').value.trim();

            if (!name || !email || !comment) {
                alert('Llena todos los campos.');
                return;
            }

            // Enviar el comentario al servidor
            try {
                const response = await fetch('procesar.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        name: name,
                        email: email,
                        comment: comment
                    })
                });

                if (response.ok) {
                    const newComment = document.createElement('div');
                    newComment.className = 'comment';
                    newComment.innerHTML = `<strong>${name}:</strong> ${comment}`;
                    commentsContainer.appendChild(newComment);
                    commentForm.reset();
                    alert('Gracias por tu comentario!');

                    // Opcionalmente, puedes volver a cargar todos los comentarios desde el servidor
                    // cargarComentarios();
                } else {
                    alert('Error al enviar el comentario.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al enviar el comentario. Intenta de nuevo.');
            }
        });
    }
});

// Función para cargar comentarios existentes
async function cargarComentarios() {
    try {
        const response = await fetch('procesar.php');
        if (response.ok) {
            const comments = await response.text();
            const commentsContainer = document.getElementById('commentsContainer');
            commentsContainer.innerHTML = comments;
        } else {
            console.error('Error al cargar los comentarios');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Llamar a la función para cargar comentarios al cargar la página
cargarComentarios();


// Mensaje de rotación de dispositivo
const rotateMessage = document.querySelector('.rotate-device-message');

function checkOrientation() {
    const message = document.querySelector('.rotate-device-message');
    if (message) {
        message.style.display = (window.innerHeight > window.innerWidth) ? 'block' : 'none';
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('DOMContentLoaded', checkOrientation);

