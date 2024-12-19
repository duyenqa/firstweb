const provinceList = document.getElementById('province');

axios.get('https://provinces.open-api.vn/api/')
    .then(response => {
        const chooseOption = `<option value="none">Choose:</option>`;
        const provincesHtml = response.data.map(item => {
            return `<option value=${item.code}>${item.name}</option>`
        }).join('');

        provinceList.innerHTML = chooseOption + provincesHtml;
    }).catch(error => {
        console.error('Error fetching data:', error);
        productList.innerHTML = '<p>Unable to load provincesprovinces at the moment. Please try again later.</p>';
    });