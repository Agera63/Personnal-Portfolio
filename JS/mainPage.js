const text = document.getElementById("typed-text");

let index = 0;
let wordIndex = 0;

//Changed from deleting letters to typing letters
let isDeleting = false;

//Word list that will show and be typed
const wordList = ["programmer", "student"];
let word = " " + wordList[wordIndex] + ".";


function type() {
    if (!isDeleting) {
        //typing letters 1 by 1
        text.textContent = word.substring(0, index + 1);
        index++;

        //checks if word is fully written out, and acting accordingly
        if (index < word.length) {
            setTimeout(type, 100);
        } else {
            isDeleting = true;
            setTimeout(type, 5000);
        }

    } else {
        //erasing letters 1 by 1 
        text.textContent = word.substring(0, index);
        index--

        //checks if the word is fully gone, and acting accordingly (again)
        if (index > 0) {
            setTimeout(type, 100);
        } else {
            isDeleting = false;
            setTimeout(type, 500);

            //if we are at the end of the wordList, we restart from the first 
            if (wordIndex === wordList.length - 1) {
                wordIndex = 0;
                word = " " + wordList[wordIndex] + ".";
            } else {
                wordIndex++;
                word = " " + wordList[wordIndex] + ".";
            }
        }
    }
}

//First call to start the chain
type();
