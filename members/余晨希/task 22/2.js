var startClick = document.getElementById("btn-add-start");
var endClick = document.getElementById("btn-add-end");
var ct = document.querySelector('.ct');
startClick.addEventListener('click', function(){
    var value = document.querySelector(".ipt-add-content").value;
    if(value){
        var newNode = document.createElement('li');
        newNode.innerHTML = value;
        ct.insertBefore(newNode,ct.firstChild);
    }
})
endClick.addEventListener('click',function () {
    var value = document.querySelector(".ipt-add-content").value;
    if(value){
        var newNode = document.createElement('li');
        newNode.innerHTML = value;
        ct.appendChild(newNode);
    }
})
ct.addEventListener('click', function(e){
        console.log(e.target.innerText);
    })