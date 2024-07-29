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
            // Get random product suggestions (replace with your logic)
            getSuggestions(productId).then((suggestions) => {
                displaySuggestions(suggestions);
            });
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

// Fetch product details
function displayProductDetails(productData) {
    // Update HTML elements with product data
    document.getElementById('product-title').textContent = productData.name;
    document.getElementById('product-img').src = productData.image;
    document.getElementById('product-description').textContent = productData.description;
    document.getElementById('product-link').href = productData.affiliate_link;
    document.getElementById('product-price').textContent = `Price: ${productData.price}`; // Display the price
}

// Placeholder function to get suggestions (replace with your actual logic)
async function getSuggestions(currentProductId) {
  // Example: Get 5 to 7 random products excluding the current product
  const allProductsRef = db.ref('products');
  const allProductsSnapshot = await allProductsRef.once('value');
  const allProducts = allProductsSnapshot.val();
  const suggestions = [];

  // Get a random number between 5 and 7
  const numSuggestions = Math.floor(Math.random() * 3) + 5;

  // Create a random sample of 5 to 7
  const randomKeys = getRandomArrayElements(Object.keys(allProducts), numSuggestions);

  for (const key of randomKeys) {
    if (key !== currentProductId) {
      suggestions.push({ id: key, ...allProducts[key] }); // Include the product ID in the suggestion object
    }
  }

  return suggestions;
}

// Helper function to get random elements from an array
function getRandomArrayElements(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

// Display product suggestions
function displaySuggestions(suggestions) {
    const suggestionItems = document.getElementById('suggestion-items');
    suggestionItems.innerHTML = ''; // Clear existing items

    for (const suggestion of suggestions) {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('bg-white', 'rounded-md', 'overflow-hidden', 'shadow-md', 'p-4');

        const suggestionImg = document.createElement('img');
        suggestionImg.src = suggestion.image;
        suggestionImg.alt = suggestion.name;
        suggestionImg.classList.add('w-full', 'h-40', 'object-cover');

        const suggestionTitle = document.createElement('h3');
        suggestionTitle.textContent = suggestion.name;
        suggestionTitle.classList.add('text-lg', 'font-bold', 'mt-2');

        const suggestionLink = document.createElement('a');
        suggestionLink.href = `product-detail.html?productId=${suggestion.id}`; // CORRECTED: Use suggestion.id
        suggestionLink.textContent = 'Learn More';
        suggestionLink.classList.add('bg-orange-500', 'text-white', 'px-4', 'py-2', 'rounded-md', 'mt-2', 'block', 'hover:bg-orange-600');

        // Add data-product-id attribute to the link
        suggestionLink.setAttribute('data-product-id', suggestion.id); 

        suggestionItem.appendChild(suggestionImg);
        suggestionItem.appendChild(suggestionTitle);
        suggestionItem.appendChild(suggestionLink);

        suggestionItems.appendChild(suggestionItem);
    }
}

// Event listener for suggestion item clicks
const suggestionItems = document.getElementById('suggestion-items');
suggestionItems.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const productId = event.target.getAttribute('data-product-id');
        window.location.href = `product-detail.html?productId=${productId}`; 
    }
});

// Hamburger menu toggle
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

// Typing animation
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