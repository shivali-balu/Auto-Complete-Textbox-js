const suggestionBox = document.querySelector(".suggestionBox") ; 
const inputBox = document.getElementById("searchText") ; 

//to select the entire text when clicked 
inputBox.addEventListener('click' , ()=>{
    inputBox.select() ; 
}) 


//For filtering the data as per keyword
inputBox.addEventListener("keyup" , filterSuggestion) ; 
async function filterSuggestion() {
  
    const response = await fetch('data.json') ; 
    const KeywordsList = await response.json() ; 
    let suggestionList = [] ; 
    const userInput = this.value.trim().toLowerCase() ; 
    if(userInput.length) {
        suggestionList = KeywordsList.filter((keyword)=>{
            return keyword.search.toLowerCase().includes(userInput)
        })
    } 
    
  display(suggestionList) ;  
  //Vanish the box when there is no more options in the suggestion box 
  if(!suggestionList.length) {
    suggestionBox.innerHTML = "" ; 
  }
    
}  


//For displaying the filtered data to the suggestion box 
function display(suggestionList) {
    const content = suggestionList.map((list)=>{
        const data = list.search ; 
        return `<li onclick="select('${data}')">${Highlight(data)}</li>`
    }) ; 

    suggestionBox.innerHTML = `<ul>${content.join("")}</ul>`
}

//to select data in the inputBox 
function select(data) {
    inputBox.value = data 
    suggestionBox.innerHTML = "" 
}



//To highlight the selected character 
function Highlight(textToSearch) {
  const searchString = inputBox.value.toLowerCase();
  const startIndex = textToSearch.toLowerCase().indexOf(searchString); //2
  const highlightedText =
    textToSearch.substring(0, startIndex) +
    "<mark>" +
    searchString +
    "</mark>" +
    textToSearch.substring(startIndex + searchString.length);
  return highlightedText;
}
/*
this is 

th<mark>i</mark>s is 

*/