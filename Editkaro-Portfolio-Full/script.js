const filterBtns=document.querySelectorAll('.filter-btn');
const cards=document.querySelectorAll('.card');

filterBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    const category=btn.getAttribute('data-category');
    cards.forEach(card=>{
      if(category==='all' || card.getAttribute('data-category')===category){
        card.style.display='block';
      }else{
        card.style.display='none';
      }
    });
  });
});

function openModal(videoUrl){
  document.getElementById('videoModal').style.display='block';
  document.getElementById('videoFrame').src=videoUrl;
}
function closeModal(){
  document.getElementById('videoModal').style.display='none';
  document.getElementById('videoFrame').src='';
}
window.onclick=function(event){
  const modal=document.getElementById('videoModal');
  if(event.target==modal){closeModal();}
}