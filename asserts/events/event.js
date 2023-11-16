document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-btn');
    const aToZRadio = document.getElementById('a-z');
    const zToARadio = document.getElementById('z-a');
  
    searchButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent form submission
      performSearchAndSort();
    });
  
    // Initial rendering of the table
    const initialRows = Array.from(document.querySelectorAll('#files-div tbody tr'));
    renderTable(initialRows);
  
    // Function to perform search and update the UI
    function performSearchAndSort() {
      const searchTerm = searchInput.value.toLowerCase();
  
      // Get all rows in the table body
      let allRows = Array.from(document.querySelectorAll('#files-div tbody tr'));
  
      // Use the filter function to filter rows based on the search term
      const filteredRows = allRows.filter(row => {
        let found = false;
        // Check each cell in the row for a match with the search term
        row.childNodes.forEach(cell => {
          const cellText = cell.textContent.toLowerCase();
          if (cellText.includes(searchTerm)) {
            found = true;
          }
        });
        return found;
      });
  
      // Sort the filtered rows based on the selected radio button
      if (aToZRadio.checked) {
        filteredRows.sort((a, b) => {
          const valueA = a.querySelector(`td:nth-child(2)`).textContent; // Assuming the sorting is based on the second column
          const valueB = b.querySelector(`td:nth-child(2)`).textContent;
          return valueA.localeCompare(valueB);
        });
      } else if (zToARadio.checked) {
        filteredRows.sort((a, b) => {
          const valueA = a.querySelector(`td:nth-child(2)`).textContent; // Assuming the sorting is based on the second column
          const valueB = b.querySelector(`td:nth-child(2)`).textContent;
          return valueB.localeCompare(valueA);
        });
      }
  
      // Update the UI with the filtered and sorted data
      renderTable(filteredRows);
    }
  
    // Function to render the table based on the provided rows
    function renderTable(rows) {
      const tbody = document.querySelector('#files-div tbody');
      tbody.innerHTML = ''; // Clear previous results
  
      // Display results
      rows.forEach((row, index) => {
        const newRow = row.cloneNode(true); // Clone the row to preserve event listeners
        console.log("newRow",newRow);
        // Update the S.No based on the current visible row index
        newRow.querySelector('.sno').textContent = index + 1;
  
        tbody.appendChild(newRow);
      });   
    }
  
    // Event listener for radio button changes
    document.querySelectorAll('input[name="sort"]').forEach(radio => {
      radio.addEventListener('change', function() {
        performSearchAndSort();
      });
    });
  });
  