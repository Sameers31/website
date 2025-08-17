document.addEventListener('DOMContentLoaded', function() {
    // Sample job news data
    const jobNews = [
        {
            id: 10,
            title: "Remote Work Policies Changing at Major Tech Firms",
            category: "trends",
            excerpt: "Several Fortune 500 companies are revising their remote work policies as return-to-office mandates increase...",
            date: "2 hours ago",
            views: "892",
            imagePath: '../public/img4.webp'
        },

        {
            id: 1,
            title: "Remote Work Policies Changing at Major Tech Firms",
            category: "trends",
            excerpt: "Several Fortune 500 companies are revising their remote work policies as return-to-office mandates increase...",
            date: "2 hours ago",
            views: "892",
            imagePath: '../public/img4.webp'
        },
        {
            id: 2,
            title: "2023 Salary Guide: Tech vs Non-Tech Roles",
            category: "salaries",
            excerpt: "New report shows tech salaries continue to outpace other industries by 15-20% on average...",
            date: "5 hours ago",
            views: "1,203",
            imagePath: '../public/img5.webp'
        },
        {
            id: 3,
            title: "How to Negotiate a Higher Starting Salary",
            category: "tips",
            excerpt: "Experts reveal the most effective strategies for salary negotiation in today's job market...",
            date: "Yesterday",
            views: "2,456",
            imagePath: '../public/img6.webp'
        },
        {
            id: 4,
            title: "Healthcare Sector Facing Critical Staff Shortages",
            category: "trends",
            excerpt: "Hospitals and clinics offering signing bonuses up to $20,000 for nursing positions...",
            date: "Yesterday",
            views: "1,789",
            imagePath: '../public/img7.webp'
        },
        {
            id: 5,
            title: "Top 10 Most In-Demand Skills for 2023",
            category: "trends",
            excerpt: "LinkedIn report identifies the skills that will make candidates most competitive this year...",
            date: "2 days ago",
            views: "3,102",
            imagePath: '../public/img8.webp'
        },
        {
            id: 6,
            title: "The Rise of the 4-Day Work Week",
            category: "trends",
            excerpt: "Companies experimenting with shortened work weeks report increased productivity and employee satisfaction...",
            date: "3 days ago",
            views: "2,345",
            imagePath: '../public/img2.webp'
        },
        {
            id: 7,
            title: "Resume Red Flags That Get Your Application Rejected",
            category: "tips",
            excerpt: "Recruiters share the most common mistakes they see that immediately disqualify candidates...",
            date: "3 days ago",
            views: "4,567",
            imagePath: '../public/img1.webp'
        },
        {
            id: 8,
            title: "Entry-Level Salaries Hit Record High in These Cities",
            category: "salaries",
            excerpt: "New graduates can expect the highest starting salaries in these 10 metropolitan areas...",
            date: "4 days ago",
            views: "1,890",
            imagePath: '../public/img5.webp'
        }
    ];

    const newsContainer = document.getElementById('newsContainer');
    const loadMoreBtn = document.getElementById('loadMore');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let visibleNews = 4;
    let currentCategory = 'all';

    // Display news articles
    function displayNews(category = 'all', count = visibleNews) {
        newsContainer.innerHTML = '';
        
        const filteredNews = category === 'all' 
            ? jobNews 
            : jobNews.filter(news => news.category === category);
        
        const newsToShow = filteredNews.slice(0, count);
        
        if (newsToShow.length === 0) {
            newsContainer.innerHTML = '<p class="no-news">No news articles found in this category.</p>';
            return;
        }
        
        newsToShow.forEach(news => {
            const newsCard = document.createElement('article');
            newsCard.className = 'news-card';
            newsCard.innerHTML = `
                <div class="news-image">
                    <img src="${news.imagePath}" alt="${news.title}">
                    <span class="news-category">${formatCategory(news.category)}</span>
                </div>
                <div class="news-content">
                    <h3>${news.title}</h3>
                    <div class="news-meta">
                        <span><i class="far fa-clock"></i> ${news.date}</span>
                        <span><i class="far fa-eye"></i> ${news.views} views</span>
                    </div>
                    <p>${news.excerpt}</p>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            newsContainer.appendChild(newsCard);
        });
        
        // Show/hide load more button
        if (count < filteredNews.length) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // Format category for display
    function formatCategory(category) {
        const categories = {
            'trends': 'Industry Trends',
            'salaries': 'Salary Data',
            'tips': 'Career Tips'
        };
        return categories[category] || category;
    }
    
    // Filter news by category
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter news
            currentCategory = this.dataset.category;
            visibleNews = 4;
            displayNews(currentCategory, visibleNews);
        });
    });
    
    // Load more news
    loadMoreBtn.addEventListener('click', function() {
        visibleNews += 4;
        displayNews(currentCategory, visibleNews);
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
    
    // Initialize
    displayNews();
    
    // News ticker animation
    const newsTicker = document.querySelector('.news-ticker');
    if (newsTicker) {
        const text = newsTicker.textContent;
        newsTicker.innerHTML = '';
        
        const tickerContent = document.createElement('div');
        tickerContent.className = 'ticker-content';
        tickerContent.textContent = text;
        newsTicker.appendChild(tickerContent);
        
        // Clone for seamless looping
        const tickerClone = tickerContent.cloneNode(true);
        newsTicker.appendChild(tickerClone);
        
        let tickerWidth = tickerContent.offsetWidth;
        let position = 0;
        
        function animateTicker() {
            position -= 1;
            if (position <= -tickerWidth) {
                position = 0;
            }
            newsTicker.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateTicker);
        }
        
        // Start animation
        animateTicker();
        
        // Update width on resize
        window.addEventListener('resize', function() {
            tickerWidth = tickerContent.offsetWidth;
        });
    }
    
    // Salary calculator functionality
    const salaryForm = document.querySelector('.salary-calculator form');
    if (salaryForm) {
        salaryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Salary estimation feature would connect to a backend service in a real application.');
        });
    }
    
    // Newsletter and alert forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput) {
                alert(`Thank you for subscribing! A confirmation has been sent to ${emailInput.value}`);
                emailInput.value = '';
            }
        });
    });
});