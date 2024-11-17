const authorList = document.getElementById('author');

axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        const authorsHtml = response.data.map(item => {
            return `<option value=${item.username}>${item.name}</option>`
        }).join('');

        authorList.innerHTML = authorsHtml;
    }).catch(error => {
        console.error('Error fetching data:', error);
        productList.innerHTML = '<p>Unable to load authors at the moment. Please try again later.</p>';
    });