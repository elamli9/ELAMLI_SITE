// Firebase Configuration (Replace placeholders with your values)
const firebaseConfig = {
  apiKey: "AIzaSyC3ENJExu01i7yODhQQO5k6-BuZ13737T4",
  authDomain: "elamli-shop.firebaseapp.com",
  databaseURL: "https://elamli-shop-default-rtdb.firebaseio.com",
  projectId: "elamli-shop",
  storageBucket: "elamli-shop.appspot.com",
  messagingSenderId: "740777134694",
  appId: "1:740777134694:web:6064048d820d18540afba7",
  measurementId: "G-MNT2CS1QSD"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Get the productId from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');

if (productId) {
    db.ref(`products/${productId}`).once('value', (snapshot) => {
        const productData = snapshot.val();
        if (productData) {
            displayProductDetails(productData);
        } else {
            // Product not found - display an error
            document.getElementById('product-detail').innerHTML = '<div class="text-center text-red-500 font-bold mt-10">Product not found!</div>';
            document.getElementById('product-detail').classList.add('justify-center', 'items-center', 'h-screen'); 
        }
    });
} else {
    // productId missing from the URL - display an error
    document.getElementById('product-detail').innerHTML = '<div class="text-center text-red-500 font-bold mt-10">Product ID is missing!</div>';
    document.getElementById('product-detail').classList.add('justify-center', 'items-center', 'h-screen'); 
}
 function displayProductDetails(productData) {
      document.getElementById('product-title').textContent = productData.name;
      document.getElementById('product-img').src = productData.image;
      document.getElementById('product-description').textContent = productData.description;
      document.getElementById('product-link').href = productData.affiliate_link;
      document.getElementById('product-price').textContent = `Price: ${productData.price}`; // Display the price
    }
function displayProductDetails(productData) {
    // Update HTML elements with product data
    document.getElementById('product-title').textContent = productData.name;
    document.getElementById('product-img').src = productData.image;
    document.getElementById('product-description').textContent = productData.description;
    document.getElementById('product-link').href = productData.affiliate_link;
}


// ... (Your existing Firebase setup, product fetching, and other code) ...

// Get the hamburger menu and mobile navigation elements
const hamburger = document.getElementById('hamburger');
const mobileNav = document.querySelector('nav ul'); 

// Event listener for the hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('show'); 
});

// Close the dialog when clicking outside of it
mobileNav.addEventListener('click', (event) => {
    if (event.target === mobileNav) {
        hamburger.classList.remove('open'); // Close the hamburger
        mobileNav.classList.remove('show'); // Close the dialog
    }
});
// ... (Rest of your JavaScript) ...
const animatedText = document.getElementById('animatedText');

const textToAnimate = animatedText.textContent;
animatedText.textContent = '';

let i = 0;
const typingSpeed = 50; // Adjust the typing speed in milliseconds
const typeWriter = setInterval(() => {
  animatedText.textContent += textToAnimate[i];
  i++;

  if (i === textToAnimate.length) {
    clearInterval(typeWriter);
  }
}, typingSpeed);