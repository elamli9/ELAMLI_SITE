// دالة عرض المقالة
function displayArticleDetails(articleData) {
    const articleContainer = document.createElement('div');
    articleContainer.classList.add('article-container', 'bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'max-w-2xl', 'mx-auto');

    // إضافة عنوان المقالة
    const title = document.createElement('h2');
    title.textContent = articleData.title;
    title.classList.add('text-2xl', 'font-bold', 'mb-2');

    // إضافة صورة المقالة
    const image = document.createElement('img');
    image.src = articleData.imageUrl;
    image.alt = articleData.title;
    image.classList.add('w-full', 'rounded-lg', 'mb-4');

    // إضافة نص المقالة
    const content = document.createElement('p');
    content.textContent = articleData.content;
    content.classList.add('text-gray-700', 'mb-4');

    // إضافة تاريخ المقالة
    const date = document.createElement('p');
    date.textContent = `Published on: ${articleData.date}`;
    date.classList.add('text-gray-500', 'text-sm', 'mb-4');

    // إضافة جميع العناصر إلى الحاوية
    articleContainer.appendChild(title);
    articleContainer.appendChild(image);
    articleContainer.appendChild(content);
    articleContainer.appendChild(date);

    // إضافة الحاوية إلى الصفحة
    document.getElementById('article-detail').appendChild(articleContainer);
}

// مثال على استخدام الدالة
const articleData = {
    title: "عنوان المقالة",
    imageUrl: "رابط_الصورة",
    content: "نص المقالة هنا...",
    date: "2024-10-30"
};

displayArticleDetails(articleData);
