```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Glitch effect for header
  const header = document.querySelector('.glitch-text');
  if (header) {
    setInterval(() => {
      const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
      const originalText = header.getAttribute('data-text') || header.textContent;
      const glitched = originalText.split('').map(char => 
        Math.random() > 0.85 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
      ).join('');
      header.textContent = glitched;
      setTimeout(() => header.textContent = originalText, 100);
    }, 3000);
  }

  // Add to cart functionality
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const form = this.closest('form');
      const formData = new FormData(form);
      
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Update cart count
        fetch('/cart.js')
          .then(response => response.json())
          .then(cart => {
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
              cartCount.textContent = cart.item_count;
            }
          });
        alert('Added to cart!');
      })
      .catch(error => console.error('Error:', error));
    });
  });
});
```
