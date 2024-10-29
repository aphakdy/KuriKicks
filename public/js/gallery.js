document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/gallery')
    .then(response => response.json())
    .then(data => displayGalleryItems(data))
    .catch(error => console.error('Error fetching gallery items:', error));
});

function displayGalleryItems(items) {
    const container = document.getElementById('galleryContainer');
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'polaroid';
        itemElement.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}">
            <h3>${item.title}</h3>
        `;

        // attach event listener for showing details
        itemElement.onclick = () => {
            showDetails(item);
        };

        container.appendChild(itemElement);
    });
}

// function to show details of a gallery item
function showDetails(item) {
    const detailModalBody = document.querySelector('#detailModal .modal-body');
    detailModalBody.innerHTML = `
        <h5>${item.title}</h5>
        <img src="${item.imageUrl}" alt="${item.title}" class="img-fluid mb-2">
        <p>${item.description}</p>
        <p>Taken by: ${item.photographerName}</p>
    `;
    $('#detailModal').modal('show');
}

// preview image function for the upload form
function previewImage() {
    var fileInput = document.getElementById("imageUpload");
    var file = fileInput.files[0];
    if (file) {
        var fileReader = new FileReader();
        fileReader.onloadend = function(e) {
            var imagePreview = document.getElementById("imagePreview");
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        fileReader.readAsDataURL(file);
    }
}

// button to show the upload modal with a clean state
document.getElementById('addPostBtn').addEventListener('click', function() {
    document.getElementById('uploadForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
    $('#uploadModal').modal('show'); 
});

// handle form submission for new gallery items
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('/api/gallery', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            addPostToGallery(data.post);
            $('#uploadModal').modal('hide');
            this.reset();
            document.getElementById('imagePreview').style.display = 'none';
        } else {
            alert('Failed to upload: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        alert('Error uploading file.');
    });
});

// add a new post to the gallery 
function addPostToGallery(post) {
    const container = document.getElementById('galleryContainer');
    const itemElement = document.createElement('div');
    itemElement.className = 'polaroid';
    itemElement.innerHTML = `
        <img src="${post.imageUrl}" alt="${post.title}" style="width:100%;">
        <h3>${post.title}</h3>
    `;

    itemElement.onclick = () => {
        showDetails(post);
    };

    container.appendChild(itemElement);
}
