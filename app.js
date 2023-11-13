// Function to fetch and populate HTML content from a JSON file
async function populateContent() {
    try {
        const response = await fetch('./data.json'); // Fetch the JSON file
        const jsonData = await response.json(); // Parse the JSON data

        // Initialize variables for sum and count
        let sum = 0;
        let count = 0;
        
        jsonData.forEach((item,index) => {
            // *Populate the Category names
            document.querySelectorAll('.category-title')[index].textContent = `${item.category}`;
            // *Populate the Score values
            document.querySelectorAll('.score')[index].textContent = `${item.score}`;

            // *Update sum and count for average calculation
            sum += item.score;
            count++;

            // *Populate the SVG images
            // Create a new DOMParser
            const parser = new DOMParser();

            // Fetch the SVG content
            fetch(item.icon)
                .then(response => response.text())
                .then(svgText => {
                    const doc = parser.parseFromString(svgText, 'image/svg+xml');
                    const svgElement = doc.documentElement;

                    // Append the SVG elements to the HTML containers
                    document.querySelectorAll('.summary-icon')[index].appendChild(svgElement);
                });
        });

        // Calculate the average
        const average = (count > 0) ? (sum / count) : 0;
        // Display the average in the HTML element with class "average"
        document.querySelector('.average').textContent = `${Math.round(average)}`;
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
    }
}

// Call the function to populate content, when the page loads
populateContent();