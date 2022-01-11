
function changeMostPopularTab(newtab, elm) {
	console.log(newtab);

	var tabs = document.getElementById("most-popular-tabs");

	[].forEach.call(tabs.children, function(tab) {

		if (tab.classList.contains('active')) {
			tab.classList.remove('active');
		}

	});

	elm.classList.add('active');



	var container = document.getElementById('most-popular-content');
	var content = '<table><tr>',
		arr;

	if (newtab === 'Destinations') {
		arr = destinations;
	} else if (newtab === 'Hotels') {
		arr = hotels;
	} else if (newtab === 'Guides') {
		arr = guides;
	} else {
		arr = experiences;
	}

	
	for (var i = 0 ; i < 4 ; i++) {
		var elm = arr[i];

		var href = elm.href + "?item=" + elm.title;

		content += '<td>';

		content += '<a href="' + href + '">'
		content += '<div class="image" style="background-image: url(' + elm.imagePath + ')"></div>';
        content += 	'<div class="body"><h6>' + elm.title + '</h6>';
        content += 	'<div><span><em class="icon fas fa-euro-sign"></em>' + elm.price + '</span>';	
        content += 	'<span><em class="icon fas fa-user"></em>' + elm.person + ' person</span>';
        content += 	'<span><em class="icon fas fa-star"></em>' + elm.rating + '</span>';
                                          
		content += '</div></div></a></td>';
	}

	
	content += '</tr></table>';

	container.innerHTML = content;

}



(function loadInitialTab() {
	var tabs = document.getElementById("most-popular-tabs");
	changeMostPopularTab('Destinations', tabs.children[0]);
})();

function openPopup() {
	var popup = document.getElementById("signup-popup");
	popup.classList.add("visible");
}

function closePopup() {
	var popup = document.getElementById("signup-popup");
	popup.classList.remove("visible");
}
