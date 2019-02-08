
function DOMReady(){
    //String constants
    const INDEX_SEARCH_BAR = '#index-search-bar';

    // the object for appendImg
    const testObj = {
        tags: 'rose, flower, petal',
        webformatHeight: 426,
        webformatURL: 'https://pixabay.com/get/ea35b70c2afc053ed1584d05fb1d4797e673e1dc1fb80c4090f4c87fa3eab7b0de_640.jpg',
        webformatWidth: 640
    };
    
    //function that appends image to page from pixabay
    function appendImg (imageObject) {
        const htmlTemplate = 
        '<div class="img-card card" style="width: 18rem;">'+
            '<img src="' + imageObject.webformatURL + '" class="card-img-top" alt="...">'+
            '<div class="card-body">'+
              '<h5 class="card-title">' + imageObject.tags + '</h5>'+
            '</div>'+
        '</div>';
        $('#image-container').append(htmlTemplate);
    }

    function buildCompleteURL(searchValue) {
        const baseURL = 'https://pixabay.com/api/?key=11543969-d5ffb78383da99ab7336a1888';
            const imageType = '&image_type=photo&pretty=true'; 
            const searchTerm = '&q=' + searchValue;
            const completeURL = baseURL + searchTerm + imageType;
            return completeURL;
    }

    function successSearchBar(data) {
        $('#error').text('Success! You got ' + data.totalHits + " hits!");
        $('#error').css({'color': 'green'});
        $('#image-container').empty();
        data.hits.map(appendImg);
    }

    function errorHandlerSearch(err) {
        if(err.status === 404){
           $('#error').text('bad url'); 
           $('#error').css({'color': 'red'});
        }
    }

    //Listener for search bar
    //should fire ajax call on enter key
    function searchBarListener(event){
        
        // add if block for enter key
        if (event.keyCode === 13){
            $.ajax(buildCompleteURL($(this).val()), {
                success: successSearchBar,
                error: errorHandlerSearch,
            });
        }
    }

    //Listeners attached on DOM ready
    $(INDEX_SEARCH_BAR).on('keyup', searchBarListener);

};

$(document).ready(DOMReady);