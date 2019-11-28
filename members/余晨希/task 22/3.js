var ct = document.querySelector('.ct');
ct.addEventListener('mouseover', function(e){
    var imgName = e.target.getAttribute('data-img');
    var newImage = document.createElement('img');
    newImage.setAttribute('src', imgName);
    document.querySelector('.img-preview').innerHTML = '';
    document.querySelector('.img-preview').appendChild(newImage);
})