const deleteProduct = (btn)=> {
    const prodId= btn.parentNode.querySelector('[name=productId]').value;
    const csrfId= btn.parentNode.querySelector('[name=_csrf]').value;
    console.log(prodId, csrfId);
}