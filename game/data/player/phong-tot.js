function askPromotion(color, callback){
  const promoEl = document.getElementById('promo');
  promoEl.classList.add('active');

  const options = promoEl.querySelectorAll('.opt');
  options.forEach(opt=>{
    opt.onclick = ()=>{
      const piece = color + opt.dataset.p; // ví dụ: "wQ", "bN"
      promoEl.classList.remove('active');
      callback(piece);
    };
  });
}
