// Search functionality for the index page
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const chaptersList = document.getElementById('chaptersList');
    const chapterLinks = document.querySelectorAll('.chapter-link');

    if (searchInput && chaptersList) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            chapterLinks.forEach(link => {
                const title = link.getAttribute('data-title').toLowerCase();
                const chapterCard = link.querySelector('.chapter-card');
                
                if (title.includes(searchTerm) || searchTerm === '') {
                    link.classList.remove('hidden');
                } else {
                    link.classList.add('hidden');
                }
            });
        });
    }

    // Mark chapters as read functionality
    const currentPage = window.location.pathname;
    
    // Check if we're on a chapter page
    if (currentPage.includes('chapters/')) {
        const chapterFileName = currentPage.split('/').pop();
        markChapterAsRead(chapterFileName);
    }

    // Add read status indicators to chapter links on index page
    if (currentPage.endsWith('index.html') || currentPage.endsWith('/')) {
        addReadStatusIndicators();
    }
});

// Function to mark a chapter as read
function markChapterAsRead(chapterFileName) {
    try {
        let readChapters = JSON.parse(localStorage.getItem('readChapters') || '[]');
        if (!readChapters.includes(chapterFileName)) {
            readChapters.push(chapterFileName);
            localStorage.setItem('readChapters', JSON.stringify(readChapters));
        }
    } catch (error) {
        console.log('Could not save read status:', error);
    }
}

// Function to add read status indicators
function addReadStatusIndicators() {
    try {
        const readChapters = JSON.parse(localStorage.getItem('readChapters') || '[]');
        const chapterLinks = document.querySelectorAll('.chapter-link');
        
        chapterLinks.forEach(link => {
            const href = link.getAttribute('href');
            const chapterFileName = href.split('/').pop();
            
            if (readChapters.includes(chapterFileName)) {
                const chapterCard = link.querySelector('.chapter-card');
                if (chapterCard) {
                    // Add a subtle indicator that the chapter has been read
                    chapterCard.style.borderLeft = '4px solid #1a4a8a';
                    chapterCard.style.backgroundColor = '#f8f9fa';
                    
                    // Add a small "read" indicator
                    const readIndicator = document.createElement('span');
                    readIndicator.textContent = '✓ Read';
                    readIndicator.style.cssText = `
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background-color: #1a4a8a;
                        color: white;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 0.8rem;
                        font-weight: 500;
                    `;
                    
                    // Make the chapter card relatively positioned
                    chapterCard.style.position = 'relative';
                    chapterCard.appendChild(readIndicator);
                }
            }
        });
    } catch (error) {
        console.log('Could not load read status:', error);
    }
}

// Function to clear all read status (useful for testing)
function clearReadStatus() {
    localStorage.removeItem('readChapters');
    location.reload();
}

// Function to get read chapters count
function getReadChaptersCount() {
    try {
        const readChapters = JSON.parse(localStorage.getItem('readChapters') || '[]');
        return readChapters.length;
    } catch (error) {
        return 0;
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // If on a chapter page, add keyboard shortcuts
    if (window.location.pathname.includes('chapters/')) {
        // Left arrow for previous chapter
        if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.altKey) {
            const prevLink = document.querySelector('.nav-link[href*="Previous"]');
            if (prevLink && !prevLink.disabled) {
                window.location.href = prevLink.href;
            }
        }
        
        // Right arrow for next chapter
        if (e.key === 'ArrowRight' && !e.ctrlKey && !e.altKey) {
            const nextLink = document.querySelector('.nav-link[href*="Next"]');
            if (nextLink && !nextLink.disabled) {
                window.location.href = nextLink.href;
            }
        }
        
        // Escape key to go back to index
        if (e.key === 'Escape') {
            window.location.href = '../index.html';
        }
    }
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
