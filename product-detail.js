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
    // Update HTML elements with product data
    document.getElementById('product-title').textContent = productData.name;
    document.getElementById('product-img').src = productData.image;
    document.getElementById('product-description').textContent = productData.description;
    document.getElementById('product-link').href = productData.affiliate_link;
}