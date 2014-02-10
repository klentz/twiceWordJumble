function getCombinations(){
	
	var string = $('#stringInput').val();
	
	if(string.length==0){
		return;
	}
	
	$('#stringInput').val('');
	$('#wordList').empty();
	
	string = string.replace(' ','');
	var charset = string.split('');
	var wordList = [];
	
	
	//add each letter of the word to the possible word list
	for(i=0; i<charset.length; i++){
		wordList.push(charset[i]);
	}
	
	var length = wordList.length;
	
	for(i=0;i<length;i++){
		var availCharset = string.split('');
		var c1 = wordList[i];
		
		//remove any letters from c1 from the available set
		for(j=0;j<c1.length;j++){
			var temp = availCharset.indexOf(c1[j]);
			availCharset.splice(temp, 1);
		}
		
		//loop through remaining characters that are available
		//and add them to the original string
		for(j=0;j<availCharset.length;j++){
			var c2 = availCharset[j];
			
			//concatenate strings
			var word = c1 + c2;
			
			//push new word to wordList
			wordList.push(word);
		}
		
		//reset length of the wordlist
		length = wordList.length;
	}
	
	getWords(string,wordList);
	
}

function getWords(string,wordList){
	//arrays for styling the results
	var resultSizeArray = ['100','80','60','40'];
	var paddingArray = ['15','20','25','30','35','40','45'];

	$.ajax({
		type:'POST',
		url:'getWordList.php',
		data:{wordOptions:wordList},
		dataType:'xml',
		success:function(xml){
			$('#wordList').empty();
			$('#initialWord').text(string);
			$(xml).find('word').each(function(){
				var size = resultSizeArray[Math.floor(Math.random() * resultSizeArray.length)];
				var pLeft = paddingArray[Math.floor(Math.random() * paddingArray.length)];
				var pRight = paddingArray[Math.floor(Math.random() * paddingArray.length)];
				$('#wordList').append('<li style="font-size:'+ size +'pt;padding-left:'+ pLeft +'px;padding-right:'+ pRight +'px"><a href="http://dictionary.reference.com/browse/'+ $(this).text() +'?s=t" target="_blank">' + $(this).text() + '</a></li>');
				$('#words').show();
			});
		}
	});
}
