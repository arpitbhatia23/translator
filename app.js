const mybox1=document.querySelector("#mybox1");
const mybox2=document.querySelector("#mybox2");
const from=document.querySelector(".from select");
const to =document.querySelector(".to select")
const text=document.querySelector("textarea")
const btn=document.querySelector("button")
const clear=document.querySelector(".clear")


let dropdowns=document.querySelectorAll(" .dropdown select")
for (let select of dropdowns) {
    for (lang in languageCodeList ) {
      let newOption = document.createElement("option");
      newOption.innerText = lang;
      newOption.value = lang;
    if (select.name == "from" && lang == "English") {
        newOption.selected = "selected";
      } else if (select.name == "to" && lang == "Hindi") {
        newOption.selected ="selected";
      }
      select.append(newOption);
    }
}


btn.addEventListener("click",(evt)=>{
	evt.preventDefault();
translatelang();
console.log("clicked")
})
clear.addEventListener("click",()=>{
  text.value=""
  mybox2.innerText=""
})

const translatelang=async()=>{



const url = 'https://text-translator2.p.rapidapi.com/translate';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'a2d082869fmshd40b96058dbe32ep1c3ba6jsn5abd37a35253',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},
	body: new URLSearchParams({
		source_language:`${languageCodeList[from.value]}`,
		target_language:`${languageCodeList[to.value]}`,
		text: text.value
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
  mybox2.innerText=result.data.translatedText;
} catch (error) {
	console.error(error);
}
}
